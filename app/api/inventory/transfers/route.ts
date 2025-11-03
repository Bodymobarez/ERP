import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const transferItemSchema = z.object({
  itemId: z.string().min(1),
  quantity: z.number().positive(),
  notes: z.string().optional(),
})

const transferSchema = z.object({
  fromWarehouseId: z.string().min(1),
  toWarehouseId: z.string().min(1),
  transferDate: z.string(),
  reason: z.string().min(1),
  notes: z.string().optional(),
  items: z.array(transferItemSchema).min(1),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const warehouseId = searchParams.get('warehouseId')

    // Get stock movements with type 'transfer'
    const where: any = {
      type: 'transfer',
    }

    if (warehouseId) {
      where.warehouseId = warehouseId
    }

    const stockMovements = await prisma.stockMovement.findMany({
      where,
      include: {
        item: true,
        warehouse: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Group transfers by reference (transfer ID)
    const transfersMap = new Map()
    
    stockMovements.forEach(movement => {
      if (!movement.reference) return
      
      if (!transfersMap.has(movement.reference)) {
        transfersMap.set(movement.reference, {
          id: movement.reference,
          transferNumber: movement.reference,
          date: movement.date.toISOString().split('T')[0],
          reason: movement.reason || '',
          notes: movement.notes || '',
          items: [],
          fromWarehouse: null,
          toWarehouse: null,
          status: 'completed', // Default status
          createdAt: movement.createdAt,
        })
      }
      
      const transfer = transfersMap.get(movement.reference)
      
      // Add item to transfer
      transfer.items.push({
        name: movement.item.name,
        sku: movement.item.sku,
        quantity: Math.abs(Number(movement.quantity)),
        unit: movement.item.unit,
      })
      
      // Set warehouse information
      if (Number(movement.quantity) < 0) {
        // Negative quantity means outgoing (from warehouse)
        transfer.fromWarehouse = movement.warehouse.name
      } else {
        // Positive quantity means incoming (to warehouse)  
        transfer.toWarehouse = movement.warehouse.name
      }
    })

    const transfers = Array.from(transfersMap.values())

    return NextResponse.json(transfers)
  } catch (error) {
    console.error('Error fetching transfers:', error)
    return NextResponse.json({ error: 'Failed to fetch transfers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = transferSchema.parse(body)

    // Validate that from and to warehouses are different
    if (validatedData.fromWarehouseId === validatedData.toWarehouseId) {
      return NextResponse.json({ error: 'المخزن المصدر والوجهة يجب أن يكونا مختلفين' }, { status: 400 })
    }

    // Verify warehouses exist
    const [fromWarehouse, toWarehouse] = await Promise.all([
      prisma.warehouse.findUnique({ where: { id: validatedData.fromWarehouseId } }),
      prisma.warehouse.findUnique({ where: { id: validatedData.toWarehouseId } }),
    ])

    if (!fromWarehouse || !toWarehouse) {
      return NextResponse.json({ error: 'مخزن غير موجود' }, { status: 400 })
    }

    // Generate transfer reference
    const transferRef = `TRF-${Date.now()}`

    // Create stock movements for each item
    const stockMovements: any[] = []
    
    for (const item of validatedData.items) {
      // Verify item exists
      const itemRecord = await prisma.item.findUnique({ 
        where: { id: item.itemId },
        include: {
          warehouseItems: {
            where: { warehouseId: validatedData.fromWarehouseId }
          }
        }
      })

      if (!itemRecord) {
        return NextResponse.json({ error: `الصنف غير موجود: ${item.itemId}` }, { status: 400 })
      }

      // Check if enough quantity is available in from warehouse
      const warehouseItem = itemRecord.warehouseItems[0]
      if (!warehouseItem || Number(warehouseItem.quantity) < item.quantity) {
        return NextResponse.json({ 
          error: `كمية غير كافية للصنف ${itemRecord.name}. متوفر: ${warehouseItem?.quantity || 0}, مطلوب: ${item.quantity}` 
        }, { status: 400 })
      }

      // Create outgoing movement (from warehouse)
      stockMovements.push(
        prisma.stockMovement.create({
          data: {
            type: 'transfer',
            quantity: -item.quantity, // Negative for outgoing
            date: new Date(validatedData.transferDate),
            reference: transferRef,
            reason: validatedData.reason,
            notes: item.notes || validatedData.notes,
            itemId: item.itemId,
            warehouseId: validatedData.fromWarehouseId,
          },
        })
      )

      // Create incoming movement (to warehouse)
      stockMovements.push(
        prisma.stockMovement.create({
          data: {
            type: 'transfer',
            quantity: item.quantity, // Positive for incoming
            date: new Date(validatedData.transferDate),
            reference: transferRef,
            reason: validatedData.reason,
            notes: item.notes || validatedData.notes,
            itemId: item.itemId,
            warehouseId: validatedData.toWarehouseId,
          },
        })
      )
    }

    // Execute all stock movements in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create stock movements
      const movements = await Promise.all(stockMovements)

      // Update warehouse item quantities
      for (const item of validatedData.items) {
        // Decrease quantity in from warehouse
        await tx.warehouseItem.update({
          where: {
            warehouseId_itemId: {
              warehouseId: validatedData.fromWarehouseId,
              itemId: item.itemId,
            },
          },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        })

        // Increase or create quantity in to warehouse
        await tx.warehouseItem.upsert({
          where: {
            warehouseId_itemId: {
              warehouseId: validatedData.toWarehouseId,
              itemId: item.itemId,
            },
          },
          update: {
            quantity: {
              increment: item.quantity,
            },
          },
          create: {
            warehouseId: validatedData.toWarehouseId,
            itemId: item.itemId,
            quantity: item.quantity,
          },
        })

        // Update item's current stock
        const totalQuantityChange = await tx.warehouseItem.aggregate({
          where: { itemId: item.itemId },
          _sum: { quantity: true },
        })

        await tx.item.update({
          where: { id: item.itemId },
          data: {
            currentStock: totalQuantityChange._sum.quantity || 0,
          },
        })
      }

      return movements
    })

    return NextResponse.json({ 
      transferNumber: transferRef,
      message: 'تم إنشاء طلب النقل بنجاح',
      movements: result.length 
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating transfer:', error)
    return NextResponse.json({ error: 'Failed to create transfer' }, { status: 500 })
  }
}
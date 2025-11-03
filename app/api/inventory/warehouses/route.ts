import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const warehouseId = searchParams.get('warehouseId')

    if (warehouseId) {
      // Get items available in specific warehouse
      const warehouseItems = await prisma.warehouseItem.findMany({
        where: {
          warehouseId,
          quantity: { gt: 0 }, // Only items with quantity > 0
        },
        include: {
          item: true,
          warehouse: true,
        },
        orderBy: {
          item: { name: 'asc' },
        },
      })

      const items = warehouseItems.map(wi => ({
        id: wi.item.id,
        sku: wi.item.sku,
        name: wi.item.name,
        unit: wi.item.unit,
        availableQuantity: Number(wi.quantity),
        warehouseId: wi.warehouseId,
        warehouseName: wi.warehouse.name,
      }))

      return NextResponse.json(items)
    } else {
      // Get all warehouses with summary stats
      const warehouses = await prisma.warehouse.findMany({
        where: { isActive: true },
        include: {
          items: {
            select: {
              quantity: true,
            },
          },
          _count: {
            select: {
              items: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      })

      const warehousesWithStats = warehouses.map(warehouse => ({
        id: warehouse.id,
        code: warehouse.code,
        name: warehouse.name,
        type: warehouse.type,
        address: warehouse.address,
        city: warehouse.city,
        capacity: Number(warehouse.capacity || 0),
        currentStock: warehouse.items.reduce((sum, item) => sum + Number(item.quantity), 0),
        items: warehouse._count.items,
      }))

      return NextResponse.json(warehousesWithStats)
    }
  } catch (error) {
    console.error('Error fetching warehouses:', error)
    return NextResponse.json({ error: 'Failed to fetch warehouses' }, { status: 500 })
  }
}
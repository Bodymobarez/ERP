import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get all inventory orders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    
    const where: any = {}
    
    if (type && type !== 'all') {
      where.type = type
    }
    
    if (status && status !== 'all') {
      where.status = status
    }
    
    if (priority && priority !== 'all') {
      where.priority = priority
    }

    const orders = await prisma.inventoryOrder.findMany({
      where,
      include: {
        items: {
          include: {
            item: true
          }
        },
        supplier: true,
        client: true,
        createdByUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform data for frontend
    const transformedOrders = orders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      type: order.type,
      status: order.status,
      priority: order.priority,
      supplierId: order.supplierId,
      supplierName: order.supplier?.name,
      clientId: order.clientId,
      clientName: order.client?.name,
      totalAmount: order.totalAmount.toNumber(),
      orderDate: order.orderDate.toISOString(),
      expectedDelivery: order.expectedDelivery.toISOString(),
      actualDelivery: order.actualDelivery?.toISOString(),
      items: order.items.map(orderItem => ({
        id: orderItem.id,
        itemId: orderItem.itemId,
        itemName: orderItem.item.name,
        itemSku: orderItem.item.sku,
        quantity: orderItem.quantity.toNumber(),
        unitPrice: orderItem.unitPrice.toNumber(),
        totalPrice: orderItem.totalPrice.toNumber(),
        receivedQuantity: orderItem.receivedQuantity?.toNumber(),
        unit: orderItem.item.unit
      })),
      notes: order.notes,
      createdBy: order.createdByUser ? `${order.createdByUser.firstName} ${order.createdByUser.lastName}` : 'غير محدد',
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString()
    }))

    return NextResponse.json(transformedOrders)
  } catch (error) {
    console.error('Error fetching inventory orders:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب طلبات المخزون' },
      { status: 500 }
    )
  }
}

// POST - Create new inventory order
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Generate order number
    const lastOrder = await prisma.inventoryOrder.findFirst({
      where: {
        type: data.type
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    const currentYear = new Date().getFullYear()
    const prefix = data.type === 'purchase' ? 'PO' : 'SO'
    let orderNumber = `${prefix}-${currentYear}-001`
    
    if (lastOrder) {
      const lastNumber = parseInt(lastOrder.orderNumber.split('-')[2])
      orderNumber = `${prefix}-${currentYear}-${String(lastNumber + 1).padStart(3, '0')}`
    }

    // Calculate total amount
    const totalAmount = data.items.reduce((sum: number, item: any) => {
      return sum + (item.quantity * item.unitPrice)
    }, 0)

    const order = await prisma.inventoryOrder.create({
      data: {
        orderNumber,
        type: data.type,
        status: data.status || 'pending',
        priority: data.priority || 'medium',
        supplierId: data.supplierId,
        clientId: data.clientId,
        totalAmount,
        orderDate: new Date(data.orderDate),
        expectedDelivery: new Date(data.expectedDelivery),
        notes: data.notes,
        createdById: data.createdById,
        items: {
          create: data.items.map((item: any) => ({
            itemId: item.itemId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
            receivedQuantity: item.receivedQuantity || null
          }))
        }
      },
      include: {
        items: {
          include: {
            item: true
          }
        },
        supplier: true,
        client: true,
        createdByUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

    // Transform response
    const transformedOrder = {
      id: order.id,
      orderNumber: order.orderNumber,
      type: order.type,
      status: order.status,
      priority: order.priority,
      supplierId: order.supplierId,
      supplierName: order.supplier?.name,
      clientId: order.clientId,
      clientName: order.client?.name,
      totalAmount: order.totalAmount.toNumber(),
      orderDate: order.orderDate.toISOString(),
      expectedDelivery: order.expectedDelivery.toISOString(),
      actualDelivery: order.actualDelivery?.toISOString(),
      items: order.items.map(orderItem => ({
        id: orderItem.id,
        itemId: orderItem.itemId,
        itemName: orderItem.item.name,
        itemSku: orderItem.item.sku,
        quantity: orderItem.quantity.toNumber(),
        unitPrice: orderItem.unitPrice.toNumber(),
        totalPrice: orderItem.totalPrice.toNumber(),
        receivedQuantity: orderItem.receivedQuantity?.toNumber(),
        unit: orderItem.item.unit
      })),
      notes: order.notes,
      createdBy: order.createdByUser ? `${order.createdByUser.firstName} ${order.createdByUser.lastName}` : 'غير محدد',
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString()
    }

    return NextResponse.json(transformedOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating inventory order:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء طلبية المخزون' },
      { status: 500 }
    )
  }
}
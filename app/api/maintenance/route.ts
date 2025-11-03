import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema for maintenance records
const maintenanceSchema = z.object({
  equipmentId: z.string(),
  technicianId: z.string().optional(),
  technicianName: z.string(),
  technicianPhone: z.string(),
  maintenanceType: z.enum(['preventive', 'corrective', 'inspection', 'emergency', 'overhaul']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  status: z.enum(['scheduled', 'in-progress', 'completed', 'overdue', 'pending']).default('scheduled'),
  scheduledDate: z.string(),
  estimatedCost: z.number().min(0),
  estimatedHours: z.number().min(0).optional(),
  location: z.string(),
  description: z.string(),
  notes: z.string().optional(),
  partsRequired: z.array(z.string()).optional(),
  checklist: z.array(z.object({
    item: z.string(),
    completed: z.boolean().default(false)
  })).optional()
})

const updateMaintenanceSchema = maintenanceSchema.partial().extend({
  id: z.string(),
  actualCost: z.number().min(0).optional(),
  completedDate: z.string().optional()
})

// GET - Fetch all maintenance records
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const equipmentId = searchParams.get('equipmentId')
    const technicianId = searchParams.get('technicianId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}
    
    if (status && status !== 'all') {
      where.status = status
    }
    
    if (priority && priority !== 'all') {
      where.priority = priority
    }
    
    if (equipmentId) {
      where.equipmentId = equipmentId
    }
    
    if (technicianId) {
      where.technicianId = technicianId
    }

    const maintenanceRecords = await prisma.maintenance.findMany({
      where,
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
            type: true,
            model: true,
            serialNumber: true,
            location: true,
            status: true
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { scheduledDate: 'asc' }
      ],
      take: limit,
      skip: offset
    })

    const total = await prisma.maintenance.count({ where })

    // Get statistics
    const stats = await prisma.maintenance.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    })

    const priorityStats = await prisma.maintenance.groupBy({
      by: ['priority'],
      _count: {
        id: true
      }
    })

    const costStats = await prisma.maintenance.aggregate({
      _sum: {
        estimatedCost: true,
        actualCost: true
      },
      _avg: {
        estimatedCost: true,
        actualCost: true
      }
    })

    return NextResponse.json({
      success: true,
      data: maintenanceRecords,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      statistics: {
        byStatus: stats.reduce((acc: any, item) => {
          acc[item.status] = item._count.id
          return acc
        }, {}),
        byPriority: priorityStats.reduce((acc: any, item) => {
          acc[item.priority] = item._count.id
          return acc
        }, {}),
        costs: {
          totalEstimated: costStats._sum.estimatedCost || 0,
          totalActual: costStats._sum.actualCost || 0,
          averageEstimated: costStats._avg.estimatedCost || 0,
          averageActual: costStats._avg.actualCost || 0
        }
      }
    })
  } catch (error) {
    console.error('Error fetching maintenance records:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في جلب سجلات الصيانة' },
      { status: 500 }
    )
  }
}

// POST - Create new maintenance record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = maintenanceSchema.parse(body)

    // Generate maintenance ID
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    
    // Get the count of maintenance records for this month
    const count = await prisma.maintenance.count({
      where: {
        createdAt: {
          gte: new Date(year, today.getMonth(), 1),
          lt: new Date(year, today.getMonth() + 1, 1)
        }
      }
    })
    
    const maintenanceId = `MT-${year}-${month}-${String(count + 1).padStart(3, '0')}`

    // Check if equipment exists
    const equipment = await prisma.equipment.findUnique({
      where: { id: validatedData.equipmentId }
    })

    if (!equipment) {
      return NextResponse.json(
        { success: false, error: 'المعدة المحددة غير موجودة' },
        { status: 400 }
      )
    }

    const maintenance = await prisma.maintenance.create({
      data: {
        id: maintenanceId,
        equipmentId: validatedData.equipmentId,
        technicianId: validatedData.technicianId,
        technicianName: validatedData.technicianName,
        technicianPhone: validatedData.technicianPhone,
        maintenanceType: validatedData.maintenanceType,
        priority: validatedData.priority,
        status: validatedData.status,
        scheduledDate: new Date(validatedData.scheduledDate),
        estimatedCost: validatedData.estimatedCost,
        estimatedHours: validatedData.estimatedHours,
        location: validatedData.location,
        description: validatedData.description,
        notes: validatedData.notes,
        partsRequired: validatedData.partsRequired || [],
        checklist: validatedData.checklist || []
      },
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
            type: true,
            model: true,
            serialNumber: true,
            location: true,
            status: true
          }
        }
      }
    })

    // Update equipment status if needed
    if (validatedData.maintenanceType === 'emergency' || validatedData.priority === 'urgent') {
      await prisma.equipment.update({
        where: { id: validatedData.equipmentId },
        data: { status: 'maintenance' }
      })
    }

    return NextResponse.json({
      success: true,
      data: maintenance,
      message: 'تم إنشاء طلب الصيانة بنجاح'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating maintenance record:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في إنشاء طلب الصيانة' },
      { status: 500 }
    )
  }
}

// PUT - Update maintenance record
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = updateMaintenanceSchema.parse(body)
    
    const { id, ...updateData } = validatedData

    // Check if maintenance record exists
    const existingMaintenance = await prisma.maintenance.findUnique({
      where: { id }
    })

    if (!existingMaintenance) {
      return NextResponse.json(
        { success: false, error: 'سجل الصيانة غير موجود' },
        { status: 404 }
      )
    }

    // Prepare update data
    const dataToUpdate: any = { ...updateData }
    
    if (updateData.scheduledDate) {
      dataToUpdate.scheduledDate = new Date(updateData.scheduledDate)
    }
    
    if (updateData.completedDate) {
      dataToUpdate.completedDate = new Date(updateData.completedDate)
    }

    const maintenance = await prisma.maintenance.update({
      where: { id },
      data: dataToUpdate,
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
            type: true,
            model: true,
            serialNumber: true,
            location: true,
            status: true
          }
        }
      }
    })

    // Update equipment status based on maintenance status
    if (updateData.status) {
      let equipmentStatus = 'active'
      
      if (updateData.status === 'in-progress') {
        equipmentStatus = 'maintenance'
      } else if (updateData.status === 'completed') {
        equipmentStatus = 'active'
      } else if (updateData.status === 'overdue') {
        equipmentStatus = 'maintenance'
      }

      await prisma.equipment.update({
        where: { id: existingMaintenance.equipmentId },
        data: { status: equipmentStatus }
      })
    }

    return NextResponse.json({
      success: true,
      data: maintenance,
      message: 'تم تحديث سجل الصيانة بنجاح'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating maintenance record:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في تحديث سجل الصيانة' },
      { status: 500 }
    )
  }
}

// DELETE - Delete maintenance record
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'معرف الصيانة مطلوب' },
        { status: 400 }
      )
    }

    // Check if maintenance record exists
    const existingMaintenance = await prisma.maintenance.findUnique({
      where: { id }
    })

    if (!existingMaintenance) {
      return NextResponse.json(
        { success: false, error: 'سجل الصيانة غير موجود' },
        { status: 404 }
      )
    }

    // Don't allow deletion of in-progress maintenance
    if (existingMaintenance.status === 'in-progress') {
      return NextResponse.json(
        { success: false, error: 'لا يمكن حذف الصيانة الجارية' },
        { status: 400 }
      )
    }

    await prisma.maintenance.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'تم حذف سجل الصيانة بنجاح'
    })
  } catch (error) {
    console.error('Error deleting maintenance record:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في حذف سجل الصيانة' },
      { status: 500 }
    )
  }
}
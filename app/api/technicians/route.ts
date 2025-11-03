import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema for technicians
const technicianSchema = z.object({
  name: z.string().min(1, 'اسم الفني مطلوب'),
  phone: z.string().min(1, 'رقم الهاتف مطلوب'),
  email: z.string().email('بريد إلكتروني غير صحيح').optional(),
  specialization: z.string().min(1, 'التخصص مطلوب'),
  experience: z.string().optional(),
  status: z.enum(['available', 'busy', 'inactive']).default('available'),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().optional()
})

const updateTechnicianSchema = technicianSchema.partial().extend({
  id: z.string()
})

// GET - Fetch all technicians
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const specialization = searchParams.get('specialization')
    const available = searchParams.get('available')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}
    
    if (status && status !== 'all') {
      where.status = status
    }
    
    if (specialization && specialization !== 'all') {
      where.specialization = {
        contains: specialization,
        mode: 'insensitive'
      }
    }
    
    if (available === 'true') {
      where.status = 'available'
    }

    // Since we don't have a dedicated technicians table, we'll use mock data
    // In a real system, you would create a Technician model in Prisma schema
    const mockTechnicians = [
      {
        id: "tech-001",
        name: "م. أحمد محمد",
        phone: "0501234567",
        email: "ahmed.mohamed@company.com",
        specialization: "هيدروليك وكهرباء",
        experience: "8 سنوات",
        status: "available",
        rating: 4.8,
        notes: "متخصص في الأنظمة الهيدروليكية والكهربائية للمعدات الثقيلة",
        completedMaintenances: 125,
        avgCompletionTime: 6.5,
        certifications: ["شهادة الهيدروليك المتقدم", "شهادة الأنظمة الكهربائية"],
        availableFrom: "08:00",
        availableTo: "17:00",
        location: "الرياض",
        emergencyAvailable: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-11-03')
      },
      {
        id: "tech-002",
        name: "علي حسن",
        phone: "0507654321",
        email: "ali.hassan@company.com",
        specialization: "محركات ديزل",
        experience: "12 سنة",
        status: "busy",
        rating: 4.9,
        notes: "خبير في إصلاح وصيانة محركات الديزل",
        completedMaintenances: 200,
        avgCompletionTime: 8.2,
        certifications: ["شهادة محركات الديزل", "شهادة الصيانة الوقائية"],
        availableFrom: "07:00",
        availableTo: "16:00",
        location: "جدة",
        emergencyAvailable: true,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-11-03')
      },
      {
        id: "tech-003",
        name: "فهد القحطاني",
        phone: "0509876543",
        email: "fahad.alqahtani@company.com",
        specialization: "فحص وتشخيص",
        experience: "6 سنوات",
        status: "available",
        rating: 4.7,
        notes: "متخصص في تشخيص الأعطال والفحص الدوري",
        completedMaintenances: 85,
        avgCompletionTime: 4.5,
        certifications: ["شهادة التشخيص المتقدم", "شهادة أجهزة القياس"],
        availableFrom: "09:00",
        availableTo: "18:00",
        location: "الدمام",
        emergencyAvailable: false,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-11-03')
      },
      {
        id: "tech-004",
        name: "محمد السالم",
        phone: "0503456789",
        email: "mohammed.alsalem@company.com",
        specialization: "أنظمة هيدروليكية",
        experience: "10 سنوات",
        status: "available",
        rating: 4.6,
        notes: "خبير في الأنظمة الهيدروليكية المعقدة",
        completedMaintenances: 150,
        avgCompletionTime: 7.1,
        certifications: ["شهادة الهيدروليك الصناعي", "شهادة المضخات"],
        availableFrom: "08:30",
        availableTo: "17:30",
        location: "الرياض",
        emergencyAvailable: true,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-11-03')
      },
      {
        id: "tech-005",
        name: "خالد النمر",
        phone: "0506543210",
        email: "khalid.alnemr@company.com",
        specialization: "معدات قطع ولحام",
        experience: "7 سنوات",
        status: "available",
        rating: 4.5,
        notes: "متخصص في معدات القطع واللحام",
        completedMaintenances: 95,
        avgCompletionTime: 5.8,
        certifications: ["شهادة اللحام المتقدم", "شهادة معدات القطع"],
        availableFrom: "07:30",
        availableTo: "16:30",
        location: "الرياض",
        emergencyAvailable: false,
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-11-03')
      },
      {
        id: "tech-006",
        name: "سعد الغامدي",
        phone: "0508765432",
        email: "saad.alghamdi@company.com",
        specialization: "معدات رفع ونقل",
        experience: "9 سنوات",
        status: "inactive",
        rating: 4.4,
        notes: "متخصص في الرافعات ومعدات النقل الثقيل",
        completedMaintenances: 110,
        avgCompletionTime: 9.2,
        certifications: ["شهادة الرافعات", "شهادة المعدات الثقيلة"],
        availableFrom: "08:00",
        availableTo: "17:00",
        location: "جدة",
        emergencyAvailable: false,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-11-03')
      }
    ]

    // Apply filters
    let filteredTechnicians = mockTechnicians

    if (status && status !== 'all') {
      filteredTechnicians = filteredTechnicians.filter(tech => tech.status === status)
    }

    if (specialization && specialization !== 'all') {
      filteredTechnicians = filteredTechnicians.filter(tech => 
        tech.specialization.toLowerCase().includes(specialization.toLowerCase())
      )
    }

    if (available === 'true') {
      filteredTechnicians = filteredTechnicians.filter(tech => tech.status === 'available')
    }

    // Apply pagination
    const paginatedTechnicians = filteredTechnicians.slice(offset, offset + limit)

    // Calculate statistics
    const stats = {
      total: filteredTechnicians.length,
      available: filteredTechnicians.filter(t => t.status === 'available').length,
      busy: filteredTechnicians.filter(t => t.status === 'busy').length,
      inactive: filteredTechnicians.filter(t => t.status === 'inactive').length,
      avgRating: filteredTechnicians.reduce((sum, t) => sum + t.rating, 0) / filteredTechnicians.length,
      totalCompletedMaintenances: filteredTechnicians.reduce((sum, t) => sum + t.completedMaintenances, 0),
      avgCompletionTime: filteredTechnicians.reduce((sum, t) => sum + t.avgCompletionTime, 0) / filteredTechnicians.length,
      emergencyAvailableCount: filteredTechnicians.filter(t => t.emergencyAvailable && t.status === 'available').length
    }

    return NextResponse.json({
      success: true,
      data: paginatedTechnicians,
      pagination: {
        total: filteredTechnicians.length,
        limit,
        offset,
        hasMore: offset + limit < filteredTechnicians.length
      },
      statistics: stats
    })
  } catch (error) {
    console.error('Error fetching technicians:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في جلب بيانات الفنيين' },
      { status: 500 }
    )
  }
}

// POST - Create new technician (Mock implementation)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // For now, return success message
    // In a real implementation, you would save to database
    return NextResponse.json({
      success: true,
      message: 'تم إضافة الفني بنجاح',
      data: {
        id: `tech-${Date.now()}`,
        ...body,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  } catch (error) {
    console.error('Error creating technician:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في إضافة الفني' },
      { status: 500 }
    )
  }
}

// PUT - Update technician (Mock implementation)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    // For now, return success message
    // In a real implementation, you would update in database
    return NextResponse.json({
      success: true,
      message: 'تم تحديث بيانات الفني بنجاح',
      data: {
        id,
        ...updateData,
        updatedAt: new Date()
      }
    })
  } catch (error) {
    console.error('Error updating technician:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في تحديث بيانات الفني' },
      { status: 500 }
    )
  }
}

// DELETE - Delete technician (Mock implementation)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'معرف الفني مطلوب' },
        { status: 400 }
      )
    }

    // For now, return success message
    // In a real implementation, you would delete from database
    return NextResponse.json({
      success: true,
      message: 'تم حذف الفني بنجاح'
    })
  } catch (error) {
    console.error('Error deleting technician:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في حذف الفني' },
      { status: 500 }
    )
  }
}
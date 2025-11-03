import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock data - same as in main route
const mockForecasts = [
  {
    id: "1",
    title: "توقع إيرادات الربع الثاني 2024",
    type: "revenue",
    category: "quarterly",
    period: "Q2 2024",
    amount: 18500000,
    confidence: 85,
    status: "active",
    createdDate: "2024-01-10",
    lastUpdated: "2024-01-15",
    description: "توقع الإيرادات للربع الثاني بناءً على العقود المؤكدة والمشاريع الجارية",
    baselineData: {
      confirmedContracts: 12000000,
      pendingContracts: 4500000,
      recurringRevenue: 2000000
    },
    scenarios: {
      conservative: 16200000,
      realistic: 18500000,
      optimistic: 21800000
    },
    factors: [
      { name: "العقود المؤكدة", impact: "high", value: 65 },
      { name: "ظروف السوق", impact: "medium", value: 20 },
      { name: "الموسمية", impact: "low", value: 15 }
    ],
    createdBy: "user1",
    projectId: null,
    departmentId: "finance",
    attachments: [
      { name: "تحليل السوق.pdf", size: "2.1 MB", type: "pdf" },
      { name: "بيانات العقود.xlsx", size: "1.5 MB", type: "excel" }
    ],
    revisions: [
      {
        date: "2024-01-15",
        changes: "تحديث مستوى الثقة من 82% إلى 85%",
        updatedBy: "user1"
      },
      {
        date: "2024-01-12",
        changes: "إضافة عقود جديدة بقيمة 2.5 مليون",
        updatedBy: "user2"
      }
    ]
  },
  {
    id: "2",
    title: "توقع تكاليف مشروع البرج السكني",
    type: "expense",
    category: "project",
    period: "6 أشهر",
    amount: 8200000,
    confidence: 92,
    status: "active",
    createdDate: "2024-01-08",
    lastUpdated: "2024-01-14",
    description: "توقع التكاليف الإجمالية لمشروع البرج السكني بالرياض",
    baselineData: {
      materialCosts: 5500000,
      laborCosts: 2100000,
      equipmentCosts: 600000
    },
    scenarios: {
      conservative: 8800000,
      realistic: 8200000,
      optimistic: 7600000
    },
    factors: [
      { name: "أسعار المواد", impact: "high", value: 45 },
      { name: "تكلفة العمالة", impact: "medium", value: 30 },
      { name: "المعدات", impact: "low", value: 25 }
    ],
    createdBy: "user2",
    projectId: "proj1",
    departmentId: "projects",
    attachments: [
      { name: "قائمة الكميات.pdf", size: "3.2 MB", type: "pdf" },
      { name: "عروض الموردين.zip", size: "8.1 MB", type: "zip" }
    ],
    revisions: [
      {
        date: "2024-01-14",
        changes: "تحديث أسعار المواد الخام",
        updatedBy: "user2"
      }
    ]
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { id } = params

    // Find the forecast
    const forecast = mockForecasts.find(f => f.id === id)
    
    if (!forecast) {
      return NextResponse.json(
        { error: 'التوقع غير موجود' },
        { status: 404 }
      )
    }

    // Add computed fields
    const enrichedForecast = {
      ...forecast,
      computedMetrics: {
        conservativeVariance: Math.round(((forecast.scenarios.conservative - forecast.amount) / forecast.amount) * 100),
        optimisticVariance: Math.round(((forecast.scenarios.optimistic - forecast.amount) / forecast.amount) * 100),
        confidenceLevel: forecast.confidence >= 90 ? 'عالي' : 
                        forecast.confidence >= 75 ? 'متوسط' : 'منخفض',
        riskLevel: forecast.confidence >= 90 ? 'منخفض' : 
                  forecast.confidence >= 75 ? 'متوسط' : 'عالي'
      },
      relatedForecasts: mockForecasts
        .filter(f => f.id !== id && (f.type === forecast.type || f.category === forecast.category))
        .slice(0, 3)
        .map(f => ({
          id: f.id,
          title: f.title,
          type: f.type,
          amount: f.amount,
          confidence: f.confidence
        }))
    }

    return NextResponse.json({
      success: true,
      data: enrichedForecast
    })

  } catch (error) {
    console.error('Error fetching forecast:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب التوقع' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()

    // Find existing forecast
    const existingForecast = mockForecasts.find(f => f.id === id)
    if (!existingForecast) {
      return NextResponse.json(
        { error: 'التوقع غير موجود' },
        { status: 404 }
      )
    }

    // Validation
    if (body.amount !== undefined) {
      if (typeof body.amount !== 'number' || body.amount <= 0) {
        return NextResponse.json(
          { error: 'المبلغ يجب أن يكون رقم موجب' },
          { status: 400 }
        )
      }
    }

    if (body.confidence !== undefined) {
      if (typeof body.confidence !== 'number' || body.confidence < 0 || body.confidence > 100) {
        return NextResponse.json(
          { error: 'مستوى الثقة يجب أن يكون بين 0 و 100' },
          { status: 400 }
        )
      }
    }

    // Update scenarios if amount changed
    if (body.amount && body.amount !== existingForecast.amount) {
      body.scenarios = {
        conservative: body.amount * 0.9,
        realistic: body.amount,
        optimistic: body.amount * 1.15
      }
    }

    // Create revision entry
    const revisionEntry = {
      date: new Date().toISOString(),
      changes: body.revisionNote || 'تحديث عام',
      updatedBy: session.user?.id || 'unknown'
    }

    // Update forecast
    const updatedForecast = {
      ...existingForecast,
      ...body,
      lastUpdated: new Date().toISOString(),
      revisions: [...(existingForecast.revisions || []), revisionEntry]
    }

    // In a real application, update in database
    // await prisma.forecast.update({ where: { id }, data: updatedForecast })

    return NextResponse.json({
      success: true,
      message: 'تم تحديث التوقع بنجاح',
      data: updatedForecast
    })

  } catch (error) {
    console.error('Error updating forecast:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث التوقع' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { id } = params

    // Find existing forecast
    const existingForecast = mockForecasts.find(f => f.id === id)
    if (!existingForecast) {
      return NextResponse.json(
        { error: 'التوقع غير موجود' },
        { status: 404 }
      )
    }

    // Check permissions (in a real app, implement proper authorization)
    if (existingForecast.createdBy !== session.user?.id) {
      // Allow admin users to delete any forecast
      // For now, we'll allow deletion
    }

    // In a real application, delete from database
    // await prisma.forecast.delete({ where: { id } })

    return NextResponse.json({
      success: true,
      message: 'تم حذف التوقع بنجاح'
    })

  } catch (error) {
    console.error('Error deleting forecast:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في حذف التوقع' },
      { status: 500 }
    )
  }
}
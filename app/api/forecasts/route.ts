import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock data for demonstration
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
    departmentId: "finance"
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
    departmentId: "projects"
  }
]

// GET: Fetch all forecasts or filter by query parameters
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const projectId = searchParams.get('projectId')

    let filteredForecasts = mockForecasts

    // Apply filters
    if (type) {
      filteredForecasts = filteredForecasts.filter(forecast => forecast.type === type)
    }
    if (status) {
      filteredForecasts = filteredForecasts.filter(forecast => forecast.status === status)
    }
    if (category) {
      filteredForecasts = filteredForecasts.filter(forecast => forecast.category === category)
    }
    if (projectId) {
      filteredForecasts = filteredForecasts.filter(forecast => forecast.projectId === projectId)
    }

    return NextResponse.json({
      success: true,
      data: filteredForecasts,
      count: filteredForecasts.length
    })

  } catch (error) {
    console.error('Error fetching forecasts:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب التوقعات' },
      { status: 500 }
    )
  }
}

// POST: Create a new forecast
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'type', 'category', 'period', 'amount', 'confidence']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `الحقل ${field} مطلوب` },
          { status: 400 }
        )
      }
    }

    // Validate data types and ranges
    if (typeof body.amount !== 'number' || body.amount <= 0) {
      return NextResponse.json(
        { error: 'المبلغ يجب أن يكون رقم موجب' },
        { status: 400 }
      )
    }

    if (typeof body.confidence !== 'number' || body.confidence < 0 || body.confidence > 100) {
      return NextResponse.json(
        { error: 'مستوى الثقة يجب أن يكون بين 0 و 100' },
        { status: 400 }
      )
    }

    // Validate type
    const validTypes = ['revenue', 'expense', 'cashflow', 'profit']
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { error: 'نوع التوقع غير صحيح' },
        { status: 400 }
      )
    }

    // Create new forecast object
    const newForecast = {
      id: `forecast_${Date.now()}`,
      title: body.title,
      type: body.type,
      category: body.category,
      period: body.period,
      amount: body.amount,
      confidence: body.confidence,
      status: body.status || 'draft',
      description: body.description || '',
      baselineData: body.baselineData || {},
      scenarios: body.scenarios || {
        conservative: body.amount * 0.9,
        realistic: body.amount,
        optimistic: body.amount * 1.15
      },
      factors: body.factors || [],
      createdDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      createdBy: session.user?.id || 'unknown',
      projectId: body.projectId || null,
      departmentId: body.departmentId || 'finance'
    }

    // In a real application, save to database
    // await prisma.forecast.create({ data: newForecast })

    return NextResponse.json({
      success: true,
      message: 'تم إنشاء التوقع بنجاح',
      data: newForecast
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating forecast:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء التوقع' },
      { status: 500 }
    )
  }
}

// PUT: Update existing forecast
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'معرف التوقع مطلوب' },
        { status: 400 }
      )
    }

    // Find existing forecast
    const existingForecast = mockForecasts.find(f => f.id === body.id)
    if (!existingForecast) {
      return NextResponse.json(
        { error: 'التوقع غير موجود' },
        { status: 404 }
      )
    }

    // Validate amount and confidence if provided
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

    // Update forecast object
    const updatedForecast = {
      ...existingForecast,
      ...body,
      lastUpdated: new Date().toISOString()
    }

    // In a real application, update in database
    // await prisma.forecast.update({ where: { id: body.id }, data: updatedForecast })

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

// DELETE: Delete forecast
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'معرف التوقع مطلوب' },
        { status: 400 }
      )
    }

    // Find existing forecast
    const existingForecast = mockForecasts.find(f => f.id === id)
    if (!existingForecast) {
      return NextResponse.json(
        { error: 'التوقع غير موجود' },
        { status: 404 }
      )
    }

    // Check if user has permission to delete
    if (existingForecast.createdBy !== session.user?.id) {
      // In a real app, check admin permissions here
      // For now, allow deletion
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
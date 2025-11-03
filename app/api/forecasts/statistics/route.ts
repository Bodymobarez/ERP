import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock historical data for statistics
const mockHistoricalForecasts = [
  {
    id: "hist1",
    title: "توقع أرباح الربع الأول",
    type: "profit",
    forecastAmount: 5200000,
    actualAmount: 5150000,
    accuracy: 94,
    variance: -1,
    completedDate: "2024-01-15"
  },
  {
    id: "hist2", 
    title: "توقع تكاليف مشروع المجمع التجاري",
    type: "expense",
    forecastAmount: 12800000,
    actualAmount: 13200000,
    accuracy: 87,
    variance: 3.1,
    completedDate: "2024-01-10"
  },
  {
    id: "hist3",
    title: "توقع إيرادات ديسمبر 2023",
    type: "revenue", 
    forecastAmount: 6400000,
    actualAmount: 6520000,
    accuracy: 91,
    variance: 1.9,
    completedDate: "2024-01-08"
  },
  {
    id: "hist4",
    title: "توقع التدفق النقدي Q4 2023",
    type: "cashflow",
    forecastAmount: 3200000,
    actualAmount: 3050000,
    accuracy: 85,
    variance: -4.7,
    completedDate: "2024-01-05"
  },
  {
    id: "hist5",
    title: "توقع مصاريف التشغيل نوفمبر",
    type: "expense",
    forecastAmount: 2800000,
    actualAmount: 2920000,
    accuracy: 83,
    variance: 4.3,
    completedDate: "2024-01-01"
  }
]

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '3m' // 1m, 3m, 6m, 1y
    const type = searchParams.get('type') // revenue, expense, cashflow, profit

    let filteredData = mockHistoricalForecasts

    // Filter by type if specified
    if (type) {
      filteredData = filteredData.filter(forecast => forecast.type === type)
    }

    // Calculate statistics
    const totalForecasts = filteredData.length
    const accuracySum = filteredData.reduce((sum, f) => sum + f.accuracy, 0)
    const averageAccuracy = totalForecasts > 0 ? accuracySum / totalForecasts : 0

    const varianceSum = filteredData.reduce((sum, f) => sum + Math.abs(f.variance), 0)
    const averageVariance = totalForecasts > 0 ? varianceSum / totalForecasts : 0

    // Calculate accuracy by type
    const accuracyByType: { [key: string]: number } = {
      revenue: 0,
      expense: 0,
      cashflow: 0,
      profit: 0
    }

    const typeGroups: { [key: string]: any[] } = filteredData.reduce((groups: { [key: string]: any[] }, forecast) => {
      if (!groups[forecast.type]) {
        groups[forecast.type] = []
      }
      groups[forecast.type]?.push(forecast)
      return groups
    }, {})

    Object.keys(typeGroups).forEach(type => {
      const typeForecasts = typeGroups[type]
      if (typeForecasts && typeForecasts.length > 0) {
        const typeAccuracySum = typeForecasts.reduce((sum: number, f: any) => sum + (f.accuracy || 0), 0)
        accuracyByType[type] = typeAccuracySum / typeForecasts.length
      }
    })

    // Performance trends (mock data for demonstration)
    const performanceTrends = {
      monthly: [
        { month: "يناير", accuracy: 88.5, forecasts: 12 },
        { month: "فبراير", accuracy: 91.2, forecasts: 15 },
        { month: "مارس", accuracy: 89.8, forecasts: 18 },
        { month: "أبريل", accuracy: 92.4, forecasts: 14 },
        { month: "مايو", accuracy: 87.6, forecasts: 16 },
        { month: "يونيو", accuracy: 94.1, forecasts: 20 }
      ],
      quarterly: [
        { quarter: "Q1 2023", accuracy: 85.2, forecasts: 45 },
        { quarter: "Q2 2023", accuracy: 88.7, forecasts: 52 },
        { quarter: "Q3 2023", accuracy: 91.3, forecasts: 48 },
        { quarter: "Q4 2023", accuracy: 89.5, forecasts: 55 }
      ]
    }

    // Success rate calculation
    const successfulForecasts = filteredData.filter(f => Math.abs(f.variance) <= 5).length
    const successRate = totalForecasts > 0 ? (successfulForecasts / totalForecasts) * 100 : 0

    // Top performing categories
    const categoryPerformance = [
      { category: "المشاريع", accuracy: 92.3, count: 28 },
      { category: "التشغيل", accuracy: 88.7, count: 35 },
      { category: "الاستثمار", accuracy: 85.1, count: 15 },
      { category: "التمويل", accuracy: 90.4, count: 22 }
    ]

    const statistics = {
      overview: {
        totalForecasts,
        averageAccuracy: Math.round(averageAccuracy * 10) / 10,
        averageVariance: Math.round(averageVariance * 10) / 10,
        successRate: Math.round(successRate * 10) / 10,
        improvementTrend: 12.3 // Mock improvement percentage
      },
      accuracyByType: Object.keys(accuracyByType).map(type => ({
        type,
        accuracy: Math.round((accuracyByType[type] || 0) * 10) / 10,
        count: typeGroups[type]?.length || 0
      })),
      performanceTrends,
      categoryPerformance,
      recentForecasts: filteredData.slice(0, 10).map(forecast => ({
        id: forecast.id,
        title: forecast.title,
        type: forecast.type,
        accuracy: forecast.accuracy,
        variance: forecast.variance,
        completedDate: forecast.completedDate
      })),
      insights: [
        {
          type: "success",
          title: "تحسن في دقة التوقعات",
          description: "ارتفع متوسط دقة التوقعات بنسبة 5.2% مقارنة بالربع الماضي",
          value: "+5.2%"
        },
        {
          type: "warning",
          title: "انحراف في توقعات المصروفات",
          description: "توقعات المصروفات تظهر انحراف أعلى من المتوسط",
          value: "7.3%"
        },
        {
          type: "info",
          title: "نمو في عدد التوقعات",
          description: "زيادة 15% في عدد التوقعات النشطة هذا الشهر",
          value: "+15%"
        }
      ]
    }

    return NextResponse.json({
      success: true,
      data: statistics
    })

  } catch (error) {
    console.error('Error fetching forecast statistics:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب إحصائيات التوقعات' },
      { status: 500 }
    )
  }
}
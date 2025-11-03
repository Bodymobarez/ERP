"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowRight,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Building2,
  Receipt,
  Package,
  Wallet,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  LineChart,
  PieChart,
  FileText,
  CreditCard,
  Banknote,
  Target,
  Users,
  Truck,
  Home,
  Activity
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for construction cash flow
const mockCashFlowData = {
  currentMonth: {
    totalInflows: 2500000,
    totalOutflows: 1850000,
    netCashFlow: 650000,
    openingBalance: 1200000,
    closingBalance: 1850000
  },
  projectedNextMonth: {
    totalInflows: 1800000,
    totalOutflows: 2200000,
    netCashFlow: -400000,
    expectedBalance: 1450000
  },
  yearToDate: {
    totalInflows: 15500000,
    totalOutflows: 12800000,
    netCashFlow: 2700000
  }
}

// Weekly cash flow data
const weeklyData = [
  {
    week: "الأسبوع الأول",
    date: "1-7 يناير",
    inflow: 750000,
    outflow: 420000,
    netFlow: 330000,
    cumulativeBalance: 1530000,
    details: {
      collections: 600000,
      progressPayments: 150000,
      supplierPayments: 280000,
      wages: 140000
    }
  },
  {
    week: "الأسبوع الثاني", 
    date: "8-14 يناير",
    inflow: 1200000,
    outflow: 580000,
    netFlow: 620000,
    cumulativeBalance: 2150000,
    details: {
      collections: 1000000,
      progressPayments: 200000,
      supplierPayments: 380000,
      wages: 200000
    }
  },
  {
    week: "الأسبوع الثالث",
    date: "15-21 يناير", 
    inflow: 350000,
    outflow: 650000,
    netFlow: -300000,
    cumulativeBalance: 1850000,
    details: {
      collections: 200000,
      progressPayments: 150000,
      supplierPayments: 450000,
      wages: 200000
    }
  },
  {
    week: "الأسبوع الرابع",
    date: "22-31 يناير",
    inflow: 200000,
    outflow: 200000,
    netFlow: 0,
    cumulativeBalance: 1850000,
    details: {
      collections: 100000,
      progressPayments: 100000,
      supplierPayments: 120000,
      wages: 80000
    }
  }
]

// Monthly projections
const monthlyProjections = [
  {
    month: "فبراير 2024",
    inflows: {
      progressPayments: 800000,
      clientPayments: 600000,
      advancePayments: 200000,
      retentionRelease: 100000,
      other: 50000,
      total: 1750000
    },
    outflows: {
      supplierPayments: 650000,
      wages: 400000,
      equipment: 250000,
      overhead: 150000,
      taxes: 200000,
      loan: 100000,
      other: 50000,
      total: 1800000
    },
    netFlow: -50000,
    cumulativeBalance: 1800000
  },
  {
    month: "مارس 2024",
    inflows: {
      progressPayments: 1200000,
      clientPayments: 800000,
      advancePayments: 0,
      retentionRelease: 150000,
      other: 50000,
      total: 2200000
    },
    outflows: {
      supplierPayments: 800000,
      wages: 450000,
      equipment: 300000,
      overhead: 150000,
      taxes: 250000,
      loan: 100000,
      other: 50000,
      total: 2100000
    },
    netFlow: 100000,
    cumulativeBalance: 1900000
  },
  {
    month: "أبريل 2024",
    inflows: {
      progressPayments: 1500000,
      clientPayments: 900000,
      advancePayments: 300000,
      retentionRelease: 200000,
      other: 100000,
      total: 3000000
    },
    outflows: {
      supplierPayments: 1000000,
      wages: 500000,
      equipment: 400000,
      overhead: 180000,
      taxes: 300000,
      loan: 100000,
      other: 70000,
      total: 2550000
    },
    netFlow: 450000,
    cumulativeBalance: 2350000
  }
]

// Cash flow categories for analysis
const cashFlowCategories = {
  inflows: [
    { name: "مستخلصات العملاء", amount: 1200000, percentage: 48, color: "bg-green-100 text-green-800", icon: Receipt },
    { name: "دفعات مقدمة", amount: 600000, percentage: 24, color: "bg-blue-100 text-blue-800", icon: CreditCard },
    { name: "إفراج استقطاعات", amount: 400000, percentage: 16, color: "bg-purple-100 text-purple-800", icon: Wallet },
    { name: "مبيعات مباشرة", amount: 200000, percentage: 8, color: "bg-yellow-100 text-yellow-800", icon: Banknote },
    { name: "أخرى", amount: 100000, percentage: 4, color: "bg-gray-100 text-gray-800", icon: FileText }
  ],
  outflows: [
    { name: "مدفوعات الموردين", amount: 800000, percentage: 43, color: "bg-red-100 text-red-800", icon: Package },
    { name: "أجور العمال", amount: 450000, percentage: 24, color: "bg-orange-100 text-orange-800", icon: Users },
    { name: "معدات وآلات", amount: 300000, percentage: 16, color: "bg-indigo-100 text-indigo-800", icon: Truck },
    { name: "مصاريف إدارية", amount: 200000, percentage: 11, color: "bg-teal-100 text-teal-800", icon: Home },
    { name: "ضرائب ورسوم", amount: 100000, percentage: 6, color: "bg-pink-100 text-pink-800", icon: FileText }
  ]
}

// Upcoming cash flow events
const upcomingEvents = [
  {
    id: 1,
    type: "inflow",
    date: "2024-02-05",
    description: "مستخلص البرج السكني - الرياض",
    amount: 850000,
    probability: "عالية",
    status: "confirmed",
    project: "البرج السكني"
  },
  {
    id: 2,
    type: "outflow",
    date: "2024-02-07",
    description: "دفعة مورد الحديد - استحقاق",
    amount: 320000,
    probability: "مؤكدة",
    status: "due",
    project: "عدة مشاريع"
  },
  {
    id: 3,
    type: "outflow",
    date: "2024-02-10",
    description: "أجور أسبوعية - موقع الرياض",
    amount: 180000,
    probability: "مؤكدة",
    status: "scheduled",
    project: "البرج السكني"
  },
  {
    id: 4,
    type: "inflow",
    date: "2024-02-15",
    description: "دفعة مقدمة - مشروع جديد",
    amount: 500000,
    probability: "متوسطة",
    status: "expected",
    project: "المجمع التجاري"
  },
  {
    id: 5,
    type: "outflow",
    date: "2024-02-20",
    description: "إيجار معدات شهر فبراير",
    amount: 150000,
    probability: "مؤكدة",
    status: "scheduled",
    project: "عدة مشاريع"
  }
]

export default function CashFlowPage() {
  const { t, lang } = useLanguage()
  const [selectedPeriod, setSelectedPeriod] = useState("weekly")
  const [selectedView, setSelectedView] = useState("overview")

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num.toString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/finance">
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">التدفقات النقدية</h1>
            <p className="text-gray-600 mt-1">إدارة ومراقبة التدفقات النقدية للمشاريع الإنشائية</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 lg:min-w-[200px]">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            إضافة توقع
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الرصيد الحالي</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">
                  {formatCurrency(mockCashFlowData.currentMonth.closingBalance)}
                </p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Wallet className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">التدفق الشهري</p>
                <p className={`text-2xl font-bold mt-1 ${mockCashFlowData.currentMonth.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {mockCashFlowData.currentMonth.netCashFlow >= 0 ? '+' : ''}{formatCurrency(mockCashFlowData.currentMonth.netCashFlow)}
                </p>
              </div>
              <div className={`${mockCashFlowData.currentMonth.netCashFlow >= 0 ? 'bg-green-500' : 'bg-red-500'} text-white p-3 rounded-lg`}>
                {mockCashFlowData.currentMonth.netCashFlow >= 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الوارد الشهري</p>
                <p className="text-2xl font-bold mt-1 text-green-600">
                  {formatCurrency(mockCashFlowData.currentMonth.totalInflows)}
                </p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الصادر الشهري</p>
                <p className="text-2xl font-bold mt-1 text-red-600">
                  {formatCurrency(mockCashFlowData.currentMonth.totalOutflows)}
                </p>
              </div>
              <div className="bg-red-500 text-white p-3 rounded-lg">
                <TrendingDown className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">التوقع القادم</p>
                <p className={`text-2xl font-bold mt-1 ${mockCashFlowData.projectedNextMonth.netCashFlow >= 0 ? 'text-green-600' : 'text-orange-600'}`}>
                  {mockCashFlowData.projectedNextMonth.netCashFlow >= 0 ? '+' : ''}{formatCurrency(mockCashFlowData.projectedNextMonth.netCashFlow)}
                </p>
              </div>
              <div className={`${mockCashFlowData.projectedNextMonth.netCashFlow >= 0 ? 'bg-green-500' : 'bg-orange-500'} text-white p-3 rounded-lg`}>
                <Target className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="weekly">أسبوعي</TabsTrigger>
          <TabsTrigger value="projections">التوقعات</TabsTrigger>
          <TabsTrigger value="analysis">التحليل</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Current Month Summary */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    ملخص الشهر الحالي - يناير 2024
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">الرصيد الافتتاحي</span>
                        <Wallet className="h-4 w-4 text-blue-500" />
                      </div>
                      <p className="text-xl font-bold text-blue-600">
                        {formatCurrency(mockCashFlowData.currentMonth.openingBalance)}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">إجمالي الوارد</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-xl font-bold text-green-600">
                        {formatCurrency(mockCashFlowData.currentMonth.totalInflows)}
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">إجمالي الصادر</span>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="text-xl font-bold text-red-600">
                        {formatCurrency(mockCashFlowData.currentMonth.totalOutflows)}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">الرصيد النهائي</span>
                        <Activity className="h-4 w-4 text-purple-500" />
                      </div>
                      <p className="text-xl font-bold text-purple-600">
                        {formatCurrency(mockCashFlowData.currentMonth.closingBalance)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">صافي التدفق النقدي</span>
                      <span className={`text-lg font-bold ${mockCashFlowData.currentMonth.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {mockCashFlowData.currentMonth.netCashFlow >= 0 ? '+' : ''}
                        {formatCurrency(mockCashFlowData.currentMonth.netCashFlow)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${mockCashFlowData.currentMonth.netCashFlow >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ 
                          width: `${Math.min(Math.abs(mockCashFlowData.currentMonth.netCashFlow) / Math.max(mockCashFlowData.currentMonth.totalInflows, mockCashFlowData.currentMonth.totalOutflows) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    الأحداث المالية القادمة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.slice(0, 5).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${event.type === 'inflow' ? 'bg-green-100' : 'bg-red-100'}`}>
                            {event.type === 'inflow' ? 
                              <TrendingUp className="h-4 w-4 text-green-600" /> : 
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            }
                          </div>
                          <div>
                            <p className="font-medium text-sm">{event.description}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span>{event.date}</span>
                              <Badge variant="outline" className="text-xs">{event.project}</Badge>
                              <Badge className={`text-xs ${
                                event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                event.status === 'due' ? 'bg-red-100 text-red-800' :
                                event.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {event.status === 'confirmed' ? 'مؤكد' :
                                 event.status === 'due' ? 'مستحق' :
                                 event.status === 'scheduled' ? 'مجدول' : 'متوقع'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${event.type === 'inflow' ? 'text-green-600' : 'text-red-600'}`}>
                            {event.type === 'inflow' ? '+' : '-'}{formatCurrency(event.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">السيولة المتاحة</span>
                      <span className="font-medium text-green-600">ممتازة</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">دورة التحصيل</span>
                      <span className="font-medium">28 يوم</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">دورة الدفع</span>
                      <span className="font-medium">35 يوم</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">نسبة السيولة</span>
                      <span className="font-medium text-blue-600">1.35</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cash Position */}
              <Card>
                <CardHeader>
                  <CardTitle>الوضع النقدي</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">في البنوك</span>
                      <span className="font-medium">{formatCurrency(1500000)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">في الصندوق</span>
                      <span className="font-medium">{formatCurrency(50000)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">استثمارات قصيرة</span>
                      <span className="font-medium">{formatCurrency(300000)}</span>
                    </div>
                    <div className="border-t pt-2 flex items-center justify-between font-bold">
                      <span>الإجمالي</span>
                      <span className="text-blue-600">{formatCurrency(1850000)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    تنبيهات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-medium text-yellow-800">دفعة مستحقة غداً</p>
                      <p className="text-xs text-yellow-600">مورد الحديد - 320,000 ريال</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">مستخلص معلق</p>
                      <p className="text-xs text-blue-600">البرج السكني - 850,000 ريال</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-800">وصل دفعة جديدة</p>
                      <p className="text-xs text-green-600">تم استلام 500,000 ريال</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التدفق النقدي الأسبوعي - يناير 2024</CardTitle>
              <CardDescription>تفصيل التدفقات النقدية على مستوى الأسابيع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((week, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{week.week}</h3>
                        <p className="text-sm text-gray-600">{week.date}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-600">وارد</p>
                          <p className="font-bold text-green-600">{formatCurrency(week.inflow)}</p>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded-lg">
                          <p className="text-xs text-gray-600">صادر</p>
                          <p className="font-bold text-red-600">{formatCurrency(week.outflow)}</p>
                        </div>
                        <div className={`text-center p-2 rounded-lg ${week.netFlow >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
                          <p className="text-xs text-gray-600">صافي</p>
                          <p className={`font-bold ${week.netFlow >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                            {week.netFlow >= 0 ? '+' : ''}{formatCurrency(week.netFlow)}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded-lg">
                          <p className="text-xs text-gray-600">الرصيد</p>
                          <p className="font-bold text-purple-600">{formatCurrency(week.cumulativeBalance)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                      <div className="p-2 bg-green-100 rounded">
                        <p className="text-xs text-gray-600">تحصيلات</p>
                        <p className="font-medium text-green-700">{formatCurrency(week.details.collections)}</p>
                      </div>
                      <div className="p-2 bg-blue-100 rounded">
                        <p className="text-xs text-gray-600">مستخلصات</p>
                        <p className="font-medium text-blue-700">{formatCurrency(week.details.progressPayments)}</p>
                      </div>
                      <div className="p-2 bg-red-100 rounded">
                        <p className="text-xs text-gray-600">موردين</p>
                        <p className="font-medium text-red-700">{formatCurrency(week.details.supplierPayments)}</p>
                      </div>
                      <div className="p-2 bg-orange-100 rounded">
                        <p className="text-xs text-gray-600">أجور</p>
                        <p className="font-medium text-orange-700">{formatCurrency(week.details.wages)}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${week.netFlow >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ 
                            width: `${Math.min(Math.abs(week.netFlow) / Math.max(week.inflow, week.outflow) * 100, 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>توقعات التدفق النقدي - الأشهر القادمة</CardTitle>
              <CardDescription>التوقعات المالية للشهور القادمة مع التفاصيل</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {monthlyProjections.map((month, index) => (
                  <div key={index} className="border rounded-lg p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                      <h3 className="font-semibold text-xl">{month.month}</h3>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className={`text-center p-3 rounded-lg ${month.netFlow >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                          <p className="text-sm text-gray-600">صافي التدفق</p>
                          <p className={`text-xl font-bold ${month.netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {month.netFlow >= 0 ? '+' : ''}{formatCurrency(month.netFlow)}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-sm text-gray-600">الرصيد المتوقع</p>
                          <p className="text-xl font-bold text-purple-600">{formatCurrency(month.cumulativeBalance)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      {/* Inflows */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-green-600 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          الوارد المتوقع
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-2 bg-green-50 rounded">
                            <span>مستخلصات</span>
                            <span className="font-medium">{formatCurrency(month.inflows.progressPayments)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-green-50 rounded">
                            <span>دفعات العملاء</span>
                            <span className="font-medium">{formatCurrency(month.inflows.clientPayments)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-green-50 rounded">
                            <span>دفعات مقدمة</span>
                            <span className="font-medium">{formatCurrency(month.inflows.advancePayments)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-green-50 rounded">
                            <span>إفراج استقطاعات</span>
                            <span className="font-medium">{formatCurrency(month.inflows.retentionRelease)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-green-50 rounded">
                            <span>أخرى</span>
                            <span className="font-medium">{formatCurrency(month.inflows.other)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-green-100 rounded font-bold">
                            <span>الإجمالي</span>
                            <span>{formatCurrency(month.inflows.total)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Outflows */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-red-600 flex items-center gap-2">
                          <TrendingDown className="h-4 w-4" />
                          الصادر المتوقع
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>مدفوعات الموردين</span>
                            <span className="font-medium">{formatCurrency(month.outflows.supplierPayments)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>أجور العمال</span>
                            <span className="font-medium">{formatCurrency(month.outflows.wages)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>معدات وآلات</span>
                            <span className="font-medium">{formatCurrency(month.outflows.equipment)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>مصاريف إدارية</span>
                            <span className="font-medium">{formatCurrency(month.outflows.overhead)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>ضرائب ورسوم</span>
                            <span className="font-medium">{formatCurrency(month.outflows.taxes)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>أقساط قروض</span>
                            <span className="font-medium">{formatCurrency(month.outflows.loan)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>أخرى</span>
                            <span className="font-medium">{formatCurrency(month.outflows.other)}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-red-100 rounded font-bold">
                            <span>الإجمالي</span>
                            <span>{formatCurrency(month.outflows.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Inflow Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-green-600" />
                  تحليل الوارد النقدي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cashFlowCategories.inflows.map((category, index) => {
                    const Icon = category.icon
                    return (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${category.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-sm text-gray-600">{category.percentage}%</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{formatCurrency(category.amount)}</p>
                          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${category.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Outflow Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-red-600" />
                  تحليل الصادر النقدي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cashFlowCategories.outflows.map((category, index) => {
                    const Icon = category.icon
                    return (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${category.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-sm text-gray-600">{category.percentage}%</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">{formatCurrency(category.amount)}</p>
                          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${category.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Year to Date Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-600" />
                ملخص العام حتى تاريخه
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">إجمالي الوارد</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(mockCashFlowData.yearToDate.totalInflows)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">منذ بداية العام</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">إجمالي الصادر</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(mockCashFlowData.yearToDate.totalOutflows)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">منذ بداية العام</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">صافي التدفق</p>
                  <p className="text-2xl font-bold text-blue-600">
                    +{formatCurrency(mockCashFlowData.yearToDate.netCashFlow)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">منذ بداية العام</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/finance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Receipt className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المستخلصات</h3>
                  <p className="text-sm text-gray-600">إدارة المستخلصات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/finance/budgets">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الميزانيات</h3>
                  <p className="text-sm text-gray-600">تخطيط مالي</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/finance/banking">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">البنوك</h3>
                  <p className="text-sm text-gray-600">الحسابات المصرفية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/finance/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التقارير المالية</h3>
                  <p className="text-sm text-gray-600">تحليل وتقارير</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  BarChart3,
  Plus,
  Building2,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  PieChart,
  FileText,
  Calculator,
  Edit3,
  Trash2,
  Eye,
  Download,
  Filter,
  Search,
  ArrowUp,
  ArrowDown,
  Minus,
  Users,
  Package,
  ArrowRight
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for forecasts
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
    ]
  },
  {
    id: "3",
    title: "توقع التدفق النقدي للنصف الأول",
    type: "cashflow",
    category: "biannual",
    period: "H1 2024",
    amount: 4800000,
    confidence: 78,
    status: "draft",
    createdDate: "2024-01-12",
    lastUpdated: "2024-01-15",
    description: "توقع صافي التدفق النقدي للنصف الأول من العام",
    baselineData: {
      expectedInflows: 22000000,
      expectedOutflows: 17200000,
      netCashFlow: 4800000
    },
    scenarios: {
      conservative: 3200000,
      realistic: 4800000,
      optimistic: 6400000
    },
    factors: [
      { name: "توقيت المقبوضات", impact: "high", value: 40 },
      { name: "المدفوعات للموردين", impact: "medium", value: 35 },
      { name: "المصاريف التشغيلية", impact: "medium", value: 25 }
    ]
  },
  {
    id: "4",
    title: "توقع مبيعات المعدات",
    type: "revenue",
    category: "equipment",
    period: "3 أشهر",
    amount: 3200000,
    confidence: 70,
    status: "under_review",
    createdDate: "2024-01-05",
    lastUpdated: "2024-01-13",
    description: "توقع إيرادات تأجير وبيع المعدات الإنشائية",
    baselineData: {
      rentalRevenue: 2100000,
      salesRevenue: 1100000,
      maintenance: 200000
    },
    scenarios: {
      conservative: 2800000,
      realistic: 3200000,
      optimistic: 3800000
    },
    factors: [
      { name: "الطلب على التأجير", impact: "high", value: 50 },
      { name: "أسعار المعدات", impact: "medium", value: 30 },
      { name: "المنافسة", impact: "low", value: 20 }
    ]
  }
]

const mockRecentForecasts = [
  {
    id: "5",
    title: "توقع أرباح الربع الأول",
    type: "profit",
    amount: 5200000,
    accuracy: 94,
    actualAmount: 5150000,
    variance: -1,
    status: "completed"
  },
  {
    id: "6", 
    title: "توقع تكاليف مشروع المجمع التجاري",
    type: "expense",
    amount: 12800000,
    accuracy: 87,
    actualAmount: 13200000,
    variance: 3.1,
    status: "completed"
  },
  {
    id: "7",
    title: "توقع إيرادات ديسمبر 2023",
    type: "revenue", 
    amount: 6400000,
    accuracy: 91,
    actualAmount: 6520000,
    variance: 1.9,
    status: "completed"
  }
]

const performanceMetrics = {
  totalForecasts: 15,
  activeForecasts: 8,
  averageAccuracy: 88.5,
  trendsImprovement: 12.3,
  lastMonthVariance: 4.2
}

export default function ForecastsPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedForecast, setSelectedForecast] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      revenue: "bg-green-100 text-green-800",
      expense: "bg-red-100 text-red-800", 
      cashflow: "bg-blue-100 text-blue-800",
      profit: "bg-purple-100 text-purple-800"
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: any } = {
      revenue: TrendingUp,
      expense: TrendingDown,
      cashflow: DollarSign,
      profit: Target
    }
    const IconComponent = icons[type] || BarChart3
    return <IconComponent className="h-4 w-4" />
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      active: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      under_review: "bg-blue-100 text-blue-800",
      completed: "bg-gray-100 text-gray-800"
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 75) return "text-yellow-600" 
    return "text-red-600"
  }

  const formatVariance = (variance: number) => {
    const color = variance > 0 ? "text-red-500" : "text-green-500"
    const icon = variance > 0 ? "↑" : "↓"
    return { color, icon, value: Math.abs(variance) }
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-3xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 p-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">التوقعات المالية</h1>
                <p className="text-indigo-100 text-lg">إدارة وتحليل التوقعات والتنبؤات المالية</p>
              </div>
            </div>
            
            <Link href="/dashboard/finance/forecasts/new">
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                <Plus className="h-4 w-4 mr-2" />
                إضافة توقع جديد
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">إجمالي التوقعات</p>
                  <p className="text-white text-xl font-bold">{performanceMetrics.totalForecasts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">التوقعات النشطة</p>
                  <p className="text-white text-xl font-bold">{performanceMetrics.activeForecasts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">متوسط الدقة</p>
                  <p className="text-white text-xl font-bold">{performanceMetrics.averageAccuracy}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">تحسن الاتجاه</p>
                  <p className="text-white text-xl font-bold">+{performanceMetrics.trendsImprovement}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 p-1 bg-gray-100 rounded-xl">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            التوقعات النشطة
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            الأداء والتحليل
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            السجل والتاريخ
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  توقعات الإيرادات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">الربع الحالي</span>
                    <span className="text-xl font-bold text-green-600">{formatCurrency(18500000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">مستوى الثقة</span>
                    <span className="text-sm font-medium text-green-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                  توقعات المصروفات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">المشاريع الجارية</span>
                    <span className="text-xl font-bold text-red-600">{formatCurrency(8200000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">مستوى الثقة</span>
                    <span className="text-sm font-medium text-red-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  التدفق النقدي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">صافي التدفق</span>
                    <span className="text-xl font-bold text-blue-600">{formatCurrency(4800000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">مستوى الثقة</span>
                    <span className="text-sm font-medium text-blue-600">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Forecasts Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                أداء التوقعات الأخيرة
              </CardTitle>
              <CardDescription>مقارنة التوقعات مع النتائج الفعلية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentForecasts.map((forecast) => {
                  const variance = formatVariance(forecast.variance)
                  return (
                    <div key={forecast.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(forecast.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{forecast.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>توقع: {formatCurrency(forecast.amount)}</span>
                            <span>فعلي: {formatCurrency(forecast.actualAmount)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">دقة التوقع</p>
                          <p className="font-bold text-green-600">{forecast.accuracy}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">الانحراف</p>
                          <p className={`font-bold ${variance.color}`}>
                            {variance.icon} {variance.value}%
                          </p>
                        </div>
                        <Badge className={getStatusColor(forecast.status)}>
                          مكتمل
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Forecasts Tab */}
        <TabsContent value="active" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="البحث في التوقعات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterType === "all" ? "default" : "outline"}
                    onClick={() => setFilterType("all")}
                    size="sm"
                  >
                    الكل
                  </Button>
                  <Button
                    variant={filterType === "revenue" ? "default" : "outline"}
                    onClick={() => setFilterType("revenue")}
                    size="sm"
                  >
                    إيرادات
                  </Button>
                  <Button
                    variant={filterType === "expense" ? "default" : "outline"}
                    onClick={() => setFilterType("expense")}
                    size="sm"
                  >
                    مصروفات
                  </Button>
                  <Button
                    variant={filterType === "cashflow" ? "default" : "outline"}
                    onClick={() => setFilterType("cashflow")}
                    size="sm"
                  >
                    تدفق نقدي
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Forecasts List */}
          <div className="grid gap-6">
            {mockForecasts
              .filter(forecast => 
                (filterType === "all" || forecast.type === filterType) &&
                (searchTerm === "" || forecast.title.toLowerCase().includes(searchTerm.toLowerCase()))
              )
              .map((forecast) => (
                <Card key={forecast.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(forecast.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{forecast.title}</CardTitle>
                          <CardDescription>{forecast.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(forecast.type)}>
                          {forecast.type === "revenue" ? "إيرادات" : 
                           forecast.type === "expense" ? "مصروفات" :
                           forecast.type === "cashflow" ? "تدفق نقدي" : "ربح"}
                        </Badge>
                        <Badge className={getStatusColor(forecast.status)}>
                          {forecast.status === "active" ? "نشط" :
                           forecast.status === "draft" ? "مسودة" :
                           forecast.status === "under_review" ? "قيد المراجعة" : "مكتمل"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Main Amount */}
                      <div>
                        <p className="text-sm text-gray-600 mb-1">القيمة المتوقعة</p>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(forecast.amount)}</p>
                        <p className="text-sm text-gray-500 mt-1">للفترة: {forecast.period}</p>
                      </div>

                      {/* Confidence Level */}
                      <div>
                        <p className="text-sm text-gray-600 mb-1">مستوى الثقة</p>
                        <p className={`text-2xl font-bold ${getConfidenceColor(forecast.confidence)}`}>
                          {forecast.confidence}%
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full ${
                              forecast.confidence >= 90 ? 'bg-green-600' :
                              forecast.confidence >= 75 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${forecast.confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Scenarios */}
                      <div>
                        <p className="text-sm text-gray-600 mb-2">السيناريوهات</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-red-600">محافظ</span>
                            <span className="font-medium">{formatCurrency(forecast.scenarios.conservative)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-blue-600">واقعي</span>
                            <span className="font-medium">{formatCurrency(forecast.scenarios.realistic)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-green-600">متفائل</span>
                            <span className="font-medium">{formatCurrency(forecast.scenarios.optimistic)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Key Factors */}
                      <div>
                        <p className="text-sm text-gray-600 mb-2">العوامل الرئيسية</p>
                        <div className="space-y-1">
                          {forecast.factors.slice(0, 3).map((factor, index) => (
                            <div key={index} className="flex justify-between text-xs">
                              <span className={
                                factor.impact === "high" ? "text-red-600" :
                                factor.impact === "medium" ? "text-yellow-600" : "text-green-600"
                              }>
                                {factor.name}
                              </span>
                              <span className="font-medium">{factor.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        آخر تحديث: {new Date(forecast.lastUpdated).toLocaleDateString('ar-SA')}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          عرض
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4 mr-2" />
                          تحرير
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          تصدير
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">متوسط الدقة</p>
                    <p className="text-2xl font-bold text-blue-600">{performanceMetrics.averageAccuracy}%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.1% من الشهر الماضي
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">معدل النجاح</p>
                    <p className="text-2xl font-bold text-green-600">91.2%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +1.8% من الربع الماضي
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">متوسط الانحراف</p>
                    <p className="text-2xl font-bold text-yellow-600">{performanceMetrics.lastMonthVariance}%</p>
                    <p className="text-xs text-red-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +0.3% من الشهر الماضي
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <ArrowRight className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تحسن الاتجاه</p>
                    <p className="text-2xl font-bold text-purple-600">+{performanceMetrics.trendsImprovement}%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      تحسن مستمر
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  دقة التوقعات حسب النوع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">توقعات الإيرادات</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-green-600">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">توقعات المصروفات</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-blue-600">87%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">التدفق النقدي</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "84%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-purple-600">84%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">توقعات الأرباح</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "89%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-yellow-600">89%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-6 w-6 text-purple-600" />
                  توزيع التوقعات النشطة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">إيرادات</span>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">مصروفات</span>
                    </div>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">تدفق نقدي</span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">أخرى</span>
                    </div>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-gray-600" />
                سجل التوقعات المكتملة
              </CardTitle>
              <CardDescription>مراجعة الأداء التاريخي للتوقعات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentForecasts.map((forecast) => {
                  const variance = formatVariance(forecast.variance)
                  return (
                    <div key={forecast.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(forecast.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{forecast.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>متوقع: {formatCurrency(forecast.amount)}</span>
                            <span>فعلي: {formatCurrency(forecast.actualAmount)}</span>
                            <span className={`font-medium ${variance.color}`}>
                              انحراف: {variance.icon} {variance.value}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">دقة التوقع</p>
                          <p className="font-bold text-green-600">{forecast.accuracy}%</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          التقرير
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/finance/cash-flow">
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                التدفق النقدي
              </Button>
            </Link>
            <Link href="/dashboard/projects">
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                المشاريع
              </Button>
            </Link>
            <Link href="/dashboard/finance">
              <Button variant="outline" className="w-full justify-start">
                <Calculator className="h-4 w-4 mr-2" />
                المالية
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                التقارير
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
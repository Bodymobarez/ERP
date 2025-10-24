"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart,
  Calculator,
  Building2,
  Ruler,
  Package,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Info,
  Download,
  Filter,
  Search,
  Calendar,
  Target,
  Activity,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
  Eye,
  Settings,
  ArrowLeft
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockProjects = [
  { id: "1", name: "البرج السكني - الرياض", code: "PRJ-001", status: "active", totalValue: 2500000 },
  { id: "2", name: "مجمع الفلل - جدة", code: "PRJ-002", status: "active", totalValue: 1800000 },
  { id: "3", name: "المجمع التجاري - الدمام", code: "PRJ-003", status: "completed", totalValue: 3200000 }
]

const mockAnalysis = {
  totalProjects: 3,
  totalValue: 7500000,
  avgProjectValue: 2500000,
  totalItems: 156,
  categories: [
    { name: "خرسانة", count: 45, value: 2100000, percentage: 28 },
    { name: "حديد", count: 32, value: 1800000, percentage: 24 },
    { name: "تشطيب", count: 28, value: 1200000, percentage: 16 },
    { name: "كهرباء", count: 25, value: 900000, percentage: 12 },
    { name: "سباكة", count: 20, value: 600000, percentage: 8 },
    { name: "أخرى", count: 6, value: 900000, percentage: 12 }
  ],
  trends: {
    monthly: [
      { month: "يناير", value: 1200000, items: 45 },
      { month: "فبراير", value: 1500000, items: 52 },
      { month: "مارس", value: 1800000, items: 38 },
      { month: "أبريل", value: 2200000, items: 41 },
      { month: "مايو", value: 1900000, items: 35 },
      { month: "يونيو", value: 2100000, items: 48 }
    ],
    quarterly: [
      { quarter: "Q1", value: 4500000, projects: 2 },
      { quarter: "Q2", value: 6200000, projects: 3 },
      { quarter: "Q3", value: 5800000, projects: 2 },
      { quarter: "Q4", value: 7200000, projects: 4 }
    ]
  },
  insights: [
    {
      type: "positive",
      title: "زيادة في قيمة المشاريع",
      description: "ارتفاع 15% في القيمة الإجمالية هذا الشهر",
      value: "+15%",
      icon: TrendingUp
    },
    {
      type: "warning",
      title: "انخفاض في عناصر الخرسانة",
      description: "انخفاض 8% في كمية الخرسانة المطلوبة",
      value: "-8%",
      icon: TrendingDown
    },
    {
      type: "info",
      title: "مشاريع جديدة",
      description: "3 مشاريع جديدة تم إضافتها هذا الأسبوع",
      value: "+3",
      icon: Building2
    }
  ]
}

const mockDetailedAnalysis = [
  {
    project: "البرج السكني - الرياض",
    category: "خرسانة",
    planned: 1200,
    actual: 1150,
    variance: -50,
    variancePercent: -4.2,
    cost: 2100000,
    status: "under"
  },
  {
    project: "البرج السكني - الرياض",
    category: "حديد",
    planned: 85,
    actual: 92,
    variance: 7,
    variancePercent: 8.2,
    cost: 1800000,
    status: "over"
  },
  {
    project: "مجمع الفلل - جدة",
    category: "تشطيب",
    planned: 2500,
    actual: 2480,
    variance: -20,
    variancePercent: -0.8,
    cost: 1200000,
    status: "under"
  },
  {
    project: "المجمع التجاري - الدمام",
    category: "كهرباء",
    planned: 180,
    actual: 195,
    variance: 15,
    variancePercent: 8.3,
    cost: 900000,
    status: "over"
  }
]

export default function BOQAnalysisPage() {
  const { t, lang } = useLanguage()
  const [selectedProject, setSelectedProject] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("overview") // overview, detailed, trends

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-red-600"
    if (variance < 0) return "text-green-600"
    return "text-gray-600"
  }

  const getVarianceIcon = (variance: number) => {
    if (variance > 0) return <ArrowUp className="h-4 w-4" />
    if (variance < 0) return <ArrowDown className="h-4 w-4" />
    return <Minus className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/projects/bom">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                العودة لـ BOQ
              </Button>
            </Link>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">تحليل حصر الكميات</h1>
              <p className="text-purple-100 text-lg">تحليل شامل وتقارير ذكية لـ BOQ</p>
            </div>
          </div>
          <div className="hidden lg:flex gap-3">
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
              <Download className="h-5 w-5 mr-2" />
              تصدير التقرير
            </Button>
            <Button className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg">
              <Settings className="h-5 w-5 mr-2" />
              إعدادات التحليل
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="flex gap-2">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">جميع المشاريع</option>
              {mockProjects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="monthly">شهري</option>
              <option value="quarterly">ربعي</option>
              <option value="yearly">سنوي</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">جميع التصنيفات</option>
              {mockAnalysis.categories.map(category => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("overview")}
              className={`px-3 py-2 ${viewMode === "overview" ? "bg-purple-500 text-white" : "bg-white"}`}
            >
              <BarChart3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("detailed")}
              className={`px-3 py-2 ${viewMode === "detailed" ? "bg-purple-500 text-white" : "bg-white"}`}
            >
              <Calculator className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("trends")}
              className={`px-3 py-2 ${viewMode === "trends" ? "bg-purple-500 text-white" : "bg-white"}`}
            >
              <TrendingUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">إجمالي القيمة</p>
                <p className="text-4xl font-bold text-gray-900">{mockAnalysis.totalValue.toLocaleString()}</p>
                <p className="text-xs text-purple-600 mt-2">ريال سعودي</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">عدد المشاريع</p>
                <p className="text-4xl font-bold text-blue-600">{mockAnalysis.totalProjects}</p>
                <p className="text-xs text-blue-600 mt-2">مشروع نشط</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">إجمالي العناصر</p>
                <p className="text-4xl font-bold text-green-600">{mockAnalysis.totalItems}</p>
                <p className="text-xs text-green-600 mt-2">عنصر في BOQ</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">متوسط القيمة</p>
                <p className="text-4xl font-bold text-orange-600">{mockAnalysis.avgProjectValue.toLocaleString()}</p>
                <p className="text-xs text-orange-600 mt-2">ريال للمشروع</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                <Calculator className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockAnalysis.insights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <Card key={index} className={`${
              insight.type === 'positive' ? 'border-green-200 bg-green-50' :
              insight.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
              'border-blue-200 bg-blue-50'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    insight.type === 'positive' ? 'bg-green-100' :
                    insight.type === 'warning' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      insight.type === 'positive' ? 'text-green-600' :
                      insight.type === 'warning' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <div className="text-2xl font-bold text-gray-900">{insight.value}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-6 w-6 text-purple-600" />
            تحليل التصنيفات
          </CardTitle>
          <CardDescription>توزيع القيمة والكميات حسب التصنيف</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAnalysis.categories.map((category, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{category.name}</h3>
                  <Badge variant="outline">{category.count} عنصر</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>القيمة</span>
                    <span className="font-semibold">{category.value.toLocaleString()} ريال</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">{category.percentage}% من الإجمالي</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Table */}
      {viewMode === "detailed" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-blue-600" />
              التحليل التفصيلي
            </CardTitle>
            <CardDescription>مقارنة المخطط مقابل الفعلي</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-3 font-semibold">المشروع</th>
                    <th className="text-right p-3 font-semibold">التصنيف</th>
                    <th className="text-right p-3 font-semibold">مخطط</th>
                    <th className="text-right p-3 font-semibold">فعلي</th>
                    <th className="text-right p-3 font-semibold">الانحراف</th>
                    <th className="text-right p-3 font-semibold">النسبة</th>
                    <th className="text-right p-3 font-semibold">التكلفة</th>
                    <th className="text-right p-3 font-semibold">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDetailedAnalysis.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{item.project}</td>
                      <td className="p-3">
                        <Badge variant="outline">{item.category}</Badge>
                      </td>
                      <td className="p-3">{item.planned.toLocaleString()}</td>
                      <td className="p-3">{item.actual.toLocaleString()}</td>
                      <td className="p-3">
                        <div className={`flex items-center gap-1 ${getVarianceColor(item.variance)}`}>
                          {getVarianceIcon(item.variance)}
                          <span>{item.variance > 0 ? '+' : ''}{item.variance}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={getVarianceColor(item.variancePercent)}>
                          {item.variancePercent > 0 ? '+' : ''}{item.variancePercent}%
                        </span>
                      </td>
                      <td className="p-3 font-semibold">{item.cost.toLocaleString()} ريال</td>
                      <td className="p-3">
                        <Badge className={
                          item.status === 'over' ? 'bg-red-100 text-red-800' :
                          item.status === 'under' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {item.status === 'over' ? 'أعلى من المخطط' :
                           item.status === 'under' ? 'أقل من المخطط' : 'مطابق'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trends Analysis */}
      {viewMode === "trends" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                الاتجاه الشهري
              </CardTitle>
              <CardDescription>تطور القيمة والعناصر شهرياً</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalysis.trends.monthly.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{month.month}</h4>
                      <p className="text-sm text-gray-600">{month.items} عنصر</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{month.value.toLocaleString()} ريال</p>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                          style={{ width: `${(month.value / 2500000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-blue-600" />
                الاتجاه الربعي
              </CardTitle>
              <CardDescription>تطور المشاريع ربعياً</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalysis.trends.quarterly.map((quarter, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{quarter.quarter}</h4>
                      <p className="text-sm text-gray-600">{quarter.projects} مشروع</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{quarter.value.toLocaleString()} ريال</p>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                          style={{ width: `${(quarter.value / 8000000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/projects/bom">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Ruler className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">قائمة BOQ</h3>
                  <p className="text-sm text-gray-600">عرض حصر الكميات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/bom/export">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تصدير</h3>
                  <p className="text-sm text-gray-600">تصدير BOQ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/bom/templates">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">القوالب</h3>
                  <p className="text-sm text-gray-600">إدارة القوالب</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المشاريع</h3>
                  <p className="text-sm text-gray-600">العودة للمشاريع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

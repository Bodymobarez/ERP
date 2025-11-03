"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Calculator,
  PieChart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  Eye,
  Download,
  Calendar,
  Filter,
  Search,
  Target,
  AlertTriangle,
  CheckCircle2,
  Building2,
  DollarSign,
  Users,
  Package,
  Wrench,
  Activity,
  Settings,
  ArrowUp,
  ArrowDown,
  Minus,
  Copy,
  FileText,
  Clock,
  Zap
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for budgets
const mockBudgets = [
  {
    id: "budget-2024",
    name: "ميزانية العام المالي 2024",
    year: 2024,
    period: "annual",
    status: "active",
    totalBudget: 85000000,
    totalSpent: 42500000,
    remainingBudget: 42500000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    approvedBy: "محمد الأحمد - المدير المالي",
    approvedDate: "2023-12-15",
    lastUpdated: "2024-01-15",
    categories: [
      {
        id: "construction",
        name: "مشاريع الإنشاءات",
        budgeted: 45000000,
        spent: 28500000,
        remaining: 16500000,
        percentage: 63.3,
        status: "on_track",
        subcategories: [
          { name: "المواد الإنشائية", budgeted: 25000000, spent: 16200000 },
          { name: "العمالة", budgeted: 15000000, spent: 9800000 },
          { name: "المعدات", budgeted: 5000000, spent: 2500000 }
        ]
      },
      {
        id: "operations",
        name: "العمليات التشغيلية",
        budgeted: 20000000,
        spent: 8200000,
        remaining: 11800000,
        percentage: 41.0,
        status: "under_budget",
        subcategories: [
          { name: "الرواتب والأجور", budgeted: 12000000, spent: 5200000 },
          { name: "المصاريف الإدارية", budgeted: 5000000, spent: 2100000 },
          { name: "التسويق", budgeted: 3000000, spent: 900000 }
        ]
      },
      {
        id: "equipment",
        name: "شراء وصيانة المعدات",
        budgeted: 12000000,
        spent: 4200000,
        remaining: 7800000,
        percentage: 35.0,
        status: "under_budget",
        subcategories: [
          { name: "شراء معدات جديدة", budgeted: 8000000, spent: 2800000 },
          { name: "صيانة المعدات", budgeted: 4000000, spent: 1400000 }
        ]
      },
      {
        id: "development",
        name: "التطوير والتحسين",
        budgeted: 8000000,
        spent: 1600000,
        remaining: 6400000,
        percentage: 20.0,
        status: "under_budget",
        subcategories: [
          { name: "تطوير الأنظمة", budgeted: 5000000, spent: 1000000 },
          { name: "التدريب", budgeted: 3000000, spent: 600000 }
        ]
      }
    ]
  },
  {
    id: "budget-q1-2024",
    name: "ميزانية الربع الأول 2024",
    year: 2024,
    period: "quarterly",
    status: "completed",
    totalBudget: 21250000,
    totalSpent: 22100000,
    remainingBudget: -850000,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    approvedBy: "سارة الخالد - مدير العمليات",
    approvedDate: "2023-12-20",
    lastUpdated: "2024-04-01",
    categories: [
      {
        id: "construction",
        name: "مشاريع الإنشاءات",
        budgeted: 11250000,
        spent: 12800000,
        remaining: -1550000,
        percentage: 113.8,
        status: "over_budget"
      },
      {
        id: "operations",
        name: "العمليات التشغيلية",
        budgeted: 5000000,
        spent: 4800000,
        remaining: 200000,
        percentage: 96.0,
        status: "on_track"
      }
    ]
  }
]

// Mock data for budget analysis
const budgetAnalysis = {
  totalAllocated: 85000000,
  totalSpent: 42500000,
  totalRemaining: 42500000,
  utilizationRate: 50.0,
  projectedOverrun: 2500000,
  topSpendingCategories: [
    { name: "مشاريع الإنشاءات", amount: 28500000, percentage: 67.1 },
    { name: "العمليات التشغيلية", amount: 8200000, percentage: 19.3 },
    { name: "شراء وصيانة المعدات", amount: 4200000, percentage: 9.9 },
    { name: "التطوير والتحسين", amount: 1600000, percentage: 3.8 }
  ],
  monthlyTrend: [
    { month: "يناير", budgeted: 7083333, actual: 6800000 },
    { month: "فبراير", budgeted: 7083333, actual: 7200000 },
    { month: "مارس", budgeted: 7083333, actual: 8100000 },
    { month: "أبريل", budgeted: 7083333, actual: 7400000 },
    { month: "مايو", budgeted: 7083333, actual: 6800000 },
    { month: "يونيو", budgeted: 7083333, actual: 6200000 }
  ]
}

export default function BudgetsPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedBudget, setSelectedBudget] = useState("budget-2024")
  const [searchTerm, setSearchTerm] = useState("")

  const currentBudget = mockBudgets.find(b => b.id === selectedBudget)

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      draft: "bg-yellow-100 text-yellow-800",
      on_track: "bg-green-100 text-green-800",
      under_budget: "bg-blue-100 text-blue-800",
      over_budget: "bg-red-100 text-red-800"
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on_track": return <CheckCircle2 className="h-4 w-4" />
      case "under_budget": return <ArrowDown className="h-4 w-4" />
      case "over_budget": return <ArrowUp className="h-4 w-4" />
      default: return <Minus className="h-4 w-4" />
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage > 100) return "text-red-600"
    if (percentage > 80) return "text-yellow-600"
    return "text-green-600"
  }

  const getCategoryIcon = (categoryId: string) => {
    const icons: { [key: string]: any } = {
      construction: Building2,
      operations: Users,
      equipment: Wrench,
      development: Zap
    }
    const IconComponent = icons[categoryId] || Package
    return <IconComponent className="h-5 w-5" />
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 p-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Calculator className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">إدارة الميزانيات</h1>
                <p className="text-violet-100 text-lg">تخطيط ومتابعة الميزانيات المالية للشركة والمشاريع</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                <Plus className="h-4 w-4 mr-2" />
                ميزانية جديدة
              </Button>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                <Copy className="h-4 w-4 mr-2" />
                نسخ من العام السابق
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">إجمالي الميزانية</p>
                  <p className="text-white text-lg font-bold">{formatCurrency(budgetAnalysis.totalAllocated)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">المصروف</p>
                  <p className="text-white text-lg font-bold">{formatCurrency(budgetAnalysis.totalSpent)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">المتبقي</p>
                  <p className="text-white text-lg font-bold">{formatCurrency(budgetAnalysis.totalRemaining)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">معدل الاستخدام</p>
                  <p className="text-white text-xl font-bold">{budgetAnalysis.utilizationRate}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">تجاوز متوقع</p>
                  <p className="text-white text-lg font-bold">{formatCurrency(budgetAnalysis.projectedOverrun)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">الميزانية:</label>
              <select 
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="px-3 py-2 border rounded-md min-w-[250px]"
              >
                {mockBudgets.map(budget => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
              </select>
              <Badge className={getStatusColor(currentBudget?.status || 'draft')}>
                {currentBudget?.status === "active" ? "نشطة" :
                 currentBudget?.status === "completed" ? "مكتملة" : "مسودة"}
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                تعديل
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 p-1 bg-gray-100 rounded-xl">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            التصنيفات
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            التحليل
          </TabsTrigger>
          <TabsTrigger value="planning" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            التخطيط
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {currentBudget && (
            <>
              {/* Budget Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">إجمالي الميزانية</p>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(currentBudget.totalBudget)}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">المصروف</p>
                        <p className="text-2xl font-bold text-orange-600">{formatCurrency(currentBudget.totalSpent)}</p>
                        <p className="text-sm text-gray-500">{((currentBudget.totalSpent / currentBudget.totalBudget) * 100).toFixed(1)}% من الميزانية</p>
                      </div>
                      <Activity className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className={`border-l-4 ${currentBudget.remainingBudget >= 0 ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">المتبقي</p>
                        <p className={`text-2xl font-bold ${currentBudget.remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(Math.abs(currentBudget.remainingBudget))}
                        </p>
                        <p className="text-sm text-gray-500">
                          {currentBudget.remainingBudget >= 0 ? 'متبقي' : 'تجاوز'}
                        </p>
                      </div>
                      {currentBudget.remainingBudget >= 0 ? 
                        <Target className="h-8 w-8 text-green-500" /> :
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                      }
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>التقدم حسب التصنيف</CardTitle>
                  <CardDescription>نظرة سريعة على استخدام الميزانية لكل تصنيف</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {currentBudget.categories.map((category) => (
                      <div key={category.id} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              {getCategoryIcon(category.id)}
                            </div>
                            <div>
                              <h4 className="font-medium">{category.name}</h4>
                              <p className="text-sm text-gray-600">
                                {formatCurrency(category.spent)} من {formatCurrency(category.budgeted)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(category.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(category.status)}
                                  {category.status === "on_track" ? "على المسار" :
                                   category.status === "under_budget" ? "أقل من المتوقع" : "تجاوز الميزانية"}
                                </div>
                              </Badge>
                              <span className={`font-bold ${getProgressColor(category.percentage)}`}>
                                {category.percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <Progress 
                          value={Math.min(category.percentage, 100)} 
                          className="h-2"
                        />
                        {category.percentage > 100 && (
                          <div className="flex justify-end">
                            <span className="text-xs text-red-600">
                              تجاوز بـ {formatCurrency(category.spent - category.budgeted)}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          {currentBudget && (
            <div className="grid gap-6">
              {currentBudget.categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          {getCategoryIcon(category.id)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>
                            الميزانية المخصصة: {formatCurrency(category.budgeted)}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(category.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(category.status)}
                          {category.status === "on_track" ? "على المسار" :
                           category.status === "under_budget" ? "أقل من المتوقع" : "تجاوز الميزانية"}
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">المخصص</p>
                        <p className="text-xl font-bold text-blue-600">{formatCurrency(category.budgeted)}</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">المصروف</p>
                        <p className="text-xl font-bold text-orange-600">{formatCurrency(category.spent)}</p>
                      </div>
                      <div className={`text-center p-4 rounded-lg ${category.remaining >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                        <p className="text-sm text-gray-600 mb-1">المتبقي</p>
                        <p className={`text-xl font-bold ${category.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(Math.abs(category.remaining))}
                        </p>
                      </div>
                    </div>

                    {/* Subcategories if available */}
                    {(category as any).subcategories && (
                      <div>
                        <h5 className="font-medium mb-3">التصنيفات الفرعية</h5>
                        <div className="space-y-3">
                          {(category as any).subcategories.map((sub: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium">{sub.name}</span>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">
                                  {formatCurrency(sub.spent)} / {formatCurrency(sub.budgeted)}
                                </p>
                                <p className={`text-sm font-medium ${getProgressColor((sub.spent / sub.budgeted) * 100)}`}>
                                  {((sub.spent / sub.budgeted) * 100).toFixed(1)}%
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        تفاصيل
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        تعديل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          {/* Spending Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-600" />
                  توزيع الإنفاق
                </CardTitle>
                <CardDescription>توزيع المصروفات حسب التصنيف</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetAnalysis.topSpendingCategories.map((category, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{category.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{formatCurrency(category.amount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  الاتجاه الشهري
                </CardTitle>
                <CardDescription>مقارنة المخطط مقابل الفعلي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {budgetAnalysis.monthlyTrend.map((month, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{month.month}</span>
                        <span className={month.actual > month.budgeted ? 'text-red-600' : 'text-green-600'}>
                          {formatCurrency(month.actual)} / {formatCurrency(month.budgeted)}
                        </span>
                      </div>
                      <div className="flex gap-1 h-2">
                        <div className="flex-1 bg-blue-200 rounded">
                          <div 
                            className="bg-blue-600 h-2 rounded" 
                            style={{ width: `${(month.budgeted / Math.max(month.budgeted, month.actual)) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex-1 bg-gray-200 rounded">
                          <div 
                            className={`h-2 rounded ${month.actual > month.budgeted ? 'bg-red-600' : 'bg-green-600'}`}
                            style={{ width: `${(month.actual / Math.max(month.budgeted, month.actual)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                تنبيهات الميزانية
              </CardTitle>
              <CardDescription>تنبيهات ومشاكل تحتاج انتباه</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 border border-red-200 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">تجاوز في ميزانية المشاريع</h4>
                    <p className="text-sm text-red-700 mt-1">
                      مشاريع الإنشاءات تجاوزت الميزانية بنسبة 13.8% - يحتاج مراجعة فورية
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">استخدام بطيء للميزانية</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      التطوير والتحسين استخدم 20% فقط من الميزانية - قد يحتاج إعادة تخصيص
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">أداء جيد</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      العمليات التشغيلية تسير وفق الخطة المحددة - 96% من الميزانية المتوقعة
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Planning Tab */}
        <TabsContent value="planning" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Budget Planning Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  أدوات التخطيط
                </CardTitle>
                <CardDescription>أدوات مساعدة في تخطيط الميزانيات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Calculator className="h-4 w-4 mr-2" />
                  حاسبة الميزانية
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  نسخ من ميزانية سابقة
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  توقع بناءً على الاتجاه
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  قوالب الميزانية
                </Button>
              </CardContent>
            </Card>

            {/* Budget Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  قوالب الميزانية
                </CardTitle>
                <CardDescription>قوالب جاهزة لأنواع مختلفة من المشاريع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <h4 className="font-medium">ميزانية مشروع سكني</h4>
                  <p className="text-sm text-gray-600">قالب مخصص للمشاريع السكنية</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <h4 className="font-medium">ميزانية مشروع تجاري</h4>
                  <p className="text-sm text-gray-600">قالب للمجمعات التجارية</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <h4 className="font-medium">ميزانية تشغيلية</h4>
                  <p className="text-sm text-gray-600">للعمليات اليومية للشركة</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Scenarios */}
          <Card>
            <CardHeader>
              <CardTitle>سيناريوهات الميزانية</CardTitle>
              <CardDescription>مقارنة سيناريوهات مختلفة للتخطيط</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-green-600 mb-2">السيناريو المحافظ</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>الإيرادات:</span>
                      <span>{formatCurrency(75000000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المصروفات:</span>
                      <span>{formatCurrency(65000000)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>صافي الربح:</span>
                      <span className="text-green-600">{formatCurrency(10000000)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-blue-600 mb-2">السيناريو المتوقع</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>الإيرادات:</span>
                      <span>{formatCurrency(90000000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المصروفات:</span>
                      <span>{formatCurrency(75000000)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>صافي الربح:</span>
                      <span className="text-blue-600">{formatCurrency(15000000)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-purple-600 mb-2">السيناريو المتفائل</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>الإيرادات:</span>
                      <span>{formatCurrency(110000000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المصروفات:</span>
                      <span>{formatCurrency(85000000)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>صافي الربح:</span>
                      <span className="text-purple-600">{formatCurrency(25000000)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>روابط سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/finance/cash-flow">
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                التدفق النقدي
              </Button>
            </Link>
            <Link href="/dashboard/finance/forecasts">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                التوقعات
              </Button>
            </Link>
            <Link href="/dashboard/finance/reports">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                التقارير
              </Button>
            </Link>
            <Link href="/dashboard/accounting">
              <Button variant="outline" className="w-full justify-start">
                <Calculator className="h-4 w-4 mr-2" />
                المحاسبة
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
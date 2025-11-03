"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText,
  Download,
  Calendar,
  Filter,
  Search,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Calculator,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Settings,
  Plus,
  RefreshCw,
  Users,
  Package,
  CreditCard,
  Receipt,
  Wallet,
  Activity
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for financial reports
const mockReports = [
  {
    id: "rpt-001",
    name: "قائمة الدخل الشاملة",
    nameEn: "Comprehensive Income Statement",
    category: "income",
    description: "تقرير مفصل للإيرادات والمصروفات وصافي الربح",
    lastGenerated: "2024-01-15",
    frequency: "monthly",
    status: "ready",
    size: "2.3 MB",
    format: "PDF",
    icon: TrendingUp,
    color: "bg-green-500",
    data: {
      totalRevenue: 18500000,
      totalExpenses: 12300000,
      netProfit: 6200000,
      profitMargin: 33.5
    }
  },
  {
    id: "rpt-002",
    name: "الميزانية العمومية",
    nameEn: "Balance Sheet",
    category: "balance",
    description: "عرض الأصول والخصوم وحقوق المساهمين",
    lastGenerated: "2024-01-15",
    frequency: "monthly",
    status: "ready",
    size: "1.8 MB",
    format: "PDF",
    icon: BarChart3,
    color: "bg-blue-500",
    data: {
      totalAssets: 45200000,
      totalLiabilities: 18700000,
      equity: 26500000,
      debtRatio: 41.4
    }
  },
  {
    id: "rpt-003",
    name: "قائمة التدفق النقدي",
    nameEn: "Cash Flow Statement",
    category: "cashflow",
    description: "تحليل التدفقات النقدية التشغيلية والاستثمارية والتمويلية",
    lastGenerated: "2024-01-14",
    frequency: "monthly",
    status: "ready",
    size: "2.1 MB",
    format: "PDF",
    icon: DollarSign,
    color: "bg-purple-500",
    data: {
      operatingCashFlow: 8500000,
      investingCashFlow: -3200000,
      financingCashFlow: -1800000,
      netCashFlow: 3500000
    }
  },
  {
    id: "rpt-004",
    name: "تقرير المشاريع المالي",
    nameEn: "Project Financial Report",
    category: "projects",
    description: "تحليل مالي شامل لجميع المشاريع الجارية والمكتملة",
    lastGenerated: "2024-01-13",
    frequency: "weekly",
    status: "ready",
    size: "4.2 MB",
    format: "Excel",
    icon: Building2,
    color: "bg-orange-500",
    data: {
      activeProjects: 12,
      totalProjectValue: 125000000,
      completedValue: 78000000,
      profitability: 18.5
    }
  },
  {
    id: "rpt-005",
    name: "تقرير الحسابات المدينة",
    nameEn: "Accounts Receivable Report",
    category: "receivables",
    description: "تحليل المستحقات من العملاء وفترات التحصيل",
    lastGenerated: "2024-01-12",
    frequency: "weekly",
    status: "ready",
    size: "1.5 MB",
    format: "PDF",
    icon: CreditCard,
    color: "bg-teal-500",
    data: {
      totalReceivables: 15200000,
      overdue: 3200000,
      averageCollectionPeriod: 42,
      overduePercentage: 21.1
    }
  },
  {
    id: "rpt-006",
    name: "تقرير الحسابات الدائنة",
    nameEn: "Accounts Payable Report",
    category: "payables",
    description: "تحليل المستحقات للموردين والمقاولين",
    lastGenerated: "2024-01-11",
    frequency: "weekly",
    status: "ready",
    size: "1.3 MB",
    format: "PDF",
    icon: Receipt,
    color: "bg-red-500",
    data: {
      totalPayables: 8900000,
      overdue: 1200000,
      averagePaymentPeriod: 35,
      overduePercentage: 13.5
    }
  },
  {
    id: "rpt-007",
    name: "تقرير التكاليف التفصيلي",
    nameEn: "Detailed Cost Report",
    category: "costs",
    description: "تحليل تفصيلي للتكاليف حسب المشاريع والأقسام",
    lastGenerated: "2024-01-10",
    frequency: "monthly",
    status: "generating",
    size: "3.8 MB",
    format: "Excel",
    icon: Calculator,
    color: "bg-indigo-500",
    data: {
      materialCosts: 12500000,
      laborCosts: 8200000,
      overheadCosts: 3100000,
      totalCosts: 23800000
    }
  },
  {
    id: "rpt-008",
    name: "تقرير الربحية حسب المشروع",
    nameEn: "Project Profitability Report",
    category: "profitability",
    description: "تحليل الربحية لكل مشروع على حدة",
    lastGenerated: "2024-01-09",
    frequency: "monthly",
    status: "ready",
    size: "2.7 MB",
    format: "PDF",
    icon: Target,
    color: "bg-emerald-500",
    data: {
      profitableProjects: 9,
      totalProjects: 12,
      averageMargin: 16.8,
      bestPerformingProject: "البرج السكني - الرياض"
    }
  }
]

const reportsStats = {
  totalReports: 24,
  readyReports: 20,
  generatingReports: 4,
  scheduleReports: 15,
  downloadedThisMonth: 156
}

export default function FinanceReportsPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedReport, setSelectedReport] = useState(null)

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "ready" && report.status === "ready") ||
                      (selectedTab === "generating" && report.status === "generating") ||
                      (selectedTab === "scheduled" && report.frequency)
    
    return matchesSearch && matchesCategory && matchesTab
  })

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      ready: "bg-green-100 text-green-800",
      generating: "bg-yellow-100 text-yellow-800",
      scheduled: "bg-blue-100 text-blue-800"
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready": return <CheckCircle2 className="h-4 w-4" />
      case "generating": return <RefreshCw className="h-4 w-4 animate-spin" />
      case "scheduled": return <Clock className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      income: TrendingUp,
      balance: BarChart3,
      cashflow: DollarSign,
      projects: Building2,
      receivables: CreditCard,
      payables: Receipt,
      costs: Calculator,
      profitability: Target
    }
    const IconComponent = icons[category] || FileText
    return <IconComponent className="h-5 w-5" />
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 p-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <FileText className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">التقارير المالية</h1>
                <p className="text-indigo-100 text-lg">تقارير شاملة ومتقدمة للوضع المالي والأداء</p>
              </div>
            </div>
            
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
              <Plus className="h-4 w-4 mr-2" />
              إنشاء تقرير مخصص
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">إجمالي التقارير</p>
                  <p className="text-white text-xl font-bold">{reportsStats.totalReports}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">جاهزة</p>
                  <p className="text-white text-xl font-bold">{reportsStats.readyReports}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <RefreshCw className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">قيد الإنشاء</p>
                  <p className="text-white text-xl font-bold">{reportsStats.generatingReports}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">مجدولة</p>
                  <p className="text-white text-xl font-bold">{reportsStats.scheduleReports}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">تم التحميل</p>
                  <p className="text-white text-xl font-bold">{reportsStats.downloadedThisMonth}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 p-1 bg-gray-100 rounded-xl">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            جميع التقارير
          </TabsTrigger>
          <TabsTrigger value="ready" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            جاهزة للتحميل
          </TabsTrigger>
          <TabsTrigger value="generating" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            قيد الإنشاء
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            مجدولة
          </TabsTrigger>
        </TabsList>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="البحث في التقارير..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="all">جميع الفئات</option>
                  <option value="income">قوائم الدخل</option>
                  <option value="balance">الميزانيات</option>
                  <option value="cashflow">التدفق النقدي</option>
                  <option value="projects">المشاريع</option>
                  <option value="receivables">المدينون</option>
                  <option value="payables">الدائنون</option>
                  <option value="costs">التكاليف</option>
                  <option value="profitability">الربحية</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Content */}
        <TabsContent value={selectedTab} className="space-y-6">
          <div className="grid gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${report.color} rounded-lg`}>
                        <report.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{report.name}</h3>
                          <Badge className={getStatusColor(report.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(report.status)}
                              {report.status === "ready" ? "جاهز" :
                               report.status === "generating" ? "قيد الإنشاء" : "مجدول"}
                            </div>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                        
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          {Object.entries(report.data).map(([key, value], index) => (
                            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">
                                {key === 'totalRevenue' ? 'الإيرادات' :
                                 key === 'totalExpenses' ? 'المصروفات' :
                                 key === 'netProfit' ? 'صافي الربح' :
                                 key === 'profitMargin' ? 'هامش الربح' :
                                 key === 'totalAssets' ? 'الأصول' :
                                 key === 'totalLiabilities' ? 'الخصوم' :
                                 key === 'equity' ? 'حقوق الملكية' :
                                 key === 'debtRatio' ? 'نسبة الدين' :
                                 key === 'operatingCashFlow' ? 'التدفق التشغيلي' :
                                 key === 'netCashFlow' ? 'صافي التدفق' :
                                 key === 'activeProjects' ? 'المشاريع النشطة' :
                                 key === 'totalProjectValue' ? 'قيمة المشاريع' :
                                 key === 'totalReceivables' ? 'المستحقات' :
                                 key === 'overdue' ? 'متأخرة' :
                                 key === 'averageCollectionPeriod' ? 'فترة التحصيل' :
                                 key === 'totalPayables' ? 'المستحقات' :
                                 key === 'materialCosts' ? 'تكلفة المواد' :
                                 key === 'laborCosts' ? 'تكلفة العمالة' :
                                 key === 'profitableProjects' ? 'مربحة' :
                                 key === 'averageMargin' ? 'متوسط الهامش' :
                                 key}
                              </p>
                              <p className="font-bold text-blue-600">
                                {typeof value === 'number' && value > 1000 ? formatCurrency(value) :
                                 typeof value === 'number' ? `${value}${key.includes('Percentage') || key.includes('Margin') || key.includes('Ratio') ? '%' : ''}` :
                                 value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right text-sm text-gray-500">
                        <p>آخر إنشاء: {new Date(report.lastGenerated).toLocaleDateString('ar-SA')}</p>
                        <p>الحجم: {report.size} • {report.format}</p>
                        <p>التكرار: {
                          report.frequency === 'daily' ? 'يومي' :
                          report.frequency === 'weekly' ? 'أسبوعي' :
                          report.frequency === 'monthly' ? 'شهري' :
                          report.frequency === 'quarterly' ? 'ربع سنوي' : 'حسب الطلب'
                        }</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          معاينة
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={report.status !== "ready"}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          تحميل
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          إعدادات
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">تقرير سريع للإيرادات</h3>
                <p className="text-green-100 text-sm">إنشاء تقرير فوري للإيرادات الحالية</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
            <Button className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-white/20">
              إنشاء الآن
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">تحليل التدفق النقدي</h3>
                <p className="text-blue-100 text-sm">تحليل فوري للوضع النقدي الحالي</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
            <Button className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-white/20">
              إنشاء الآن
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">تقرير ربحية المشاريع</h3>
                <p className="text-purple-100 text-sm">تحليل أداء المشاريع الحالية</p>
              </div>
              <Target className="h-8 w-8 text-purple-200" />
            </div>
            <Button className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-white/20">
              إنشاء الآن
            </Button>
          </CardContent>
        </Card>
      </div>

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
            <Link href="/dashboard/finance/budgets">
              <Button variant="outline" className="w-full justify-start">
                <Calculator className="h-4 w-4 mr-2" />
                الميزانيات
              </Button>
            </Link>
            <Link href="/dashboard/accounting">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                المحاسبة
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
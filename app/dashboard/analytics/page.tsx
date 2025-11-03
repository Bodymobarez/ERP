"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  BarChart3, TrendingUp, DollarSign, Users, Package, FileText, 
  Building2, FolderKanban, ShoppingCart, UserCheck, ClipboardList,
  Calendar, Clock, AlertTriangle, CheckCircle, XCircle,
  Target, Award, Zap, RefreshCw, Download, Filter, Search,
  ArrowUp, ArrowDown, Eye, ArrowRight, Settings, Bell,
  Briefcase, Globe, CreditCard, Truck, Wrench, Database,
  PieChart, LineChart, Activity, Percent, Calculator,
  BookOpen, HelpCircle, Info, Star
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"

// Mock data for comprehensive analytics
const mockAnalyticsData = {
  // Financial data
  financial: {
    totalRevenue: 2450000,
    totalExpenses: 1280000,
    netProfit: 1170000,
    monthlyRevenue: [180000, 195000, 210000, 185000, 220000, 240000, 235000, 255000, 270000, 245000, 260000, 280000],
    monthlyExpenses: [95000, 105000, 115000, 98000, 125000, 135000, 130000, 145000, 155000, 140000, 150000, 165000],
    revenueGrowth: 15.3,
    expenseGrowth: 8.7,
    profitMargin: 47.8,
    quarterlyProfit: [285000, 315000, 385000, 495000],
    invoiceStats: {
      total: 1234,
      paid: 1156,
      pending: 58,
      overdue: 20,
      totalValue: 2450000,
      averageValue: 1986
    }
  },
  
  // Project data
  projects: {
    active: 24,
    completed: 156,
    planning: 8,
    onHold: 3,
    totalBudget: 5600000,
    completedBudget: 4200000,
    onTimeDelivery: 87,
    budgetUtilization: 92,
    averageProjectDuration: 4.2,
    milestones: {
      total: 89,
      completed: 67,
      pending: 18,
      overdue: 4
    },
    riskDistribution: {
      low: 15,
      medium: 7,
      high: 2,
      critical: 0
    }
  },
  
  // HR data
  hr: {
    totalEmployees: 342,
    activeEmployees: 328,
    onLeave: 9,
    newHires: 15,
    turnoverRate: 8.2,
    attendanceRate: 94.5,
    averageSalary: 8500,
    departmentDistribution: {
      engineering: 125,
      finance: 45,
      hr: 25,
      operations: 89,
      sales: 35,
      management: 23
    },
    leaveStats: {
      annual: 45,
      sick: 12,
      emergency: 8,
      maternity: 3
    }
  },
  
  // Inventory data
  inventory: {
    totalItems: 5678,
    categories: 89,
    lowStock: 45,
    outOfStock: 12,
    totalValue: 1850000,
    avgTurnover: 4.5,
    warehouseUtilization: 78,
    monthlyMovement: [450, 520, 480, 610, 590, 635, 670, 720, 695, 740, 785, 825],
    topCategories: [
      { name: "مواد البناء", value: 450000, items: 1234 },
      { name: "أدوات ومعدات", value: 380000, items: 987 },
      { name: "مواد كهربائية", value: 290000, items: 756 },
      { name: "مواد السباكة", value: 185000, items: 543 },
      { name: "أخرى", value: 545000, items: 2158 }
    ]
  },
  
  // CRM data
  crm: {
    totalClients: 89,
    activeClients: 76,
    newClients: 12,
    lostClients: 3,
    totalDeals: 145,
    closedDeals: 98,
    pipelineValue: 2800000,
    conversionRate: 67.6,
    averageDealSize: 28571,
    clientSatisfaction: 4.3,
    salesFunnel: {
      leads: 234,
      prospects: 89,
      qualified: 56,
      proposals: 34,
      negotiations: 18,
      closed: 12
    }
  },
  
  // Procurement data
  procurement: {
    totalContracts: 67,
    activeContracts: 45,
    expiringSoon: 8,
    totalValue: 3200000,
    suppliers: 156,
    activeSuppliers: 89,
    averageContractValue: 47761,
    onTimeDelivery: 89.5,
    qualityScore: 4.2,
    costSavings: 185000,
    purchaseOrders: {
      total: 234,
      pending: 23,
      approved: 156,
      delivered: 189,
      cancelled: 8
    }
  },
  
  // Equipment data
  equipment: {
    totalEquipment: 234,
    activeEquipment: 198,
    underMaintenance: 12,
    outOfService: 24,
    utilizationRate: 84.6,
    maintenanceCost: 125000,
    fuelConsumption: 45000,
    rentalRevenue: 89000,
    availabilityRate: 92.3,
    categories: {
      construction: 89,
      transportation: 67,
      industrial: 45,
      office: 33
    }
  }
}

export default function AnalyticsPage() {
  const { t, lang } = useLanguage()
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showDetails, setShowDetails] = useState<string | null>(null)
  
  const data = mockAnalyticsData
  
  return (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {lang === 'ar' ? 'التحليلات والتقارير الشاملة' : 'Comprehensive Analytics & Reports'}
          </h1>
          <p className="text-gray-600 mt-1">
            {lang === 'ar' ? 'نظرة شاملة على أداء جميع أجزاء النظام' : 'Complete overview of all system performance'}
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">{lang === 'ar' ? 'اليوم' : 'Today'}</SelectItem>
              <SelectItem value="thisWeek">{lang === 'ar' ? 'هذا الأسبوع' : 'This Week'}</SelectItem>
              <SelectItem value="thisMonth">{lang === 'ar' ? 'هذا الشهر' : 'This Month'}</SelectItem>
              <SelectItem value="thisQuarter">{lang === 'ar' ? 'هذا الربع' : 'This Quarter'}</SelectItem>
              <SelectItem value="thisYear">{lang === 'ar' ? 'هذا العام' : 'This Year'}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {lang === 'ar' ? 'تصدير' : 'Export'}
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            {lang === 'ar' ? 'تحديث' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">
                  {lang === 'ar' ? 'صافي الأرباح' : 'Net Profit'}
                </p>
                <p className="text-2xl font-bold">
                  SAR {(data.financial.netProfit / 1000).toFixed(0)}K
                </p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span className="text-xs">+{data.financial.revenueGrowth}%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">
                  {lang === 'ar' ? 'المشاريع النشطة' : 'Active Projects'}
                </p>
                <p className="text-2xl font-bold">{data.projects.active}</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  <span className="text-xs">{data.projects.onTimeDelivery}% {lang === 'ar' ? 'في الوقت' : 'on time'}</span>
                </div>
              </div>
              <FolderKanban className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">
                  {lang === 'ar' ? 'الموظفون النشطون' : 'Active Employees'}
                </p>
                <p className="text-2xl font-bold">{data.hr.activeEmployees}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span className="text-xs">{data.hr.attendanceRate}% {lang === 'ar' ? 'حضور' : 'attendance'}</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">
                  {lang === 'ar' ? 'العملاء النشطون' : 'Active Clients'}
                </p>
                <p className="text-2xl font-bold">{data.crm.activeClients}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 mr-1" />
                  <span className="text-xs">{data.crm.clientSatisfaction}/5 {lang === 'ar' ? 'رضا' : 'satisfaction'}</span>
                </div>
              </div>
              <Building2 className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Sections */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Financial Analytics */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                {lang === 'ar' ? 'التحليل المالي' : 'Financial Analytics'}
              </CardTitle>
              <CardDescription>
                {lang === 'ar' ? 'الإيرادات والمصروفات والربحية' : 'Revenue, expenses, and profitability'}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              {lang === 'ar' ? 'تفاصيل' : 'Details'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}</span>
                  <span className="font-semibold text-green-600">
                    SAR {(data.financial.totalRevenue / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses'}</span>
                  <span className="font-semibold text-red-600">
                    SAR {(data.financial.totalExpenses / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-medium">{lang === 'ar' ? 'صافي الربح' : 'Net Profit'}</span>
                  <span className="font-bold text-blue-600">
                    SAR {(data.financial.netProfit / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'هامش الربح' : 'Profit Margin'}</span>
                  <span className="font-semibold text-purple-600">
                    {data.financial.profitMargin}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">{lang === 'ar' ? 'إحصائيات الفواتير' : 'Invoice Statistics'}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي الفواتير' : 'Total Invoices'}</span>
                  <Badge variant="outline">{data.financial.invoiceStats.total}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'مدفوعة' : 'Paid'}</span>
                  <Badge className="bg-green-100 text-green-800">{data.financial.invoiceStats.paid}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'معلقة' : 'Pending'}</span>
                  <Badge className="bg-yellow-100 text-yellow-800">{data.financial.invoiceStats.pending}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'متأخرة' : 'Overdue'}</span>
                  <Badge className="bg-red-100 text-red-800">{data.financial.invoiceStats.overdue}</Badge>
                </div>
              </div>
            </div>

            {/* Revenue vs Expenses Chart Placeholder */}
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {lang === 'ar' ? 'رسم بياني للإيرادات مقابل المصروفات' : 'Revenue vs Expenses Chart'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              {lang === 'ar' ? 'إحصائيات سريعة' : 'Quick Stats'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">{lang === 'ar' ? 'المستندات' : 'Documents'}</span>
                </div>
                <span className="font-bold text-blue-900">342</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{lang === 'ar' ? 'المخزون' : 'Inventory'}</span>
                </div>
                <span className="font-bold text-green-900">{data.inventory.totalItems}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">{lang === 'ar' ? 'المعدات' : 'Equipment'}</span>
                </div>
                <span className="font-bold text-purple-900">{data.equipment.totalEquipment}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">{lang === 'ar' ? 'العقود' : 'Contracts'}</span>
                </div>
                <span className="font-bold text-orange-900">{data.procurement.totalContracts}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-pink-600" />
                  <span className="text-sm font-medium">{lang === 'ar' ? 'المعالم' : 'Milestones'}</span>
                </div>
                <span className="font-bold text-pink-900">{data.projects.milestones.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects & HR Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Projects Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-blue-600" />
              {lang === 'ar' ? 'تحليلات المشاريع' : 'Project Analytics'}
            </CardTitle>
            <CardDescription>
              {lang === 'ar' ? 'أداء المشاريع والمعالم' : 'Project performance and milestones'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'نشطة' : 'Active'}</span>
                  <Badge className="bg-blue-100 text-blue-800">{data.projects.active}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'مكتملة' : 'Completed'}</span>
                  <Badge className="bg-green-100 text-green-800">{data.projects.completed}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'تخطيط' : 'Planning'}</span>
                  <Badge className="bg-yellow-100 text-yellow-800">{data.projects.planning}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'متوقفة' : 'On Hold'}</span>
                  <Badge className="bg-red-100 text-red-800">{data.projects.onHold}</Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'التسليم في الوقت' : 'On-Time Delivery'}</span>
                  <span className="font-semibold text-green-600">{data.projects.onTimeDelivery}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'استخدام الميزانية' : 'Budget Utilization'}</span>
                  <span className="font-semibold text-blue-600">{data.projects.budgetUtilization}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'متوسط المدة' : 'Avg Duration'}</span>
                  <span className="font-semibold text-purple-600">{data.projects.averageProjectDuration} {lang === 'ar' ? 'شهر' : 'months'}</span>
                </div>
              </div>
            </div>

            {/* Milestones Status */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">{lang === 'ar' ? 'حالة المعالم' : 'Milestones Status'}</h4>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'مكتملة' : 'Completed'}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-gray-200 rounded-full">
                      <div className="w-10 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">{data.projects.milestones.completed}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'معلقة' : 'Pending'}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-gray-200 rounded-full">
                      <div className="w-6 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">{data.projects.milestones.pending}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'متأخرة' : 'Overdue'}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-gray-200 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">{data.projects.milestones.overdue}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HR Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              {lang === 'ar' ? 'تحليلات الموارد البشرية' : 'HR Analytics'}
            </CardTitle>
            <CardDescription>
              {lang === 'ar' ? 'إحصائيات الموظفين والحضور' : 'Employee statistics and attendance'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي الموظفين' : 'Total Employees'}</span>
                  <span className="font-semibold">{data.hr.totalEmployees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'نشطون' : 'Active'}</span>
                  <span className="font-semibold text-green-600">{data.hr.activeEmployees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'في إجازة' : 'On Leave'}</span>
                  <span className="font-semibold text-yellow-600">{data.hr.onLeave}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'موظفون جدد' : 'New Hires'}</span>
                  <span className="font-semibold text-blue-600">{data.hr.newHires}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'معدل الحضور' : 'Attendance Rate'}</span>
                  <span className="font-semibold text-green-600">{data.hr.attendanceRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'معدل الدوران' : 'Turnover Rate'}</span>
                  <span className="font-semibold text-orange-600">{data.hr.turnoverRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'متوسط الراتب' : 'Avg Salary'}</span>
                  <span className="font-semibold text-purple-600">SAR {data.hr.averageSalary}</span>
                </div>
              </div>
            </div>

            {/* Department Distribution */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">{lang === 'ar' ? 'توزيع الأقسام' : 'Department Distribution'}</h4>
              <div className="space-y-2">
                {Object.entries(data.hr.departmentDistribution).map(([dept, count]) => (
                  <div key={dept} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 capitalize">
                      {lang === 'ar' ? 
                        (dept === 'engineering' ? 'الهندسة' :
                         dept === 'finance' ? 'المالية' :
                         dept === 'hr' ? 'الموارد البشرية' :
                         dept === 'operations' ? 'العمليات' :
                         dept === 'sales' ? 'المبيعات' :
                         dept === 'management' ? 'الإدارة' : dept) : 
                        dept
                      }
                    </span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory & CRM Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inventory Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-600" />
              {lang === 'ar' ? 'تحليلات المخزون' : 'Inventory Analytics'}
            </CardTitle>
            <CardDescription>
              {lang === 'ar' ? 'حالة المخزون والحركة' : 'Stock status and movement'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي المواد' : 'Total Items'}</span>
                  <span className="font-semibold">{data.inventory.totalItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'الفئات' : 'Categories'}</span>
                  <span className="font-semibold text-blue-600">{data.inventory.categories}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'مخزون منخفض' : 'Low Stock'}</span>
                  <Badge className="bg-yellow-100 text-yellow-800">{data.inventory.lowStock}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'نفدت الكمية' : 'Out of Stock'}</span>
                  <Badge className="bg-red-100 text-red-800">{data.inventory.outOfStock}</Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'القيمة الإجمالية' : 'Total Value'}</span>
                  <span className="font-semibold text-green-600">
                    SAR {(data.inventory.totalValue / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'معدل الدوران' : 'Turnover Rate'}</span>
                  <span className="font-semibold text-purple-600">{data.inventory.avgTurnover}x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'استخدام المستودع' : 'Warehouse Utilization'}</span>
                  <span className="font-semibold text-orange-600">{data.inventory.warehouseUtilization}%</span>
                </div>
              </div>
            </div>

            {/* Top Categories */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">{lang === 'ar' ? 'أهم الفئات' : 'Top Categories'}</h4>
              <div className="space-y-2">
                {data.inventory.topCategories.slice(0, 3).map((category, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{category.items} {lang === 'ar' ? 'مادة' : 'items'}</span>
                      <span className="font-medium">SAR {(category.value / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CRM Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-orange-600" />
              {lang === 'ar' ? 'تحليلات العملاء' : 'CRM Analytics'}
            </CardTitle>
            <CardDescription>
              {lang === 'ar' ? 'إحصائيات العملاء والمبيعات' : 'Customer and sales statistics'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي العملاء' : 'Total Clients'}</span>
                  <span className="font-semibold">{data.crm.totalClients}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'نشطون' : 'Active'}</span>
                  <span className="font-semibold text-green-600">{data.crm.activeClients}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'عملاء جدد' : 'New Clients'}</span>
                  <Badge className="bg-blue-100 text-blue-800">{data.crm.newClients}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'عملاء مفقودون' : 'Lost Clients'}</span>
                  <Badge className="bg-red-100 text-red-800">{data.crm.lostClients}</Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'معدل التحويل' : 'Conversion Rate'}</span>
                  <span className="font-semibold text-green-600">{data.crm.conversionRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'متوسط الصفقة' : 'Avg Deal Size'}</span>
                  <span className="font-semibold text-purple-600">SAR {data.crm.averageDealSize}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'رضا العملاء' : 'Satisfaction'}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="font-semibold text-yellow-600">{data.crm.clientSatisfaction}/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Pipeline */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">{lang === 'ar' ? 'قمع المبيعات' : 'Sales Pipeline'}</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'عملاء محتملون' : 'Leads'}</span>
                  <Badge variant="outline">{data.crm.salesFunnel.leads}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'مؤهلون' : 'Qualified'}</span>
                  <Badge className="bg-blue-100 text-blue-800">{data.crm.salesFunnel.qualified}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'عروض' : 'Proposals'}</span>
                  <Badge className="bg-yellow-100 text-yellow-800">{data.crm.salesFunnel.proposals}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'مغلقة' : 'Closed'}</span>
                  <Badge className="bg-green-100 text-green-800">{data.crm.salesFunnel.closed}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Procurement & Equipment Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Procurement Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-indigo-600" />
              {lang === 'ar' ? 'تحليلات المشتريات' : 'Procurement Analytics'}
            </CardTitle>
            <CardDescription>
              {lang === 'ar' ? 'العقود والموردين' : 'Contracts and suppliers'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي العقود' : 'Total Contracts'}</span>
                  <span className="font-semibold">{data.procurement.totalContracts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'نشطة' : 'Active'}</span>
                  <Badge className="bg-green-100 text-green-800">{data.procurement.activeContracts}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'تنتهي قريباً' : 'Expiring Soon'}</span>
                  <Badge className="bg-yellow-100 text-yellow-800">{data.procurement.expiringSoon}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'الموردون النشطون' : 'Active Suppliers'}</span>
                  <span className="font-semibold text-blue-600">{data.procurement.activeSuppliers}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'القيمة الإجمالية' : 'Total Value'}</span>
                  <span className="font-semibold text-green-600">
                    SAR {(data.procurement.totalValue / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'التسليم في الوقت' : 'On-Time Delivery'}</span>
                  <span className="font-semibold text-green-600">{data.procurement.onTimeDelivery}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'نقاط الجودة' : 'Quality Score'}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="font-semibold text-yellow-600">{data.procurement.qualityScore}/5</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'وفورات التكلفة' : 'Cost Savings'}</span>
                  <span className="font-semibold text-purple-600">
                    SAR {(data.procurement.costSavings / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-gray-600" />
              {lang === 'ar' ? 'تحليلات المعدات' : 'Equipment Analytics'}
            </CardTitle>
            <CardDescription>
              {lang === 'ar' ? 'حالة المعدات والصيانة' : 'Equipment status and maintenance'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'إجمالي المعدات' : 'Total Equipment'}</span>
                  <span className="font-semibold">{data.equipment.totalEquipment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'نشطة' : 'Active'}</span>
                  <Badge className="bg-green-100 text-green-800">{data.equipment.activeEquipment}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'قيد الصيانة' : 'Under Maintenance'}</span>
                  <Badge className="bg-yellow-100 text-yellow-800">{data.equipment.underMaintenance}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'خارج الخدمة' : 'Out of Service'}</span>
                  <Badge className="bg-red-100 text-red-800">{data.equipment.outOfService}</Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'معدل الاستخدام' : 'Utilization Rate'}</span>
                  <span className="font-semibold text-green-600">{data.equipment.utilizationRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'معدل التوفر' : 'Availability Rate'}</span>
                  <span className="font-semibold text-blue-600">{data.equipment.availabilityRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'تكلفة الصيانة' : 'Maintenance Cost'}</span>
                  <span className="font-semibold text-red-600">
                    SAR {(data.equipment.maintenanceCost / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang === 'ar' ? 'إيرادات الإيجار' : 'Rental Revenue'}</span>
                  <span className="font-semibold text-green-600">
                    SAR {(data.equipment.rentalRevenue / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System-wide KPIs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            {lang === 'ar' ? 'مؤشرات الأداء الرئيسية للنظام' : 'System-wide Key Performance Indicators'}
          </CardTitle>
          <CardDescription>
            {lang === 'ar' ? 'نظرة شاملة على أداء جميع وحدات النظام' : 'Comprehensive overview of all system modules performance'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">
                SAR {(data.financial.totalRevenue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-blue-700">{lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}</div>
              <div className="flex items-center justify-center mt-1 text-xs text-blue-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{data.financial.revenueGrowth}%
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">{data.projects.onTimeDelivery}%</div>
              <div className="text-sm text-green-700">{lang === 'ar' ? 'التسليم في الوقت' : 'On-Time Delivery'}</div>
              <div className="flex items-center justify-center mt-1 text-xs text-green-600">
                <Target className="h-3 w-3 mr-1" />
                {data.projects.active} {lang === 'ar' ? 'مشروع' : 'projects'}
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <UserCheck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">{data.hr.attendanceRate}%</div>
              <div className="text-sm text-purple-700">{lang === 'ar' ? 'معدل الحضور' : 'Attendance Rate'}</div>
              <div className="flex items-center justify-center mt-1 text-xs text-purple-600">
                <Users className="h-3 w-3 mr-1" />
                {data.hr.activeEmployees} {lang === 'ar' ? 'موظف' : 'employees'}
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">{data.crm.clientSatisfaction}/5</div>
              <div className="text-sm text-orange-700">{lang === 'ar' ? 'رضا العملاء' : 'Client Satisfaction'}</div>
              <div className="flex items-center justify-center mt-1 text-xs text-orange-600">
                <Building2 className="h-3 w-3 mr-1" />
                {data.crm.activeClients} {lang === 'ar' ? 'عميل' : 'clients'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-red-600" />
            {lang === 'ar' ? 'تنبيهات الأداء' : 'Performance Alerts'}
          </CardTitle>
          <CardDescription>
            {lang === 'ar' ? 'تنبيهات مهمة تحتاج إلى انتباه' : 'Important alerts requiring attention'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="font-medium text-yellow-800">
                  {lang === 'ar' ? 'مخزون منخفض' : 'Low Stock Alert'}
                </p>
                <p className="text-sm text-yellow-700">
                  {data.inventory.lowStock} {lang === 'ar' ? 'مادة تحتاج إعادة طلب' : 'items need reordering'}
                </p>
              </div>
              <Button variant="outline" size="sm">
                {lang === 'ar' ? 'عرض' : 'View'}
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <p className="font-medium text-red-800">
                  {lang === 'ar' ? 'فواتير متأخرة' : 'Overdue Invoices'}
                </p>
                <p className="text-sm text-red-700">
                  {data.financial.invoiceStats.overdue} {lang === 'ar' ? 'فاتورة متأخرة السداد' : 'invoices are overdue'}
                </p>
              </div>
              <Button variant="outline" size="sm">
                {lang === 'ar' ? 'متابعة' : 'Follow up'}
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <p className="font-medium text-orange-800">
                  {lang === 'ar' ? 'عقود تنتهي قريباً' : 'Contracts Expiring Soon'}
                </p>
                <p className="text-sm text-orange-700">
                  {data.procurement.expiringSoon} {lang === 'ar' ? 'عقود تحتاج تجديد' : 'contracts need renewal'}
                </p>
              </div>
              <Button variant="outline" size="sm">
                {lang === 'ar' ? 'مراجعة' : 'Review'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Plus,
  Truck,
  Calendar,
  DollarSign,
  FileText,
  Eye,
  Edit,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Building2,
  User,
  Package,
  TrendingUp,
  TrendingDown,
  BarChart3
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock data for rental contracts
const mockRentalContracts = [
  {
    id: "REN-2024-001",
    equipmentId: "1",
    equipmentName: "رافعة برجية 50 طن",
    equipmentType: "رافعات",
    clientName: "شركة البناء المتقدمة",
    clientContact: "+966501234567",
    projectName: "البرج السكني الفاخر",
    startDate: "2024-07-01",
    endDate: "2024-10-01",
    duration: 92, // days
    dailyRate: 1500,
    totalCost: 138000,
    paidAmount: 90000,
    remainingAmount: 48000,
    status: "active",
    paymentStatus: "partial",
    depositAmount: 15000,
    operator: "خالد محمد",
    location: "موقع البرج السكني - الرياض",
    notes: "يشمل المشغل والصيانة",
  },
  {
    id: "REN-2024-002",
    equipmentId: "3",
    equipmentName: "حفارة كاتربيلر 320",
    equipmentType: "معدات حفر",
    clientName: "مقاولات الخليج",
    clientContact: "+966557654321",
    projectName: "مشروع البنية التحتية",
    startDate: "2024-06-15",
    endDate: "2024-08-15",
    duration: 62,
    dailyRate: 800,
    totalCost: 49600,
    paidAmount: 49600,
    remainingAmount: 0,
    status: "completed",
    paymentStatus: "paid",
    depositAmount: 8000,
    operator: "سعيد القحطاني",
    location: "موقع المجمع التجاري - الدمام",
    notes: "",
  },
  {
    id: "REN-2024-003",
    equipmentId: "4",
    equipmentName: "شاحنة نقل 10 طن",
    equipmentType: "معدات نقل",
    clientName: "شركة النقل السريع",
    clientContact: "+966539876543",
    projectName: "نقل مواد البناء",
    startDate: "2024-07-20",
    endDate: "2024-08-20",
    duration: 31,
    dailyRate: 500,
    totalCost: 15500,
    paidAmount: 0,
    remainingAmount: 15500,
    status: "active",
    paymentStatus: "pending",
    depositAmount: 5000,
    operator: "فهد السالم",
    location: "متعدد المواقع - الرياض",
    notes: "يشمل السائق والوقود",
  },
  {
    id: "REN-2024-004",
    equipmentId: "2",
    equipmentName: "خلاطة خرسانة 1.5 م³",
    equipmentType: "معدات خرسانة",
    clientName: "مقاولات الإنشاء",
    clientContact: "+966512345678",
    projectName: "بناء فيلا سكنية",
    startDate: "2024-05-01",
    endDate: "2024-06-30",
    duration: 60,
    dailyRate: 300,
    totalCost: 18000,
    paidAmount: 18000,
    remainingAmount: 0,
    status: "completed",
    paymentStatus: "paid",
    depositAmount: 3000,
    operator: "أحمد علي",
    location: "موقع الفيلا - جدة",
    notes: "",
  },
  {
    id: "REN-2024-005",
    equipmentId: "5",
    equipmentName: "مولد كهرباء 500 كيلو وات",
    equipmentType: "مولدات",
    clientName: "شركة الفعاليات الكبرى",
    clientContact: "+966523456789",
    projectName: "معرض الرياض الدولي",
    startDate: "2024-08-01",
    endDate: "2024-08-10",
    duration: 10,
    dailyRate: 2000,
    totalCost: 20000,
    paidAmount: 10000,
    remainingAmount: 10000,
    status: "upcoming",
    paymentStatus: "partial",
    depositAmount: 10000,
    operator: "عبدالله النمر",
    location: "مركز المعارض - الرياض",
    notes: "يشمل الفني والصيانة",
  },
]

export default function EquipmentRentalPage() {
  const { t, lang } = useLanguage()
  const [activeTab, setActiveTab] = useState("contracts") // "contracts", "revenue", "calendar"
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("all")

  const filteredContracts = mockRentalContracts.filter(contract => {
    const matchesSearch = contract.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contract.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || contract.status === filterStatus
    const matchesPayment = filterPaymentStatus === "all" || contract.paymentStatus === filterPaymentStatus
    return matchesSearch && matchesStatus && matchesPayment
  })

  // Calculate statistics
  const stats = {
    totalContracts: mockRentalContracts.length,
    activeContracts: mockRentalContracts.filter(c => c.status === 'active').length,
    upcomingContracts: mockRentalContracts.filter(c => c.status === 'upcoming').length,
    completedContracts: mockRentalContracts.filter(c => c.status === 'completed').length,
    totalRevenue: mockRentalContracts.reduce((sum, c) => sum + c.totalCost, 0),
    paidRevenue: mockRentalContracts.reduce((sum, c) => sum + c.paidAmount, 0),
    pendingPayments: mockRentalContracts.reduce((sum, c) => sum + c.remainingAmount, 0),
    avgDailyRate: (mockRentalContracts.reduce((sum, c) => sum + c.dailyRate, 0) / mockRentalContracts.length).toFixed(0),
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">مكتمل</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">قادم</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">ملغي</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">غير معروف</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">مدفوع</Badge>
      case "partial":
        return <Badge className="bg-yellow-100 text-yellow-800">جزئي</Badge>
      case "pending":
        return <Badge className="bg-red-100 text-red-800">معلق</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">غير معروف</Badge>
    }
  }

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/equipment">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للمعدات
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة تأجير المعدات</h1>
          <p className="text-gray-600 mt-1">متابعة عقود التأجير والإيرادات</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي العقود</p>
                <p className="text-2xl font-bold">{stats.totalContracts}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">عقود نشطة</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeContracts}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">عقود قادمة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.upcomingContracts}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">عقود مكتملة</p>
                <p className="text-2xl font-bold text-gray-600">{stats.completedContracts}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Package className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                <p className="text-xl font-bold text-purple-600">{(stats.totalRevenue / 1000).toFixed(0)}K</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المدفوعات</p>
                <p className="text-xl font-bold text-green-600">{(stats.paidRevenue / 1000).toFixed(0)}K</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معلقة</p>
                <p className="text-xl font-bold text-red-600">{(stats.pendingPayments / 1000).toFixed(0)}K</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط/يوم</p>
                <p className="text-xl font-bold text-orange-600">{stats.avgDailyRate}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <Button
          variant="ghost"
          className={cn("rounded-none border-b-2 border-transparent", activeTab === "contracts" && "border-blue-500 text-blue-600")}
          onClick={() => setActiveTab("contracts")}
        >
          العقود
        </Button>
        <Button
          variant="ghost"
          className={cn("rounded-none border-b-2 border-transparent", activeTab === "revenue" && "border-blue-500 text-blue-600")}
          onClick={() => setActiveTab("revenue")}
        >
          الإيرادات
        </Button>
        <Button
          variant="ghost"
          className={cn("rounded-none border-b-2 border-transparent", activeTab === "calendar" && "border-blue-500 text-blue-600")}
          onClick={() => setActiveTab("calendar")}
        >
          التقويم
        </Button>
      </div>

      {/* Contracts Tab */}
      {activeTab === "contracts" && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في عقود التأجير..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="upcoming">قادم</option>
              <option value="completed">مكتمل</option>
              <option value="cancelled">ملغي</option>
            </select>
            <select
              value={filterPaymentStatus}
              onChange={(e) => setFilterPaymentStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الدفعات</option>
              <option value="paid">مدفوع</option>
              <option value="partial">جزئي</option>
              <option value="pending">معلق</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
            <Link href="/dashboard/equipment/rental/new">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                عقد جديد
              </Button>
            </Link>
          </div>

          <div className="grid gap-4">
            {filteredContracts.map((contract) => {
              const daysRemaining = calculateDaysRemaining(contract.endDate)
              const paymentPercentage = (contract.paidAmount / contract.totalCost * 100).toFixed(0)
              
              return (
                <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <Truck className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{contract.equipmentName}</CardTitle>
                            <Badge className="bg-purple-100 text-purple-800 text-xs">{contract.equipmentType}</Badge>
                          </div>
                          <CardDescription className="mt-1">
                            {contract.id} • {contract.clientName}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(contract.status)}
                        {getPaymentStatusBadge(contract.paymentStatus)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Project & Dates */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">المشروع</p>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <p className="text-sm font-medium">{contract.projectName}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">المدة</p>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <p className="text-sm">{contract.startDate} - {contract.endDate}</p>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {contract.duration} يوم
                            {contract.status === 'active' && daysRemaining > 0 && (
                              <span className="text-blue-600"> • متبقي {daysRemaining} يوم</span>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">المشغل</p>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <p className="text-sm">{contract.operator}</p>
                          </div>
                        </div>
                      </div>

                      {/* Financial Info */}
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">القيمة الإجمالية</p>
                          <p className="text-xl font-bold text-green-600">{formatCurrency(contract.totalCost, lang === 'ar' ? 'SAR' : 'USD')}</p>
                          <p className="text-xs text-gray-600 mt-1">{contract.dailyRate} ريال/يوم</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-blue-50 rounded">
                            <p className="text-xs text-gray-600">مدفوع</p>
                            <p className="text-sm font-bold text-blue-600">{(contract.paidAmount / 1000).toFixed(0)}K</p>
                          </div>
                          <div className="p-2 bg-red-50 rounded">
                            <p className="text-xs text-gray-600">متبقي</p>
                            <p className="text-sm font-bold text-red-600">{(contract.remainingAmount / 1000).toFixed(0)}K</p>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>نسبة الدفع</span>
                            <span>{paymentPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all"
                              style={{ width: `${paymentPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Info & Actions */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">جهة الاتصال</p>
                          <p className="text-sm font-medium direction-ltr text-right">{contract.clientContact}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">الموقع</p>
                          <p className="text-sm">{contract.location}</p>
                        </div>
                        {contract.notes && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">ملاحظات</p>
                            <p className="text-xs text-gray-600 italic">{contract.notes}</p>
                          </div>
                        )}
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            عرض
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            تعديل
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Revenue Tab */}
      {activeTab === "revenue" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>إجمالي الإيرادات</CardTitle>
                <CardDescription>من جميع العقود</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-purple-600">{formatCurrency(stats.totalRevenue, lang === 'ar' ? 'SAR' : 'USD')}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 font-medium">+15%</span>
                  <span className="text-gray-600">مقارنة بالشهر الماضي</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المدفوعات المستلمة</CardTitle>
                <CardDescription>المبالغ المحصلة</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-600">{formatCurrency(stats.paidRevenue, lang === 'ar' ? 'SAR' : 'USD')}</p>
                <div className="mt-2 text-sm text-gray-600">
                  {((stats.paidRevenue / stats.totalRevenue) * 100).toFixed(1)}% من الإجمالي
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>مدفوعات معلقة</CardTitle>
                <CardDescription>مستحقة للتحصيل</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-red-600">{formatCurrency(stats.pendingPayments, lang === 'ar' ? 'SAR' : 'USD')}</p>
                <div className="mt-2 text-sm text-gray-600">
                  {((stats.pendingPayments / stats.totalRevenue) * 100).toFixed(1)}% من الإجمالي
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>الإيرادات حسب نوع المعدة</CardTitle>
              <CardDescription>توزيع الإيرادات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "رافعات", revenue: 138000, percentage: 62, color: "bg-blue-600" },
                  { type: "معدات حفر", revenue: 49600, percentage: 22, color: "bg-purple-600" },
                  { type: "مولدات", revenue: 20000, percentage: 9, color: "bg-green-600" },
                  { type: "معدات نقل", revenue: 15500, percentage: 7, color: "bg-orange-600" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{item.type}</span>
                      <span className="text-gray-600">{formatCurrency(item.revenue, lang === 'ar' ? 'SAR' : 'USD')} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${item.color} h-3 rounded-full transition-all`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تحليل الإيرادات الشهرية</CardTitle>
              <CardDescription>آخر 6 أشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: "يوليو 2024", revenue: 183100, change: "+15%" },
                  { month: "يونيو 2024", revenue: 159000, change: "+8%" },
                  { month: "مايو 2024", revenue: 147200, change: "+12%" },
                  { month: "أبريل 2024", revenue: 131400, change: "-5%" },
                  { month: "مارس 2024", revenue: 138500, change: "+10%" },
                  { month: "فبراير 2024", revenue: 125900, change: "+3%" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.month}</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(item.revenue, lang === 'ar' ? 'SAR' : 'USD')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.change.startsWith('+') ? (
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-500" />
                      )}
                      <span className={cn("font-medium", item.change.startsWith('+') ? "text-green-600" : "text-red-600")}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === "calendar" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>جدول العقود</CardTitle>
              <CardDescription>العقود النشطة والقادمة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRentalContracts
                  .filter(c => c.status === 'active' || c.status === 'upcoming')
                  .map((contract) => {
                    const daysRemaining = calculateDaysRemaining(contract.endDate)
                    return (
                      <div key={contract.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                        <div className={cn("w-2 h-16 rounded", contract.status === 'active' ? 'bg-green-500' : 'bg-blue-500')}></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{contract.equipmentName}</p>
                            {getStatusBadge(contract.status)}
                          </div>
                          <p className="text-sm text-gray-600">{contract.clientName} • {contract.projectName}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>من: {contract.startDate}</span>
                            <span>إلى: {contract.endDate}</span>
                            {daysRemaining > 0 && <span className="text-blue-600 font-medium">متبقي {daysRemaining} يوم</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{contract.dailyRate} ريال/يوم</p>
                          <p className="text-xs text-gray-600">{contract.duration} يوم</p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/equipment">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">العودة للمعدات</h3>
                  <p className="text-sm text-gray-600">عرض جميع المعدات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/rental/new">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">عقد تأجير جديد</h3>
                  <p className="text-sm text-gray-600">إضافة عقد جديد</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/rental/invoices">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الفواتير</h3>
                  <p className="text-sm text-gray-600">إدارة الفواتير</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/rental/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التقارير</h3>
                  <p className="text-sm text-gray-600">تحليلات مفصلة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}


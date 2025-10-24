"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  FileText,
  Calendar,
  DollarSign,
  Truck,
  User,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Settings,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Receipt,
  Printer,
  Send,
  Archive,
  Star,
  Award,
  Zap,
  Wrench,
  HardHat,
  Shield,
  Activity
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

// دالة لتقليل الأصفار وتحويل الأرقام لصيغة مختصرة
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

// Mock Data
const mockInvoices = [
  {
    id: "INV-001",
    invoiceNumber: "RENT-2024-001",
    customer: {
      name: "شركة البناء المتقدم",
      contact: "أحمد محمد",
      email: "ahmed@company.com",
      phone: "+966 50 123 4567"
    },
    equipment: {
      name: "حفار هيدروليكي",
      model: "CAT 320D",
      serialNumber: "CAT320D-2023-001",
      type: "حفارات"
    },
    rentalPeriod: {
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      duration: 31
    },
    pricing: {
      dailyRate: 2500,
      totalAmount: 77500,
      vat: 11625,
      finalAmount: 89125
    },
    status: "paid",
    paymentMethod: "تحويل بنكي",
    issueDate: "2024-01-10",
    dueDate: "2024-02-10",
    paidDate: "2024-01-20",
    notes: "عقد إيجار شهري مع صيانة مجانية"
  },
  {
    id: "INV-002",
    invoiceNumber: "RENT-2024-002",
    customer: {
      name: "مؤسسة التشييد الحديث",
      contact: "سارة أحمد",
      email: "sara@company.com",
      phone: "+966 55 987 6543"
    },
    equipment: {
      name: "رافعة برجية",
      model: "Liebherr 132EC-H8",
      serialNumber: "LB132-2023-002",
      type: "رافعات"
    },
    rentalPeriod: {
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      duration: 90
    },
    pricing: {
      dailyRate: 1800,
      totalAmount: 162000,
      vat: 24300,
      finalAmount: 186300
    },
    status: "pending",
    paymentMethod: "شيك",
    issueDate: "2024-01-25",
    dueDate: "2024-02-25",
    paidDate: null,
    notes: "عقد إيجار طويل الأمد مع خصم 10%"
  },
  {
    id: "INV-003",
    invoiceNumber: "RENT-2024-003",
    customer: {
      name: "شركة المشاريع الكبرى",
      contact: "محمد علي",
      email: "mohamed@company.com",
      phone: "+966 51 456 7890"
    },
    equipment: {
      name: "خلاطة خرسانة",
      model: "Schwing SP 3050",
      serialNumber: "SP3050-2023-003",
      type: "خلاطات"
    },
    rentalPeriod: {
      startDate: "2024-01-20",
      endDate: "2024-01-30",
      duration: 10
    },
    pricing: {
      dailyRate: 1200,
      totalAmount: 12000,
      vat: 1800,
      finalAmount: 13800
    },
    status: "overdue",
    paymentMethod: "نقدي",
    issueDate: "2024-01-15",
    dueDate: "2024-01-25",
    paidDate: null,
    notes: "إيجار عاجل لمشروع طوارئ"
  },
  {
    id: "INV-004",
    invoiceNumber: "RENT-2024-004",
    customer: {
      name: "مجموعة الإنشاءات المتحدة",
      contact: "فاطمة خالد",
      email: "fatima@company.com",
      phone: "+966 54 321 0987"
    },
    equipment: {
      name: "جرافة",
      model: "Komatsu D65PX-18",
      serialNumber: "KD65-2023-004",
      type: "جرافات"
    },
    rentalPeriod: {
      startDate: "2024-03-01",
      endDate: "2024-06-01",
      duration: 92
    },
    pricing: {
      dailyRate: 2200,
      totalAmount: 202400,
      vat: 30360,
      finalAmount: 232760
    },
    status: "draft",
    paymentMethod: "تحويل بنكي",
    issueDate: "2024-02-20",
    dueDate: "2024-03-20",
    paidDate: null,
    notes: "مسودة فاتورة - في انتظار الموافقة"
  }
]

const statusConfig = {
  draft: { label: "مسودة", color: "bg-gray-100 text-gray-800", icon: FileText },
  pending: { label: "معلق", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  paid: { label: "مدفوع", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  overdue: { label: "متأخر", color: "bg-red-100 text-red-800", icon: AlertTriangle },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-800", icon: XCircle }
}

const paymentMethods = {
  "تحويل بنكي": { icon: CreditCard, color: "text-blue-600" },
  "شيك": { icon: Receipt, color: "text-green-600" },
  "نقدي": { icon: DollarSign, color: "text-purple-600" },
  "بطاقة ائتمان": { icon: CreditCard, color: "text-orange-600" }
}

export default function RentalInvoicesPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalInvoices: mockInvoices.length,
    totalAmount: mockInvoices.reduce((sum, inv) => sum + inv.pricing.finalAmount, 0),
    paidAmount: mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.pricing.finalAmount, 0),
    pendingAmount: mockInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.pricing.finalAmount, 0),
    overdueCount: mockInvoices.filter(inv => inv.status === 'overdue').length,
    paidCount: mockInvoices.filter(inv => inv.status === 'paid').length
  }

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    )
  }

  const handleSelectAll = () => {
    setSelectedInvoices(
      selectedInvoices.length === filteredInvoices.length 
        ? [] 
        : filteredInvoices.map(inv => inv.id)
    )
  }

  const getStatusConfig = (status: string) => {
    return statusConfig[status] || statusConfig.draft
  }

  const getPaymentMethodConfig = (method: string) => {
    return paymentMethods[method] || paymentMethods["تحويل بنكي"]
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link href="/dashboard/equipment/rental">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">العودة للإيجار</span>
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <Receipt className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">فواتير إيجار المعدات</h1>
                  <p className="text-blue-100 text-sm sm:text-base lg:text-lg">إدارة فواتير إيجار المعدات والآليات</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm text-sm">
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">تصدير التقرير</span>
                <span className="sm:hidden">تصدير</span>
              </Button>
              <Link href="/dashboard/equipment/rental/invoices/new">
                <Button className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">فاتورة جديدة</span>
                  <span className="sm:hidden">جديدة</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الفواتير</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalInvoices}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المبلغ</p>
                <p className="text-2xl font-bold text-green-600">{formatNumber(stats.totalAmount)} ريال</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المدفوع</p>
                <p className="text-2xl font-bold text-purple-600">{formatNumber(stats.paidAmount)} ريال</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المعلق</p>
                <p className="text-2xl font-bold text-orange-600">{formatNumber(stats.pendingAmount)} ريال</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في الفواتير..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                <option value="all">جميع الحالات</option>
                <option value="draft">مسودة</option>
                <option value="pending">معلق</option>
                <option value="paid">مدفوع</option>
                <option value="overdue">متأخر</option>
                <option value="cancelled">ملغي</option>
              </select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                فلتر
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedInvoices.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="text-sm font-medium text-blue-800">
                  {selectedInvoices.length} فاتورة محددة
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    <Mail className="h-4 w-4 mr-2" />
                    إرسال
                  </Button>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    <Archive className="h-4 w-4 mr-2" />
                    أرشفة
                  </Button>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedInvoices([])}
                className="w-full sm:w-auto"
              >
                إلغاء التحديد
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredInvoices.map((invoice) => {
          const statusConfig = getStatusConfig(invoice.status)
          const paymentConfig = getPaymentMethodConfig(invoice.paymentMethod)
          const StatusIcon = statusConfig.icon
          const PaymentIcon = paymentConfig.icon

          return (
            <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => handleSelectInvoice(invoice.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                        <h3 className="text-lg font-semibold">{invoice.invoiceNumber}</h3>
                        <Badge className={statusConfig.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Customer Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">العميل:</span>
                          </div>
                          <p className="text-sm text-gray-700">{invoice.customer.name}</p>
                          <p className="text-xs text-gray-500">{invoice.customer.contact}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Mail className="h-3 w-3" />
                            <span>{invoice.customer.email}</span>
                          </div>
                        </div>

                        {/* Equipment Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">المعدة:</span>
                          </div>
                          <p className="text-sm text-gray-700">{invoice.equipment.name}</p>
                          <p className="text-xs text-gray-500">{invoice.equipment.model}</p>
                          <p className="text-xs text-gray-500">SN: {invoice.equipment.serialNumber}</p>
                        </div>

                        {/* Financial Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">المبلغ:</span>
                          </div>
                          <p className="text-lg font-bold text-green-600">
                            {formatNumber(invoice.pricing.finalAmount)} ريال
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatNumber(invoice.pricing.dailyRate)} ريال/يوم
                          </p>
                        </div>

                        {/* Rental Period */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">فترة الإيجار:</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {new Date(invoice.rentalPeriod.startDate).toLocaleDateString('en-US')} - 
                            {new Date(invoice.rentalPeriod.endDate).toLocaleDateString('en-US')}
                          </p>
                          <p className="text-xs text-gray-500">
                            {invoice.rentalPeriod.duration} يوم
                          </p>
                        </div>

                        {/* Payment Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <PaymentIcon className={`h-4 w-4 ${paymentConfig.color}`} />
                            <span className="text-sm font-medium">طريقة الدفع:</span>
                          </div>
                          <p className="text-sm text-gray-700">{invoice.paymentMethod}</p>
                          <p className="text-xs text-gray-500">
                            الاستحقاق: {new Date(invoice.dueDate).toLocaleDateString('en-US')}
                          </p>
                        </div>

                        {/* Dates */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">التواريخ:</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            الإصدار: {new Date(invoice.issueDate).toLocaleDateString('en-US')}
                          </p>
                          {invoice.paidDate && (
                            <p className="text-xs text-green-600">
                              الدفع: {new Date(invoice.paidDate).toLocaleDateString('en-US')}
                            </p>
                          )}
                        </div>
                      </div>

                      {invoice.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <strong>ملاحظات:</strong> {invoice.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end lg:justify-start">
                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                      <Eye className="h-4 w-4 mr-1 sm:mr-0" />
                      <span className="sm:hidden">عرض</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                      <Edit className="h-4 w-4 mr-1 sm:mr-0" />
                      <span className="sm:hidden">تعديل</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                      <Download className="h-4 w-4 mr-1 sm:mr-0" />
                      <span className="sm:hidden">تحميل</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 flex-1 sm:flex-none">
                      <Trash2 className="h-4 w-4 mr-1 sm:mr-0" />
                      <span className="sm:hidden">حذف</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/equipment/rental">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">إيجار المعدات</h3>
                  <p className="text-sm text-gray-600">إدارة إيجار المعدات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Wrench className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المعدات</h3>
                  <p className="text-sm text-gray-600">إدارة المعدات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/finance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المالية</h3>
                  <p className="text-sm text-gray-600">إدارة المالية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/rental/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التقارير</h3>
                  <p className="text-sm text-gray-600">تقارير الإيجار</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

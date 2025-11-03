"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search,
  Filter,
  Download,
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  FileText,
  Building2,
  Calendar,
  Package,
  Receipt,
  Wallet,
  User,
  Users
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for construction finance - Progress Payments (Mustaklasaat)
const mockProgressPayments = [
  {
    id: "MST-2024-003",
    date: "2024-01-15",
    project: "البرج السكني - الرياض",
    contractValue: 15000000,
    previousPayments: 8500000,
    currentPayment: {
      description: "المستخلص الثالث - أعمال الهيكل الخرساني",
      workDone: 2500000,
      retention: 250000, // 10% استقطاع ضمان
      previousRetention: 850000,
      tax: 337500, // 15% VAT
      netAmount: 2212500,
      advancePayment: 0,
      deductions: 0
    },
    completionPercentage: 73,
    status: "pending",
    submittedDate: "2024-01-15",
    approvalDate: null,
    paymentDate: null,
    consultant: "م. خالد الاستشاري",
    items: [
      { description: "أعمال الخرسانة المسلحة - الأدوار 10-12", amount: 1200000, percentage: 100 },
      { description: "أعمال الحديد - الأدوار 10-12", amount: 800000, percentage: 100 },
      { description: "أعمال النجارة المسلحة", amount: 500000, percentage: 100 }
    ]
  },
  {
    id: "MST-2024-002",
    date: "2024-01-01",
    project: "البرج السكني - الرياض",
    contractValue: 15000000,
    previousPayments: 6000000,
    currentPayment: {
      description: "المستخلص الثاني - الأدوار السفلية",
      workDone: 2500000,
      retention: 250000,
      previousRetention: 600000,
      tax: 337500,
      netAmount: 2212500,
      advancePayment: 0,
      deductions: 0
    },
    completionPercentage: 57,
    status: "paid",
    submittedDate: "2024-01-01",
    approvalDate: "2024-01-05",
    paymentDate: "2024-01-08",
    consultant: "م. خالد الاستشاري",
    items: []
  },
  {
    id: "MST-2024-001",
    date: "2023-12-15",
    project: "البرج السكني - الرياض",
    contractValue: 15000000,
    previousPayments: 3500000,
    currentPayment: {
      description: "المستخلص الأول - الأساسات والدور الأرضي",
      workDone: 2500000,
      retention: 250000,
      previousRetention: 350000,
      tax: 337500,
      netAmount: 2212500,
      advancePayment: 1500000,
      deductions: 0
    },
    completionPercentage: 40,
    status: "paid",
    submittedDate: "2023-12-15",
    approvalDate: "2023-12-18",
    paymentDate: "2023-12-22",
    consultant: "م. خالد الاستشاري",
    items: []
  }
]

// Supplier Payments
const mockSupplierPayments = [
  {
    id: "PAY-2024-015",
    date: "2024-01-14",
    supplier: "شركة الحديد المتحد",
    category: "مواد بناء",
    invoiceNumber: "INV-5678",
    amount: 175000,
    dueDate: "2024-02-14",
    status: "pending",
    project: "البرج السكني - الرياض",
    description: "حديد تسليح 50 طن"
  },
  {
    id: "PAY-2024-014",
    date: "2024-01-13",
    supplier: "مؤسسة المعدات الثقيلة",
    category: "معدات",
    invoiceNumber: "INV-5679",
    amount: 35000,
    dueDate: "2024-01-13",
    status: "paid",
    project: "المجمع التجاري - الدمام",
    description: "إيجار رافعة - شهر يناير",
    paymentDate: "2024-01-13"
  },
  {
    id: "PAY-2024-013",
    date: "2024-01-12",
    supplier: "مصنع الأسمنت الوطني",
    category: "مواد بناء",
    invoiceNumber: "INV-5680",
    amount: 12500,
    dueDate: "2024-01-19",
    status: "overdue",
    project: "الفيلا السكنية - جدة",
    description: "أسمنت 500 كيس"
  }
]

// Worker Wages
const mockWagePayments = [
  {
    id: "WAGE-2024-W2",
    period: "الأسبوع الثاني - يناير 2024",
    paymentDate: "2024-01-14",
    site: "موقع البرج السكني",
    workers: 45,
    totalDays: 270,
    totalAmount: 67500,
    status: "paid",
    breakdown: {
      masons: { count: 15, amount: 22500 },
      steelWorkers: { count: 10, amount: 20000 },
      carpenters: { count: 8, amount: 14400 },
      others: { count: 12, amount: 10600 }
    }
  },
  {
    id: "WAGE-2024-W1",
    period: "الأسبوع الأول - يناير 2024",
    paymentDate: "2024-01-07",
    site: "موقع البرج السكني",
    workers: 42,
    totalDays: 252,
    totalAmount: 63000,
    status: "paid",
    breakdown: {}
  }
]

export default function FinancePage() {
  const { t, lang } = useLanguage()
  const [selectedTab, setSelectedTab] = useState<"progress" | "suppliers" | "wages">("progress")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredProgressPayments = mockProgressPayments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || payment.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalContract: mockProgressPayments[0]?.contractValue || 0,
    totalReceived: mockProgressPayments.reduce((sum, p) => sum + (p.status === 'paid' ? p.currentPayment.netAmount : 0), 0),
    totalPending: mockProgressPayments.reduce((sum, p) => sum + (p.status === 'pending' ? p.currentPayment.netAmount : 0), 0),
    totalRetention: mockProgressPayments.reduce((sum, p) => sum + p.currentPayment.retention, 0),
    suppliersPending: mockSupplierPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    suppliersOverdue: mockSupplierPayments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
    wagesThisMonth: mockWagePayments.reduce((sum, w) => sum + w.totalAmount, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "approved": return "bg-blue-100 text-blue-800"
      case "paid": return "bg-green-100 text-green-800"
      case "rejected": return "bg-red-100 text-red-800"
      case "overdue": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "قيد المراجعة"
      case "approved": return "معتمد"
      case "paid": return "مدفوع"
      case "rejected": return "مرفوض"
      case "overdue": return "متأخر"
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">الإدارة المالية للمقاولات</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">إدارة المستخلصات والمدفوعات والأجور</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/dashboard/finance/cash-flow">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">التدفقات النقدية</span>
              <span className="sm:hidden">تدفقات</span>
            </Button>
          </Link>
          <Link href="/dashboard/finance/new-payment">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">مستخلص جديد</span>
              <span className="sm:hidden">مستخلص</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قيمة العقد</p>
                <p className="text-xl font-bold mt-1 text-purple-600">{formatCurrency(stats.totalContract)}</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المستلم</p>
                <p className="text-xl font-bold mt-1 text-green-600">{formatCurrency(stats.totalReceived)}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تحت المراجعة</p>
                <p className="text-xl font-bold mt-1 text-yellow-600">{formatCurrency(stats.totalPending)}</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الاستقطاع الضماني</p>
                <p className="text-xl font-bold mt-1 text-blue-600">{formatCurrency(stats.totalRetention)}</p>
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
                <p className="text-sm text-gray-600">موردين معلق</p>
                <p className="text-xl font-bold mt-1 text-orange-600">{formatCurrency(stats.suppliersPending)}</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <Package className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متأخرات</p>
                <p className="text-xl font-bold mt-1 text-red-600">{formatCurrency(stats.suppliersOverdue)}</p>
              </div>
              <div className="bg-red-500 text-white p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">أجور الشهر</p>
                <p className="text-xl font-bold mt-1 text-indigo-600">{formatCurrency(stats.wagesThisMonth)}</p>
              </div>
              <div className="bg-indigo-500 text-white p-3 rounded-lg">
                <Receipt className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-2 sm:gap-4">
          <button
            onClick={() => setSelectedTab("progress")}
            className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              selectedTab === "progress"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">المستخلصات</span>
            <span className="sm:hidden">مستخلصات</span>
          </button>
          <button
            onClick={() => setSelectedTab("suppliers")}
            className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              selectedTab === "suppliers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">مدفوعات الموردين</span>
            <span className="sm:hidden">موردين</span>
          </button>
          <button
            onClick={() => setSelectedTab("wages")}
            className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              selectedTab === "wages"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Receipt className="h-4 w-4" />
            <span className="hidden sm:inline">أجور العمال</span>
            <span className="sm:hidden">أجور</span>
          </button>
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={
                selectedTab === "progress" ? "البحث في المستخلصات..." :
                selectedTab === "suppliers" ? "البحث في المدفوعات..." :
                "البحث في الأجور..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          {selectedTab !== "wages" && (
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            >
              <option value="all">جميع الحالات</option>
              <option value="pending">قيد المراجعة</option>
              <option value="approved">معتمد</option>
              <option value="paid">مدفوع</option>
              {selectedTab === "suppliers" && <option value="overdue">متأخر</option>}
            </select>
          )}
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">تصدير</span>
            <span className="sm:hidden">تصدير</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      {selectedTab === "progress" && (
        <div className="space-y-4">
          {filteredProgressPayments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 sm:p-4 rounded-lg ${getStatusColor(payment.status)}`}>
                      <FileText className="h-8 w-8 sm:h-10 sm:w-10" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="font-bold text-xl sm:text-2xl">{payment.id}</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getStatusColor(payment.status)}>
                            {getStatusLabel(payment.status)}
                          </Badge>
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            {payment.completionPercentage}% مكتمل
                          </Badge>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg font-semibold mb-1 truncate">{payment.currentPayment.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1 truncate">
                          <Building2 className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{payment.project}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          {payment.date}
                        </span>
                        <span className="flex items-center gap-1 truncate">
                          <User className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{payment.consultant}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600">صافي المستحق</p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">{formatCurrency(payment.currentPayment.netAmount)}</p>
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">قيمة العقد</p>
                    <p className="text-lg font-bold text-purple-600">{formatCurrency(payment.contractValue)}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">المستخلصات السابقة</p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(payment.previousPayments)}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">الأعمال المنفذة</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(payment.currentPayment.workDone)}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">المتبقي من العقد</p>
                    <p className="text-lg font-bold text-orange-600">
                      {formatCurrency(payment.contractValue - payment.previousPayments - payment.currentPayment.workDone)}
                    </p>
                  </div>
                </div>

                {/* Calculation Details */}
                <div className="border rounded-lg overflow-hidden mb-4">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b bg-gray-50">
                        <td className="p-3 font-semibold">قيمة الأعمال المنفذة</td>
                        <td className="p-3 text-left font-bold">{formatCurrency(payment.currentPayment.workDone)}</td>
                      </tr>
                      {payment.currentPayment.advancePayment > 0 && (
                        <tr className="border-b">
                          <td className="p-3 text-red-600">(-) خصم الدفعة المقدمة</td>
                          <td className="p-3 text-left text-red-600">({formatCurrency(payment.currentPayment.advancePayment)})</td>
                        </tr>
                      )}
                      <tr className="border-b">
                        <td className="p-3 text-red-600">(-) استقطاع ضماني 10%</td>
                        <td className="p-3 text-left text-red-600">({formatCurrency(payment.currentPayment.retention)})</td>
                      </tr>
                      {payment.currentPayment.deductions > 0 && (
                        <tr className="border-b">
                          <td className="p-3 text-red-600">(-) خصومات أخرى</td>
                          <td className="p-3 text-left text-red-600">({formatCurrency(payment.currentPayment.deductions)})</td>
                        </tr>
                      )}
                      <tr className="border-b bg-blue-50">
                        <td className="p-3 font-semibold">المجموع الفرعي</td>
                        <td className="p-3 text-left font-bold">
                          {formatCurrency(payment.currentPayment.workDone - payment.currentPayment.advancePayment - payment.currentPayment.retention - payment.currentPayment.deductions)}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">(+) ضريبة القيمة المضافة 15%</td>
                        <td className="p-3 text-left">{formatCurrency(payment.currentPayment.tax)}</td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="p-3 font-bold text-lg">صافي المستحق</td>
                        <td className="p-3 text-left font-bold text-green-600 text-xl">{formatCurrency(payment.currentPayment.netAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Items if available */}
                {payment.items.length > 0 && (
                  <div className="mb-4">
                    <p className="font-semibold mb-2">تفاصيل الأعمال:</p>
                    <div className="space-y-2">
                      {payment.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{item.description}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">{item.percentage}%</Badge>
                            <span className="font-bold text-purple-600">{formatCurrency(item.amount)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">الاستقطاع السابق</p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(payment.currentPayment.previousRetention)}</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">استقطاع حالي</p>
                    <p className="text-lg font-bold text-purple-600">{formatCurrency(payment.currentPayment.retention)}</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">إجمالي الاستقطاع</p>
                    <p className="text-lg font-bold text-orange-600">
                      {formatCurrency(payment.currentPayment.previousRetention + payment.currentPayment.retention)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    عرض التفاصيل
                  </Button>
                  {payment.status === 'pending' && (
                    <>
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        اعتماد
                      </Button>
                      <Button variant="destructive" size="sm" className="flex-1">
                        <XCircle className="h-4 w-4 mr-2" />
                        رفض
                      </Button>
                    </>
                  )}
                  {payment.status === 'approved' && (
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <DollarSign className="h-4 w-4 mr-2" />
                      تسجيل الدفع
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "suppliers" && (
        <div className="space-y-4">
          {mockSupplierPayments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getStatusColor(payment.status)}`}>
                      <Package className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{payment.id}</h3>
                        <Badge className={getStatusColor(payment.status)}>
                          {getStatusLabel(payment.status)}
                        </Badge>
                      </div>
                      <p className="font-semibold text-lg mb-1">{payment.supplier}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{payment.description}</span>
                        <Badge variant="outline">{payment.category}</Badge>
                        <span>فاتورة: {payment.invoiceNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600">المبلغ</p>
                    <p className="text-2xl font-bold text-purple-600">{formatCurrency(payment.amount)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">تاريخ الفاتورة</p>
                    <p className="font-semibold">{payment.date}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">تاريخ الاستحقاق</p>
                    <p className="font-semibold">{payment.dueDate}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">المشروع</p>
                    <p className="font-semibold text-sm">{payment.project}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    عرض الفاتورة
                  </Button>
                  {payment.status !== 'paid' && (
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      <DollarSign className="h-4 w-4 mr-2" />
                      تسجيل الدفع
                    </Button>
                  )}
                  {payment.paymentDate && (
                    <div className="p-2 bg-green-50 rounded-lg text-sm">
                      تم الدفع: {payment.paymentDate}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "wages" && (
        <div className="space-y-4">
          {mockWagePayments.map((wage) => (
            <Card key={wage.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-lg bg-green-100">
                      <Receipt className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-xl">{wage.id}</h3>
                        <Badge className="bg-green-100 text-green-800">
                          {getStatusLabel(wage.status)}
                        </Badge>
                      </div>
                      <p className="text-lg font-semibold mb-1">{wage.period}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {wage.site}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {wage.workers} عامل
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {wage.paymentDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600">الإجمالي</p>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(wage.totalAmount)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">بناؤون</p>
                    <p className="text-sm font-bold text-red-600">
                      {wage.breakdown.masons?.count || 0} عامل
                    </p>
                    <p className="text-xs text-gray-600">{formatCurrency(wage.breakdown.masons?.amount || 0)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">حدادين</p>
                    <p className="text-sm font-bold text-gray-600">
                      {wage.breakdown.steelWorkers?.count || 0} عامل
                    </p>
                    <p className="text-xs text-gray-600">{formatCurrency(wage.breakdown.steelWorkers?.amount || 0)}</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">نجارين</p>
                    <p className="text-sm font-bold text-orange-600">
                      {wage.breakdown.carpenters?.count || 0} عامل
                    </p>
                    <p className="text-xs text-gray-600">{formatCurrency(wage.breakdown.carpenters?.amount || 0)}</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">آخرون</p>
                    <p className="text-sm font-bold text-blue-600">
                      {wage.breakdown.others?.count || 0} عامل
                    </p>
                    <p className="text-xs text-gray-600">{formatCurrency(wage.breakdown.others?.amount || 0)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">إجمالي أيام العمل:</span>
                  <span className="font-bold">{wage.totalDays} يوم عمل</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    كشف الأجور التفصيلي
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    تصدير كشف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Link href="/dashboard/finance/cash-flow">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التدفقات النقدية</h3>
                  <p className="text-sm text-gray-600">Cash Flow</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/finance/forecasts">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التوقعات المالية</h3>
                  <p className="text-sm text-gray-600">Forecasts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/finance/retention">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Wallet className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الاستقطاعات الضمانية</h3>
                  <p className="text-sm text-gray-600">Retentions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/accounting">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المحاسبة</h3>
                  <p className="text-sm text-gray-600">القيود والحسابات</p>
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
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التقارير المالية</h3>
                  <p className="text-sm text-gray-600">Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

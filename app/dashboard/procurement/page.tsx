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
  ShoppingCart,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  FileText,
  DollarSign,
  Calendar,
  Building2,
  Truck,
  User,
  MapPin
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for construction purchase orders
const mockPurchaseOrders = [
  {
    id: "PO-2024-001",
    date: "2024-01-15",
    supplier: "شركة الحديد المتحد",
    supplierType: "مواد بناء",
    project: "البرج السكني - الرياض",
    category: "حديد تسليح",
    items: [
      { name: "حديد تسليح 16 مم", quantity: 50, unit: "طن", unitPrice: 3500, total: 175000 },
      { name: "حديد تسليح 12 مم", quantity: 30, unit: "طن", unitPrice: 3400, total: 102000 }
    ],
    subtotal: 277000,
    tax: 41550,
    total: 318550,
    status: "approved",
    priority: "high",
    deliveryDate: "2024-01-20",
    requestedBy: "م. أحمد محمد",
    approvedBy: "م. خالد عبدالله",
    notes: "توصيل عاجل للموقع - مطلوب شهادات جودة",
    paymentTerms: "30 يوم",
    deliveryLocation: "موقع البرج السكني - الرياض"
  },
  {
    id: "PO-2024-002",
    date: "2024-01-14",
    supplier: "مصنع الأسمنت الوطني",
    supplierType: "مواد بناء",
    project: "الفيلا السكنية - جدة",
    category: "أسمنت",
    items: [
      { name: "أسمنت بورتلاندي", quantity: 500, unit: "كيس", unitPrice: 25, total: 12500 }
    ],
    subtotal: 12500,
    tax: 1875,
    total: 14375,
    status: "pending",
    priority: "medium",
    deliveryDate: "2024-01-18",
    requestedBy: "م. فاطمة أحمد",
    approvedBy: null,
    notes: "تسليم على دفعتين",
    paymentTerms: "نقدي عند الاستلام",
    deliveryLocation: "موقع الفيلا - جدة"
  },
  {
    id: "PO-2024-003",
    date: "2024-01-13",
    supplier: "مؤسسة المعدات الثقيلة",
    supplierType: "معدات",
    project: "المجمع التجاري - الدمام",
    category: "معدات إنشائية",
    items: [
      { name: "تأجير رافعة برجية 50 طن", quantity: 3, unit: "شهر", unitPrice: 35000, total: 105000 },
      { name: "تأجير خلاطة خرسانة", quantity: 2, unit: "شهر", unitPrice: 8000, total: 16000 }
    ],
    subtotal: 121000,
    tax: 18150,
    total: 139150,
    status: "approved",
    priority: "high",
    deliveryDate: "2024-01-16",
    requestedBy: "م. محمد علي",
    approvedBy: "م. سارة خالد",
    notes: "تشمل الصيانة والمشغل",
    paymentTerms: "شهري مقدم",
    deliveryLocation: "موقع المجمع التجاري - الدمام"
  },
  {
    id: "PO-2024-004",
    date: "2024-01-12",
    supplier: "معرض السيراميك الفاخر",
    supplierType: "مواد تشطيب",
    project: "البرج السكني - الرياض",
    category: "مواد تشطيب",
    items: [
      { name: "سيراميك أرضيات 60×60", quantity: 800, unit: "م²", unitPrice: 45, total: 36000 },
      { name: "سيراميك جدران 30×60", quantity: 500, unit: "م²", unitPrice: 35, total: 17500 }
    ],
    subtotal: 53500,
    tax: 8025,
    total: 61525,
    status: "pending",
    priority: "medium",
    deliveryDate: "2024-01-25",
    requestedBy: "م. أحمد محمد",
    approvedBy: null,
    notes: "يشمل مواد التركيب",
    paymentTerms: "50% مقدم - 50% عند التسليم",
    deliveryLocation: "مخزن المشروع"
  },
  {
    id: "PO-2024-005",
    date: "2024-01-11",
    supplier: "شركة الكابلات الوطنية",
    supplierType: "مواد كهربائية",
    project: "المجمع التجاري - الدمام",
    category: "كهرباء",
    items: [
      { name: "كابلات كهربائية 2.5 مم", quantity: 3000, unit: "متر", unitPrice: 8.5, total: 25500 },
      { name: "كابلات كهربائية 4 مم", quantity: 2000, unit: "متر", unitPrice: 12, total: 24000 }
    ],
    subtotal: 49500,
    tax: 7425,
    total: 56925,
    status: "rejected",
    priority: "low",
    deliveryDate: "2024-01-22",
    requestedBy: "م. خالد عمر",
    approvedBy: "م. سارة خالد",
    notes: "تم رفضه - السعر مرتفع",
    paymentTerms: "30 يوم",
    deliveryLocation: "موقع المجمع التجاري"
  },
  {
    id: "PO-2024-006",
    date: "2024-01-10",
    supplier: "محاجر الرياض",
    supplierType: "مواد بناء",
    project: "الفيلا السكنية - جدة",
    category: "مواد أساسية",
    items: [
      { name: "رمل ناعم", quantity: 200, unit: "م³", unitPrice: 80, total: 16000 },
      { name: "حصى", quantity: 150, unit: "م³", unitPrice: 90, total: 13500 }
    ],
    subtotal: 29500,
    tax: 4425,
    total: 33925,
    status: "completed",
    priority: "high",
    deliveryDate: "2024-01-12",
    requestedBy: "م. فاطمة أحمد",
    approvedBy: "م. أحمد محمد",
    notes: "تم التوصيل والاستلام",
    paymentTerms: "نقدي",
    deliveryLocation: "موقع الفيلا"
  }
]

const categories = [
  { id: "steel", name: "حديد تسليح", icon: "⚒️", color: "bg-gray-700", count: 15 },
  { id: "cement", name: "أسمنت", icon: "🏗️", color: "bg-blue-500", count: 8 },
  { id: "equipment", name: "معدات", icon: "🚜", color: "bg-orange-500", count: 6 },
  { id: "finishing", name: "تشطيبات", icon: "🎨", color: "bg-purple-500", count: 12 },
  { id: "electrical", name: "كهرباء", icon: "⚡", color: "bg-yellow-500", count: 10 },
  { id: "plumbing", name: "سباكة", icon: "💧", color: "bg-cyan-500", count: 7 },
  { id: "aggregate", name: "مواد أساسية", icon: "🪨", color: "bg-green-500", count: 9 },
  { id: "tools", name: "أدوات", icon: "🔧", color: "bg-red-500", count: 5 }
]

export default function ProcurementPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredOrders = mockPurchaseOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    const matchesCategory = selectedCategory === "all" || order.category === selectedCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = {
    total: mockPurchaseOrders.length,
    pending: mockPurchaseOrders.filter(o => o.status === 'pending').length,
    approved: mockPurchaseOrders.filter(o => o.status === 'approved').length,
    completed: mockPurchaseOrders.filter(o => o.status === 'completed').length,
    rejected: mockPurchaseOrders.filter(o => o.status === 'rejected').length,
    totalValue: mockPurchaseOrders.reduce((sum, o) => sum + o.total, 0),
    pendingValue: mockPurchaseOrders.filter(o => o.status === 'pending').reduce((sum, o) => sum + o.total, 0),
    approvedValue: mockPurchaseOrders.filter(o => o.status === 'approved').reduce((sum, o) => sum + o.total, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "approved": return "bg-blue-100 text-blue-800"
      case "completed": return "bg-green-100 text-green-800"
      case "rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "قيد الانتظار"
      case "approved": return "معتمد"
      case "completed": return "مكتمل"
      case "rejected": return "مرفوض"
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />
      case "approved": return <CheckCircle2 className="h-4 w-4" />
      case "completed": return <CheckCircle2 className="h-4 w-4" />
      case "rejected": return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-orange-100 text-orange-800"
      case "low": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return "عاجل"
      case "medium": return "متوسط"
      case "low": return "منخفض"
      default: return priority
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">طلبات الشراء</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">إدارة طلبات شراء مواد البناء والمعدات الإنشائية</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/dashboard/procurement/suppliers">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Building2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">الموردين</span>
              <span className="sm:hidden">موردين</span>
            </Button>
          </Link>
          <Link href="/dashboard/procurement/rfq">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">طلب عرض سعر</span>
              <span className="sm:hidden">عرض سعر</span>
            </Button>
          </Link>
          <Link href="/dashboard/procurement/new">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">طلب شراء جديد</span>
              <span className="sm:hidden">طلب جديد</span>
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
                <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <ShoppingCart className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قيد الانتظار</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.pending}</p>
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
                <p className="text-sm text-gray-600">معتمدة</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{stats.approved}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مكتملة</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.completed}</p>
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
                <p className="text-sm text-gray-600">مرفوضة</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.rejected}</p>
              </div>
              <div className="bg-red-500 text-white p-3 rounded-lg">
                <XCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">القيمة الكلية</p>
                <p className="text-xl font-bold mt-1 text-purple-600">{formatCurrency(stats.totalValue)}</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قيمة المعتمد</p>
                <p className="text-xl font-bold mt-1 text-green-600">{formatCurrency(stats.approvedValue)}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className={`hover:shadow-lg transition-shadow cursor-pointer ${selectedCategory === category.name ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedCategory(selectedCategory === category.name ? "all" : category.name)}
          >
            <CardContent className="p-3 text-center">
              <div className={`${category.color} w-10 h-10 rounded-full flex items-center justify-center text-xl mx-auto mb-2`}>
                {category.icon}
              </div>
              <p className="text-xs font-semibold">{category.name}</p>
              <p className="text-xs text-gray-600">{category.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في طلبات الشراء..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="all">جميع الحالات</option>
            <option value="pending">قيد الانتظار</option>
            <option value="approved">معتمد</option>
            <option value="completed">مكتمل</option>
            <option value="rejected">مرفوض</option>
          </select>
          <Button variant="outline" size="sm" onClick={() => { setSelectedCategory("all"); setSelectedStatus("all"); setSearchTerm(""); }} className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">إعادة تعيين</span>
            <span className="sm:hidden">إعادة</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">تصدير</span>
            <span className="sm:hidden">تصدير</span>
          </Button>
        </div>
      </div>

      {/* Purchase Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-lg ${getStatusColor(order.status)}`}>
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl">{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {getStatusLabel(order.status)}
                        </div>
                      </Badge>
                      <Badge className={getPriorityColor(order.priority)}>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {getPriorityLabel(order.priority)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {order.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {order.supplier}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {order.supplierType}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-600">القيمة الإجمالية</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(order.total)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600 mb-1">المشروع</p>
                  <p className="font-semibold text-sm flex items-center gap-1">
                    <Package className="h-4 w-4 text-blue-500" />
                    {order.project}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">الفئة</p>
                  <Badge variant="outline" className="text-sm">{order.category}</Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">تاريخ التسليم المتوقع</p>
                  <p className="font-semibold text-sm flex items-center gap-1">
                    <Truck className="h-4 w-4 text-green-500" />
                    {order.deliveryDate}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="border rounded-lg overflow-hidden mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-right p-3 font-semibold">الصنف</th>
                      <th className="text-center p-3 font-semibold">الكمية</th>
                      <th className="text-center p-3 font-semibold">الوحدة</th>
                      <th className="text-right p-3 font-semibold">سعر الوحدة</th>
                      <th className="text-right p-3 font-semibold">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3">{item.name}</td>
                        <td className="p-3 text-center font-bold">{item.quantity.toLocaleString()}</td>
                        <td className="p-3 text-center">{item.unit}</td>
                        <td className="p-3 text-right">{formatCurrency(item.unitPrice)}</td>
                        <td className="p-3 text-right font-bold text-purple-600">{formatCurrency(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 font-semibold">
                    <tr className="border-t">
                      <td colSpan={4} className="p-3 text-left">المجموع الفرعي:</td>
                      <td className="p-3 text-right">{formatCurrency(order.subtotal)}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="p-3 text-left">ضريبة القيمة المضافة (15%):</td>
                      <td className="p-3 text-right">{formatCurrency(order.tax)}</td>
                    </tr>
                    <tr className="border-t-2">
                      <td colSpan={4} className="p-3 text-left text-lg">الإجمالي النهائي:</td>
                      <td className="p-3 text-right text-lg text-purple-600">{formatCurrency(order.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">موقع التوصيل</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    {order.deliveryLocation}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">شروط الدفع</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    {order.paymentTerms}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">طلب بواسطة</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <User className="h-4 w-4 text-purple-600" />
                    {order.requestedBy}
                  </p>
                </div>
              </div>

              {order.notes && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                  <p className="text-xs text-gray-600 mb-1">ملاحظات</p>
                  <p className="text-sm">{order.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                {order.status === 'pending' && (
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
                {order.status === 'approved' && (
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Truck className="h-4 w-4 mr-2" />
                    تتبع التوصيل
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات شراء</h3>
            <p className="text-gray-600 mb-4">لم يتم العثور على طلبات تطابق معايير البحث</p>
            <Button onClick={() => { setSearchTerm(""); setSelectedStatus("all"); setSelectedCategory("all"); }}>
              إعادة تعيين الفلاتر
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/procurement/suppliers">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الموردين</h3>
                  <p className="text-sm text-gray-600">إدارة الموردين</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/procurement/rfq">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">طلبات الأسعار</h3>
                  <p className="text-sm text-gray-600">RFQ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/procurement/contracts">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">العقود</h3>
                  <p className="text-sm text-gray-600">عقود التوريد</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/procurement/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التقارير</h3>
                  <p className="text-sm text-gray-600">تقارير المشتريات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

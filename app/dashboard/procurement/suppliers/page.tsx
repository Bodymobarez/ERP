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
  Building2,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Edit,
  FileText,
  DollarSign,
  Package,
  TrendingUp
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const mockSuppliers = [
  {
    id: "1",
    name: "شركة الحديد المتحد",
    category: "حديد تسليح",
    contactPerson: "م. عبدالله محمد",
    phone: "0501234567",
    email: "info@steel-united.com",
    address: "جدة - حي الصناعية، ص.ب: 12345",
    city: "جدة",
    rating: 4.8,
    status: "active",
    commercialRegister: "CR-1234567890",
    taxNumber: "310123456700003",
    totalOrders: 25,
    totalValue: 3250000,
    pendingOrders: 3,
    completedOrders: 22,
    paymentTerms: "30 يوم",
    certifications: ["ISO 9001", "SASO"],
    deliveryTime: "3-5 أيام"
  },
  {
    id: "2",
    name: "مصنع الأسمنت الوطني",
    category: "أسمنت ومواد بناء",
    contactPerson: "فاطمة أحمد",
    phone: "0507654321",
    email: "sales@national-cement.com",
    address: "الرياض - المنطقة الصناعية، ص.ب: 23456",
    city: "الرياض",
    rating: 4.6,
    status: "active",
    commercialRegister: "CR-2345678901",
    taxNumber: "310234567800003",
    totalOrders: 18,
    totalValue: 1850000,
    pendingOrders: 2,
    completedOrders: 16,
    paymentTerms: "نقدي عند التسليم",
    certifications: ["ISO 9001", "SASO", "GSO"],
    deliveryTime: "2-3 أيام"
  },
  {
    id: "3",
    name: "مؤسسة المعدات الثقيلة",
    category: "معدات إنشائية",
    contactPerson: "م. محمد خالد",
    phone: "0509876543",
    email: "info@heavy-equipment.com",
    address: "الدمام - حي الفيصلية، ص.ب: 34567",
    city: "الدمام",
    rating: 4.9,
    status: "active",
    commercialRegister: "CR-3456789012",
    taxNumber: "310345678900003",
    totalOrders: 12,
    totalValue: 2100000,
    pendingOrders: 4,
    completedOrders: 8,
    paymentTerms: "شهري مقدم",
    certifications: ["ISO 9001", "CE"],
    deliveryTime: "1-2 يوم"
  },
  {
    id: "4",
    name: "معرض السيراميك الفاخر",
    category: "مواد تشطيب",
    contactPerson: "سارة عمر",
    phone: "0503456789",
    email: "sales@luxury-ceramics.com",
    address: "الخبر - حي العقربية، ص.ب: 45678",
    city: "الخبر",
    rating: 4.4,
    status: "active",
    commercialRegister: "CR-4567890123",
    taxNumber: "310456789000003",
    totalOrders: 15,
    totalValue: 950000,
    pendingOrders: 1,
    completedOrders: 14,
    paymentTerms: "50% مقدم",
    certifications: ["ISO 9001"],
    deliveryTime: "5-7 أيام"
  },
  {
    id: "5",
    name: "شركة الكابلات الوطنية",
    category: "مواد كهربائية",
    contactPerson: "خالد يوسف",
    phone: "0506543210",
    email: "info@national-cables.com",
    address: "الرياض - حي الشفا، ص.ب: 56789",
    city: "الرياض",
    rating: 4.2,
    status: "pending",
    commercialRegister: "CR-5678901234",
    taxNumber: "310567890100003",
    totalOrders: 8,
    totalValue: 425000,
    pendingOrders: 0,
    completedOrders: 8,
    paymentTerms: "30 يوم",
    certifications: ["SASO"],
    deliveryTime: "4-6 أيام"
  }
]

export default function SuppliersPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || supplier.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockSuppliers.length,
    active: mockSuppliers.filter(s => s.status === 'active').length,
    pending: mockSuppliers.filter(s => s.status === 'pending').length,
    totalValue: mockSuppliers.reduce((sum, s) => sum + s.totalValue, 0),
    avgRating: mockSuppliers.reduce((sum, s) => sum + s.rating, 0) / mockSuppliers.length,
    totalOrders: mockSuppliers.reduce((sum, s) => sum + s.totalOrders, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "suspended": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "نشط"
      case "pending": return "قيد التقييم"
      case "suspended": return "موقوف"
      default: return status
    }
  }

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/procurement">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">الموردين</h1>
          <p className="text-gray-600 mt-1">قاعدة بيانات الموردين ومقدمي الخدمات</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الموردين</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">نشط</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.active}</p>
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
                <p className="text-sm text-gray-600">قيد التقييم</p>
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
                <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold mt-1 text-purple-600">{stats.totalOrders}</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <Package className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">القيمة الكلية</p>
                <p className="text-xl font-bold mt-1 text-orange-600">{formatCurrency(stats.totalValue)}</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط التقييم</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.avgRating.toFixed(1)} ⭐</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Star className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في الموردين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="pending">قيد التقييم</option>
          <option value="suspended">موقوف</option>
        </select>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
        <Link href="/dashboard/procurement/suppliers/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            مورد جديد
          </Button>
        </Link>
      </div>

      {/* Suppliers List */}
      <div className="space-y-4">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <Building2 className="h-10 w-10 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl">{supplier.name}</h3>
                      <Badge className={getStatusColor(supplier.status)}>
                        {getStatusLabel(supplier.status)}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="mb-2">{supplier.category}</Badge>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">
                        السجل التجاري: <span className="font-mono">{supplier.commercialRegister}</span>
                      </p>
                      <p className="text-gray-600">
                        الرقم الضريبي: <span className="font-mono">{supplier.taxNumber}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  {getRatingStars(supplier.rating)}
                  <p className="text-sm text-gray-600 mt-2">التقييم العام</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">الهاتف:</span>
                    <span className="font-medium direction-ltr text-right">{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">البريد:</span>
                    <span className="font-medium text-xs">{supplier.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                    <span className="text-gray-600">العنوان:</span>
                    <span className="font-medium">{supplier.address}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-600">شروط الدفع:</span>
                    <span className="font-medium">{supplier.paymentTerms}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-600">مدة التوصيل:</span>
                    <span className="font-medium">{supplier.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">الشهادات:</span>
                    <div className="flex gap-1">
                      {supplier.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 pt-4 border-t">
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Package className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-purple-600">{supplier.totalOrders}</p>
                  <p className="text-xs text-gray-600">إجمالي الطلبات</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-600">{supplier.completedOrders}</p>
                  <p className="text-xs text-gray-600">مكتملة</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-blue-600">{supplier.pendingOrders}</p>
                  <p className="text-xs text-gray-600">جارية</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                  <p className="text-sm font-bold text-orange-600">{formatCurrency(supplier.totalValue)}</p>
                  <p className="text-xs text-gray-600">القيمة الكلية</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل البيانات
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  الطلبات
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Star className="h-4 w-4 mr-2" />
                  تقييم
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد موردين</h3>
            <p className="text-gray-600 mb-4">لم يتم العثور على موردين تطابق معايير البحث</p>
            <Button onClick={() => { setSearchTerm(""); setSelectedStatus("all"); }}>
              إعادة تعيين الفلاتر
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/procurement">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">طلبات الشراء</h3>
                  <p className="text-sm text-gray-600">العودة للمشتريات</p>
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

        <Link href="/dashboard/procurement/suppliers/performance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تقييم الأداء</h3>
                  <p className="text-sm text-gray-600">أداء الموردين</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}


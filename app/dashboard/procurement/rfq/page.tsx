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
  FileText,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  Building2,
  Package,
  DollarSign,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for RFQs (Request for Quotation)
const mockRFQs = [
  {
    id: "RFQ-2024-001",
    date: "2024-01-14",
    title: "طلب عرض سعر - حديد تسليح",
    project: "البرج السكني - الرياض",
    category: "حديد تسليح",
    items: [
      { name: "حديد تسليح 16 مم", quantity: 50, unit: "طن" },
      { name: "حديد تسليح 12 مم", quantity: 30, unit: "طن" }
    ],
    suppliers: [
      { name: "شركة الحديد المتحد", quotation: 277000, status: "submitted" },
      { name: "مصنع الحديد الوطني", quotation: 285000, status: "submitted" },
      { name: "مؤسسة الصلب", quotation: 272000, status: "pending" }
    ],
    status: "open",
    deadline: "2024-01-18",
    lowestQuote: 272000,
    requestedBy: "م. أحمد محمد",
    suppliersCount: 3,
    quotesReceived: 2
  },
  {
    id: "RFQ-2024-002",
    date: "2024-01-13",
    title: "طلب عرض سعر - معدات إنشائية",
    project: "المجمع التجاري - الدمام",
    category: "معدات",
    items: [
      { name: "رافعة برجية 50 طن", quantity: 3, unit: "شهر" },
      { name: "خلاطة خرسانة", quantity: 2, unit: "شهر" }
    ],
    suppliers: [
      { name: "مؤسسة المعدات الثقيلة", quotation: 139150, status: "submitted" },
      { name: "شركة الآليات", quotation: 145000, status: "submitted" },
      { name: "معدات الخليج", quotation: null, status: "pending" }
    ],
    status: "open",
    deadline: "2024-01-17",
    lowestQuote: 139150,
    requestedBy: "م. محمد علي",
    suppliersCount: 3,
    quotesReceived: 2
  },
  {
    id: "RFQ-2024-003",
    date: "2024-01-12",
    title: "طلب عرض سعر - مواد تشطيب",
    project: "البرج السكني - الرياض",
    category: "تشطيبات",
    items: [
      { name: "سيراميك أرضيات 60×60", quantity: 800, unit: "م²" },
      { name: "سيراميك جدران 30×60", quantity: 500, unit: "م²" }
    ],
    suppliers: [
      { name: "معرض السيراميك الفاخر", quotation: 61525, status: "submitted" },
      { name: "شركة التشطيبات الحديثة", quotation: 58900, status: "submitted" },
      { name: "معرض الأناقة", quotation: 63000, status: "submitted" }
    ],
    status: "awarded",
    deadline: "2024-01-16",
    lowestQuote: 58900,
    requestedBy: "م. فاطمة أحمد",
    suppliersCount: 3,
    quotesReceived: 3,
    awardedTo: "شركة التشطيبات الحديثة"
  },
  {
    id: "RFQ-2024-004",
    date: "2024-01-10",
    title: "طلب عرض سعر - أعمال السباكة",
    project: "الفيلا السكنية - جدة",
    category: "سباكة",
    items: [
      { name: "مواسير PVC 4 بوصة", quantity: 1000, unit: "متر" },
      { name: "مواسير PVC 3 بوصة", quantity: 800, unit: "متر" }
    ],
    suppliers: [
      { name: "مصنع البلاستيك المتطور", quotation: 28500, status: "submitted" },
      { name: "شركة السباكة الحديثة", quotation: 27800, status: "submitted" }
    ],
    status: "closed",
    deadline: "2024-01-15",
    lowestQuote: 27800,
    requestedBy: "م. خالد عمر",
    suppliersCount: 2,
    quotesReceived: 2
  }
]

export default function RFQPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredRFQs = mockRFQs.filter(rfq => {
    const matchesSearch = rfq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || rfq.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockRFQs.length,
    open: mockRFQs.filter(r => r.status === 'open').length,
    awarded: mockRFQs.filter(r => r.status === 'awarded').length,
    closed: mockRFQs.filter(r => r.status === 'closed').length,
    totalValue: mockRFQs.reduce((sum, r) => sum + (r.lowestQuote || 0), 0),
    avgQuotes: mockRFQs.reduce((sum, r) => sum + r.quotesReceived, 0) / mockRFQs.length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-100 text-blue-800"
      case "awarded": return "bg-green-100 text-green-800"
      case "closed": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open": return "مفتوح"
      case "awarded": return "تم الترسية"
      case "closed": return "مغلق"
      default: return status
    }
  }

  const getQuoteStatusColor = (status: string) => {
    switch (status) {
      case "submitted": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getQuoteStatusLabel = (status: string) => {
    switch (status) {
      case "submitted": return "مقدم"
      case "pending": return "لم يقدم"
      default: return status
    }
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
          <h1 className="text-3xl font-bold text-gray-900">طلبات عروض الأسعار (RFQ)</h1>
          <p className="text-gray-600 mt-1">Request for Quotation - إدارة طلبات عروض الأسعار من الموردين</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مفتوحة</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{stats.open}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تم الترسية</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.awarded}</p>
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
                <p className="text-sm text-gray-600">مغلقة</p>
                <p className="text-2xl font-bold mt-1 text-gray-600">{stats.closed}</p>
              </div>
              <div className="bg-gray-500 text-white p-3 rounded-lg">
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
                <p className="text-sm text-gray-600">متوسط العروض</p>
                <p className="text-2xl font-bold mt-1 text-orange-600">{stats.avgQuotes.toFixed(1)}</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-6 w-6" />
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
              placeholder="البحث في طلبات عروض الأسعار..."
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
          <option value="open">مفتوح</option>
          <option value="awarded">تم الترسية</option>
          <option value="closed">مغلق</option>
        </select>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
        <Link href="/dashboard/procurement/rfq/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            RFQ جديد
          </Button>
        </Link>
      </div>

      {/* RFQ List */}
      <div className="space-y-4">
        {filteredRFQs.map((rfq) => (
          <Card key={rfq.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-lg ${getStatusColor(rfq.status)}`}>
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl">{rfq.id}</h3>
                      <Badge className={getStatusColor(rfq.status)}>
                        {getStatusLabel(rfq.status)}
                      </Badge>
                    </div>
                    <h4 className="text-lg font-semibold mb-1">{rfq.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {rfq.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        {rfq.project}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {rfq.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-600">أقل عرض</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(rfq.lowestQuote)}</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold mb-2">الأصناف المطلوبة:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {rfq.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Package className="h-4 w-4 text-blue-500" />
                      <span>{item.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.quantity} {item.unit}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suppliers Quotes */}
              <div className="mb-4">
                <p className="text-sm font-semibold mb-3">عروض الأسعار المقدمة:</p>
                <div className="space-y-2">
                  {rfq.suppliers.map((supplier, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{supplier.name}</p>
                          <Badge className={getQuoteStatusColor(supplier.status)} variant="outline">
                            {getQuoteStatusLabel(supplier.status)}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-left">
                        {supplier.quotation ? (
                          <>
                            <p className="text-lg font-bold text-purple-600">{formatCurrency(supplier.quotation)}</p>
                            {supplier.quotation === rfq.lowestQuote && (
                              <Badge className="bg-green-100 text-green-800 text-xs">أقل عرض 🏆</Badge>
                            )}
                          </>
                        ) : (
                          <p className="text-gray-400">لم يقدم</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-600">عدد الموردين:</span>
                  <span className="font-bold">{rfq.suppliersCount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-gray-600">العروض المستلمة:</span>
                  <span className="font-bold">{rfq.quotesReceived}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-red-500" />
                  <span className="text-gray-600">آخر موعد:</span>
                  <span className="font-bold">{rfq.deadline}</span>
                </div>
              </div>

              {rfq.awardedTo && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <p className="text-sm">
                      <span className="text-gray-600">تم الترسية على:</span>
                      <span className="font-bold mr-2">{rfq.awardedTo}</span>
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                {rfq.status === 'open' && (
                  <>
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      ترسية
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      إرسال تذكير
                    </Button>
                  </>
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

      {filteredRFQs.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات عروض أسعار</h3>
            <p className="text-gray-600 mb-4">لم يتم العثور على طلبات تطابق معايير البحث</p>
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
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">طلبات الشراء</h3>
                  <p className="text-sm text-gray-600">العودة للمشتريات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/procurement/suppliers">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الموردين</h3>
                  <p className="text-sm text-gray-600">قاعدة الموردين</p>
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
      </div>
    </div>
  )
}


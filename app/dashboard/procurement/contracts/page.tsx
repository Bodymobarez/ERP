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
  Calendar,
  DollarSign,
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Package
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const mockContracts = [
  {
    id: "CON-2024-001",
    title: "عقد توريد حديد تسليح سنوي",
    supplier: "شركة الحديد المتحد",
    category: "حديد تسليح",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    value: 5000000,
    status: "active",
    type: "annual",
    paymentTerms: "30 يوم",
    deliveryTerms: "توصيل للموقع",
    projects: ["البرج السكني - الرياض", "الفيلا السكنية - جدة"],
    ordersCount: 12,
    totalSpent: 1850000,
    remainingValue: 3150000,
    progress: 37
  },
  {
    id: "CON-2024-002",
    title: "عقد تأجير معدات ثقيلة",
    supplier: "مؤسسة المعدات الثقيلة",
    category: "معدات",
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    value: 850000,
    status: "active",
    type: "rental",
    paymentTerms: "شهري مقدم",
    deliveryTerms: "تشمل الصيانة والمشغل",
    projects: ["المجمع التجاري - الدمام"],
    ordersCount: 6,
    totalSpent: 420000,
    remainingValue: 430000,
    progress: 49
  },
  {
    id: "CON-2024-003",
    title: "عقد توريد أسمنت",
    supplier: "مصنع الأسمنت الوطني",
    category: "أسمنت",
    startDate: "2023-07-01",
    endDate: "2024-06-30",
    value: 1200000,
    status: "expiring",
    type: "annual",
    paymentTerms: "نقدي",
    deliveryTerms: "توصيل مجاني",
    projects: ["البرج السكني - الرياض", "المجمع التجاري - الدمام"],
    ordersCount: 24,
    totalSpent: 1050000,
    remainingValue: 150000,
    progress: 88
  },
  {
    id: "CON-2023-005",
    title: "عقد توريد مواد تشطيب",
    supplier: "معرض السيراميك الفاخر",
    category: "تشطيبات",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    value: 650000,
    status: "completed",
    type: "project-based",
    paymentTerms: "50% مقدم",
    deliveryTerms: "توصيل للمخزن",
    projects: ["البرج السكني - الرياض"],
    ordersCount: 8,
    totalSpent: 650000,
    remainingValue: 0,
    progress: 100
  }
]

export default function ContractsPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || contract.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockContracts.length,
    active: mockContracts.filter(c => c.status === 'active').length,
    expiring: mockContracts.filter(c => c.status === 'expiring').length,
    completed: mockContracts.filter(c => c.status === 'completed').length,
    totalValue: mockContracts.reduce((sum, c) => sum + c.value, 0),
    totalSpent: mockContracts.reduce((sum, c) => sum + c.totalSpent, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "expiring": return "bg-yellow-100 text-yellow-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "terminated": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "نشط"
      case "expiring": return "قرب الانتهاء"
      case "completed": return "مكتمل"
      case "terminated": return "ملغي"
      default: return status
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "annual": return "سنوي"
      case "rental": return "تأجير"
      case "project-based": return "خاص بمشروع"
      default: return type
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
          <h1 className="text-3xl font-bold text-gray-900">عقود التوريد</h1>
          <p className="text-gray-600 mt-1">إدارة عقود توريد مواد البناء والمعدات</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي العقود</p>
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
                <p className="text-sm text-gray-600">نشطة</p>
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
                <p className="text-sm text-gray-600">قرب الانتهاء</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.expiring}</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مكتملة</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{stats.completed}</p>
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
                <p className="text-sm text-gray-600">قيمة العقود</p>
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
                <p className="text-sm text-gray-600">المنصرف</p>
                <p className="text-xl font-bold mt-1 text-orange-600">{formatCurrency(stats.totalSpent)}</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <DollarSign className="h-6 w-6" />
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
              placeholder="البحث في العقود..."
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
          <option value="expiring">قرب الانتهاء</option>
          <option value="completed">مكتمل</option>
          <option value="terminated">ملغي</option>
        </select>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
        <Link href="/dashboard/procurement/contracts/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            عقد جديد
          </Button>
        </Link>
      </div>

      {/* Contracts List */}
      <div className="space-y-4">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-lg ${getStatusColor(contract.status)}`}>
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl">{contract.id}</h3>
                      <Badge className={getStatusColor(contract.status)}>
                        {getStatusLabel(contract.status)}
                      </Badge>
                      <Badge variant="outline">
                        {getTypeLabel(contract.type)}
                      </Badge>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{contract.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {contract.supplier}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {contract.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-600">قيمة العقد</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(contract.value)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600 mb-1">تاريخ البداية</p>
                  <p className="font-semibold text-sm">{contract.startDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">تاريخ الانتهاء</p>
                  <p className="font-semibold text-sm">{contract.endDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">شروط الدفع</p>
                  <p className="font-semibold text-sm">{contract.paymentTerms}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">شروط التوصيل</p>
                  <p className="font-semibold text-sm">{contract.deliveryTerms}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">المشاريع المرتبطة:</p>
                <div className="flex flex-wrap gap-2">
                  {contract.projects.map((project, index) => (
                    <Badge key={index} variant="outline">
                      <Package className="h-3 w-3 mr-1" />
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">نسبة الإنفاق</span>
                  <span className="font-bold">{contract.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      contract.progress < 50 ? 'bg-green-500' :
                      contract.progress < 80 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${contract.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t">
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">قيمة العقد</p>
                  <p className="text-lg font-bold text-purple-600">{formatCurrency(contract.value)}</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">المنصرف</p>
                  <p className="text-lg font-bold text-orange-600">{formatCurrency(contract.totalSpent)}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">المتبقي</p>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(contract.remainingValue)}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Package className="h-4 w-4 mr-2" />
                  الطلبات ({contract.ordersCount})
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

      {filteredContracts.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عقود</h3>
            <p className="text-gray-600 mb-4">لم يتم العثور على عقود تطابق معايير البحث</p>
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

        <Link href="/dashboard/procurement/contracts/renewals">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التجديدات</h3>
                  <p className="text-sm text-gray-600">عقود للتجديد</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}


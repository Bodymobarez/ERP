"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search,
  Filter,
  Download,
  Plus,
  Package,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  DollarSign,
  Boxes,
  Eye,
  Edit,
  ShoppingCart,
  Truck,
  FileText
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const mockInventory = [
  {
    id: "1",
    name: "أسمنت بورتلاندي",
    category: "مواد بناء أساسية",
    unit: "كيس (50 كجم)",
    currentStock: 2500,
    minStock: 1000,
    maxStock: 5000,
    unitPrice: 25,
    totalValue: 62500,
    supplier: "مصنع الأسمنت الوطني",
    lastPurchase: "2024-01-10",
    status: "in-stock",
    location: "مخزن 1 - الرف A"
  },
  {
    id: "2",
    name: "حديد تسليح 16 مم",
    category: "حديد تسليح",
    unit: "طن",
    currentStock: 15,
    minStock: 10,
    maxStock: 50,
    unitPrice: 3500,
    totalValue: 52500,
    supplier: "شركة الحديد المتحد",
    lastPurchase: "2024-01-12",
    status: "low-stock",
    location: "الساحة الخارجية"
  },
  {
    id: "3",
    name: "حديد تسليح 12 مم",
    category: "حديد تسليح",
    unit: "طن",
    currentStock: 12,
    minStock: 8,
    maxStock: 40,
    unitPrice: 3400,
    totalValue: 40800,
    supplier: "شركة الحديد المتحد",
    lastPurchase: "2024-01-12",
    status: "in-stock",
    location: "الساحة الخارجية"
  },
  {
    id: "4",
    name: "بلوك أسمنتي 20 سم",
    category: "مواد البناء",
    unit: "قطعة",
    currentStock: 15000,
    minStock: 10000,
    maxStock: 30000,
    unitPrice: 3.5,
    totalValue: 52500,
    supplier: "مصنع البلوك الحديث",
    lastPurchase: "2024-01-08",
    status: "in-stock",
    location: "مخزن 2 - الساحة B"
  },
  {
    id: "5",
    name: "رمل ناعم",
    category: "مواد بناء أساسية",
    unit: "م³",
    currentStock: 180,
    minStock: 100,
    maxStock: 500,
    unitPrice: 80,
    totalValue: 14400,
    supplier: "محاجر الرياض",
    lastPurchase: "2024-01-14",
    status: "in-stock",
    location: "الساحة الخارجية"
  },
  {
    id: "6",
    name: "حصى",
    category: "مواد بناء أساسية",
    unit: "م³",
    currentStock: 150,
    minStock: 100,
    maxStock: 400,
    unitPrice: 90,
    totalValue: 13500,
    supplier: "محاجر الرياض",
    lastPurchase: "2024-01-14",
    status: "in-stock",
    location: "الساحة الخارجية"
  },
  {
    id: "7",
    name: "دهان بلاستيك",
    category: "مواد تشطيب",
    unit: "جالون (20 لتر)",
    currentStock: 80,
    minStock: 100,
    maxStock: 300,
    unitPrice: 120,
    totalValue: 9600,
    supplier: "شركة الدهانات العالمية",
    lastPurchase: "2024-01-05",
    status: "low-stock",
    location: "مخزن 3 - الرف C"
  },
  {
    id: "8",
    name: "سيراميك أرضيات 60×60",
    category: "مواد تشطيب",
    unit: "م²",
    currentStock: 500,
    minStock: 300,
    maxStock: 1000,
    unitPrice: 45,
    totalValue: 22500,
    supplier: "معرض السيراميك الفاخر",
    lastPurchase: "2024-01-11",
    status: "in-stock",
    location: "مخزن 4"
  },
  {
    id: "9",
    name: "كابلات كهربائية 2.5 مم",
    category: "مواد كهربائية",
    unit: "متر",
    currentStock: 2000,
    minStock: 1500,
    maxStock: 5000,
    unitPrice: 8.5,
    totalValue: 17000,
    supplier: "شركة الكابلات الوطنية",
    lastPurchase: "2024-01-13",
    status: "in-stock",
    location: "مخزن 5"
  },
  {
    id: "10",
    name: "مواسير PVC 4 بوصة",
    category: "مواد سباكة",
    unit: "متر",
    currentStock: 800,
    minStock: 1000,
    maxStock: 3000,
    unitPrice: 15,
    totalValue: 12000,
    supplier: "مصنع البلاستيك المتطور",
    lastPurchase: "2024-01-09",
    status: "low-stock",
    location: "مخزن 6"
  },
]

const categories = [
  { id: "basic", name: "مواد أساسية", icon: "🏗️", color: "bg-blue-500", count: 6 },
  { id: "steel", name: "حديد تسليح", icon: "⚒️", color: "bg-gray-700", count: 5 },
  { id: "masonry", name: "مواد بناء", icon: "🧱", color: "bg-red-500", count: 8 },
  { id: "finishing", name: "مواد تشطيب", icon: "🎨", color: "bg-purple-500", count: 12 },
  { id: "electrical", name: "مواد كهربائية", icon: "⚡", color: "bg-yellow-500", count: 7 },
  { id: "plumbing", name: "مواد سباكة", icon: "💧", color: "bg-cyan-500", count: 9 },
]

export default function InventoryPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showSuccess, setShowSuccess] = useState(false)

  // Check for success message
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'item-created') {
      setShowSuccess(true)
      // Remove the success parameter from URL
      window.history.replaceState({}, '', window.location.pathname)
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }, [])

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalItems: mockInventory.length,
    inStock: mockInventory.filter(i => i.status === 'in-stock').length,
    lowStock: mockInventory.filter(i => i.status === 'low-stock').length,
    outOfStock: mockInventory.filter(i => i.status === 'out-of-stock').length,
    totalValue: mockInventory.reduce((sum, i) => sum + i.totalValue, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock": return "bg-green-100 text-green-800"
      case "low-stock": return "bg-yellow-100 text-yellow-800"
      case "out-of-stock": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-stock": return "متوفر"
      case "low-stock": return "كمية قليلة"
      case "out-of-stock": return "نفذت الكمية"
      default: return status
    }
  }

  const getStockPercentage = (current: number, max: number) => {
    return (current / max) * 100
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-green-800 font-medium">تم إضافة الصنف بنجاح!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">مخزون مواد البناء</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">إدارة ومتابعة مواد البناء والتشييد</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/dashboard/inventory/orders">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">الطلبات</span>
              <span className="sm:hidden">طلبات</span>
            </Button>
          </Link>
          <Link href="/dashboard/inventory/transfers">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Truck className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">النقل</span>
              <span className="sm:hidden">نقل</span>
            </Button>
          </Link>
          <Link href="/dashboard/inventory/new">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">صنف جديد</span>
              <span className="sm:hidden">صنف</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الأصناف</p>
                <p className="text-2xl font-bold mt-1">{stats.totalItems}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Boxes className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوفر</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.inStock}</p>
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
                <p className="text-sm text-gray-600">كمية قليلة</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.lowStock}</p>
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
                <p className="text-sm text-gray-600">نفذت</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.outOfStock}</p>
              </div>
              <div className="bg-red-500 text-white p-3 rounded-lg">
                <TrendingDown className="h-6 w-6" />
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
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-2`}>
                {category.icon}
              </div>
              <p className="font-semibold text-sm">{category.name}</p>
              <p className="text-xs text-gray-600 mt-1">{category.count} صنف</p>
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
              placeholder="البحث في مواد البناء..."
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
            <option value="in-stock">متوفر</option>
            <option value="low-stock">كمية قليلة</option>
            <option value="out-of-stock">نفذت الكمية</option>
          </select>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">فلترة</span>
            <span className="sm:hidden">فلتر</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">تصدير</span>
            <span className="sm:hidden">تصدير</span>
          </Button>
        </div>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>جرد المواد</CardTitle>
          <CardDescription>قائمة تفصيلية بجميع مواد البناء في المخزن</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-right p-3 font-semibold">المادة</th>
                  <th className="text-right p-3 font-semibold">الفئة</th>
                  <th className="text-right p-3 font-semibold">الوحدة</th>
                  <th className="text-right p-3 font-semibold">الكمية الحالية</th>
                  <th className="text-right p-3 font-semibold">الحد الأدنى</th>
                  <th className="text-right p-3 font-semibold">سعر الوحدة</th>
                  <th className="text-right p-3 font-semibold">القيمة الكلية</th>
                  <th className="text-right p-3 font-semibold">الموقع</th>
                  <th className="text-right p-3 font-semibold">الحالة</th>
                  <th className="text-right p-3 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.supplier}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="p-3 text-center font-semibold">{item.unit}</td>
                    <td className="p-3 text-center">
                      <div>
                        <p className="font-bold text-lg">{item.currentStock.toLocaleString()}</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className={`h-1.5 rounded-full ${
                              getStockPercentage(item.currentStock, item.maxStock) > 50 ? 'bg-green-500' :
                              getStockPercentage(item.currentStock, item.maxStock) > 25 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${getStockPercentage(item.currentStock, item.maxStock)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-center text-orange-600 font-semibold">{item.minStock.toLocaleString()}</td>
                    <td className="p-3 text-right">{formatCurrency(item.unitPrice)}</td>
                    <td className="p-3 text-right font-bold text-purple-600">{formatCurrency(item.totalValue)}</td>
                    <td className="p-3 text-xs">{item.location}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusLabel(item.status)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 font-bold">
                <tr className="border-t-2 border-gray-300">
                  <td colSpan={6} className="p-3 text-center text-lg">القيمة الإجمالية للمخزون</td>
                  <td className="p-3 text-right text-purple-600 text-xl">{formatCurrency(stats.totalValue)}</td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/inventory/orders">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">طلبات الشراء</h3>
                  <p className="text-sm text-gray-600">إنشاء طلب شراء</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/inventory/transfers">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">نقل المواد</h3>
                  <p className="text-sm text-gray-600">نقل بين المواقع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/inventory/consumption">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الاستهلاك</h3>
                  <p className="text-sm text-gray-600">تتبع الاستهلاك</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/inventory/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التقارير</h3>
                  <p className="text-sm text-gray-600">تقارير المخزون</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

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
  Ruler,
  Calculator,
  FileText,
  Eye,
  Edit,
  Package,
  DollarSign,
  BarChart3,
  FolderKanban
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const mockBOQItems = [
  {
    id: "1",
    category: "أعمال الخرسانة",
    item: "خرسانة مسلحة للأساسات",
    unit: "م³",
    quantity: 500,
    unitPrice: 350,
    totalPrice: 175000,
    executed: 320,
    remaining: 180,
    progress: 64
  },
  {
    id: "2",
    category: "أعمال الخرسانة",
    item: "خرسانة مسلحة للأعمدة",
    unit: "م³",
    quantity: 300,
    unitPrice: 380,
    totalPrice: 114000,
    executed: 150,
    remaining: 150,
    progress: 50
  },
  {
    id: "3",
    category: "أعمال الحديد",
    item: "حديد تسليح قطر 16 مم",
    unit: "طن",
    quantity: 50,
    unitPrice: 3500,
    totalPrice: 175000,
    executed: 35,
    remaining: 15,
    progress: 70
  },
  {
    id: "4",
    category: "أعمال الحديد",
    item: "حديد تسليح قطر 12 مم",
    unit: "طن",
    quantity: 40,
    unitPrice: 3400,
    totalPrice: 136000,
    executed: 28,
    remaining: 12,
    progress: 70
  },
  {
    id: "5",
    category: "أعمال البلوك",
    item: "بلوك أسمنتي 20 سم",
    unit: "م²",
    quantity: 2000,
    unitPrice: 45,
    totalPrice: 90000,
    executed: 800,
    remaining: 1200,
    progress: 40
  },
  {
    id: "6",
    category: "أعمال الطوب",
    item: "طوب أحمر",
    unit: "م²",
    quantity: 1500,
    unitPrice: 35,
    totalPrice: 52500,
    executed: 450,
    remaining: 1050,
    progress: 30
  },
  {
    id: "7",
    category: "أعمال اللياسة",
    item: "لياسة داخلية",
    unit: "م²",
    quantity: 3000,
    unitPrice: 25,
    totalPrice: 75000,
    executed: 600,
    remaining: 2400,
    progress: 20
  },
  {
    id: "8",
    category: "أعمال اللياسة",
    item: "لياسة خارجية",
    unit: "م²",
    quantity: 2500,
    unitPrice: 30,
    totalPrice: 75000,
    executed: 0,
    remaining: 2500,
    progress: 0
  },
  {
    id: "9",
    category: "أعمال الدهانات",
    item: "دهان بلاستيك داخلي",
    unit: "م²",
    quantity: 3000,
    unitPrice: 15,
    totalPrice: 45000,
    executed: 0,
    remaining: 3000,
    progress: 0
  },
  {
    id: "10",
    category: "أعمال الدهانات",
    item: "دهان خارجي",
    unit: "م²",
    quantity: 2500,
    unitPrice: 20,
    totalPrice: 50000,
    executed: 0,
    remaining: 2500,
    progress: 0
  },
]

const categories = [
  { id: "concrete", name: "أعمال الخرسانة", icon: "🏗️", color: "bg-blue-500" },
  { id: "steel", name: "أعمال الحديد", icon: "⚒️", color: "bg-gray-700" },
  { id: "masonry", name: "أعمال البناء", icon: "🧱", color: "bg-red-500" },
  { id: "plaster", name: "أعمال اللياسة", icon: "🎨", color: "bg-orange-500" },
  { id: "painting", name: "أعمال الدهانات", icon: "🖌️", color: "bg-purple-500" },
  { id: "flooring", name: "أعمال الأرضيات", icon: "📐", color: "bg-green-500" },
  { id: "electrical", name: "الأعمال الكهربائية", icon: "⚡", color: "bg-yellow-500" },
  { id: "plumbing", name: "أعمال السباكة", icon: "💧", color: "bg-cyan-500" },
]

export default function BOQPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredItems = mockBOQItems.filter(item => {
    const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    totalItems: mockBOQItems.length,
    totalBudget: mockBOQItems.reduce((sum, item) => sum + item.totalPrice, 0),
    totalExecuted: mockBOQItems.reduce((sum, item) => sum + (item.executed * item.unitPrice), 0),
    totalRemaining: mockBOQItems.reduce((sum, item) => sum + (item.remaining * item.unitPrice), 0),
    avgProgress: mockBOQItems.reduce((sum, item) => sum + item.progress, 0) / mockBOQItems.length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">حصر الكميات (BOQ)</h1>
          <p className="text-gray-600 mt-1">Bill of Quantities - جدول الكميات والأسعار</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي البنود</p>
                <p className="text-2xl font-bold">{stats.totalItems}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Ruler className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قيمة العقد</p>
                <p className="text-xl font-bold text-purple-600">{formatCurrency(stats.totalBudget)}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المنفذ</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(stats.totalExecuted)}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المتبقي</p>
                <p className="text-xl font-bold text-orange-600">{formatCurrency(stats.totalRemaining)}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calculator className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">نسبة الإنجاز</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgProgress.toFixed(0)}%</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedCategory(category.name)}
          >
            <CardContent className="p-4 text-center">
              <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-2`}>
                {category.icon}
              </div>
              <p className="text-xs font-semibold">{category.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في بنود الكميات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الفئات</option>
          <option value="أعمال الخرسانة">أعمال الخرسانة</option>
          <option value="أعمال الحديد">أعمال الحديد</option>
          <option value="أعمال البلوك">أعمال البناء</option>
          <option value="أعمال اللياسة">أعمال اللياسة</option>
          <option value="أعمال الدهانات">أعمال الدهانات</option>
        </select>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير BOQ
        </Button>
        <Link href="/dashboard/projects/bom/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            إضافة بند
          </Button>
        </Link>
      </div>

      {/* BOQ Table */}
      <Card>
        <CardHeader>
          <CardTitle>جدول حصر الكميات</CardTitle>
          <CardDescription>Bill of Quantities - الكميات والأسعار التفصيلية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-right p-3 font-semibold">#</th>
                  <th className="text-right p-3 font-semibold">الفئة</th>
                  <th className="text-right p-3 font-semibold">البند</th>
                  <th className="text-right p-3 font-semibold">الوحدة</th>
                  <th className="text-right p-3 font-semibold">الكمية</th>
                  <th className="text-right p-3 font-semibold">سعر الوحدة</th>
                  <th className="text-right p-3 font-semibold">الإجمالي</th>
                  <th className="text-right p-3 font-semibold">المنفذ</th>
                  <th className="text-right p-3 font-semibold">المتبقي</th>
                  <th className="text-right p-3 font-semibold">نسبة الإنجاز</th>
                  <th className="text-right p-3 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono">{index + 1}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="p-3 font-medium">{item.item}</td>
                    <td className="p-3 text-center font-semibold">{item.unit}</td>
                    <td className="p-3 text-center font-bold">{item.quantity.toLocaleString()}</td>
                    <td className="p-3 text-right">{formatCurrency(item.unitPrice)}</td>
                    <td className="p-3 text-right font-bold text-purple-600">{formatCurrency(item.totalPrice)}</td>
                    <td className="p-3 text-center text-green-600 font-semibold">{item.executed.toLocaleString()}</td>
                    <td className="p-3 text-center text-orange-600 font-semibold">{item.remaining.toLocaleString()}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{item.progress}%</span>
                      </div>
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
                  <td colSpan={6} className="p-3 text-center text-lg">المجموع الكلي</td>
                  <td className="p-3 text-right text-purple-600 text-lg">{formatCurrency(stats.totalBudget)}</td>
                  <td colSpan={2} className="p-3 text-center">
                    <div className="flex gap-4 justify-center">
                      <span className="text-green-600">{formatCurrency(stats.totalExecuted)}</span>
                      <span className="text-orange-600">{formatCurrency(stats.totalRemaining)}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center text-blue-600 text-lg">{stats.avgProgress.toFixed(0)}%</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Category Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ملخص التكاليف</CardTitle>
            <CardDescription>توزيع التكاليف حسب الفئات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="font-medium">قيمة العقد الكلية</span>
                <span className="text-xl font-bold text-purple-600">{formatCurrency(stats.totalBudget)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium">المبالغ المنفذة</span>
                <span className="text-xl font-bold text-green-600">{formatCurrency(stats.totalExecuted)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="font-medium">المبالغ المتبقية</span>
                <span className="text-xl font-bold text-orange-600">{formatCurrency(stats.totalRemaining)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>التقدم العام</CardTitle>
            <CardDescription>نسبة الإنجاز الكلية للمشروع</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="relative inline-flex items-center justify-center w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-blue-600"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 56}
                    strokeDashoffset={2 * Math.PI * 56 * (1 - stats.avgProgress / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <span className="absolute text-3xl font-bold text-blue-600">
                  {stats.avgProgress.toFixed(0)}%
                </span>
              </div>
              <p className="text-gray-600 mt-4">نسبة الإنجاز الكلية</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/projects/bom/import">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">استيراد BOQ</h3>
                  <p className="text-sm text-gray-600">استيراد من Excel</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/bom/export">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تصدير BOQ</h3>
                  <p className="text-sm text-gray-600">تصدير إلى Excel/PDF</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/bom/analysis">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تحليل التكاليف</h3>
                  <p className="text-sm text-gray-600">تحليل مفصل</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FolderKanban className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المشاريع</h3>
                  <p className="text-sm text-gray-600">العودة للمشاريع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}


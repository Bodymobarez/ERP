"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft, 
  Download, 
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Calculator,
  Eye,
  Print,
  Share2
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const mockReports = [
  {
    id: "1",
    name: "قائمة المركز المالي",
    description: "عرض الأصول والخصوم وحقوق الملكية في تاريخ محدد",
    icon: BarChart3,
    color: "bg-blue-500",
    type: "financial",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "2",
    name: "قائمة الدخل",
    description: "عرض الإيرادات والمصروفات وصافي الربح",
    icon: TrendingUp,
    color: "bg-green-500",
    type: "financial",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "3",
    name: "قائمة التدفق النقدي",
    description: "عرض التدفقات النقدية الداخلة والخارجة",
    icon: DollarSign,
    color: "bg-purple-500",
    type: "financial",
    lastGenerated: "2024-01-14",
    status: "ready"
  },
  {
    id: "4",
    name: "ميزان المراجعة",
    description: "عرض جميع الحسابات وأرصدتها",
    icon: Calculator,
    color: "bg-orange-500",
    type: "accounting",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "5",
    name: "دفتر الأستاذ العام",
    description: "عرض جميع العمليات المحاسبية",
    icon: FileText,
    color: "bg-red-500",
    type: "accounting",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "6",
    name: "كشف حساب مفصل",
    description: "كشف حساب مفصل لأي حساب محاسبي",
    icon: PieChart,
    color: "bg-teal-500",
    type: "accounting",
    lastGenerated: "2024-01-13",
    status: "ready"
  },
  {
    id: "7",
    name: "تقرير المبيعات",
    description: "تقرير مفصل عن المبيعات والإيرادات",
    icon: TrendingUp,
    color: "bg-indigo-500",
    type: "business",
    lastGenerated: "2024-01-14",
    status: "ready"
  },
  {
    id: "8",
    name: "تقرير المصروفات",
    description: "تقرير مفصل عن جميع المصروفات",
    icon: TrendingDown,
    color: "bg-pink-500",
    type: "business",
    lastGenerated: "2024-01-14",
    status: "ready"
  },
  {
    id: "9",
    name: "تقرير العملاء",
    description: "تقرير عن العملاء والحسابات المستحقة",
    icon: FileText,
    color: "bg-cyan-500",
    type: "business",
    lastGenerated: "2024-01-13",
    status: "ready"
  }
]

export default function ReportsPage() {
  const { t, lang } = useLanguage()
  const [selectedType, setSelectedType] = useState("all")
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const filteredReports = mockReports.filter(report => 
    selectedType === "all" || report.type === selectedType
  )

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "financial": return "مالية"
      case "accounting": return "محاسبية"
      case "business": return "تجارية"
      default: return "جميع الأنواع"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-100 text-green-800"
      case "generating": return "bg-yellow-100 text-yellow-800"
      case "error": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ready": return "جاهز"
      case "generating": return "جاري التوليد"
      case "error": return "خطأ"
      default: return "غير محدد"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/accounting">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">التقارير المالية</h1>
          <p className="text-gray-600 mt-1">عرض وتوليد التقارير المالية والمحاسبية</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي التقارير</p>
                <p className="text-xl font-bold text-blue-600">{mockReports.length}</p>
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
                <p className="text-sm font-medium text-gray-600">التقارير المالية</p>
                <p className="text-xl font-bold text-green-600">{mockReports.filter(r => r.type === 'financial').length}</p>
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
                <p className="text-sm font-medium text-gray-600">التقارير المحاسبية</p>
                <p className="text-xl font-bold text-purple-600">{mockReports.filter(r => r.type === 'accounting').length}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calculator className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">التقارير التجارية</p>
                <p className="text-xl font-bold text-orange-600">{mockReports.filter(r => r.type === 'business').length}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">جميع الأنواع</option>
            <option value="financial">التقارير المالية</option>
            <option value="accounting">التقارير المحاسبية</option>
            <option value="business">التقارير التجارية</option>
          </select>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          فلترة بالتاريخ
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير جميع التقارير
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => {
          const Icon = report.icon
          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`${report.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge className={getStatusColor(report.status)}>
                    {getStatusLabel(report.status)}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{report.name}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>النوع:</span>
                    <Badge variant="outline">{getTypeLabel(report.type)}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>آخر توليد:</span>
                    <span>{new Date(report.lastGenerated).toLocaleDateString('ar-SA')}</span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      عرض
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Print className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/accounting/trial-balance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">ميزان المراجعة</h3>
                  <p className="text-sm text-gray-600">عرض جميع الحسابات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/accounting/journal">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">دفتر الأستاذ</h3>
                  <p className="text-sm text-gray-600">عرض جميع العمليات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/accounting/new-transaction">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calculator className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">إضافة قيد جديد</h3>
                  <p className="text-sm text-gray-600">تسجيل عملية محاسبية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Report Generation Status */}
      <Card>
        <CardHeader>
          <CardTitle>حالة توليد التقارير</CardTitle>
          <CardDescription>آخر التقارير المُولدة والجاري العمل عليها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">قائمة المركز المالي</h4>
                  <p className="text-sm text-gray-600">تم توليده بنجاح في 15/01/2024</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">جاهز</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold">ميزان المراجعة</h4>
                  <p className="text-sm text-gray-600">جاري التوليد...</p>
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">جاري العمل</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">قائمة الدخل</h4>
                  <p className="text-sm text-gray-600">تم توليده بنجاح في 15/01/2024</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">جاهز</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

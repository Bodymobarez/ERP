"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Download,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Award,
  FileText,
  Eye,
  Printer,
  Share2
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockReports = [
  {
    id: "1",
    name: "تقرير الموظفين",
    description: "تقرير شامل عن جميع الموظفين وبياناتهم",
    icon: Users,
    color: "bg-blue-500",
    category: "employees",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "2",
    name: "تقرير الحضور والانصراف",
    description: "تقرير مفصل عن حضور وانصراف الموظفين",
    icon: Clock,
    color: "bg-green-500",
    category: "attendance",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "3",
    name: "تقرير الإجازات",
    description: "تقرير عن طلبات الإجازات والرصيد المتبقي",
    icon: Calendar,
    color: "bg-purple-500",
    category: "leaves",
    lastGenerated: "2024-01-14",
    status: "ready"
  },
  {
    id: "4",
    name: "تقرير الرواتب",
    description: "تقرير تفصيلي عن رواتب الموظفين",
    icon: DollarSign,
    color: "bg-orange-500",
    category: "payroll",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "5",
    name: "تقرير الأداء",
    description: "تقييم أداء الموظفين ومستوى الإنتاجية",
    icon: TrendingUp,
    color: "bg-red-500",
    category: "performance",
    lastGenerated: "2024-01-13",
    status: "ready"
  },
  {
    id: "6",
    name: "تقرير التدريب",
    description: "تقرير عن دورات التدريب وحضور الموظفين",
    icon: Award,
    color: "bg-teal-500",
    category: "training",
    lastGenerated: "2024-01-12",
    status: "ready"
  },
  {
    id: "7",
    name: "تقرير التوظيف",
    description: "إحصائيات عن التوظيف والتعيينات الجديدة",
    icon: Users,
    color: "bg-indigo-500",
    category: "recruitment",
    lastGenerated: "2024-01-14",
    status: "ready"
  },
  {
    id: "8",
    name: "تقرير الترقيات",
    description: "تقرير عن الترقيات والتطوير الوظيفي",
    icon: TrendingUp,
    color: "bg-pink-500",
    category: "promotions",
    lastGenerated: "2024-01-10",
    status: "ready"
  },
  {
    id: "9",
    name: "تقرير التكاليف",
    description: "تحليل تكاليف الموارد البشرية",
    icon: BarChart3,
    color: "bg-cyan-500",
    category: "costs",
    lastGenerated: "2024-01-15",
    status: "ready"
  }
]

export default function HRReportsPage() {
  const { t, lang } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredReports = mockReports.filter(report => 
    selectedCategory === "all" || report.category === selectedCategory
  )

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
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/hr">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">تقارير الموارد البشرية</h1>
          <p className="text-gray-600 mt-1">عرض وتوليد التقارير المختلفة للموارد البشرية</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي التقارير</p>
                <p className="text-2xl font-bold text-blue-600">{mockReports.length}</p>
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
                <p className="text-sm font-medium text-gray-600">التقارير الجاهزة</p>
                <p className="text-2xl font-bold text-green-600">{mockReports.filter(r => r.status === 'ready').length}</p>
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
                <p className="text-sm font-medium text-gray-600">آخر تحديث</p>
                <p className="text-lg font-bold text-purple-600">اليوم</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">التصنيفات</p>
                <p className="text-2xl font-bold text-orange-600">6</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع التقارير</option>
          <option value="employees">تقارير الموظفين</option>
          <option value="attendance">تقارير الحضور</option>
          <option value="leaves">تقارير الإجازات</option>
          <option value="payroll">تقارير الرواتب</option>
          <option value="performance">تقارير الأداء</option>
          <option value="training">تقارير التدريب</option>
        </select>
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
                <CardTitle className="text-lg mt-4">{report.name}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
                      <Printer className="h-4 w-4" />
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
                  <h4 className="font-semibold">تقرير الموظفين</h4>
                  <p className="text-sm text-gray-600">تم توليده بنجاح في 15/01/2024</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">جاهز</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">تقرير الرواتب</h4>
                  <p className="text-sm text-gray-600">تم توليده بنجاح في 15/01/2024</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">جاهز</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">تقرير الحضور</h4>
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


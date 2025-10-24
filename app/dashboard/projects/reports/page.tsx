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
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  Target,
  FileText,
  Eye,
  Printer,
  Share2,
  Users
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockReports = [
  {
    id: "1",
    name: "تقرير حالة المشاريع",
    description: "تقرير شامل عن حالة جميع المشاريع الحالية",
    icon: BarChart3,
    color: "bg-blue-500",
    category: "status",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "2",
    name: "تقرير الميزانية",
    description: "تحليل الميزانية والتكاليف الفعلية للمشاريع",
    icon: DollarSign,
    color: "bg-green-500",
    category: "budget",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "3",
    name: "تقرير التقدم",
    description: "متابعة تقدم المشاريع ونسب الإنجاز",
    icon: TrendingUp,
    color: "bg-purple-500",
    category: "progress",
    lastGenerated: "2024-01-14",
    status: "ready"
  },
  {
    id: "4",
    name: "تقرير الجدول الزمني",
    description: "مقارنة المواعيد المخططة بالفعلية",
    icon: Calendar,
    color: "bg-orange-500",
    category: "timeline",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "5",
    name: "تقرير المهام",
    description: "تقرير تفصيلي عن جميع المهام ومستوى الإنجاز",
    icon: CheckCircle2,
    color: "bg-red-500",
    category: "tasks",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "6",
    name: "تقرير المعالم",
    description: "متابعة المعالم الرئيسية والإنجازات",
    icon: Target,
    color: "bg-teal-500",
    category: "milestones",
    lastGenerated: "2024-01-13",
    status: "ready"
  },
  {
    id: "7",
    name: "تقرير فريق العمل",
    description: "تحليل أداء فرق العمل والموارد المخصصة",
    icon: Users,
    color: "bg-indigo-500",
    category: "team",
    lastGenerated: "2024-01-14",
    status: "ready"
  },
  {
    id: "8",
    name: "تقرير المخاطر",
    description: "تحليل المخاطر المحتملة والمشاكل",
    icon: Clock,
    color: "bg-pink-500",
    category: "risks",
    lastGenerated: "2024-01-12",
    status: "ready"
  },
  {
    id: "9",
    name: "تقرير الجودة",
    description: "تقييم جودة التسليمات والمخرجات",
    icon: PieChart,
    color: "bg-cyan-500",
    category: "quality",
    lastGenerated: "2024-01-13",
    status: "ready"
  }
]

export default function ProjectsReportsPage() {
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
        <Link href="/dashboard/projects">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">تقارير المشاريع</h1>
          <p className="text-gray-600 mt-1">عرض وتوليد التقارير المختلفة للمشاريع</p>
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
                <p className="text-2xl font-bold text-orange-600">9</p>
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
          <option value="status">تقارير الحالة</option>
          <option value="budget">تقارير الميزانية</option>
          <option value="progress">تقارير التقدم</option>
          <option value="timeline">تقارير الجدول الزمني</option>
          <option value="tasks">تقارير المهام</option>
          <option value="team">تقارير فريق العمل</option>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/projects">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المشاريع</h3>
                  <p className="text-sm text-gray-600">العودة لقائمة المشاريع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/tasks">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المهام</h3>
                  <p className="text-sm text-gray-600">عرض جميع المهام</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/milestones">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المعالم</h3>
                  <p className="text-sm text-gray-600">عرض المعالم الرئيسية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}


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
  Target,
  CheckCircle2,
  Circle,
  Calendar,
  FolderKanban,
  Eye,
  Edit,
  Plus,
  TrendingUp
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockMilestones = [
  {
    id: "1",
    title: "إطلاق النسخة التجريبية",
    description: "إطلاق النسخة الأولى للاختبار",
    project: "نظام ERP",
    dueDate: "2024-02-15",
    completionDate: "2024-02-10",
    status: "completed",
    progress: 100,
    dependencies: 0
  },
  {
    id: "2",
    title: "اكتمال المرحلة الأولى",
    description: "إنهاء جميع مهام المرحلة الأولى",
    project: "نظام ERP",
    dueDate: "2024-03-01",
    completionDate: null,
    status: "in-progress",
    progress: 75,
    dependencies: 2
  },
  {
    id: "3",
    title: "مراجعة التصميم",
    description: "مراجعة واعتماد التصميم النهائي",
    project: "نظام إدارة المشاريع",
    dueDate: "2024-02-20",
    completionDate: null,
    status: "pending",
    progress: 40,
    dependencies: 1
  },
  {
    id: "4",
    title: "اختبار النظام",
    description: "إجراء اختبارات شاملة للنظام",
    project: "نظام ERP",
    dueDate: "2024-03-15",
    completionDate: null,
    status: "pending",
    progress: 20,
    dependencies: 3
  },
  {
    id: "5",
    title: "التسليم النهائي",
    description: "تسليم المشروع للعميل",
    project: "نظام إدارة المشاريع",
    dueDate: "2024-04-01",
    completionDate: null,
    status: "pending",
    progress: 0,
    dependencies: 5
  },
]

export default function MilestonesPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredMilestones = mockMilestones.filter(milestone => {
    const matchesSearch = milestone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         milestone.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         milestone.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || milestone.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockMilestones.length,
    completed: mockMilestones.filter(m => m.status === 'completed').length,
    inProgress: mockMilestones.filter(m => m.status === 'in-progress').length,
    pending: mockMilestones.filter(m => m.status === 'pending').length,
    avgProgress: mockMilestones.reduce((sum, m) => sum + m.progress, 0) / mockMilestones.length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      case "pending": return "bg-gray-100 text-gray-800"
      case "delayed": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "مكتمل"
      case "in-progress": return "قيد العمل"
      case "pending": return "قيد الانتظار"
      case "delayed": return "متأخر"
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-5 w-5" />
      case "in-progress": return <TrendingUp className="h-5 w-5" />
      case "pending": return <Circle className="h-5 w-5" />
      default: return null
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
          <h1 className="text-3xl font-bold text-gray-900">المعالم الرئيسية</h1>
          <p className="text-gray-600 mt-1">متابعة المراحل المهمة في المشاريع</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المعالم</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مكتملة</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
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
                <p className="text-sm font-medium text-gray-600">قيد العمل</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط التقدم</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgProgress.toFixed(0)}%</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
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
              placeholder="البحث في المعالم الرئيسية..."
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
          <option value="pending">قيد الانتظار</option>
          <option value="in-progress">قيد العمل</option>
          <option value="completed">مكتملة</option>
        </select>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
      </div>

      {/* Milestones Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>المعالم الرئيسية</CardTitle>
              <CardDescription>جميع المعالم المهمة في المشاريع</CardDescription>
            </div>
            <Link href="/dashboard/projects/milestones/new">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                معلم جديد
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredMilestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {/* Timeline Line */}
                {index < filteredMilestones.length - 1 && (
                  <div className="absolute right-6 top-12 w-0.5 h-full bg-gray-200" />
                )}
                
                <div className="flex gap-4">
                  {/* Timeline Dot */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    milestone.status === 'completed' ? 'bg-green-500' :
                    milestone.status === 'in-progress' ? 'bg-blue-500' :
                    'bg-gray-300'
                  }`}>
                    {getStatusIcon(milestone.status)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{milestone.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <FolderKanban className="h-3 w-3" />
                              {milestone.project}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              الموعد: {new Date(milestone.dueDate).toLocaleDateString('ar-SA')}
                            </span>
                            {milestone.completionDate && (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle2 className="h-3 w-3" />
                                اكتمل في: {new Date(milestone.completionDate).toLocaleDateString('ar-SA')}
                              </span>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusColor(milestone.status)}>
                          {getStatusLabel(milestone.status)}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">التقدم</span>
                          <span className="font-medium">{milestone.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              milestone.status === 'completed' ? 'bg-green-600' :
                              milestone.status === 'in-progress' ? 'bg-blue-600' :
                              'bg-gray-400'
                            }`}
                            style={{ width: `${milestone.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <div className="text-sm text-gray-600">
                          <span>المهام التابعة: {milestone.dependencies}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معدل الإنجاز</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">المكتملة:</span>
                <span className="font-semibold text-green-600">
                  {((stats.completed / stats.total) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">قيد العمل:</span>
                <span className="font-semibold text-blue-600">
                  {((stats.inProgress / stats.total) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">قيد الانتظار:</span>
                <span className="font-semibold text-gray-600">
                  {((stats.pending / stats.total) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">التقدم العام</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">{stats.avgProgress.toFixed(0)}%</p>
              <p className="text-sm text-gray-600 mt-2">متوسط التقدم في المعالم</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">المعالم القادمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockMilestones
                .filter(m => m.status !== 'completed')
                .slice(0, 3)
                .map((milestone) => (
                  <div key={milestone.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate">{milestone.title}</span>
                    <span className="font-medium whitespace-nowrap ml-2">
                      {new Date(milestone.dueDate).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


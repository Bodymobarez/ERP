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
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  XCircle,
  Eye,
  Edit,
  Plus,
  Calendar,
  User,
  FolderKanban
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockTasks = [
  {
    id: "1",
    title: "تصميم واجهة المستخدم",
    description: "تصميم واجهة المستخدم للنظام الجديد",
    project: "نظام ERP",
    assignedTo: "أحمد محمد",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-02-01",
    progress: 65,
    estimatedHours: 40,
    actualHours: 26
  },
  {
    id: "2",
    title: "تطوير قاعدة البيانات",
    description: "إنشاء وتصميم قاعدة البيانات",
    project: "نظام ERP",
    assignedTo: "فاطمة أحمد",
    status: "completed",
    priority: "critical",
    dueDate: "2024-01-15",
    progress: 100,
    estimatedHours: 60,
    actualHours: 58
  },
  {
    id: "3",
    title: "كتابة الوثائق الفنية",
    description: "توثيق جميع الوظائف والمكونات",
    project: "نظام إدارة المشاريع",
    assignedTo: "محمد علي",
    status: "todo",
    priority: "medium",
    dueDate: "2024-02-15",
    progress: 0,
    estimatedHours: 30,
    actualHours: 0
  },
  {
    id: "4",
    title: "اختبار الوحدات",
    description: "كتابة واختبار الوحدات البرمجية",
    project: "نظام ERP",
    assignedTo: "سارة خالد",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-25",
    progress: 45,
    estimatedHours: 50,
    actualHours: 22
  },
  {
    id: "5",
    title: "تحسين الأداء",
    description: "تحسين أداء النظام وسرعة الاستجابة",
    project: "نظام إدارة المشاريع",
    assignedTo: "خالد محمود",
    status: "on-hold",
    priority: "low",
    dueDate: "2024-03-01",
    progress: 20,
    estimatedHours: 35,
    actualHours: 7
  },
]

export default function TasksPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockTasks.length,
    todo: mockTasks.filter(t => t.status === 'todo').length,
    inProgress: mockTasks.filter(t => t.status === 'in-progress').length,
    completed: mockTasks.filter(t => t.status === 'completed').length,
    onHold: mockTasks.filter(t => t.status === 'on-hold').length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo": return "bg-gray-100 text-gray-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      case "completed": return "bg-green-100 text-green-800"
      case "on-hold": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "todo": return "للتنفيذ"
      case "in-progress": return "قيد العمل"
      case "completed": return "مكتمل"
      case "on-hold": return "متوقف"
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "todo": return <Circle className="h-4 w-4" />
      case "in-progress": return <Clock className="h-4 w-4" />
      case "completed": return <CheckCircle2 className="h-4 w-4" />
      case "on-hold": return <AlertTriangle className="h-4 w-4" />
      default: return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-gray-100 text-gray-800"
      case "medium": return "bg-blue-100 text-blue-800"
      case "high": return "bg-orange-100 text-orange-800"
      case "critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "low": return "منخفضة"
      case "medium": return "متوسطة"
      case "high": return "عالية"
      case "critical": return "حرجة"
      default: return priority
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
          <h1 className="text-3xl font-bold text-gray-900">إدارة المهام</h1>
          <p className="text-gray-600 mt-1">متابعة وإدارة جميع مهام المشاريع</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المهام</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">للتنفيذ</p>
                <p className="text-2xl font-bold text-gray-600">{stats.todo}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Circle className="h-5 w-5 text-gray-600" />
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
                <Clock className="h-5 w-5 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">متوقفة</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.onHold}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
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
              placeholder="البحث في المهام..."
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
          <option value="todo">للتنفيذ</option>
          <option value="in-progress">قيد العمل</option>
          <option value="completed">مكتملة</option>
          <option value="on-hold">متوقفة</option>
        </select>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          فلترة
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>قائمة المهام</CardTitle>
              <CardDescription>جميع مهام المشاريع</CardDescription>
            </div>
            <Link href="/dashboard/projects/tasks/new">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                مهمة جديدة
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FolderKanban className="h-3 w-3" />
                          {task.project}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {task.assignedTo}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(task.dueDate).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(task.priority)}>
                      {getPriorityLabel(task.priority)}
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      {getStatusLabel(task.status)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">التقدم</span>
                    <span className="font-medium">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        task.status === 'completed' ? 'bg-green-600' :
                        task.status === 'in-progress' ? 'bg-blue-600' :
                        task.status === 'on-hold' ? 'bg-yellow-600' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>الساعات المقدرة: {task.estimatedHours}h</span>
                    <span>الساعات الفعلية: {task.actualHours}h</span>
                    <span className={task.actualHours > task.estimatedHours ? 'text-red-600' : 'text-green-600'}>
                      {task.actualHours > task.estimatedHours ? 'تجاوز' : 'في الوقت المحدد'}
                    </span>
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
                <span className="text-gray-600">للتنفيذ:</span>
                <span className="font-semibold text-gray-600">
                  {((stats.todo / stats.total) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الساعات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">المقدرة:</span>
                <span className="font-semibold">
                  {mockTasks.reduce((sum, t) => sum + t.estimatedHours, 0)}h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الفعلية:</span>
                <span className="font-semibold">
                  {mockTasks.reduce((sum, t) => sum + t.actualHours, 0)}h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الفرق:</span>
                <span className={`font-semibold ${
                  mockTasks.reduce((sum, t) => sum + t.actualHours, 0) > 
                  mockTasks.reduce((sum, t) => sum + t.estimatedHours, 0) ? 
                  'text-red-600' : 'text-green-600'
                }`}>
                  {Math.abs(
                    mockTasks.reduce((sum, t) => sum + t.actualHours, 0) - 
                    mockTasks.reduce((sum, t) => sum + t.estimatedHours, 0)
                  )}h
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الأولويات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">حرجة:</span>
                <span className="font-semibold text-red-600">
                  {mockTasks.filter(t => t.priority === 'critical').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">عالية:</span>
                <span className="font-semibold text-orange-600">
                  {mockTasks.filter(t => t.priority === 'high').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">متوسطة:</span>
                <span className="font-semibold text-blue-600">
                  {mockTasks.filter(t => t.priority === 'medium').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


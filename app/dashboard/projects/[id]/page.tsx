"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowRight, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Edit,
  Share2,
  Download,
  FolderKanban,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  BarChart3,
  FileText,
  Target,
  MapPin,
  Ruler,
  HardHat,
  Truck,
  Building2,
  Star,
  User,
  Phone,
  Mail,
  Globe,
  MapIcon,
  Calendar as CalendarIcon,
  Settings,
  Archive,
  Trash2
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Helper function for number formatting
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { t, lang } = useLanguage()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (params.id) {
      fetch(`/api/projects/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error("Error:", data.error)
          } else {
            setProject(data)
          }
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching project:", error)
          setLoading(false)
        })
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">المشروع غير موجود</h3>
        <p className="text-gray-600 mb-4">لم يتم العثور على المشروع المطلوب</p>
        <Link href="/dashboard/projects">
          <Button>
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة للمشاريع
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{project.name}</h1>
                <div className="text-gray-600 flex items-center gap-2 mt-1">
                  <span className="font-mono text-sm">{project.code}</span>
                  <StatusBadge status={project.status} />
                  <PriorityBadge priority={project.priority} />
                </div>
              </div>
            </div>
            <p className="text-gray-700 max-w-2xl">{project.description}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 lg:min-w-[200px]">
          <Link href={`/dashboard/projects/${project.id}/edit`}>
            <Button className="w-full sm:w-auto">
              <Edit className="h-4 w-4 mr-2" />
              تعديل المشروع
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">نسبة الإنجاز</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{project.progress}%</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
            <Progress value={project.progress} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قيمة العقد</p>
                <p className="text-xl font-bold mt-1 text-purple-600">{formatNumber(project.budget)} ريال</p>
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
                <p className="text-sm text-gray-600">التكلفة الفعلية</p>
                <p className="text-xl font-bold mt-1 text-orange-600">{formatNumber(project.actualCost || 0)} ريال</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المهام</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{project.tasks?.length || 0}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">نظرة عامة</TabsTrigger>
          <TabsTrigger value="tasks" className="text-xs sm:text-sm">المهام</TabsTrigger>
          <TabsTrigger value="phases" className="text-xs sm:text-sm">المراحل</TabsTrigger>
          <TabsTrigger value="milestones" className="text-xs sm:text-sm">المعالم</TabsTrigger>
          <TabsTrigger value="timeline" className="text-xs sm:text-sm">الجدول الزمني</TabsTrigger>
          <TabsTrigger value="team" className="text-xs sm:text-sm">الفريق</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Project Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    تفاصيل المشروع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-600">تاريخ البداية</label>
                      <p className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-green-500" />
                        {new Date(project.startDate).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">تاريخ التسليم المخطط</label>
                      <p className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        {new Date(project.endDate).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                    {project.actualStart && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">البداية الفعلية</label>
                        <p className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-purple-500" />
                          {new Date(project.actualStart).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    )}
                    {project.actualEnd && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">التسليم الفعلي</label>
                        <p className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-orange-500" />
                          {new Date(project.actualEnd).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <label className="text-sm font-medium text-gray-600">الوصف التفصيلي</label>
                    <p className="mt-2 text-gray-700 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="border-t pt-4">
                    <label className="text-sm font-medium text-gray-600">منشئ المشروع</label>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="bg-gray-100 rounded-full p-2">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{project.createdBy?.firstName} {project.createdBy?.lastName}</p>
                        <p className="text-sm text-gray-600">تم الإنشاء في {new Date(project.createdAt).toLocaleDateString('ar-SA')}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    الملخص المالي
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">الميزانية المخططة</span>
                      <span className="text-lg font-bold text-purple-600">{formatNumber(project.budget)} ريال</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">التكلفة الفعلية</span>
                      <span className="text-lg font-bold text-orange-600">{formatNumber(project.actualCost || 0)} ريال</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">المتبقي من الميزانية</span>
                      <span className="text-lg font-bold text-gray-700">{formatNumber(project.budget - (project.actualCost || 0))} ريال</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>نسبة الإنفاق</span>
                        <span>{project.budget > 0 ? Math.round(((project.actualCost || 0) / project.budget) * 100) : 0}%</span>
                      </div>
                      <Progress 
                        value={project.budget > 0 ? ((project.actualCost || 0) / project.budget) * 100 : 0} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    تقدم المشروع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{project.progress}%</div>
                    <Progress value={project.progress} className="h-3" />
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">المراحل</span>
                      <span className="font-medium">{project.phases?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المعالم</span>
                      <span className="font-medium">{project.milestones?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المهام</span>
                      <span className="font-medium">{project.tasks?.length || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>إجراءات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href={`/dashboard/projects/${project.id}/tasks`}>
                    <Button variant="outline" className="w-full justify-start">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      إدارة المهام
                    </Button>
                  </Link>
                  <Link href={`/dashboard/projects/${project.id}/milestones`}>
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      المعالم والمراحل
                    </Button>
                  </Link>
                  <Link href={`/dashboard/projects/${project.id}/bom`}>
                    <Button variant="outline" className="w-full justify-start">
                      <Ruler className="h-4 w-4 mr-2" />
                      حصر الكميات
                    </Button>
                  </Link>
                  <Link href={`/dashboard/projects/${project.id}/reports`}>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      التقارير
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Project Status */}
              <Card>
                <CardHeader>
                  <CardTitle>معلومات الحالة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">الحالة الحالية</span>
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">الأولوية</span>
                    <PriorityBadge priority={project.priority} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">آخر تحديث</span>
                    <span className="text-sm font-medium">{new Date(project.updatedAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>مهام المشروع</CardTitle>
                <Link href={`/dashboard/projects/${project.id}/tasks/new`}>
                  <Button size="sm">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    مهمة جديدة
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {project.tasks && project.tasks.length > 0 ? (
                <div className="space-y-3">
                  {project.tasks.map((task: any) => (
                    <div key={task.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={task.status} />
                          <PriorityBadge priority={task.priority} />
                        </div>
                      </div>
                      {task.description && (
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      )}
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          {task.assignedTo && (
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {task.assignedTo.firstName} {task.assignedTo.lastName}
                            </span>
                          )}
                          {task.dueDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(task.dueDate).toLocaleDateString('ar-SA')}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">عرض</Button>
                          <Button variant="ghost" size="sm">تعديل</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">لا توجد مهام بعد</p>
                  <Link href={`/dashboard/projects/${project.id}/tasks/new`}>
                    <Button size="sm" className="mt-2">إضافة مهمة جديدة</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phases" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>مراحل المشروع</CardTitle>
                <Link href={`/dashboard/projects/${project.id}/phases/new`}>
                  <Button size="sm">
                    <FolderKanban className="h-4 w-4 mr-2" />
                    مرحلة جديدة
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {project.phases && project.phases.length > 0 ? (
                <div className="space-y-4">
                  {project.phases.map((phase: any, index: number) => (
                    <div key={phase.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{phase.name}</h4>
                            <p className="text-sm text-gray-600">{phase.description}</p>
                          </div>
                        </div>
                        <StatusBadge status={phase.status} />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">تاريخ البداية</span>
                          <p className="font-medium">{new Date(phase.startDate).toLocaleDateString('ar-SA')}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">تاريخ النهاية</span>
                          <p className="font-medium">{new Date(phase.endDate).toLocaleDateString('ar-SA')}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">المهام</span>
                          <p className="font-medium">{phase._count?.tasks || 0}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">المعالم</span>
                          <p className="font-medium">{phase._count?.milestones || 0}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">التقدم</span>
                          <span className="font-medium">{phase.progress || 0}%</span>
                        </div>
                        <Progress value={phase.progress || 0} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FolderKanban className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">لا توجد مراحل بعد</p>
                  <Link href={`/dashboard/projects/${project.id}/phases/new`}>
                    <Button size="sm" className="mt-2">إضافة مرحلة جديدة</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>معالم المشروع</CardTitle>
                <Link href={`/dashboard/projects/${project.id}/milestones/new`}>
                  <Button size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    معلم جديد
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {project.milestones && project.milestones.length > 0 ? (
                <div className="space-y-3">
                  {project.milestones.map((milestone: any) => (
                    <div key={milestone.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 rounded-full p-2">
                            <Target className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={milestone.status} />
                          <span className="text-sm text-gray-500">
                            {new Date(milestone.dueDate).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">لا توجد معالم بعد</p>
                  <Link href={`/dashboard/projects/${project.id}/milestones/new`}>
                    <Button size="sm" className="mt-2">إضافة معلم جديد</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الجدول الزمني للمشروع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">بداية المشروع</h4>
                    <span className="text-sm text-gray-600">{new Date(project.startDate).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                
                {project.phases && project.phases.map((phase: any, index: number) => (
                  <div key={phase.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{phase.name}</h4>
                      <span className="text-sm text-gray-600">
                        {new Date(phase.startDate).toLocaleDateString('ar-SA')} - {new Date(phase.endDate).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                    <Progress value={phase.progress || 0} className="h-2" />
                  </div>
                ))}

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">نهاية المشروع</h4>
                    <span className="text-sm text-gray-600">{new Date(project.endDate).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>فريق المشروع</CardTitle>
                <Button size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  إضافة عضو
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">سيتم إضافة إدارة فريق المشروع قريباً</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    planning: "bg-gray-100 text-gray-800",
    active: "bg-green-100 text-green-800",
    "on-hold": "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const labels: Record<string, string> = {
    planning: "التخطيط",
    active: "تحت التنفيذ",
    "on-hold": "متوقف مؤقتاً",
    completed: "مكتمل",
    cancelled: "ملغي",
  }

  const icons: Record<string, JSX.Element> = {
    planning: <FileText className="h-3 w-3" />,
    active: <HardHat className="h-3 w-3" />,
    "on-hold": <Clock className="h-3 w-3" />,
    completed: <CheckCircle2 className="h-3 w-3" />,
    cancelled: <XCircle className="h-3 w-3" />,
  }

  return (
    <Badge className={colors[status] || colors.planning}>
      <div className="flex items-center gap-1">
        {icons[status]}
        {labels[status] || status}
      </div>
    </Badge>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  }

  const labels: Record<string, string> = {
    low: "منخفضة",
    medium: "متوسطة",
    high: "عالية",
    critical: "حرجة",
  }

  const icons: Record<string, JSX.Element> = {
    low: <Clock className="h-3 w-3" />,
    medium: <AlertTriangle className="h-3 w-3" />,
    high: <AlertTriangle className="h-3 w-3" />,
    critical: <XCircle className="h-3 w-3" />,
  }

  return (
    <Badge className={colors[priority] || colors.medium}>
      <div className="flex items-center gap-1">
        {icons[priority]}
        {labels[priority] || priority}
      </div>
    </Badge>
  )
}
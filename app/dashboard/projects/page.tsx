"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Search,
  Filter,
  Download,
  FolderKanban,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  FileText,
  Target,
  MapPin,
  Ruler,
  HardHat,
  Truck,
  Building2
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedTab, setSelectedTab] = useState("grid")
  const { t, lang } = useLanguage()

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching projects:", error)
        setLoading(false)
      })
  }, [])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    onHold: projects.filter(p => p.status === 'on-hold').length,
    planning: projects.filter(p => p.status === 'planning').length,
    totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
    totalActualCost: projects.reduce((sum, p) => sum + (p.actualCost || 0), 0),
    totalTasks: projects.reduce((sum, p) => sum + (p._count?.tasks || 0), 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">المشاريع الإنشائية</h1>
          <p className="text-gray-600 mt-1">إدارة ومتابعة جميع المشاريع الإنشائية والمقاولات</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/projects/sites">
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              المواقع
            </Button>
          </Link>
          <Link href="/dashboard/projects/bom">
            <Button variant="outline" size="sm">
              <Ruler className="h-4 w-4 mr-2" />
              الكميات
            </Button>
          </Link>
          <Link href="/dashboard/projects/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              مشروع جديد
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المشاريع</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تحت التنفيذ</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.active}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <HardHat className="h-6 w-6" />
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
                <p className="text-sm text-gray-600">متوقفة</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.onHold}</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي العقود</p>
                <p className="text-xl font-bold mt-1 text-purple-600">{formatCurrency(stats.totalBudget)}</p>
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
                <p className="text-xl font-bold mt-1 text-orange-600">{formatCurrency(stats.totalActualCost)}</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "grid", label: "عرض البطاقات", icon: Building2 },
            { id: "list", label: "عرض القائمة", icon: FileText },
            { id: "timeline", label: "الجدول الزمني", icon: Calendar }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في المشاريع الإنشائية..."
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
          <option value="planning">التخطيط</option>
          <option value="active">تحت التنفيذ</option>
          <option value="on-hold">متوقف مؤقتاً</option>
          <option value="completed">مكتمل</option>
          <option value="cancelled">ملغي</option>
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

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : selectedTab === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {project.code}
                      </span>
                    </CardDescription>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="font-medium">الموقع:</span>
                      <span className="mr-2">الرياض</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-green-500" />
                      <span className="font-medium">المدة:</span>
                      <span className="mr-2">
                        {new Date(project.startDate).toLocaleDateString('ar-SA')} - {new Date(project.endDate).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-purple-500" />
                        <span className="font-medium">قيمة العقد:</span>
                      </div>
                      <span className="font-bold text-purple-600">{formatCurrency(project.budget)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <TrendingUp className="h-4 w-4 mr-2 text-orange-500" />
                        <span className="font-medium">التكلفة الفعلية:</span>
                      </div>
                      <span className="font-bold text-orange-600">{formatCurrency(project.actualCost || 0)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 font-medium">نسبة الإنجاز</span>
                      <span className="font-bold text-blue-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {project._count?.tasks || 0} مهمة
                      </span>
                      <span className="flex items-center gap-1">
                        <HardHat className="h-3 w-3" />
                        {project._count?.phases || 0} مرحلة
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {project._count?.milestones || 0} معلم
                      </span>
                    </div>
                    <PriorityBadge priority={project.priority} />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      عرض
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      تعديل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : selectedTab === "list" ? (
        <Card>
          <CardHeader>
            <CardTitle>قائمة المشاريع الإنشائية</CardTitle>
            <CardDescription>عرض جميع المشاريع في قائمة تفصيلية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-4 font-semibold">الكود</th>
                    <th className="text-right p-4 font-semibold">اسم المشروع</th>
                    <th className="text-right p-4 font-semibold">نوع المشروع</th>
                    <th className="text-right p-4 font-semibold">الحالة</th>
                    <th className="text-right p-4 font-semibold">الأولوية</th>
                    <th className="text-right p-4 font-semibold">التقدم</th>
                    <th className="text-right p-4 font-semibold">قيمة العقد</th>
                    <th className="text-right p-4 font-semibold">التكلفة الفعلية</th>
                    <th className="text-right p-4 font-semibold">تاريخ البداية</th>
                    <th className="text-right p-4 font-semibold">تاريخ التسليم</th>
                    <th className="text-right p-4 font-semibold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-mono text-sm">{project.code}</td>
                      <td className="p-4 font-medium">{project.name}</td>
                      <td className="p-4">
                        <Badge variant="outline">
                          مباني سكنية
                        </Badge>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="p-4">
                        <PriorityBadge priority={project.priority} />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-purple-600">{formatCurrency(project.budget)}</td>
                      <td className="p-4 font-semibold text-orange-600">{formatCurrency(project.actualCost || 0)}</td>
                      <td className="p-4">{new Date(project.startDate).toLocaleDateString('ar-SA')}</td>
                      <td className="p-4">{new Date(project.endDate).toLocaleDateString('ar-SA')}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>الجدول الزمني للمشاريع الإنشائية</CardTitle>
            <CardDescription>عرض المشاريع على خط زمني مع التواريخ الفعلية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div key={project.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-600">{project.code}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={project.status} />
                      <PriorityBadge priority={project.priority} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">قيمة العقد</p>
                      <p className="text-lg font-bold text-purple-600">{formatCurrency(project.budget)}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">التكلفة الفعلية</p>
                      <p className="text-lg font-bold text-orange-600">{formatCurrency(project.actualCost || 0)}</p>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>📅 البداية: {new Date(project.startDate).toLocaleDateString('ar-SA')}</span>
                      <span className="font-semibold text-blue-600">⚙️ {project.progress}% مكتمل</span>
                      <span>🏁 التسليم: {new Date(project.endDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-4 rounded-full transition-all relative"
                        style={{ width: `${project.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        {project._count?.tasks || 0} مهمة
                      </span>
                      <span className="flex items-center gap-1">
                        <HardHat className="h-4 w-4 text-orange-600" />
                        {project._count?.phases || 0} مرحلة
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-blue-600" />
                        {project._count?.milestones || 0} معلم
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-purple-600" />
                        15 عامل
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
      )}

      {!loading && filteredProjects.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مشاريع إنشائية</h3>
            <p className="text-gray-600 mb-4">ابدأ بإنشاء مشروع إنشائي جديد</p>
            <Link href="/dashboard/projects/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                إنشاء مشروع
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Quick Actions - Construction Specific */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/projects/bom">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Ruler className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">حصر الكميات</h3>
                  <p className="text-sm text-gray-600">BOQ - Bill of Quantities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/sites">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">مواقع العمل</h3>
                  <p className="text-sm text-gray-600">إدارة مواقع البناء</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Truck className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المعدات الثقيلة</h3>
                  <p className="text-sm text-gray-600">إدارة معدات البناء</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/subcontractors">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <HardHat className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المقاولين من الباطن</h3>
                  <p className="text-sm text-gray-600">إدارة المقاولين</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
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

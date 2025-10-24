"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search,
  Filter,
  Download,
  Plus,
  MapPin,
  Building2,
  Users,
  Truck,
  HardHat,
  Eye,
  Edit,
  Calendar,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Camera,
  Shield,
  Wrench,
  Target,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockInspections = [
  {
    id: "1",
    siteName: "موقع البرج السكني",
    siteLocation: "الرياض - شارع الملك فهد",
    inspectorName: "م. أحمد محمد",
    inspectionDate: "2024-01-15",
    status: "completed",
    safetyScore: 95,
    qualityScore: 88,
    progressScore: 92,
    issues: 2,
    recommendations: 5,
    photos: 12,
    nextInspection: "2024-02-15",
    type: "دوري"
  },
  {
    id: "2",
    siteName: "موقع الفيلا السكنية",
    siteLocation: "جدة - حي النخيل",
    inspectorName: "م. فاطمة أحمد",
    inspectionDate: "2024-01-12",
    status: "pending",
    safetyScore: 78,
    qualityScore: 82,
    progressScore: 85,
    issues: 4,
    recommendations: 3,
    photos: 8,
    nextInspection: "2024-02-12",
    type: "مفاجئ"
  },
  {
    id: "3",
    siteName: "موقع المجمع التجاري",
    siteLocation: "الدمام - طريق الملك عبدالعزيز",
    inspectorName: "م. محمد علي",
    inspectionDate: "2024-01-10",
    status: "in-progress",
    safetyScore: 85,
    qualityScore: 90,
    progressScore: 87,
    issues: 1,
    recommendations: 2,
    photos: 15,
    nextInspection: "2024-02-10",
    type: "دوري"
  },
  {
    id: "4",
    siteName: "موقع المصنع",
    siteLocation: "الخبر - المنطقة الصناعية",
    inspectorName: "م. سارة خالد",
    inspectionDate: "2024-01-08",
    status: "completed",
    safetyScore: 92,
    qualityScore: 95,
    progressScore: 90,
    issues: 0,
    recommendations: 1,
    photos: 20,
    nextInspection: "2024-02-08",
    type: "دوري"
  }
]

const inspectionTypes = [
  { id: "safety", name: "سلامة وأمان", icon: Shield, color: "bg-red-500", count: 15 },
  { id: "quality", name: "جودة العمل", icon: Target, color: "bg-blue-500", count: 12 },
  { id: "progress", name: "معدل التقدم", icon: TrendingUp, color: "bg-green-500", count: 8 },
  { id: "equipment", name: "المعدات", icon: Wrench, color: "bg-orange-500", count: 6 },
  { id: "environment", name: "البيئة", icon: Building2, color: "bg-purple-500", count: 4 }
]

export default function InspectionPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const filteredInspections = mockInspections.filter(inspection => {
    const matchesSearch = inspection.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.inspectorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.siteLocation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || inspection.status === selectedStatus
    const matchesType = selectedType === "all" || inspection.type === selectedType
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: mockInspections.length,
    completed: mockInspections.filter(i => i.status === 'completed').length,
    pending: mockInspections.filter(i => i.status === 'pending').length,
    inProgress: mockInspections.filter(i => i.status === 'in-progress').length,
    avgSafetyScore: Math.round(mockInspections.reduce((sum, i) => sum + i.safetyScore, 0) / mockInspections.length),
    avgQualityScore: Math.round(mockInspections.reduce((sum, i) => sum + i.qualityScore, 0) / mockInspections.length),
    totalIssues: mockInspections.reduce((sum, i) => sum + i.issues, 0),
    totalPhotos: mockInspections.reduce((sum, i) => sum + i.photos, 0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "مكتمل"
      case "pending": return "معلق"
      case "in-progress": return "قيد التنفيذ"
      default: return status
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-pink-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">التفتيش الدوري</h1>
              <p className="text-red-100 text-lg">مراقبة جودة وسلامة مواقع البناء</p>
            </div>
          </div>
          <div className="hidden lg:flex gap-3">
            <Link href="/dashboard/projects/sites/inspection/new">
              <Button className="bg-white text-red-600 hover:bg-red-50 shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                تفتيش جديد
              </Button>
            </Link>
            <Link href="/dashboard/projects/sites/safety">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                <AlertTriangle className="h-5 w-5 mr-2" />
                تقارير السلامة
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">إجمالي التفتيشات</p>
                <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-red-600 mt-2">تفتيش إنشائي</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">معدل السلامة</p>
                <p className="text-4xl font-bold text-green-600">{stats.avgSafetyScore}%</p>
                <p className="text-xs text-green-600 mt-2">متوسط النقاط</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">معدل الجودة</p>
                <p className="text-4xl font-bold text-blue-600">{stats.avgQualityScore}%</p>
                <p className="text-xs text-blue-600 mt-2">جودة العمل</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">المشاكل المكتشفة</p>
                <p className="text-4xl font-bold text-orange-600">{stats.totalIssues}</p>
                <p className="text-xs text-orange-600 mt-2">تحتاج إصلاح</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inspection Types */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">أنواع التفتيش</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {inspectionTypes.map((type) => {
            const Icon = type.icon
            return (
              <Card key={type.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className={`${type.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-semibold text-sm">{type.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{type.count} تفتيش</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في التفتيشات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="completed">مكتمل</option>
          <option value="pending">معلق</option>
          <option value="in-progress">قيد التنفيذ</option>
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">جميع الأنواع</option>
          <option value="دوري">دوري</option>
          <option value="مفاجئ">مفاجئ</option>
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

      {/* Inspections List */}
      <div className="space-y-4">
        {filteredInspections.map((inspection) => (
          <Card key={inspection.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{inspection.siteName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{inspection.type}</Badge>
                      <Badge className={getStatusColor(inspection.status)}>
                        {getStatusLabel(inspection.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      {inspection.siteLocation}
                    </p>
                    <p className="text-sm text-gray-600">
                      المفتش: {inspection.inspectorName} | التاريخ: {inspection.inspectionDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">التفتيش القادم</p>
                  <p className="font-semibold text-blue-600">{inspection.nextInspection}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">نقاط السلامة</p>
                  <p className={`text-2xl font-bold ${getScoreColor(inspection.safetyScore)}`}>
                    {inspection.safetyScore}%
                  </p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">نقاط الجودة</p>
                  <p className={`text-2xl font-bold ${getScoreColor(inspection.qualityScore)}`}>
                    {inspection.qualityScore}%
                  </p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">معدل التقدم</p>
                  <p className={`text-2xl font-bold ${getScoreColor(inspection.progressScore)}`}>
                    {inspection.progressScore}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 pt-4 border-t">
                <div className="text-center p-2 bg-red-50 rounded">
                  <AlertTriangle className="h-4 w-4 text-red-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-red-600">{inspection.issues}</p>
                  <p className="text-xs text-gray-600">مشاكل</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded">
                  <Target className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-blue-600">{inspection.recommendations}</p>
                  <p className="text-xs text-gray-600">توصيات</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <Camera className="h-4 w-4 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-600">{inspection.photos}</p>
                  <p className="text-xs text-gray-600">صورة</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <FileText className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-purple-600">1</p>
                  <p className="text-xs text-gray-600">تقرير</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التقرير
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  الصور
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/projects/sites/inspection/new">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Plus className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تفتيش جديد</h3>
                  <p className="text-sm text-gray-600">إضافة تفتيش جديد</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/sites/safety">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تقارير السلامة</h3>
                  <p className="text-sm text-gray-600">تقارير مفصلة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/sites/inspection/schedule">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">جدول التفتيش</h3>
                  <p className="text-sm text-gray-600">المواعيد القادمة</p>
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
                  <h3 className="font-semibold">المواقع</h3>
                  <p className="text-sm text-gray-600">العودة للمواقع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

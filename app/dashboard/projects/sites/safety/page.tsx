"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft,
  Search,
  Filter,
  Download,
  Plus,
  AlertTriangle,
  Shield,
  HardHat,
  Eye,
  Edit,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Users,
  User,
  Wrench,
  TrendingUp,
  Calendar,
  MapPin,
  Phone
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockSafetyReports = [
  {
    id: "SR-2024-001",
    date: "2024-01-15",
    site: "موقع البرج السكني - الرياض",
    inspector: "م. خالد السلامة",
    type: "تفتيش دوري",
    status: "completed",
    score: 92,
    issues: 2,
    resolved: 2,
    critical: 0,
    medium: 2,
    low: 0,
    findings: [
      { severity: "medium", item: "عدم ارتداء بعض العمال للخوذة", status: "resolved", action: "تم التنبيه وتوفير خوذات إضافية" },
      { severity: "medium", item: "حبال السقالات تحتاج فحص", status: "resolved", action: "تم فحص واستبدال الحبال التالفة" }
    ],
    nextInspection: "2024-02-15",
    recommendations: "الموقع آمن بشكل عام، يجب متابعة ارتداء معدات السلامة"
  },
  {
    id: "SR-2024-002",
    date: "2024-01-14",
    site: "موقع المجمع التجاري - الدمام",
    inspector: "م. سارة أحمد",
    type: "تفتيش طارئ",
    status: "pending",
    score: 75,
    issues: 5,
    resolved: 2,
    critical: 1,
    medium: 3,
    low: 1,
    findings: [
      { severity: "critical", item: "سقالات غير مثبتة بشكل صحيح", status: "pending", action: "إيقاف العمل حتى الإصلاح" },
      { severity: "medium", item: "نقص في طفايات الحريق", status: "resolved", action: "تم توفير 5 طفايات إضافية" },
      { severity: "medium", item: "عدم وجود لوحات تحذير كافية", status: "resolved", action: "تم تركيب لوحات تحذيرية" },
      { severity: "medium", item: "إضاءة غير كافية في المنطقة الخلفية", status: "pending", action: "جاري التنفيذ" },
      { severity: "low", item: "صندوق الإسعافات الأولية منتهي الصلاحية", status: "pending", action: "طلب صندوق جديد" }
    ],
    nextInspection: "2024-01-21",
    recommendations: "يتطلب متابعة فورية للمشاكل الحرجة وإعادة التفتيش بعد أسبوع"
  },
  {
    id: "SR-2024-003",
    date: "2024-01-12",
    site: "موقع الفيلا السكنية - جدة",
    inspector: "م. أحمد محمد",
    type: "تفتيش دوري",
    status: "completed",
    score: 98,
    issues: 1,
    resolved: 1,
    critical: 0,
    medium: 0,
    low: 1,
    findings: [
      { severity: "low", item: "تحديث لوحة معلومات السلامة", status: "resolved", action: "تم التحديث" }
    ],
    nextInspection: "2024-02-12",
    recommendations: "موقع ممتاز من حيث السلامة، استمروا على نفس المستوى"
  }
]

const safetyIncidents = [
  {
    id: "INC-001",
    date: "2024-01-13",
    time: "10:30 AM",
    site: "موقع البرج السكني",
    type: "إصابة طفيفة",
    severity: "low",
    employee: "محمد أحمد",
    description: "جرح في اليد أثناء قطع الحديد",
    treatment: "إسعافات أولية في الموقع",
    daysLost: 0,
    status: "closed",
    reportedBy: "م. خالد",
    investigator: "م. السلامة"
  },
  {
    id: "INC-002",
    date: "2024-01-10",
    time: "02:15 PM",
    site: "موقع المجمع التجاري",
    type: "حادث",
    severity: "medium",
    employee: "أحمد خالد",
    description: "سقوط من ارتفاع منخفض",
    treatment: "نقل للمستشفى - كدمات",
    daysLost: 2,
    status: "under-investigation",
    reportedBy: "م. فاطمة",
    investigator: "لجنة السلامة"
  }
]

const safetyTrainings = [
  {
    id: "TRN-001",
    title: "دورة السلامة الأساسية",
    date: "2024-01-20",
    duration: "8 ساعات",
    location: "قاعة التدريب - الرياض",
    trainer: "م. خالد السلامة",
    capacity: 30,
    registered: 25,
    topics: ["معدات الحماية الشخصية", "السقالات الآمنة", "الإسعافات الأولية", "مكافحة الحريق"],
    status: "upcoming"
  },
  {
    id: "TRN-002",
    title: "التعامل مع المواد الخطرة",
    date: "2024-01-25",
    duration: "4 ساعات",
    location: "موقع المجمع التجاري",
    trainer: "م. سارة أحمد",
    capacity: 20,
    registered: 18,
    topics: ["المواد الكيميائية", "التخزين الآمن", "التعامل مع الانسكابات"],
    status: "upcoming"
  },
  {
    id: "TRN-003",
    title: "السلامة في المرتفعات",
    date: "2024-01-10",
    duration: "6 ساعات",
    location: "موقع البرج السكني",
    trainer: "م. محمد علي",
    capacity: 25,
    registered: 25,
    topics: ["أحزمة الأمان", "السقالات", "الرافعات"],
    status: "completed"
  }
]

export default function SafetyPage() {
  const { t, lang } = useLanguage()
  const [selectedTab, setSelectedTab] = useState<"reports" | "incidents" | "training">("reports")
  const [searchTerm, setSearchTerm] = useState("")

  const stats = {
    totalInspections: mockSafetyReports.length,
    avgScore: mockSafetyReports.reduce((sum, r) => sum + r.score, 0) / mockSafetyReports.length,
    openIssues: mockSafetyReports.reduce((sum, r) => sum + (r.issues - r.resolved), 0),
    criticalIssues: mockSafetyReports.reduce((sum, r) => sum + r.critical, 0),
    totalIncidents: safetyIncidents.length,
    daysLost: safetyIncidents.reduce((sum, i) => sum + i.daysLost, 0),
    upcomingTrainings: safetyTrainings.filter(t => t.status === 'upcoming').length,
    trainedWorkers: 68
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 75) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "critical": return "حرج"
      case "medium": return "متوسط"
      case "low": return "بسيط"
      default: return severity
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "resolved": return "bg-green-100 text-green-800"
      case "under-investigation": return "bg-orange-100 text-orange-800"
      case "closed": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "مكتمل"
      case "pending": return "معلق"
      case "resolved": return "تم الحل"
      case "under-investigation": return "قيد التحقيق"
      case "closed": return "مغلق"
      case "upcoming": return "قادم"
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects/sites">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">السلامة والأمان</h1>
          <p className="text-gray-600 mt-1">إدارة السلامة المهنية في مواقع العمل</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">التفتيشات</p>
                <p className="text-2xl font-bold mt-1">{stats.totalInspections}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط التقييم</p>
                <p className={`text-2xl font-bold mt-1 ${getScoreColor(stats.avgScore)}`}>
                  {stats.avgScore.toFixed(0)}%
                </p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مشاكل مفتوحة</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.openIssues}</p>
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
                <p className="text-sm text-gray-600">حرجة</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.criticalIssues}</p>
              </div>
              <div className="bg-red-500 text-white p-3 rounded-lg">
                <XCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الحوادث</p>
                <p className="text-2xl font-bold mt-1 text-orange-600">{stats.totalIncidents}</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">أيام ضائعة</p>
                <p className="text-2xl font-bold mt-1 text-purple-600">{stats.daysLost}</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">دورات قادمة</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{stats.upcomingTrainings}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <HardHat className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">عمال مدربين</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.trainedWorkers}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab("reports")}
            className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "reports"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Shield className="h-4 w-4" />
            تقارير التفتيش
          </button>
          <button
            onClick={() => setSelectedTab("incidents")}
            className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "incidents"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            الحوادث
          </button>
          <button
            onClick={() => setSelectedTab("training")}
            className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "training"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <HardHat className="h-4 w-4" />
            التدريبات
          </button>
        </nav>
      </div>

      {/* Content */}
      {selectedTab === "reports" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">تقارير التفتيش الدوري</h2>
            <Link href="/dashboard/projects/sites/safety/new-inspection">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                تفتيش جديد
              </Button>
            </Link>
          </div>

          {mockSafetyReports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-lg ${getStatusColor(report.status)}`}>
                      <Shield className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-xl">{report.id}</h3>
                        <Badge className={getStatusColor(report.status)}>
                          {getStatusLabel(report.status)}
                        </Badge>
                        <Badge className={getScoreBadge(report.score)}>
                          {report.score}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {report.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {report.site}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {report.inspector}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">حرجة</p>
                    <p className="text-2xl font-bold text-red-600">{report.critical}</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">متوسطة</p>
                    <p className="text-2xl font-bold text-yellow-600">{report.medium}</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">بسيطة</p>
                    <p className="text-2xl font-bold text-blue-600">{report.low}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">الملاحظات:</p>
                  <div className="space-y-2">
                    {report.findings.map((finding, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getSeverityColor(finding.severity)}>
                              {getSeverityLabel(finding.severity)}
                            </Badge>
                            <Badge className={getStatusColor(finding.status)}>
                              {getStatusLabel(finding.status)}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm font-medium mb-1">{finding.item}</p>
                        <p className="text-xs text-gray-600">الإجراء: {finding.action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <p className="text-xs text-gray-600 mb-1">التوصيات</p>
                  <p className="text-sm">{report.recommendations}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    عرض التفاصيل
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    تحميل التقرير
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    التفتيش القادم: {report.nextInspection}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "incidents" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">سجل الحوادث والإصابات</h2>
            <Link href="/dashboard/projects/sites/safety/new-incident">
              <Button size="sm" variant="destructive">
                <Plus className="h-4 w-4 mr-2" />
                تسجيل حادث
              </Button>
            </Link>
          </div>

          {safetyIncidents.map((incident) => (
            <Card key={incident.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-lg ${getSeverityColor(incident.severity)}`}>
                      <AlertTriangle className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-xl">{incident.id}</h3>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {getSeverityLabel(incident.severity)}
                        </Badge>
                        <Badge className={getStatusColor(incident.status)}>
                          {getStatusLabel(incident.status)}
                        </Badge>
                      </div>
                      <p className="text-lg font-semibold mb-1">{incident.type}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{incident.date} - {incident.time}</span>
                        <span>الموظف: {incident.employee}</span>
                      </div>
                    </div>
                  </div>
                  {incident.daysLost > 0 && (
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-600">أيام ضائعة</p>
                      <p className="text-2xl font-bold text-red-600">{incident.daysLost}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">الوصف</p>
                    <p className="text-sm font-medium">{incident.description}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">العلاج</p>
                    <p className="text-sm font-medium">{incident.treatment}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">المبلغ</p>
                    <p className="text-sm font-medium">{incident.reportedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">المحقق</p>
                    <p className="text-sm font-medium">{incident.investigator}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    عرض التحقيق
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    تحديث الحالة
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    تقرير الحادث
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "training" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">دورات السلامة والتدريب</h2>
            <Link href="/dashboard/projects/sites/safety/new-training">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                دورة تدريبية
              </Button>
            </Link>
          </div>

          {safetyTrainings.map((training) => (
            <Card key={training.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-lg bg-blue-100">
                      <HardHat className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-xl">{training.title}</h3>
                        <Badge className={getStatusColor(training.status)}>
                          {getStatusLabel(training.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {training.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {training.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {training.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">المسجلين</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {training.registered}/{training.capacity}
                    </p>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold mb-2">المحاور:</p>
                  <div className="flex flex-wrap gap-2">
                    {training.topics.map((topic, index) => (
                      <Badge key={index} variant="outline">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">المدرب</p>
                    <p className="text-sm font-semibold">{training.trainer}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">المقاعد المتبقية</p>
                    <p className="text-sm font-semibold">{training.capacity - training.registered} مقعد</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    التفاصيل
                  </Button>
                  {training.status === 'upcoming' && (
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      تسجيل عمال
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    المواد
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/projects/sites/safety/equipment">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <HardHat className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">معدات السلامة</h3>
                  <p className="text-sm text-gray-600">المخزون</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/sites/safety/checklist">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">قوائم الفحص</h3>
                  <p className="text-sm text-gray-600">Checklists</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/sites/safety/policies">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">سياسات السلامة</h3>
                  <p className="text-sm text-gray-600">اللوائح</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/sites">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-orange-600" />
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


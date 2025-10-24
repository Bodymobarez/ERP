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
  AlertTriangle
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockSites = [
  {
    id: "1",
    name: "موقع مشروع البرج السكني",
    project: "البرج السكني - الرياض",
    address: "شارع الملك فهد، الرياض 12345",
    city: "الرياض",
    supervisor: "م. أحمد محمد",
    phone: "0501234567",
    email: "site1@company.com",
    workers: 45,
    equipment: 8,
    status: "active",
    startDate: "2024-01-01",
    area: "5000 م²",
    floors: "15 طابق"
  },
  {
    id: "2",
    name: "موقع مشروع الفيلا السكنية",
    project: "مجمع الفلل - جدة",
    address: "حي النخيل، جدة 23456",
    city: "جدة",
    supervisor: "م. فاطمة أحمد",
    phone: "0507654321",
    email: "site2@company.com",
    workers: 25,
    equipment: 4,
    status: "active",
    startDate: "2024-01-15",
    area: "3000 م²",
    floors: "2 طابق"
  },
  {
    id: "3",
    name: "موقع المجمع التجاري",
    project: "المجمع التجاري - الدمام",
    address: "طريق الملك عبدالعزيز، الدمام 34567",
    city: "الدمام",
    supervisor: "م. محمد علي",
    phone: "0509876543",
    email: "site3@company.com",
    workers: 60,
    equipment: 12,
    status: "planning",
    startDate: "2024-02-01",
    area: "8000 م²",
    floors: "3 طوابق"
  },
  {
    id: "4",
    name: "موقع المصنع",
    project: "مصنع الإنتاج - الخبر",
    address: "المنطقة الصناعية، الخبر 45678",
    city: "الخبر",
    supervisor: "م. سارة خالد",
    phone: "0503456789",
    email: "site4@company.com",
    workers: 35,
    equipment: 10,
    status: "on-hold",
    startDate: "2023-12-01",
    area: "10000 م²",
    floors: "طابق واحد"
  },
]

export default function SitesPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredSites = mockSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || site.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockSites.length,
    active: mockSites.filter(s => s.status === 'active').length,
    planning: mockSites.filter(s => s.status === 'planning').length,
    totalWorkers: mockSites.reduce((sum, s) => sum + s.workers, 0),
    totalEquipment: mockSites.reduce((sum, s) => sum + s.equipment, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "planning": return "bg-blue-100 text-blue-800"
      case "on-hold": return "bg-yellow-100 text-yellow-800"
      case "completed": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "نشط"
      case "planning": return "التخطيط"
      case "on-hold": return "متوقف"
      case "completed": return "مكتمل"
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10">
          <Link href="/dashboard/projects">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">العودة للمشاريع</span>
              <span className="sm:hidden">العودة</span>
            </Button>
          </Link>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">مواقع العمل</h1>
                <p className="text-green-100 text-sm sm:text-base lg:text-lg">إدارة ومراقبة مواقع البناء والتشييد الميدانية</p>
              </div>
            </div>
            <Link href="/dashboard/projects/sites/new">
              <Button className="bg-white text-green-600 hover:bg-green-50 shadow-lg text-sm w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">موقع جديد</span>
                <span className="sm:hidden">موقع</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">إجمالي المواقع</p>
                <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-blue-600 mt-2">موقع إنشائي</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <MapPin className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">مواقع نشطة</p>
                <p className="text-4xl font-bold text-green-600">{stats.active}</p>
                <p className="text-xs text-green-600 mt-2">قيد التنفيذ</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">إجمالي العمال</p>
                <p className="text-4xl font-bold text-orange-600">{stats.totalWorkers}</p>
                <p className="text-xs text-orange-600 mt-2">يد عاملة</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                <HardHat className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">إجمالي المعدات</p>
                <p className="text-4xl font-bold text-purple-600">{stats.totalEquipment}</p>
                <p className="text-xs text-purple-600 mt-2">معدة ثقيلة</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في مواقع العمل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="planning">التخطيط</option>
            <option value="on-hold">متوقف</option>
            <option value="completed">مكتمل</option>
          </select>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">تصدير</span>
            <span className="sm:hidden">تصدير</span>
          </Button>
          <Link href="/dashboard/projects/sites/new">
            <Button size="sm" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">موقع جديد</span>
              <span className="sm:hidden">موقع</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Enhanced Sites Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
        {filteredSites.map((site) => (
          <Card key={site.id} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-200 group">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-500 to-blue-500"></div>
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl shadow-lg ${site.status === 'active' ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-gray-500 to-gray-600'} group-hover:scale-110 transition-transform`}>
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{site.name}</CardTitle>
                    <CardDescription className="mt-1 text-sm font-medium">{site.project}</CardDescription>
                  </div>
                </div>
                <Badge className={`${getStatusColor(site.status)} px-3 py-1 text-sm font-semibold`}>
                  {getStatusLabel(site.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">{site.address}</p>
                    <p className="text-gray-500">{site.city}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <HardHat className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">المشرف</p>
                      <p className="font-medium">{site.supervisor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-xs text-gray-500">تاريخ البدء</p>
                      <p className="font-medium">{site.startDate}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-purple-500" />
                    <p className="font-medium direction-ltr text-right">{site.phone}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-orange-500" />
                    <p className="font-medium text-xs">{site.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 pt-3 border-t">
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <Users className="h-4 w-4 text-orange-600 mx-auto mb-1" />
                    <p className="text-lg font-bold text-orange-600">{site.workers}</p>
                    <p className="text-xs text-gray-600">عامل</p>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <Truck className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                    <p className="text-lg font-bold text-purple-600">{site.equipment}</p>
                    <p className="text-xs text-gray-600">معدة</p>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <Building2 className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm font-bold text-blue-600">{site.area}</p>
                    <p className="text-xs text-gray-600">المساحة</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <Building2 className="h-4 w-4 text-green-600 mx-auto mb-1" />
                    <p className="text-sm font-bold text-green-600">{site.floors}</p>
                    <p className="text-xs text-gray-600">الطوابق</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    عرض التفاصيل
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/projects/sites/safety">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold">السلامة والأمان</h3>
                  <p className="text-sm text-gray-600">تقارير السلامة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/sites/inspection">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التفتيش الدوري</h3>
                  <p className="text-sm text-gray-600">جولات التفتيش</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-green-600" />
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


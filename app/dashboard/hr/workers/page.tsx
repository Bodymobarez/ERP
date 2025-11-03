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
  HardHat,
  Users,
  CheckCircle2,
  Clock,
  Eye,
  Edit,
  MapPin,
  Wrench,
  Building2,
  Award,
  Calendar,
  DollarSign,
  FileText
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

const mockWorkers = [
  {
    id: "1",
    name: "أحمد محمد علي",
    nationality: "مصري",
    occupation: "بناء",
    specialty: "مباني",
    experience: "10 سنوات",
    site: "موقع البرج السكني - الرياض",
    dailyWage: 150,
    phone: "0501234567",
    iqamaNumber: "2345678901",
    status: "active",
    rating: 4.5,
    projectsCompleted: 8
  },
  {
    id: "2",
    name: "محمد خالد حسن",
    nationality: "سوري",
    occupation: "نجار",
    specialty: "نجارة مسلحة",
    experience: "8 سنوات",
    site: "موقع البرج السكني - الرياض",
    dailyWage: 180,
    phone: "0507654321",
    iqamaNumber: "3456789012",
    status: "active",
    rating: 4.8,
    projectsCompleted: 12
  },
  {
    id: "3",
    name: "عبدالله يوسف",
    nationality: "يمني",
    occupation: "حداد",
    specialty: "حديد تسليح",
    experience: "12 سنوات",
    site: "موقع الفيلا - جدة",
    dailyWage: 200,
    phone: "0509876543",
    iqamaNumber: "4567890123",
    status: "active",
    rating: 4.9,
    projectsCompleted: 15
  },
  {
    id: "4",
    name: "خالد عمر أحمد",
    nationality: "سوداني",
    occupation: "كهربائي",
    specialty: "كهرباء إنشائية",
    experience: "7 سنوات",
    site: "موقع المجمع التجاري - الدمام",
    dailyWage: 170,
    phone: "0503456789",
    iqamaNumber: "5678901234",
    status: "active",
    rating: 4.6,
    projectsCompleted: 10
  },
  {
    id: "5",
    name: "يوسف محمود",
    nationality: "باكستاني",
    occupation: "سباك",
    specialty: "سباكة وصرف صحي",
    experience: "6 سنوات",
    site: "موقع الفيلا - جدة",
    dailyWage: 160,
    phone: "0506543210",
    iqamaNumber: "6789012345",
    status: "on-leave",
    rating: 4.3,
    projectsCompleted: 7
  },
  {
    id: "6",
    name: "حسن علي محمد",
    nationality: "بنغلاديشي",
    occupation: "دهان",
    specialty: "دهانات وديكور",
    experience: "5 سنوات",
    site: "المستودع الرئيسي",
    dailyWage: 140,
    phone: "0502345678",
    iqamaNumber: "7890123456",
    status: "available",
    rating: 4.1,
    projectsCompleted: 6
  },
]

const occupations = [
  { id: "mason", name: "بناء", icon: "🧱", color: "bg-red-500", count: 15 },
  { id: "carpenter", name: "نجار", icon: "🪵", color: "bg-orange-500", count: 8 },
  { id: "steel", name: "حداد", icon: "⚒️", color: "bg-gray-700", count: 10 },
  { id: "electrician", name: "كهربائي", icon: "⚡", color: "bg-yellow-500", count: 6 },
  { id: "plumber", name: "سباك", icon: "💧", color: "bg-blue-500", count: 5 },
  { id: "painter", name: "دهان", icon: "🎨", color: "bg-purple-500", count: 7 },
  { id: "tile", name: "بلاط", icon: "📐", color: "bg-teal-500", count: 4 },
  { id: "welder", name: "لحام", icon: "🔥", color: "bg-pink-500", count: 3 },
]

export default function WorkersPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.nationality.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || worker.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockWorkers.length,
    active: mockWorkers.filter(w => w.status === 'active').length,
    available: mockWorkers.filter(w => w.status === 'available').length,
    onLeave: mockWorkers.filter(w => w.status === 'on-leave').length,
    totalDailyWage: mockWorkers.reduce((sum, w) => sum + w.dailyWage, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "available": return "bg-blue-100 text-blue-800"
      case "on-leave": return "bg-yellow-100 text-yellow-800"
      case "terminated": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "نشط بالموقع"
      case "available": return "متاح للتعيين"
      case "on-leave": return "في إجازة"
      case "terminated": return "منتهي العقد"
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
          <h1 className="text-3xl font-bold text-gray-900">العمال والفنيين</h1>
          <p className="text-gray-600 mt-1">إدارة العمالة في المشاريع الإنشائية</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي العمال</p>
                <p className="text-2xl font-bold">{stats.total}</p>
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
                <p className="text-sm text-gray-600">نشط بالموقع</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متاح</p>
                <p className="text-2xl font-bold text-blue-600">{stats.available}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">في إجازة</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.onLeave}</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الأجور اليومية</p>
                <p className="text-xl font-bold text-purple-600">{formatCurrency(stats.totalDailyWage)}</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Occupations */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {occupations.map((occ) => (
          <Card key={occ.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-3 text-center">
              <div className={`${occ.color} w-10 h-10 rounded-full flex items-center justify-center text-xl mx-auto mb-2`}>
                {occ.icon}
              </div>
              <p className="font-semibold text-xs">{occ.name}</p>
              <p className="text-xs text-gray-600">{occ.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في العمال..."
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
          <option value="active">نشط بالموقع</option>
          <option value="available">متاح للتعيين</option>
          <option value="on-leave">في إجازة</option>
          <option value="terminated">منتهي العقد</option>
        </select>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
        <Link href="/dashboard/hr/workers/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            عامل جديد
          </Button>
        </Link>
      </div>

      {/* Workers List */}
      <div className="space-y-4">
        {filteredWorkers.map((worker) => (
          <Card key={worker.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-bold">
                      {getInitials(worker.name?.split(' ')[0] || '', worker.name?.split(' ')[1] || '')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{worker.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <HardHat className="h-3 w-3 mr-1" />
                        {worker.occupation}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {worker.nationality}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {worker.experience}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      التخصص: {worker.specialty} | الإقامة: {worker.iqamaNumber}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusColor(worker.status)}>
                    {getStatusLabel(worker.status)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= worker.rating ? 'text-yellow-500' : 'text-gray-300'}>
                        ⭐
                      </span>
                    ))}
                    <span className="text-sm font-medium ml-1">{worker.rating}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">الموقع:</span>
                    <span className="font-medium">{worker.site}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">المشاريع المنجزة:</span>
                    <span className="font-medium">{worker.projectsCompleted} مشروع</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-600">الأجر اليومي:</span>
                    <span className="font-bold text-purple-600">{formatCurrency(worker.dailyWage)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">الأجر الشهري (26 يوم):</span>
                    <span className="font-bold text-green-600">{formatCurrency(worker.dailyWage * 26)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل البيانات
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  سجل الحضور
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  الملف الشخصي
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/hr/attendance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الحضور اليومي</h3>
                  <p className="text-sm text-gray-600">تسجيل الحضور</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/hr/payroll">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">كشف الأجور</h3>
                  <p className="text-sm text-gray-600">إدارة الأجور</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/hr/workers/transfer">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">نقل العمال</h3>
                  <p className="text-sm text-gray-600">بين المواقع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/hr/workers/performance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تقييم الأداء</h3>
                  <p className="text-sm text-gray-600">تقييمات العمال</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}


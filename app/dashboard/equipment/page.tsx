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
  Truck,
  Wrench,
  Calendar,
  DollarSign,
  MapPin,
  Eye,
  Edit,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Settings,
  FileText
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const mockEquipment = [
  {
    id: "1",
    name: "رافعة برجية 50 طن",
    type: "رافعات",
    model: "Liebherr 550 EC-H",
    serialNumber: "TW-2023-001",
    location: "موقع البرج السكني - الرياض",
    status: "in-use",
    condition: "excellent",
    purchaseDate: "2023-01-15",
    purchasePrice: 2500000,
    currentValue: 2200000,
    maintenanceDate: "2024-01-10",
    nextMaintenance: "2024-04-10",
    operator: "خالد محمد",
    hoursUsed: 1250,
    fuelCost: 45000
  },
  {
    id: "2",
    name: "خلاطة خرسانة 1.5 م³",
    type: "معدات خرسانة",
    model: "Schwing Stetter",
    serialNumber: "CM-2023-005",
    location: "موقع الفيلا - جدة",
    status: "in-use",
    condition: "good",
    purchaseDate: "2023-03-20",
    purchasePrice: 180000,
    currentValue: 165000,
    maintenanceDate: "2024-01-05",
    nextMaintenance: "2024-03-05",
    operator: "أحمد علي",
    hoursUsed: 850,
    fuelCost: 12000
  },
  {
    id: "3",
    name: "حفارة كاتربيلر 320",
    type: "معدات حفر",
    model: "Caterpillar 320D",
    serialNumber: "EX-2022-012",
    location: "موقع المجمع التجاري - الدمام",
    status: "maintenance",
    condition: "good",
    purchaseDate: "2022-08-10",
    purchasePrice: 850000,
    currentValue: 720000,
    maintenanceDate: "2024-01-12",
    nextMaintenance: "2024-01-20",
    operator: "فهد عبدالله",
    hoursUsed: 2150,
    fuelCost: 85000
  },
  {
    id: "4",
    name: "لودر أمامي 5 طن",
    type: "معدات نقل",
    model: "Volvo L90H",
    serialNumber: "LD-2023-008",
    location: "المستودع الرئيسي",
    status: "available",
    condition: "excellent",
    purchaseDate: "2023-05-15",
    purchasePrice: 450000,
    currentValue: 425000,
    maintenanceDate: "2023-12-20",
    nextMaintenance: "2024-03-20",
    operator: "-",
    hoursUsed: 650,
    fuelCost: 28000
  },
  {
    id: "5",
    name: "قاطع حديد هيدروليكي",
    type: "معدات قطع",
    model: "Husqvarna K970",
    serialNumber: "CT-2023-015",
    location: "موقع البرج السكني - الرياض",
    status: "in-use",
    condition: "good",
    purchaseDate: "2023-06-10",
    purchasePrice: 15000,
    currentValue: 13500,
    maintenanceDate: "2023-12-15",
    nextMaintenance: "2024-02-15",
    operator: "محمد حسن",
    hoursUsed: 420,
    fuelCost: 3500
  },
]

const equipmentTypes = [
  { id: "cranes", name: "رافعات", icon: Truck, color: "bg-blue-500", count: 3 },
  { id: "concrete", name: "معدات خرسانة", icon: Settings, color: "bg-purple-500", count: 5 },
  { id: "excavation", name: "معدات حفر", icon: Wrench, color: "bg-orange-500", count: 4 },
  { id: "transport", name: "معدات نقل", icon: Truck, color: "bg-green-500", count: 6 },
  { id: "tools", name: "أدوات ومعدات", icon: Wrench, color: "bg-red-500", count: 12 },
]

export default function EquipmentPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredEquipment = mockEquipment.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || eq.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockEquipment.length,
    inUse: mockEquipment.filter(e => e.status === 'in-use').length,
    available: mockEquipment.filter(e => e.status === 'available').length,
    maintenance: mockEquipment.filter(e => e.status === 'maintenance').length,
    totalValue: mockEquipment.reduce((sum, e) => sum + e.currentValue, 0),
    totalFuelCost: mockEquipment.reduce((sum, e) => sum + e.fuelCost, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-use": return "bg-green-100 text-green-800"
      case "available": return "bg-blue-100 text-blue-800"
      case "maintenance": return "bg-yellow-100 text-yellow-800"
      case "out-of-service": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-use": return "قيد التشغيل"
      case "available": return "متاحة"
      case "maintenance": return "صيانة"
      case "out-of-service": return "خارج الخدمة"
      default: return status
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent": return "bg-green-100 text-green-800"
      case "good": return "bg-blue-100 text-blue-800"
      case "fair": return "bg-yellow-100 text-yellow-800"
      case "poor": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case "excellent": return "ممتازة"
      case "good": return "جيدة"
      case "fair": return "مقبولة"
      case "poor": return "سيئة"
      default: return condition
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 via-orange-700 to-amber-800 p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Truck className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">المعدات الإنشائية</h1>
                <p className="text-orange-100 text-sm sm:text-base lg:text-lg">إدارة شاملة للآليات والمعدات الثقيلة</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link href="/dashboard/equipment/maintenance">
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm text-sm w-full sm:w-auto">
                  <Wrench className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">جدول الصيانة</span>
                  <span className="sm:hidden">صيانة</span>
                </Button>
              </Link>
              <Link href="/dashboard/equipment/new">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg text-sm w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">معدة جديدة</span>
                  <span className="sm:hidden">معدة</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المعدات</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Truck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قيد التشغيل</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.inUse}</p>
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
                <p className="text-sm text-gray-600">متاحة</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{stats.available}</p>
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
                <p className="text-sm text-gray-600">في الصيانة</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.maintenance}</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Wrench className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">القيمة الكلية</p>
                <p className="text-xl font-bold mt-1 text-purple-600">{formatCurrency(stats.totalValue)}</p>
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
                <p className="text-sm text-gray-600">تكلفة الوقود</p>
                <p className="text-xl font-bold mt-1 text-orange-600">{formatCurrency(stats.totalFuelCost)}</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equipment Types */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {equipmentTypes.map((type) => {
          const Icon = type.icon
          return (
            <Card key={type.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className={`${type.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="font-semibold text-sm">{type.name}</p>
                <p className="text-xs text-gray-600 mt-1">{type.count} معدة</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في المعدات الإنشائية..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="all">جميع الحالات</option>
          <option value="in-use">قيد التشغيل</option>
          <option value="available">متاحة</option>
          <option value="maintenance">في الصيانة</option>
          <option value="out-of-service">خارج الخدمة</option>
        </select>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">فلترة</span>
            <span className="sm:hidden">فلتر</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">تصدير</span>
            <span className="sm:hidden">تصدير</span>
          </Button>
        </div>
      </div>

      {/* Equipment List */}
      <div className="space-y-4">
        {filteredEquipment.map((equipment) => (
          <Card key={equipment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-lg ${getStatusColor(equipment.status)}`}>
                    <Truck className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{equipment.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{equipment.type}</Badge>
                      <Badge className={getConditionColor(equipment.condition)}>
                        حالة {getConditionLabel(equipment.condition)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      الموديل: {equipment.model} | الرقم التسلسلي: {equipment.serialNumber}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(equipment.status)}>
                  {getStatusLabel(equipment.status)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">الموقع:</span>
                    <span className="font-medium">{equipment.location}</span>
                  </div>
                  {equipment.operator !== "-" && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">المشغل:</span>
                      <span className="font-medium">{equipment.operator}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-600">ساعات التشغيل:</span>
                    <span className="font-medium">{equipment.hoursUsed} ساعة</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-600">آخر صيانة:</span>
                    <span className="font-medium">{equipment.maintenanceDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-gray-600">الصيانة القادمة:</span>
                    <span className="font-medium">{equipment.nextMaintenance}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">تكلفة الوقود:</span>
                    <span className="font-medium">{formatCurrency(equipment.fuelCost)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t">
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">سعر الشراء</p>
                  <p className="text-lg font-bold text-purple-600">{formatCurrency(equipment.purchasePrice)}</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">القيمة الحالية</p>
                  <p className="text-lg font-bold text-blue-600">{formatCurrency(equipment.currentValue)}</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">الإهلاك</p>
                  <p className="text-lg font-bold text-orange-600">
                    {(((equipment.purchasePrice - equipment.currentValue) / equipment.purchasePrice) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Wrench className="h-4 w-4 mr-2" />
                  صيانة
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  السجل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/equipment/maintenance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Wrench className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold">جدول الصيانة</h3>
                  <p className="text-sm text-gray-600">الصيانة الدورية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/fuel">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تكاليف الوقود</h3>
                  <p className="text-sm text-gray-600">متابعة الاستهلاك</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التقارير</h3>
                  <p className="text-sm text-gray-600">تقارير المعدات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/rental">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التأجير</h3>
                  <p className="text-sm text-gray-600">معدات مؤجرة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

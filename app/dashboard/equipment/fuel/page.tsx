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
  Fuel,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Truck,
  Calendar,
  BarChart3,
  Eye,
  Edit,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  User
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock data for fuel transactions
const mockFuelTransactions = [
  {
    id: "FT-2024-001",
    date: "2024-07-20",
    time: "08:30",
    equipmentId: "1",
    equipmentName: "رافعة برجية 50 طن",
    equipmentType: "رافعات",
    fuelType: "ديزل",
    quantity: 250, // liters
    pricePerLiter: 2.35,
    totalCost: 587.5,
    operator: "خالد محمد",
    location: "موقع البرج السكني - الرياض",
    odometerReading: 1250,
    station: "محطة الراجحي",
    receiptNumber: "REC-20240720-001",
    status: "approved",
  },
  {
    id: "FT-2024-002",
    date: "2024-07-20",
    time: "10:15",
    equipmentId: "3",
    equipmentName: "حفارة كاتربيلر 320",
    equipmentType: "معدات حفر",
    fuelType: "ديزل",
    quantity: 180,
    pricePerLiter: 2.35,
    totalCost: 423,
    operator: "سعيد القحطاني",
    location: "موقع المجمع التجاري - الدمام",
    odometerReading: 890,
    station: "محطة الراجحي",
    receiptNumber: "REC-20240720-002",
    status: "pending",
  },
  {
    id: "FT-2024-003",
    date: "2024-07-19",
    time: "14:45",
    equipmentId: "2",
    equipmentName: "خلاطة خرسانة 1.5 م³",
    equipmentType: "معدات خرسانة",
    fuelType: "ديزل",
    quantity: 80,
    pricePerLiter: 2.35,
    totalCost: 188,
    operator: "أحمد علي",
    location: "موقع الفيلا - جدة",
    odometerReading: 850,
    station: "محطة الراجحي",
    receiptNumber: "REC-20240719-001",
    status: "approved",
  },
  {
    id: "FT-2024-004",
    date: "2024-07-19",
    time: "09:20",
    equipmentId: "4",
    equipmentName: "شاحنة نقل 10 طن",
    equipmentType: "معدات نقل",
    fuelType: "ديزل",
    quantity: 120,
    pricePerLiter: 2.35,
    totalCost: 282,
    operator: "فهد السالم",
    location: "موقع البرج السكني - الرياض",
    odometerReading: 650,
    station: "محطة الراجحي",
    receiptNumber: "REC-20240719-002",
    status: "approved",
  },
  {
    id: "FT-2024-005",
    date: "2024-07-18",
    time: "11:00",
    equipmentId: "5",
    equipmentName: "مولد كهرباء 500 كيلو وات",
    equipmentType: "مولدات",
    fuelType: "ديزل",
    quantity: 200,
    pricePerLiter: 2.35,
    totalCost: 470,
    operator: "عبدالله النمر",
    location: "موقع المجمع التجاري - الدمام",
    odometerReading: 1200,
    station: "محطة الراجحي",
    receiptNumber: "REC-20240718-001",
    status: "approved",
  },
]

// Mock data for equipment fuel efficiency
const mockFuelEfficiency = [
  {
    equipmentId: "1",
    equipmentName: "رافعة برجية 50 طن",
    totalFuel: 750, // last 30 days
    totalHours: 250,
    efficiency: 3.0, // liters per hour
    avgCost: 7.05,
    trend: "stable",
    alert: false,
  },
  {
    equipmentId: "3",
    equipmentName: "حفارة كاتربيلر 320",
    totalFuel: 540,
    totalHours: 180,
    efficiency: 3.0,
    avgCost: 7.05,
    trend: "up",
    alert: true,
    alertMessage: "استهلاك وقود أعلى من المعتاد بنسبة 15%",
  },
  {
    equipmentId: "2",
    equipmentName: "خلاطة خرسانة 1.5 م³",
    totalFuel: 240,
    totalHours: 120,
    efficiency: 2.0,
    avgCost: 4.7,
    trend: "down",
    alert: false,
  },
  {
    equipmentId: "4",
    equipmentName: "شاحنة نقل 10 طن",
    totalFuel: 360,
    totalHours: 180,
    efficiency: 2.0,
    avgCost: 4.7,
    trend: "stable",
    alert: false,
  },
]

export default function FuelManagementPage() {
  const { t, lang } = useLanguage()
  const [activeTab, setActiveTab] = useState("transactions") // "transactions", "efficiency", "costs"
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterEquipmentType, setFilterEquipmentType] = useState("all")

  const filteredTransactions = mockFuelTransactions.filter(transaction => {
    const matchesSearch = transaction.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus
    const matchesType = filterEquipmentType === "all" || transaction.equipmentType === filterEquipmentType
    return matchesSearch && matchesStatus && matchesType
  })

  const filteredEfficiency = mockFuelEfficiency.filter(item => {
    const matchesSearch = item.equipmentName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  // Calculate statistics
  const stats = {
    totalTransactions: mockFuelTransactions.length,
    totalFuelConsumed: mockFuelTransactions.reduce((sum, t) => sum + t.quantity, 0),
    totalCost: mockFuelTransactions.reduce((sum, t) => sum + t.totalCost, 0),
    avgPricePerLiter: mockFuelTransactions.length > 0 
      ? (mockFuelTransactions.reduce((sum, t) => sum + t.pricePerLiter, 0) / mockFuelTransactions.length).toFixed(2)
      : 0,
    pendingApprovals: mockFuelTransactions.filter(t => t.status === 'pending').length,
    alerts: mockFuelEfficiency.filter(e => e.alert).length,
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">معتمد</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">معلق</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">مرفوض</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">غير معروف</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/equipment">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للمعدات
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الوقود</h1>
          <p className="text-gray-600 mt-1">متابعة استهلاك الوقود وتكاليفه للمعدات الإنشائية</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المعاملات</p>
                <p className="text-2xl font-bold">{stats.totalTransactions}</p>
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
                <p className="text-sm font-medium text-gray-600">إجمالي الوقود</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalFuelConsumed} <span className="text-sm">لتر</span></p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Fuel className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي التكلفة</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalCost, lang === 'ar' ? 'SAR' : 'USD')}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط السعر/لتر</p>
                <p className="text-2xl font-bold text-orange-600">{stats.avgPricePerLiter} <span className="text-sm">ريال</span></p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معلقة للاعتماد</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingApprovals}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تنبيهات</p>
                <p className="text-2xl font-bold text-red-600">{stats.alerts}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <Button
          variant="ghost"
          className={cn("rounded-none border-b-2 border-transparent", activeTab === "transactions" && "border-blue-500 text-blue-600")}
          onClick={() => setActiveTab("transactions")}
        >
          سجل المعاملات
        </Button>
        <Button
          variant="ghost"
          className={cn("rounded-none border-b-2 border-transparent", activeTab === "efficiency" && "border-blue-500 text-blue-600")}
          onClick={() => setActiveTab("efficiency")}
        >
          كفاءة الاستهلاك
        </Button>
        <Button
          variant="ghost"
          className={cn("rounded-none border-b-2 border-transparent", activeTab === "costs" && "border-blue-500 text-blue-600")}
          onClick={() => setActiveTab("costs")}
        >
          تحليل التكاليف
        </Button>
      </div>

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في معاملات الوقود..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="approved">معتمد</option>
              <option value="pending">معلق</option>
              <option value="rejected">مرفوض</option>
            </select>
            <select
              value={filterEquipmentType}
              onChange={(e) => setFilterEquipmentType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الأنواع</option>
              <option value="رافعات">رافعات</option>
              <option value="معدات حفر">معدات حفر</option>
              <option value="معدات خرسانة">معدات خرسانة</option>
              <option value="معدات نقل">معدات نقل</option>
              <option value="مولدات">مولدات</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
            <Link href="/dashboard/equipment/fuel/new">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                تزود جديد
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>سجل معاملات الوقود</CardTitle>
              <CardDescription>جميع عمليات التزود بالوقود للمعدات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-4 font-semibold">رقم المعاملة</th>
                      <th className="text-right p-4 font-semibold">التاريخ والوقت</th>
                      <th className="text-right p-4 font-semibold">المعدة</th>
                      <th className="text-right p-4 font-semibold">النوع</th>
                      <th className="text-right p-4 font-semibold">نوع الوقود</th>
                      <th className="text-right p-4 font-semibold">الكمية (لتر)</th>
                      <th className="text-right p-4 font-semibold">سعر اللتر</th>
                      <th className="text-right p-4 font-semibold">الإجمالي</th>
                      <th className="text-right p-4 font-semibold">المشغل</th>
                      <th className="text-right p-4 font-semibold">الحالة</th>
                      <th className="text-right p-4 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{transaction.id}</td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="text-sm">{transaction.date}</span>
                            <span className="text-xs text-gray-500">{transaction.time}</span>
                          </div>
                        </td>
                        <td className="p-4">{transaction.equipmentName}</td>
                        <td className="p-4">{transaction.equipmentType}</td>
                        <td className="p-4">
                          <Badge className="bg-blue-100 text-blue-800">{transaction.fuelType}</Badge>
                        </td>
                        <td className="p-4 font-medium">{transaction.quantity}</td>
                        <td className="p-4">{transaction.pricePerLiter.toFixed(2)} ريال</td>
                        <td className="p-4 font-bold text-green-600">{formatCurrency(transaction.totalCost, lang === 'ar' ? 'SAR' : 'USD')}</td>
                        <td className="p-4">{transaction.operator}</td>
                        <td className="p-4">{getStatusBadge(transaction.status)}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {transaction.status === 'pending' && (
                              <Button variant="ghost" size="sm" className="text-green-600">
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Efficiency Tab */}
      {activeTab === "efficiency" && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في المعدات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              تصدير التقرير
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredEfficiency.map((item) => (
              <Card key={item.equipmentId} className={cn("hover:shadow-lg transition-shadow", item.alert && "border-red-300 bg-red-50")}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.equipmentName}</CardTitle>
                      <CardDescription className="mt-1">آخر 30 يوم</CardDescription>
                    </div>
                    {getTrendIcon(item.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {item.alert && (
                      <div className="flex items-start gap-2 p-3 bg-red-100 border border-red-300 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-800">{item.alertMessage}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">إجمالي الوقود</p>
                        <p className="text-xl font-bold text-blue-600">{item.totalFuel} لتر</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">إجمالي الساعات</p>
                        <p className="text-xl font-bold text-purple-600">{item.totalHours} ساعة</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">الكفاءة</p>
                        <p className="text-xl font-bold text-green-600">{item.efficiency} لتر/ساعة</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">متوسط التكلفة/ساعة</p>
                        <p className="text-xl font-bold text-orange-600">{item.avgCost} ريال</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      عرض التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Costs Tab */}
      {activeTab === "costs" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>تكاليف الشهر الحالي</CardTitle>
                <CardDescription>يوليو 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.totalCost, lang === 'ar' ? 'SAR' : 'USD')}</p>
                    <p className="text-sm text-gray-600 mt-1">إجمالي تكاليف الوقود</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-red-500" />
                    <span className="text-red-600 font-medium">+12%</span>
                    <span className="text-gray-600">مقارنة بالشهر الماضي</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع التكاليف حسب النوع</CardTitle>
                <CardDescription>نسبة التكاليف</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>رافعات</span>
                      <span className="font-medium">587.5 ريال (35%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>معدات حفر</span>
                      <span className="font-medium">423 ريال (25%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>معدات نقل</span>
                      <span className="font-medium">282 ريال (17%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "17%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>أخرى</span>
                      <span className="font-medium">388 ريال (23%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: "23%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توقعات التكلفة</CardTitle>
                <CardDescription>نهاية الشهر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-orange-600">2,100 ريال</p>
                    <p className="text-sm text-gray-600 mt-1">التكلفة المتوقعة</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">بناءً على معدل الاستهلاك الحالي</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تحليل التكاليف الشهرية</CardTitle>
              <CardDescription>مقارنة آخر 6 أشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: "يوليو 2024", cost: 1680, percentage: 100, current: true },
                  { month: "يونيو 2024", cost: 1500, percentage: 89 },
                  { month: "مايو 2024", cost: 1650, percentage: 98 },
                  { month: "أبريل 2024", cost: 1400, percentage: 83 },
                  { month: "مارس 2024", cost: 1550, percentage: 92 },
                  { month: "فبراير 2024", cost: 1480, percentage: 88 },
                ].map((item, index) => (
                  <div key={index} className={cn("p-4 rounded-lg", item.current ? "bg-blue-50 border border-blue-200" : "bg-gray-50")}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.month}</span>
                      <span className="text-lg font-bold text-green-600">{item.cost} ريال</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={cn("h-2 rounded-full", item.current ? "bg-blue-600" : "bg-gray-400")}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/equipment">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">العودة للمعدات</h3>
                  <p className="text-sm text-gray-600">عرض جميع المعدات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/fuel/new">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تزود جديد</h3>
                  <p className="text-sm text-gray-600">تسجيل عملية تزود بالوقود</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/fuel/stations">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">محطات الوقود</h3>
                  <p className="text-sm text-gray-600">إدارة المحطات المعتمدة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/fuel/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تقارير مفصلة</h3>
                  <p className="text-sm text-gray-600">تحليلات وإحصائيات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}


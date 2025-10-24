"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Download,
  FileText,
  Truck,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Fuel,
  Wrench,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  X,
  AlertTriangle,
  CheckCircle2,
  Package,
  Users,
  MapPin,
  Filter
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function EquipmentReportsPage() {
  const { t, lang } = useLanguage()
  const [selectedReport, setSelectedReport] = useState("overview") // overview, utilization, maintenance, costs, depreciation
  const [dateRange, setDateRange] = useState("month") // week, month, quarter, year

  // Mock data for reports
  const overviewStats = {
    totalEquipment: 15,
    activeEquipment: 12,
    inMaintenance: 2,
    available: 3,
    totalValue: 8500000,
    depreciationRate: 12.5,
    utilizationRate: 78,
    maintenanceCost: 125000,
  }

  const utilizationData = [
    { equipment: "رافعة برجية 50 طن", type: "رافعات", utilizationRate: 85, hoursUsed: 510, hoursAvailable: 600, revenue: 765000, status: "excellent" },
    { equipment: "حفارة كاتربيلر 320", type: "معدات حفر", utilizationRate: 72, hoursUsed: 432, hoursAvailable: 600, revenue: 345600, status: "good" },
    { equipment: "خلاطة خرسانة 1.5 م³", type: "معدات خرسانة", utilizationRate: 68, hoursUsed: 408, hoursAvailable: 600, revenue: 122400, status: "good" },
    { equipment: "شاحنة نقل 10 طن", type: "معدات نقل", utilizationRate: 90, hoursUsed: 540, hoursAvailable: 600, revenue: 270000, status: "excellent" },
    { equipment: "مولد كهرباء 500 كيلو وات", type: "مولدات", utilizationRate: 45, hoursUsed: 270, hoursAvailable: 600, revenue: 540000, status: "low" },
  ]

  const maintenanceData = [
    { equipment: "رافعة برجية 50 طن", lastMaintenance: "2024-07-10", nextMaintenance: "2024-10-10", cost: 25000, status: "scheduled", daysUntilNext: 45 },
    { equipment: "حفارة كاتربيلر 320", lastMaintenance: "2024-06-15", nextMaintenance: "2024-09-15", cost: 18000, status: "overdue", daysUntilNext: -5 },
    { equipment: "خلاطة خرسانة 1.5 م³", lastMaintenance: "2024-07-05", nextMaintenance: "2024-10-05", cost: 8000, status: "scheduled", daysUntilNext: 40 },
    { equipment: "شاحنة نقل 10 طن", lastMaintenance: "2024-07-01", nextMaintenance: "2024-10-01", cost: 12000, status: "scheduled", daysUntilNext: 36 },
    { equipment: "مولد كهرباء 500 كيلو وات", lastMaintenance: "2024-07-20", nextMaintenance: "2024-08-20", cost: 15000, status: "due-soon", daysUntilNext: 5 },
  ]

  const costsBreakdown = {
    fuel: 45000,
    maintenance: 125000,
    operators: 180000,
    insurance: 85000,
    depreciation: 220000,
    rental: 350000,
    other: 45000,
  }

  const depreciationData = [
    { equipment: "رافعة برجية 50 طن", purchasePrice: 2500000, currentValue: 2200000, depreciation: 300000, rate: 12, age: 18 },
    { equipment: "حفارة كاتربيلر 320", purchasePrice: 850000, currentValue: 720000, depreciation: 130000, rate: 15.3, age: 24 },
    { equipment: "خلاطة خرسانة 1.5 م³", purchasePrice: 180000, currentValue: 165000, depreciation: 15000, rate: 8.3, age: 18 },
    { equipment: "شاحنة نقل 10 طن", purchasePrice: 320000, currentValue: 288000, depreciation: 32000, rate: 10, age: 12 },
    { equipment: "مولد كهرباء 500 كيلو وات", purchasePrice: 450000, currentValue: 405000, depreciation: 45000, rate: 10, age: 12 },
  ]

  const getUtilizationColor = (rate: number) => {
    if (rate >= 80) return "text-green-600 bg-green-100"
    if (rate >= 60) return "text-blue-600 bg-blue-100"
    if (rate >= 40) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getMaintenanceStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-green-100 text-green-800">مجدولة</Badge>
      case "due-soon":
        return <Badge className="bg-yellow-100 text-yellow-800">قريباً</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">متأخرة</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">غير معروف</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/equipment">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة للمعدات
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">تقارير المعدات</h1>
            <p className="text-gray-600 mt-1">تحليلات وإحصائيات شاملة</p>
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">آخر أسبوع</option>
            <option value="month">آخر شهر</option>
            <option value="quarter">آخر 3 أشهر</option>
            <option value="year">آخر سنة</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            تصدير PDF
          </Button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card 
          className={cn("cursor-pointer transition-all hover:shadow-lg", selectedReport === "overview" && "ring-2 ring-blue-500")}
          onClick={() => setSelectedReport("overview")}
        >
          <CardContent className="p-4 text-center">
            <BarChart3 className={cn("h-8 w-8 mx-auto mb-2", selectedReport === "overview" ? "text-blue-600" : "text-gray-400")} />
            <p className="font-semibold">نظرة عامة</p>
          </CardContent>
        </Card>

        <Card 
          className={cn("cursor-pointer transition-all hover:shadow-lg", selectedReport === "utilization" && "ring-2 ring-blue-500")}
          onClick={() => setSelectedReport("utilization")}
        >
          <CardContent className="p-4 text-center">
            <Clock className={cn("h-8 w-8 mx-auto mb-2", selectedReport === "utilization" ? "text-blue-600" : "text-gray-400")} />
            <p className="font-semibold">معدل الاستخدام</p>
          </CardContent>
        </Card>

        <Card 
          className={cn("cursor-pointer transition-all hover:shadow-lg", selectedReport === "maintenance" && "ring-2 ring-blue-500")}
          onClick={() => setSelectedReport("maintenance")}
        >
          <CardContent className="p-4 text-center">
            <Wrench className={cn("h-8 w-8 mx-auto mb-2", selectedReport === "maintenance" ? "text-blue-600" : "text-gray-400")} />
            <p className="font-semibold">الصيانة</p>
          </CardContent>
        </Card>

        <Card 
          className={cn("cursor-pointer transition-all hover:shadow-lg", selectedReport === "costs" && "ring-2 ring-blue-500")}
          onClick={() => setSelectedReport("costs")}
        >
          <CardContent className="p-4 text-center">
            <DollarSign className={cn("h-8 w-8 mx-auto mb-2", selectedReport === "costs" ? "text-blue-600" : "text-gray-400")} />
            <p className="font-semibold">التكاليف</p>
          </CardContent>
        </Card>

        <Card 
          className={cn("cursor-pointer transition-all hover:shadow-lg", selectedReport === "depreciation" && "ring-2 ring-blue-500")}
          onClick={() => setSelectedReport("depreciation")}
        >
          <CardContent className="p-4 text-center">
            <TrendingDown className={cn("h-8 w-8 mx-auto mb-2", selectedReport === "depreciation" ? "text-blue-600" : "text-gray-400")} />
            <p className="font-semibold">الإهلاك</p>
          </CardContent>
        </Card>
      </div>

      {/* Overview Report */}
      {selectedReport === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <Badge className="bg-blue-100 text-blue-800">{overviewStats.totalEquipment}</Badge>
                </div>
                <p className="text-sm text-gray-600">إجمالي المعدات</p>
                <p className="text-2xl font-bold mt-2">{overviewStats.totalEquipment}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <Badge className="bg-green-100 text-green-800">{overviewStats.activeEquipment}</Badge>
                </div>
                <p className="text-sm text-gray-600">معدات نشطة</p>
                <p className="text-2xl font-bold mt-2">{overviewStats.activeEquipment}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Wrench className="h-5 w-5 text-yellow-600" />
                  <Badge className="bg-yellow-100 text-yellow-800">{overviewStats.inMaintenance}</Badge>
                </div>
                <p className="text-sm text-gray-600">تحت الصيانة</p>
                <p className="text-2xl font-bold mt-2">{overviewStats.inMaintenance}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Package className="h-5 w-5 text-purple-600" />
                  <Badge className="bg-purple-100 text-purple-800">{overviewStats.available}</Badge>
                </div>
                <p className="text-sm text-gray-600">متاحة</p>
                <p className="text-2xl font-bold mt-2">{overviewStats.available}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>القيمة الإجمالية للمعدات</CardTitle>
                <CardDescription>القيمة الحالية</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-600">{formatCurrency(overviewStats.totalValue, lang === 'ar' ? 'SAR' : 'USD')}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">معدل الإهلاك السنوي</span>
                    <span className="font-medium text-red-600">{overviewStats.depreciationRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">معدل الاستخدام</span>
                    <span className="font-medium text-blue-600">{overviewStats.utilizationRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تكاليف الصيانة</CardTitle>
                <CardDescription>إجمالي الشهر الحالي</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-orange-600">{formatCurrency(overviewStats.maintenanceCost, lang === 'ar' ? 'SAR' : 'USD')}</p>
                <div className="mt-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-red-500" />
                  <span className="text-red-600 font-medium">+8%</span>
                  <span className="text-sm text-gray-600">مقارنة بالشهر الماضي</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>توزيع المعدات حسب النوع</CardTitle>
              <CardDescription>عدد المعدات في كل فئة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "رافعات", count: 3, percentage: 20, color: "bg-blue-600" },
                  { type: "معدات حفر", count: 4, percentage: 27, color: "bg-purple-600" },
                  { type: "معدات خرسانة", count: 2, percentage: 13, color: "bg-green-600" },
                  { type: "معدات نقل", count: 3, percentage: 20, color: "bg-orange-600" },
                  { type: "مولدات", count: 2, percentage: 13, color: "bg-yellow-600" },
                  { type: "أخرى", count: 1, percentage: 7, color: "bg-gray-600" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{item.type}</span>
                      <span className="text-gray-600">{item.count} معدة ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${item.color} h-3 rounded-full transition-all`}
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

      {/* Utilization Report */}
      {selectedReport === "utilization" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>معدل استخدام المعدات</CardTitle>
              <CardDescription>ساعات التشغيل والإيرادات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-4 font-semibold">المعدة</th>
                      <th className="text-right p-4 font-semibold">النوع</th>
                      <th className="text-right p-4 font-semibold">معدل الاستخدام</th>
                      <th className="text-right p-4 font-semibold">ساعات التشغيل</th>
                      <th className="text-right p-4 font-semibold">ساعات متاحة</th>
                      <th className="text-right p-4 font-semibold">الإيرادات</th>
                      <th className="text-right p-4 font-semibold">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {utilizationData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{item.equipment}</td>
                        <td className="p-4">{item.type}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={cn("px-3 py-1 rounded-full font-bold", getUtilizationColor(item.utilizationRate))}>
                              {item.utilizationRate}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4">{item.hoursUsed} ساعة</td>
                        <td className="p-4">{item.hoursAvailable} ساعة</td>
                        <td className="p-4 font-bold text-green-600">{formatCurrency(item.revenue, lang === 'ar' ? 'SAR' : 'USD')}</td>
                        <td className="p-4">
                          {item.status === 'excellent' && <Badge className="bg-green-100 text-green-800">ممتاز</Badge>}
                          {item.status === 'good' && <Badge className="bg-blue-100 text-blue-800">جيد</Badge>}
                          {item.status === 'low' && <Badge className="bg-red-100 text-red-800">منخفض</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-2">متوسط معدل الاستخدام</p>
                <p className="text-4xl font-bold text-blue-600">72%</p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-2">إجمالي ساعات التشغيل</p>
                <p className="text-4xl font-bold text-purple-600">2,160</p>
                <p className="text-sm text-gray-600 mt-2">من 3,000 ساعة متاحة</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-2">إجمالي الإيرادات</p>
                <p className="text-4xl font-bold text-green-600">2.04M</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">+12%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Maintenance Report */}
      {selectedReport === "maintenance" && (
        <div className="space-y-6">
          <div className="grid gap-4">
            {maintenanceData.map((item, index) => (
              <Card key={index} className={cn(
                "hover:shadow-lg transition-shadow",
                item.status === 'overdue' && "border-red-300 bg-red-50"
              )}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.equipment}</CardTitle>
                      <CardDescription>آخر صيانة: {item.lastMaintenance}</CardDescription>
                    </div>
                    {getMaintenanceStatusBadge(item.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">الصيانة القادمة</p>
                      <p className="text-sm font-bold">{item.nextMaintenance}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {item.daysUntilNext > 0 ? `بعد ${item.daysUntilNext} يوم` : `متأخر ${Math.abs(item.daysUntilNext)} يوم`}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">التكلفة</p>
                      <p className="text-sm font-bold text-green-600">{formatCurrency(item.cost, lang === 'ar' ? 'SAR' : 'USD')}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">الحالة</p>
                      <p className="text-sm font-bold">
                        {item.status === 'scheduled' && 'مجدولة'}
                        {item.status === 'due-soon' && 'قريباً'}
                        {item.status === 'overdue' && 'متأخرة'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button variant="outline" size="sm" className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        جدولة الآن
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <Badge className="bg-green-100 text-green-800">3</Badge>
                </div>
                <p className="text-sm text-gray-600">صيانة مجدولة</p>
                <p className="text-2xl font-bold mt-2">3</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <Badge className="bg-yellow-100 text-yellow-800">1</Badge>
                </div>
                <p className="text-sm text-gray-600">صيانة قريباً</p>
                <p className="text-2xl font-bold mt-2">1</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <X className="h-5 w-5 text-red-600" />
                  <Badge className="bg-red-100 text-red-800">1</Badge>
                </div>
                <p className="text-sm text-gray-600">صيانة متأخرة</p>
                <p className="text-2xl font-bold mt-2">1</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Costs Report */}
      {selectedReport === "costs" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>توزيع التكاليف</CardTitle>
              <CardDescription>تحليل تفصيلي للتكاليف</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "إيرادات التأجير", amount: costsBreakdown.rental, color: "bg-green-600", percentage: 32 },
                  { label: "الإهلاك", amount: costsBreakdown.depreciation, color: "bg-red-600", percentage: 20 },
                  { label: "أجور المشغلين", amount: costsBreakdown.operators, color: "bg-blue-600", percentage: 16 },
                  { label: "الصيانة", amount: costsBreakdown.maintenance, color: "bg-orange-600", percentage: 11 },
                  { label: "التأمين", amount: costsBreakdown.insurance, color: "bg-purple-600", percentage: 8 },
                  { label: "الوقود", amount: costsBreakdown.fuel, color: "bg-yellow-600", percentage: 4 },
                  { label: "أخرى", amount: costsBreakdown.other, color: "bg-gray-600", percentage: 4 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-gray-600">{formatCurrency(item.amount, lang === 'ar' ? 'SAR' : 'USD')} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${item.color} h-3 rounded-full transition-all`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إجمالي التكاليف</CardTitle>
                <CardDescription>الشهر الحالي</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-red-600">{formatCurrency(Object.values(costsBreakdown).reduce((a, b) => a + b, 0), lang === 'ar' ? 'SAR' : 'USD')}</p>
                <div className="flex items-center gap-2 mt-4">
                  <TrendingUp className="h-5 w-5 text-red-500" />
                  <span className="text-red-600 font-medium">+5%</span>
                  <span className="text-sm text-gray-600">مقارنة بالشهر الماضي</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>صافي الربح</CardTitle>
                <CardDescription>بعد خصم التكاليف</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-600">٩٣٠,٠٠٠ ريال</p>
                <div className="flex items-center gap-2 mt-4">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">+18%</span>
                  <span className="text-sm text-gray-600">مقارنة بالشهر الماضي</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Depreciation Report */}
      {selectedReport === "depreciation" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>جدول الإهلاك</CardTitle>
              <CardDescription>القيمة الحالية وإهلاك المعدات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-4 font-semibold">المعدة</th>
                      <th className="text-right p-4 font-semibold">سعر الشراء</th>
                      <th className="text-right p-4 font-semibold">القيمة الحالية</th>
                      <th className="text-right p-4 font-semibold">الإهلاك</th>
                      <th className="text-right p-4 font-semibold">معدل الإهلاك</th>
                      <th className="text-right p-4 font-semibold">العمر (شهر)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {depreciationData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{item.equipment}</td>
                        <td className="p-4">{formatCurrency(item.purchasePrice, lang === 'ar' ? 'SAR' : 'USD')}</td>
                        <td className="p-4 font-bold text-green-600">{formatCurrency(item.currentValue, lang === 'ar' ? 'SAR' : 'USD')}</td>
                        <td className="p-4 font-bold text-red-600">{formatCurrency(item.depreciation, lang === 'ar' ? 'SAR' : 'USD')}</td>
                        <td className="p-4">
                          <Badge className="bg-red-100 text-red-800">{item.rate}%</Badge>
                        </td>
                        <td className="p-4">{item.age} شهر</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-2">إجمالي سعر الشراء</p>
                <p className="text-3xl font-bold text-blue-600">4.3M</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-2">القيمة الحالية</p>
                <p className="text-3xl font-bold text-green-600">3.78M</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-2">إجمالي الإهلاك</p>
                <p className="text-3xl font-bold text-red-600">522K</p>
                <p className="text-sm text-gray-600 mt-2">معدل: 12.1%</p>
              </CardContent>
            </Card>
          </div>
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

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">تصدير التقرير</h3>
                <p className="text-sm text-gray-600">PDF أو Excel</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">تقرير مخصص</h3>
                <p className="text-sm text-gray-600">إنشاء تقرير جديد</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">تقرير دوري</h3>
                <p className="text-sm text-gray-600">جدولة تلقائية</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


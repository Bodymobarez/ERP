"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Plus,
  Fuel,
  Truck,
  Calculator,
  MapPin,
  User,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  Camera,
  Upload,
  DollarSign,
  Gauge,
  Settings
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock equipment data - in real app this would come from API
const mockEquipment = [
  {
    id: "1",
    name: "رافعة برجية 50 طن",
    type: "رافعات",
    model: "Liebherr 550 EC-H",
    serialNumber: "TW-2023-001",
    location: "موقع البرج السكني - الرياض",
    status: "in-use",
    currentOperator: "خالد محمد",
    lastOdometerReading: 1250,
    fuelTankCapacity: 300,
    avgConsumption: 3.0
  },
  {
    id: "2",
    name: "خلاطة خرسانة 1.5 م³",
    type: "معدات خرسانة",
    model: "Schwing Stetter",
    serialNumber: "CM-2023-005",
    location: "موقع الفيلا - جدة",
    status: "in-use",
    currentOperator: "أحمد علي",
    lastOdometerReading: 850,
    fuelTankCapacity: 100,
    avgConsumption: 2.0
  },
  {
    id: "3",
    name: "حفارة كاتربيلر 320",
    type: "معدات حفر",
    model: "Caterpillar 320D",
    serialNumber: "EX-2022-012",
    location: "موقع المجمع التجاري - الدمام",
    status: "in-use",
    currentOperator: "فهد عبدالله",
    lastOdometerReading: 2150,
    fuelTankCapacity: 200,
    avgConsumption: 3.0
  }
]

// Mock fuel stations
const mockFuelStations = [
  { id: "1", name: "محطة الراجحي", location: "الرياض - طريق الملك فهد", pricePerLiter: 2.35 },
  { id: "2", name: "محطة أرامكو", location: "الدمام - الكورنيش", pricePerLiter: 2.30 },
  { id: "3", name: "محطة البترول الوطنية", location: "جدة - طريق مكة", pricePerLiter: 2.40 },
  { id: "4", name: "محطة النور", location: "الرياض - طريق الخرج", pricePerLiter: 2.32 }
]

interface FuelTransactionForm {
  equipmentId: string
  fuelType: string
  quantity: number
  pricePerLiter: number
  totalCost: number
  date: string
  time: string
  odometerReading: number
  operator: string
  location: string
  station: string
  receiptNumber: string
  notes: string
  receiptImage?: File
}

export default function NewFuelTransactionPage() {
  const { t, lang } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<FuelTransactionForm>({
    equipmentId: "",
    fuelType: "ديزل",
    quantity: 0,
    pricePerLiter: 2.35,
    totalCost: 0,
    date: new Date().toISOString().split('T')[0] || "",
    time: new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5) || "",
    odometerReading: 0,
    operator: "",
    location: "",
    station: "",
    receiptNumber: "",
    notes: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Calculate total cost when quantity or price changes
  useEffect(() => {
    const total = formData.quantity * formData.pricePerLiter
    setFormData(prev => ({ ...prev, totalCost: total }))
  }, [formData.quantity, formData.pricePerLiter])

  // Update equipment details when equipment is selected
  useEffect(() => {
    if (formData.equipmentId) {
      const equipment = mockEquipment.find(eq => eq.id === formData.equipmentId)
      if (equipment) {
        setSelectedEquipment(equipment)
        setFormData(prev => ({
          ...prev,
          operator: equipment.currentOperator,
          location: equipment.location,
          odometerReading: equipment.lastOdometerReading
        }))
      }
    }
  }, [formData.equipmentId])

  // Update price when station is selected
  const handleStationChange = (stationId: string) => {
    const station = mockFuelStations.find(s => s.id === stationId)
    if (station) {
      setFormData(prev => ({
        ...prev,
        station: stationId,
        pricePerLiter: station.pricePerLiter
      }))
    }
  }

  const handleInputChange = (field: keyof FuelTransactionForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleReceiptImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, receiptImage: file }))
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setReceiptPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.equipmentId) newErrors.equipmentId = "يجب اختيار المعدة"
    if (!formData.fuelType) newErrors.fuelType = "يجب اختيار نوع الوقود"
    if (formData.quantity <= 0) newErrors.quantity = "يجب إدخال كمية صحيحة"
    if (formData.pricePerLiter <= 0) newErrors.pricePerLiter = "يجب إدخال سعر صحيح"
    if (!formData.date) newErrors.date = "يجب إدخال التاريخ"
    if (!formData.time) newErrors.time = "يجب إدخال الوقت"
    if (formData.odometerReading < 0) newErrors.odometerReading = "يجب إدخال قراءة عداد صحيحة"
    if (!formData.operator.trim()) newErrors.operator = "يجب إدخال اسم المشغل"
    if (!formData.location.trim()) newErrors.location = "يجب إدخال الموقع"
    if (!formData.station) newErrors.station = "يجب اختيار المحطة"
    if (!formData.receiptNumber.trim()) newErrors.receiptNumber = "يجب إدخال رقم الإيصال"

    // Validate tank capacity
    if (selectedEquipment && formData.quantity > selectedEquipment.fuelTankCapacity) {
      newErrors.quantity = `الكمية تتجاوز سعة الخزان (${selectedEquipment.fuelTankCapacity} لتر)`
    }

    // Validate odometer reading
    if (selectedEquipment && formData.odometerReading < selectedEquipment.lastOdometerReading) {
      newErrors.odometerReading = `القراءة يجب أن تكون أكبر من آخر قراءة (${selectedEquipment.lastOdometerReading})`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In real app, would make actual API call here
      console.log("Submitting fuel transaction:", formData)
      
      // Redirect to fuel management page
      router.push("/dashboard/equipment/fuel")
      
    } catch (error) {
      console.error("Error submitting fuel transaction:", error)
    } finally {
      setLoading(false)
    }
  }

  const selectedStation = mockFuelStations.find(s => s.id === formData.station)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/equipment/fuel">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة لإدارة الوقود
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">تسجيل تزود جديد بالوقود</h1>
          <p className="text-gray-600 mt-1">إضافة عملية تزود بالوقود للمعدات الإنشائية</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Equipment Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-500" />
                  اختيار المعدة
                </CardTitle>
                <CardDescription>اختر المعدة التي تم تزويدها بالوقود</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المعدة *</label>
                  <select
                    value={formData.equipmentId}
                    onChange={(e) => handleInputChange("equipmentId", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر المعدة</option>
                    {mockEquipment.map((equipment) => (
                      <option key={equipment.id} value={equipment.id}>
                        {equipment.name} - {equipment.serialNumber}
                      </option>
                    ))}
                  </select>
                  {errors.equipmentId && <p className="text-red-500 text-sm mt-1">{errors.equipmentId}</p>}
                </div>

                {selectedEquipment && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">النوع:</span>
                        <span className="font-medium ml-2">{selectedEquipment.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">سعة الخزان:</span>
                        <span className="font-medium ml-2">{selectedEquipment.fuelTankCapacity} لتر</span>
                      </div>
                      <div>
                        <span className="text-gray-600">المشغل الحالي:</span>
                        <span className="font-medium ml-2">{selectedEquipment.currentOperator}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">آخر قراءة عداد:</span>
                        <span className="font-medium ml-2">{selectedEquipment.lastOdometerReading}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Fuel Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fuel className="h-5 w-5 text-purple-500" />
                  تفاصيل الوقود
                </CardTitle>
                <CardDescription>معلومات عملية التزود بالوقود</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نوع الوقود *</label>
                    <select
                      value={formData.fuelType}
                      onChange={(e) => handleInputChange("fuelType", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ديزل">ديزل</option>
                      <option value="بنزين">بنزين</option>
                      <option value="كيروسين">كيروسين</option>
                    </select>
                    {errors.fuelType && <p className="text-red-500 text-sm mt-1">{errors.fuelType}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">محطة الوقود *</label>
                    <select
                      value={formData.station}
                      onChange={(e) => handleStationChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">اختر المحطة</option>
                      {mockFuelStations.map((station) => (
                        <option key={station.id} value={station.id}>
                          {station.name} - {station.pricePerLiter} ريال/لتر
                        </option>
                      ))}
                    </select>
                    {errors.station && <p className="text-red-500 text-sm mt-1">{errors.station}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الكمية (لتر) *
                      {selectedEquipment && (
                        <span className="text-xs text-gray-500 ml-1">
                          (أقصى {selectedEquipment.fuelTankCapacity} لتر)
                        </span>
                      )}
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max={selectedEquipment?.fuelTankCapacity}
                      value={formData.quantity || ""}
                      onChange={(e) => handleInputChange("quantity", parseFloat(e.target.value) || 0)}
                      placeholder="0.0"
                    />
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">سعر اللتر (ريال) *</label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={formData.pricePerLiter || ""}
                      onChange={(e) => handleInputChange("pricePerLiter", parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                    {errors.pricePerLiter && <p className="text-red-500 text-sm mt-1">{errors.pricePerLiter}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">إجمالي التكلفة (ريال)</label>
                    <Input
                      type="number"
                      value={formData.totalCost.toFixed(2)}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                {selectedStation && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-green-800">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{selectedStation.name}</span>
                      <span>-</span>
                      <span>{selectedStation.location}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  التاريخ والوقت
                </CardTitle>
                <CardDescription>توقيت عملية التزود بالوقود</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ *</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الوقت *</label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                    />
                    {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Operator & Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-orange-500" />
                  المشغل والموقع
                </CardTitle>
                <CardDescription>تفاصيل المشغل والموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المشغل *</label>
                    <Input
                      value={formData.operator}
                      onChange={(e) => handleInputChange("operator", e.target.value)}
                      placeholder="اسم المشغل"
                    />
                    {errors.operator && <p className="text-red-500 text-sm mt-1">{errors.operator}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      قراءة العداد *
                      {selectedEquipment && (
                        <span className="text-xs text-gray-500 ml-1">
                          (آخر قراءة: {selectedEquipment.lastOdometerReading})
                        </span>
                      )}
                    </label>
                    <Input
                      type="number"
                      min={selectedEquipment?.lastOdometerReading || 0}
                      value={formData.odometerReading || ""}
                      onChange={(e) => handleInputChange("odometerReading", parseInt(e.target.value) || 0)}
                      placeholder="قراءة العداد الحالية"
                    />
                    {errors.odometerReading && <p className="text-red-500 text-sm mt-1">{errors.odometerReading}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الموقع *</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="موقع المعدة أثناء التزود"
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Receipt Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-red-500" />
                  معلومات الإيصال
                </CardTitle>
                <CardDescription>رقم الإيصال وصورة الإيصال (اختيارية)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الإيصال *</label>
                  <Input
                    value={formData.receiptNumber}
                    onChange={(e) => handleInputChange("receiptNumber", e.target.value)}
                    placeholder="رقم الإيصال من المحطة"
                  />
                  {errors.receiptNumber && <p className="text-red-500 text-sm mt-1">{errors.receiptNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">صورة الإيصال (اختيارية)</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleReceiptImageChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button type="button" variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      التقاط صورة
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="أي ملاحظات إضافية حول عملية التزود..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            {/* Transaction Summary */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-500" />
                  ملخص المعاملة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedEquipment && (
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">{selectedEquipment.name}</p>
                      <p className="text-xs text-gray-600">{selectedEquipment.serialNumber}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">الكمية:</span>
                        <p className="font-medium">{formData.quantity || 0} لتر</p>
                      </div>
                      <div>
                        <span className="text-gray-600">السعر/لتر:</span>
                        <p className="font-medium">{formData.pricePerLiter.toFixed(2)} ريال</p>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">الإجمالي:</span>
                        <span className="text-2xl font-bold text-green-600">
                          {formatCurrency(formData.totalCost)}
                        </span>
                      </div>
                    </div>

                    {/* Efficiency Calculation */}
                    {formData.odometerReading > selectedEquipment.lastOdometerReading && formData.quantity > 0 && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 mb-1">تقدير الكفاءة</p>
                        <p className="text-xs text-blue-600">
                          المسافة: {formData.odometerReading - selectedEquipment.lastOdometerReading} وحدة
                        </p>
                        <p className="text-xs text-blue-600">
                          الاستهلاك: {((formData.quantity / (formData.odometerReading - selectedEquipment.lastOdometerReading)) || 0).toFixed(2)} لتر/وحدة
                        </p>
                      </div>
                    )}

                    {/* Tank Level Warning */}
                    {formData.quantity > selectedEquipment.fuelTankCapacity * 0.9 && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-800 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>تنبيه: الكمية قريبة من سعة الخزان</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Receipt Preview */}
                {receiptPreview && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">معاينة الإيصال</p>
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={receiptPreview} 
                        alt="Receipt preview" 
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2 pt-4">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading || !formData.equipmentId}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        جاري الحفظ...
                      </div>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        تسجيل التزود
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/equipment/fuel">إلغاء</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">معلومات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Fuel className="h-4 w-4" />
                  <span>سعر الديزل اليوم: 2.35 ريال/لتر</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>يتم مراجعة المعاملات خلال 24 ساعة</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Settings className="h-4 w-4" />
                  <span>تذكر: احتفظ بالإيصال الأصلي</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
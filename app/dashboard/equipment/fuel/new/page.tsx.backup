"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { ar, enUS } from "date-fns/locale"
import { 
  CalendarIcon, 
  Fuel, 
  MapPin, 
  DollarSign, 
  Info, 
  Loader2, 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Truck,
  User,
  Clock,
  FileText,
  Calculator,
  Hash,
  Gauge,
  Building2,
  Calendar as CalendarLucide
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const equipmentList = [
  { id: "1", name: "رافعة برجية 50 طن", type: "رافعات", fuelType: "ديزل", tankCapacity: 500 },
  { id: "2", name: "خلاطة خرسانة 1.5 م³", type: "معدات خرسانة", fuelType: "ديزل", tankCapacity: 100 },
  { id: "3", name: "حفارة كاتربيلر 320", type: "معدات حفر", fuelType: "ديزل", tankCapacity: 300 },
  { id: "4", name: "شاحنة نقل 10 طن", type: "معدات نقل", fuelType: "ديزل", tankCapacity: 150 },
  { id: "5", name: "مولد كهرباء 500 كيلو وات", type: "مولدات", fuelType: "ديزل", tankCapacity: 400 },
]

const fuelStations = [
  { id: "1", name: "محطة الراجحي", location: "الرياض" },
  { id: "2", name: "محطة أرامكو", location: "جدة" },
  { id: "3", name: "محطة البترول الوطنية", location: "الدمام" },
  { id: "4", name: "محطة الوقود السريع", location: "الرياض" },
]

const operators = [
  { id: "1", name: "خالد محمد", role: "مشغل رافعة" },
  { id: "2", name: "أحمد علي", role: "مشغل معدات" },
  { id: "3", name: "سعيد القحطاني", role: "مشغل حفارة" },
  { id: "4", name: "فهد السالم", role: "سائق" },
  { id: "5", name: "عبدالله النمر", role: "فني مولدات" },
]

const formSchema = z.object({
  equipmentId: z.string().min(1, { message: "يجب اختيار المعدة" }),
  date: z.date({ required_error: "تاريخ التزود مطلوب" }),
  time: z.string().min(1, { message: "وقت التزود مطلوب" }),
  fuelType: z.string().min(1, { message: "نوع الوقود مطلوب" }),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "الكمية مطلوبة ويجب أن تكون أكبر من صفر" })
  ),
  pricePerLiter: z.preprocess(
    (val) => Number(val),
    z.number().min(0.1, { message: "سعر اللتر مطلوب" })
  ),
  operatorId: z.string().min(1, { message: "يجب اختيار المشغل" }),
  stationId: z.string().min(1, { message: "يجب اختيار محطة الوقود" }),
  odometerReading: z.preprocess(
    (val) => val ? Number(val) : 0,
    z.number().min(0, { message: "قراءة العداد يجب أن تكون رقماً" })
  ),
  receiptNumber: z.string().optional(),
  paymentMethod: z.string().min(1, { message: "يجب اختيار طريقة الدفع" }),
  location: z.string().optional(),
  notes: z.string().optional(),
})

type FuelFormValues = z.infer<typeof formSchema>

export default function NewFuelTransactionPage() {
  const { t, lang } = useLanguage()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<FuelFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      equipmentId: "",
      date: new Date(),
      time: new Date().toTimeString().slice(0, 5), // HH:MM format
      fuelType: "diesel",
      quantity: 0,
      pricePerLiter: 2.35, // Default diesel price
      operatorId: "",
      stationId: "",
      odometerReading: 0,
      receiptNumber: "",
      paymentMethod: "company_card",
      location: "",
      notes: "",
    },
  })

  const { handleSubmit, register, control, watch, setValue, formState: { errors } } = form

  const watchedFields = watch()
  const selectedEquipment = equipmentList.find(eq => eq.id === watchedFields.equipmentId)
  const selectedOperator = operators.find(op => op.id === watchedFields.operatorId)
  const selectedStation = fuelStations.find(st => st.id === watchedFields.stationId)
  
  // Calculate total cost
  const totalCost = (watchedFields.quantity || 0) * (watchedFields.pricePerLiter || 0)
  
  // Calculate fill percentage if tank capacity is known
  const fillPercentage = selectedEquipment && selectedEquipment.tankCapacity > 0
    ? Math.min(((watchedFields.quantity || 0) / selectedEquipment.tankCapacity * 100), 100).toFixed(1)
    : null

  const onSubmit = async (data: FuelFormValues) => {
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log("New Fuel Transaction Data:", {
        ...data,
        totalCost,
        transactionId: `FT-${format(new Date(), 'yyyyMMdd')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      })
      setSubmitSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/equipment/fuel")
      }, 2000)
    } catch (error: any) {
      setSubmitError(error.message || "حدث خطأ أثناء تسجيل المعاملة")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressPoints = [
    watchedFields.equipmentId && watchedFields.operatorId,
    watchedFields.date && watchedFields.time && watchedFields.stationId,
    watchedFields.quantity > 0 && watchedFields.pricePerLiter > 0,
    watchedFields.paymentMethod,
  ]

  const completedSections = progressPoints.filter(Boolean).length
  const totalSections = progressPoints.length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/equipment/fuel">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة لإدارة الوقود
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">تسجيل تزود بالوقود جديد</h1>
          <p className="text-gray-600 mt-1">أدخل تفاصيل عملية التزود بالوقود</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Equipment & Operator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                المعدة والمشغل
              </CardTitle>
              <CardDescription>اختر المعدة والمشغل المسؤول</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="equipmentId">المعدة *</Label>
                <Select onValueChange={(value) => {
                  setValue("equipmentId", value)
                  const equipment = equipmentList.find(eq => eq.id === value)
                  if (equipment) {
                    setValue("fuelType", equipment.fuelType === "ديزل" ? "diesel" : "petrol")
                  }
                }} value={watchedFields.equipmentId}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المعدة" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentList.map(equipment => (
                      <SelectItem key={equipment.id} value={equipment.id}>
                        <div className="flex items-center gap-2">
                          <span>{equipment.name}</span>
                          <Badge className="bg-gray-100 text-gray-800 text-xs">{equipment.type}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.equipmentId && <p className="text-red-500 text-sm mt-1">{errors.equipmentId.message}</p>}
                {selectedEquipment && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>النوع:</strong> {selectedEquipment.type} • 
                      <strong className="mx-2">نوع الوقود:</strong> {selectedEquipment.fuelType} • 
                      <strong className="mx-2">سعة الخزان:</strong> {selectedEquipment.tankCapacity} لتر
                    </p>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="operatorId">المشغل *</Label>
                <Select onValueChange={(value) => setValue("operatorId", value)} value={watchedFields.operatorId}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المشغل" />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map(operator => (
                      <SelectItem key={operator.id} value={operator.id}>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>{operator.name}</span>
                          <Badge className="bg-purple-100 text-purple-800 text-xs">{operator.role}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.operatorId && <p className="text-red-500 text-sm mt-1">{errors.operatorId.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Date, Time & Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarLucide className="h-5 w-5 text-green-600" />
                التاريخ والوقت والموقع
              </CardTitle>
              <CardDescription>متى وأين تمت عملية التزود</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="date">تاريخ التزود *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !watchedFields.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchedFields.date ? format(watchedFields.date, "PPP", { locale: lang === 'ar' ? ar : enUS }) : <span>اختر التاريخ</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={watchedFields.date}
                      onSelect={(date) => setValue("date", date!)}
                      initialFocus
                      locale={lang === 'ar' ? ar : enUS}
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
              </div>

              <div>
                <Label htmlFor="time">وقت التزود *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="time" 
                    type="time" 
                    {...register("time")} 
                    className="pl-10"
                  />
                </div>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="stationId">محطة الوقود *</Label>
                <Select onValueChange={(value) => setValue("stationId", value)} value={watchedFields.stationId}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر محطة الوقود" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelStations.map(station => (
                      <SelectItem key={station.id} value={station.id}>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span>{station.name}</span>
                          <Badge className="bg-gray-100 text-gray-800 text-xs">{station.location}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stationId && <p className="text-red-500 text-sm mt-1">{errors.stationId.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="location">موقع المعدة (اختياري)</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="location" 
                    {...register("location")} 
                    placeholder="مثال: موقع البرج السكني - الرياض"
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Fuel Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-orange-600" />
                تفاصيل الوقود
              </CardTitle>
              <CardDescription>الكمية والسعر ونوع الوقود</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="fuelType">نوع الوقود *</Label>
                <Select onValueChange={(value) => setValue("fuelType", value)} value={watchedFields.fuelType}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الوقود" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diesel">
                      <Badge className="bg-blue-100 text-blue-800">ديزل</Badge>
                    </SelectItem>
                    <SelectItem value="petrol">
                      <Badge className="bg-green-100 text-green-800">بنزين</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.fuelType && <p className="text-red-500 text-sm mt-1">{errors.fuelType.message}</p>}
              </div>

              <div>
                <Label htmlFor="quantity">الكمية (لتر) *</Label>
                <div className="relative">
                  <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="quantity" 
                    type="number" 
                    step="0.01"
                    {...register("quantity", { valueAsNumber: true })} 
                    placeholder="250"
                    className="pl-10"
                  />
                </div>
                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
                {fillPercentage && (
                  <p className="text-sm text-gray-600 mt-1">
                    نسبة الملء: <span className="font-medium text-blue-600">{fillPercentage}%</span> من سعة الخزان
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pricePerLiter">سعر اللتر (ريال) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="pricePerLiter" 
                    type="number" 
                    step="0.01"
                    {...register("pricePerLiter", { valueAsNumber: true })} 
                    placeholder="2.35"
                    className="pl-10"
                  />
                </div>
                {errors.pricePerLiter && <p className="text-red-500 text-sm mt-1">{errors.pricePerLiter.message}</p>}
              </div>

              <div>
                <Label htmlFor="totalCost">الإجمالي (ريال)</Label>
                <div className="relative">
                  <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="totalCost" 
                    type="text" 
                    value={totalCost.toFixed(2)} 
                    disabled
                    className="pl-10 bg-gray-50 font-bold text-green-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Payment & Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                الدفع ومعلومات إضافية
              </CardTitle>
              <CardDescription>طريقة الدفع والإيصال والملاحظات</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="paymentMethod">طريقة الدفع *</Label>
                <Select onValueChange={(value) => setValue("paymentMethod", value)} value={watchedFields.paymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company_card">بطاقة الشركة</SelectItem>
                    <SelectItem value="cash">نقداً</SelectItem>
                    <SelectItem value="invoice">فاتورة آجلة</SelectItem>
                    <SelectItem value="fuel_card">بطاقة وقود</SelectItem>
                  </SelectContent>
                </Select>
                {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>}
              </div>

              <div>
                <Label htmlFor="receiptNumber">رقم الإيصال (اختياري)</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="receiptNumber" 
                    {...register("receiptNumber")} 
                    placeholder="REC-20240720-001"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="odometerReading">قراءة العداد (اختياري)</Label>
                <div className="relative">
                  <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="odometerReading" 
                    type="number" 
                    {...register("odometerReading", { valueAsNumber: true })} 
                    placeholder="1250"
                    className="pl-10"
                  />
                </div>
                {errors.odometerReading && <p className="text-red-500 text-sm mt-1">{errors.odometerReading.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                <Textarea 
                  id="notes" 
                  {...register("notes")} 
                  rows={3} 
                  placeholder="أي ملاحظات حول عملية التزود..."
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              )}
              تسجيل المعاملة
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/equipment/fuel")} disabled={isSubmitting}>
              إلغاء
            </Button>
          </div>

          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <div className="ml-3 text-sm font-medium text-green-800">تم تسجيل المعاملة بنجاح! جاري التحويل...</div>
              </div>
            </div>
          )}

          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3 text-sm font-medium text-red-800">خطأ: {submitError}</div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-600" />
                ملخص المعاملة
              </CardTitle>
              <CardDescription>نظرة عامة على التفاصيل</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedEquipment ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">المعدة:</p>
                  <p className="text-lg font-bold text-gray-900">{selectedEquipment.name}</p>
                  <Badge className="bg-blue-100 text-blue-800">{selectedEquipment.type}</Badge>
                </div>
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
                  اختر المعدة أولاً
                </div>
              )}

              {selectedOperator && (
                <div className="space-y-2 pt-3 border-t">
                  <p className="text-sm font-medium text-gray-700">المشغل:</p>
                  <p className="text-md font-semibold text-gray-900">{selectedOperator.name}</p>
                  <Badge className="bg-purple-100 text-purple-800">{selectedOperator.role}</Badge>
                </div>
              )}

              {selectedStation && (
                <div className="space-y-2 pt-3 border-t">
                  <p className="text-sm font-medium text-gray-700">المحطة:</p>
                  <p className="text-md font-semibold text-gray-900">{selectedStation.name}</p>
                  <p className="text-sm text-gray-600">{selectedStation.location}</p>
                </div>
              )}

              {watchedFields.quantity > 0 && (
                <div className="space-y-2 pt-3 border-t">
                  <p className="text-sm font-medium text-gray-700">الكمية:</p>
                  <p className="text-2xl font-bold text-blue-600">{watchedFields.quantity} لتر</p>
                  {fillPercentage && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>نسبة الملء</span>
                        <span>{fillPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${fillPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {totalCost > 0 && (
                <div className="space-y-2 pt-3 border-t">
                  <p className="text-sm font-medium text-gray-700">التكلفة الإجمالية:</p>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">{totalCost.toFixed(2)} ريال</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {watchedFields.quantity} لتر × {watchedFields.pricePerLiter} ريال/لتر
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <h3 className="font-semibold text-gray-800 mb-2">التقدم</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(completedSections / totalSections) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{((completedSections / totalSections) * 100).toFixed(0)}%</span>
                </div>
                <div className="space-y-1">
                  {progressPoints.map((completed, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      {completed ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                      <span>
                        {index === 0 && "المعدة والمشغل"}
                        {index === 1 && "التاريخ والموقع"}
                        {index === 2 && "تفاصيل الوقود"}
                        {index === 3 && "طريقة الدفع"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Info className="h-5 w-5 text-blue-600" />
                نصائح للتسجيل
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-700 space-y-2">
              <p>• تأكد من دقة قراءة العداد لتتبع الاستهلاك.</p>
              <p>• احتفظ برقم الإيصال للرجوع إليه لاحقاً.</p>
              <p>• سجل أي ملاحظات غير عادية حول المعدة.</p>
              <p>• تحقق من نوع الوقود المناسب للمعدة.</p>
              <p>• راجع الملخص الجانبي قبل الحفظ.</p>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}


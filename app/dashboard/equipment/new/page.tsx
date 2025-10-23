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
  Truck, 
  Building2, 
  MapPin, 
  DollarSign, 
  Info, 
  Loader2, 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Hammer,
  Settings,
  FileText,
  User,
  Calendar,
  Package,
  Wrench,
  HardHat,
  Ruler,
  Cog,
  Fuel,
  Clock
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

const equipmentTypes = [
  { value: "cranes", label: "رافعات", icon: Truck },
  { value: "excavators", label: "حفارات", icon: HardHat },
  { value: "concrete", label: "معدات خرسانة", icon: Package },
  { value: "transport", label: "معدات نقل", icon: Truck },
  { value: "generators", label: "مولدات كهرباء", icon: Cog },
  { value: "compactors", label: "معدات دمك", icon: Hammer },
  { value: "scaffolding", label: "سقالات", icon: Building2 },
  { value: "tools", label: "أدوات صغيرة", icon: Wrench },
]

const equipmentConditions = [
  { value: "excellent", label: "ممتاز", color: "bg-green-100 text-green-800" },
  { value: "good", label: "جيد", color: "bg-blue-100 text-blue-800" },
  { value: "fair", label: "متوسط", color: "bg-yellow-100 text-yellow-800" },
  { value: "poor", label: "سيء", color: "bg-red-100 text-red-800" },
]

const equipmentStatuses = [
  { value: "available", label: "متاح", color: "bg-green-100 text-green-800" },
  { value: "in-use", label: "قيد الاستخدام", color: "bg-blue-100 text-blue-800" },
  { value: "maintenance", label: "صيانة", color: "bg-yellow-100 text-yellow-800" },
  { value: "out-of-service", label: "خارج الخدمة", color: "bg-red-100 text-red-800" },
]

const projects = [
  { id: "proj-1", name: "البرج السكني الفاخر - الرياض" },
  { id: "proj-2", name: "توسعة مستشفى الملك فهد - جدة" },
  { id: "proj-3", name: "مجمع الرياض التجاري - الرياض" },
  { id: "proj-4", name: "مشروع تطوير الواجهة البحرية - الدمام" },
]

const formSchema = z.object({
  name: z.string().min(3, { message: "اسم المعدة مطلوب ولا يقل عن 3 أحرف" }),
  type: z.string().min(1, { message: "يجب اختيار نوع المعدة" }),
  model: z.string().min(2, { message: "الموديل مطلوب" }),
  manufacturer: z.string().min(2, { message: "الشركة المصنعة مطلوبة" }),
  serialNumber: z.string().min(3, { message: "الرقم التسلسلي مطلوب" }),
  purchaseDate: z.date({ required_error: "تاريخ الشراء مطلوب" }),
  purchasePrice: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "سعر الشراء مطلوب ويجب أن يكون رقماً إيجابياً" })
  ),
  currentValue: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "القيمة الحالية مطلوبة" })
  ),
  condition: z.string().min(1, { message: "يجب اختيار حالة المعدة" }),
  status: z.string().min(1, { message: "يجب اختيار حالة التشغيل" }),
  location: z.string().optional(),
  projectId: z.string().optional(),
  operator: z.string().optional(),
  maintenanceDate: z.date().optional(),
  nextMaintenance: z.date().optional(),
  maintenanceInterval: z.preprocess(
    (val) => val ? Number(val) : 0,
    z.number().min(0, { message: "فترة الصيانة يجب أن تكون رقماً" })
  ),
  hoursUsed: z.preprocess(
    (val) => val ? Number(val) : 0,
    z.number().min(0, { message: "ساعات التشغيل يجب أن تكون رقماً" })
  ),
  fuelType: z.string().optional(),
  fuelCapacity: z.preprocess(
    (val) => val ? Number(val) : 0,
    z.number().min(0, { message: "سعة الوقود يجب أن تكون رقماً" })
  ),
  specifications: z.string().optional(),
  warranty: z.string().optional(),
  insurancePolicy: z.string().optional(),
  insuranceExpiry: z.date().optional(),
  notes: z.string().optional(),
})

type EquipmentFormValues = z.infer<typeof formSchema>

export default function NewEquipmentPage() {
  const { t, lang } = useLanguage()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      model: "",
      manufacturer: "",
      serialNumber: "",
      purchaseDate: new Date(),
      purchasePrice: 0,
      currentValue: 0,
      condition: "good",
      status: "available",
      location: "",
      projectId: "",
      operator: "",
      maintenanceDate: undefined,
      nextMaintenance: undefined,
      maintenanceInterval: 90, // 90 days default
      hoursUsed: 0,
      fuelType: "",
      fuelCapacity: 0,
      specifications: "",
      warranty: "",
      insurancePolicy: "",
      insuranceExpiry: undefined,
      notes: "",
    },
  })

  const { handleSubmit, register, control, watch, setValue, formState: { errors } } = form

  const watchedFields = watch()
  const selectedType = equipmentTypes.find(type => type.value === watchedFields.type)
  const selectedCondition = equipmentConditions.find(cond => cond.value === watchedFields.condition)
  const selectedStatus = equipmentStatuses.find(stat => stat.value === watchedFields.status)
  const selectedProject = projects.find(p => p.id === watchedFields.projectId)

  // Calculate depreciation
  const depreciation = watchedFields.purchasePrice > 0 && watchedFields.currentValue > 0
    ? ((watchedFields.purchasePrice - watchedFields.currentValue) / watchedFields.purchasePrice * 100).toFixed(1)
    : 0

  const onSubmit = async (data: EquipmentFormValues) => {
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log("New Equipment Data:", data)
      setSubmitSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/equipment")
      }, 2000)
    } catch (error: any) {
      setSubmitError(error.message || "حدث خطأ أثناء إضافة المعدة")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressPoints = [
    watchedFields.name && watchedFields.type && watchedFields.model && watchedFields.manufacturer && watchedFields.serialNumber,
    watchedFields.purchaseDate && watchedFields.purchasePrice > 0 && watchedFields.currentValue >= 0,
    watchedFields.condition && watchedFields.status,
    true, // Optional fields
  ]

  const completedSections = progressPoints.filter(Boolean).length
  const totalSections = progressPoints.length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/equipment">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للمعدات
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إضافة معدة إنشائية جديدة</h1>
          <p className="text-gray-600 mt-1">أدخل تفاصيل المعدة الجديدة في النظام</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                المعلومات الأساسية
              </CardTitle>
              <CardDescription>أدخل التفاصيل الأساسية للمعدة</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="name">اسم المعدة *</Label>
                <Input id="name" {...register("name")} placeholder="مثال: رافعة برجية 50 طن" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="type">نوع المعدة *</Label>
                <Select onValueChange={(value) => setValue("type", value)} value={watchedFields.type}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المعدة" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
              </div>

              <div>
                <Label htmlFor="model">الموديل *</Label>
                <Input id="model" {...register("model")} placeholder="مثال: Liebherr 550 EC-H" />
                {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
              </div>

              <div>
                <Label htmlFor="manufacturer">الشركة المصنعة *</Label>
                <Input id="manufacturer" {...register("manufacturer")} placeholder="مثال: Liebherr" />
                {errors.manufacturer && <p className="text-red-500 text-sm mt-1">{errors.manufacturer.message}</p>}
              </div>

              <div>
                <Label htmlFor="serialNumber">الرقم التسلسلي *</Label>
                <Input id="serialNumber" {...register("serialNumber")} placeholder="مثال: TW-2024-001" />
                {errors.serialNumber && <p className="text-red-500 text-sm mt-1">{errors.serialNumber.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                المعلومات المالية
              </CardTitle>
              <CardDescription>تفاصيل الشراء والقيمة الحالية</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="purchaseDate">تاريخ الشراء *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !watchedFields.purchaseDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchedFields.purchaseDate ? format(watchedFields.purchaseDate, "PPP", { locale: lang === 'ar' ? ar : enUS }) : <span>اختر تاريخ الشراء</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={watchedFields.purchaseDate}
                      onSelect={(date) => setValue("purchaseDate", date!)}
                      initialFocus
                      locale={lang === 'ar' ? ar : enUS}
                    />
                  </PopoverContent>
                </Popover>
                {errors.purchaseDate && <p className="text-red-500 text-sm mt-1">{errors.purchaseDate.message}</p>}
              </div>

              <div>
                <Label htmlFor="purchasePrice">سعر الشراء (ريال) *</Label>
                <Input id="purchasePrice" type="number" {...register("purchasePrice", { valueAsNumber: true })} placeholder="2500000" />
                {errors.purchasePrice && <p className="text-red-500 text-sm mt-1">{errors.purchasePrice.message}</p>}
              </div>

              <div>
                <Label htmlFor="currentValue">القيمة الحالية (ريال) *</Label>
                <Input id="currentValue" type="number" {...register("currentValue", { valueAsNumber: true })} placeholder="2200000" />
                {errors.currentValue && <p className="text-red-500 text-sm mt-1">{errors.currentValue.message}</p>}
                {depreciation > 0 && (
                  <p className="text-sm text-gray-600 mt-1">نسبة الإهلاك: <span className="font-medium text-red-600">{depreciation}%</span></p>
                )}
              </div>

              <div>
                <Label htmlFor="warranty">فترة الضمان (اختياري)</Label>
                <Input id="warranty" {...register("warranty")} placeholder="مثال: 3 سنوات أو حتى 5000 ساعة" />
              </div>

              <div>
                <Label htmlFor="insurancePolicy">رقم وثيقة التأمين (اختياري)</Label>
                <Input id="insurancePolicy" {...register("insurancePolicy")} placeholder="مثال: INS-2024-001" />
              </div>

              <div>
                <Label htmlFor="insuranceExpiry">تاريخ انتهاء التأمين (اختياري)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !watchedFields.insuranceExpiry && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchedFields.insuranceExpiry ? format(watchedFields.insuranceExpiry, "PPP", { locale: lang === 'ar' ? ar : enUS }) : <span>اختر تاريخ الانتهاء</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={watchedFields.insuranceExpiry}
                      onSelect={(date) => setValue("insuranceExpiry", date)}
                      initialFocus
                      locale={lang === 'ar' ? ar : enUS}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Status & Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-600" />
                الحالة والموقع
              </CardTitle>
              <CardDescription>حالة المعدة وموقعها الحالي</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="condition">حالة المعدة *</Label>
                <Select onValueChange={(value) => setValue("condition", value)} value={watchedFields.condition}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentConditions.map(cond => (
                      <SelectItem key={cond.value} value={cond.value}>
                        <Badge className={cond.color}>{cond.label}</Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition.message}</p>}
              </div>

              <div>
                <Label htmlFor="status">حالة التشغيل *</Label>
                <Select onValueChange={(value) => setValue("status", value)} value={watchedFields.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر حالة التشغيل" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentStatuses.map(stat => (
                      <SelectItem key={stat.value} value={stat.value}>
                        <Badge className={stat.color}>{stat.label}</Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
              </div>

              <div>
                <Label htmlFor="projectId">المشروع المخصص (اختياري)</Label>
                <Select onValueChange={(value) => setValue("projectId", value)} value={watchedFields.projectId}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المشروع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">بدون مشروع</SelectItem>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">الموقع الحالي (اختياري)</Label>
                <Input id="location" {...register("location")} placeholder="مثال: موقع البرج السكني - الرياض" />
              </div>

              <div>
                <Label htmlFor="operator">المشغل (اختياري)</Label>
                <Input id="operator" {...register("operator")} placeholder="مثال: خالد محمد" />
              </div>

              <div>
                <Label htmlFor="hoursUsed">ساعات التشغيل (اختياري)</Label>
                <Input id="hoursUsed" type="number" {...register("hoursUsed", { valueAsNumber: true })} placeholder="1250" />
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Maintenance & Fuel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-orange-600" />
                الصيانة والوقود
              </CardTitle>
              <CardDescription>معلومات الصيانة واستهلاك الوقود</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="maintenanceDate">تاريخ آخر صيانة (اختياري)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !watchedFields.maintenanceDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchedFields.maintenanceDate ? format(watchedFields.maintenanceDate, "PPP", { locale: lang === 'ar' ? ar : enUS }) : <span>اختر تاريخ الصيانة</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={watchedFields.maintenanceDate}
                      onSelect={(date) => setValue("maintenanceDate", date)}
                      initialFocus
                      locale={lang === 'ar' ? ar : enUS}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="nextMaintenance">تاريخ الصيانة القادمة (اختياري)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !watchedFields.nextMaintenance && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchedFields.nextMaintenance ? format(watchedFields.nextMaintenance, "PPP", { locale: lang === 'ar' ? ar : enUS }) : <span>اختر تاريخ الصيانة</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={watchedFields.nextMaintenance}
                      onSelect={(date) => setValue("nextMaintenance", date)}
                      initialFocus
                      locale={lang === 'ar' ? ar : enUS}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="maintenanceInterval">فترة الصيانة (بالأيام)</Label>
                <Input id="maintenanceInterval" type="number" {...register("maintenanceInterval", { valueAsNumber: true })} placeholder="90" />
              </div>

              <div>
                <Label htmlFor="fuelType">نوع الوقود (اختياري)</Label>
                <Select onValueChange={(value) => setValue("fuelType", value)} value={watchedFields.fuelType}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الوقود" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diesel">ديزل</SelectItem>
                    <SelectItem value="petrol">بنزين</SelectItem>
                    <SelectItem value="electric">كهرباء</SelectItem>
                    <SelectItem value="hybrid">هجين</SelectItem>
                    <SelectItem value="none">لا يحتاج وقود</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fuelCapacity">سعة خزان الوقود (لتر - اختياري)</Label>
                <Input id="fuelCapacity" type="number" {...register("fuelCapacity", { valueAsNumber: true })} placeholder="500" />
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                معلومات إضافية
              </CardTitle>
              <CardDescription>المواصفات والملاحظات</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="specifications">المواصفات الفنية (اختياري)</Label>
                <Textarea id="specifications" {...register("specifications")} rows={3} placeholder="مثال: سعة رفع 50 طن، ارتفاع 80 متر، ذراع 60 متر..." />
              </div>

              <div>
                <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                <Textarea id="notes" {...register("notes")} rows={3} placeholder="أي ملاحظات إضافية عن المعدة..." />
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
              إضافة المعدة
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/equipment")} disabled={isSubmitting}>
              إلغاء
            </Button>
          </div>

          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <div className="ml-3 text-sm font-medium text-green-800">تم إضافة المعدة بنجاح! جاري التحويل...</div>
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
                ملخص المعدة
              </CardTitle>
              <CardDescription>نظرة عامة على التفاصيل</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">اسم المعدة:</p>
                <p className="text-lg font-bold text-gray-900">{watchedFields.name || "غير محدد"}</p>
              </div>

              {selectedType && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">النوع:</p>
                  <div className="flex items-center gap-2">
                    <selectedType.icon className="h-5 w-5 text-blue-600" />
                    <p className="text-md text-gray-800">{selectedType.label}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">الموديل:</p>
                <p className="text-md text-gray-800">{watchedFields.model || "غير محدد"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">الرقم التسلسلي:</p>
                <p className="text-md text-gray-800 font-mono">{watchedFields.serialNumber || "غير محدد"}</p>
              </div>

              {watchedFields.purchasePrice > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">سعر الشراء:</p>
                  <p className="text-lg font-bold text-green-600">{watchedFields.purchasePrice.toLocaleString('ar-SA')} ريال</p>
                </div>
              )}

              {watchedFields.currentValue > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">القيمة الحالية:</p>
                  <p className="text-lg font-bold text-blue-600">{watchedFields.currentValue.toLocaleString('ar-SA')} ريال</p>
                </div>
              )}

              {selectedCondition && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">الحالة:</p>
                  <Badge className={selectedCondition.color}>{selectedCondition.label}</Badge>
                </div>
              )}

              {selectedStatus && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">حالة التشغيل:</p>
                  <Badge className={selectedStatus.color}>{selectedStatus.label}</Badge>
                </div>
              )}

              {selectedProject && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">المشروع:</p>
                  <p className="text-sm text-gray-800">{selectedProject.name}</p>
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
                        {index === 0 && "المعلومات الأساسية"}
                        {index === 1 && "المعلومات المالية"}
                        {index === 2 && "الحالة والموقع"}
                        {index === 3 && "معلومات إضافية"}
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
                نصائح لإضافة معدة
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-700 space-y-2">
              <p>• تأكد من دقة الرقم التسلسلي لكل معدة.</p>
              <p>• احتفظ بسجلات الضمان والتأمين محدثة.</p>
              <p>• حدد فترات صيانة دورية مناسبة.</p>
              <p>• ربط المعدات بالمشاريع لتسهيل التتبع.</p>
              <p>• راجع الملخص الجانبي قبل الحفظ.</p>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}


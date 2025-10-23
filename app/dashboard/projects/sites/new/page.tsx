"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Save,
  Send,
  MapPin,
  Building2,
  User,
  Phone,
  Mail,
  Calendar,
  Ruler,
  HardHat,
  CheckCircle2,
  Info,
  AlertTriangle
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

const projects = [
  { id: "1", name: "البرج السكني - الرياض" },
  { id: "2", name: "الفيلا السكنية - جدة" },
  { id: "3", name: "المجمع التجاري - الدمام" },
  { id: "4", name: "المصنع - الخبر" }
]

const cities = [
  "الرياض",
  "جدة",
  "مكة المكرمة",
  "المدينة المنورة",
  "الدمام",
  "الخبر",
  "الظهران",
  "تبوك",
  "أبها",
  "الطائف"
]

const siteTypes = [
  "مباني سكنية",
  "مباني تجارية",
  "مباني إدارية",
  "مباني صناعية",
  "بنية تحتية",
  "طرق وجسور",
  "مرافق عامة"
]

export default function NewSitePage() {
  const { t, lang } = useLanguage()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    siteType: "",
    address: "",
    city: "",
    coordinates: "",
    area: "",
    floors: "",
    startDate: "",
    expectedEndDate: "",
    supervisor: "",
    supervisorPhone: "",
    supervisorEmail: "",
    workers: 0,
    engineers: 0,
    technicians: 0,
    safetyOfficer: "",
    safetyPhone: "",
    emergencyContact: "",
    nearestHospital: "",
    nearestPolice: "",
    accessInstructions: "",
    parkingInfo: "",
    securityMeasures: "",
    workingHours: "7:00 AM - 5:00 PM",
    notes: ""
  })

  const [errors, setErrors] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.name) newErrors.name = "اسم الموقع مطلوب"
    if (!formData.project) newErrors.project = "المشروع مطلوب"
    if (!formData.siteType) newErrors.siteType = "نوع الموقع مطلوب"
    if (!formData.address) newErrors.address = "العنوان مطلوب"
    if (!formData.city) newErrors.city = "المدينة مطلوبة"
    if (!formData.area) newErrors.area = "المساحة مطلوبة"
    if (!formData.startDate) newErrors.startDate = "تاريخ البدء مطلوب"
    if (!formData.supervisor) newErrors.supervisor = "المشرف مطلوب"
    if (!formData.supervisorPhone) newErrors.supervisorPhone = "هاتف المشرف مطلوب"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (action: 'save' | 'activate') => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form Data:', formData)
      console.log('Action:', action)
      setIsSubmitting(false)
      router.push('/dashboard/projects/sites')
    }, 1500)
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
          <h1 className="text-3xl font-bold text-gray-900">إضافة موقع عمل جديد</h1>
          <p className="text-gray-600 mt-1">إنشاء موقع بناء وتشييد جديد</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم الموقع *</Label>
                <Input
                  id="name"
                  placeholder="مثال: موقع البرج السكني - المرحلة الأولى"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project">المشروع *</Label>
                  <select
                    id="project"
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.project ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">اختر المشروع</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  {errors.project && <p className="text-xs text-red-500">{errors.project}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteType">نوع الموقع *</Label>
                  <select
                    id="siteType"
                    value={formData.siteType}
                    onChange={(e) => setFormData({...formData, siteType: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.siteType ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">اختر النوع</option>
                    {siteTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.siteType && <p className="text-xs text-red-500">{errors.siteType}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">عنوان الموقع *</Label>
                <Input
                  id="address"
                  placeholder="الشارع والحي والرقم البريدي"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">المدينة *</Label>
                  <select
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">اختر المدينة</option>
                    {cities.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coordinates">الإحداثيات (GPS)</Label>
                  <Input
                    id="coordinates"
                    placeholder="24.7136, 46.6753"
                    value={formData.coordinates}
                    onChange={(e) => setFormData({...formData, coordinates: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">المساحة (م²) *</Label>
                  <Input
                    id="area"
                    type="number"
                    min="0"
                    placeholder="5000"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    className={errors.area ? 'border-red-500' : ''}
                  />
                  {errors.area && <p className="text-xs text-red-500">{errors.area}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="floors">عدد الطوابق</Label>
                  <Input
                    id="floors"
                    placeholder="15 طابق"
                    value={formData.floors}
                    onChange={(e) => setFormData({...formData, floors: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workingHours">ساعات العمل</Label>
                  <Input
                    id="workingHours"
                    placeholder="7:00 AM - 5:00 PM"
                    value={formData.workingHours}
                    onChange={(e) => setFormData({...formData, workingHours: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">تاريخ بدء العمل *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className={errors.startDate ? 'border-red-500' : ''}
                  />
                  {errors.startDate && <p className="text-xs text-red-500">{errors.startDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedEndDate">تاريخ الانتهاء المتوقع</Label>
                  <Input
                    id="expectedEndDate"
                    type="date"
                    value={formData.expectedEndDate}
                    onChange={(e) => setFormData({...formData, expectedEndDate: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supervision & Team */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="h-5 w-5" />
                الإشراف وفريق العمل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supervisor">مشرف الموقع *</Label>
                  <Input
                    id="supervisor"
                    placeholder="م. أحمد محمد"
                    value={formData.supervisor}
                    onChange={(e) => setFormData({...formData, supervisor: e.target.value})}
                    className={errors.supervisor ? 'border-red-500' : ''}
                  />
                  {errors.supervisor && <p className="text-xs text-red-500">{errors.supervisor}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supervisorPhone">هاتف المشرف *</Label>
                  <Input
                    id="supervisorPhone"
                    placeholder="05xxxxxxxx"
                    value={formData.supervisorPhone}
                    onChange={(e) => setFormData({...formData, supervisorPhone: e.target.value})}
                    className={errors.supervisorPhone ? 'border-red-500' : ''}
                  />
                  {errors.supervisorPhone && <p className="text-xs text-red-500">{errors.supervisorPhone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supervisorEmail">بريد المشرف</Label>
                  <Input
                    id="supervisorEmail"
                    type="email"
                    placeholder="supervisor@company.com"
                    value={formData.supervisorEmail}
                    onChange={(e) => setFormData({...formData, supervisorEmail: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workers">عدد العمال</Label>
                  <Input
                    id="workers"
                    type="number"
                    min="0"
                    placeholder="45"
                    value={formData.workers || ''}
                    onChange={(e) => setFormData({...formData, workers: parseInt(e.target.value) || 0})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="engineers">عدد المهندسين</Label>
                  <Input
                    id="engineers"
                    type="number"
                    min="0"
                    placeholder="3"
                    value={formData.engineers || ''}
                    onChange={(e) => setFormData({...formData, engineers: parseInt(e.target.value) || 0})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technicians">عدد الفنيين</Label>
                  <Input
                    id="technicians"
                    type="number"
                    min="0"
                    placeholder="8"
                    value={formData.technicians || ''}
                    onChange={(e) => setFormData({...formData, technicians: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety & Emergency */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                السلامة والطوارئ
              </CardTitle>
              <CardDescription>معلومات مهمة للسلامة وحالات الطوارئ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="safetyOfficer">مسؤول السلامة</Label>
                  <Input
                    id="safetyOfficer"
                    placeholder="خالد أحمد"
                    value={formData.safetyOfficer}
                    onChange={(e) => setFormData({...formData, safetyOfficer: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="safetyPhone">هاتف السلامة</Label>
                  <Input
                    id="safetyPhone"
                    placeholder="05xxxxxxxx"
                    value={formData.safetyPhone}
                    onChange={(e) => setFormData({...formData, safetyPhone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">جهة اتصال الطوارئ</Label>
                  <Input
                    id="emergencyContact"
                    placeholder="رقم الطوارئ"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nearestHospital">أقرب مستشفى</Label>
                  <Input
                    id="nearestHospital"
                    placeholder="مستشفى الملك فهد"
                    value={formData.nearestHospital}
                    onChange={(e) => setFormData({...formData, nearestHospital: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityMeasures">إجراءات السلامة المطبقة</Label>
                <Textarea
                  id="securityMeasures"
                  placeholder="قائمة بإجراءات السلامة المطبقة في الموقع..."
                  rows={3}
                  value={formData.securityMeasures}
                  onChange={(e) => setFormData({...formData, securityMeasures: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Access & Logistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                الوصول واللوجستيات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accessInstructions">تعليمات الوصول للموقع</Label>
                <Textarea
                  id="accessInstructions"
                  placeholder="كيفية الوصول للموقع، المعالم البارزة، الطرق المؤدية..."
                  rows={3}
                  value={formData.accessInstructions}
                  onChange={(e) => setFormData({...formData, accessInstructions: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parkingInfo">معلومات مواقف السيارات</Label>
                <Input
                  id="parkingInfo"
                  placeholder="موقع المواقف والسعة"
                  value={formData.parkingInfo}
                  onChange={(e) => setFormData({...formData, parkingInfo: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea
                  id="notes"
                  placeholder="أي ملاحظات أو معلومات إضافية عن الموقع..."
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Quick Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                ملخص الموقع
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">المشروع</p>
                <p className="font-semibold text-sm">
                  {formData.project ? projects.find(p => p.id === formData.project)?.name : 'لم يتم التحديد'}
                </p>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">المدينة</p>
                <p className="font-semibold text-sm">
                  {formData.city || 'لم يتم التحديد'}
                </p>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">المساحة</p>
                <p className="font-semibold text-sm">
                  {formData.area ? `${formData.area} م²` : 'لم يتم التحديد'}
                </p>
              </div>

              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">إجمالي العاملين</p>
                <p className="font-semibold text-lg">
                  {formData.workers + formData.engineers + formData.technicians}
                </p>
                <div className="flex gap-2 mt-1 text-xs">
                  <Badge variant="outline">{formData.workers} عامل</Badge>
                  <Badge variant="outline">{formData.engineers} مهندس</Badge>
                  <Badge variant="outline">{formData.technicians} فني</Badge>
                </div>
              </div>

              <div className="pt-4 space-y-2 border-t">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                  onClick={() => handleSubmit('activate')}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>جاري الحفظ...</>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      حفظ وتفعيل الموقع
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSubmit('save')}
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" />
                  حفظ كمسودة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Indicator */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-blue-900">الحقول المطلوبة:</p>
                  <ul className="space-y-1 text-xs text-blue-800">
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.name ? 'bg-green-500' : 'bg-gray-300'}`} />
                      اسم الموقع
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.project ? 'bg-green-500' : 'bg-gray-300'}`} />
                      المشروع
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.siteType ? 'bg-green-500' : 'bg-gray-300'}`} />
                      نوع الموقع
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.address ? 'bg-green-500' : 'bg-gray-300'}`} />
                      العنوان
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.city ? 'bg-green-500' : 'bg-gray-300'}`} />
                      المدينة
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.area ? 'bg-green-500' : 'bg-gray-300'}`} />
                      المساحة
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.startDate ? 'bg-green-500' : 'bg-gray-300'}`} />
                      تاريخ البدء
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.supervisor ? 'bg-green-500' : 'bg-gray-300'}`} />
                      المشرف
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.supervisorPhone ? 'bg-green-500' : 'bg-gray-300'}`} />
                      هاتف المشرف
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="space-y-2 text-sm text-yellow-900">
                  <p><strong>نصائح مهمة:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>تأكد من دقة العنوان والإحداثيات</li>
                    <li>حدد مشرف موقع ذو خبرة</li>
                    <li>وثق معلومات السلامة بدقة</li>
                    <li>حدد ساعات العمل الرسمية</li>
                    <li>سجل جهات الطوارئ القريبة</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


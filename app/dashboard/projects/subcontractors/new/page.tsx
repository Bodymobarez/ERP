"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Save,
  Plus,
  X,
  Building2,
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  DollarSign,
  Shield,
  Star,
  CheckCircle2,
  AlertTriangle,
  Info,
  Upload,
  Camera,
  User,
  Briefcase,
  Award,
  Clock,
  Target,
  TrendingUp
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const specializations = [
  { id: "concrete", name: "أعمال الخرسانة", color: "bg-blue-100 text-blue-800" },
  { id: "steel", name: "أعمال الحديد", color: "bg-gray-100 text-gray-800" },
  { id: "finishing", name: "أعمال التشطيب", color: "bg-green-100 text-green-800" },
  { id: "electrical", name: "التمديدات الكهربائية", color: "bg-yellow-100 text-yellow-800" },
  { id: "plumbing", name: "التمديدات الصحية", color: "bg-purple-100 text-purple-800" },
  { id: "hvac", name: "التكييف والتهوية", color: "bg-red-100 text-red-800" },
  { id: "landscaping", name: "أعمال التنسيق", color: "bg-emerald-100 text-emerald-800" },
  { id: "security", name: "أنظمة الأمان", color: "bg-orange-100 text-orange-800" }
]

const contractTypes = [
  { id: "lump_sum", name: "مبلغ إجمالي", description: "مبلغ ثابت للمشروع" },
  { id: "unit_price", name: "سعر الوحدة", description: "سعر لكل وحدة منفذة" },
  { id: "cost_plus", name: "التكلفة زائد", description: "التكلفة الفعلية زائد نسبة ربح" },
  { id: "time_material", name: "الوقت والمواد", description: "دفع حسب الوقت والمواد المستخدمة" }
]

const paymentTerms = [
  { id: "30_days", name: "30 يوم", description: "الدفع خلال 30 يوم" },
  { id: "45_days", name: "45 يوم", description: "الدفع خلال 45 يوم" },
  { id: "60_days", name: "60 يوم", description: "الدفع خلال 60 يوم" },
  { id: "milestone", name: "عند الإنجاز", description: "الدفع عند إنجاز مراحل" }
]

// دالة لتقليل الأصفار وتحويل الأرقام لصيغة مختصرة
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

export default function NewSubcontractorPage() {
  const { t, lang } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1) // 1: Basic Info, 2: Specializations, 3: Contract, 4: Review
  const [formData, setFormData] = useState({
    // Basic Information
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    mobile: "",
    address: "",
    city: "",
    country: "السعودية",
    website: "",
    taxNumber: "",
    commercialRegister: "",
    
    // Specializations
    specializations: [] as string[],
    experience: "",
    teamSize: "",
    previousProjects: [] as Array<{name: string, value: number, year: string}>,
    
    // Contract Details
    contractType: "",
    paymentTerms: "",
    insuranceRequired: false,
    warrantyPeriod: "",
    performanceBond: "",
    advancePayment: "",
    
    // Additional Info
    notes: "",
    documents: [] as File[]
  })

  const [newProject, setNewProject] = useState({ name: "", value: "", year: "" })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSpecializationToggle = (specializationId: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specializationId)
        ? prev.specializations.filter(id => id !== specializationId)
        : [...prev.specializations, specializationId]
    }))
  }

  const handleAddProject = () => {
    if (newProject.name && newProject.value && newProject.year) {
      setFormData(prev => ({
        ...prev,
        previousProjects: [...prev.previousProjects, {
          name: newProject.name,
          value: Math.round(parseFloat(newProject.value)),
          year: newProject.year
        }]
      }))
      setNewProject({ name: "", value: "", year: "" })
    }
  }

  const handleRemoveProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      previousProjects: prev.previousProjects.filter((_, i) => i !== index)
    }))
  }

  const handleSave = () => {
    console.log("Saving subcontractor:", formData)
    alert("تم حفظ بيانات المقاول بنجاح!")
  }

  const getSpecializationColor = (specializationId: string) => {
    const spec = specializations.find(s => s.id === specializationId)
    return spec ? spec.color : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 via-orange-700 to-red-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/projects/subcontractors">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                العودة للمقاولين
              </Button>
            </Link>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Users className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">مقاول من الباطن جديد</h1>
              <p className="text-orange-100 text-lg">إضافة مقاول من الباطن للمشروع</p>
            </div>
          </div>
          <div className="hidden lg:flex gap-3">
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
              <FileText className="h-5 w-5 mr-2" />
              حفظ كمسودة
            </Button>
            <Button className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg">
              <Save className="h-5 w-5 mr-2" />
              حفظ المقاول
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= step 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-1 mx-2 ${
                currentStep > step ? 'bg-orange-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-orange-600" />
                معلومات الشركة
              </CardTitle>
              <CardDescription>البيانات الأساسية للشركة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشركة</label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="مثال: شركة البناء المتقدم"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الشخص المسؤول</label>
                <Input
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="الاسم الكامل"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="info@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الهاتف</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+966 11 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الجوال</label>
                <Input
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  placeholder="+966 50 123 4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="العنوان التفصيلي"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="الرياض"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البلد</label>
                  <Input
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder="السعودية"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                المعلومات القانونية
              </CardTitle>
              <CardDescription>البيانات الرسمية للشركة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الرقم الضريبي</label>
                <Input
                  value={formData.taxNumber}
                  onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                  placeholder="300000000000003"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السجل التجاري</label>
                <Input
                  value={formData.commercialRegister}
                  onChange={(e) => handleInputChange('commercialRegister', e.target.value)}
                  placeholder="1010000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموقع الإلكتروني</label>
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://www.company.com"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">معلومات إضافية:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• تأكد من صحة البيانات المدخلة</li>
                      <li>• الرقم الضريبي مكون من 15 رقم</li>
                      <li>• السجل التجاري مكون من 10 أرقام</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Specializations */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-green-600" />
                التخصصات
              </CardTitle>
              <CardDescription>اختر التخصصات التي يعمل بها المقاول</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {specializations.map((specialization) => (
                  <div
                    key={specialization.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.specializations.includes(specialization.id)
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => handleSpecializationToggle(specialization.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.specializations.includes(specialization.id)}
                        onChange={() => {}}
                        className="rounded"
                      />
                      <Badge className={specialization.color}>
                        {specialization.name}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-purple-600" />
                الخبرة والمشاريع السابقة
              </CardTitle>
              <CardDescription>بيانات الخبرة والمشاريع المنفذة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
                  <Input
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="5 سنوات"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حجم الفريق</label>
                  <Input
                    value={formData.teamSize}
                    onChange={(e) => handleInputChange('teamSize', e.target.value)}
                    placeholder="50 عامل"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">المشاريع السابقة</h4>
                <div className="space-y-3">
                  {formData.previousProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-gray-600">{formatNumber(Math.round(project.value))} ريال - {project.year}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProject(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        value={newProject.name}
                        onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="اسم المشروع"
                      />
                      <Input
                        value={newProject.value}
                        onChange={(e) => setNewProject(prev => ({ ...prev, value: e.target.value }))}
                        placeholder="القيمة"
                        type="number"
                      />
                      <Input
                        value={newProject.year}
                        onChange={(e) => setNewProject(prev => ({ ...prev, year: e.target.value }))}
                        placeholder="السنة"
                      />
                    </div>
                    <Button onClick={handleAddProject} className="mt-2 w-full" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      إضافة مشروع
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Contract Details */}
      {currentStep === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                تفاصيل العقد
              </CardTitle>
              <CardDescription>شروط وأحكام التعاقد</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع العقد</label>
                <select
                  value={formData.contractType}
                  onChange={(e) => handleInputChange('contractType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">اختر نوع العقد</option>
                  {contractTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
                {formData.contractType && (
                  <p className="text-sm text-gray-600 mt-1">
                    {contractTypes.find(t => t.id === formData.contractType)?.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">شروط الدفع</label>
                <select
                  value={formData.paymentTerms}
                  onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">اختر شروط الدفع</option>
                  {paymentTerms.map(term => (
                    <option key={term.id} value={term.id}>{term.name}</option>
                  ))}
                </select>
                {formData.paymentTerms && (
                  <p className="text-sm text-gray-600 mt-1">
                    {paymentTerms.find(t => t.id === formData.paymentTerms)?.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">فترة الضمان</label>
                  <Input
                    value={formData.warrantyPeriod}
                    onChange={(e) => handleInputChange('warrantyPeriod', e.target.value)}
                    placeholder="12 شهر"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ضمان الأداء</label>
                  <Input
                    value={formData.performanceBond}
                    onChange={(e) => handleInputChange('performanceBond', e.target.value)}
                    placeholder="5% من قيمة العقد"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الدفعة المقدمة</label>
                <Input
                  value={formData.advancePayment}
                  onChange={(e) => handleInputChange('advancePayment', e.target.value)}
                  placeholder="20% من قيمة العقد"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.insuranceRequired}
                  onChange={(e) => handleInputChange('insuranceRequired', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">التأمين مطلوب</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                المستندات المطلوبة
              </CardTitle>
              <CardDescription>رفع المستندات المطلوبة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    setFormData(prev => ({ ...prev, documents: [...prev.documents, ...files] }))
                  }}
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className="cursor-pointer bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 inline-block"
                >
                  رفع المستندات
                </label>
                <p className="text-sm text-gray-600 mt-2">
                  {formData.documents.length} مستند مرفق
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">المستندات المطلوبة:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• السجل التجاري</li>
                      <li>• الرقم الضريبي</li>
                      <li>• شهادة التأمين</li>
                      <li>• شهادات الخبرة</li>
                      <li>• صور من المشاريع السابقة</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Review */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                مراجعة البيانات
              </CardTitle>
              <CardDescription>راجع بيانات المقاول قبل الحفظ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">المعلومات الأساسية</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">اسم الشركة:</span> {formData.companyName}</p>
                    <p><span className="font-medium">الشخص المسؤول:</span> {formData.contactPerson}</p>
                    <p><span className="font-medium">البريد الإلكتروني:</span> {formData.email}</p>
                    <p><span className="font-medium">الهاتف:</span> {formData.phone}</p>
                    <p><span className="font-medium">العنوان:</span> {formData.address}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">التخصصات</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.specializations.map(specId => {
                      const spec = specializations.find(s => s.id === specId)
                      return spec ? (
                        <Badge key={specId} className={spec.color}>
                          {spec.name}
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">المشاريع السابقة</h3>
                <div className="space-y-2">
                  {formData.previousProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-gray-600">{formatNumber(Math.round(project.value))} ريال - {project.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">تفاصيل العقد</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p><span className="font-medium">نوع العقد:</span> {contractTypes.find(t => t.id === formData.contractType)?.name}</p>
                  <p><span className="font-medium">شروط الدفع:</span> {paymentTerms.find(t => t.id === formData.paymentTerms)?.name}</p>
                  <p><span className="font-medium">فترة الضمان:</span> {formData.warrantyPeriod}</p>
                  <p><span className="font-medium">التأمين:</span> {formData.insuranceRequired ? "مطلوب" : "غير مطلوب"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(3)}>
              السابق
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              حفظ المقاول
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        {currentStep > 1 && (
          <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
            السابق
          </Button>
        )}
        {currentStep < 4 && (
          <Button onClick={() => setCurrentStep(currentStep + 1)}>
            التالي
          </Button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/projects/subcontractors">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المقاولين</h3>
                  <p className="text-sm text-gray-600">عرض جميع المقاولين</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المشاريع</h3>
                  <p className="text-sm text-gray-600">العودة للمشاريع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/contracts">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">العقود</h3>
                  <p className="text-sm text-gray-600">إدارة العقود</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/bom">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">حصر الكميات</h3>
                  <p className="text-sm text-gray-600">إدارة BOQ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowLeft,
  Save,
  Plus,
  X,
  Search,
  Calculator,
  FileText,
  Calendar,
  DollarSign,
  Truck,
  User,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Upload,
  Camera,
  CreditCard,
  Receipt,
  Phone,
  Mail,
  MapPin,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Settings,
  Send,
  Printer,
  Download,
  Eye,
  Edit,
  Trash2,
  Archive,
  Star,
  Award,
  Zap,
  Wrench,
  HardHat,
  Shield,
  Activity,
  Package,
  Ruler,
  Building,
  Hammer,
  Cog
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

// دالة لتقليل الأصفار وتحويل الأرقام لصيغة مختصرة
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

// Mock Data
const mockCustomers = [
  { id: "1", name: "شركة البناء المتقدم", contact: "أحمد محمد", email: "ahmed@company.com", phone: "+966 50 123 4567" },
  { id: "2", name: "مؤسسة التشييد الحديث", contact: "سارة أحمد", email: "sara@company.com", phone: "+966 55 987 6543" },
  { id: "3", name: "شركة المشاريع الكبرى", contact: "محمد علي", email: "mohamed@company.com", phone: "+966 51 456 7890" },
  { id: "4", name: "مجموعة الإنشاءات المتحدة", contact: "فاطمة خالد", email: "fatima@company.com", phone: "+966 54 321 0987" }
]

const mockEquipment = [
  { id: "1", name: "حفار هيدروليكي", model: "CAT 320D", serialNumber: "CAT320D-2023-001", type: "حفارات", dailyRate: 2500, status: "available" },
  { id: "2", name: "رافعة برجية", model: "Liebherr 132EC-H8", serialNumber: "LB132-2023-002", type: "رافعات", dailyRate: 1800, status: "available" },
  { id: "3", name: "خلاطة خرسانة", model: "Schwing SP 3050", serialNumber: "SP3050-2023-003", type: "خلاطات", dailyRate: 1200, status: "rented" },
  { id: "4", name: "جرافة", model: "Komatsu D65PX-18", serialNumber: "KD65-2023-004", type: "جرافات", dailyRate: 2200, status: "available" },
  { id: "5", name: "رافعة شوكية", model: "Toyota 8FGCU25", serialNumber: "T8FGCU25-2023-005", type: "رافعات شوكية", dailyRate: 800, status: "maintenance" }
]

const paymentMethods = [
  { id: "bank_transfer", name: "تحويل بنكي", icon: CreditCard, description: "تحويل مباشر للبنك" },
  { id: "check", name: "شيك", icon: Receipt, description: "شيك مصرفي" },
  { id: "cash", name: "نقدي", icon: DollarSign, description: "دفع نقدي" },
  { id: "credit_card", name: "بطاقة ائتمان", icon: CreditCard, description: "بطاقة ائتمان" }
]

const rentalTerms = [
  { id: "daily", name: "يومي", description: "إيجار يومي" },
  { id: "weekly", name: "أسبوعي", description: "إيجار أسبوعي مع خصم 5%" },
  { id: "monthly", name: "شهري", description: "إيجار شهري مع خصم 15%" },
  { id: "quarterly", name: "ربع سنوي", description: "إيجار ربع سنوي مع خصم 25%" },
  { id: "yearly", name: "سنوي", description: "إيجار سنوي مع خصم 40%" }
]

export default function NewRentalInvoicePage() {
  const { t, lang } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1) // 1: Customer, 2: Equipment, 3: Terms, 4: Review
  const [formData, setFormData] = useState({
    // Customer Information
    customerId: "",
    customerName: "",
    customerContact: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    
    // Equipment Information
    equipmentId: "",
    equipmentName: "",
    equipmentModel: "",
    equipmentSerialNumber: "",
    equipmentType: "",
    dailyRate: 0,
    
    // Rental Terms
    rentalTerm: "",
    startDate: "",
    endDate: "",
    duration: 0,
    discount: 0,
    discountType: "percentage", // percentage or fixed
    
    // Financial
    subtotal: 0,
    discountAmount: 0,
    vatRate: 15,
    vatAmount: 0,
    totalAmount: 0,
    
    // Payment
    paymentMethod: "",
    paymentTerms: "30", // days
    dueDate: "",
    
    // Additional
    notes: "",
    terms: "",
    attachments: [] as File[]
  })

  const [customerSearch, setCustomerSearch] = useState("")
  const [equipmentSearch, setEquipmentSearch] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCustomerSelect = (customer: any) => {
    setFormData(prev => ({
      ...prev,
      customerId: customer.id,
      customerName: customer.name,
      customerContact: customer.contact,
      customerEmail: customer.email,
      customerPhone: customer.phone
    }))
    setCustomerSearch("")
  }

  const handleEquipmentSelect = (equipment: any) => {
    setFormData(prev => ({
      ...prev,
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      equipmentModel: equipment.model,
      equipmentSerialNumber: equipment.serialNumber,
      equipmentType: equipment.type,
      dailyRate: equipment.dailyRate
    }))
    setEquipmentSearch("")
  }

  const calculateTotals = () => {
    const subtotal = formData.dailyRate * formData.duration
    const discountAmount = formData.discountType === "percentage" 
      ? (subtotal * formData.discount / 100)
      : formData.discount
    const afterDiscount = subtotal - discountAmount
    const vatAmount = (afterDiscount * formData.vatRate / 100)
    const totalAmount = afterDiscount + vatAmount

    setFormData(prev => ({
      ...prev,
      subtotal,
      discountAmount,
      vatAmount,
      totalAmount
    }))
  }

  const handleDateChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (field === "startDate" && formData.endDate) {
      const start = new Date(value)
      const end = new Date(formData.endDate)
      const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      setFormData(prev => ({ ...prev, duration }))
    } else if (field === "endDate" && formData.startDate) {
      const start = new Date(formData.startDate)
      const end = new Date(value)
      const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      setFormData(prev => ({ ...prev, duration }))
    }
  }

  const handleSave = () => {
    console.log("Saving invoice:", formData)
    alert("تم حفظ الفاتورة بنجاح!")
  }

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.contact.toLowerCase().includes(customerSearch.toLowerCase())
  )

  const filteredEquipment = mockEquipment.filter(equipment =>
    equipment.name.toLowerCase().includes(equipmentSearch.toLowerCase()) ||
    equipment.model.toLowerCase().includes(equipmentSearch.toLowerCase()) ||
    equipment.type.toLowerCase().includes(equipmentSearch.toLowerCase())
  )

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800"
      case "rented": return "bg-red-100 text-red-800"
      case "maintenance": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getEquipmentStatusLabel = (status: string) => {
    switch (status) {
      case "available": return "متاح"
      case "rented": return "مؤجر"
      case "maintenance": return "صيانة"
      default: return "غير محدد"
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link href="/dashboard/equipment/rental/invoices">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">العودة للفواتير</span>
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">فاتورة إيجار جديدة</h1>
                  <p className="text-green-100 text-sm sm:text-base lg:text-lg">إنشاء فاتورة إيجار معدات جديدة</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm text-sm">
                <Save className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">حفظ كمسودة</span>
                <span className="sm:hidden">مسودة</span>
              </Button>
              <Button className="bg-white text-green-600 hover:bg-green-50 shadow-lg text-sm">
                <Send className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">إرسال الفاتورة</span>
                <span className="sm:hidden">إرسال</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 overflow-x-auto">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center flex-shrink-0">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
              currentStep >= step 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-8 sm:w-16 h-1 mx-1 sm:mx-2 ${
                currentStep > step ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Customer Selection */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6 text-blue-600" />
              اختيار العميل
            </CardTitle>
            <CardDescription>اختر العميل أو أضف عميل جديد</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="customerSearch">البحث عن العميل</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="customerSearch"
                  placeholder="ابحث عن العميل..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {customerSearch && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCustomerSelect(customer)}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{customer.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{customer.contact}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Mail className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Phone className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            )}

            {formData.customerId && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">العميل المحدد</h3>
                    <p className="text-sm text-green-700">{formData.customerName}</p>
                    <p className="text-xs text-green-600">{formData.customerContact} - {formData.customerEmail}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">أو أضف عميل جديد</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">اسم الشركة</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="اسم الشركة"
                  />
                </div>
                <div>
                  <Label htmlFor="customerContact">الشخص المسؤول</Label>
                  <Input
                    id="customerContact"
                    value={formData.customerContact}
                    onChange={(e) => handleInputChange('customerContact', e.target.value)}
                    placeholder="الاسم الكامل"
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">البريد الإلكتروني</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">رقم الهاتف</Label>
                  <Input
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    placeholder="+966 50 123 4567"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="customerAddress">العنوان</Label>
                  <Textarea
                    id="customerAddress"
                    value={formData.customerAddress}
                    onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                    placeholder="العنوان التفصيلي"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Equipment Selection */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-6 w-6 text-orange-600" />
              اختيار المعدة
            </CardTitle>
            <CardDescription>اختر المعدة المراد تأجيرها</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="equipmentSearch">البحث عن المعدة</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="equipmentSearch"
                  placeholder="ابحث عن المعدة..."
                  value={equipmentSearch}
                  onChange={(e) => setEquipmentSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredEquipment.map((equipment) => (
                <Card key={equipment.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleEquipmentSelect(equipment)}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Truck className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h3 className="font-semibold truncate">{equipment.name}</h3>
                          <Badge className={getEquipmentStatusColor(equipment.status)}>
                            {getEquipmentStatusLabel(equipment.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{equipment.model}</p>
                        <p className="text-xs text-gray-500 truncate">SN: {equipment.serialNumber}</p>
                        <p className="text-xs text-gray-500 truncate">النوع: {equipment.type}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-green-600">
                            {formatNumber(equipment.dailyRate)} ريال/يوم
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {formData.equipmentId && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">المعدة المحددة</h3>
                    <p className="text-sm text-green-700">{formData.equipmentName} - {formData.equipmentModel}</p>
                    <p className="text-xs text-green-600">SN: {formData.equipmentSerialNumber}</p>
                    <p className="text-xs text-green-600">السعر: {formatNumber(formData.dailyRate)} ريال/يوم</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Rental Terms */}
      {currentStep === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-purple-600" />
                شروط الإيجار
              </CardTitle>
              <CardDescription>حدد فترة الإيجار والشروط</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rentalTerm">نوع الإيجار</Label>
                <Select onValueChange={(value) => handleInputChange('rentalTerm', value)} value={formData.rentalTerm}>
                  <SelectTrigger id="rentalTerm">
                    <SelectValue placeholder="اختر نوع الإيجار" />
                  </SelectTrigger>
                  <SelectContent>
                    {rentalTerms.map(term => (
                      <SelectItem key={term.id} value={term.id}>
                        <div>
                          <div className="font-medium">{term.name}</div>
                          <div className="text-xs text-gray-500">{term.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">تاريخ البداية</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleDateChange('startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">تاريخ النهاية</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleDateChange('endDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">المدة (أيام)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="discount">الخصم</Label>
                  <div className="flex gap-2">
                    <Input
                      id="discount"
                      type="number"
                      value={formData.discount}
                      onChange={(e) => handleInputChange('discount', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="flex-1"
                    />
                    <Select onValueChange={(value) => handleInputChange('discountType', value)} value={formData.discountType}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">%</SelectItem>
                        <SelectItem value="fixed">ريال</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="vatRate">نسبة الضريبة</Label>
                <div className="flex gap-2">
                  <Input
                    id="vatRate"
                    type="number"
                    value={formData.vatRate}
                    onChange={(e) => handleInputChange('vatRate', parseFloat(e.target.value) || 0)}
                    placeholder="15"
                  />
                  <span className="flex items-center text-sm text-gray-500">%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-600" />
                الحسابات المالية
              </CardTitle>
              <CardDescription>عرض الحسابات المالية للفاتورة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">السعر اليومي:</span>
                  <span className="font-medium">{formatNumber(formData.dailyRate)} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">المدة:</span>
                  <span className="font-medium">{formData.duration} يوم</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">المجموع الفرعي:</span>
                  <span className="font-medium">{formatNumber(formData.subtotal)} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">الخصم:</span>
                  <span className="font-medium text-red-600">-{formatNumber(formData.discountAmount)} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">الضريبة ({formData.vatRate}%):</span>
                  <span className="font-medium">{formatNumber(formData.vatAmount)} ريال</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">المجموع الكلي:</span>
                    <span className="text-lg font-bold text-green-600">{formatNumber(formData.totalAmount)} ريال</span>
                  </div>
                </div>
              </div>

              <Button onClick={calculateTotals} className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                إعادة حساب
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Review and Payment */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                مراجعة الفاتورة
              </CardTitle>
              <CardDescription>راجع تفاصيل الفاتورة قبل الإرسال</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <h3 className="font-semibold mb-3">معلومات العميل</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">الشركة:</span> {formData.customerName}</p>
                    <p><span className="font-medium">المسؤول:</span> {formData.customerContact}</p>
                    <p><span className="font-medium">البريد:</span> {formData.customerEmail}</p>
                    <p><span className="font-medium">الهاتف:</span> {formData.customerPhone}</p>
                    {formData.customerAddress && (
                      <p><span className="font-medium">العنوان:</span> {formData.customerAddress}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">معلومات المعدة</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">المعدة:</span> {formData.equipmentName}</p>
                    <p><span className="font-medium">الموديل:</span> {formData.equipmentModel}</p>
                    <p><span className="font-medium">الرقم التسلسلي:</span> {formData.equipmentSerialNumber}</p>
                    <p><span className="font-medium">النوع:</span> {formData.equipmentType}</p>
                    <p><span className="font-medium">السعر اليومي:</span> {formatNumber(formData.dailyRate)} ريال</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">تفاصيل الإيجار</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <p><span className="font-medium">نوع الإيجار:</span> {rentalTerms.find(t => t.id === formData.rentalTerm)?.name}</p>
                  <p><span className="font-medium">تاريخ البداية:</span> {formData.startDate}</p>
                  <p><span className="font-medium">تاريخ النهاية:</span> {formData.endDate}</p>
                  <p><span className="font-medium">المدة:</span> {formData.duration} يوم</p>
                  <p><span className="font-medium">الخصم:</span> {formData.discount}{formData.discountType === 'percentage' ? '%' : ' ريال'}</p>
                  <p><span className="font-medium">الضريبة:</span> {formData.vatRate}%</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">ملخص مالي</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span>{formatNumber(formData.subtotal)} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الخصم:</span>
                    <span className="text-red-600">-{formatNumber(formData.discountAmount)} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الضريبة:</span>
                    <span>{formatNumber(formData.vatAmount)} ريال</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>المجموع الكلي:</span>
                    <span className="text-green-600">{formatNumber(formData.totalAmount)} ريال</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-blue-600" />
                معلومات الدفع
              </CardTitle>
              <CardDescription>حدد طريقة الدفع وشروط الدفع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="paymentMethod">طريقة الدفع</Label>
                <Select onValueChange={(value) => handleInputChange('paymentMethod', value)} value={formData.paymentMethod}>
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="اختر طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map(method => (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center gap-2">
                          <method.icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-xs text-gray-500">{method.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="paymentTerms">شروط الدفع (أيام)</Label>
                <Input
                  id="paymentTerms"
                  type="number"
                  value={formData.paymentTerms}
                  onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                  placeholder="30"
                />
              </div>

              <div>
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="أي ملاحظات إضافية..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {currentStep > 1 && (
          <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="w-full sm:w-auto">
            السابق
          </Button>
        )}
        {currentStep < 4 && (
          <Button onClick={() => setCurrentStep(currentStep + 1)} className="w-full sm:w-auto">
            التالي
          </Button>
        )}
        {currentStep === 4 && (
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
            <Save className="h-4 w-4 mr-2" />
            حفظ الفاتورة
          </Button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/equipment/rental/invoices">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الفواتير</h3>
                  <p className="text-sm text-gray-600">عرض جميع الفواتير</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/rental">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Truck className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">إيجار المعدات</h3>
                  <p className="text-sm text-gray-600">إدارة الإيجار</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Wrench className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المعدات</h3>
                  <p className="text-sm text-gray-600">إدارة المعدات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/finance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المالية</h3>
                  <p className="text-sm text-gray-600">إدارة المالية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

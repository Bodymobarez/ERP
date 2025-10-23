"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Send,
  FileText,
  Package,
  Building2,
  Calendar,
  Users,
  AlertTriangle,
  Info
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

const suppliers = [
  { id: "1", name: "شركة الحديد المتحد", category: "حديد تسليح", email: "info@steel-united.com" },
  { id: "2", name: "مصنع الأسمنت الوطني", category: "أسمنت", email: "sales@national-cement.com" },
  { id: "3", name: "مؤسسة المعدات الثقيلة", category: "معدات", email: "info@heavy-equipment.com" },
  { id: "4", name: "معرض السيراميك الفاخر", category: "تشطيبات", email: "sales@luxury-ceramics.com" },
  { id: "5", name: "شركة الكابلات الوطنية", category: "كهرباء", email: "info@national-cables.com" },
  { id: "6", name: "محاجر الرياض", category: "مواد أساسية", email: "info@riyadh-quarries.com" },
  { id: "7", name: "مصنع البلوك الحديث", category: "بلوك", email: "sales@modern-block.com" },
  { id: "8", name: "شركة الدهانات العالمية", category: "دهانات", email: "info@global-paints.com" }
]

const projects = [
  { id: "1", name: "البرج السكني - الرياض" },
  { id: "2", name: "الفيلا السكنية - جدة" },
  { id: "3", name: "المجمع التجاري - الدمام" },
  { id: "4", name: "المصنع - الخبر" }
]

const categories = [
  "حديد تسليح",
  "أسمنت",
  "معدات إنشائية",
  "مواد تشطيب",
  "كهرباء",
  "سباكة",
  "مواد أساسية",
  "دهانات",
  "بلوك"
]

const units = [
  "طن",
  "كيس",
  "م³",
  "م²",
  "متر",
  "قطعة",
  "شهر",
  "يوم",
  "لتر",
  "جالون"
]

interface RFQItem {
  id: string
  name: string
  description: string
  quantity: number
  unit: string
  specifications: string
}

interface SelectedSupplier {
  id: string
  name: string
  email: string
}

export default function NewRFQPage() {
  const { t, lang } = useLanguage()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    title: "",
    project: "",
    category: "",
    deadline: "",
    deliveryLocation: "",
    paymentTerms: "",
    evaluationCriteria: "",
    notes: "",
    termsAndConditions: ""
  })

  const [items, setItems] = useState<RFQItem[]>([
    { 
      id: "1", 
      name: "", 
      description: "",
      quantity: 0, 
      unit: "طن",
      specifications: ""
    }
  ])

  const [selectedSuppliers, setSelectedSuppliers] = useState<SelectedSupplier[]>([])

  const addItem = () => {
    const newItem: RFQItem = {
      id: Date.now().toString(),
      name: "",
      description: "",
      quantity: 0,
      unit: "طن",
      specifications: ""
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof RFQItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const toggleSupplier = (supplier: typeof suppliers[0]) => {
    const exists = selectedSuppliers.find(s => s.id === supplier.id)
    if (exists) {
      setSelectedSuppliers(selectedSuppliers.filter(s => s.id !== supplier.id))
    } else {
      setSelectedSuppliers([...selectedSuppliers, {
        id: supplier.id,
        name: supplier.name,
        email: supplier.email
      }])
    }
  }

  const handleSubmit = (action: 'save' | 'send') => {
    console.log('Form Data:', formData)
    console.log('Items:', items)
    console.log('Selected Suppliers:', selectedSuppliers)
    console.log('Action:', action)
    
    router.push('/dashboard/procurement/rfq')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/procurement/rfq">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">طلب عرض سعر جديد (RFQ)</h1>
          <p className="text-gray-600 mt-1">Request for Quotation - إنشاء طلب عرض سعر من الموردين</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الطلب *</Label>
                <Input
                  id="title"
                  placeholder="مثال: طلب عرض سعر - حديد تسليح للمشروع السكني"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project">المشروع *</Label>
                  <select
                    id="project"
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر المشروع</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">الفئة *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر الفئة</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">آخر موعد للعروض *</Label>
                  <Input
                    id="deadline"
                    type="datetime-local"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryLocation">موقع التسليم *</Label>
                  <Input
                    id="deliveryLocation"
                    placeholder="عنوان موقع التسليم"
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({...formData, deliveryLocation: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentTerms">شروط الدفع المقترحة</Label>
                <Input
                  id="paymentTerms"
                  placeholder="مثال: 30 يوم، 50% مقدم - 50% عند التسليم"
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evaluationCriteria">معايير التقييم</Label>
                <Textarea
                  id="evaluationCriteria"
                  placeholder="حدد معايير تقييم العروض (السعر 40%، الجودة 30%، مدة التوصيل 20%، الخبرة 10%)"
                  rows={3}
                  value={formData.evaluationCriteria}
                  onChange={(e) => setFormData({...formData, evaluationCriteria: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  الأصناف والمواصفات المطلوبة
                </CardTitle>
                <Button size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة صنف
                </Button>
              </div>
              <CardDescription>حدد المواد أو الخدمات المطلوبة بدقة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="p-4 border rounded-lg space-y-3 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">صنف {index + 1}</Badge>
                      {items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`item-name-${item.id}`}>اسم الصنف *</Label>
                        <Input
                          id={`item-name-${item.id}`}
                          placeholder="مثال: حديد تسليح قطر 16 مم"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`item-description-${item.id}`}>الوصف</Label>
                        <Input
                          id={`item-description-${item.id}`}
                          placeholder="وصف مختصر للصنف"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`item-quantity-${item.id}`}>الكمية المطلوبة *</Label>
                          <Input
                            id={`item-quantity-${item.id}`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.quantity || ''}
                            onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`item-unit-${item.id}`}>الوحدة *</Label>
                          <select
                            id={`item-unit-${item.id}`}
                            value={item.unit}
                            onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {units.map(unit => (
                              <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`item-specs-${item.id}`}>المواصفات الفنية والمعايير</Label>
                        <Textarea
                          id={`item-specs-${item.id}`}
                          placeholder="حدد المواصفات الفنية المطلوبة (الجودة، الشهادات، المعايير)"
                          rows={3}
                          value={item.specifications}
                          onChange={(e) => updateItem(item.id, 'specifications', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suppliers Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                اختيار الموردين ({selectedSuppliers.length} مختار)
              </CardTitle>
              <CardDescription>اختر الموردين الذين سيتم إرسال طلب العرض إليهم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {suppliers.map((supplier) => {
                  const isSelected = selectedSuppliers.some(s => s.id === supplier.id)
                  return (
                    <div 
                      key={supplier.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => toggleSupplier(supplier)}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={isSelected}
                          onCheckedChange={() => toggleSupplier(supplier)}
                        />
                        <Building2 className="h-5 w-5 text-blue-500" />
                        <div className="flex-1">
                          <p className="font-semibold">{supplier.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {supplier.category}
                            </Badge>
                            <span className="text-xs text-gray-600">{supplier.email}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            مختار
                          </Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {selectedSuppliers.length === 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900">لم يتم اختيار أي مورد</p>
                      <p className="text-sm text-yellow-800">يجب اختيار مورد واحد على الأقل لإرسال طلب العرض</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل إضافية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات للموردين</Label>
                <Textarea
                  id="notes"
                  placeholder="أضف أي ملاحظات أو تعليمات خاصة للموردين..."
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms">الشروط والأحكام</Label>
                <Textarea
                  id="terms"
                  placeholder="حدد الشروط والأحكام العامة للتعاقد..."
                  rows={5}
                  value={formData.termsAndConditions}
                  onChange={(e) => setFormData({...formData, termsAndConditions: e.target.value})}
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
                ملخص الطلب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">المشروع</p>
                  <p className="font-semibold text-sm">
                    {formData.project ? projects.find(p => p.id === formData.project)?.name : 'لم يتم التحديد'}
                  </p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">الفئة</p>
                  <p className="font-semibold text-sm">
                    {formData.category || 'لم يتم التحديد'}
                  </p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">عدد الأصناف</p>
                  <p className="font-semibold text-lg">{items.length}</p>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">الموردين المختارين</p>
                  <p className="font-semibold text-lg">{selectedSuppliers.length}</p>
                </div>

                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">آخر موعد</p>
                  <p className="font-semibold text-sm">
                    {formData.deadline || 'لم يتم التحديد'}
                  </p>
                </div>
              </div>

              <div className="pt-4 space-y-2 border-t">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleSubmit('send')}
                  disabled={
                    !formData.title ||
                    !formData.project ||
                    !formData.category ||
                    !formData.deadline ||
                    items.some(item => !item.name || item.quantity === 0) ||
                    selectedSuppliers.length === 0
                  }
                >
                  <Send className="h-4 w-4 mr-2" />
                  إرسال للموردين
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSubmit('save')}
                >
                  <Save className="h-4 w-4 mr-2" />
                  حفظ كمسودة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Selected Suppliers Summary */}
          {selectedSuppliers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  الموردين المختارين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedSuppliers.map((supplier) => (
                    <div key={supplier.id} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{supplier.name}</p>
                        <p className="text-xs text-gray-600">{supplier.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2 text-sm text-blue-900">
                  <p>
                    <strong>نصائح مهمة:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>حدد المواصفات الفنية بدقة</li>
                    <li>اختر موعد مناسب لتلقي العروض</li>
                    <li>اختر 3 موردين على الأقل للمقارنة</li>
                    <li>وضح معايير التقييم بشفافية</li>
                    <li>تأكد من شمول جميع الشروط</li>
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


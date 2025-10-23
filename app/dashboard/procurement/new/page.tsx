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
  Plus,
  Trash2,
  Save,
  Send,
  Calculator,
  Package,
  Building2,
  Calendar,
  DollarSign,
  Truck,
  FileText
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

const suppliers = [
  { id: "1", name: "شركة الحديد المتحد", type: "حديد تسليح" },
  { id: "2", name: "مصنع الأسمنت الوطني", type: "أسمنت" },
  { id: "3", name: "مؤسسة المعدات الثقيلة", type: "معدات" },
  { id: "4", name: "معرض السيراميك الفاخر", type: "تشطيبات" },
  { id: "5", name: "شركة الكابلات الوطنية", type: "كهرباء" },
  { id: "6", name: "محاجر الرياض", type: "مواد أساسية" },
  { id: "7", name: "مصنع البلوك الحديث", type: "بلوك" },
  { id: "8", name: "شركة الدهانات العالمية", type: "دهانات" }
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

interface PurchaseItem {
  id: string
  name: string
  quantity: number
  unit: string
  unitPrice: number
  total: number
}

export default function NewPurchaseOrderPage() {
  const { t, lang } = useLanguage()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    supplier: "",
    project: "",
    category: "",
    priority: "medium",
    deliveryDate: "",
    deliveryLocation: "",
    paymentTerms: "",
    notes: ""
  })

  const [items, setItems] = useState<PurchaseItem[]>([
    { id: "1", name: "", quantity: 0, unit: "طن", unitPrice: 0, total: 0 }
  ])

  const [subtotal, setSubtotal] = useState(0)
  const [taxRate] = useState(0.15) // 15% VAT
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  const calculateTotals = (updatedItems: PurchaseItem[]) => {
    const newSubtotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
    const newTax = newSubtotal * taxRate
    const newTotal = newSubtotal + newTax
    
    setSubtotal(newSubtotal)
    setTax(newTax)
    setTotal(newTotal)
  }

  const addItem = () => {
    const newItem: PurchaseItem = {
      id: Date.now().toString(),
      name: "",
      quantity: 0,
      unit: "طن",
      unitPrice: 0,
      total: 0
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      const updatedItems = items.filter(item => item.id !== id)
      setItems(updatedItems)
      calculateTotals(updatedItems)
    }
  }

  const updateItem = (id: string, field: keyof PurchaseItem, value: any) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice
        }
        return updatedItem
      }
      return item
    })
    setItems(updatedItems)
    calculateTotals(updatedItems)
  }

  const handleSubmit = (action: 'save' | 'submit') => {
    // Here you would typically send the data to your API
    console.log('Form Data:', formData)
    console.log('Items:', items)
    console.log('Action:', action)
    
    // Redirect back to procurement page
    router.push('/dashboard/procurement')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/procurement">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">طلب شراء جديد</h1>
          <p className="text-gray-600 mt-1">إنشاء طلب شراء مواد بناء أو معدات إنشائية</p>
        </div>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Details */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">المورد *</Label>
                  <select
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر المورد</option>
                    {suppliers.map(supplier => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name} - {supplier.type}
                      </option>
                    ))}
                  </select>
                </div>

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
                  <Label htmlFor="priority">الأولوية *</Label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">منخفضة</option>
                    <option value="medium">متوسطة</option>
                    <option value="high">عاجلة</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">تاريخ التسليم المطلوب *</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">شروط الدفع</Label>
                  <Input
                    id="paymentTerms"
                    placeholder="مثال: 30 يوم، نقدي، 50% مقدم"
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                  />
                </div>
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
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  الأصناف المطلوبة
                </CardTitle>
                <Button size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة صنف
                </Button>
              </div>
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

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor={`item-name-${item.id}`}>اسم الصنف *</Label>
                        <Input
                          id={`item-name-${item.id}`}
                          placeholder="مثال: حديد تسليح 16 مم"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`item-quantity-${item.id}`}>الكمية *</Label>
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

                      <div className="space-y-2">
                        <Label htmlFor={`item-price-${item.id}`}>سعر الوحدة *</Label>
                        <Input
                          id={`item-price-${item.id}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice || ''}
                          onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-gray-600">الإجمالي:</span>
                      <span className="text-lg font-bold text-purple-600">
                        {formatCurrency(item.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>ملاحظات إضافية</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="أضف أي ملاحظات أو تعليمات خاصة للطلب..."
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Totals Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                ملخص الطلب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">عدد الأصناف:</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المجموع الفرعي:</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ضريبة القيمة المضافة (15%):</span>
                  <span className="font-semibold">{formatCurrency(tax)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">الإجمالي النهائي:</span>
                    <span className="text-2xl font-bold text-purple-600">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleSubmit('submit')}
                  disabled={items.some(item => !item.name || item.quantity === 0 || item.unitPrice === 0)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  إرسال للاعتماد
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

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">معلومات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-semibold">المورد</p>
                  <p className="text-gray-600">
                    {formData.supplier ? suppliers.find(s => s.id === formData.supplier)?.name : 'لم يتم التحديد'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Package className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="font-semibold">المشروع</p>
                  <p className="text-gray-600">
                    {formData.project ? projects.find(p => p.id === formData.project)?.name : 'لم يتم التحديد'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-purple-500 mt-0.5" />
                <div>
                  <p className="font-semibold">تاريخ التسليم</p>
                  <p className="text-gray-600">
                    {formData.deliveryDate || 'لم يتم التحديد'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="h-4 w-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-semibold">موقع التسليم</p>
                  <p className="text-gray-600">
                    {formData.deliveryLocation || 'لم يتم التحديد'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <p className="text-sm text-blue-900">
                💡 <strong>نصيحة:</strong> تأكد من إضافة جميع الأصناف المطلوبة وتحديد الكميات والأسعار بدقة قبل إرسال الطلب للاعتماد.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight,
  Package,
  Upload,
  Save,
  RotateCcw,
  ShoppingCart,
  DollarSign,
  Layers,
  FileText,
  AlertCircle,
  Check,
  Plus
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Categories for construction materials
const categories = [
  { id: "basic", name: "مواد أساسية", icon: "🏗️" },
  { id: "steel", name: "حديد تسليح", icon: "⚒️" },
  { id: "masonry", name: "مواد بناء", icon: "🧱" },
  { id: "finishing", name: "مواد تشطيب", icon: "🎨" },
  { id: "electrical", name: "مواد كهربائية", icon: "⚡" },
  { id: "plumbing", name: "مواد سباكة", icon: "💧" },
  { id: "tools", name: "أدوات ومعدات", icon: "🔧" },
  { id: "safety", name: "مواد السلامة", icon: "🦺" },
]

// Common units for construction materials
const units = [
  { id: "piece", name: "قطعة" },
  { id: "kg", name: "كيلوجرام" },
  { id: "gram", name: "جرام" },
  { id: "ton", name: "طن" },
  { id: "meter", name: "متر" },
  { id: "cm", name: "سنتيمتر" },
  { id: "sqm", name: "متر مربع" },
  { id: "cbm", name: "متر مكعب" },
  { id: "liter", name: "لتر" },
  { id: "gallon", name: "جالون" },
  { id: "bag", name: "كيس" },
  { id: "box", name: "صندوق" },
  { id: "bundle", name: "حزمة" },
  { id: "roll", name: "لفة" },
  { id: "sheet", name: "لوح" },
]

interface FormData {
  sku: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  unitPrice: string;
  costPrice: string;
  minStock: string;
  maxStock: string;
  currentStock: string;
  image: string;
}

export default function NewInventoryItemPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    sku: '',
    name: '',
    description: '',
    category: '',
    unit: '',
    unitPrice: '',
    costPrice: '',
    minStock: '0',
    maxStock: '',
    currentStock: '0',
    image: '',
  })

  // Generate SKU based on category and name
  const generateSKU = () => {
    if (formData.category && formData.name) {
      const categoryCode = categories.find(c => c.id === formData.category)?.name.substring(0, 3) || 'ITM'
      const nameCode = formData.name.substring(0, 3).toUpperCase()
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
      const sku = `${categoryCode}-${nameCode}-${randomNum}`.replace(/\s/g, '')
      setFormData(prev => ({ ...prev, sku }))
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData(prev => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.sku.trim()) newErrors.sku = "رمز الصنف مطلوب"
    if (!formData.name.trim()) newErrors.name = "اسم الصنف مطلوب"
    if (!formData.category) newErrors.category = "الفئة مطلوبة"
    if (!formData.unit) newErrors.unit = "الوحدة مطلوبة"
    if (!formData.unitPrice || parseFloat(formData.unitPrice) <= 0) newErrors.unitPrice = "سعر البيع يجب أن يكون أكبر من صفر"
    if (!formData.costPrice || parseFloat(formData.costPrice) <= 0) newErrors.costPrice = "سعر التكلفة يجب أن يكون أكبر من صفر"
    if (formData.unitPrice && formData.costPrice && parseFloat(formData.unitPrice) <= parseFloat(formData.costPrice)) {
      newErrors.unitPrice = "سعر البيع يجب أن يكون أعلى من سعر التكلفة"
    }
    if (parseFloat(formData.minStock) < 0) newErrors.minStock = "الحد الأدنى لا يمكن أن يكون سالباً"
    if (formData.maxStock && parseFloat(formData.maxStock) < parseFloat(formData.minStock)) {
      newErrors.maxStock = "الحد الأقصى يجب أن يكون أكبر من الحد الأدنى"
    }
    if (parseFloat(formData.currentStock) < 0) newErrors.currentStock = "الكمية الحالية لا يمكن أن تكون سالبة"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/inventory/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sku: formData.sku,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          unit: formData.unit,
          unitPrice: parseFloat(formData.unitPrice),
          costPrice: parseFloat(formData.costPrice),
          minStock: parseFloat(formData.minStock),
          maxStock: formData.maxStock ? parseFloat(formData.maxStock) : null,
          currentStock: parseFloat(formData.currentStock),
          image: formData.image,
        }),
      })

      if (response.ok) {
        // Show success message briefly before redirect
        const successMessage = document.createElement('div')
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2'
        successMessage.innerHTML = `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          تم حفظ الصنف بنجاح!
        `
        document.body.appendChild(successMessage)
        
        setTimeout(() => {
          router.push('/dashboard/inventory?success=item-created')
        }, 1500)
      } else {
        const error = await response.json()
        setErrors({ submit: error.error || 'حدث خطأ أثناء حفظ البيانات' })
      }
    } catch (error) {
      setErrors({ submit: 'حدث خطأ أثناء الاتصال بالخادم' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      sku: '',
      name: '',
      description: '',
      category: '',
      unit: '',
      unitPrice: '',
      costPrice: '',
      minStock: '0',
      maxStock: '',
      currentStock: '0',
      image: '',
    })
    setImagePreview(null)
    setErrors({})
  }

  const selectedCategory = categories.find(cat => cat.id === formData.category)
  const selectedUnit = units.find(unit => unit.id === formData.unit)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/inventory">
            <Button variant="outline" size="sm">
              <ArrowRight className="h-4 w-4 mr-2" />
              العودة للمخزون
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إضافة صنف جديد</h1>
            <p className="text-gray-600 mt-1">إضافة صنف جديد إلى مخزون مواد البناء</p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Progress Indicator */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${formData.name && formData.category ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className={formData.name && formData.category ? 'text-green-700' : 'text-gray-500'}>المعلومات الأساسية</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${formData.unitPrice && formData.costPrice ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className={formData.unitPrice && formData.costPrice ? 'text-green-700' : 'text-gray-500'}>التسعير</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${formData.minStock !== '' ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className={formData.minStock !== '' ? 'text-green-700' : 'text-gray-500'}>إدارة المخزون</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  المعلومات الأساسية
                </CardTitle>
                <CardDescription>المعلومات الأساسية للصنف الجديد</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* SKU and Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">رمز الصنف (SKU) *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => handleInputChange('sku', e.target.value)}
                        placeholder="مثال: ASM-CEM-001"
                        className={errors.sku ? 'border-red-500' : ''}
                      />
                      <Button type="button" variant="outline" onClick={generateSKU}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                    {errors.sku && <p className="text-sm text-red-500">{errors.sku}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">اسم الصنف *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="مثال: أسمنت بورتلاندي"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="وصف تفصيلي للصنف ومواصفاته..."
                    rows={3}
                  />
                </div>

                {/* Category and Unit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الفئة *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="اختر الفئة">
                          {selectedCategory && (
                            <div className="flex items-center gap-2">
                              <span>{selectedCategory.icon}</span>
                              <span>{selectedCategory.name}</span>
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center gap-2">
                              <span>{category.icon}</span>
                              <span>{category.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>وحدة القياس *</Label>
                    <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                      <SelectTrigger className={errors.unit ? 'border-red-500' : ''}>
                        <SelectValue placeholder="اختر الوحدة">
                          {selectedUnit && selectedUnit.name}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.unit && <p className="text-sm text-red-500">{errors.unit}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  التسعير
                </CardTitle>
                <CardDescription>أسعار الصنف وتكلفته</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">سعر التكلفة *</Label>
                    <Input
                      id="costPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.costPrice}
                      onChange={(e) => handleInputChange('costPrice', e.target.value)}
                      placeholder="0.00"
                      className={errors.costPrice ? 'border-red-500' : ''}
                    />
                    {errors.costPrice && <p className="text-sm text-red-500">{errors.costPrice}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unitPrice">سعر البيع *</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.unitPrice}
                      onChange={(e) => handleInputChange('unitPrice', e.target.value)}
                      placeholder="0.00"
                      className={errors.unitPrice ? 'border-red-500' : ''}
                    />
                    {errors.unitPrice && <p className="text-sm text-red-500">{errors.unitPrice}</p>}
                  </div>
                </div>

                {/* Profit Margin Calculation */}
                {formData.costPrice && formData.unitPrice && parseFloat(formData.costPrice) > 0 && parseFloat(formData.unitPrice) > 0 && parseFloat(formData.unitPrice) > parseFloat(formData.costPrice) && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">حساب هامش الربح</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-blue-700">الربح:</span>
                        <p className="font-bold">{(parseFloat(formData.unitPrice) - parseFloat(formData.costPrice)).toFixed(2)} ريال</p>
                      </div>
                      <div>
                        <span className="text-blue-700">هامش الربح:</span>
                        <p className="font-bold">{(((parseFloat(formData.unitPrice) - parseFloat(formData.costPrice)) / parseFloat(formData.costPrice)) * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <span className="text-blue-700">معدل الربح:</span>
                        <p className="font-bold">{(((parseFloat(formData.unitPrice) - parseFloat(formData.costPrice)) / parseFloat(formData.unitPrice)) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                    {/* Profit Margin Alert */}
                    {(() => {
                      const profitMargin = ((parseFloat(formData.unitPrice) - parseFloat(formData.costPrice)) / parseFloat(formData.costPrice)) * 100
                      if (profitMargin < 10) {
                        return (
                          <div className="bg-red-100 border border-red-200 rounded p-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <span className="text-red-700 text-xs">هامش ربح منخفض (أقل من 10%)</span>
                          </div>
                        )
                      } else if (profitMargin < 20) {
                        return (
                          <div className="bg-yellow-100 border border-yellow-200 rounded p-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <span className="text-yellow-700 text-xs">هامش ربح معتدل (10-20%)</span>
                          </div>
                        )
                      } else {
                        return (
                          <div className="bg-green-100 border border-green-200 rounded p-2 flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-green-700 text-xs">هامش ربح جيد (أكثر من 20%)</span>
                          </div>
                        )
                      }
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stock Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  إدارة المخزون
                </CardTitle>
                <CardDescription>مستويات المخزون والكميات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentStock">الكمية الحالية</Label>
                    <Input
                      id="currentStock"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.currentStock}
                      onChange={(e) => handleInputChange('currentStock', e.target.value)}
                      placeholder="0"
                      className={errors.currentStock ? 'border-red-500' : ''}
                    />
                    {errors.currentStock && <p className="text-sm text-red-500">{errors.currentStock}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minStock">الحد الأدنى *</Label>
                    <Input
                      id="minStock"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.minStock}
                      onChange={(e) => handleInputChange('minStock', e.target.value)}
                      placeholder="0"
                      className={errors.minStock ? 'border-red-500' : ''}
                    />
                    {errors.minStock && <p className="text-sm text-red-500">{errors.minStock}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxStock">الحد الأقصى</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.maxStock}
                      onChange={(e) => handleInputChange('maxStock', e.target.value)}
                      placeholder="اختياري"
                      className={errors.maxStock ? 'border-red-500' : ''}
                    />
                    {errors.maxStock && <p className="text-sm text-red-500">{errors.maxStock}</p>}
                  </div>
                </div>

                {/* Stock Status Indicator */}
                {formData.currentStock && formData.minStock && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">حالة المخزون</h4>
                    <div className="flex items-center gap-2">
                      {parseFloat(formData.currentStock) >= parseFloat(formData.minStock) ? (
                        <>
                          <Check className="h-4 w-4 text-green-600" />
                          <Badge className="bg-green-100 text-green-800">متوفر</Badge>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <Badge className="bg-red-100 text-red-800">أقل من الحد الأدنى</Badge>
                        </>
                      )}
                    </div>
                    {/* Stock Level Progress Bar */}
                    {formData.maxStock && parseFloat(formData.maxStock) > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>0</span>
                          <span>{formData.maxStock}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              parseFloat(formData.currentStock) >= parseFloat(formData.minStock) ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ 
                              width: `${Math.min((parseFloat(formData.currentStock) / parseFloat(formData.maxStock)) * 100, 100)}%` 
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-600 mt-1 text-center">
                          {((parseFloat(formData.currentStock) / parseFloat(formData.maxStock)) * 100).toFixed(1)}% من السعة القصوى
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  صورة الصنف
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors"
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.currentTarget.classList.add('border-blue-400', 'bg-blue-50')
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault()
                    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50')
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50')
                    const files = e.dataTransfer?.files
                    if (files && files.length > 0 && files[0]?.type.startsWith('image/')) {
                      const file = files[0]
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        const result = event.target?.result as string
                        setImagePreview(result)
                        setFormData(prev => ({ ...prev, image: result }))
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                >
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setImagePreview(null)
                          setFormData(prev => ({ ...prev, image: '' }))
                        }}
                      >
                        إزالة الصورة
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-sm text-gray-600">اسحب الصورة هنا أو</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                        >
                          اختر ملف
                        </label>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF حتى 10MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  ملخص الصنف
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>الفئة:</span>
                    <span>{selectedCategory?.name || '---'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الوحدة:</span>
                    <span>{selectedUnit?.name || '---'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>سعر البيع:</span>
                    <span>{formData.unitPrice ? `${formData.unitPrice} ريال` : '---'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الكمية الحالية:</span>
                    <span>{formData.currentStock || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الحد الأدنى:</span>
                    <span>{formData.minStock || '0'}</span>
                  </div>
                </div>

                {formData.unitPrice && formData.currentStock && (
                  <div className="pt-3 border-t">
                    <div className="flex justify-between font-semibold">
                      <span>القيمة الإجمالية:</span>
                      <span className="text-green-600">
                        {(parseFloat(formData.unitPrice) * parseFloat(formData.currentStock)).toFixed(2)} ريال
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  إنشاء طلب شراء
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة مورد
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => window.open('/dashboard/inventory', '_blank')}>
                  <Package className="h-4 w-4 mr-2" />
                  عرض المخزون
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Form Actions */}
        <Card>
          <CardContent className="p-6">
            {errors.submit && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-700">{errors.submit}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                إعادة تعيين
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="min-w-[120px]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جارٍ الحفظ...
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    حفظ الصنف
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
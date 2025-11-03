'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Save, 
  Upload,
  Settings,
  DollarSign,
  Calendar,
  AlertCircle,
  Wrench,
  Package,
  Camera
} from 'lucide-react'

export default function NewEquipmentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Equipment form data
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'heavy-machinery', // heavy-machinery, tools, vehicles, electronics, safety, other
    manufacturer: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    purchaseCost: 0,
    currentValue: 0,
    status: 'available' as 'available' | 'in-use' | 'maintenance' | 'retired',
    location: '',
    condition: 'good' as 'excellent' | 'good' | 'fair' | 'poor',
    warrantyExpiry: '',
    notes: '',
    image: null as File | null
  })

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) {
      newErrors.name = 'اسم المعدة مطلوب'
    }

    if (!formData.code.trim()) {
      newErrors.code = 'رمز المعدة مطلوب'
    }

    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = 'الشركة المصنعة مطلوبة'
    }

    if (!formData.model.trim()) {
      newErrors.model = 'الطراز مطلوب'
    }

    if (!formData.purchaseDate) {
      newErrors.purchaseDate = 'تاريخ الشراء مطلوب'
    }

    if (formData.purchaseCost <= 0) {
      newErrors.purchaseCost = 'تكلفة الشراء يجب أن تكون أكبر من صفر'
    }

    if (formData.currentValue < 0) {
      newErrors.currentValue = 'القيمة الحالية لا يمكن أن تكون سالبة'
    }

    if (formData.warrantyExpiry && formData.purchaseDate && 
        new Date(formData.warrantyExpiry) < new Date(formData.purchaseDate)) {
      newErrors.warrantyExpiry = 'تاريخ انتهاء الضمان يجب أن يكون بعد تاريخ الشراء'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({...errors, image: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت'})
        return
      }

      if (!file.type.startsWith('image/')) {
        setErrors({...errors, image: 'يجب أن يكون الملف صورة'})
        return
      }

      setFormData({...formData, image: file})
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Clear image error if exists
      const newErrors = {...errors}
      delete newErrors.image
      setErrors(newErrors)
    }
  }

  const generateCode = () => {
    const category = formData.category.toUpperCase().substring(0, 2)
    const timestamp = Date.now().toString().slice(-4)
    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0')
    const generatedCode = `${category}-${timestamp}${randomNum}`
    setFormData({...formData, code: generatedCode})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const equipmentData = new FormData()
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          equipmentData.append('image', value)
        } else if (value !== null && value !== '') {
          equipmentData.append(key, value.toString())
        }
      })

      const response = await fetch('/api/equipment', {
        method: 'POST',
        body: equipmentData,
      })

      if (response.ok) {
        const newEquipment = await response.json()
        router.push(`/dashboard/equipment?created=${newEquipment.id}`)
      } else {
        const errorData = await response.json()
        setErrors({ submit: errorData.error || 'فشل في إضافة المعدة' })
      }
    } catch (error) {
      console.error('Error creating equipment:', error)
      setErrors({ submit: 'حدث خطأ غير متوقع' })
    } finally {
      setLoading(false)
    }
  }

  const getCategoryLabel = (category: string) => {
    const categories = {
      'heavy-machinery': 'آلات ثقيلة',
      'tools': 'أدوات',
      'vehicles': 'مركبات',
      'electronics': 'إلكترونيات',
      'safety': 'سلامة',
      'other': 'أخرى'
    }
    return categories[category as keyof typeof categories] || category
  }

  const getStatusLabel = (status: string) => {
    const statuses = {
      'available': 'متاح',
      'in-use': 'قيد الاستخدام',
      'maintenance': 'تحت الصيانة',
      'retired': 'خارج الخدمة'
    }
    return statuses[status as keyof typeof statuses] || status
  }

  const getConditionLabel = (condition: string) => {
    const conditions = {
      'excellent': 'ممتاز',
      'good': 'جيد',
      'fair': 'مقبول',
      'poor': 'ضعيف'
    }
    return conditions[condition as keyof typeof conditions] || condition
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            رجوع
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">معدة جديدة</h1>
            <p className="text-gray-600">إضافة معدة جديدة إلى المخزون</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          <Package className="h-4 w-4 mr-2" />
          جديد
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              المعلومات الأساسية
            </CardTitle>
            <CardDescription>
              أدخل البيانات الأساسية للمعدة
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">اسم المعدة *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="أدخل اسم المعدة"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="code">رمز المعدة *</Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="أدخل رمز المعدة"
                    className={errors.code ? 'border-red-500' : ''}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateCode}
                    className="px-3"
                  >
                    توليد
                  </Button>
                </div>
                {errors.code && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.code}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="category">الفئة</Label>
                <select
                  id="category"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="heavy-machinery">آلات ثقيلة</option>
                  <option value="tools">أدوات</option>
                  <option value="vehicles">مركبات</option>
                  <option value="electronics">إلكترونيات</option>
                  <option value="safety">سلامة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div>
                <Label htmlFor="status">الحالة</Label>
                <select
                  id="status"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="available">متاح</option>
                  <option value="in-use">قيد الاستخدام</option>
                  <option value="maintenance">تحت الصيانة</option>
                  <option value="retired">خارج الخدمة</option>
                </select>
              </div>

              <div>
                <Label htmlFor="manufacturer">الشركة المصنعة *</Label>
                <Input
                  id="manufacturer"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                  placeholder="أدخل اسم الشركة المصنعة"
                  className={errors.manufacturer ? 'border-red-500' : ''}
                />
                {errors.manufacturer && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.manufacturer}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="model">الطراز *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  placeholder="أدخل طراز المعدة"
                  className={errors.model ? 'border-red-500' : ''}
                />
                {errors.model && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.model}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="serialNumber">الرقم التسلسلي</Label>
                <Input
                  id="serialNumber"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                  placeholder="أدخل الرقم التسلسلي (اختياري)"
                />
              </div>

              <div>
                <Label htmlFor="location">الموقع</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="أدخل موقع المعدة"
                />
              </div>

              <div>
                <Label htmlFor="condition">حالة المعدة</Label>
                <select
                  id="condition"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value as any})}
                >
                  <option value="excellent">ممتاز</option>
                  <option value="good">جيد</option>
                  <option value="fair">مقبول</option>
                  <option value="poor">ضعيف</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="أي ملاحظات إضافية حول المعدة..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              المعلومات المالية
            </CardTitle>
            <CardDescription>
              تفاصيل التكلفة والقيمة الحالية
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="purchaseDate">تاريخ الشراء *</Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                    className={`pr-10 ${errors.purchaseDate ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.purchaseDate && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.purchaseDate}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="warrantyExpiry">تاريخ انتهاء الضمان</Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="warrantyExpiry"
                    type="date"
                    value={formData.warrantyExpiry}
                    onChange={(e) => setFormData({...formData, warrantyExpiry: e.target.value})}
                    className={`pr-10 ${errors.warrantyExpiry ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.warrantyExpiry && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.warrantyExpiry}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="purchaseCost">تكلفة الشراء (ريال سعودي) *</Label>
                <div className="relative">
                  <DollarSign className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="purchaseCost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.purchaseCost || ''}
                    onChange={(e) => setFormData({...formData, purchaseCost: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                    className={`pr-10 ${errors.purchaseCost ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.purchaseCost && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.purchaseCost}
                  </p>
                )}
                {formData.purchaseCost > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {formatCurrency(formData.purchaseCost)}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="currentValue">القيمة الحالية (ريال سعودي)</Label>
                <div className="relative">
                  <DollarSign className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="currentValue"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.currentValue || ''}
                    onChange={(e) => setFormData({...formData, currentValue: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                    className={`pr-10 ${errors.currentValue ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.currentValue && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.currentValue}
                  </p>
                )}
                {formData.currentValue > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {formatCurrency(formData.currentValue)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              صورة المعدة
            </CardTitle>
            <CardDescription>
              ارفع صورة للمعدة (اختياري - حد أقصى 5 ميجابايت)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="معاينة الصورة"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">اضغط للرفع</span> أو اسحب وأفلت
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG أو GIF (حد أقصى 5MB)</p>
                    </div>
                  )}
                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              
              {errors.image && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.image}
                </p>
              )}
              
              {formData.image && (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-800">
                    <Camera className="h-4 w-4" />
                    <span className="font-medium">{formData.image.name}</span>
                    <span className="text-sm">({(formData.image.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFormData({...formData, image: null})
                      setImagePreview(null)
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    حذف
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <Card>
          <CardContent className="p-6">
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {errors.submit}
                </p>
              </div>
            )}

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {loading ? 'جاري الحفظ...' : 'حفظ المعدة'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
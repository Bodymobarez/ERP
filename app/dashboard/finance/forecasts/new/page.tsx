"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ArrowLeft,
  Save,
  Plus,
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  AlertTriangle,
  Info,
  CheckCircle2
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewForecastPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    category: "",
    period: "",
    amount: "",
    confidence: "",
    description: "",
    department: "finance",
    projectId: "",
    baselineData: {
      confirmedContracts: "",
      pendingContracts: "",
      recurringRevenue: "",
      materialCosts: "",
      laborCosts: "",
      equipmentCosts: ""
    },
    factors: [
      { name: "", impact: "medium", value: "" }
    ]
  })

  const [errors, setErrors] = useState<any>({})

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const handleBaselineDataChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      baselineData: {
        ...prev.baselineData,
        [field]: value
      }
    }))
  }

  const handleFactorChange = (index: number, field: string, value: any) => {
    const newFactors = [...(formData as any).factors]
    newFactors[index] = {
      ...newFactors[index],
      [field]: value
    }
    setFormData((prev: any) => ({
      ...prev,
      factors: newFactors
    }))
  }

  const addFactor = () => {
    setFormData((prev: any) => ({
      ...prev,
      factors: [
        ...(prev as any).factors,
        { name: "", impact: "medium", value: "" }
      ]
    }))
  }

  const removeFactor = (index: number) => {
    if ((formData as any).factors.length > 1) {
      const newFactors = (formData as any).factors.filter((_: any, i: number) => i !== index)
      setFormData((prev: any) => ({
        ...prev,
        factors: newFactors
      }))
    }
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!(formData as any).title?.trim()) {
      newErrors.title = "عنوان التوقع مطلوب"
    }

    if (!(formData as any).type) {
      newErrors.type = "نوع التوقع مطلوب"
    }

    if (!(formData as any).category) {
      newErrors.category = "تصنيف التوقع مطلوب"
    }

    if (!(formData as any).period?.trim()) {
      newErrors.period = "فترة التوقع مطلوبة"
    }

    if (!(formData as any).amount || isNaN(Number((formData as any).amount)) || Number((formData as any).amount) <= 0) {
      newErrors.amount = "المبلغ يجب أن يكون رقم موجب"
    }

    if (!(formData as any).confidence || isNaN(Number((formData as any).confidence)) || 
        Number((formData as any).confidence) < 0 || Number((formData as any).confidence) > 100) {
      newErrors.confidence = "مستوى الثقة يجب أن يكون بين 0 و 100"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Convert string values to numbers where needed
      const payload = {
        ...formData,
        amount: Number((formData as any).amount),
        confidence: Number((formData as any).confidence),
        baselineData: Object.keys((formData as any).baselineData || {}).reduce((acc: any, key: string) => {
          const value = (formData as any).baselineData[key]
          acc[key] = value ? Number(value) : 0
          return acc
        }, {}),
        factors: ((formData as any).factors || [])
          .filter((factor: any) => factor.name?.trim() && factor.value)
          .map((factor: any) => ({
            ...factor,
            value: Number(factor.value)
          }))
      }

      const response = await fetch('/api/forecasts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (result.success) {
        router.push('/dashboard/finance/forecasts')
      } else {
        alert(result.error || 'حدث خطأ في إنشاء التوقع')
      }
    } catch (error) {
      console.error('Error creating forecast:', error)
      alert('حدث خطأ في إنشاء التوقع')
    } finally {
      setIsLoading(false)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'revenue': return <TrendingUp className="h-5 w-5 text-green-600" />
      case 'expense': return <TrendingUp className="h-5 w-5 text-red-600 rotate-180" />
      case 'cashflow': return <DollarSign className="h-5 w-5 text-blue-600" />
      case 'profit': return <Target className="h-5 w-5 text-purple-600" />
      default: return <TrendingUp className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/finance/forecasts">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة للتوقعات
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إضافة توقع جديد</h1>
            <p className="text-gray-600 mt-1">إنشاء توقع مالي جديد للمشاريع أو العمليات</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              المعلومات الأساسية
            </CardTitle>
            <CardDescription>
              أدخل المعلومات الأساسية للتوقع المالي
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان التوقع *</Label>
                <Input
                  id="title"
                  value={(formData as any).title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="مثال: توقع إيرادات الربع الثاني 2024"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">نوع التوقع *</Label>
                <Select onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                    <SelectValue placeholder="اختر نوع التوقع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        إيرادات
                      </div>
                    </SelectItem>
                    <SelectItem value="expense">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                        مصروفات
                      </div>
                    </SelectItem>
                    <SelectItem value="cashflow">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        تدفق نقدي
                      </div>
                    </SelectItem>
                    <SelectItem value="profit">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        أرباح
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">التصنيف *</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">شهري</SelectItem>
                    <SelectItem value="quarterly">ربع سنوي</SelectItem>
                    <SelectItem value="biannual">نصف سنوي</SelectItem>
                    <SelectItem value="annual">سنوي</SelectItem>
                    <SelectItem value="project">مشروع</SelectItem>
                    <SelectItem value="equipment">معدات</SelectItem>
                    <SelectItem value="operation">تشغيلي</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">الفترة الزمنية *</Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => handleInputChange('period', e.target.value)}
                  placeholder="مثال: Q2 2024 أو 6 أشهر"
                  className={errors.period ? "border-red-500" : ""}
                />
                {errors.period && <p className="text-red-500 text-sm">{errors.period}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">المبلغ المتوقع (ريال) *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="0"
                  className={errors.amount ? "border-red-500" : ""}
                />
                {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                {formData.amount && Number(formData.amount) > 0 && (
                  <p className="text-sm text-gray-600">
                    المبلغ: {formatCurrency(Number(formData.amount))}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confidence">مستوى الثقة (%) *</Label>
                <Input
                  id="confidence"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.confidence}
                  onChange={(e) => handleInputChange('confidence', e.target.value)}
                  placeholder="85"
                  className={errors.confidence ? "border-red-500" : ""}
                />
                {errors.confidence && <p className="text-red-500 text-sm">{errors.confidence}</p>}
                {formData.confidence && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          Number(formData.confidence) >= 90 ? 'bg-green-600' :
                          Number(formData.confidence) >= 75 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${Math.min(Number(formData.confidence), 100)}%` }}
                      ></div>
                    </div>
                    <span className={
                      Number(formData.confidence) >= 90 ? 'text-green-600' :
                      Number(formData.confidence) >= 75 ? 'text-yellow-600' : 'text-red-600'
                    }>
                      {Number(formData.confidence) >= 90 ? 'عالي' :
                       Number(formData.confidence) >= 75 ? 'متوسط' : 'منخفض'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="وصف مفصل للتوقع والافتراضات المستخدمة..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Baseline Data */}
        {formData.type && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                البيانات الأساسية
              </CardTitle>
              <CardDescription>
                أدخل البيانات الأساسية المستخدمة في حساب التوقع
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formData.type === 'revenue' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="confirmedContracts">العقود المؤكدة</Label>
                      <Input
                        id="confirmedContracts"
                        type="number"
                        value={formData.baselineData.confirmedContracts}
                        onChange={(e) => handleBaselineDataChange('confirmedContracts', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pendingContracts">العقود المحتملة</Label>
                      <Input
                        id="pendingContracts"
                        type="number"
                        value={formData.baselineData.pendingContracts}
                        onChange={(e) => handleBaselineDataChange('pendingContracts', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recurringRevenue">الإيرادات المتكررة</Label>
                      <Input
                        id="recurringRevenue"
                        type="number"
                        value={formData.baselineData.recurringRevenue}
                        onChange={(e) => handleBaselineDataChange('recurringRevenue', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </>
                )}

                {formData.type === 'expense' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="materialCosts">تكلفة المواد</Label>
                      <Input
                        id="materialCosts"
                        type="number"
                        value={formData.baselineData.materialCosts}
                        onChange={(e) => handleBaselineDataChange('materialCosts', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="laborCosts">تكلفة العمالة</Label>
                      <Input
                        id="laborCosts"
                        type="number"
                        value={formData.baselineData.laborCosts}
                        onChange={(e) => handleBaselineDataChange('laborCosts', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="equipmentCosts">تكلفة المعدات</Label>
                      <Input
                        id="equipmentCosts"
                        type="number"
                        value={formData.baselineData.equipmentCosts}
                        onChange={(e) => handleBaselineDataChange('equipmentCosts', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Factors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              العوامل المؤثرة
            </CardTitle>
            <CardDescription>
              حدد العوامل التي تؤثر على دقة التوقع ووزن كل عامل
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.factors.map((factor, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>اسم العامل</Label>
                    <Input
                      value={factor.name}
                      onChange={(e) => handleFactorChange(index, 'name', e.target.value)}
                      placeholder="مثال: ظروف السوق"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>التأثير</Label>
                    <Select 
                      value={factor.impact} 
                      onValueChange={(value) => handleFactorChange(index, 'impact', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">عالي</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="low">منخفض</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>النسبة (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={factor.value}
                      onChange={(e) => handleFactorChange(index, 'value', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeFactor(index)}
                      disabled={formData.factors.length === 1}
                      className="w-full"
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addFactor}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                إضافة عامل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        {formData.amount && formData.confidence && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                ملخص التوقع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">السيناريو المحافظ</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(Number(formData.amount) * 0.9)}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">السيناريو الواقعي</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(Number(formData.amount))}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">السيناريو المتفائل</p>
                  <p className="text-xl font-bold text-purple-600">
                    {formatCurrency(Number(formData.amount) * 1.15)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/finance/forecasts">
            <Button type="button" variant="outline">
              إلغاء
            </Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'جاري الحفظ...' : 'حفظ التوقع'}
          </Button>
        </div>
      </form>
    </div>
  )
}
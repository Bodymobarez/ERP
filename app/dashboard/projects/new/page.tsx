"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle2, Calendar, DollarSign, Tag } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function NewProjectPage() {
  const router = useRouter()
  const { t, lang } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    status: "planning",
    priority: "medium",
    startDate: "",
    endDate: "",
    budget: "",
  })

  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = lang === 'ar' ? 'اسم المشروع مطلوب' : 'Project name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = lang === 'ar' ? 'اسم المشروع يجب أن يكون 3 أحرف على الأقل' : 'Project name must be at least 3 characters'
    }

    if (!formData.code.trim()) {
      newErrors.code = lang === 'ar' ? 'رمز المشروع مطلوب' : 'Project code is required'
    } else if (!/^[A-Z0-9-]+$/i.test(formData.code)) {
      newErrors.code = lang === 'ar' ? 'رمز المشروع يجب أن يحتوي على أحرف وأرقام فقط' : 'Project code must contain only letters, numbers, and dashes'
    }

    if (!formData.startDate) {
      newErrors.startDate = lang === 'ar' ? 'تاريخ البدء مطلوب' : 'Start date is required'
    }

    if (!formData.endDate) {
      newErrors.endDate = lang === 'ar' ? 'تاريخ الانتهاء مطلوب' : 'End date is required'
    } else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = lang === 'ar' ? 'تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء' : 'End date must be after start date'
    }

    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      newErrors.budget = lang === 'ar' ? 'الميزانية يجب أن تكون أكبر من صفر' : 'Budget must be greater than zero'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setSuccess(false)

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          budget: parseFloat(formData.budget) || 0,
          progress: 0,
          actualCost: 0,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard/projects")
          router.refresh()
        }, 1500)
      } else {
        const data = await response.json()
        setErrors({ submit: data.error || (lang === 'ar' ? 'حدث خطأ أثناء إنشاء المشروع' : 'Error creating project') })
      }
    } catch (error) {
      console.error("Error:", error)
      setErrors({ submit: lang === 'ar' ? 'حدث خطأ في الاتصال بالخادم' : 'Server connection error' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'onHold': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-purple-100 text-purple-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {lang === 'ar' ? 'تم إنشاء المشروع بنجاح!' : 'Project Created Successfully!'}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {lang === 'ar' ? 'جاري التحويل إلى قائمة المشاريع...' : 'Redirecting to projects list...'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.newProject}</h1>
          <p className="text-gray-600 mt-1">
            {lang === 'ar' ? 'أدخل تفاصيل المشروع الجديد بعناية' : 'Enter new project details carefully'}
          </p>
        </div>
        <Link href="/dashboard/projects">
          <Button variant="outline">
            <ArrowLeft className={`h-4 w-4 ${lang === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t.back}
          </Button>
        </Link>
      </div>

      {/* Error Alert */}
      {errors.submit && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">
                  {lang === 'ar' ? 'خطأ' : 'Error'}
                </p>
                <p className="text-sm text-red-700 mt-1">{errors.submit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              {lang === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
            </CardTitle>
            <CardDescription>
              {lang === 'ar' ? 'البيانات الأساسية للمشروع' : 'Core project information'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  {t.projectName} <span className="text-red-500">*</span>
                  {formData.name && !errors.name && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: تطوير نظام ERP متكامل' : 'e.g., Complete ERP System Development'}
                  className={errors.name ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.name.length}/100 {lang === 'ar' ? 'حرف' : 'characters'}
                </p>
              </div>

              {/* Project Code */}
              <div className="space-y-2">
                <Label htmlFor="code" className="flex items-center gap-2">
                  {t.projectCode} <span className="text-red-500">*</span>
                  {formData.code && !errors.code && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                </Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => handleChange("code", e.target.value.toUpperCase())}
                  placeholder={lang === 'ar' ? 'مثال: PRJ-2025-001' : 'e.g., PRJ-2025-001'}
                  className={errors.code ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.code && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.code}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {lang === 'ar' ? 'رمز فريد لتعريف المشروع' : 'Unique identifier for the project'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                {t.description}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder={lang === 'ar' ? 'وصف تفصيلي للمشروع وأهدافه...' : 'Detailed project description and objectives...'}
                rows={4}
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                {formData.description.length}/500 {lang === 'ar' ? 'حرف' : 'characters'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Project Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {lang === 'ar' ? 'إعدادات المشروع' : 'Project Settings'}
            </CardTitle>
            <CardDescription>
              {lang === 'ar' ? 'الحالة، الأولوية، والجدول الزمني' : 'Status, priority, and timeline'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">
                  {t.status}
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor('planning')} variant="outline">
                          {t.planning}
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="active">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor('active')} variant="outline">
                          {t.active}
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="onHold">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor('onHold')} variant="outline">
                          {t.onHold}
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="completed">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor('completed')} variant="outline">
                          {t.completed}
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="cancelled">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor('cancelled')} variant="outline">
                          {t.cancelled}
                        </Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority">
                  {t.priority}
                </Label>
                <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor('low')} variant="outline">
                          {t.low}
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor('medium')} variant="outline">
                          {t.medium}
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor('high')} variant="outline">
                          {t.high}
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="critical">
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor('critical')} variant="outline">
                          {t.critical}
                        </Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-2">
                  {t.startDate} <span className="text-red-500">*</span>
                  {formData.startDate && !errors.startDate && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className={errors.startDate ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.startDate}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="endDate" className="flex items-center gap-2">
                  {t.endDate} <span className="text-red-500">*</span>
                  {formData.endDate && !errors.endDate && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  className={errors.endDate ? 'border-red-500' : ''}
                  disabled={loading}
                  min={formData.startDate}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.endDate}
                  </p>
                )}
                {formData.startDate && formData.endDate && !errors.endDate && (
                  <p className="text-xs text-gray-500">
                    {lang === 'ar' ? 'المدة: ' : 'Duration: '}
                    {Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))}
                    {lang === 'ar' ? ' يوم' : ' days'}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {lang === 'ar' ? 'الميزانية' : 'Budget'}
            </CardTitle>
            <CardDescription>
              {lang === 'ar' ? 'الميزانية المخصصة للمشروع' : 'Allocated project budget'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center gap-2">
                {t.budget} <span className="text-red-500">*</span>
                {formData.budget && !errors.budget && (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                )}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                  id="budget"
                  type="number"
                  step="0.01"
                  value={formData.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: 500000' : 'e.g., 500000'}
                  className={`pl-8 ${errors.budget ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
              </div>
              {errors.budget && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.budget}
                </p>
              )}
              {formData.budget && !errors.budget && (
                <p className="text-sm text-green-600">
                  {lang === 'ar' ? 'الميزانية: ' : 'Budget: '}
                  ${parseFloat(formData.budget).toLocaleString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Link href="/dashboard/projects">
            <Button type="button" variant="outline" disabled={loading}>
              {t.cancel}
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="min-w-[120px]">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t.saving}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {t.save}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

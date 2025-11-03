"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  ArrowRight, 
  Save,
  X,
  Calendar,
  DollarSign,
  Building2,
  FileText,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

interface ProjectForm {
  name: string
  code: string
  description: string
  status: string
  priority: string
  startDate: string
  endDate: string
  actualStart: string
  actualEnd: string
  budget: number
  actualCost: number
  progress: number
}

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { t, lang } = useLanguage()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")

  const [form, setForm] = useState<ProjectForm>({
    name: "",
    code: "",
    description: "",
    status: "planning",
    priority: "medium",
    startDate: "",
    endDate: "",
    actualStart: "",
    actualEnd: "",
    budget: 0,
    actualCost: 0,
    progress: 0
  })

  useEffect(() => {
    if (params.id) {
      fetch(`/api/projects/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error("Error:", data.error)
          } else {
            setProject(data)
            setForm({
              name: data.name || "",
              code: data.code || "",
              description: data.description || "",
              status: data.status || "planning",
              priority: data.priority || "medium",
              startDate: (data?.startDate ? new Date(data.startDate).toISOString().split('T')[0] : "") as string,
              endDate: (data?.endDate ? new Date(data.endDate).toISOString().split('T')[0] : "") as string,
              actualStart: (data?.actualStart ? new Date(data.actualStart).toISOString().split('T')[0] : "") as string,
              actualEnd: (data?.actualEnd ? new Date(data.actualEnd).toISOString().split('T')[0] : "") as string,
              budget: data.budget || 0,
              actualCost: data.actualCost || 0,
              progress: data.progress || 0
            })
          }
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching project:", error)
          setLoading(false)
        })
    }
  }, [params.id])

  const handleInputChange = (field: keyof ProjectForm, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!form.name.trim()) {
      newErrors.name = "اسم المشروع مطلوب"
    }

    if (!form.code.trim()) {
      newErrors.code = "كود المشروع مطلوب"
    }

    if (!form.description.trim()) {
      newErrors.description = "وصف المشروع مطلوب"
    }

    if (!form.startDate) {
      newErrors.startDate = "تاريخ البداية مطلوب"
    }

    if (!form.endDate) {
      newErrors.endDate = "تاريخ النهاية مطلوب"
    }

    if (form.startDate && form.endDate && new Date(form.startDate) >= new Date(form.endDate)) {
      newErrors.endDate = "تاريخ النهاية يجب أن يكون بعد تاريخ البداية"
    }

    if (form.actualStart && form.startDate && new Date(form.actualStart) < new Date(form.startDate)) {
      newErrors.actualStart = "تاريخ البداية الفعلي لا يمكن أن يكون قبل تاريخ البداية المخطط"
    }

    if (form.actualEnd && form.actualStart && new Date(form.actualEnd) <= new Date(form.actualStart)) {
      newErrors.actualEnd = "تاريخ النهاية الفعلي يجب أن يكون بعد تاريخ البداية الفعلي"
    }

    if (form.budget <= 0) {
      newErrors.budget = "الميزانية يجب أن تكون أكبر من صفر"
    }

    if (form.actualCost < 0) {
      newErrors.actualCost = "التكلفة الفعلية لا يمكن أن تكون سالبة"
    }

    if (form.progress < 0 || form.progress > 100) {
      newErrors.progress = "نسبة الإنجاز يجب أن تكون بين 0 و 100"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setSaving(true)
    setSuccessMessage("")

    try {
      const response = await fetch(`/api/projects/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        setSuccessMessage("تم حفظ التغييرات بنجاح")
        setTimeout(() => {
          router.push(`/dashboard/projects/${params.id}`)
        }, 1500)
      } else {
        const data = await response.json()
        setErrors({ general: data.error || "حدث خطأ أثناء حفظ التغييرات" })
      }
    } catch (error) {
      console.error("Error updating project:", error)
      setErrors({ general: "حدث خطأ أثناء حفظ التغييرات" })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">المشروع غير موجود</h3>
        <p className="text-gray-600 mb-4">لم يتم العثور على المشروع المطلوب</p>
        <Link href="/dashboard/projects">
          <Button>
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة للمشاريع
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/projects/${project.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">تعديل المشروع</h1>
            <p className="text-gray-600 mt-1">{project.name}</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* General Error */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">{errors.general}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  المعلومات الأساسية
                </CardTitle>
                <CardDescription>
                  تعديل البيانات الأساسية للمشروع
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">اسم المشروع *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="أدخل اسم المشروع"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code">كود المشروع *</Label>
                    <Input
                      id="code"
                      value={form.code}
                      onChange={(e) => handleInputChange("code", e.target.value)}
                      placeholder="أدخل كود المشروع"
                      className={errors.code ? "border-red-500" : ""}
                    />
                    {errors.code && (
                      <p className="text-sm text-red-600">{errors.code}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">الوصف *</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="أدخل وصف المشروع"
                    rows={4}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="status">الحالة</Label>
                    <select
                      id="status"
                      value={form.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="planning">التخطيط</option>
                      <option value="active">تحت التنفيذ</option>
                      <option value="on-hold">متوقف مؤقتاً</option>
                      <option value="completed">مكتمل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">الأولوية</Label>
                    <select
                      id="priority"
                      value={form.priority}
                      onChange={(e) => handleInputChange("priority", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">منخفضة</option>
                      <option value="medium">متوسطة</option>
                      <option value="high">عالية</option>
                      <option value="critical">حرجة</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  التواريخ
                </CardTitle>
                <CardDescription>
                  تحديث التواريخ المخططة والفعلية للمشروع
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">تاريخ البداية المخطط *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={form.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className={errors.startDate ? "border-red-500" : ""}
                    />
                    {errors.startDate && (
                      <p className="text-sm text-red-600">{errors.startDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">تاريخ النهاية المخطط *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={form.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      className={errors.endDate ? "border-red-500" : ""}
                    />
                    {errors.endDate && (
                      <p className="text-sm text-red-600">{errors.endDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="actualStart">تاريخ البداية الفعلي</Label>
                    <Input
                      id="actualStart"
                      type="date"
                      value={form.actualStart}
                      onChange={(e) => handleInputChange("actualStart", e.target.value)}
                      className={errors.actualStart ? "border-red-500" : ""}
                    />
                    {errors.actualStart && (
                      <p className="text-sm text-red-600">{errors.actualStart}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="actualEnd">تاريخ النهاية الفعلي</Label>
                    <Input
                      id="actualEnd"
                      type="date"
                      value={form.actualEnd}
                      onChange={(e) => handleInputChange("actualEnd", e.target.value)}
                      className={errors.actualEnd ? "border-red-500" : ""}
                    />
                    {errors.actualEnd && (
                      <p className="text-sm text-red-600">{errors.actualEnd}</p>
                    )}
                  </div>
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
                  تحديث الميزانية والتكاليف
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="budget">الميزانية (ريال) *</Label>
                    <Input
                      id="budget"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.budget}
                      onChange={(e) => handleInputChange("budget", parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className={errors.budget ? "border-red-500" : ""}
                    />
                    {errors.budget && (
                      <p className="text-sm text-red-600">{errors.budget}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="actualCost">التكلفة الفعلية (ريال)</Label>
                    <Input
                      id="actualCost"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.actualCost}
                      onChange={(e) => handleInputChange("actualCost", parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className={errors.actualCost ? "border-red-500" : ""}
                    />
                    {errors.actualCost && (
                      <p className="text-sm text-red-600">{errors.actualCost}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="progress">نسبة الإنجاز (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={form.progress}
                    onChange={(e) => handleInputChange("progress", parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className={errors.progress ? "border-red-500" : ""}
                  />
                  {errors.progress && (
                    <p className="text-sm text-red-600">{errors.progress}</p>
                  )}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(Math.max(form.progress, 0), 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>إجراءات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button type="submit" className="w-full" disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleCancel}
                  disabled={saving}
                >
                  <X className="h-4 w-4 mr-2" />
                  إلغاء
                </Button>
              </CardContent>
            </Card>

            {/* Current Info */}
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الحالية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">تم الإنشاء</span>
                  <span className="font-medium">{new Date(project.createdAt).toLocaleDateString('ar-SA')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">آخر تحديث</span>
                  <span className="font-medium">{new Date(project.updatedAt).toLocaleDateString('ar-SA')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">منشئ المشروع</span>
                  <span className="font-medium">{project.createdBy?.firstName} {project.createdBy?.lastName}</span>
                </div>
              </CardContent>
            </Card>

            {/* Project Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات المشروع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">المراحل</span>
                  <span className="font-medium">{project.phases?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المعالم</span>
                  <span className="font-medium">{project.milestones?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المهام</span>
                  <span className="font-medium">{project.tasks?.length || 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
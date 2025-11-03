"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowLeft,
  Save,
  X,
  Plus,
  Target,
  Calendar,
  Users,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  Link as LinkIcon,
  Building2,
  FolderKanban,
  Award,
  GitBranch,
  Zap,
  Star,
  Flag
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

// Mock data for projects
const mockProjects = [
  { id: "1", name: "نظام ERP الشامل", code: "ERP-001", status: "active" },
  { id: "2", name: "نظام إدارة المشاريع", code: "PM-002", status: "active" },
  { id: "3", name: "تطوير الموقع الإلكتروني", code: "WEB-003", status: "active" },
  { id: "4", name: "نظام إدارة المخزون", code: "INV-004", status: "planning" },
  { id: "5", name: "تطبيق الهاتف المحمول", code: "MOB-005", status: "active" }
]

// Mock data for team members
const mockTeamMembers = [
  { id: "1", name: "أحمد محمد", role: "مدير المشروع", avatar: "/api/placeholder/32/32" },
  { id: "2", name: "فاطمة أحمد", role: "مطور أول", avatar: "/api/placeholder/32/32" },
  { id: "3", name: "خالد عبدالله", role: "مصمم", avatar: "/api/placeholder/32/32" },
  { id: "4", name: "سارة قاسم", role: "محلل أنظمة", avatar: "/api/placeholder/32/32" },
  { id: "5", name: "محمد الهندي", role: "مطور", avatar: "/api/placeholder/32/32" }
]

// Mock data for existing milestones (for dependencies)
const mockExistingMilestones = [
  { id: "1", title: "تحليل المتطلبات", project: "نظام ERP الشامل", status: "completed" },
  { id: "2", title: "تصميم النظام", project: "نظام ERP الشامل", status: "in-progress" },
  { id: "3", title: "تطوير النماذج", project: "نظام إدارة المشاريع", status: "pending" },
  { id: "4", title: "اختبار النظام", project: "نظام ERP الشامل", status: "pending" },
  { id: "5", title: "مراجعة التصميم", project: "تطوير الموقع الإلكتروني", status: "completed" }
]

interface Deliverable {
  id: string
  title: string
  description: string
  type: "document" | "feature" | "review" | "approval"
  required: boolean
  completed: boolean
}

interface MilestoneFormData {
  title: string
  description: string
  projectId: string
  type: "phase" | "delivery" | "review" | "approval" | "launch"
  priority: "low" | "medium" | "high" | "critical"
  startDate: string
  dueDate: string
  assignedTo: string[]
  dependencies: string[]
  deliverables: Deliverable[]
  budget: string
  notes: string
  isBlocking: boolean
  sendNotifications: boolean
  autoProgress: boolean
}

export default function NewMilestonePage() {
  const { t, lang } = useLanguage()
  const [formData, setFormData] = useState<MilestoneFormData>({
    title: "",
    description: "",
    projectId: "",
    type: "phase",
    priority: "medium",
    startDate: "",
    dueDate: "",
    assignedTo: [],
    dependencies: [],
    deliverables: [],
    budget: "",
    notes: "",
    isBlocking: false,
    sendNotifications: true,
    autoProgress: true
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeliverableForm, setShowDeliverableForm] = useState(false)
  const [newDeliverable, setNewDeliverable] = useState<Partial<Deliverable>>({
    title: "",
    description: "",
    type: "document",
    required: true,
    completed: false
  })

  const milestoneTypes = [
    { value: "phase", label: "مرحلة مشروع", labelEn: "Project Phase", icon: FolderKanban, color: "text-blue-600" },
    { value: "delivery", label: "تسليم", labelEn: "Delivery", icon: Award, color: "text-green-600" },
    { value: "review", label: "مراجعة", labelEn: "Review", icon: CheckCircle2, color: "text-orange-600" },
    { value: "approval", label: "موافقة", labelEn: "Approval", icon: Star, color: "text-purple-600" },
    { value: "launch", label: "إطلاق", labelEn: "Launch", icon: Zap, color: "text-red-600" }
  ]

  const priorityLevels = [
    { value: "low", label: "منخفض", labelEn: "Low", color: "bg-gray-100 text-gray-800" },
    { value: "medium", label: "متوسط", labelEn: "Medium", color: "bg-blue-100 text-blue-800" },
    { value: "high", label: "عالي", labelEn: "High", color: "bg-orange-100 text-orange-800" },
    { value: "critical", label: "حرج", labelEn: "Critical", color: "bg-red-100 text-red-800" }
  ]

  const deliverableTypes = [
    { value: "document", label: "مستند", labelEn: "Document", icon: FileText },
    { value: "feature", label: "ميزة", labelEn: "Feature", icon: Zap },
    { value: "review", label: "مراجعة", labelEn: "Review", icon: CheckCircle2 },
    { value: "approval", label: "موافقة", labelEn: "Approval", icon: Star }
  ]

  const handleInputChange = (field: keyof MilestoneFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleMultiSelectChange = (field: keyof MilestoneFormData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }))
  }

  const addDeliverable = () => {
    if (!newDeliverable.title?.trim()) return

    const deliverable: Deliverable = {
      id: Date.now().toString(),
      title: newDeliverable.title || "",
      description: newDeliverable.description || "",
      type: newDeliverable.type as Deliverable["type"] || "document",
      required: newDeliverable.required || false,
      completed: false
    }

    setFormData(prev => ({
      ...prev,
      deliverables: [...prev.deliverables, deliverable]
    }))

    setNewDeliverable({
      title: "",
      description: "",
      type: "document",
      required: true,
      completed: false
    })
    setShowDeliverableForm(false)
  }

  const removeDeliverable = (id: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter(d => d.id !== id)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "عنوان المعلم مطلوب"
    }
    if (!formData.description.trim()) {
      newErrors.description = "وصف المعلم مطلوب"
    }
    if (!formData.projectId) {
      newErrors.projectId = "يجب اختيار مشروع"
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "تاريخ الاستحقاق مطلوب"
    }
    if (formData.startDate && formData.dueDate && new Date(formData.startDate) >= new Date(formData.dueDate)) {
      newErrors.dueDate = "تاريخ الاستحقاق يجب أن يكون بعد تاريخ البداية"
    }
    if (formData.assignedTo.length === 0) {
      newErrors.assignedTo = "يجب تعيين شخص واحد على الأقل"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log("Creating milestone:", formData)
      
      // Redirect to milestones list
      window.location.href = "/dashboard/projects/milestones"
    } catch (error) {
      console.error("Error creating milestone:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedProject = mockProjects.find(p => p.id === formData.projectId)
  const selectedType = milestoneTypes.find(t => t.value === formData.type)
  const selectedPriority = priorityLevels.find(p => p.value === formData.priority)

  return (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects/milestones">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {lang === 'ar' ? 'العودة' : 'Back'}
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {lang === 'ar' ? 'إنشاء معلم جديد' : 'Create New Milestone'}
          </h1>
          <p className="text-gray-600 mt-1">
            {lang === 'ar' ? 'إضافة معلم رئيسي جديد للمشروع' : 'Add a new key milestone to the project'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {lang === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
                </CardTitle>
                <CardDescription>
                  {lang === 'ar' ? 'تفاصيل المعلم الأساسية' : 'Basic milestone details'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      {lang === 'ar' ? 'عنوان المعلم' : 'Milestone Title'} *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder={lang === 'ar' ? 'أدخل عنوان المعلم...' : 'Enter milestone title...'}
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project">
                      {lang === 'ar' ? 'المشروع' : 'Project'} *
                    </Label>
                    <Select value={formData.projectId} onValueChange={(value) => handleInputChange('projectId', value)}>
                      <SelectTrigger className={errors.projectId ? 'border-red-500' : ''}>
                        <SelectValue placeholder={lang === 'ar' ? 'اختر المشروع' : 'Select project'} />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProjects.map(project => (
                          <SelectItem key={project.id} value={project.id}>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              <span>{project.name}</span>
                              <Badge variant="outline" className="ml-2">
                                {project.code}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.projectId && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.projectId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    {lang === 'ar' ? 'الوصف' : 'Description'} *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder={lang === 'ar' ? 'وصف تفصيلي للمعلم وأهدافه...' : 'Detailed description of the milestone and its objectives...'}
                    rows={4}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">
                      {lang === 'ar' ? 'نوع المعلم' : 'Milestone Type'}
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {milestoneTypes.map(type => {
                          const Icon = type.icon
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <Icon className={`h-4 w-4 ${type.color}`} />
                                <span>{lang === 'ar' ? type.label : type.labelEn}</span>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">
                      {lang === 'ar' ? 'الأولوية' : 'Priority'}
                    </Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityLevels.map(priority => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${priority.color.split(' ')[0]}`} />
                              <span>{lang === 'ar' ? priority.label : priority.labelEn}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {lang === 'ar' ? 'الجدول الزمني' : 'Timeline'}
                </CardTitle>
                <CardDescription>
                  {lang === 'ar' ? 'تواريخ بداية ونهاية المعلم' : 'Start and end dates for the milestone'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">
                      {lang === 'ar' ? 'تاريخ البداية' : 'Start Date'}
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">
                      {lang === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'} *
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className={errors.dueDate ? 'border-red-500' : ''}
                    />
                    {errors.dueDate && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.dueDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">
                    {lang === 'ar' ? 'الميزانية المخصصة' : 'Allocated Budget'}
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    step="0.01"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder={lang === 'ar' ? 'أدخل الميزانية بالريال السعودي...' : 'Enter budget in SAR...'}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Team Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {lang === 'ar' ? 'تعيين الفريق' : 'Team Assignment'}
                </CardTitle>
                <CardDescription>
                  {lang === 'ar' ? 'اختر أعضاء الفريق المسؤولين عن هذا المعلم' : 'Select team members responsible for this milestone'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  {mockTeamMembers.map(member => (
                    <div key={member.id} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={`member-${member.id}`}
                        checked={formData.assignedTo.includes(member.id)}
                        onCheckedChange={(checked) => 
                          handleMultiSelectChange('assignedTo', member.id, checked as boolean)
                        }
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.assignedTo && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.assignedTo}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Dependencies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  {lang === 'ar' ? 'التبعيات' : 'Dependencies'}
                </CardTitle>
                <CardDescription>
                  {lang === 'ar' ? 'المعالم التي يجب إكمالها قبل بدء هذا المعلم' : 'Milestones that must be completed before starting this milestone'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  {mockExistingMilestones.map(milestone => (
                    <div key={milestone.id} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={`dependency-${milestone.id}`}
                        checked={formData.dependencies.includes(milestone.id)}
                        onCheckedChange={(checked) => 
                          handleMultiSelectChange('dependencies', milestone.id, checked as boolean)
                        }
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{milestone.title}</p>
                            <p className="text-sm text-gray-500">{milestone.project}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={
                          milestone.status === 'completed' ? 'bg-green-50 text-green-700' :
                          milestone.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
                          'bg-gray-50 text-gray-700'
                        }>
                          {milestone.status === 'completed' ? 'مكتمل' :
                           milestone.status === 'in-progress' ? 'قيد العمل' : 'معلق'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Deliverables */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {lang === 'ar' ? 'المخرجات المطلوبة' : 'Required Deliverables'}
                </CardTitle>
                <CardDescription>
                  {lang === 'ar' ? 'قائمة بالمخرجات والمهام المطلوب تسليمها' : 'List of deliverables and tasks to be completed'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.deliverables.length > 0 && (
                  <div className="space-y-2">
                    {formData.deliverables.map(deliverable => {
                      const DeliverableIcon = deliverableTypes.find(t => t.value === deliverable.type)?.icon || FileText
                      return (
                        <div key={deliverable.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <DeliverableIcon className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium">{deliverable.title}</p>
                              {deliverable.description && (
                                <p className="text-sm text-gray-500">{deliverable.description}</p>
                              )}
                            </div>
                            {deliverable.required && (
                              <Badge variant="outline" className="bg-red-50 text-red-700">
                                {lang === 'ar' ? 'مطلوب' : 'Required'}
                              </Badge>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDeliverable(deliverable.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}

                {showDeliverableForm ? (
                  <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>
                          {lang === 'ar' ? 'عنوان المخرج' : 'Deliverable Title'}
                        </Label>
                        <Input
                          value={newDeliverable.title || ""}
                          onChange={(e) => setNewDeliverable(prev => ({ ...prev, title: e.target.value }))}
                          placeholder={lang === 'ar' ? 'أدخل عنوان المخرج...' : 'Enter deliverable title...'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>
                          {lang === 'ar' ? 'نوع المخرج' : 'Deliverable Type'}
                        </Label>
                        <Select
                          value={newDeliverable.type}
                          onValueChange={(value) => setNewDeliverable(prev => ({ ...prev, type: value as Deliverable["type"] }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {deliverableTypes.map(type => {
                              const Icon = type.icon
                              return (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    <span>{lang === 'ar' ? type.label : type.labelEn}</span>
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>
                        {lang === 'ar' ? 'الوصف' : 'Description'}
                      </Label>
                      <Textarea
                        value={newDeliverable.description || ""}
                        onChange={(e) => setNewDeliverable(prev => ({ ...prev, description: e.target.value }))}
                        placeholder={lang === 'ar' ? 'وصف المخرج...' : 'Describe the deliverable...'}
                        rows={2}
                      />
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="required"
                        checked={newDeliverable.required}
                        onCheckedChange={(checked) => setNewDeliverable(prev => ({ ...prev, required: checked as boolean }))}
                      />
                      <Label htmlFor="required">
                        {lang === 'ar' ? 'مخرج مطلوب' : 'Required deliverable'}
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" onClick={addDeliverable}>
                        <Plus className="h-4 w-4 mr-2" />
                        {lang === 'ar' ? 'إضافة' : 'Add'}
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => setShowDeliverableForm(false)}>
                        {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button type="button" variant="outline" onClick={() => setShowDeliverableForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {lang === 'ar' ? 'إضافة مخرج' : 'Add Deliverable'}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>{lang === 'ar' ? 'ملاحظات إضافية' : 'Additional Notes'}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder={lang === 'ar' ? 'أي ملاحظات أو تعليمات إضافية...' : 'Any additional notes or instructions...'}
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {lang === 'ar' ? 'ملخص المعلم' : 'Milestone Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedProject && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">
                        {lang === 'ar' ? 'المشروع' : 'Project'}
                      </span>
                    </div>
                    <p className="text-sm text-blue-800">{selectedProject.name}</p>
                    <Badge variant="outline" className="mt-1">
                      {selectedProject.code}
                    </Badge>
                  </div>
                )}

                {selectedType && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <selectedType.icon className={`h-4 w-4 ${selectedType.color}`} />
                      <span className="font-medium">
                        {lang === 'ar' ? 'نوع المعلم' : 'Type'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {lang === 'ar' ? selectedType.label : selectedType.labelEn}
                    </p>
                  </div>
                )}

                {selectedPriority && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Flag className="h-4 w-4" />
                      <span className="font-medium">
                        {lang === 'ar' ? 'الأولوية' : 'Priority'}
                      </span>
                    </div>
                    <Badge className={selectedPriority.color}>
                      {lang === 'ar' ? selectedPriority.label : selectedPriority.labelEn}
                    </Badge>
                  </div>
                )}

                {formData.assignedTo.length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">
                        {lang === 'ar' ? 'الفريق المعين' : 'Assigned Team'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {formData.assignedTo.length} {lang === 'ar' ? 'عضو' : 'members'}
                    </p>
                  </div>
                )}

                {formData.deliverables.length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">
                        {lang === 'ar' ? 'المخرجات' : 'Deliverables'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {formData.deliverables.length} {lang === 'ar' ? 'مخرج' : 'deliverables'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Settings Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {lang === 'ar' ? 'الإعدادات' : 'Settings'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="isBlocking"
                    checked={formData.isBlocking}
                    onCheckedChange={(checked) => handleInputChange('isBlocking', checked)}
                  />
                  <div>
                    <Label htmlFor="isBlocking" className="font-medium">
                      {lang === 'ar' ? 'معلم حاجز' : 'Blocking Milestone'}
                    </Label>
                    <p className="text-xs text-gray-500">
                      {lang === 'ar' ? 'يمنع بدء المعالم التابعة' : 'Prevents dependent milestones from starting'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="sendNotifications"
                    checked={formData.sendNotifications}
                    onCheckedChange={(checked) => handleInputChange('sendNotifications', checked)}
                  />
                  <div>
                    <Label htmlFor="sendNotifications" className="font-medium">
                      {lang === 'ar' ? 'إرسال إشعارات' : 'Send Notifications'}
                    </Label>
                    <p className="text-xs text-gray-500">
                      {lang === 'ar' ? 'إشعار الفريق بالتحديثات' : 'Notify team of updates'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="autoProgress"
                    checked={formData.autoProgress}
                    onCheckedChange={(checked) => handleInputChange('autoProgress', checked)}
                  />
                  <div>
                    <Label htmlFor="autoProgress" className="font-medium">
                      {lang === 'ar' ? 'تحديث تلقائي للتقدم' : 'Auto-update Progress'}
                    </Label>
                    <p className="text-xs text-gray-500">
                      {lang === 'ar' ? 'حساب التقدم تلقائياً' : 'Calculate progress automatically'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        {lang === 'ar' ? 'جاري الإنشاء...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {lang === 'ar' ? 'إنشاء المعلم' : 'Create Milestone'}
                      </>
                    )}
                  </Button>
                  <Link href="/dashboard/projects/milestones" className="block">
                    <Button type="button" variant="outline" className="w-full">
                      <X className="h-4 w-4 mr-2" />
                      {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
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
  Camera,
  FileText,
  MapPin,
  Building2,
  Users,
  Calendar,
  Clock,
  Shield,
  Target,
  AlertTriangle,
  CheckCircle2,
  Upload,
  Plus,
  X,
  Star,
  StarOff
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockSites = [
  { id: "1", name: "موقع البرج السكني", location: "الرياض - شارع الملك فهد" },
  { id: "2", name: "موقع الفيلا السكنية", location: "جدة - حي النخيل" },
  { id: "3", name: "موقع المجمع التجاري", location: "الدمام - طريق الملك عبدالعزيز" },
  { id: "4", name: "موقع المصنع", location: "الخبر - المنطقة الصناعية" }
]

const mockInspectors = [
  { id: "1", name: "م. أحمد محمد", department: "السلامة المهنية" },
  { id: "2", name: "م. فاطمة أحمد", department: "مراقبة الجودة" },
  { id: "3", name: "م. محمد علي", department: "التفتيش الفني" },
  { id: "4", name: "م. سارة خالد", department: "السلامة المهنية" }
]

const safetyCategories = [
  { id: "helmet", name: "استخدام الخوذات", weight: 20 },
  { id: "safety_vest", name: "السترات الواقية", weight: 15 },
  { id: "safety_shoes", name: "الأحذية الآمنة", weight: 15 },
  { id: "scaffolding", name: "السقالات", weight: 25 },
  { id: "electrical", name: "التمديدات الكهربائية", weight: 25 }
]

const qualityCategories = [
  { id: "concrete", name: "جودة الخرسانة", weight: 30 },
  { id: "steel", name: "حديد التسليح", weight: 25 },
  { id: "masonry", name: "أعمال البناء", weight: 20 },
  { id: "finishing", name: "أعمال التشطيب", weight: 25 }
]

export default function NewInspectionPage() {
  const { t, lang } = useLanguage()
  const [formData, setFormData] = useState({
    siteId: "",
    inspectorId: "",
    inspectionDate: new Date().toISOString().split('T')[0],
    inspectionTime: new Date().toTimeString().slice(0, 5),
    type: "دوري",
    weather: "مشمس",
    temperature: "",
    notes: "",
    photos: [] as File[],
    safetyScores: {} as Record<string, number>,
    qualityScores: {} as Record<string, number>,
    issues: [] as Array<{id: string, description: string, severity: string, status: string}>,
    recommendations: [] as Array<{id: string, description: string, priority: string}>
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [newIssue, setNewIssue] = useState({ description: "", severity: "medium", status: "open" })
  const [newRecommendation, setNewRecommendation] = useState({ description: "", priority: "medium" })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleScoreChange = (category: string, score: number, type: 'safety' | 'quality') => {
    setFormData(prev => ({
      ...prev,
      [`${type}Scores`]: { ...prev[`${type}Scores`], [category]: score }
    }))
  }

  const addIssue = () => {
    if (newIssue.description) {
      const issue = {
        id: Date.now().toString(),
        ...newIssue
      }
      setFormData(prev => ({
        ...prev,
        issues: [...prev.issues, issue]
      }))
      setNewIssue({ description: "", severity: "medium", status: "open" })
    }
  }

  const removeIssue = (id: string) => {
    setFormData(prev => ({
      ...prev,
      issues: prev.issues.filter(issue => issue.id !== id)
    }))
  }

  const addRecommendation = () => {
    if (newRecommendation.description) {
      const recommendation = {
        id: Date.now().toString(),
        ...newRecommendation
      }
      setFormData(prev => ({
        ...prev,
        recommendations: [...prev.recommendations, recommendation]
      }))
      setNewRecommendation({ description: "", priority: "medium" })
    }
  }

  const removeRecommendation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      recommendations: prev.recommendations.filter(rec => rec.id !== id)
    }))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }))
  }

  const calculateOverallScore = (scores: Record<string, number>, categories: any[]) => {
    let totalWeight = 0
    let weightedSum = 0
    
    categories.forEach(category => {
      const score = scores[category.id] || 0
      weightedSum += score * category.weight
      totalWeight += category.weight
    })
    
    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0
  }

  const safetyScore = calculateOverallScore(formData.safetyScores, safetyCategories)
  const qualityScore = calculateOverallScore(formData.qualityScores, qualityCategories)

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (score: number, onChange: (score: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star * 20)}
            className="focus:outline-none"
          >
            {score >= star * 20 ? (
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
            ) : (
              <StarOff className="h-5 w-5 text-gray-300" />
            )}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/projects/sites/inspection">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                العودة للتفتيشات
              </Button>
            </Link>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">تفتيش جديد</h1>
              <p className="text-blue-100 text-lg">إضافة تفتيش دوري لموقع البناء</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= step 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-1 mx-2 ${
                currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              المعلومات الأساسية
            </CardTitle>
            <CardDescription>بيانات الموقع والمفتش والتوقيت</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                <select
                  value={formData.siteId}
                  onChange={(e) => handleInputChange('siteId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">اختر الموقع</option>
                  {mockSites.map(site => (
                    <option key={site.id} value={site.id}>{site.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المفتش</label>
                <select
                  value={formData.inspectorId}
                  onChange={(e) => handleInputChange('inspectorId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">اختر المفتش</option>
                  {mockInspectors.map(inspector => (
                    <option key={inspector.id} value={inspector.id}>{inspector.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ التفتيش</label>
                <Input
                  type="date"
                  value={formData.inspectionDate}
                  onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وقت التفتيش</label>
                <Input
                  type="time"
                  value={formData.inspectionTime}
                  onChange={(e) => handleInputChange('inspectionTime', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع التفتيش</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="دوري">دوري</option>
                  <option value="مفاجئ">مفاجئ</option>
                  <option value="خاص">خاص</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الطقس</label>
                <select
                  value={formData.weather}
                  onChange={(e) => handleInputChange('weather', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="مشمس">مشمس</option>
                  <option value="غائم">غائم</option>
                  <option value="ممطر">ممطر</option>
                  <option value="عاصف">عاصف</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات عامة</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="أي ملاحظات إضافية..."
                rows={3}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)}>
                التالي: تقييم السلامة
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Safety Assessment */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-red-600" />
              تقييم السلامة والأمان
            </CardTitle>
            <CardDescription>تقييم عناصر السلامة في الموقع</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {safetyCategories.map((category) => (
              <div key={category.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{category.name}</h3>
                  <span className="text-sm text-gray-600">الوزن: {category.weight}%</span>
                </div>
                <div className="flex items-center gap-4">
                  {renderStars(
                    formData.safetyScores[category.id] || 0,
                    (score) => handleScoreChange(category.id, score, 'safety')
                  )}
                  <span className={`text-lg font-bold ${getScoreColor(formData.safetyScores[category.id] || 0)}`}>
                    {formData.safetyScores[category.id] || 0}%
                  </span>
                </div>
              </div>
            ))}

            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">إجمالي نقاط السلامة</h3>
              <div className="text-3xl font-bold text-red-600">{safetyScore}%</div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                السابق
              </Button>
              <Button onClick={() => setCurrentStep(3)}>
                التالي: تقييم الجودة
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Quality Assessment */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              تقييم الجودة
            </CardTitle>
            <CardDescription>تقييم جودة العمل المنفذ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {qualityCategories.map((category) => (
              <div key={category.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{category.name}</h3>
                  <span className="text-sm text-gray-600">الوزن: {category.weight}%</span>
                </div>
                <div className="flex items-center gap-4">
                  {renderStars(
                    formData.qualityScores[category.id] || 0,
                    (score) => handleScoreChange(category.id, score, 'quality')
                  )}
                  <span className={`text-lg font-bold ${getScoreColor(formData.qualityScores[category.id] || 0)}`}>
                    {formData.qualityScores[category.id] || 0}%
                  </span>
                </div>
              </div>
            ))}

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">إجمالي نقاط الجودة</h3>
              <div className="text-3xl font-bold text-blue-600">{qualityScore}%</div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                السابق
              </Button>
              <Button onClick={() => setCurrentStep(4)}>
                التالي: المشاكل والتوصيات
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Issues and Recommendations */}
      {currentStep === 4 && (
        <div className="space-y-6">
          {/* Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                المشاكل المكتشفة
              </CardTitle>
              <CardDescription>تسجيل المشاكل التي تم اكتشافها</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="وصف المشكلة..."
                  value={newIssue.description}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, description: e.target.value }))}
                  className="flex-1"
                />
                <select
                  value={newIssue.severity}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, severity: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="low">منخفض</option>
                  <option value="medium">متوسط</option>
                  <option value="high">عالي</option>
                </select>
                <Button onClick={addIssue}>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة
                </Button>
              </div>

              <div className="space-y-2">
                {formData.issues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{issue.description}</p>
                      <Badge className={getSeverityColor(issue.severity)}>
                        {issue.severity === 'high' ? 'عالي' : issue.severity === 'medium' ? 'متوسط' : 'منخفض'}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeIssue(issue.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                التوصيات
              </CardTitle>
              <CardDescription>التوصيات لتحسين الأداء</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="وصف التوصية..."
                  value={newRecommendation.description}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, description: e.target.value }))}
                  className="flex-1"
                />
                <select
                  value={newRecommendation.priority}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, priority: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="low">منخفض</option>
                  <option value="medium">متوسط</option>
                  <option value="high">عالي</option>
                </select>
                <Button onClick={addRecommendation}>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة
                </Button>
              </div>

              <div className="space-y-2">
                {formData.recommendations.map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{rec.description}</p>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority === 'high' ? 'عالي' : rec.priority === 'medium' ? 'متوسط' : 'منخفض'}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRecommendation(rec.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-6 w-6 text-purple-600" />
                الصور المرفقة
              </CardTitle>
              <CardDescription>رفع صور توثيقية للتفتيش</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  رفع الصور
                </label>
                <p className="text-sm text-gray-600 mt-2">
                  {formData.photos.length} صورة مرفقة
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(3)}>
              السابق
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              حفظ التفتيش
            </Button>
          </div>
        </div>
      )}

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle>ملخص التفتيش</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <Shield className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">نقاط السلامة</p>
              <p className={`text-2xl font-bold ${getScoreColor(safetyScore)}`}>{safetyScore}%</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">نقاط الجودة</p>
              <p className={`text-2xl font-bold ${getScoreColor(qualityScore)}`}>{qualityScore}%</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">المشاكل</p>
              <p className="text-2xl font-bold text-orange-600">{formData.issues.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

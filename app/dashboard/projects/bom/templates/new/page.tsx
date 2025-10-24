"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Plus,
  Trash2,
  Copy,
  Save,
  Eye,
  ArrowLeft,
  FileText,
  Tag,
  Settings,
  Users,
  Lock,
  Globe,
  Building2,
  Ruler,
  Calculator,
  Package,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Edit,
  Search
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const categories = [
  { id: "خرسانة", name: "خرسانة", color: "bg-blue-100 text-blue-800" },
  { id: "تشطيب", name: "تشطيب", color: "bg-green-100 text-green-800" },
  { id: "كهرباء", name: "كهرباء", color: "bg-yellow-100 text-yellow-800" },
  { id: "سباكة", name: "سباكة", color: "bg-purple-100 text-purple-800" },
  { id: "حديد", name: "حديد", color: "bg-red-100 text-red-800" },
  { id: "أخرى", name: "أخرى", color: "bg-gray-100 text-gray-800" }
]

const units = [
  "م³", "م²", "م", "طن", "كيلو", "قطعة", "كيس", "لتر", "متر", "سم"
]

const mockItems = [
  { code: "CON-001", description: "خرسانة عادية C25", unit: "م³", category: "خرسانة" },
  { code: "CON-002", description: "خرسانة مسلحة C30", unit: "م³", category: "خرسانة" },
  { code: "STEEL-001", description: "حديد تسليح 12مم", unit: "طن", category: "حديد" },
  { code: "STEEL-002", description: "حديد تسليح 16مم", unit: "طن", category: "حديد" },
  { code: "FIN-001", description: "دهان داخلي", unit: "م²", category: "تشطيب" },
  { code: "FIN-002", description: "بلاط سيراميك", unit: "م²", category: "تشطيب" },
  { code: "ELEC-001", description: "كابل كهربائي 2.5مم²", unit: "متر", category: "كهرباء" },
  { code: "ELEC-002", description: "مفتاح كهربائي", unit: "قطعة", category: "كهرباء" },
  { code: "PLUM-001", description: "مواسير PVC", unit: "متر", category: "سباكة" },
  { code: "PLUM-002", description: "حوض حمام", unit: "قطعة", category: "سباكة" }
]

export default function NewTemplatePage() {
  const { t, lang } = useLanguage()
  const [templateData, setTemplateData] = useState({
    name: "",
    description: "",
    category: "",
    isPublic: true,
    tags: [] as string[],
    items: [] as Array<{
      id: string
      code: string
      description: string
      unit: string
      category: string
    }>
  })
  const [newTag, setNewTag] = useState("")
  const [newItem, setNewItem] = useState({
    code: "",
    description: "",
    unit: "",
    category: ""
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [showItemForm, setShowItemForm] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Basic Info, 2: Items, 3: Review

  const filteredItems = mockItems.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddTag = () => {
    if (newTag.trim() && !templateData.tags.includes(newTag.trim())) {
      setTemplateData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTemplateData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleAddItem = () => {
    if (newItem.code && newItem.description && newItem.unit && newItem.category) {
      const item = {
        id: Date.now().toString(),
        ...newItem
      }
      setTemplateData(prev => ({
        ...prev,
        items: [...prev.items, item]
      }))
      setNewItem({ code: "", description: "", unit: "", category: "" })
      setShowItemForm(false)
    }
  }

  const handleRemoveItem = (itemId: string) => {
    setTemplateData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }))
  }

  const handleAddFromLibrary = (item: any) => {
    const newItem = {
      id: Date.now().toString(),
      code: item.code,
      description: item.description,
      unit: item.unit,
      category: item.category
    }
    setTemplateData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const handleSaveTemplate = () => {
    console.log("Saving template:", templateData)
    // محاكاة حفظ القالب
    alert("تم حفظ القالب بنجاح!")
  }

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category)
    return cat ? cat.color : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/projects/bom/templates">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                العودة للقوالب
              </Button>
            </Link>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Plus className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">قالب جديد</h1>
              <p className="text-indigo-100 text-lg">إنشاء قالب مخصص لحصر الكميات</p>
            </div>
          </div>
          <div className="hidden lg:flex gap-3">
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
              <Eye className="h-5 w-5 mr-2" />
              معاينة
            </Button>
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg">
              <Save className="h-5 w-5 mr-2" />
              حفظ القالب
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= step 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`w-16 h-1 mx-2 ${
                currentStep > step ? 'bg-indigo-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-indigo-600" />
                المعلومات الأساسية
              </CardTitle>
              <CardDescription>بيانات القالب الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم القالب</label>
                <Input
                  value={templateData.name}
                  onChange={(e) => setTemplateData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="مثال: قالب الخرسانة المتقدم"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف القالب</label>
                <Textarea
                  value={templateData.description}
                  onChange={(e) => setTemplateData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="وصف مختصر للقالب..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التصنيف</label>
                <select
                  value={templateData.category}
                  onChange={(e) => setTemplateData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">اختر التصنيف</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصول</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="access"
                      checked={templateData.isPublic}
                      onChange={() => setTemplateData(prev => ({ ...prev, isPublic: true }))}
                      className="rounded"
                    />
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-green-600" />
                      <span className="text-sm">عام (متاح للجميع)</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="access"
                      checked={!templateData.isPublic}
                      onChange={() => setTemplateData(prev => ({ ...prev, isPublic: false }))}
                      className="rounded"
                    />
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-red-600" />
                      <span className="text-sm">خاص (فقط لي)</span>
                    </div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-6 w-6 text-purple-600" />
                العلامات
              </CardTitle>
              <CardDescription>علامات لتصنيف القالب</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="أضف علامة جديدة..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {templateData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">نصائح للعلامات:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• استخدم كلمات مفتاحية واضحة</li>
                      <li>• مثال: خرسانة، حديد، أساسات</li>
                      <li>• العلامات تساعد في البحث والتصنيف</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Add Items */}
      {currentStep === 2 && (
        <div className="space-y-6">
          {/* Add New Item Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-6 w-6 text-green-600" />
                إضافة عنصر جديد
              </CardTitle>
              <CardDescription>أضف عنصر جديد للقالب</CardDescription>
            </CardHeader>
            <CardContent>
              {!showItemForm ? (
                <Button onClick={() => setShowItemForm(true)} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة عنصر جديد
                </Button>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">كود العنصر</label>
                    <Input
                      value={newItem.code}
                      onChange={(e) => setNewItem(prev => ({ ...prev, code: e.target.value }))}
                      placeholder="CON-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">وصف العنصر</label>
                    <Input
                      value={newItem.description}
                      onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="خرسانة عادية C25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الوحدة</label>
                    <select
                      value={newItem.unit}
                      onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">اختر الوحدة</option>
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">التصنيف</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">اختر التصنيف</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-full flex gap-2">
                    <Button onClick={handleAddItem} className="flex-1">
                      <Plus className="h-4 w-4 mr-2" />
                      إضافة
                    </Button>
                    <Button variant="outline" onClick={() => setShowItemForm(false)}>
                      إلغاء
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Items Library */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-6 w-6 text-blue-600" />
                مكتبة العناصر
              </CardTitle>
              <CardDescription>اختر من العناصر المتاحة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="البحث في العناصر..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <div key={item.code} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{item.code}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddFromLibrary(item)}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{item.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Template Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-6 w-6 text-purple-600" />
                عناصر القالب الحالي
              </CardTitle>
              <CardDescription>{templateData.items.length} عنصر في القالب</CardDescription>
            </CardHeader>
            <CardContent>
              {templateData.items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>لا توجد عناصر في القالب بعد</p>
                  <p className="text-sm">أضف عناصر من الأعلى</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {templateData.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm">{item.code}</span>
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-xs text-gray-500">{item.unit}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Review and Save */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                مراجعة القالب
              </CardTitle>
              <CardDescription>راجع بيانات القالب قبل الحفظ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">المعلومات الأساسية</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">الاسم:</span> {templateData.name}</p>
                    <p><span className="font-medium">الوصف:</span> {templateData.description}</p>
                    <p><span className="font-medium">التصنيف:</span> {templateData.category}</p>
                    <p><span className="font-medium">الوصول:</span> {templateData.isPublic ? "عام" : "خاص"}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">العلامات</h3>
                  <div className="flex flex-wrap gap-1">
                    {templateData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">العناصر ({templateData.items.length})</h3>
                <div className="space-y-2">
                  {templateData.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm">{item.code}</span>
                        <span className="text-sm">{item.description}</span>
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{item.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              السابق
            </Button>
            <Button onClick={handleSaveTemplate} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              حفظ القالب
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        {currentStep > 1 && (
          <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
            السابق
          </Button>
        )}
        {currentStep < 3 && (
          <Button onClick={() => setCurrentStep(currentStep + 1)}>
            التالي
          </Button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/projects/bom/templates">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold">القوالب</h3>
                  <p className="text-sm text-gray-600">عرض جميع القوالب</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/bom">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Ruler className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">قائمة BOQ</h3>
                  <p className="text-sm text-gray-600">عرض حصر الكميات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/bom/import">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">استيراد</h3>
                  <p className="text-sm text-gray-600">استيراد BOQ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المشاريع</h3>
                  <p className="text-sm text-gray-600">العودة للمشاريع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

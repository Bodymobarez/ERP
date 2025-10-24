"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  FileText,
  FileSpreadsheet,
  Settings,
  Search,
  Filter,
  Building2,
  Ruler,
  Calculator,
  Package,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Star,
  StarOff,
  Users,
  Calendar,
  Tag,
  Info,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockTemplates = [
  {
    id: "1",
    name: "قالب الخرسانة الأساسي",
    description: "قالب شامل لجميع أعمال الخرسانة والحديد",
    category: "خرسانة",
    itemCount: 45,
    isDefault: true,
    isPublic: true,
    createdBy: "م. أحمد محمد",
    createdAt: "2024-01-15",
    lastUsed: "2024-01-20",
    usageCount: 25,
    rating: 4.8,
    tags: ["خرسانة", "حديد", "أساسات", "أعمدة"],
    templateItems: [
      { code: "CON-001", description: "خرسانة عادية C25", unit: "م³", category: "خرسانة" },
      { code: "CON-002", description: "خرسانة مسلحة C30", unit: "م³", category: "خرسانة" },
      { code: "STEEL-001", description: "حديد تسليح 12مم", unit: "طن", category: "حديد" },
      { code: "STEEL-002", description: "حديد تسليح 16مم", unit: "طن", category: "حديد" }
    ]
  },
  {
    id: "2",
    name: "قالب التشطيب الداخلي",
    description: "مواد التشطيب الداخلي والخارجي",
    category: "تشطيب",
    itemCount: 38,
    isDefault: false,
    isPublic: true,
    createdBy: "م. فاطمة أحمد",
    createdAt: "2024-01-10",
    lastUsed: "2024-01-18",
    usageCount: 18,
    rating: 4.6,
    tags: ["تشطيب", "دهانات", "بلاط", "رخام"],
    templateItems: [
      { code: "FIN-001", description: "دهان داخلي", unit: "م²", category: "دهانات" },
      { code: "FIN-002", description: "بلاط سيراميك", unit: "م²", category: "بلاط" },
      { code: "FIN-003", description: "رخام طبيعي", unit: "م²", category: "رخام" }
    ]
  },
  {
    id: "3",
    name: "قالب الكهرباء الشامل",
    description: "جميع التمديدات الكهربائية",
    category: "كهرباء",
    itemCount: 28,
    isDefault: false,
    isPublic: false,
    createdBy: "م. محمد علي",
    createdAt: "2024-01-08",
    lastUsed: "2024-01-15",
    usageCount: 12,
    rating: 4.9,
    tags: ["كهرباء", "تمديدات", "أجهزة", "إضاءة"],
    templateItems: [
      { code: "ELEC-001", description: "كابل كهربائي 2.5مم²", unit: "متر", category: "كابلات" },
      { code: "ELEC-002", description: "مفتاح كهربائي", unit: "قطعة", category: "أجهزة" },
      { code: "ELEC-003", description: "لمبة LED", unit: "قطعة", category: "إضاءة" }
    ]
  },
  {
    id: "4",
    name: "قالب السباكة المتقدم",
    description: "تمديدات المياه والصرف الصحي",
    category: "سباكة",
    itemCount: 22,
    isDefault: false,
    isPublic: true,
    createdBy: "م. سارة خالد",
    createdAt: "2024-01-05",
    lastUsed: "2024-01-12",
    usageCount: 8,
    rating: 4.7,
    tags: ["سباكة", "مواسير", "أدوات صحية", "صرف"],
    templateItems: [
      { code: "PLUM-001", description: "مواسير PVC", unit: "متر", category: "مواسير" },
      { code: "PLUM-002", description: "حوض حمام", unit: "قطعة", category: "أدوات صحية" },
      { code: "PLUM-003", description: "مواسير صرف", unit: "متر", category: "صرف" }
    ]
  }
]

const categories = [
  { id: "all", name: "الكل", count: 4 },
  { id: "خرسانة", name: "خرسانة", count: 1 },
  { id: "تشطيب", name: "تشطيب", count: 1 },
  { id: "كهرباء", name: "كهرباء", count: 1 },
  { id: "سباكة", name: "سباكة", count: 1 }
]

export default function BOMTemplatesPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "created":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "usage":
        return b.usageCount - a.usageCount
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  const handleSelectAll = () => {
    if (selectedTemplates.length === sortedTemplates.length) {
      setSelectedTemplates([])
    } else {
      setSelectedTemplates(sortedTemplates.map(template => template.id))
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "خرسانة": return "bg-blue-100 text-blue-800"
      case "تشطيب": return "bg-green-100 text-green-800"
      case "كهرباء": return "bg-yellow-100 text-yellow-800"
      case "سباكة": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">قوالب حصر الكميات</h1>
              <p className="text-indigo-100 text-lg">إدارة قوالب BOQ الجاهزة والمخصصة</p>
            </div>
          </div>
          <div className="hidden lg:flex gap-3">
            <Link href="/dashboard/projects/bom/templates/new">
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                قالب جديد
              </Button>
            </Link>
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
              <Upload className="h-5 w-5 mr-2" />
              استيراد قالب
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">إجمالي القوالب</p>
                <p className="text-4xl font-bold text-gray-900">{mockTemplates.length}</p>
                <p className="text-xs text-indigo-600 mt-2">قالب متاح</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">القوالب العامة</p>
                <p className="text-4xl font-bold text-green-600">{mockTemplates.filter(t => t.isPublic).length}</p>
                <p className="text-xs text-green-600 mt-2">متاحة للجميع</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">إجمالي الاستخدام</p>
                <p className="text-4xl font-bold text-blue-600">{mockTemplates.reduce((sum, t) => sum + t.usageCount, 0)}</p>
                <p className="text-xs text-blue-600 mt-2">مرة استخدام</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <Calculator className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">متوسط التقييم</p>
                <p className="text-4xl font-bold text-purple-600">4.8</p>
                <p className="text-xs text-purple-600 mt-2">من 5 نجوم</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في القوالب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="name">الاسم</option>
            <option value="created">تاريخ الإنشاء</option>
            <option value="usage">عدد الاستخدام</option>
            <option value="rating">التقييم</option>
          </select>
          
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 ${viewMode === "grid" ? "bg-indigo-500 text-white" : "bg-white"}`}
            >
              <Package className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 ${viewMode === "list" ? "bg-indigo-500 text-white" : "bg-white"}`}
            >
              <FileText className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Templates Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTemplates.map((template) => (
            <Card key={template.id} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg text-gray-900">{template.name}</h3>
                      {template.isDefault && (
                        <Badge className="bg-yellow-100 text-yellow-800">افتراضي</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category}
                      </Badge>
                      <Badge variant="outline">{template.itemCount} عنصر</Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">التقييم:</span>
                    <div className="flex items-center gap-2">
                      {renderStars(template.rating)}
                      <span className="font-semibold">{template.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">الاستخدام:</span>
                    <span className="font-semibold">{template.usageCount} مرة</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">المنشئ:</span>
                    <span className="font-semibold">{template.createdBy}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    عرض
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    نسخ
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedTemplates.includes(template.id)}
                      onChange={() => handleSelectTemplate(template.id)}
                      className="rounded"
                    />
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <FileText className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{template.name}</h3>
                        {template.isDefault && (
                          <Badge className="bg-yellow-100 text-yellow-800">افتراضي</Badge>
                        )}
                        <Badge className={getCategoryColor(template.category)}>
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{template.itemCount} عنصر</span>
                        <span>•</span>
                        <span>{template.usageCount} استخدام</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          {renderStars(template.rating)}
                          <span>{template.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      عرض
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      نسخ
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      تعديل
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Bulk Actions */}
      {selectedTemplates.length > 0 && (
        <Card className="bg-indigo-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-indigo-800">
                  {selectedTemplates.length} قالب محدد
                </span>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  نسخ المحدد
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  تصدير المحدد
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  حذف المحدد
                </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedTemplates([])}>
                إلغاء التحديد
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/projects/bom/templates/new">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Plus className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold">قالب جديد</h3>
                  <p className="text-sm text-gray-600">إنشاء قالب مخصص</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/bom/templates/import">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Upload className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">استيراد قالب</h3>
                  <p className="text-sm text-gray-600">رفع قالب من ملف</p>
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
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">قائمة BOQ</h3>
                  <p className="text-sm text-gray-600">عرض حصر الكميات</p>
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

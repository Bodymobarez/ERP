"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Download,
  FileText,
  FileSpreadsheet,
  File,
  Settings,
  Filter,
  Search,
  Calendar,
  Building2,
  Ruler,
  Calculator,
  Package,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Plus,
  X,
  Info,
  Clock,
  User,
  MapPin
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockProjects = [
  { id: "1", name: "البرج السكني - الرياض", code: "PRJ-001", status: "active", items: 45 },
  { id: "2", name: "مجمع الفلل - جدة", code: "PRJ-002", status: "active", items: 38 },
  { id: "3", name: "المجمع التجاري - الدمام", code: "PRJ-003", status: "completed", items: 52 }
]

const mockBOQItems = [
  {
    id: "1",
    itemCode: "CON-001",
    description: "خرسانة عادية C25",
    unit: "م³",
    quantity: 150.5,
    unitPrice: 450,
    totalPrice: 67725,
    category: "خرسانة",
    phase: "الأساسات",
    supplier: "شركة الخرسانة المتحدة"
  },
  {
    id: "2",
    itemCode: "STEEL-001", 
    description: "حديد تسليح 12مم",
    unit: "طن",
    quantity: 25.8,
    unitPrice: 2800,
    totalPrice: 72240,
    category: "حديد",
    phase: "الهيكل",
    supplier: "مصنع الحديد الوطني"
  },
  {
    id: "3",
    itemCode: "BLOCK-001",
    description: "طوب أحمر 20×10×6",
    unit: "قطعة",
    quantity: 5000,
    unitPrice: 2.5,
    totalPrice: 12500,
    category: "طوب",
    phase: "البناء",
    supplier: "مصنع الطوب الحديث"
  },
  {
    id: "4",
    itemCode: "ELEC-001",
    description: "كابل كهربائي 2.5مم²",
    unit: "متر",
    quantity: 500,
    unitPrice: 15,
    totalPrice: 7500,
    category: "كهرباء",
    phase: "التمديدات",
    supplier: "شركة الكهرباء المتقدمة"
  }
]

const exportFormats = [
  { id: "excel", name: "Excel", icon: FileSpreadsheet, description: "ملف Excel قابل للتعديل", color: "bg-green-500" },
  { id: "pdf", name: "PDF", icon: File, description: "تقرير PDF للطباعة", color: "bg-red-500" },
  { id: "csv", name: "CSV", icon: FileText, description: "ملف CSV للاستيراد", color: "bg-blue-500" }
]

const exportTemplates = [
  { id: "detailed", name: "تقرير مفصل", description: "تقرير شامل مع جميع التفاصيل" },
  { id: "summary", name: "ملخص تنفيذي", description: "ملخص سريع للمديرين" },
  { id: "supplier", name: "للموردين", description: "تقرير مخصص للموردين" },
  { id: "client", name: "للعميل", description: "تقرير مخصص للعميل" }
]

export default function BOMExportPage() {
  const { t, lang } = useLanguage()
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPhase, setSelectedPhase] = useState("all")
  const [exportOptions, setExportOptions] = useState({
    includePricing: true,
    includeSupplier: true,
    includePhase: true,
    includeCategory: true,
    groupByCategory: false,
    groupByPhase: false,
    addSummary: true,
    addCharts: false
  })

  const filteredItems = mockBOQItems.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesPhase = selectedPhase === "all" || item.phase === selectedPhase
    return matchesSearch && matchesCategory && matchesPhase
  })

  const categories = [...new Set(mockBOQItems.map(item => item.category))]
  const phases = [...new Set(mockBOQItems.map(item => item.phase))]

  const totalItems = filteredItems.length
  const selectedCount = selectedItems.length
  const totalValue = filteredItems.reduce((sum, item) => sum + item.totalPrice, 0)
  const selectedValue = filteredItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.totalPrice, 0)

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map(item => item.id))
    }
  }

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleExport = () => {
    // محاكاة عملية التصدير
    console.log("Exporting...", {
      project: selectedProject,
      format: selectedFormat,
      template: selectedTemplate,
      items: selectedItems,
      options: exportOptions
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "نشط"
      case "completed": return "مكتمل"
      case "pending": return "معلق"
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Download className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">تصدير حصر الكميات</h1>
              <p className="text-green-100 text-lg">تصدير BOQ بصيغ مختلفة</p>
            </div>
          </div>
          <div className="hidden lg:flex gap-3">
            <Link href="/dashboard/projects/bom">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                <FileText className="h-5 w-5 mr-2" />
                قائمة BOQ
              </Button>
            </Link>
            <Button className="bg-white text-green-600 hover:bg-green-50 shadow-lg">
              <Settings className="h-5 w-5 mr-2" />
              إعدادات التصدير
            </Button>
          </div>
        </div>
      </div>

      {/* Export Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              اختيار المشروع
            </CardTitle>
            <CardDescription>اختر المشروع المراد تصدير حصر الكميات منه</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">اختر المشروع</option>
              {mockProjects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            
            {selectedProject && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-blue-800">
                    {mockProjects.find(p => p.id === selectedProject)?.name}
                  </h3>
                  <Badge className={getStatusColor(mockProjects.find(p => p.id === selectedProject)?.status || "")}>
                    {getStatusLabel(mockProjects.find(p => p.id === selectedProject)?.status || "")}
                  </Badge>
                </div>
                <p className="text-sm text-blue-600">
                  {mockProjects.find(p => p.id === selectedProject)?.items} عنصر
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Export Format */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-6 w-6 text-green-600" />
              صيغة التصدير
            </CardTitle>
            <CardDescription>اختر الصيغة المناسبة للتصدير</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {exportFormats.map((format) => {
              const Icon = format.icon
              return (
                <div
                  key={format.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedFormat === format.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${format.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{format.name}</h4>
                      <p className="text-sm text-gray-600">{format.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Export Template */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-purple-600" />
              قالب التصدير
            </CardTitle>
            <CardDescription>اختر نوع التقرير المطلوب</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {exportTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedTemplate === template.id 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <h4 className="font-semibold">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-orange-600" />
            خيارات التصدير
          </CardTitle>
          <CardDescription>تخصيص محتوى التقرير</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.includePricing}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includePricing: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">تضمين الأسعار</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.includeSupplier}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeSupplier: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">تضمين الموردين</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.includePhase}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includePhase: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">تضمين المراحل</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.includeCategory}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeCategory: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">تضمين التصنيف</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.groupByCategory}
                onChange={(e) => setExportOptions(prev => ({ ...prev, groupByCategory: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">تجميع بالتصنيف</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.groupByPhase}
                onChange={(e) => setExportOptions(prev => ({ ...prev, groupByPhase: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">تجميع بالمرحلة</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.addSummary}
                onChange={(e) => setExportOptions(prev => ({ ...prev, addSummary: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">إضافة ملخص</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.addCharts}
                onChange={(e) => setExportOptions(prev => ({ ...prev, addCharts: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">إضافة الرسوم البيانية</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Items Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            اختيار العناصر
          </CardTitle>
          <CardDescription>اختر العناصر المراد تصديرها</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
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
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">جميع التصنيفات</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">جميع المراحل</option>
              {phases.map(phase => (
                <option key={phase} value={phase}>{phase}</option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Package className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
              <p className="text-sm text-gray-600">إجمالي العناصر</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{selectedCount}</p>
              <p className="text-sm text-gray-600">محدد</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Calculator className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{totalValue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">إجمالي القيمة</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{selectedValue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">قيمة المحدد</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="text-right p-3 font-semibold">الكود</th>
                  <th className="text-right p-3 font-semibold">الوصف</th>
                  <th className="text-right p-3 font-semibold">الوحدة</th>
                  <th className="text-right p-3 font-semibold">الكمية</th>
                  <th className="text-right p-3 font-semibold">سعر الوحدة</th>
                  <th className="text-right p-3 font-semibold">الإجمالي</th>
                  <th className="text-right p-3 font-semibold">التصنيف</th>
                  <th className="text-right p-3 font-semibold">المرحلة</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="p-3 font-mono text-sm">{item.itemCode}</td>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3">{item.unit}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">{item.unitPrice.toLocaleString()} ريال</td>
                    <td className="p-3 font-semibold">{item.totalPrice.toLocaleString()} ريال</td>
                    <td className="p-3">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{item.phase}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            معاينة
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            إعدادات متقدمة
          </Button>
        </div>
        <Button 
          onClick={handleExport}
          disabled={!selectedProject || !selectedFormat || selectedItems.length === 0}
          className="bg-green-600 hover:bg-green-700"
        >
          <Download className="h-4 w-4 mr-2" />
          تصدير الملف
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

        <Link href="/dashboard/projects/bom/import">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">استيراد</h3>
                  <p className="text-sm text-gray-600">استيراد BOQ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/bom/templates">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileSpreadsheet className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">القوالب</h3>
                  <p className="text-sm text-gray-600">إدارة القوالب</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-orange-600" />
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

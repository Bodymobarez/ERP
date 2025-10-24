"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Upload,
  Download,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  Eye,
  Edit,
  Trash2,
  Plus,
  Ruler,
  Calculator,
  Package,
  Building2,
  FileSpreadsheet,
  Database,
  Settings,
  Info
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockProjects = [
  { id: "1", name: "البرج السكني - الرياض", code: "PRJ-001" },
  { id: "2", name: "مجمع الفلل - جدة", code: "PRJ-002" },
  { id: "3", name: "المجمع التجاري - الدمام", code: "PRJ-003" }
]

const mockTemplates = [
  { id: "1", name: "قالب الخرسانة", description: "حصر كميات الخرسانة والحديد", items: 25 },
  { id: "2", name: "قالب التشطيب", description: "مواد التشطيب الداخلي والخارجي", items: 40 },
  { id: "3", name: "قالب الكهرباء", description: "التمديدات الكهربائية", items: 15 },
  { id: "4", name: "قالب السباكة", description: "تمديدات المياه والصرف", items: 20 }
]

const mockImportedItems = [
  {
    id: "1",
    itemCode: "CON-001",
    description: "خرسانة عادية C25",
    unit: "م³",
    quantity: 150.5,
    unitPrice: 450,
    totalPrice: 67725,
    category: "خرسانة",
    status: "imported"
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
    status: "imported"
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
    status: "pending"
  }
]

export default function BOMImportPage() {
  const { t, lang } = useLanguage()
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [importedItems, setImportedItems] = useState(mockImportedItems)
  const [importStep, setImportStep] = useState(1) // 1: Select, 2: Upload, 3: Review, 4: Complete

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setImportStep(2)
    }
  }

  const handleImport = () => {
    // محاكاة عملية الاستيراد
    setImportStep(3)
  }

  const handleConfirmImport = () => {
    setImportStep(4)
  }

  const removeItem = (id: string) => {
    setImportedItems(prev => prev.filter(item => item.id !== id))
  }

  const updateItem = (id: string, field: string, value: any) => {
    setImportedItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "imported": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "error": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "imported": return "مستورد"
      case "pending": return "معلق"
      case "error": return "خطأ"
      default: return status
    }
  }

  const totalItems = importedItems.length
  const importedCount = importedItems.filter(item => item.status === 'imported').length
  const pendingCount = importedItems.filter(item => item.status === 'pending').length
  const totalValue = importedItems.reduce((sum, item) => sum + item.totalPrice, 0)

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Ruler className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">استيراد حصر الكميات</h1>
              <p className="text-purple-100 text-lg">استيراد BOQ من ملفات Excel أو CSV</p>
            </div>
          </div>
          <div className="hidden lg:flex gap-3">
            <Link href="/dashboard/projects/bom">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                <FileText className="h-5 w-5 mr-2" />
                قائمة BOQ
              </Button>
            </Link>
            <Button className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg">
              <Download className="h-5 w-5 mr-2" />
              تحميل قالب
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              importStep >= step 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-1 mx-2 ${
                importStep > step ? 'bg-purple-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Project and Template Selection */}
      {importStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                اختيار المشروع
              </CardTitle>
              <CardDescription>اختر المشروع المراد إضافة حصر الكميات له</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المشروع</label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">اختر المشروع</option>
                  {mockProjects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedProject && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">معلومات المشروع</h3>
                  <p className="text-sm text-blue-600">
                    {mockProjects.find(p => p.id === selectedProject)?.name}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-6 w-6 text-green-600" />
                قوالب جاهزة
              </CardTitle>
              <CardDescription>اختر قالب جاهز أو ابدأ من الصفر</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {mockTemplates.map(template => (
                  <div
                    key={template.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <h4 className="font-semibold text-sm">{template.name}</h4>
                    <p className="text-xs text-gray-600">{template.description}</p>
                    <p className="text-xs text-purple-600 mt-1">{template.items} عنصر</p>
                  </div>
                ))}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">بدء من الصفر</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: File Upload */}
      {importStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-6 w-6 text-purple-600" />
              رفع الملف
            </CardTitle>
            <CardDescription>ارفع ملف Excel أو CSV يحتوي على حصر الكميات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 inline-block"
              >
                اختر الملف
              </label>
              <p className="text-sm text-gray-600 mt-2">
                يدعم ملفات Excel (.xlsx, .xls) و CSV
              </p>
            </div>

            {uploadedFile && (
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">تم رفع الملف بنجاح</p>
                    <p className="text-sm text-green-600">{uploadedFile.name}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">تنسيق الملف المطلوب:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• العمود الأول: كود العنصر</li>
                    <li>• العمود الثاني: وصف العنصر</li>
                    <li>• العمود الثالث: الوحدة</li>
                    <li>• العمود الرابع: الكمية</li>
                    <li>• العمود الخامس: سعر الوحدة</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setImportStep(1)}>
                السابق
              </Button>
              <Button onClick={handleImport} disabled={!uploadedFile}>
                معالجة الملف
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review and Edit */}
      {importStep === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-blue-600" />
                مراجعة البيانات المستوردة
              </CardTitle>
              <CardDescription>راجع وعدّل البيانات قبل الحفظ النهائي</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
                  <p className="text-sm text-gray-600">إجمالي العناصر</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{importedCount}</p>
                  <p className="text-sm text-gray-600">مستورد</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                  <p className="text-sm text-gray-600">يحتاج مراجعة</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Calculator className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">{totalValue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">إجمالي القيمة</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-semibold">الكود</th>
                      <th className="text-right p-3 font-semibold">الوصف</th>
                      <th className="text-right p-3 font-semibold">الوحدة</th>
                      <th className="text-right p-3 font-semibold">الكمية</th>
                      <th className="text-right p-3 font-semibold">سعر الوحدة</th>
                      <th className="text-right p-3 font-semibold">الإجمالي</th>
                      <th className="text-right p-3 font-semibold">الحالة</th>
                      <th className="text-right p-3 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importedItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <Input
                            value={item.itemCode}
                            onChange={(e) => updateItem(item.id, 'itemCode', e.target.value)}
                            className="w-24 text-sm"
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            className="w-48 text-sm"
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            value={item.unit}
                            onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                            className="w-16 text-sm"
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                            className="w-20 text-sm"
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                            className="w-24 text-sm"
                          />
                        </td>
                        <td className="p-3 font-semibold">
                          {(item.quantity * item.unitPrice).toLocaleString()} ريال
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(item.status)}>
                            {getStatusLabel(item.status)}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setImportStep(2)}>
              السابق
            </Button>
            <Button onClick={handleConfirmImport} className="bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              تأكيد الاستيراد
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Import Complete */}
      {importStep === 4 && (
        <Card className="text-center">
          <CardContent className="py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">تم الاستيراد بنجاح!</h2>
            <p className="text-gray-600 mb-6">
              تم استيراد {totalItems} عنصر بنجاح إلى حصر الكميات
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Package className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
                <p className="text-sm text-gray-600">عنصر</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{importedCount}</p>
                <p className="text-sm text-gray-600">مستورد</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Calculator className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">{totalValue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">ريال</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard/projects/bom">
                <Button>
                  <Eye className="h-4 w-4 mr-2" />
                  عرض حصر الكميات
                </Button>
              </Link>
              <Button variant="outline" onClick={() => setImportStep(1)}>
                <Plus className="h-4 w-4 mr-2" />
                استيراد جديد
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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

        <Link href="/dashboard/projects/bom/export">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تصدير</h3>
                  <p className="text-sm text-gray-600">تصدير BOQ</p>
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

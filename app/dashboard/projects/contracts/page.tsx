"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Search,
  Filter,
  Download,
  Plus,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  Eye,
  Edit,
  AlertTriangle,
  Users,
  HardHat,
  Building,
  X,
  MapPin,
  Phone,
  Mail,
  Star
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for project contracts
const mockProjectContracts = [
  {
    id: "PC-2024-001",
    title: "عقد أعمال الخرسانة - البرج السكني",
    projectId: "PRJ-001",
    projectName: "البرج السكني - الرياض",
    contractorId: "SUB-001",
    contractorName: "مؤسسة البناء المتقن",
    contractType: "subcontract",
    category: "خرسانة",
    value: 850000,
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    progress: 65,
    description: "أعمال صب الخرسانة للأدوار من الأساس حتى الدور العاشر",
    contactPerson: "م. أحمد عبدالله", 
    phone: "0501234567",
    email: "ahmed@precision-build.com",
    paymentTerms: "دفع شهري حسب نسبة الإنجاز",
    deliverables: [
      "أعمال الأساسات",
      "أعمال الأعمدة والجسور",
      "أعمال البلاطات",
      "أعمال التشطيبات الخرسانية"
    ],
    milestones: [
      { name: "إنجاز الأساسات", date: "2024-02-15", status: "completed" },
      { name: "إنجاز الهيكل الخرساني", date: "2024-04-30", status: "in-progress" },
      { name: "التشطيبات النهائية", date: "2024-06-15", status: "pending" }
    ]
  },
  {
    id: "PC-2024-002", 
    title: "عقد الأعمال الكهربائية - المجمع التجاري",
    projectId: "PRJ-002",
    projectName: "المجمع التجاري - الدمام",
    contractorId: "SUB-002",
    contractorName: "مؤسسة الكهرباء المتطورة", 
    contractType: "subcontract",
    category: "كهرباء",
    value: 450000,
    status: "pending",
    startDate: "2024-02-01",
    endDate: "2024-07-31",
    progress: 30,
    description: "تركيب وتوصيل الأنظمة الكهربائية للمجمع التجاري",
    contactPerson: "م. سارة أحمد",
    phone: "0503456789", 
    email: "sara@advanced-electric.com",
    paymentTerms: "دفع على مراحل حسب التسليم",
    deliverables: [
      "تمديد الكابلات الرئيسية",
      "تركيب اللوحات الكهربائية",
      "أنظمة الإنارة",
      "أنظمة التكييف الكهربائية"
    ],
    milestones: [
      { name: "التمديدات الأساسية", date: "2024-03-15", status: "completed" },
      { name: "تركيب اللوحات", date: "2024-05-15", status: "in-progress" },
      { name: "اختبار الأنظمة", date: "2024-07-31", status: "pending" }
    ]
  },
  {
    id: "PC-2024-003",
    title: "عقد أعمال السباكة - الفيلا السكنية",
    projectId: "PRJ-003", 
    projectName: "الفيلا السكنية - جدة",
    contractorId: "SUB-003",
    contractorName: "شركة السباكة الماهرة",
    contractType: "subcontract",
    category: "سباكة",
    value: 120000,
    status: "completed",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    progress: 100,
    description: "تركيب أنظمة السباكة والصرف الصحي",
    contactPerson: "خالد عمر",
    phone: "0506543210",
    email: "khalid@expert-plumbing.com", 
    paymentTerms: "دفعة مقدمة ودفعة عند التسليم",
    deliverables: [
      "تمديد المياه",
      "أنظمة الصرف الصحي", 
      "تركيب الأدوات الصحية",
      "اختبار الضغط"
    ],
    milestones: [
      { name: "التمديدات الأساسية", date: "2023-12-01", status: "completed" },
      { name: "تركيب الأدوات", date: "2024-01-15", status: "completed" },
      { name: "الاختبار النهائي", date: "2024-01-31", status: "completed" }
    ]
  },
  {
    id: "PC-2024-004",
    title: "عقد أعمال الدهانات - المكتب الإداري",
    projectId: "PRJ-004",
    projectName: "المكتب الإداري - الخبر", 
    contractorId: "SUB-004",
    contractorName: "مقاولات الدهانات الحديثة",
    contractType: "subcontract",
    category: "دهانات",
    value: 95000,
    status: "on-hold",
    startDate: "2024-03-01",
    endDate: "2024-04-30",
    progress: 15,
    description: "أعمال الدهانات الداخلية والخارجية للمكتب",
    contactPerson: "محمد خالد",
    phone: "0509876543",
    email: "mohammed@modern-paint.com",
    paymentTerms: "دفع أسبوعي حسب المراحل المنجزة",
    deliverables: [
      "تحضير الأسطح",
      "دهان الجدران الداخلية",
      "دهان الواجهات الخارجية", 
      "أعمال الديكور"
    ],
    milestones: [
      { name: "تحضير الأسطح", date: "2024-03-15", status: "completed" },
      { name: "الدهان الداخلي", date: "2024-04-15", status: "on-hold" },
      { name: "الدهان الخارجي", date: "2024-04-30", status: "pending" }
    ]
  }
]

export default function ProjectContractsPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const filteredContracts = mockProjectContracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || contract.status === selectedStatus
    const matchesCategory = selectedCategory === "all" || contract.category === selectedCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = {
    total: mockProjectContracts.length,
    active: mockProjectContracts.filter(c => c.status === 'active').length,
    completed: mockProjectContracts.filter(c => c.status === 'completed').length,
    pending: mockProjectContracts.filter(c => c.status === 'pending').length,
    onHold: mockProjectContracts.filter(c => c.status === 'on-hold').length,
    totalValue: mockProjectContracts.reduce((sum, c) => sum + c.value, 0),
    avgProgress: mockProjectContracts.reduce((sum, c) => sum + c.progress, 0) / mockProjectContracts.length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "on-hold": return "bg-red-100 text-red-800"
      case "cancelled": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "نشط"
      case "completed": return "مكتمل"
      case "pending": return "معلق"
      case "on-hold": return "متوقف"
      case "cancelled": return "ملغي"
      default: return status
    }
  }

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600"
      case "in-progress": return "text-blue-600"
      case "on-hold": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const getMilestoneStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "مكتمل"
      case "in-progress": return "جاري"
      case "on-hold": return "متوقف"
      default: return "معلق"
    }
  }

  // Details Modal Component
  const DetailsModal = () => {
    if (!selectedContract) return null
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">تفاصيل العقد</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowDetailsModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Contract Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  معلومات العقد
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">رقم العقد:</span>
                    <span className="font-medium">{selectedContract.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">عنوان العقد:</span>
                    <span className="font-medium">{selectedContract.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">النوع:</span>
                    <Badge variant="outline">{selectedContract.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الحالة:</span>
                    <Badge className={getStatusColor(selectedContract.status)}>
                      {getStatusLabel(selectedContract.status)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">القيمة:</span>
                    <span className="font-bold text-green-600">{formatCurrency(selectedContract.value)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Building className="h-5 w-5 text-purple-500" />
                  المشروع والمقاول
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المشروع:</span>
                    <span className="font-medium">{selectedContract.projectName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المقاول:</span>
                    <span className="font-medium">{selectedContract.contractorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الشخص المسؤول:</span>
                    <span className="font-medium">{selectedContract.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الهاتف:</span>
                    <span className="font-medium direction-ltr text-right">{selectedContract.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">البريد:</span>
                    <span className="font-medium text-sm">{selectedContract.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-green-500" />
                التواريخ والتقدم
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">تاريخ البداية</p>
                  <p className="font-bold text-blue-600">{selectedContract.startDate}</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">تاريخ النهاية</p>
                  <p className="font-bold text-orange-600">{selectedContract.endDate}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">نسبة الإنجاز</p>
                  <p className="font-bold text-green-600">{selectedContract.progress}%</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${selectedContract.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">وصف العقد</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedContract.description}</p>
            </div>

            {/* Deliverables */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">المخرجات المطلوبة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedContract.deliverables.map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">المعالم الرئيسية</h3>
              <div className="space-y-3">
                {selectedContract.milestones.map((milestone: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{milestone.name}</h4>
                      <Badge className={`${getMilestoneStatusColor(milestone.status)} bg-transparent border`}>
                        {getMilestoneStatusLabel(milestone.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>الموعد المستهدف: {milestone.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Terms */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">شروط الدفع</h3>
              <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                {selectedContract.paymentTerms}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Edit Modal Component
  const EditModal = () => {
    if (!selectedContract) return null
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">تعديل العقد</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowEditModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عنوان العقد</label>
                  <Input defaultValue={selectedContract.title} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">القيمة</label>
                  <Input type="number" defaultValue={selectedContract.value} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ البداية</label>
                  <Input type="date" defaultValue={selectedContract.startDate} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ النهاية</label>
                  <Input type="date" defaultValue={selectedContract.endDate} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نسبة الإنجاز</label>
                  <Input type="number" min="0" max="100" defaultValue={selectedContract.progress} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedContract.status}
                  >
                    <option value="active">نشط</option>
                    <option value="pending">معلق</option>
                    <option value="completed">مكتمل</option>
                    <option value="on-hold">متوقف</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  defaultValue={selectedContract.description}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">شروط الدفع</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  defaultValue={selectedContract.paymentTerms}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  حفظ التعديلات
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowEditModal(false)}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للمشاريع
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">عقود المشاريع</h1>
          <p className="text-gray-600 mt-1">إدارة ومتابعة عقود المقاولين في المشاريع</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي العقود</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">عقود نشطة</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مكتملة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معلقة</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">القيمة الإجمالية</p>
                <p className="text-lg font-bold text-purple-600">{formatCurrency(stats.totalValue)}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط الإنجاز</p>
                <p className="text-2xl font-bold text-orange-600">{stats.avgProgress.toFixed(0)}%</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في عقود المشاريع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="pending">معلق</option>
          <option value="completed">مكتمل</option>
          <option value="on-hold">متوقف</option>
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الفئات</option>
          <option value="خرسانة">خرسانة</option>
          <option value="كهرباء">كهرباء</option>
          <option value="سباكة">سباكة</option>
          <option value="دهانات">دهانات</option>
        </select>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
        <Link href="/dashboard/contracts/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            عقد جديد
          </Button>
        </Link>
      </div>

      {/* Contracts List */}
      <div className="space-y-4">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{contract.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">رقم العقد: {contract.id}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{contract.category}</Badge>
                      <Badge className={getStatusColor(contract.status)}>
                        {getStatusLabel(contract.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(contract.value)}</p>
                  <p className="text-sm text-gray-600">قيمة العقد</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-600">المشروع:</span>
                    <span className="font-medium">{contract.projectName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HardHat className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">المقاول:</span>
                    <span className="font-medium">{contract.contractorName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">المسؤول:</span>
                    <span className="font-medium">{contract.contactPerson}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-600">فترة العقد:</span>
                    <span className="font-medium">{contract.startDate} - {contract.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">نسبة الإنجاز:</span>
                    <span className="font-medium">{contract.progress}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">الهاتف:</span>
                    <span className="font-medium direction-ltr text-right">{contract.phone}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">تقدم العمل</span>
                  <span className="text-sm font-medium text-green-600">{contract.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${contract.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedContract(contract)
                    setShowDetailsModal(true)
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedContract(contract)
                    setShowEditModal(true)
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل البيانات
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  العقود
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/contracts">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">إدارة العقود العامة</h3>
                  <p className="text-sm text-gray-600">جميع العقود</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/subcontractors">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <HardHat className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المقاولين من الباطن</h3>
                  <p className="text-sm text-gray-600">إدارة المقاولين</p>
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
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المشاريع</h3>
                  <p className="text-sm text-gray-600">العودة للمشاريع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects/contracts/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تقارير العقود</h3>
                  <p className="text-sm text-gray-600">إحصائيات وتحليلات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Modals */}
      {showDetailsModal && <DetailsModal />}
      {showEditModal && <EditModal />}
    </div>
  )
}
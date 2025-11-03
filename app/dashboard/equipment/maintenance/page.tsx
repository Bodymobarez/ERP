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
  Wrench,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Edit,
  FileText,
  User,
  DollarSign,
  Settings,
  Truck,
  X,
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Activity
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock maintenance data
const mockMaintenanceRecords = [
  {
    id: "MT-2024-001",
    equipmentId: "1",
    equipmentName: "رافعة برجية 50 طن",
    equipmentType: "رافعات",
    maintenanceType: "صيانة دورية",
    status: "scheduled",
    priority: "medium",
    scheduledDate: "2024-11-10",
    completedDate: null,
    estimatedCost: 1500,
    actualCost: null,
    description: "تغيير الزيوت والفلاتر وفحص شامل للأنظمة الهيدروليكية",
    technician: "م. أحمد محمد",
    technicianPhone: "0501234567",
    location: "موقع البرج السكني - الرياض",
    notes: "يجب إيقاف المعدة لمدة يوم كامل",
    partsRequired: [
      "فلتر زيت هيدروليكي",
      "زيت هيدروليكي 20 لتر",
      "فلتر هواء",
      "شحم عام"
    ],
    checklist: [
      { item: "فحص مستوى الزيت", completed: false },
      { item: "فحص الفلاتر", completed: false },
      { item: "فحص الأنظمة الهيدروليكية", completed: false },
      { item: "اختبار الحركة", completed: false }
    ]
  },
  {
    id: "MT-2024-002",
    equipmentId: "2",
    equipmentName: "خلاطة خرسانة 1.5 م³",
    equipmentType: "معدات خرسانة",
    maintenanceType: "إصلاح",
    status: "in-progress",
    priority: "high",
    scheduledDate: "2024-11-05",
    completedDate: null,
    estimatedCost: 2500,
    actualCost: 2800,
    description: "إصلاح نظام الخلط وتغيير الحزام الناقل",
    technician: "علي حسن",
    technicianPhone: "0507654321",
    location: "موقع الفيلا - جدة",
    notes: "تحتاج لقطع غيار من المورد الأصلي",
    partsRequired: [
      "حزام ناقل",
      "محمل دوران",
      "مشحم خاص",
      "جوان مطاطي"
    ],
    checklist: [
      { item: "تفكيك النظام القديم", completed: true },
      { item: "تركيب الحزام الجديد", completed: true },
      { item: "اختبار الحركة", completed: false },
      { item: "المعايرة النهائية", completed: false }
    ]
  },
  {
    id: "MT-2024-003",
    equipmentId: "3",
    equipmentName: "حفارة كاتربيلر 320",
    equipmentType: "معدات حفر",
    maintenanceType: "فحص شامل",
    status: "completed",
    priority: "low",
    scheduledDate: "2024-10-28",
    completedDate: "2024-10-30",
    estimatedCost: 800,
    actualCost: 750,
    description: "فحص شامل وتقييم الحالة العامة للمعدة",
    technician: "فهد القحطاني",
    technicianPhone: "0509876543",
    location: "موقع المجمع التجاري - الدمام",
    notes: "المعدة في حالة ممتازة ولا تحتاج صيانة",
    partsRequired: [],
    checklist: [
      { item: "فحص المحرك", completed: true },
      { item: "فحص الأنظمة الهيدروليكية", completed: true },
      { item: "فحص الإطارات والجنازير", completed: true },
      { item: "اختبار الأداء", completed: true }
    ]
  },
  {
    id: "MT-2024-004",
    equipmentId: "4",
    equipmentName: "لودر أمامي 5 طن",
    equipmentType: "معدات نقل",
    maintenanceType: "صيانة طارئة",
    status: "overdue",
    priority: "urgent",
    scheduledDate: "2024-11-01",
    completedDate: null,
    estimatedCost: 3200,
    actualCost: null,
    description: "عطل في نظام الرفع الهيدروليكي - توقف عن العمل",
    technician: "محمد السالم",
    technicianPhone: "0503456789",
    location: "المستودع الرئيسي",
    notes: "عطل مفاجئ - يحتاج إصلاح فوري",
    partsRequired: [
      "مضخة هيدروليكية",
      "خراطيم هيدروليكية",
      "صمامات تحكم",
      "زيت هيدروليكي"
    ],
    checklist: [
      { item: "تشخيص العطل", completed: true },
      { item: "طلب قطع الغيار", completed: false },
      { item: "الإصلاح", completed: false },
      { item: "الاختبار", completed: false }
    ]
  },
  {
    id: "MT-2024-005",
    equipmentId: "5",
    equipmentName: "قاطع حديد هيدروليكي",
    equipmentType: "معدات قطع",
    maintenanceType: "صيانة دورية",
    status: "pending",
    priority: "medium",
    scheduledDate: "2024-11-15",
    completedDate: null,
    estimatedCost: 450,
    actualCost: null,
    description: "صيانة دورية وشحذ الشفرات",
    technician: "خالد النمر",
    technicianPhone: "0506543210",
    location: "موقع البرج السكني - الرياض",
    notes: "صيانة روتينية حسب الجدول",
    partsRequired: [
      "شفرات قطع",
      "زيت تشحيم",
      "فلتر هواء"
    ],
    checklist: [
      { item: "فحص الشفرات", completed: false },
      { item: "شحذ الشفرات", completed: false },
      { item: "تغيير الزيت", completed: false },
      { item: "اختبار القطع", completed: false }
    ]
  }
]

export default function MaintenancePage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const filteredRecords = mockMaintenanceRecords.filter(record => {
    const matchesSearch = record.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || record.priority === selectedPriority
    const matchesType = selectedType === "all" || record.maintenanceType === selectedType
    return matchesSearch && matchesStatus && matchesPriority && matchesType
  })

  const stats = {
    total: mockMaintenanceRecords.length,
    scheduled: mockMaintenanceRecords.filter(r => r.status === 'scheduled').length,
    inProgress: mockMaintenanceRecords.filter(r => r.status === 'in-progress').length,
    completed: mockMaintenanceRecords.filter(r => r.status === 'completed').length,
    overdue: mockMaintenanceRecords.filter(r => r.status === 'overdue').length,
    urgent: mockMaintenanceRecords.filter(r => r.priority === 'urgent').length,
    totalCost: mockMaintenanceRecords.reduce((sum, r) => sum + (r.actualCost || r.estimatedCost), 0),
    avgCost: mockMaintenanceRecords.length > 0 
      ? mockMaintenanceRecords.reduce((sum, r) => sum + (r.actualCost || r.estimatedCost), 0) / mockMaintenanceRecords.length
      : 0
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800"
      case "in-progress": return "bg-yellow-100 text-yellow-800"
      case "completed": return "bg-green-100 text-green-800"
      case "overdue": return "bg-red-100 text-red-800"
      case "pending": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled": return "مجدولة"
      case "in-progress": return "جارية"
      case "completed": return "مكتملة"
      case "overdue": return "متأخرة"
      case "pending": return "معلقة"
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled": return <Calendar className="h-4 w-4" />
      case "in-progress": return <Clock className="h-4 w-4" />
      case "completed": return <CheckCircle2 className="h-4 w-4" />
      case "overdue": return <XCircle className="h-4 w-4" />
      case "pending": return <AlertTriangle className="h-4 w-4" />
      default: return <Settings className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-600 border-red-200"
      case "high": return "bg-orange-100 text-orange-600 border-orange-200"
      case "medium": return "bg-yellow-100 text-yellow-600 border-yellow-200"
      case "low": return "bg-green-100 text-green-600 border-green-200"
      default: return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "urgent": return "عاجل جداً"
      case "high": return "عالية"
      case "medium": return "متوسطة"
      case "low": return "منخفضة"
      default: return priority
    }
  }

  // Details Modal Component
  const DetailsModal = () => {
    if (!selectedRecord) return null
    
    const completedItems = selectedRecord.checklist.filter((item: any) => item.completed).length
    const totalItems = selectedRecord.checklist.length
    const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">تفاصيل الصيانة</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowDetailsModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Header Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-500" />
                  معلومات الصيانة
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">رقم الصيانة:</span>
                    <span className="font-medium">{selectedRecord.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">نوع الصيانة:</span>
                    <Badge variant="outline">{selectedRecord.maintenanceType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الحالة:</span>
                    <Badge className={getStatusColor(selectedRecord.status)}>
                      {getStatusIcon(selectedRecord.status)}
                      <span className="ml-1">{getStatusLabel(selectedRecord.status)}</span>
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الأولوية:</span>
                    <Badge className={getPriorityColor(selectedRecord.priority)}>
                      {getPriorityLabel(selectedRecord.priority)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">التاريخ المجدول:</span>
                    <span className="font-medium">{selectedRecord.scheduledDate}</span>
                  </div>
                  {selectedRecord.completedDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاريخ الإكمال:</span>
                      <span className="font-medium text-green-600">{selectedRecord.completedDate}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-purple-500" />
                  المعدة والفني
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">اسم المعدة:</span>
                    <span className="font-medium">{selectedRecord.equipmentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">نوع المعدة:</span>
                    <span className="font-medium">{selectedRecord.equipmentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الفني المسؤول:</span>
                    <span className="font-medium">{selectedRecord.technician}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">هاتف الفني:</span>
                    <span className="font-medium direction-ltr text-right">{selectedRecord.technicianPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الموقع:</span>
                    <span className="font-medium">{selectedRecord.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-500" />
                معلومات التكلفة
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">التكلفة المقدرة</p>
                  <p className="text-xl font-bold text-blue-600">{formatCurrency(selectedRecord.estimatedCost)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">التكلفة الفعلية</p>
                  <p className="text-xl font-bold text-green-600">
                    {selectedRecord.actualCost ? formatCurrency(selectedRecord.actualCost) : "غير محددة"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">وصف الصيانة</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRecord.description}</p>
            </div>

            {/* Parts Required */}
            {selectedRecord.partsRequired.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">قطع الغيار المطلوبة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedRecord.partsRequired.map((part: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                      <Settings className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">{part}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Checklist with Progress */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">قائمة التحقق</h3>
                <div className="text-sm">
                  <span className="font-medium text-green-600">{completedItems}</span>
                  <span className="text-gray-600"> من {totalItems} مكتمل</span>
                  <span className="font-medium text-blue-600 ml-2">({completionPercentage.toFixed(0)}%)</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>

              <div className="space-y-2">
                {selectedRecord.checklist.map((item: any, index: number) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                    item.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    {item.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                    )}
                    <span className={`text-sm ${item.completed ? 'text-green-800 font-medium' : 'text-gray-700'}`}>
                      {item.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {selectedRecord.notes && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">ملاحظات</h3>
                <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  {selectedRecord.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Edit Modal Component
  const EditModal = () => {
    if (!selectedRecord) return null
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">تعديل الصيانة</h2>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">التاريخ المجدول</label>
                  <Input type="date" defaultValue={selectedRecord.scheduledDate} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedRecord.status}
                  >
                    <option value="scheduled">مجدولة</option>
                    <option value="in-progress">جارية</option>
                    <option value="completed">مكتملة</option>
                    <option value="overdue">متأخرة</option>
                    <option value="pending">معلقة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الأولوية</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedRecord.priority}
                  >
                    <option value="urgent">عاجل جداً</option>
                    <option value="high">عالية</option>
                    <option value="medium">متوسطة</option>
                    <option value="low">منخفضة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الفني المسؤول</label>
                  <Input defaultValue={selectedRecord.technician} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">التكلفة المقدرة</label>
                  <Input type="number" defaultValue={selectedRecord.estimatedCost} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">التكلفة الفعلية</label>
                  <Input type="number" defaultValue={selectedRecord.actualCost || ""} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  defaultValue={selectedRecord.description}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الملاحظات</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  defaultValue={selectedRecord.notes}
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
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 via-orange-700 to-amber-800 p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/equipment">
                <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  العودة للمعدات
                </Button>
              </Link>
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Wrench className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">إدارة الصيانة</h1>
                <p className="text-orange-100 text-sm sm:text-base lg:text-lg">جدولة ومتابعة أعمال الصيانة للمعدات الإنشائية</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm text-sm w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">تصدير التقرير</span>
                <span className="sm:hidden">تصدير</span>
              </Button>
              <Link href="/dashboard/equipment/maintenance/new">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg text-sm w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">صيانة جديدة</span>
                  <span className="sm:hidden">جديد</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الصيانة</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Wrench className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مجدولة</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{stats.scheduled}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">جارية</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.inProgress}</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مكتملة</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.completed}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متأخرة</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.overdue}</p>
              </div>
              <div className="bg-red-500 text-white p-3 rounded-lg">
                <XCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">عاجلة</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.urgent}</p>
              </div>
              <div className="bg-red-500 text-white p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي التكلفة</p>
                <p className="text-lg font-bold mt-1 text-purple-600">{formatCurrency(stats.totalCost)}</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط التكلفة</p>
                <p className="text-lg font-bold mt-1 text-orange-600">{formatCurrency(stats.avgCost)}</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في سجلات الصيانة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="all">جميع الحالات</option>
          <option value="scheduled">مجدولة</option>
          <option value="in-progress">جارية</option>
          <option value="completed">مكتملة</option>
          <option value="overdue">متأخرة</option>
          <option value="pending">معلقة</option>
        </select>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="all">جميع الأولويات</option>
          <option value="urgent">عاجل جداً</option>
          <option value="high">عالية</option>
          <option value="medium">متوسطة</option>
          <option value="low">منخفضة</option>
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="all">جميع الأنواع</option>
          <option value="صيانة دورية">صيانة دورية</option>
          <option value="إصلاح">إصلاح</option>
          <option value="فحص شامل">فحص شامل</option>
          <option value="صيانة طارئة">صيانة طارئة</option>
        </select>
      </div>

      {/* Maintenance Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => {
          const completedItems = record.checklist.filter(item => item.completed).length
          const totalItems = record.checklist.length
          const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0
          
          return (
            <Card key={record.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{record.equipmentName}</h3>
                      <p className="text-sm text-gray-600 mt-1">رقم الصيانة: {record.id}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{record.maintenanceType}</Badge>
                        <Badge className={getPriorityColor(record.priority)}>
                          {getPriorityLabel(record.priority)}
                        </Badge>
                        <Badge className={getStatusColor(record.status)}>
                          {getStatusLabel(record.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      {record.actualCost ? formatCurrency(record.actualCost) : formatCurrency(record.estimatedCost)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {record.actualCost ? 'التكلفة الفعلية' : 'التكلفة المقدرة'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-600">الفني:</span>
                      <span className="font-medium">{record.technician}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">التاريخ المجدول:</span>
                      <span className="font-medium">{record.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-gray-600">الموقع:</span>
                      <span className="font-medium">{record.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-orange-500" />
                      <span className="text-gray-600">هاتف الفني:</span>
                      <span className="font-medium direction-ltr text-right">{record.technicianPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4 text-purple-500" />
                      <span className="text-gray-600">التقدم:</span>
                      <span className="font-medium">{completedItems} من {totalItems} ({completionPercentage.toFixed(0)}%)</span>
                    </div>
                    {record.completedDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-gray-600">تاريخ الإكمال:</span>
                        <span className="font-medium text-green-600">{record.completedDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">تقدم الصيانة</span>
                    <span className="text-sm font-medium text-blue-600">{completionPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">{record.description}</p>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedRecord(record)
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
                      setSelectedRecord(record)
                      setShowEditModal(true)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    تعديل
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    التقرير
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/equipment/maintenance/schedule">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">جدولة الصيانة</h3>
                  <p className="text-sm text-gray-600">تخطيط مواعيد الصيانة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/maintenance/parts">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">قطع الغيار</h3>
                  <p className="text-sm text-gray-600">إدارة المخزون</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/maintenance/technicians">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الفنيين</h3>
                  <p className="text-sm text-gray-600">إدارة الفنيين</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/equipment/maintenance/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التقارير</h3>
                  <p className="text-sm text-gray-600">تقارير الصيانة</p>
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
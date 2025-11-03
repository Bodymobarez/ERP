"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Plus,
  Wrench,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  User,
  DollarSign,
  Settings,
  Truck,
  MapPin,
  Phone,
  Mail,
  FileText,
  Upload,
  X,
  Save,
  Eye,
  Search
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock equipment data
const mockEquipment = [
  {
    id: "1",
    name: "رافعة برجية 50 طن",
    type: "رافعات",
    model: "Liebherr 132 EC-H",
    serialNumber: "LH-132-2023-001",
    location: "موقع البرج السكني - الرياض",
    status: "active",
    lastMaintenance: "2024-08-15",
    nextMaintenance: "2024-11-15"
  },
  {
    id: "2",
    name: "خلاطة خرسانة 1.5 م³",
    type: "معدات خرسانة",
    model: "Concrete Mixer CM-1500",
    serialNumber: "CM-1500-2023-002",
    location: "موقع الفيلا - جدة",
    status: "maintenance",
    lastMaintenance: "2024-10-01",
    nextMaintenance: "2024-12-01"
  },
  {
    id: "3",
    name: "حفارة كاتربيلر 320",
    type: "معدات حفر",
    model: "Caterpillar 320D",
    serialNumber: "CAT-320-2022-003",
    location: "موقع المجمع التجاري - الدمام",
    status: "active",
    lastMaintenance: "2024-09-20",
    nextMaintenance: "2024-12-20"
  },
  {
    id: "4",
    name: "لودر أمامي 5 طن",
    type: "معدات نقل",
    model: "Caterpillar 950M",
    serialNumber: "CAT-950-2023-004",
    location: "المستودع الرئيسي",
    status: "breakdown",
    lastMaintenance: "2024-07-10",
    nextMaintenance: "2024-10-10"
  }
]

// Mock technicians data
const mockTechnicians = [
  {
    id: "1",
    name: "م. أحمد محمد",
    phone: "0501234567",
    email: "ahmed.mohamed@company.com",
    specialization: "هيدروليك وكهرباء",
    rating: 4.8,
    experience: "8 سنوات",
    status: "available"
  },
  {
    id: "2",
    name: "علي حسن",
    phone: "0507654321",
    email: "ali.hassan@company.com",
    specialization: "محركات ديزل",
    rating: 4.9,
    experience: "12 سنة",
    status: "busy"
  },
  {
    id: "3",
    name: "فهد القحطاني",
    phone: "0509876543",
    email: "fahad.alqahtani@company.com",
    specialization: "فحص وتشخيص",
    rating: 4.7,
    experience: "6 سنوات",
    status: "available"
  },
  {
    id: "4",
    name: "محمد السالم",
    phone: "0503456789",
    email: "mohammed.alsalem@company.com",
    specialization: "أنظمة هيدروليكية",
    rating: 4.6,
    experience: "10 سنوات",
    status: "available"
  }
]

export default function NewMaintenancePage() {
  const { t, lang } = useLanguage()
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)
  const [selectedTechnician, setSelectedTechnician] = useState<any>(null)
  const [showEquipmentModal, setShowEquipmentModal] = useState(false)
  const [showTechnicianModal, setShowTechnicianModal] = useState(false)
  const [maintenanceType, setMaintenanceType] = useState("preventive")
  const [priority, setPriority] = useState("medium")
  const [checklist, setChecklist] = useState([
    { id: 1, item: "فحص مستوى الزيت", completed: false },
    { id: 2, item: "فحص الفلاتر", completed: false },
    { id: 3, item: "فحص الأنظمة الهيدروليكية", completed: false },
    { id: 4, item: "اختبار الحركة", completed: false }
  ])
  const [partsRequired, setPartsRequired] = useState([""])
  const [attachments, setAttachments] = useState<File[]>([])

  const addChecklistItem = () => {
    const newId = Math.max(...checklist.map(item => item.id)) + 1
    setChecklist([...checklist, { id: newId, item: "", completed: false }])
  }

  const removeChecklistItem = (id: number) => {
    setChecklist(checklist.filter(item => item.id !== id))
  }

  const updateChecklistItem = (id: number, value: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, item: value } : item
    ))
  }

  const addPartItem = () => {
    setPartsRequired([...partsRequired, ""])
  }

  const removePartItem = (index: number) => {
    setPartsRequired(partsRequired.filter((_, i) => i !== index))
  }

  const updatePartItem = (index: number, value: string) => {
    const newParts = [...partsRequired]
    newParts[index] = value
    setPartsRequired(newParts)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "maintenance": return "bg-yellow-100 text-yellow-800"
      case "breakdown": return "bg-red-100 text-red-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "نشطة"
      case "maintenance": return "قيد الصيانة"
      case "breakdown": return "معطلة"
      case "inactive": return "غير نشطة"
      default: return status
    }
  }

  // Equipment Selection Modal
  const EquipmentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">اختيار المعدة</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowEquipmentModal(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في المعدات..."
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="grid gap-4">
            {mockEquipment.map((equipment) => (
              <Card key={equipment.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedEquipment(equipment)
                  setShowEquipmentModal(false)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Truck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{equipment.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">النوع: {equipment.type}</p>
                        <p className="text-sm text-gray-600">الموديل: {equipment.model}</p>
                        <p className="text-sm text-gray-600">الرقم التسلسلي: {equipment.serialNumber}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{equipment.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(equipment.status)}>
                        {getStatusLabel(equipment.status)}
                      </Badge>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>آخر صيانة: {equipment.lastMaintenance}</p>
                        <p>الصيانة القادمة: {equipment.nextMaintenance}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Technician Selection Modal
  const TechnicianModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">اختيار الفني</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowTechnicianModal(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في الفنيين..."
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="grid gap-4">
            {mockTechnicians.map((technician) => (
              <Card key={technician.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedTechnician(technician)
                  setShowTechnicianModal(false)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <User className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{technician.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">التخصص: {technician.specialization}</p>
                        <p className="text-sm text-gray-600">الخبرة: {technician.experience}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{technician.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{technician.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-yellow-500">★</span>
                        <span className="font-bold text-lg">{technician.rating}</span>
                      </div>
                      <Badge className={technician.status === 'available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}>
                        {technician.status === 'available' ? 'متاح' : 'مشغول'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/equipment/maintenance">
                <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  العودة لإدارة الصيانة
                </Button>
              </Link>
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Plus className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">صيانة جديدة</h1>
                <p className="text-blue-100 text-sm sm:text-base lg:text-lg">إنشاء طلب صيانة جديد للمعدات الإنشائية</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-blue-600" />
            تفاصيل الصيانة
          </CardTitle>
          <CardDescription>
            قم بملء جميع المعلومات المطلوبة لإنشاء طلب صيانة جديد
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Equipment Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Truck className="h-5 w-5 text-purple-500" />
                اختيار المعدة
              </h3>
              
              {selectedEquipment ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <Truck className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{selectedEquipment.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">النوع: {selectedEquipment.type}</p>
                          <p className="text-sm text-gray-600">الموديل: {selectedEquipment.model}</p>
                          <p className="text-sm text-gray-600">الرقم التسلسلي: {selectedEquipment.serialNumber}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{selectedEquipment.location}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedEquipment(null)}
                      >
                        إلغاء الاختيار
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full h-20 border-2 border-dashed border-gray-300 hover:border-blue-400"
                  onClick={() => setShowEquipmentModal(true)}
                >
                  <Plus className="h-6 w-6 mr-2" />
                  اختيار المعدة المراد صيانتها
                </Button>
              )}
            </div>

            {/* Maintenance Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع الصيانة</label>
                <select 
                  value={maintenanceType}
                  onChange={(e) => setMaintenanceType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="preventive">صيانة دورية</option>
                  <option value="corrective">إصلاح</option>
                  <option value="inspection">فحص شامل</option>
                  <option value="emergency">صيانة طارئة</option>
                  <option value="overhaul">إصلاح شامل</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الأولوية</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">منخفضة</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                  <option value="urgent">عاجل جداً</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ المجدول</label>
                <Input type="date" defaultValue="2024-11-10" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوقت المتوقع (ساعات)</label>
                <Input type="number" placeholder="عدد الساعات المتوقعة" defaultValue="8" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التكلفة المقدرة (ريال)</label>
                <Input type="number" placeholder="التكلفة المقدرة" defaultValue="1500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                <Input placeholder="موقع تنفيذ الصيانة" defaultValue={selectedEquipment?.location || ""} />
              </div>
            </div>

            {/* Technician Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-green-500" />
                اختيار الفني المسؤول
              </h3>
              
              {selectedTechnician ? (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{selectedTechnician.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">التخصص: {selectedTechnician.specialization}</p>
                          <p className="text-sm text-gray-600">الخبرة: {selectedTechnician.experience}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{selectedTechnician.phone}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm font-bold">{selectedTechnician.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedTechnician(null)}
                      >
                        إلغاء الاختيار
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full h-20 border-2 border-dashed border-gray-300 hover:border-green-400"
                  onClick={() => setShowTechnicianModal(true)}
                >
                  <Plus className="h-6 w-6 mr-2" />
                  اختيار الفني المسؤول عن الصيانة
                </Button>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">وصف الصيانة</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="وصف تفصيلي للأعمال المطلوب تنفيذها في الصيانة..."
                defaultValue="صيانة دورية شاملة تتضمن تغيير الزيوت والفلاتر وفحص جميع الأنظمة الهيدروليكية والكهربائية للمعدة"
              />
            </div>

            {/* Parts Required */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-500" />
                قطع الغيار المطلوبة
              </h3>
              
              {partsRequired.map((part, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={part}
                    onChange={(e) => updatePartItem(index, e.target.value)}
                    placeholder="اسم قطعة الغيار..."
                    className="flex-1"
                  />
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => removePartItem(index)}
                    disabled={partsRequired.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={addPartItem}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                إضافة قطعة غيار
              </Button>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                قائمة التحقق
              </h3>
              
              {checklist.map((item) => (
                <div key={item.id} className="flex gap-2">
                  <Input
                    value={item.item}
                    onChange={(e) => updateChecklistItem(item.id, e.target.value)}
                    placeholder="عنصر في قائمة التحقق..."
                    className="flex-1"
                  />
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => removeChecklistItem(item.id)}
                    disabled={checklist.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={addChecklistItem}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                إضافة عنصر للقائمة
              </Button>
            </div>

            {/* File Attachments */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-500" />
                المرفقات
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500 font-medium">
                    انقر لتحميل الملفات
                  </span>
                  <span className="text-gray-600"> أو اسحب الملفات هنا</span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  يمكن رفع ملفات PDF, صور, أو مستندات Word
                </p>
              </div>

              {attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">الملفات المرفقة:</h4>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات إضافية</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="أي ملاحظات أو تعليمات خاصة للفني..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button type="submit" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                إنشاء طلب الصيانة
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                معاينة
              </Button>
              <Link href="/dashboard/equipment/maintenance" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  إلغاء
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">ملخص طلب الصيانة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Truck className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">المعدة المختارة</p>
              <p className="font-bold">
                {selectedEquipment ? selectedEquipment.name : "لم يتم الاختيار"}
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <User className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">الفني المسؤول</p>
              <p className="font-bold">
                {selectedTechnician ? selectedTechnician.name : "لم يتم الاختيار"}
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">الأولوية</p>
              <Badge className={getPriorityColor(priority)}>
                {priority === 'urgent' ? 'عاجل جداً' : 
                 priority === 'high' ? 'عالية' :
                 priority === 'medium' ? 'متوسطة' : 'منخفضة'}
              </Badge>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <DollarSign className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">التكلفة المقدرة</p>
              <p className="font-bold text-purple-600">1,500 ريال</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showEquipmentModal && <EquipmentModal />}
      {showTechnicianModal && <TechnicianModal />}
    </div>
  )
}
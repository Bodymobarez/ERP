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
  HardHat,
  Users,
  DollarSign,
  CheckCircle2,
  Clock,
  Eye,
  Edit,
  Phone,
  Mail,
  MapPin,
  FileText,
  Star,
  AlertTriangle,
  X,
  Building,
  Calendar,
  Award,
  TrendingUp
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const mockSubcontractors = [
  {
    id: "1",
    name: "مؤسسة البناء المتقن",
    specialty: "أعمال الخرسانة",
    contactPerson: "م. أحمد عبدالله",
    phone: "0501234567",
    email: "info@precision-build.com",
    address: "الرياض - حي الملز",
    rating: 4.5,
    completedProjects: 12,
    activeProjects: 3,
    totalContracts: 2500000,
    status: "active",
    licenseNumber: "CR-123456",
    certifications: ["ISO 9001", "السلامة"]
  },
  {
    id: "2",
    name: "شركة الحديد المتحد",
    specialty: "أعمال الحديد والصلب",
    contactPerson: "م. فاطمة محمد",
    phone: "0507654321",
    email: "contact@steel-united.com",
    address: "جدة - حي الحمراء",
    rating: 4.8,
    completedProjects: 18,
    activeProjects: 5,
    totalContracts: 3200000,
    status: "active",
    licenseNumber: "CR-234567",
    certifications: ["ISO 9001", "OHSAS 18001"]
  },
  {
    id: "3",
    name: "مقاولات الدهانات الحديثة",
    specialty: "أعمال الدهانات والديكور",
    contactPerson: "محمد خالد",
    phone: "0509876543",
    email: "info@modern-paint.com",
    address: "الدمام - حي الفيصلية",
    rating: 4.2,
    completedProjects: 25,
    activeProjects: 2,
    totalContracts: 1800000,
    status: "active",
    licenseNumber: "CR-345678",
    certifications: ["ISO 9001"]
  },
  {
    id: "4",
    name: "مؤسسة الكهرباء المتطورة",
    specialty: "الأعمال الكهربائية",
    contactPerson: "م. سارة أحمد",
    phone: "0503456789",
    email: "info@advanced-electric.com",
    address: "الخبر - حي العقربية",
    rating: 4.6,
    completedProjects: 15,
    activeProjects: 4,
    totalContracts: 2100000,
    status: "active",
    licenseNumber: "CR-456789",
    certifications: ["ISO 9001", "كهرباء معتمد"]
  },
  {
    id: "5",
    name: "شركة السباكة الماهرة",
    specialty: "أعمال السباكة والصرف الصحي",
    contactPerson: "خالد عمر",
    phone: "0506543210",
    email: "info@expert-plumbing.com",
    address: "مكة - حي العزيزية",
    rating: 4.0,
    completedProjects: 10,
    activeProjects: 2,
    totalContracts: 1500000,
    status: "pending",
    licenseNumber: "CR-567890",
    certifications: ["ISO 9001"]
  },
]

export default function SubcontractorsPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showContractsModal, setShowContractsModal] = useState(false)

  const filteredSubcontractors = mockSubcontractors.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || sub.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockSubcontractors.length,
    active: mockSubcontractors.filter(s => s.status === 'active').length,
    pending: mockSubcontractors.filter(s => s.status === 'pending').length,
    totalContracts: mockSubcontractors.reduce((sum, s) => sum + s.totalContracts, 0),
    avgRating: mockSubcontractors.reduce((sum, s) => sum + s.rating, 0) / mockSubcontractors.length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "suspended": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "نشط"
      case "pending": return "قيد التقييم"
      case "suspended": return "موقوف"
      default: return status
    }
  }

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    )
  }

  // Mock contracts for selected subcontractor
  const getSubcontractorContracts = (subcontractorId: string) => [
    {
      id: "PC-2024-001",
      title: "عقد أعمال الخرسانة - البرج السكني",
      projectName: "البرج السكني - الرياض",
      value: 850000,
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      progress: 65
    },
    {
      id: "PC-2024-005", 
      title: "عقد أعمال الحديد - المجمع السكني",
      projectName: "المجمع السكني - جدة",
      value: 320000,
      status: "completed",
      startDate: "2023-10-01",
      endDate: "2024-01-31", 
      progress: 100
    }
  ]

  // Details Modal Component
  const DetailsModal = () => {
    if (!selectedSubcontractor) return null
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">تفاصيل المقاول</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowDetailsModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <HardHat className="h-5 w-5 text-blue-500" />
                  المعلومات الأساسية
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">اسم المؤسسة:</span>
                    <span className="font-medium">{selectedSubcontractor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">التخصص:</span>
                    <Badge variant="outline">{selectedSubcontractor.specialty}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">السجل التجاري:</span>
                    <span className="font-medium">{selectedSubcontractor.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الحالة:</span>
                    <Badge className={getStatusColor(selectedSubcontractor.status)}>
                      {getStatusLabel(selectedSubcontractor.status)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">التقييم:</span>
                    <div>{getRatingStars(selectedSubcontractor.rating)}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  معلومات التواصل
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الشخص المسؤول:</span>
                    <span className="font-medium">{selectedSubcontractor.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الهاتف:</span>
                    <span className="font-medium direction-ltr text-right">{selectedSubcontractor.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">البريد الإلكتروني:</span>
                    <span className="font-medium text-sm">{selectedSubcontractor.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">العنوان:</span>
                    <span className="font-medium">{selectedSubcontractor.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                إحصائيات الأداء
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{selectedSubcontractor.completedProjects}</p>
                  <p className="text-sm text-gray-600">مشاريع مكتملة</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{selectedSubcontractor.activeProjects}</p>
                  <p className="text-sm text-gray-600">مشاريع جارية</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <DollarSign className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-xl font-bold text-purple-600">{formatCurrency(selectedSubcontractor.totalContracts)}</p>
                  <p className="text-sm text-gray-600">إجمالي العقود</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-orange-500" />
                الشهادات والاعتمادات
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedSubcontractor.certifications.map((cert: string, index: number) => (
                  <Badge key={index} variant="outline" className="p-2">
                    <Award className="h-4 w-4 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recent Performance */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">التقييم والأداء</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">جودة العمل</span>
                  <div className="flex items-center gap-2">
                    {getRatingStars(4.8)}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">الالتزام بالمواعيد</span>
                  <div className="flex items-center gap-2">
                    {getRatingStars(4.5)}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">التواصل والتعاون</span>
                  <div className="flex items-center gap-2">
                    {getRatingStars(4.2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Edit Modal Component
  const EditModal = () => {
    if (!selectedSubcontractor) return null
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">تعديل بيانات المقاول</h2>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم المؤسسة</label>
                  <Input defaultValue={selectedSubcontractor.name} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">التخصص</label>
                  <Input defaultValue={selectedSubcontractor.specialty} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الشخص المسؤول</label>
                  <Input defaultValue={selectedSubcontractor.contactPerson} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                  <Input defaultValue={selectedSubcontractor.phone} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <Input type="email" defaultValue={selectedSubcontractor.email} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">السجل التجاري</label>
                  <Input defaultValue={selectedSubcontractor.licenseNumber} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                <Input defaultValue={selectedSubcontractor.address} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedSubcontractor.status}
                >
                  <option value="active">نشط</option>
                  <option value="pending">قيد التقييم</option>
                  <option value="suspended">موقوف</option>
                </select>
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

  // Contracts Modal Component  
  const ContractsModal = () => {
    if (!selectedSubcontractor) return null
    
    const contracts = getSubcontractorContracts(selectedSubcontractor.id)
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">عقود المقاول - {selectedSubcontractor.name}</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowContractsModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Contracts Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{contracts.length}</p>
                <p className="text-sm text-gray-600">إجمالي العقود</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  {contracts.filter(c => c.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">عقود مكتملة</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <DollarSign className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-xl font-bold text-purple-600">
                  {formatCurrency(contracts.reduce((sum, c) => sum + c.value, 0))}
                </p>
                <p className="text-sm text-gray-600">قيمة العقود</p>
              </div>
            </div>

            {/* Contracts List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">قائمة العقود</h3>
              {contracts.map((contract) => (
                <div key={contract.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{contract.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">رقم العقد: {contract.id}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{contract.projectName}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{formatCurrency(contract.value)}</p>
                      <Badge className={getStatusColor(contract.status)}>
                        {getStatusLabel(contract.status)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-600">فترة العقد:</span>
                      <span className="font-medium">{contract.startDate} - {contract.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">نسبة الإنجاز:</span>
                      <span className="font-medium">{contract.progress}%</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">تقدم العمل</span>
                      <span className="text-xs font-medium text-green-600">{contract.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${contract.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Link href="/dashboard/projects/contracts" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    عرض جميع عقود المشاريع
                  </Button>
                </Link>
                <Link href="/dashboard/contracts/new" className="flex-1">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    إنشاء عقد جديد
                  </Button>
                </Link>
              </div>
            </div>
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
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">المقاولين من الباطن</h1>
          <p className="text-gray-600 mt-1">إدارة ومتابعة المقاولين والمتعاقدين</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المقاولين</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <HardHat className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مقاولين نشطين</p>
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
                <p className="text-sm font-medium text-gray-600">إجمالي العقود</p>
                <p className="text-xl font-bold text-purple-600">{formatCurrency(stats.totalContracts)}</p>
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
                <p className="text-sm font-medium text-gray-600">متوسط التقييم</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.avgRating.toFixed(1)} ⭐</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
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
              placeholder="البحث في المقاولين..."
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
          <option value="pending">قيد التقييم</option>
          <option value="suspended">موقوف</option>
        </select>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
        <Link href="/dashboard/projects/subcontractors/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            مقاول جديد
          </Button>
        </Link>
      </div>

      {/* Subcontractors List */}
      <div className="space-y-4">
        {filteredSubcontractors.map((sub) => (
          <Card key={sub.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <HardHat className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{sub.name}</h3>
                    <Badge variant="outline" className="mt-1">{sub.specialty}</Badge>
                    <p className="text-sm text-gray-600 mt-2">
                      السجل التجاري: {sub.licenseNumber}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {sub.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusColor(sub.status)}>
                    {getStatusLabel(sub.status)}
                  </Badge>
                  {getRatingStars(sub.rating)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">الشخص المسؤول:</span>
                    <span className="font-medium">{sub.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">الهاتف:</span>
                    <span className="font-medium direction-ltr text-right">{sub.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-600">البريد:</span>
                    <span className="font-medium text-xs">{sub.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span className="text-gray-600">العنوان:</span>
                    <span className="font-medium">{sub.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">مشاريع مكتملة:</span>
                    <span className="font-medium">{sub.completedProjects}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">مشاريع جارية:</span>
                    <span className="font-medium">{sub.activeProjects}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t">
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-purple-600">{formatCurrency(sub.totalContracts)}</p>
                  <p className="text-xs text-gray-600">إجمالي العقود</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-600">{sub.completedProjects}</p>
                  <p className="text-xs text-gray-600">مشاريع منجزة</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-blue-600">{sub.activeProjects}</p>
                  <p className="text-xs text-gray-600">مشاريع حالية</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedSubcontractor(sub)
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
                    setSelectedSubcontractor(sub)
                    setShowEditModal(true)
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل البيانات
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedSubcontractor(sub)
                    setShowContractsModal(true)
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  العقود
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/projects/subcontractors/performance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تقييم الأداء</h3>
                  <p className="text-sm text-gray-600">تقارير أداء المقاولين</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/contracts">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">عقود المقاولين</h3>
                  <p className="text-sm text-gray-600">إدارة العقود</p>
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
                  <HardHat className="h-6 w-6 text-purple-600" />
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

      {/* Modals */}
      {showDetailsModal && <DetailsModal />}
      {showEditModal && <EditModal />}
      {showContractsModal && <ContractsModal />}
    </div>
  )
}


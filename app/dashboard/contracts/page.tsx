"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  User,
  Building2,
  AlertTriangle,
  X,
  Save,
  FileDown,
  Upload
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Types
interface Contract {
  id: string
  number: string
  title: string
  type: string
  status: 'draft' | 'active' | 'expired' | 'terminated'
  startDate: string
  endDate: string
  value: number
  clientId?: string
  clientName?: string
  supplierId?: string
  supplierName?: string
  description?: string
  notes?: string
  createdAt: string
  updatedAt: string
  terms: ContractTerm[]
  amendments: ContractAmendment[]
}

interface ContractTerm {
  id: string
  title: string
  description: string
  order: number
}

interface ContractAmendment {
  id: string
  number: string
  date: string
  description: string
  reason?: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function ContractsPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingContract, setEditingContract] = useState<Partial<Contract>>({})

  // Sample data
  useEffect(() => {
    const sampleContracts: Contract[] = [
      {
        id: "1",
        number: "CON-2024-001",
        title: "عقد توريد مواد بناء",
        type: "supply",
        status: "active",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        value: 500000,
        supplierId: "SUP-001",
        supplierName: "شركة الحديد المتحد",
        description: "عقد توريد مواد البناء اللازمة للمشاريع الإنشائية",
        notes: "العقد يشمل خصم 5% للكميات الكبيرة",
        createdAt: "2024-01-01T10:00:00Z",
        updatedAt: "2024-01-15T14:30:00Z",
        terms: [
          { id: "1", title: "شروط التوريد", description: "يلتزم المورد بتوريد المواد وفق المواصفات المحددة", order: 1 },
          { id: "2", title: "مواعيد التسليم", description: "التسليم خلال 7 أيام من تاريخ الطلب", order: 2 },
          { id: "3", title: "ضمان الجودة", description: "ضمان جودة المواد لمدة سنة من تاريخ التسليم", order: 3 }
        ],
        amendments: []
      },
      {
        id: "2",
        number: "CON-2024-002",
        title: "عقد خدمات هندسية",
        type: "service",
        status: "active",
        startDate: "2024-02-01",
        endDate: "2024-07-31",
        value: 150000,
        clientId: "CLI-001",
        clientName: "شركة الإنشاءات الحديثة",
        description: "عقد تقديم الخدمات الهندسية والاستشارية",
        notes: "يشمل المتابعة الشهرية والتقارير الفنية",
        createdAt: "2024-02-01T09:00:00Z",
        updatedAt: "2024-02-01T09:00:00Z",
        terms: [
          { id: "4", title: "نطاق العمل", description: "تقديم الخدمات الهندسية والإشراف على المشاريع", order: 1 },
          { id: "5", title: "المسؤوليات", description: "الالتزام بالمعايير المهنية والقوانين المحلية", order: 2 }
        ],
        amendments: [
          {
            id: "1",
            number: "AMD-001",
            date: "2024-03-15",
            description: "تمديد مدة العقد لشهرين إضافيين",
            reason: "تأخير في تنفيذ المشروع",
            status: "approved"
          }
        ]
      },
      {
        id: "3",
        number: "CON-2024-003",
        title: "عقد صيانة معدات",
        type: "maintenance",
        status: "expired",
        startDate: "2023-06-01",
        endDate: "2024-05-31",
        value: 75000,
        supplierId: "SUP-002",
        supplierName: "شركة الصيانة المتقدمة",
        description: "عقد صيانة دورية للمعدات والآلات",
        createdAt: "2023-06-01T08:00:00Z",
        updatedAt: "2024-05-31T17:00:00Z",
        terms: [
          { id: "6", title: "نطاق الصيانة", description: "صيانة دورية شهرية لجميع المعدات", order: 1 },
          { id: "7", title: "وقت الاستجابة", description: "الاستجابة خلال 24 ساعة في حالات الطوارئ", order: 2 }
        ],
        amendments: []
      }
    ]
    
    setContracts(sampleContracts)
    setLoading(false)
  }, [])

  // Filter contracts
  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contract.clientName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (contract.supplierName?.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter
    const matchesType = typeFilter === "all" || contract.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  // Status colors and labels
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: "bg-gray-100 text-gray-800", label: "مسودة", icon: Edit },
      active: { color: "bg-green-100 text-green-800", label: "نشط", icon: CheckCircle2 },
      expired: { color: "bg-red-100 text-red-800", label: "منتهي", icon: Clock },
      terminated: { color: "bg-orange-100 text-orange-800", label: "منهي", icon: X }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    
    return (
      <Badge className={`${config.color} border-0`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  // Type labels
  const getTypeLabel = (type: string) => {
    const types = {
      supply: "توريد",
      service: "خدمات",
      maintenance: "صيانة",
      employment: "توظيف",
      other: "أخرى"
    }
    return types[type as keyof typeof types] || type
  }

  // Calculate days remaining
  const getDaysRemaining = (endDate: string) => {
    const today = new Date()
    const end = new Date(endDate)
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Handle edit contract
  const handleEditContract = (contract: Contract) => {
    setEditingContract(contract)
    setShowEditModal(true)
  }

  // Save contract changes
  const handleSaveContract = () => {
    if (editingContract.id) {
      setContracts(contracts.map(c => 
        c.id === editingContract.id 
          ? { ...c, ...editingContract, updatedAt: new Date().toISOString() }
          : c
      ))
      setShowEditModal(false)
      setEditingContract({})
      alert("تم حفظ التعديلات بنجاح")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">العقود</h1>
          <p className="text-gray-600">إدارة العقود والاتفاقيات</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => router.push('/dashboard/contracts/new')}
        >
          <Plus className="h-4 w-4" />
          عقد جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">العقود النشطة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contracts.filter(c => c.status === 'active').length}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تنتهي قريباً</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {contracts.filter(c => {
                    const daysRemaining = getDaysRemaining(c.endDate)
                    return daysRemaining <= 30 && daysRemaining > 0
                  }).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">القيمة الإجمالية</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(contracts.reduce((sum, contract) => sum + contract.value, 0))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">منتهية الصلاحية</p>
                <p className="text-2xl font-bold text-red-600">
                  {contracts.filter(c => c.status === 'expired').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">البحث</Label>
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="البحث في العقود..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="status-filter">الحالة</Label>
              <select
                id="status-filter"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">جميع الحالات</option>
                <option value="draft">مسودة</option>
                <option value="active">نشط</option>
                <option value="expired">منتهي</option>
                <option value="terminated">منهي</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="type-filter">النوع</Label>
              <select
                id="type-filter"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">جميع الأنواع</option>
                <option value="supply">توريد</option>
                <option value="service">خدمات</option>
                <option value="maintenance">صيانة</option>
                <option value="employment">توظيف</option>
                <option value="other">أخرى</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" className="ml-2">
                <Filter className="h-4 w-4 mr-2" />
                تصفية
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة العقود</CardTitle>
          <CardDescription>
            إجمالي {filteredContracts.length} عقد
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">جاري التحميل...</p>
            </div>
          ) : filteredContracts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عقود</h3>
              <p className="text-gray-600 mb-4">لم يتم العثور على أي عقود مطابقة للبحث</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                إنشاء عقد جديد
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">رقم العقد</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">العنوان</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">النوع</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">الطرف الآخر</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">القيمة</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">تاريخ النهاية</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">الحالة</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map((contract) => {
                    const daysRemaining = getDaysRemaining(contract.endDate)
                    return (
                      <tr key={contract.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{contract.number}</div>
                          <div className="text-sm text-gray-500">
                            {contract.terms.length} بند
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{contract.title}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {contract.description}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">
                            {getTypeLabel(contract.type)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {contract.clientName ? (
                              <>
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">{contract.clientName}</span>
                              </>
                            ) : contract.supplierName ? (
                              <>
                                <Building2 className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">{contract.supplierName}</span>
                              </>
                            ) : (
                              <span className="text-gray-500">غير محدد</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-gray-900">
                            {formatCurrency(contract.value)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(contract.endDate).toLocaleDateString('ar-SA')}
                          </div>
                          {daysRemaining > 0 && daysRemaining <= 30 && (
                            <div className="text-sm text-orange-600 mt-1">
                              {daysRemaining} يوم متبقي
                            </div>
                          )}
                          {daysRemaining < 0 && (
                            <div className="text-sm text-red-600 mt-1">
                              انتهى منذ {Math.abs(daysRemaining)} يوم
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(contract.status)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedContract(contract)
                                setShowDetails(true)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditContract(contract)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contract Details Modal */}
      {showDetails && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    تفاصيل العقد {selectedContract.number}
                  </h2>
                  <p className="text-gray-600 mt-1">{selectedContract.title}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowDetails(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">معلومات العقد</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">رقم العقد:</span>
                      <span className="font-medium">{selectedContract.number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">النوع:</span>
                      <Badge variant="outline">{getTypeLabel(selectedContract.type)}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الحالة:</span>
                      {getStatusBadge(selectedContract.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاريخ البداية:</span>
                      <span>{new Date(selectedContract.startDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاريخ النهاية:</span>
                      <span>{new Date(selectedContract.endDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المدة:</span>
                      <span>{getDaysRemaining(selectedContract.endDate) > 0 ? `${getDaysRemaining(selectedContract.endDate)} يوم متبقي` : 'منتهي'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">التفاصيل المالية</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">قيمة العقد:</span>
                      <span className="font-bold text-lg">{formatCurrency(selectedContract.value)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الطرف الآخر:</span>
                      <span>{selectedContract.clientName || selectedContract.supplierName}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedContract.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">الوصف</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{selectedContract.description}</p>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">بنود العقد</h3>
                {selectedContract.terms.length > 0 ? (
                  <div className="space-y-3">
                    {selectedContract.terms.map((term) => (
                      <div key={term.id} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{term.title}</h4>
                        <p className="text-gray-700 text-sm">{term.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">لم يتم إضافة بنود للعقد</p>
                )}
              </div>
              
              {selectedContract.amendments.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">تعديلات العقد</h3>
                  <div className="space-y-3">
                    {selectedContract.amendments.map((amendment) => (
                      <div key={amendment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{amendment.number}</h4>
                          <Badge 
                            variant="outline" 
                            className={
                              amendment.status === 'approved' ? 'bg-green-100 text-green-800' :
                              amendment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {amendment.status === 'approved' ? 'مُعتمد' : 
                             amendment.status === 'rejected' ? 'مرفوض' : 'في الانتظار'}
                          </Badge>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{amendment.description}</p>
                        <div className="text-xs text-gray-500">
                          {new Date(amendment.date).toLocaleDateString('ar-SA')}
                          {amendment.reason && ` - ${amendment.reason}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedContract.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">ملاحظات</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{selectedContract.notes}</p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    setShowDetails(false)
                    handleEditContract(selectedContract)
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل العقد
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileDown className="h-4 w-4 mr-2" />
                  تحميل العقد
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetails(false)}
                  className="flex-1"
                >
                  إغلاق
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contract Modal */}
      {showEditModal && editingContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">تعديل العقد</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowEditModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">عنوان العقد</Label>
                  <Input
                    id="edit-title"
                    value={editingContract.title || ''}
                    onChange={(e) => setEditingContract({...editingContract, title: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="edit-type">نوع العقد</Label>
                    <select
                      id="edit-type"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={editingContract.type || ''}
                      onChange={(e) => setEditingContract({...editingContract, type: e.target.value})}
                    >
                      <option value="supply">توريد</option>
                      <option value="service">خدمات</option>
                      <option value="maintenance">صيانة</option>
                      <option value="employment">توظيف</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-status">حالة العقد</Label>
                    <select
                      id="edit-status"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={editingContract.status || ''}
                      onChange={(e) => setEditingContract({...editingContract, status: e.target.value as any})}
                    >
                      <option value="draft">مسودة</option>
                      <option value="active">نشط</option>
                      <option value="expired">منتهي</option>
                      <option value="terminated">منهي</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="edit-start-date">تاريخ البداية</Label>
                    <Input
                      id="edit-start-date"
                      type="date"
                      value={editingContract.startDate || ''}
                      onChange={(e) => setEditingContract({...editingContract, startDate: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-end-date">تاريخ النهاية</Label>
                    <Input
                      id="edit-end-date"
                      type="date"
                      value={editingContract.endDate || ''}
                      onChange={(e) => setEditingContract({...editingContract, endDate: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-value">قيمة العقد</Label>
                  <Input
                    id="edit-value"
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingContract.value || ''}
                    onChange={(e) => setEditingContract({...editingContract, value: parseFloat(e.target.value) || 0})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-description">الوصف</Label>
                  <Textarea
                    id="edit-description"
                    rows={3}
                    value={editingContract.description || ''}
                    onChange={(e) => setEditingContract({...editingContract, description: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-notes">ملاحظات</Label>
                  <Textarea
                    id="edit-notes"
                    rows={2}
                    value={editingContract.notes || ''}
                    onChange={(e) => setEditingContract({...editingContract, notes: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <Button onClick={handleSaveContract} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  حفظ التعديلات
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowEditModal(false)}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


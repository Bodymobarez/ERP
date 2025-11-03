"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight,
  Truck,
  Package,
  Plus,
  Minus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ArrowRightLeft,
  MapPin,
  Calendar,
  FileText,
  AlertCircle,
  Check,
  Clock,
  RotateCcw,
  Save,
  Building,
  Warehouse,
  Boxes
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Types for component data

interface TransferItem {
  itemId: string;
  quantity: number;
  notes?: string;
}

interface TransferFormData {
  fromWarehouseId: string;
  toWarehouseId: string;
  transferDate: string;
  reason: string;
  notes: string;
  items: TransferItem[];
}

export default function InventoryTransfersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('history')
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  
  // Real data states
  const [warehouses, setWarehouses] = useState<any[]>([])
  const [transfers, setTransfers] = useState<any[]>([])
  const [availableItems, setAvailableItems] = useState<any[]>([])
  const [loadingWarehouses, setLoadingWarehouses] = useState(true)
  const [loadingTransfers, setLoadingTransfers] = useState(true)

  const [formData, setFormData] = useState<TransferFormData>({
    fromWarehouseId: '',
    toWarehouseId: '',
    transferDate: new Date().toISOString().split('T')[0] || '',
    reason: '',
    notes: '',
    items: []
  })

  // Load warehouses and transfers data
  useEffect(() => {
    const loadWarehouses = async () => {
      try {
        const response = await fetch('/api/inventory/warehouses')
        if (response.ok) {
          const data = await response.json()
          setWarehouses(data)
        }
      } catch (error) {
        console.error('Error loading warehouses:', error)
      } finally {
        setLoadingWarehouses(false)
      }
    }

    const loadTransfers = async () => {
      try {
        const response = await fetch('/api/inventory/transfers')
        if (response.ok) {
          const data = await response.json()
          setTransfers(data)
        }
      } catch (error) {
        console.error('Error loading transfers:', error)
      } finally {
        setLoadingTransfers(false)
      }
    }

    loadWarehouses()
    loadTransfers()
  }, [])

  // Load available items when from warehouse changes
  useEffect(() => {
    const loadAvailableItems = async () => {
      if (!formData.fromWarehouseId) {
        setAvailableItems([])
        return
      }

      try {
        const response = await fetch(`/api/inventory/warehouses?warehouseId=${formData.fromWarehouseId}`)
        if (response.ok) {
          const data = await response.json()
          setAvailableItems(data)
        }
      } catch (error) {
        console.error('Error loading available items:', error)
        setAvailableItems([])
      }
    }

    loadAvailableItems()
  }, [formData.fromWarehouseId])

  const loadTransfersData = async () => {
    try {
      const response = await fetch('/api/inventory/transfers')
      if (response.ok) {
        const data = await response.json()
        setTransfers(data)
      }
    } catch (error) {
      console.error('Error loading transfers:', error)
    }
  }

  const handleInputChange = (field: keyof TransferFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const addTransferItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { itemId: '', quantity: 0, notes: '' }]
    }))
  }

  const removeTransferItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  const updateTransferItem = (index: number, field: keyof TransferItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.fromWarehouseId) newErrors.fromWarehouseId = "يجب اختيار المخزن المصدر"
    if (!formData.toWarehouseId) newErrors.toWarehouseId = "يجب اختيار المخزن الوجهة"
    if (formData.fromWarehouseId === formData.toWarehouseId) {
      newErrors.toWarehouseId = "المخزن الوجهة يجب أن يكون مختلفاً عن المصدر"
    }
    if (!formData.reason) newErrors.reason = "يجب تحديد سبب النقل"
    if (formData.items.length === 0) newErrors.items = "يجب إضافة صنف واحد على الأقل"
    
    formData.items.forEach((item, index) => {
      if (!item.itemId) newErrors[`item-${index}-itemId`] = "يجب اختيار الصنف"
      if (!item.quantity || item.quantity <= 0) newErrors[`item-${index}-quantity`] = "يجب تحديد كمية صحيحة"
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/inventory/transfers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        
        // Show success message
        const successMessage = document.createElement('div')
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2'
        successMessage.innerHTML = `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          تم إنشاء طلب النقل بنجاح! رقم النقل: ${result.transferNumber}
        `
        document.body.appendChild(successMessage)
        
        setTimeout(() => {
          document.body.removeChild(successMessage)
          setActiveTab('history')
          handleReset()
          // Reload transfers data
          loadTransfersData()
        }, 3000)
      } else {
        const error = await response.json()
        setErrors({ submit: error.error || 'حدث خطأ أثناء إنشاء طلب النقل' })
      }

    } catch (error) {
      setErrors({ submit: 'حدث خطأ أثناء الاتصال بالخادم' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      fromWarehouseId: '',
      toWarehouseId: '',
      transferDate: new Date().toISOString().split('T')[0] || '',
      reason: '',
      notes: '',
      items: []
    })
    setErrors({})
  }

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.transferNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.fromWarehouse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.toWarehouse?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800" 
      case "in-transit": return "bg-blue-100 text-blue-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "مكتمل"
      case "pending": return "في الانتظار"
      case "in-transit": return "قيد النقل"
      case "cancelled": return "ملغي"
      default: return status
    }
  }

  const getWarehouseTypeIcon = (type: string) => {
    switch (type) {
      case "main": return <Building className="h-4 w-4" />
      case "branch": return <Warehouse className="h-4 w-4" />
      case "transit": return <Truck className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  const getWarehouseTypeLabel = (type: string) => {
    switch (type) {
      case "main": return "رئيسي"
      case "branch": return "فرع"
      case "transit": return "عبور"
      default: return type
    }
  }

  const fromWarehouse = warehouses.find(w => w.id === formData.fromWarehouseId)
  const toWarehouse = warehouses.find(w => w.id === formData.toWarehouseId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/inventory">
            <Button variant="outline" size="sm">
              <ArrowRight className="h-4 w-4 mr-2" />
              العودة للمخزون
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">نقل المواد</h1>
            <p className="text-gray-600 mt-1">إدارة عمليات نقل المواد بين المخازن</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              سجل النقل
            </div>
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'new'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              طلب نقل جديد
            </div>
          </button>
        </nav>
      </div>

      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Warehouses Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadingWarehouses ? (
              <div className="col-span-full flex justify-center py-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span>جارٍ تحميل المخازن...</span>
                </div>
              </div>
            ) : warehouses.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <div className="text-gray-500">
                  <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد مخازن مُعرَّفة</p>
                  <p className="text-sm mt-1">يجب إضافة مخازن أولاً لبدء عمليات النقل</p>
                </div>
              </div>
            ) : warehouses.map((warehouse) => (
              <Card key={warehouse.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getWarehouseTypeIcon(warehouse.type)}
                      <div>
                        <h3 className="font-semibold text-sm">{warehouse.name}</h3>
                        <p className="text-xs text-gray-500">{warehouse.code}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {getWarehouseTypeLabel(warehouse.type)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">المخزون:</span>
                      <span className="font-medium">{warehouse.currentStock.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">السعة:</span>
                      <span className="font-medium">{warehouse.capacity.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">الأصناف:</span>
                      <span className="font-medium">{warehouse.items}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(warehouse.currentStock / warehouse.capacity) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {((warehouse.currentStock / warehouse.capacity) * 100).toFixed(1)}% مستخدم
                    </p>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    <MapPin className="h-3 w-3 inline mr-1" />
                    {warehouse.city}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في عمليات النقل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                <option value="all">جميع الحالات</option>
                <option value="completed">مكتمل</option>
                <option value="pending">في الانتظار</option>
                <option value="in-transit">قيد النقل</option>
                <option value="cancelled">ملغي</option>
              </select>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                فلترة
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
            </div>
          </div>

          {/* Transfers Table */}
          <Card>
            <CardHeader>
              <CardTitle>سجل عمليات النقل</CardTitle>
              <CardDescription>قائمة بجميع عمليات نقل المواد بين المخازن</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-right p-3 font-semibold">رقم النقل</th>
                      <th className="text-right p-3 font-semibold">التاريخ</th>
                      <th className="text-right p-3 font-semibold">من</th>
                      <th className="text-right p-3 font-semibold">إلى</th>
                      <th className="text-right p-3 font-semibold">الأصناف</th>
                      <th className="text-right p-3 font-semibold">طلب بواسطة</th>
                      <th className="text-right p-3 font-semibold">الحالة</th>
                      <th className="text-right p-3 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingTransfers ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            <span>جارٍ تحميل عمليات النقل...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredTransfers.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-gray-500">
                          لا توجد عمليات نقل
                        </td>
                      </tr>
                    ) : filteredTransfers.map((transfer) => (
                      <tr key={transfer.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium">{transfer.transferNumber}</div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{transfer.date}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{transfer.fromWarehouse}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{transfer.toWarehouse}</div>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            {transfer.items && transfer.items.length > 0 ? (
                              transfer.items.map((item: any, index: number) => (
                                <div key={index} className="text-xs">
                                  <span className="font-medium">{item.name}</span>
                                  <span className="text-gray-500 mr-2">
                                    ({item.quantity} {item.unit})
                                  </span>
                                </div>
                              ))
                            ) : (
                              <span className="text-gray-500 text-xs">لا توجد تفاصيل</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">{transfer.requestedBy || 'غير محدد'}</div>
                          {transfer.approvedBy && (
                            <div className="text-xs text-gray-500">
                              اعتمد: {transfer.approvedBy}
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(transfer.status)}>
                            {getStatusLabel(transfer.status)}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
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
        </div>
      )}

      {activeTab === 'new' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transfer Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowRightLeft className="h-5 w-5" />
                    تفاصيل النقل
                  </CardTitle>
                  <CardDescription>معلومات عملية النقل بين المخازن</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Warehouses Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>من مخزن *</Label>
                      <Select 
                        value={formData.fromWarehouseId} 
                        onValueChange={(value) => handleInputChange('fromWarehouseId', value)}
                      >
                        <SelectTrigger className={errors.fromWarehouseId ? 'border-red-500' : ''}>
                          <SelectValue placeholder="اختر المخزن المصدر">
                            {fromWarehouse && (
                              <div className="flex items-center gap-2">
                                {getWarehouseTypeIcon(fromWarehouse.type)}
                                <span>{fromWarehouse.name}</span>
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {warehouses.map((warehouse) => (
                            <SelectItem key={warehouse.id} value={warehouse.id}>
                              <div className="flex items-center gap-2">
                                {getWarehouseTypeIcon(warehouse.type)}
                                <div>
                                  <div className="font-medium">{warehouse.name}</div>
                                  <div className="text-xs text-gray-500">{warehouse.city} • {warehouse.currentStock.toLocaleString()} متوفر</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.fromWarehouseId && <p className="text-sm text-red-500">{errors.fromWarehouseId}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>إلى مخزن *</Label>
                      <Select 
                        value={formData.toWarehouseId} 
                        onValueChange={(value) => handleInputChange('toWarehouseId', value)}
                      >
                        <SelectTrigger className={errors.toWarehouseId ? 'border-red-500' : ''}>
                          <SelectValue placeholder="اختر المخزن الوجهة">
                            {toWarehouse && (
                              <div className="flex items-center gap-2">
                                {getWarehouseTypeIcon(toWarehouse.type)}
                                <span>{toWarehouse.name}</span>
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {warehouses
                            .filter(w => w.id !== formData.fromWarehouseId)
                            .map((warehouse) => (
                            <SelectItem key={warehouse.id} value={warehouse.id}>
                              <div className="flex items-center gap-2">
                                {getWarehouseTypeIcon(warehouse.type)}
                                <div>
                                  <div className="font-medium">{warehouse.name}</div>
                                  <div className="text-xs text-gray-500">{warehouse.city} • {((warehouse.capacity - warehouse.currentStock)).toLocaleString()} متاح</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.toWarehouseId && <p className="text-sm text-red-500">{errors.toWarehouseId}</p>}
                    </div>
                  </div>

                  {/* Transfer Date and Reason */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transferDate">تاريخ النقل *</Label>
                      <Input
                        id="transferDate"
                        type="date"
                        value={formData.transferDate}
                        onChange={(e) => handleInputChange('transferDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">سبب النقل *</Label>
                      <Input
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        placeholder="مثال: نقص المخزون، إعادة توزيع"
                        className={errors.reason ? 'border-red-500' : ''}
                      />
                      {errors.reason && <p className="text-sm text-red-500">{errors.reason}</p>}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">ملاحظات</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="ملاحظات إضافية حول عملية النقل..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Items to Transfer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Boxes className="h-5 w-5" />
                    الأصناف المراد نقلها
                  </CardTitle>
                  <CardDescription>قائمة المواد التي سيتم نقلها</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.items.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">الصنف #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTransferItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>الصنف *</Label>
                          <Select 
                            value={item.itemId} 
                            onValueChange={(value) => updateTransferItem(index, 'itemId', value)}
                          >
                            <SelectTrigger className={errors[`item-${index}-itemId`] ? 'border-red-500' : ''}>
                              <SelectValue placeholder="اختر الصنف">
                                {(() => {
                                  const selectedItem = availableItems.find(i => i.id === item.itemId)
                                  return selectedItem && (
                                    <div>
                                      <div className="font-medium">{selectedItem.name}</div>
                                      <div className="text-xs text-gray-500">{selectedItem.sku}</div>
                                    </div>
                                  )
                                })()}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {availableItems.length === 0 ? (
                                <div className="p-4 text-center text-gray-500">
                                  <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                  <p className="text-sm">لا توجد أصناف متاحة في هذا المخزن</p>
                                </div>
                              ) : availableItems.map((availableItem) => (
                                <SelectItem key={availableItem.id} value={availableItem.id}>
                                  <div>
                                    <div className="font-medium">{availableItem.name}</div>
                                    <div className="text-xs text-gray-500">
                                      {availableItem.sku} • متوفر: {availableItem.availableQuantity} {availableItem.unit}
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors[`item-${index}-itemId`] && <p className="text-sm text-red-500">{errors[`item-${index}-itemId`]}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label>الكمية *</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => updateTransferItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                            className={errors[`item-${index}-quantity`] ? 'border-red-500' : ''}
                          />
                          {errors[`item-${index}-quantity`] && <p className="text-sm text-red-500">{errors[`item-${index}-quantity`]}</p>}
                          {(() => {
                            const selectedItem = availableItems.find(i => i.id === item.itemId)
                            return selectedItem && (
                              <p className="text-xs text-gray-500">
                                متوفر: {selectedItem.availableQuantity} {selectedItem.unit}
                              </p>
                            )
                          })()}
                        </div>

                        <div className="space-y-2">
                          <Label>ملاحظات</Label>
                          <Input
                            value={item.notes || ''}
                            onChange={(e) => updateTransferItem(index, 'notes', e.target.value)}
                            placeholder="ملاحظات للصنف..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {errors.items && <p className="text-sm text-red-500">{errors.items}</p>}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTransferItem}
                    className="w-full"
                    disabled={!formData.fromWarehouseId}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة صنف
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              {/* Transfer Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    ملخص النقل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>من:</span>
                      <span>{fromWarehouse?.name || '---'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>إلى:</span>
                      <span>{toWarehouse?.name || '---'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>التاريخ:</span>
                      <span>{formData.transferDate || '---'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>عدد الأصناف:</span>
                      <span>{formData.items.length}</span>
                    </div>
                  </div>

                  {formData.items.length > 0 && (
                    <div className="pt-3 border-t">
                      <h4 className="font-medium mb-2">الأصناف:</h4>
                      <div className="space-y-1">
                        {formData.items.map((item, index) => {
                          const selectedItem = availableItems.find(i => i.id === item.itemId)
                          return selectedItem && (
                            <div key={index} className="text-xs">
                              <div className="font-medium">{selectedItem.name}</div>
                              <div className="text-gray-500">
                                {item.quantity} {selectedItem.unit}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Warehouse Details */}
              {(fromWarehouse || toWarehouse) && (
                <Card>
                  <CardHeader>
                    <CardTitle>تفاصيل المخازن</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {fromWarehouse && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">المصدر:</h4>
                        <div className="bg-blue-50 p-3 rounded-lg text-sm">
                          <div className="font-medium">{fromWarehouse.name}</div>
                          <div className="text-gray-600">{fromWarehouse.address}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            المخزون: {fromWarehouse.currentStock.toLocaleString()} / {fromWarehouse.capacity.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}

                    {toWarehouse && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">الوجهة:</h4>
                        <div className="bg-green-50 p-3 rounded-lg text-sm">
                          <div className="font-medium">{toWarehouse.name}</div>
                          <div className="text-gray-600">{toWarehouse.address}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            متاح: {(toWarehouse.capacity - toWarehouse.currentStock).toLocaleString()} / {toWarehouse.capacity.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <Card>
            <CardContent className="p-6">
              {errors.submit && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-700">{errors.submit}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  إعادة تعيين
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="min-w-[120px]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      جارٍ الحفظ...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      إنشاء طلب النقل
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      )}
    </div>
  )
}
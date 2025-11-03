'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  FileText, 
  Building2, 
  User,
  Calendar,
  DollarSign,
  AlertCircle 
} from 'lucide-react'

interface ContractTerm {
  id?: string
  title: string
  description: string
  order: number
}

interface ContractAmendment {
  id?: string
  number: string
  date: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  reason?: string
}

interface Client {
  id: string
  name: string
  code: string
}

interface Supplier {
  id: string
  name: string
  code: string
}

export default function NewContractPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  // Contract form data
  const [formData, setFormData] = useState({
    title: '',
    type: 'supply' as 'supply' | 'service' | 'maintenance' | 'employment' | 'other',
    status: 'draft' as 'draft' | 'active' | 'expired' | 'terminated',
    startDate: '',
    endDate: '',
    value: 0,
    description: '',
    notes: '',
    clientId: '',
    supplierId: ''
  })

  // Contract terms and amendments
  const [terms, setTerms] = useState<ContractTerm[]>([])
  const [amendments, setAmendments] = useState<ContractAmendment[]>([])

  // Load clients and suppliers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, suppliersRes] = await Promise.all([
          fetch('/api/clients'),
          fetch('/api/suppliers')
        ])

        if (clientsRes.ok) {
          const clientsData = await clientsRes.json()
          setClients(clientsData)
        }

        if (suppliersRes.ok) {
          const suppliersData = await suppliersRes.json()
          setSuppliers(suppliersData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.title.trim()) {
      newErrors.title = 'عنوان العقد مطلوب'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'تاريخ البداية مطلوب'
    }

    if (!formData.endDate) {
      newErrors.endDate = 'تاريخ النهاية مطلوب'
    }

    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية'
    }

    if (formData.value <= 0) {
      newErrors.value = 'قيمة العقد يجب أن تكون أكبر من صفر'
    }

    if (!formData.clientId && !formData.supplierId) {
      newErrors.party = 'يجب اختيار عميل أو مورد'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const contractData = {
        ...formData,
        terms: terms.map((term, index) => ({
          title: term.title,
          description: term.description,
          order: index + 1
        })),
        amendments: amendments.map(amendment => ({
          number: amendment.number,
          date: amendment.date,
          description: amendment.description,
          status: amendment.status,
          reason: amendment.reason
        }))
      }

      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData),
      })

      if (response.ok) {
        const newContract = await response.json()
        router.push(`/dashboard/contracts?created=${newContract.id}`)
      } else {
        const errorData = await response.json()
        setErrors({ submit: errorData.error || 'فشل في إنشاء العقد' })
      }
    } catch (error) {
      console.error('Error creating contract:', error)
      setErrors({ submit: 'حدث خطأ غير متوقع' })
    } finally {
      setLoading(false)
    }
  }

  const addTerm = () => {
    setTerms([...terms, {
      title: '',
      description: '',
      order: terms.length + 1
    }])
  }

  const updateTerm = (index: number, field: keyof ContractTerm, value: string | number) => {
    const updatedTerms = [...terms]
    const current = updatedTerms[index]
    
    if (!current) return
    
    const updatedTerm: ContractTerm = {
      id: current.id,
      title: field === 'title' ? (value as string) : current.title,
      description: field === 'description' ? (value as string) : current.description,
      order: field === 'order' ? (value as number) : current.order
    }
    
    updatedTerms[index] = updatedTerm
    setTerms(updatedTerms)
  }

  const removeTerm = (index: number) => {
    const updatedTerms = terms.filter((_, i) => i !== index)
    // Update order numbers
    updatedTerms.forEach((term, i) => {
      term.order = i + 1
    })
    setTerms(updatedTerms)
  }

  const addAmendment = () => {
    const today = new Date().toISOString().split('T')[0] || ''
    const newAmendment: ContractAmendment = {
      number: `AMD-${String(amendments.length + 1).padStart(3, '0')}`,
      date: today,
      description: '',
      status: 'pending'
    }
    setAmendments([...amendments, newAmendment])
  }

  const updateAmendment = (index: number, field: keyof ContractAmendment, value: string) => {
    const updatedAmendments = [...amendments]
    const current = updatedAmendments[index]
    
    if (!current) return
    
    const updatedAmendment: ContractAmendment = {
      id: current.id,
      number: field === 'number' ? value : current.number,
      date: field === 'date' ? value : current.date,
      description: field === 'description' ? value : current.description,
      status: field === 'status' ? (value as 'pending' | 'approved' | 'rejected') : current.status,
      reason: field === 'reason' ? value : current.reason
    }
    
    updatedAmendments[index] = updatedAmendment
    setAmendments(updatedAmendments)
  }

  const removeAmendment = (index: number) => {
    setAmendments(amendments.filter((_, i) => i !== index))
  }

  const getTypeLabel = (type: string) => {
    const types = {
      supply: 'توريد',
      service: 'خدمات',
      maintenance: 'صيانة',
      employment: 'توظيف',
      other: 'أخرى'
    }
    return types[type as keyof typeof types] || type
  }

  const getStatusLabel = (status: string) => {
    const statuses = {
      draft: 'مسودة',
      active: 'نشط',
      expired: 'منتهي',
      terminated: 'منهي'
    }
    return statuses[status as keyof typeof statuses] || status
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            رجوع
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">عقد جديد</h1>
            <p className="text-gray-600">إنشاء عقد جديد في النظام</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          مسودة
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              المعلومات الأساسية
            </CardTitle>
            <CardDescription>
              أدخل البيانات الأساسية للعقد
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="title">عنوان العقد *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="أدخل عنوان العقد"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="type">نوع العقد</Label>
                <select
                  id="type"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                >
                  <option value="supply">توريد</option>
                  <option value="service">خدمات</option>
                  <option value="maintenance">صيانة</option>
                  <option value="employment">توظيف</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div>
                <Label htmlFor="status">حالة العقد</Label>
                <select
                  id="status"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="draft">مسودة</option>
                  <option value="active">نشط</option>
                  <option value="expired">منتهي</option>
                  <option value="terminated">منهي</option>
                </select>
              </div>

              <div>
                <Label htmlFor="value">قيمة العقد (ريال سعودي) *</Label>
                <div className="relative">
                  <DollarSign className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="value"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.value || ''}
                    onChange={(e) => setFormData({...formData, value: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                    className={`pr-10 ${errors.value ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.value && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.value}
                  </p>
                )}
                {formData.value > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {formatCurrency(formData.value)}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="startDate">تاريخ البداية *</Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className={`pr-10 ${errors.startDate ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.startDate && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.startDate}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="endDate">تاريخ النهاية *</Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className={`pr-10 ${errors.endDate ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.endDate && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.endDate}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">وصف العقد</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="أدخل وصف مفصل للعقد..."
              />
            </div>

            <div>
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="أي ملاحظات إضافية..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Party Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              الطرف الآخر في العقد
            </CardTitle>
            <CardDescription>
              اختر العميل أو المورد المتعاقد معه
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="clientId">العميل</Label>
                <select
                  id="clientId"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.clientId}
                  onChange={(e) => setFormData({...formData, clientId: e.target.value, supplierId: ''})}
                >
                  <option value="">اختر عميل...</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} ({client.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="supplierId">المورد</Label>
                <select
                  id="supplierId"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.supplierId}
                  onChange={(e) => setFormData({...formData, supplierId: e.target.value, clientId: ''})}
                >
                  <option value="">اختر مورد...</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name} ({supplier.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {errors.party && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.party}
              </p>
            )}

            {(formData.clientId || formData.supplierId) && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-blue-800">
                  {formData.clientId ? <User className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                  <span className="font-medium">
                    {formData.clientId 
                      ? clients.find(c => c.id === formData.clientId)?.name
                      : suppliers.find(s => s.id === formData.supplierId)?.name
                    }
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contract Terms */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>بنود العقد</CardTitle>
                <CardDescription>
                  أضف البنود والشروط الخاصة بالعقد
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addTerm}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                إضافة بند
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {terms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>لم يتم إضافة بنود للعقد بعد</p>
                <p className="text-sm">انقر على "إضافة بند" لإضافة بند جديد</p>
              </div>
            ) : (
              <div className="space-y-4">
                {terms.map((term, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">البند {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTerm(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`term-title-${index}`}>عنوان البند</Label>
                        <Input
                          id={`term-title-${index}`}
                          value={term.title}
                          onChange={(e) => updateTerm(index, 'title', e.target.value)}
                          placeholder="أدخل عنوان البند"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`term-description-${index}`}>وصف البند</Label>
                        <Textarea
                          id={`term-description-${index}`}
                          rows={2}
                          value={term.description}
                          onChange={(e) => updateTerm(index, 'description', e.target.value)}
                          placeholder="أدخل وصف مفصل للبند"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <Card>
          <CardContent className="p-6">
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {errors.submit}
                </p>
              </div>
            )}

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {loading ? 'جاري الحفظ...' : 'حفظ العقد'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
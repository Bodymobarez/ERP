"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Send,
  Calculator,
  FileText,
  Building2,
  Calendar,
  DollarSign,
  Info,
  CheckCircle2
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

const projects = [
  { id: "1", name: "البرج السكني - الرياض", contractValue: 15000000, previousPayments: 8500000 },
  { id: "2", name: "الفيلا السكنية - جدة", contractValue: 8000000, previousPayments: 3200000 },
  { id: "3", name: "المجمع التجاري - الدمام", contractValue: 25000000, previousPayments: 12000000 },
  { id: "4", name: "المصنع - الخبر", contractValue: 18000000, previousPayments: 7500000 }
]

interface WorkItem {
  id: string
  description: string
  budgetAmount: number
  previousExecution: number
  currentExecution: number
  percentage: number
  amount: number
}

export default function NewProgressPaymentPage() {
  const { t, lang } = useLanguage()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    project: "",
    paymentNumber: "",
    description: "",
    consultant: "",
    submissionDate: "",
    workPeriodFrom: "",
    workPeriodTo: "",
    notes: ""
  })

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const [items, setItems] = useState<WorkItem[]>([
    { 
      id: "1",
      description: "",
      budgetAmount: 0,
      previousExecution: 0,
      currentExecution: 0,
      percentage: 0,
      amount: 0
    }
  ])

  const [financials, setFinancials] = useState({
    retentionRate: 10, // 10%
    taxRate: 15, // 15%
    advancePayment: 0,
    otherDeductions: 0
  })

  // Calculations
  const totalWorkDone = items.reduce((sum, item) => sum + item.amount, 0)
  const retention = (totalWorkDone * financials.retentionRate) / 100
  const subtotal = totalWorkDone - financials.advancePayment - retention - financials.otherDeductions
  const tax = (subtotal * financials.taxRate) / 100
  const netAmount = subtotal + tax

  const addItem = () => {
    setItems([...items, {
      id: Date.now().toString(),
      description: "",
      budgetAmount: 0,
      previousExecution: 0,
      currentExecution: 0,
      percentage: 0,
      amount: 0
    }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof WorkItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        
        // Auto-calculate percentage and amount
        if (field === 'currentExecution' || field === 'budgetAmount') {
          if (updated.budgetAmount > 0) {
            updated.percentage = (updated.currentExecution / updated.budgetAmount) * 100
          }
          updated.amount = updated.currentExecution
        }
        
        return updated
      }
      return item
    }))
  }

  const handleProjectChange = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    setSelectedProject(project || null)
    setFormData({...formData, project: projectId})
  }

  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('Form Data:', formData)
    console.log('Items:', items)
    console.log('Financials:', { totalWorkDone, retention, tax, netAmount })
    console.log('Action:', action)
    
    router.push('/dashboard/finance')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/finance">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مستخلص جديد</h1>
          <p className="text-gray-600 mt-1">Progress Payment - إنشاء مستخلص مالي للمشروع</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                معلومات المستخلص
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project">المشروع *</Label>
                  <select
                    id="project"
                    value={formData.project}
                    onChange={(e) => handleProjectChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر المشروع</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentNumber">رقم المستخلص *</Label>
                  <Input
                    id="paymentNumber"
                    placeholder="مثال: 3 (المستخلص الثالث)"
                    value={formData.paymentNumber}
                    onChange={(e) => setFormData({...formData, paymentNumber: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultant">الاستشاري/المهندس *</Label>
                  <Input
                    id="consultant"
                    placeholder="م. خالد الاستشاري"
                    value={formData.consultant}
                    onChange={(e) => setFormData({...formData, consultant: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="submissionDate">تاريخ التقديم *</Label>
                  <Input
                    id="submissionDate"
                    type="date"
                    value={formData.submissionDate}
                    onChange={(e) => setFormData({...formData, submissionDate: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workPeriodFrom">فترة العمل من</Label>
                  <Input
                    id="workPeriodFrom"
                    type="date"
                    value={formData.workPeriodFrom}
                    onChange={(e) => setFormData({...formData, workPeriodFrom: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workPeriodTo">إلى</Label>
                  <Input
                    id="workPeriodTo"
                    type="date"
                    value={formData.workPeriodTo}
                    onChange={(e) => setFormData({...formData, workPeriodTo: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف المستخلص *</Label>
                <Input
                  id="description"
                  placeholder="مثال: المستخلص الثالث - أعمال الهيكل الخرساني للأدوار 10-12"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              {selectedProject && (
                <div className="grid grid-cols-2 gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">قيمة العقد</p>
                    <p className="text-lg font-bold text-purple-600">{formatCurrency(selectedProject.contractValue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">المستخلصات السابقة</p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(selectedProject.previousPayments)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">المتبقي من العقد</p>
                    <p className="text-lg font-bold text-orange-600">
                      {formatCurrency(selectedProject.contractValue - selectedProject.previousPayments)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">نسبة الإنجاز</p>
                    <p className="text-lg font-bold text-green-600">
                      {((selectedProject.previousPayments / selectedProject.contractValue) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Work Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  بنود الأعمال المنفذة
                </CardTitle>
                <Button size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة بند
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="p-4 border rounded-lg space-y-3 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">بند {index + 1}</Badge>
                      {items.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>وصف البند *</Label>
                      <Input
                        placeholder="مثال: أعمال الخرسانة المسلحة - الأدوار 10-12"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="space-y-2">
                        <Label>قيمة البند بالعقد</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.budgetAmount || ''}
                          onChange={(e) => updateItem(item.id, 'budgetAmount', parseFloat(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>المنفذ سابقاً</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.previousExecution || ''}
                          onChange={(e) => updateItem(item.id, 'previousExecution', parseFloat(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>المنفذ حالياً *</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.currentExecution || ''}
                          onChange={(e) => updateItem(item.id, 'currentExecution', parseFloat(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>نسبة الإنجاز</Label>
                        <div className="flex items-center gap-2 h-10">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${Math.min(item.percentage, 100)}%` }}
                            />
                          </div>
                          <span className="font-bold text-sm">{item.percentage.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-gray-600">قيمة هذا البند:</span>
                      <span className="text-xl font-bold text-purple-600">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Adjustments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                التسويات المالية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="retentionRate">نسبة الاستقطاع الضماني (%)</Label>
                  <Input
                    id="retentionRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={financials.retentionRate}
                    onChange={(e) => setFinancials({...financials, retentionRate: parseFloat(e.target.value) || 0})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxRate">نسبة ضريبة القيمة المضافة (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={financials.taxRate}
                    onChange={(e) => setFinancials({...financials, taxRate: parseFloat(e.target.value) || 0})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="advancePayment">خصم الدفعة المقدمة</Label>
                  <Input
                    id="advancePayment"
                    type="number"
                    min="0"
                    step="0.01"
                    value={financials.advancePayment || ''}
                    onChange={(e) => setFinancials({...financials, advancePayment: parseFloat(e.target.value) || 0})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherDeductions">خصومات أخرى</Label>
                  <Input
                    id="otherDeductions"
                    type="number"
                    min="0"
                    step="0.01"
                    value={financials.otherDeductions || ''}
                    onChange={(e) => setFinancials({...financials, otherDeductions: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>ملاحظات</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="أضف أي ملاحظات أو مرفقات للمستخلص..."
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Calculation Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                ملخص الحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">قيمة الأعمال المنفذة:</span>
                  <span className="font-bold">{formatCurrency(totalWorkDone)}</span>
                </div>
                
                {financials.advancePayment > 0 && (
                  <div className="flex justify-between p-2 bg-red-50 rounded">
                    <span className="text-red-600">(-) الدفعة المقدمة:</span>
                    <span className="font-bold text-red-600">({formatCurrency(financials.advancePayment)})</span>
                  </div>
                )}
                
                <div className="flex justify-between p-2 bg-red-50 rounded">
                  <span className="text-red-600">(-) استقطاع ضماني {financials.retentionRate}%:</span>
                  <span className="font-bold text-red-600">({formatCurrency(retention)})</span>
                </div>
                
                {financials.otherDeductions > 0 && (
                  <div className="flex justify-between p-2 bg-red-50 rounded">
                    <span className="text-red-600">(-) خصومات أخرى:</span>
                    <span className="font-bold text-red-600">({formatCurrency(financials.otherDeductions)})</span>
                  </div>
                )}
                
                <div className="flex justify-between p-2 bg-blue-50 rounded font-semibold">
                  <span>المجموع الفرعي:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex justify-between p-2 bg-green-50 rounded">
                  <span className="text-green-600">(+) ضريبة {financials.taxRate}%:</span>
                  <span className="font-bold text-green-600">{formatCurrency(tax)}</span>
                </div>
                
                <div className="flex justify-between p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border-2 border-green-500">
                  <span className="font-bold text-lg">صافي المستحق:</span>
                  <span className="font-bold text-green-600 text-2xl">{formatCurrency(netAmount)}</span>
                </div>
              </div>

              <div className="pt-4 space-y-2 border-t">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  onClick={() => handleSubmit('submit')}
                  disabled={items.some(i => !i.description || i.amount === 0)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  تقديم للاعتماد
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSubmit('save')}
                >
                  <Save className="h-4 w-4 mr-2" />
                  حفظ كمسودة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          {selectedProject && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">معلومات المشروع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">قيمة العقد الإجمالية</p>
                  <p className="text-xl font-bold text-purple-600">{formatCurrency(selectedProject.contractValue)}</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">المستلم حتى الآن</p>
                  <p className="text-xl font-bold text-blue-600">{formatCurrency(selectedProject.previousPayments)}</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">المستحق الحالي</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(netAmount)}</p>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">المتبقي بعد المستخلص</p>
                  <p className="text-xl font-bold text-orange-600">
                    {formatCurrency(selectedProject.contractValue - selectedProject.previousPayments - netAmount)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2 text-sm text-blue-900">
                  <p><strong>نظام المستخلصات:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>استقطاع ضماني 10% (يسترد عند التسليم النهائي)</li>
                    <li>ضريبة القيمة المضافة 15%</li>
                    <li>خصم الدفعة المقدمة من المستخلص الأول</li>
                    <li>مراجعة الاستشاري ضرورية</li>
                    <li>الدفع خلال 30 يوم من الاعتماد</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


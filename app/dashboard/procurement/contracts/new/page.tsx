'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Users, DollarSign, Plus, Trash2, Save, ArrowRight } from 'lucide-react';

interface ContractTerm {
  id: string;
  title: string;
  description: string;
}

interface ContractFormData {
  title: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  value: string;
  currency: string;
  description: string;
  notes: string;
  clientId: string;
  supplierId: string;
  paymentTerms: string;
  deliveryTerms: string;
}

const contractTypes = [
  { value: 'supply', label: 'عقد توريد', color: 'bg-blue-500' },
  { value: 'service', label: 'عقد خدمات', color: 'bg-green-500' },
  { value: 'maintenance', label: 'عقد صيانة', color: 'bg-orange-500' },
  { value: 'construction', label: 'عقد إنشاءات', color: 'bg-purple-500' },
  { value: 'rental', label: 'عقد إيجار', color: 'bg-teal-500' },
];

const contractStatuses = [
  { value: 'draft', label: 'مسودة', color: 'bg-gray-500' },
  { value: 'pending', label: 'قيد المراجعة', color: 'bg-yellow-500' },
  { value: 'active', label: 'فعال', color: 'bg-green-500' },
  { value: 'expired', label: 'منتهي', color: 'bg-red-500' },
  { value: 'terminated', label: 'ملغي', color: 'bg-gray-700' },
];

const currencies = [
  { value: 'SAR', label: 'ريال سعودي (SAR)' },
  { value: 'USD', label: 'دولار أمريكي (USD)' },
  { value: 'EUR', label: 'يورو (EUR)' },
  { value: 'AED', label: 'درهم إماراتي (AED)' },
];

const mockClients = [
  { id: '1', name: 'شركة البناء المتطور' },
  { id: '2', name: 'مؤسسة الخليج للإنشاءات' },
  { id: '3', name: 'شركة النهضة العقارية' },
];

const mockSuppliers = [
  { id: '1', name: 'شركة المعدات الثقيلة' },
  { id: '2', name: 'مؤسسة التوريدات الصناعية' },
  { id: '3', name: 'شركة الخدمات المتخصصة' },
];

export default function NewContractPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<ContractFormData>({
    title: '',
    type: '',
    status: 'draft',
    startDate: '',
    endDate: '',
    value: '',
    currency: 'SAR',
    description: '',
    notes: '',
    clientId: '',
    supplierId: '',
    paymentTerms: '',
    deliveryTerms: '',
  });

  const [terms, setTerms] = useState<ContractTerm[]>([
    {
      id: '1',
      title: 'شروط التسليم',
      description: 'يتم التسليم خلال 30 يوم من تاريخ الطلب'
    }
  ]);

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: keyof ContractFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addTerm = () => {
    const newTerm: ContractTerm = {
      id: Date.now().toString(),
      title: '',
      description: ''
    };
    setTerms(prev => [...prev, newTerm]);
  };

  const removeTerm = (id: string) => {
    setTerms(prev => prev.filter(term => term.id !== id));
  };

  const updateTerm = (id: string, field: keyof ContractTerm, value: string) => {
    setTerms(prev => prev.map(term => 
      term.id === id 
        ? { ...term, [field]: value }
        : term
    ));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) {
      newErrors.title = 'عنوان العقد مطلوب';
    }

    if (!formData.type) {
      newErrors.type = 'نوع العقد مطلوب';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'تاريخ البداية مطلوب';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'تاريخ النهاية مطلوب';
    }

    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية';
    }

    if (!formData.value.trim()) {
      newErrors.value = 'قيمة العقد مطلوبة';
    } else if (isNaN(Number(formData.value)) || Number(formData.value) <= 0) {
      newErrors.value = 'قيمة العقد يجب أن تكون رقماً موجباً';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف العقد مطلوب';
    }

    if (!formData.clientId) {
      newErrors.clientId = 'العميل مطلوب';
    }

    if (!formData.supplierId) {
      newErrors.supplierId = 'المورد مطلوب';
    }

    // التحقق من الشروط
    terms.forEach((term, index) => {
      if (!term.title.trim()) {
        newErrors[`term_title_${term.id}`] = `عنوان الشرط ${index + 1} مطلوب`;
      }
      if (!term.description.trim()) {
        newErrors[`term_description_${term.id}`] = `وصف الشرط ${index + 1} مطلوب`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const contractData = {
        ...formData,
        value: Number(formData.value),
        terms: terms.filter(term => term.title.trim() && term.description.trim())
      };

      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // إظهار رسالة نجاح
      alert('تم إنشاء العقد بنجاح!');
      
      // العودة إلى صفحة العقود
      router.push('/dashboard/procurement/contracts');
      
    } catch (error) {
      console.error('خطأ في إنشاء العقد:', error);
      alert('حدث خطأ في إنشاء العقد');
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeInfo = (type: string) => {
    return contractTypes.find(t => t.value === type);
  };

  const getStatusInfo = (status: string) => {
    return contractStatuses.find(s => s.value === status);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إنشاء عقد جديد</h1>
            <p className="text-gray-600">إضافة عقد جديد إلى نظام إدارة المشتريات</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* المعلومات الأساسية */}
        <div className="lg:col-span-2 space-y-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">عنوان العقد *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="أدخل عنوان العقد"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="type">نوع العقد *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="اختر نوع العقد" />
                    </SelectTrigger>
                    <SelectContent>
                      {contractTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type}</p>}
                </div>

                <div>
                  <Label htmlFor="status">حالة العقد</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contractStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                            {status.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="startDate">تاريخ البداية *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className={errors.startDate ? 'border-red-500' : ''}
                  />
                  {errors.startDate && <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>}
                </div>

                <div>
                  <Label htmlFor="endDate">تاريخ النهاية *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className={errors.endDate ? 'border-red-500' : ''}
                  />
                  {errors.endDate && <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>}
                </div>

                <div>
                  <Label htmlFor="value">قيمة العقد *</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => handleInputChange('value', e.target.value)}
                    placeholder="0.00"
                    className={errors.value ? 'border-red-500' : ''}
                  />
                  {errors.value && <p className="text-sm text-red-600 mt-1">{errors.value}</p>}
                </div>

                <div>
                  <Label htmlFor="currency">العملة</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">وصف العقد *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="أدخل وصف تفصيلي للعقد"
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
              </div>

              <div>
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="أدخل أي ملاحظات إضافية"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* الأطراف المتعاقدة */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                الأطراف المتعاقدة
              </CardTitle>
              <CardDescription>
                حدد العميل والمورد المتعاقدين
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientId">العميل *</Label>
                  <Select value={formData.clientId} onValueChange={(value) => handleInputChange('clientId', value)}>
                    <SelectTrigger className={errors.clientId ? 'border-red-500' : ''}>
                      <SelectValue placeholder="اختر العميل" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.clientId && <p className="text-sm text-red-600 mt-1">{errors.clientId}</p>}
                </div>

                <div>
                  <Label htmlFor="supplierId">المورد *</Label>
                  <Select value={formData.supplierId} onValueChange={(value) => handleInputChange('supplierId', value)}>
                    <SelectTrigger className={errors.supplierId ? 'border-red-500' : ''}>
                      <SelectValue placeholder="اختر المورد" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSuppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.supplierId && <p className="text-sm text-red-600 mt-1">{errors.supplierId}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paymentTerms">شروط الدفع</Label>
                  <Textarea
                    id="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                    placeholder="أدخل شروط الدفع"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryTerms">شروط التسليم</Label>
                  <Textarea
                    id="deliveryTerms"
                    value={formData.deliveryTerms}
                    onChange={(e) => handleInputChange('deliveryTerms', e.target.value)}
                    placeholder="أدخل شروط التسليم"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* الشروط والأحكام */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                الشروط والأحكام
              </CardTitle>
              <CardDescription>
                أضف الشروط والأحكام الخاصة بالعقد
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {terms.map((term, index) => (
                <div key={term.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">الشرط {index + 1}</h4>
                    {terms.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTerm(term.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor={`term_title_${term.id}`}>عنوان الشرط</Label>
                    <Input
                      id={`term_title_${term.id}`}
                      value={term.title}
                      onChange={(e) => updateTerm(term.id, 'title', e.target.value)}
                      placeholder="أدخل عنوان الشرط"
                      className={errors[`term_title_${term.id}`] ? 'border-red-500' : ''}
                    />
                    {errors[`term_title_${term.id}`] && (
                      <p className="text-sm text-red-600 mt-1">{errors[`term_title_${term.id}`]}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`term_description_${term.id}`}>وصف الشرط</Label>
                    <Textarea
                      id={`term_description_${term.id}`}
                      value={term.description}
                      onChange={(e) => updateTerm(term.id, 'description', e.target.value)}
                      placeholder="أدخل وصف تفصيلي للشرط"
                      rows={3}
                      className={errors[`term_description_${term.id}`] ? 'border-red-500' : ''}
                    />
                    {errors[`term_description_${term.id}`] && (
                      <p className="text-sm text-red-600 mt-1">{errors[`term_description_${term.id}`]}</p>
                    )}
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addTerm}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                إضافة شرط جديد
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* ملخص العقد */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                ملخص العقد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">النوع:</span>
                  {formData.type ? (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${getTypeInfo(formData.type)?.color}`}></div>
                      {getTypeInfo(formData.type)?.label}
                    </Badge>
                  ) : (
                    <span className="text-sm text-gray-400">غير محدد</span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">الحالة:</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusInfo(formData.status)?.color}`}></div>
                    {getStatusInfo(formData.status)?.label}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">القيمة:</span>
                  <span className="font-medium">
                    {formData.value ? `${Number(formData.value).toLocaleString()} ${formData.currency}` : '0 SAR'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">المدة:</span>
                  <span className="text-sm">
                    {formData.startDate && formData.endDate ? (
                      `${Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))} يوم`
                    ) : (
                      'غير محددة'
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">عدد الشروط:</span>
                  <span className="text-sm">{terms.length}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">تاريخ البداية:</span>
                  <span className="text-sm">
                    {formData.startDate ? new Date(formData.startDate).toLocaleDateString('ar-SA') : 'غير محدد'}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">تاريخ النهاية:</span>
                  <span className="text-sm">
                    {formData.endDate ? new Date(formData.endDate).toLocaleDateString('ar-SA') : 'غير محدد'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* أزرار الإجراءات */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      حفظ العقد
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/dashboard/procurement/contracts')}
                  className="w-full"
                  disabled={isLoading}
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
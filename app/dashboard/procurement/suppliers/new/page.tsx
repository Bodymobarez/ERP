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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  CreditCard, 
  Shield, 
  Star,
  Plus,
  Trash2,
  Save,
  Upload,
  Eye,
  Check,
  X
} from 'lucide-react';

interface ContactPerson {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: string;
  expiryDate?: string;
}

interface SupplierFormData {
  // Basic Information
  companyName: string;
  legalName: string;
  taxId: string;
  commercialRegister: string;
  establishedYear: string;
  companyType: string;
  
  // Contact Information
  email: string;
  phone: string;
  fax: string;
  website: string;
  
  // Address Information
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  
  // Business Information
  categories: string[];
  description: string;
  notes: string;
  
  // Financial Information
  paymentTerms: string;
  creditLimit: string;
  currency: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  
  // Ratings and Status
  rating: number;
  status: string;
  isPreferred: boolean;
  isBlacklisted: boolean;
}

const supplierCategories = [
  'مواد البناء',
  'الحديد والصلب',
  'الأسمنت والخرسانة',
  'معدات البناء',
  'مواد التشطيب',
  'أدوات صحية',
  'كهربائيات',
  'دهانات ومواد عزل',
  'أخشاب وألمنيوم',
  'خدمات النقل',
  'خدمات التشغيل والصيانة',
  'استشارات هندسية',
  'أخرى'
];

const companyTypes = [
  { value: 'corporation', label: 'شركة مساهمة' },
  { value: 'llc', label: 'شركة ذات مسؤولية محدودة' },
  { value: 'partnership', label: 'شراكة' },
  { value: 'sole_proprietorship', label: 'مؤسسة فردية' },
  { value: 'government', label: 'جهة حكومية' },
  { value: 'other', label: 'أخرى' },
];

const currencies = [
  { value: 'SAR', label: 'ريال سعودي (SAR)' },
  { value: 'USD', label: 'دولار أمريكي (USD)' },
  { value: 'EUR', label: 'يورو (EUR)' },
  { value: 'AED', label: 'درهم إماراتي (AED)' },
];

const countries = [
  'المملكة العربية السعودية',
  'الإمارات العربية المتحدة',
  'الكويت',
  'قطر',
  'البحرين',
  'عمان',
  'الأردن',
  'لبنان',
  'مصر',
  'أخرى'
];

export default function NewSupplierPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  const [formData, setFormData] = useState<SupplierFormData>({
    companyName: '',
    legalName: '',
    taxId: '',
    commercialRegister: '',
    establishedYear: '',
    companyType: '',
    email: '',
    phone: '',
    fax: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: 'المملكة العربية السعودية',
    postalCode: '',
    categories: [],
    description: '',
    notes: '',
    paymentTerms: '',
    creditLimit: '',
    currency: 'SAR',
    bankName: '',
    accountNumber: '',
    iban: '',
    rating: 0,
    status: 'active',
    isPreferred: false,
    isBlacklisted: false,
  });

  const [contacts, setContacts] = useState<ContactPerson[]>([
    {
      id: '1',
      name: '',
      position: '',
      phone: '',
      email: '',
      isPrimary: true
    }
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'شهادة السجل التجاري',
      type: 'commercial_register',
      status: 'pending',
    },
    {
      id: '2',
      name: 'شهادة الزكاة والضريبة',
      type: 'tax_certificate',
      status: 'pending',
    },
    {
      id: '3',
      name: 'رخصة البلدية',
      type: 'municipal_license',
      status: 'pending',
    }
  ]);

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: keyof SupplierFormData, value: any) => {
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

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const addContact = () => {
    const newContact: ContactPerson = {
      id: Date.now().toString(),
      name: '',
      position: '',
      phone: '',
      email: '',
      isPrimary: false
    };
    setContacts(prev => [...prev, newContact]);
  };

  const removeContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const updateContact = (id: string, field: keyof ContactPerson, value: any) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id 
        ? { ...contact, [field]: value }
        : contact
    ));
  };

  const updateDocument = (id: string, field: keyof Document, value: any) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id 
        ? { ...doc, [field]: value }
        : doc
    ));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Basic Information Validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'اسم الشركة مطلوب';
    }

    if (!formData.legalName.trim()) {
      newErrors.legalName = 'الاسم القانوني مطلوب';
    }

    if (!formData.taxId.trim()) {
      newErrors.taxId = 'الرقم الضريبي مطلوب';
    }

    if (!formData.commercialRegister.trim()) {
      newErrors.commercialRegister = 'رقم السجل التجاري مطلوب';
    }

    if (!formData.companyType) {
      newErrors.companyType = 'نوع الشركة مطلوب';
    }

    // Contact Information Validation
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    }

    // Address Validation
    if (!formData.address.trim()) {
      newErrors.address = 'العنوان مطلوب';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'المدينة مطلوبة';
    }

    // Business Information Validation
    if (formData.categories.length === 0) {
      newErrors.categories = 'يجب اختيار فئة واحدة على الأقل';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف الشركة مطلوب';
    }

    // Financial Information Validation
    if (formData.creditLimit && (isNaN(Number(formData.creditLimit)) || Number(formData.creditLimit) < 0)) {
      newErrors.creditLimit = 'حد الائتمان يجب أن يكون رقماً موجباً';
    }

    // Contact Persons Validation
    const primaryContacts = contacts.filter(c => c.isPrimary);
    if (primaryContacts.length === 0) {
      newErrors.contacts = 'يجب تحديد جهة اتصال رئيسية واحدة على الأقل';
    }

    contacts.forEach((contact, index) => {
      if (contact.name.trim() && !contact.email.trim()) {
        newErrors[`contact_email_${contact.id}`] = `البريد الإلكتروني لجهة الاتصال ${index + 1} مطلوب`;
      }
      if (contact.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
        newErrors[`contact_email_${contact.id}`] = `البريد الإلكتروني لجهة الاتصال ${index + 1} غير صحيح`;
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
      const supplierData = {
        ...formData,
        creditLimit: formData.creditLimit ? Number(formData.creditLimit) : null,
        contacts: contacts.filter(contact => contact.name.trim()),
        documents: documents
      };

      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // إظهار رسالة نجاح
      alert('تم إضافة المورد بنجاح!');
      
      // العودة إلى صفحة الموردين
      router.push('/dashboard/procurement/suppliers');
      
    } catch (error) {
      console.error('خطأ في إضافة المورد:', error);
      alert('حدث خطأ في إضافة المورد');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'المعلومات الأساسية', icon: Building2 },
    { id: 'contact', label: 'معلومات الاتصال', icon: Phone },
    { id: 'address', label: 'العنوان', icon: MapPin },
    { id: 'business', label: 'معلومات الأعمال', icon: FileText },
    { id: 'financial', label: 'المعلومات المالية', icon: CreditCard },
    { id: 'contacts', label: 'جهات الاتصال', icon: User },
    { id: 'documents', label: 'الوثائق', icon: Shield },
  ];

  const renderStarRating = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleInputChange('rating', star)}
            className={`p-1 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            <Star className="h-5 w-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إضافة مورد جديد</h1>
            <p className="text-gray-600">إضافة مورد جديد إلى قاعدة بيانات الموردين</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">أقسام النموذج</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-right transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Quick Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">ملخص سريع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">اسم الشركة:</span>
                <span className="font-medium">{formData.companyName || 'غير محدد'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">النوع:</span>
                <span className="font-medium">
                  {companyTypes.find(t => t.value === formData.companyType)?.label || 'غير محدد'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الفئات:</span>
                <span className="font-medium">{formData.categories.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">التقييم:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-3">
          {/* Basic Information */}
          {activeTab === 'basic' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  المعلومات الأساسية
                </CardTitle>
                <CardDescription>
                  أدخل المعلومات الأساسية للشركة المورد
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">اسم الشركة *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="أدخل اسم الشركة"
                      className={errors.companyName ? 'border-red-500' : ''}
                    />
                    {errors.companyName && <p className="text-sm text-red-600 mt-1">{errors.companyName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="legalName">الاسم القانوني *</Label>
                    <Input
                      id="legalName"
                      value={formData.legalName}
                      onChange={(e) => handleInputChange('legalName', e.target.value)}
                      placeholder="أدخل الاسم القانوني"
                      className={errors.legalName ? 'border-red-500' : ''}
                    />
                    {errors.legalName && <p className="text-sm text-red-600 mt-1">{errors.legalName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="taxId">الرقم الضريبي *</Label>
                    <Input
                      id="taxId"
                      value={formData.taxId}
                      onChange={(e) => handleInputChange('taxId', e.target.value)}
                      placeholder="أدخل الرقم الضريبي"
                      className={errors.taxId ? 'border-red-500' : ''}
                    />
                    {errors.taxId && <p className="text-sm text-red-600 mt-1">{errors.taxId}</p>}
                  </div>

                  <div>
                    <Label htmlFor="commercialRegister">رقم السجل التجاري *</Label>
                    <Input
                      id="commercialRegister"
                      value={formData.commercialRegister}
                      onChange={(e) => handleInputChange('commercialRegister', e.target.value)}
                      placeholder="أدخل رقم السجل التجاري"
                      className={errors.commercialRegister ? 'border-red-500' : ''}
                    />
                    {errors.commercialRegister && <p className="text-sm text-red-600 mt-1">{errors.commercialRegister}</p>}
                  </div>

                  <div>
                    <Label htmlFor="establishedYear">سنة التأسيس</Label>
                    <Input
                      id="establishedYear"
                      type="number"
                      value={formData.establishedYear}
                      onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                      placeholder="أدخل سنة التأسيس"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyType">نوع الشركة *</Label>
                    <Select value={formData.companyType} onValueChange={(value) => handleInputChange('companyType', value)}>
                      <SelectTrigger className={errors.companyType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="اختر نوع الشركة" />
                      </SelectTrigger>
                      <SelectContent>
                        {companyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.companyType && <p className="text-sm text-red-600 mt-1">{errors.companyType}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="rating">التقييم</Label>
                    <div className="mt-2">
                      {renderStarRating()}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status">الحالة</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="inactive">غير نشط</SelectItem>
                        <SelectItem value="pending">قيد المراجعة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPreferred"
                        checked={formData.isPreferred}
                        onCheckedChange={(checked) => handleInputChange('isPreferred', checked)}
                      />
                      <Label htmlFor="isPreferred" className="text-sm">مورد مفضل</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isBlacklisted"
                        checked={formData.isBlacklisted}
                        onCheckedChange={(checked) => handleInputChange('isBlacklisted', checked)}
                      />
                      <Label htmlFor="isBlacklisted" className="text-sm text-red-600">في القائمة السوداء</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          {activeTab === 'contact' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  معلومات الاتصال
                </CardTitle>
                <CardDescription>
                  أدخل معلومات الاتصال الخاصة بالشركة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="company@example.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">رقم الهاتف *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+966 50 123 4567"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="fax">رقم الفاكس</Label>
                    <Input
                      id="fax"
                      value={formData.fax}
                      onChange={(e) => handleInputChange('fax', e.target.value)}
                      placeholder="+966 11 123 4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">الموقع الإلكتروني</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.company.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Address Information */}
          {activeTab === 'address' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  معلومات العنوان
                </CardTitle>
                <CardDescription>
                  أدخل عنوان الشركة المورد
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">العنوان *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="أدخل العنوان كاملاً"
                    rows={3}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">المدينة *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="أدخل المدينة"
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label htmlFor="state">المنطقة/الولاية</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="أدخل المنطقة"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">الدولة</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="postalCode">الرمز البريدي</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="12345"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Business Information */}
          {activeTab === 'business' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  معلومات الأعمال
                </CardTitle>
                <CardDescription>
                  أدخل معلومات الأعمال والتخصصات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>الفئات والتخصصات *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {supplierCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={formData.categories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <Label htmlFor={category} className="text-sm">{category}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.categories && <p className="text-sm text-red-600 mt-1">{errors.categories}</p>}
                </div>

                <div>
                  <Label htmlFor="description">وصف الشركة *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="أدخل وصف تفصيلي عن الشركة وخدماتها"
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
          )}

          {/* Financial Information */}
          {activeTab === 'financial' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  المعلومات المالية
                </CardTitle>
                <CardDescription>
                  أدخل المعلومات المالية والمصرفية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paymentTerms">شروط الدفع</Label>
                    <Input
                      id="paymentTerms"
                      value={formData.paymentTerms}
                      onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                      placeholder="مثال: 30 يوم من تاريخ الفاتورة"
                    />
                  </div>

                  <div>
                    <Label htmlFor="creditLimit">حد الائتمان</Label>
                    <Input
                      id="creditLimit"
                      type="number"
                      value={formData.creditLimit}
                      onChange={(e) => handleInputChange('creditLimit', e.target.value)}
                      placeholder="0.00"
                      className={errors.creditLimit ? 'border-red-500' : ''}
                    />
                    {errors.creditLimit && <p className="text-sm text-red-600 mt-1">{errors.creditLimit}</p>}
                  </div>

                  <div>
                    <Label htmlFor="currency">العملة المفضلة</Label>
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

                  <div>
                    <Label htmlFor="bankName">اسم البنك</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      placeholder="أدخل اسم البنك"
                    />
                  </div>

                  <div>
                    <Label htmlFor="accountNumber">رقم الحساب البنكي</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      placeholder="أدخل رقم الحساب"
                    />
                  </div>

                  <div>
                    <Label htmlFor="iban">رقم الآيبان (IBAN)</Label>
                    <Input
                      id="iban"
                      value={formData.iban}
                      onChange={(e) => handleInputChange('iban', e.target.value)}
                      placeholder="SA00 0000 0000 0000 0000 0000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Persons */}
          {activeTab === 'contacts' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  جهات الاتصال
                </CardTitle>
                <CardDescription>
                  أدخل معلومات جهات الاتصال في الشركة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contacts.map((contact, index) => (
                  <div key={contact.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">جهة الاتصال {index + 1}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`primary_${contact.id}`}
                            checked={contact.isPrimary}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                // Make this contact primary and others non-primary
                                setContacts(prev => prev.map(c => ({
                                  ...c,
                                  isPrimary: c.id === contact.id
                                })));
                              }
                            }}
                          />
                          <Label htmlFor={`primary_${contact.id}`} className="text-sm">رئيسي</Label>
                        </div>
                        {contacts.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeContact(contact.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`contact_name_${contact.id}`}>الاسم</Label>
                        <Input
                          id={`contact_name_${contact.id}`}
                          value={contact.name}
                          onChange={(e) => updateContact(contact.id, 'name', e.target.value)}
                          placeholder="أدخل اسم جهة الاتصال"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`contact_position_${contact.id}`}>المنصب</Label>
                        <Input
                          id={`contact_position_${contact.id}`}
                          value={contact.position}
                          onChange={(e) => updateContact(contact.id, 'position', e.target.value)}
                          placeholder="أدخل المنصب"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`contact_phone_${contact.id}`}>رقم الهاتف</Label>
                        <Input
                          id={`contact_phone_${contact.id}`}
                          value={contact.phone}
                          onChange={(e) => updateContact(contact.id, 'phone', e.target.value)}
                          placeholder="+966 50 123 4567"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`contact_email_${contact.id}`}>البريد الإلكتروني</Label>
                        <Input
                          id={`contact_email_${contact.id}`}
                          type="email"
                          value={contact.email}
                          onChange={(e) => updateContact(contact.id, 'email', e.target.value)}
                          placeholder="contact@company.com"
                          className={errors[`contact_email_${contact.id}`] ? 'border-red-500' : ''}
                        />
                        {errors[`contact_email_${contact.id}`] && (
                          <p className="text-sm text-red-600 mt-1">{errors[`contact_email_${contact.id}`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {errors.contacts && <p className="text-sm text-red-600">{errors.contacts}</p>}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addContact}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة جهة اتصال جديدة
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          {activeTab === 'documents' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  الوثائق والمستندات
                </CardTitle>
                <CardDescription>
                  إدارة الوثائق والمستندات المطلوبة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        {doc.expiryDate && (
                          <p className="text-sm text-gray-600">
                            ينتهي في: {new Date(doc.expiryDate).toLocaleDateString('ar-SA')}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={
                          doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                          doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {doc.status === 'approved' ? 'معتمد' :
                         doc.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                      </Badge>
                      
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        رفع
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        عرض
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">رفع وثائق إضافية</p>
                    <Button variant="outline" size="sm">
                      اختر الملفات
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1"
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
                  حفظ المورد
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/procurement/suppliers')}
              disabled={isLoading}
              size="lg"
            >
              إلغاء
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
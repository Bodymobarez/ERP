'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Search,
  Filter,
  Download,
  Plus,
  Users,
  Phone,
  Mail,
  MapPin,
  Star,
  Building2,
  Eye,
  Edit,
  MessageSquare,
  Calendar,
  DollarSign,
  FileText,
  UserCheck,
  UserX,
  Crown,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

const mockClients = [
  {
    id: '1',
    companyName: 'شركة المباني الحديثة',
    legalName: 'شركة المباني الحديثة للمقاولات المحدودة',
    clientType: 'company',
    industry: 'البناء والإنشاءات',
    contactPerson: 'م. أحمد محمد',
    email: 'ahmed@modern-buildings.com',
    phone: '+966 50 123 4567',
    address: 'الرياض - حي العليا، شارع الملك فهد',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    status: 'active',
    rating: 4.8,
    isVip: true,
    totalProjects: 12,
    totalValue: 15500000,
    lastContact: '2024-10-25',
    joinDate: '2022-03-15',
    tags: ['عميل مهم', 'مشتري دائم', 'دفع سريع'],
    creditLimit: 2000000,
    paymentTerms: '30 يوم',
    preferredContactMethod: 'email'
  },
  {
    id: '2',
    companyName: 'مجموعة الخليج العقارية',
    legalName: 'مجموعة الخليج العقارية المحدودة',
    clientType: 'company',
    industry: 'العقارات',
    contactPerson: 'فاطمة أحمد',
    email: 'fatima@gulf-real-estate.com',
    phone: '+966 55 987 6543',
    address: 'جدة - حي الروضة، طريق المدينة',
    city: 'جدة',
    country: 'المملكة العربية السعودية',
    status: 'active',
    rating: 4.6,
    isVip: false,
    totalProjects: 8,
    totalValue: 8750000,
    lastContact: '2024-10-28',
    joinDate: '2023-01-20',
    tags: ['عميل جديد', 'يفضل الجودة'],
    creditLimit: 1500000,
    paymentTerms: '45 يوم',
    preferredContactMethod: 'phone'
  },
  {
    id: '3',
    companyName: 'مؤسسة النماء التجارية',
    legalName: 'مؤسسة النماء التجارية',
    clientType: 'company',
    industry: 'التجارة',
    contactPerson: 'خالد العمري',
    email: 'khalid@nama-trading.com',
    phone: '+966 56 555 7890',
    address: 'الدمام - حي الفيصلية، شارع الأمير محمد',
    city: 'الدمام',
    country: 'المملكة العربية السعودية',
    status: 'active',
    rating: 4.9,
    isVip: true,
    totalProjects: 15,
    totalValue: 22000000,
    lastContact: '2024-10-30',
    joinDate: '2021-08-10',
    tags: ['عميل مهم', 'مشروع كبير', 'تقني متقدم'],
    creditLimit: 3000000,
    paymentTerms: 'نقدي',
    preferredContactMethod: 'whatsapp'
  },
  {
    id: '4',
    companyName: 'الدكتور سعد الأحمد',
    legalName: 'الدكتور سعد بن علي الأحمد',
    clientType: 'individual',
    industry: 'الصحة',
    contactPerson: 'د. سعد الأحمد',
    email: 'saad.ahmad@gmail.com',
    phone: '+966 50 777 8888',
    address: 'الرياض - حي النرجس، شارع التحلية',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    status: 'active',
    rating: 4.4,
    isVip: false,
    totalProjects: 3,
    totalValue: 2500000,
    lastContact: '2024-10-22',
    joinDate: '2023-07-05',
    tags: ['عميل جديد', 'يحتاج متابعة'],
    creditLimit: 500000,
    paymentTerms: '60 يوم',
    preferredContactMethod: 'phone'
  },
  {
    id: '5',
    companyName: 'جامعة المملكة',
    legalName: 'جامعة المملكة الأهلية',
    clientType: 'government',
    industry: 'التعليم',
    contactPerson: 'أ.د. محمد الزهراني',
    email: 'info@kingdom-university.edu.sa',
    phone: '+966 11 456 7890',
    address: 'الرياض - حي الدرعية، طريق الملك عبدالعزيز',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    status: 'prospect',
    rating: 4.2,
    isVip: false,
    totalProjects: 1,
    totalValue: 5000000,
    lastContact: '2024-10-20',
    joinDate: '2024-09-15',
    tags: ['عميل محتمل', 'مشروع كبير'],
    creditLimit: 1000000,
    paymentTerms: '90 يوم',
    preferredContactMethod: 'email'
  }
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus;
    const matchesType = selectedType === 'all' || client.clientType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: mockClients.length,
    active: mockClients.filter(c => c.status === 'active').length,
    prospects: mockClients.filter(c => c.status === 'prospect').length,
    vip: mockClients.filter(c => c.isVip).length,
    totalValue: mockClients.reduce((sum, c) => sum + c.totalValue, 0),
    avgRating: mockClients.reduce((sum, c) => sum + c.rating, 0) / mockClients.length,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'prospect': return 'عميل محتمل';
      case 'blocked': return 'محظور';
      default: return status;
    }
  };

  const getClientTypeLabel = (type: string) => {
    switch (type) {
      case 'individual': return 'فرد';
      case 'company': return 'شركة';
      case 'government': return 'جهة حكومية';
      case 'ngo': return 'منظمة غير ربحية';
      default: return type;
    }
  };

  const getClientTypeColor = (type: string) => {
    switch (type) {
      case 'individual': return 'bg-purple-100 text-purple-800';
      case 'company': return 'bg-blue-100 text-blue-800';
      case 'government': return 'bg-orange-100 text-orange-800';
      case 'ngo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/crm">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">العملاء</h1>
          <p className="text-gray-600 mt-1">إدارة قاعدة بيانات العملاء والعلاقات</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي العملاء</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">عملاء نشطين</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.active}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <UserCheck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">عملاء محتملين</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{stats.prospects}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">عملاء VIP</p>
                <p className="text-2xl font-bold mt-1 text-purple-600">{stats.vip}</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <Crown className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">القيمة الإجمالية</p>
                <p className="text-xl font-bold mt-1 text-orange-600">{formatCurrency(stats.totalValue)}</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط التقييم</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.avgRating.toFixed(1)} ⭐</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Star className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في العملاء..."
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
          <option value="inactive">غير نشط</option>
          <option value="prospect">عميل محتمل</option>
          <option value="blocked">محظور</option>
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الأنواع</option>
          <option value="individual">فرد</option>
          <option value="company">شركة</option>
          <option value="government">جهة حكومية</option>
          <option value="ngo">منظمة غير ربحية</option>
        </select>

        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
        
        <Link href="/dashboard/crm/clients/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            عميل جديد
          </Button>
        </Link>
      </div>

      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    {client.clientType === 'individual' ? (
                      <Users className="h-10 w-10 text-blue-600" />
                    ) : (
                      <Building2 className="h-10 w-10 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl">{client.companyName}</h3>
                      {client.isVip && (
                        <Badge className="bg-purple-100 text-purple-800">
                          <Crown className="h-3 w-3 mr-1" />
                          VIP
                        </Badge>
                      )}
                      <Badge className={getStatusColor(client.status)}>
                        {getStatusLabel(client.status)}
                      </Badge>
                      <Badge className={getClientTypeColor(client.clientType)}>
                        {getClientTypeLabel(client.clientType)}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{client.legalName}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline">{client.industry}</Badge>
                      <span className="text-gray-600">انضم في: {new Date(client.joinDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  {getRatingStars(client.rating)}
                  <p className="text-sm text-gray-600 mt-2">التقييم العام</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-600">جهة الاتصال:</span>
                    <span className="font-medium">{client.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">الهاتف:</span>
                    <span className="font-medium direction-ltr text-right">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">البريد:</span>
                    <span className="font-medium text-xs">{client.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                    <span className="text-gray-600">العنوان:</span>
                    <span className="font-medium">{client.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-600">شروط الدفع:</span>
                    <span className="font-medium">{client.paymentTerms}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">آخر اتصال:</span>
                    <span className="font-medium">{new Date(client.lastContact).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {client.tags.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">العلامات:</p>
                  <div className="flex flex-wrap gap-2">
                    {client.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t">
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-purple-600">{client.totalProjects}</p>
                  <p className="text-xs text-gray-600">المشاريع</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <p className="text-sm font-bold text-green-600">{formatCurrency(client.totalValue)}</p>
                  <p className="text-xs text-gray-600">القيمة الإجمالية</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm font-bold text-blue-600">{formatCurrency(client.creditLimit)}</p>
                  <p className="text-xs text-gray-600">حد الائتمان</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل البيانات
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  اتصال
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  المشاريع
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد عملاء</h3>
            <p className="text-gray-600 mb-4">لم يتم العثور على عملاء تطابق معايير البحث</p>
            <Button onClick={() => { setSearchTerm(''); setSelectedStatus('all'); setSelectedType('all'); }}>
              إعادة تعيين الفلاتر
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/crm">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">CRM</h3>
                  <p className="text-sm text-gray-600">العودة لإدارة العلاقات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">المراسلات</h3>
                <p className="text-sm text-gray-600">إدارة المراسلات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">التقارير</h3>
                <p className="text-sm text-gray-600">تقارير العملاء</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Download className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">تصدير</h3>
                <p className="text-sm text-gray-600">تصدير البيانات</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
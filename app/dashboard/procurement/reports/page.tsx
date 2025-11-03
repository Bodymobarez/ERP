'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Calendar,
  Download,
  Filter,
  Eye,
  FileText,
  PieChart,
  Building2,
  ShoppingCart,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Star,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface ReportData {
  totalPurchases: number;
  totalValue: number;
  totalSuppliers: number;
  averageOrderValue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  monthlySpending: ChartData[];
  categorySpending: ChartData[];
  supplierPerformance: ChartData[];
  topSuppliers: any[];
  recentOrders: any[];
  paymentTrends: ChartData[];
}

const mockReportData: ReportData = {
  totalPurchases: 342,
  totalValue: 15750000,
  totalSuppliers: 45,
  averageOrderValue: 46052,
  pendingOrders: 23,
  completedOrders: 298,
  cancelledOrders: 21,
  monthlySpending: [
    { name: 'يناير', value: 1200000, color: '#3B82F6' },
    { name: 'فبراير', value: 1450000, color: '#3B82F6' },
    { name: 'مارس', value: 1350000, color: '#3B82F6' },
    { name: 'أبريل', value: 1600000, color: '#3B82F6' },
    { name: 'مايو', value: 1800000, color: '#3B82F6' },
    { name: 'يونيو', value: 1550000, color: '#3B82F6' },
    { name: 'يوليو', value: 1750000, color: '#3B82F6' },
    { name: 'أغسطس', value: 1650000, color: '#3B82F6' },
    { name: 'سبتمبر', value: 1450000, color: '#3B82F6' },
    { name: 'أكتوبر', value: 1500000, color: '#3B82F6' },
  ],
  categorySpending: [
    { name: 'مواد البناء', value: 4500000, color: '#EF4444' },
    { name: 'الحديد والصلب', value: 3200000, color: '#F59E0B' },
    { name: 'المعدات', value: 2800000, color: '#10B981' },
    { name: 'الكهربائيات', value: 1900000, color: '#8B5CF6' },
    { name: 'التشطيبات', value: 1600000, color: '#F97316' },
    { name: 'أخرى', value: 1750000, color: '#6B7280' },
  ],
  supplierPerformance: [
    { name: 'ممتاز', value: 15, color: '#10B981' },
    { name: 'جيد جداً', value: 18, color: '#3B82F6' },
    { name: 'جيد', value: 8, color: '#F59E0B' },
    { name: 'مقبول', value: 3, color: '#EF4444' },
    { name: 'ضعيف', value: 1, color: '#6B7280' },
  ],
  topSuppliers: [
    {
      id: 1,
      name: 'شركة الحديد المتحد',
      totalOrders: 45,
      totalValue: 3250000,
      rating: 4.8,
      category: 'حديد تسليح',
      performance: 'ممتاز'
    },
    {
      id: 2,
      name: 'مصنع الأسمنت الوطني',
      totalOrders: 32,
      totalValue: 2100000,
      rating: 4.6,
      category: 'أسمنت',
      performance: 'جيد جداً'
    },
    {
      id: 3,
      name: 'مؤسسة المعدات الثقيلة',
      totalOrders: 28,
      totalValue: 1850000,
      rating: 4.9,
      category: 'معدات',
      performance: 'ممتاز'
    },
    {
      id: 4,
      name: 'شركة الكابلات الوطنية',
      totalOrders: 24,
      totalValue: 1200000,
      rating: 4.4,
      category: 'كهربائيات',
      performance: 'جيد جداً'
    },
    {
      id: 5,
      name: 'معرض السيراميك الفاخر',
      totalOrders: 18,
      totalValue: 950000,
      rating: 4.2,
      category: 'تشطيبات',
      performance: 'جيد'
    },
  ],
  recentOrders: [
    {
      id: 'PO-2024-156',
      supplier: 'شركة الحديد المتحد',
      category: 'حديد تسليح',
      value: 125000,
      date: '2024-10-28',
      status: 'delivered',
      project: 'البرج السكني - الرياض'
    },
    {
      id: 'PO-2024-155',
      supplier: 'مصنع الأسمنت الوطني',
      category: 'أسمنت',
      value: 85000,
      date: '2024-10-27',
      status: 'pending',
      project: 'المجمع التجاري - جدة'
    },
    {
      id: 'PO-2024-154',
      supplier: 'مؤسسة المعدات الثقيلة',
      category: 'معدات',
      value: 95000,
      date: '2024-10-26',
      status: 'delivered',
      project: 'الفيلا السكنية - الدمام'
    },
    {
      id: 'PO-2024-153',
      supplier: 'شركة الكابلات الوطنية',
      category: 'كهربائيات',
      value: 45000,
      date: '2024-10-25',
      status: 'cancelled',
      project: 'المكتب الإداري - الخبر'
    },
    {
      id: 'PO-2024-152',
      supplier: 'معرض السيراميك الفاخر',
      category: 'تشطيبات',
      value: 75000,
      date: '2024-10-24',
      status: 'delivered',
      project: 'البرج السكني - الرياض'
    },
  ],
  paymentTrends: [
    { name: 'نقدي', value: 35, color: '#10B981' },
    { name: '30 يوم', value: 45, color: '#3B82F6' },
    { name: '60 يوم', value: 15, color: '#F59E0B' },
    { name: '90 يوم', value: 5, color: '#EF4444' },
  ]
};

export default function ProcurementReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('current_month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [reportData, setReportData] = useState<ReportData>(mockReportData);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'مُسلّم';
      case 'pending': return 'قيد الانتظار';
      case 'cancelled': return 'ملغي';
      case 'processing': return 'قيد المعالجة';
      default: return status;
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'ممتاز': return 'bg-green-100 text-green-800';
      case 'جيد جداً': return 'bg-blue-100 text-blue-800';
      case 'جيد': return 'bg-yellow-100 text-yellow-800';
      case 'مقبول': return 'bg-orange-100 text-orange-800';
      case 'ضعيف': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderBarChart = (data: ChartData[], title: string) => {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-20 text-sm text-gray-600 text-right">{item.name}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
              <div className="w-24 text-sm font-medium text-left">
                {title.includes('ريال') ? formatCurrency(item.value) : item.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPieChart = (data: ChartData[], title: string) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <div className="grid grid-cols-2 gap-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-gray-600">
                  {((item.value / total) * 100).toFixed(1)}%
                </div>
              </div>
              <div className="text-sm font-medium">
                {title.includes('ريال') ? formatCurrency(item.value) : item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/dashboard/procurement">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">تقارير المشتريات</h1>
              <p className="text-gray-600">تحليل وإحصائيات شاملة لعمليات المشتريات</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Label htmlFor="period">الفترة الزمنية:</Label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current_month">الشهر الحالي</SelectItem>
                <SelectItem value="last_month">الشهر الماضي</SelectItem>
                <SelectItem value="current_quarter">الربع الحالي</SelectItem>
                <SelectItem value="current_year">السنة الحالية</SelectItem>
                <SelectItem value="last_year">السنة الماضية</SelectItem>
                <SelectItem value="custom">فترة مخصصة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="category">الفئة:</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="building_materials">مواد البناء</SelectItem>
                <SelectItem value="steel">الحديد والصلب</SelectItem>
                <SelectItem value="equipment">المعدات</SelectItem>
                <SelectItem value="electrical">الكهربائيات</SelectItem>
                <SelectItem value="finishing">التشطيبات</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="supplier">المورد:</Label>
            <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الموردين</SelectItem>
                <SelectItem value="1">شركة الحديد المتحد</SelectItem>
                <SelectItem value="2">مصنع الأسمنت الوطني</SelectItem>
                <SelectItem value="3">مؤسسة المعدات الثقيلة</SelectItem>
                <SelectItem value="4">شركة الكابلات الوطنية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="mr-auto">
            <Download className="h-4 w-4 mr-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المشتريات</p>
                <p className="text-2xl font-bold mt-1">{reportData.totalPurchases}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12% من الشهر الماضي</span>
                </div>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <ShoppingCart className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">القيمة الإجمالية</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(reportData.totalValue)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8% من الشهر الماضي</span>
                </div>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">عدد الموردين</p>
                <p className="text-2xl font-bold mt-1">{reportData.totalSuppliers}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+3 موردين جدد</span>
                </div>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط قيمة الطلب</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(reportData.averageOrderValue)}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-2% من الشهر الماضي</span>
                </div>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <Package className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">طلبات مكتملة</p>
                <p className="text-3xl font-bold mt-1 text-green-600">{reportData.completedOrders}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {((reportData.completedOrders / reportData.totalPurchases) * 100).toFixed(1)}% من الإجمالي
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">طلبات معلقة</p>
                <p className="text-3xl font-bold mt-1 text-yellow-600">{reportData.pendingOrders}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {((reportData.pendingOrders / reportData.totalPurchases) * 100).toFixed(1)}% من الإجمالي
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">طلبات ملغية</p>
                <p className="text-3xl font-bold mt-1 text-red-600">{reportData.cancelledOrders}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {((reportData.cancelledOrders / reportData.totalPurchases) * 100).toFixed(1)}% من الإجمالي
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              اتجاه الإنفاق الشهري
            </CardTitle>
            <CardDescription>
              تطور إجمالي المشتريات خلال الأشهر الماضية
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderBarChart(reportData.monthlySpending, 'الإنفاق بالريال السعودي')}
          </CardContent>
        </Card>

        {/* Category Spending */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              الإنفاق حسب الفئة
            </CardTitle>
            <CardDescription>
              توزيع المشتريات على الفئات المختلفة
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderPieChart(reportData.categorySpending, 'الإنفاق بالريال السعودي')}
          </CardContent>
        </Card>

        {/* Supplier Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              أداء الموردين
            </CardTitle>
            <CardDescription>
              توزيع الموردين حسب مستوى الأداء
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderPieChart(reportData.supplierPerformance, 'عدد الموردين')}
          </CardContent>
        </Card>

        {/* Payment Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              شروط الدفع
            </CardTitle>
            <CardDescription>
              توزيع الطلبات حسب شروط الدفع
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderPieChart(reportData.paymentTrends, 'نسبة الطلبات (%)')}
          </CardContent>
        </Card>
      </div>

      {/* Top Suppliers Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            أفضل الموردين
          </CardTitle>
          <CardDescription>
            قائمة بأهم الموردين حسب حجم التعامل والأداء
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4">المورد</th>
                  <th className="text-right py-3 px-4">الفئة</th>
                  <th className="text-right py-3 px-4">عدد الطلبات</th>
                  <th className="text-right py-3 px-4">القيمة الإجمالية</th>
                  <th className="text-right py-3 px-4">التقييم</th>
                  <th className="text-right py-3 px-4">الأداء</th>
                  <th className="text-right py-3 px-4">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {reportData.topSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{supplier.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{supplier.category}</Badge>
                    </td>
                    <td className="py-3 px-4">{supplier.totalOrders}</td>
                    <td className="py-3 px-4 font-medium">{formatCurrency(supplier.totalValue)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{supplier.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getPerformanceColor(supplier.performance)}>
                        {supplier.performance}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        عرض
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            أحدث الطلبات
          </CardTitle>
          <CardDescription>
            آخر طلبات الشراء في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4">رقم الطلب</th>
                  <th className="text-right py-3 px-4">المورد</th>
                  <th className="text-right py-3 px-4">الفئة</th>
                  <th className="text-right py-3 px-4">القيمة</th>
                  <th className="text-right py-3 px-4">التاريخ</th>
                  <th className="text-right py-3 px-4">الحالة</th>
                  <th className="text-right py-3 px-4">المشروع</th>
                  <th className="text-right py-3 px-4">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {reportData.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{order.id}</div>
                    </td>
                    <td className="py-3 px-4">{order.supplier}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{order.category}</Badge>
                    </td>
                    <td className="py-3 px-4 font-medium">{formatCurrency(order.value)}</td>
                    <td className="py-3 px-4">
                      {new Date(order.date).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">{order.project}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        عرض
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Link href="/dashboard/procurement">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">المشتريات</h3>
                  <p className="text-sm text-gray-600">العودة للمشتريات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/procurement/suppliers">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الموردين</h3>
                  <p className="text-sm text-gray-600">إدارة الموردين</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/procurement/contracts">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">العقود</h3>
                  <p className="text-sm text-gray-600">إدارة العقود</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Download className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">تصدير</h3>
                <p className="text-sm text-gray-600">تصدير التقارير</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
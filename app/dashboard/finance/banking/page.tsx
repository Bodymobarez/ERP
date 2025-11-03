"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Filter,
  Search,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  DollarSign,
  Users,
  Calendar,
  RefreshCw,
  Wallet,
  Receipt,
  TrendingUp,
  TrendingDown,
  Calculator,
  Activity,
  Settings,
  Link as LinkIcon,
  Upload,
  FileText,
  Banknote
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for bank accounts
const mockBankAccounts = [
  {
    id: "acc-001",
    bankName: "البنك الأهلي التجاري",
    bankNameEn: "National Commercial Bank",
    accountNumber: "123456789012",
    accountType: "current",
    currency: "SAR",
    balance: 12500000,
    availableBalance: 12350000,
    status: "active",
    lastUpdate: "2024-01-15T10:30:00Z",
    branch: "فرع الرياض الرئيسي",
    manager: "أحمد السعد",
    phone: "+966112345678",
    transactions: 1245,
    monthlyAverage: 15200000
  },
  {
    id: "acc-002",
    bankName: "مصرف الراجحي",
    bankNameEn: "Al Rajhi Bank",
    accountNumber: "567890123456",
    accountType: "current",
    currency: "SAR",
    balance: 8750000,
    availableBalance: 8600000,
    status: "active",
    lastUpdate: "2024-01-15T09:15:00Z",
    branch: "فرع الدمام",
    manager: "محمد الأحمد",
    phone: "+966138765432",
    transactions: 892,
    monthlyAverage: 9800000
  },
  {
    id: "acc-003",
    bankName: "البنك السعودي الفرنسي",
    bankNameEn: "Banque Saudi Fransi",
    accountNumber: "789012345678",
    accountType: "savings",
    currency: "SAR",
    balance: 5200000,
    availableBalance: 5200000,
    status: "active",
    lastUpdate: "2024-01-15T08:45:00Z",
    branch: "فرع جدة",
    manager: "سارة الخالد",
    phone: "+966126543210",
    transactions: 234,
    monthlyAverage: 4850000
  },
  {
    id: "acc-004",
    bankName: "بنك الرياض",
    bankNameEn: "Riyad Bank",
    accountNumber: "901234567890",
    accountType: "current",
    currency: "USD",
    balance: 850000,
    availableBalance: 820000,
    status: "active",
    lastUpdate: "2024-01-15T07:20:00Z",
    branch: "فرع الرياض - العليا",
    manager: "فهد المطيري",
    phone: "+966114567890",
    transactions: 156,
    monthlyAverage: 920000
  }
]

// Mock data for recent transactions
const mockTransactions = [
  {
    id: "txn-001",
    accountId: "acc-001",
    type: "credit",
    amount: 2500000,
    currency: "SAR",
    description: "مستخلص مشروع البرج السكني - الدفعة الثالثة",
    reference: "MST-2024-003",
    date: "2024-01-15T14:30:00Z",
    status: "completed",
    balance: 12500000,
    category: "project_payment"
  },
  {
    id: "txn-002",
    accountId: "acc-001",
    type: "debit",
    amount: 850000,
    currency: "SAR",
    description: "دفع مستحقات شركة المواد الإنشائية المتقدمة",
    reference: "PMT-2024-045",
    date: "2024-01-15T11:20:00Z",
    status: "completed",
    balance: 10000000,
    category: "supplier_payment"
  },
  {
    id: "txn-003",
    accountId: "acc-002",
    type: "credit",
    amount: 1200000,
    currency: "SAR",
    description: "تحويل من حساب البنك الأهلي",
    reference: "TRF-2024-012",
    date: "2024-01-15T10:15:00Z",
    status: "completed",
    balance: 8750000,
    category: "internal_transfer"
  },
  {
    id: "txn-004",
    accountId: "acc-003",
    type: "credit",
    amount: 150000,
    currency: "SAR",
    description: "فوائد حساب التوفير - يناير 2024",
    reference: "INT-2024-001",
    date: "2024-01-15T09:00:00Z",
    status: "completed",
    balance: 5200000,
    category: "interest"
  },
  {
    id: "txn-005",
    accountId: "acc-001",
    type: "debit",
    amount: 320000,
    currency: "SAR",
    description: "رواتب الموظفين - يناير 2024",
    reference: "SAL-2024-001",
    date: "2024-01-14T16:00:00Z",
    status: "completed",
    balance: 9650000,
    category: "payroll"
  }
]

const bankingStats = {
  totalBalance: 27300000,
  totalAccounts: 4,
  monthlyTransactions: 2527,
  pendingTransactions: 3,
  averageBalance: 6825000
}

export default function BankingPage() {
  const [selectedTab, setSelectedTab] = useState("accounts")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAccount, setSelectedAccount] = useState(null)

  const getAccountTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      current: "جاري",
      savings: "توفير",
      fixed: "وديعة",
      loan: "قرض"
    }
    return types[type] || type
  }

  const getTransactionIcon = (type: string) => {
    return type === "credit" ? 
      <ArrowDownLeft className="h-4 w-4 text-green-600" /> : 
      <ArrowUpRight className="h-4 w-4 text-red-600" />
  }

  const getTransactionColor = (type: string) => {
    return type === "credit" ? "text-green-600" : "text-red-600"
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      suspended: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800"
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getCategoryLabel = (category: string) => {
    const categories: { [key: string]: string } = {
      project_payment: "دفعة مشروع",
      supplier_payment: "دفع موردين",
      internal_transfer: "تحويل داخلي",
      interest: "فوائد",
      payroll: "رواتب",
      loan_payment: "دفع قرض",
      expense: "مصروف",
      revenue: "إيراد"
    }
    return categories[category] || category
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 p-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Building className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">الخدمات المصرفية</h1>
                <p className="text-emerald-100 text-lg">إدارة الحسابات المصرفية والتحويلات المالية</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                <Plus className="h-4 w-4 mr-2" />
                حساب جديد
              </Button>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                تحويل جديد
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">الرصيد الإجمالي</p>
                  <p className="text-white text-lg font-bold">{formatCurrency(bankingStats.totalBalance)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Building className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">الحسابات</p>
                  <p className="text-white text-xl font-bold">{bankingStats.totalAccounts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">المعاملات الشهرية</p>
                  <p className="text-white text-xl font-bold">{bankingStats.monthlyTransactions}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">معلقة</p>
                  <p className="text-white text-xl font-bold">{bankingStats.pendingTransactions}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">متوسط الرصيد</p>
                  <p className="text-white text-lg font-bold">{formatCurrency(bankingStats.averageBalance)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 p-1 bg-gray-100 rounded-xl">
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            الحسابات المصرفية
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            المعاملات
          </TabsTrigger>
          <TabsTrigger value="transfers" className="flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4" />
            التحويلات
          </TabsTrigger>
          <TabsTrigger value="reconciliation" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            التسوية البنكية
          </TabsTrigger>
        </TabsList>

        {/* Bank Accounts Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <div className="grid gap-6">
            {mockBankAccounts.map((account) => (
              <Card key={account.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-emerald-100 rounded-lg">
                        <Building className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{account.bankName}</h3>
                          <Badge className={getStatusColor(account.status)}>
                            {account.status === "active" ? "نشط" : "غير نشط"}
                          </Badge>
                          <Badge variant="outline">
                            {getAccountTypeLabel(account.accountType)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">رقم الحساب</p>
                            <p className="font-mono text-sm font-medium">{account.accountNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">الفرع</p>
                            <p className="text-sm">{account.branch}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">مدير الحساب</p>
                            <p className="text-sm">{account.manager}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">الرصيد الحالي</p>
                        <p className="text-2xl font-bold text-emerald-600">
                          {formatCurrency(account.balance, account.currency)}
                        </p>
                        <p className="text-sm text-gray-500">
                          متاح: {formatCurrency(account.availableBalance, account.currency)}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          عرض
                        </Button>
                        <Button variant="outline" size="sm">
                          <Receipt className="h-4 w-4 mr-2" />
                          كشف حساب
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Account Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">المعاملات الشهرية</p>
                      <p className="font-bold text-blue-600">{account.transactions}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">المتوسط الشهري</p>
                      <p className="font-bold text-purple-600">{formatCurrency(account.monthlyAverage, account.currency)}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">آخر تحديث</p>
                      <p className="font-bold text-gray-600">{new Date(account.lastUpdate).toLocaleDateString('ar-SA')}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">الهاتف</p>
                      <p className="font-bold text-gray-600">{account.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="البحث في المعاملات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    فلتر
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    التاريخ
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card>
            <CardHeader>
              <CardTitle>المعاملات الأخيرة</CardTitle>
              <CardDescription>آخر المعاملات المصرفية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{transaction.description}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>مرجع: {transaction.reference}</span>
                          <Badge variant="outline" className="text-xs">
                            {getCategoryLabel(transaction.category)}
                          </Badge>
                          <span>{new Date(transaction.date).toLocaleDateString('ar-SA')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className={`font-bold text-lg ${getTransactionColor(transaction.type)}`}>
                            {transaction.type === "credit" ? "+" : "-"}{formatCurrency(transaction.amount, transaction.currency)}
                          </p>
                          <p className="text-sm text-gray-500">
                            الرصيد: {formatCurrency(transaction.balance, transaction.currency)}
                          </p>
                        </div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status === "completed" ? "مكتمل" : 
                           transaction.status === "pending" ? "معلق" : "فاشل"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transfers Tab */}
        <TabsContent value="transfers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Transfer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5 text-blue-600" />
                  تحويل سريع
                </CardTitle>
                <CardDescription>تحويل بين الحسابات المصرفية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">من الحساب</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>البنك الأهلي - 123456789012</option>
                    <option>مصرف الراجحي - 567890123456</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">إلى الحساب</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>البنك السعودي الفرنسي - 789012345678</option>
                    <option>بنك الرياض - 901234567890</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">المبلغ</label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">الوصف</label>
                  <Input placeholder="وصف التحويل..." />
                </div>
                <Button className="w-full">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  تنفيذ التحويل
                </Button>
              </CardContent>
            </Card>

            {/* External Transfer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-purple-600" />
                  تحويل خارجي
                </CardTitle>
                <CardDescription>تحويل إلى بنوك أخرى</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">البنك المستفيد</label>
                  <Input placeholder="اسم البنك..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">رقم الحساب</label>
                  <Input placeholder="رقم الحساب..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">اسم المستفيد</label>
                  <Input placeholder="اسم المستفيد..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">المبلغ</label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <Button className="w-full" variant="outline">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  تحضير التحويل
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transfers */}
          <Card>
            <CardHeader>
              <CardTitle>التحويلات الأخيرة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <ArrowUpRight className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium">تحويل إلى حساب المشاريع</p>
                      <p className="text-sm text-gray-600">البنك الأهلي → البنك السعودي الفرنسي</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">1,200,000 ريال</p>
                    <p className="text-sm text-gray-500">اليوم 10:15</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bank Reconciliation Tab */}
        <TabsContent value="reconciliation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Bank Statement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-green-600" />
                  رفع كشف حساب
                </CardTitle>
                <CardDescription>رفع كشف الحساب البنكي للتسوية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">اسحب الملف هنا أو اضغط للرفع</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV</p>
                </div>
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  بدء التسوية
                </Button>
              </CardContent>
            </Card>

            {/* Reconciliation Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  حالة التسوية
                </CardTitle>
                <CardDescription>آخر تسوية للحسابات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">البنك الأهلي</span>
                    <Badge className="bg-green-100 text-green-800">مكتملة</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">مصرف الراجحي</span>
                    <Badge className="bg-yellow-100 text-yellow-800">جارية</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">البنك السعودي الفرنسي</span>
                    <Badge className="bg-green-100 text-green-800">مكتملة</Badge>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>آخر تسوية:</span>
                    <span>15 يناير 2024</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>الفروقات المكتشفة:</span>
                    <span className="text-red-600">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reconciliation Results */}
          <Card>
            <CardHeader>
              <CardTitle>نتائج التسوية</CardTitle>
              <CardDescription>الفروقات المكتشفة والمعاملات غير المطابقة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">فرق في المبلغ</p>
                      <p className="text-sm text-gray-600">معاملة رقم TXN-001 - فرق 50 ريال</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    مراجعة
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">معاملة غير موجودة</p>
                      <p className="text-sm text-gray-600">معاملة في كشف البنك غير مسجلة في النظام</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    إضافة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>روابط سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/finance/cash-flow">
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                التدفق النقدي
              </Button>
            </Link>
            <Link href="/dashboard/finance/reports">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                التقارير
              </Button>
            </Link>
            <Link href="/dashboard/finance/budgets">
              <Button variant="outline" className="w-full justify-start">
                <Calculator className="h-4 w-4 mr-2" />
                الميزانيات
              </Button>
            </Link>
            <Link href="/dashboard/accounting">
              <Button variant="outline" className="w-full justify-start">
                <Receipt className="h-4 w-4 mr-2" />
                المحاسبة
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
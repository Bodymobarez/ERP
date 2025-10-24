"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Calculator,
  BookOpen,
  Receipt,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Banknote,
  Wallet,
  FileText,
  BarChart3,
  PieChart,
  Calendar,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"

// Mock data for construction accounting
const mockAccounts = [
  { id: "1", code: "1000", name: "الأصول المتداولة", type: "asset", balance: 2500000, isActive: true },
  { id: "2", code: "1100", name: "النقدية في الصندوق", type: "asset", balance: 350000, isActive: true },
  { id: "3", code: "1200", name: "البنك الأهلي - حساب المشاريع", type: "asset", balance: 1800000, isActive: true },
  { id: "4", code: "1300", name: "مستخلصات تحت التحصيل", type: "asset", balance: 850000, isActive: true },
  { id: "5", code: "1400", name: "مواد بناء بالمخزن", type: "asset", balance: 450000, isActive: true },
  { id: "6", code: "2000", name: "الخصوم المتداولة", type: "liability", balance: 1200000, isActive: true },
  { id: "7", code: "2100", name: "مستحقات المقاولين من الباطن", type: "liability", balance: 650000, isActive: true },
  { id: "8", code: "2200", name: "مستحقات الموردين", type: "liability", balance: 350000, isActive: true },
  { id: "9", code: "2300", name: "أجور العمال المستحقة", type: "liability", balance: 200000, isActive: true },
  { id: "10", code: "3000", name: "حقوق الملكية", type: "equity", balance: 1300000, isActive: true },
  { id: "11", code: "4000", name: "إيرادات المشاريع", type: "revenue", balance: 3500000, isActive: true },
  { id: "12", code: "4100", name: "مستخلصات معتمدة", type: "revenue", balance: 2800000, isActive: true },
  { id: "13", code: "4200", name: "أعمال إضافية", type: "revenue", balance: 700000, isActive: true },
  { id: "14", code: "5000", name: "تكاليف المشاريع", type: "expense", balance: 2200000, isActive: true },
  { id: "15", code: "5100", name: "تكلفة العمالة", type: "expense", balance: 800000, isActive: true },
  { id: "16", code: "5200", name: "تكلفة المواد", type: "expense", balance: 950000, isActive: true },
  { id: "17", code: "5300", name: "تكلفة المعدات", type: "expense", balance: 350000, isActive: true },
  { id: "18", code: "5400", name: "مقاولي الباطن", type: "expense", balance: 100000, isActive: true },
]

const mockTransactions = [
  { id: "1", date: "2024-01-15", description: "استلام مستخلص رقم 3 - مشروع البرج السكني", debit: 450000, credit: 0, account: "البنك الأهلي - حساب المشاريع", type: "income" },
  { id: "2", date: "2024-01-15", description: "شراء حديد تسليح 50 طن", debit: 0, credit: 175000, account: "النقدية في الصندوق", type: "expense" },
  { id: "3", date: "2024-01-14", description: "دفع أجور العمال - أسبوع 2", debit: 0, credit: 65000, account: "البنك الأهلي - حساب المشاريع", type: "expense" },
  { id: "4", date: "2024-01-14", description: "دفعة لمقاول الباطن - أعمال الكهرباء", debit: 0, credit: 85000, account: "البنك الأهلي - حساب المشاريع", type: "expense" },
  { id: "5", date: "2024-01-13", description: "شراء أسمنت 500 كيس", debit: 0, credit: 12500, account: "النقدية في الصندوق", type: "expense" },
  { id: "6", date: "2024-01-13", description: "استئجار رافعة برجية - شهر", debit: 0, credit: 35000, account: "البنك الأهلي - حساب المشاريع", type: "expense" },
]

const mockReports = [
  { id: "1", name: "ميزان المراجعة", description: "عرض جميع الحسابات وأرصدتها", icon: BarChart3, color: "bg-blue-500" },
  { id: "2", name: "قائمة المركز المالي", description: "الأصول والخصوم وحقوق الملكية", icon: PieChart, color: "bg-green-500" },
  { id: "3", name: "قائمة الدخل", description: "الإيرادات والمصروفات والأرباح", icon: TrendingUp, color: "bg-purple-500" },
  { id: "4", name: "قائمة التدفق النقدي", description: "تدفق النقدية الداخلة والخارجة", icon: DollarSign, color: "bg-orange-500" },
  { id: "5", name: "دفتر الأستاذ", description: "جميع العمليات المحاسبية", icon: BookOpen, color: "bg-red-500" },
  { id: "6", name: "كشف حساب", description: "كشف حساب مفصل لأي حساب", icon: FileText, color: "bg-teal-500" },
]

export default function AccountingPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("accounts")
  const [accounts, setAccounts] = useState(mockAccounts)
  const [transactions, setTransactions] = useState(mockTransactions)

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "asset": return "bg-green-100 text-green-800"
      case "liability": return "bg-red-100 text-red-800"
      case "equity": return "bg-blue-100 text-blue-800"
      case "revenue": return "bg-purple-100 text-purple-800"
      case "expense": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case "asset": return "أصل"
      case "liability": return "خصم"
      case "equity": return "حق ملكية"
      case "revenue": return "إيراد"
      case "expense": return "مصروف"
      default: return "غير محدد"
    }
  }

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "income": return "bg-green-100 text-green-800"
      case "expense": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.code.includes(searchTerm)
  )

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.account.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalAssets = accounts.filter(a => a.type === "asset").reduce((sum, a) => sum + a.balance, 0)
  const totalLiabilities = accounts.filter(a => a.type === "liability").reduce((sum, a) => sum + a.balance, 0)
  const totalEquity = accounts.filter(a => a.type === "equity").reduce((sum, a) => sum + a.balance, 0)
  const totalRevenue = accounts.filter(a => a.type === "revenue").reduce((sum, a) => sum + a.balance, 0)
  const totalExpenses = accounts.filter(a => a.type === "expense").reduce((sum, a) => sum + a.balance, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">المحاسبة المالية للمقاولات</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">إدارة الحسابات والعمليات المالية للمشاريع الإنشائية</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">تصدير</span>
            <span className="sm:hidden">تصدير</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Upload className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">استيراد</span>
            <span className="sm:hidden">استيراد</span>
          </Button>
          <Link href="/dashboard/accounting/new-transaction">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">إضافة قيد</span>
              <span className="sm:hidden">قيد</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الأصول</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(totalAssets)}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الخصوم</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(totalLiabilities)}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">حقوق الملكية</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(totalEquity)}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calculator className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                <p className="text-xl font-bold text-purple-600">{formatCurrency(totalRevenue)}</p>
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
                <p className="text-sm font-medium text-gray-600">إجمالي المصروفات</p>
                <p className="text-xl font-bold text-orange-600">{formatCurrency(totalExpenses)}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-2 sm:gap-4">
          {[
            { id: "accounts", label: "الحسابات", icon: BookOpen },
            { id: "transactions", label: "القيود اليومية", icon: Receipt },
            { id: "reports", label: "التقارير المالية", icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  selectedTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في المحاسبة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">فلترة</span>
          <span className="sm:hidden">فلتر</span>
        </Button>
      </div>

      {/* Content based on selected tab */}
      {selectedTab === "accounts" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>الحسابات المحاسبية</CardTitle>
                <CardDescription>جميع الحسابات المحاسبية في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{account.name}</h3>
                          <p className="text-sm text-gray-500">كود الحساب: {account.code}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getAccountTypeColor(account.type)}>
                          {getAccountTypeLabel(account.type)}
                        </Badge>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(account.balance)}</p>
                          <p className="text-xs text-gray-500">{account.isActive ? "نشط" : "غير نشط"}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إضافة حساب جديد</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/accounting/new-account">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة حساب
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>العمليات السريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/dashboard/accounting/new-transaction">
                  <Button variant="outline" className="w-full justify-start">
                    <Receipt className="h-4 w-4 mr-2" />
                    قيد يومي
                  </Button>
                </Link>
                <Link href="/dashboard/accounting/trial-balance">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    ميزان المراجعة
                  </Button>
                </Link>
                <Link href="/dashboard/accounting/journal">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    دفتر الأستاذ
                  </Button>
                </Link>
                <Link href="/dashboard/accounting/reports">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    التقارير المالية
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedTab === "transactions" && (
        <Card>
          <CardHeader>
            <CardTitle>القيود اليومية</CardTitle>
            <CardDescription>جميع العمليات المحاسبية المسجلة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Receipt className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{transaction.description}</h3>
                      <p className="text-sm text-gray-500">{transaction.account}</p>
                      <p className="text-xs text-gray-400">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getTransactionTypeColor(transaction.type)}>
                      {transaction.type === "income" ? "إيراد" : "مصروف"}
                    </Badge>
                    <div className="text-right">
                      {transaction.debit > 0 && (
                        <p className="font-semibold text-green-600">{formatCurrency(transaction.debit)}</p>
                      )}
                      {transaction.credit > 0 && (
                        <p className="font-semibold text-red-600">{formatCurrency(transaction.credit)}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === "reports" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockReports.map((report) => {
            const Icon = report.icon
            return (
              <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`${report.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{report.name}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    عرض التقرير
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

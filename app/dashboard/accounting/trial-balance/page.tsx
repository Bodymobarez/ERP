"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft, 
  Search, 
  Download, 
  Filter,
  BarChart3,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  DollarSign,
  Calendar
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for trial balance
const mockTrialBalance = [
  { 
    id: "1", 
    code: "1000", 
    name: "الأصول المتداولة", 
    type: "asset", 
    debit: 250000, 
    credit: 0, 
    balance: 250000 
  },
  { 
    id: "2", 
    code: "1100", 
    name: "النقدية في الصندوق", 
    type: "asset", 
    debit: 50000, 
    credit: 0, 
    balance: 50000 
  },
  { 
    id: "3", 
    code: "1200", 
    name: "البنك الأهلي", 
    type: "asset", 
    debit: 200000, 
    credit: 0, 
    balance: 200000 
  },
  { 
    id: "4", 
    code: "1300", 
    name: "العملاء", 
    type: "asset", 
    debit: 75000, 
    credit: 0, 
    balance: 75000 
  },
  { 
    id: "5", 
    code: "2000", 
    name: "الخصوم المتداولة", 
    type: "liability", 
    debit: 0, 
    credit: 150000, 
    balance: 150000 
  },
  { 
    id: "6", 
    code: "2100", 
    name: "الموردين", 
    type: "liability", 
    debit: 0, 
    credit: 80000, 
    balance: 80000 
  },
  { 
    id: "7", 
    code: "2200", 
    name: "الضرائب المستحقة", 
    type: "liability", 
    debit: 0, 
    credit: 70000, 
    balance: 70000 
  },
  { 
    id: "8", 
    code: "3000", 
    name: "حقوق الملكية", 
    type: "equity", 
    debit: 0, 
    credit: 100000, 
    balance: 100000 
  },
  { 
    id: "9", 
    code: "3100", 
    name: "رأس المال", 
    type: "equity", 
    debit: 0, 
    credit: 80000, 
    balance: 80000 
  },
  { 
    id: "10", 
    code: "3200", 
    name: "الأرباح المحتجزة", 
    type: "equity", 
    debit: 0, 
    credit: 20000, 
    balance: 20000 
  },
  { 
    id: "11", 
    code: "4000", 
    name: "الإيرادات", 
    type: "revenue", 
    debit: 0, 
    credit: 300000, 
    balance: 300000 
  },
  { 
    id: "12", 
    code: "4100", 
    name: "مبيعات", 
    type: "revenue", 
    debit: 0, 
    credit: 250000, 
    balance: 250000 
  },
  { 
    id: "13", 
    code: "4200", 
    name: "إيراد خدمات", 
    type: "revenue", 
    debit: 0, 
    credit: 50000, 
    balance: 50000 
  },
  { 
    id: "14", 
    code: "5000", 
    name: "المصروفات", 
    type: "expense", 
    debit: 200000, 
    credit: 0, 
    balance: 200000 
  },
  { 
    id: "15", 
    code: "5100", 
    name: "تكلفة المبيعات", 
    type: "expense", 
    debit: 120000, 
    credit: 0, 
    balance: 120000 
  },
  { 
    id: "16", 
    code: "5200", 
    name: "المصروفات الإدارية", 
    type: "expense", 
    debit: 80000, 
    credit: 0, 
    balance: 80000 
  },
]

export default function TrialBalancePage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [trialBalance, setTrialBalance] = useState(mockTrialBalance)

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

  const filteredData = trialBalance.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.includes(searchTerm)
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesType
  })

  const totalDebit = trialBalance.reduce((sum, item) => sum + item.debit, 0)
  const totalCredit = trialBalance.reduce((sum, item) => sum + item.credit, 0)
  const isBalanced = totalDebit === totalCredit

  const assetTotal = trialBalance.filter(item => item.type === "asset").reduce((sum, item) => sum + item.balance, 0)
  const liabilityTotal = trialBalance.filter(item => item.type === "liability").reduce((sum, item) => sum + item.balance, 0)
  const equityTotal = trialBalance.filter(item => item.type === "equity").reduce((sum, item) => sum + item.balance, 0)
  const revenueTotal = trialBalance.filter(item => item.type === "revenue").reduce((sum, item) => sum + item.balance, 0)
  const expenseTotal = trialBalance.filter(item => item.type === "expense").reduce((sum, item) => sum + item.balance, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/accounting">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ميزان المراجعة</h1>
          <p className="text-gray-600 mt-1">عرض جميع الحسابات وأرصدتها</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الأصول</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(assetTotal)}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الخصوم</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(liabilityTotal)}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">حقوق الملكية</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(equityTotal)}</p>
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
                <p className="text-xl font-bold text-purple-600">{formatCurrency(revenueTotal)}</p>
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
                <p className="text-xl font-bold text-orange-600">{formatCurrency(expenseTotal)}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calculator className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Balance Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${isBalanced ? 'bg-green-100' : 'bg-red-100'}`}>
                {isBalanced ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {isBalanced ? 'الميزان متوازن' : 'الميزان غير متوازن'}
                </h3>
                <p className="text-gray-600">
                  المجموع المدين: {formatCurrency(totalDebit)} | المجموع الدائن: {formatCurrency(totalCredit)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">تاريخ التقرير</p>
              <p className="font-semibold">{new Date().toLocaleDateString('ar-SA')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في الحسابات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الأنواع</option>
          <option value="asset">الأصول</option>
          <option value="liability">الخصوم</option>
          <option value="equity">حقوق الملكية</option>
          <option value="revenue">الإيرادات</option>
          <option value="expense">المصروفات</option>
        </select>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
      </div>

      {/* Trial Balance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            ميزان المراجعة
          </CardTitle>
          <CardDescription>
            عرض جميع الحسابات وأرصدتها حسب النوع
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-4 font-semibold">كود الحساب</th>
                  <th className="text-right p-4 font-semibold">اسم الحساب</th>
                  <th className="text-right p-4 font-semibold">النوع</th>
                  <th className="text-right p-4 font-semibold">مدين</th>
                  <th className="text-right p-4 font-semibold">دائن</th>
                  <th className="text-right p-4 font-semibold">الرصيد</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{item.code}</td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4">
                      <Badge className={getAccountTypeColor(item.type)}>
                        {getAccountTypeLabel(item.type)}
                      </Badge>
                    </td>
                    <td className="p-4 text-green-600 font-medium">
                      {item.debit > 0 ? formatCurrency(item.debit) : '-'}
                    </td>
                    <td className="p-4 text-red-600 font-medium">
                      {item.credit > 0 ? formatCurrency(item.credit) : '-'}
                    </td>
                    <td className="p-4 font-semibold">
                      {item.balance > 0 ? (
                        <span className="text-green-600">{formatCurrency(item.balance)}</span>
                      ) : (
                        <span className="text-red-600">{formatCurrency(item.balance)}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr className="font-semibold">
                  <td colSpan={3} className="p-4 text-center">المجموع</td>
                  <td className="p-4 text-green-600">{formatCurrency(totalDebit)}</td>
                  <td className="p-4 text-red-600">{formatCurrency(totalCredit)}</td>
                  <td className="p-4">
                    <span className={isBalanced ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(Math.abs(totalDebit - totalCredit))}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/accounting/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التقارير المالية</h3>
                  <p className="text-sm text-gray-600">عرض جميع التقارير</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/accounting/journal">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">دفتر الأستاذ</h3>
                  <p className="text-sm text-gray-600">عرض جميع العمليات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/accounting/new-transaction">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calculator className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">إضافة قيد جديد</h3>
                  <p className="text-sm text-gray-600">تسجيل عملية محاسبية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

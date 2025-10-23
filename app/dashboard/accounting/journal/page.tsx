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
  BookOpen,
  Calendar,
  FileText,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for journal entries
const mockJournalEntries = [
  {
    id: "1",
    date: "2024-01-15",
    reference: "TR-2024-001",
    description: "مبيعات نقدية",
    entries: [
      { account: "النقدية في الصندوق", debit: 10000, credit: 0 },
      { account: "الإيرادات", debit: 0, credit: 10000 }
    ],
    totalDebit: 10000,
    totalCredit: 10000,
    status: "posted"
  },
  {
    id: "2",
    date: "2024-01-15",
    reference: "TR-2024-002",
    description: "شراء مواد خام",
    entries: [
      { account: "المخزون", debit: 5000, credit: 0 },
      { account: "النقدية في الصندوق", debit: 0, credit: 5000 }
    ],
    totalDebit: 5000,
    totalCredit: 5000,
    status: "posted"
  },
  {
    id: "3",
    date: "2024-01-14",
    reference: "TR-2024-003",
    description: "مرتبات الموظفين",
    entries: [
      { account: "المصروفات الإدارية", debit: 15000, credit: 0 },
      { account: "البنك الأهلي", debit: 0, credit: 15000 }
    ],
    totalDebit: 15000,
    totalCredit: 15000,
    status: "posted"
  },
  {
    id: "4",
    date: "2024-01-14",
    reference: "TR-2024-004",
    description: "إيراد خدمات",
    entries: [
      { account: "البنك الأهلي", debit: 8000, credit: 0 },
      { account: "إيراد خدمات", debit: 0, credit: 8000 }
    ],
    totalDebit: 8000,
    totalCredit: 8000,
    status: "posted"
  },
  {
    id: "5",
    date: "2024-01-13",
    reference: "TR-2024-005",
    description: "إيجار المكتب",
    entries: [
      { account: "المصروفات الإدارية", debit: 3000, credit: 0 },
      { account: "النقدية في الصندوق", debit: 0, credit: 3000 }
    ],
    totalDebit: 3000,
    totalCredit: 3000,
    status: "posted"
  },
  {
    id: "6",
    date: "2024-01-13",
    reference: "TR-2024-006",
    description: "مبيعات آجلة",
    entries: [
      { account: "العملاء", debit: 12000, credit: 0 },
      { account: "المبيعات", debit: 0, credit: 12000 }
    ],
    totalDebit: 12000,
    totalCredit: 12000,
    status: "posted"
  },
  {
    id: "7",
    date: "2024-01-12",
    reference: "TR-2024-007",
    description: "شراء معدات",
    entries: [
      { account: "الأصول الثابتة", debit: 25000, credit: 0 },
      { account: "البنك الأهلي", debit: 0, credit: 25000 }
    ],
    totalDebit: 25000,
    totalCredit: 25000,
    status: "posted"
  },
  {
    id: "8",
    date: "2024-01-12",
    reference: "TR-2024-008",
    description: "تسديد دين مورد",
    entries: [
      { account: "الموردين", debit: 7000, credit: 0 },
      { account: "البنك الأهلي", debit: 0, credit: 7000 }
    ],
    totalDebit: 7000,
    totalCredit: 7000,
    status: "posted"
  }
]

export default function JournalPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [journalEntries, setJournalEntries] = useState(mockJournalEntries)

  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.entries.some(e => e.account.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDate = !selectedDate || entry.date === selectedDate
    return matchesSearch && matchesDate
  })

  const totalTransactions = journalEntries.length
  const totalDebit = journalEntries.reduce((sum, entry) => sum + entry.totalDebit, 0)
  const totalCredit = journalEntries.reduce((sum, entry) => sum + entry.totalCredit, 0)

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
          <h1 className="text-3xl font-bold text-gray-900">دفتر الأستاذ</h1>
          <p className="text-gray-600 mt-1">جميع العمليات المحاسبية المسجلة في النظام</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي القيود</p>
                <p className="text-xl font-bold text-blue-600">{totalTransactions}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المدين</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(totalDebit)}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الدائن</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(totalCredit)}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">حالة التوازن</p>
                <p className={`text-xl font-bold ${totalDebit === totalCredit ? 'text-green-600' : 'text-red-600'}`}>
                  {totalDebit === totalCredit ? 'متوازن' : 'غير متوازن'}
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في دفتر الأستاذ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-48"
        />
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          فلترة
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{entry.description}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>رقم القيد: {entry.reference}</span>
                      <span>التاريخ: {new Date(entry.date).toLocaleDateString('ar-SA')}</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {entry.status === 'posted' ? 'مسجل' : 'مسودة'}
                      </Badge>
                    </div>
                  </div>
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
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-semibold">الحساب</th>
                      <th className="text-right p-3 font-semibold">مدين</th>
                      <th className="text-right p-3 font-semibold">دائن</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.entries.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3 font-medium">{item.account}</td>
                        <td className="p-3 text-green-600 font-medium">
                          {item.debit > 0 ? formatCurrency(item.debit) : '-'}
                        </td>
                        <td className="p-3 text-red-600 font-medium">
                          {item.credit > 0 ? formatCurrency(item.credit) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr className="font-semibold">
                      <td className="p-3 text-center">المجموع</td>
                      <td className="p-3 text-green-600">{formatCurrency(entry.totalDebit)}</td>
                      <td className="p-3 text-red-600">{formatCurrency(entry.totalCredit)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد قيود محاسبية</h3>
            <p className="text-gray-600 mb-4">
              لم يتم العثور على قيود محاسبية تطابق معايير البحث المحددة
            </p>
            <Link href="/dashboard/accounting/new-transaction">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                إضافة قيد جديد
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/accounting/new-transaction">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">إضافة قيد جديد</h3>
                  <p className="text-sm text-gray-600">تسجيل عملية محاسبية جديدة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/accounting/trial-balance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">ميزان المراجعة</h3>
                  <p className="text-sm text-gray-600">عرض جميع الحسابات وأرصدتها</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/accounting/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التقارير المالية</h3>
                  <p className="text-sm text-gray-600">عرض التقارير المالية المختلفة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

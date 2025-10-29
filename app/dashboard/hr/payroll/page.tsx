"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Search,
  Filter,
  Download,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Edit,
  Plus,
  Users,
  TrendingUp,
  FileText
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const mockPayrollRecords = [
  { 
    id: "1", 
    month: "يناير 2024",
    year: 2024,
    monthNumber: 1,
    totalEmployees: 45,
    basicSalary: 350000,
    allowances: 50000,
    deductions: 20000,
    overtime: 30000,
    totalSalary: 410000,
    status: "paid",
    paymentDate: "2024-01-31"
  },
  { 
    id: "2", 
    month: "ديسمبر 2023",
    year: 2023,
    monthNumber: 12,
    totalEmployees: 43,
    basicSalary: 340000,
    allowances: 48000,
    deductions: 18000,
    overtime: 28000,
    totalSalary: 398000,
    status: "paid",
    paymentDate: "2023-12-31"
  },
  { 
    id: "3", 
    month: "نوفمبر 2023",
    year: 2023,
    monthNumber: 11,
    totalEmployees: 42,
    basicSalary: 330000,
    allowances: 45000,
    deductions: 17000,
    overtime: 25000,
    totalSalary: 383000,
    status: "paid",
    paymentDate: "2023-11-30"
  },
  { 
    id: "4", 
    month: "فبراير 2024",
    year: 2024,
    monthNumber: 2,
    totalEmployees: 46,
    basicSalary: 360000,
    allowances: 52000,
    deductions: 21000,
    overtime: 32000,
    totalSalary: 423000,
    status: "pending",
    paymentDate: null
  },
]

const mockEmployeePayroll = [
  {
    id: "1",
    employeeId: "EMP-001",
    name: "أحمد محمد علي",
    position: "مهندس برمجيات",
    basicSalary: 10000,
    allowances: 2000,
    deductions: 500,
    overtime: 1000,
    netSalary: 12500,
    status: "paid"
  },
  {
    id: "2",
    employeeId: "EMP-002",
    name: "فاطمة أحمد خالد",
    position: "محاسبة",
    basicSalary: 8000,
    allowances: 1500,
    deductions: 400,
    overtime: 800,
    netSalary: 9900,
    status: "paid"
  },
  {
    id: "3",
    employeeId: "EMP-003",
    name: "محمد علي حسن",
    position: "مدير مبيعات",
    basicSalary: 12000,
    allowances: 3000,
    deductions: 600,
    overtime: 500,
    netSalary: 14900,
    status: "paid"
  },
]

export default function PayrollPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("monthly")

  const filteredPayroll = mockPayrollRecords.filter(record =>
    record.month.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentMonthStats = mockPayrollRecords[0]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "processing": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid": return "مدفوع"
      case "pending": return "قيد الإعداد"
      case "processing": return "قيد المعالجة"
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/hr">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الرواتب</h1>
          <p className="text-gray-600 mt-1">متابعة وإدارة رواتب الموظفين الشهرية</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">عدد الموظفين</p>
                <p className="text-2xl font-bold">{currentMonthStats?.totalEmployees || 0}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الراتب الأساسي</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(currentMonthStats?.basicSalary || 0)}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">البدلات</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(currentMonthStats?.allowances || 0)}</p>
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
                <p className="text-sm font-medium text-gray-600">الخصومات</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(currentMonthStats?.deductions || 0)}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الإجمالي</p>
                <p className="text-xl font-bold text-purple-600">{formatCurrency(currentMonthStats?.totalSalary || 0)}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "monthly", label: "الرواتب الشهرية", icon: Calendar },
            { id: "employees", label: "رواتب الموظفين", icon: Users }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في الرواتب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          فلترة
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
      </div>

      {/* Content based on selected tab */}
      {selectedTab === "monthly" && (
        <Card>
          <CardHeader>
            <CardTitle>سجل الرواتب الشهرية</CardTitle>
            <CardDescription>عرض جميع سجلات الرواتب حسب الشهر</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPayroll.map((record) => (
                <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{record.month}</h3>
                        <p className="text-sm text-gray-600">{record.totalEmployees} موظف</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">إجمالي الرواتب</p>
                        <p className="text-xl font-bold text-purple-600">{formatCurrency(record.totalSalary)}</p>
                      </div>
                      <Badge className={getStatusColor(record.status)}>
                        {getStatusLabel(record.status)}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-gray-500">الراتب الأساسي</p>
                      <p className="font-semibold">{formatCurrency(record.basicSalary)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">البدلات</p>
                      <p className="font-semibold text-green-600">+{formatCurrency(record.allowances)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">الخصومات</p>
                      <p className="font-semibold text-red-600">-{formatCurrency(record.deductions)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">العمل الإضافي</p>
                      <p className="font-semibold text-purple-600">+{formatCurrency(record.overtime)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === "employees" && (
        <Card>
          <CardHeader>
            <CardTitle>رواتب الموظفين</CardTitle>
            <CardDescription>تفاصيل رواتب الموظفين للشهر الحالي</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-4 font-semibold">رقم الموظف</th>
                    <th className="text-right p-4 font-semibold">الاسم</th>
                    <th className="text-right p-4 font-semibold">الوظيفة</th>
                    <th className="text-right p-4 font-semibold">الراتب الأساسي</th>
                    <th className="text-right p-4 font-semibold">البدلات</th>
                    <th className="text-right p-4 font-semibold">الخصومات</th>
                    <th className="text-right p-4 font-semibold">العمل الإضافي</th>
                    <th className="text-right p-4 font-semibold">الصافي</th>
                    <th className="text-right p-4 font-semibold">الحالة</th>
                    <th className="text-right p-4 font-semibold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {mockEmployeePayroll.map((emp) => (
                    <tr key={emp.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-mono text-sm">{emp.employeeId}</td>
                      <td className="p-4 font-medium">{emp.name}</td>
                      <td className="p-4 text-sm text-gray-600">{emp.position}</td>
                      <td className="p-4">{formatCurrency(emp.basicSalary)}</td>
                      <td className="p-4 text-green-600">+{formatCurrency(emp.allowances)}</td>
                      <td className="p-4 text-red-600">-{formatCurrency(emp.deductions)}</td>
                      <td className="p-4 text-purple-600">+{formatCurrency(emp.overtime)}</td>
                      <td className="p-4 font-bold text-blue-600">{formatCurrency(emp.netSalary)}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(emp.status)}>
                          {getStatusLabel(emp.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr className="font-semibold">
                    <td colSpan={3} className="p-4 text-center">الإجمالي</td>
                    <td className="p-4">{formatCurrency(mockEmployeePayroll.reduce((sum, e) => sum + e.basicSalary, 0))}</td>
                    <td className="p-4 text-green-600">+{formatCurrency(mockEmployeePayroll.reduce((sum, e) => sum + e.allowances, 0))}</td>
                    <td className="p-4 text-red-600">-{formatCurrency(mockEmployeePayroll.reduce((sum, e) => sum + e.deductions, 0))}</td>
                    <td className="p-4 text-purple-600">+{formatCurrency(mockEmployeePayroll.reduce((sum, e) => sum + e.overtime, 0))}</td>
                    <td className="p-4 text-blue-600">{formatCurrency(mockEmployeePayroll.reduce((sum, e) => sum + e.netSalary, 0))}</td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/hr/payroll/generate">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">إنشاء رواتب جديدة</h3>
                  <p className="text-sm text-gray-600">توليد رواتب الشهر الحالي</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/hr/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">تقارير الرواتب</h3>
                  <p className="text-sm text-gray-600">عرض تقارير تفصيلية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/hr">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">العودة للموارد البشرية</h3>
                  <p className="text-sm text-gray-600">العودة للصفحة الرئيسية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}


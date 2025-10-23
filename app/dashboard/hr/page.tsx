"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Award,
  Briefcase,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

export default function HRPage() {
  const [employees, setEmployees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("employees")
  const { t, lang } = useLanguage()

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching employees:", error)
        setLoading(false)
      })
  }, [])

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === 'active').length,
    onLeave: employees.filter(e => e.status === 'on-leave').length,
    terminated: employees.filter(e => e.status === 'terminated').length,
    totalSalary: employees.reduce((sum, e) => sum + (e.salary || 0), 0),
  }

  const filteredEmployees = employees.filter(employee =>
    employee.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const mockAttendance = [
    { id: "1", employee: "أحمد محمد", date: "2024-01-15", checkIn: "08:00", checkOut: "17:00", status: "present" },
    { id: "2", employee: "فاطمة أحمد", date: "2024-01-15", checkIn: "08:15", checkOut: "17:10", status: "present" },
    { id: "3", employee: "محمد علي", date: "2024-01-15", checkIn: "-", checkOut: "-", status: "absent" },
    { id: "4", employee: "سارة خالد", date: "2024-01-15", checkIn: "08:00", checkOut: "17:00", status: "present" },
  ]

  const mockLeaveRequests = [
    { id: "1", employee: "أحمد محمد", type: "سنوية", startDate: "2024-02-01", endDate: "2024-02-07", days: 7, status: "pending" },
    { id: "2", employee: "فاطمة أحمد", type: "مرضية", startDate: "2024-01-20", endDate: "2024-01-22", days: 3, status: "approved" },
    { id: "3", employee: "محمد علي", type: "طارئة", startDate: "2024-01-25", endDate: "2024-01-25", days: 1, status: "rejected" },
  ]

  const mockPayroll = [
    { id: "1", month: "يناير 2024", totalEmployees: 45, totalSalaries: 450000, status: "paid" },
    { id: "2", month: "ديسمبر 2023", totalEmployees: 43, totalSalaries: 430000, status: "paid" },
    { id: "3", month: "نوفمبر 2023", totalEmployees: 42, totalSalaries: 420000, status: "paid" },
  ]

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-green-100 text-green-800"
      case "absent": return "bg-red-100 text-red-800"
      case "late": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getLeaveStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة العمالة والموارد البشرية</h1>
          <p className="text-gray-600 mt-1">إدارة العمال والفنيين والمهندسين في المشاريع الإنشائية</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/hr/workers">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              العمال
            </Button>
          </Link>
          <Link href="/dashboard/hr/attendance">
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              الحضور
            </Button>
          </Link>
          <Link href="/dashboard/hr/payroll">
            <Button variant="outline" size="sm">
              <DollarSign className="h-4 w-4 mr-2" />
              الأجور
            </Button>
          </Link>
          <Link href="/dashboard/hr/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              عامل جديد
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الموظفين</p>
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
                <p className="text-sm text-gray-600">الموظفين النشطين</p>
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
                <p className="text-sm text-gray-600">في إجازة</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.onLeave}</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">منتهي الخدمة</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.terminated}</p>
              </div>
              <div className="bg-red-500 text-white p-3 rounded-lg">
                <UserX className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الرواتب</p>
                <p className="text-xl font-bold mt-1 text-purple-600">{formatCurrency(stats.totalSalary)}</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "employees", label: "الموظفين", icon: Users },
            { id: "attendance", label: "الحضور", icon: Clock },
            { id: "leaves", label: "الإجازات", icon: Calendar },
            { id: "payroll", label: "الرواتب", icon: DollarSign }
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
              placeholder="البحث في الموارد البشرية..."
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
      {selectedTab === "employees" && (
        <Card>
          <CardHeader>
            <CardTitle>دليل الموظفين</CardTitle>
            <CardDescription>عرض وإدارة جميع الموظفين</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">جاري التحميل...</div>
            ) : (
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.photo} />
                        <AvatarFallback>
                          {getInitials(employee.firstName, employee.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {employee.firstName} {employee.lastName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Briefcase className="h-3 w-3" />
                          <span>{employee.position}</span>
                          <span>•</span>
                          <span>{employee.department}</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {employee.email} • {employee.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">الراتب</p>
                        <p className="font-semibold">{formatCurrency(employee.salary || 0)}</p>
                      </div>
                      <EmployeeStatusBadge status={employee.status} />
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
            )}
          </CardContent>
        </Card>
      )}

      {selectedTab === "attendance" && (
        <Card>
          <CardHeader>
            <CardTitle>سجل الحضور</CardTitle>
            <CardDescription>متابعة حضور وانصراف الموظفين</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-4 font-semibold">الموظف</th>
                    <th className="text-right p-4 font-semibold">التاريخ</th>
                    <th className="text-right p-4 font-semibold">الحضور</th>
                    <th className="text-right p-4 font-semibold">الانصراف</th>
                    <th className="text-right p-4 font-semibold">الحالة</th>
                    <th className="text-right p-4 font-semibold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAttendance.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{record.employee}</td>
                      <td className="p-4">{record.date}</td>
                      <td className="p-4">{record.checkIn}</td>
                      <td className="p-4">{record.checkOut}</td>
                      <td className="p-4">
                        <Badge className={getAttendanceStatusColor(record.status)}>
                          {record.status === 'present' ? 'حاضر' : 'غائب'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === "leaves" && (
        <Card>
          <CardHeader>
            <CardTitle>طلبات الإجازات</CardTitle>
            <CardDescription>إدارة طلبات الإجازات للموظفين</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLeaveRequests.map((leave) => (
                <div key={leave.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{leave.employee}</h3>
                      <p className="text-sm text-gray-600">إجازة {leave.type}</p>
                      <p className="text-xs text-gray-500">
                        من {leave.startDate} إلى {leave.endDate} ({leave.days} أيام)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getLeaveStatusColor(leave.status)}>
                      {leave.status === 'approved' ? 'موافق' : leave.status === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
                    </Badge>
                    <div className="flex gap-2">
                      {leave.status === 'pending' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600 border-green-600">
                            موافقة
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                            رفض
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === "payroll" && (
        <Card>
          <CardHeader>
            <CardTitle>سجل الرواتب</CardTitle>
            <CardDescription>متابعة رواتب الموظفين الشهرية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPayroll.map((payroll) => (
                <div key={payroll.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{payroll.month}</h3>
                      <p className="text-sm text-gray-600">
                        {payroll.totalEmployees} موظف
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">إجمالي الرواتب</p>
                      <p className="text-lg font-bold text-purple-600">{formatCurrency(payroll.totalSalaries)}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {payroll.status === 'paid' ? 'مدفوع' : 'قيد الإعداد'}
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
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/hr/attendance">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الحضور والانصراف</h3>
                  <p className="text-sm text-gray-600">متابعة الحضور اليومي</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/hr/leaves">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">طلبات الإجازات</h3>
                  <p className="text-sm text-gray-600">إدارة الإجازات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/hr/payroll">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">الرواتب</h3>
                  <p className="text-sm text-gray-600">إدارة الرواتب الشهرية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/hr/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">التقارير</h3>
                  <p className="text-sm text-gray-600">تقارير الموارد البشرية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

function EmployeeStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    "on-leave": "bg-yellow-100 text-yellow-800",
    terminated: "bg-red-100 text-red-800",
  }

  const labels: Record<string, string> = {
    active: "نشط",
    "on-leave": "في إجازة",
    terminated: "منتهي الخدمة",
  }

  return (
    <Badge className={colors[status] || colors.active}>
      {labels[status] || status}
    </Badge>
  )
}

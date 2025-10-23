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
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Plus
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockAttendance = [
  { 
    id: "1", 
    employeeId: "EMP-001",
    employee: "أحمد محمد علي", 
    date: "2024-01-15", 
    checkIn: "08:00", 
    checkOut: "17:00",
    workHours: "9:00",
    status: "present",
    overtime: "0:00"
  },
  { 
    id: "2", 
    employeeId: "EMP-002",
    employee: "فاطمة أحمد خالد", 
    date: "2024-01-15", 
    checkIn: "08:15", 
    checkOut: "17:10",
    workHours: "8:55",
    status: "late",
    overtime: "0:10"
  },
  { 
    id: "3", 
    employeeId: "EMP-003",
    employee: "محمد علي حسن", 
    date: "2024-01-15", 
    checkIn: "-", 
    checkOut: "-",
    workHours: "0:00",
    status: "absent",
    overtime: "0:00"
  },
  { 
    id: "4", 
    employeeId: "EMP-004",
    employee: "سارة خالد عمر", 
    date: "2024-01-15", 
    checkIn: "08:00", 
    checkOut: "17:00",
    workHours: "9:00",
    status: "present",
    overtime: "0:00"
  },
  { 
    id: "5", 
    employeeId: "EMP-005",
    employee: "خالد محمود أحمد", 
    date: "2024-01-15", 
    checkIn: "07:45", 
    checkOut: "18:30",
    workHours: "10:45",
    status: "present",
    overtime: "1:45"
  },
]

export default function AttendancePage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const filteredAttendance = mockAttendance.filter(record =>
    record.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    present: mockAttendance.filter(a => a.status === 'present' || a.status === 'late').length,
    absent: mockAttendance.filter(a => a.status === 'absent').length,
    late: mockAttendance.filter(a => a.status === 'late').length,
    onTime: mockAttendance.filter(a => a.status === 'present' && a.checkIn <= '08:00').length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-green-100 text-green-800"
      case "absent": return "bg-red-100 text-red-800"
      case "late": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "present": return "حاضر"
      case "absent": return "غائب"
      case "late": return "متأخر"
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <CheckCircle2 className="h-4 w-4" />
      case "absent": return <XCircle className="h-4 w-4" />
      case "late": return <AlertTriangle className="h-4 w-4" />
      default: return null
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
          <h1 className="text-3xl font-bold text-gray-900">الحضور والانصراف</h1>
          <p className="text-gray-600 mt-1">متابعة حضور وانصراف الموظفين</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الحضور</p>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الغياب</p>
                <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متأخرين</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">في الوقت المحدد</p>
                <p className="text-2xl font-bold text-blue-600">{stats.onTime}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
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
              placeholder="البحث في سجل الحضور..."
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

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>سجل الحضور</CardTitle>
              <CardDescription>سجل حضور وانصراف الموظفين اليوم</CardDescription>
            </div>
            <Link href="/dashboard/hr/attendance/new">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                تسجيل حضور
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-4 font-semibold">رقم الموظف</th>
                  <th className="text-right p-4 font-semibold">اسم الموظف</th>
                  <th className="text-right p-4 font-semibold">التاريخ</th>
                  <th className="text-right p-4 font-semibold">وقت الحضور</th>
                  <th className="text-right p-4 font-semibold">وقت الانصراف</th>
                  <th className="text-right p-4 font-semibold">ساعات العمل</th>
                  <th className="text-right p-4 font-semibold">العمل الإضافي</th>
                  <th className="text-right p-4 font-semibold">الحالة</th>
                  <th className="text-right p-4 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{record.employeeId}</td>
                    <td className="p-4 font-medium">{record.employee}</td>
                    <td className="p-4">{record.date}</td>
                    <td className="p-4">{record.checkIn}</td>
                    <td className="p-4">{record.checkOut}</td>
                    <td className="p-4 font-medium">{record.workHours}</td>
                    <td className="p-4 text-purple-600 font-medium">{record.overtime}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(record.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(record.status)}
                          {getStatusLabel(record.status)}
                        </div>
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

      {/* Quick Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ملخص اليوم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">معدل الحضور:</span>
                <span className="font-semibold text-green-600">
                  {((stats.present / mockAttendance.length) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">معدل الغياب:</span>
                <span className="font-semibold text-red-600">
                  {((stats.absent / mockAttendance.length) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">معدل التأخير:</span>
                <span className="font-semibold text-yellow-600">
                  {((stats.late / mockAttendance.length) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ساعات العمل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">إجمالي الساعات:</span>
                <span className="font-semibold">36:55</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ساعات إضافية:</span>
                <span className="font-semibold text-purple-600">1:55</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">متوسط الساعات:</span>
                <span className="font-semibold">9:14</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الإحصائيات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">أيام العمل:</span>
                <span className="font-semibold">15 / 22</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">معدل الحضور:</span>
                <span className="font-semibold text-green-600">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">إجمالي الغياب:</span>
                <span className="font-semibold text-red-600">12 يوم</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


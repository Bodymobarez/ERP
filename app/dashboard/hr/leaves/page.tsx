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
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Edit,
  Plus,
  AlertCircle
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const mockLeaveRequests = [
  { 
    id: "1", 
    employeeId: "EMP-001",
    employee: "أحمد محمد علي", 
    type: "سنوية", 
    startDate: "2024-02-01", 
    endDate: "2024-02-07", 
    days: 7,
    reason: "إجازة سنوية للراحة",
    status: "pending",
    requestDate: "2024-01-10"
  },
  { 
    id: "2", 
    employeeId: "EMP-002",
    employee: "فاطمة أحمد خالد", 
    type: "مرضية", 
    startDate: "2024-01-20", 
    endDate: "2024-01-22", 
    days: 3,
    reason: "إجازة مرضية - إنفلونزا",
    status: "approved",
    requestDate: "2024-01-18"
  },
  { 
    id: "3", 
    employeeId: "EMP-003",
    employee: "محمد علي حسن", 
    type: "طارئة", 
    startDate: "2024-01-25", 
    endDate: "2024-01-25", 
    days: 1,
    reason: "ظرف طارئ عائلي",
    status: "rejected",
    requestDate: "2024-01-24"
  },
  { 
    id: "4", 
    employeeId: "EMP-004",
    employee: "سارة خالد عمر", 
    type: "سنوية", 
    startDate: "2024-03-01", 
    endDate: "2024-03-14", 
    days: 14,
    reason: "إجازة سنوية - سفر",
    status: "pending",
    requestDate: "2024-01-15"
  },
  { 
    id: "5", 
    employeeId: "EMP-005",
    employee: "خالد محمود أحمد", 
    type: "دراسية", 
    startDate: "2024-02-15", 
    endDate: "2024-02-16", 
    days: 2,
    reason: "حضور دورة تدريبية",
    status: "approved",
    requestDate: "2024-01-12"
  },
]

const leaveTypes = [
  { id: "annual", name: "إجازة سنوية", color: "bg-blue-100 text-blue-800", allowance: 21 },
  { id: "sick", name: "إجازة مرضية", color: "bg-red-100 text-red-800", allowance: 15 },
  { id: "emergency", name: "إجازة طارئة", color: "bg-yellow-100 text-yellow-800", allowance: 5 },
  { id: "study", name: "إجازة دراسية", color: "bg-purple-100 text-purple-800", allowance: 10 },
]

export default function LeavesPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredLeaves = mockLeaveRequests.filter(leave => {
    const matchesSearch = leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || leave.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    pending: mockLeaveRequests.filter(l => l.status === 'pending').length,
    approved: mockLeaveRequests.filter(l => l.status === 'approved').length,
    rejected: mockLeaveRequests.filter(l => l.status === 'rejected').length,
    totalDays: mockLeaveRequests.reduce((sum, l) => sum + l.days, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved": return "موافق عليها"
      case "pending": return "قيد المراجعة"
      case "rejected": return "مرفوضة"
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle2 className="h-4 w-4" />
      case "pending": return <Clock className="h-4 w-4" />
      case "rejected": return <XCircle className="h-4 w-4" />
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
          <h1 className="text-3xl font-bold text-gray-900">طلبات الإجازات</h1>
          <p className="text-gray-600 mt-1">إدارة ومتابعة طلبات الإجازات للموظفين</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">موافق عليها</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
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
                <p className="text-sm font-medium text-gray-600">مرفوضة</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
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
                <p className="text-sm font-medium text-gray-600">إجمالي الأيام</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalDays}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Types Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {leaveTypes.map((type) => (
          <Card key={type.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className={type.color}>{type.name}</Badge>
                  <p className="text-sm text-gray-600 mt-2">الرصيد السنوي</p>
                  <p className="text-xl font-bold">{type.allowance} يوم</p>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في طلبات الإجازات..."
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
          <option value="pending">قيد المراجعة</option>
          <option value="approved">موافق عليها</option>
          <option value="rejected">مرفوضة</option>
        </select>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
      </div>

      {/* Leave Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>طلبات الإجازات</CardTitle>
              <CardDescription>جميع طلبات الإجازات المقدمة من الموظفين</CardDescription>
            </div>
            <Link href="/dashboard/hr/leaves/new">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                طلب إجازة جديد
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeaves.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{leave.employee}</h3>
                      <span className="text-xs text-gray-500">({leave.employeeId})</span>
                    </div>
                    <p className="text-sm text-gray-600">إجازة {leave.type}</p>
                    <p className="text-xs text-gray-500">
                      من {new Date(leave.startDate).toLocaleDateString('ar-SA')} إلى {new Date(leave.endDate).toLocaleDateString('ar-SA')} ({leave.days} أيام)
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      <AlertCircle className="h-3 w-3 inline mr-1" />
                      السبب: {leave.reason}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">تاريخ الطلب</p>
                    <p className="text-sm font-medium">{new Date(leave.requestDate).toLocaleDateString('ar-SA')}</p>
                  </div>
                  <Badge className={getStatusColor(leave.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(leave.status)}
                      {getStatusLabel(leave.status)}
                    </div>
                  </Badge>
                  <div className="flex gap-2">
                    {leave.status === 'pending' && (
                      <>
                        <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          موافقة
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                          <XCircle className="h-4 w-4 mr-1" />
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

      {/* Leave Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>رصيد الإجازات</CardTitle>
            <CardDescription>رصيد الإجازات المتبقي للموظفين</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaveTypes.map((type) => (
                <div key={type.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Badge className={type.color}>{type.name}</Badge>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">الرصيد السنوي</p>
                    <p className="font-semibold">{type.allowance} يوم</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إحصائيات الإجازات</CardTitle>
            <CardDescription>ملخص طلبات الإجازات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium">قيد المراجعة</span>
                </div>
                <span className="text-xl font-bold text-yellow-600">{stats.pending}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-medium">موافق عليها</span>
                </div>
                <span className="text-xl font-bold text-green-600">{stats.approved}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="font-medium">مرفوضة</span>
                </div>
                <span className="text-xl font-bold text-red-600">{stats.rejected}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


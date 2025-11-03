"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Wallet,
  Shield,
  Calendar,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  Eye,
  Download,
  Filter,
  Search,
  FileText,
  Users,
  Receipt,
  Target,
  Activity,
  Settings,
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft,
  Calculator,
  PieChart,
  BarChart3
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Mock data for retention accounts
const mockRetentions = [
  {
    id: "ret-001",
    projectId: "proj-001",
    projectName: "البرج السكني - الرياض",
    contractorName: "شركة البناء المتقدمة",
    contractValue: 25000000,
    totalRetention: 2500000, // 10%
    retentionPercentage: 10,
    currentBalance: 1850000,
    releasedAmount: 650000,
    status: "active",
    startDate: "2024-01-15",
    expectedReleaseDate: "2025-01-15",
    defectLiabilityPeriod: 12, // months
    retentionType: "percentage",
    payments: [
      {
        id: "ret-pay-001",
        date: "2024-01-15",
        type: "deduction",
        amount: 500000,
        description: "استقطاع ضماني - المستخلص الأول",
        paymentRef: "MST-2024-001"
      },
      {
        id: "ret-pay-002", 
        date: "2024-02-20",
        type: "deduction",
        amount: 750000,
        description: "استقطاع ضماني - المستخلص الثاني",
        paymentRef: "MST-2024-002"
      },
      {
        id: "ret-pay-003",
        date: "2024-03-25",
        type: "deduction",
        amount: 600000,
        description: "استقطاع ضماني - المستخلص الثالث",
        paymentRef: "MST-2024-003"
      }
    ],
    milestones: [
      { 
        name: "إنجاز الأعمال الأساسية", 
        percentage: 50, 
        releaseAmount: 650000, 
        status: "completed",
        releaseDate: "2024-06-15"
      },
      { 
        name: "اكتمال المشروع", 
        percentage: 50, 
        releaseAmount: 1200000, 
        status: "pending",
        expectedDate: "2024-12-31"
      }
    ]
  },
  {
    id: "ret-002",
    projectId: "proj-002", 
    projectName: "المجمع التجاري - جدة",
    contractorName: "مؤسسة التشييد الحديث",
    contractValue: 18000000,
    totalRetention: 1800000, // 10%
    retentionPercentage: 10,
    currentBalance: 1800000,
    releasedAmount: 0,
    status: "active",
    startDate: "2024-02-01",
    expectedReleaseDate: "2025-02-01",
    defectLiabilityPeriod: 12,
    retentionType: "percentage",
    payments: [
      {
        id: "ret-pay-004",
        date: "2024-02-01",
        type: "deduction",
        amount: 900000,
        description: "استقطاع ضماني - المستخلص الأول",
        paymentRef: "MST-2024-004"
      },
      {
        id: "ret-pay-005",
        date: "2024-03-15",
        type: "deduction", 
        amount: 900000,
        description: "استقطاع ضماني - المستخلص الثاني",
        paymentRef: "MST-2024-005"
      }
    ],
    milestones: [
      { 
        name: "إنجاز الأعمال الأساسية", 
        percentage: 50, 
        releaseAmount: 900000, 
        status: "pending",
        expectedDate: "2024-08-01"
      },
      { 
        name: "اكتمال المشروع", 
        percentage: 50, 
        releaseAmount: 900000, 
        status: "pending",
        expectedDate: "2025-02-01"
      }
    ]
  },
  {
    id: "ret-003",
    projectId: "proj-003",
    projectName: "مشروع الفلل السكنية - الدمام",
    contractorName: "مجموعة الإنشاء المتميز",
    contractValue: 12000000,
    totalRetention: 600000, // 5%
    retentionPercentage: 5,
    currentBalance: 0,
    releasedAmount: 600000,
    status: "completed",
    startDate: "2023-06-01",
    expectedReleaseDate: "2024-06-01",
    defectLiabilityPeriod: 12,
    retentionType: "percentage",
    actualReleaseDate: "2024-06-15",
    payments: [
      {
        id: "ret-pay-006",
        date: "2023-06-01",
        type: "deduction",
        amount: 300000,
        description: "استقطاع ضماني - المستخلص الأول", 
        paymentRef: "MST-2023-010"
      },
      {
        id: "ret-pay-007",
        date: "2023-09-15",
        type: "deduction",
        amount: 300000,
        description: "استقطاع ضماني - المستخلص الثاني",
        paymentRef: "MST-2023-015"
      },
      {
        id: "ret-pay-008",
        date: "2024-06-15",
        type: "release",
        amount: 600000,
        description: "إطلاق الضمان النهائي",
        paymentRef: "REL-2024-001"
      }
    ],
    milestones: [
      { 
        name: "إنجاز الأعمال الأساسية", 
        percentage: 50, 
        releaseAmount: 300000, 
        status: "completed",
        releaseDate: "2024-01-15"
      },
      { 
        name: "اكتمال المشروع", 
        percentage: 50, 
        releaseAmount: 300000, 
        status: "completed",
        releaseDate: "2024-06-15"
      }
    ]
  }
]

// Summary statistics
const retentionStats = {
  totalRetentions: 6750000,
  activeRetentions: 3650000,
  releasedThisYear: 1250000,
  pendingReleases: 2100000,
  averageRetentionPeriod: 12,
  activeContracts: 8
}

export default function RetentionPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newRetention, setNewRetention] = useState({
    projectName: "",
    contractorName: "",
    contractValue: "",
    retentionPercentage: "10",
    retentionType: "percentage",
    startDate: "",
    defectLiabilityPeriod: "12",
    description: ""
  })

  const filteredRetentions = mockRetentions.filter(retention => {
    const matchesSearch = retention.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         retention.contractorName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || retention.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      overdue: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800"
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Shield className="h-4 w-4" />
      case "completed": return <CheckCircle2 className="h-4 w-4" />
      case "overdue": return <AlertTriangle className="h-4 w-4" />
      case "pending": return <Clock className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  const getMilestoneStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800"
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const handleAddRetention = (e: any) => {
    e.preventDefault()
    
    // Validation
    if (!newRetention.projectName || !newRetention.contractorName || !newRetention.contractValue) {
      alert("يرجى تعبئة جميع الحقول المطلوبة")
      return
    }

    // Calculate retention values
    const contractValue = parseFloat(newRetention.contractValue)
    const percentage = parseFloat(newRetention.retentionPercentage)
    const totalRetention = (contractValue * percentage) / 100

    // Create new retention object
    const retention = {
      id: `ret-${Date.now()}`,
      projectId: `proj-${Date.now()}`,
      projectName: newRetention.projectName,
      contractorName: newRetention.contractorName,
      contractValue: contractValue,
      totalRetention: totalRetention,
      retentionPercentage: percentage,
      currentBalance: 0,
      releasedAmount: 0,
      status: "active",
      startDate: newRetention.startDate,
      expectedReleaseDate: new Date(new Date(newRetention.startDate).setMonth(
        new Date(newRetention.startDate).getMonth() + parseInt(newRetention.defectLiabilityPeriod)
      )).toISOString().split('T')[0],
      defectLiabilityPeriod: parseInt(newRetention.defectLiabilityPeriod),
      retentionType: newRetention.retentionType,
      payments: [],
      milestones: [
        { 
          name: "إنجاز الأعمال الأساسية", 
          percentage: 50, 
          releaseAmount: totalRetention / 2, 
          status: "pending",
          expectedDate: new Date(new Date(newRetention.startDate).setMonth(
            new Date(newRetention.startDate).getMonth() + 6
          )).toISOString().split('T')[0]
        },
        { 
          name: "اكتمال المشروع", 
          percentage: 50, 
          releaseAmount: totalRetention / 2, 
          status: "pending",
          expectedDate: new Date(new Date(newRetention.startDate).setMonth(
            new Date(newRetention.startDate).getMonth() + parseInt(newRetention.defectLiabilityPeriod)
          )).toISOString().split('T')[0]
        }
      ]
    }

    // Add to mock data (in real app, this would be an API call)
    ;(mockRetentions as any).unshift(retention)
    
    // Reset form and close modal
    setNewRetention({
      projectName: "",
      contractorName: "",
      contractValue: "",
      retentionPercentage: "10",
      retentionType: "percentage",
      startDate: "",
      defectLiabilityPeriod: "12",
      description: ""
    })
    setShowAddModal(false)
    
    alert("تم إضافة الضمان بنجاح!")
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 rounded-3xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 p-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Wallet className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">الاستقطاعات الضمانية</h1>
                <p className="text-teal-100 text-lg">إدارة ومتابعة الضمانات المالية للمشاريع</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowAddModal(true)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                إضافة ضمان
              </Button>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                إطلاق ضمان
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
                  <p className="text-white/80 text-sm">إجمالي الضمانات</p>
                  <p className="text-white text-lg font-bold">{formatCurrency(retentionStats.totalRetentions)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">ضمانات نشطة</p>
                  <p className="text-white text-lg font-bold">{formatCurrency(retentionStats.activeRetentions)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">تم الإطلاق</p>
                  <p className="text-white text-lg font-bold">{formatCurrency(retentionStats.releasedThisYear)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">معلقة الإطلاق</p>
                  <p className="text-white text-lg font-bold">{formatCurrency(retentionStats.pendingReleases)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">عقود نشطة</p>
                  <p className="text-white text-xl font-bold">{retentionStats.activeContracts}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 p-1 bg-gray-100 rounded-xl">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            الضمانات النشطة
          </TabsTrigger>
          <TabsTrigger value="releases" className="flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4" />
            الإطلاقات
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            التقارير
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-teal-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">الضمانات النشطة</p>
                    <p className="text-2xl font-bold text-teal-600">{formatCurrency(retentionStats.activeRetentions)}</p>
                    <p className="text-sm text-gray-500">{mockRetentions.filter(r => r.status === 'active').length} مشروع</p>
                  </div>
                  <Shield className="h-8 w-8 text-teal-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">تم الإطلاق هذا العام</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(retentionStats.releasedThisYear)}</p>
                    <p className="text-sm text-gray-500">من {mockRetentions.filter(r => r.status === 'completed').length} مشروع</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">معلق الإطلاق</p>
                    <p className="text-2xl font-bold text-yellow-600">{formatCurrency(retentionStats.pendingReleases)}</p>
                    <p className="text-sm text-gray-500">خلال 6 أشهر</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                النشاط الأخير
              </CardTitle>
              <CardDescription>آخر العمليات على الضمانات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRetentions
                  .flatMap(retention => retention.payments.map(payment => ({ ...payment, projectName: retention.projectName })))
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {payment.type === "deduction" ? 
                            <ArrowDownLeft className="h-4 w-4 text-red-600" /> :
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          }
                        </div>
                        <div>
                          <h4 className="font-medium">{payment.description}</h4>
                          <p className="text-sm text-gray-600">{payment.projectName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${payment.type === "deduction" ? "text-red-600" : "text-green-600"}`}>
                          {payment.type === "deduction" ? "-" : "+"}{formatCurrency(payment.amount)}
                        </p>
                        <p className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString('ar-SA')}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Releases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                الإطلاقات القادمة
              </CardTitle>
              <CardDescription>الضمانات المقرر إطلاقها خلال الأشهر القادمة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRetentions
                  .filter(retention => retention.status === 'active')
                  .flatMap(retention => 
                    retention.milestones
                      .filter(milestone => milestone.status === 'pending')
                      .map(milestone => ({ ...milestone, projectName: retention.projectName, contractorName: retention.contractorName }))
                  )
                  .sort((a, b) => new Date((a as any).expectedDate || '').getTime() - new Date((b as any).expectedDate || '').getTime())
                  .slice(0, 3)
                  .map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Target className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{milestone.name}</h4>
                          <p className="text-sm text-gray-600">{milestone.projectName}</p>
                          <p className="text-sm text-gray-500">{milestone.contractorName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-purple-600">{formatCurrency(milestone.releaseAmount)}</p>
                        <p className="text-sm text-gray-500">متوقع: {new Date((milestone as any).expectedDate || '').toLocaleDateString('ar-SA')}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Retentions Tab */}
        <TabsContent value="active" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="البحث في المشاريع أو المقاولين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="active">نشط</option>
                    <option value="completed">مكتمل</option>
                    <option value="pending">معلق</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    فلتر
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Retentions List */}
          <div className="grid gap-6">
            {filteredRetentions.map((retention) => (
              <Card key={retention.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-teal-100 rounded-lg">
                        <Building2 className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{retention.projectName}</CardTitle>
                        <CardDescription>{retention.contractorName}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(retention.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(retention.status)}
                        {retention.status === "active" ? "نشط" :
                         retention.status === "completed" ? "مكتمل" :
                         retention.status === "pending" ? "معلق" : "متأخر"}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Main retention info */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">قيمة العقد</p>
                      <p className="text-xl font-bold text-blue-600">{formatCurrency(retention.contractValue)}</p>
                    </div>
                    <div className="text-center p-4 bg-teal-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">إجمالي الضمان</p>
                      <p className="text-xl font-bold text-teal-600">{formatCurrency(retention.totalRetention)}</p>
                      <p className="text-xs text-gray-500">{retention.retentionPercentage}% من العقد</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">الرصيد الحالي</p>
                      <p className="text-xl font-bold text-yellow-600">{formatCurrency(retention.currentBalance)}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">تم الإطلاق</p>
                      <p className="text-xl font-bold text-green-600">{formatCurrency(retention.releasedAmount)}</p>
                    </div>
                  </div>

                  {/* Milestones Progress */}
                  <div className="mb-6">
                    <h5 className="font-medium mb-3">معالم الإطلاق</h5>
                    <div className="space-y-3">
                      {retention.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded">
                              <Target className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{milestone.name}</p>
                              <p className="text-sm text-gray-600">
                                {milestone.status === "completed" ? 
                                  `تم الإطلاق: ${new Date((milestone as any).releaseDate || '').toLocaleDateString('ar-SA')}` :
                                  `متوقع: ${new Date((milestone as any).expectedDate || '').toLocaleDateString('ar-SA')}`
                                }
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getMilestoneStatusColor(milestone.status)}>
                              {milestone.status === "completed" ? "مكتمل" : "معلق"}
                            </Badge>
                            <p className="text-sm font-medium mt-1">{formatCurrency(milestone.releaseAmount)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project timeline */}
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>بداية المشروع: {new Date(retention.startDate).toLocaleDateString('ar-SA')}</span>
                    <span>فترة الضمان: {retention.defectLiabilityPeriod} شهر</span>
                    <span>الإطلاق المتوقع: {new Date(retention.expectedReleaseDate).toLocaleDateString('ar-SA')}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>تقدم الإطلاق</span>
                      <span>{((retention.releasedAmount / retention.totalRetention) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(retention.releasedAmount / retention.totalRetention) * 100} className="h-2" />
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      تفاصيل
                    </Button>
                    <Button variant="outline" size="sm">
                      <Receipt className="h-4 w-4 mr-2" />
                      المدفوعات
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      إطلاق
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Releases Tab */}
        <TabsContent value="releases" className="space-y-6">
          {/* Release Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                  إطلاق ضمان جديد
                </CardTitle>
                <CardDescription>إطلاق جزئي أو كامل للضمان</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">المشروع</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>اختر المشروع...</option>
                    {mockRetentions
                      .filter(r => r.status === 'active')
                      .map(retention => (
                        <option key={retention.id} value={retention.id}>
                          {retention.projectName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">نوع الإطلاق</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>إطلاق جزئي</option>
                    <option>إطلاق نهائي</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">المبلغ</label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">السبب</label>
                  <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="سبب الإطلاق..."></textarea>
                </div>
                <Button className="w-full">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  معالجة الإطلاق
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                  معالجة مجمعة
                </CardTitle>
                <CardDescription>إطلاق متعدد للضمانات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {mockRetentions
                    .filter(r => r.status === 'active')
                    .slice(0, 3)
                    .map(retention => (
                      <div key={retention.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <div>
                            <p className="font-medium text-sm">{retention.projectName}</p>
                            <p className="text-xs text-gray-600">{formatCurrency(retention.currentBalance)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <Button className="w-full" variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  معالجة المحدد
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Releases */}
          <Card>
            <CardHeader>
              <CardTitle>الإطلاقات الأخيرة</CardTitle>
              <CardDescription>آخر عمليات إطلاق الضمانات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRetentions
                  .flatMap(retention => 
                    retention.payments
                      .filter(payment => payment.type === 'release')
                      .map(payment => ({ 
                        ...payment, 
                        projectName: retention.projectName, 
                        contractorName: retention.contractorName 
                      }))
                  )
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((release) => (
                    <div key={release.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{release.description}</h4>
                          <p className="text-sm text-gray-600">{release.projectName}</p>
                          <p className="text-sm text-gray-500">{release.contractorName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{formatCurrency(release.amount)}</p>
                        <p className="text-sm text-gray-500">{new Date(release.date).toLocaleDateString('ar-SA')}</p>
                        <Badge className="bg-green-100 text-green-800 text-xs">مكتمل</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Retention Summary Report */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  تقرير ملخص الضمانات
                </CardTitle>
                <CardDescription>نظرة عامة على جميع الضمانات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">الضمانات النشطة</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                      <span className="text-sm font-medium">{formatCurrency(retentionStats.activeRetentions)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">تم الإطلاق</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                      <span className="text-sm font-medium">{formatCurrency(retentionStats.releasedThisYear)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">معلق الإطلاق</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                      <span className="text-sm font-medium">{formatCurrency(retentionStats.pendingReleases)}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  تحميل التقرير
                </Button>
              </CardContent>
            </Card>

            {/* Aging Report */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  تقرير أعمار الضمانات
                </CardTitle>
                <CardDescription>تحليل فترات الضمانات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">أقل من 6 أشهر</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">3 مشاريع</Badge>
                      <span className="text-sm font-medium">{formatCurrency(1800000)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">6-12 شهر</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-100 text-yellow-800">2 مشاريع</Badge>
                      <span className="text-sm font-medium">{formatCurrency(1850000)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">أكثر من سنة</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800">0 مشاريع</Badge>
                      <span className="text-sm font-medium">{formatCurrency(0)}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Reports */}
          <Card>
            <CardHeader>
              <CardTitle>تقارير سريعة</CardTitle>
              <CardDescription>تقارير جاهزة للضمانات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <PieChart className="h-6 w-6 mb-2" />
                  <span className="text-sm">حسب المقاول</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-sm">حسب التاريخ</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Building2 className="h-6 w-6 mb-2" />
                  <span className="text-sm">حسب المشروع</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <DollarSign className="h-6 w-6 mb-2" />
                  <span className="text-sm">حسب القيمة</span>
                </Button>
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
            <Link href="/dashboard/projects">
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                المشاريع
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Add Retention Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">إضافة ضمان جديد</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  ✕
                </Button>
              </div>

              <form onSubmit={handleAddRetention} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">اسم المشروع *</label>
                    <Input
                      value={newRetention.projectName}
                      onChange={(e) => setNewRetention({...newRetention, projectName: e.target.value})}
                      placeholder="أدخل اسم المشروع"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">اسم المقاول *</label>
                    <Input
                      value={newRetention.contractorName}
                      onChange={(e) => setNewRetention({...newRetention, contractorName: e.target.value})}
                      placeholder="أدخل اسم المقاول"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">قيمة العقد *</label>
                    <Input
                      type="number"
                      value={newRetention.contractValue}
                      onChange={(e) => setNewRetention({...newRetention, contractValue: e.target.value})}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">نسبة الضمان (%)</label>
                    <select
                      value={newRetention.retentionPercentage}
                      onChange={(e) => setNewRetention({...newRetention, retentionPercentage: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="20">20%</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تاريخ البداية *</label>
                    <Input
                      type="date"
                      value={newRetention.startDate}
                      onChange={(e) => setNewRetention({...newRetention, startDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">فترة المسؤولية (شهور)</label>
                    <select
                      value={newRetention.defectLiabilityPeriod}
                      onChange={(e) => setNewRetention({...newRetention, defectLiabilityPeriod: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="6">6 أشهر</option>
                      <option value="12">12 شهر</option>
                      <option value="18">18 شهر</option>
                      <option value="24">24 شهر</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">نوع الضمان</label>
                  <select
                    value={newRetention.retentionType}
                    onChange={(e) => setNewRetention({...newRetention, retentionType: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="percentage">نسبة مئوية</option>
                    <option value="fixed">مبلغ ثابت</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">وصف الضمان</label>
                  <textarea
                    value={newRetention.description}
                    onChange={(e) => setNewRetention({...newRetention, description: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="وصف تفصيلي للضمان..."
                  />
                </div>

                {/* Summary */}
                {newRetention.contractValue && newRetention.retentionPercentage && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">ملخص الضمان</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">قيمة العقد: </span>
                        <span className="font-medium">{formatCurrency(parseFloat(newRetention.contractValue) || 0)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">مبلغ الضمان: </span>
                        <span className="font-medium text-teal-600">
                          {formatCurrency(((parseFloat(newRetention.contractValue) || 0) * (parseFloat(newRetention.retentionPercentage) || 0)) / 100)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة الضمان
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
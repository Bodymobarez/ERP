"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus, 
  Users, 
  TrendingUp, 
  Target, 
  DollarSign,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building2,
  User,
  Star,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency, formatNumber } from "@/lib/utils"
import Link from "next/link"

// Mock data for construction CRM
const mockClients = [
  {
    id: "1",
    name: "شركة الرياض للإنشاءات",
    type: "مطور عقاري",
    contactPerson: "أحمد محمد العلي",
    email: "ahmed@riyadh-construction.com",
    phone: "+966501234567",
    address: "الرياض، المملكة العربية السعودية",
    status: "active",
    priority: "high",
    totalProjects: 12,
    totalValue: 45000000,
    lastContact: "2024-01-15",
    nextFollowUp: "2024-01-25",
    rating: 5,
    notes: "عميل مميز - مشاريع كبيرة",
    projects: [
      { name: "مجمع سكني - الرياض", value: 15000000, status: "completed" },
      { name: "برج تجاري - جدة", value: 20000000, status: "in-progress" },
      { name: "مشروع سكني - الدمام", value: 10000000, status: "planning" }
    ]
  },
  {
    id: "2",
    name: "مؤسسة الخليج للمقاولات",
    type: "مقاول عام",
    contactPerson: "سارة خالد",
    email: "sara@khaleej-contracting.com",
    phone: "+966502345678",
    address: "جدة، المملكة العربية السعودية",
    status: "active",
    priority: "medium",
    totalProjects: 8,
    totalValue: 28000000,
    lastContact: "2024-01-12",
    nextFollowUp: "2024-01-22",
    rating: 4,
    notes: "عميل جيد - دفع منتظم",
    projects: [
      { name: "مستشفى خاص", value: 12000000, status: "completed" },
      { name: "مدرسة حكومية", value: 8000000, status: "in-progress" },
      { name: "مركز تجاري", value: 8000000, status: "planning" }
    ]
  },
  {
    id: "3",
    name: "شركة الشرق الأوسط للاستثمار",
    type: "مستثمر",
    contactPerson: "محمد فهد",
    email: "mohammed@me-investment.com",
    phone: "+966503456789",
    address: "الدمام، المملكة العربية السعودية",
    status: "prospect",
    priority: "high",
    totalProjects: 3,
    totalValue: 15000000,
    lastContact: "2024-01-10",
    nextFollowUp: "2024-01-20",
    rating: 3,
    notes: "عميل محتمل - مشاريع واعدة",
    projects: [
      { name: "مجمع سكني فاخر", value: 15000000, status: "planning" }
    ]
  }
]

const mockOpportunities = [
  {
    id: "1",
    title: "مشروع مجمع سكني - الرياض",
    client: "شركة الرياض للإنشاءات",
    value: 25000000,
    probability: 80,
    expectedClose: "2024-03-15",
    stage: "proposal",
    source: "referral",
    description: "مجمع سكني فاخر يتكون من 200 وحدة سكنية",
    nextAction: "عرض نهائي",
    assignedTo: "أحمد محمد",
    createdAt: "2024-01-01"
  },
  {
    id: "2",
    title: "مشروع مستشفى خاص - جدة",
    client: "مؤسسة الخليج للمقاولات",
    value: 18000000,
    probability: 60,
    expectedClose: "2024-04-20",
    stage: "negotiation",
    source: "website",
    description: "مستشفى خاص متخصص في الجراحة",
    nextAction: "متابعة العرض",
    assignedTo: "سارة خالد",
    createdAt: "2024-01-05"
  },
  {
    id: "3",
    title: "مشروع مركز تجاري - الدمام",
    client: "شركة الشرق الأوسط للاستثمار",
    value: 12000000,
    probability: 40,
    expectedClose: "2024-05-10",
    stage: "qualification",
    source: "cold-call",
    description: "مركز تجاري كبير في وسط المدينة",
    nextAction: "زيارة الموقع",
    assignedTo: "محمد فهد",
    createdAt: "2024-01-08"
  }
]

const mockActivities = [
  {
    id: "1",
    type: "call",
    title: "مكالمة مع العميل",
    client: "شركة الرياض للإنشاءات",
    date: "2024-01-15",
    time: "10:30",
    duration: "30 دقيقة",
    outcome: "موافق على العرض",
    nextAction: "إرسال العقد",
    assignedTo: "أحمد محمد"
  },
  {
    id: "2",
    type: "meeting",
    title: "اجتماع مع العميل",
    client: "مؤسسة الخليج للمقاولات",
    date: "2024-01-12",
    time: "14:00",
    duration: "60 دقيقة",
    outcome: "مناقشة التفاصيل",
    nextAction: "إرسال العرض المحدث",
    assignedTo: "سارة خالد"
  },
  {
    id: "3",
    type: "email",
    title: "إرسال عرض سعر",
    client: "شركة الشرق الأوسط للاستثمار",
    date: "2024-01-10",
    time: "09:15",
    duration: "15 دقيقة",
    outcome: "تم الإرسال",
    nextAction: "متابعة الرد",
    assignedTo: "محمد فهد"
  }
]

export default function CRMPage() {
  const { t, lang } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("clients")
  const [selectedStatus, setSelectedStatus] = useState("all")
  
  const stats = {
    totalClients: mockClients.length,
    activeClients: mockClients.filter(c => c.status === 'active').length,
    prospects: mockClients.filter(c => c.status === 'prospect').length,
    totalValue: mockClients.reduce((sum, c) => sum + c.totalValue, 0),
    opportunities: mockOpportunities.length,
    pipelineValue: mockOpportunities.reduce((sum, o) => sum + o.value, 0),
    activities: mockActivities.length,
    thisMonth: mockActivities.filter(a => a.date.startsWith('2024-01')).length
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "prospect": return "bg-yellow-100 text-yellow-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "نشط"
      case "prospect": return "محتمل"
      case "inactive": return "غير نشط"
      default: return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return "عالي"
      case "medium": return "متوسط"
      case "low": return "منخفض"
      default: return priority
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "qualification": return "bg-blue-100 text-blue-800"
      case "proposal": return "bg-purple-100 text-purple-800"
      case "negotiation": return "bg-orange-100 text-orange-800"
      case "closed-won": return "bg-green-100 text-green-800"
      case "closed-lost": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case "qualification": return "التأهيل"
      case "proposal": return "العرض"
      case "negotiation": return "المفاوضة"
      case "closed-won": return "مكتمل"
      case "closed-lost": return "مرفوض"
      default: return stage
    }
  }

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredOpportunities = mockOpportunities.filter(opportunity =>
    opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.client.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">إدارة علاقات العملاء</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">إدارة العملاء والفرص البيعية في مجال المقاولات</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/dashboard/crm/opportunities/new">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Target className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">فرصة جديدة</span>
              <span className="sm:hidden">فرصة</span>
            </Button>
          </Link>
          <Link href="/dashboard/crm/clients/new">
            <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">عميل جديد</span>
              <span className="sm:hidden">عميل</span>
        </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي العملاء</p>
                <p className="text-2xl font-bold mt-1">{stats.totalClients}</p>
                <p className="text-xs text-green-600 mt-1">+12% من الشهر الماضي</p>
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
                <p className="text-sm text-gray-600">العملاء النشطين</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.activeClients}</p>
                <p className="text-xs text-gray-500 mt-1">من إجمالي العملاء</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الفرص البيعية</p>
                <p className="text-2xl font-bold mt-1 text-purple-600">{stats.opportunities}</p>
                <p className="text-xs text-gray-500 mt-1">قيمة {formatNumber(stats.pipelineValue)} ريال</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <Target className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي القيمة</p>
                <p className="text-2xl font-bold mt-1 text-orange-600">{formatNumber(stats.totalValue)} ريال</p>
                <p className="text-xs text-gray-500 mt-1">من جميع المشاريع</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-2 sm:gap-4">
          <button
            onClick={() => setSelectedTab("clients")}
            className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              selectedTab === "clients"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">العملاء</span>
            <span className="sm:hidden">عملاء</span>
          </button>
          <button
            onClick={() => setSelectedTab("opportunities")}
            className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              selectedTab === "opportunities"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">الفرص البيعية</span>
            <span className="sm:hidden">فرص</span>
          </button>
          <button
            onClick={() => setSelectedTab("activities")}
            className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              selectedTab === "activities"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">الأنشطة</span>
            <span className="sm:hidden">أنشطة</span>
          </button>
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في العملاء والفرص..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="prospect">محتمل</option>
            <option value="inactive">غير نشط</option>
          </select>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">فلترة</span>
            <span className="sm:hidden">فلتر</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">تصدير</span>
            <span className="sm:hidden">تصدير</span>
          </Button>
        </div>
      </div>

      {/* Content based on selected tab */}
      {selectedTab === "clients" && (
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {client.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="font-bold text-xl">{client.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getStatusColor(client.status)}>
                            {getStatusLabel(client.status)}
                          </Badge>
                          <Badge className={getPriorityColor(client.priority)}>
                            {getPriorityLabel(client.priority)}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < client.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{client.type}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {client.contactPerson}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {client.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {client.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {client.address}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">إجمالي المشاريع</p>
                      <p className="text-2xl font-bold text-blue-600">{client.totalProjects}</p>
                      <p className="text-sm text-gray-600">قيمة {formatNumber(client.totalValue)} ريال</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Client Projects */}
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-2">المشاريع</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {client.projects.map((project, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm">{project.name}</p>
                        <p className="text-xs text-gray-600">{formatNumber(project.value)} ريال</p>
                        <Badge className="text-xs mt-1">
                          {project.status === 'completed' ? 'مكتمل' : 
                           project.status === 'in-progress' ? 'قيد التنفيذ' : 'مخطط'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "opportunities" && (
        <div className="space-y-4">
          {filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="font-bold text-xl">{opportunity.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getStageColor(opportunity.stage)}>
                          {getStageLabel(opportunity.stage)}
                        </Badge>
                        <Badge variant="outline">
                          {opportunity.probability}% احتمال
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{opportunity.client}</p>
                    <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        تاريخ الإغلاق المتوقع: {opportunity.expectedClose}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        مسؤول: {opportunity.assignedTo}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        المصدر: {opportunity.source}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">قيمة الفرصة</p>
                      <p className="text-2xl font-bold text-green-600">{formatNumber(opportunity.value)} ريال</p>
                      <p className="text-sm text-gray-600">الخطوة التالية: {opportunity.nextAction}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "activities" && (
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    activity.type === 'call' ? 'bg-blue-100' :
                    activity.type === 'meeting' ? 'bg-green-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'call' ? <Phone className="h-5 w-5 text-blue-600" /> :
                     activity.type === 'meeting' ? <Calendar className="h-5 w-5 text-green-600" /> :
                     <Mail className="h-5 w-5 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="font-bold text-lg">{activity.title}</h3>
                      <Badge variant="outline">
                        {activity.client}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{activity.outcome}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {activity.date} - {activity.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {activity.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {activity.assignedTo}
                      </span>
                    </div>
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">الخطوة التالية:</p>
                      <p className="text-sm text-gray-600">{activity.nextAction}</p>
                    </div>
                  </div>
          </div>
        </CardContent>
      </Card>
          ))}
        </div>
      )}
    </div>
  )
}


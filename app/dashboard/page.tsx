"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, DollarSign, Calculator, Users, Package, FolderKanban, TrendingUp, TrendingDown, CheckCircle2, XCircle, Clock, AlertTriangle, ShoppingCart, FileText, UserCircle, Wrench, FolderOpen, BarChart3, Settings, LayoutDashboard, Building2, MapPin, HardHat, Truck, Ruler, Target } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ar, enUS } from "date-fns/locale"

// Mock data for charts
const revenueData = [
  { month: "يناير", revenue: 4000, expenses: 2400 },
  { month: "فبراير", revenue: 3000, expenses: 1398 },
  { month: "مارس", revenue: 2000, expenses: 9800 },
  { month: "أبريل", revenue: 2780, expenses: 3908 },
  { month: "مايو", revenue: 1890, expenses: 4800 },
  { month: "يونيو", revenue: 2390, expenses: 3800 },
];

const projectData = [
  { name: "مكتمل", value: 35, color: "#10B981" },
  { name: "جاري العمل", value: 45, color: "#F59E0B" },
  { name: "معلق", value: 20, color: "#EF4444" },
];

const employeeData = [
  { name: "إدارة", value: 15, color: "#8B5CF6" },
  { name: "تطوير", value: 35, color: "#06B6D4" },
  { name: "مبيعات", value: 25, color: "#10B981" },
  { name: "دعم", value: 25, color: "#F59E0B" },
];

function StatCard({ title, value, change, icon: Icon, trend, color }: {
  title: string
  value: string
  change: string
  icon: any
  trend: "up" | "down"
  color: string
}) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600"
  const bgColor = trend === "up" ? "bg-green-50" : "bg-red-50"

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <div className={`flex items-center mt-1 ${bgColor} px-2 py-1 rounded-full w-fit`}>
              <TrendIcon className={`h-3 w-3 mr-1 ${trendColor}`} />
              <span className={`text-xs font-medium ${trendColor}`}>{change}</span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { t, lang } = useLanguage()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/analytics/dashboard');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const moduleCards = [
    {
      icon: Building2,
      title: "المشاريع الإنشائية",
      description: "إدارة مشاريع البناء والتشييد",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      href: "/dashboard/projects"
    },
    {
      icon: MapPin,
      title: "مواقع العمل",
      description: "إدارة ومراقبة مواقع البناء",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      href: "/dashboard/projects/sites"
    },
    {
      icon: Ruler,
      title: "حصر الكميات",
      description: "BOQ وجداول الكميات",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      href: "/dashboard/projects/bom"
    },
    {
      icon: Truck,
      title: "المعدات الثقيلة",
      description: "إدارة الآليات والمعدات",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      href: "/dashboard/equipment"
    },
    {
      icon: HardHat,
      title: "الأيدي العاملة",
      description: "إدارة العمال والموظفين",
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      href: "/dashboard/hr"
    },
    {
      icon: DollarSign,
      title: "المالية",
      description: "الفواتير والمدفوعات",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      href: "/dashboard/finance"
    },
    {
      icon: Calculator,
      title: "المحاسبة",
      description: "القيود والحسابات",
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
      href: "/dashboard/accounting"
    },
    {
      icon: ShoppingCart,
      title: "المشتريات",
      description: "طلبات الشراء والموردين",
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
      href: "/dashboard/procurement"
    },
    {
      icon: Package,
      title: "المواد والمخزون",
      description: "إدارة مواد البناء",
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      href: "/dashboard/inventory"
    },
    {
      icon: FileText,
      title: "العقود",
      description: "عقود المقاولات والتعهدات",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      href: "/dashboard/contracts"
    },
    {
      icon: UserCircle,
      title: "العملاء",
      description: "إدارة علاقات العملاء",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      href: "/dashboard/crm"
    },
    {
      icon: FolderOpen,
      title: "المستندات",
      description: "الرسومات والمخططات",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      href: "/dashboard/documents"
    },
    {
      icon: BarChart3,
      title: "التقارير",
      description: "تقارير الأداء والإنجاز",
      color: "bg-gradient-to-br from-violet-500 to-violet-600",
      href: "/dashboard/analytics"
    },
    {
      icon: Target,
      title: "المعالم الرئيسية",
      description: "تتبع معالم المشاريع",
      color: "bg-gradient-to-br from-rose-500 to-rose-600",
      href: "/dashboard/projects/milestones"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <XCircle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">خطأ في تحميل البيانات</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Hero Section - Construction Style */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-6 sm:p-8 text-white shadow-2xl">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                      <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                        <Building2 className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">نظام إدارة المقاولات</h1>
                        <p className="text-blue-100 text-sm sm:text-base lg:text-lg">لوحة التحكم الرئيسية - إدارة شاملة لمشاريع البناء والتشييد</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Link href="/dashboard/projects/new">
                      <Button className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg text-sm w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">مشروع جديد</span>
                        <span className="sm:hidden">مشروع</span>
                      </Button>
                    </Link>
                    <Link href="/dashboard/projects/sites/new">
                      <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm text-sm w-full sm:w-auto">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">موقع جديد</span>
                        <span className="sm:hidden">موقع</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

      {/* Stats Cards - Construction Focused */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قيمة العقود الجارية</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(stats?.totalRevenue || 0)}</p>
                <div className="flex items-center mt-2 bg-green-50 px-3 py-1 rounded-full w-fit">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-xs font-medium text-green-600">+12.5% من الشهر الماضي</span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المشاريع تحت التنفيذ</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.activeProjects || 0}</p>
                <div className="flex items-center mt-2 bg-blue-50 px-3 py-1 rounded-full w-fit">
                  <HardHat className="h-3 w-3 mr-1 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">مواقع نشطة</span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الأيدي العاملة</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalEmployees || 0}</p>
                <div className="flex items-center mt-2 bg-orange-50 px-3 py-1 rounded-full w-fit">
                  <TrendingUp className="h-3 w-3 mr-1 text-orange-600" />
                  <span className="text-xs font-medium text-orange-600">+5.1% هذا الشهر</span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المعدات والآليات</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.inventoryItems || 0}</p>
                <div className="flex items-center mt-2 bg-purple-50 px-3 py-1 rounded-full w-fit">
                  <Truck className="h-3 w-3 mr-1 text-purple-600" />
                  <span className="text-xs font-medium text-purple-600">معدة ثقيلة</span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <Wrench className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Construction Modules - Enhanced Design */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">الوحدات الرئيسية</h2>
          <p className="text-sm text-gray-600">أدوات شاملة لإدارة مشاريع المقاولات</p>
        </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4">
          {moduleCards.map((module, index) => {
            const Icon = module.icon
            return (
              <Link key={index} href={module.href}>
                <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-blue-200">
                  <CardContent className="p-3 sm:p-5 text-center">
                    <div className={`${module.color} w-10 h-10 sm:w-14 sm:h-14 rounded-xl mx-auto mb-2 sm:mb-3 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <h3 className="font-bold text-xs sm:text-xs text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{module.title}</h3>
                    <p className="text-[9px] sm:text-[10px] text-gray-600 leading-tight">{module.description}</p>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">تطور الإيرادات</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Status Chart */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">حالة المشاريع</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">النشاط الأخير</h3>
          <div className="space-y-4">
            {stats?.recentProjects?.slice(0, 5).map((project: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FolderKanban className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{project.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(project.createdAt), { 
                        addSuffix: true, 
                        locale: lang === 'ar' ? ar : enUS 
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{project.progress}%</p>
                  <p className="text-xs text-gray-500">{project.status}</p>
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-gray-500">
                <FolderKanban className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>لا توجد مشاريع حديثة</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
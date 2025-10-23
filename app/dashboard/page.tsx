"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, DollarSign, Calculator, Users, Package, FolderKanban, TrendingUp, TrendingDown, CheckCircle2, XCircle, Clock, AlertTriangle, ShoppingCart, FileText, UserCircle, Wrench, FolderOpen, BarChart3, Settings, LayoutDashboard } from "lucide-react"
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
      icon: LayoutDashboard,
      title: "لوحة التحكم",
      description: "نظرة عامة على النظام",
      color: "bg-blue-500",
      href: "/dashboard"
    },
    {
      icon: FolderKanban,
      title: "إدارة المشاريع",
      description: "تتبع وإدارة المشاريع",
      color: "bg-purple-500",
      href: "/dashboard/projects"
    },
    {
      icon: DollarSign,
      title: "المالية",
      description: "إدارة الفواتير والمدفوعات",
      color: "bg-green-500",
      href: "/dashboard/finance"
    },
    {
      icon: Calculator,
      title: "المحاسبة",
      description: "إدارة الحسابات والقيود",
      color: "bg-emerald-500",
      href: "/dashboard/accounting"
    },
    {
      icon: Users,
      title: "الموارد البشرية",
      description: "إدارة الموظفين والرواتب",
      color: "bg-orange-500",
      href: "/dashboard/hr"
    },
    {
      icon: ShoppingCart,
      title: "المشتريات",
      description: "إدارة طلبات الشراء",
      color: "bg-pink-500",
      href: "/dashboard/procurement"
    },
    {
      icon: Package,
      title: "المخزون",
      description: "إدارة المخزون والأصناف",
      color: "bg-yellow-500",
      href: "/dashboard/inventory"
    },
    {
      icon: FileText,
      title: "العقود",
      description: "إدارة العقود والاتفاقيات",
      color: "bg-indigo-500",
      href: "/dashboard/contracts"
    },
    {
      icon: UserCircle,
      title: "إدارة العملاء",
      description: "CRM وإدارة العلاقات",
      color: "bg-red-500",
      href: "/dashboard/crm"
    },
    {
      icon: Wrench,
      title: "المعدات",
      description: "إدارة المعدات والأصول",
      color: "bg-teal-500",
      href: "/dashboard/equipment"
    },
    {
      icon: FolderOpen,
      title: "المستندات",
      description: "إدارة الملفات والمستندات",
      color: "bg-cyan-500",
      href: "/dashboard/documents"
    },
    {
      icon: BarChart3,
      title: "التحليلات",
      description: "التقارير والإحصائيات",
      color: "bg-violet-500",
      href: "/dashboard/analytics"
    },
    {
      icon: Settings,
      title: "الإعدادات",
      description: "إعدادات النظام العامة",
      color: "bg-gray-500",
      href: "/dashboard/settings"
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.dashboardTitle}</h1>
          <p className="text-gray-600 mt-1">{t.dashboardOverview}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي الإيرادات"
          value={formatCurrency(stats?.totalRevenue || 0)}
          change="+12.5%"
          icon={DollarSign}
          trend="up"
          color="bg-green-500"
        />
        <StatCard
          title="المشاريع النشطة"
          value={stats?.activeProjects || 0}
          change="+8.2%"
          icon={FolderKanban}
          trend="up"
          color="bg-blue-500"
        />
        <StatCard
          title="الموظفين"
          value={stats?.totalEmployees || 0}
          change="+5.1%"
          icon={Users}
          trend="up"
          color="bg-purple-500"
        />
        <StatCard
          title="العناصر في المخزون"
          value={stats?.inventoryItems || 0}
          change="-2.3%"
          icon={Package}
          trend="down"
          color="bg-orange-500"
        />
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {moduleCards.map((module, index) => {
          const Icon = module.icon
          return (
            <Link key={index} href={module.href}>
              <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className={`${module.color} w-16 h-16 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{module.title}</h3>
                  <p className="text-xs text-gray-600">{module.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
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
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  FolderKanban, 
  Package,
  AlertCircle,
  CheckCircle2
} from "lucide-react"

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/analytics/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your ERP system overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value={stats?.projects?.byStatus?.find((s: any) => s.status === 'active')?._count || 0}
          icon={<FolderKanban className="h-5 w-5" />}
          trend="+12%"
          trendUp={true}
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={`$${(stats?.finance?.received || 0).toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5" />}
          trend="+8.2%"
          trendUp={true}
          color="green"
        />
        <StatCard
          title="Active Employees"
          value={stats?.hr?.activeEmployees || 0}
          icon={<Users className="h-5 w-5" />}
          trend="+3"
          trendUp={true}
          color="purple"
        />
        <StatCard
          title="Low Stock Items"
          value={stats?.inventory?.lowStockItems || 0}
          icon={<Package className="h-5 w-5" />}
          trend={stats?.inventory?.lowStockItems > 0 ? "Action needed" : "All good"}
          trendUp={false}
          color="red"
        />
      </div>

      {/* Recent Activity Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Projects */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Latest project updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.projects?.recent?.slice(0, 5).map((project: any) => (
                <div key={project.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{project.name}</p>
                    <p className="text-xs text-gray-500">{project.status}</p>
                  </div>
                  <div className="ml-2">
                    <div className="text-sm font-medium">{project.progress}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Latest financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.finance?.recent?.map((invoice: any) => (
                <div key={invoice.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{invoice.number}</p>
                    <p className="text-xs text-gray-500">{invoice.status}</p>
                  </div>
                  <div className="ml-2 text-right">
                    <div className="text-sm font-medium">${invoice.total.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(invoice.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Latest task updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentTasks?.map((task: any) => (
                <div key={task.id} className="flex items-center gap-3">
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className={`h-4 w-4 flex-shrink-0 ${
                      task.priority === 'high' ? 'text-red-500' : 'text-yellow-500'
                    }`} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    <p className="text-xs text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Project Status Overview</CardTitle>
          <CardDescription>Distribution of projects by status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats?.projects?.byStatus?.map((item: any) => (
              <div key={item.status} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{item._count}</div>
                <div className="text-sm text-gray-600 capitalize mt-1">{item.status}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend: string
  trendUp: boolean
  color: "blue" | "green" | "purple" | "red"
}

function StatCard({ title, value, icon, trend, trendUp, color }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          </div>
          <div className={`${colorClasses[color]} text-white p-3 rounded-lg`}>
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp className={`h-4 w-4 mr-1 ${trendUp ? 'text-green-600' : 'text-red-600'}`} />
          <span className={trendUp ? 'text-green-600' : 'text-red-600'}>{trend}</span>
          <span className="text-gray-600 ml-2">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}


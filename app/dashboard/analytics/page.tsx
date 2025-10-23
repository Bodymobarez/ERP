"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, DollarSign, Users, Package, FileText } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function AnalyticsPage() {
  const { t, lang } = useLanguage()
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t.analyticsTitle}</h1>
        <p className="text-gray-600 mt-1">{t.analyticsDesc}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.financialOverview}</CardTitle>
            <CardDescription>{t.revenueExpenses}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.totalRevenue}</span>
                <span className="text-lg font-bold text-green-600">$2,450,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.totalExpenses}</span>
                <span className="text-lg font-bold text-red-600">$1,280,000</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium">{t.netProfit}</span>
                <span className="text-lg font-bold text-blue-600">$1,170,000</span>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+15.3% {t.fromLastQuarter}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.projectPerformance}</CardTitle>
            <CardDescription>{t.completionMetrics}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.activeProjects}</span>
                <span className="text-lg font-bold">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.completedProjects}</span>
                <span className="text-lg font-bold text-green-600">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.onTimeRate}</span>
                <span className="text-lg font-bold text-blue-600">87%</span>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+5% {t.improvement}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.hrMetrics}</CardTitle>
            <CardDescription>{t.employeeStats}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.totalEmployees}</span>
                <span className="text-lg font-bold">342</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.attendanceRate}</span>
                <span className="text-lg font-bold text-green-600">94.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.turnoverRate}</span>
                <span className="text-lg font-bold text-orange-600">8.2%</span>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>{t.improvedRetention}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{lang === 'ar' ? 'اتجاه الإيرادات الشهرية' : 'Monthly Revenue Trend'}</CardTitle>
            <CardDescription>{lang === 'ar' ? 'أداء الإيرادات خلال الـ 12 شهراً الماضية' : 'Revenue performance over the last 12 months'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">
                  {lang === 'ar' ? 'سيظهر الرسم البياني هنا' : 'Chart visualization would appear here'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.projectStatusOverview}</CardTitle>
            <CardDescription>{t.distributionByStatus}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">
                  {lang === 'ar' ? 'سيظهر الرسم البياني هنا' : 'Chart visualization would appear here'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>{t.kpis}</CardTitle>
          <CardDescription>{t.systemMetrics}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">$2.4M</div>
              <div className="text-sm text-blue-700">{t.totalRevenue}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">1,234</div>
              <div className="text-sm text-green-700">{t.invoices}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">342</div>
              <div className="text-sm text-purple-700">{t.employees}</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Package className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">5,678</div>
              <div className="text-sm text-orange-700">{t.items}</div>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-900">+15%</div>
              <div className="text-sm text-pink-700">{t.growth}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


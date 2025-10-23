"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, TrendingUp, Target, DollarSign } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function CRMPage() {
  const { t } = useLanguage()
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.crmTitle}</h1>
          <p className="text-gray-600 mt-1">{t.crmDesc}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t.newLead}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalClients}</p>
                <p className="text-2xl font-bold mt-2">156</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.activeLeads}</p>
                <p className="text-2xl font-bold mt-2">42</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <Target className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.opportunities}</p>
                <p className="text-2xl font-bold mt-2">28</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.pipelineValue}</p>
                <p className="text-2xl font-bold mt-2">$890K</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{lang === 'ar' ? 'الفرص الأخيرة' : 'Recent Opportunities'}</CardTitle>
          <CardDescription>{lang === 'ar' ? 'آخر الفرص البيعية' : 'Latest sales opportunities'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-600">
            {lang === 'ar' ? 'لا توجد فرص بعد. أنشئ فرصتك الأولى للبدء.' : 'No opportunities yet. Create your first opportunity to get started.'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, CheckCircle2, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function ContractsPage() {
  const { t } = useLanguage()
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.contractsTitle}</h1>
          <p className="text-gray-600 mt-1">{t.contractsDesc}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t.newContract}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.activeContracts}</p>
                <p className="text-2xl font-bold mt-2">28</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.expiringSoon}</p>
                <p className="text-2xl font-bold mt-2">5</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.contractValue}</p>
                <p className="text-2xl font-bold mt-2">$5.2M</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{lang === 'ar' ? 'العقود الأخيرة' : 'Recent Contracts'}</CardTitle>
          <CardDescription>{lang === 'ar' ? 'آخر نشاطات العقود' : 'Latest contract activity'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-600">
            {lang === 'ar' ? 'لا توجد عقود بعد. أنشئ عقدك الأول للبدء.' : 'No contracts yet. Create your first contract to get started.'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


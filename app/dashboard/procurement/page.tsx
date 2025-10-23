"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ShoppingCart, FileText, Package } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function ProcurementPage() {
  const { t, lang } = useLanguage()
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.procurementTitle}</h1>
          <p className="text-gray-600 mt-1">{t.procurementDesc}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t.newPurchaseRequest}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.purchaseRequests}</p>
                <p className="text-2xl font-bold mt-2">45</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.purchaseOrders}</p>
                <p className="text-2xl font-bold mt-2">32</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <ShoppingCart className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.activeSuppliers}</p>
                <p className="text-2xl font-bold mt-2">18</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <Package className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{lang === 'ar' ? 'طلبات الشراء الأخيرة' : 'Recent Purchase Requests'}</CardTitle>
          <CardDescription>{lang === 'ar' ? 'آخر نشاطات المشتريات' : 'Latest procurement activity'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-600">
            {lang === 'ar' ? 'لا توجد طلبات شراء بعد. أنشئ طلبك الأول للبدء.' : 'No purchase requests yet. Create your first request to get started.'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Folder, Upload, Download } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function DocumentsPage() {
  const { t, lang } = useLanguage()
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.documentsTitle}</h1>
          <p className="text-gray-600 mt-1">{t.documentsDesc}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            {t.upload}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t.newDocument}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalDocuments}</p>
                <p className="text-2xl font-bold mt-2">342</p>
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
                <p className="text-sm text-gray-600">{t.folders}</p>
                <p className="text-2xl font-bold mt-2">24</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <Folder className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.pendingApproval}</p>
                <p className="text-2xl font-bold mt-2">12</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.storageUsed}</p>
                <p className="text-2xl font-bold mt-2">24GB</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <Download className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.recentDocuments}</CardTitle>
          <CardDescription>{lang === 'ar' ? 'المستندات المرفوعة أو المعدلة مؤخراً' : 'Recently uploaded or modified documents'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-600">
            {lang === 'ar' ? 'لا توجد مستندات بعد. ارفع مستندك الأول للبدء.' : 'No documents yet. Upload your first document to get started.'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


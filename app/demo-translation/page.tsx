'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import arTranslations from '@/i18n/messages/ar.json'
import enTranslations from '@/i18n/messages/en.json'

export default function DemoTranslationPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const t = lang === 'ar' ? arTranslations : enTranslations
  const direction = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <div dir={direction} className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      {/* Language Switcher */}
      <div className="container mx-auto mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">🌍 {t.common.welcome}</h1>
          <Button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            size="lg"
            className="gap-2"
          >
            {lang === 'ar' ? '🇬🇧 Switch to English' : '🇸🇦 التبديل للعربية'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Demo Content */}
      <div className="container mx-auto space-y-8">
        
        {/* Home Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t.home.title} {t.home.subtitle}</CardTitle>
            <CardDescription>{t.home.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <InfoBox title={t.home.projectManagement} desc={t.home.projectDesc} />
              <InfoBox title={t.home.financialManagement} desc={t.home.financialDesc} />
              <InfoBox title={t.home.humanResources} desc={t.home.hrDesc} />
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t.dashboard.title || t.common.dashboard}</CardTitle>
            <CardDescription>{t.dashboard.overview}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <StatCard label={t.dashboard.activeProjects} value="24" />
              <StatCard label={t.dashboard.totalRevenue} value="$2.4M" />
              <StatCard label={t.dashboard.activeEmployees} value="342" />
              <StatCard label={t.dashboard.lowStockItems} value="12" />
            </div>
          </CardContent>
        </Card>

        {/* Common Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{t.common.common || "Common Actions"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button>{t.common.dashboard}</Button>
              <Button variant="outline">{t.common.projects}</Button>
              <Button variant="outline">{t.common.finance}</Button>
              <Button variant="outline">{t.common.hr}</Button>
              <Button variant="outline">{t.common.inventory}</Button>
              <Button variant="outline">{t.common.analytics}</Button>
              <Button variant="secondary">{t.common.settings}</Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">11+</div>
                <div className="text-blue-100">{t.home.integratedModules}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">{t.home.customizable}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">{t.home.supportAvailable}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">{t.home.uptimeSLA}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="border-2 border-green-500 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">
              {lang === 'ar' ? '✅ الترجمة تعمل!' : '✅ Translation Works!'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <p className="font-medium">
                {lang === 'ar' 
                  ? 'جميع الترجمات موجودة ومحفوظة في:' 
                  : 'All translations are saved in:'}
              </p>
              <code className="block bg-white p-3 rounded border">
                /i18n/messages/ar.json ← {lang === 'ar' ? 'العربية' : 'Arabic'}<br/>
                /i18n/messages/en.json ← {lang === 'ar' ? 'الإنجليزية' : 'English'}
              </code>
              <p className="font-medium mt-4">
                {lang === 'ar' 
                  ? 'للاستخدام في أي صفحة:' 
                  : 'To use in any page:'}
              </p>
              <code className="block bg-white p-3 rounded border text-xs">
                {`import ar from '@/i18n/messages/ar.json'
import en from '@/i18n/messages/en.json'

const t = lang === 'ar' ? ar : en
<h1>{t.dashboard.title}</h1>`}
              </code>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

function InfoBox({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg text-center">
      <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  )
}


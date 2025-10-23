'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { translations, Language } from '@/lib/translations'

export default function TranslationDemoPage() {
  const [lang, setLang] = useState<Language>('en')
  const t = translations[lang]
  const direction = lang === 'ar' ? 'rtl' : 'ltr'

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar')
  }

  return (
    <div dir={direction} className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      {/* Header with Language Switcher */}
      <div className="container mx-auto mb-8">
        <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow-lg">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              {lang === 'ar' ? '🌍 التجربة التفاعلية للترجمة' : '🌍 Interactive Translation Demo'}
            </h1>
            <p className="text-gray-600 mt-2">
              {lang === 'ar' 
                ? 'اضغط على الزر لتبديل اللغة ومشاهدة الترجمة تعمل فوراً!' 
                : 'Click the button to switch language and see translation in action!'}
            </p>
          </div>
          <Button 
            onClick={toggleLanguage}
            size="lg"
            className="text-xl px-8 py-6"
          >
            {lang === 'ar' ? '🇬🇧 Switch to English' : '🇸🇦 التبديل للعربية'}
          </Button>
        </div>
      </div>

      <div className="container mx-auto space-y-6">
        
        {/* Common Translations */}
        <Card className="border-2 border-blue-500">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-2xl">
              {lang === 'ar' ? '📋 الكلمات المشتركة' : '📋 Common Words'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <TranslationBox label={t.dashboard} />
              <TranslationBox label={t.projects} />
              <TranslationBox label={t.finance} />
              <TranslationBox label={t.hr} />
              <TranslationBox label={t.procurement} />
              <TranslationBox label={t.inventory} />
              <TranslationBox label={t.contracts} />
              <TranslationBox label={t.crm} />
              <TranslationBox label={t.equipment} />
              <TranslationBox label={t.documents} />
              <TranslationBox label={t.analytics} />
              <TranslationBox label={t.settings} />
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Section */}
        <Card className="border-2 border-green-500">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-2xl">
              {lang === 'ar' ? '📊 لوحة التحكم' : '📊 Dashboard'}
            </CardTitle>
            <CardDescription className="text-lg">{t.dashboardOverview}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <StatCard title={t.activeProjects} value="24" color="blue" />
              <StatCard title={t.totalRevenue} value="$2.4M" color="green" />
              <StatCard title={t.activeEmployees} value="342" color="purple" />
              <StatCard title={t.lowStockItems} value="12" color="red" />
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <ModuleCard 
            icon="📁"
            title={t.projectsTitle}
            desc={t.projectsDesc}
            action={t.newProject}
          />
          <ModuleCard 
            icon="💰"
            title={t.financeTitle}
            desc={t.financeDesc}
            action={t.newInvoice}
          />
          <ModuleCard 
            icon="👥"
            title={t.hrTitle}
            desc={t.hrDesc}
            action={t.newEmployee}
          />
          <ModuleCard 
            icon="📦"
            title={t.inventoryTitle}
            desc={t.inventoryDesc}
            action={t.addItem}
          />
          <ModuleCard 
            icon="📊"
            title={t.analyticsTitle}
            desc={t.analyticsDesc}
            action={t.viewDemo}
          />
          <ModuleCard 
            icon="⚙️"
            title={t.settings}
            desc={lang === 'ar' ? 'إدارة إعدادات النظام' : 'Manage system settings'}
            action={t.settings}
          />
        </div>

        {/* Action Buttons */}
        <Card className="border-2 border-purple-500">
          <CardHeader className="bg-purple-50">
            <CardTitle>
              {lang === 'ar' ? '🎯 الإجراءات السريعة' : '🎯 Quick Actions'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="default">{t.save}</Button>
              <Button variant="outline">{t.cancel}</Button>
              <Button variant="secondary">{t.edit}</Button>
              <Button variant="destructive">{t.delete}</Button>
              <Button variant="ghost">{t.search}</Button>
              <Button variant="default">{t.signIn}</Button>
              <Button variant="outline">{t.signOut}</Button>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-3xl font-bold mb-2">
              {lang === 'ar' ? 'الترجمة تعمل بنجاح!' : 'Translation Works Successfully!'}
            </h2>
            <p className="text-xl text-green-100">
              {lang === 'ar' 
                ? 'جميع النصوص مترجمة بالكامل ويمكن استخدامها في أي صفحة!'
                : 'All texts are fully translated and can be used in any page!'}
            </p>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="border-2 border-yellow-500 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-800">
              {lang === 'ar' ? '📖 كيفية الاستخدام' : '📖 How to Use'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold mb-2">
                {lang === 'ar' ? '1. استورد الترجمات:' : '1. Import translations:'}
              </p>
              <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm">
                {`import { translations } from '@/lib/translations'`}
              </code>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold mb-2">
                {lang === 'ar' ? '2. استخدم اللغة:' : '2. Use the language:'}
              </p>
              <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm">
                {`const t = translations['ar'] // or 'en'
<h1>{t.dashboard}</h1>`}
              </code>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold mb-2">
                {lang === 'ar' ? '3. أضف RTL للعربية:' : '3. Add RTL for Arabic:'}
              </p>
              <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm">
                {`<div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
  {content}
</div>`}
              </code>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

function TranslationBox({ label }: { label: string }) {
  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center border-2 border-blue-200 hover:shadow-lg transition-shadow">
      <p className="font-semibold text-blue-900">{label}</p>
    </div>
  )
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600',
  }
  
  return (
    <div className={`p-6 bg-gradient-to-br ${colors[color as keyof typeof colors]} text-white rounded-xl shadow-lg`}>
      <p className="text-sm opacity-90 mb-1">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}

function ModuleCard({ icon, title, desc, action }: { icon: string; title: string; desc: string; action: string }) {
  return (
    <Card className="hover:shadow-xl transition-shadow cursor-pointer">
      <CardHeader>
        <div className="text-4xl mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full">{action}</Button>
      </CardContent>
    </Card>
  )
}


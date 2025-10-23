'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, Users, Package, Calendar, FileText, Briefcase } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function HomePage() {
  const { t, lang, toggleLanguage } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-blue-600">ERP System</div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={toggleLanguage}>
              {lang === 'ar' ? '🇬🇧 English' : '🇸🇦 العربية'}
            </Button>
            <Link href="/auth/signin">
              <Button>{t.signIn}</Button>
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            {t.homeTitle}
            <span className="text-blue-600"> {t.homeSubtitle}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t.homeDesc}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg">
                {t.getStarted} <ArrowRight className={lang === 'ar' ? 'mr-2 h-5 w-5 rotate-180' : 'ml-2 h-5 w-5'} />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-lg">
                {t.viewDemo}
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Calendar className="h-8 w-8" />}
            title={lang === 'ar' ? 'إدارة المشاريع' : 'Project Management'}
            description={lang === 'ar' ? 'تتبع المشاريع والمهام والمعالم والتعاون الجماعي في الوقت الفعلي.' : 'Track projects, tasks, milestones, and team collaboration in real-time.'}
          />
          <FeatureCard
            icon={<BarChart className="h-8 w-8" />}
            title={lang === 'ar' ? 'الإدارة المالية' : 'Financial Management'}
            description={lang === 'ar' ? 'نظام محاسبة شامل للفواتير وتتبع المدفوعات.' : 'Comprehensive accounting, invoicing, and payment tracking system.'}
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title={lang === 'ar' ? 'الموارد البشرية' : 'Human Resources'}
            description={lang === 'ar' ? 'إدارة الموظفين والحضور والإجازات وأتمتة الرواتب.' : 'Employee management, attendance, leave, and payroll automation.'}
          />
          <FeatureCard
            icon={<Package className="h-8 w-8" />}
            title={lang === 'ar' ? 'التحكم في المخزون' : 'Inventory Control'}
            description={lang === 'ar' ? 'تتبع المخزون في الوقت الفعلي وإدارة المستودعات وتنبيهات المخزون.' : 'Real-time inventory tracking, warehouse management, and stock alerts.'}
          />
          <FeatureCard
            icon={<Briefcase className="h-8 w-8" />}
            title={lang === 'ar' ? 'المشتريات' : 'Procurement'}
            description={lang === 'ar' ? 'طلبات الشراء والأوامر وطلبات عروض الأسعار وإدارة الموردين.' : 'Purchase requests, orders, RFQs, and supplier management.'}
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title={lang === 'ar' ? 'إدارة المستندات' : 'Document Management'}
            description={lang === 'ar' ? 'تخزين آمن للمستندات والتحكم في الإصدارات وسير عمل الموافقات.' : 'Secure document storage, version control, and approval workflows.'}
          />
        </div>

        {/* Stats Section */}
        <div className="bg-blue-600 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="11+" label={lang === 'ar' ? 'أكثر من 11 وحدة متكاملة' : 'Integrated Modules'} />
            <StatCard number="100%" label={lang === 'ar' ? 'قابل للتخصيص 100%' : 'Customizable'} />
            <StatCard number="24/7" label={lang === 'ar' ? 'دعم متوفر 24/7' : 'Support Available'} />
            <StatCard number="99.9%" label={lang === 'ar' ? '99.9% وقت التشغيل' : 'Uptime SLA'} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>{lang === 'ar' ? '© 2025 نظام ERP المؤسسي. جميع الحقوق محفوظة.' : '© 2025 Enterprise ERP System. All rights reserved.'}</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-blue-100">{label}</div>
    </div>
  )
}


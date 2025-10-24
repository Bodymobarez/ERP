'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, Users, Package, Calendar, FileText, Briefcase } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function HomePage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-blue-600">نظام إدارة المقاولات</div>
          <div className="flex gap-2">
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
                {t.getStarted} <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
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
            title="إدارة المشاريع"
            description="تتبع المشاريع والمهام والمعالم والتعاون الجماعي في الوقت الفعلي."
          />
          <FeatureCard
            icon={<BarChart className="h-8 w-8" />}
            title="الإدارة المالية"
            description="نظام محاسبة شامل للفواتير وتتبع المدفوعات."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="الموارد البشرية"
            description="إدارة الموظفين والحضور والإجازات وأتمتة الرواتب."
          />
          <FeatureCard
            icon={<Package className="h-8 w-8" />}
            title="التحكم في المخزون"
            description="تتبع المخزون في الوقت الفعلي وإدارة المستودعات وتنبيهات المخزون."
          />
          <FeatureCard
            icon={<Briefcase className="h-8 w-8" />}
            title="المشتريات"
            description="طلبات الشراء والأوامر وطلبات عروض الأسعار وإدارة الموردين."
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title="إدارة المستندات"
            description="تخزين آمن للمستندات والتحكم في الإصدارات وسير عمل الموافقات."
          />
        </div>

        {/* Stats Section */}
        <div className="bg-blue-600 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="11+" label="أكثر من 11 وحدة متكاملة" />
            <StatCard number="100%" label="قابل للتخصيص 100%" />
            <StatCard number="24/7" label="دعم متوفر 24/7" />
            <StatCard number="99.9%" label="99.9% وقت التشغيل" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 نظام ERP المؤسسي. جميع الحقوق محفوظة.</p>
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


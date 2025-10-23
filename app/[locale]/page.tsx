import { useTranslations } from 'next-intl';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, Users, Package, Calendar, FileText, Briefcase } from "lucide-react"

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <HomePageContent locale={locale} />
  );
}

function HomePageContent({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const common = useTranslations('common');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-blue-600">ERP System</div>
          <Link href={`/${locale}/auth/signin`}>
            <Button>{common('signIn')}</Button>
          </Link>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            {t('title')}
            <span className="text-blue-600"> {t('subtitle')}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('description')}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href={`/${locale}/auth/signin`}>
              <Button size="lg" className="text-lg">
                {t('getStarted')} <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/dashboard`}>
              <Button size="lg" variant="outline" className="text-lg">
                {t('viewDemo')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Calendar className="h-8 w-8" />}
            title={t('projectManagement')}
            description={t('projectDesc')}
          />
          <FeatureCard
            icon={<BarChart className="h-8 w-8" />}
            title={t('financialManagement')}
            description={t('financialDesc')}
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title={t('humanResources')}
            description={t('hrDesc')}
          />
          <FeatureCard
            icon={<Package className="h-8 w-8" />}
            title={t('inventoryControl')}
            description={t('inventoryDesc')}
          />
          <FeatureCard
            icon={<Briefcase className="h-8 w-8" />}
            title={t('procurementTitle')}
            description={t('procurementDesc')}
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title={t('documentManagement')}
            description={t('documentDesc')}
          />
        </div>

        {/* Stats Section */}
        <div className="bg-blue-600 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="11+" label={t('integratedModules')} />
            <StatCard number="100%" label={t('customizable')} />
            <StatCard number="24/7" label={t('supportAvailable')} />
            <StatCard number="99.9%" label={t('uptimeSLA')} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>{t('copyright')}</p>
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


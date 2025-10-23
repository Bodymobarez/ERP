import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, Users, Package, Calendar, FileText, Briefcase } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-blue-600">ERP System</div>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Enterprise Resource Planning
            <span className="text-blue-600"> Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive ERP solution for managing projects, finance, HR, procurement, inventory, and more.
            All in one beautiful, modern interface.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Calendar className="h-8 w-8" />}
            title="Project Management"
            description="Track projects, tasks, milestones, and team collaboration in real-time."
          />
          <FeatureCard
            icon={<BarChart className="h-8 w-8" />}
            title="Financial Management"
            description="Comprehensive accounting, invoicing, and payment tracking system."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Human Resources"
            description="Employee management, attendance, leave, and payroll automation."
          />
          <FeatureCard
            icon={<Package className="h-8 w-8" />}
            title="Inventory Control"
            description="Real-time inventory tracking, warehouse management, and stock alerts."
          />
          <FeatureCard
            icon={<Briefcase className="h-8 w-8" />}
            title="Procurement"
            description="Purchase requests, orders, RFQs, and supplier management."
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title="Document Management"
            description="Secure document storage, version control, and approval workflows."
          />
        </div>

        {/* Stats Section */}
        <div className="bg-blue-600 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="11+" label="Integrated Modules" />
            <StatCard number="100%" label="Customizable" />
            <StatCard number="24/7" label="Support Available" />
            <StatCard number="99.9%" label="Uptime SLA" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Enterprise ERP System. All rights reserved.</p>
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


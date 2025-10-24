"use client"

import { Header } from "@/components/layout/header"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {/* Back Button - يظهر في كل الصفحات عدا الرئيسية */}
        <BackButton />
        {children}
      </main>
    </div>
  )
}

function BackButton() {
  const pathname = usePathname()
  
  // لا يظهر في الصفحة الرئيسية
  if (pathname === '/dashboard') {
    return null
  }
  
  // تحديد الصفحة السابقة بناءً على المسار الحالي
  const getPreviousPage = () => {
    if (pathname.includes('/inspection/new')) {
      return '/dashboard/projects/sites/inspection'
    }
    if (pathname.includes('/inspection')) {
      return '/dashboard/projects/sites'
    }
    if (pathname.includes('/sites')) {
      return '/dashboard/projects'
    }
    if (pathname.includes('/projects')) {
      return '/dashboard'
    }
    return '/dashboard'
  }
  
  return (
    <div className="mb-4">
      <Link href={getPreviousPage()}>
        <Button variant="outline" size="sm" className="gap-2 text-sm">
          <ArrowLeft className="h-3 w-3" />
          العودة
        </Button>
      </Link>
    </div>
  )
}


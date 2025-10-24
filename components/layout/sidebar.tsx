"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import {
  LayoutDashboard,
  Building2,
  DollarSign,
  Calculator,
  Users,
  ShoppingCart,
  Package,
  FileText,
  UserCircle,
  Truck,
  FolderOpen,
  BarChart3,
  Settings,
  MapPin,
  Ruler,
  HardHat,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const menuItems = [
    { icon: LayoutDashboard, label: "الرئيسية", href: "/dashboard" },
    { icon: Building2, label: "المشاريع", href: "/dashboard/projects" },
    { icon: Truck, label: "المعدات", href: "/dashboard/equipment" },
    { icon: Users, label: "الموارد البشرية", href: "/dashboard/hr" },
    { icon: DollarSign, label: "المالية", href: "/dashboard/finance" },
    { icon: Calculator, label: "المحاسبة", href: "/dashboard/accounting" },
    { icon: ShoppingCart, label: "المشتريات", href: "/dashboard/procurement" },
    { icon: Package, label: "المخزون", href: "/dashboard/inventory" },
    { icon: FileText, label: "العقود", href: "/dashboard/contracts" },
    { icon: UserCircle, label: "العملاء", href: "/dashboard/crm" },
    { icon: FolderOpen, label: "المستندات", href: "/dashboard/documents" },
    { icon: BarChart3, label: "التقارير", href: "/dashboard/analytics" },
    { icon: Settings, label: "الإعدادات", href: "/dashboard/settings" },
  ]

  return (
    <aside className="hidden md:flex flex-col w-72 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white min-h-screen shadow-2xl border-r border-gray-800">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <Building2 className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">نظام المقاولات</h1>
            <p className="text-xs text-gray-400">Construction ERP</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20"
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-all",
                isActive 
                  ? "bg-white/10" 
                  : "group-hover:bg-gray-700/50"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800/50">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-4 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">النظام متصل</span>
          </div>
          <p className="text-xs text-gray-500">الإصدار 2.0</p>
        </div>
      </div>
    </aside>
  )
}


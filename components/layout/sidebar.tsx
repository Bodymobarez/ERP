"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import {
  LayoutDashboard,
  FolderKanban,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  FileText,
  UserCircle,
  Wrench,
  FolderOpen,
  BarChart3,
  Settings,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const menuItems = [
    { icon: LayoutDashboard, label: t.dashboard, href: "/dashboard" },
    { icon: FolderKanban, label: t.projects, href: "/dashboard/projects" },
    { icon: DollarSign, label: t.finance, href: "/dashboard/finance" },
    { icon: Users, label: t.hr, href: "/dashboard/hr" },
    { icon: ShoppingCart, label: t.procurement, href: "/dashboard/procurement" },
    { icon: Package, label: t.inventory, href: "/dashboard/inventory" },
    { icon: FileText, label: t.contracts, href: "/dashboard/contracts" },
    { icon: UserCircle, label: t.crm, href: "/dashboard/crm" },
    { icon: Wrench, label: t.equipment, href: "/dashboard/equipment" },
    { icon: FolderOpen, label: t.documents, href: "/dashboard/documents" },
    { icon: BarChart3, label: t.analytics, href: "/dashboard/analytics" },
    { icon: Settings, label: t.settings, href: "/dashboard/settings" },
  ]

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">ERP System</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}


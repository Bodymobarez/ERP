"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
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

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FolderKanban, label: "Projects", href: "/dashboard/projects" },
  { icon: DollarSign, label: "Finance", href: "/dashboard/finance" },
  { icon: Users, label: "HR", href: "/dashboard/hr" },
  { icon: ShoppingCart, label: "Procurement", href: "/dashboard/procurement" },
  { icon: Package, label: "Inventory", href: "/dashboard/inventory" },
  { icon: FileText, label: "Contracts", href: "/dashboard/contracts" },
  { icon: UserCircle, label: "CRM", href: "/dashboard/crm" },
  { icon: Wrench, label: "Equipment", href: "/dashboard/equipment" },
  { icon: FolderOpen, label: "Documents", href: "/dashboard/documents" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

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


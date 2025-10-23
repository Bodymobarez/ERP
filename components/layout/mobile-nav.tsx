"use client"

import { useState } from "react"
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
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const pathname = usePathname()
  const { t, lang } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: LayoutDashboard, label: t.dashboard, href: "/dashboard", color: "bg-blue-500" },
    { icon: FolderKanban, label: t.projects, href: "/dashboard/projects", color: "bg-purple-500" },
    { icon: DollarSign, label: t.finance, href: "/dashboard/finance", color: "bg-green-500" },
    { icon: Users, label: t.hr, href: "/dashboard/hr", color: "bg-orange-500" },
    { icon: ShoppingCart, label: t.procurement, href: "/dashboard/procurement", color: "bg-pink-500" },
    { icon: Package, label: t.inventory, href: "/dashboard/inventory", color: "bg-yellow-500" },
    { icon: FileText, label: t.contracts, href: "/dashboard/contracts", color: "bg-indigo-500" },
    { icon: UserCircle, label: t.crm, href: "/dashboard/crm", color: "bg-red-500" },
    { icon: Wrench, label: t.equipment, href: "/dashboard/equipment", color: "bg-teal-500" },
    { icon: FolderOpen, label: t.documents, href: "/dashboard/documents", color: "bg-cyan-500" },
    { icon: BarChart3, label: t.analytics, href: "/dashboard/analytics", color: "bg-violet-500" },
    { icon: Settings, label: t.settings, href: "/dashboard/settings", color: "bg-gray-500" },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          onClick={toggleMenu}
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
            isOpen 
              ? "bg-red-500 hover:bg-red-600 rotate-180" 
              : "bg-blue-600 hover:bg-blue-700"
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleMenu}
        />
      )}

      {/* Floating Menu Items */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-40 md:hidden transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className={cn(
                  "group flex items-center gap-3 transition-all duration-300",
                  "animate-in fade-in slide-in-from-bottom-2"
                )}
                style={{
                  animationDelay: `${index * 30}ms`,
                  animationFillMode: "both"
                }}
              >
                {/* Label */}
                <span
                  className={cn(
                    "bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium whitespace-nowrap",
                    "transition-all duration-200",
                    isActive 
                      ? "text-blue-600 scale-105" 
                      : "text-gray-700 group-hover:scale-105"
                  )}
                >
                  {item.label}
                </span>

                {/* Icon Button */}
                <div
                  className={cn(
                    "flex items-center justify-center h-12 w-12 rounded-full shadow-lg",
                    "transition-all duration-200 group-hover:scale-110",
                    item.color,
                    isActive && "ring-4 ring-white scale-110"
                  )}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Desktop Quick Access Buttons */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-2">
        {menuItems.slice(0, 4).map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative"
            >
              {/* Tooltip */}
              <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </span>

              {/* Button */}
              <div
                className={cn(
                  "flex items-center justify-center h-12 w-12 rounded-full shadow-lg",
                  "transition-all duration-200 group-hover:scale-110",
                  item.color,
                  isActive && "ring-4 ring-white scale-110"
                )}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}


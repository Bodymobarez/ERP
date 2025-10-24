"use client"

import { Bell, Search, Building2, Menu, X } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/lib/language-context"
import { NotificationsPanel } from "@/components/notifications-panel"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderKanban,
  DollarSign,
  Calculator,
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

export function Header() {
  const { data: session } = useSession()
  const { t } = useLanguage()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const initials = session?.user?.name
    ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U'

  const menuItems = [
    { icon: LayoutDashboard, label: t.dashboard, href: "/dashboard", color: "bg-blue-500" },
    { icon: FolderKanban, label: t.projects, href: "/dashboard/projects", color: "bg-purple-500" },
    { icon: DollarSign, label: t.finance, href: "/dashboard/finance", color: "bg-green-500" },
    { icon: Calculator, label: "المحاسبة", href: "/dashboard/accounting", color: "bg-emerald-500" },
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

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">نظام إدارة المقاولات</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>



            <NotificationsPanel />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full text-white hover:bg-white/20">
                  <Avatar>
                    <AvatarImage src={session?.user?.image || undefined} alt={session?.user?.name || "User"} />
                    <AvatarFallback className="bg-white/20 text-white">{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session?.user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email || ""}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t.profile}</DropdownMenuItem>
                <DropdownMenuItem>{t.settings}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
                  {t.signOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="px-6 py-4">
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                      isActive 
                        ? "bg-blue-50 text-blue-600 border border-blue-200" 
                        : "hover:bg-gray-50 text-gray-700"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg",
                      item.color,
                      isActive && "ring-2 ring-blue-200"
                    )}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}


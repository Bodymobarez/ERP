"use client"

import { Bell, Search, Languages } from "lucide-react"
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

export function Header() {
  const { data: session } = useSession()
  const { lang, toggleLanguage, t } = useLanguage()

  const initials = session?.user?.name
    ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U'

  return (
    <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder={t.search}
              className="pl-10 w-full bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          {/* Language Switcher Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
                <Languages className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => toggleLanguage()}
                className={lang === 'en' ? 'bg-accent' : ''}
              >
                <span className="mr-2 text-xl">🇬🇧</span>
                <span>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toggleLanguage()}
                className={lang === 'ar' ? 'bg-accent' : ''}
              >
                <span className="mr-2 text-xl">🇸🇦</span>
                <span>العربية</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
  )
}


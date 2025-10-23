"use client"

import { useState } from "react"
import { Bell, Check, X, AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { formatDistanceToNow } from "date-fns"
import { ar, enUS } from "date-fns/locale"

interface Notification {
  id: string
  type: 'success' | 'info' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export function NotificationsPanel() {
  const { lang } = useLanguage()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: lang === 'ar' ? 'مشروع جديد' : 'New Project',
      message: lang === 'ar' ? 'تم إنشاء مشروع "تطوير نظام ERP" بنجاح' : 'Project "ERP Development" created successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: lang === 'ar' ? 'مخزون منخفض' : 'Low Stock Alert',
      message: lang === 'ar' ? '5 أصناف تحتاج إلى إعادة طلب' : '5 items need reordering',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: lang === 'ar' ? 'فاتورة جديدة' : 'New Invoice',
      message: lang === 'ar' ? 'فاتورة #INV-001 بانتظار الموافقة' : 'Invoice #INV-001 pending approval',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: true
    },
    {
      id: '4',
      type: 'error',
      title: lang === 'ar' ? 'مهمة متأخرة' : 'Overdue Task',
      message: lang === 'ar' ? 'مهمة "مراجعة التصميم" تأخرت 2 أيام' : 'Task "Design Review" is 2 days overdue',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false
    },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>{lang === 'ar' ? 'الإشعارات' : 'Notifications'}</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="h-auto p-1 text-xs"
            >
              {lang === 'ar' ? 'وضع علامة على الكل كمقروء' : 'Mark all as read'}
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500">
            {lang === 'ar' ? 'لا توجد إشعارات' : 'No notifications'}
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex items-start gap-3 p-3 cursor-pointer ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
                onSelect={(e) => e.preventDefault()}
              >
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(notification.timestamp, {
                      addSuffix: true,
                      locale: lang === 'ar' ? ar : enUS
                    })}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}
        
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm text-blue-600 cursor-pointer">
              {lang === 'ar' ? 'عرض جميع الإشعارات' : 'View all notifications'}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


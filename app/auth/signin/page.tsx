"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { t, lang, toggleLanguage } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-3xl font-bold">
              {lang === 'ar' ? 'مرحباً بعودتك' : 'Welcome Back'}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleLanguage}
              className="text-xl"
            >
              {lang === 'ar' ? '🇬🇧' : '🇸🇦'}
            </Button>
          </div>
          <CardDescription className="text-center">
            {lang === 'ar' ? 'أدخل بيانات الدخول للوصول إلى نظام ERP' : 'Enter your credentials to access the ERP system'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {lang === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading 
                ? (lang === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...') 
                : (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-2">{lang === 'ar' ? 'بيانات الدخول التجريبية:' : 'Demo Credentials:'}</p>
            <p>{lang === 'ar' ? 'البريد: admin@example.com' : 'Email: admin@example.com'}</p>
            <p>{lang === 'ar' ? 'كلمة المرور: admin123' : 'Password: admin123'}</p>
          </div>
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              {lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


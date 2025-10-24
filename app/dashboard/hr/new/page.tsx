"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewEmployeePage() {
  const router = useRouter()
  const { t, lang } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    employeeId: `EMP-${Date.now()}`,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    hireDate: "",
    salary: "",
    status: "active",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          salary: parseFloat(formData.salary) || 0,
        }),
      })

      if (response.ok) {
        router.push("/dashboard/hr")
        router.refresh()
      } else {
        alert(t.errorOccurred || "حدث خطأ في إنشاء الموظف")
      }
    } catch (error) {
      console.error("Error:", error)
      alert(t.errorOccurred || "حدث خطأ في إنشاء الموظف")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.newEmployee}</h1>
          <p className="text-gray-600 mt-1">{t.createEmployee}</p>
        </div>
        <Link href="/dashboard/hr">
          <Button variant="outline">
            <ArrowLeft className={`h-4 w-4 ${lang === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t.back}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.employeeDetails}</CardTitle>
          <CardDescription>{lang === 'ar' ? 'معلومات الموظف الجديد' : 'New employee information'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Employee ID */}
              <div className="space-y-2">
                <Label htmlFor="employeeId">
                  {t.employeeId} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => handleChange("employeeId", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {lang === 'ar' ? 'الاسم الأول' : 'First Name'} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {lang === 'ar' ? 'اسم العائلة' : 'Last Name'} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  {t.email} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">{t.phone}</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Position */}
              <div className="space-y-2">
                <Label htmlFor="position">
                  {t.position} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: مدير مشروع' : 'e.g., Project Manager'}
                  required
                  disabled={loading}
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department">
                  {t.department} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: تقنية المعلومات' : 'e.g., IT'}
                  required
                  disabled={loading}
                />
              </div>

              {/* Hire Date */}
              <div className="space-y-2">
                <Label htmlFor="hireDate">
                  {t.hireDate} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => handleChange("hireDate", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <Label htmlFor="salary">
                  {t.salary} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="salary"
                  type="number"
                  step="0.01"
                  value={formData.salary}
                  onChange={(e) => handleChange("salary", e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: 5000' : 'e.g., 5000'}
                  required
                  disabled={loading}
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">{t.status}</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{t.active}</SelectItem>
                    <SelectItem value="onLeave">{t.onLeave}</SelectItem>
                    <SelectItem value="terminated">{t.terminated}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <Link href="/dashboard/hr">
                <Button type="button" variant="outline" disabled={loading}>
                  {t.cancel}
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? t.saving : t.save}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


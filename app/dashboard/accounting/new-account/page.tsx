"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Save, Loader2, CheckCircle2, XCircle, BookOpen, Calculator, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const accountSchema = z.object({
  code: z.string().min(1, "كود الحساب مطلوب").max(10, "كود الحساب طويل جداً"),
  name: z.string().min(1, "اسم الحساب مطلوب").max(100, "اسم الحساب طويل جداً"),
  type: z.enum(["asset", "liability", "equity", "revenue", "expense"], {
    required_error: "نوع الحساب مطلوب"
  }),
  parentAccountId: z.string().optional(),
  description: z.string().optional(),
  openingBalance: z.number(),
  isActive: z.boolean(),
})

type AccountFormValues = z.infer<typeof accountSchema>

const accountTypes = [
  { value: "asset", label: "الأصول", description: "الأصول المملوكة للشركة", color: "bg-green-100 text-green-800" },
  { value: "liability", label: "الخصوم", description: "الديون والالتزامات", color: "bg-red-100 text-red-800" },
  { value: "equity", label: "حقوق الملكية", description: "حقوق أصحاب الشركة", color: "bg-blue-100 text-blue-800" },
  { value: "revenue", label: "الإيرادات", description: "الإيرادات المكتسبة", color: "bg-purple-100 text-purple-800" },
  { value: "expense", label: "المصروفات", description: "المصروفات والتكاليف", color: "bg-orange-100 text-orange-800" },
]

export default function NewAccountPage() {
  const { t, lang } = useLanguage()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      code: "",
      name: "",
      type: "asset",
      parentAccountId: "",
      description: "",
      openingBalance: 0,
      isActive: true,
    },
  })

  const selectedType = form.watch("type")

  const onSubmit = async (data: AccountFormValues) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Account data:", data)
      setSubmitSuccess(true)
      
      // Redirect after success
      setTimeout(() => {
        router.push("/dashboard/accounting")
      }, 2000)
    } catch (error) {
      setSubmitError("حدث خطأ أثناء حفظ الحساب. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSelectedTypeInfo = () => {
    return accountTypes.find(type => type.value === selectedType)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/accounting">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إضافة حساب جديد</h1>
          <p className="text-gray-600 mt-1">إضافة حساب محاسبي جديد إلى النظام</p>
        </div>
      </div>

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">تم حفظ الحساب بنجاح</h3>
              <div className="mt-2 text-sm text-green-700">
                تم إنشاء الحساب بنجاح وسيتم توجيهك إلى صفحة المحاسبة...
              </div>
            </div>
          </div>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <XCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">خطأ في حفظ الحساب</h3>
              <div className="mt-2 text-sm text-red-700">{submitError}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                بيانات الحساب
              </CardTitle>
              <CardDescription>
                أدخل بيانات الحساب المحاسبي الجديد
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">كود الحساب *</Label>
                    <Input
                      id="code"
                      placeholder="مثال: 1000"
                      {...form.register("code")}
                      className={form.formState.errors.code ? "border-red-500" : ""}
                    />
                    {form.formState.errors.code && (
                      <p className="text-sm text-red-600">{form.formState.errors.code.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">اسم الحساب *</Label>
                    <Input
                      id="name"
                      placeholder="مثال: النقدية في الصندوق"
                      {...form.register("name")}
                      className={form.formState.errors.name ? "border-red-500" : ""}
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">نوع الحساب *</Label>
                  <Select onValueChange={(value) => form.setValue("type", value as any)}>
                    <SelectTrigger className={form.formState.errors.type ? "border-red-500" : ""}>
                      <SelectValue placeholder="اختر نوع الحساب" />
                    </SelectTrigger>
                    <SelectContent>
                      {accountTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Badge className={type.color}>
                              {type.label}
                            </Badge>
                            <span className="text-sm text-gray-600">{type.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.type && (
                    <p className="text-sm text-red-600">{form.formState.errors.type.message}</p>
                  )}
                </div>

                {selectedType && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getSelectedTypeInfo()?.color}>
                        {getSelectedTypeInfo()?.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-700">{getSelectedTypeInfo()?.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openingBalance">الرصيد الافتتاحي</Label>
                    <Input
                      id="openingBalance"
                      type="number"
                      placeholder="0.00"
                      {...form.register("openingBalance", { valueAsNumber: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentAccountId">الحساب الأب</Label>
                    <Select onValueChange={(value) => form.setValue("parentAccountId", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الحساب الأب (اختياري)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">لا يوجد حساب أب</SelectItem>
                        <SelectItem value="1000">1000 - الأصول المتداولة</SelectItem>
                        <SelectItem value="1100">1100 - النقدية في الصندوق</SelectItem>
                        <SelectItem value="1200">1200 - البنك الأهلي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">وصف الحساب</Label>
                  <Textarea
                    id="description"
                    placeholder="وصف تفصيلي للحساب (اختياري)"
                    rows={3}
                    {...form.register("description")}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    defaultChecked
                    {...form.register("isActive")}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="isActive">الحساب نشط</Label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        حفظ الحساب
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                معلومات الحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">كود الحساب</h4>
                <p className="text-sm text-gray-600">
                  يجب أن يكون كود الحساب فريداً ويتكون من أرقام فقط. مثال: 1000، 1100، 2000
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">أنواع الحسابات</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">الأصول</Badge>
                    <span className="text-gray-600">ما تملكه الشركة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800">الخصوم</Badge>
                    <span className="text-gray-600">ديون الشركة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">حقوق الملكية</Badge>
                    <span className="text-gray-600">حقوق المالكين</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-800">الإيرادات</Badge>
                    <span className="text-gray-600">الدخل المكتسب</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-orange-100 text-orange-800">المصروفات</Badge>
                    <span className="text-gray-600">التكاليف المدفوعة</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">الرصيد الافتتاحي</h4>
                <p className="text-sm text-gray-600">
                  الرصيد الأولي للحساب عند إنشائه. يمكن أن يكون موجباً أو سالباً حسب نوع الحساب.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                نصائح مهمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  تأكد من صحة كود الحساب قبل الحفظ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  اختر نوع الحساب المناسب بدقة
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  يمكن تعديل الحساب لاحقاً إذا لزم الأمر
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  الحسابات غير النشطة لن تظهر في التقارير
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

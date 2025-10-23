"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Save, Loader2, CheckCircle2, XCircle, Plus, Trash2, Receipt, Calculator, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const transactionSchema = z.object({
  date: z.string().min(1, "تاريخ القيد مطلوب"),
  description: z.string().min(1, "وصف القيد مطلوب"),
  reference: z.string().optional(),
  entries: z.array(z.object({
    accountId: z.string().min(1, "الحساب مطلوب"),
    debit: z.number().min(0, "المبلغ المدين يجب أن يكون موجب"),
    credit: z.number().min(0, "المبلغ الدائن يجب أن يكون موجب"),
    description: z.string().optional(),
  })).min(2, "يجب أن يحتوي القيد على حسابين على الأقل"),
}).refine((data) => {
  const totalDebit = data.entries.reduce((sum, entry) => sum + entry.debit, 0)
  const totalCredit = data.entries.reduce((sum, entry) => sum + entry.credit, 0)
  return totalDebit === totalCredit
}, {
  message: "المجموع المدين يجب أن يساوي المجموع الدائن",
  path: ["entries"]
})

type TransactionFormValues = z.infer<typeof transactionSchema>

const mockAccounts = [
  { id: "1", code: "1000", name: "الأصول المتداولة" },
  { id: "2", code: "1100", name: "النقدية في الصندوق" },
  { id: "3", code: "1200", name: "البنك الأهلي" },
  { id: "4", code: "2000", name: "الخصوم المتداولة" },
  { id: "5", code: "3000", name: "حقوق الملكية" },
  { id: "6", code: "4000", name: "الإيرادات" },
  { id: "7", code: "5000", name: "المصروفات" },
  { id: "8", code: "1300", name: "العملاء" },
  { id: "9", code: "2100", name: "الموردين" },
]

export default function NewTransactionPage() {
  const { t, lang } = useLanguage()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      description: "",
      reference: "",
      entries: [
        { accountId: "", debit: 0, credit: 0, description: "" },
        { accountId: "", debit: 0, credit: 0, description: "" }
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "entries"
  })

  const watchedEntries = form.watch("entries")
  const totalDebit = watchedEntries.reduce((sum, entry) => sum + (entry.debit || 0), 0)
  const totalCredit = watchedEntries.reduce((sum, entry) => sum + (entry.credit || 0), 0)
  const isBalanced = totalDebit === totalCredit

  const onSubmit = async (data: TransactionFormValues) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Transaction data:", data)
      setSubmitSuccess(true)
      
      // Redirect after success
      setTimeout(() => {
        router.push("/dashboard/accounting")
      }, 2000)
    } catch (error) {
      setSubmitError("حدث خطأ أثناء حفظ القيد. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const addEntry = () => {
    append({ accountId: "", debit: 0, credit: 0, description: "" })
  }

  const removeEntry = (index: number) => {
    if (fields.length > 2) {
      remove(index)
    }
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
          <h1 className="text-3xl font-bold text-gray-900">إضافة قيد يومي</h1>
          <p className="text-gray-600 mt-1">تسجيل عملية محاسبية جديدة</p>
        </div>
      </div>

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">تم حفظ القيد بنجاح</h3>
              <div className="mt-2 text-sm text-green-700">
                تم تسجيل القيد بنجاح وسيتم توجيهك إلى صفحة المحاسبة...
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
              <h3 className="text-sm font-medium text-red-800">خطأ في حفظ القيد</h3>
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
                <Receipt className="h-5 w-5" />
                بيانات القيد
              </CardTitle>
              <CardDescription>
                أدخل بيانات القيد المحاسبي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Transaction Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">تاريخ القيد *</Label>
                    <Input
                      id="date"
                      type="date"
                      {...form.register("date")}
                      className={form.formState.errors.date ? "border-red-500" : ""}
                    />
                    {form.formState.errors.date && (
                      <p className="text-sm text-red-600">{form.formState.errors.date.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference">رقم المرجع</Label>
                    <Input
                      id="reference"
                      placeholder="رقم المرجع (اختياري)"
                      {...form.register("reference")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>رقم القيد</Label>
                    <Input
                      value="TR-2024-001"
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">وصف القيد *</Label>
                  <Textarea
                    id="description"
                    placeholder="وصف تفصيلي للقيد المحاسبي"
                    rows={3}
                    {...form.register("description")}
                    className={form.formState.errors.description ? "border-red-500" : ""}
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
                  )}
                </div>

                {/* Journal Entries */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold">بنود القيد</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addEntry}>
                      <Plus className="h-4 w-4 mr-2" />
                      إضافة بند
                    </Button>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 grid grid-cols-12 gap-4 font-semibold text-sm">
                      <div className="col-span-4">الحساب</div>
                      <div className="col-span-2">مدين</div>
                      <div className="col-span-2">دائن</div>
                      <div className="col-span-3">الوصف</div>
                      <div className="col-span-1">إجراءات</div>
                    </div>

                    {fields.map((field, index) => (
                      <div key={field.id} className="p-4 border-t grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <Select
                            onValueChange={(value) => form.setValue(`entries.${index}.accountId`, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الحساب" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockAccounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.code} - {account.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-2">
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...form.register(`entries.${index}.debit`, { valueAsNumber: true })}
                          />
                        </div>

                        <div className="col-span-2">
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...form.register(`entries.${index}.credit`, { valueAsNumber: true })}
                          />
                        </div>

                        <div className="col-span-3">
                          <Input
                            placeholder="وصف البند"
                            {...form.register(`entries.${index}.description`)}
                          />
                        </div>

                        <div className="col-span-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEntry(index)}
                            disabled={fields.length <= 2}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="flex justify-end gap-8 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">المجموع المدين</p>
                      <p className="text-lg font-bold text-green-600">{totalDebit.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">المجموع الدائن</p>
                      <p className="text-lg font-bold text-red-600">{totalCredit.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">التوازن</p>
                      <p className={`text-lg font-bold ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                        {isBalanced ? 'متوازن' : 'غير متوازن'}
                      </p>
                    </div>
                  </div>

                  {form.formState.errors.entries && (
                    <p className="text-sm text-red-600">{form.formState.errors.entries.message}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={isSubmitting || !isBalanced}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        حفظ القيد
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
                معلومات القيد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">قواعد القيد المحاسبي</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• يجب أن يساوي المجموع المدين المجموع الدائن</li>
                  <li>• كل قيد يجب أن يحتوي على حسابين على الأقل</li>
                  <li>• لا يمكن أن يكون البند مدين ودائن في نفس الوقت</li>
                  <li>• يجب اختيار الحساب المناسب لكل بند</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold mb-2">حالة التوازن</h4>
                <div className="flex items-center gap-2">
                  {isBalanced ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-green-700">القيد متوازن</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-700">القيد غير متوازن</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  الفرق: {Math.abs(totalDebit - totalCredit).toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">أمثلة على القيود</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-white rounded border">
                    <p className="font-medium">شراء نقدية</p>
                    <p className="text-gray-600">مدين: المخزون</p>
                    <p className="text-gray-600">دائن: النقدية</p>
                  </div>
                  <div className="p-2 bg-white rounded border">
                    <p className="font-medium">مبيعات آجلة</p>
                    <p className="text-gray-600">مدين: العملاء</p>
                    <p className="text-gray-600">دائن: الإيرادات</p>
                  </div>
                </div>
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
                  تأكد من صحة الحسابات المختارة
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  اكتب وصفاً واضحاً للقيد
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  تحقق من التوازن قبل الحفظ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  يمكن تعديل القيد بعد الحفظ
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

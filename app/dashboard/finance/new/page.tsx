"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function NewInvoicePage() {
  const router = useRouter()
  const { t, lang } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    number: `INV-${Date.now()}`,
    type: "sales",
    date: new Date().toISOString().split('T')[0],
    dueDate: "",
    status: "draft",
    subtotal: "",
    tax: "",
    discount: "",
    notes: "",
  })

  const [items, setItems] = useState([
    { description: "", quantity: "1", unitPrice: "", tax: "0", discount: "0" }
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const subtotal = items.reduce((sum, item) => {
        return sum + (parseFloat(item.quantity) * parseFloat(item.unitPrice || "0"))
      }, 0)

      const tax = parseFloat(formData.tax) || 0
      const discount = parseFloat(formData.discount) || 0
      const total = subtotal + tax - discount

      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subtotal,
          tax,
          discount,
          total,
          paidAmount: 0,
          balance: total,
        }),
      })

      if (response.ok) {
        router.push("/dashboard/finance")
        router.refresh()
      } else {
        alert(t.errorOccurred || "Error creating invoice")
      }
    } catch (error) {
      console.error("Error:", error)
      alert(t.errorOccurred || "Error creating invoice")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addItem = () => {
    setItems([...items, { description: "", quantity: "1", unitPrice: "", tax: "0", discount: "0" }])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      return sum + (parseFloat(item.quantity) * parseFloat(item.unitPrice || "0"))
    }, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tax = parseFloat(formData.tax) || 0
    const discount = parseFloat(formData.discount) || 0
    return subtotal + tax - discount
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.newInvoice}</h1>
          <p className="text-gray-600 mt-1">{t.createInvoice}</p>
        </div>
        <Link href="/dashboard/finance">
          <Button variant="outline">
            <ArrowLeft className={`h-4 w-4 ${lang === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t.back}
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.invoiceDetails}</CardTitle>
            <CardDescription>{lang === 'ar' ? 'المعلومات الأساسية للفاتورة' : 'Basic invoice information'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Invoice Number */}
              <div className="space-y-2">
                <Label htmlFor="number">
                  {t.invoiceNumber} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => handleChange("number", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">{lang === 'ar' ? 'النوع' : 'Type'}</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">{lang === 'ar' ? 'مبيعات' : 'Sales'}</SelectItem>
                    <SelectItem value="purchase">{lang === 'ar' ? 'مشتريات' : 'Purchase'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">{t.status}</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">{t.draft}</SelectItem>
                    <SelectItem value="sent">{t.sent}</SelectItem>
                    <SelectItem value="paid">{t.paid}</SelectItem>
                    <SelectItem value="overdue">{t.overdue}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">
                  {t.invoiceDate} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label htmlFor="dueDate">
                  {t.dueDate} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{t.items}</CardTitle>
                <CardDescription>{lang === 'ar' ? 'أصناف الفاتورة' : 'Invoice items'}</CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-2" />
                {lang === 'ar' ? 'إضافة صنف' : 'Add Item'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid gap-4 md:grid-cols-5 items-end p-4 border rounded-lg">
                <div className="md:col-span-2 space-y-2">
                  <Label>{t.description}</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                    placeholder={lang === 'ar' ? 'وصف الصنف' : 'Item description'}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.quantity}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.unitPrice}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(index, "unitPrice", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={loading || items.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Totals */}
        <Card>
          <CardHeader>
            <CardTitle>{lang === 'ar' ? 'المبالغ' : 'Amounts'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="tax">{t.tax}</Label>
                <Input
                  id="tax"
                  type="number"
                  step="0.01"
                  value={formData.tax}
                  onChange={(e) => handleChange("tax", e.target.value)}
                  placeholder="0.00"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">{t.discount}</Label>
                <Input
                  id="discount"
                  type="number"
                  step="0.01"
                  value={formData.discount}
                  onChange={(e) => handleChange("discount", e.target.value)}
                  placeholder="0.00"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t.subtotal}:</span>
                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t.tax}:</span>
                <span className="font-medium">${(parseFloat(formData.tax) || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t.discount}:</span>
                <span className="font-medium">-${(parseFloat(formData.discount) || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>{t.total}:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">{t.notes}</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder={lang === 'ar' ? 'ملاحظات إضافية...' : 'Additional notes...'}
                rows={3}
                disabled={loading}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Link href="/dashboard/finance">
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
    </div>
  )
}


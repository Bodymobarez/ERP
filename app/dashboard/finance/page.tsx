"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, TrendingDown, DollarSign, FileText } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

export default function FinancePage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => {
        setInvoices(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error)
        setLoading(false)
      })
  }, [])

  const stats = {
    totalRevenue: invoices.reduce((sum, inv) => sum + Number(inv.paidAmount || 0), 0),
    outstanding: invoices.reduce((sum, inv) => sum + Number(inv.balance || 0), 0),
    invoiceCount: invoices.length,
    paidCount: invoices.filter(inv => inv.status === 'paid').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.financeTitle}</h1>
          <p className="text-gray-600 mt-1">{t.financeDesc}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t.newInvoice}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalRevenue}</p>
                <p className="text-2xl font-bold mt-2">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.outstanding}</p>
                <p className="text-2xl font-bold mt-2">{formatCurrency(stats.outstanding)}</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalInvoices}</p>
                <p className="text-2xl font-bold mt-2">{stats.invoiceCount}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.paidInvoices}</p>
                <p className="text-2xl font-bold mt-2">{stats.paidCount}</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t.recentInvoices}</CardTitle>
          <CardDescription>{t.manageInvoices || "Manage and track all your invoices"}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">{t.loading}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.invoiceNumber}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.clientSupplier}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.date}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.amount}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.status}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.balance}</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.slice(0, 10).map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{invoice.number}</td>
                      <td className="py-3 px-4">
                        {invoice.client?.name || invoice.supplier?.name || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {formatCurrency(Number(invoice.total))}
                      </td>
                      <td className="py-3 px-4">
                        <InvoiceStatusBadge status={invoice.status} />
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {formatCurrency(Number(invoice.balance))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function InvoiceStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-800",
    sent: "bg-blue-100 text-blue-800",
    paid: "bg-green-100 text-green-800",
    overdue: "bg-red-100 text-red-800",
    cancelled: "bg-gray-100 text-gray-800",
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.draft}`}>
      {status}
    </span>
  )
}


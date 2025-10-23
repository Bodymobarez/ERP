"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    fetch("/api/inventory/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching items:", error)
        setLoading(false)
      })
  }, [])

  const stats = {
    total: items.length,
    lowStock: items.filter(item => Number(item.currentStock) <= Number(item.minStock)).length,
    totalValue: items.reduce((sum, item) => sum + (Number(item.currentStock) * Number(item.unitPrice)), 0),
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.inventoryTitle}</h1>
          <p className="text-gray-600 mt-1">{t.inventoryDesc}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t.addItem}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalItems}</p>
                <p className="text-2xl font-bold mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Package className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.lowStock || t.lowStockItems}</p>
                <p className="text-2xl font-bold mt-2">{stats.lowStock}</p>
              </div>
              <div className="bg-red-500 text-white p-3 rounded-lg">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalValue}</p>
                <p className="text-2xl font-bold mt-2">${stats.totalValue.toLocaleString()}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t.items || "Inventory Items"}</CardTitle>
          <CardDescription>{t.allItems}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">{t.loading}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.sku}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.name}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.category}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.unitPrice}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.currentStock}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.minStock}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">{t.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const isLowStock = Number(item.currentStock) <= Number(item.minStock)
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{item.sku}</td>
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="py-3 px-4 text-gray-600">{item.category}</td>
                        <td className="py-3 px-4 font-medium">${Number(item.unitPrice).toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={isLowStock ? "text-red-600 font-medium" : ""}>
                            {Number(item.currentStock)} {item.unit}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {Number(item.minStock)} {item.unit}
                        </td>
                        <td className="py-3 px-4">
                          {isLowStock ? (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                              {t.lowStock}
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              {t.inStock}
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


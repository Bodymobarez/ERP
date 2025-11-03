"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Send,
  Package,
  Building2,
  User,
  Calendar,
  AlertTriangle,
  Search,
  ShoppingCart
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Types
interface OrderItem {
  id: string
  itemId: string
  itemName: string
  itemSku: string
  quantity: number
  unitPrice: number
  totalPrice: number
  unit: string
}

interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  category: string
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
  type: string
}

interface InventoryItem {
  id: string
  name: string
  sku: string
  unit: string
  unitPrice: number
  currentStock: number
  category: string
}

export default function NewInventoryOrderPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'purchase',
    priority: 'medium',
    supplierId: '',
    clientId: '',
    expectedDelivery: '',
    notes: ''
  })
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [showItemSelector, setShowItemSelector] = useState(false)
  const [itemSearchTerm, setItemSearchTerm] = useState("")

  // Sample data
  useEffect(() => {
    const sampleSuppliers: Supplier[] = [
      { id: "1", name: "شركة الحديد المتحد", email: "info@steel-united.com", phone: "01234567890", category: "مواد بناء" },
      { id: "2", name: "مصنع الخرسانة المتطورة", email: "sales@concrete-pro.com", phone: "01234567891", category: "خرسانة" },
      { id: "3", name: "شركة الأدوات الهندسية", email: "contact@eng-tools.com", phone: "01234567892", category: "أدوات" }
    ]
    
    const sampleClients: Client[] = [
      { id: "1", name: "شركة الإنشاءات الحديثة", email: "projects@modern-const.com", phone: "01234567893", type: "شركة" },
      { id: "2", name: "مؤسسة البناء السريع", email: "info@fast-build.com", phone: "01234567894", type: "مؤسسة" },
      { id: "3", name: "المهندس أحمد محمد", email: "ahmed@gmail.com", phone: "01234567895", type: "فرد" }
    ]
    
    const sampleItems: InventoryItem[] = [
      { id: "1", name: "حديد تسليح 12مم", sku: "STEEL-12MM", unit: "طن", unitPrice: 450, currentStock: 50, category: "حديد" },
      { id: "2", name: "أسمنت بورتلاند", sku: "CEMENT-PORT", unit: "كيس", unitPrice: 140, currentStock: 500, category: "أسمنت" },
      { id: "3", name: "خرسانة جاهزة C25", sku: "CONC-C25", unit: "م³", unitPrice: 370, currentStock: 100, category: "خرسانة" },
      { id: "4", name: "رمل ناعم", sku: "SAND-FINE", unit: "م³", unitPrice: 80, currentStock: 200, category: "رمل" },
      { id: "5", name: "زلط حجري", sku: "GRAVEL-STONE", unit: "م³", unitPrice: 120, currentStock: 150, category: "زلط" }
    ]
    
    setSuppliers(sampleSuppliers)
    setClients(sampleClients)
    setInventoryItems(sampleItems)
  }, [])

  // Calculate total
  const totalAmount = orderItems.reduce((sum, item) => sum + item.totalPrice, 0)

  // Add item to order
  const addItemToOrder = (item: InventoryItem, quantity: number) => {
    const totalPrice = quantity * item.unitPrice
    const orderItem: OrderItem = {
      id: Date.now().toString(),
      itemId: item.id,
      itemName: item.name,
      itemSku: item.sku,
      quantity,
      unitPrice: item.unitPrice,
      totalPrice,
      unit: item.unit
    }
    
    setOrderItems([...orderItems, orderItem])
    setShowItemSelector(false)
    setSelectedItem(null)
  }

  // Remove item from order
  const removeItemFromOrder = (itemId: string) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId))
  }

  // Update item quantity
  const updateItemQuantity = (itemId: string, quantity: number) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity,
          totalPrice: quantity * item.unitPrice
        }
      }
      return item
    }))
  }

  // Filter items for search
  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(itemSearchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(itemSearchTerm.toLowerCase())
  )

  // Submit order
  const handleSubmit = async (isDraft = false) => {
    if (orderItems.length === 0) {
      alert("يجب إضافة صنف واحد على الأقل")
      return
    }

    if (!formData.expectedDelivery) {
      alert("يجب تحديد تاريخ التسليم المتوقع")
      return
    }

    if (formData.type === 'purchase' && !formData.supplierId) {
      alert("يجب اختيار المورد لطلبية الشراء")
      return
    }

    if (formData.type === 'sale' && !formData.clientId) {
      alert("يجب اختيار العميل لطلبية البيع")
      return
    }

    setLoading(true)

    const orderData = {
      ...formData,
      status: isDraft ? 'pending' : 'approved',
      totalAmount,
      orderDate: new Date().toISOString(),
      items: orderItems,
      createdById: "user-1" // Replace with actual user ID
    }

    try {
      // Here you would call the API
      console.log('Order data:', orderData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert(isDraft ? "تم حفظ الطلبية كمسودة" : "تم إرسال الطلبية بنجاح")
      router.push('/dashboard/inventory/orders')
    } catch (error) {
      console.error('Error creating order:', error)
      alert("حدث خطأ في إنشاء الطلبية")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/inventory/orders">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة للطلبات
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">طلبية مخزون جديدة</h1>
            <p className="text-gray-600 mt-1">إنشاء طلبية شراء أو بيع جديدة</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات الطلبية</CardTitle>
              <CardDescription>تفاصيل الطلبية الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="type">نوع الطلبية</Label>
                  <select
                    id="type"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="purchase">طلبية شراء</option>
                    <option value="sale">طلبية بيع</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="priority">الأولوية</Label>
                  <select
                    id="priority"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  >
                    <option value="low">منخفض</option>
                    <option value="medium">متوسط</option>
                    <option value="high">عالي</option>
                    <option value="urgent">عاجل</option>
                  </select>
                </div>
              </div>

              {formData.type === 'purchase' ? (
                <div>
                  <Label htmlFor="supplier">المورد</Label>
                  <select
                    id="supplier"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.supplierId}
                    onChange={(e) => setFormData({...formData, supplierId: e.target.value})}
                  >
                    <option value="">اختر المورد</option>
                    {suppliers.map(supplier => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name} - {supplier.category}
                      </option>
                    ))}
                  </select>
                  {formData.supplierId && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      {suppliers.find(s => s.id === formData.supplierId) && (
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>{suppliers.find(s => s.id === formData.supplierId)?.name}</span>
                          </div>
                          <div className="mt-1">
                            <span>الهاتف: {suppliers.find(s => s.id === formData.supplierId)?.phone}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Label htmlFor="client">العميل</Label>
                  <select
                    id="client"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.clientId}
                    onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                  >
                    <option value="">اختر العميل</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name} - {client.type}
                      </option>
                    ))}
                  </select>
                  {formData.clientId && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      {clients.find(c => c.id === formData.clientId) && (
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{clients.find(c => c.id === formData.clientId)?.name}</span>
                          </div>
                          <div className="mt-1">
                            <span>الهاتف: {clients.find(c => c.id === formData.clientId)?.phone}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="expectedDelivery">تاريخ التسليم المتوقع</Label>
                <Input
                  id="expectedDelivery"
                  type="date"
                  value={formData.expectedDelivery}
                  onChange={(e) => setFormData({...formData, expectedDelivery: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  placeholder="أي ملاحظات إضافية..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>أصناف الطلبية</CardTitle>
                  <CardDescription>قائمة الأصناف المطلوبة</CardDescription>
                </div>
                <Button onClick={() => setShowItemSelector(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة صنف
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {orderItems.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لم يتم إضافة أصناف</h3>
                  <p className="text-gray-600 mb-4">ابدأ بإضافة الأصناف المطلوبة للطلبية</p>
                  <Button onClick={() => setShowItemSelector(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة صنف
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.itemName}</h4>
                          <p className="text-sm text-gray-500">{item.itemSku}</p>
                        </div>
                        <Button
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeItemFromOrder(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <Label>الكمية</Label>
                          <Input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={item.quantity}
                            onChange={(e) => updateItemQuantity(item.id, parseFloat(e.target.value) || 0)}
                          />
                          <p className="text-xs text-gray-500 mt-1">{item.unit}</p>
                        </div>
                        
                        <div>
                          <Label>سعر الوحدة</Label>
                          <Input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => {
                              const newPrice = parseFloat(e.target.value) || 0
                              setOrderItems(orderItems.map(oi => 
                                oi.id === item.id 
                                  ? {...oi, unitPrice: newPrice, totalPrice: newPrice * oi.quantity}
                                  : oi
                              ))
                            }}
                          />
                        </div>
                        
                        <div>
                          <Label>الإجمالي</Label>
                          <div className="p-2 bg-gray-50 rounded-md">
                            <span className="font-semibold">{formatCurrency(item.totalPrice)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-end">
                          <div className="text-sm text-gray-600">
                            المجموع: {formatCurrency(item.totalPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلبية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">عدد الأصناف:</span>
                <span className="font-medium">{orderItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">إجمالي الكمية:</span>
                <span className="font-medium">
                  {orderItems.reduce((sum, item) => sum + item.quantity, 0).toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">المبلغ الإجمالي:</span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>
              
              {formData.type === 'purchase' && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center gap-2 text-blue-800">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="text-sm font-medium">طلبية شراء</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    سيتم خصم المبلغ من الحساب عند الموافقة
                  </p>
                </div>
              )}
              
              {formData.type === 'sale' && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center gap-2 text-green-800">
                    <Package className="h-4 w-4" />
                    <span className="text-sm font-medium">طلبية بيع</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    سيتم إضافة المبلغ للحساب عند التسليم
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button
                  onClick={() => handleSubmit(false)}
                  disabled={loading || orderItems.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      جاري الإرسال...
                    </div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      إرسال الطلبية
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleSubmit(true)}
                  disabled={loading || orderItems.length === 0}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  حفظ كمسودة
                </Button>
                
                <Link href="/dashboard/inventory/orders" className="block">
                  <Button variant="ghost" className="w-full">
                    إلغاء
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Item Selector Modal */}
      {showItemSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">اختيار صنف</h2>
                <Button variant="ghost" onClick={() => setShowItemSelector(false)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="البحث في الأصناف..."
                    value={itemSearchTerm}
                    onChange={(e) => setItemSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.sku}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">السعر:</span>
                        <span className="font-medium">{formatCurrency(item.unitPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">المخزون:</span>
                        <span className={item.currentStock > 10 ? "text-green-600" : "text-orange-600"}>
                          {item.currentStock} {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">الفئة:</span>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor={`quantity-${item.id}`}>الكمية المطلوبة</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id={`quantity-${item.id}`}
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const quantity = parseFloat((e.target as HTMLInputElement).value)
                              if (quantity > 0) {
                                addItemToOrder(item, quantity)
                              }
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            const input = document.getElementById(`quantity-${item.id}`) as HTMLInputElement
                            const quantity = parseFloat(input.value)
                            if (quantity > 0) {
                              addItemToOrder(item, quantity)
                            } else {
                              alert("يجب إدخال كمية صحيحة")
                            }
                          }}
                        >
                          إضافة
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
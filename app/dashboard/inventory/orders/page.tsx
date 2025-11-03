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
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Package,
  Calendar,
  User,
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Truck,
  FileText
} from "lucide-react"
import { DollarSign } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Types
interface InventoryOrder {
  id: string
  orderNumber: string
  type: 'purchase' | 'sale'
  status: 'pending' | 'approved' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  supplierId?: string
  supplierName?: string
  clientId?: string
  clientName?: string
  totalAmount: number
  orderDate: string
  expectedDelivery: string
  actualDelivery?: string
  items: OrderItem[]
  notes?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface OrderItem {
  id: string
  itemId: string
  itemName: string
  itemSku: string
  quantity: number
  unitPrice: number
  totalPrice: number
  receivedQuantity?: number
  unit: string
}

export default function InventoryOrdersPage() {
  const { t } = useLanguage()
  const [orders, setOrders] = useState<InventoryOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<InventoryOrder | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  // Sample data
  useEffect(() => {
    const sampleOrders: InventoryOrder[] = [
      {
        id: "1",
        orderNumber: "PO-2024-001",
        type: "purchase",
        status: "pending",
        priority: "high",
        supplierId: "SUP-001",
        supplierName: "شركة الحديد المتحد",
        totalAmount: 45000,
        orderDate: "2024-01-15",
        expectedDelivery: "2024-01-22",
        items: [
          {
            id: "1",
            itemId: "ITM-001",
            itemName: "حديد تسليح 12مم",
            itemSku: "STEEL-12MM",
            quantity: 100,
            unitPrice: 450,
            totalPrice: 45000,
            unit: "طن"
          }
        ],
        notes: "طلبية عاجلة للمشروع الجديد",
        createdBy: "أحمد محمد",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z"
      },
      {
        id: "2",
        orderNumber: "SO-2024-001",
        type: "sale",
        status: "delivered",
        priority: "medium",
        clientId: "CLI-001",
        clientName: "شركة الإنشاءات الحديثة",
        totalAmount: 28000,
        orderDate: "2024-01-10",
        expectedDelivery: "2024-01-17",
        actualDelivery: "2024-01-16",
        items: [
          {
            id: "2",
            itemId: "ITM-002",
            itemName: "أسمنت بورتلاند",
            itemSku: "CEMENT-PORT",
            quantity: 200,
            unitPrice: 140,
            totalPrice: 28000,
            receivedQuantity: 200,
            unit: "كيس"
          }
        ],
        notes: "تم التسليم بنجاح",
        createdBy: "سارة أحمد",
        createdAt: "2024-01-10T09:00:00Z",
        updatedAt: "2024-01-16T14:00:00Z"
      },
      {
        id: "3",
        orderNumber: "PO-2024-002",
        type: "purchase",
        status: "processing",
        priority: "medium",
        supplierId: "SUP-002",
        supplierName: "مصنع الخرسانة المتطورة",
        totalAmount: 18500,
        orderDate: "2024-01-12",
        expectedDelivery: "2024-01-19",
        items: [
          {
            id: "3",
            itemId: "ITM-003",
            itemName: "خرسانة جاهزة C25",
            itemSku: "CONC-C25",
            quantity: 50,
            unitPrice: 370,
            totalPrice: 18500,
            unit: "م³"
          }
        ],
        createdBy: "محمد علي",
        createdAt: "2024-01-12T11:00:00Z",
        updatedAt: "2024-01-13T16:00:00Z"
      }
    ]
    
    setOrders(sampleOrders)
    setLoading(false)
  }, [])

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.supplierName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (order.clientName?.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesType = typeFilter === "all" || order.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  // Status colors and labels
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "في الانتظار", icon: Clock },
      approved: { color: "bg-blue-100 text-blue-800", label: "معتمد", icon: CheckCircle2 },
      processing: { color: "bg-purple-100 text-purple-800", label: "قيد التنفيذ", icon: Package },
      shipped: { color: "bg-indigo-100 text-indigo-800", label: "تم الشحن", icon: Truck },
      delivered: { color: "bg-green-100 text-green-800", label: "تم التسليم", icon: CheckCircle2 },
      cancelled: { color: "bg-red-100 text-red-800", label: "ملغي", icon: X }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    
    return (
      <Badge className={`${config.color} border-0`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { color: "bg-gray-100 text-gray-800", label: "منخفض" },
      medium: { color: "bg-blue-100 text-blue-800", label: "متوسط" },
      high: { color: "bg-orange-100 text-orange-800", label: "عالي" },
      urgent: { color: "bg-red-100 text-red-800", label: "عاجل" }
    }
    
    const config = priorityConfig[priority as keyof typeof priorityConfig]
    
    return (
      <Badge variant="outline" className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const getTypeLabel = (type: string) => {
    return type === 'purchase' ? 'طلبية شراء' : 'طلبية بيع'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/inventory">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة للمخزون
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">طلبات المخزون</h1>
            <p className="text-gray-600 mt-1">إدارة طلبات الشراء والبيع</p>
          </div>
        </div>
        <Link href="/dashboard/inventory/orders/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            طلبية جديدة
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">طلبات في الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">طلبات مكتملة</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">القيمة الإجمالية</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(orders.reduce((sum, order) => sum + order.totalAmount, 0))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">البحث</Label>
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="البحث في رقم الطلبية أو اسم المورد/العميل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="status-filter">الحالة</Label>
              <select
                id="status-filter"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">في الانتظار</option>
                <option value="approved">معتمد</option>
                <option value="processing">قيد التنفيذ</option>
                <option value="shipped">تم الشحن</option>
                <option value="delivered">تم التسليم</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="type-filter">النوع</Label>
              <select
                id="type-filter"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">جميع الأنواع</option>
                <option value="purchase">طلبية شراء</option>
                <option value="sale">طلبية بيع</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" className="ml-2">
                <Filter className="h-4 w-4 mr-2" />
                تصفية
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الطلبات</CardTitle>
          <CardDescription>
            إجمالي {filteredOrders.length} طلبية
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">جاري التحميل...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
              <p className="text-gray-600 mb-4">لم يتم العثور على أي طلبات مطابقة للبحث</p>
              <Link href="/dashboard/inventory/orders/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إنشاء طلبية جديدة
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">رقم الطلبية</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">النوع</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">المورد/العميل</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">القيمة</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">تاريخ الطلب</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">التسليم المتوقع</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">الحالة</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">الأولوية</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{order.orderNumber}</div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} صنف
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className={
                          order.type === 'purchase' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                        }>
                          {getTypeLabel(order.type)}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {order.supplierName || order.clientName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          {order.type === 'purchase' ? (
                            <Building2 className="h-3 w-3 mr-1" />
                          ) : (
                            <User className="h-3 w-3 mr-1" />
                          )}
                          {order.type === 'purchase' ? 'مورد' : 'عميل'}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(order.orderDate).toLocaleDateString('ar-SA')}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(order.expectedDelivery).toLocaleDateString('ar-SA')}
                        </div>
                        {order.actualDelivery && (
                          <div className="text-sm text-green-600 mt-1">
                            تم التسليم: {new Date(order.actualDelivery).toLocaleDateString('ar-SA')}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="py-4 px-4">
                        {getPriorityBadge(order.priority)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order)
                              setShowOrderDetails(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    تفاصيل الطلبية {selectedOrder.orderNumber}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {getTypeLabel(selectedOrder.type)} - {selectedOrder.supplierName || selectedOrder.clientName}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowOrderDetails(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">معلومات الطلبية</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">رقم الطلبية:</span>
                      <span className="font-medium">{selectedOrder.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الحالة:</span>
                      {getStatusBadge(selectedOrder.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الأولوية:</span>
                      {getPriorityBadge(selectedOrder.priority)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاريخ الطلب:</span>
                      <span>{new Date(selectedOrder.orderDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">التسليم المتوقع:</span>
                      <span>{new Date(selectedOrder.expectedDelivery).toLocaleDateString('ar-SA')}</span>
                    </div>
                    {selectedOrder.actualDelivery && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">تاريخ التسليم الفعلي:</span>
                        <span className="text-green-600">
                          {new Date(selectedOrder.actualDelivery).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">المالية</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">القيمة الإجمالية:</span>
                      <span className="font-bold text-lg">{formatCurrency(selectedOrder.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">عدد الأصناف:</span>
                      <span>{selectedOrder.items.length}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">أصناف الطلبية</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-right py-2 font-semibold text-gray-700">الصنف</th>
                        <th className="text-right py-2 font-semibold text-gray-700">الكمية</th>
                        <th className="text-right py-2 font-semibold text-gray-700">سعر الوحدة</th>
                        <th className="text-right py-2 font-semibold text-gray-700">الإجمالي</th>
                        {selectedOrder.type === 'purchase' && (
                          <th className="text-right py-2 font-semibold text-gray-700">كمية مستلمة</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-2">
                            <div className="font-medium">{item.itemName}</div>
                            <div className="text-gray-500 text-xs">{item.itemSku}</div>
                          </td>
                          <td className="py-2">{item.quantity} {item.unit}</td>
                          <td className="py-2">{formatCurrency(item.unitPrice)}</td>
                          <td className="py-2 font-semibold">{formatCurrency(item.totalPrice)}</td>
                          {selectedOrder.type === 'purchase' && (
                            <td className="py-2">
                              {item.receivedQuantity ? (
                                <span className="text-green-600">
                                  {item.receivedQuantity} {item.unit}
                                </span>
                              ) : (
                                <span className="text-gray-400">لم يتم الاستلام</span>
                              )}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {selectedOrder.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">ملاحظات</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{selectedOrder.notes}</p>
                </div>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>تم الإنشاء بواسطة: {selectedOrder.createdBy}</span>
                <span>
                  {new Date(selectedOrder.createdAt).toLocaleDateString('ar-SA')} - {new Date(selectedOrder.createdAt).toLocaleTimeString('ar-SA')}
                </span>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  تحرير الطلبية
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  طباعة الطلبية
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowOrderDetails(false)}
                  className="flex-1"
                >
                  إغلاق
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
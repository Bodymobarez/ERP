"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft,
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Plus,
  X,
  Save,
  Eye,
  FileText,
  Target,
  DollarSign,
  Users,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  Upload,
  Camera,
  Link as LinkIcon,
  Tag,
  Flag,
  Heart,
  Shield,
  Zap,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  Settings,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Copy,
  Share,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
  Menu,
  Grid,
  List,
  Table,
  Layout,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  RefreshCw,
  RefreshCcw,
  Play,
  Pause,

  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Server,
  Database,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  WifiOff,
  Signal,
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Power,
  PowerOff,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  AlertTriangle,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  CheckCircle,
  XCircle,
  HelpCircle,

  Lightbulb,
  BookOpen,
  Book,
  File,
  Folder,
  FolderOpen,
  Archive,
  Trash,
  Recycle,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Send,
  SendHorizontal,
  Reply,
  ReplyAll,
  Forward,
  Share2,
  Copy as CopyIcon,


  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move3d,
  Rotate3d,
  Flip,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Scissors,
  Eraser,
  Pen,
  Pencil,
  Highlighter,
  Paintbrush,
  Palette,
  Droplet,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Thermometer,
  Gauge,
  Timer,
  Clock as ClockIcon,
  Stopwatch,
  Hourglass,
  Calendar as CalendarIcon,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarRange,
  CalendarSearch,
  CalendarHeart,
  CalendarStar,
  CalendarUser,
  CalendarClock,
  CalendarEvent,
  CalendarImport,
  CalendarExport,
  CalendarShare,
  CalendarLock,
  CalendarUnlock,
  CalendarSettings,
  CalendarEdit,
  CalendarTrash,
  CalendarCopy,
  CalendarMove,
  CalendarArchive,
  CalendarRestore,
  CalendarRefresh,
  CalendarSync,
  CalendarDownload,
  CalendarUpload,
  CalendarPrint,
  CalendarSave,
  CalendarLoad,
  CalendarNew,
  CalendarOpen,
  CalendarClose,
  CalendarMinimize,
  CalendarMaximize,
  CalendarResize,
  CalendarFullscreen,
  CalendarExit,
  CalendarEnter,
  CalendarLogin,
  CalendarLogout,
  CalendarSignin,
  CalendarSignout,
  CalendarRegister,
  CalendarUnregister,
  CalendarSubscribe,
  CalendarUnsubscribe,
  CalendarFollow,
  CalendarUnfollow,
  CalendarLike,
  CalendarUnlike,
  CalendarLove,
  CalendarUnlove,
  CalendarHeart as CalendarHeartIcon,
  CalendarStar as CalendarStarIcon,
  CalendarUser as CalendarUserIcon,
  CalendarClock as CalendarClockIcon,
  CalendarEvent as CalendarEventIcon,
  CalendarImport as CalendarImportIcon,
  CalendarExport as CalendarExportIcon,
  CalendarShare as CalendarShareIcon,
  CalendarLock as CalendarLockIcon,
  CalendarUnlock as CalendarUnlockIcon,
  CalendarSettings as CalendarSettingsIcon,
  CalendarEdit as CalendarEditIcon,
  CalendarTrash as CalendarTrashIcon,
  CalendarCopy as CalendarCopyIcon,
  CalendarMove as CalendarMoveIcon,
  CalendarArchive as CalendarArchiveIcon,
  CalendarRestore as CalendarRestoreIcon,
  CalendarRefresh as CalendarRefreshIcon,
  CalendarSync as CalendarSyncIcon,
  CalendarDownload as CalendarDownloadIcon,
  CalendarUpload as CalendarUploadIcon,
  CalendarPrint as CalendarPrintIcon,
  CalendarSave as CalendarSaveIcon,
  CalendarLoad as CalendarLoadIcon,
  CalendarNew as CalendarNewIcon,
  CalendarOpen as CalendarOpenIcon,
  CalendarClose as CalendarCloseIcon,
  CalendarMinimize as CalendarMinimizeIcon,
  CalendarMaximize as CalendarMaximizeIcon,
  CalendarResize as CalendarResizeIcon,
  CalendarFullscreen as CalendarFullscreenIcon,
  CalendarExit as CalendarExitIcon,
  CalendarEnter as CalendarEnterIcon,
  CalendarLogin as CalendarLoginIcon,
  CalendarLogout as CalendarLogoutIcon,
  CalendarSignin as CalendarSigninIcon,
  CalendarSignout as CalendarSignoutIcon,
  CalendarRegister as CalendarRegisterIcon,
  CalendarUnregister as CalendarUnregisterIcon,
  CalendarSubscribe as CalendarSubscribeIcon,
  CalendarUnsubscribe as CalendarUnsubscribeIcon,
  CalendarFollow as CalendarFollowIcon,
  CalendarUnfollow as CalendarUnfollowIcon,
  CalendarLike as CalendarLikeIcon,
  CalendarUnlike as CalendarUnlikeIcon,
  CalendarLove as CalendarLoveIcon,
  CalendarUnlove as CalendarUnloveIcon
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for client types and sources
const clientTypes = [
  { id: "developer", name: "مطور عقاري", icon: Building2, color: "bg-blue-500" },
  { id: "contractor", name: "مقاول عام", icon: User, color: "bg-green-500" },
  { id: "investor", name: "مستثمر", icon: DollarSign, color: "bg-purple-500" },
  { id: "government", name: "جهة حكومية", icon: Shield, color: "bg-red-500" },
  { id: "private", name: "قطاع خاص", icon: Building2, color: "bg-orange-500" },
  { id: "individual", name: "فرد", icon: User, color: "bg-yellow-500" }
]

const clientSources = [
  { id: "website", name: "الموقع الإلكتروني", icon: LinkIcon, color: "bg-blue-500" },
  { id: "referral", name: "إحالة", icon: Users, color: "bg-green-500" },
  { id: "cold-call", name: "مكالمة باردة", icon: Phone, color: "bg-purple-500" },
  { id: "social", name: "وسائل التواصل", icon: MessageSquare, color: "bg-pink-500" },
  { id: "exhibition", name: "معرض", icon: Building2, color: "bg-orange-500" },
  { id: "advertisement", name: "إعلان", icon: Target, color: "bg-red-500" }
]

const priorities = [
  { id: "high", name: "عالي", color: "bg-red-500", icon: Flag },
  { id: "medium", name: "متوسط", color: "bg-yellow-500", icon: Flag },
  { id: "low", name: "منخفض", color: "bg-green-500", icon: Flag }
]

const statuses = [
  { id: "prospect", name: "محتمل", color: "bg-yellow-500", icon: Clock },
  { id: "active", name: "نشط", color: "bg-green-500", icon: CheckCircle2 },
  { id: "inactive", name: "غير نشط", color: "bg-gray-500", icon: XCircle }
]

export default function NewClientPage() {
  const { t, lang } = useLanguage()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    country: "السعودية",
    
    // Client Details
    clientType: "",
    clientSource: "",
    priority: "medium",
    status: "prospect",
    rating: 0,
    
    // Business Information
    industry: "",
    companySize: "",
    annualRevenue: "",
    establishedYear: "",
    description: "",
    
    // Contact Information
    alternativeEmail: "",
    alternativePhone: "",
    preferredContact: "email",
    timeZone: "Asia/Riyadh",
    
    // Additional Information
    notes: "",
    tags: [],
    customFields: {},
    
    // Social Media
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    
    // Documents
    documents: [],
    
    // Follow-up
    nextFollowUp: "",
    followUpNotes: "",
    assignedTo: ""
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleTagAdd = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    }
  }

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const handleDocumentUpload = (file) => {
    setFormData(prev => ({ 
      ...prev, 
      documents: [...prev.documents, { name: file.name, size: file.size, type: file.type }]
    }))
  }

  const steps = [
    { title: "المعلومات الأساسية", icon: User, description: "البيانات الشخصية والاتصال" },
    { title: "تفاصيل العميل", icon: Building2, description: "نوع العميل والمصدر" },
    { title: "المعلومات التجارية", icon: DollarSign, description: "البيانات التجارية والصناعة" },
    { title: "معلومات إضافية", icon: FileText, description: "الملاحظات والمستندات" },
    { title: "مراجعة وحفظ", icon: Save, description: "مراجعة البيانات وحفظ العميل" }
  ]

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-6 w-6 cursor-pointer ${
            i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleRatingChange(i)}
        />
      )
    }
    return stars
  }

  const getStepIcon = (stepNumber) => {
    const step = steps[stepNumber - 1]
    return step ? step.icon : User
  }

  const getStepColor = (stepNumber) => {
    if (stepNumber < step) return "bg-green-500"
    if (stepNumber === step) return "bg-blue-500"
    return "bg-gray-300"
  }

  const handleSubmit = () => {
    // Here you would typically save the client data to your backend
    console.log("Saving client:", formData)
    alert("تم حفظ العميل بنجاح!")
    router.push("/dashboard/crm")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0QzMyIDIwIDI4IDIyIDIyIDIyIDIwIDI1IDE1IDI1IDEwIDI1IDUgMjUgMCAyNSAwIDIwIDAgMTUgMCAxMCA1IDEwIDEwIDEwIDE1IDEwIDE1IDVIMjBDMjUgNSAzMCA1IDMwIDEwIDMwIDE1IDMwIDIwIDM2IDE0WiIvPjwvZ2M+PC9nPg==')] opacity-30"></div>
        <div className="relative z-10">
          <Link href="/dashboard/crm">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">العودة لإدارة العملاء</span>
              <span className="sm:hidden">العودة</span>
            </Button>
          </Link>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">إضافة عميل جديد</h1>
                <p className="text-blue-100 text-sm sm:text-base lg:text-lg">تسجيل عميل جديد في نظام إدارة علاقات العملاء</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm text-sm w-full sm:w-auto">
                <Eye className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">معاينة</span>
                <span className="sm:hidden">معاينة</span>
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg text-sm w-full sm:w-auto" onClick={handleSubmit}>
                <Save className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">حفظ العميل</span>
                <span className="sm:hidden">حفظ</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            {steps.map((s, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2 ${
                  index + 1 === step ? "bg-blue-600 shadow-lg" : 
                  index + 1 < step ? "bg-green-500" : "bg-gray-300"
                }`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <span className={`text-xs text-center ${
                  index + 1 === step ? "text-blue-600 font-semibold" : 
                  index + 1 < step ? "text-green-600" : "text-gray-500"
                }`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
          <Progress value={(step / steps.length) * 100} className="w-full" />
        </CardContent>
      </Card>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              المعلومات الأساسية
            </CardTitle>
            <CardDescription>أدخل البيانات الأساسية للعميل</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="companyName">اسم الشركة/العميل *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="أدخل اسم الشركة أو العميل"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contactPerson">اسم الشخص المسؤول *</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                placeholder="أدخل اسم الشخص المسؤول"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@company.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">رقم الهاتف *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+966501234567"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="website">الموقع الإلكتروني</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://www.company.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="city">المدينة</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="الرياض"
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">العنوان</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="أدخل العنوان التفصيلي"
                rows={3}
                className="mt-1"
              />
            </div>
          </CardContent>
          <div className="flex justify-end p-6 border-t">
            <Button onClick={() => setStep(2)}>التالي</Button>
          </div>
        </Card>
      )}

      {/* Step 2: Client Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              تفاصيل العميل
            </CardTitle>
            <CardDescription>حدد نوع العميل والمصدر والأولوية</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="clientType">نوع العميل *</Label>
              <Select onValueChange={(value) => handleSelectChange("clientType", value)} value={formData.clientType}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="اختر نوع العميل" />
                </SelectTrigger>
                <SelectContent>
                  {clientTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="clientSource">مصدر العميل *</Label>
              <Select onValueChange={(value) => handleSelectChange("clientSource", value)} value={formData.clientSource}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="اختر مصدر العميل" />
                </SelectTrigger>
                <SelectContent>
                  {clientSources.map(source => (
                    <SelectItem key={source.id} value={source.id}>
                      <div className="flex items-center gap-2">
                        <source.icon className="h-4 w-4" />
                        {source.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">الأولوية</Label>
              <Select onValueChange={(value) => handleSelectChange("priority", value)} value={formData.priority}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="اختر الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority.id} value={priority.id}>
                      <div className="flex items-center gap-2">
                        <priority.icon className="h-4 w-4" />
                        {priority.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">الحالة</Label>
              <Select onValueChange={(value) => handleSelectChange("status", value)} value={formData.status}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status.id} value={status.id}>
                      <div className="flex items-center gap-2">
                        <status.icon className="h-4 w-4" />
                        {status.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>التقييم</Label>
              <div className="flex items-center gap-2 mt-2">
                {renderStars(formData.rating)}
                <span className="text-sm text-gray-600 ml-2">
                  {formData.rating > 0 ? `${formData.rating}/5` : "لم يتم التقييم"}
                </span>
              </div>
            </div>
          </CardContent>
          <div className="flex justify-between p-6 border-t">
            <Button variant="outline" onClick={() => setStep(1)}>السابق</Button>
            <Button onClick={() => setStep(3)}>التالي</Button>
          </div>
        </Card>
      )}

      {/* Step 3: Business Information */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              المعلومات التجارية
            </CardTitle>
            <CardDescription>أدخل البيانات التجارية والصناعية</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="industry">القطاع/الصناعة</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={handleInputChange}
                placeholder="مثل: الإنشاءات، العقارات، الاستثمار"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="companySize">حجم الشركة</Label>
              <Select onValueChange={(value) => handleSelectChange("companySize", value)} value={formData.companySize}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="اختر حجم الشركة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">ناشئة (1-10 موظف)</SelectItem>
                  <SelectItem value="small">صغيرة (11-50 موظف)</SelectItem>
                  <SelectItem value="medium">متوسطة (51-200 موظف)</SelectItem>
                  <SelectItem value="large">كبيرة (201-1000 موظف)</SelectItem>
                  <SelectItem value="enterprise">مؤسسة (1000+ موظف)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="annualRevenue">الإيرادات السنوية</Label>
              <Input
                id="annualRevenue"
                value={formData.annualRevenue}
                onChange={handleInputChange}
                placeholder="مثل: 10,000,000 ريال"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="establishedYear">سنة التأسيس</Label>
              <Input
                id="establishedYear"
                type="number"
                value={formData.establishedYear}
                onChange={handleInputChange}
                placeholder="2020"
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">وصف الشركة/العميل</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="أدخل وصف مختصر عن الشركة أو العميل"
                rows={4}
                className="mt-1"
              />
            </div>
          </CardContent>
          <div className="flex justify-between p-6 border-t">
            <Button variant="outline" onClick={() => setStep(2)}>السابق</Button>
            <Button onClick={() => setStep(4)}>التالي</Button>
          </div>
        </Card>
      )}

      {/* Step 4: Additional Information */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              معلومات إضافية
            </CardTitle>
            <CardDescription>الملاحظات والمستندات والمعلومات الإضافية</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="alternativeEmail">بريد إلكتروني بديل</Label>
              <Input
                id="alternativeEmail"
                type="email"
                value={formData.alternativeEmail}
                onChange={handleInputChange}
                placeholder="alternative@company.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="alternativePhone">هاتف بديل</Label>
              <Input
                id="alternativePhone"
                value={formData.alternativePhone}
                onChange={handleInputChange}
                placeholder="+966501234567"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="preferredContact">طريقة التواصل المفضلة</Label>
              <Select onValueChange={(value) => handleSelectChange("preferredContact", value)} value={formData.preferredContact}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="اختر طريقة التواصل المفضلة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">البريد الإلكتروني</SelectItem>
                  <SelectItem value="phone">الهاتف</SelectItem>
                  <SelectItem value="whatsapp">واتساب</SelectItem>
                  <SelectItem value="sms">رسائل نصية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="nextFollowUp">تاريخ المتابعة التالية</Label>
              <Input
                id="nextFollowUp"
                type="date"
                value={formData.nextFollowUp}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="أدخل أي ملاحظات إضافية عن العميل"
                rows={4}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label>العلامات (Tags)</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleTagRemove(tag)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="أضف علامة جديدة"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleTagAdd(e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="أضف علامة جديدة"]')
                    if (input.value) {
                      handleTagAdd(input.value)
                      input.value = ''
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <div className="flex justify-between p-6 border-t">
            <Button variant="outline" onClick={() => setStep(3)}>السابق</Button>
            <Button onClick={() => setStep(5)}>التالي</Button>
          </div>
        </Card>
      )}

      {/* Step 5: Review and Save */}
      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="h-5 w-5 text-blue-600" />
              مراجعة وحفظ
            </CardTitle>
            <CardDescription>راجع البيانات قبل حفظ العميل</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">المعلومات الأساسية</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>اسم الشركة:</strong> {formData.companyName || "غير محدد"}</p>
                  <p><strong>الشخص المسؤول:</strong> {formData.contactPerson || "غير محدد"}</p>
                  <p><strong>البريد الإلكتروني:</strong> {formData.email || "غير محدد"}</p>
                  <p><strong>الهاتف:</strong> {formData.phone || "غير محدد"}</p>
                  <p><strong>الموقع الإلكتروني:</strong> {formData.website || "غير محدد"}</p>
                  <p><strong>المدينة:</strong> {formData.city || "غير محدد"}</p>
                  <p><strong>العنوان:</strong> {formData.address || "غير محدد"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">تفاصيل العميل</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>نوع العميل:</strong> {clientTypes.find(t => t.id === formData.clientType)?.name || "غير محدد"}</p>
                  <p><strong>مصدر العميل:</strong> {clientSources.find(s => s.id === formData.clientSource)?.name || "غير محدد"}</p>
                  <p><strong>الأولوية:</strong> {priorities.find(p => p.id === formData.priority)?.name || "غير محدد"}</p>
                  <p><strong>الحالة:</strong> {statuses.find(s => s.id === formData.status)?.name || "غير محدد"}</p>
                  <p><strong>التقييم:</strong> {formData.rating > 0 ? `${formData.rating}/5` : "لم يتم التقييم"}</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">المعلومات التجارية</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>القطاع:</strong> {formData.industry || "غير محدد"}</p>
                  <p><strong>حجم الشركة:</strong> {formData.companySize || "غير محدد"}</p>
                  <p><strong>الإيرادات السنوية:</strong> {formData.annualRevenue || "غير محدد"}</p>
                  <p><strong>سنة التأسيس:</strong> {formData.establishedYear || "غير محدد"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">معلومات إضافية</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>البريد البديل:</strong> {formData.alternativeEmail || "غير محدد"}</p>
                  <p><strong>الهاتف البديل:</strong> {formData.alternativePhone || "غير محدد"}</p>
                  <p><strong>طريقة التواصل المفضلة:</strong> {formData.preferredContact || "غير محدد"}</p>
                  <p><strong>تاريخ المتابعة:</strong> {formData.nextFollowUp || "غير محدد"}</p>
                </div>
              </div>
            </div>

            {formData.description && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">وصف الشركة</h3>
                <p className="text-sm text-gray-600">{formData.description}</p>
              </div>
            )}

            {formData.notes && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">ملاحظات</h3>
                <p className="text-sm text-gray-600">{formData.notes}</p>
              </div>
            )}

            {formData.tags.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">العلامات</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <div className="flex justify-between p-6 border-t">
            <Button variant="outline" onClick={() => setStep(4)}>السابق</Button>
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              حفظ العميل
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

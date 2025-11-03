"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  Plus, FileText, Folder, Upload, Download, Search, Filter, 
  Grid, List, Eye, Edit, Trash2, Star, Clock, User, Tag,
  FolderOpen, Image, FileCode, File,
  MoreHorizontal, Share, Archive, Lock, Unlock, CheckCircle,
  XCircle, AlertCircle, Calendar
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for documents
const mockDocuments = [
  {
    id: "1",
    title: "عقد توريد المعدات الإنشائية - المرحلة الأولى",
    type: "contract",
    category: "procurement",
    description: "عقد توريد المعدات الإنشائية اللازمة للمشروع الأول",
    fileType: "pdf",
    size: "2.4 MB",
    uploadedBy: "أحمد محمد",
    uploadedAt: "2024-01-15T10:30:00Z",
    lastModified: "2024-01-20T14:45:00Z",
    status: "approved",
    tags: ["عقود", "توريد", "معدات"],
    accessLevel: "restricted",
    version: "1.2",
    downloads: 12,
    favorite: true,
    projectId: "proj-001"
  },
  {
    id: "2",
    title: "تقرير التقييم المالي - الربع الأول",
    type: "report",
    category: "finance",
    description: "تقرير شامل للأداء المالي خلال الربع الأول من العام",
    fileType: "xlsx",
    size: "1.8 MB",
    uploadedBy: "فاطمة أحمد",
    uploadedAt: "2024-01-18T09:15:00Z",
    lastModified: "2024-01-22T11:20:00Z",
    status: "pending",
    tags: ["تقارير", "مالية", "ربعي"],
    accessLevel: "private",
    version: "2.0",
    downloads: 8,
    favorite: false,
    projectId: "proj-002"
  },
  {
    id: "3",
    title: "دليل الإجراءات التشغيلية",
    type: "manual",
    category: "operations",
    description: "دليل شامل للإجراءات التشغيلية وسياسات الشركة",
    fileType: "docx",
    size: "5.2 MB",
    uploadedBy: "خالد عبدالله",
    uploadedAt: "2024-01-10T16:00:00Z",
    lastModified: "2024-01-25T13:30:00Z",
    status: "approved",
    tags: ["دليل", "إجراءات", "تشغيل"],
    accessLevel: "public",
    version: "3.1",
    downloads: 25,
    favorite: true,
    projectId: null
  },
  {
    id: "4",
    title: "مخططات المشروع الهندسية",
    type: "drawing",
    category: "engineering",
    description: "المخططات الهندسية التفصيلية لمشروع البناء الجديد",
    fileType: "dwg",
    size: "12.5 MB",
    uploadedBy: "محمد الهندي",
    uploadedAt: "2024-01-12T14:20:00Z",
    lastModified: "2024-01-23T16:45:00Z",
    status: "review",
    tags: ["مخططات", "هندسة", "بناء"],
    accessLevel: "restricted",
    version: "1.0",
    downloads: 6,
    favorite: false,
    projectId: "proj-001"
  },
  {
    id: "5",
    title: "شهادات الجودة والمطابقة",
    type: "certificate",
    category: "quality",
    description: "شهادات الجودة والمطابقة للمواد والمعدات المستخدمة",
    fileType: "pdf",
    size: "3.7 MB",
    uploadedBy: "سارة قاسم",
    uploadedAt: "2024-01-14T11:45:00Z",
    lastModified: "2024-01-24T09:15:00Z",
    status: "approved",
    tags: ["شهادات", "جودة", "مطابقة"],
    accessLevel: "public",
    version: "1.1",
    downloads: 15,
    favorite: true,
    projectId: "proj-003"
  }
]

const categories = [
  { value: "all", label: "جميع الفئات", labelEn: "All Categories" },
  { value: "procurement", label: "المشتريات", labelEn: "Procurement" },
  { value: "finance", label: "المالية", labelEn: "Finance" },
  { value: "operations", label: "العمليات", labelEn: "Operations" },
  { value: "engineering", label: "الهندسة", labelEn: "Engineering" },
  { value: "quality", label: "الجودة", labelEn: "Quality" },
  { value: "hr", label: "الموارد البشرية", labelEn: "Human Resources" },
  { value: "legal", label: "القانونية", labelEn: "Legal" }
]

const documentTypes = [
  { value: "all", label: "جميع الأنواع", labelEn: "All Types" },
  { value: "contract", label: "عقد", labelEn: "Contract" },
  { value: "report", label: "تقرير", labelEn: "Report" },
  { value: "manual", label: "دليل", labelEn: "Manual" },
  { value: "drawing", label: "مخطط", labelEn: "Drawing" },
  { value: "certificate", label: "شهادة", labelEn: "Certificate" },
  { value: "invoice", label: "فاتورة", labelEn: "Invoice" },
  { value: "policy", label: "سياسة", labelEn: "Policy" }
]

const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return <File className="h-6 w-6 text-red-500" />
    case 'docx':
    case 'doc':
      return <FileText className="h-6 w-6 text-blue-500" />
    case 'xlsx':
    case 'xls':
      return <FileText className="h-6 w-6 text-green-500" />
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <Image className="h-6 w-6 text-purple-500" />
    case 'dwg':
    case 'dxf':
      return <FileCode className="h-6 w-6 text-orange-500" />
    default:
      return <FileText className="h-6 w-6 text-gray-500" />
  }
}

const getStatusBadge = (status: string, lang: string) => {
  const statusConfig = {
    approved: { color: "bg-green-100 text-green-800", label: lang === 'ar' ? 'معتمد' : 'Approved', icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-800", label: lang === 'ar' ? 'معلق' : 'Pending', icon: Clock },
    review: { color: "bg-blue-100 text-blue-800", label: lang === 'ar' ? 'قيد المراجعة' : 'Under Review', icon: Eye },
    rejected: { color: "bg-red-100 text-red-800", label: lang === 'ar' ? 'مرفوض' : 'Rejected', icon: XCircle }
  }
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  const StatusIcon = config.icon
  
  return (
    <Badge className={`${config.color} flex items-center gap-1`}>
      <StatusIcon className="h-3 w-3" />
      {config.label}
    </Badge>
  )
}

export default function DocumentsPage() {
  const { t, lang } = useLanguage()
  const [documents, setDocuments] = useState(mockDocuments)
  const [filteredDocuments, setFilteredDocuments] = useState(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Upload functionality
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFiles = (files: FileList) => {
    setUploading(true)
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          setShowUploadModal(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  // Filter documents
  useEffect(() => {
    let filtered = documents

    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(doc => doc.category === selectedCategory)
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(doc => doc.type === selectedType)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(doc => doc.status === selectedStatus)
    }

    setFilteredDocuments(filtered)
  }, [searchTerm, selectedCategory, selectedType, selectedStatus, documents])

  const toggleFavorite = (docId: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId ? { ...doc, favorite: !doc.favorite } : doc
      )
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatFileSize = (size: string) => {
    return size
  }

  return (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {lang === 'ar' ? 'إدارة المستندات' : 'Documents Management'}
          </h1>
          <p className="text-gray-600 mt-1">
            {lang === 'ar' ? 'إدارة وتنظيم جميع مستندات الشركة' : 'Manage and organize all company documents'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowUploadModal(true)}>
            <Upload className="h-4 w-4 mr-2" />
            {lang === 'ar' ? 'رفع مستند' : 'Upload Document'}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {lang === 'ar' ? 'مستند جديد' : 'New Document'}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {lang === 'ar' ? 'إجمالي المستندات' : 'Total Documents'}
                </p>
                <p className="text-2xl font-bold mt-2">342</p>
                <p className="text-xs text-green-600 mt-1">+12 {lang === 'ar' ? 'هذا الأسبوع' : 'this week'}</p>
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
                <p className="text-sm text-gray-600">
                  {lang === 'ar' ? 'المجلدات' : 'Folders'}
                </p>
                <p className="text-2xl font-bold mt-2">24</p>
                <p className="text-xs text-blue-600 mt-1">8 {lang === 'ar' ? 'فئات' : 'categories'}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-lg">
                <Folder className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {lang === 'ar' ? 'بانتظار الموافقة' : 'Pending Approval'}
                </p>
                <p className="text-2xl font-bold mt-2">12</p>
                <p className="text-xs text-yellow-600 mt-1">3 {lang === 'ar' ? 'عاجل' : 'urgent'}</p>
              </div>
              <div className="bg-yellow-500 text-white p-3 rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {lang === 'ar' ? 'المساحة المستخدمة' : 'Storage Used'}
                </p>
                <p className="text-2xl font-bold mt-2">24GB</p>
                <p className="text-xs text-purple-600 mt-1">68% {lang === 'ar' ? 'من المساحة' : 'of space'}</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-lg">
                <Download className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={lang === 'ar' ? 'البحث في المستندات...' : 'Search documents...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={lang === 'ar' ? 'اختر الفئة' : 'Select Category'} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {lang === 'ar' ? category.label : category.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={lang === 'ar' ? 'اختر النوع' : 'Select Type'} />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {lang === 'ar' ? type.label : type.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={lang === 'ar' ? 'اختر الحالة' : 'Select Status'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{lang === 'ar' ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
                  <SelectItem value="approved">{lang === 'ar' ? 'معتمد' : 'Approved'}</SelectItem>
                  <SelectItem value="pending">{lang === 'ar' ? 'معلق' : 'Pending'}</SelectItem>
                  <SelectItem value="review">{lang === 'ar' ? 'قيد المراجعة' : 'Under Review'}</SelectItem>
                  <SelectItem value="rejected">{lang === 'ar' ? 'مرفوض' : 'Rejected'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid/List */}
      <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {viewMode === 'grid' ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(document.fileType)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {document.title}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {document.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(document.id)}
                      >
                        <Star className={`h-4 w-4 ${document.favorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            {lang === 'ar' ? 'عرض' : 'View'}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            {lang === 'ar' ? 'تحميل' : 'Download'}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            {lang === 'ar' ? 'تعديل' : 'Edit'}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" />
                            {lang === 'ar' ? 'مشاركة' : 'Share'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            {lang === 'ar' ? 'حذف' : 'Delete'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {getStatusBadge(document.status, lang)}
                    <span className="text-sm text-gray-500">{formatFileSize(document.size)}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {document.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {document.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{document.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {document.uploadedBy}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(document.uploadedAt)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{lang === 'ar' ? 'الإصدار' : 'Version'} {document.version}</span>
                    <span>{document.downloads} {lang === 'ar' ? 'تحميل' : 'downloads'}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {getFileIcon(document.fileType)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {document.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {document.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{document.uploadedBy}</span>
                      <span>{formatDate(document.uploadedAt)}</span>
                      <span>{formatFileSize(document.size)}</span>
                      {getStatusBadge(document.status, lang)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(document.id)}
                    >
                      <Star className={`h-4 w-4 ${document.favorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          {lang === 'ar' ? 'عرض' : 'View'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          {lang === 'ar' ? 'تحميل' : 'Download'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          {lang === 'ar' ? 'تعديل' : 'Edit'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          {lang === 'ar' ? 'مشاركة' : 'Share'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          {lang === 'ar' ? 'حذف' : 'Delete'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {lang === 'ar' ? 'رفع مستند جديد' : 'Upload New Document'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUploadModal(false)}
              >
                ✕
              </Button>
            </div>

            {!uploading ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  {lang === 'ar' ? 'اسحب الملفات هنا أو انقر للتصفح' : 'Drag files here or click to browse'}
                </p>
                <p className="text-sm text-gray-500">
                  {lang === 'ar' ? 'يدعم PDF, DOC, XLS, JPG وملفات أخرى' : 'Supports PDF, DOC, XLS, JPG and other files'}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <div className="text-lg font-semibold mb-2">
                    {lang === 'ar' ? 'جاري رفع الملف...' : 'Uploading file...'}
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                  <div className="text-sm text-gray-500 mt-2">
                    {uploadProgress}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {lang === 'ar' ? 'لا توجد مستندات' : 'No documents found'}
            </h3>
            <p className="text-gray-500 mb-4">
              {lang === 'ar' ? 'لم يتم العثور على مستندات تطابق معايير البحث' : 'No documents match your search criteria'}
            </p>
            <Button onClick={() => setShowUploadModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {lang === 'ar' ? 'رفع أول مستند' : 'Upload first document'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


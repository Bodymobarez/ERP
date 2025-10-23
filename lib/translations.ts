// ملف الترجمات البسيط - يعمل مباشرة!

export const translations = {
  en: {
    // Common
    welcome: "Welcome",
    dashboard: "Dashboard",
    projects: "Projects",
    finance: "Finance",
    hr: "Human Resources",
    procurement: "Procurement",
    inventory: "Inventory",
    contracts: "Contracts",
    crm: "CRM",
    equipment: "Equipment",
    documents: "Documents",
    analytics: "Analytics",
    settings: "Settings",
    signIn: "Sign In",
    signOut: "Sign Out",
    search: "Search...",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    
    // Dashboard
    dashboardTitle: "Dashboard",
    dashboardOverview: "Welcome to your ERP system overview",
    activeProjects: "Active Projects",
    totalRevenue: "Total Revenue",
    activeEmployees: "Active Employees",
    lowStockItems: "Low Stock Items",
    recentProjects: "Recent Projects",
    recentInvoices: "Recent Invoices",
    recentTasks: "Recent Tasks",
    
    // Projects
    projectsTitle: "Projects",
    projectsDesc: "Manage and track all your projects",
    newProject: "New Project",
    budget: "Budget",
    progress: "Progress",
    
    // Finance
    financeTitle: "Finance",
    financeDesc: "Manage invoices, payments, and accounts",
    newInvoice: "New Invoice",
    outstanding: "Outstanding",
    totalInvoices: "Total Invoices",
    
    // HR
    hrTitle: "HR",
    hrDesc: "Manage employees, attendance, and payroll",
    newEmployee: "New Employee",
    totalEmployees: "Total Employees",
    
    // Inventory
    inventoryTitle: "Inventory",
    inventoryDesc: "Manage items, warehouses, and stock",
    addItem: "Add Item",
    totalItems: "Total Items",
    
    // Analytics
    analyticsTitle: "Analytics",
    analyticsDesc: "Comprehensive reports and insights",
    
    // Home
    homeTitle: "Enterprise Resource Planning",
    homeSubtitle: "Simplified",
    homeDesc: "Comprehensive ERP solution for managing projects, finance, HR, procurement, inventory, and more.",
    getStarted: "Get Started",
    viewDemo: "View Demo",
  },
  
  ar: {
    // Common - مشترك
    welcome: "مرحباً",
    dashboard: "لوحة التحكم",
    projects: "المشاريع",
    finance: "المالية",
    hr: "الموارد البشرية",
    procurement: "المشتريات",
    inventory: "المخزون",
    contracts: "العقود",
    crm: "علاقات العملاء",
    equipment: "المعدات",
    documents: "المستندات",
    analytics: "التحليلات",
    settings: "الإعدادات",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    search: "بحث...",
    save: "حفظ",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    
    // Dashboard - لوحة التحكم
    dashboardTitle: "لوحة التحكم",
    dashboardOverview: "مرحباً بك في نظرة عامة على نظام ERP الخاص بك",
    activeProjects: "المشاريع النشطة",
    totalRevenue: "إجمالي الإيرادات",
    activeEmployees: "الموظفون النشطون",
    lowStockItems: "أصناف منخفضة المخزون",
    recentProjects: "المشاريع الأخيرة",
    recentInvoices: "الفواتير الأخيرة",
    recentTasks: "المهام الأخيرة",
    
    // Projects - المشاريع
    projectsTitle: "المشاريع",
    projectsDesc: "إدارة وتتبع جميع مشاريعك",
    newProject: "مشروع جديد",
    budget: "الميزانية",
    progress: "التقدم",
    
    // Finance - المالية
    financeTitle: "المالية",
    financeDesc: "إدارة الفواتير والمدفوعات والحسابات",
    newInvoice: "فاتورة جديدة",
    outstanding: "المبالغ المستحقة",
    totalInvoices: "إجمالي الفواتير",
    
    // HR - الموارد البشرية
    hrTitle: "الموارد البشرية",
    hrDesc: "إدارة الموظفين والحضور والرواتب",
    newEmployee: "موظف جديد",
    totalEmployees: "إجمالي الموظفين",
    
    // Inventory - المخزون
    inventoryTitle: "المخزون",
    inventoryDesc: "إدارة الأصناف والمستودعات والمخزون",
    addItem: "إضافة صنف",
    totalItems: "إجمالي الأصناف",
    
    // Analytics - التحليلات
    analyticsTitle: "التحليلات",
    analyticsDesc: "تقارير ورؤى شاملة",
    
    // Home - الصفحة الرئيسية
    homeTitle: "نظام تخطيط موارد المؤسسات",
    homeSubtitle: "المبسط",
    homeDesc: "حل ERP شامل لإدارة المشاريع والمالية والموارد البشرية والمشتريات والمخزون والمزيد.",
    getStarted: "ابدأ الآن",
    viewDemo: "مشاهدة العرض",
  }
};

export type Language = 'en' | 'ar';

export function useSimpleTranslation(lang: Language) {
  return translations[lang];
}


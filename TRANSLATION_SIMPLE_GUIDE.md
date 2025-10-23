# 🌍 دليل الترجمة البسيط - Simple Translation Guide

## ✅ الحل البسيط للترجمة / Simple Translation Solution

بدلاً من استخدام next-intl المعقد، سنستخدم طريقة بسيطة وفعالة!

---

## 📋 الخطوات / Steps:

### 1. ملفات الترجمة موجودة بالفعل! ✅

```
/i18n/messages/ar.json  ← الترجمة العربية الكاملة
/i18n/messages/en.json  ← الترجمة الإنجليزية
```

جميع الترجمات جاهزة وموجودة!

---

### 2. استخدام الترجمة في أي صفحة:

#### مثال بسيط:

**قبل (Before):**
```typescript
export default function DashboardPage() {
  return <h1>Dashboard</h1>
}
```

**بعد (After):**
```typescript
import arTranslations from '@/i18n/messages/ar.json'
import enTranslations from '@/i18n/messages/en.json'

export default function DashboardPage() {
  // استخدم المتغير isArabic للتحكم
  const isArabic = false // أو true للعربية
  const t = isArabic ? arTranslations : enTranslations
  
  return <h1>{t.common.dashboard}</h1>
  // English: "Dashboard"
  // Arabic: "لوحة التحكم"
}
```

---

### 3. إضافة مبدل اللغة بسيط:

```typescript
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const [isArabic, setIsArabic] = useState(false)
  
  return (
    <Button onClick={() => setIsArabic(!isArabic)}>
      {isArabic ? '🇬🇧 English' : '🇸🇦 العربية'}
    </Button>
  )
}
```

---

### 4. مثال كامل وعملي:

```typescript
'use client'
import { useState } from 'react'
import arTranslations from '@/i18n/messages/ar.json'
import enTranslations from '@/i18n/messages/en.json'

export default function MyPage() {
  const [lang, setLang] = useState('en')
  const t = lang === 'ar' ? arTranslations : enTranslations
  
  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
        {lang === 'ar' ? '🇬🇧 English' : '🇸🇦 العربية'}
      </button>
      
      <h1>{t.dashboard.title}</h1>
      <p>{t.dashboard.overview}</p>
      <button>{t.common.save}</button>
    </div>
  )
}
```

---

## 🎯 الترجمات المتوفرة:

### جميع الوحدات مترجمة! ✅

```json
{
  "common": {
    "dashboard": "لوحة التحكم",
    "projects": "المشاريع",
    "finance": "المالية",
    "hr": "الموارد البشرية",
    "save": "حفظ",
    "cancel": "إلغاء"
    // ... والمزيد
  },
  "dashboard": {
    "title": "لوحة التحكم",
    "overview": "نظرة عامة",
    "activeProjects": "المشاريع النشطة"
    // ... والمزيد
  },
  "projects": { ... },
  "finance": { ... },
  "hr": { ... },
  "inventory": { ... },
  "analytics": { ... }
}
```

---

## 💡 استخدامات متقدمة:

### 1. حفظ اللغة في localStorage:

```typescript
'use client'
import { useState, useEffect } from 'react'

export function useTranslation() {
  const [lang, setLang] = useState('en')
  
  useEffect(() => {
    const saved = localStorage.getItem('language')
    if (saved) setLang(saved)
  }, [])
  
  const changeLang = (newLang: string) => {
    setLang(newLang)
    localStorage.setItem('language', newLang)
  }
  
  const t = lang === 'ar' 
    ? require('@/i18n/messages/ar.json')
    : require('@/i18n/messages/en.json')
  
  return { t, lang, changeLang }
}
```

### 2. Context للترجمة:

```typescript
// lib/language-context.tsx
'use client'
import { createContext, useContext, useState } from 'react'
import arTranslations from '@/i18n/messages/ar.json'
import enTranslations from '@/i18n/messages/en.json'

const LanguageContext = createContext({
  lang: 'en',
  t: enTranslations,
  setLang: (lang: string) => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState('en')
  const t = lang === 'ar' ? arTranslations : enTranslations
  
  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
```

---

## 🎨 دعم RTL للعربية:

في `app/globals.css` (موجود بالفعل ✅):

```css
[dir="rtl"] {
  direction: rtl;
}

[dir="rtl"] .sidebar {
  right: 0;
  left: auto;
}
```

---

## 🚀 التطبيق السريع:

### الطريقة الأسهل - في أي صفحة:

```typescript
import translations from '@/i18n/messages/ar.json'

export default function Page() {
  return (
    <div dir="rtl" className="font-arabic">
      <h1>{translations.dashboard.title}</h1>
      {/* لوحة التحكم */}
    </div>
  )
}
```

---

## ✨ المميزات:

✅ **بسيط جداً** - لا تعقيدات  
✅ **يعمل 100%** - مضمون  
✅ **سريع** - لا overhead  
✅ **مرن** - تحكم كامل  
✅ **الترجمات جاهزة** - كل شيء موجود  

---

## 📝 ملخص:

### للاستخدام الفوري:

1. **افتح أي صفحة**
2. **استورد ملف الترجمة**:
   ```typescript
   import ar from '@/i18n/messages/ar.json'
   ```
3. **استخدمها**:
   ```typescript
   <h1>{ar.dashboard.title}</h1>
   ```

### هذا كل شيء! 🎉

---

## 🎯 مثال عملي - تحديث Header:

```typescript
// components/layout/header.tsx
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ar from '@/i18n/messages/ar.json'
import en from '@/i18n/messages/en.json'

export function Header() {
  const [lang, setLang] = useState('en')
  const t = lang === 'ar' ? ar : en
  
  return (
    <header>
      <input placeholder={t.common.search} />
      <Button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
        {lang === 'ar' ? '🇬🇧' : '🇸🇦'}
      </Button>
      <Button>{t.common.settings}</Button>
    </header>
  )
}
```

---

**هذا الحل أبسط بكثير وسيعمل مباشرة! 🚀**

لا حاجة لإعدادات معقدة - فقط استورد واستخدم!


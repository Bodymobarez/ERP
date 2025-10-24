# دليل النشر على Vercel

## 🚀 خطوات النشر على Vercel

### 1. إعداد المشروع محلياً
```bash
# تثبيت التبعيات
npm install

# إعداد متغيرات البيئة
cp env.example .env.local

# تحديث ملف .env.local بالقيم الصحيحة
DATABASE_URL="your-database-url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### 2. إعداد قاعدة البيانات
```bash
# إنشاء قاعدة البيانات
npx prisma db push

# إضافة البيانات الأولية
npm run db:seed
```

### 3. اختبار المشروع محلياً
```bash
# تشغيل المشروع
npm run dev

# فتح المتصفح على http://localhost:3000
```

### 4. رفع المشروع على GitHub
```bash
# إنشاء repository جديد على GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/erp-system.git
git push -u origin main
```

### 5. النشر على Vercel

#### الطريقة الأولى: من خلال Vercel Dashboard
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول بحساب GitHub
3. اضغط "New Project"
4. اختر المشروع من GitHub
5. اضبط المتغيرات البيئية
6. اضغط "Deploy"

#### الطريقة الثانية: من خلال Vercel CLI
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# النشر للإنتاج
vercel --prod
```

### 6. إعداد متغيرات البيئة على Vercel

#### المتغيرات المطلوبة:
- `DATABASE_URL`: رابط قاعدة البيانات
- `NEXTAUTH_URL`: رابط الموقع
- `NEXTAUTH_SECRET`: مفتاح سري للـ NextAuth

#### إضافة المتغيرات:
1. اذهب إلى Project Settings
2. اختر Environment Variables
3. أضف المتغيرات المطلوبة
4. اضغط Save

### 7. إعداد قاعدة البيانات للإنتاج

#### خيارات قاعدة البيانات:
1. **Vercel Postgres** (مدمج)
2. **PlanetScale** (MySQL)
3. **Supabase** (PostgreSQL)
4. **Neon** (PostgreSQL)

#### مثال مع Vercel Postgres:
```bash
# إنشاء قاعدة بيانات جديدة
vercel postgres create erp-database

# الحصول على رابط قاعدة البيانات
vercel postgres connect erp-database

# تطبيق الـ schema
npx prisma db push

# إضافة البيانات الأولية
npm run db:seed
```

### 8. إعدادات إضافية

#### تحسين الأداء:
- تم تفعيل `output: 'standalone'`
- تم تفعيل `swcMinify: true`
- تم تفعيل `compress: true`

#### الأمان:
- تم إضافة headers للأمان
- تم إخفاء `X-Powered-By` header
- تم إعداد `X-Frame-Options: DENY`

#### التخزين المؤقت:
- تم إعداد cache للـ static files
- تم إعداد cache للـ images
- تم إعداد cache للـ API routes

### 9. مراقبة الأداء

#### Vercel Analytics:
```bash
# تثبيت Vercel Analytics
npm install @vercel/analytics

# إضافة إلى app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### Vercel Speed Insights:
```bash
# تثبيت Speed Insights
npm install @vercel/speed-insights

# إضافة إلى app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 10. استكشاف الأخطاء

#### مشاكل شائعة:
1. **خطأ في قاعدة البيانات**: تأكد من صحة `DATABASE_URL`
2. **خطأ في NextAuth**: تأكد من صحة `NEXTAUTH_SECRET`
3. **خطأ في البناء**: تأكد من تثبيت جميع التبعيات

#### سجلات الأخطاء:
```bash
# عرض سجلات Vercel
vercel logs

# عرض سجلات محددة
vercel logs --follow
```

### 11. التحديث المستمر

#### إعدادات GitHub Actions:
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## 📋 قائمة التحقق قبل النشر

- [ ] تم إعداد متغيرات البيئة
- [ ] تم اختبار المشروع محلياً
- [ ] تم رفع المشروع على GitHub
- [ ] تم إعداد قاعدة البيانات
- [ ] تم إعداد NextAuth
- [ ] تم اختبار جميع الصفحات
- [ ] تم إعداد النطاق المخصص (اختياري)

## 🔧 إعدادات متقدمة

### Custom Domain:
1. اذهب إلى Project Settings
2. اختر Domains
3. أضف النطاق المخصص
4. اتبع التعليمات لإعداد DNS

### Environment Variables:
```bash
# إضافة متغيرات جديدة
vercel env add VARIABLE_NAME

# عرض المتغيرات
vercel env ls

# حذف متغير
vercel env rm VARIABLE_NAME
```

### Functions:
```javascript
// إعدادات الـ API routes
export const config = {
  runtime: 'nodejs',
  regions: ['iad1'],
  maxDuration: 30
}
```

## 📞 الدعم

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

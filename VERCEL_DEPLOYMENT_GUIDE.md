# دليل رفع المشروع على Vercel

## 🚀 خطوات رفع نظام ERP على Vercel

### 1️⃣ إعداد الحساب
1. اذهب إلى [vercel.com](https://vercel.com)
2. قم بإنشاء حساب أو تسجيل الدخول
3. اربط حسابك مع GitHub

### 2️⃣ ربط المشروع
1. انقر على **"New Project"**
2. اختر repository: `Bodymobarez/ERP`
3. انقر على **"Import"**

### 3️⃣ إعداد متغيرات البيئة
أضف المتغيرات التالية في قسم **Environment Variables**:

#### متغيرات قاعدة البيانات الأساسية:
```bash
DATABASE_URL=postgresql://neondb_owner:npg_lqBcG6ZjbQ8e@ep-round-dream-ahl5ph9j-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require

POSTGRES_URL=postgresql://neondb_owner:npg_lqBcG6ZjbQ8e@ep-round-dream-ahl5ph9j-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require

POSTGRES_PRISMA_URL=postgresql://neondb_owner:npg_lqBcG6ZjbQ8e@ep-round-dream-ahl5ph9j-pooler.c-3.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require

POSTGRES_URL_NON_POOLING=postgresql://neondb_owner:npg_lqBcG6ZjbQ8e@ep-round-dream-ahl5ph9j.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

#### متغيرات NextAuth.js:
```bash
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=rBSXPlwMdBND1APE3wwy8+kxKKkdfwCO5rcEfmomAb0=
```

#### متغيرات Neon Auth (اختيارية):
```bash
NEXT_PUBLIC_STACK_PROJECT_ID=1d366634-81a4-414c-abe7-b72c75b37db7
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_2769e0n0negxm9h7hbarfn2z8mtz8vynkc1q2gzeww7p8
STACK_SECRET_SERVER_KEY=ssk_8jvqdax2xgqzq4kaa5gj624awkq1y8e33k3ysz6vnzyn8
```

### 4️⃣ إعدادات البناء
Vercel سيكتشف تلقائياً أن هذا مشروع Next.js، لكن تأكد من:

- **Framework Preset**: Next.js
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 5️⃣ النشر
1. انقر على **"Deploy"**
2. انتظر حتى اكتمال البناء (قد يستغرق 3-5 دقائق)
3. بعد النشر الناجح، احصل على رابط التطبيق

### 6️⃣ تحديث NEXTAUTH_URL
1. انسخ رابط التطبيق من Vercel
2. اذهب إلى **Settings > Environment Variables**
3. حدث متغير `NEXTAUTH_URL` ليكون:
   ```
   NEXTAUTH_URL=https://your-actual-app-url.vercel.app
   ```
4. أعد النشر عبر **Deployments > Redeploy**

### 7️⃣ إعداد قاعدة البيانات (إذا لزم الأمر)
إذا كانت قاعدة البيانات فارغة، قم بتشغيل:
```bash
# من مجلد المشروع محلياً
npx prisma db push
npx prisma db seed
```

## ✅ التحقق من النشر

بعد النشر الناجح، تأكد من:

1. **الصفحة الرئيسية** تعمل بشكل صحيح
2. **صفحة تسجيل الدخول** متاحة على `/auth/signin`
3. **لوحة التحكم** تعمل بعد تسجيل الدخول
4. **قاعدة البيانات** متصلة وتعمل

## 🔧 استكشاف الأخطاء

### إذا فشل البناء:
- تحقق من الـ logs في Vercel
- تأكد من صحة جميع متغيرات البيئة
- تأكد من أن قاعدة البيانات متاحة

### إذا كانت هناك مشاكل في الاتصال بقاعدة البيانات:
- تحقق من صحة `DATABASE_URL`
- تأكد من أن Neon database يقبل الاتصالات الخارجية
- جرب `POSTGRES_PRISMA_URL` بدلاً من `DATABASE_URL`

### إذا كانت هناك مشاكل في المصادقة:
- تأكد من صحة `NEXTAUTH_URL`
- تأكد من صحة `NEXTAUTH_SECRET`
- امسح cookies المتصفح وجرب مرة أخرى

## 🎯 الخطوات التالية

بعد النشر الناجح:

1. **اختبر جميع الوظائف** الأساسية
2. **أضف المستخدمين** والشركات الأولى
3. **اختبر العمليات** مثل إنشاء المشاريع والفواتير
4. **راجع الأمان** وصلاحيات الوصول
5. **أعد النسخ الاحتياطي** لقاعدة البيانات

## 📞 الدعم

إذا واجهت أي مشاكل، تحقق من:
- [وثائق Vercel](https://vercel.com/docs)
- [وثائق Next.js](https://nextjs.org/docs)
- [وثائق Neon](https://neon.tech/docs)
- [وثائق Prisma](https://www.prisma.io/docs)

---

**✨ تم إعداد المشروع بنجاح! نظام ERP جاهز للاستخدام في الإنتاج.**
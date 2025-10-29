# إعداد قاعدة بيانات Neon للمشروع

## الخطوات المطلوبة:

### 1. إنشاء حساب على Neon
1. اذهب إلى [neon.tech](https://neon.tech)
2. قم بإنشاء حساب جديد أو تسجيل الدخول
3. انقر على "Create a project"

### 2. إعداد المشروع
1. اختر اسم للمشروع (مثل: "ERP-System")
2. اختر المنطقة الأقرب لك
3. اختر إصدار PostgreSQL (يُفضل الإصدار الأحدث)

### 3. الحصول على رابط الاتصال
1. بعد إنشاء المشروع، ستجد Connection String
2. انسخ الرابط الذي يبدأ بـ `postgresql://`
3. سيكون شكله مثل:
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### 4. تحديث ملف .env
قم بتحديث ملف `.env` ووضع رابط قاعدة البيانات:

```env
DATABASE_URL="postgresql://your-username:your-password@your-host.neon.tech/your-database?sslmode=require"
```

### 5. تشغيل الأوامر التالية
بعد تحديث رابط قاعدة البيانات، قم بتشغيل:

```bash
# 1. توليد Prisma Client
npx prisma generate

# 2. رفع المخطط إلى قاعدة البيانات
npx prisma db push

# 3. إضافة البيانات الأولية
npm run db:seed
```

### 6. تشغيل المشروع
```bash
npm run dev
```

## بيانات تسجيل الدخول بعد السيد:
- البريد الإلكتروني: `admin@example.com`
- كلمة المرور: `admin123`

## ملاحظات مهمة:
- تأكد من أن رابط الاتصال يحتوي على `?sslmode=require`
- لا تشارك رابط قاعدة البيانات مع أي شخص
- يمكنك إنشاء قواعد بيانات متعددة للتطوير والإنتاج

## إذا واجهت مشاكل:
1. تأكد من أن الرابط صحيح
2. تأكد من اتصالك بالإنترنت
3. تحقق من أن المشروع في Neon نشط
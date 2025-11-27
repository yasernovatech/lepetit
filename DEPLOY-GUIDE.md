# 🚀 راهنمای استقرار سایت با پنل مدیریت زنده

## ⚠️ نکته مهم
برای استفاده از پنل مدیریت آنلاین، سایت باید به صورت **Node.js** اجرا شود، نه Static Export.

---

## 📋 روشهای استقرار

### روش 1: استقرار روی سرور Node.js (پیشنهادی)

#### الف) سرورهای پیشنهادی:
- **Vercel** (رایگان، بهترین گزینه)
- **Netlify**
- **Railway**
- **Render**
- **DigitalOcean**
- **AWS**

#### ب) استقرار روی Vercel (ساده‌ترین):

1. **ثبت نام در Vercel:**
   - به https://vercel.com بروید
   - با GitHub ثبت نام کنید

2. **آپلود پروژه:**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

3. **تنظیمات:**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **دامنه سفارشی:**
   - Settings → Domains
   - دامنه خود را اضافه کنید

✅ **پنل مدیریت شما در:** `your-domain.com/admin`

---

### روش 2: استقرار روی هاست معمولی (با محدودیت)

اگر هاست شما فقط Static Files را پشتیبانی میکند:

#### مرحله 1: بیلد Static
```bash
npm run build
```

#### مرحله 2: آپلود
فایلهای `out/` را آپلود کنید

⚠️ **محدودیت:** پنل مدیریت کار نمیکند، باید دستی فایلها را ویرایش کنید

---

## 🔧 تنظیمات سرور Node.js

### نصب و اجرا:

```bash
# نصب وابستگیها
npm install

# بیلد پروژه
npm run build

# اجرا در حالت تولید
npm start
```

### استفاده از PM2 (برای سرور):

```bash
# نصب PM2
npm install -g pm2

# اجرای سایت
pm2 start npm --name "lepetit" -- start

# ذخیره تنظیمات
pm2 save

# راه‌اندازی خودکار
pm2 startup
```

---

## 🌐 تنظیمات دامنه

### برای Vercel:
1. Settings → Domains
2. Add Domain
3. دامنه خود را وارد کنید
4. DNS را تنظیم کنید:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

### برای سرور شخصی:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔐 امنیت پنل مدیریت

### 1. تغییر رمز عبور:
فایل `app/admin/page.tsx`:
```typescript
if (password === 'YOUR_STRONG_PASSWORD') {
```

### 2. محدود کردن دسترسی (اختیاری):
فایل `app/api/content/route.ts`:
```typescript
const authHeader = request.headers.get('authorization')
if (authHeader !== 'Bearer YOUR_SECRET_TOKEN') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

---

## 📱 استفاده از پنل

### دسترسی:
```
https://your-domain.com/admin
```

### ورود:
- رمز عبور: `lepetit2025`

### ویرایش:
1. وارد پنل شوید
2. تغییرات را اعمال کنید
3. روی "💾 ذخیره" کلیک کنید
4. ✅ تغییرات فوراً در سایت اعمال میشود!

---

## 🔄 بروزرسانی سایت

### روش 1: از طریق Git (Vercel):
```bash
git add .
git commit -m "Update content"
git push
```
Vercel خودکار دیپلوی میکند

### روش 2: دستی:
```bash
npm run build
pm2 restart lepetit
```

---

## 🆘 رفع مشکلات

### مشکل: پنل کار نمیکند
**راهحل:** 
- مطمئن شوید سایت روی Node.js اجرا میشود
- Static Export را غیرفعال کنید

### مشکل: تغییرات ذخیره نمیشود
**راهحل:**
- دسترسی نوشتن فایل را چک کنید
- لاگ سرور را بررسی کنید

### مشکل: خطای 500
**راهحل:**
- لاگ سرور: `pm2 logs lepetit`
- مسیر فایلها را چک کنید

---

## 📊 مقایسه روشها

| ویژگی | Vercel | Static Export |
|-------|--------|---------------|
| پنل مدیریت | ✅ کار میکند | ❌ کار نمیکند |
| سرعت | ⚡ خیلی سریع | ⚡ خیلی سریع |
| هزینه | 💰 رایگان | 💰 رایگان |
| راه‌اندازی | 🟢 آسان | 🟢 آسان |
| بروزرسانی | 🔄 خودکار | 🔄 دستی |

---

## ✅ چک لیست استقرار

- [ ] پروژه را بیلد کردم
- [ ] روی Vercel یا سرور Node.js آپلود کردم
- [ ] دامنه را تنظیم کردم
- [ ] پنل مدیریت را تست کردم
- [ ] رمز عبور را تغییر دادم
- [ ] SSL را فعال کردم
- [ ] بکآپ گرفتم

---

## 🎯 توصیه نهایی

**بهترین گزینه:** استقرار روی Vercel
- رایگان
- سریع
- پنل مدیریت کار میکند
- بروزرسانی خودکار
- SSL رایگان
- پشتیبانی عالی

**دستور نهایی:**
```bash
vercel --prod
```

✨ سایت شما آماده است!

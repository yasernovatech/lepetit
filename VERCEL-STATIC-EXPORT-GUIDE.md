# راهنمای کامل Deploy پروژه Static Export روی Vercel

## 🎯 تشخیص نوع پروژه

### ✅ پروژه شما: **Static Export**

**دلایل:**
1. ✅ `next.config.mjs` دارای `output: 'export'` است
2. ✅ تمام صفحات Client Component هستند (`"use client"`)
3. ✅ هیچ API Route وجود ندارد
4. ✅ هیچ Server Component یا Server Action وجود ندارد
5. ✅ تصاویر با `unoptimized: true` تنظیم شدهاند

---

## 📋 تنظیمات صحیح

### Build Command:
```bash
next build
```

**نکته مهم:** در Next.js 15، دیگر نیازی به `next export` نیست!
وقتی `output: 'export'` در config باشد، `next build` خودش export میکند.

### Output Directory:
```
out
```

این پوشه خودکار توسط Next.js ساخته میشود.

### Install Command:
```bash
npm install
```

### Node Version:
```
18.x یا بالاتر
```

---

## 📁 فایلهای کلیدی

### 1. next.config.mjs ✅
```javascript
const nextConfig = {
  output: 'export',        // فعالسازی static export
  images: {
    unoptimized: true,     // برای static export ضروری است
  },
  trailingSlash: true,     // برای سازگاری با hosting
}
```

### 2. vercel.json ✅
```json
{
  "trailingSlash": true,
  "cleanUrls": true
}
```

**نکته:** Vercel خودش تشخیص میدهد که پروژه static است.
نیازی به تنظیمات پیچیده نیست!

### 3. package.json ✅
```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "start": "next start"
  }
}
```

---

## 🚀 مراحل Deploy

### مرحله 1: آماده‌سازی (انجام شده ✅)

تمام تغییرات لازم انجام شده:
- ✅ پوشه‌های `.next` و `out` حذف شدند
- ✅ `.gitignore` کامل شد
- ✅ `package.json` اصلاح شد
- ✅ `vercel.json` ساده شد
- ✅ Build تست شد

### مرحله 2: Push به GitHub

```bash
# اضافه کردن تمام تغییرات
git add .

# Commit
git commit -m "Fix: Configure for Vercel static export deployment"

# Push (اگر branch شما main است)
git push origin main

# یا اگر master است:
git push origin master
```

### مرحله 3: Import در Vercel

1. به [vercel.com](https://vercel.com) بروید
2. با GitHub وارد شوید
3. "Add New Project" کلیک کنید
4. Repository `yasernovatech/lepetit` را انتخاب کنید
5. روی "Import" کلیک کنید

### مرحله 4: تنظیمات (خودکار)

Vercel خودش این موارد را تشخیص میدهد:
- ✅ Framework: Next.js
- ✅ Build Command: `next build`
- ✅ Output Directory: `out`
- ✅ Install Command: `npm install`

**فقط روی "Deploy" کلیک کنید!**

---

## ✅ چک‌لیست نهایی

قبل از Deploy:
- [x] `output: 'export'` در next.config.mjs وجود دارد
- [x] `images.unoptimized: true` تنظیم شده
- [x] هیچ API Route وجود ندارد
- [x] هیچ Server Component وجود ندارد
- [x] Build در local موفق است
- [x] پوشه‌های `.next` و `out` در .gitignore هستند
- [ ] تغییرات به GitHub push شده‌اند
- [ ] پروژه در Vercel import شده

---

## 🐛 عیب‌یابی

### خطا: "Build failed"

**راه‌حل:**
```bash
# در local تست کنید:
npm install
npm run build

# اگر موفق بود، مشکل از Vercel نیست
```

### خطا: "Output directory not found"

**راه‌حل:**
- مطمئن شوید `output: 'export'` در next.config.mjs وجود دارد
- Vercel خودش پوشه `out` را میسازد

### خطا: "Image optimization not available"

**راه‌حل:**
- مطمئن شوید `images.unoptimized: true` تنظیم شده
- این برای static export ضروری است

### خطا: "API routes not supported"

**راه‌حل:**
- Static export از API routes پشتیبانی نمیکند
- پروژه شما API route ندارد، پس مشکلی نیست

---

## 📊 مقایسه Static Export vs SSR

| ویژگی | Static Export | SSR |
|-------|--------------|-----|
| Build Command | `next build` | `next build` |
| Output | پوشه `out` | Server Runtime |
| API Routes | ❌ | ✅ |
| Server Components | ❌ | ✅ |
| Image Optimization | ❌ (unoptimized) | ✅ |
| Hosting | هر جا | فقط Vercel/Node |
| سرعت | ⚡ خیلی سریع | 🚀 سریع |

**پروژه شما:** Static Export ✅

---

## 🎉 پس از Deploy موفق

پس از Deploy موفق:
1. لینک پروژه شما: `https://lepetit-xxx.vercel.app`
2. هر push به GitHub، خودکار deploy میشود
3. میتوانید Custom Domain اضافه کنید

---

## 📞 پشتیبانی

اگر مشکلی پیش آمد:
1. لاگ‌های Build را در Vercel بررسی کنید
2. مطمئن شوید Build در local کار میکند
3. تنظیمات را با این راهنما مقایسه کنید

---

**موفق باشید! 🚀**

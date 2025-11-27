# 🔍 راهنمای کامل Google Search Console

## 📋 مراحل ثبت سایت در Google Search Console

### مرحله 1️⃣: ورود به Google Search Console

1. به آدرس زیر بروید:
   ```
   https://search.google.com/search-console
   ```

2. با حساب Google خود وارد شوید

---

### مرحله 2️⃣: افزودن Property

1. کلیک روی **Add Property**

2. انتخاب نوع:
   - **Domain** (توصیه میشود) - برای تمام نسخهها
   - **URL Prefix** - فقط برای یک نسخه

3. وارد کردن دامنه:
   ```
   lepetit-isenburg.de
   ```

---

### مرحله 3️⃣: تایید مالکیت (4 روش)

#### روش 1: HTML File (ساده‌ترین) ✅

1. فایل تایید را دانلود کنید (مثال: `google123abc.html`)

2. فایل را در پوشه `public/` قرار دهید

3. Build مجدد:
   ```bash
   npm run build
   ```

4. آپلود به هاست:
   ```
   فایل باید در: public_html/google123abc.html
   ```

5. تست:
   ```
   https://lepetit-isenburg.de/google123abc.html
   ```

6. کلیک روی **Verify**

---

#### روش 2: HTML Tag

1. کد Meta Tag را کپی کنید:
   ```html
   <meta name="google-site-verification" content="YOUR_CODE" />
   ```

2. فایل `app/layout.tsx` را باز کنید

3. در بخش `<head>` اضافه کنید:
   ```typescript
   export const metadata = {
     verification: {
       google: 'YOUR_CODE',
     },
   }
   ```

4. Build و آپلود کنید

---

#### روش 3: DNS Record (حرفه‌ای) ✅

1. کد TXT Record را کپی کنید

2. به Namecheap → Domain → Advanced DNS بروید

3. Add New Record:
   ```
   Type: TXT
   Host: @
   Value: google-site-verification=YOUR_CODE
   TTL: Automatic
   ```

4. Save Changes

5. صبر کنید (5-30 دقیقه)

6. Verify کنید

---

#### روش 4: Google Analytics

اگر Google Analytics دارید، خودکار تایید میشود.

---

### مرحله 4️⃣: ثبت Sitemap

بعد از تایید:

1. از منوی چپ **Sitemaps** را انتخاب کنید

2. در قسمت **Add a new sitemap** وارد کنید:
   ```
   sitemap.xml
   ```

3. کلیک روی **Submit**

4. وضعیت را چک کنید:
   - ✅ Success - عالی!
   - ⚠️ Couldn't fetch - چند دقیقه صبر کنید

---

## 📄 Sitemap شما

### محتوای Sitemap:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- صفحه اصلی -->
  <url>
    <loc>https://lepetit-isenburg.de</loc>
    <lastmod>2025-01-XX</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- محصولات -->
  <url>
    <loc>https://lepetit-isenburg.de/luxury-products</loc>
    <lastmod>2025-01-XX</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- درباره ما -->
  <url>
    <loc>https://lepetit-isenburg.de/about</loc>
    <lastmod>2025-01-XX</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- تماس -->
  <url>
    <loc>https://lepetit-isenburg.de/contact</loc>
    <lastmod>2025-01-XX</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- موقعیت -->
  <url>
    <loc>https://lepetit-isenburg.de/location</loc>
    <lastmod>2025-01-XX</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- 58 صفحه محصول -->
  <url>
    <loc>https://lepetit-isenburg.de/luxury-products/p7</loc>
    <lastmod>2025-01-XX</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- ... 57 محصول دیگر -->
  
</urlset>
```

**تعداد کل URL:** 63 صفحه

---

## 🔧 تنظیمات بعد از ثبت

### 1. URL Inspection

تست کنید که Google صفحات را میبیند:

1. URL Inspection Tool
2. وارد کردن URL
3. **Request Indexing**

صفحات مهم:
- https://lepetit-isenburg.de
- https://lepetit-isenburg.de/luxury-products
- https://lepetit-isenburg.de/about
- https://lepetit-isenburg.de/contact

---

### 2. Coverage Report

بررسی صفحات ایندکس شده:

- **Valid:** صفحات موفق ✅
- **Error:** خطاها ❌
- **Excluded:** صفحات حذف شده
- **Valid with warnings:** هشدارها ⚠️

---

### 3. Performance

بررسی:
- تعداد کلیک
- تعداد نمایش
- CTR
- موقعیت متوسط

---

### 4. Mobile Usability

تست موبایل فرندلی بودن:
- ✅ سایت شما موبایل فرندلی است

---

## 📊 بهینه‌سازی SEO

### Meta Tags (در layout.tsx)

```typescript
export const metadata = {
  title: 'Le Petit - محصولات نوزاد و کودک | Baby & Kids Products',
  description: 'فروشگاه Le Petit در Neu-Isenburg - محصولات باکیفیت نوزاد و کودک',
  keywords: 'نوزاد, کودک, لوازم نوزاد, baby products, kids products',
  authors: [{ name: 'Le Petit' }],
  openGraph: {
    title: 'Le Petit - Baby & Kids Products',
    description: 'محصولات باکیفیت نوزاد و کودک',
    url: 'https://lepetit-isenburg.de',
    siteName: 'Le Petit',
    images: [
      {
        url: 'https://lepetit-isenburg.de/images/logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Petit - Baby & Kids Products',
    description: 'محصولات باکیفیت نوزاد و کودک',
    images: ['https://lepetit-isenburg.de/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}
```

---

## 🎯 کلمات کلیدی

### فارسی:
- لوازم نوزاد
- محصولات کودک
- فروشگاه نوزاد
- لوازم بچه
- محصولات نوزاد

### آلمانی:
- Baby Produkte
- Kinder Produkte
- Baby Shop
- Kinderkleidung
- Baby Zubehör

### انگلیسی:
- Baby products
- Kids products
- Baby shop
- Children's products
- Baby accessories

---

## 📈 نظارت و گزارش‌گیری

### هفتگی:
- ✅ بررسی Coverage Report
- ✅ چک کردن خطاها
- ✅ بررسی Performance

### ماهانه:
- ✅ تحلیل کلمات کلیدی
- ✅ بررسی موقعیت
- ✅ بهینه‌سازی محتوا

---

## 🔗 لینک‌های مفید

### Google Tools:
- **Search Console:** https://search.google.com/search-console
- **Analytics:** https://analytics.google.com
- **PageSpeed Insights:** https://pagespeed.web.dev
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly

### Namecheap:
- **cPanel:** https://cpanel.namecheap.com
- **DNS Management:** Namecheap Dashboard

---

## ⚠️ نکات مهم

### ✅ انجام دهید:
- Sitemap را بروز نگه دارید
- محتوای باکیفیت تولید کنید
- سرعت سایت را بهینه کنید
- موبایل فرندلی باشید
- SSL فعال باشد

### ❌ انجام ندهید:
- محتوای تکراری
- کلمات کلیدی اضافی
- لینک‌های شکسته
- محتوای اسپم
- خرید بک‌لینک

---

## 🆘 رفع مشکلات

### مشکل: Sitemap قابل دسترس نیست

**راهحل:**
```
1. چک کنید: https://lepetit-isenburg.de/sitemap.xml
2. فایل را در public_html قرار دهید
3. دسترسی 644 تنظیم کنید
4. کش را پاک کنید
```

### مشکل: صفحات ایندکس نمیشوند

**راهحل:**
```
1. robots.txt را چک کنید
2. URL Inspection کنید
3. Request Indexing کنید
4. صبر کنید (1-2 هفته)
```

### مشکل: Coverage Errors

**راهحل:**
```
1. خطاها را بخوانید
2. صفحات را تست کنید
3. مشکلات را برطرف کنید
4. دوباره Submit کنید
```

---

## 📊 انتظارات زمانی

| مرحله | زمان |
|-------|------|
| تایید مالکیت | فوری |
| ثبت Sitemap | فوری |
| اولین Crawl | 1-3 روز |
| ایندکس کامل | 1-2 هفته |
| نمایش در نتایج | 2-4 هفته |

---

## ✅ چک لیست نهایی

- [ ] ثبت در Search Console
- [ ] تایید مالکیت
- [ ] ثبت Sitemap
- [ ] تست URL Inspection
- [ ] بررسی Coverage
- [ ] تنظیم Analytics
- [ ] بهینه‌سازی Meta Tags
- [ ] تست Mobile-Friendly
- [ ] فعال‌سازی SSL
- [ ] بررسی PageSpeed

---

## 🎉 تبریک!

سایت شما در Google Search Console ثبت شد و آماده ایندکس شدن است!

**زمان تخمینی:** 1-2 هفته تا نمایش کامل در نتایج جستجو

---

**آخرین بروزرسانی:** 2025
**وضعیت:** ✅ آماده ثبت

# 🔧 راهنمای رفع مشکلات - Troubleshooting Guide

## 🚨 مشکلات رایج و راه حلهای قطعی

---

## 1️⃣ صفحات بدون استایل (No CSS)

### علائم:
- صفحه باز میشود اما سفید است
- متنها بدون طراحی نمایش داده میشوند
- دکمهها و منوها شکل ندارند

### تشخیص:
1. F12 را بزنید
2. Console را باز کنید
3. اگر خطاهای زیر را دیدید:
   ```
   Failed to load resource: net::ERR_FILE_NOT_FOUND
   /_next/static/css/app/layout.css
   ```

### راه حل:

#### گام 1: بررسی فایلهای CSS
```bash
# چک کنید این فایلها وجود دارند:
out/_next/static/css/
```

#### گام 2: بررسی مجوزها
در cPanel یا FTP:
- فایلها: 644
- فولدرها: 755

#### گام 3: بررسی .htaccess
مطمئن شوید فایل `.htaccess` در root آپلود شده.

#### گام 4: پاک کردن Cache
- Cache مرورگر را پاک کنید (Ctrl+Shift+Delete)
- اگر از Cloudflare استفاده میکنید، cache آن را پاک کنید

#### گام 5: Build مجدد
```bash
# فولدر out را پاک کنید
rmdir /s /q out
# Build مجدد
npm run build
# دوباره آپلود کنید
```

---

## 2️⃣ تصاویر نمایش داده نمیشوند

### علائم:
- جای تصاویر خالی است
- آیکون broken image نمایش داده میشود

### تشخیص:
F12 → Network → Images
اگر تصاویر 404 هستند:

### راه حل:

#### گام 1: بررسی مسیرها
```javascript
// مسیرهای صحیح:
/images/hero-products.jpg  ✅
./images/hero-products.jpg ❌
images/hero-products.jpg   ❌
```

#### گام 2: بررسی فولدر images
```
out/
└── images/
    ├── hero-products.jpg
    ├── luxury-collection.jpg
    ├── modern-skincare.jpg
    ├── pink-collection.jpg
    └── product-flat-lay.jpg
```

#### گام 3: بررسی نام فایلها
- نامها case-sensitive هستند
- `Hero-Products.jpg` ≠ `hero-products.jpg`

#### گام 4: مجوزها
```bash
chmod 755 images/
chmod 644 images/*.jpg
```

---

## 3️⃣ صفحه 404 Not Found

### علائم:
- صفحه اصلی باز میشود اما صفحات دیگر 404 میدهند
- `/products/` یا `/about/` کار نمیکند

### راه حل:

#### گام 1: بررسی .htaccess
فایل `.htaccess` باید در root باشد:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /$1.html [L]
```

#### گام 2: فعال کردن mod_rewrite
در cPanel:
1. Software → Select PHP Version
2. Extensions → mod_rewrite را فعال کنید

#### گام 3: بررسی ساختار فایلها
```
out/
├── index.html
├── about.html
├── contact.html
├── products.html
└── products/
    └── index.html
```

---

## 4️⃣ فونتها لود نمیشوند

### علائم:
- فونتها به صورت پیشفرض نمایش داده میشوند
- فونت فارسی درست نیست

### راه حل:

#### گام 1: بررسی فایلهای فونت
```
out/_next/static/media/
├── 17cf9497af825577-s.woff2
├── 28a2004cf8372660-s.woff2
└── ...
```

#### گام 2: تنظیم MIME Types
در cPanel → MIME Types:
```
.woff  → font/woff
.woff2 → font/woff2
.ttf   → font/ttf
.eot   → application/vnd.ms-fontobject
```

#### گام 3: بررسی .htaccess
```apache
<IfModule mod_mime.c>
  AddType font/woff .woff
  AddType font/woff2 .woff2
</IfModule>
```

---

## 5️⃣ لینکها کار نمیکنند

### علائم:
- کلیک روی لینکها صفحه را refresh میکند
- لینکها به صفحه 404 میروند

### راه حل:

#### گام 1: بررسی trailing slash
در `next.config.mjs`:
```javascript
trailingSlash: true
```

#### گام 2: بررسی لینکها در کد
```javascript
// صحیح:
<Link href="/products/">Products</Link>

// اشتباه:
<Link href="/products">Products</Link>
```

---

## 6️⃣ سایت خیلی کند است

### راه حلها:

#### گام 1: فعال کردن Compression
در `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript
</IfModule>
```

#### گام 2: Browser Caching
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
</IfModule>
```

#### گام 3: استفاده از CDN
- Cloudflare (رایگان)
- BunnyCDN
- KeyCDN

---

## 7️⃣ خطای "Mixed Content"

### علائم:
```
Mixed Content: The page was loaded over HTTPS, but requested an insecure resource
```

### راه حل:

#### گام 1: فعال کردن SSL
در cPanel → SSL/TLS

#### گام 2: Force HTTPS
در `.htaccess`:
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 8️⃣ خطای "CORS"

### علائم:
```
Access to fetch has been blocked by CORS policy
```

### راه حل:
در `.htaccess`:
```apache
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
</IfModule>
```

---

## 9️⃣ صفحه سفید (White Screen)

### تشخیص:
F12 → Console
خطاها را بخوانید

### راه حلهای احتمالی:

#### 1. خطای JavaScript
- Build مجدد کنید
- Cache را پاک کنید

#### 2. خطای PHP
- PHP version را چک کنید (7.4+)
- Error reporting را فعال کنید

#### 3. خطای Memory
در `.htaccess`:
```apache
php_value memory_limit 256M
```

---

## 🔍 ابزارهای تشخیص

### 1. Browser Console
```
F12 → Console
```
خطاهای JavaScript را نشان میدهد

### 2. Network Tab
```
F12 → Network
```
فایلهای 404 را نشان میدهد

### 3. Lighthouse
```
F12 → Lighthouse → Generate Report
```
مشکلات Performance را نشان میدهد

### 4. GTmetrix
```
https://gtmetrix.com
```
سرعت سایت را تست میکند

---

## 📞 کمک بیشتر

اگر هیچکدام از راه حلها کار نکرد:

### 1. اطلاعات مورد نیاز:
- آدرس سایت
- Screenshot از Console (F12)
- Screenshot از Network tab
- نوع هاست (Shared/VPS/Cloud)
- نام شرکت هاستینگ

### 2. تست محلی:
```bash
# تست در کامپیوتر خودتان:
npm run build
cd out
python -m http.server 8000
# باز کنید: http://localhost:8000
```

اگر محلی کار میکند اما روی هاست نه، مشکل از تنظیمات هاست است.

---

## ✅ چک لیست نهایی

قبل از تماس با پشتیبانی، این موارد را چک کنید:

- [ ] Build موفق بود (بدون خطا)
- [ ] فولدر `out` کامل است
- [ ] تمام فایلها آپلود شدند
- [ ] مجوزها درست هستند (644/755)
- [ ] `.htaccess` آپلود شده
- [ ] mod_rewrite فعال است
- [ ] SSL فعال است (اگر لازم است)
- [ ] Cache پاک شده
- [ ] در مرورگر دیگری تست شده

---

**موفق باشید! 💪**

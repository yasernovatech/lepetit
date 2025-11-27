# راهنمای آپلود سایت به هاست

## مراحل آماده‌سازی و آپلود

### 1️⃣ ساخت فایلهای استاتیک
```bash
# روی فایل build-and-deploy.bat دابل کلیک کنید
# یا در ترمینال اجرا کنید:
npm run build
```

### 2️⃣ بررسی فولدر `out`
بعد از build موفق، فولدر `out` ایجاد میشود که شامل:
- `index.html` - صفحه اصلی
- `_next/` - فایلهای JavaScript و CSS
- `_next/static/css/` - فایلهای استایل
- `_next/static/chunks/` - فایلهای JavaScript
- `images/` - تصاویر سایت
- `.nojekyll` - فایل کانفیگ

### 3️⃣ آپلود به هاست

#### روش 1: FTP/SFTP (FileZilla)
1. به هاست خود متصل شوید
2. به پوشه `public_html` یا `www` بروید
3. **تمام محتویات** فولدر `out` را آپلود کنید (نه خود فولدر out)
4. مطمئن شوید این فایلها آپلود شدند:
   - `index.html`
   - فولدر `_next/`
   - فولدر `images/`
   - `.nojekyll`

#### روش 2: cPanel File Manager
1. وارد cPanel شوید
2. File Manager را باز کنید
3. به `public_html` بروید
4. تمام فایلهای قدیمی را پاک کنید
5. محتویات فولدر `out` را آپلود کنید

### 4️⃣ تنظیمات مهم هاست

#### فایل .htaccess (برای Apache)
اگر سرور شما Apache است، این فایل را در root ایجاد کنید:

```apache
# Enable rewrite engine
RewriteEngine On

# Redirect to HTTPS (optional)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle Next.js routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /$1.html [L]

# Cache static assets
<FilesMatch "\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Compress files
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

### 5️⃣ بررسی مشکلات رایج

#### ❌ مشکل: صفحات بدون استایل
**راه حل:**
- مطمئن شوید فولدر `_next` کامل آپلود شده
- فایلهای CSS در `_next/static/css/` موجود باشند
- مسیرها با `/` شروع نشوند (relative paths)

#### ❌ مشکل: تصاویر نمایش داده نمیشوند
**راه حل:**
- فولدر `images` در root آپلود شده باشد
- مجوزهای فایلها 644 و فولدرها 755 باشد

#### ❌ مشکل: صفحه 404
**راه حل:**
- فایل `.htaccess` را اضافه کنید
- مطمئن شوید `index.html` در root است

#### ❌ مشکل: فونتها لود نمیشوند
**راه حل:**
- فایلهای فونت در `_next/static/media/` باشند
- MIME types در هاست درست تنظیم شده باشند

### 6️⃣ تست سایت

بعد از آپلود:
1. صفحه اصلی را باز کنید
2. F12 را بزنید و Console را چک کنید
3. Network tab را بررسی کنید - همه فایلها باید 200 OK باشند
4. صفحات مختلف را تست کنید

### 7️⃣ بهینه‌سازی

- **Gzip Compression**: در cPanel فعال کنید
- **Browser Caching**: از .htaccess استفاده کنید
- **CDN**: برای سرعت بیشتر از Cloudflare استفاده کنید

## پشتیبانی

اگر مشکلی داشتید:
1. Console browser را چک کنید (F12)
2. مسیرهای فایلها را بررسی کنید
3. مجوزهای فایلها را چک کنید (644 برای فایلها، 755 برای فولدرها)

---

**نکته مهم:** هر بار که تغییری در کد دادید، باید دوباره `npm run build` کنید و فایلهای جدید را آپلود کنید.

# راهنمای آپلود سایت به هاست

## مرحله 1: آماده‌سازی فایلها
✅ بیلد سایت با دستور `npm run build` انجام شد
✅ تمام فایلهای آماده در پوشه `out` قرار دارند

## مرحله 2: آپلود به هاست

### روش 1: آپلود مستقیم با FTP
1. به پنل هاست خود وارد شوید
2. از FileManager یا FTP Client (مثل FileZilla) استفاده کنید
3. تمام محتویات پوشه `out` را به ریشه سایت (public_html یا www) آپلود کنید

### روش 2: فشرده‌سازی و آپلود
1. پوشه `out` را به فرمت ZIP فشرده کنید
2. فایل ZIP را به هاست آپلود کنید
3. در پنل هاست، فایل را Extract کنید

## مرحله 3: تنظیمات هاست

### فایل .htaccess (برای Apache)
در ریشه سایت، فایل `.htaccess` با محتوای زیر ایجاد کنید:

```apache
# Enable Rewrite Engine
RewriteEngine On

# Redirect to HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle /out prefix
RewriteBase /out/

# Remove trailing slash
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [L,R=301]

# Serve static files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /out/index.html [L]

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Compress files
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

## مرحله 4: بررسی سایت
1. به آدرس دامنه خود بروید
2. تمام صفحات را تست کنید
3. تصاویر و لوگو را بررسی کنید
4. تغییر زبان را امتحان کنید

## نکات مهم:
- ✅ تمام فایلهای پوشه `out` باید آپلود شوند
- ✅ ساختار پوشه‌ها باید حفظ شود
- ✅ فایل .htaccess را فراموش نکنید
- ✅ SSL/HTTPS را فعال کنید
- ✅ کش مرورگر را پاک کنید (Ctrl+Shift+R)

## آدرس سایت:
- دامنه: [آدرس دامنه شما]
- ایمیل: info@lepetitisenburg.de
- تلفن: +49 152 09726688
- آدرس: Friedhofstrasse 23, 63263 Neu-Isenburg

## پشتیبانی:
اگر مشکلی پیش آمد، این موارد را بررسی کنید:
1. آیا تمام فایلها آپلود شدند؟
2. آیا فایل .htaccess درست است؟
3. آیا مجوزهای فایلها (permissions) درست است؟ (755 برای پوشه‌ها، 644 برای فایلها)
4. آیا SSL فعال است؟

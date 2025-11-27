const fs = require('fs');
const path = require('path');

const imagePath = './public/images/L.webp';

try {
  const stats = fs.statSync(imagePath);
  
  console.log('=== تحلیل فایل تصویر ===');
  console.log('نام فایل:', path.basename(imagePath));
  console.log('حجم فایل:', (stats.size / 1024).toFixed(2), 'KB');
  console.log('تاریخ ایجاد:', stats.birthtime);
  console.log('آخرین تغییر:', stats.mtime);
  console.log('فرمت:', path.extname(imagePath));
  
  // خواندن بایت‌های اولیه برای بررسی header
  const buffer = fs.readFileSync(imagePath);
  console.log('اندازه buffer:', buffer.length, 'bytes');
  console.log('Header bytes:', buffer.slice(0, 16).toString('hex'));
  
} catch (error) {
  console.error('خطا در خواندن فایل:', error.message);
}
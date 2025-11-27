@echo off
echo ====================================
echo Building website for Namecheap...
echo ====================================
echo.

echo Step 1: Installing dependencies...
call npm install
echo.

echo Step 2: Building project...
call npm run build
echo.

echo Step 3: Build completed!
echo.
echo ====================================
echo Next steps:
echo 1. Go to the 'out' folder
echo 2. Upload all files to public_html in cPanel
echo 3. Visit your domain to test
echo ====================================
echo.

pause

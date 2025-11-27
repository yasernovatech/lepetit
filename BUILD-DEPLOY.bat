@echo off
echo ========================================
echo   Le Petit - Build and Deploy Script
echo ========================================
echo.

echo [1/5] Cleaning old build...
if exist out rmdir /s /q out
if exist .next rmdir /s /q .next
echo Done!
echo.

echo [2/5] Installing dependencies...
call npm install
echo Done!
echo.

echo [3/5] Building website...
call npm run build
echo Done!
echo.

echo [4/5] Copying .htaccess...
copy .htaccess out\.htaccess
echo Done!
echo.

echo [5/5] Creating upload package...
if exist lepetit-upload.zip del lepetit-upload.zip
powershell Compress-Archive -Path out\* -DestinationPath lepetit-upload.zip
echo Done!
echo.

echo ========================================
echo   BUILD COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo Next Steps:
echo 1. Upload 'lepetit-upload.zip' to cPanel
echo 2. Extract in public_html folder
echo 3. Visit your website!
echo.
echo Website: https://your-domain.com
echo Admin Panel: https://your-domain.com/admin
echo Password: lepetit2025
echo.
pause

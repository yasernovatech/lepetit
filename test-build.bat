@echo off
echo ====================================
echo Testing Build Output
echo ====================================
echo.

if not exist out (
    echo ERROR: 'out' folder does not exist!
    echo Please run build-and-deploy.bat first.
    echo.
    pause
    exit /b 1
)

echo Checking build output...
echo.

echo [1] Checking index.html...
if exist out\index.html (
    echo    ✓ index.html found
) else (
    echo    ✗ index.html NOT found
)

echo [2] Checking _next folder...
if exist out\_next (
    echo    ✓ _next folder found
) else (
    echo    ✗ _next folder NOT found
)

echo [3] Checking CSS files...
if exist out\_next\static\css (
    echo    ✓ CSS folder found
    dir /b out\_next\static\css\*.css 2>nul | find /c /v "" > temp.txt
    set /p count=<temp.txt
    del temp.txt
    echo    Found CSS files
) else (
    echo    ✗ CSS folder NOT found
)

echo [4] Checking images folder...
if exist out\images (
    echo    ✓ images folder found
) else (
    echo    ✗ images folder NOT found
)

echo [5] Checking .htaccess...
if exist out\.htaccess (
    echo    ✓ .htaccess found
) else (
    echo    ⚠ .htaccess NOT found (optional)
)

echo [6] Checking .nojekyll...
if exist out\.nojekyll (
    echo    ✓ .nojekyll found
) else (
    echo    ⚠ .nojekyll NOT found (optional)
)

echo.
echo ====================================
echo Build Test Complete
echo ====================================
echo.
echo If all checks passed, you can upload the 'out' folder to your hosting.
echo.
pause

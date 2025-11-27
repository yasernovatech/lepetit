@echo off
echo Converting images to WebP format...

REM Check if cwebp is available
where cwebp >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: cwebp not found. Please install WebP tools from Google.
    echo Download from: https://developers.google.com/speed/webp/download
    pause
    exit /b 1
)

REM Convert JPG images to WebP
for %%f in (public\images\*.jpg) do (
    echo Converting %%f to WebP...
    cwebp -q 80 "%%f" -o "%%~dpnf.webp"
)

REM Convert PNG images to WebP  
for %%f in (public\images\*.png) do (
    echo Converting %%f to WebP...
    cwebp -q 80 "%%f" -o "%%~dpnf.webp"
)

echo Conversion completed!
echo Original images preserved, WebP versions created alongside them.
pause
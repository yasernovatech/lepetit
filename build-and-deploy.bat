@echo off
echo ====================================
echo Building Next.js site for production
echo ====================================
echo.

REM Clean previous build
echo [1/4] Cleaning previous build...
if exist out rmdir /s /q out
if exist .next rmdir /s /q .next
echo Previous build cleaned.
echo.

REM Install dependencies
echo [2/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo Dependencies installed successfully.
echo.

REM Build the project
echo [3/4] Building project...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo Build completed successfully!
echo.

REM Copy .nojekyll to out folder
echo [4/4] Copying configuration files...
if exist .nojekyll copy .nojekyll out\.nojekyll
echo Configuration files copied.
echo.

echo ====================================
echo BUILD SUCCESSFUL!
echo ====================================
echo.
echo Upload the 'out' folder to your hosting provider.
echo.
echo Files ready for hosting are in: out\
echo.
echo IMPORTANT NOTES:
echo - Upload ALL files from 'out' folder to your hosting root directory
echo - Make sure .nojekyll file is uploaded
echo - Check that _next folder is uploaded correctly
echo - Verify CSS files are in _next/static/css/
echo.
pause
@echo off
echo ====================================
echo Quick Build and Local Test
echo ====================================
echo.

echo [1/3] Building project...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo Build completed!
echo.

echo [2/3] Testing build output...
call test-build.bat
echo.

echo [3/3] Starting local server...
echo.
echo Opening browser at http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

cd out
start http://localhost:8000
python -m http.server 8000 2>nul || python -m SimpleHTTPServer 8000 2>nul || (
    echo Python not found. Install Python or use another local server.
    echo You can manually open out/index.html in your browser.
    pause
)

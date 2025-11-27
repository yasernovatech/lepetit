@echo off
echo Killing all Node.js and Next.js processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im npm.exe 2>nul
taskkill /f /im next.exe 2>nul
echo Processes killed successfully!
pause
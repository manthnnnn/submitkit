@echo off
setlocal EnableDelayedExpansion
title DevForge Cloud IDE - SubmitKit

color 0D
cls
echo.
echo  ============================================================
echo   DEVFORGE CLOUD SANDBOX ^& AI CODE DOCTOR
echo   Academic Project Bundle ^| SubmitKit.in
echo  ============================================================
echo.

echo [CHECK] Verifying Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Node.js not found! Install from: https://nodejs.org/en/download
    pause & exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo [OK] Node.js %NODE_VER% detected.
echo.

echo [CHECK] Verifying dependencies...
if not exist "node_modules\" (
    echo [SETUP] Installing packages (~30-60s)...
    call npm install --no-audit --no-fund --loglevel=error
    if %errorlevel% neq 0 ( echo [ERROR] Install failed. pause & exit /b 1 )
    echo [OK] Done.
) else (
    echo [OK] Dependencies already installed.
)
echo.

echo [START] Launching DevForge IDE on port 3006...
echo.
echo  ============================================================
echo   PROJECT:    http://localhost:3006
echo   DASHBOARD:  http://localhost:3006/dashboard
echo.
echo   Run JavaScript, Python (simulated) and SQL in the browser.
echo   Keep this window open. Press Ctrl+C to stop.
echo  ============================================================
echo.

start "" "http://localhost:3006"
call npm run dev -- -p 3006 -H 0.0.0.0
echo.
pause >nul

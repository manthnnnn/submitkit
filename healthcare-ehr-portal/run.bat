@echo off
setlocal EnableDelayedExpansion
title HealthSync EHR Portal - SubmitKit

color 0B
cls
echo.
echo  ============================================================
echo   HEALTHSYNC EHR ^& TELEHEALTH PORTAL
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
if not exist "node_modules" (
    echo [SETUP] Installing packages (~30-60s)...
    call npm install --no-audit --no-fund --loglevel=error
    if %errorlevel% neq 0 ( echo [ERROR] Install failed. pause & exit /b 1 )
    echo [OK] Done.
) else (
    echo [OK] Dependencies already installed.
)
echo.

echo [START] Launching HealthSync EHR on port 3003...
echo.
echo  ============================================================
echo   PROJECT:    http://localhost:3003
echo   DASHBOARD:  http://localhost:3003/dashboard
echo   RECORDS:    http://localhost:3003/records
echo.
echo   Keep this window open. Press Ctrl+C to stop.
echo  ============================================================
echo.

start "" "http://localhost:3003"
call npm run dev -- -p 3003 -H 0.0.0.0
echo.
pause >nul


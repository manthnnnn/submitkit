@echo off
setlocal EnableDelayedExpansion
title PhishGuard AI Threat Radar - SubmitKit

color 0A
cls
echo.
echo  ============================================================
echo   PHISHGUARD AI - Zero-Day Phishing Detection Engine
echo   Academic Project Bundle ^| SubmitKit.in
echo  ============================================================
echo.

echo [CHECK] Verifying Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Node.js not found on your system!
    echo.
    echo  Please install Node.js LTS from: https://nodejs.org/en/download
    echo  Then double-click this run.bat file again.
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo [OK] Node.js %NODE_VER% detected.
echo.

echo [CHECK] Verifying dependencies...
if not exist "node_modules" (
    echo [SETUP] First-time setup detected. Installing packages...
    echo [INFO]  This takes 30-60 seconds only on the very first run.
    echo.
    call npm install --no-audit --no-fund --loglevel=error
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Package installation failed. Check your internet connection.
        pause
        exit /b 1
    )
    echo [OK] Packages installed successfully.
) else (
    echo [OK] Dependencies already installed.
)
echo.

echo [START] Launching PhishGuard AI on port 3008...
echo.
echo  ============================================================
echo   PROJECT RUNNING AT: http://localhost:3008
echo   DASHBOARD:          http://localhost:3008/dashboard
echo.
echo   Keep this window open while using the project.
echo   Press Ctrl+C to stop the server.
echo  ============================================================
echo.

start "" "http://localhost:3008"
call npm run dev -- -p 3008 -H 0.0.0.0
echo.
echo Server stopped. Press any key to exit.
pause >nul


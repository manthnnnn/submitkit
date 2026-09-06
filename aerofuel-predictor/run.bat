@echo off
setlocal EnableDelayedExpansion
title AeroFuel Predictor AI - SubmitKit

color 0A
cls
echo.
echo  ============================================================
echo   AEROFUEL PREDICTOR AI
echo   Aviation Fuel Burn ^& Route Optimization Engine
echo   Academic Project Bundle ^| SubmitKit.in
echo  ============================================================
echo.

echo [CHECK] Verifying Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Node.js not found on your system!
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
if not exist "node_modules\.bin\next" (
    echo [SETUP] First-time setup. Installing packages ~30-60s...
    call npm install --no-audit --no-fund --loglevel=error
    if %errorlevel% neq 0 (
        echo [ERROR] Package install failed. Check internet connection.
        pause
        exit /b 1
    )
    echo [OK] Packages installed.
) else (
    echo [OK] Dependencies already installed.
)
echo.

echo [START] Launching AeroFuel Predictor on port 3010...
echo.
echo  ============================================================
echo   PROJECT RUNNING AT:  http://localhost:3010
echo   DASHBOARD:           http://localhost:3010/dashboard
echo   ANALYTICS:           http://localhost:3010/analytics
echo.
echo   Keep this window open during your presentation.
echo   Press Ctrl+C to stop the server.
echo  ============================================================
echo.

start "" "http://localhost:3010"
call npm run dev -- -p 3010 -H 0.0.0.0
echo.
pause >nul


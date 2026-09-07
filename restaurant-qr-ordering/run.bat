@echo off
setlocal EnableDelayedExpansion
title QR Code Restaurant Ordering - Bootstrapper

echo ===================================================
echo    BITEQR - RESTAURANT QR ORDERING SYSTEM
echo    Automated Startup Script
echo ===================================================
echo.

goto check_node

:check_node
echo [STEP 1/4] Checking Node.js installation...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed! Please install Node.js from https://nodejs.org
    pause
    exit /b
)
echo [OK] Node.js is installed.
echo.
goto check_modules

:check_modules
echo [STEP 2/4] Checking dependencies (node_modules)...
if not exist "node_modules" (
    echo [INFO] First time setup detected! Installing dependencies silently...
    echo [INFO] Please wait 30-60 seconds while packages are prepared.
    call npm install --no-audit --no-fund --loglevel=error
    echo [OK] All dependencies successfully installed.
) else (
    echo [OK] Dependencies already installed.
)
echo.
goto setup_db

:setup_db
echo [STEP 3/4] Initializing Database...
if not exist "prisma\dev.db" (
    echo [INFO] Database not found. Generating Prisma client and seeding database...
    call npx prisma generate
    call npx prisma db push
    call node prisma/seed.js
    echo [OK] Database seeded successfully.
) else (
    echo [OK] Database already exists.
)
echo.
goto start_server

:start_server
echo [STEP 4/4] Starting LuxeBite Server on port 3002 (bound to 0.0.0.0 for LAN/mobile)...
echo.
echo ===================================================
echo    LUXEBITE DINING ECOSYSTEM BOOTED
echo    
echo    PROJECT PORTAL:   http://localhost:3002
echo    CUSTOMER MENU:    http://localhost:3002/m/spice-lounge?table=1
echo    KITCHEN KDS:      http://localhost:3002/admin/spice-lounge/kds
echo    TABLE QR PRINT:   http://localhost:3002/admin/spice-lounge
echo ===================================================
echo.
echo [NOTE] This is a local demo. To test on a phone, ensure both
echo devices share the same Wi-Fi or mobile hotspot.
echo.
start http://localhost:3002
call npm run dev -- -p 3002 -H 0.0.0.0


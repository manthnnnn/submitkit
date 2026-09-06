@echo off
setlocal EnableDelayedExpansion
title TalentScan AI Resume Parser - SubmitKit

color 0A
cls
echo.
echo  ============================================================
echo   TALENTSCAN AI - ATS ^& Resume Parsing Engine
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
if not exist "node_modules\.bin\next" (
    echo [SETUP] Installing packages (~30-60s)...
    call npm install --no-audit --no-fund --loglevel=error
    if %errorlevel% neq 0 ( echo [ERROR] Install failed. pause & exit /b 1 )
    echo [OK] Done.
) else (
    echo [OK] Dependencies already installed.
)
echo.

echo [START] Launching TalentScan on port 3005...
echo.
echo  ============================================================
echo   PROJECT:      http://localhost:3005
echo   DASHBOARD:    http://localhost:3005/dashboard
echo   CANDIDATES:   http://localhost:3005/candidates
echo   JOB MATCHER:  http://localhost:3005/matcher
echo   INTERVIEW:    http://localhost:3005/interview
echo.
echo   Keep this window open. Press Ctrl+C to stop.
echo  ============================================================
echo.

start "" "http://localhost:3005"
call npm run dev -- -p 3005 -H 0.0.0.0
echo.
pause >nul


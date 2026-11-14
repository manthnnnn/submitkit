@echo off
title Autonomous Llm Researcher - SubmitKit Launcher
cls
echo ========================================================
echo        AUTONOMOUS LLM RESEARCHER
echo               SubmitKit 1-Click Launcher
echo ========================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/ (LTS version recommended)
    pause
    exit /b 1
)

if not exist node_modules (
    echo [*] First-time setup detected. Installing packages...
    call npm install
)

if exist prisma (
    echo [*] Initializing local database...
    call npx prisma db push --skip-generate 2>nul
    call npx prisma generate 2>nul
)

echo [*] Starting development server on http://localhost:3000...
start http://localhost:3000
call npm run dev

pause

@echo off
title Sentiment Analysis Dashboard - SubmitKit Launcher
cls
echo ========================================================
echo        SENTIMENT ANALYSIS DASHBOARD
echo        SubmitKit 1-Click Python/AI Launcher
echo ========================================================
echo.

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH!
    echo Please install Python 3.9+ from https://www.python.org/
    echo Make sure to check "Add Python to PATH" during installation.
    pause
    exit /b 1
)

if not exist venv (
    echo [*] Setting up Python virtual environment...
    python -m venv venv
)

echo [*] Activating virtual environment...
call venv\Scripts\activate

if exist requirements.txt (
    echo [*] Checking and installing dependencies...
    pip install -r requirements.txt
)

echo [*] Starting application server on http://localhost:5000...
start http://localhost:5000

if exist app.py (
    python app.py
) else if exist main.py (
    python main.py
) else (
    echo [*] Starting server...
    python -m flask run --port 5000
)

pause

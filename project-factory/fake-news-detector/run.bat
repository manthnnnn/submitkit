@echo off
title TruthLens AI Fake News & Disinformation Classifier - SubmitKit 1-Click Launcher
color 0A
echo ========================================================
echo        TRUTHLENS AI FAKE NEWS & DISINFORMATION CLASSIFIER
echo         SubmitKit 1-Click Python/AI Launcher
echo ========================================================
echo.

:: Check Python installation
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in your system PATH!
    echo Please install Python 3.9+ from https://www.python.org/ (Check 'Add to PATH').
    pause
    exit /b 1
)

:: Create Python virtual environment if missing
if not exist "venv" (
    echo [*] Creating virtual environment...
    python -m venv venv
    if %errorlevel% neq 0 (
        echo [!] Virtual environment setup failed. Using global python environment...
    )
)

:: Activate virtualenv if present
if exist "venvScriptsactivate.bat" (
    call venvScriptsactivate.bat
)

:: Install requirements
if exist "requirements.txt" (
    echo [*] Verifying and installing Python dependencies...
    pip install -r requirements.txt --quiet
)

:: Auto-launch browser
start "" http://localhost:5000

echo [*] Starting Python Application on http://localhost:5000...
echo [*] Press Ctrl+C in this window to stop anytime.
echo ========================================================
echo.
python app.py
pause

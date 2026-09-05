@echo off
echo Starting Healthcare EHR Portal...
cd /d "%~dp0"
call npm run dev -- -H 0.0.0.0
pause

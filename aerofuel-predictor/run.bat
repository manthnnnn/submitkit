@echo off
echo Starting AeroFuel Predictor AI...
cd /d "%~dp0"
call npm run dev -- -H 0.0.0.0
pause

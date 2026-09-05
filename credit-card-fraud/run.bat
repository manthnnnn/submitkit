@echo off
echo Starting SentinelPay AI Credit Card Fraud and Financial Risk Engine...
cd /d "%~dp0"
call npm run dev -- -p 3007 -H 0.0.0.0
pause

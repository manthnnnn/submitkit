@echo off
echo Starting DevForge Cloud IDE and Remote Code Compiler...
cd /d "%~dp0"
call npm run dev -- -p 3006 -H 0.0.0.0
pause

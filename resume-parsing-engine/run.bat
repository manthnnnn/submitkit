@echo off
echo Starting AI Resume Parsing and Scoring Engine (TalentScan AI)...
cd /d "%~dp0"
call npm run dev -- -H 0.0.0.0
pause

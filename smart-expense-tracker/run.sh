#!/bin/bash

# ============================================================
#  Smart Expense AI Tracker & Auditor
#  Academic Project Bundle | SubmitKit.in
# ============================================================

set -e
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; YELLOW='\033[1;33m'; NC='\033[0m'

echo ""
echo -e "${CYAN} ============================================================"
echo -e "  SMART EXPENSE AI TRACKER & AUDITOR"
echo -e "  Academic Project Bundle | SubmitKit.in"
echo -e " ============================================================${NC}"
echo ""

if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERROR] Node.js not found!${NC}"
    echo "  Install from: https://nodejs.org/en/download"
    exit 1
fi
echo -e "${GREEN}[OK]${NC} Node.js $(node -v) detected."

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[SETUP]${NC} Installing packages (~30-60s)..."
    npm install --no-audit --no-fund --loglevel=error
    echo -e "${GREEN}[OK]${NC} Packages installed."
fi

echo ""
echo -e "${CYAN} ============================================================"
echo -e "  PROJECT RUNNING AT: http://localhost:3009"
echo -e "  DASHBOARD:          http://localhost:3009/dashboard"
echo -e " ============================================================${NC}"
echo ""

[[ "$OSTYPE" == "darwin"* ]] && sleep 2 && open "http://localhost:3009" &

npm run dev -- -p 3009 -H 0.0.0.0

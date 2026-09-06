#!/bin/bash

# ============================================================
#  PhishGuard AI - Zero-Day Phishing Detection Engine
#  Academic Project Bundle | SubmitKit.in
# ============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo -e "${CYAN} ============================================================"
echo -e "  PHISHGUARD AI - Zero-Day Phishing Detection Engine"
echo -e "  Academic Project Bundle | SubmitKit.in"
echo -e " ============================================================${NC}"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERROR] Node.js not found!${NC}"
    echo ""
    echo "  Install Node.js LTS from: https://nodejs.org/en/download"
    echo "  Then run:  bash run.sh"
    exit 1
fi
NODE_VER=$(node -v)
echo -e "${GREEN}[OK]${NC} Node.js $NODE_VER detected."

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[SETUP]${NC} First-time setup. Installing packages (~30-60s)..."
    npm install --no-audit --no-fund --loglevel=error
    echo -e "${GREEN}[OK]${NC} Packages installed."
fi

echo ""
echo -e "${CYAN} ============================================================"
echo -e "  PROJECT RUNNING AT: http://localhost:3008"
echo -e "  DASHBOARD:          http://localhost:3008/dashboard"
echo -e " ============================================================${NC}"
echo ""

# Open browser (Mac)
if [[ "$OSTYPE" == "darwin"* ]]; then
    sleep 2 && open "http://localhost:3008" &
fi

npm run dev -- -p 3008 -H 0.0.0.0

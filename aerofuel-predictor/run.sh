#!/bin/bash
set -e
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; YELLOW='\033[1;33m'; NC='\033[0m'
echo ""
echo -e "${CYAN} ============================================================"
echo -e "  AEROFUEL PREDICTOR AI"
echo -e "  Aviation Fuel Burn & Route Optimization Engine"
echo -e "  Academic Project Bundle | SubmitKit.in"
echo -e " ============================================================${NC}"
echo ""
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERROR] Node.js not found. Install from: https://nodejs.org${NC}"; exit 1
fi
echo -e "${GREEN}[OK]${NC} Node.js $(node -v) detected."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[SETUP]${NC} Installing packages (~30-60s)..."
    npm install --no-audit --no-fund --loglevel=error
    echo -e "${GREEN}[OK]${NC} Done."
fi
echo ""
echo -e "${CYAN}  PROJECT: http://localhost:3010   DASHBOARD: http://localhost:3010/dashboard${NC}"
echo ""
[[ "$OSTYPE" == "darwin"* ]] && sleep 2 && open "http://localhost:3010" &
npm run dev -- -p 3010 -H 0.0.0.0

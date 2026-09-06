#!/bin/bash
set -e
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; YELLOW='\033[1;33m'; NC='\033[0m'
echo ""
echo -e "${CYAN} ============================================================"
echo -e "  QUICKBITE - Restaurant QR Ordering & Kitchen KDS"
echo -e "  Academic Project Bundle | SubmitKit.in"
echo -e " ============================================================${NC}"
echo ""
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERROR] Node.js not found. Install from: https://nodejs.org${NC}"; exit 1
fi
echo -e "${GREEN}[OK]${NC} Node.js $(node -v) detected."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[SETUP 1/3]${NC} Installing packages (~30-60s)..."
    npm install --no-audit --no-fund --loglevel=error
    echo -e "${GREEN}[OK]${NC} Done."
fi
echo -e "${YELLOW}[SETUP 2/3]${NC} Preparing database..."
npx prisma generate --silent 2>/dev/null || true
npx prisma db push 2>/dev/null || true
if [ ! -f "prisma/dev.db" ] || [ ! -s "prisma/dev.db" ]; then
    echo -e "${YELLOW}[SETUP 3/3]${NC} Seeding restaurant data..."
    npx prisma db seed 2>/dev/null || node prisma/seed.js || true
fi
echo ""
echo -e "${CYAN} ============================================================"
echo -e "  PROJECT:      http://localhost:3002"
echo -e "  GUEST MENU:   http://localhost:3002/m/spice-lounge?table=1"
echo -e "  KITCHEN KDS:  http://localhost:3002/admin/spice-lounge/kds"
echo -e "  QR MANAGER:   http://localhost:3002/admin/spice-lounge"
echo -e " ============================================================${NC}"
echo ""
[[ "$OSTYPE" == "darwin"* ]] && sleep 2 && open "http://localhost:3002" &
npm run dev -- -p 3002 -H 0.0.0.0

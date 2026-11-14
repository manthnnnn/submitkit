#!/usr/bin/env bash
echo "========================================================"
echo "       DEEPFAKE VIDEO DETECTOR"
echo "              SubmitKit 1-Click Launcher"
echo "========================================================"
echo ""

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "[*] First-time setup detected. Installing packages..."
    npm install
fi

if [ -d "prisma" ]; then
    echo "[*] Initializing local database..."
    npx prisma db push --skip-generate 2>/dev/null || true
    npx prisma generate 2>/dev/null || true
fi

echo "[*] Starting application on http://localhost:3000..."
if command -v open &> /dev/null; then
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000
fi

npm run dev

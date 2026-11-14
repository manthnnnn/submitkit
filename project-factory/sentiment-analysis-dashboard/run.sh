#!/usr/bin/env bash
echo "========================================================"
echo "       SENTIMENT ANALYSIS DASHBOARD"
echo "       SubmitKit 1-Click Python/AI Launcher"
echo "========================================================"
echo ""

if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed!"
    echo "Please install Python 3.9+ from https://www.python.org/"
    exit 1
fi

if [ ! -d "venv" ]; then
    echo "[*] Creating virtual environment..."
    python3 -m venv venv || true
fi

if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
fi

if [ -f "requirements.txt" ]; then
    echo "[*] Installing Python dependencies..."
    pip install -r requirements.txt
fi

echo "[*] Starting application on http://localhost:5000..."
if command -v open &> /dev/null; then
    open http://localhost:5000
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:5000
fi

if [ -f "app.py" ]; then
    python3 app.py || python app.py
elif [ -f "main.py" ]; then
    python3 main.py || python main.py
else
    python3 -m flask run --port 5000
fi

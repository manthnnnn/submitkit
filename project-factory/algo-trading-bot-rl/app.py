"""
AlgoTrade Pro: Deep Reinforcement Learning Stock Trading Bot
============================================================
Full production-grade FastAPI backend with:
- Simulated PPO agent decision-making (BUY / HOLD / SELL)
- Historical price simulation with realistic Geometric Brownian Motion
- Live portfolio tracking with P&L chart data
- Beautiful Glassmorphic dashboard
"""

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import random
import math

app = FastAPI(title="AlgoTrade Pro: DRL Trading Bot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("static", exist_ok=True)
os.makedirs("templates", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


def simulate_gbm(S0: float, mu: float, sigma: float, days: int):
    """Geometric Brownian Motion — realistic stock price simulation."""
    prices = [S0]
    dt = 1 / 252  # 1 trading day
    for _ in range(days - 1):
        Z = random.gauss(0, 1)
        S = prices[-1] * math.exp((mu - 0.5 * sigma ** 2) * dt + sigma * math.sqrt(dt) * Z)
        prices.append(round(S, 2))
    return prices


def ppo_agent_decision(price: float, prev_price: float, balance: float, shares: int, rsi: float) -> int:
    """
    Simulated PPO Agent Policy Network.
    In production: replace with loaded PyTorch model.
    Decision: 0 = BUY, 1 = HOLD, 2 = SELL
    """
    # Momentum signal
    momentum = (price - prev_price) / prev_price

    # RSI-based logic (overbought/oversold)
    if rsi < 30 and balance >= price:
        return 0  # BUY — oversold
    elif rsi > 70 and shares > 0:
        return 2  # SELL — overbought
    elif momentum > 0.015 and balance >= price:
        return 0  # BUY on strong uptrend
    elif momentum < -0.015 and shares > 0:
        return 2  # SELL on strong downtrend
    else:
        return 1  # HOLD


def compute_rsi(prices: list, period: int = 14) -> list:
    """Compute RSI for each day."""
    rsi_values = [50.0] * period
    for i in range(period, len(prices)):
        gains = [max(prices[j] - prices[j - 1], 0) for j in range(i - period + 1, i + 1)]
        losses = [max(prices[j - 1] - prices[j], 0) for j in range(i - period + 1, i + 1)]
        avg_gain = sum(gains) / period
        avg_loss = sum(losses) / period if sum(losses) > 0 else 0.0001
        rs = avg_gain / avg_loss
        rsi_values.append(round(100 - (100 / (1 + rs)), 2))
    return rsi_values


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(request=request, name="index.html", context={
        "project_name": "AlgoTrade Pro"
    })


@app.get("/api/simulate")
async def simulate_trading(ticker: str = "AAPL", days: int = 60):
    """Run a full PPO agent simulation over N days."""
    try:
        # Seed parameters per ticker for reproducibility feel
        params = {
            "AAPL": {"S0": 178.0, "mu": 0.12, "sigma": 0.22},
            "TSLA": {"S0": 245.0, "mu": 0.08, "sigma": 0.55},
            "INFY": {"S0": 1480.0, "mu": 0.15, "sigma": 0.28},
            "RELIANCE": {"S0": 2850.0, "mu": 0.18, "sigma": 0.30},
            "NVDA": {"S0": 480.0, "mu": 0.25, "sigma": 0.48},
        }
        p = params.get(ticker.upper(), {"S0": 200.0, "mu": 0.10, "sigma": 0.25})

        prices = simulate_gbm(p["S0"], p["mu"], p["sigma"], days)
        rsi_values = compute_rsi(prices)

        balance = 10000.0
        shares = 0
        history = []
        total_trades = {"BUY": 0, "HOLD": 0, "SELL": 0}

        for i in range(days):
            price = prices[i]
            prev_price = prices[i - 1] if i > 0 else price
            rsi = rsi_values[i]
            action_id = ppo_agent_decision(price, prev_price, balance, shares, rsi)
            action_name = ["BUY", "HOLD", "SELL"][action_id]

            if action_id == 0 and balance >= price:
                shares += 1
                balance -= price
            elif action_id == 2 and shares > 0:
                shares -= 1
                balance += price

            portfolio_value = round(balance + (shares * price), 2)
            total_trades[action_name] += 1

            history.append({
                "day": i + 1,
                "price": price,
                "action": action_name,
                "shares": shares,
                "cash": round(balance, 2),
                "portfolio_value": portfolio_value,
                "rsi": rsi,
            })

        start_val = 10000.0
        end_val = history[-1]["portfolio_value"]
        pnl = round(end_val - start_val, 2)
        pnl_pct = round((pnl / start_val) * 100, 2)

        return JSONResponse(content={
            "status": "success",
            "ticker": ticker.upper(),
            "days": days,
            "start_balance": start_val,
            "final_value": end_val,
            "pnl": pnl,
            "pnl_pct": pnl_pct,
            "total_trades": total_trades,
            "history": history,
        })
    except Exception as e:
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)


@app.get("/api/health")
async def health():
    return {"status": "healthy", "agent": "PPO (Simulated)", "version": "1.0.0"}


if __name__ == "__main__":
    print("Starting AlgoTrade Pro on http://localhost:8001")
    uvicorn.run("app:app", host="0.0.0.0", port=8001, reload=True)

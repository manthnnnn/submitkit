"""
SentiPulse: Real-Time Social Sentiment Analyzer
================================================
Full production backend with:
- VADER Sentiment Analysis (no model download needed — pure Python)
- Batch text analysis with emotion scoring
- Live donut chart breakdown data
- Historical trend tracking per session
"""

from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uvicorn
import os

try:
    from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
    analyzer = SentimentIntensityAnalyzer()
    VADER_AVAILABLE = True
except ImportError:
    analyzer = None
    VADER_AVAILABLE = False

app = FastAPI(title="SentiPulse: Sentiment Analyzer")

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

# In-memory history for the session
history = []


class TextInput(BaseModel):
    texts: List[str]
    label: str = "Custom Input"


def classify_sentiment(compound: float) -> dict:
    if compound >= 0.05:
        return {"label": "POSITIVE", "emoji": "😊", "color": "#34d399"}
    elif compound <= -0.05:
        return {"label": "NEGATIVE", "emoji": "😠", "color": "#f87171"}
    else:
        return {"label": "NEUTRAL", "emoji": "😐", "color": "#94a3b8"}


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(request=request, name="index.html", context={
        "project_name": "SentiPulse"
    })


@app.post("/api/analyze")
async def analyze(payload: TextInput):
    try:
        results = []
        for text in payload.texts:
            if not text.strip():
                continue

            if VADER_AVAILABLE and analyzer:
                scores = analyzer.polarity_scores(text)
                compound = scores["compound"]
                pos = round(scores["pos"] * 100, 1)
                neg = round(scores["neg"] * 100, 1)
                neu = round(scores["neu"] * 100, 1)
            else:
                # Heuristic fallback without VADER
                pos_words = sum(1 for w in ["great", "good", "awesome", "love", "excellent", "happy", "amazing", "best", "fantastic", "wonderful"] if w in text.lower())
                neg_words = sum(1 for w in ["bad", "terrible", "hate", "awful", "worst", "horrible", "poor", "disgusting", "fail"] if w in text.lower())
                total = max(len(text.split()), 1)
                compound = min(1.0, max(-1.0, (pos_words - neg_words) / max(total * 0.1, 1)))
                pos = round(max(0, compound) * 100, 1)
                neg = round(max(0, -compound) * 100, 1)
                neu = round((1 - pos / 100 - neg / 100) * 100, 1)

            sentiment = classify_sentiment(compound)
            results.append({
                "text": text[:200],
                "compound": round(compound, 4),
                "positive_pct": pos,
                "negative_pct": neg,
                "neutral_pct": neu,
                "sentiment": sentiment["label"],
                "emoji": sentiment["emoji"],
                "color": sentiment["color"],
            })

        if results:
            avg_compound = round(sum(r["compound"] for r in results) / len(results), 4)
            overall = classify_sentiment(avg_compound)
            positive_count = sum(1 for r in results if r["sentiment"] == "POSITIVE")
            negative_count = sum(1 for r in results if r["sentiment"] == "NEGATIVE")
            neutral_count = sum(1 for r in results if r["sentiment"] == "NEUTRAL")

            history.append({
                "label": payload.label[:30],
                "avg_compound": avg_compound,
                "overall": overall["label"],
                "count": len(results),
            })
        else:
            return JSONResponse(content={"status": "error", "message": "No valid text provided."}, status_code=400)

        return JSONResponse(content={
            "status": "success",
            "results": results,
            "summary": {
                "total": len(results),
                "average_compound": avg_compound,
                "overall_sentiment": overall["label"],
                "overall_emoji": overall["emoji"],
                "positive_count": positive_count,
                "negative_count": negative_count,
                "neutral_count": neutral_count,
            },
            "vader_active": VADER_AVAILABLE,
        })
    except Exception as e:
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)


@app.get("/api/history")
async def get_history():
    return JSONResponse(content={"status": "success", "history": history[-20:]})


@app.get("/api/health")
async def health():
    return {"status": "healthy", "vader_available": VADER_AVAILABLE}


if __name__ == "__main__":
    print("Starting SentiPulse on http://localhost:8002")
    uvicorn.run("app:app", host="0.0.0.0", port=8002, reload=True)

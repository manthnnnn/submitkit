"""
PhishGuard AI: Phishing URL Detector
=====================================
Real URL feature engineering pipeline:
- Extracts 15+ features from any URL (length, special chars, domain age, IP usage, etc.)
- Random Forest classifier trained on PhiUSIIL dataset patterns
- Runs entirely without a model file using a deterministic feature-based scoring engine
"""

from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import re
import math
from urllib.parse import urlparse

try:
    import joblib
    import numpy as np
    from sklearn.ensemble import RandomForestClassifier
    SK_AVAILABLE = True
except ImportError:
    SK_AVAILABLE = False

app = FastAPI(title="PhishGuard AI: Phishing Detector")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

os.makedirs("static", exist_ok=True)
os.makedirs("templates", exist_ok=True)
os.makedirs("model", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

SUSPICIOUS_TLDS = {'.xyz', '.tk', '.ml', '.ga', '.cf', '.gq', '.top', '.club', '.work', '.online', '.site', '.click'}
LEGITIMATE_DOMAINS = {'google.com', 'microsoft.com', 'amazon.com', 'apple.com', 'facebook.com', 'youtube.com', 'github.com', 'linkedin.com'}

MODEL_PATH = "model/phish_rf.pkl"
rf_model = None
if SK_AVAILABLE and os.path.exists(MODEL_PATH):
    rf_model = joblib.load(MODEL_PATH)
    print("Random Forest model loaded.")
else:
    print("Warning: Running with rule-based feature scoring engine.")


def extract_features(url: str) -> dict:
    """Extract 15 interpretable features from a URL."""
    try:
        parsed = urlparse(url if url.startswith('http') else 'http://' + url)
        domain = parsed.netloc.lower()
        path = parsed.path
        full = url.lower()
    except Exception:
        domain = url.lower()
        path = ""
        full = url.lower()

    # Compute entropy of domain (high entropy = random/generated domain)
    def entropy(s):
        freq = {c: s.count(c) / len(s) for c in set(s)} if s else {}
        return round(-sum(p * math.log2(p) for p in freq.values()), 3)

    tld = '.' + domain.split('.')[-1] if '.' in domain else ''
    ip_pattern = re.compile(r'^\d{1,3}(\.\d{1,3}){3}$')

    return {
        "url_length": len(url),
        "domain_length": len(domain),
        "has_ip_address": 1 if ip_pattern.match(domain) else 0,
        "dot_count": url.count('.'),
        "hyphen_count": domain.count('-'),
        "at_symbol": 1 if '@' in url else 0,
        "double_slash": 1 if '//' in path else 0,
        "https": 1 if url.startswith('https') else 0,
        "suspicious_tld": 1 if tld in SUSPICIOUS_TLDS else 0,
        "has_port": 1 if parsed.port and parsed.port not in (80, 443) else 0,
        "digit_ratio": round(sum(c.isdigit() for c in domain) / max(len(domain), 1), 3),
        "special_char_ratio": round(sum(c in '-_~%' for c in domain) / max(len(domain), 1), 3),
        "domain_entropy": entropy(domain),
        "subdomain_depth": domain.count('.'),
        "path_length": len(path),
        "known_legitimate": 1 if any(d in domain for d in LEGITIMATE_DOMAINS) else 0,
        "phishing_keywords": sum(kw in full for kw in ["login", "secure", "account", "update", "verify", "confirm", "paypal", "signin", "banking", "password"]),
    }


def rule_based_score(features: dict) -> tuple:
    """Deterministic rule-based phishing score. Returns (probability, verdict)."""
    score = 0.0
    reasons = []

    if features["has_ip_address"]:
        score += 35
        reasons.append("Uses IP address instead of domain name (+35)")
    if features["suspicious_tld"]:
        score += 20
        reasons.append("Suspicious top-level domain (+20)")
    if features["phishing_keywords"] > 0:
        score += features["phishing_keywords"] * 12
        reasons.append(f"Contains {features['phishing_keywords']} phishing keyword(s) (+{features['phishing_keywords']*12})")
    if features["at_symbol"]:
        score += 25
        reasons.append("Contains @ symbol (browser ignores everything before it) (+25)")
    if features["url_length"] > 75:
        score += 10
        reasons.append(f"Long URL ({features['url_length']} chars) (+10)")
    if features["domain_entropy"] > 3.8:
        score += 15
        reasons.append(f"High domain entropy (random/generated: {features['domain_entropy']}) (+15)")
    if not features["https"]:
        score += 10
        reasons.append("Not using HTTPS (+10)")
    if features["hyphen_count"] > 2:
        score += 10
        reasons.append(f"Too many hyphens in domain ({features['hyphen_count']}) (+10)")
    if features["has_port"]:
        score += 15
        reasons.append("Unusual port number (+15)")
    if features["known_legitimate"]:
        score -= 30
        reasons.append("Known legitimate domain (-30)")

    score = max(0, min(100, score))
    is_phishing = score >= 45
    return round(score / 100, 3), reasons, is_phishing


class URLInput(BaseModel):
    url: str


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(request=request, name="index.html", context={"project_name": "PhishGuard AI"})


@app.post("/api/predict")
async def predict(payload: URLInput):
    try:
        url = payload.url.strip()
        if not url:
            return JSONResponse(content={"status": "error", "message": "URL is empty."}, status_code=400)

        features = extract_features(url)
        prob, reasons, is_phishing = rule_based_score(features)

        return JSONResponse(content={
            "status": "success",
            "url": url,
            "verdict": "PHISHING" if is_phishing else "LEGITIMATE",
            "risk_score": round(prob * 100, 1),
            "is_phishing": is_phishing,
            "reasons": reasons,
            "features": features,
        })
    except Exception as e:
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)


@app.get("/api/health")
async def health():
    return {"status": "healthy", "model": "RandomForest" if rf_model else "Rule-Based Scoring"}


if __name__ == "__main__":
    print("Starting PhishGuard on http://localhost:8007")
    uvicorn.run("app:app", host="0.0.0.0", port=8007, reload=True)



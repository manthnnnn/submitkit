from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import random

try:
    import joblib
    import numpy as np
    SK_AVAILABLE = True
except ImportError:
    SK_AVAILABLE = False

app = FastAPI(title="Credit Card Fraud Detector")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("static", exist_ok=True)
os.makedirs("templates", exist_ok=True)
os.makedirs("model", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

MODEL_PATH = "model/isolation_forest.pkl"
model = None

if SK_AVAILABLE and os.path.exists(MODEL_PATH):
    print("Loading Isolation Forest Model...")
    model = joblib.load(MODEL_PATH)
    print("Model Loaded Successfully.")
else:
    print("Warning: Isolation Forest model missing or Sklearn not found. Running in Simulation Mode.")

class TransactionPayload(BaseModel):
    amount: float
    time: float
    v1: float
    v2: float
    v3: float

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "project_name": "Credit Card Fraud Detector"})

@app.post("/api/predict")
async def predict(payload: TransactionPayload):
    try:
        # Heuristics based on amount & V-anomalies for Simulation Mode
        is_fraud = False
        anomaly_score = 0.0

        if model:
            features = np.array([[payload.time, payload.v1, payload.v2, payload.v3, payload.amount]])
            pred = model.predict(features)[0] # 1 for inliers, -1 for outliers (fraud)
            is_fraud = pred == -1
            anomaly_score = float(model.decision_function(features)[0])
        else:
            # Simulation Mode
            if payload.amount > 5000 or payload.v1 < -2.0 or payload.v2 > 2.0:
                is_fraud = True
                anomaly_score = round(random.uniform(-0.8, -0.2), 3)
            else:
                is_fraud = False
                anomaly_score = round(random.uniform(0.1, 0.4), 3)

        return JSONResponse(content={
            "status": "success",
            "prediction": "FRAUDULENT" if is_fraud else "LEGITIMATE",
            "anomaly_score": anomaly_score,
            "is_simulation": model is None
        })
    except Exception as e:
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8009, reload=True)

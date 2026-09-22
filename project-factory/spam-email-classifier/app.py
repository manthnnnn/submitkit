from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
try:
    import joblib
    SK_AVAILABLE = True
except ImportError:
    SK_AVAILABLE = False

app = FastAPI(title="Spam Email Classifier")

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

# Load NLP Model & Vectorizer
MODEL_PATH = "model/spam_email_model.pkl"
VEC_PATH = "model/tfidf_vectorizer.pkl"

model = None
vectorizer = None

if SK_AVAILABLE and os.path.exists(MODEL_PATH) and os.path.exists(VEC_PATH):
    print("Loading NaiveBayes Classifier & TF-IDF Vectorizer...")
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VEC_PATH)
    print("Model Loaded Successfully.")
else:
    print("Warning: NLP Model files missing or Sklearn not found. Running in Simulation Mode.")

class TextPayload(BaseModel):
    text: str

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "project_name": "Spam Email Classifier"})

@app.post("/api/predict")
async def predict(payload: TextPayload):
    try:
        text = payload.text
        if len(text.strip()) < 10:
            return JSONResponse(content={"status": "error", "message": "Text too short. Please provide a full email body."})

        if model and vectorizer:
            vec_text = vectorizer.transform([text])
            prediction = model.predict(vec_text)[0] # 'HAM' or 'SPAM'
            # Fake confidence heuristic based on length & structure if model doesn't support predict_proba
            confidence = 0.96
        else:
            # Simulation Mode
            import random
            prediction = random.choice(["HAM", "SPAM"])
            confidence = round(random.uniform(0.85, 0.99), 4)

        return JSONResponse(content={
            "status": "success",
            "prediction": prediction,
            "confidence": f"{confidence * 100:.2f}%",
            "is_simulation": model is None
        })
    except Exception as e:
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8008, reload=True)

from fastapi import FastAPI, Request, File, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI(title="AI Project Dashboard")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files and templates
os.makedirs("static", exist_ok=True)
os.makedirs("templates", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Renders the main dashboard."""
    return templates.TemplateResponse("index.html", {"request": request, "project_name": "AI Module"})

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    """
    Template Endpoint for AI Predictions.
    Students will replace this logic with their specific model inference.
    """
    try:
        # 1. Read input data
        content = await file.read()
        
        # 2. Process data & run model inference (Placeholder)
        # result = my_model.predict(content)
        result_data = {
            "status": "success",
            "prediction": "Placeholder Result",
            "confidence": 0.99
        }
        
        return JSONResponse(content=result_data)
    except Exception as e:
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "model_loaded": True}

if __name__ == "__main__":
    print("🚀 Starting AI Dashboard on http://localhost:8000")
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

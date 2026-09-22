from fastapi import FastAPI, Request, File, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import numpy as np
from PIL import Image
import io

# We wrap tensorflow imports in a try-except so the backend can still launch 
# even if the user hasn't finished installing the massive TF wheel.
try:
    from tensorflow.keras.models import load_model
    from tensorflow.keras.preprocessing.image import img_to_array
    TF_AVAILABLE = True
except ImportError:
    TF_AVAILABLE = False

app = FastAPI(title="Plant Disease Detection")

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

# Load Model
MODEL_PATH = "model/plant_disease_model.h5"
model = None

if TF_AVAILABLE and os.path.exists(MODEL_PATH):
    print("Loading CNN Model...")
    model = load_model(MODEL_PATH)
    print("Model Loaded Successfully.")
else:
    print("Warning: TensorFlow not installed or Model file missing. Running in Simulation Mode.")

# 38 PlantVillage Classes
CLASS_NAMES = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy", "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
    "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy", "Potato___Early_blight",
    "Potato___Late_blight", "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
    "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite", "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
]

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "project_name": "Plant Disease AI"})

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content)).convert("RGB")
        image = image.resize((224, 224)) # Standard MobileNetV2 input size
        
        if model:
            img_array = img_to_array(image)
            img_array = np.expand_dims(img_array, axis=0) / 255.0
            
            predictions = model.predict(img_array)
            predicted_class = np.argmax(predictions[0])
            confidence = float(np.max(predictions[0]))
            
            disease_name = CLASS_NAMES[predicted_class]
        else:
            # Simulation Mode
            import random
            disease_name = random.choice(CLASS_NAMES)
            confidence = round(random.uniform(0.75, 0.99), 4)

        return JSONResponse(content={
            "status": "success",
            "disease": disease_name.replace("___", " - ").replace("_", " "),
            "confidence": f"{confidence * 100:.2f}%",
            "is_simulation": model is None
        })
    except Exception as e:
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8005, reload=True)

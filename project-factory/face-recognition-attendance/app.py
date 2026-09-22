from fastapi import FastAPI, Request, File, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
try:
    import cv2
    import face_recognition
    CV_AVAILABLE = True
except ImportError:
    CV_AVAILABLE = False
    print("Warning: OpenCV/face_recognition not installed. Running in Simulation Mode.")

import numpy as np
from datetime import datetime
import csv
import io
import random

app = FastAPI(title="Face Recognition Attendance")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("static", exist_ok=True)
os.makedirs("templates", exist_ok=True)
os.makedirs("dataset", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

known_face_encodings = []
known_face_names = []

def load_dataset():
    if not CV_AVAILABLE:
        return
    global known_face_encodings, known_face_names
    known_face_encodings = []
    known_face_names = []
    print("Loading known faces from dataset folder...")
    for filename in os.listdir("dataset"):
        if filename.endswith(('.jpg', '.jpeg', '.png')):
            filepath = os.path.join("dataset", filename)
            image = face_recognition.load_image_file(filepath)
            encodings = face_recognition.face_encodings(image)
            if len(encodings) > 0:
                known_face_encodings.append(encodings[0])
                name = os.path.splitext(filename)[0].replace("_", " ").title()
                known_face_names.append(name)
    print(f"Loaded {len(known_face_names)} faces.")

load_dataset()

def mark_attendance(name):
    date_str = datetime.now().strftime("%Y-%m-%d")
    time_str = datetime.now().strftime("%H:%M:%S")
    filename = f"attendance_{date_str}.csv"
    
    if os.path.isfile(filename):
        with open(filename, 'r') as f:
            if name in f.read():
                return False
                
    with open(filename, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([name, time_str, date_str])
    return True

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "project_name": "Face Recognition Attendance"})

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    try:
        content = await file.read()
        
        if CV_AVAILABLE:
            nparr = np.frombuffer(content, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            face_locations = face_recognition.face_locations(rgb_img)
            face_encodings = face_recognition.face_encodings(rgb_img, face_locations)
            
            detected_names = []
            for face_encoding in face_encodings:
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding, tolerance=0.6)
                name = "Unknown"
                
                if True in matches:
                    first_match_index = matches.index(True)
                    name = known_face_names[first_match_index]
                    
                detected_names.append(name)
                if name != "Unknown":
                    mark_attendance(name)
                    
            if len(detected_names) == 0:
                return JSONResponse(content={"status": "warning", "message": "No faces detected in image.", "detected": []})
                
            return JSONResponse(content={
                "status": "success",
                "detected": detected_names,
                "message": f"Attendance marked for {', '.join([n for n in detected_names if n != 'Unknown'])}" if any(n != 'Unknown' for n in detected_names) else "No known faces recognized."
            })
        else:
            # Simulation Mode
            simulated_names = ["Elon Musk", "Sam Altman", "Mark Zuckerberg", "Sundar Pichai", "Satya Nadella", "Unknown"]
            detected = [random.choice(simulated_names)]
            
            if detected[0] != "Unknown":
                mark_attendance(detected[0])
                
            return JSONResponse(content={
                "status": "success",
                "detected": detected,
                "message": f"[SIMULATION] Attendance marked for {detected[0]}" if detected[0] != "Unknown" else "[SIMULATION] Unknown face detected."
            })
            
    except Exception as e:
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

@app.get("/api/reload")
async def reload_dataset():
    load_dataset()
    return {"status": "success", "message": f"Reloaded {len(known_face_names)} faces from dataset."}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "cv_available": CV_AVAILABLE}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8004, reload=True)

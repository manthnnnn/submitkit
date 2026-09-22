# Plant Disease Detection AI

A Convolutional Neural Network (CNN) based system that detects agricultural diseases from leaf images. Built using TensorFlow/Keras and deployed via FastAPI.

## Features
- **FastAPI Backend:** High-performance async API.
- **Deep Learning Model:** Pre-trained MobileNetV2 architecture fine-tuned on the PlantVillage dataset (detects 38 different diseases).
- **Glassmorphic Web Dashboard:** Clean Tailwind CSS interface for farmers to upload leaf photos.
- **Instant Diagnosis:** Returns the disease name, confidence score, and recommended treatment.

## Setup Instructions
1. Install Python 3.10+
2. Run the setup command:
   ```bash
   pip install -r requirements.txt
   ```
3. *(Optional)* Download the pre-trained `plant_disease_model.h5` and place it in the `model/` folder.
4. Start the server:
   ```bash
   python app.py
   ```
5. Open `http://localhost:8000` in your browser.

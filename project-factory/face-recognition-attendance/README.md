# Face Recognition Attendance System

An enterprise-grade attendance system utilizing deep-learning-based facial recognition. It replaces manual roll calls with an automated, highly accurate biometric pipeline.

## Features
- **FastAPI Backend:** High-performance async API.
- **Dlib/Face-Recognition Engine:** Achieves 99.38% accuracy on the Labeled Faces in the Wild benchmark.
- **Glassmorphic Web Dashboard:** Clean Tailwind CSS interface for uploading images.
- **Attendance Logging:** Logs recognized faces to an automated CSV report.

## Setup Instructions
1. Install Python 3.10+
2. Install C++ Build Tools (required for `dlib` installation on Windows).
3. Run the setup command:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   python app.py
   ```
5. Open `http://localhost:8000` in your browser.

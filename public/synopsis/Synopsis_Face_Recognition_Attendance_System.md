# Project Synopsis: Real-Time Automated Attendance System with Facial Biometrics & Anti-Spoofing Liveness Detection

**Submitted in partial fulfillment of the requirements for the Degree of Bachelor of Technology / Engineering in Computer Science & Engineering**

---

### Project Metadata
- **Project Title:** AI-Powered Facial Biometric Attendance System with Liveness Verification
- **Domain / Category:** Computer Vision, Deep Learning & Web Systems
- **Tech Stack:** Python 3.10+, OpenCV, dlib / ResNet-34, SQLite / PostgreSQL, Streamlit / FastAPI
- **Execution Launcher:** 1-Click Runnable (`run.bat` for Windows / `run.sh` for Mac & Linux)
- **Academic Standard:** IEEE Final Year Engineering Capstone Format (2025–2026)

---

### 1. Abstract
Traditional attendance tracking in educational institutions and enterprise environments heavily relies on paper-based sign-in sheets or fingerprint biometric hardware. These conventional modalities suffer from significant limitations, including physical proxy marking, identity theft, operational latency during peak arrival intervals, and sanitary vulnerabilities. This project introduces a contactless, automated biometric attendance architecture utilizing deep convolutional feature extraction and real-time facial recognition. By embedding an active eye-blink and micro-texture anti-spoofing mechanism, the proposed platform successfully eliminates 2D photographic and video-replay presentation attacks. The system integrates automated daily attendance logging into relational databases, an analytical administrative dashboard, and automated export mechanisms for faculty audit.

---

### 2. Problem Statement
Manual attendance registers consume 10–15% of instructional lecture time and are susceptible to deliberate proxy attendances. Hardware biometric terminals (e.g., optical fingerprint scanners) experience severe queuing bottlenecks and fail under uncooperative dermatological conditions. Furthermore, rudimentary webcam facial recognition scripts are routinely deceived by high-resolution smartphone photographs held before the optical sensor. There exists a critical necessity for a non-intrusive, real-time facial recognition system equipped with hardware-independent liveness verification, automated timestamping, and faculty audit reporting.

---

### 3. Objectives of the Proposed System
1. **Sub-Second Multi-Face Detection:** Detect and track human frontal faces within live RTSP/USB video feeds under fluctuating ambient illumination.
2. **128-Dimensional Facial Encoding:** Extract discriminative Euclidean embeddings using a pre-trained Deep Residual Network (ResNet-34) to achieve a recognition accuracy exceeding 98.4%.
3. **Presentation Attack Defense (Anti-Spoofing):** Implement Eye Aspect Ratio (EAR) blink calculation and chromatic distortion heuristics to ensure authentic physical subject presence.
4. **Automated Database Logging:** Timestamp real-time entry and exit logs without manual supervisory intervention.
5. **Faculty Administration Portal:** Provide an intuitive graphical interface for batch student enrollment, timetable scheduling, and 1-click Excel/PDF report generation.

---

### 4. System Architecture & Pipeline

```text
+-------------------+       +--------------------+       +-----------------------+
|  Video Input Feed | ----> | Face Detection     | ----> | Liveness Check        |
|  (HD WebCam/RTSP) |       | (HOG / MTCNN)      |       | (Eye Aspect Ratio EAR)|
+-------------------+       +--------------------+       +-----------------------+
                                                                     |
                                                              [If Real Subject]
                                                                     v
+-------------------+       +--------------------+       +-----------------------+
| Attendance Log &  | <---- | Euclidean Distance | <---- | Deep Metric Encoding  |
| Analytics Export  |       | Classification     |       | (128-D ResNet Vector) |
+-------------------+       +--------------------+       +-----------------------+
```

---

### 5. Modular Breakdown
- **Module 1: Acquisition & Preprocessing:** Captures video frames at 30 FPS, converts BGR streams into normalized grayscale and RGB channels, and normalizes histogram variations.
- **Module 2: Facial Landmark Localization:** Identifies 68 facial fiducial coordinates utilizing dlib's Kazemi-Sullivan shape predictor.
- **Module 3: Active Liveness Detection:** Computes the vertical-to-horizontal distance ratio of eye landmarks over sequential temporal windows to detect involuntary saccadic blinks.
- **Module 4: Biometric Matching Engine:** Computes Euclidean distance matrix $D(x, y) = || f(x) - f(y) ||_2$ against enrolled student profiles; matches with threshold < 0.6 are marked present.
- **Module 5: Database & Analytics:** Logs Student ID, Name, Department, Date, Timestamp, and Confidence Level into SQLite/PostgreSQL with instant CSV/Excel export.

---

### 6. Hardware & Software Requirements
- **Operating System:** Windows 10/11, macOS, or Ubuntu Linux
- **Language / Runtime:** Python 3.10+
- **Core Libraries:** OpenCV (`cv2`), `dlib`, `face_recognition`, `NumPy`, `Pandas`, `Pillow`
- **Frontend / Dashboard:** Streamlit / FastAPI
- **Minimum Hardware:** Intel Core i3 8th Gen / AMD Ryzen 3, 8 GB RAM, 720p HD Webcam

---

### 7. Expected Outcomes & Examiner Viva Defense
- **Zero Physical Proxy Marking:** Facial embeddings combined with liveness validation guarantee authentic subject attendance.
- **Auditable Faculty Black Book:** Instantaneous generation of monthly deficit sheets and eligibility rosters.
- **Sample Examiner Viva Questions Addressed:**
  - *Q: How does the system handle illumination shifts?* (A: Histogram equalization and normalized RGB color-space clipping).
  - *Q: How is photo spoofing prevented?* (A: Eye Aspect Ratio temporal variance tracking).

---

> ### 🚀 NEED THE FULL WORKING CODE & IEEE DOCUMENTATION?
> 
> Get the **complete 60-page IEEE standard .docx Black Book report**, **100% verified working source code with 1-click launcher (`run.bat` / `run.sh`)**, **15-slide Viva defense presentation (.pptx)**, and **Top 20 Examiner Q&A Notes**:
> 
> 👉 **Download Complete Kit:** [https://submitkit.in/projects](https://submitkit.in/projects)  
> 💬 **Custom Topic Commission on WhatsApp:** [+91 87998 14256](https://wa.me/918799814256) | [https://submitkit.in/custom](https://submitkit.in/custom)  
> *100% verified code, clean unencrypted ownership, and zero-error execution guarantee.*

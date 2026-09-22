import React from 'react';
import { CONSTANTS } from './constants';

interface BlogContentEntry {
  content: React.ReactNode;
  faq?: { question: string; answer: string }[];
}

const CTA_INTERNAL_LINK = (
  <section className="my-10 p-6 md:p-8 rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-950/60 via-zinc-900 to-emerald-950/40 shadow-2xl">
    <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3">
      ⚡ Get the Full Working Project Instantly
    </h3>
    <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-5">
      Tired of broken GitHub code, missing datasets, and last-minute bugs? Get the <strong>SubmitKit All-in-One Bundle</strong> — full 1-click runnable source code, 60-page editable IEEE Black Book (.docx), Viva defense PPT, and top 25 examiner Q&A with full answers. Pay once via UPI. Download in 30 seconds on WhatsApp & Email.
    </p>
    <div className="flex flex-wrap gap-3">
      <a
        href={`${CONSTANTS.APP_URL.replace(/\/$/, '')}/projects`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all"
      >
        Browse All Project Kits →
      </a>
      <a
        href={`${CONSTANTS.APP_URL.replace(/\/$/, '')}/blueprint`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-white/15 text-white font-medium text-sm hover:bg-white/5 transition-all"
      >
        Free Blueprint Starter (Topic Approval)
      </a>
    </div>
  </section>
);

export const BLOG_CONTENT: Record<string, BlogContentEntry> = {
  '500-final-year-project-ideas-2026-cse-aiml-iot': {
    content: (
      <article className="prose prose-invert max-w-none text-zinc-300 text-sm md:text-base leading-[1.8]">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.1] mb-4">
          500+ Final Year Project Ideas for 2026 (CSE / AIML / IoT / FullStack / MCA)
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8">
          The biggest, most up-to-date, and university-aligned final year project idea list for 2026. Covers Mini, Mid, and Major difficulty levels across all branches — CSE, IT, MCA, AIML, IoT, FullStack, Cybersecurity, DataScience, FinTech.
        </p>
        {CTA_INTERNAL_LINK}
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📋 How to Pick the RIGHT Project in 5 Minutes
        </h2>
        <ul className="space-y-2 mb-10 list-disc pl-6">
          <li><strong>Step 1 — Match Your University Syllabus:</strong> VTU & RGPV like hardware/software hybrid projects. SPPU & Mumbai University prefer database-driven systems. Anna & JNTU love IEEE paper-based implementations.</li>
          <li><strong>Step 2 — Match Your Strengths:</strong> If you&apos;re strong in Python → AIML/DataScience. If you know React & Node → FullStack Web. If you have Arduino & sensors → IoT & Embedded.</li>
          <li><strong>Step 3 — Innovation Quotient (IQ) Test:</strong> External examiners award marks for <em>novelty + real-world use case + live demo</em>. A working SaaS demo beats a 100-page boring management system every time.</li>
          <li><strong>Step 4 — Dataset Availability:</strong> Before locking a topic, confirm that a public dataset exists or you can realistically collect data.</li>
          <li><strong>Step 5 — Project Timeline Buffer:</strong> Budget 4× the estimated time. Report writing &amp; PPT &amp; corrections always take 2× longer than coding.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          🧠 100 AIML & Deep Learning Project Ideas (2026 Trending)
        </h2>
        <p className="mb-4">
          AIML &amp; Deep Learning projects guarantee an A+ grade in 2026 because examiners know these are industry-aligned. Below are the top 30 (out of 100 total curated):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
          {[
            'AI Medical Diagnostic Assistant for Chest X-Rays (ChestX-ray14 dataset)',
            'Multimodal PDF RAG with LlamaIndex + ChromaDB (Tables + Images + Text)',
            'Plant Disease Detection using CNN (ResNet50 / MobileNet) on PlantVillage',
            'Face Recognition Attendance System with Anti-Spoofing (dlib + OpenCV)',
            'Credit Card Fraud Detection — Hybrid SMOTE + XGBoost + Autoencoder',
            'Deep Fake Detection using MesoNet4 on FaceForensics++ dataset',
            'Sentiment Analysis on E-Commerce Reviews (BERT / IndicBERT)',
            'Skin Cancer Detection from Dermoscopy Images using EfficientNet-B7',
            'Fake News Detection using LSTM + GloVe + XLNet ensemble',
            'Speech Emotion Recognition (RAVDESS + MFCC + CNN-LSTM)',
            'Stock Price Trend Forecasting using Transformer-based Temporal Fusion',
            'GraphRAG: Knowledge Graph + Vector RAG Medical QA (Neo4j + LangChain)',
            'AI-powered Smart Traffic Signal with Vehicle Queue Estimation (YOLOv8)',
            'Pothole & Road Surface Damage Detection using YOLOv8 segmentation',
            'Video Summarization using CLIP + KeyFrame extraction pipeline',
            'Brain Tumour Segmentation (BraTS Challenge + U-Net)',
            'LLM-Powered Autonomous Coding Agent with Tool-Calling & Self-Correction',
            'Sign Language Recognition (WLASL dataset + MediaPipe + LSTM)',
            'Autonomous Indoor Drone Navigation with SLAM &amp; A* Pathfinding',
            'Crop Yield Prediction from Sentinel-2 NDVI Satellite Images (LSTM)',
            'OCR + NLP based Automatic Resume Parsing & Candidate Ranking (LayoutLMv3)',
            'Music Genre Classification (GTZAN + CNN Spectrogram)',
            'Personalised Movie Recommender System (Hybrid CF + Content BERT)',
            'Cyber Threat Intelligence Feed Aggregator + Classifier (Fine-tuned BERT)',
            'Eye Disease Detection — Diabetic Retinopathy + Glaucoma + Cataract (IDRiD)',
            'Image Captioning (Flickr30k + ViT + GPT2 Decoder)',
            'Malware Detection using PE Headers + XGBoost (EMBER dataset)',
            'Industrial Quality Inspection (Defect Segmentation) using Anomaly Detection',
            'Aerial Wildlife Detection &amp; Counting (Drone Imagery + YOLOv8)',
            'Vernacular Legal Contract Generation in Hindi + Marathi + Tamil (Indic LLM)',
          ].map((idea, i) => (
            <div key={i} className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-brand-500/30 transition-all">
              <span className="inline-block w-7 h-7 mr-2 rounded-lg bg-brand-500/15 text-brand-400 font-bold text-xs text-center leading-7 border border-brand-500/25">{i + 1}</span>
              <span className="text-sm text-zinc-200">{idea}</span>
            </div>
          ))}
        </div>
        <p className="mb-4 text-zinc-400">
          👉 <strong>Get all 100 AIML topics with roadmaps, dataset links & Viva Q&amp;A</strong> → Browse our <a href={`${CONSTANTS.APP_URL.replace(/\/$/, '')}/blueprint?category=AIML`} className="text-brand-400 font-bold underline underline-offset-4">1,078 Free Blueprint Topic Library</a>
        </p>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📡 100 IoT & Edge Computing Project Ideas
        </h2>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li>IoT based Smart Energy Meter with Real Time Theft Detection (ESP32 + PZEM-004T)</li>
          <li>Smart Health Monitoring Wearable Band — SpO2, ECG, Temp, Fall Detect (MAX30100 + MPU6050)</li>
          <li>AI-powered Automatic Sanitiser Dispenser with Fever Alert (MLX90614)</li>
          <li>GSM-based Agricultural Drip Irrigation with Soil Moisture Automation</li>
          <li>Smart Street Lighting System using LDR + PIR + Arduino Nano</li>
          <li>RFID-based Student Attendance &amp; Hostel In-Out Tracking</li>
          <li>IoT-based Gas Leakage &amp; Fire Detection with SMS/Call Alert (MQ2 + ESP8266)</li>
          <li>ESP32-CAM based Smart Doorbell with Face Recognition &amp; Telegram Alert</li>
          <li>IoT based Smart Parking System using Ultrasonic Sensors + Node-RED dashboard</li>
          <li>Automated Weather Station with Rain &amp; Lightning Prediction (BME280 + ML forecast)</li>
          <li>Vehicle Accident Detection &amp; Automatic SOS using GPS + GSM + Vibration Sensor</li>
          <li>TinyML on ESP32 for Voice Command Home Automation (Wake-word + Speech-2-Intent)</li>
          <li>LoRaWAN-based Smart City Waste Bin Level Monitor (TTN + Helium + RAK3172)</li>
          <li>IoT Precision Greenhouse Monitor — pH, EC, Humidity, CO2, Light + PID control</li>
          <li>RFID + Fingerprint Access Controlled Door Lock with Admin Dashboard</li>
          <li>Underground Cable Fault Detection using Voltage Divider + ESP32 + GPS Location</li>
          <li>Smart Water Quality Monitoring (TDS + Turbidity + pH + Dissolved Oxygen) with ThingSpeak</li>
          <li>Drone (Tello) + AI Wildlife Poacher Detection (YOLOv8 + Alert to Forest Dept)</li>
          <li>IoT + AI Industrial Vibration Predictive Maintenance (ADXL345 + Anomaly Detection)</li>
          <li>Smart Toll Collection using RFID Tag + OTP Verification + Automatic Boom Barrier</li>
          <li>Baby Monitoring System — Cry Detection Audio AI + Live Video Stream (Pi Zero 2W)</li>
          <li>Zigbee-based Smart Home Lighting Energy Optimizer + Theft Alert (XCTU + R-Pi)</li>
          <li>IoT Solar Panel Performance Monitoring (Current + Voltage + Irradiance + Clean Alert)</li>
          <li>Intelligent Bus Tracking + Arrival Prediction using GPS + Kalman Filter + ML</li>
          <li>Automatic Plant Watering + Nutrient Mix Hydroponic Controller (pH, EC, TDS sensors)</li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          🌐 100 Full-Stack Web Development & SaaS Project Ideas
        </h2>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li>Hospital Management System — Appointments, EMR, Insurance Claims (Next.js + PostgreSQL)</li>
          <li>Blood Bank Inventory + Emergency Donor Match Network (Razorpay + WhatsApp + Maps)</li>
          <li>Restaurant QR Code Ordering with Live Kitchen Display (KDS) + Digital Bill</li>
          <li>AI Resume Parser &amp; ATS Candidate Ranks + Matcher (NLP + PDF.js + FastAPI)</li>
          <li>Online Code Execution Sandbox (Judge0 CE) + AI Performance Doctor (Big-O)</li>
          <li>Blockchain Verified Voting System (Solidity + Hardhat + Metamask + Merkle Proofs)</li>
          <li>Multi-Vendor E-Commerce Marketplace with Recommendation Engine (TensorFlow.js)</li>
          <li>Decentralised Freelance Marketplace + Escrow Smart Contract (Polygon + IPFS)</li>
          <li>AI-Powered Legal Document Summariser &amp; Clause Risk Spotter (RAG + Legal-BERT)</li>
          <li>Ride-Hailing Clone with Driver Tracking + Dynamic Pricing (Next.js + Maps + Socket.io)</li>
          <li>Learning Management System (LMS) + AI Quiz Generator (PDF → MCQ BERT)</li>
          <li>Fintech Personal Finance + Budgeting + AI Expense Categoriser with OCR (Tesseract)</li>
          <li>Hotel Booking Platform — Multi-property, Channel Manager, Review Sentiment (BERT)</li>
          <li>Telehealth Video Consultation App + E-Prescription + Home Sample Pickup Scheduler</li>
          <li>Social Media Influencer Marketplace with AI Audience Fake-Follower Audit</li>
          <li>Online Code Collaboration Editor with Real Time Multi-cursor (Yjs + WebRTC)</li>
          <li>Restaurant Franchise Inventory Management with AI Waste & Theft Analytics</li>
          <li>Mutual Fund Portfolio Tracker — Live NAV + Goal-based SIP calculator + Tax Harvesting</li>
          <li>AI Based YouTube Thumbnail CTR Optimizer + Title Generator (Vision LLM)</li>
          <li>E-District Service Portal — Documents Application, Status Tracking, Digital Sign</li>
          <li>Remote Employee Productivity Tracker with AI Focus Score + Privacy-first Screenshots</li>
          <li>PG / Hostel Management — Meals, Rent Collection, Complaints, Gate Pass OTP</li>
          <li>Farmers Mandi — Direct Crop Sell Platform with Mandi Price Forecasting (ML)</li>
          <li>Co-Working Space Management — Desk Booking, Meeting Rooms, Access Cards</li>
          <li>Courier / Parcel Last-Mile Tracking with Real-Time ETA Prediction</li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          🔐 50 Cybersecurity & Ethical Hacking Project Ideas
        </h2>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li>AI Phishing URL &amp; Look-alike Domain Scanner + Browser Extension (BERT + WHOIS)</li>
          <li>Real-Time Network Intrusion Detection System (CSE-CIC-IDS2018 + Bi-LSTM)</li>
          <li>Malware PE File Classifier (EMBER 2018 + XGBoost + EmberNN)</li>
          <li>SQL Injection &amp; XSS Vulnerability Scanner with OWASP ZAP Headless API</li>
          <li>Zero-Knowledge Password Manager — Client Side Encrypted (AES-256-GCM)</li>
          <li>Blockchain Digital Evidence Chain of Custody for Cyber Crime Cases</li>
          <li>AI Powered Insider Threat Detection (UEBA + Isolation Forest on LDAP Logs)</li>
          <li>Secure Federated Learning for Credit Card Fraud (Horizontal FL + Flower)</li>
          <li>Bug Bounty Recon Automation Framework (Subdomain + Port + Nuclei Scan)</li>
          <li>Post-Quantum Cryptography File Transfer (CRYSTALS-Kyber + Streamlit)</li>
          <li>SIEM Dashboard with Live Threat Map + MITRE ATT&amp;CK Heatmap</li>
          <li>Automated OSINT Footprinting Tool for Ethical Hacking Coursework</li>
          <li>Dark Web Monitor + Credential Leak Alert (Breach-Parse + HaveIBeenPwned API)</li>
          <li>Ransomware Behaviour Detection using API Hooking + Random Forest</li>
          <li>Blockchain-based Decentralised Identity (DID + VC) for University Certificates</li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📊 50 Data Science & Data Engineering Project Ideas
        </h2>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li>Delhi House Price Prediction — Geographic + Amenity + Proximity Features</li>
          <li>Flipkart / Amazon Product Review Sentiment + Fake Review Detector</li>
          <li>Uber / Ola Dynamic Surge Pricing ML Model (NYC Taxi Dataset)</li>
          <li>Bangalore Traffic Congestion Forecasting — Hourly + Weather + Events</li>
          <li>Air Quality Index (AQI) Predictor for 10 Indian Megacities (OpenAQ + Prophet)</li>
          <li>Food Delivery Time ETA Prediction (Zomato Dataset + CatBoost)</li>
          <li>Employee Attrition Classification + Counterfactual Recommendation Engine</li>
          <li>Zomato Restaurant Success Predictor (Cuisine + Price + Location + Sentiment)</li>
          <li>Mumbai Rainfall Prediction (100 Year Data + XGBoost + LSTM)</li>
          <li>Customer Churn Prediction for Telecom (Telco Dataset + SHAP Explainability)</li>
          <li>Crime Rate Hotspot Forecasting by City Ward (Chicago + Spatial ML)</li>
          <li>E-Commerce Sales Demand Forecasting with Promotional Uplift Model</li>
          <li>YouTube Channel Growth Analytics Dashboard + Virality Predictor (Streamlit)</li>
          <li>India Election Results Data Visualisation — Ward-Level Interactive Choropleth</li>
          <li>Nifty / BankNifty Stock Movement Classifier Using News + Technical Indicators</li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          💰 50 Startup & SaaS-Flavour Project Ideas (Placement Impressive)
        </h2>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li>HireVerify AI — Background Check Platform for Gig Workers (Face + Aadhaar OCR)</li>
          <li>FarmLedger — Blockchain PMFBY Crop Insurance + Satellite Claims (Sentinel-2)</li>
          <li>DocuDraft India — Vernacular Legal Contract Generator (Hindi + Marathi + Tamil)</li>
          <li>ClassX AI — Personalised Adaptive Learning + NCERT Doubt Solver Tutor</li>
          <li>LocalKirana SaaS — Neighbourhood Kirana Digital Billing + UPI + Inventory + WhatsApp</li>
          <li>MediSaver — Generic Medicine Alternative Finder (1mg API + Price Comparison)</li>
          <li>UrbanClap Clone + AI Task Matching with Freelancer Skill Validation</li>
          <li>CampusPlace AI — Resume Shortlist + Automated Interview Scheduler + ATS</li>
          <li>AutoRTO — Driving Licence Test Booking + Learning MCQ App (RTO Approved)</li>
          <li>AutoChhalaang — School Bus Live Tracker + Parent App + RFID Tap In/Out</li>
          <li>EVezy — EV Charging Station Finder + Slot Booking + Dynamic Tariff Optimiser</li>
          <li>SmartSahay — Vernacular Government Scheme Eligibility Screener (Jan Dhan, PM)</li>
          <li>DoctorDial — Online Clinic Booking + Prescription Vault + Pharmacy Home Delivery</li>
          <li>FoodDonor — Connect Restaurants Surplus Food with Orphanages (Route Optimiser)</li>
          <li>ShareBajar — P2P Tool / Equipment Rental Marketplace with Insurance Addon</li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📚 50 Mini Project Ideas (Sem 5 / Sem 6 — Low Complexity, High Marks)
        </h2>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li>Personal Expense Tracker with CSV Export &amp; Pie-Chart Dashboard</li>
          <li>Library Management System with Barcode Issue / Return + Fine Calculator</li>
          <li>Gym Membership Management — Plan, Workout Routine, Diet Chart Generator</li>
          <li>Online Quiz Contest Platform — Admin MCQ Bank + Timer + Leaderboard</li>
          <li>Student Result Portal with Semester-wise CGPA / SGPA Calculator (VTU formula)</li>
          <li>Recipe Website with Ingredient-based Search + Nutritional Info from API</li>
          <li>Smart To-Do App — Eisenhower Matrix + Pomodoro Timer + Voice Input</li>
          <li>Password Manager (Local Storage Encrypted) with Master Password</li>
          <li>Weather App — 7 Day Forecast + Air Pollution Index (OpenWeather + Maps)</li>
          <li>Tour & Travel Booking Website — Package Search + UPI Payment Demo</li>
          <li>Online Notary Document E-Sign Demo Workflow</li>
          <li>Employee Leave Management System — Balance, Apply, Approve/Reject</li>
          <li>E-Magazine CMS with Markdown Articles + Comment Section</li>
          <li>Bus / Train Ticket Reservation Demo — Seat Matrix + Printable Ticket</li>
          <li>COVID-19 Vaccination Slot Finder — Cowin API clone + Pincode search</li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          🚀 50 RAG, LLM, GenAI & Agent Project Ideas (2026 HOT DEMAND)
        </h2>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li>Multimodal RAG for Complex PDFs (Tables + Charts + Flowcharts + Equations)</li>
          <li>GraphRAG Medical Assistant — Disease-Drug-Symptom Knowledge Graph (Neo4j)</li>
          <li>Research Paper Reading Assistant — PDF Chat + Citation Verified Answers</li>
          <li>Custom GPT for University Syllabus — Semester-wise Topic Tutor</li>
          <li>AI Technical Documentation Generator — GitHub Repo → 60 Page IEEE Report</li>
          <li>AI Product Manager — User Research → PRD → Tech Specs → JIRA Tickets</li>
          <li>Legal Contract Clause Risk Analyser — Highlight Dangerous Clauses + Red Flags</li>
          <li>Multi-Agent Software Dev Crew — PM + Developer + Tester (CrewAI / LangGraph)</li>
          <li>YouTube Long-form → 10 Reels Script Generator with Timestamp Clips</li>
          <li>Research Paper Idea Generator — Gap Analysis + Novelty Check vs Arxiv</li>
          <li>Resume to JD Fit Score + Gap Closing Course Recommender (RAG over Coursera)</li>
          <li>SQL Query Agent — NL → SQL → Visual Chart — Text-2-SQL with Error Fix Loop</li>
          <li>AI Content Moderation Multi-Modal (Toxic Text + NSFW Image + Hate Speech)</li>
          <li>Indian Tax Saving Optimiser Chatbot — HRA, 80C, NPS, ELSS Deduction Planner</li>
          <li>Vernacular AI Doubt Solver — Class 10-12 NCERT PDF Q&amp;A in 8 Languages</li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          ❓ FAQ — Project Selection Questions Every Student Asks
        </h2>
        <div className="space-y-4 mb-10">
          {[
            { q: 'What is the easiest final year project that gets an A+?', a: 'Any project that includes: (a) a live working demo, (b) AI/ML layer or IoT sensor layer, (c) a 60-page IEEE report, and (d) crisp PPT slides with speaker notes. Good easy options: AI Resume Parser, Face Recognition Attendance, Plant Disease Detection, Expense Tracker with AI OCR.' },
            { q: 'Should I choose a project just because YouTube has tutorials for it?', a: 'Avoid. Examiners punish "copy-paste from YouTube" projects. Use tutorials only to understand concepts, then build your own unique version with additional modules (e.g. add face anti-spoofing to a face recognition project, add XAI heatmaps to disease detection).' },
            { q: 'Mini vs Major — how many pages and how many features minimum?', a: 'Mini: 30-page report, 3 core modules, 5 database tables. Major: 60-page report, 6+ modules, 10+ tables, authentication, dashboard, admin panel, mobile-responsive UI, evaluation metrics.' },
            { q: 'Which branch projects are the EASIEST to get marks?', a: 'Full-Stack Web Dev + small AIML addon (e.g., "Hospital Management + AI Disease Prediction Module"). This is easy to demo on a laptop, no hardware required, and examiners can see everything on screen.' },
            { q: 'How to decide between self-build vs ready-made kit?', a: 'If your submission is in < 30 days: Buy a verified SubmitKit kit — save time, guarantee running code, and focus exclusively on report & PPT & viva. If you have 3+ months AND you want to strengthen coding skills: build from scratch, but use our Free Blueprint roadmap first so you have a step-by-step plan.' },
          ].map((f, i) => (
            <details key={i} className="p-5 rounded-2xl bg-zinc-900/70 border border-white/10 group open:border-brand-500/30 transition-all">
              <summary className="cursor-pointer font-bold text-white text-base md:text-lg flex items-start gap-3">
                <span className="text-brand-400 font-black shrink-0">Q{i + 1}.</span>
                <span>{f.q}</span>
              </summary>
              <p className="text-sm md:text-base text-zinc-300 pl-9 mt-3 leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>
        {CTA_INTERNAL_LINK}
      </article>
    ),
    faq: [
      { question: 'Which project topic is best for final year CSE 2026?', answer: 'Top-5 highest-scoring CSE final year project topics for 2026 are: (1) Face Recognition Attendance with Anti-Spoofing, (2) Multimodal PDF RAG with LlamaIndex, (3) Credit Card Fraud Detection with SMOTE + XGBoost, (4) Hospital Management + EHR Portal, (5) QR Restaurant Ordering with Live KDS. All combine working demo + AI/IoT layer + robust reporting format.' },
      { question: 'Where can I get project topics with full IEEE reports and source code?', answer: 'SubmitKit.in is the fastest and most affordable option in India. Each project bundle includes 1-click runnable source code, a 60-page IEEE format editable Black Book (.docx), ready-to-present PPT with speaker notes, and the top 25 examiner Viva Q&A with full answers. Download is instant via WhatsApp & email — prices start at ₹299 (Mini) / ₹499 (Major).' },
      { question: 'What is the minimum page count for a final year Black Book?', answer: 'For Mini projects (Sem 5/6): minimum 30 pages. For Major Final Year (Sem 7/8): minimum 60 pages, 14 chapters in standard IEEE order (Title, Certificate, Acknowledgement, Abstract, List of Figures/Tables, Chapters 1-7, References, Appendix, CD Content). Every SubmitKit Major kit comes with a complete 60-page report ready to edit and print.' },
      { question: 'Which projects have the highest Viva success rate?', answer: 'Projects with a clear working demo, 3-4 measurable evaluation metrics (accuracy, precision, recall, F1, MAE, R², etc.), architecture diagram explanations, and 2-3 future scope lines tend to have 95%+ Viva success rates. SubmitKit bundles include a top 25 Q&A list with examiner-ready answers specifically to maximise your score.' },
      { question: 'Are GitHub repos reliable for final year submissions?', answer: 'No — 90% of free GitHub repos come with: broken dependencies, missing model weights, no README, no report, no PPT, and datasets that are paywalled or offline. Students waste 10-20 days just fixing setup errors. A SubmitKit verified kit guarantees 1-click runnable code plus report + PPT + Viva Q&A all in one bundle for ₹299-499.' },
    ],
  },

  'face-recognition-attendance-system-project-report': {
    content: (
      <article className="prose prose-invert max-w-none text-zinc-300 text-sm md:text-base leading-[1.8]">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.1] mb-4">
          Face Recognition Attendance System Project — Complete Report, PPT, Viva & Source Code (2026)
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8">
          Everything you need to get an A+ in the Face Recognition Attendance final year project. Abstract, problem statement, system architecture, algorithms, database schema, 60-page IEEE report outline, PPT slides, and the top 25 most asked Viva questions with examiner-approved answers.
        </p>
        {CTA_INTERNAL_LINK}
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📄 Abstract & Problem Statement
        </h2>
        <p className="mb-4 leading-relaxed">
          Traditional paper-based and manual biometric attendance systems suffer from proxy attendance, human error, high cost, and long queues. The <strong>Face Recognition Attendance System</strong> solves this by using computer vision &amp; deep learning to recognise registered faces from a live camera feed, automatically mark the student &quot;Present&quot; in a cloud database with timestamp + GPS location, and export attendance reports in Excel / PDF for faculty administration.
        </p>
        <p className="mb-6 leading-relaxed">
          This project is <strong>the single most chosen final year CSE AIML topic</strong> across VTU, SPPU Pune, Mumbai, Anna, JNTU, GTU universities because: it has a very impressive live demo, the report writes itself (clear architecture + algorithms), and the examiner can instantly understand every module without you struggling to explain it.
        </p>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          🏗️ Recommended System Architecture (2026 Standard)
        </h2>
        <p className="mb-4">
          The most modern, examiner-preferred tech stack for this project in 2026 is shown below. <strong>Avoid outdated Eigenfaces / Fisherfaces (2008)</strong>. Examiners want to see dlib, FaceNet/ArcFace, MTCNN, and anti-spoofing checks.
        </p>
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 mb-8 space-y-3">
          <div><span className="inline-block px-2 py-1 rounded-lg bg-brand-500/15 text-brand-400 font-bold text-xs mr-3 border border-brand-500/25 w-24 text-center">Frontend</span>Next.js 14 + TypeScript + Tailwind + Lucide Icons (Admin panel, Student dashboard, Live camera stream)</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-bold text-xs mr-3 border border-emerald-500/25 w-24 text-center">API</span>FastAPI / Flask — Python (heavy OpenCV / DL processing cannot run in Node)</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-amber-500/15 text-amber-400 font-bold text-xs mr-3 border border-amber-500/25 w-24 text-center">Face AI</span>MTCNN detector + dlib 68-landmark alignment + FaceNet (InceptionResNetV1) 128-dim embedding + ArcFace classifier</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 font-bold text-xs mr-3 border border-indigo-500/25 w-24 text-center">Anti-Spoof</span>MiniFASNet (Silent-Face-Anti-Spoofing) — blocks phone photo attacks</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-sky-500/15 text-sky-400 font-bold text-xs mr-3 border border-sky-500/25 w-24 text-center">Database</span>PostgreSQL (students, class, attendance log, embeddings table BLOB) + Redis daily lock cache</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-purple-500/15 text-purple-400 font-bold text-xs mr-3 border border-purple-500/25 w-24 text-center">Storage</span>AWS S3 / Supabase Storage for student profile JPG + daily attendance CSV export</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-rose-500/15 text-rose-400 font-bold text-xs mr-3 border border-rose-500/25 w-24 text-center">Auth</span>JWT — Faculty vs Student vs Admin RBAC role login</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-teal-500/15 text-teal-400 font-bold text-xs mr-3 border border-teal-500/25 w-24 text-center">Notify</span>Daily class WhatsApp report via Twilio / official email digest via Nodemailer</div>
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📐 60-Page IEEE Black Book Report Structure
        </h2>
        <p className="mb-6">Copy-paste this EXACT chapter-by-chapter page distribution. It matches all Indian university norms (VTU, SPPU, MU, AU, JNTU, GTU, RGPV, MDU):</p>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li><strong>Title Page + Certificate + Declaration (2 pages)</strong></li>
          <li><strong>Acknowledgement + Dedication (1-2 pages)</strong></li>
          <li><strong>Abstract — Half page + 5 Keywords (I.1)</strong></li>
          <li><strong>Table of Contents + List of Figures + Tables (3 pages)</strong></li>
          <li><strong>Chapter 1 — Introduction (5 pages)</strong>: Background, Need, Motivation, Problem Statement, Objectives, Scope, Organisation of the Report</li>
          <li><strong>Chapter 2 — Literature Survey (8 pages)</strong>: 8 past papers 2020-2026 (IEEE Xplore) — Eigenfaces, LBPH, FaceNet, ArcFace, MiniFAS</li>
          <li><strong>Chapter 3 — System Requirement & Analysis (5 pages)</strong>: Functional / Non-Functional, Hardware/Software, Requirement Table, Feasibility Study</li>
          <li><strong>Chapter 4 — System Architecture & Design (8 pages)</strong>: Block Diagram, UML Use Case, Class, Sequence, Activity, ER Diagram, UI Wireframes</li>
          <li><strong>Chapter 5 — Tools, Technologies & Algorithms (9 pages)</strong>: FaceNet paper explanation, MTCNN, dlib, Cosine Similarity Threshold, Anti-Spoof</li>
          <li><strong>Chapter 6 — Implementation / Modules (10 pages)</strong>: Code screenshots for 6 modules: Registration, Embedding Store, Live Stream, Recognition, Report, Admin</li>
          <li><strong>Chapter 7 — Testing & Evaluation (7 pages)</strong>: Unit, Integration, System Test cases; Accuracy, FAR, FRR, ROC, Confusion Matrix on LFW dataset (Target ≥ 99%)</li>
          <li><strong>Chapter 8 — Result & Discussion (3 pages)</strong>: Comparison table with baseline methods, Sample output screenshots, Live demo snaps</li>
          <li><strong>Chapter 9 — Conclusion & Future Scope (2 pages)</strong>: 3-4 lines conclusion + 5 concrete Future lines</li>
          <li><strong>References (40+ references, IEEE format) + Appendix A (ER) + B (Sample Code) + C (CD Content) (3 pages)</strong></li>
        </ol>
        <p className="mb-6 text-zinc-400">
          ✅ <strong>Don&apos;t want to type all 60 pages from scratch?</strong> Our <a href={`${CONSTANTS.APP_URL.replace(/\/$/, '')}/projects/healthcare-ehr-portal`} className="text-brand-400 font-bold underline underline-offset-4">SubmitKit Face Recognition project</a> (Major ₹499) includes a <em>ready-to-print 60-page .docx</em> with ALL chapters already filled, including the Literature Survey with real IEEE citations.
        </p>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          🧑‍🏫 Top 25 Viva Questions & Examiner-Approved Answers
        </h2>
        <div className="space-y-3 mb-10">
          {[
            { q: 'Difference between Face Detection and Face Recognition?', a: 'Face Detection (MTCNN/YOLO) = "Where is the face in this image?" (bounding box). Face Recognition (FaceNet/ArcFace) = "Who is this person?" — converts detected face into 128-dim embedding vector, compares cosine distance against registered embedding database, returns name if threshold < 0.5-0.7.' },
            { q: 'Why FaceNet and not Eigenfaces?', a: 'Eigenfaces (PCA-based, 2001) fails with pose, lighting, glasses, ageing. It needs retraining when a new person is added. FaceNet (2015, Google) uses a 128-D embedding space where L2 distance directly maps to facial similarity — it is a one-shot learner, so adding new students only needs 1 photo, no retraining. LFW accuracy: Eigenfaces ~85%, FaceNet 99.63%.' },
            { q: 'What is Anti-Spoofing and why is it required?', a: 'Without anti-spoofing, a student can hold up a phone photo of his friend and get marked Present. Anti-Spoofing (MiniFASNet / Silent-Face) runs a binary classifier: Real Face vs Spoof Attack (photo, screen, mask, printed paper). It uses rPPG blood-flow signal, texture analysis, and depth cues. Threshold score ≥ 0.7 = accept as real.' },
            { q: 'What is dlib 68-point landmark detector used for?', a: 'Face alignment BEFORE embedding extraction. The 68 landmarks (jaws, eyebrows, eyes, nose, mouth) allow us to geometrically rotate & crop every face into a canonical pose, so the recognition network sees standardised inputs — improves accuracy by 15-20%.' },
            { q: 'Threshold: what value did you choose for cosine similarity & why?', a: '0.55 on LFW benchmark gives best FAR/FRR balance (EER ~0.4%). If threshold is too low (0.25), we accept imposters (high FAR). If threshold too high (0.9), we reject genuine users (high FRR). Tuned on validation subset using DET curve.' },
          ].map((v, i) => (
            <div key={i} className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-brand-500/30 transition-all">
              <p className="font-bold text-white text-base mb-2"><span className="text-brand-400 mr-2">Q{i+1}.</span>{v.q}</p>
              <p className="text-sm text-zinc-300 leading-relaxed pl-6">{v.a}</p>
            </div>
          ))}
        </div>
        <p className="mb-6 text-zinc-400">
          👉 Get <strong>the full 25 Viva Q&amp;A PDF with answers</strong> — included in every SubmitKit bundle → <a href={`${CONSTANTS.APP_URL.replace(/\/$/, '')}/projects`} className="text-brand-400 font-bold underline underline-offset-4">Open Project Catalog</a>
        </p>
        {CTA_INTERNAL_LINK}
      </article>
    ),
    faq: [
      { question: 'How much does it cost to buy the Face Recognition Attendance project with source code & report?', answer: 'The verified SubmitKit Face Recognition Attendance System Major project kit costs ₹499 (one-time). It includes: 1-click runnable full source code (Next.js frontend + FastAPI face engine), 60-page editable IEEE format Black Book report (.docx), ready-to-present Viva defense PPT with speaker notes, and the complete top 25 examiner Viva Q&A with full answers.' },
      { question: 'What dataset is used for Face Recognition Attendance project?', answer: 'Use 3 datasets: (1) LFW (Labeled Faces in the Wild) — 13,233 images for model benchmark accuracy testing, (2) Georgia Tech Face Database for cross-pose validation, (3) your own custom classroom dataset — 10-15 photos of each registered student in classroom lighting conditions with glasses/no glasses, smile/neutral, different angles.' },
      { question: 'What is the minimum accuracy a Face Recognition final year project should get?', answer: 'To get an A grade, report ≥ 97% rank-1 accuracy on your classroom test set and ≥ 99% on LFW benchmark. Use anti-spoofing + alignment + FaceNet/ArcFace to hit this. Also report EER (Equal Error Rate) < 0.5% for examiner credibility.' },
      { question: 'How many modules should the Face Recognition system have?', answer: 'For a final year major submission, 6 minimum: (1) Admin/Student Role-based Login & Auth, (2) Student Registration with Photo + Details, (3) Class/Course CRUD + Timetable, (4) Live Camera Attendance Marking with Anti-Spoofing, (5) Attendance Reports Excel/PDF/Email, (6) Analytics Dashboard with heatmaps by date/student.' },
      { question: 'Can this project be submitted for both Mini and Major levels?', answer: 'Yes. Mini (Sem 5/6): remove Anti-Spoof + Admin roles, do just the core face recognition + CSV export. Major (Sem 7/8): add Anti-Spoofing, GPS Geo-fencing, WhatsApp daily summary, Multi-class, RBAC Admin, email weekly summary, and XAI saliency map for which landmarks contributed most to the match.' },
    ],
  },

  'plant-disease-detection-using-cnn-python-tensorflow': {
    content: (
      <article className="prose prose-invert max-w-none text-zinc-300 text-sm md:text-base leading-[1.8]">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.1] mb-4">
          Plant Disease Detection Using CNN — Python & TensorFlow Project (Report, PPT, Viva, Source)
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8">
          The #1 AgriTech final year project for 2026. PlantVillage dataset, ResNet50 vs MobileNetV2 vs EfficientNetB3, data augmentation pipeline, complete report outline, PPT, and 25 Viva Q&amp;A.
        </p>
        {CTA_INTERNAL_LINK}
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          🌱 Abstract & Problem Statement
        </h2>
        <p className="mb-4 leading-relaxed">
          India is the 2nd largest agricultural producer in the world, yet 20-40% of crop yield is lost annually due to undetected plant diseases. Farmers visit extension offices physically to get leaf diagnosis — 7+ days delay. The <strong>Plant Disease Detection using CNN</strong> project lets any farmer <em>upload a single leaf photo via smartphone</em> and receive an instant disease name, confidence %, severity, and pesticide recommendation in regional language.
        </p>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📊 PlantVillage Dataset — 54,305 Images, 38 Classes
        </h2>
        <p className="mb-6">
          Use the official PlantVillage dataset (Penn State University — CC-BY): 14 crop species (Apple, Blueberry, Cherry, Corn, Grape, Orange, Peach, Pepper, Potato, Raspberry, Soybean, Squash, Strawberry, Tomato) × 38 healthy / diseased classes. Train: 70% (~38,000), Validation: 15% (~8,100), Test: 15% (~8,100). <em>Always report class-wise accuracy, not just overall.</em>
        </p>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          🧠 Best Model Architecture 2026
        </h2>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li><strong>Input Preprocessing</strong>: Resize 224×224, Normalize (mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225])</li>
          <li><strong>Data Augmentation</strong>: RandomHorizontalFlip + RandomRotation(±25°) + RandomZoom(±15%) + RandomBrightness + RandomContrast + CutMix (reduces overfitting by ~18%)</li>
          <li><strong>Backbone</strong>: EfficientNetB3 (ImageNet pretrained) — better than ResNet50 / MobileNet in 2026 because it scales width + depth + resolution together</li>
          <li><strong>Head</strong>: GlobalAveragePooling2D → BatchNorm → Dense 512 ReLU → Dropout 0.5 → Dense 38 Softmax</li>
          <li><strong>Transfer Strategy</strong>: Phase 1 (10 epochs) freeze backbone, train head only. Phase 2 (25 epochs) unfreeze top 30 layers, fine-tune with LR 1e-5 + ReduceLROnPlateau.</li>
          <li><strong>Optimizer</strong>: AdamW (weight decay 1e-4) + Label Smoothing 0.1</li>
          <li><strong>Loss</strong>: Categorical Crossentropy with Class Weights for imbalanced classes</li>
          <li><strong>Expected Test Accuracy</strong>: 98.2-99.1% on PlantVillage held-out (Easy 90+ marks in evaluation chapter)</li>
        </ol>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📐 60-Page IEEE Black Book Chapter Plan
        </h2>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li>Title, Certificate, Acknowledgement — 2 pages</li>
          <li>Abstract + Keywords — 1 page</li>
          <li>Table of Contents, Figures, Tables — 3 pages</li>
          <li>Chapter 1 — Introduction: Agriculture in India, Yield Loss, Farmer&apos;s Need, Problem Statement, 4 Objectives, Scope — 5 pages</li>
          <li>Chapter 2 — Literature Survey: 8 papers 2020-2026 (AlexNet, VGG, Inception, ResNet, MobileNet, EfficientNet, ViT on PlantVillage) — 8 pages</li>
          <li>Chapter 3 — Requirement Analysis: Functional (Upload → Predict → History → Admin), Non-Functional, Hardware/Software Tables — 5 pages</li>
          <li>Chapter 4 — System Design: Block diagram, Use Case, Activity, Sequence, ERD, UI Mockups — 8 pages</li>
          <li>Chapter 5 — Tools & Algorithms: CNN theory, Transfer Learning, AdamW, EfficientNet paper explanation, CutMix, Grad-CAM — 9 pages</li>
          <li>Chapter 6 — Implementation: Flask/FastAPI backend, React/Next UI, Model H5 save/load, Prediction function code — 10 pages</li>
          <li>Chapter 7 — Testing & Evaluation: Confusion matrix (38×38), Per-class F1, ROC-AUC macro, Comparison vs ResNet50 vs MobileNet — 7 pages</li>
          <li>Chapter 8 — Results & Discussion: Grad-CAM heatmap output screenshots, 3 sample correct + 2 failure mode analysis — 3 pages</li>
          <li>Chapter 9 — Conclusion + Future Scope: Hindi / Kannada / Telugu vernacular output, drone multi-plant disease, soil-NPK advice integration — 2 pages</li>
          <li>References (IEEE, 40+) + Appendix: ER Diagram + Sample Code + Snapshots — 3 pages</li>
        </ol>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          🔥 Top 15 Viva Questions (Plant Disease Detection)
        </h2>
        <div className="space-y-3 mb-10">
          {[
            { q: 'Why EfficientNetB3 and not ResNet?', a: 'EfficientNet uses compound scaling (width α, depth β, resolution γ) with neural architecture search — it reaches higher accuracy at 1/10 the parameters of ResNet50. For 224×224 input: ResNet50 = ~96.5% accuracy vs EfficientNetB3 = ~99.0% on PlantVillage, and 6MB vs 98MB file size (critical for mobile deployment).' },
            { q: 'Why do we need data augmentation?', a: 'Without augmentation, CNNs memorize training data (overfit). Augmentations create visually-valid variations of each training image. CutMix pastes a disease patch from one image onto a healthy background — forces the model to look at the lesion region instead of background bias. Improves generalisation to unseen fields/lighting.' },
            { q: 'What is Grad-CAM and why did you show it?', a: 'Gradient-weighted Class Activation Mapping = explainable AI heatmap. It shows which pixel regions of the leaf contributed most to the disease prediction class. It proves the model looked at the actual lesion (not background dirt or leaf edge) — examiners LOVE XAI demonstrations, it pushes your project from B-grade to A+' },
            { q: 'What metrics besides accuracy do you report?', a: 'For imbalanced multi-class: per-class precision, recall, F1-score, macro F1, macro ROC-AUC, top-2 error rate, Matthews Correlation Coefficient. Accuracy alone is misleading. A model can get 95% accuracy by just predicting the majority class — the confusion matrix uncovers this.' },
            { q: 'How do you handle a disease class with only 100 training images?', a: '3 techniques together: (1) Class weights in loss function, (2) SMOTE in embedding space after feature extraction, (3) Synthetic image generation using Stable Diffusion fine-tuned on that class. Also oversample that minority class 3:1 during each batch.' },
          ].map((v, i) => (
            <div key={i} className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-brand-500/30 transition-all">
              <p className="font-bold text-white text-base mb-2"><span className="text-brand-400 mr-2">Q{i+1}.</span>{v.q}</p>
              <p className="text-sm text-zinc-300 leading-relaxed pl-6">{v.a}</p>
            </div>
          ))}
        </div>
        {CTA_INTERNAL_LINK}
      </article>
    ),
    faq: [
      { question: 'What is the easiest CNN model for plant disease detection?', answer: 'MobileNetV2 fine-tuned on PlantVillage is the easiest: small 14 MB, runs on CPU, reaches ~97% accuracy in 15 epochs. For examiner A+ grade, use EfficientNetB3 (99% test) and add a Grad-CAM visualisation to each prediction output — the XAI element is what distinguishes your project from 100 other identical submissions.' },
      { question: 'Is PlantVillage dataset enough for final year submission?', answer: 'PlantVillage alone is adequate for Mini (Sem 5/6) submissions. For a Major (Sem 7/8) project, supplement it with: (1) 1,000 real Indian farm images collected by youself (on-campus fields / local farmers), (2) 3-4 classes of Indian-local diseases not present in PlantVillage, (3) vernacular pesticide recommendation output (Hindi / Marathi / Kannada / Telugu based on user location).' },
      { question: 'Can this project be converted into an Android app?', answer: 'Yes. Convert the H5/Keras model to TensorFlow Lite (.tflite, INT8 quantised). The 6 MB EfficientNetB3 tflite model runs at 25 fps on an ₹8,000 Android phone. Use cameraX API for real-time live disease detection without server. SubmitKit bundles include a step-by-step TFLite porting chapter in the PPT.' },
      { question: 'How many pages / features minimum for this major project?', answer: '60-page IEEE report minimum. 6 core modules minimum: (1) Farmer/Admin login, (2) Single or batch photo upload, (3) Disease prediction with %, (4) Severity stage + vernacular pesticide cure recommendation, (5) Prediction history with geo-tags, (6) Admin: dataset retraining trigger + model version management.' },
      { question: 'Where to buy the full Plant Disease CNN project bundle with editable report?', answer: 'SubmitKit.in Plant Disease Detection Using CNN Major bundle is ₹499 one-time. Includes 1-click runnable code (Python + Flask), 60-page editable IEEE format .docx report, complete 25-slide defense PPT with speaker notes, PlantVillage dataset download links, and top 25 Viva Q&A with examiner-approved answers. Download on WhatsApp in 30 seconds after UPI payment.' },
    ],
  },

  'credit-card-fraud-detection-machine-learning-project': {
    content: (
      <article className="prose prose-invert max-w-none text-zinc-300 text-sm md:text-base leading-[1.8]">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.1] mb-4">
          Credit Card Fraud Detection ML Project — Complete Report, PPT, Viva & Source Code
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8">
          The most in-demand FinTech + Data Science final year project for 2026. Kaggle IEEE-CIS dataset, SMOTE + ADASYN, Logistic vs Random Forest vs XGBoost vs Autoencoder anomaly detection, 60-page IEEE format report outline and the 25 most-asked Viva questions.
        </p>
        {CTA_INTERNAL_LINK}
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          💰 Project Background & Why Examiners Love It
        </h2>
        <p className="mb-4 leading-relaxed">
          Indian banks lose ₹20,000+ Crores annually in credit &amp; debit card fraud (RBI 2026 report). The Credit Card Fraud Detection ML model runs in real time on every transaction (under 12 ms), scores it, and blocks high-risk payments automatically. It is perfect for final year because: it includes a <em>classic imbalanced ML problem</em> that forces you to demonstrate proper evaluation beyond simple accuracy, the datasets are public, and the banking use case impresses every examiner and HR recruiter in placements.
        </p>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📦 Datasets — 2 Gold Standards
        </h2>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li><strong>Kaggle — Credit Card Fraud Detection (Worldline & UL)</strong>: 284,807 European card transactions over 2 days, 492 frauds (0.172% — highly imbalanced). 28 PCA anonymised features + Time + Amount. (Start with this, 150 MB)</li>
          <li><strong>IEEE-CIS Fraud Detection (Vesta Corp.)</strong>: 590,540 transactions, 390+ raw features (card, address, email domain, device info, time delta). Best for Major-level submissions because you can do heavy Feature Engineering + Categorical embedding. (5 GB)</li>
        </ol>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          ⚙️ Machine Learning Pipeline Architecture
        </h2>
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 mb-8 space-y-3">
          <div><span className="inline-block px-2 py-1 rounded-lg bg-brand-500/15 text-brand-400 font-bold text-xs mr-3 border border-brand-500/25 w-28 text-center">Step 1</span>Exploratory Data Analysis: KDE of Amount vs Class, Time-of-day patterns, 0 transaction amounts.</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-amber-500/15 text-amber-400 font-bold text-xs mr-3 border border-amber-500/25 w-28 text-center">Step 2</span>Feature Engg: Hour/Day-of-Week, Relative-Amount-by-Card, Transaction Velocity (n txns in past 24h for the card), Merchant-category risk score.</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 font-bold text-xs mr-3 border border-indigo-500/25 w-28 text-center">Step 3</span>Train/Validation/Test split — Stratified GroupKFold by card_id (70/15/15) — <em>never random split</em>, causes data leakage.</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-rose-500/15 text-rose-400 font-bold text-xs mr-3 border border-rose-500/25 w-28 text-center">Step 4</span>Imbalance handling: SMOTE (oversample minority) + ENN (edited nearest neighbours clean majority) or class_weight: balanced inside the algo.</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-bold text-xs mr-3 border border-emerald-500/25 w-28 text-center">Step 5</span>Compare 5 models: Logistic Regression (baseline), Random Forest, LightGBM, XGBoost (Winner ~98% PR-AUC), Autoencoder reconstruction-threshold.</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-sky-500/15 text-sky-400 font-bold text-xs mr-3 border border-sky-500/25 w-28 text-center">Step 6</span>Threshold tuning: minimise cost function = C_fn × FN + C_fp × FP (false negatives cost 100× false positives)</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-teal-500/15 text-teal-400 font-bold text-xs mr-3 border border-teal-500/25 w-28 text-center">Step 7</span>Explainability: SHAP beeswarm plot — shows which features (Amount, V14, V17, Merchant_Risk) drove each fraud decision (HUGE Viva + marks favourite)</div>
          <div><span className="inline-block px-2 py-1 rounded-lg bg-purple-500/15 text-purple-400 font-bold text-xs mr-3 border border-purple-500/25 w-28 text-center">Step 8</span>Deployment: Flask/FastAPI + pickle joblib model + Streamlit dashboard with real-time transaction simulator.</div>
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📊 Correct Evaluation Metrics (DO NOT report plain accuracy)
        </h2>
        <p className="mb-6 text-zinc-400">
          <strong>Accuracy is meaningless in imbalanced fraud</strong>. A dumb "No Fraud" classifier gets 99.827% accuracy on the Kaggle dataset and fails 100% of frauds. You MUST report:
        </p>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li>Precision (P), Recall (R), F1-score on <em>the fraud (positive) class alone</em></li>
          <li>PR-AUC (Area Under Precision-Recall Curve) — gold standard for imbalanced, <strong>not ROC-AUC</strong></li>
          <li>Confusion matrix: TN, FP, FN, TP with values</li>
          <li>Matthew&apos;s Correlation Coefficient (MCC) — [-1, +1], 0 = random</li>
          <li>Business Cost at selected threshold (₹ lost in FN fraud + ₹ wasted in FP manual review)</li>
          <li>Calibration curve — predicted probabilities vs actual event rate (Platt scaling if needed)</li>
          <li>Kolmogorov-Smirnov (KS) statistic — separation between Fraud &amp; Genuine score distributions</li>
        </ol>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          ⚡ Top 15 Viva Questions — Fraud Detection ML
        </h2>
        <div className="space-y-3 mb-10">
          {[
            { q: 'Why PR-AUC and not ROC-AUC?', a: 'ROC-AUC uses TPR vs FPR across thresholds. For severe imbalance (0.172% positives), FPR = FP/N is misleading (FP is divided by ~284k genuine) and appears artificially low. PR-AUC uses Precision vs Recall directly on the minority class, so it penalises models with many false positives correctly. Good fraud models get PR-AUC > 0.90. ROC-AUC always looks ~0.99 even for mediocre models.' },
            { q: 'Data Leakage example in fraud projects?', a: 'Most common leakage: (1) Random train/test split instead of time-based split — transactions from the SAME card (or even same transaction family) leak information across splits. (2) SMOTE before split (leaks minority samples of future card into training). Fix: always Stratified GroupKFold by card_id first, then SMOTE/scale inside each training fold.' },
            { q: 'Why SMOTE + ENN and not just class weight?', a: 'Class weights only adjust the loss function. The decision boundary is still drawn in a sparse, imbalanced feature space. SMOTE synthetically over-samples frauds to create a dense, populated fraud region, ENN removes noisy majority-class neighbours that confuse the boundary. Together, they reduce PR-AUC error by 4-7 percentage points on this dataset.' },
            { q: 'What is cost-sensitive learning?', a: 'In fraud, catching a real fraud (TP) saves ₹20,000, but incorrectly blocking a genuine txn (FP) costs customer churn ~₹500. Missing a fraud (FN) costs ₹20,000+. Cost-sensitive learning assigns weights C_fn=100 × C_fp into the loss and threshold optimisation step, so the model makes business-optimal decisions instead of accuracy-optimal ones.' },
            { q: 'Why XGBoost over Random Forest or Neural Net?', a: 'XGBoost uses: (1) Gradient Boosting sequentially, not bagging parallel trees, (2) Regularisation L1 + L2 on both weights AND tree structure to avoid overfitting, (3) Second-order Taylor loss approximation (Newton step) for faster convergence, (4) Sparse-aware split finding for NaN-heavy transaction data. Benchmark: XGB PR-AUC = 0.98 vs RF = 0.91 vs 3-layer NN = 0.94 on Kaggle fraud, in 1/10th training time. It is the de facto industry standard in Indian banks today.' },
          ].map((v, i) => (
            <div key={i} className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-brand-500/30 transition-all">
              <p className="font-bold text-white text-base mb-2"><span className="text-brand-400 mr-2">Q{i+1}.</span>{v.q}</p>
              <p className="text-sm text-zinc-300 leading-relaxed pl-6">{v.a}</p>
            </div>
          ))}
        </div>
        {CTA_INTERNAL_LINK}
      </article>
    ),
    faq: [
      { question: 'What is the best model for credit card fraud detection final year?', answer: 'XGBoost (or LightGBM for very large datasets) + SMOTE-ENN + Stratified GroupKFold is the best-in-class 2026 solution for the Kaggle dataset. Target PR-AUC ≥ 0.97. For IEEE-CIS Major project, add CatBoost and feed categorical features (Card_6, DeviceType) directly — CatBoost natively handles categories and wins 95% of Kaggle tabular competitions. Add SHAP explainability panel to the dashboard for A+' },
      { question: 'What do Indian banks use for real-time fraud detection?', answer: 'Major Indian banks (HDFC, SBI, ICICI, Axis) use XGBoost + rule-engine hybrid models running on a streaming pipeline (Apache Flink / Kafka) scoring every transaction in 5-15ms. Thresholds are updated daily during off-peak hours. Newer challenger banks use Autoencoders and Graph Neural Networks (user-merchant bipartite graphs) for zero-day fraud patterns.' },
      { question: 'Is this project good for campus placements?', answer: 'Absolutely — YES. FinTech/Data Science roles (Mu Sigma, Fractal, Tiger, JP Morgan, Amex, Goldman Sachs Bangalore) directly ask "have you done any end-to-end fraud project" in 1st round interviews. Having this project on your resume with a working Streamlit demo + SHAP plots + PR-AUC numbers gets you shortlisted above 90% of candidates.' },
      { question: 'How long is the ideal report & how many features/modules?', answer: 'Major level: 60-page IEEE format report. 5 modules: (1) Data ingestion + preprocessing, (2) Feature engineering pipeline, (3) 5-model comparison + evaluation, (4) Threshold tuning + cost optimisation dashboard, (5) Flask/FastAPI real-time single transaction prediction endpoint + Streamlit dashboard.' },
      { question: 'Where to buy the verified Credit Card Fraud Detection bundle India?', answer: 'SubmitKit.in Credit Card Fraud Detection ML Major bundle ₹499 one-time. Includes verified Jupyter notebook pipeline (5 models compared, SMOTE+ENN, SHAP plots), 60-page editable IEEE report .docx, 25-slide Viva defense PPT with speaker notes, Kaggle dataset download links, and top 25 examiner questions with full answers. Instant WhatsApp delivery after Razorpay / UPI payment.' },
    ],
  },

  'ieee-black-book-report-format-final-year-template': {
    content: (
      <article className="prose prose-invert max-w-none text-zinc-300 text-sm md:text-base leading-[1.8]">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.1] mb-4">
          IEEE Black Book Report Format — 60-Page Final Year Template (All Indian Universities 2026)
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8">
          The only IEEE final year Black Book format guide you need. Chapter-by-chapter page count, content outline, font rules, margins, reference format, and university-specific tweaks (VTU, SPPU, Mumbai, Anna, JNTU, GTU, RGPV, MDU). Includes editable .docx download.
        </p>
        {CTA_INTERNAL_LINK}
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          ✅ Universal Formatting Rules (Print + Spiral-Bind Ready)
        </h2>
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><span className="font-bold text-white">Fonts</span>: Body = Times New Roman 12 pt. Chapter Heading = 14 pt Bold. Sub-Heading = 12 pt Bold. Captions = 10 pt.</div>
          <div><span className="font-bold text-white">Line Spacing</span>: 1.5 lines everywhere. Before/After Paragraph = 6 pt. No extra line breaks between paragraphs.</div>
          <div><span className="font-bold text-white">Margins (A4)</span>: Left (Binding side) = 1.5 inch. Right, Top, Bottom = 1 inch each.</div>
          <div><span className="font-bold text-white">Page Numbers</span>: Roman numerals i-xi for pre-content, Arabic 1 onwards from Chapter 1.</div>
          <div><span className="font-bold text-white">Paragraphs</span>: First line indent 0.5 inch. Fully-justified alignment (Ctrl+J in Word).</div>
          <div><span className="font-bold text-white">Figures / Tables</span>: Each must have number & caption. Figure captions BELOW, Table captions ABOVE. Referenced as "Fig. 4.3" and "Table 6.2" in text.</div>
          <div><span className="font-bold text-white">Equations</span>: Numbered right-aligned (4.1), (4.2)... using MathType / Word Equation editor.</div>
          <div><span className="font-bold text-white">Headings Style</span>: Always use Word Heading 1 / Heading 2 styles — so the auto-generated Table of Contents updates with one click.</div>
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📚 60-Page Major Project Chapter Structure (+ 30 Page Mini Variation)
        </h2>
        <div className="overflow-x-auto mb-10">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-brand-500/20 text-white border border-brand-500/40">
                <th className="p-3 text-left border border-brand-500/40">#</th>
                <th className="p-3 text-left border border-brand-500/40">Chapter Name</th>
                <th className="p-3 text-left border border-brand-500/40">Major (60p)</th>
                <th className="p-3 text-left border border-brand-500/40">Mini (30p)</th>
                <th className="p-3 text-left border border-brand-500/40">EXACT Contents Checklist</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300 divide-y divide-white/5">
              <tr className="bg-white/[0.02]"><td className="p-3 border border-white/5">—</td><td className="p-3 border border-white/5">Title Page</td><td className="p-3 border border-white/5">1</td><td className="p-3 border border-white/5">1</td><td className="p-3 border border-white/5">University logo, College name, Dept, Guide, Title, Student Name, USN, Month Year</td></tr>
              <tr><td className="p-3 border border-white/5">—</td><td className="p-3 border border-white/5">Bonafide Certificate + Declaration</td><td className="p-3 border border-white/5">1</td><td className="p-3 border border-white/5">1</td><td className="p-3 border border-white/5">HOD, Principal signatures. "I declare no plagiarism" paragraph.</td></tr>
              <tr className="bg-white/[0.02]"><td className="p-3 border border-white/5">—</td><td className="p-3 border border-white/5">Acknowledgement + Dedication</td><td className="p-3 border border-white/5">2</td><td className="p-3 border border-white/5">1</td><td className="p-3 border border-white/5">Thank Guide, HOD, Principal, Parents, Lab Asst, Testing volunteers</td></tr>
              <tr><td className="p-3 border border-white/5">—</td><td className="p-3 border border-white/5">Abstract + 5 Keywords</td><td className="p-3 border border-white/5">1</td><td className="p-3 border border-white/5">1</td><td className="p-3 border border-white/5">150-250 words, 1 para. 5 IEEE Index keywords comma-separated below.</td></tr>
              <tr className="bg-white/[0.02]"><td className="p-3 border border-white/5">—</td><td className="p-3 border border-white/5">TOC, LOF, LOT</td><td className="p-3 border border-white/5">3</td><td className="p-3 border border-white/5">2</td><td className="p-3 border border-white/5">Table of Contents (3 levels deep). List of Figures, List of Tables with page numbers.</td></tr>
              <tr><td className="p-3 border border-white/5">1</td><td className="p-3 border border-white/5">Introduction</td><td className="p-3 border border-white/5">5</td><td className="p-3 border border-white/5">3</td><td className="p-3 border border-white/5">Background + Motivation + Problem Statement + 4 Objectives + Scope + Organisation of Report (1 para per chapter)</td></tr>
              <tr className="bg-white/[0.02]"><td className="p-3 border border-white/5">2</td><td className="p-3 border border-white/5">Literature Survey</td><td className="p-3 border border-white/5">8</td><td className="p-3 border border-white/5">4</td><td className="p-3 border border-white/5">8-12 IEEE papers (2020+) in comparison Table: S.No, Paper Title, Year, Method, Accuracy, Limitations. 3-4 lines per paper summary.</td></tr>
              <tr><td className="p-3 border border-white/5">3</td><td className="p-3 border border-white/5">Requirement &amp; Feasibility Analysis</td><td className="p-3 border border-white/5">5</td><td className="p-3 border border-white/5">3</td><td className="p-3 border border-white/5">Functional / Non-Functional. HW/SW Requirement Tables. Economic/Technical/Operational Feasibility 3-paragraphs each.</td></tr>
              <tr className="bg-white/[0.02]"><td className="p-3 border border-white/5">4</td><td className="p-3 border border-white/5">System Architecture &amp; Design</td><td className="p-3 border border-white/5">8</td><td className="p-3 border border-white/5">5</td><td className="p-3 border border-white/5">Block Diagram, Use Case, Class, Sequence, Activity, DFD / ER diagrams + UI wireframes of all major screens, DB Schema description.</td></tr>
              <tr><td className="p-3 border border-white/5">5</td><td className="p-3 border border-white/5">Tools, Tech &amp; Algorithms</td><td className="p-3 border border-white/5">9</td><td className="p-3 border border-white/5">4</td><td className="p-3 border border-white/5">Deep dive 1-2 core algorithms, CNN / XGBoost / FaceNet papers explanation, stack rationale, comparisons with alternative choices.</td></tr>
              <tr className="bg-white/[0.02]"><td className="p-3 border border-white/5">6</td><td className="p-3 border border-white/5">Implementation</td><td className="p-3 border border-white/5">10</td><td className="p-3 border border-white/5">4</td><td className="p-3 border border-white/5">Module-by-module explanation with 1-2 key code snippets each. Screenshots of every working screen. Build and deployment steps.</td></tr>
              <tr><td className="p-3 border border-white/5">7</td><td className="p-3 border border-white/5">Testing &amp; Evaluation</td><td className="p-3 border border-white/5">7</td><td className="p-3 border border-white/5">2</td><td className="p-3 border border-white/5">Unit / Integration / System test cases (15+ each). Evaluation metrics, confusion matrix, accuracy, F1, graphs, benchmark tables.</td></tr>
              <tr className="bg-white/[0.02]"><td className="p-3 border border-white/5">8</td><td className="p-3 border border-white/5">Results &amp; Discussion</td><td className="p-3 border border-white/5">3</td><td className="p-3 border border-white/5">0</td><td className="p-3 border border-white/5">Key output figures, bar chart comparison with baseline/competitors, qualitative discussion, failure modes analysis.</td></tr>
              <tr><td className="p-3 border border-white/5">9</td><td className="p-3 border border-white/5">Conclusion &amp; Future Scope</td><td className="p-3 border border-white/5">2</td><td className="p-3 border border-white/5">0</td><td className="p-3 border border-white/5">1 para conclusion summarising work + metrics. 5 concrete future lines (not vague mobile-app). </td></tr>
              <tr className="bg-white/[0.02]"><td className="p-3 border border-white/5">—</td><td className="p-3 border border-white/5">References (40+ IEEE Style)</td><td className="p-3 border border-white/5">2</td><td className="p-3 border border-white/5">0</td><td className="p-3 border border-white/5">Websites, Papers, Books, GitHub repos — IEEE numbered [1] to [40+] with DOIs.</td></tr>
              <tr><td className="p-3 border border-white/5">—</td><td className="p-3 border border-white/5">Appendix A + B + C + CD Content</td><td className="p-3 border border-white/5">3</td><td className="p-3 border border-white/5">0</td><td className="p-3 border border-white/5">ER Diagram, Sample Code, Questionnaire, CD list. Add blank page (Total = 60).</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          📑 Correct IEEE Reference Format (Don&apos;t lose marks here!)
        </h2>
        <p className="mb-4">Viva examiners randomly pick a reference number and ask you to quote it. Get this EXACT right — number ordering in text matches the References list order. Example 8-correct template:</p>
        <div className="p-6 rounded-2xl bg-zinc-900/70 border border-white/10 space-y-3 font-mono text-xs md:text-sm mb-10">
          <div>[1] F. Schroff, D. Kalenichenko, and J. Philbin, &quot;FaceNet: A Unified Embedding for Face Recognition and Clustering,&quot; in <em>Proc. IEEE/CVF Conf. Comput. Vis. Pattern Recognit.</em>, Boston, MA, USA, Jun. 2015, pp. 815-823. doi: 10.1109/CVPR.2015.7298682.</div>
          <div>[2] M. Tan and Q. V. Le, &quot;EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks,&quot; in <em>Proc. 36th Int. Conf. Mach. Learn.</em>, Long Beach, CA, USA, Jun. 2019, pp. 6105-6114. [Online]. Available: https://proceedings.mlr.press/v97/tan19a.html.</div>
          <div>[3] A. Howard <em>et al.</em>, &quot;MobileNetV2: Inverted Residuals and Linear Bottlenecks,&quot; <em>arXiv:1801.04381</em>, 2018.</div>
          <div>[4] Worldline and ULB Machine Learning Group, &quot;Credit Card Fraud Detection,&quot; Kaggle Datasets. 2018. [Online]. Available: https://www.kaggle.com/mlg-ulb/creditcardfraud.</div>
          <div>[5] D. P. Kingma and J. Ba, &quot;Adam: A Method for Stochastic Optimization,&quot; in <em>Proc. 3rd Int. Conf. Learn. Representations</em>, San Diego, CA, USA, May 2015.</div>
          <div>[6] R. Mehta and C. K. J. Tom, &quot;Data Science from Scratch: First Principles with Python,&quot; 2nd ed. Sebastopol, CA: O&apos;Reilly Media, 2019, ch. 11, pp. 139-152.</div>
          <div>[7] S. Raschka, &quot;ROC AUC vs. PR AUC,&quot; Sebastian Raschka Blog. [Online]. Available: https://sebastianraschka.com/faq/docs/roc-vs-pr.html. [Accessed 12 May 2026].</div>
          <div>[8] &quot;TensorFlow Documentation,&quot; Google Developers. [Online]. Available: https://www.tensorflow.org/guide/keras/transfer_learning. [Accessed 15 Aug. 2026].</div>
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          🏛️ University-Specific Adjustments (India)
        </h2>
        <ol className="space-y-2 pl-6 list-decimal mb-10">
          <li><strong>VTU Belagavi</strong>: Stick to 14 chapters as above, Annexure 1 Plagiarism Declaration ≤ 10% similarity, Black Book spiral binding + colour front cover.</li>
          <li><strong>SPPU Pune</strong>: Must include Synopsis (5 pages, signed by Guide) in beginning. Use 2018 SPPU format report template page headers.</li>
          <li><strong>Mumbai University</strong>: Certificate must be on college letterhead. Literature Survey needs minimum 10 journal papers, with 3 Mumbai University affiliated authors.</li>
          <li><strong>Anna University Chennai</strong>: Annexure IV – Internship / In-Plant Training link report (2 pages). Must state &quot;Regulation 2021 / 2022&quot; on cover page.</li>
          <li><strong>JNTU Hyderabad / Kakinada</strong>: External examiner copy + college copy + student copy = 3 hard copies. JNTUH plagiarism check &lt; 20% on URKUND.</li>
          <li><strong>GTU Gujarat</strong>: Cover page Yellow/Green as per branch, add &quot;GTU Innovation &amp; Startup Centre&quot; acknowledgment page.</li>
          <li><strong>RGPV Madhya Pradesh</strong>: Synopsis submission mandatory before mid-term. Open-ended-viva format asks only from Ch. 5-7.</li>
          <li><strong>MDU Haryana / KUK / DU</strong>: Minor Project + Major Project: Mid-term review PPT + Final PPT. Final report 70-80 pages including synopsis.</li>
        </ol>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4">
          ❓ Common Black Book Mistakes (Students Lose 15+ Marks Here!)
        </h2>
        <div className="space-y-3 mb-10">
          {[
            { q: 'Mistake 1 — Copy-pasting the literature survey verbatim from ChatGPT', a: 'Turnitin / URKUND catches 95% of GPT text. Solution: Summarise 3 points per paper in YOUR OWN words. Use our SubmitKit literature survey template with human-written IEEE comparisons — they pass plagiarism 100%.' },
            { q: 'Mistake 2 — Same screenshot used 5x in different chapters', a: 'Examiner sees it instantly. Solution: 1 unique screenshot per argument + 1 code snippet per module. Add Grad-CAM/TSNE/confusion matrix unique visuals.' },
            { q: 'Mistake 3 — References not matching in-text citation order', a: 'Biggest viva fail trigger. Solution: Use Word Cross-reference + Insert Citation tool. Never manually number references.' },
            { q: 'Mistake 4 — Future Scope is "we will add mobile app" (vague)', a: 'Bad. Instead: "Phase 2 will integrate the EfficientNetB3 Keras model as a TensorFlow-Lite INT8 .tflite binary on a React Native Android app using CameraX API with real-time 30 FPS leaf disease classification and offline-first SQLite cache." — specific, believable.' },
            { q: 'Mistake 5 — Conclusion re-writes the Introduction', a: 'Bad. Conclusion should: (a) summarise performance numbers achieved, (b) compare vs baseline numbers, (c) state 1 concrete learning you had during the project. That gets 5/5 marks.' },
          ].map((m, i) => (
            <details key={i} className="p-5 rounded-2xl bg-zinc-900/70 border border-white/10 group open:border-brand-500/30 transition-all">
              <summary className="cursor-pointer font-bold text-white text-base md:text-lg flex items-start gap-3">
                <span className="text-rose-400 font-black shrink-0">!{i + 1}.</span>
                <span>{m.q}</span>
              </summary>
              <p className="text-sm md:text-base text-zinc-300 pl-9 mt-3 leading-relaxed">
                {m.a}
              </p>
            </details>
          ))}
        </div>
        {CTA_INTERNAL_LINK}
      </article>
    ),
    faq: [
      { question: 'How many pages is a Mini vs Major project Black Book?', answer: 'Mini (Sem 5 / Sem 6) = 30 pages minimum. Major Final Year (Sem 7 / Sem 8) = 60 pages minimum. Top A+ graders submit 65-75 pages for Major (with a chapter appendix for sample code + full output screenshots). Do NOT try to pad it with 100 pages of pure screenshots — examiners actually page-through and penalise bloat.' },
      { question: 'How do I write the 4 Objectives for Chapter 1?', answer: 'Formula: Objective 1 = "Design & build the system". O2 = "Integrate the core AI / IoT or algorithm". O3 = "Develop admin/faculty/user modules and RBAC". O4 = "Evaluate performance against benchmarks on X dataset / Y metric and deploy on Z platform". Example for Face Recognition: (1) build web app with JWT auth, (2) integrate dlib+FaceNet pipeline + anti-spoof, (3) create student/class/attendance admin reports, (4) achieve >99% LFW accuracy, CSV export & WhatsApp summary.' },
      { question: 'Where to get editable IEEE Black Book template .docx India?', answer: 'Every SubmitKit project bundle (Mini ₹299 / Major ₹499) includes a complete, ready-to-edit IEEE format 30-page / 60-page Black Book .docx, pre-populated with the correct chapters, your project title placeholders, ready 40+ reference format entries, and auto-TOC. All you do is replace the 4 placeholders with your details and print — saves 7+ days of formatting work.' },
      { question: 'What percentage plagiarism is acceptable in a final year report?', answer: 'Safe upper ceiling = 10-15% overall. 0% on Literature Survey + Conclusion. Any plagiarised block-quote > 40 words must be cited inline with [reference number] and indented. Turnitin/URKUND flag 3-consecutive-words matching. Paraphrase everything human-style.' },
      { question: 'Which is the correct IEEE reference style?', answer: 'IEEE = numbered numeric style [1] [2] [3] in-text (in order of first appearance), corresponding numbered entries in References list. Each reference entry has: Authors (F. Last, F. Last), Title in quotes, Venue in italics, Location, Month Year, pp. X-Y, DOI or URL.' },
    ],
  },
};

export function getBlogContent(slug: string): BlogContentEntry | null {
  return BLOG_CONTENT[slug] || null;
}

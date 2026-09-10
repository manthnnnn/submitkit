const fs = require('fs');
const path = require('path');

// Domain templates and base seeds to generate 560+ unique, trending projects
const domains = [
  {
    category: 'AIML',
    topics: [
      { t: "Deepfake Video and Audio Detector", tag: "AI detects synthetic face and voice swaps in real time." },
      { t: "Autonomous Drone Precision Agriculture with NDVI Vision", tag: "Drones scan farm crops to detect plant stress and water deficiency." },
      { t: "Real-Time Driver Drowsiness and Distraction Detection", tag: "Monitors driver eye blink rate and yawning to sound alarm." },
      { t: "Brain Tumor Segmentation from MRI Scans using U-Net", tag: "Segments tumor boundaries from 3D brain MRI scans." },
      { t: "Skin Cancer Lesion Classification using EfficientNet", tag: "Classifies dermoscopic skin images into benign or melanoma." },
      { t: "AI Gym Trainer with Pose Estimation and Rep Counter", tag: "Uses camera to track posture and count exercise repetitions." },
      { t: "Self-Driving Car Lane Detection and Obstacle Avoidance", tag: "Identifies road lanes and pedestrian bounding boxes in video." },
      { t: "Automated License Plate Recognition (ALPR) System", tag: "Reads vehicle number plates from traffic camera streams." },
      { t: "Face Recognition Attendance System with Anti-Spoofing", tag: "Marks student attendance while rejecting photos or phone screen replays." },
      { t: "Plant Disease Detection using Leaf Image Classification", tag: "Upload a crop leaf photo to identify bacterial or fungal infections." },
      { t: "Gesture-Controlled Virtual Mouse and Presentation Controller", tag: "Control computer cursor and slide transitions using hand gestures." },
      { t: "Automated Pothole and Road Damage Detection System", tag: "Dashcam video scanner flags road craters with GPS location." },
      { t: "ECG Arrhythmia Classification using Deep Residual Networks", tag: "Detects irregular heartbeats from 12-lead ECG waveforms." },
      { t: "Wildfire and Smoke Early Warning System from CCTV", tag: "Early smoke plume detector for forest and industrial surveillance." },
      { t: "Retail Store Customer Heatmap and Shoplifting Detection", tag: "Tracks customer foot traffic and suspicious movement patterns." },
      { t: "Automated Garbage and Waste Segregation using Computer Vision", tag: "Identifies plastic, organic, and metal waste on conveyor belts." },
      { t: "Micro-Expression and Emotion Recognition System", tag: "Analyzes subtle facial cues to assess user sentiment and engagement." },
      { t: "Sign Language to Spoken Text Converter using MediaPipe", tag: "Translates two-hand sign gestures into natural spoken sentences." },
      { t: "Object Detection for Visually Impaired with Audio Guidance", tag: "Reads real-world obstacles and speaks distances via headphones." },
      { t: "Diabetic Retinopathy Detection from Fundus Retinal Images", tag: "Grades severity of eye blood vessel damage caused by diabetes." }
    ]
  },
  {
    category: 'NLP',
    topics: [
      { t: "RAG-Powered AI Legal Contract Risk Analyzer", tag: "Upload 50-page legal contracts to flag hidden liabilities and penalties." },
      { t: "Multi-Agent AI Code Reviewer and Security Auditor", tag: "Autonomous LLM agents find bugs and generate unit tests." },
      { t: "AI Medical Symptom Checker and Doctor Referral Bot", tag: "Conversational assistant matches symptoms to potential conditions." },
      { t: "Real-Time Multilingual Voice Translation System", tag: "Translates spoken speech between English and regional languages instantly." },
      { t: "AI Research Paper Summarizer with Citation Graph", tag: "Condenses 20-page scientific papers into key findings and methodology." },
      { t: "Automated Resume Screener and Job Description Matcher", tag: "Ranks candidate CVs based on semantic skill embeddings." },
      { t: "Fake News and Misinformation Detection System", tag: "Classifies news articles by verifying factual claim consistency." },
      { t: "Customer Support Voicebot with Sentiment-Adaptive Responses", tag: "Handles call-center queries and de-escalates frustrated customers." },
      { t: "AI Meeting Transcriber with Action Item Extraction", tag: "Transcribes audio and outputs summarized action tasks for teams." },
      { t: "Automated Essay Scoring and Grammar Feedback Engine", tag: "Evaluates student essays for coherence, vocabulary, and logic." },
      { t: "Financial Earnings Call Transcript Sentiment Scanner", tag: "Scores CEO optimism during quarterly earnings call Q&A." },
      { t: "Code Explainer and Interactive Bug Fixer in Simple English", tag: "Translates complex code snippets into beginner-friendly explanations." },
      { t: "Clinical Doctor Notes to Structured ICD-10 Coding", tag: "Extracts medical diagnoses from handwritten doctor notes." },
      { t: "Mental Health Sentiment Companion with Crisis Intervention", tag: "Detects depressive linguistic patterns and offers emergency helpline resources." },
      { t: "Plagiarism Detection Engine with Semantic Paraphrase Matching", tag: "Detects copied assignments even when words are heavily rephrased." }
    ]
  },
  {
    category: 'Cybersecurity',
    topics: [
      { t: "Ransomware Behavioral Detection Engine with Process Sandboxing", tag: "Stops zero-day encryption attacks before files get locked." },
      { t: "AI-Powered Phishing URL and Homoglyph Scanner", tag: "Detects spoofed login pages and deceptive Unicode domain names." },
      { t: "Network Intrusion Detection System using Graph Neural Networks", tag: "Identifies lateral movement and DDoS attacks in enterprise LANs." },
      { t: "Distributed Honeypot Network with Real-Time Attack Map", tag: "Lures automated botnets and records IP threat intelligence." },
      { t: "Automated Vulnerability Scanner for Web Applications (OWASP Top 10)", tag: "Checks endpoints for SQL injection, XSS, and SSRF flaws." },
      { t: "Encrypted Traffic Malware Classifier using Packet Flow Statistics", tag: "Identifies Trojan C2 beacons without decrypting HTTPS traffic." },
      { t: "Zero-Trust Identity and Access Management (IAM) Gateway", tag: "Enforces continuous device risk assessment and multi-factor authentication." },
      { t: "Smart Contract Reentrancy and Flash Loan Vulnerability Auditor", tag: "Scans Solidity code for common DeFi exploit patterns." },
      { t: "Dark Web Credential Leak Monitor and Alert System", tag: "Notifies users if their passwords appear in recent database dumps." },
      { t: "API Security Gateway with Rate Limiting and Token Anomaly Detection", tag: "Blocks bot scraping and credential stuffing attacks on APIs." }
    ]
  },
  {
    category: 'Fintech',
    topics: [
      { t: "Real-Time Credit Card Fraud Detection using Isolation Forests", tag: "Flags fraudulent transactions in under 15 milliseconds." },
      { t: "Algorithmic Cryptocurrency Trading Bot with Technical Backtesting", tag: "Executes rule-based momentum and mean-reversion trading strategies." },
      { t: "Personal Finance Expense Tracker with Smart Receipt OCR", tag: "Snaps photo of bill receipts and auto-categorizes expenses." },
      { t: "Alternative Credit Scoring Model using Mobile App Metrics", tag: "Provides loan credit scores for unbanked individuals without credit history." },
      { t: "Stock Market Volatility Predictor using News Sentiment and LSTM", tag: "Combines financial news sentiment with historical candlestick charts." },
      { t: "Automated Invoice Reconciliation and GST Verification Engine", tag: "Matches purchase orders with supplier invoices and tax IDs." },
      { t: "Peer-to-Peer Micro-Lending Platform with Risk Scoring", tag: "Connects small borrowers with lenders using automated risk tiering." },
      { t: "Insurance Claim Fraud Detection using Claim History Analysis", tag: "Identifies staged car accident claims and duplicate payout requests." }
    ]
  },
  {
    category: 'IoT',
    topics: [
      { t: "Smart Solar Panel Tracker with Maximum Power Point Optimization", tag: "Dual-axis solar tracking to maximize daily energy generation." },
      { t: "IoT Smart Water Quality Monitoring and Contamination Alert", tag: "Monitors pH, turbidity, and dissolved oxygen in drinking water." },
      { t: "Automated Smart Parking System with Ultrasonic Slot Detection", tag: "Guides drivers to vacant parking spots via mobile app." },
      { t: "Smart Agriculture Irrigation System with Soil Moisture Sensors", tag: "Waters crops only when soil moisture drops below threshold." },
      { t: "Air Quality Index (AQI) Monitoring Station with PM2.5 Sensors", tag: "Tracks city pollution and forecasts smog levels." },
      { t: "Wearable Fall Detection and Emergency Alert Device for Elderly", tag: "Accelerometer sensor detects sudden falls and SMS alerts family." },
      { t: "Smart Electric Vehicle (EV) Charging Station Load Balancer", tag: "Optimizes power grid distribution across multiple charging cars." },
      { t: "IoT Asset Tracker with Cellular GPS and Geo-Fencing", tag: "Alerts logistics managers when shipments leave authorized zones." }
    ]
  },
  {
    category: 'Blockchain',
    topics: [
      { t: "Decentralized Voting System with Zero-Knowledge Proofs", tag: "Tamper-proof ballot casting where votes are verifiable yet anonymous." },
      { t: "Decentralized Electronic Health Records (EHR) on IPFS", tag: "Patients own and grant temporary doctor access to medical scans." },
      { t: "Fake Pharmaceutical Drug Tracking using Blockchain Supply Chain", tag: "Scans QR codes on medicine bottles to verify genuine factory origin." },
      { t: "Land Registry and Property Title Verification Platform", tag: "Prevents illegal land resale by recording title deeds on blockchain." },
      { t: "Soulbound Token (SBT) College Degree and Certificate Issuer", tag: "Non-transferable digital diplomas verified in 1 second by employers." },
      { t: "Decentralized Crowdfunding Platform with Milestone Smart Contracts", tag: "Releases backer funds only when project milestones are verified." }
    ]
  },
  {
    category: 'FullStack',
    topics: [
      { t: "Real-Time Collaborative Whiteboard with WebSockets (Figma Clone)", tag: "Multiple users draw, write notes, and brainstorm simultaneously." },
      { t: "Remote Code Execution Engine with Docker Sandboxing (Compiler)", tag: "Runs user C++, Python, and Java code safely in isolated containers." },
      { t: "Headless CMS for Developer Documentation with Instant Search", tag: "Markdown-based documentation portal with sub-second fulltext search." },
      { t: "Real-Time Video Conferencing and Screen Sharing App (WebRTC)", tag: "Browser-to-browser encrypted video calls with low latency." },
      { t: "Developer Portfolio Builder with One-Click Custom Domain", tag: "Generates sleek developer portfolios from GitHub repositories." },
      { t: "Microservices Observability and Error Tracking Dashboard", tag: "Visualizes distributed traces and alerts developers on API 500 errors." }
    ]
  }
];

// Let's create an exhaustive list of 560+ distinct topics across all domains
const targetCount = 560;
const generatedTopics = [];

// Base seed list expanded across domains and letters
const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let currentId = 1;

// Specific trending topics catalog
const baseProjects = [
  // A
  { title: "AI Medical Diagnostic Assistant for Chest X-Rays", cat: "AIML", diff: 3, time: "3–4 days", trend: true },
  { title: "AI-Powered Smart Traffic Signal Controller with Vehicle Queue Analysis", cat: "AIML", diff: 4, time: "4–5 days", trend: true },
  { title: "Automated Cyber Threat Intelligence Feed Aggregator", cat: "Cybersecurity", diff: 3, time: "3–4 days", trend: false },
  { title: "Autonomous Indoor Drone Navigation with Obstacle Avoidance", cat: "IoT", diff: 4, time: "5–6 days", trend: true },
  { title: "Algorithmic Crypto Arbitrage Scanner across Decentralized Exchanges", cat: "Fintech", diff: 3, time: "3–4 days", trend: false },
  { title: "AI Video Dubbing and Lip-Sync Translator", cat: "AIML", diff: 4, time: "4–5 days", trend: true },
  { title: "Automated Software Bug Triaging using Transformer Embeddings", cat: "NLP", diff: 3, time: "2–3 days", trend: false },
  { title: "Augmented Reality Furniture Placement App for Interior Design", cat: "Mobile", diff: 3, time: "4–5 days", trend: false },
  { title: "AI Storyboard Generator from Natural Language Scripts", cat: "AIML", diff: 3, time: "3–4 days", trend: false },
  { title: "Automated Crop Disease Diagnostic System using Mobile Camera", cat: "AIML", diff: 2, time: "2–3 days", trend: true },
  { title: "Audio Deepfake Voice Cloning Detection Engine", cat: "AIML", diff: 4, time: "3–4 days", trend: true },
  { title: "AI Resume Screening and Shortlisting with Skill Gap Analysis", cat: "NLP", diff: 2, time: "2–3 days", trend: true },
  { title: "Autonomous Warehouse Package Sorting Robot Simulation", cat: "IoT", diff: 4, time: "5–6 days", trend: false },
  { title: "Adaptive E-Learning Platform with Dynamic Quiz Difficulty", cat: "FullStack", diff: 3, time: "3–4 days", trend: false },
  { title: "Air Quality Index (AQI) Forecasting using Spatio-Temporal Graph Neural Networks", cat: "DataScience", diff: 4, time: "4–5 days", trend: false },
  { title: "Automated Code Refactoring and Vulnerability Patching Bot", cat: "NLP", diff: 4, time: "3–4 days", trend: true },
  { title: "AI Customer Churn Predictor with SHAP Explainability", cat: "DataScience", diff: 2, time: "2–3 days", trend: false },
  { title: "AI-Assisted Radiologist Tool for CT Scan Lesion Detection", cat: "AIML", diff: 4, time: "4–5 days", trend: true },
  { title: "Automated Micro-Payment Splitter using Lightning Network", cat: "Blockchain", diff: 3, time: "3–4 days", trend: false },
  { title: "AI Proctoring System for Online Exams with Face and Audio Verification", cat: "AIML", diff: 3, time: "3–4 days", trend: true },
  { title: "Autonomous Delivery Rover Simulation with ROS2 and Gazebo", cat: "IoT", diff: 4, time: "5–6 days", trend: false },
  { title: "AI Financial Advisor with Portfolio Rebalancing Strategy", cat: "Fintech", diff: 3, time: "3–4 days", trend: false },

  // B
  { title: "Brain-Computer Interface (BCI) for Wheelchair Movement Control", cat: "IoT", diff: 5, time: "5–7 days", trend: true },
  { title: "Blockchain-Based Digital Identity Verification (Decentralized ID)", cat: "Blockchain", diff: 4, time: "4–5 days", trend: true },
  { title: "Breast Cancer Histopathology Image Classifier using CNN", cat: "AIML", diff: 3, time: "3–4 days", trend: false },
  { title: "Blockchain Supply Chain Tracking for Organic Agricultural Produce", cat: "Blockchain", diff: 3, time: "3–4 days", trend: false },
  { title: "Biometric Fingerprint Authentication with Liveness Detection", cat: "Cybersecurity", diff: 3, time: "3–4 days", trend: false },
  { title: "Battery Health and Degradation Predictor for Electric Vehicles", cat: "DataScience", diff: 3, time: "2–3 days", trend: true },
  { title: "Bilingual Speech-to-Speech Real-Time Translator", cat: "NLP", diff: 4, time: "4–5 days", trend: false },
  { title: "Botnet C&C Traffic Detection using Network Graph Analysis", cat: "Cybersecurity", diff: 4, time: "3–4 days", trend: false },
  { title: "Blockchain Land Title Registry with Zero Fraud Guarantee", cat: "Blockchain", diff: 3, time: "3–4 days", trend: false },
  { title: "Behavioral Keystroke Dynamics for Continuous User Authentication", cat: "Cybersecurity", diff: 3, time: "3–4 days", trend: true },
  { title: "Bio-Acoustic Bird Species Identification from Audio Recordings", cat: "AIML", diff: 2, time: "2–3 days", trend: false },
  { title: "Bitcoin Price Directional Forecaster using On-Chain Metrics", cat: "Fintech", diff: 3, time: "3–4 days", trend: false },
  { title: "Blockchain Crowdfunding Platform with Escrow Release by Milestones", cat: "Blockchain", diff: 3, time: "3–4 days", trend: false },
  { title: "B2B SaaS Subscription Analytics and Revenue Forecasting Engine", cat: "FullStack", diff: 3, time: "3–4 days", trend: false },
  { title: "Blockchain-Powered Academic Credential Verification Portal", cat: "Blockchain", diff: 2, time: "2–3 days", trend: true },
  { title: "Black-Scholes Option Pricing and Greeks Calculator Web App", cat: "Fintech", diff: 2, time: "2–3 days", trend: false },
  { title: "Blood Cell Multi-Class Detection and Counting using YOLOv8", cat: "AIML", diff: 3, time: "3–4 days", trend: true },
  { title: "Bug Bounty Vulnerability Scanner for Cross-Site Scripting (XSS)", cat: "Cybersecurity", diff: 3, time: "3–4 days", trend: false },

  // C
  { title: "Credit Card Fraud Detection using Isolation Forest and Autoencoders", cat: "Fintech", diff: 3, time: "2–3 days", trend: true },
  { title: "Conversational RAG Chatbot for Technical Product Documentation", cat: "NLP", diff: 3, time: "3–4 days", trend: true },
  { title: "Cyber Threat Hunting Platform with MITRE ATT&CK Mapping", cat: "Cybersecurity", diff: 4, time: "4–5 days", trend: true },
  { title: "Crop Yield Prediction using Satellite Weather Data and Machine Learning", cat: "DataScience", diff: 3, time: "3–4 days", trend: false },
  { title: "Customer Churn Prediction with Explainable AI (SHAP / LIME)", cat: "DataScience", diff: 2, time: "2–3 days", trend: false },
  { title: "Cloud Cost Optimization Engine for AWS EC2 and S3 Workloads", cat: "FullStack", diff: 3, time: "3–4 days", trend: false },
  { title: "Collaborative Code Editor with Real-Time Video Call Integration", cat: "FullStack", diff: 4, time: "4–5 days", trend: true },
  { title: "Chest X-Ray Pneumonia Detection using Transfer Learning (ResNet50)", cat: "AIML", diff: 2, time: "2–3 days", trend: true },
  { title: "Crypto Flash-Loan Exploit Simulator and Arbitrage Bot", cat: "Blockchain", diff: 4, time: "4–5 days", trend: false },
  { title: "Continuous Integration / Continuous Deployment (CI/CD) Pipeline with Chaos Testing", cat: "FullStack", diff: 3, time: "3–4 days", trend: false },
  { title: "Cervical Cancer Screening via Pap Smear Image Classification", cat: "AIML", diff: 4, time: "3–4 days", trend: false },
  { title: "Crowd Density and Stampede Risk Monitoring from Drone Feeds", cat: "AIML", diff: 4, time: "4–5 days", trend: true },
  { title: "Cross-Platform Mobile Fitness App with Meal Macro Scanner", cat: "Mobile", diff: 3, time: "3–4 days", trend: false },
  { title: "Container Security Vulnerability Scanner for Docker Images", cat: "Cybersecurity", diff: 3, time: "3–4 days", trend: false },
  { title: "Clinical Trial Eligibility Matcher using ClinicalBERT", cat: "NLP", diff: 4, time: "3–4 days", trend: false },
  { title: "Call Center Agent Speech Tone and Customer Frustration Analyzer", cat: "NLP", diff: 3, time: "3–4 days", trend: false },
  { title: "Camera-Based Heart Rate Estimator using Photoplethysmography (PPG)", cat: "AIML", diff: 3, time: "3–4 days", trend: true },

  // D
  { title: "Deepfake Video Detection with Facial Artifact Extraction", cat: "AIML", diff: 4, time: "4–5 days", trend: true },
  { title: "Driver Drowsiness Alert System using Eye Aspect Ratio (EAR)", cat: "AIML", diff: 2, time: "2–3 days", trend: true },
  { title: "Decentralized Voting Portal with Cryptographic ZK-Proofs", cat: "Blockchain", diff: 4, time: "4–5 days", trend: true },
  { title: "Diabetic Retinopathy Grading using Deep Convolutional Networks", cat: "AIML", diff: 3, time: "3–4 days", trend: false },
  { title: "Distributed Denial of Service (DDoS) Detection via Packet Flow Analysis", cat: "Cybersecurity", diff: 3, time: "3–4 days", trend: false },
  { title: "Drone-Based Forest Fire Detection with Thermal Imaging Simulation", cat: "IoT", diff: 4, time: "4–5 days", trend: true },
  { title: "Doctor Prescription OCR and Drug Interaction Checker", cat: "NLP", diff: 3, time: "3–4 days", trend: true },
  { title: "Dynamic Pricing Engine for E-Commerce using Competitor Scraper", cat: "DataScience", diff: 3, time: "3–4 days", trend: false },
  { title: "Darknet Marketplace Forum Crawler and Threat Intelligence Parser", cat: "Cybersecurity", diff: 4, time: "4–5 days", trend: false },
  { title: "Data Leak Prevention (DLP) Tool for Outbound Email Attachments", cat: "Cybersecurity", diff: 3, time: "3–4 days", trend: false },
  { title: "Document Question Answering over PDF Reports using LangChain", cat: "NLP", diff: 2, time: "2–3 days", trend: true },
  { title: "Disaster Damage Assessment from Post-Earthquake Satellite Imagery", cat: "AIML", diff: 4, time: "4–5 days", trend: false },
  { title: "Decentralized File Storage Network with Encryption on IPFS", cat: "Blockchain", diff: 3, time: "3–4 days", trend: false },
  { title: "Dental X-Ray Cavity and Periodontitis Identification using YOLOv8", cat: "AIML", diff: 3, time: "3–4 days", trend: false },
  { title: "Deep Learning Stock Trading Agent using PPO Reinforcement Learning", cat: "Fintech", diff: 4, time: "5–6 days", trend: true },

  // E
  { title: "Emotion-Aware Conversational AI Voice Assistant", cat: "NLP", diff: 3, time: "3–4 days", trend: true },
  { title: "ECG Signal Arrhythmia Detection using 1D Convolutional Networks", cat: "AIML", diff: 3, time: "3–4 days", trend: true },
  { title: "Electric Vehicle Smart Charging Station Load Optimization", cat: "IoT", diff: 3, time: "3–4 days", trend: false },
  { title: "Enterprise Zero-Trust Network Access (ZTNA) Authenticator", cat: "Cybersecurity", diff: 4, time: "4–5 days", trend: false },
  { title: "Email Phishing Detector with DKIM and Domain Reputation Verification", cat: "Cybersecurity", diff: 2, time: "2–3 days", trend: false },
  { title: "E-Commerce Recommendation System using Collaborative Filtering and Graph Embeddings", cat: "DataScience", diff: 3, time: "3–4 days", trend: false },
  { title: "Emergency SOS Wearable Device with Fall Detection and GPS Ping", cat: "IoT", diff: 3, time: "3–4 days", trend: true },
  { title: "Environmental Noise Pollution Monitoring and Mapping App", cat: "IoT", diff: 2, time: "2–3 days", trend: false },
  { title: "Encrypted Cloud File Storage with Zero-Knowledge Client-Side Key Sharing", cat: "Cybersecurity", diff: 3, time: "3–4 days", trend: false },
  { title: "Energy Consumption Forecasting for Smart Microgrids using Temporal Fusion Transformers", cat: "DataScience", diff: 4, time: "4–5 days", trend: false },
  { title: "Edge AI People Counter for Smart Building HVAC Optimization", cat: "IoT", diff: 3, time: "3–4 days", trend: false },
  { title: "EHR Medical Record Blockchain for Inter-Hospital Patient Transfers", cat: "Blockchain", diff: 3, time: "3–4 days", trend: false },
  { title: "Explainable AI Dashboard for Credit Approval Decision Auditing", cat: "Fintech", diff: 3, time: "2–3 days", trend: false },
  { title: "Eye Tracking Mouse Controller for ALS Patients", cat: "AIML", diff: 4, time: "4–5 days", trend: true },

  // F
  { title: "Face Recognition Attendance System with Anti-Spoofing Verification", cat: "AIML", diff: 3, time: "3–4 days", trend: true },
  { title: "Fake News and Propaganda Detector using RoBERTa", cat: "NLP", diff: 3, time: "2–3 days", trend: true },
  { title: "Financial Document Information Extraction (Receipts and Invoices)", cat: "NLP", diff: 3, time: "3–4 days", trend: false },
  { title: "Fingerprint Liveness Detection using Deep Texture Analysis", cat: "Cybersecurity", diff: 3, time: "3–4 days", trend: false },
  { title: "Forest Fire Spread Prediction Model using Cellular Automata", cat: "DataScience", diff: 4, time: "4–5 days", trend: false },
  { title: "Fast Food Drive-Thru Automated Order Taking Speech Bot", cat: "NLP", diff: 3, time: "3–4 days", trend: false },
  { title: "Fall Detection for Elderly Care using Depth Sensors and Pose Estimation", cat: "AIML", diff: 3, time: "3–4 days", trend: true },
  { title: "Fuel Consumption Optimization for Commercial Logistics Fleets", cat: "DataScience", diff: 3, time: "3–4 days", trend: false },
  { title: "Full-Stack Collaborative Kanban Board with Real-Time Updates", cat: "FullStack", diff: 2, time: "2–3 days", trend: false },
  { title: "Federated Learning Model for Privacy-Preserving Disease Prediction", cat: "AIML", diff: 5, time: "5–6 days", trend: true },
  { title: "Food Calorie and Nutritional Estimator from Plate Photos", cat: "AIML", diff: 3, time: "3–4 days", trend: true },
  { title: "Football Player Tracking and Pass Network Analytics from Video", cat: "AIML", diff: 4, time: "4–5 days", trend: false },
  { title: "Flight Delay Risk Predictor using Weather and Air Traffic Data", cat: "DataScience", diff: 2, time: "2–3 days", trend: false },
  { title: "Firewall Log Analysis and Automated IP Blacklisting Tool", cat: "Cybersecurity", diff: 2, time: "2–3 days", trend: false }
];

// Combine base and synthesize 560 total topics covering A-Z
console.log("Building catalog of 560+ unique, trending projects...");

const suffixes = [
  "with Real-Time Alerts",
  "using Deep Learning",
  "with Edge Deployment",
  "using Transformer Models",
  "Powered by Computer Vision",
  "with Explainable AI (XAI)",
  "for Smart Cities",
  "using Graph Neural Networks",
  "with Automated Verification",
  "for Enterprise Security",
  "with Cloud Native Dashboard",
  "using Generative AI"
];

// Systematic generation to ensure 560+ high quality unique topics
const allGenerated = [];
const seenTitles = new Set();

baseProjects.forEach(p => {
  if (!seenTitles.has(p.title)) {
    seenTitles.add(p.title);
    allGenerated.push(p);
  }
});

// Domain seeds to generate comprehensive trending list across all 26 letters
const topicThemes = [
  // AI & Vision
  { name: "Autonomous Vehicle Lane Tracking", cat: "AIML" },
  { name: "Automated Crop Leaf Disease Scanner", cat: "AIML" },
  { name: "Agricultural Yield Forecaster", cat: "DataScience" },
  { name: "Aircraft Engine Failure Forecaster", cat: "DataScience" },
  { name: "Animal Species Poaching Detection via Drone", cat: "AIML" },
  { name: "Aquaculture Water Quality Monitor", cat: "IoT" },
  { name: "AI Virtual Dermatologist", cat: "AIML" },
  { name: "AI Radiologist Assistant for Chest Pathology", cat: "AIML" },
  { name: "Audio Deepfake Speech Detector", cat: "AIML" },
  { name: "Automated Waste Sorting Robot", cat: "IoT" },
  { name: "Automated License Plate Identifier", cat: "AIML" },
  { name: "AI Code Vulnerability Scanner", cat: "Cybersecurity" },
  { name: "AI Proctoring Suite with Eye Gaze Tracking", cat: "AIML" },
  { name: "Autonomous Mobile Delivery Robot", cat: "IoT" },
  { name: "AI Legal Contract Risk Analyzer", cat: "NLP" },
  { name: "Automated Meeting Notes Generator", cat: "NLP" },
  { name: "Air Pollution PM2.5 Forecaster", cat: "DataScience" },
  { name: "Algorithmic Arbitrage Bot for DEXs", cat: "Fintech" },
  { name: "Automated Phishing Site Takedown Engine", cat: "Cybersecurity" },
  { name: "AR Navigation for Indoor Malls and Airports", cat: "Mobile" },

  // B
  { name: "Brain Tumor 3D MRI Segmentation", cat: "AIML" },
  { name: "Blockchain Degree Credential Verifier", cat: "Blockchain" },
  { name: "Biometric Keystroke Dynamics Authenticator", cat: "Cybersecurity" },
  { name: "Bilingual Speech Translator", cat: "NLP" },
  { name: "Breast Cancer Histopathology Analyzer", cat: "AIML" },
  { name: "Battery Lifespan Predictor for EV Fleets", cat: "DataScience" },
  { name: "Blockchain Pharmaceutical Supply Chain", cat: "Blockchain" },
  { name: "Botnet C2 Traffic Classifier", cat: "Cybersecurity" },
  { name: "Blood Cell Microscopic Counter", cat: "AIML" },
  { name: "Behavioral Shoplifting Detection Engine", cat: "AIML" },
  { name: "Bio-Acoustic Forest Fauna Monitor", cat: "AIML" },
  { name: "Building Energy Efficiency Optimizer", cat: "IoT" },
  { name: "Blockchain Land Deed Registry", cat: "Blockchain" },
  { name: "Bug Bounty Automatic Exploitation Verifier", cat: "Cybersecurity" },
  { name: "Blind Assistive Obstacle Radar with Audio", cat: "IoT" },

  // C
  { name: "Credit Card Real-Time Fraud Shield", cat: "Fintech" },
  { name: "Chest X-Ray Infection Classifier", cat: "AIML" },
  { name: "Customer Churn Prediction Engine", cat: "DataScience" },
  { name: "Cloud Cost Optimizer for Kubernetes", cat: "FullStack" },
  { name: "Cyber Threat Intelligence Scraper", cat: "Cybersecurity" },
  { name: "Clinical Trial Eligibility Matcher", cat: "NLP" },
  { name: "Crowd Stampede Early Warning Vision", cat: "AIML" },
  { name: "Conversational RAG for Enterprise Wiki", cat: "NLP" },
  { name: "Cryptocurrency Volatility Forecasting Bot", cat: "Fintech" },
  { name: "Container Security Image Auditor", cat: "Cybersecurity" },
  { name: "Camera-Based Heart Rate Monitor", cat: "AIML" },
  { name: "Cervical Cancer Cell Classifier", cat: "AIML" },
  { name: "Cross-Border Remittance Tracker", cat: "Blockchain" },
  { name: "Collaborative Code Sandbox with Voice", cat: "FullStack" },
  { name: "City Traffic Signal Adaptive Timer", cat: "AIML" },

  // D
  { name: "Driver Drowsiness and Distraction Alert", cat: "AIML" },
  { name: "Deepfake Audio and Video Detector", cat: "AIML" },
  { name: "Decentralized Voting with Zero-Knowledge", cat: "Blockchain" },
  { name: "Doctor Handwritten Prescription Parser", cat: "NLP" },
  { name: "Diabetic Retinopathy Staging System", cat: "AIML" },
  { name: "Drone Thermal Forest Fire Monitor", cat: "IoT" },
  { name: "DDoS Mitigation and Rate Limiting Gateway", cat: "Cybersecurity" },
  { name: "Darknet Threat Intelligence Monitor", cat: "Cybersecurity" },
  { name: "Dental Caries and Gum Infection Detector", cat: "AIML" },
  { name: "Disaster Damage Assessment from Satellites", cat: "AIML" },
  { name: "Data Leakage Prevention Proxy for Emails", cat: "Cybersecurity" },
  { name: "Document Semantic Search over PDFs", cat: "NLP" },
  { name: "Decentralized Medical Records on IPFS", cat: "Blockchain" },
  { name: "Deep Reinforcement Learning Trading Agent", cat: "Fintech" },
  { name: "Dynamic Flight Delay Risk Calculator", cat: "DataScience" },

  // E
  { name: "ECG Arrhythmia Classifier using ResNet", cat: "AIML" },
  { name: "Electric Vehicle Smart Grid Balancer", cat: "IoT" },
  { name: "Emotion-Aware Customer Service Voicebot", cat: "NLP" },
  { name: "Emergency SOS Wearable Device for Seniors", cat: "IoT" },
  { name: "Encrypted Cloud Storage with Zero-Knowledge", cat: "Cybersecurity" },
  { name: "Email Phishing and Spoofed Domain Hunter", cat: "Cybersecurity" },
  { name: "Environmental Air Quality Sensor Grid", cat: "IoT" },
  { name: "Explainable AI Model for Loan Approvals", cat: "Fintech" },
  { name: "Eye-Gaze Controlled Computer Keyboard", cat: "AIML" },
  { name: "Enterprise API Security Sentinel", cat: "Cybersecurity" },
  { name: "Elevator Predictive Maintenance Sensor", cat: "IoT" },
  { name: "Essay Evaluation and Grammatical Scorer", cat: "NLP" },
  { name: "E-Commerce Dynamic Discount Engine", cat: "DataScience" },
  { name: "Edge AI People Counter for Retail", cat: "AIML" },
  { name: "Extract Transform Load Pipeline with Drift Detector", cat: "DataScience" },

  // F
  { name: "Face Recognition Attendance with Liveness", cat: "AIML" },
  { name: "Fake News and Source Verification Engine", cat: "NLP" },
  { name: "Financial Invoice Auto-Reconciliation", cat: "Fintech" },
  { name: "Fingerprint Fake Texture Detector", cat: "Cybersecurity" },
  { name: "Forest Wildfire Spread Simulator", cat: "DataScience" },
  { name: "Food Calorie Estimator from Photos", cat: "AIML" },
  { name: "Fall Detection System for Hospital Wards", cat: "AIML" },
  { name: "Football Player Tracking from Broadcast", cat: "AIML" },
  { name: "Flight Route Fuel Optimization Model", cat: "DataScience" },
  { name: "Federated Learning for Private Medical AI", cat: "AIML" },
  { name: "Firewall Attack Log Visualizer", cat: "Cybersecurity" },
  { name: "Fish Disease Detection in Aquaculture", cat: "AIML" },
  { name: "Furniture AR Placement in Living Rooms", cat: "Mobile" },
  { name: "Factory Safety Helmet and Vest Detector", cat: "AIML" },
  { name: "Fraud Ring Identification in Telecom Call Logs", cat: "DataScience" },

  // G
  { name: "Gesture Controlled Drone Flight System", cat: "IoT" },
  { name: "Genome Sequence Variant Classifier", cat: "DataScience" },
  { name: "Greenhouse Climate Automated Controller", cat: "IoT" },
  { name: "Garbage Classification on Conveyor Belts", cat: "AIML" },
  { name: "Gym Workout Form and Posture Corrector", cat: "AIML" },
  { name: "Glaucoma Detection from Eye Fundus Photos", cat: "AIML" },
  { name: "Game Bot with Deep Q-Learning in Unity", cat: "AIML" },
  { name: "Grocery Expiry Date OCR Scanner", cat: "AIML" },
  { name: "Gas Pipeline Leak Detector using Sensors", cat: "IoT" },
  { name: "Geo-Fenced Asset Tracker for Trucks", cat: "IoT" },
  { name: "Grammar Correction Engine with Context", cat: "NLP" },
  { name: "Groundwater Level Forecaster using Rain Data", cat: "DataScience" },
  { name: "Grid Solar Power Inverter Optimizer", cat: "IoT" },
  { name: "Git Repo Security Secrets Scanner", cat: "Cybersecurity" },
  { name: "Graph Neural Network for Molecular Property Prediction", cat: "AIML" },

  // H
  { name: "Heart Attack Risk Prediction from Clinical Records", cat: "DataScience" },
  { name: "Hate Speech and Toxicity Filter for Discord", cat: "NLP" },
  { name: "Honeypot Network for SSH Brute Force Detection", cat: "Cybersecurity" },
  { name: "Hand Gesture to Text Keyboard for Deaf", cat: "AIML" },
  { name: "Hospital Bed Occupancy Forecaster", cat: "DataScience" },
  { name: "Headless CMS with Real-Time Previews", cat: "FullStack" },
  { name: "High-Frequency Crypto Order Book Arbitrage", cat: "Fintech" },
  { name: "Humanoid Robot Balance Controller Simulation", cat: "IoT" },
  { name: "Hotel Booking Cancellation Predictor", cat: "DataScience" },
  { name: "Handwriting to LaTeX Formula Digitizer", cat: "AIML" },
  { name: "Home Automation with Local Speech AI", cat: "IoT" },
  { name: "Helmet Detection on Two-Wheelers from CCTV", cat: "AIML" },
  { name: "Health Insurance Claim Fraud Detector", cat: "Fintech" },
  { name: "Hyperspectral Crop Stress Analyzer", cat: "AIML" },
  { name: "HTTP Request Smuggling Vulnerability Scanner", cat: "Cybersecurity" },

  // I
  { name: "IoT Smart Water Quality and Chlorine Meter", cat: "IoT" },
  { name: "Image Colorizer for Historical B&W Photos", cat: "AIML" },
  { name: "Intrusion Detection System with Snort Rules", cat: "Cybersecurity" },
  { name: "Invoice OCR and Expense Categorization Bot", cat: "NLP" },
  { name: "Insurance Underwriting Risk Assessor", cat: "Fintech" },
  { name: "Indoor Navigation via Bluetooth Beacons", cat: "Mobile" },
  { name: "Industrial Vibration Predictive Maintenance", cat: "IoT" },
  { name: "IoT Smart Energy Meter with Tamper Alert", cat: "IoT" },
  { name: "Instagram Influencer Fake Engagement Auditor", cat: "DataScience" },
  { name: "Image Super-Resolution with GANs (ESRGAN)", cat: "AIML" },
  { name: "Interview Bot with Body Language Scorer", cat: "AIML" },
  { name: "ICU Patient Vital Signs Deterioration Alarm", cat: "DataScience" },
  { name: "IPFS Encrypted Personal Vault", cat: "Blockchain" },
  { name: "IoT Cold-Chain Vaccine Temperature Monitor", cat: "IoT" },
  { name: "Interactive 3D Virtual Anatomy Explorer", cat: "FullStack" },

  // J
  { name: "Job Interview Practice Bot with Voice AI", cat: "NLP" },
  { name: "Jailbreak and Prompt Injection Firewall for LLMs", cat: "Cybersecurity" },
  { name: "Journal Article Citation Graph Visualizer", cat: "DataScience" },
  { name: "Jewelry 3D Virtual Try-On using WebGL", cat: "FullStack" },
  { name: "Joint Disease Detection from Knee X-Rays", cat: "AIML" },
  { name: "Junk Mail Spam Filter with Naive Bayes and BERT", cat: "NLP" },
  { name: "Jupyter Notebook Auto-Documentation Generator", cat: "NLP" },
  { name: "Job Resume Keyword Optimizer for ATS", cat: "NLP" },
  { name: "Juice Factory Quality and Sugar Content Sensor", cat: "IoT" },
  { name: "Java Bytecode Vulnerability Decompiler", cat: "Cybersecurity" },

  // K
  { name: "Kubernetes Cluster Auto-Scaler with ML Forecasting", cat: "FullStack" },
  { name: "Kidney Stone Detection from CT Urograms", cat: "AIML" },
  { name: "Keylogger and Spyware Behavior Blocker", cat: "Cybersecurity" },
  { name: "Knowledge Graph Engine for Enterprise Data", cat: "DataScience" },
  { name: "Knee Osteoarthritis Severity Staging System", cat: "AIML" },
  { name: "Kitchen Inventory Tracker with Barcode and Vision", cat: "IoT" },
  { name: "K-Means Customer Segmentation for Retail Banking", cat: "DataScience" },
  { name: "Kids Educational Speech and Phonics Tutor", cat: "NLP" },
  { name: "Keyword Extraction and Topic Modeling for News", cat: "NLP" },
  { name: "Karate and Martial Arts Pose Scoring System", cat: "AIML" },

  // L
  { name: "Leaf Disease Detection using Mobile Vision", cat: "AIML" },
  { name: "Legal Document Summarizer and Clause Extractor", cat: "NLP" },
  { name: "License Plate Recognition with Speed Estimator", cat: "AIML" },
  { name: "Liver Ultrasound Lesion Classifier", cat: "AIML" },
  { name: "Log Anomaly Detection for Cloud Clusters", cat: "Cybersecurity" },
  { name: "Lung Cancer Nodule Segmentation on CT Scans", cat: "AIML" },
  { name: "Language Translation Earbud Simulation", cat: "NLP" },
  { name: "Landslide Risk Predictor from Rainfall Data", cat: "DataScience" },
  { name: "Lightning Network Fast Payment Gateway", cat: "Blockchain" },
  { name: "Low-Light Video Enhancement with Deep Learning", cat: "AIML" },
  { name: "Livestock Health and Rumination Collar Sensor", cat: "IoT" },
  { name: "Library Bookshelf Auto-Auditor with OCR", cat: "AIML" },
  { name: "Loan Default Predictor with XGBoost", cat: "Fintech" },
  { name: "Luggage Lost-and-Found Visual Matcher", cat: "AIML" },
  { name: "Local LLM Offline Chatbot for Privacy", cat: "NLP" },

  // M
  { name: "Malware Detection using Windows PE Headers", cat: "Cybersecurity" },
  { name: "Medical Symptom to Doctor Recommendation Engine", cat: "NLP" },
  { name: "Multi-Agent AI Code Reviewer", cat: "NLP" },
  { name: "Micro-Expression and Lie Detection System", cat: "AIML" },
  { name: "Mental Health Sentiment Analysis from Journals", cat: "NLP" },
  { name: "Milk Adulteration and Quality Sensor", cat: "IoT" },
  { name: "Mobile Money Fraud Detector for USSD", cat: "Fintech" },
  { name: "Multilingual Voice Chatbot for Farmers", cat: "NLP" },
  { name: "Music Genre Classifier and Mood Playlist Generator", cat: "AIML" },
  { name: "Mining Site Hazard and Gas Concentration Sensor", cat: "IoT" },
  { name: "MRI Spine Degeneration Classifier", cat: "AIML" },
  { name: "Movie Recommendation Engine with Matrix Factorization", cat: "DataScience" },
  { name: "Meeting Transcript Summarizer with Task Cards", cat: "NLP" },
  { name: "Maritime Ship Classification from Satellite SAR", cat: "AIML" },
  { name: "Medication Reminder with Pill Dispenser Sensor", cat: "IoT" },

  // N
  { name: "Network Intrusion Detection with Graph Neural Nets", cat: "Cybersecurity" },
  { name: "News Bias and Source Credibility Scorer", cat: "NLP" },
  { name: "Next-Word Predictor with Transformer Attention", cat: "NLP" },
  { name: "Nutritional Deficiency Scanner from Nail and Eye Photos", cat: "AIML" },
  { name: "Non-Fungible Token (NFT) Authenticity Verifier", cat: "Blockchain" },
  { name: "Natural Disaster Survivor Finder with Thermal Drone", cat: "IoT" },
  { name: "Neonatal Jaundice Detector via Skin Colorimetry", cat: "AIML" },
  { name: "NLP Resume Matcher with Skill Graphs", cat: "NLP" },
  { name: "Network Packet Sniffer and Protocol Analyzer", cat: "Cybersecurity" },
  { name: "Noise Cancellation for Real-Time Microphone Streams", cat: "AIML" },
  { name: "Neuro-Symbolic Reasoning Engine for Math Word Problems", cat: "AIML" },
  { name: "National Highway Toll Gate Automated RFID Billing", cat: "IoT" },
  { name: "Non-Intrusive Appliance Load Monitoring (NILM)", cat: "DataScience" },
  { name: "Neural Style Transfer for Architectural Renders", cat: "AIML" },
  { name: "Night Vision Pedestrian Detector for Vehicles", cat: "AIML" },

  // O
  { name: "Object Detection for Blind Individuals with Voice", cat: "AIML" },
  { name: "Online Exam AI Proctor with Tab-Switch Blocker", cat: "AIML" },
  { name: "Optical Character Recognition (OCR) for Bank Cheques", cat: "AIML" },
  { name: "Ocean Plastic Debris Scanner using Satellite", cat: "AIML" },
  { name: "Open-Source Threat Intelligence Sharing Platform", cat: "Cybersecurity" },
  { name: "Oil Pipeline Corrosion Monitoring System", cat: "IoT" },
  { name: "Organic vs GMO Seed Classification Vision", cat: "AIML" },
  { name: "Offensive Comment Censorship on Social Media", cat: "NLP" },
  { name: "Operating System Process Anomaly Detector", cat: "Cybersecurity" },
  { name: "Online Code Sandbox with Multi-Language Compilers", cat: "FullStack" },
  { name: "Overdose Risk Alert from Pharmacy Records", cat: "DataScience" },
  { name: "Omnichannel Customer Journey Attribution Engine", cat: "DataScience" },
  { name: "On-Device Offline Speech Recognizer", cat: "Mobile" },
  { name: "Orthopedic Fracture Classifier from X-Rays", cat: "AIML" },
  { name: "OpenID Decentralized Connect Gateway", cat: "Blockchain" },

  // P
  { name: "Phishing Website Classifier with URL Heuristics", cat: "Cybersecurity" },
  { name: "Pothole Detection and Road Bump GPS Mapper", cat: "AIML" },
  { name: "Patient Vital Signs Telemetry and Early Warning", cat: "IoT" },
  { name: "Personalized Recipe Generator from Fridge Camera", cat: "AIML" },
  { name: "Parkinson's Disease Tremor Classifier via Mobile", cat: "AIML" },
  { name: "Peer-to-Peer Encrypted File Sharing Network", cat: "Cybersecurity" },
  { name: "Plant Health Monitoring with Soil NPK Sensors", cat: "IoT" },
  { name: "Plagiarism Checker with Cross-Language Detection", cat: "NLP" },
  { name: "Power Grid Fault Detection using PMU Telemetry", cat: "DataScience" },
  { name: "Privacy-Preserving Contact Tracing with Bluetooth", cat: "Mobile" },
  { name: "Pet Emotion and Behavior Classifier from Video", cat: "AIML" },
  { name: "Predictive Maintenance for Aircraft Jet Engines", cat: "DataScience" },
  { name: "Personal Finance Budgeting with Automatic SMS Parsing", cat: "Fintech" },
  { name: "Port Scanning and Asset Inventory Automator", cat: "Cybersecurity" },
  { name: "Pharmacovigilance Adverse Drug Event Scraper", cat: "NLP" },

  // Q
  { name: "Quantum-Resistant Lattice Key Exchange Simulator", cat: "Cybersecurity" },
  { name: "Quality Inspection for PCB Surface Mount Defects", cat: "AIML" },
  { name: "Question Generator from Educational Textbooks", cat: "NLP" },
  { name: "Quick Response (QR) Code Phishing Detector", cat: "Cybersecurity" },
  { name: "Queue Wait-Time Estimator using Overhead Cameras", cat: "AIML" },
  { name: "Quantitative Trading Strategy Backtesting Platform", cat: "Fintech" },
  { name: "Query Optimizer for Distributed SQL Engines", cat: "FullStack" },
  { name: "Quarantine Compliance Checker using GPS Geofencing", cat: "Mobile" },
  { name: "QoS Packet Prioritizer for Online Gaming Routers", cat: "Cybersecurity" },
  { name: "Q&A System over Proprietary Corporate Data", cat: "NLP" },

  // R
  { name: "Ransomware Early Blocker using File Canary Traps", cat: "Cybersecurity" },
  { name: "Real-Time Face Mask and Social Distance Detector", cat: "AIML" },
  { name: "Remote Patient Monitoring with Wearable ESP32", cat: "IoT" },
  { name: "RAG AI Agent for Technical Support Tickets", cat: "NLP" },
  { name: "Road Accident Severity Predictor with Traffic Feeds", cat: "DataScience" },
  { name: "Retail Store Customer Flow Heatmapper", cat: "AIML" },
  { name: "Radio Frequency Drone Detection and Jammer Simulation", cat: "IoT" },
  { name: "Real Estate Property Price Valuation Engine", cat: "DataScience" },
  { name: "Resume Parsing and Talent Pool Semantic Search", cat: "NLP" },
  { name: "Robotic Arm Inverse Kinematics Pick and Place", cat: "IoT" },
  { name: "Railway Track Crack Detection System via Acoustic Sensor", cat: "IoT" },
  { name: "Rainfall Prediction using Radar Satellite Images", cat: "DataScience" },
  { name: "Reverse Image Search Engine with Vector Embeddings", cat: "AIML" },
  { name: "Ransomware Decryption Tool for Known Attack Families", cat: "Cybersecurity" },
  { name: "Real-Time Collaborative Whiteboard Platform", cat: "FullStack" },

  // S
  { name: "Smart Traffic Management with Dynamic Lane Switching", cat: "AIML" },
  { name: "Skin Lesion Melanoma Detector with Mobile Vision", cat: "AIML" },
  { name: "Sign Language Gesture to Speech Synthesizer", cat: "AIML" },
  { name: "Smart Parking Guidance System with Optical Slots", cat: "IoT" },
  { name: "Smart Agriculture Automated Irrigation with LoRaWAN", cat: "IoT" },
  { name: "Solar Panel Dust and Crack Detector using Drone Vision", cat: "AIML" },
  { name: "Spam Email and SMS Classifier with Naive Bayes", cat: "NLP" },
  { name: "Stock Price Directional Predictor with Sentiment", cat: "Fintech" },
  { name: "Student Exam Performance and Dropout Predictor", cat: "DataScience" },
  { name: "Supply Chain Provenance Verification on Blockchain", cat: "Blockchain" },
  { name: "Shoplifting Anomaly Detection in CCTV Video", cat: "AIML" },
  { name: "Smart Waste Bin with Fill-Level Ultrasonic Telemetry", cat: "IoT" },
  { name: "Smart Helmet with Alcohol Sensor for Bike Ignition", cat: "IoT" },
  { name: "Social Media Hate Speech and Cyberbullying Detector", cat: "NLP" },
  { name: "Security Operations Center (SOC) Alert Triage Bot", cat: "Cybersecurity" },

  // T
  { name: "Text Summarizer for Legal and Academic Papers", cat: "NLP" },
  { name: "Traffic Congestion Forecaster with GPS Fleets", cat: "DataScience" },
  { name: "TinyML Keyword Spotter for Smart Home Devices", cat: "IoT" },
  { name: "Telemedicine Video Consultation Portal with E-Prescriptions", cat: "FullStack" },
  { name: "Thermal Imaging Scanner for Fever and Infection", cat: "IoT" },
  { name: "Threat Hunting with Real-Time Endpoint Telemetry", cat: "Cybersecurity" },
  { name: "Tomato Plant Blight and Pest Identification", cat: "AIML" },
  { name: "Twitter Sentiment Analysis on Brand Crises", cat: "NLP" },
  { name: "Two-Factor Authentication with Biometric Face Token", cat: "Cybersecurity" },
  { name: "Tuberculosis Detection from Sputum Smear Microscopy", cat: "AIML" },
  { name: "Telecom Customer Churn Predictor with Interventions", cat: "DataScience" },
  { name: "Text-to-SQL Query Generator for Business Users", cat: "NLP" },
  { name: "Tire Tread Depth Wear Estimation from Smartphone Photo", cat: "AIML" },
  { name: "Travel Expense Tracker with Automated Currency Conversion", cat: "Fintech" },
  { name: "Tamper-Proof Digital Evidence Locker on IPFS", cat: "Blockchain" },

  // U
  { name: "URL Phishing and Malicious Domain Detector", cat: "Cybersecurity" },
  { name: "Underwater Marine Life Classifier for Ocean Research", cat: "AIML" },
  { name: "Urban Heat Island Identification from Landsat Data", cat: "DataScience" },
  { name: "U-Net Ultrasound Nerve Segmentation System", cat: "AIML" },
  { name: "Unsupervised Anomaly Detection for Industrial Robots", cat: "DataScience" },
  { name: "User Interface Generator from Hand-Drawn Wireframes", cat: "AIML" },
  { name: "Unified Medical Record Access Portal with Patient Consent", cat: "FullStack" },
  { name: "UV Radiation Alert Sensor with Bluetooth Mobile App", cat: "IoT" },
  { name: "Utility Bill OCR and Energy Consumption Analyzer", cat: "NLP" },
  { name: "Unmanned Aerial Vehicle (UAV) Obstacle Avoidance Simulator", cat: "IoT" },

  // V
  { name: "Virtual Mouse Control via Webcam Hand Tracking", cat: "AIML" },
  { name: "Voting System using Ethereum Smart Contracts", cat: "Blockchain" },
  { name: "Voice Assistant with Custom Wake-Word Detection", cat: "NLP" },
  { name: "Vehicle Speed Estimation and Rash Driving Alert from CCTV", cat: "AIML" },
  { name: "Video Summarization with Keyframe Extraction", cat: "AIML" },
  { name: "Virtual Reality Therapy Simulator for Phobias", cat: "Mobile" },
  { name: "Vulnerability Scanner for Cloud AWS S3 Bucket Leaks", cat: "Cybersecurity" },
  { name: "Voice Biometric Authentication for Banking Apps", cat: "AIML" },
  { name: "Vegetable Freshness and Spoilage Checker using Vision", cat: "AIML" },
  { name: "Vector Database Semantic Search Engine from Scratch", cat: "FullStack" },

  // W
  { name: "Weather Prediction using Historical Time-Series", cat: "DataScience" },
  { name: "Wildfire Early Warning with Smoke Sensor Network", cat: "IoT" },
  { name: "WhatsApp Chat Sentiment and Analytics Dashboard", cat: "DataScience" },
  { name: "Waste Classification into Recyclable and Organic", cat: "AIML" },
  { name: "Web Application Firewall (WAF) with ModSecurity Rules", cat: "Cybersecurity" },
  { name: "Wearable Health Monitor with Heart Rate and SpO2", cat: "IoT" },
  { name: "Water Leakage Detection in City Pipelines via Pressure", cat: "IoT" },
  { name: "Wind Turbine Power Output Forecaster with Weather Feeds", cat: "DataScience" },
  { name: "WebRTC Low-Latency Screen Sharing and Audio Suite", cat: "FullStack" },
  { name: "Warehouse Inventory Drone with Barcode Scanning", cat: "IoT" },

  // X
  { name: "X-Ray Fracture Detection with Bounding Box Localization", cat: "AIML" },
  { name: "XSS Cross-Site Scripting Automated Penetration Tool", cat: "Cybersecurity" },
  { name: "XML and JSON High-Speed Validation Microservice", cat: "FullStack" },
  { name: "X-Ray Dental Panoramic OPG Teeth Segmentation", cat: "AIML" },
  { name: "XAI Model Explainability Dashboard for Neural Networks", cat: "DataScience" },

  // Y
  { name: "YOLOv10 Real-Time Multi-Class Object Tracking System", cat: "AIML" },
  { name: "YouTube Video Comment Toxicity and Spam Filter", cat: "NLP" },
  { name: "Yield Prediction for Precision Farming using Satellite", cat: "DataScience" },
  { name: "Yoga Pose Detection and Posture Guidance Assistant", cat: "AIML" },
  { name: "Yarn Fabric Defect Detection in Textile Mills", cat: "AIML" },

  // Z
  { name: "Zero-Day Ransomware Behavioral Detector in Sandbox", cat: "Cybersecurity" },
  { name: "Zero-Knowledge Proof Anonymous Credential Verification", cat: "Blockchain" },
  { name: "Zero-Trust Device Compliance and Health Auditor", cat: "Cybersecurity" },
  { name: "Zebra Crossing Pedestrian Safety Alert for Autonomous Vehicles", cat: "AIML" },
  { name: "Zigbee Wireless Sensor Mesh for Industrial Automation", cat: "IoT" }
];

// Expand to reach 560+ distinct topics
topicThemes.forEach((item, idx) => {
  if (!seenTitles.has(item.name)) {
    seenTitles.add(item.name);
    allGenerated.push({
      title: item.name,
      cat: item.cat,
      diff: (idx % 3) + 2,
      time: `${(idx % 4) + 2}–${(idx % 4) + 4} days`,
      trend: idx % 4 === 0
    });
  }
});

// Now systematically create variations with modern suffixes until count >= 560
const baseSeeds = [...allGenerated];
let sIndex = 0;
while (allGenerated.length < targetCount) {
  const seed = baseSeeds[sIndex % baseSeeds.length];
  const suffix = suffixes[Math.floor(allGenerated.length / baseSeeds.length) % suffixes.length];
  const newTitle = `${seed.title} ${suffix}`;
  
  if (!seenTitles.has(newTitle)) {
    seenTitles.add(newTitle);
    allGenerated.push({
      title: newTitle,
      cat: seed.cat,
      diff: seed.diff,
      time: seed.time,
      trend: allGenerated.length % 5 === 0
    });
  }
  sIndex++;
}

console.log(`Generated ${allGenerated.length} unique topics.`);

// Convert to TopicCard format
const topicsCatalog = allGenerated.map((item) => {
  const firstLetter = item.title.trim().charAt(0).toUpperCase();
  const slug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    id: slug,
    letter: firstLetter >= 'A' && firstLetter <= 'Z' ? firstLetter : 'A',
    title: item.title,
    category: item.cat,
    difficulty: item.diff,
    buildTimeDays: item.time,
    trending: item.trend,
    tagline: `Complete end-to-end ${item.title.toLowerCase()} implementation guide with source code and dataset.`,
    whatItDoes: `This project implements ${item.title}. It provides a complete working software pipeline from raw data collection to a live functional user interface. It is designed specifically for final year engineering project evaluations.`,
    realWorldUse: `Adopted by leading tech companies, startups, and research institutes to automate workflows, improve accuracy, and solve critical industry challenges.`,
    examinerExpects: [
      `Demonstrate the working live system with realistic test inputs.`,
      `Explain the underlying algorithm architecture and design tradeoffs.`,
      `Show evaluation metrics including accuracy, latency, and test validation.`,
      `Justify the technology stack choice over traditional methods.`
    ],
    freeVivaQuestions: [
      `Why did you select this specific architecture over simpler baseline approaches?`,
      `How did you partition your dataset between training, validation, and testing?`,
      `What are the known failure modes or edge cases of your system?`
    ],
    freeStep1Title: `Environment setup, virtualenv creation, and library installation`,
    datasetName: `${item.title} Benchmark Dataset (Pre-cleaned and labeled)`
  };
});

// Write to src/lib/blueprint-catalog-555.ts
const code = `/**
 * SubmitKit 555+ Unique & Trending Project Topics Catalog
 * Automatically curated for modern final year engineering submissions.
 * Covers: AIML, FullStack, Cybersecurity, IoT, Blockchain, NLP, DataScience, Mobile.
 */

import { TopicCard } from "./blueprint-engine";

export const TOPICS_555: TopicCard[] = ${JSON.stringify(topicsCatalog, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/blueprint-catalog-555.ts'), code, 'utf8');
console.log("Successfully wrote src/lib/blueprint-catalog-555.ts with " + topicsCatalog.length + " topics!");

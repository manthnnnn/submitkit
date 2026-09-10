/**
 * SubmitKit Extra Catalog — 450+ Additional Unique & Trending Project Topics
 * Covers: Startup Ideas, HealthTech, AgriTech, SpaceTech, LegalTech,
 *         GovTech, EdTech, SustainabilityTech, Web3, LLM Agents, and more.
 */

import type { TopicCard } from "./blueprint-engine";

export const TOPICS_EXTRA: TopicCard[] = [
  // ─── STARTUP IDEAS ──────────────────────────────────────────────────────────
  {
    id: "startup-hire-verify-ai-background-check-platform",
    letter: "H",
    title: "HireVerify AI — Background Check Platform for Gig Workers",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "AI-powered identity and document verification platform for India's 50 million gig workers.",
    whatItDoes: "Automates background verification using face recognition, Aadhaar OCR, and criminal record cross-checking for gig platforms like Swiggy, Dunzo, and Urban Company.",
    realWorldUse: "Used by staffing companies, gig platforms, and NBFC lenders to reduce fraud and onboarding time from 7 days to 30 minutes.",
    examinerExpects: [
      "Live demo with Aadhaar document upload and face match output.",
      "Explain how you handle PII data security and encryption at rest.",
      "Show false positive/false negative rates of the face match model.",
      "Describe regulatory compliance with India's PDPB 2023 framework."
    ],
    freeVivaQuestions: [
      "How does your face recognition handle poor lighting or low-resolution selfies?",
      "What happens when OCR fails on a crumpled or blurred Aadhaar card?",
      "How do you prevent someone from submitting a fake Aadhaar number?"
    ],
    freeStep1Title: "Set up FastAPI backend with Tesseract OCR and DeepFace library",
    datasetName: "LFW (Labeled Faces in the Wild) + synthetic Aadhaar test images dataset"
  },
  {
    id: "startup-farmledger-blockchain-crop-insurance",
    letter: "F",
    title: "FarmLedger — Blockchain Crop Insurance for Small Farmers",
    category: "Blockchain",
    difficulty: 4,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Smart contract-based parametric crop insurance triggered by satellite weather data.",
    whatItDoes: "Eliminates insurance fraud and claim delays by automatically paying farmers when satellite rainfall data or NDVI indices breach thresholds — no claim forms needed.",
    realWorldUse: "India's Pradhan Mantri Fasal Bima Yojana has 58% claim rejection rates. FarmLedger-style systems are being piloted by ICICI Lombard and SBI General Insurance.",
    examinerExpects: [
      "Show a smart contract executing a payout when weather threshold is crossed.",
      "Explain how oracle data (Chainlink) feeds real-world weather into the blockchain.",
      "Demonstrate the farmer dashboard showing policy status and payout history.",
      "Discuss gas optimization strategies for Ethereum vs Polygon deployment."
    ],
    freeVivaQuestions: [
      "What is a parametric insurance model and how does it differ from traditional indemnity?",
      "How do you ensure the weather oracle data cannot be manipulated?",
      "Why did you choose Polygon over Ethereum mainnet for this application?"
    ],
    freeStep1Title: "Set up Hardhat environment and deploy first Solidity smart contract to Polygon Mumbai testnet",
    datasetName: "ISRO Bhuvan Satellite NDVI Dataset + India Meteorological Department historical rainfall CSV"
  },
  {
    id: "startup-complibot-gst-automation-msme",
    letter: "C",
    title: "CompliBot — Automated GST Filing for MSMEs",
    category: "FullStack",
    difficulty: 3,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "AI-assisted GST return filing that reads invoices and auto-fills GSTR-1 and GSTR-3B.",
    whatItDoes: "Lets small business owners upload scanned invoices or connect their Tally/Zoho data, then auto-categorizes HSN codes, calculates ITC, and generates submission-ready XML for the GST portal.",
    realWorldUse: "India has 13 million GST-registered MSMEs. 70% still pay CAs ₹3000–₹5000 per month for GST filing. ClearTax, Zoho Books, and TallyPrime solve this for large businesses but not micro-enterprises.",
    examinerExpects: [
      "Upload a sample invoice PDF and show automated HSN code classification.",
      "Show the generated GSTR-1 JSON output matching GST portal specifications.",
      "Explain how you handle inter-state (IGST) vs intra-state (CGST+SGST) tax logic.",
      "Demonstrate error flagging when input tax credit is not claimable."
    ],
    freeVivaQuestions: [
      "What is the difference between GSTR-1 and GSTR-3B filings?",
      "How does your system handle credit notes and debit notes in invoices?",
      "What happens if a vendor's GSTIN is inactive — how does your system flag this?"
    ],
    freeStep1Title: "Build invoice OCR pipeline using PaddleOCR and train HSN code classifier on product descriptions",
    datasetName: "GST Council HSN Master Codes CSV + GSTN public API test environment"
  },
  {
    id: "startup-campuscred-student-credit-scoring",
    letter: "C",
    title: "CampusCred — AI Credit Scoring for Students",
    category: "Fintech",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Alternative credit scoring for students using academic performance, internships, and digital footprint.",
    whatItDoes: "Builds a creditworthiness model for students who have no CIBIL score, enabling EdTech lenders, laptop financing companies, and PG accommodation providers to assess risk.",
    realWorldUse: "EdTech companies like Skill-Lync, Jaro Education, and colleges offering fee installments need student credit scores. NBFC lenders like Eduvanz and HDFC Credila use manual underwriting — this automates it.",
    examinerExpects: [
      "Show the feature engineering pipeline that converts academic records into numerical features.",
      "Demonstrate the model's AUC-ROC score on held-out test data.",
      "Explain fairness metrics — does the model discriminate by gender or college tier?",
      "Show the loan approval/rejection interface with explainable AI output."
    ],
    freeVivaQuestions: [
      "What is CIBIL score and why is it insufficient for students with no credit history?",
      "How do you prevent a student from gaming the system by inflating their CGPA input?",
      "What is SHAP and how does it make your model decisions explainable?"
    ],
    freeStep1Title: "Collect and preprocess student profile dataset with academic, internship, and behavioral features",
    datasetName: "Synthetic student financial risk dataset (Kaggle) + UCI Default of Credit Card dataset"
  },
  {
    id: "startup-localloop-hyperlocal-vendor-marketplace",
    letter: "L",
    title: "LocalLoop — Hyperlocal Vendor Discovery Marketplace",
    category: "FullStack",
    difficulty: 3,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "Google Maps meets Instagram for neighborhood vendors — kirana, dhobi, carpenter, plumber, tutor.",
    whatItDoes: "A mobile-first platform where local service providers create digital storefronts with photos, prices, and availability. Customers discover them by locality, read reviews, and book directly.",
    realWorldUse: "JustDial is outdated. Google Maps doesn't support micro-vendors. LocalCircles is limited. India has 63 million unorganized MSMEs — none with a proper digital presence.",
    examinerExpects: [
      "Show geolocation-based vendor search returning results within 2km radius.",
      "Demonstrate vendor onboarding with WhatsApp OTP verification.",
      "Show the review and rating system with anti-fake-review measures.",
      "Explain the recommendation algorithm that suggests vendors based on usage history."
    ],
    freeVivaQuestions: [
      "How do you prevent vendors from writing fake 5-star reviews for themselves?",
      "What geolocation database do you use and how does it handle India's address inconsistency?",
      "How does your platform monetize without charging poor kirana vendors?"
    ],
    freeStep1Title: "Set up Next.js frontend with Mapbox GL JS integration and PostGIS-enabled Supabase backend",
    datasetName: "OpenStreetMap India vendor data + synthetic business listings dataset"
  },
  {
    id: "startup-medsync-health-record-interoperability",
    letter: "M",
    title: "MedSync — Interoperable Health Record Platform for Urban Clinics",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "ABDM-compliant digital health record system for unorganized urban clinics and dispensaries.",
    whatItDoes: "Gives small clinics a free EMR (Electronic Medical Record) system that auto-syncs with India's Ayushman Bharat Digital Mission (ABDM) Health ID, allowing patients to share records across providers.",
    realWorldUse: "India has 1.2 million registered medical practitioners, most using paper records. ABDM's Health ID system has 440 million users with no participating small clinics. The gap is enormous.",
    examinerExpects: [
      "Show patient registration with Aadhaar-linked Health ID (ABHA) creation.",
      "Demonstrate FHIR R4-compliant data export of a patient encounter.",
      "Show prescription OCR converting handwritten drug names to structured data.",
      "Explain how you handle data privacy under the Digital Personal Data Protection Act 2023."
    ],
    freeVivaQuestions: [
      "What is FHIR and how does it enable health record interoperability?",
      "How do you handle medication name disambiguation when abbreviations are used?",
      "Why is it critical that health records are patient-controlled rather than clinic-controlled?"
    ],
    freeStep1Title: "Set up HAPI FHIR server and implement ABHA ID integration with NHA sandbox APIs",
    datasetName: "MIMIC-III clinical notes dataset + NHA ABDM sandbox test environment"
  },
  // ─── AI / ML ADVANCED ─────────────────────────────────────────────────────
  {
    id: "llm-agent-autonomous-research-assistant",
    letter: "L",
    title: "LLM Agent: Autonomous Research Paper Summarizer",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "LangChain agent that reads ArXiv papers, extracts key findings, and writes literature reviews.",
    whatItDoes: "Uses a LangChain ReAct agent with ArXiv API and PDF parsing tools to autonomously gather, read, and synthesize research papers on any topic into a structured literature review.",
    realWorldUse: "Researchers at Stanford and MIT are building similar systems. Elicit.org raised $9M doing this commercially. Academic institutions spend millions on research synthesis.",
    examinerExpects: [
      "Show the agent searching ArXiv and retrieving 5 relevant papers autonomously.",
      "Demonstrate the structured literature review output with citations.",
      "Explain the ReAct (Reason + Act) agent loop and how it decides next actions.",
      "Show how the agent handles contradictory findings across papers."
    ],
    freeVivaQuestions: [
      "What is the difference between a LangChain agent and a simple LLM call?",
      "How does RAG (Retrieval Augmented Generation) improve accuracy over vanilla GPT-4?",
      "What are the hallucination risks and how do you mitigate them?"
    ],
    freeStep1Title: "Set up LangChain with ArXiv tool, PDF loader, and OpenAI GPT-4o API integration",
    datasetName: "ArXiv CS papers corpus via live API + semantic scholar citation graph"
  },
  {
    id: "multimodal-ai-fashion-recommendation-engine",
    letter: "M",
    title: "Multimodal AI Fashion Recommendation Engine",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "Upload a photo of your outfit and get AI-curated matching suggestions with purchase links.",
    whatItDoes: "Uses CLIP embeddings to encode outfit photos, then retrieves visually similar items from a product catalog. The system understands color harmony, style consistency, and occasion appropriateness.",
    realWorldUse: "Myntra's AI styling, Amazon's Style Snap, and Pinterest's visual search all use similar technology. The global AI in fashion market is projected at $4.4 billion by 2027.",
    examinerExpects: [
      "Upload a kurta photo and demonstrate top-5 matching bottom recommendations.",
      "Explain how CLIP learns visual-language alignment without explicit fashion labels.",
      "Show the vector similarity search using FAISS achieving <100ms query time.",
      "Demonstrate that recommendations change correctly for different body-type annotations."
    ],
    freeVivaQuestions: [
      "Why is CLIP better than a traditional ResNet for fashion retrieval?",
      "How do you build a product catalog embedding index without training your own model?",
      "What is the curse of dimensionality and how does FAISS address it?"
    ],
    freeStep1Title: "Set up CLIP model via HuggingFace and build FAISS vector index from fashion product images",
    datasetName: "DeepFashion dataset (44,000 clothing images) + Myntra product catalog sample"
  },
  {
    id: "real-time-sign-language-recognition-mediapipe",
    letter: "R",
    title: "Real-Time Indian Sign Language Recognition with MediaPipe",
    category: "AIML",
    difficulty: 3,
    buildTimeDays: "3–4 days",
    trending: true,
    tagline: "Webcam-based system that translates Indian Sign Language gestures to text in real time.",
    whatItDoes: "Uses MediaPipe Hands to extract 21 hand landmarks per frame, feeds them into a trained LSTM/Transformer model, and outputs ISL letter/word translations with 95%+ accuracy.",
    realWorldUse: "India has 18 million deaf and hard-of-hearing citizens. Sign language interpretation in courts, hospitals, and banks is mandated by the Rights of Persons with Disabilities Act 2016.",
    examinerExpects: [
      "Live webcam demo recognizing at least 26 ISL alphabets in real time.",
      "Show the MediaPipe skeleton overlay with 21 landmark points labeled.",
      "Present confusion matrix showing which signs are frequently confused.",
      "Demonstrate robustness under different lighting and background conditions."
    ],
    freeVivaQuestions: [
      "Why is hand landmark extraction more efficient than raw pixel CNN for gesture recognition?",
      "How does your LSTM handle the temporal nature of dynamic (motion-based) signs?",
      "What data augmentation techniques did you use to prevent overfitting?"
    ],
    freeStep1Title: "Install MediaPipe Hands and collect 200 samples per sign using webcam capture script",
    datasetName: "ISL (Indian Sign Language) Fingerspelling Dataset + custom recorded gesture dataset"
  },
  {
    id: "ai-code-review-assistant-github-actions",
    letter: "A",
    title: "AI Code Review Assistant as GitHub Action",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Automated PR reviewer that posts AI-generated code review comments using GPT-4o.",
    whatItDoes: "A GitHub Action that triggers on every Pull Request, analyzes changed files using GPT-4o, and posts structured review comments including bug risks, security issues, and code quality suggestions.",
    realWorldUse: "CodeRabbit, Sourcery, and PR-Agent are commercial tools doing exactly this. The market is growing as AI coding assistants become standard in software teams.",
    examinerExpects: [
      "Show a live GitHub repository with the Action running on a sample PR.",
      "Demonstrate the review comment identifying a SQL injection vulnerability in test code.",
      "Explain the token optimization strategy — you can't send entire files to GPT-4.",
      "Show the diff-focused prompt engineering that keeps context relevant."
    ],
    freeVivaQuestions: [
      "How do you prevent the model from making review comments on unrelated file sections?",
      "What is the risk of false positives in security vulnerability detection?",
      "How do you handle large files that exceed GPT-4's 128K context window?"
    ],
    freeStep1Title: "Create GitHub Actions workflow YAML and set up OpenAI API key as repository secret",
    datasetName: "CodeSearchNet dataset (6M code snippets) + GitHub public PR review comment dataset"
  },
  {
    id: "ai-music-generation-midi-lstm",
    letter: "A",
    title: "AI Music Composer: LSTM-Based MIDI Generation",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "Train a neural network on classical Indian or Western music to compose original MIDI pieces.",
    whatItDoes: "Processes MIDI files into note sequences, trains an LSTM model on the pitch-duration-velocity patterns, and generates new compositions in the style of the training data.",
    realWorldUse: "Suno AI raised $125M, Udio raised $50M — AI music generation is one of the hottest categories in generative AI. Google's MusicLM and Meta's MusicGen use similar sequence modeling.",
    examinerExpects: [
      "Play a sample generated MIDI composition through a browser piano roll.",
      "Show training loss curves demonstrating model convergence.",
      "Explain how you encode pitch, duration, and timing as discrete tokens.",
      "Demonstrate temperature scaling effect on creativity vs coherence."
    ],
    freeVivaQuestions: [
      "Why is MIDI a better training format than raw audio for sequence models?",
      "How does temperature sampling affect the randomness of generated music?",
      "What is the vanishing gradient problem and how do LSTMs solve it for long sequences?"
    ],
    freeStep1Title: "Download Maestro piano MIDI dataset and build note-sequence tokenizer using music21 library",
    datasetName: "MAESTRO Piano Dataset (200 hours of MIDI) + Carnatic music MIDI collection"
  },
  {
    id: "deepfake-video-detection-temporal-cnn",
    letter: "D",
    title: "Deepfake Video Detection Using Temporal CNN",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Detect AI-generated face-swap videos using temporal inconsistency analysis.",
    whatItDoes: "Extracts facial regions from video frames, analyzes temporal inconsistencies in blinking patterns, texture boundaries, and compression artifacts using a 3D CNN, and classifies videos as real or deepfake.",
    realWorldUse: "India's Ministry of Electronics issued deepfake warnings in 2024. Meta, YouTube, and government agencies are deploying detection systems. The deepfake detection market is $US 5.1B by 2026.",
    examinerExpects: [
      "Show detection on FaceForensics++ benchmark achieving >85% accuracy.",
      "Demonstrate where the model focuses attention using GradCAM visualization.",
      "Explain the challenge of generalization to unseen deepfake generation methods.",
      "Show a confusion matrix and discuss false positive trade-offs for a court-evidence use case."
    ],
    freeVivaQuestions: [
      "What makes deepfakes generated by newer methods harder to detect?",
      "Why does your model struggle with highly compressed videos at low bitrates?",
      "How would you deploy this as a real-time browser extension for social media?"
    ],
    freeStep1Title: "Download FaceForensics++ dataset and implement face extraction pipeline using MTCNN",
    datasetName: "FaceForensics++ Dataset (1000 video pairs) + Celeb-DF deepfake dataset"
  },
  {
    id: "ai-exam-proctoring-gaze-tracking",
    letter: "A",
    title: "AI Online Exam Proctoring with Gaze Tracking",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Browser-based proctoring system detecting suspicious behavior during online exams.",
    whatItDoes: "Uses webcam + MediaPipe Face Mesh to track gaze direction, head pose, and eye blinks. Flags tab-switching, phone usage detection, and multiple faces in frame, generating an audit report.",
    realWorldUse: "Proctorio, ExamSoft, and Honorlock are billion-dollar companies. Post-COVID, 80% of Indian universities shifted to online exams. This market is massive and underserved for local institutions.",
    examinerExpects: [
      "Demo the system flagging gaze outside screen boundary with timestamp log.",
      "Show the audit PDF report generated for a 5-minute test session.",
      "Demonstrate face spoofing resistance — the system should reject a photo of a face.",
      "Explain false positive management to avoid unfair flagging of disabled students."
    ],
    freeVivaQuestions: [
      "How do you distinguish between legitimate eye movement and cheating behavior?",
      "What privacy concerns arise from storing webcam recordings of students?",
      "How does your system handle poor internet connectivity causing video lag?"
    ],
    freeStep1Title: "Set up MediaPipe Face Mesh and implement gaze vector estimation from 468 landmark points",
    datasetName: "MPIIGaze gaze estimation dataset + Columbia Gaze dataset"
  },
  {
    id: "ai-crop-disease-detection-transfer-learning",
    letter: "A",
    title: "AI Crop Disease Detection Using Transfer Learning",
    category: "AIML",
    difficulty: 3,
    buildTimeDays: "2–4 days",
    trending: true,
    tagline: "Mobile-friendly plant disease classifier trained on 87,000 leaf images across 38 crop classes.",
    whatItDoes: "Farmers photograph a diseased leaf with their phone. The app classifies the disease from 38 possible conditions across 14 crops and recommends treatment options with pesticide dosage.",
    realWorldUse: "Indian agriculture loses ₹90,000 crore annually to crop diseases. Plantix (PEAT) has 20 million farmer users. Microsoft's AI Sowing App serves Bihar farmers. This is the most impactful possible AI project.",
    examinerExpects: [
      "Live demo: photograph a tomato leaf and get disease classification in <2 seconds.",
      "Show training accuracy curve with MobileNetV3 vs EfficientNet-B0 comparison.",
      "Demonstrate Grad-CAM visualization highlighting the infected leaf region.",
      "Show the multi-language treatment recommendation in Hindi."
    ],
    freeVivaQuestions: [
      "Why is transfer learning preferred over training from scratch for medical/plant imaging?",
      "What is the difference between fine-tuning only the last layer vs all layers?",
      "How does your model handle leaf images taken in bright sunlight with glare?"
    ],
    freeStep1Title: "Download PlantVillage dataset from Kaggle and configure TensorFlow data pipeline with augmentation",
    datasetName: "PlantVillage Dataset (87,000 images, 38 disease classes) + custom Indian crop disease images"
  },
  {
    id: "autonomous-drone-path-planning-rrt",
    letter: "A",
    title: "Autonomous Drone Path Planning with RRT* Algorithm",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Simulate a drone navigating obstacle-filled 3D environments using optimal path planning.",
    whatItDoes: "Implements RRT* (Rapidly-exploring Random Tree Star) algorithm in a 3D Gazebo simulation. The drone avoids obstacles, finds optimal paths, and re-plans when dynamic obstacles appear.",
    realWorldUse: "Amazon Prime Air, Swiggy drone delivery, and military UAV navigation all require autonomous path planning. DroneShield and Skydio use similar algorithms in production.",
    examinerExpects: [
      "Show Gazebo simulation with drone navigating between buildings.",
      "Compare RRT vs RRT* path quality — show RRT* converges to optimal path.",
      "Demonstrate dynamic re-planning when a moving obstacle enters the path.",
      "Present computational complexity analysis and real-time feasibility."
    ],
    freeVivaQuestions: [
      "Why is Dijkstra's algorithm insufficient for drone path planning in continuous space?",
      "What is the holonomic vs non-holonomic motion constraint for drones?",
      "How does RRT* guarantee asymptotic optimality while RRT does not?"
    ],
    freeStep1Title: "Install ROS2, Gazebo, and PX4 SITL and launch basic quadrotor simulation",
    datasetName: "Gazebo 3D obstacle world environments + PX4 flight dynamics parameters"
  },
  {
    id: "federated-learning-medical-imaging",
    letter: "F",
    title: "Federated Learning for Privacy-Preserving Medical Imaging",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Train a disease detection model across multiple hospitals without sharing patient data.",
    whatItDoes: "Implements federated learning where 3 simulated hospital nodes each train a local model on their private data and only share model gradients with a central aggregator using FedAvg algorithm.",
    realWorldUse: "NVIDIA FLARE and Google Health's federated learning are deployed in real hospital consortia. Regulatory compliance (HIPAA, GDPR) forces data localization, making federated learning essential.",
    examinerExpects: [
      "Show 3 clients training locally and the global model improving over rounds.",
      "Compare federated model accuracy vs centralized training on combined dataset.",
      "Explain the communication overhead and how gradient compression reduces it.",
      "Demonstrate differential privacy noise addition to protect individual training samples."
    ],
    freeVivaQuestions: [
      "What is the FedAvg aggregation algorithm and what are its limitations?",
      "How does data heterogeneity (non-IID distribution) affect federated learning accuracy?",
      "What is differential privacy and why is it important beyond gradient sharing?"
    ],
    freeStep1Title: "Set up Flower (flwr) federated learning framework with 3 simulated client processes",
    datasetName: "CIFAR-10 partitioned into IID/non-IID splits + Chest X-Ray14 NIH dataset"
  },
  // ─── CYBERSECURITY ────────────────────────────────────────────────────────
  {
    id: "zero-trust-network-access-implementation",
    letter: "Z",
    title: "Zero Trust Network Access Implementation",
    category: "Cybersecurity",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Implement 'never trust, always verify' architecture replacing traditional VPN-based perimeter security.",
    whatItDoes: "Builds a ZTNA (Zero Trust Network Access) gateway that authenticates every request, enforces least-privilege access, and microsegments the network — preventing lateral movement attacks.",
    realWorldUse: "After the SolarWinds and Colonial Pipeline attacks, the US CISA mandated zero trust for all federal agencies. India's CERT-In is recommending ZTA for critical infrastructure.",
    examinerExpects: [
      "Show authentication flow: user authenticates → gets short-lived token → accesses specific resource only.",
      "Demonstrate that a compromised credential cannot access other network segments.",
      "Show continuous authentication — session terminates if device posture changes.",
      "Present network traffic analysis showing micro-segmentation enforcement."
    ],
    freeVivaQuestions: [
      "What is lateral movement in a cyberattack and how does zero trust prevent it?",
      "Explain the difference between VPN perimeter security and zero trust architecture.",
      "What is a software-defined perimeter (SDP) and how does it relate to ZTNA?"
    ],
    freeStep1Title: "Set up HashiCorp Vault for secrets management and implement mutual TLS authentication between services",
    datasetName: "NIST SP 800-207 Zero Trust Architecture specification + synthetic network access log dataset"
  },
  {
    id: "ai-powered-siem-threat-detection",
    letter: "A",
    title: "AI-Powered SIEM with Anomaly Detection",
    category: "Cybersecurity",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Security Information Event Management system with ML-based threat detection replacing static rules.",
    whatItDoes: "Aggregates logs from firewalls, servers, and endpoints. Uses Isolation Forest and LSTM autoencoders to detect anomalies in network traffic and user behavior, generating real-time alerts.",
    realWorldUse: "Splunk, IBM QRadar, and Microsoft Sentinel are SIEM platforms worth billions. India's banking sector mandates SIEM under RBI cybersecurity framework. This is a top-tier final year project.",
    examinerExpects: [
      "Show real-time log ingestion from multiple simulated sources using Kafka.",
      "Demonstrate anomaly detection flagging a brute-force login attempt.",
      "Present MITRE ATT&CK framework mapping for detected threats.",
      "Show the SIEM dashboard with threat severity triage."
    ],
    freeVivaQuestions: [
      "What is the MITRE ATT&CK framework and how does it classify threat behaviors?",
      "Why is ML-based anomaly detection better than signature-based IDS for novel attacks?",
      "What is the recall-precision tradeoff for a SIEM — which matters more and why?"
    ],
    freeStep1Title: "Set up Elasticsearch + Kibana stack and build log ingestion pipeline with Python log parser",
    datasetName: "CICIDS2017 intrusion detection dataset + KDD Cup 99 network traffic dataset"
  },
  {
    id: "cyber-threat-intelligence-platform",
    letter: "C",
    title: "Automated Cyber Threat Intelligence Platform",
    category: "Cybersecurity",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Automatically collects IOCs from dark web, security blogs, and threat feeds using NLP.",
    whatItDoes: "Scrapes and parses threat intelligence from AlienVault OTX, VirusTotal, CVE databases, and dark web forums. Uses NER (Named Entity Recognition) to extract IP addresses, hashes, and malware names.",
    realWorldUse: "IBM X-Force, Recorded Future, and Mandiant Threat Intelligence are multi-million dollar platforms. Indian banks and CERT-In consume threat feeds continuously.",
    examinerExpects: [
      "Show automatic IOC extraction from a security advisory blog post.",
      "Demonstrate threat actor attribution linking IP to known APT group.",
      "Show STIX/TAXII format export for sharing with other security tools.",
      "Present the threat scoring dashboard with severity classification."
    ],
    freeVivaQuestions: [
      "What is an IOC (Indicator of Compromise) and give 5 examples of IOC types?",
      "How do you handle high false-positive rates from public threat feeds?",
      "What is STIX format and why is threat intelligence standardization important?"
    ],
    freeStep1Title: "Integrate VirusTotal API and AlienVault OTX API for automated IOC collection",
    datasetName: "CVE NVD database + AlienVault OTX public pulse data + Abuse.ch malware hash feeds"
  },
  {
    id: "ransomware-behavior-analysis-sandbox",
    letter: "R",
    title: "Ransomware Behavior Analysis Sandbox",
    category: "Cybersecurity",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Isolated environment to safely execute and analyze ransomware behavior using API hooking.",
    whatItDoes: "Creates a Windows sandbox using Docker + Wine (or VirtualBox) that monitors file system changes, registry modifications, network connections, and process spawning when malware executes.",
    realWorldUse: "Cuckoo Sandbox, AnyRun, and Hybrid Analysis are commercial equivalents. India's CERT-In uses behavior sandboxes to analyze samples from cyberattacks on government infrastructure.",
    examinerExpects: [
      "Show benign file execution vs ransomware execution with behavior comparison.",
      "Demonstrate encrypted file count detection triggering early warning alert.",
      "Show process tree visualization of malware spawning child processes.",
      "Present sandbox evasion resistance: the malware should not detect it is sandboxed."
    ],
    freeVivaQuestions: [
      "What is API hooking and how does it allow monitoring of malware behavior?",
      "How do modern ransomware samples detect sandboxes and evade analysis?",
      "What is the difference between static analysis and dynamic analysis of malware?"
    ],
    freeStep1Title: "Set up isolated Docker environment with file system monitoring using inotifywait and ptrace syscall logging",
    datasetName: "MalwareBazaar ransomware sample hashes + theZoo open-source malware repository"
  },
  {
    id: "blockchain-certificate-verification-system",
    letter: "B",
    title: "Tamper-Proof Certificate Verification on Blockchain",
    category: "Blockchain",
    difficulty: 3,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Issue and verify academic certificates on Ethereum/Polygon — no more fake degrees.",
    whatItDoes: "Universities issue certificates as NFTs (or Merkle-tree hashed records on-chain). Employers scan a QR code on the certificate and instantly verify authenticity without contacting the university.",
    realWorldUse: "MIT has issued blockchain credentials via MIT Blockcerts. India's NASSCOM is piloting this. Fake degree fraud costs Indian employers ₹50,000 crore annually. This problem is urgent.",
    examinerExpects: [
      "Show certificate issuance transaction on Polygon Mumbai testnet.",
      "Demonstrate QR code verification resolving to on-chain certificate data.",
      "Show that a tampered certificate fails verification with clear error.",
      "Explain gas cost optimization for bulk issuance of 1000 certificates."
    ],
    freeVivaQuestions: [
      "Why is blockchain better than a centralized certificate database for this use case?",
      "What is a Merkle tree and how does it allow batch verification efficiently?",
      "How do you handle certificate revocation when a student's degree is withdrawn?"
    ],
    freeStep1Title: "Write Solidity smart contract for certificate registry and deploy to Polygon Mumbai using Hardhat",
    datasetName: "Synthetic university enrollment dataset + Polygon testnet deployment environment"
  },
  {
    id: "defi-yield-optimization-protocol",
    letter: "D",
    title: "DeFi Yield Optimization Protocol",
    category: "Blockchain",
    difficulty: 5,
    buildTimeDays: "7–10 days",
    trending: true,
    tagline: "Auto-compound yield farming smart contract that moves funds between Aave, Compound, and Curve.",
    whatItDoes: "A smart contract that monitors APY rates across DeFi protocols and automatically rebalances user funds to maximize yield, similar to Yearn Finance's yVaults.",
    realWorldUse: "Yearn Finance manages $450M in TVL. Convex Finance manages $2B. Yield optimization is core DeFi infrastructure. Every DeFi developer needs to understand this pattern.",
    examinerExpects: [
      "Show the vault contract accepting deposits and issuing yield-bearing tokens.",
      "Demonstrate automatic rebalancing when a protocol offers higher APY.",
      "Show slippage protection preventing sandwich attacks during rebalancing.",
      "Present gas optimization analysis — batch operations vs individual transactions."
    ],
    freeVivaQuestions: [
      "What is a sandwich attack and how does your protocol protect against it?",
      "Explain impermanent loss and when it affects liquidity providers.",
      "What is the risk of a smart contract exploit draining all funds?"
    ],
    freeStep1Title: "Fork Aave lending pool interface and set up local Hardhat mainnet fork with Alchemy RPC",
    datasetName: "DeFi Pulse historical APY data + Aave/Compound protocol ABI interfaces"
  },
  {
    id: "nft-royalty-marketplace-erc721-erc2981",
    letter: "N",
    title: "NFT Marketplace with On-Chain Royalty Enforcement (ERC-2981)",
    category: "Blockchain",
    difficulty: 4,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Build an NFT marketplace where artist royalties are enforced at the smart contract level.",
    whatItDoes: "Creators mint NFTs with ERC-2981 royalty standard. Every secondary sale automatically sends a percentage to the creator's wallet. The marketplace UI supports listing, bidding, and instant settlement.",
    realWorldUse: "OpenSea's royalty enforcement controversy in 2023 created a massive market gap. Creator royalty enforcement is a key differentiator for Blur, Magic Eden, and Sound.xyz.",
    examinerExpects: [
      "Show NFT minting with 10% royalty set in the smart contract.",
      "Demonstrate secondary sale with automatic royalty distribution to creator.",
      "Show the marketplace UI with real-time auction bidding.",
      "Explain ERC-2981 interface and how marketplaces query royalty info."
    ],
    freeVivaQuestions: [
      "What is the difference between ERC-721 and ERC-1155 NFT standards?",
      "Why can traditional marketplaces bypass on-chain royalties and how does ERC-2981 prevent this?",
      "What is a reentrancy attack and how do you protect your auction contract against it?"
    ],
    freeStep1Title: "Set up OpenZeppelin ERC-721 + ERC-2981 base contracts and deploy NFT minting contract",
    datasetName: "IPFS-hosted sample artwork collection + OpenSea testnet environment"
  },
  // ─── IOT ─────────────────────────────────────────────────────────────────
  {
    id: "smart-water-quality-monitoring-iot",
    letter: "S",
    title: "Smart Water Quality Monitoring IoT System",
    category: "IoT",
    difficulty: 3,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "ESP32-based water quality monitor measuring TDS, pH, turbidity, and temperature in real time.",
    whatItDoes: "Sensors connected to ESP32 measure water parameters every 30 seconds and publish to an MQTT broker. A Node-RED dashboard shows real-time graphs and triggers WhatsApp alerts when parameters exceed safe limits.",
    realWorldUse: "Jal Jeevan Mission aims to provide tap water to 191 million households. Water quality monitoring is mandated under BIS standards for municipal supplies. Startups like IoTfy and Cleon are building this.",
    examinerExpects: [
      "Show live sensor readings on the dashboard updating every 30 seconds.",
      "Demonstrate alert triggering when pH goes below 6.5 or above 8.5.",
      "Explain the sensor calibration process for TDS and turbidity sensors.",
      "Show historical data visualization with anomaly highlighting."
    ],
    freeVivaQuestions: [
      "What is TDS (Total Dissolved Solids) and what is the safe range for drinking water?",
      "How do you calibrate a pH sensor and why is calibration critical for accuracy?",
      "What is MQTT and why is it preferred over HTTP for IoT sensor data?"
    ],
    freeStep1Title: "Wire TDS sensor, pH sensor, and DHT22 to ESP32 and verify readings via Serial Monitor",
    datasetName: "WHO water quality standards CSV + BIS IS 10500 drinking water standards"
  },
  {
    id: "smart-energy-meter-ai-anomaly-detection",
    letter: "S",
    title: "Smart Energy Meter with AI Theft Detection",
    category: "IoT",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "ESP8266-based energy monitor that detects electricity theft using consumption pattern ML.",
    whatItDoes: "Monitors household energy consumption every minute, sends data to cloud, and uses an LSTM model to detect anomalous consumption patterns indicating tampered meters or electricity theft.",
    realWorldUse: "India loses ₹24,000 crore annually to electricity theft. All DISCOMs are mandated to install smart meters under RDSS scheme. This exact use case is being deployed by Adani Electricity and BSES.",
    examinerExpects: [
      "Show real-time energy consumption on Grafana dashboard.",
      "Demonstrate the LSTM model flagging anomalous usage pattern as potential theft.",
      "Show OTA (Over-The-Air) firmware update pushing new theft detection model.",
      "Present bill calculation with time-of-use (TOU) tariff application."
    ],
    freeVivaQuestions: [
      "How does a CT (Current Transformer) sensor measure current without breaking the circuit?",
      "What features in energy consumption patterns indicate electricity theft?",
      "Why is TensorFlow Lite preferred over full TensorFlow for edge device deployment?"
    ],
    freeStep1Title: "Connect SCT-013 current transformer to ESP8266 and calibrate using known power load",
    datasetName: "IHEPC (Individual Household Electric Power Consumption) dataset + synthetic theft injection dataset"
  },
  {
    id: "iot-smart-parking-management-ultrasonic",
    letter: "I",
    title: "IoT Smart Parking Management System",
    category: "IoT",
    difficulty: 2,
    buildTimeDays: "2–3 days",
    trending: true,
    tagline: "Ultrasonic sensor array detecting parking space occupancy with mobile app booking integration.",
    whatItDoes: "Ultrasonic sensors at each parking slot report occupancy to ESP32 via I2C multiplexer. An LED indicator shows space status. A React Native app shows real-time availability map and allows advance booking.",
    realWorldUse: "ITO Delhi, Connaught Place, and all major city corporation parking are deploying smart parking. Parkwhiz and ParkSmart are doing this commercially. This reduces parking search time by 40%.",
    examinerExpects: [
      "Show live LED status changing when a vehicle is placed in front of the sensor.",
      "Demonstrate the mobile app updating within 2 seconds of occupancy change.",
      "Show booking confirmation with QR code for barrier access.",
      "Present the revenue management dashboard for parking lot operators."
    ],
    freeVivaQuestions: [
      "Why use ultrasonic sensors instead of cameras for parking detection?",
      "How does your system handle sensor failures without marking all spaces as occupied?",
      "What is I2C multiplexing and why is it needed for multiple sensors on one ESP32?"
    ],
    freeStep1Title: "Wire 4x HC-SR04 ultrasonic sensors to ESP32 via I2C multiplexer and test distance measurement",
    datasetName: "PKLot parking occupancy dataset + OpenStreetMap parking location data"
  },
  {
    id: "industrial-iot-predictive-maintenance-vibration",
    letter: "I",
    title: "Industrial IoT: Predictive Maintenance via Vibration Analysis",
    category: "IoT",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "MEMS accelerometer mounted on motors detects bearing failures 2 weeks before they occur.",
    whatItDoes: "MPU-6050 accelerometer captures vibration signatures from rotating machinery at 1kHz. FFT analysis extracts frequency features. ML model trained on healthy vs faulty bearing data predicts failure.",
    realWorldUse: "Siemens MindSphere, PTC ThingWorx, and GE Predix are multi-billion dollar platforms doing this. Indian manufacturing loses ₹70,000 crore annually to unplanned downtime. This is an urgent problem.",
    examinerExpects: [
      "Show FFT frequency spectrum comparing healthy vs faulty bearing vibration.",
      "Demonstrate real-time anomaly score calculation streaming from the sensor.",
      "Present the predictive maintenance dashboard with remaining useful life estimate.",
      "Show confusion matrix and F1 score for fault classification accuracy."
    ],
    freeVivaQuestions: [
      "What is FFT (Fast Fourier Transform) and how does it convert time domain to frequency domain?",
      "What frequency signatures indicate ball bearing defects in rotating machinery?",
      "Why is edge inference on ESP32 better than cloud inference for factory environments?"
    ],
    freeStep1Title: "Mount MPU-6050 on DC motor, collect vibration data at 1kHz, and verify FFT using Python scipy",
    datasetName: "Case Western Reserve University Bearing Dataset + PHM Society Challenge 2012 dataset"
  },
  {
    id: "lorawan-smart-agriculture-precision-farming",
    letter: "L",
    title: "LoRaWAN-Based Precision Agriculture System",
    category: "IoT",
    difficulty: 4,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Long-range IoT network for 5km farm monitoring of soil, weather, and crop health.",
    whatItDoes: "Soil moisture, temperature, NPK, and rainfall sensors communicate over LoRaWAN (2-15km range, battery for 10 years) to a gateway. AI recommends irrigation schedules and fertilizer application.",
    realWorldUse: "Jiva.ai, SatSure, and AgNext raised Series A funding for similar systems. India's PM-KISAN portal integrates precision agriculture data. This is the highest-impact IoT project category.",
    examinerExpects: [
      "Show live sensor data transmitted over LoRaWAN appearing on The Things Network console.",
      "Demonstrate AI irrigation recommendation based on soil moisture and weather forecast.",
      "Show battery life calculation proving 1-year operation on 2 AA batteries.",
      "Present satellite NDVI correlation with ground-truth sensor readings."
    ],
    freeVivaQuestions: [
      "What is LoRaWAN and how does it differ from WiFi and GSM for IoT connectivity?",
      "What is the spreading factor in LoRa and how does it trade range for bandwidth?",
      "How do you handle the EU 1% duty cycle limitation in LoRaWAN transmissions?"
    ],
    freeStep1Title: "Set up The Things Network (TTN) account, configure LoRaWAN gateway, and register end device",
    datasetName: "USDA SSURGO soil database + ISRO SAC satellite farm monitoring dataset"
  },
  // ─── NLP ADVANCED ────────────────────────────────────────────────────────
  {
    id: "legal-document-ai-summarizer-ner",
    letter: "L",
    title: "Legal Document AI Summarizer with NER",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Upload any Indian court judgment or contract and get a structured AI summary with key entities.",
    whatItDoes: "Uses Legal-BERT or InLegalBERT to summarize Indian court judgments, extract case parties, sections cited, and verdict. A contract analyzer highlights risky clauses using zero-shot classification.",
    realWorldUse: "India has 47 million pending court cases. SpotDraft, Kira Systems, and Diligen are commercial legal AI platforms. Indian LegalTech startups are a growing segment.",
    examinerExpects: [
      "Upload a Supreme Court judgment PDF and show structured summary within 30 seconds.",
      "Demonstrate NER extracting petitioner, respondent, sections cited, and date.",
      "Show contract risk flagging for non-standard indemnity clauses.",
      "Compare accuracy of InLegalBERT vs general BERT on legal text summarization."
    ],
    freeVivaQuestions: [
      "Why does general BERT underperform on legal text compared to domain-specific legal BERT?",
      "What is zero-shot classification and how does it classify contract clauses without labeled examples?",
      "How do you evaluate summarization quality — what metrics beyond ROUGE are useful for legal text?"
    ],
    freeStep1Title: "Download InLegalBERT from HuggingFace and test on Indian Supreme Court judgment text",
    datasetName: "Indian Legal Documents Corpus (ILI dataset) + Indian Kanoon judgment corpus"
  },
  {
    id: "multilingual-nlp-code-switch-hinglish",
    letter: "M",
    title: "Multilingual NLP: Code-Switching Hinglish Sentiment Analysis",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Sentiment analysis for social media text that mixes Hindi and English (Hinglish).",
    whatItDoes: "Fine-tunes mBERT or XLM-RoBERTa on Hinglish tweets mixing Devanagari, Roman Hindi, and English. Classifies sentiment and performs aspect-based sentiment for product reviews.",
    realWorldUse: "90% of Indian social media content is Hinglish. Brands like Flipkart, Swiggy, and Zomato need Hinglish sentiment analysis for customer feedback. This is an active research area at IITs.",
    examinerExpects: [
      "Show the tokenizer handling mixed script Hinglish text correctly.",
      "Demonstrate aspect-based sentiment on a Zomato review mixing Hindi and English.",
      "Compare mBERT vs MuRIL (Google's multilingual Indian model) on benchmark.",
      "Show the confusion matrix for positive/negative/neutral classification."
    ],
    freeVivaQuestions: [
      "What is code-switching and why is it difficult for standard NLP models?",
      "How does subword tokenization in mBERT handle Devanagari script?",
      "What is MuRIL and why is it better than mBERT for Indian language NLP?"
    ],
    freeStep1Title: "Download SentiRaama Hinglish sentiment dataset and configure HuggingFace mBERT tokenizer",
    datasetName: "SentiRaama Hinglish Dataset + IIIT Hyderabad Hindi-English code-mixed corpus"
  },
  {
    id: "ai-fake-news-detection-multilabel",
    letter: "A",
    title: "AI Fake News Detection with Multi-Label Classification",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Detect misinformation across political, health, and financial domains using a unified model.",
    whatItDoes: "Fine-tunes RoBERTa on a multi-label fake news dataset that classifies articles as: Satire, Hoax, Propaganda, Clickbait, or Reliable. Includes source credibility scoring and claim verification.",
    realWorldUse: "India is the world's #1 source of WhatsApp misinformation. Alt News, Boom, and Factly are manual fact-checking organizations overwhelmed with volume. Automated detection is critically needed.",
    examinerExpects: [
      "Input a WhatsApp-style health misinformation message and show multi-label output.",
      "Demonstrate source credibility scoring from domain reputation database.",
      "Show the claim extraction pipeline separating verifiable claims from opinion.",
      "Present precision-recall curves for each fake news category."
    ],
    freeVivaQuestions: [
      "What is the difference between satire detection and misinformation detection?",
      "How does your model handle adversarial inputs designed to evade detection?",
      "What is the ethical responsibility of a platform that auto-flags fake news?"
    ],
    freeStep1Title: "Download FakeNewsNet dataset and configure multi-label classification head on RoBERTa",
    datasetName: "FakeNewsNet dataset + LIAR benchmark + India-specific misinformation dataset (IFND)"
  },
  {
    id: "gpt4-powered-sql-natural-language-interface",
    letter: "G",
    title: "GPT-4 Powered Natural Language to SQL Query System",
    category: "NLP",
    difficulty: 3,
    buildTimeDays: "2–4 days",
    trending: true,
    tagline: "Ask your database questions in plain English — AI writes the SQL query automatically.",
    whatItDoes: "A web interface where business users type questions like 'Show me top 10 customers by revenue in Maharashtra last quarter' and the system generates and executes the correct SQL query using GPT-4.",
    realWorldUse: "ThoughtSpot raised $800M for a similar product. Tableau Pulse and Power BI Copilot now include this feature. Every enterprise with a data team needs natural language analytics.",
    examinerExpects: [
      "Show 5 different natural language queries successfully converting to correct SQL.",
      "Demonstrate error handling when the query is ambiguous or references non-existent columns.",
      "Show schema-aware prompting — the model knows your table structure.",
      "Present query optimization: the generated SQL uses indexes efficiently."
    ],
    freeVivaQuestions: [
      "What is few-shot prompting and how does it help GPT-4 generate accurate SQL?",
      "How do you prevent SQL injection in user-generated natural language inputs?",
      "What is chain-of-thought prompting and when is it needed for complex queries?"
    ],
    freeStep1Title: "Set up PostgreSQL database with sample ecommerce schema and integrate OpenAI API with schema context",
    datasetName: "Spider NL-to-SQL benchmark dataset + WikiSQL dataset"
  },
  {
    id: "voice-cloning-real-time-tts-xtts",
    letter: "V",
    title: "Voice Cloning and Real-Time TTS using XTTS-v2",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "Clone any voice with 6 seconds of audio and generate natural speech in that voice.",
    whatItDoes: "Uses Coqui XTTS-v2 (open source, runs locally) to clone a speaker's voice from a short sample and synthesize new speech in that voice. Supports 17 languages including Hindi.",
    realWorldUse: "ElevenLabs raised $80M for voice cloning. Murf.ai and Resemble.ai are commercial platforms. Voice-overs, dubbing, accessibility tools, and personalized assistants all need this technology.",
    examinerExpects: [
      "Play 6-second reference audio, then play cloned voice reading new text.",
      "Demonstrate Hindi language support — clone voice and synthesize Hindi text.",
      "Show real-time streaming synthesis completing first chunk in <500ms.",
      "Present MOS (Mean Opinion Score) evaluation methodology."
    ],
    freeVivaQuestions: [
      "What is zero-shot voice cloning and how does XTTS achieve it without per-speaker fine-tuning?",
      "How do you detect AI-generated voice to prevent fraud and deepfake audio?",
      "What ethical safeguards would you implement before deploying this commercially?"
    ],
    freeStep1Title: "Install Coqui TTS library, download XTTS-v2 model, and run reference audio synthesis test",
    datasetName: "LibriSpeech clean-100 dataset + VoxCeleb speaker verification dataset"
  },
  // ─── FULLSTACK ADVANCED ───────────────────────────────────────────────────
  {
    id: "realtime-collaborative-code-editor-crdt",
    letter: "R",
    title: "Real-Time Collaborative Code Editor with CRDT",
    category: "FullStack",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Build a Google Docs for code using Conflict-free Replicated Data Types for sync.",
    whatItDoes: "Multiple users edit code simultaneously. CRDT (Y.js) ensures no conflicts even with network partitions. Monaco Editor (same as VS Code) powers the editing experience with syntax highlighting.",
    realWorldUse: "Replit, CodeSandbox, and GitHub Codespaces all use similar technology. Collaborative coding is standard in remote-first engineering teams. This is technically impressive for any examiner.",
    examinerExpects: [
      "Show 2 browser tabs editing same file simultaneously with no conflicts.",
      "Demonstrate cursor presence — each user sees other users' cursors in real time.",
      "Show network partition handling: edits during offline sync correctly on reconnect.",
      "Explain Y.js CRDT algorithm and why it beats OT (Operational Transform)."
    ],
    freeVivaQuestions: [
      "What is a CRDT and how does it differ from Operational Transform for conflict resolution?",
      "Why does Y.js use a list-based CRDT instead of tree-based for code editing?",
      "How do you handle awareness (cursor positions) when it doesn't need CRDT consistency?"
    ],
    freeStep1Title: "Set up Y.js with WebSocket provider and integrate Monaco Editor in Next.js application",
    datasetName: "Y.js CRDT library documentation + Monaco Editor API reference"
  },
  {
    id: "micro-saas-ai-resume-tailoring-tool",
    letter: "M",
    title: "Micro-SaaS: AI Resume Tailoring for Each Job Application",
    category: "FullStack",
    difficulty: 3,
    buildTimeDays: "3–4 days",
    trending: true,
    tagline: "Paste a job description, upload your resume — AI rewrites it to maximize ATS score.",
    whatItDoes: "Uses GPT-4o to analyze job description keywords, compare with resume content, and generate a tailored version optimized for ATS (Applicant Tracking Systems). Includes ATS score simulation.",
    realWorldUse: "Teal, Rezi, and Kickresume are multi-million dollar startups doing this. 98% of Fortune 500 companies use ATS that filter resumes before human review. This problem affects every job seeker.",
    examinerExpects: [
      "Upload a generic software engineer resume and paste a specific JD — show tailored output.",
      "Demonstrate ATS keyword match score improvement from 45% to 85%.",
      "Show the diff between original and tailored resume highlighting changes.",
      "Present the skill gap analysis identifying missing keywords the candidate could add."
    ],
    freeVivaQuestions: [
      "What is an ATS and how does it parse and score resumes automatically?",
      "How do you prevent the AI from adding skills the candidate doesn't actually have?",
      "What is prompt injection and how could it be abused in your resume parsing system?"
    ],
    freeStep1Title: "Set up Next.js with PDF parsing using pdf-parse library and integrate OpenAI structured output API",
    datasetName: "Resume and JD matching dataset from Kaggle + ATS keyword frequency database"
  },
  {
    id: "ai-powered-ecommerce-search-elasticsearch",
    letter: "A",
    title: "AI-Powered E-commerce Search with Semantic Understanding",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "Search engine that understands 'red kurta under 500 for wedding' using vector embeddings.",
    whatItDoes: "Combines Elasticsearch BM25 keyword search with sentence-transformers vector search (hybrid search). Understands intent queries, typos, synonyms, and product attribute filters.",
    realWorldUse: "Myntra, Amazon India, and Meesho all use hybrid vector search. Typesense, Algolia, and Vespa are commercial search platforms. This is the most viewed engineering interview topic at e-commerce companies.",
    examinerExpects: [
      "Show query 'summer cotton dress' returning relevant results even without exact keyword match.",
      "Demonstrate typo tolerance: 'saree' vs 'sari' vs 'saari' all returning same products.",
      "Show faceted filtering combining semantic results with price/color filters.",
      "Present latency: hybrid search completing in <100ms on 100,000 product catalog."
    ],
    freeVivaQuestions: [
      "What is BM25 and how does it differ from TF-IDF for keyword ranking?",
      "What is the difference between lexical search and semantic/vector search?",
      "How do you handle the cold-start problem for new products with no click history?"
    ],
    freeStep1Title: "Set up Elasticsearch 8.x with ELSER sparse vector model and index sample product catalog",
    datasetName: "Amazon product reviews dataset + Flipkart product catalog sample (Kaggle)"
  },
  {
    id: "nextjs-multi-tenant-saas-boilerplate",
    letter: "N",
    title: "Multi-Tenant SaaS Architecture with Next.js",
    category: "FullStack",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Build the infrastructure pattern behind every B2B SaaS product — one app, many customers.",
    whatItDoes: "Each customer (tenant) gets an isolated data environment but shares the same codebase. Custom domains, per-tenant branding, role-based access control, and billing isolation are implemented.",
    realWorldUse: "Salesforce, Hubspot, Freshdesk, and every Indian SaaS company (Zoho, Leadsquared, Chargebee) run on multi-tenant architecture. This is mandatory knowledge for any SaaS engineer.",
    examinerExpects: [
      "Show tenant A and tenant B having completely isolated data even with same database.",
      "Demonstrate custom domain routing: tenant-a.yourapp.com and tenant-b.yourapp.com.",
      "Show per-tenant feature flags enabling/disabling premium features.",
      "Present database strategy choice: row-level security vs schema-per-tenant vs database-per-tenant."
    ],
    freeVivaQuestions: [
      "What is row-level security in PostgreSQL and how does it enforce tenant isolation?",
      "What are the trade-offs between shared database vs schema-per-tenant vs database-per-tenant?",
      "How do you prevent a noisy tenant from degrading performance for other tenants?"
    ],
    freeStep1Title: "Set up Next.js middleware for subdomain routing and configure Supabase row-level security policies",
    datasetName: "Stripe API test environment + Supabase multi-tenant RLS documentation"
  },
  {
    id: "real-time-stock-trading-dashboard-websocket",
    letter: "R",
    title: "Real-Time Stock Trading Dashboard with WebSocket",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Live NSE/BSE stock price dashboard with portfolio tracking and AI price alerts.",
    whatItDoes: "WebSocket connections to NSE live data feed display real-time OHLCV candlestick charts. Portfolio management, AI-powered price alert system, and technical indicator overlays (RSI, MACD, Bollinger Bands).",
    realWorldUse: "Zerodha Kite, Upstox, and Angel One all use WebSocket streaming. SEBI requires brokers to provide real-time feeds. This is the highest-traffic application pattern in Indian fintech.",
    examinerExpects: [
      "Show candlestick chart updating in real time with bid/ask spread.",
      "Demonstrate RSI indicator crossing 70 triggering an overbought alert.",
      "Show portfolio P&L updating live as prices change.",
      "Present WebSocket reconnection handling for network interruptions."
    ],
    freeVivaQuestions: [
      "What is the difference between polling, long-polling, Server-Sent Events, and WebSocket?",
      "How do you calculate RSI (Relative Strength Index) from OHLCV data?",
      "How does your system handle a 1000-user concurrent WebSocket connection load?"
    ],
    freeStep1Title: "Set up Next.js with Socket.io server and integrate NSEpy / Yahoo Finance WebSocket for live data",
    datasetName: "NSE historical data API + Yahoo Finance live quotes + QuantLib technical indicator library"
  },
  // ─── DATA SCIENCE ─────────────────────────────────────────────────────────
  {
    id: "climate-change-temperature-prediction-lstm",
    letter: "C",
    title: "Climate Change Temperature Anomaly Prediction using LSTM",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Predict global temperature anomalies 5 years ahead using 140 years of NASA climate data.",
    whatItDoes: "Trains a stacked LSTM on NASA GISS Surface Temperature Analysis dataset (1880–2025). Generates forecasts with uncertainty intervals and visualizes regional temperature anomaly maps.",
    realWorldUse: "IPCC reports and NASA climate modeling use ML alongside physical models. Google DeepMind's GraphCast outperformed traditional weather models in 2023. This is frontier research.",
    examinerExpects: [
      "Show LSTM training loss convergence on the 1880–2024 training set.",
      "Present 5-year ahead temperature forecast with 95% confidence interval.",
      "Compare LSTM vs SARIMA (statistical baseline) on validation set.",
      "Show regional heatmap of predicted temperature anomalies by 2030."
    ],
    freeVivaQuestions: [
      "What is the difference between weather prediction and climate prediction?",
      "How do you handle the non-stationarity of climate time series in your model?",
      "What is the el Niño effect and can your model capture it from historical data?"
    ],
    freeStep1Title: "Download NASA GISS temperature dataset and implement sliding window LSTM data pipeline",
    datasetName: "NASA GISS Surface Temperature Analysis (GISTEMP) 1880–2025 + NOAA climate normals"
  },
  {
    id: "fraud-detection-graph-neural-network",
    letter: "F",
    title: "Financial Fraud Detection using Graph Neural Networks",
    category: "DataScience",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Model transaction networks as graphs — GNN detects fraud rings invisible to traditional ML.",
    whatItDoes: "Builds a transaction graph where nodes are accounts and edges are transactions. GraphSAGE or GCN learns structural patterns that identify fraud rings, money mule networks, and circular transaction fraud.",
    realWorldUse: "PayPal uses GNNs for fraud detection. Amazon uses graph ML for fake review detection. UPI fraud in India reached ₹2048 crore in 2023. GNNs are the frontier technique for networked fraud.",
    examinerExpects: [
      "Visualize the transaction graph with fraudulent nodes highlighted in red.",
      "Show GNN outperforming XGBoost on fraud detection F1 score.",
      "Explain how message passing propagates fraud signals across connected accounts.",
      "Demonstrate the model identifying a fraud ring even when individual transactions look legitimate."
    ],
    freeVivaQuestions: [
      "What is a graph neural network and how is it different from a regular neural network?",
      "Explain the message passing mechanism in GraphSAGE — how does a node learn from neighbors?",
      "Why is class imbalance especially challenging for fraud detection and how do you address it?"
    ],
    freeStep1Title: "Install PyTorch Geometric and build transaction graph from Kaggle credit card fraud dataset",
    datasetName: "IEEE-CIS Fraud Detection dataset + Elliptic Bitcoin transaction fraud dataset"
  },
  {
    id: "recommendation-engine-matrix-factorization-als",
    letter: "R",
    title: "Scalable Movie Recommendation Engine with Matrix Factorization",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Build Netflix-grade collaborative filtering recommendation using ALS on Apache Spark.",
    whatItDoes: "Implements Alternating Least Squares (ALS) matrix factorization on Apache Spark MLlib using MovieLens 20M dataset. Generates personalized recommendations and evaluates with RMSE and precision@k.",
    realWorldUse: "Netflix saves $1 billion annually through recommendations. Amazon's recommendation engine drives 35% of revenue. This algorithm pattern underlies every major content and e-commerce platform.",
    examinerExpects: [
      "Show training ALS model on MovieLens 20M dataset on Spark local cluster.",
      "Generate top-10 movie recommendations for a new user based on initial ratings.",
      "Present cold start solution for users with no rating history.",
      "Compare ALS vs SVD vs NCF (Neural Collaborative Filtering) accuracy."
    ],
    freeVivaQuestions: [
      "What is the cold start problem in recommendation systems and how do you address it?",
      "Why does ALS scale better than SGD for matrix factorization in distributed systems?",
      "What is the difference between collaborative filtering and content-based filtering?"
    ],
    freeStep1Title: "Set up Apache Spark locally, download MovieLens 20M dataset, and configure Spark session",
    datasetName: "MovieLens 20M dataset + Netflix Prize dataset sample"
  },
  {
    id: "causal-inference-ab-test-bayesian",
    letter: "C",
    title: "Causal Inference and Bayesian A/B Testing Framework",
    category: "DataScience",
    difficulty: 5,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Go beyond correlation — build a statistically rigorous experiment framework for product decisions.",
    whatItDoes: "Implements Bayesian A/B testing that gives probability of winning instead of p-values. Includes sample size calculator, sequential testing (no peeking problem), and uplift modeling.",
    realWorldUse: "Netflix, Booking.com, and Airbnb run 1000+ A/B tests simultaneously. India's Zomato, Swiggy, and Flipkart have dedicated experimentation platforms. This is a mandatory skill for data scientists.",
    examinerExpects: [
      "Show Bayesian posterior distribution updating as new experiment observations arrive.",
      "Demonstrate sequential testing stopping an experiment early when result is clear.",
      "Present uplift model identifying which user segments respond best to treatment.",
      "Compare Bayesian vs Frequentist approach — when does Bayesian give different conclusions?"
    ],
    freeVivaQuestions: [
      "What is the peeking problem in frequentist A/B testing and how does Bayesian testing solve it?",
      "What is statistical power and why is sample size calculation critical before launching a test?",
      "What is uplift modeling and how is it different from response modeling?"
    ],
    freeStep1Title: "Set up PyMC for Bayesian inference and implement Beta-Binomial conjugate model for CTR testing",
    datasetName: "Criteo uplift modeling dataset + synthetic A/B test simulation dataset"
  },
  // ─── MOBILE ──────────────────────────────────────────────────────────────
  {
    id: "ar-indoor-navigation-react-native",
    letter: "A",
    title: "AR Indoor Navigation App with React Native",
    category: "Mobile",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Navigate inside malls, airports, and hospitals using AR path arrows overlaid on camera view.",
    whatItDoes: "Uses ARKit (iOS) / ARCore (Android) via Expo Camera and react-native-arkit to render navigational arrows in 3D space. Indoor positioning uses BLE beacons or WiFi fingerprinting.",
    realWorldUse: "Dubai Mall, Schiphol Airport, and Apollo Hospital have indoor navigation apps. Google Maps Indoor is limited. This is one of the most visually impressive mobile projects possible.",
    examinerExpects: [
      "Show AR arrow overlay directing to a destination in a mapped indoor space.",
      "Demonstrate BLE beacon triangulation updating position every 2 seconds.",
      "Show fallback to WiFi fingerprinting when BLE is unavailable.",
      "Present the indoor map editor used to define navigable paths."
    ],
    freeVivaQuestions: [
      "Why does GPS fail indoors and what alternative positioning technologies exist?",
      "What is IMU dead reckoning and how does your app combine it with BLE beacons?",
      "How do you handle the magnetic interference that affects BLE RSSI in buildings?"
    ],
    freeStep1Title: "Set up Expo with react-native-arkit, map test room with BLE beacon positions, and verify AR overlay",
    datasetName: "UJIIndoorLoc WiFi fingerprinting dataset + OpenStreetMap indoor extension (IndoorGML)"
  },
  {
    id: "offline-first-pwa-rural-health-worker",
    letter: "O",
    title: "Offline-First PWA for Rural Health Workers",
    category: "Mobile",
    difficulty: 4,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "Health survey app that works without internet and syncs when connectivity returns.",
    whatItDoes: "ASHA workers fill patient forms offline in remote villages. IndexedDB stores data locally. Background Sync API queues uploads. Conflict resolution merges data when server reconnects.",
    realWorldUse: "WHO, UNICEF, and India's NHM use offline data collection tools. OpenSRP and CommCare are deployed in 70+ countries. Digital health data collection in remote areas is a critical global challenge.",
    examinerExpects: [
      "Demonstrate form submission working with WiFi turned off.",
      "Show data syncing to server when internet reconnects (background sync).",
      "Present conflict resolution when the same record is edited offline on 2 devices.",
      "Show progressive web app installability on Android home screen."
    ],
    freeVivaQuestions: [
      "What is a Service Worker and how does it enable offline functionality?",
      "How does IndexedDB differ from localStorage for offline data storage?",
      "What is a CRDTs approach to offline conflict resolution?"
    ],
    freeStep1Title: "Create Next.js PWA with next-pwa, configure service worker caching strategy, and set up IndexedDB with Dexie.js",
    datasetName: "OpenSRP mobile data collection schema + WHO DHIS2 health indicator definitions"
  },
  {
    id: "flutter-fintech-upi-analytics-app",
    letter: "F",
    title: "Flutter FinTech: UPI Transaction Analytics Personal Finance App",
    category: "Mobile",
    difficulty: 3,
    buildTimeDays: "3–4 days",
    trending: true,
    tagline: "Parse UPI SMS alerts to automatically categorize spending and build personal finance dashboards.",
    whatItDoes: "Reads UPI transaction SMS messages (with permission), classifies merchants using ML, categorizes spending, detects recurring subscriptions, and provides savings recommendations.",
    realWorldUse: "CRED, Walnut, and MoneyView do exactly this. India processes 14 billion UPI transactions monthly. Personal financial management is one of the top app categories in India.",
    examinerExpects: [
      "Show SMS parsing extracting amount, merchant, and transaction type correctly.",
      "Demonstrate ML merchant categorization (food/travel/bills) on 20 sample transactions.",
      "Show spending trend charts with category breakdown for last 3 months.",
      "Present recurring subscription detection identifying Netflix, Spotify, gym memberships."
    ],
    freeVivaQuestions: [
      "How do you parse diverse UPI SMS formats from HDFC, SBI, ICICI, and Paytm banks?",
      "What privacy risks arise from SMS access and how does your app handle data securely?",
      "How do you classify merchant categories without a labeled training dataset for every UPI merchant?"
    ],
    freeStep1Title: "Set up Flutter with SMS permissions, implement regex parser for top 10 Indian bank UPI SMS formats",
    datasetName: "Synthetic UPI transaction SMS dataset + Merchant Category Code (MCC) classification table"
  },
  // ─── FINTECH ─────────────────────────────────────────────────────────────
  {
    id: "bnpl-risk-scoring-engine-ml",
    letter: "B",
    title: "BNPL Risk Scoring Engine with Explainable ML",
    category: "Fintech",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Build the credit risk model powering Buy Now Pay Later lending decisions for thin-file customers.",
    whatItDoes: "Trains XGBoost on alternative credit data (e-commerce purchase history, mobile recharge patterns, app usage) to score creditworthiness of customers with no CIBIL history. SHAP explains decisions.",
    realWorldUse: "ZestMoney, LazyPay, and Simpl power ₹50,000 crore in BNPL transactions. RBI's Account Aggregator framework enables this data sharing legally. This is the hottest segment in Indian fintech.",
    examinerExpects: [
      "Show model training on alternative data features — no CIBIL required.",
      "Present SHAP waterfall chart explaining why a specific applicant was rejected.",
      "Demonstrate model fairness analysis across gender and income groups.",
      "Show scorecard validation: Gini coefficient and KS statistic on holdout data."
    ],
    freeVivaQuestions: [
      "What is a Gini coefficient in credit scoring and what value indicates a good model?",
      "How does SHAP (SHapley Additive exPlanations) differ from LIME for model explainability?",
      "What is the Account Aggregator framework and how does it legally enable alternative data sharing?"
    ],
    freeStep1Title: "Download Home Credit Default Risk dataset from Kaggle and perform feature engineering on alternative features",
    datasetName: "Home Credit Default Risk dataset (300K customers) + FICO open dataset"
  },
  {
    id: "algorithmic-trading-momentum-backtester",
    letter: "A",
    title: "Algorithmic Trading Momentum Strategy Backtester",
    category: "Fintech",
    difficulty: 4,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "Build, backtest, and optimize an Indian equity momentum trading strategy on NSE data.",
    whatItDoes: "Implements a dual-momentum strategy on NSE/BSE historical data using Backtrader/Zipline. Backtests against a buy-and-hold benchmark. Optimizes parameters using walk-forward optimization.",
    realWorldUse: "Smallcase, Windmill Capital, and Quantace run algorithmic strategies for Indian retail investors. SEBI's algo-trading regulations have created a new segment of quant funds.",
    examinerExpects: [
      "Show backtest results: CAGR, Sharpe ratio, max drawdown for strategy vs Nifty50.",
      "Demonstrate walk-forward optimization preventing overfitting to historical data.",
      "Show Monte Carlo simulation of return distribution.",
      "Present transaction cost analysis — does the strategy remain profitable after brokerage?"
    ],
    freeVivaQuestions: [
      "What is the Sharpe ratio and what value indicates an attractive risk-adjusted return?",
      "What is overfitting in backtesting and how does walk-forward optimization prevent it?",
      "What is look-ahead bias and how does it invalidate most retail trading strategies?"
    ],
    freeStep1Title: "Install Backtrader, download NSE historical OHLCV data via NSEpy, and run first strategy backtest",
    datasetName: "NSE historical daily OHLCV data 2010–2025 + Quandl India equity dataset"
  },
  // ─── HEALTHTECH ──────────────────────────────────────────────────────────
  {
    id: "wearable-ecg-ml-arrhythmia-detection",
    letter: "W",
    title: "Wearable ECG Arrhythmia Detection with 1D CNN",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "Classify cardiac arrhythmias from single-lead ECG waveforms using deep learning.",
    whatItDoes: "Trains a 1D Convolutional Neural Network on the MIT-BIH arrhythmia database to classify 5 types of heartbeat irregularities including atrial fibrillation, PVC, and normal sinus rhythm.",
    realWorldUse: "Apple Watch ECG, AliveCor KardiaMobile, and Withings ScanWatch all use 1D CNN classification. India has 8 million new cardiac patients per year. Early arrhythmia detection saves lives.",
    examinerExpects: [
      "Show ECG waveform visualization with beat classification overlaid.",
      "Present confusion matrix across 5 arrhythmia classes with 95%+ accuracy.",
      "Demonstrate real-time classification from ESP32 + AD8232 ECG module (if hardware available).",
      "Show class activation mapping highlighting the P, QRS, T wave segments."
    ],
    freeVivaQuestions: [
      "What are the clinical definitions of atrial fibrillation and PVC arrhythmia?",
      "Why is a 1D CNN more appropriate than 2D CNN for ECG signal classification?",
      "How do you handle class imbalance when normal beats far outnumber arrhythmias?"
    ],
    freeStep1Title: "Download MIT-BIH Arrhythmia Database using WFDB library and segment heartbeats into fixed-length windows",
    datasetName: "MIT-BIH Arrhythmia Database (48 ECG recordings) + PhysioNet 2017 AF Classification dataset"
  },
  {
    id: "ai-mental-health-chatbot-cbt-techniques",
    letter: "A",
    title: "AI Mental Health Support Chatbot Using CBT Techniques",
    category: "NLP",
    difficulty: 3,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Empathetic conversational agent using Cognitive Behavioral Therapy techniques for stress and anxiety.",
    whatItDoes: "Fine-tunes a LLM with CBT (Cognitive Behavioral Therapy) conversation examples to provide evidence-based mental health support, mood tracking, thought journal prompts, and crisis detection.",
    realWorldUse: "Woebot (CBT chatbot) has 5 million users and raised $90M. Wysa (Indian startup) raised $20M. India's mental health gap: 150 million people need care, only 10,000 psychiatrists exist.",
    examinerExpects: [
      "Show a conversation where the chatbot identifies cognitive distortions in user's thinking.",
      "Demonstrate crisis detection routing user to emergency contacts.",
      "Show mood tracking over 7 days with trend visualization.",
      "Present safety guardrails preventing harmful or medical advice."
    ],
    freeVivaQuestions: [
      "What is Cognitive Behavioral Therapy and what are the core CBT techniques?",
      "What are the ethical boundaries of an AI mental health chatbot?",
      "How do you detect when a user is in crisis and what is the appropriate response?"
    ],
    freeStep1Title: "Collect CBT dialogue examples and fine-tune Mistral-7B or Llama-3 using LoRA on mental health dataset",
    datasetName: "Counsel Chat mental health conversation dataset + Reddit mental health thread corpus"
  },
  {
    id: "drug-drug-interaction-predictor-gnn",
    letter: "D",
    title: "Drug-Drug Interaction Predictor using GNN",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Predict dangerous drug combinations using molecular graph neural networks.",
    whatItDoes: "Represents drug molecules as graphs (atoms = nodes, bonds = edges). A GNN learns molecular representations and predicts interaction severity when two drugs are taken together.",
    realWorldUse: "India's polypharmacy problem: elderly patients take 8+ medications daily. DrugBank, FDA Adverse Event Reporting, and Pfizer use ML for DDI prediction. This is frontier pharmaceutical AI.",
    examinerExpects: [
      "Show molecular graph visualization for aspirin and warfarin.",
      "Demonstrate DDI severity prediction for known dangerous combinations.",
      "Present ROC-AUC on DrugBank test set.",
      "Show SMILES to graph conversion pipeline."
    ],
    freeVivaQuestions: [
      "What is a SMILES string and how does it encode molecular structure as text?",
      "Why is a GNN better than a fingerprint-based ML approach for molecular property prediction?",
      "What is polypharmacy and why is drug-drug interaction a growing clinical concern?"
    ],
    freeStep1Title: "Install RDKit and PyTorch Geometric, convert DrugBank SMILES to molecular graphs, and train initial GNN",
    datasetName: "DrugBank DDI dataset + TWOSIDES polypharmacy side effects dataset"
  },
  // ─── AGRITECH & SUSTAINABILITY ────────────────────────────────────────────
  {
    id: "carbon-footprint-tracker-supply-chain",
    letter: "C",
    title: "Carbon Footprint Tracker for Supply Chain",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "Calculate Scope 1, 2, and 3 emissions for a manufacturing company's supply chain.",
    whatItDoes: "Integrates with ERP purchase data to calculate carbon emissions at each supply chain node using emission factor databases (IPCC, EPA). Generates BRSR (Business Responsibility Reporting) compliant reports.",
    realWorldUse: "SEBI mandated BRSR sustainability reporting for top 1000 BSE companies. India's National Action Plan on Climate Change requires carbon tracking. This is mandatory compliance for large corporations.",
    examinerExpects: [
      "Show emission calculation for a sample supply chain with 5 supplier tiers.",
      "Demonstrate hotspot analysis identifying the highest-emission supplier.",
      "Generate a BRSR-compliant PDF report with Scope 1/2/3 breakdown.",
      "Show target-setting tool for achieving net-zero by 2030."
    ],
    freeVivaQuestions: [
      "What is the difference between Scope 1, Scope 2, and Scope 3 emissions?",
      "What is an emission factor and how is it determined for electricity consumption?",
      "Why is Scope 3 supply chain emission calculation the most complex and uncertain?"
    ],
    freeStep1Title: "Download IPCC emission factor database and build emission calculation engine in Python",
    datasetName: "IPCC AR6 emission factors database + EPA GHG emission factors hub + SEBI BRSR format"
  },
  {
    id: "smart-grid-demand-response-rl",
    letter: "S",
    title: "Smart Grid Demand Response using Reinforcement Learning",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "RL agent manages home energy devices to reduce electricity bills and grid peak load.",
    whatItDoes: "A PPO (Proximal Policy Optimization) agent learns to schedule EV charging, HVAC, and washing machines based on dynamic electricity prices, user preferences, and grid signal — minimizing cost.",
    realWorldUse: "India's time-of-use tariff expansion under DISCOM reforms creates demand response opportunities. Siemens, ABB, and Schneider Electric deploy demand response systems worth billions.",
    examinerExpects: [
      "Show RL agent training curve with reward (cost savings) increasing over episodes.",
      "Demonstrate that the agent defers EV charging to off-peak hours automatically.",
      "Present bill savings comparison: RL agent vs no optimization vs rule-based scheduling.",
      "Show the state space design including grid price, device status, and user comfort."
    ],
    freeVivaQuestions: [
      "What is Proximal Policy Optimization (PPO) and why is it preferred over DDPG for this problem?",
      "How do you encode user comfort constraints into the reward function?",
      "What is the curse of dimensionality in RL state spaces for multi-device home energy management?"
    ],
    freeStep1Title: "Install OpenAI Gym and implement custom HomeEnergyEnv with device state and tariff observation space",
    datasetName: "REFIT home energy dataset + UK Power Networks dynamic tariff historical data"
  },
  // ─── GOVTECH / LEGALTECH ──────────────────────────────────────────────────
  {
    id: "aadhaar-api-digital-kyc-platform",
    letter: "A",
    title: "Aadhaar-Based Digital KYC Platform",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Paperless customer onboarding using UIDAI APIs, eSign, and video KYC for RBI compliance.",
    whatItDoes: "Implements RBI's V-CIP (Video Customer Identification Process) guidelines. Customers complete KYC via Aadhaar OTP consent, live video with AI liveness detection, and eSign on documents.",
    realWorldUse: "Every Indian bank, NBFC, mutual fund, and insurance company is mandated to offer digital KYC under PMLA rules. This is a ₹3,000 crore TAM in India alone.",
    examinerExpects: [
      "Show complete KYC flow: Aadhaar OTP → video selfie → liveness check → document upload → eSign.",
      "Demonstrate AI liveness detection rejecting a photo of a photo.",
      "Show audit trail with timestamped steps meeting UIDAI compliance.",
      "Present data encryption and storage meeting PDPB 2023 standards."
    ],
    freeVivaQuestions: [
      "What is the difference between Aadhaar OTP eKYC and XML offline eKYC?",
      "What is liveness detection and why is it required for video KYC?",
      "How does your platform comply with UIDAI's data minimization requirements?"
    ],
    freeStep1Title: "Set up UIDAI sandbox environment and implement Aadhaar OTP verification API integration",
    datasetName: "UIDAI Aadhaar developer sandbox + RBI V-CIP guidelines documentation"
  },
  {
    id: "ai-court-judgment-outcome-predictor",
    letter: "A",
    title: "AI Court Judgment Outcome Predictor for Indian Courts",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Predict case outcomes of Indian district courts using case facts and historical judgment patterns.",
    whatItDoes: "Fine-tunes InLegalBERT on Indian district court case records from eCourts portal. Predicts verdict (granted/dismissed), likely duration, and similar precedent cases.",
    realWorldUse: "Indian Kanoon, SpotDraft, and LegalPay are legal AI startups. NALSA (National Legal Services Authority) is interested in AI tools for access to justice in rural courts.",
    examinerExpects: [
      "Input a case petition text and show predicted outcome with confidence score.",
      "Present model accuracy on held-out test set from district court cases.",
      "Show similar precedent case retrieval using semantic similarity.",
      "Discuss the ethical implications of AI prediction in judicial contexts."
    ],
    freeVivaQuestions: [
      "What are the ethical risks of using AI outcome prediction in a legal proceeding?",
      "How does eCourts data quality affect model reliability for rural district courts?",
      "What is precedent retrieval and how does it differ from judgment prediction?"
    ],
    freeStep1Title: "Download eCourts case data using Indian Kanoon API and preprocess into train/test split",
    datasetName: "Indian Kanoon judgment corpus + eCourts open data portal district court records"
  },
  // ─── EDTECH ──────────────────────────────────────────────────────────────
  {
    id: "adaptive-learning-irt-knowledge-tracing",
    letter: "A",
    title: "Adaptive Learning System with Deep Knowledge Tracing",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Personalized exam preparation that knows exactly which topics a student needs to practice next.",
    whatItDoes: "Implements DKT (Deep Knowledge Tracing) — an LSTM model that tracks student knowledge state across concepts. Selects the next question maximizing expected learning gain using IRT parameters.",
    realWorldUse: "Khan Academy's exercise system, Duolingo's learning algorithm, and BYJU's AI tutor all use knowledge tracing. India's K-12 ed-tech is a $10.4 billion market.",
    examinerExpects: [
      "Show knowledge state heatmap updating as student answers questions.",
      "Demonstrate adaptive sequence: weak student gets easier questions first.",
      "Compare DKT vs traditional BKT (Bayesian Knowledge Tracing) accuracy.",
      "Show predicted vs actual student performance on exam questions."
    ],
    freeVivaQuestions: [
      "What is Knowledge Tracing and how does it differ from a traditional quiz recommendation system?",
      "Explain Item Response Theory (IRT) and how it characterizes question difficulty.",
      "How does DKT handle multi-concept questions where multiple skills are tested simultaneously?"
    ],
    freeStep1Title: "Download ASSISTments dataset and implement LSTM-based DKT model in PyTorch",
    datasetName: "ASSISTments Math tutoring dataset (400K student interactions) + EdNet dataset"
  },
  {
    id: "plagiarism-detector-semantic-similarity",
    letter: "P",
    title: "Advanced Plagiarism Detector with Semantic Similarity",
    category: "NLP",
    difficulty: 3,
    buildTimeDays: "2–3 days",
    trending: true,
    tagline: "Detect paraphrased plagiarism that evades keyword-matching tools using sentence embeddings.",
    whatItDoes: "Uses sentence-transformers (SBERT) to compute semantic similarity between submitted documents and a corpus. Detects paraphrase-based plagiarism that TurnItIn and Unicheck miss.",
    realWorldUse: "UGC mandated plagiarism checks for all PhD theses in India using Urkund/iThenticate. These tools miss AI-paraphrased content. Semantic similarity catches what TF-IDF cannot.",
    examinerExpects: [
      "Submit a paraphrased paragraph and show it caught as 85% similar to source.",
      "Show that keyword shuffling does NOT evade detection unlike Turnitin.",
      "Present cosine similarity heatmap comparing thesis chapters to source corpus.",
      "Demonstrate AI-generated content detection as a bonus feature."
    ],
    freeVivaQuestions: [
      "What is the difference between lexical similarity and semantic similarity?",
      "Why does SBERT outperform BERT for sentence similarity computation?",
      "How do you build and query a document similarity index for 1 million papers efficiently?"
    ],
    freeStep1Title: "Install sentence-transformers, download all-MiniLM-L6-v2 model, and build FAISS index from document corpus",
    datasetName: "PAN plagiarism detection corpus + arXiv CS paper corpus for similarity database"
  },
  // ─── ADDITIONAL AI/ML ─────────────────────────────────────────────────────
  {
    id: "3d-object-detection-pointnet-lidar",
    letter: "3",
    title: "3D Object Detection from LiDAR Point Clouds using PointNet",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Detect pedestrians, vehicles, and obstacles from autonomous vehicle LiDAR sensor data.",
    whatItDoes: "Processes 3D point cloud data from LiDAR sensors through PointNet++ architecture. Outputs 3D bounding boxes around detected objects with class labels, essential for autonomous driving.",
    realWorldUse: "Tesla, Waymo, and Ola Electric use LiDAR-based detection. India's NITI Aayog autonomous vehicle policy has created a domestic AV research ecosystem.",
    examinerExpects: [
      "Visualize LiDAR point cloud with 3D bounding boxes using Open3D.",
      "Show mAP (mean Average Precision) at IoU 0.5 on KITTI benchmark.",
      "Explain voxelization and why it makes point cloud processing more tractable.",
      "Demonstrate real-time inference speed on GPU."
    ],
    freeVivaQuestions: [
      "Why is LiDAR preferred over camera for depth perception in autonomous vehicles?",
      "What is the key innovation of PointNet over voxel-based approaches?",
      "How do you define a valid 3D bounding box for IoU calculation in 3D space?"
    ],
    freeStep1Title: "Download KITTI 3D object detection dataset and implement point cloud loading pipeline with Open3D",
    datasetName: "KITTI Vision Benchmark Suite (3D object detection) + nuScenes autonomous driving dataset"
  },
  {
    id: "neural-radiance-field-nerf-scene-reconstruction",
    letter: "N",
    title: "NeRF: Neural Radiance Field Scene Reconstruction",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Reconstruct photorealistic 3D scenes from 2D photos using implicit neural representation.",
    whatItDoes: "Implements the original NeRF paper using tiny-cuda-nn or Nerfstudio. Takes 50–100 photos of an object/scene from different angles and synthesizes novel viewpoints with photorealistic quality.",
    realWorldUse: "Meta's Codec Avatars, Google Immersive View in Maps, and Apple's Object Capture use NeRF-based technology. 3D content creation, virtual try-on, and digital twins all need this.",
    examinerExpects: [
      "Show rendered novel view of a scene not in the training photos.",
      "Present PSNR and SSIM metrics comparing rendered vs ground truth views.",
      "Demonstrate rotation video around a 3D object.",
      "Compare Instant-NGP (fast NeRF) vs original NeRF training time."
    ],
    freeVivaQuestions: [
      "What is volume rendering and how does NeRF use it to generate novel views?",
      "What is positional encoding and why is it critical for NeRF's high-frequency detail?",
      "How does Instant-NGP achieve 100x speedup over the original NeRF?"
    ],
    freeStep1Title: "Install Nerfstudio, capture 50 photos of an object from different angles, and launch training run",
    datasetName: "Nerfstudio built-in example scenes + custom smartphone-captured object photos"
  },
  {
    id: "ai-protein-structure-esm2",
    letter: "A",
    title: "AI Protein Structure Prediction using ESM-2",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Predict protein 3D structure from amino acid sequence using Meta's protein language model.",
    whatItDoes: "Uses Meta's ESM-2 protein language model to predict contact maps and secondary structure from primary amino acid sequences. Visualizes predicted 3D structure and analyzes binding sites.",
    realWorldUse: "AlphaFold2 won the Nobel Prize in Chemistry 2024. DeepMind's protein folding breakthrough is revolutionizing drug discovery. Indian pharma companies (Sun Pharma, Dr. Reddy's) are adopting these tools.",
    examinerExpects: [
      "Input a FASTA protein sequence and show predicted secondary structure.",
      "Visualize the predicted 3D structure using py3Dmol in the browser.",
      "Show contact map prediction and its biological interpretation.",
      "Compare ESM-2 predictions with known crystallography structures from PDB."
    ],
    freeVivaQuestions: [
      "What is the protein folding problem and why did it remain unsolved for 50 years?",
      "How is a protein language model (ESM-2) similar to and different from a text language model?",
      "What is a contact map and how does it constrain the 3D structure prediction?"
    ],
    freeStep1Title: "Install ESM library from Meta, download ESM-2 model weights, and run structure prediction on sample sequence",
    datasetName: "UniProt protein sequence database + Protein Data Bank (PDB) experimentally resolved structures"
  },
  {
    id: "time-series-anomaly-detection-iot-manufacturing",
    letter: "T",
    title: "Time Series Anomaly Detection for Manufacturing Telemetry",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Detect production quality defects 15 minutes before they occur using multivariate anomaly detection.",
    whatItDoes: "Implements MSCRED and USAD autoencoders for multivariate time series anomaly detection on manufacturing sensor telemetry. Builds an explainable alerting system with root cause attribution.",
    realWorldUse: "Siemens, Bosch, and Tata Motors deploy predictive quality systems. India's National Manufacturing Policy targets making manufacturing 25% of GDP — anomaly detection is critical infrastructure.",
    examinerExpects: [
      "Show reconstruction error spiking before an anomalous production event.",
      "Present precision/recall at different anomaly threshold settings.",
      "Demonstrate root cause attribution identifying which sensor triggered the alert.",
      "Show false positive analysis — alert fatigue is a real production problem."
    ],
    freeVivaQuestions: [
      "What is an LSTM autoencoder and how does it detect anomalies via reconstruction error?",
      "How do you set the anomaly threshold in a production system without labeled anomaly data?",
      "What is the difference between point anomaly, contextual anomaly, and collective anomaly?"
    ],
    freeStep1Title: "Download SMD (Server Machine Dataset) or SMAP dataset and implement LSTM autoencoder baseline",
    datasetName: "SMD Server Machine Dataset (28 machines, 38 dimensions) + NASA SMAP telemetry dataset"
  },
  // ─── SPACETECH ────────────────────────────────────────────────────────────
  {
    id: "satellite-image-change-detection-siamese",
    letter: "S",
    title: "Satellite Image Change Detection using Siamese Networks",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Detect deforestation, urban expansion, and flood damage by comparing before/after satellite images.",
    whatItDoes: "A Siamese CNN takes before/after satellite image pairs and outputs a change mask identifying deforestation, construction activity, or disaster damage at pixel level.",
    realWorldUse: "ISRO's Bhoonidhi platform, ESA's Copernicus EMS, and SkyFi use satellite change detection for disaster management, urban planning, and environmental monitoring.",
    examinerExpects: [
      "Show change detection mask on a deforestation event in the Amazon.",
      "Present F1 score on LEVIR-CD benchmark dataset.",
      "Demonstrate time-series change animation showing gradual urban expansion.",
      "Show the false positive rate in agricultural areas (seasonal crop changes)."
    ],
    freeVivaQuestions: [
      "What is a Siamese network and why is it well-suited for image comparison tasks?",
      "How do you handle registration errors when before/after satellite images aren't pixel-aligned?",
      "What is the difference between binary change detection and multi-class change detection?"
    ],
    freeStep1Title: "Download LEVIR-CD building change detection dataset and implement Siamese ResNet-50 backbone",
    datasetName: "LEVIR-CD Change Detection Dataset + Sentinel-2 imagery via Copernicus Data Space"
  },
  {
    id: "space-debris-tracking-ml-tle",
    letter: "S",
    title: "Space Debris Tracking and Collision Prediction",
    category: "DataScience",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Predict satellite collision probability using TLE orbital data and conjunction analysis.",
    whatItDoes: "Processes Two-Line Element (TLE) orbital data for 27,000+ tracked objects using SGP4 propagation. Computes minimum conjunction distance and collision probability for active satellite operations.",
    realWorldUse: "SpaceX Starlink executes 50,000 collision avoidance maneuvers per year. ISRO tracks 20,000+ debris objects. Space situational awareness is a national security priority.",
    examinerExpects: [
      "Visualize orbital tracks for 100 debris objects in 3D using Cesium.js.",
      "Show conjunction alert when two objects approach within 1km.",
      "Present probability of collision calculation using Aoki or Chan method.",
      "Demonstrate orbital decay prediction for low-Earth orbit debris."
    ],
    freeVivaQuestions: [
      "What is a Two-Line Element (TLE) set and what orbital parameters does it contain?",
      "What is the SGP4 propagator and what perturbations does it model?",
      "What is the Kessler Syndrome and why is debris remediation an urgent problem?"
    ],
    freeStep1Title: "Download Space-Track.org TLE data, install python-sgp4, and propagate orbits for first 100 objects",
    datasetName: "Space-Track.org TLE catalog (27,000+ objects) + NASA CARA conjunction data messages"
  },
  // ─── MORE AIML ────────────────────────────────────────────────────────────
  {
    id: "ai-interior-design-stable-diffusion-controlnet",
    letter: "A",
    title: "AI Interior Design Generator using ControlNet",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Upload a room photo and AI redesigns it in any style — modern, Scandinavian, Bohemian.",
    whatItDoes: "Uses Stable Diffusion + ControlNet (depth conditioning) to preserve the room's spatial layout while completely reimagining the design style, furniture, lighting, and color palette.",
    realWorldUse: "Houzz, HomeByMe, and IKEA's AI design tool all use generative AI. India's interior design market is ₹30,000 crore. This is the most visually impressive AI project for non-technical examiners.",
    examinerExpects: [
      "Upload a plain room photo and generate 3 different style redesigns.",
      "Show depth map extraction using MiDaS and how ControlNet uses it.",
      "Demonstrate negative prompting removing unwanted elements.",
      "Show inpainting: redesign only the sofa area, keep walls unchanged."
    ],
    freeVivaQuestions: [
      "What is ControlNet and how does it add spatial control to Stable Diffusion?",
      "What is classifier-free guidance scale and how does it affect output quality vs faithfulness?",
      "How does inpainting work — what is the masked diffusion process?"
    ],
    freeStep1Title: "Install diffusers library, download ControlNet-Depth checkpoint, and run first room redesign inference",
    datasetName: "LSUN Room dataset + ADE20K interior scene dataset"
  },
  {
    id: "ai-video-search-clip-timestamps",
    letter: "A",
    title: "AI Video Search Engine using CLIP — Find Scenes by Text",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Search inside any video with natural language — 'find the moment with a red car' returns exact timestamp.",
    whatItDoes: "Extracts frames from videos every N seconds, generates CLIP embeddings, and stores them in a vector database. Users type queries and get the exact video timestamp matching their description.",
    realWorldUse: "Getty Images, Shutterstock, and Adobe Stock all use multimodal video search. Twelve Labs raised $50M for exactly this product. YouTube's internal search uses similar technology.",
    examinerExpects: [
      "Search 'sunset over mountains' in a travel vlog and get exact timestamp.",
      "Show retrieval time: query should complete within 500ms even for 1-hour video.",
      "Demonstrate multi-frame aggregation for dynamic scenes.",
      "Show fine-grained search: 'person in blue shirt sitting' vs 'person in blue shirt standing'."
    ],
    freeVivaQuestions: [
      "How does CLIP learn joint vision-language embeddings without paired captions?",
      "Why is cosine similarity better than Euclidean distance for CLIP embedding comparison?",
      "How does frame sampling rate affect search accuracy vs storage cost?"
    ],
    freeStep1Title: "Install CLIP via HuggingFace, extract frames from sample video using OpenCV, and build FAISS index",
    datasetName: "ActivityNet video dataset + MSVD video description dataset"
  },
  {
    id: "ai-logo-brand-identity-generator",
    letter: "A",
    title: "AI Brand Identity Generator — Logo, Colors, and Typography",
    category: "AIML",
    difficulty: 3,
    buildTimeDays: "2–4 days",
    trending: true,
    tagline: "Describe your startup and get a complete brand identity kit with logo variations in 30 seconds.",
    whatItDoes: "User inputs startup name, industry, and brand values. GPT-4 generates brand positioning and visual direction. Stable Diffusion generates logo concepts. A Node.js service assembles the complete brand kit.",
    realWorldUse: "Looka raised $12M for AI logo generation. Canva's text-to-design feature uses similar AI. India has 100,000+ new startups per year — every one needs branding. This is a massive addressable market.",
    examinerExpects: [
      "Input 'MediFind — healthcare startup for rural India' and show complete brand kit.",
      "Show 5 logo variations with different visual styles.",
      "Demonstrate color palette generation with accessible contrast ratios.",
      "Show typography pairing recommendations with Google Fonts integration."
    ],
    freeVivaQuestions: [
      "What color psychology principles guide brand color selection for healthcare vs fintech?",
      "How do you ensure generated logos are not trademarked by existing companies?",
      "What is WCAG color contrast ratio and why does it matter for brand accessibility?"
    ],
    freeStep1Title: "Set up GPT-4o API for brand strategy generation and Stable Diffusion for logo concept generation",
    datasetName: "LLD logo dataset (10M logos) + Google Fonts typography pairing dataset"
  },
  {
    id: "graph-rag-enterprise-knowledge-base",
    letter: "G",
    title: "GraphRAG: Enterprise Knowledge Base with Graph-Enhanced Retrieval",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Build a corporate knowledge assistant that understands relationships between documents and entities.",
    whatItDoes: "Uses Microsoft's GraphRAG — builds a knowledge graph from documents, then uses community detection to answer complex multi-hop questions that standard RAG cannot handle.",
    realWorldUse: "Microsoft released GraphRAG in June 2024. Enterprise knowledge management is a $10B market. Notion AI, Confluence AI, and Guru all need this capability. This is the frontier of RAG research.",
    examinerExpects: [
      "Ask a multi-hop question requiring connections across 3 documents — show GraphRAG succeeding where naive RAG fails.",
      "Visualize the entity relationship graph built from the document corpus.",
      "Present retrieval accuracy comparison: GraphRAG vs standard RAG on complex questions.",
      "Show community summarization enabling 'what are the main themes in our knowledge base' queries."
    ],
    freeVivaQuestions: [
      "What is the key limitation of standard RAG that GraphRAG addresses?",
      "What is community detection in graphs and how does Leiden algorithm work?",
      "How does GraphRAG handle questions that span across many documents simultaneously?"
    ],
    freeStep1Title: "Install Microsoft GraphRAG library, prepare document corpus, and run graph indexing pipeline",
    datasetName: "SEC financial filing corpus + internal company document collection (simulated)"
  },
  {
    id: "diffusion-model-from-scratch-ddpm",
    letter: "D",
    title: "Diffusion Model from Scratch: DDPM Implementation",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Implement the math behind Stable Diffusion — build DDPM from scratch and train on CIFAR-10.",
    whatItDoes: "Implements Denoising Diffusion Probabilistic Model (DDPM) from the original 2020 Ho et al. paper. Trains a U-Net to denoise noisy images step by step, learning to generate new images from Gaussian noise.",
    realWorldUse: "Every image generation model (Midjourney, DALL-E 3, Stable Diffusion) is built on diffusion models. Understanding the math is the most impressive thing a final year student can demonstrate.",
    examinerExpects: [
      "Show the forward diffusion process gradually adding noise to an image over 1000 steps.",
      "Demonstrate the reverse process: starting from noise and generating a recognizable image.",
      "Present FID (Fréchet Inception Distance) score on CIFAR-10 test set.",
      "Explain the ELBO objective and how score matching connects to diffusion training."
    ],
    freeVivaQuestions: [
      "What is the reparameterization trick and why is it needed for training diffusion models?",
      "Explain the connection between DDPM score matching and Langevin dynamics sampling.",
      "Why does DDIM (DDIM sampler) generate images in fewer steps without retraining?"
    ],
    freeStep1Title: "Set up PyTorch, implement noise scheduler (linear beta schedule), and build U-Net architecture for DDPM",
    datasetName: "CIFAR-10 dataset (60K images) + CelebA-HQ faces dataset"
  },
  {
    id: "vision-language-model-visual-question-answering",
    letter: "V",
    title: "Visual Question Answering with BLIP-2 VLM",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Ask any question about any image in natural language — AI answers with context-aware reasoning.",
    whatItDoes: "Uses Salesforce BLIP-2 (open weights) to answer free-form questions about images. Applications include medical image Q&A, document understanding, and product catalog querying.",
    realWorldUse: "GPT-4V, Google Gemini, and Claude are commercial VLMs. BLIP-2 is the state-of-the-art open-source VLM. This is the foundation of every multimodal AI product.",
    examinerExpects: [
      "Show Q&A on medical X-ray: 'Is there evidence of pneumonia?' with answer and reasoning.",
      "Demonstrate document understanding: answer questions about an invoice image.",
      "Show chart understanding: 'What was the highest revenue quarter?' from bar chart image.",
      "Present VQAv2 benchmark accuracy comparison with BLIP vs BLIP-2."
    ],
    freeVivaQuestions: [
      "What is the Q-Former module in BLIP-2 and how does it bridge vision and language?",
      "What is the difference between discriminative VQA and generative VQA?",
      "How does BLIP-2 achieve strong performance by training fewer parameters than end-to-end VLMs?"
    ],
    freeStep1Title: "Download BLIP-2 from HuggingFace Salesforce organization and run zero-shot VQA inference",
    datasetName: "VQAv2 benchmark dataset + TextVQA document Q&A dataset"
  },
  // ─── CYBERSECURITY ADDITIONAL ─────────────────────────────────────────────
  {
    id: "web3-smart-contract-audit-tool",
    letter: "W",
    title: "Automated Smart Contract Security Audit Tool",
    category: "Cybersecurity",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Scan Solidity smart contracts for reentrancy, overflow, and access control vulnerabilities automatically.",
    whatItDoes: "Static analysis tool that parses Solidity AST and detects common vulnerabilities (reentrancy, integer overflow, unprotected selfdestruct, tx.origin authentication) using pattern matching and symbolic execution.",
    realWorldUse: "Slither, MythX, and Certora are commercial smart contract auditing tools. $2.8B was stolen from smart contracts in 2023. Every DeFi protocol needs security auditing before deployment.",
    examinerExpects: [
      "Run tool on a vulnerable Solidity contract and show reentrancy detection.",
      "Show the AST parsing identifying dangerous patterns in code.",
      "Present false positive analysis — does it flag safe code as vulnerable?",
      "Demonstrate suggested remediation for each detected vulnerability."
    ],
    freeVivaQuestions: [
      "What is a reentrancy attack and how did it enable the $60M DAO hack?",
      "What is the checks-effects-interactions pattern and how does it prevent reentrancy?",
      "What is symbolic execution and how does it differ from static analysis?"
    ],
    freeStep1Title: "Install Slither and solc, write a vulnerable Solidity contract, and run first automated analysis",
    datasetName: "SmartBugs curated vulnerable smart contract dataset + SWC Registry vulnerability specifications"
  },
  {
    id: "mobile-app-security-analysis-apk",
    letter: "M",
    title: "Android APK Security Analysis Automation Tool",
    category: "Cybersecurity",
    difficulty: 4,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "Automated static and dynamic analysis of Android apps detecting data leakage and insecure APIs.",
    whatItDoes: "Decompiles APK files using jadx, extracts hardcoded API keys and secrets, identifies insecure data storage, detects network security config issues, and generates OWASP Mobile security reports.",
    realWorldUse: "CERT-In mandated mobile app security testing for government apps. RBI requires fintech apps to pass VAPT before launch. 60% of Indian fintech apps have critical security issues according to Appknox.",
    examinerExpects: [
      "Upload a test APK and show hardcoded AWS key detected in source code.",
      "Demonstrate insecure SharedPreferences storage of PII flagging.",
      "Show SSL certificate pinning bypass detection.",
      "Present OWASP Mobile Top 10 compliance report for the analyzed app."
    ],
    freeVivaQuestions: [
      "What is OWASP Mobile Top 10 and name the top 3 critical issues?",
      "How do you detect hardcoded secrets in obfuscated APK bytecode?",
      "What is the difference between static analysis and dynamic analysis for mobile security?"
    ],
    freeStep1Title: "Install jadx, apktool, and MobSF, then run automated scan on a test debug APK",
    datasetName: "AndroZoo APK dataset + MobSF test application suite"
  },
  // ─── FULLSTACK ADDITIONAL ─────────────────────────────────────────────────
  {
    id: "ai-powered-crm-sales-intelligence",
    letter: "A",
    title: "AI-Powered CRM with Sales Intelligence",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "CRM that predicts lead conversion probability and auto-writes personalized follow-up emails.",
    whatItDoes: "A full-stack CRM where leads are scored by an XGBoost conversion model. AI auto-drafts personalized outreach emails from LinkedIn profile data. Sales insights dashboard shows pipeline health.",
    realWorldUse: "Salesforce Einstein, HubSpot AI, and Zoho Zia are commercial AI CRM tools. Indian SaaS companies (Freshworks, Leadsquared, Kapture) serve SMBs that need affordable AI CRM.",
    examinerExpects: [
      "Add a lead and show AI-generated conversion probability with feature explanation.",
      "Demonstrate auto-generated personalized email using lead's LinkedIn data.",
      "Show deal pipeline visualization with AI-predicted close dates.",
      "Present email open rate tracking integration."
    ],
    freeVivaQuestions: [
      "What features are most predictive of B2B lead conversion in CRM datasets?",
      "How do you personalize emails at scale without each one feeling generic?",
      "What is email deliverability and why is SPF/DKIM important for your CRM's emails?"
    ],
    freeStep1Title: "Set up Next.js with Supabase CRM schema, train XGBoost on HubSpot open CRM dataset, deploy prediction API",
    datasetName: "HubSpot open CRM dataset + LinkedIn Sales Navigator API (simulated data)"
  },
  {
    id: "event-driven-microservices-kafka",
    letter: "E",
    title: "Event-Driven Microservices with Apache Kafka",
    category: "FullStack",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Build a distributed e-commerce system where order, payment, and inventory services communicate via events.",
    whatItDoes: "Three independent microservices (Order, Payment, Inventory) communicate via Kafka events. Implements Saga pattern for distributed transactions and event sourcing for audit trail.",
    realWorldUse: "Flipkart, Amazon, and Zomato all run on event-driven microservices. Kafka processes 7 trillion messages per day across all LinkedIn services. This is mandatory knowledge for any backend engineer.",
    examinerExpects: [
      "Place an order and trace the event flow across all three services in real time.",
      "Demonstrate the compensating transaction when payment fails — inventory is released.",
      "Show Kafka consumer group rebalancing when one service instance fails.",
      "Present event sourcing replay — rebuild current state from event log."
    ],
    freeVivaQuestions: [
      "What is the Saga pattern and how does it handle distributed transaction failures?",
      "What is at-least-once delivery in Kafka and how do you ensure idempotent consumers?",
      "When would you choose event sourcing over a traditional CRUD database approach?"
    ],
    freeStep1Title: "Set up Docker Compose with Kafka, Zookeeper, and three Node.js microservice containers",
    datasetName: "E-commerce order simulation dataset + Apache Kafka quickstart tutorial"
  },
  {
    id: "graphql-api-gateway-federation",
    letter: "G",
    title: "GraphQL API Gateway with Schema Federation",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Build a supergraph combining users, products, and orders APIs into a single GraphQL endpoint.",
    whatItDoes: "Implements Apollo Federation — three separate GraphQL subgraph services (User, Product, Orders) are composed into a single supergraph query endpoint. Includes subscriptions, persisted queries, and authorization.",
    realWorldUse: "Netflix, Airbnb, and Shopify use GraphQL Federation. Every modern API-first company manages a GraphQL gateway. This pattern is asked in every senior frontend/backend engineering interview.",
    examinerExpects: [
      "Show a single GraphQL query spanning user data + their orders + product details.",
      "Demonstrate real-time subscription updating frontend when order status changes.",
      "Show authorization middleware rejecting unauthorized field access.",
      "Present query complexity limiting preventing expensive nested queries."
    ],
    freeVivaQuestions: [
      "What is the N+1 query problem in GraphQL and how does DataLoader solve it?",
      "How does Apollo Federation differ from simple schema stitching?",
      "What are persisted queries and how do they improve security and performance?"
    ],
    freeStep1Title: "Set up Apollo Router as gateway and implement first User subgraph service with federation directives",
    datasetName: "Shopify storefront API schema reference + Apollo Federation documentation"
  },
  // ─── DATA SCIENCE ADDITIONAL ──────────────────────────────────────────────
  {
    id: "llm-finetuning-lora-domain-specific",
    letter: "L",
    title: "Fine-Tuning LLM with LoRA for Domain-Specific Tasks",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Fine-tune Llama-3 on medical/legal/financial text using parameter-efficient LoRA in under 4GB VRAM.",
    whatItDoes: "Uses LoRA (Low-Rank Adaptation) via Hugging Face PEFT library to efficiently fine-tune Llama-3-8B on a domain-specific Q&A dataset, running on a single consumer GPU with quantization.",
    realWorldUse: "Every enterprise AI application requires domain-adapted LLMs. OpenAI's fine-tuning API, Mistral fine-tuning, and Cohere's command-r all offer this. The skill is in high demand at all AI companies.",
    examinerExpects: [
      "Show training perplexity decreasing on domain-specific validation set.",
      "Compare base Llama-3 vs fine-tuned model on 10 domain questions.",
      "Demonstrate 4-bit quantization (QLoRA) reducing memory from 16GB to 4GB.",
      "Present the LoRA rank/alpha hyperparameter ablation study."
    ],
    freeVivaQuestions: [
      "What is LoRA and how does it reduce trainable parameters from billions to millions?",
      "What is QLoRA and how does 4-bit quantization enable fine-tuning on consumer GPUs?",
      "How do you evaluate a fine-tuned LLM — what metrics beyond perplexity are meaningful?"
    ],
    freeStep1Title: "Install Unsloth or TRL library, download Llama-3-8B in 4-bit, and configure LoRA adapter training",
    datasetName: "Alpaca medical instruction dataset + LegalBench legal reasoning dataset"
  },
  {
    id: "synthetic-data-generation-tabular",
    letter: "S",
    title: "Synthetic Tabular Data Generation with CTGAN",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Generate unlimited realistic synthetic financial data for training ML models without privacy risks.",
    whatItDoes: "Uses CTGAN (Conditional Tabular GAN) from the SDV library to synthesize realistic financial/medical tabular data that preserves statistical properties and inter-column relationships without exposing real patient/customer records.",
    realWorldUse: "Banks use synthetic data for ML development without PDPB compliance concerns. Mostly AI, Gretel.ai, and NVIDIA Morpheus are commercial synthetic data platforms worth $100M+.",
    examinerExpects: [
      "Show statistical comparison: real vs synthetic data on 10 key metrics.",
      "Demonstrate ML utility: model trained on synthetic data performs nearly as well on real test set.",
      "Present privacy evaluation: membership inference attack fails on synthetic data.",
      "Show conditional generation: generate synthetic records only for a specific customer segment."
    ],
    freeVivaQuestions: [
      "What is the train-on-synthetic, test-on-real (TSTR) evaluation paradigm?",
      "How does CTGAN handle mixed data types (continuous + categorical) in tabular data?",
      "What is a membership inference attack and why does synthetic data protect against it?"
    ],
    freeStep1Title: "Install SDV library, load real dataset, configure CTGAN, and run first synthetic data generation",
    datasetName: "UCI Adult Income dataset + Kaggle credit card transactions dataset"
  },
  // ─── WEB3 ADDITIONAL ─────────────────────────────────────────────────────
  {
    id: "dao-governance-voting-compound",
    letter: "D",
    title: "DAO Governance System with On-Chain Voting",
    category: "Blockchain",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Build a decentralized autonomous organization with token-weighted proposal voting.",
    whatItDoes: "Implements Governor Bravo-style DAO where token holders propose protocol changes, debate in a governance forum, vote on-chain, and execute approved proposals automatically via timelock.",
    realWorldUse: "Compound, Uniswap, and Aave are billion-dollar protocols governed by DAOs. India's cooperative societies and credit unions could benefit from blockchain governance transparency.",
    examinerExpects: [
      "Create a proposal, vote with token-weighted ballots, and show execution after timelock.",
      "Demonstrate quorum requirement: proposal fails if insufficient participation.",
      "Show vote delegation — token holders can delegate voting power without transferring tokens.",
      "Present Snapshot.org integration for off-chain voting before on-chain execution."
    ],
    freeVivaQuestions: [
      "What is a timelock and why is it critical for DAO security?",
      "What is vote delegation in compound governance and why does it improve participation?",
      "What is plutocracy risk in token-weighted voting and what alternatives exist?"
    ],
    freeStep1Title: "Deploy OpenZeppelin Governor contract and ERC-20 governance token to Polygon Mumbai testnet",
    datasetName: "Compound governance proposal history + Snapshot.org API for off-chain vote data"
  },
  {
    id: "cross-chain-bridge-layerzero",
    letter: "C",
    title: "Cross-Chain Token Bridge using LayerZero",
    category: "Blockchain",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Send tokens between Ethereum, Polygon, and Arbitrum with atomic cross-chain guarantees.",
    whatItDoes: "Uses LayerZero omnichain messaging to implement a lock-and-mint bridge. Users lock tokens on Chain A, LayerZero relays the message, and equivalent tokens are minted on Chain B.",
    realWorldUse: "Stargate Finance (LayerZero) processes $10B+ monthly. Every multi-chain DeFi protocol needs cross-chain infrastructure. Bridges were the #1 hack target in 2022 ($2.5B stolen).",
    examinerExpects: [
      "Lock 100 test tokens on Polygon Mumbai and see them appear on Arbitrum Goerli.",
      "Show LayerZero message flow: user → source chain → ultra light node → oracle → destination chain.",
      "Demonstrate bridge security: forged messages are rejected by the oracle verification.",
      "Present the bridge TVL dashboard and daily transfer volume analytics."
    ],
    freeVivaQuestions: [
      "What is the main security risk of a lock-and-mint bridge and how have bridges been exploited?",
      "How does LayerZero's ultra light node differ from a light client bridge?",
      "What is the canonical bridge vs third-party bridge distinction for rollups?"
    ],
    freeStep1Title: "Clone LayerZero examples repository, configure OApp contract for Polygon-Arbitrum bridge, and deploy",
    datasetName: "LayerZero v2 deployed contract addresses + Stargate bridge transaction data"
  },
  // ─── MORE FULLSTACK ────────────────────────────────────────────────────────
  {
    id: "serverless-edge-computing-cloudflare-workers",
    letter: "S",
    title: "Edge Computing Application with Cloudflare Workers",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3–4 days",
    trending: true,
    tagline: "Deploy globally distributed functions that run within 50ms of any user anywhere on Earth.",
    whatItDoes: "Builds a real-time geo-personalization engine using Cloudflare Workers at 270+ PoPs. Detects user location and language, serves regionally tailored content, and runs ML inference at the edge.",
    realWorldUse: "Cloudflare Workers powers 25 million websites. Vercel Edge Runtime, Deno Deploy, and Fastly Compute all offer edge computing. This is the fastest growing deployment model in web development.",
    examinerExpects: [
      "Show API responding from nearest Cloudflare data center using CF-Ray header.",
      "Demonstrate geo-based content personalization: different currency for Indian vs US visitors.",
      "Show edge ML inference using ONNX model in Workers AI.",
      "Present performance comparison: edge function vs origin server latency."
    ],
    freeVivaQuestions: [
      "What is the difference between edge computing and traditional serverless (like AWS Lambda)?",
      "What is V8 isolates and why do they start faster than containers for edge functions?",
      "What are the limitations of Cloudflare Workers compared to a full Node.js environment?"
    ],
    freeStep1Title: "Create Cloudflare account, install Wrangler CLI, and deploy first 'Hello World' Worker to edge network",
    datasetName: "Cloudflare Workers examples repository + Workers AI model catalog"
  },
  {
    id: "web-scraping-pipeline-anti-detection",
    letter: "W",
    title: "Production-Grade Web Scraping Pipeline with Anti-Detection",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Scrape e-commerce, job boards, and news sites at scale without getting blocked.",
    whatItDoes: "Playwright-based scraper with rotating residential proxies, fingerprint randomization, human behavior simulation (random delays, mouse movements), and CAPTCHA solving integration.",
    realWorldUse: "Price comparison sites, SEO tools, and market research firms all need large-scale web scraping. ScrapingBee, Bright Data, and Apify are $100M+ businesses built on scraping infrastructure.",
    examinerExpects: [
      "Scrape 1000 product listings from an e-commerce site without being blocked.",
      "Show browser fingerprint randomization using playwright-extra-stealth.",
      "Demonstrate rotating proxy integration with failure retry logic.",
      "Present structured data extraction pipeline outputting clean JSON to database."
    ],
    freeVivaQuestions: [
      "What browser fingerprinting techniques do websites use to detect scrapers?",
      "How do residential proxies differ from datacenter proxies for anti-bot evasion?",
      "What are the legal and ethical boundaries of web scraping?"
    ],
    freeStep1Title: "Install Playwright with playwright-extra and puppeteer-extra-plugin-stealth, run first fingerprint test",
    datasetName: "Common Crawl web corpus + scraped dataset from 10 public job boards"
  },
  {
    id: "devops-mlops-kubeflow-pipeline",
    letter: "D",
    title: "MLOps Pipeline with Kubeflow and MLflow",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Automate the entire ML lifecycle: data ingestion, training, evaluation, and production deployment.",
    whatItDoes: "Builds a Kubeflow pipeline that orchestrates: data validation → feature engineering → model training → evaluation → A/B testing deployment. MLflow tracks all experiments and model versions.",
    realWorldUse: "Every production ML team uses MLOps platforms. Vertex AI, SageMaker, and Azure ML are cloud MLOps. Kubeflow is the open-source standard used by Google, Uber, and PayPal.",
    examinerExpects: [
      "Show Kubeflow UI with pipeline DAG running all stages automatically.",
      "Demonstrate MLflow experiment tracking with hyperparameter comparison.",
      "Show model registry promoting a model from Staging to Production.",
      "Present data drift detection triggering automatic retraining."
    ],
    freeVivaQuestions: [
      "What is the difference between ML infrastructure and MLOps?",
      "What is data drift and why does it cause production ML models to degrade over time?",
      "How does Kubeflow handle pipeline step failures and retries?"
    ],
    freeStep1Title: "Install Minikube, deploy Kubeflow on local Kubernetes, and run the first simple pipeline component",
    datasetName: "ML model training benchmark dataset + production serving traffic simulation logs"
  },
  {
    id: "platform-engineering-internal-developer-portal",
    letter: "P",
    title: "Internal Developer Portal with Backstage",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Build the developer experience platform used by Spotify, Netflix, and Airbnb internally.",
    whatItDoes: "Deploys Spotify Backstage — an open-source IDP with software catalog, service documentation, API registry, CI/CD pipeline visibility, and infrastructure cost attribution.",
    realWorldUse: "Platform engineering is the fastest growing DevOps discipline in 2024-25. Cortex, Roadie, and Port are commercial Backstage alternatives. Every company with 20+ engineers needs an IDP.",
    examinerExpects: [
      "Show the software catalog listing all microservices with ownership and SLA data.",
      "Demonstrate API documentation generated from OpenAPI specs.",
      "Show the TechDocs site for a service auto-generated from Markdown in the repo.",
      "Present cost attribution showing which team's services use the most cloud resources."
    ],
    freeVivaQuestions: [
      "What is an Internal Developer Portal and what problems does it solve at scale?",
      "What is the software catalog in Backstage and why is component ownership important?",
      "How does golden path templating in Backstage improve developer onboarding?"
    ],
    freeStep1Title: "Clone Backstage template repository, configure app-config.yaml, and run first local instance with sample catalog",
    datasetName: "Backstage software catalog YAML templates + public GitHub API for service metadata"
  },
  // ─── ADDITIONAL TRENDING TOPICS ───────────────────────────────────────────
  {
    id: "ai-agent-tool-use-openai-function-calling",
    letter: "A",
    title: "AI Agent with Tool Use and Memory using OpenAI Function Calling",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Build an autonomous AI assistant that browses the web, runs code, and remembers past conversations.",
    whatItDoes: "Uses OpenAI function calling to give GPT-4o access to tools: web search (Tavily), Python REPL, calendar, and email. Mem0 or Zep provides long-term memory across sessions.",
    realWorldUse: "OpenAI Assistants API, Claude's tool use, and LangChain agents are all based on this pattern. Every AI product shipped in 2024-25 uses tool-calling agents.",
    examinerExpects: [
      "Ask the agent to 'research AI trends in 2025 and write a report' — show it searching and writing.",
      "Demonstrate memory: agent remembers user preferences from previous session.",
      "Show parallel tool calling executing web search + code execution simultaneously.",
      "Present token usage optimization strategy for long multi-turn conversations."
    ],
    freeVivaQuestions: [
      "What is function calling in OpenAI API and how does it differ from prompt engineering?",
      "How does the agent decide which tool to use for a given user request?",
      "What is ReAct agent framework and how does it structure the think-act-observe loop?"
    ],
    freeStep1Title: "Set up OpenAI Python SDK, define 3 tool schemas in JSON, and implement first tool-calling agent loop",
    datasetName: "Tavily Search API access + Python Sandbox (E2B or local subprocess)"
  },
  {
    id: "real-time-language-translation-whisper-llm",
    letter: "R",
    title: "Real-Time Multi-Language Interpreter using Whisper + LLM",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Speak in any language — get real-time voice translation into another language with voice output.",
    whatItDoes: "Microphone audio → Whisper transcription → GPT-4o translation → XTTS-v2 speech synthesis in target language. End-to-end latency under 3 seconds. Supports Hindi, Tamil, Telugu, Marathi, and English.",
    realWorldUse: "Google Interpreter mode, Universal Translator by MSR, and Pocketalk are commercial devices. Indian courts and hospitals desperately need multilingual real-time communication.",
    examinerExpects: [
      "Speak a Hindi sentence and hear the English translation within 3 seconds.",
      "Demonstrate all 5 Indian languages working end-to-end.",
      "Show Whisper's word-level timestamps enabling synchronized subtitle generation.",
      "Present accuracy comparison: Whisper vs Google STT on noisy Indian-accent audio."
    ],
    freeVivaQuestions: [
      "What is Whisper's architecture and how does it handle multilingual transcription without language detection?",
      "How do you minimize latency in the STT → Translation → TTS pipeline?",
      "What are the disfluency handling challenges (ums, ahs, incomplete sentences) in real-time translation?"
    ],
    freeStep1Title: "Install faster-whisper for optimized transcription, set up pyaudio for microphone streaming",
    datasetName: "AI4Bharat IndicSpeech multilingual dataset + Microsoft MSTTS voice samples"
  },
  {
    id: "self-supervised-representation-learning-simclr",
    letter: "S",
    title: "Self-Supervised Learning: SimCLR Contrastive Pre-Training",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Train a powerful image encoder without any labels using contrastive self-supervised learning.",
    whatItDoes: "Implements SimCLR (Simple Framework for Contrastive Learning of Visual Representations) to pre-train a ResNet encoder on unlabeled images. The encoder is then fine-tuned with 1% of labels, achieving 90%+ of supervised accuracy.",
    realWorldUse: "Self-supervised learning powers GPT, BERT, CLIP, and DINOv2. In domains with scarce labels (medical imaging, satellite imagery, rare languages), self-supervised pre-training is the state-of-the-art approach.",
    examinerExpects: [
      "Show t-SNE visualization of SimCLR learned embeddings — similar images cluster together.",
      "Compare SimCLR vs supervised baseline accuracy with 1%, 10%, and 100% of labels.",
      "Demonstrate the contrastive loss: augmented views of same image are pulled together, different images pushed apart.",
      "Show data augmentation pipeline: random crop, color jitter, Gaussian blur."
    ],
    freeVivaQuestions: [
      "What is the InfoNCE loss in SimCLR and what does it maximize?",
      "What is representation collapse and how does SimCLR prevent it without negative-free methods?",
      "How does BYOL (Bootstrap Your Own Latent) achieve similar results without negative pairs?"
    ],
    freeStep1Title: "Set up PyTorch Lightning, implement SimCLR contrastive loss, and run pretraining on CIFAR-10 unlabeled",
    datasetName: "STL-10 unlabeled dataset (100K images) + ImageNet subset for downstream evaluation"
  },
  {
    id: "knowledge-distillation-model-compression",
    letter: "K",
    title: "Knowledge Distillation: Compress BERT into TinyBERT",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Compress a 110M parameter BERT into a 14M TinyBERT with 96% accuracy retention.",
    whatItDoes: "Implements task-specific knowledge distillation where a large teacher BERT transfers knowledge to a small student network. The student matches the teacher's intermediate layer representations, not just the final output.",
    realWorldUse: "DistilBERT, TinyBERT, and MobileBERT are deployed on billions of mobile devices. Edge AI deployment requires model compression. Every on-device AI product (Siri, Google Assistant on-device) uses distillation.",
    examinerExpects: [
      "Show student model achieving 96% of teacher accuracy with 7x fewer parameters.",
      "Present intermediate layer distillation: student matching teacher's attention matrices.",
      "Demonstrate inference speed: TinyBERT vs BERT on same hardware.",
      "Show the distillation loss curve: hard label loss + soft label KL divergence."
    ],
    freeVivaQuestions: [
      "What is soft target cross-entropy and why are teacher's probability distributions more informative than hard labels?",
      "What is the temperature parameter in knowledge distillation and how does it control knowledge transfer?",
      "Why does intermediate layer distillation (attention transfer) outperform output-only distillation?"
    ],
    freeStep1Title: "Load BERT teacher from HuggingFace, define TinyBERT student architecture, and implement distillation training loop",
    datasetName: "GLUE benchmark dataset (SST-2, MNLI) + TinyBERT pre-trained checkpoint for comparison"
  },
  {
    id: "generative-adversarial-network-face-aging",
    letter: "G",
    title: "Face Aging with Conditional GAN",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Generate photorealistic aging progressions of a face from age 20 to 80 using conditional GAN.",
    whatItDoes: "Trains a conditional GAN (CGAN or CAAE) conditioned on target age that transforms a young face photo into realistic older versions while preserving identity. Applications in law enforcement and medical prognosis.",
    realWorldUse: "FaceApp has 150M users for this use case. FBI and Interpol use age progression for missing children cases. Indian police are adopting face aging for cold case investigations.",
    examinerExpects: [
      "Show input 20-year-old face transformed to ages 30, 40, 50, 60, 70 progressively.",
      "Demonstrate identity preservation — the person is still recognizable across ages.",
      "Present FID score comparing generated aged faces vs real aged faces.",
      "Show the age conditioning mechanism in the generator architecture."
    ],
    freeVivaQuestions: [
      "What is mode collapse in GANs and how do techniques like WGAN address it?",
      "How do you condition a GAN on a continuous variable like age?",
      "What is the identity preservation loss and why is it necessary for face editing?"
    ],
    freeStep1Title: "Download CACD (Cross-Age Celebrity Dataset) and implement CAAE generator/discriminator in PyTorch",
    datasetName: "CACD Cross-Age Celebrity Dataset (163,446 images) + MORPH face aging dataset"
  },
  {
    id: "speech-emotion-recognition-wav2vec",
    letter: "S",
    title: "Speech Emotion Recognition using Wav2Vec 2.0",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Detect emotions (anger, happiness, sadness, fear) from voice audio using pre-trained speech transformer.",
    whatItDoes: "Fine-tunes Facebook's Wav2Vec 2.0 on speech emotion datasets to classify 7 emotions from raw audio waveforms. Builds a real-time call center analytics system flagging angry customers.",
    realWorldUse: "Cogito, Tethr, and Sybill analyze customer calls for emotion. Indian call centers handle 2.4 billion calls annually. Emotion-aware customer service is a major enterprise opportunity.",
    examinerExpects: [
      "Record a 5-second angry speech sample — show correct emotion classification.",
      "Present confusion matrix across 7 emotions with F1 scores.",
      "Show Wav2Vec feature extraction: how raw waveform becomes feature representation.",
      "Demonstrate real-time streaming classification with 200ms window size."
    ],
    freeVivaQuestions: [
      "What is self-supervised pre-training in Wav2Vec and what does it learn without labels?",
      "How do you handle cross-lingual emotion recognition — do emotions sound universal?",
      "Why is raw waveform processing in Wav2Vec better than MFCC features for emotion?"
    ],
    freeStep1Title: "Download RAVDESS emotional speech dataset and configure Wav2Vec 2.0 fine-tuning with HuggingFace Trainer",
    datasetName: "RAVDESS (24 actors, 8 emotions) + IEMOCAP 4-emotion speech dataset"
  },
  {
    id: "homomorphic-encryption-private-ml",
    letter: "H",
    title: "Privacy-Preserving ML with Homomorphic Encryption",
    category: "Cybersecurity",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Run machine learning on encrypted data — the server learns predictions without seeing the input.",
    whatItDoes: "Uses Microsoft SEAL or TenSEAL to run a neural network inference on fully homomorphic encrypted data. The hospital sends encrypted patient data; the ML server returns encrypted predictions without ever decrypting.",
    realWorldUse: "IBM HElayers and Microsoft SEAL are deployed in healthcare and financial services. HIPAA and GDPR compliance for ML inference is a critical enterprise requirement. This is frontier cryptography research.",
    examinerExpects: [
      "Show client encrypting input data and server running inference without decryption.",
      "Compare plaintext inference vs homomorphic inference accuracy (should be identical).",
      "Present performance overhead: HE inference is 100x slower — quantify and explain.",
      "Show correctness proof: decrypted result matches plaintext computation."
    ],
    freeVivaQuestions: [
      "What is homomorphic encryption and what mathematical operations does CKKS support?",
      "Why is homomorphic encryption 1000x slower than plaintext computation?",
      "What is the difference between FHE (Fully Homomorphic), PHE (Partially), and SWHE?"
    ],
    freeStep1Title: "Install TenSEAL library, implement CKKS context, and encrypt a simple 10-feature classification input",
    datasetName: "Wisconsin Breast Cancer Dataset + MNIST for benchmarking HE neural network inference"
  },
  // ─── FINAL BATCH ─────────────────────────────────────────────────────────
  {
    id: "ai-travel-itinerary-planner-multi-agent",
    letter: "A",
    title: "AI Travel Itinerary Planner with Multi-Agent System",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Multi-agent AI that plans flights, hotels, activities, and visa requirements simultaneously.",
    whatItDoes: "Uses CrewAI or AutoGen multi-agent framework where specialized agents handle flight research, hotel booking, local activity curation, and visa requirements. They coordinate to produce a complete 7-day itinerary.",
    realWorldUse: "Roam Around, Wonderplan, and Layla AI are travel planning startups. MakeMyTrip and Goibibo are building AI assistants. Travel planning is a $10B market perfect for AI agent automation.",
    examinerExpects: [
      "Input 'Mumbai to Bali, 7 days, budget ₹1 lakh' and get complete itinerary with real options.",
      "Show agents working in parallel and communicating decisions to each other.",
      "Demonstrate conflict resolution: hotel and flight dates conflict — agents negotiate.",
      "Show the final itinerary as a PDF with day-wise schedule."
    ],
    freeVivaQuestions: [
      "What is a multi-agent system and why is it better than a single LLM for this task?",
      "How do agents share context and avoid repeating the same API calls?",
      "What is agent hallucination and how do you verify that recommended hotels actually exist?"
    ],
    freeStep1Title: "Install CrewAI, define 4 specialized agents with roles/tools, and configure task dependencies",
    datasetName: "Skyscanner API (flights) + Google Places API (hotels/activities) + IATA visa requirements database"
  },
  {
    id: "open-source-chatgpt-local-llm-ui",
    letter: "O",
    title: "Open-Source ChatGPT: Local LLM UI with Ollama",
    category: "FullStack",
    difficulty: 3,
    buildTimeDays: "2–3 days",
    trending: true,
    tagline: "Run Llama-3, Mistral, and Phi-3 locally — build your own private ChatGPT interface.",
    whatItDoes: "Full-stack web application that runs local LLMs via Ollama API, with a polished chat interface supporting multi-turn conversation, model switching, system prompts, and conversation export.",
    realWorldUse: "Open WebUI has 30,000+ GitHub stars. AnythingLLM serves privacy-first enterprises. Indian companies with data residency requirements cannot use cloud LLMs — local LLM UIs are essential.",
    examinerExpects: [
      "Show live chat with Llama-3-8B running locally with no internet connection.",
      "Demonstrate system prompt configuration changing the AI's persona.",
      "Show real-time streaming response with token-by-token output.",
      "Present multi-model support switching between Mistral, Phi-3, and Llama-3."
    ],
    freeVivaQuestions: [
      "What is quantization and why does Q4_K_M enable Llama-3-8B to run on 8GB RAM?",
      "What is the difference between Llama, Mistral, and Phi-3 in terms of architecture and use case?",
      "What is streaming and how does Server-Sent Events enable real-time token output?"
    ],
    freeStep1Title: "Install Ollama, pull llama3 model, verify API at localhost:11434, then scaffold Next.js chat frontend",
    datasetName: "Ollama model library (Llama3, Mistral, Phi-3) + LMSYS Chatbot Arena benchmark results"
  },
  {
    id: "web-accessibility-ai-audit-tool",
    letter: "W",
    title: "AI-Powered Web Accessibility Audit Tool",
    category: "FullStack",
    difficulty: 3,
    buildTimeDays: "2–4 days",
    trending: true,
    tagline: "Scan any website for WCAG 2.1 accessibility violations and get AI-generated fix suggestions.",
    whatItDoes: "Playwright crawls a website, axe-core runs accessibility checks, and GPT-4o generates specific code-level fixes for each violation. Produces an executive report with severity prioritization.",
    realWorldUse: "India's Rights of Persons with Disabilities Act requires government websites to be WCAG 2.1 compliant. Deque Systems and Level Access are billion-dollar accessibility consulting firms.",
    examinerExpects: [
      "Scan a government website and show critical violations with WCAG criterion references.",
      "Show AI-generated fix for 'missing alt text on image' with the corrected HTML code.",
      "Demonstrate severity prioritization: critical > serious > moderate > minor.",
      "Present the PDF report formatted for a client presentation."
    ],
    freeVivaQuestions: [
      "What is WCAG 2.1 and what do the levels A, AA, and AAA mean?",
      "What is the difference between automated accessibility testing and manual screen reader testing?",
      "Why do color contrast requirements matter for users with color vision deficiency?"
    ],
    freeStep1Title: "Install axe-playwright, crawl test website, capture violations JSON, and build GPT-4 fix suggestion prompt",
    datasetName: "WebAIM Million accessibility report + WCAG 2.1 success criteria database"
  },
  {
    id: "autonomous-ai-agent-computer-use",
    letter: "A",
    title: "Autonomous Computer Control Agent",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "AI agent that takes screenshots, understands the screen, and controls the computer like a human.",
    whatItDoes: "Uses GPT-4V vision + PyAutoGUI to create an agent that can see the screen via screenshots, plan a sequence of actions, and execute them — browsing, form-filling, data extraction without API access.",
    realWorldUse: "Anthropic's Claude Computer Use, OpenAI Operator, and Microsoft's UFO are commercial versions of exactly this. RPA (Robotic Process Automation) is a $17B market. This is the cutting edge of AI agents.",
    examinerExpects: [
      "Give a task 'Go to Gmail, compose email to X with subject Y' and watch agent complete it.",
      "Show the vision-action loop: screenshot → GPT-4V analysis → PyAutoGUI action → repeat.",
      "Demonstrate error recovery when an element is not found on screen.",
      "Present the action space: click, type, scroll, keyboard shortcut taxonomy."
    ],
    freeVivaQuestions: [
      "What is the main difference between API-based automation (Selenium) and vision-based computer control?",
      "How does the agent handle dynamic UIs that change layout between sessions?",
      "What are the security risks of an AI agent with unrestricted computer access?"
    ],
    freeStep1Title: "Set up GPT-4V vision API, install PyAutoGUI and Pillow for screenshot capture, run first element detection test",
    datasetName: "ScreenSpot GUI grounding benchmark + OSWorld computer task evaluation dataset"
  }
];

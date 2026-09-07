/**
 * Project-specific academic content for all 9 SubmitKit projects.
 * Used by the IEEE report generator and PPT generator.
 */

export interface ProjectContent {
  slug: string;
  title: string;
  fullTitle: string;
  category: string;
  techStack: string[];
  abstract: string;
  problemStatement: string;
  objectives: string[];
  modules: { name: string; description: string }[];
  systemArchitecture: string;
  implementationDetails: string[];
  algorithmUsed: string;
  databaseDesign: string;
  testingStrategy: string;
  resultsAndDiscussion: string;
  conclusion: string;
  futureScope: string[];
  references: string[];
  pptSlides: {
    title: string;
    bullets: string[];
    speakerNote: string;
  }[];
}

const CONTENT_MAP: Record<string, ProjectContent> = {

  // ─────────────────────────────────────────────────────────────
  'healthcare-ehr-portal': {
    slug: 'healthcare-ehr-portal',
    title: 'HealthSync EHR & Telehealth Portal',
    fullTitle: 'HealthSync: A Unified Electronic Health Record and Telehealth Portal with Real-Time Telemetry and FDA Drug-Drug Interaction Safety Scanner',
    category: 'Healthcare IT',
    techStack: ['Next.js 14', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'Socket.IO', 'Redis', 'Docker', 'Tailwind CSS'],
    abstract: 'HealthSync is a comprehensive Electronic Health Record (EHR) and Telehealth platform designed to digitize and unify clinical workflows across hospital networks. The system integrates real-time patient vitals telemetry, secure video consultations, prescribing workflows with FDA Drug-Drug Interaction (DDI) safety scanning, and a cloud-based medical record repository accessible to authorized clinicians. Built with HIPAA-compliant architecture, HealthSync eliminates the fragmentation of paper-based records and proprietary silo systems that plague healthcare delivery. The system was validated across 500 simulated patient records, demonstrating a 94.7% reduction in prescribing errors and a 78% improvement in record retrieval speed compared to manual systems.',
    problemStatement: 'Hospitals worldwide continue to operate on fragmented, paper-based or siloed digital systems that compromise patient safety and clinical efficiency. A 2023 JAMA study found that 250,000 deaths annually in the US are linked to medical errors, many attributed to inaccessible patient history and drug interaction blindspots. Indian hospitals face additional challenges: 68% of tier-2 hospitals still use paper records (AIIMS 2022), patients carry physical files across departments, and emergency physicians lack critical allergy and medication history. Existing EHR solutions like Epic and Cerner cost ₹2-5 crore per installation, making them inaccessible to most Indian hospitals. HealthSync addresses this gap by providing an open-architecture, cloud-native EHR deployable on commodity hardware at a fraction of the cost.',
    objectives: [
      'Design and implement a HIPAA-compliant multi-role EHR system supporting Doctor, Nurse, Pharmacist, Billing, and Admin roles',
      'Build a real-time patient vitals telemetry dashboard with WebSocket-based live updates and threshold alerting',
      'Integrate the FDA OpenFDA Drug Interaction API to scan all new prescriptions against the patient\'s active medication list',
      'Implement secure video consultation (Telehealth) using WebRTC peer-to-peer connections with end-to-end encryption',
      'Create an HL7 FHIR R4 compliant REST API for interoperability with external health systems',
      'Demonstrate measurable improvement in prescribing safety and record retrieval efficiency vs. baseline manual systems',
    ],
    modules: [
      { name: 'Patient Management Module', description: 'CRUD operations for patient demographics, contact information, insurance details, and admission/discharge history. Implements row-level security ensuring staff access only their assigned patients. Generates unique Patient Health ID (PHID) compliant with India\'s ABDM framework.' },
      { name: 'Electronic Medical Records (EMR) Module', description: 'Append-only clinical notes system preventing post-facto tampering. Supports SOAP note templates (Subjective, Objective, Assessment, Plan), ICD-10-CM diagnostic coding, and CPT procedural coding. Amendments create new records referencing the original rather than modifying in-place.' },
      { name: 'Prescription & DDI Safety Module', description: 'Computerized Physician Order Entry (CPOE) with real-time FDA OpenFDA drug interaction scanning. Tiered alert system: hard stops for contraindicated combinations (e.g., warfarin + aspirin at high doses), soft stops with override capability for moderate interactions. Allergy cross-referencing against patient allergy list before every prescription.' },
      { name: 'Real-Time Vitals Telemetry Module', description: 'WebSocket-based live vitals streaming from bedside monitors. Configurable threshold alerts (e.g., SpO2 < 94%) with audible browser notification. Historical vitals charting with trend analysis using Chart.js. Integrated with nursing assessment workflows for four-hourly documentation.' },
      { name: 'Telehealth Video Consultation Module', description: 'WebRTC peer-to-peer video consultation with ICE/STUN/TURN server infrastructure. In-call prescription writing, screen sharing for radiology image review, and automatic session recording with patient consent. Queue management system with estimated wait times.' },
      { name: 'Pharmacy & Inventory Module', description: 'Medication dispensing workflow linked to CPOE prescriptions. Real-time drug inventory with reorder triggers at configurable thresholds. Barcode scanning for medication administration record (MAR) documentation, implementing the "five rights" safety check.' },
      { name: 'Billing & Insurance Module', description: 'Automated ICD-10 to insurance claim generation. Integration with India\'s Ayushman Bharat insurance scheme API for eligibility verification. PDF invoice generation with digital signature. Accounts receivable dashboard with aging analysis.' },
      { name: 'HL7 FHIR R4 Interoperability API', description: 'Standards-compliant REST API exposing Patient, Observation, MedicationRequest, Encounter, and DiagnosticReport FHIR resources. OAuth 2.0 SMART on FHIR authorization. Enables bidirectional data exchange with other EHR systems, government health registries, and research databases.' },
    ],
    systemArchitecture: 'HealthSync follows a modular monolith architecture with clearly bounded domain contexts, deployed as a containerized application on Docker. The frontend (Next.js) communicates with the backend via REST APIs for standard operations and WebSocket (Socket.IO) for real-time features. PostgreSQL stores transactional clinical data with row-level security enforced at the database level using Supabase Auth. Redis handles session management, rate limiting, and WebSocket pub/sub for multi-server deployments. An Nginx reverse proxy handles SSL termination and load balancing. All PHI data is encrypted at rest using AES-256-GCM with keys stored separately from data.',
    implementationDetails: [
      'Role-Based Access Control (RBAC) implemented with 6 distinct roles using a permissions table with 47 granular permission flags',
      'HTTP-only session cookies with 15-minute sliding expiry; refresh tokens stored in PostgreSQL with device fingerprinting',
      'Database schema in 3NF with 28 tables, 156 indexes, and 43 stored procedures for complex clinical calculations',
      'FHIR mapping layer converts between internal database schema and FHIR JSON using a custom transformer pipeline',
      'DDI scanning: each new prescription triggers an async FDA API call; results cached in Redis for 24 hours to minimize latency',
      'Audit logging captures every PHI access event with user, timestamp, IP, action type, and record identifiers in an immutable log table',
      'End-to-end encryption for video consultations using DTLS-SRTP; no video data passes through our servers',
    ],
    algorithmUsed: 'The Drug-Drug Interaction (DDI) detection system uses a multi-step algorithm: (1) Extract RxNorm codes for all active medications using the FDA RxNorm API. (2) Query the OpenFDA Drug Interaction endpoint for all pairwise combinations of the new prescription plus each existing medication. (3) Classify severity using NDF-RT (National Drug File - Reference Terminology) interaction severity codes. (4) Apply a decision tree: CONTRAINDICATED → hard stop requiring attending physician override, MAJOR → soft stop with mandatory clinical justification, MODERATE → advisory alert with single-click acknowledge, MINOR → background logging only. The complete DDI check completes in under 400ms for patients with up to 20 concurrent medications.',
    databaseDesign: 'The PostgreSQL database contains 28 normalized tables organized into 6 domain schemas: (1) identity (patients, staff, roles, permissions), (2) clinical (encounters, diagnoses, observations, medications), (3) pharmacy (inventory, dispensing, orders), (4) billing (claims, insurance, invoices), (5) audit (access_logs, change_logs), and (6) fhir_cache (pre-serialized FHIR resources for performance). Key design decisions: separate schemas prevent accidental cross-domain joins; the observations table uses PostgreSQL JSONB for flexible vital sign storage; the medications table stores RxNorm codes alongside local drug names for FHIR compliance.',
    testingStrategy: 'Testing was conducted at four levels: (1) Unit testing of business logic functions using Jest (187 tests, 94% coverage), (2) Integration testing of all 63 API endpoints using Supertest, (3) End-to-end testing of 12 critical clinical workflows using Playwright, (4) Security testing using OWASP ZAP automated scanning plus manual Burp Suite session. Performance testing using k6 demonstrated the system handles 500 concurrent users with p99 API latency under 350ms. HIPAA compliance assessment performed against the HIPAA Security Rule 164.312 checklist.',
    resultsAndDiscussion: 'System evaluation was conducted using 500 simulated patient records with clinician review panels. Key outcomes: DDI detection achieved 97.3% sensitivity and 99.1% specificity against a gold-standard pharmacist review. Prescription error rate reduced from 12.4% (manual baseline) to 0.65% (p < 0.001). Record retrieval time reduced from 8.3 minutes (paper) to 4.2 seconds. Telehealth consultations showed 94% patient satisfaction on the CAHPS survey instrument. System availability measured at 99.94% uptime over 90-day pilot period.',
    conclusion: 'HealthSync demonstrates that a HIPAA-compliant, interoperable EHR system can be built using open-source technologies and deployed at a cost accessible to Indian hospitals. The FDA DDI integration provides a safety layer that significantly reduces prescribing errors. Future adoption of India\'s ABDM framework will enable national health record portability. The telehealth module positions HealthSync as a complete care continuum platform for both urban and rural healthcare delivery.',
    futureScope: [
      'Integration with India\'s Ayushman Bharat Digital Mission (ABDM) Health ID for national patient identity',
      'AI-powered clinical decision support using fine-tuned medical LLMs for differential diagnosis suggestions',
      'IoT integration with wearable devices (smartwatches, continuous glucose monitors) for remote patient monitoring',
      'Predictive readmission risk scoring using gradient boosted trees trained on historical encounter data',
      'Mobile application (React Native) for patient-facing appointment booking and lab result access',
      'Multi-language support (Hindi, Kannada, Tamil) for rural healthcare worker adoption',
    ],
    references: [
      'Bates DW, et al. "The impact of computerized physician order entry on medication error prevention." JAMIA 1999.',
      'HL7 International. "HL7 FHIR R4 Specification." 2019. https://hl7.org/fhir/R4/',
      'US Department of Health. "HIPAA Security Rule 45 CFR Part 164." 2003.',
      'OpenFDA. "Drug Interaction API Documentation." FDA, 2023. https://open.fda.gov/drug/drugsfda/',
      'AIIMS New Delhi. "Digital Health Infrastructure Survey of Tier-2 Hospitals." 2022.',
      'Makary MA, Daniel M. "Medical error—the third leading cause of death in the US." BMJ 2016.',
      'Next.js Documentation. "App Router." Vercel, 2024. https://nextjs.org/docs',
      'PostgreSQL Global Development Group. "PostgreSQL 16 Documentation." 2023.',
      'Socket.IO. "WebSocket Real-Time Communication Library." 2023. https://socket.io',
      'Docker Inc. "Docker Container Platform Documentation." 2023.',
    ],
    pptSlides: [
      { title: 'HealthSync EHR & Telehealth Portal', bullets: ['A HIPAA-Compliant Electronic Health Record System', 'With Real-Time Telemetry & FDA Drug Safety Scanner', 'Developed for B.E. / B.Tech Final Year Project'], speakerNote: 'Good morning everyone. Today I will be presenting HealthSync — a unified Electronic Health Record and Telehealth platform that I developed as my final year project. This system addresses a critical gap in hospital digitization in India.' },
      { title: 'Problem Statement', bullets: ['250,000 deaths/year linked to medical errors (JAMA 2023)', '68% of Indian tier-2 hospitals still use paper records (AIIMS 2022)', 'Drug-drug interactions go undetected at point of prescribing', 'Existing EHR solutions cost ₹2–5 crore per installation', 'No interoperability between hospital systems'], speakerNote: 'The problem is stark. Medical errors kill more people than road accidents. Most of these are preventable — wrong drug combinations, missing allergy information, lost paper files. And existing digital solutions are simply too expensive for most Indian hospitals.' },
      { title: 'Proposed Solution', bullets: ['Open-source, cloud-native EHR deployable on commodity hardware', 'FDA OpenFDA DDI scanner built into prescribing workflow', 'Real-time vitals telemetry with threshold alerts', 'WebRTC telehealth video consultation', 'HL7 FHIR R4 compliant for interoperability'], speakerNote: 'HealthSync solves these problems with an affordable, modular system. The FDA drug interaction scanner is the flagship feature — it checks every new prescription against all the patient\'s current medications in under 400 milliseconds.' },
      { title: 'System Architecture', bullets: ['Frontend: Next.js 14 with Server-Side Rendering', 'Backend: Node.js REST API + Socket.IO WebSocket server', 'Database: PostgreSQL with Row-Level Security', 'Cache: Redis for sessions and DDI results', 'Container: Docker + Nginx reverse proxy', 'Video: WebRTC with DTLS-SRTP encryption'], speakerNote: 'The architecture follows a modular monolith pattern — one deployable unit but clearly separated domain contexts. This makes it affordable to deploy (single server) while keeping the codebase maintainable.' },
      { title: 'Key Modules', bullets: ['1. Patient Management & Admission', '2. Electronic Medical Records (SOAP Notes, ICD-10)', '3. Prescription & DDI Safety (FDA API)', '4. Real-Time Vitals Telemetry Dashboard', '5. Telehealth Video Consultation (WebRTC)', '6. Pharmacy & Inventory Management', '7. Billing & Insurance (Ayushman Bharat)', '8. HL7 FHIR R4 Interoperability API'], speakerNote: 'The system has 8 major modules. Each module was built as an independent bounded context with its own database schema, making future scaling straightforward.' },
      { title: 'DDI Safety Algorithm', bullets: ['Step 1: Extract RxNorm codes for all active medications', 'Step 2: Query FDA OpenFDA for all pairwise combinations', 'Step 3: Classify by NDF-RT severity (Contraindicated / Major / Moderate / Minor)', 'Step 4: Hard stop for Contraindicated — requires attending override', 'Step 5: Advisory alerts for Moderate/Minor — logged silently', 'Completes in < 400ms for up to 20 concurrent medications'], speakerNote: 'This is the technical heart of the system. Every time a doctor writes a prescription, this algorithm runs in the background and checks every possible drug pair combination against the FDA database.' },
      { title: 'Database Design', bullets: ['28 normalized tables in 3rd Normal Form (3NF)', '6 domain schemas: identity, clinical, pharmacy, billing, audit, fhir_cache', 'Row-Level Security enforced at PostgreSQL level', 'JSONB for flexible vital sign storage', 'Append-only audit log — no UPDATE or DELETE', '156 indexes for query optimization'], speakerNote: 'The database design was carefully planned. The audit log is particularly important for HIPAA compliance — every single access to patient data is recorded and cannot be modified.' },
      { title: 'Results & Performance', bullets: ['DDI Detection: 97.3% sensitivity, 99.1% specificity', 'Prescription error rate: 12.4% → 0.65% (94.7% reduction)', 'Record retrieval: 8.3 minutes → 4.2 seconds', 'p99 API latency: < 350ms at 500 concurrent users', '99.94% uptime over 90-day pilot period', '94% patient satisfaction on CAHPS survey'], speakerNote: 'The results speak for themselves. A 94.7% reduction in prescription errors is clinically significant. The system also proved to be highly available with 99.94% uptime.' },
      { title: 'Future Scope', bullets: ['ABDM Health ID integration for national patient identity', 'AI clinical decision support using medical LLMs', 'IoT wearable integration for remote patient monitoring', 'Predictive readmission risk scoring (Gradient Boosted Trees)', 'React Native mobile app for patient portal', 'Multi-language support: Hindi, Kannada, Tamil'], speakerNote: 'The foundation is strong. These extensions would transform HealthSync from a hospital system into a complete national health platform.' },
      { title: 'Conclusion', bullets: ['HealthSync proves open-source EHR is viable for Indian hospitals', 'FDA DDI integration measurably reduces life-threatening errors', 'FHIR R4 compliance enables national health record interoperability', 'Deployed cost: ~₹15,000/year vs ₹2 crore for proprietary systems', 'Ready for ABDM framework integration'], speakerNote: 'To conclude: HealthSync is a production-ready system that directly addresses India\'s healthcare digitization gap at a fraction of the cost of existing solutions. Thank you. I am happy to take your questions.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  'resume-parsing-engine': {
    slug: 'resume-parsing-engine',
    title: 'TalentScan AI ATS & Resume Parser',
    fullTitle: 'TalentScan: An NLP-Powered Applicant Tracking System with Semantic Resume Parsing and Automated Candidate Scoring',
    category: 'Artificial Intelligence & Machine Learning',
    techStack: ['Python 3.11', 'FastAPI', 'spaCy NLP', 'scikit-learn', 'Next.js 14', 'PostgreSQL', 'Redis', 'pdfminer.six'],
    abstract: 'TalentScan is an intelligent Applicant Tracking System (ATS) that leverages Natural Language Processing (NLP) to automatically parse resumes, extract structured entities (skills, education, experience), and score candidates against job descriptions using semantic similarity. The system processes PDF and DOCX resumes, identifies 200+ technical skills using a custom Named Entity Recognition (NER) model trained on 15,000 annotated resumes, and ranks candidates using a weighted multi-factor scoring algorithm. Evaluation on a held-out test set of 1,200 resumes demonstrated 91.3% entity extraction accuracy and a 0.87 Spearman rank correlation with human recruiter rankings.',
    problemStatement: 'Recruitment teams at mid-to-large organizations receive hundreds to thousands of applications per job posting. Manual screening of each resume is time-consuming, inconsistent, and susceptible to unconscious bias. Studies show recruiters spend an average of 7.4 seconds on initial resume review (Ladders, 2018). This superficial screening leads to qualified candidates being rejected based on formatting rather than merit, and underqualified candidates advancing due to keyword stuffing. Existing ATS systems like Workday and Greenhouse charge ₹50–200 per candidate processed, making them cost-prohibitive for Indian SMEs and startups. TalentScan provides an open-source, self-hosted alternative with superior NLP accuracy.',
    objectives: [
      'Build a multi-format resume parser supporting PDF, DOCX, and plain text inputs using pdfminer and python-docx',
      'Train a custom spaCy NER model to extract Name, Email, Phone, Skills, Education (degree/institution/year), and Work Experience (company/role/duration)',
      'Implement TF-IDF and sentence-transformer based semantic similarity scoring between resumes and job descriptions',
      'Design a weighted multi-factor candidate scoring algorithm balancing skills match, experience relevance, and education fit',
      'Build a recruiter-facing dashboard with candidate ranking, side-by-side comparison, and one-click shortlisting',
      'Validate system accuracy against human recruiter judgments on a 1,200-resume benchmark dataset',
    ],
    modules: [
      { name: 'Document Ingestion Module', description: 'Accepts PDF, DOCX, and TXT resumes via REST API or bulk upload. PDF text extraction using pdfminer.six with fallback to PyMuPDF for scanned PDFs via Tesseract OCR. DOCX parsing with python-docx. Normalizes whitespace, removes noise characters, and segments documents into logical sections (contact, summary, experience, education, skills).' },
      { name: 'NER Entity Extraction Module', description: 'Custom spaCy en_core_web_lg model fine-tuned with 15,000 manually annotated resume segments. Extracts 8 entity types: PERSON, EMAIL, PHONE, SKILL, DEGREE, INSTITUTION, COMPANY, DURATION. Custom skill taxonomy of 2,847 technical and soft skills across 18 domains. Post-processing with rule-based validators (email regex, phone number normalization, date parsing).' },
      { name: 'Job Description Parser', description: 'Extracts required/preferred skills, minimum experience, education requirements, and responsibilities from job posting text. Identifies MUST-HAVE vs NICE-TO-HAVE distinctions using dependency parsing. Builds a structured job requirement vector used for candidate scoring.' },
      { name: 'Candidate Scoring Engine', description: 'Multi-factor scoring: Skills Match Score (40%) = Jaccard similarity between candidate skills and JD required skills. Experience Score (35%) = years of relevant experience weighted by recency. Education Score (15%) = degree level match (B.E.=base, M.Tech=1.2x, PhD=1.4x). Semantic Similarity Score (10%) = cosine similarity between sentence-transformer embeddings of resume summary and JD overview.' },
      { name: 'Recruiter Dashboard', description: 'React-based SPA showing ranked candidate cards with score breakdown visualization. Side-by-side candidate comparison (up to 4 simultaneously). One-click shortlist/reject with auto-generated feedback emails. Pipeline view (Applied → Screened → Interview → Offer → Hired). Export shortlist to CSV or ATS integration webhooks.' },
      { name: 'Bias Detection Module', description: 'Flags potential bias vectors before scoring: removes name, gender pronouns, and graduation year from scoring inputs. Post-hoc analysis showing score distribution across demographic proxies. Alerts recruiters if shortlist gender ratio deviates >20% from applicant pool ratio.' },
    ],
    systemArchitecture: 'TalentScan uses a two-tier architecture: a Python FastAPI backend hosting the NLP models and scoring engine, and a Next.js frontend dashboard. The NLP pipeline runs as a background worker (Celery + Redis) to process resumes asynchronously without blocking API responses. Processed results are stored in PostgreSQL. The spaCy model is loaded once at startup and kept in memory for sub-100ms inference. A job queue ensures resume processing completes in order even under bulk upload scenarios.',
    implementationDetails: [
      'Custom NER model: 15,000 training examples, 80/10/10 split, trained for 30 epochs with dropout=0.2, achieving F1=0.913',
      'Sentence transformers: all-MiniLM-L6-v2 model for semantic similarity (384-dim embeddings, 14k tokens/sec on CPU)',
      'Skills taxonomy: 2,847 skills across 18 domains built from Stack Overflow Developer Survey + LinkedIn Skills taxonomy',
      'Bulk processing: Celery workers process resumes in parallel; 1,000 resumes processed in under 3 minutes',
      'Rate limiting: 10 API calls/minute for free tier, 100/minute for premium via Redis token bucket',
      'All PII stripped from ML training data and logs; only anonymized embeddings stored for model improvement',
    ],
    algorithmUsed: 'The candidate scoring algorithm is a weighted linear combination of four sub-scores, each normalized to [0, 100]. The Skills Match Score uses Jaccard similarity: |candidate_skills ∩ jd_skills| / |candidate_skills ∪ jd_skills| × 100. Experience Score uses a recency-weighted sum: Σ(duration_years × recency_weight) where recency_weight = e^(-0.1 × years_ago). Education Score applies ordinal mapping: No degree=0, Diploma=40, B.E./B.Tech=70, M.Tech/MBA=90, PhD=100, adjusted by field relevance. Semantic Similarity uses cosine distance between sentence-transformer embeddings of candidate summary and JD description. Final Score = 0.40×Skills + 0.35×Experience + 0.15×Education + 0.10×Semantic.',
    databaseDesign: 'PostgreSQL schema with 12 tables: job_postings, applications, resumes (raw text + parsed JSON), candidates (anonymized profiles), skills (taxonomy), candidate_skills (many-to-many), education_records, experience_records, scores, shortlists, pipeline_stages, audit_log. The resumes table stores both raw_text and parsed_entities (JSONB) for reprocessing without re-parsing. Indexes on candidate_id, job_id, and score columns support fast ranking queries.',
    testingStrategy: 'Model evaluation: held-out test set of 1,200 resumes annotated by 3 independent recruiters (consensus labels used). Entity extraction: precision=0.921, recall=0.905, F1=0.913. Ranking quality: Spearman ρ=0.87 vs human recruiter rankings on 200 job+applicant pairs. A/B testing against manual screening: TalentScan reduced time-to-shortlist by 73% while maintaining equivalent offer-acceptance rates (p=0.42, not statistically different).',
    resultsAndDiscussion: 'TalentScan achieved 91.3% entity extraction F1-score, exceeding the commercial benchmark (Sovren API: 89.7% on same test set). The 0.87 Spearman rank correlation with human recruiters is comparable to inter-recruiter agreement (ρ=0.81), demonstrating that the system ranks candidates as consistently as a trained human. Processing time: 0.8 seconds per resume (CPU), 0.2 seconds (GPU). The bias detection module identified statistically significant name-based bias in 3 of 10 test job postings, which would have been invisible in traditional screening.',
    conclusion: 'TalentScan demonstrates that NLP-powered resume screening can match human-level ranking consistency while being 73% faster and eliminating name-based bias. The custom spaCy NER model outperforms commercial alternatives at zero per-candidate cost. The system is production-ready and can be self-hosted by any organization, democratizing access to intelligent hiring tools.',
    futureScope: [
      'GPT-4 powered interview question generation personalized to each candidate\'s experience gaps',
      'Video interview analysis module with non-verbal communication scoring',
      'LinkedIn profile integration for automatic resume enrichment',
      'Salary benchmarking integration using Glassdoor API',
      'Multi-language resume support (Hindi, Tamil, Telugu) for Indian regional candidates',
    ],
    references: [
      'Manning CD, Schütze H. "Foundations of Statistical Natural Language Processing." MIT Press, 1999.',
      'Devlin J, et al. "BERT: Pre-training of Deep Bidirectional Transformers." NAACL 2019.',
      'spaCy. "Industrial-Strength Natural Language Processing." Explosion AI, 2023. https://spacy.io',
      'Reimers N, Gurevych I. "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks." EMNLP 2019.',
      'The Ladders. "Tracking the Eye of the Recruiter." 2018.',
      'FastAPI. "Modern, Fast Web Framework for Building APIs with Python." 2023.',
      'Scikit-learn. "Machine Learning in Python." JMLR 2011.',
      'PostgreSQL Documentation v16. PostgreSQL Global Development Group, 2023.',
    ],
    pptSlides: [
      { title: 'TalentScan AI ATS & Resume Parser', bullets: ['NLP-Powered Applicant Tracking System', 'Semantic Resume Parsing & Automated Candidate Scoring', 'Final Year Project — AI/ML'], speakerNote: 'Good morning. Today I present TalentScan — an AI system that reads resumes the way a trained recruiter does, but 73% faster and without unconscious bias.' },
      { title: 'Problem Statement', bullets: ['Recruiters spend avg. 7.4 seconds on initial resume review (Ladders, 2018)', 'Hundreds of applications per job — manual screening is impossible', 'Qualified candidates rejected due to formatting, not merit', 'Keyword stuffing defeats traditional ATS systems', 'Commercial ATS charge ₹50–200 per candidate'], speakerNote: 'The recruitment problem is a data volume problem. Humans cannot fairly evaluate hundreds of applications. Existing solutions are either too simplistic or too expensive.' },
      { title: 'Proposed Solution — TalentScan', bullets: ['Custom spaCy NER model extracts 8 entity types from any resume format', 'Multi-factor scoring: Skills 40% + Experience 35% + Education 15% + Semantic 10%', 'Bias detection removes name and gender from scoring pipeline', 'Processes 1,000 resumes in under 3 minutes', 'Self-hosted — zero per-candidate cost'], speakerNote: 'TalentScan uses a custom-trained NLP model — not a generic one — specifically trained on 15,000 real resume annotations to extract exactly the information recruiters care about.' },
      { title: 'System Architecture', bullets: ['Python FastAPI backend with spaCy NLP engine', 'Celery + Redis asynchronous job queue for bulk processing', 'sentence-transformers for semantic similarity (384-dim embeddings)', 'Next.js recruiter dashboard', 'PostgreSQL with JSONB for flexible parsed data storage'], speakerNote: 'The key architectural decision was separating NLP processing into async workers. This means uploading 500 resumes doesn\'t block the API — they queue and process in parallel.' },
      { title: 'NER Model — Training & Performance', bullets: ['Base: spaCy en_core_web_lg fine-tuned on 15,000 annotated resume segments', 'Entities: Name, Email, Phone, Skill, Degree, Institution, Company, Duration', 'Training: 30 epochs, dropout=0.2, 80/10/10 split', 'Test Set F1 Score: 0.913 (91.3% accuracy)', 'Outperforms Sovren commercial API: 89.7% on same benchmark'], speakerNote: 'The NER model is what makes TalentScan competitive. We trained it on domain-specific data, which is why it outperforms the commercial API that uses generic models.' },
      { title: 'Scoring Algorithm', bullets: ['Skills Match (40%): Jaccard similarity with JD required skills', 'Experience (35%): Recency-weighted sum of relevant years', 'Education (15%): Ordinal degree level × field relevance', 'Semantic Similarity (10%): Cosine distance of sentence embeddings', 'Final = 0.40×S + 0.35×E + 0.15×Ed + 0.10×Sem'], speakerNote: 'The scoring weights were determined empirically by correlation analysis with recruiter outcomes across 200 test cases. Skills and experience dominate because they showed highest predictive validity.' },
      { title: 'Results', bullets: ['Entity Extraction F1: 0.913 vs commercial benchmark 0.897', 'Spearman rank correlation with human recruiters: ρ = 0.87', 'Inter-recruiter agreement: ρ = 0.81 (system matches human consistency)', 'Time-to-shortlist: 73% faster than manual screening', 'Processing speed: 0.8 sec/resume (CPU), 0.2 sec (GPU)'], speakerNote: 'The key validation result is the 0.87 Spearman correlation — this means TalentScan ranks candidates as consistently as a trained human recruiter. The A/B test showed equivalent hire quality at 73% less screening time.' },
      { title: 'Bias Detection Feature', bullets: ['Name, gender pronouns, graduation year removed before scoring', 'Post-hoc score distribution analysis across demographic proxies', 'Alerts if shortlist gender ratio deviates >20% from applicant pool', 'Found name-based bias in 3 of 10 test job postings', 'Invisible in traditional keyword-matching ATS systems'], speakerNote: 'This is a feature I am particularly proud of. Traditional ATS systems perpetuate human bias. TalentScan actively detects and flags it, making the hiring process fairer.' },
      { title: 'Future Scope', bullets: ['GPT-4 interview question generation from candidate gaps', 'Video interview non-verbal analysis', 'LinkedIn profile auto-enrichment', 'Multi-language support: Hindi, Tamil, Telugu', 'Salary benchmarking via Glassdoor API integration'], speakerNote: 'The foundation is solid. Adding LLM-powered interview question generation would complete the full recruitment workflow from application to offer.' },
      { title: 'Conclusion', bullets: ['Custom NER model achieves 91.3% F1 — above commercial benchmark', 'Ranking quality matches human consistency (ρ = 0.87)', '73% faster screening with equivalent hire quality', 'Zero per-candidate cost vs ₹50–200 for commercial solutions', 'Bias detection makes hiring measurably fairer'], speakerNote: 'TalentScan proves that domain-specific NLP training produces superior results over generic commercial solutions. The bias detection feature adds a dimension of fairness that no commercial ATS currently offers. Thank you.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  'credit-card-fraud': {
    slug: 'credit-card-fraud',
    title: 'SentinelPay AI Fraud Radar',
    fullTitle: 'SentinelPay: A Sub-12ms Real-Time Credit Card Fraud Detection System using Ensemble Machine Learning with Impossible Travel and Velocity Flood Detection',
    category: 'Financial Technology (FinTech)',
    techStack: ['Python 3.11', 'XGBoost', 'scikit-learn', 'FastAPI', 'Next.js 14', 'PostgreSQL', 'Redis', 'Apache Kafka'],
    abstract: 'SentinelPay is a real-time credit card fraud detection system that intercepts fraudulent transactions in under 12 milliseconds using an ensemble of XGBoost and Isolation Forest models. The system implements three specialized detection engines: (1) ML-based transaction anomaly detection trained on 284,807 transaction records from the Kaggle Credit Card Fraud dataset, (2) Impossible Travel detection flagging geographically improbable transaction sequences, and (3) Card Velocity Flood detection identifying brute-force testing patterns. The ensemble model achieves 99.94% accuracy, 0.978 AUC-ROC, with a false positive rate of 0.23% — significantly below the industry average of 0.5-2%.',
    problemStatement: 'Global credit card fraud losses exceeded $32.34 billion in 2021 (Nilson Report) with India experiencing a 46% year-on-year increase in digital payment fraud (RBI Annual Report 2023). Traditional rule-based fraud systems (velocity checks, geographic blocks) generate 2-5% false positive rates, causing legitimate transactions to be declined and eroding customer trust. Machine learning approaches in literature are typically batch-processed (hourly/daily), making them ineffective against real-time fraud. The challenge is building an ML-based system that achieves sub-second inference (required for payment authorization flow) while maintaining high precision to avoid false declines.',
    objectives: [
      'Train an XGBoost classifier on the Kaggle Credit Card Fraud dataset (284,807 transactions, 0.172% fraud rate) achieving AUC-ROC > 0.95',
      'Implement Isolation Forest for unsupervised anomaly detection of novel fraud patterns not in training data',
      'Build Impossible Travel detection using Haversine distance formula and maximum human travel speed constraints',
      'Implement Card Velocity Flood detection to identify automated card testing attacks',
      'Achieve end-to-end fraud scoring latency under 12ms to fit within payment authorization timeouts',
      'Build a fraud analyst dashboard with case management, pattern analysis, and model performance monitoring',
    ],
    modules: [
      { name: 'Transaction Ingestion Module', description: 'Apache Kafka consumer ingesting transaction events from payment processor webhook. Each event contains: card_hash (SHA-256), amount, merchant_category, timestamp, geolocation (lat/lng), device_fingerprint, IP address. Events processed in real-time stream; no batch buffering that would add latency.' },
      { name: 'Feature Engineering Pipeline', description: 'Derives 47 features from raw transaction data in real-time: transaction amount percentile vs. cardholder history, time-of-day and day-of-week encoding, merchant category frequency, geographic distance from home location, velocity features (transactions in last 1/5/60 minutes), and PCA-transformed V1-V28 anonymous features from the Kaggle dataset.' },
      { name: 'XGBoost Fraud Classifier', description: 'Gradient boosted trees model trained with scale_pos_weight=580 to handle 0.172% class imbalance. 500 estimators, max_depth=6, learning_rate=0.01. SMOTE oversampling during training. Feature importance analysis identifies V14, V10, V12, V17, V4 as top fraud indicators. Model serialized with joblib for sub-millisecond inference.' },
      { name: 'Isolation Forest Novelty Detector', description: 'Unsupervised anomaly detection for zero-day fraud patterns. 200 trees, contamination=0.001. Detects transactions that are statistically anomalous even if they don\'t match known fraud patterns. Combined with XGBoost via weighted average: 0.7×XGBoost + 0.3×IsolationForest.' },
      { name: 'Impossible Travel Engine', description: 'Calculates Haversine distance between consecutive transactions on the same card. Computes implied travel speed. Flags as suspicious if speed exceeds 900 km/h (jet aircraft maximum). Accounts for time zones and uses a 30-minute minimum travel time buffer for airport transitions.' },
      { name: 'Velocity Flood Detector', description: 'Redis ZSET maintains rolling window of transaction timestamps per card. Detects: >5 transactions in 60 seconds (velocity flooding), >3 declined transactions in 10 minutes (card testing), same merchant with amount variations in <30 seconds (balance probing). Each pattern generates a fraud signal score 0-100.' },
      { name: 'Decision Engine', description: 'Combines all signal scores using a weighted ensemble. If combined score > 85: BLOCK (real-time decline). Score 60-85: FLAG (allow but queue for analyst review). Score 30-60: MONITOR (log and update model). Score < 30: APPROVE. Decision made in <12ms end-to-end from event receipt to decision output.' },
      { name: 'Fraud Analyst Dashboard', description: 'Case queue with prioritized fraud alerts. Transaction timeline view showing the suspicious sequence leading to the flag. Geographic map of transaction locations. Model performance metrics: precision, recall, AUC-ROC, false positive rate updated in real-time. Manual review workflow with approve/block decision recording for model retraining.' },
    ],
    systemArchitecture: 'SentinelPay uses an event-driven architecture with Apache Kafka as the transaction stream backbone. FastAPI exposes the fraud scoring endpoint. All ML models are loaded into memory at startup (no cold inference overhead). Redis caches cardholder history and velocity counters with TTL expiry. PostgreSQL stores transaction records and fraud cases. The entire scoring pipeline (feature engineering + 2 models + 3 rule engines + decision logic) runs in under 12ms on standard commodity hardware.',
    implementationDetails: [
      'XGBoost model training: 227,845 train / 28,481 validation / 28,481 test split; SMOTE ratio 1:10 minority oversampling',
      'Haversine formula for great-circle distance: d = 2r × arcsin(√(sin²(Δlat/2) + cos(lat1)cos(lat2)sin²(Δlng/2)))',
      'Redis ZSET for velocity counting: ZADD key timestamp member, ZRANGEBYSCORE key (now-window) now, ZCARD for count',
      'Feature scaling: StandardScaler fit on training set, transform-only on inference to prevent data leakage',
      'Model versioning: each model version tagged with git SHA; A/B testing framework routes 5% traffic to challenger model',
      'Latency breakdown: Kafka consume 0.5ms, feature eng. 2ms, XGBoost 1ms, IsoForest 3ms, rules 0.5ms, total ~12ms',
    ],
    algorithmUsed: 'Primary: XGBoost (Extreme Gradient Boosting) — an ensemble of decision trees where each tree corrects the errors of the previous, with gradient descent optimization. Handles class imbalance via scale_pos_weight. Key hyperparameters: n_estimators=500, max_depth=6, learning_rate=0.01, subsample=0.8, colsample_bytree=0.8. Secondary: Isolation Forest — builds random trees isolating anomalies; fraud transactions are isolated in fewer splits (shorter path length) than normal transactions. Combination: Stacked ensemble with logistic regression meta-learner trained on out-of-fold predictions from both base models.',
    databaseDesign: 'PostgreSQL with 8 tables: transactions (raw events), fraud_scores (model outputs per transaction), fraud_cases (analyst-managed investigations), cardholder_profiles (aggregated behavioral baseline), velocity_events (timestamped transaction log for velocity calculation), model_versions (ML model metadata), analyst_decisions (manual review outcomes for retraining), rules_config (configurable thresholds for rule-based engines).',
    testingStrategy: 'Model evaluation on 28,481 held-out transactions: Accuracy=99.94%, Precision=0.978, Recall=0.891, F1=0.932, AUC-ROC=0.978. False positive rate=0.23% (industry average: 0.5-2%). Latency testing: 10,000 synthetic transactions processed; p50=8ms, p95=11ms, p99=12ms. Load testing: 1,000 concurrent transactions/second sustained for 60 seconds without degradation.',
    resultsAndDiscussion: 'SentinelPay achieves 99.94% accuracy with 0.978 AUC-ROC on the Kaggle benchmark, matching state-of-the-art published results (Pozzolo et al., 2018: AUC=0.975). The 0.23% false positive rate is 2-8x lower than rule-based systems, translating to significantly fewer legitimate transactions being declined. The sub-12ms latency fits within Visa/Mastercard authorization timeout requirements (<100ms). The Impossible Travel engine correctly identified 100% of manually injected impossible travel test cases.',
    conclusion: 'SentinelPay demonstrates that ensemble ML fraud detection can be deployed in real-time payment authorization flows with superior accuracy and lower false positive rates than traditional rule-based systems. The combination of supervised (XGBoost), unsupervised (Isolation Forest), and rule-based (Impossible Travel, Velocity Flood) detection provides defense-in-depth against both known and novel fraud patterns.',
    futureScope: [
      'Graph neural network analysis of transaction relationship networks to detect organized fraud rings',
      'Federated learning across multiple banks to improve model without sharing customer data',
      'Explainability module using SHAP values to generate human-readable fraud reasons for compliance',
      'Integration with NPCI (National Payments Corporation of India) fraud intelligence sharing network',
      'Real-time model updating using online learning to adapt to concept drift',
    ],
    references: [
      'Dal Pozzolo A, et al. "Learned lessons in credit card fraud detection from a practitioner perspective." Expert Systems with Applications, 2015.',
      'Chen T, Guestrin C. "XGBoost: A Scalable Tree Boosting System." KDD 2016.',
      'Liu FT, et al. "Isolation Forest." IEEE ICDM 2008.',
      'Nilson Report. "Global Card Fraud Losses Forecasts." Issue 1209, 2021.',
      'Reserve Bank of India. "Annual Report 2022-23." RBI, 2023.',
      'Apache Kafka Documentation. "Kafka Streams for Real-Time Processing." Confluent, 2023.',
      'Pedregosa F, et al. "Scikit-learn: Machine Learning in Python." JMLR 2011.',
      'Redis Documentation. "Sorted Sets for Time-Series Data." Redis Inc., 2023.',
    ],
    pptSlides: [
      { title: 'SentinelPay: AI Fraud Radar', bullets: ['Sub-12ms Real-Time Credit Card Fraud Detection', 'Ensemble ML: XGBoost + Isolation Forest', 'Final Year Project — FinTech / AI-ML'], speakerNote: 'Good morning. I am presenting SentinelPay — a real-time fraud detection system that makes its decision in under 12 milliseconds, fast enough to intercept fraud before the payment is authorized.' },
      { title: 'Problem Statement', bullets: ['$32.34 billion in global card fraud losses (Nilson Report, 2021)', 'India: 46% YoY increase in digital payment fraud (RBI 2023)', 'Rule-based systems: 2-5% false positive rate — legitimate transactions declined', 'Batch ML systems process hourly/daily — too slow for real-time fraud', 'Visa/Mastercard require fraud decision in < 100ms'], speakerNote: 'The fraud problem is enormous and growing. The challenge is not just detecting fraud accurately, but doing it in under 100 milliseconds inside the payment authorization flow.' },
      { title: 'System Architecture', bullets: ['Apache Kafka: transaction event stream', 'Feature Engineering: 47 derived features in 2ms', 'XGBoost Classifier: 1ms inference (500 trees)', 'Isolation Forest: novel anomaly detection', 'Impossible Travel Engine: Haversine distance check', 'Velocity Flood Detector: Redis ZSET rolling windows', 'Total latency: < 12ms end-to-end'], speakerNote: 'The architecture was designed around the 12ms constraint. Every component was profiled and optimized. Loading models into memory at startup eliminates any cold inference penalty.' },
      { title: 'ML Models Used', bullets: ['XGBoost: 500 trees, max_depth=6, SMOTE for class imbalance', 'Training data: 284,807 transactions (0.172% fraud rate)', 'Isolation Forest: 200 trees, contamination=0.001', 'Ensemble: 0.7 × XGBoost + 0.3 × IsolationForest', 'Meta-learner: Logistic Regression on OOF predictions'], speakerNote: 'I chose XGBoost as the primary model because it consistently wins fraud detection competitions. The Isolation Forest handles zero-day fraud patterns that XGBoost has never seen in training.' },
      { title: 'Impossible Travel Detection', bullets: ['Calculates Haversine great-circle distance between consecutive transactions', 'Computes implied travel speed: distance ÷ time', 'Threshold: > 900 km/h flags as impossible (jet aircraft max)', '30-minute buffer for airport transitions', '100% detection rate on manually injected test cases'], speakerNote: 'If your card is used in Mumbai at 10am and in New York at 10:15am, that is physically impossible. This rule catches a class of account takeover fraud that pure ML often misses.' },
      { title: 'Results', bullets: ['Accuracy: 99.94% on 28,481 held-out transactions', 'AUC-ROC: 0.978 (SOTA benchmark: 0.975)', 'False Positive Rate: 0.23% (industry avg: 0.5-2%)', 'p99 Latency: 12ms (Visa requirement: < 100ms)', 'Load test: 1,000 transactions/second, 60 seconds sustained'], speakerNote: 'The false positive rate is the number I am most proud of. 0.23% means only 23 out of 10,000 legitimate transactions are incorrectly flagged. That is 2-8x better than rule-based systems.' },
      { title: 'Fraud Analyst Dashboard', bullets: ['Real-time alert queue with fraud probability scores', 'Transaction timeline with suspicious sequence highlighted', 'Geographic map of transaction locations', 'Model KPIs: Precision, Recall, AUC updated live', 'Manual review → approve/block → fed back to model retraining'], speakerNote: 'The dashboard closes the feedback loop. Every analyst decision is recorded and used to retrain the model, so it continuously improves over time.' },
      { title: 'Future Scope', bullets: ['Graph Neural Networks for fraud ring detection', 'Federated learning across banks (no data sharing)', 'SHAP explainability for compliance reporting', 'NPCI fraud intelligence sharing network integration', 'Online learning for real-time model updating'], speakerNote: 'The next evolution is federated learning — multiple banks training a shared model without sharing customer data. This would dramatically increase the training data pool.' },
      { title: 'Conclusion', bullets: ['99.94% accuracy matching state-of-the-art published benchmarks', '0.23% false positive rate — 2-8x lower than rule-based systems', 'Sub-12ms latency fits within Visa/Mastercard authorization flow', 'Three detection engines: ML + Impossible Travel + Velocity Flood', 'Production-ready, scalable to 1,000+ TPS'], speakerNote: 'SentinelPay is not just an academic exercise — it is a production-ready system. The combination of ML and rule-based detection gives it both the accuracy of AI and the explainability of rules. Thank you.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  'phishing-detector-ai': {
    slug: 'phishing-detector-ai',
    title: 'PhishGuard AI Threat Radar',
    fullTitle: 'PhishGuard: A Zero-Day Phishing URL Detection System using Ensemble Machine Learning with Homoglyph Scanning and Automated ICANN Takedown Workflow',
    category: 'Cybersecurity',
    techStack: ['Python 3.11', 'Random Forest', 'XGBoost', 'FastAPI', 'Next.js 14', 'PostgreSQL', 'Redis', 'WHOIS API'],
    abstract: 'PhishGuard is an AI-powered phishing URL detection system that achieves 98.7% detection accuracy with sub-50ms inference latency. The system extracts 87 URL features spanning lexical, DNS, WHOIS, HTML content, and certificate analysis, feeding them into an XGBoost + Random Forest ensemble. A novel Cyrillic IDN Homoglyph scanner detects visually deceptive lookalike domains (e.g., pаypal.com using Cyrillic "а"). An automated ICANN abuse report workflow reduces mean takedown time from 72 hours to under 4 hours. Evaluated on a 50,000 URL dataset (PhishTank + Alexa top-1M), the system demonstrates superior detection of zero-day phishing sites that evade traditional blacklist-based defenses.',
    problemStatement: 'Phishing remains the most prevalent cybercrime vector, responsible for 36% of all data breaches (Verizon DBIR 2023). Traditional blacklist-based defenses (Google Safe Browsing, PhishTank) have a 72-hour lag between site creation and blacklisting — more than sufficient time for targeted attacks. Zero-day phishing sites use IDN homoglyphs (Unicode characters visually identical to ASCII), brand-new domain registrations, and SSL certificates (90% of phishing sites now have valid SSL) to evade detection. Machine learning approaches in the literature achieve 95-97% accuracy but typically require HTML fetching, adding 300-500ms latency unsuitable for real-time browser protection.',
    objectives: [
      'Extract 87 features from URLs using lexical analysis alone (no HTML fetching required) for sub-50ms inference',
      'Train an XGBoost + Random Forest ensemble on 50,000 labeled URLs from PhishTank and Alexa top-1M',
      'Implement Cyrillic and other Unicode homoglyph detection to identify IDN-based deception attacks',
      'Build automated ICANN abuse report generation and submission workflow',
      'Develop a browser extension prototype and a REST API for integration with email security gateways',
      'Achieve > 98% detection accuracy with < 0.5% false positive rate',
    ],
    modules: [
      { name: 'URL Feature Extraction Engine', description: 'Extracts 87 features in 4 categories: (1) Lexical (URL length, special character ratios, entropy, TLD risk score, subdomain depth), (2) DNS (domain age, WHOIS registration date, nameserver reputation, MX record presence), (3) Certificate (certificate age, SAN count, issuer reputation), (4) Contextual (brand name embedding distance, Alexa rank when available). All features derivable without HTML fetching in < 20ms.' },
      { name: 'Homoglyph Scanner', description: 'Unicode confusable character database from Unicode.org covering Cyrillic, Greek, Latin lookalikes. For each domain, checks all characters against confusable mapping. If homoglyph substitution produces a known legitimate brand domain (Apple, PayPal, Amazon, 500+ brands), flags as IDN homoglyph attack with confidence score. Also detects Punycode-encoded domains that display as legitimate ASCII in browser address bar.' },
      { name: 'ML Ensemble Classifier', description: 'XGBoost (400 trees, max_depth=5) trained on phishing-specific features. Random Forest (300 trees, max_features=sqrt) as diversity provider. Both trained on 40,000 training URLs with 80/20 split. Ensemble combines predictions via soft voting with learned weights (XGBoost: 0.6, RF: 0.4) from a logistic regression meta-learner. Complete pipeline inference: < 10ms.' },
      { name: 'Real-Time Threat Scoring API', description: 'FastAPI endpoint accepting URL strings, returning threat score (0-100), feature vector, detection reasons, and recommended action (BLOCK/WARN/ALLOW). Rate-limited to 1,000 requests/minute per API key. Results cached in Redis for 1 hour — identical URLs return cached result in < 1ms.' },
      { name: 'ICANN Abuse Report Automation', description: 'On BLOCK decision, automatically generates ICANN-compliant abuse report including: registrar contact lookup via RDAP protocol, screenshot evidence via headless Chromium, threat classification, and pre-filled report template. Submits to registrar abuse email. Tracks submission and monitors domain status. Mean takedown achieved: 3.8 hours vs. 72-hour manual baseline.' },
      { name: 'Threat Intelligence Dashboard', description: 'Real-time feed of detected phishing URLs with geographic origin mapping. Time-series chart of daily phishing attempts. Top targeted brands. Model performance metrics. Analyst review queue for borderline cases. Export functionality for threat intelligence sharing.' },
    ],
    systemArchitecture: 'PhishGuard uses a three-tier architecture: (1) Feature Extraction Service (Python) running DNS/WHOIS lookups and computing the 87-feature vector, (2) ML Inference Service (FastAPI) hosting the XGBoost+RF ensemble, (3) Dashboard (Next.js). Redis caches feature vectors and decisions to prevent redundant processing. PostgreSQL stores all URL decisions and analyst feedback. A background worker handles ICANN report submission asynchronously without blocking the scoring response.',
    implementationDetails: [
      'Feature engineering: URL entropy calculated using Shannon entropy H(X) = -Σ p(x) log₂ p(x) over character frequencies',
      'WHOIS data cached in Redis with 24-hour TTL to avoid rate limit violations from WHOIS providers',
      'Homoglyph database: 7,943 Unicode confusable pairs covering 40 scripts, from Unicode.org TR#36',
      'Model training: Stratified K-fold cross-validation (k=5) to preserve class balance; threshold tuned to maximize F1',
      'False positive analysis: All FP errors were legitimate sites with URL patterns statistically similar to phishing (short-lived promo URLs)',
      'RDAP protocol used for registrar lookup instead of legacy WHOIS for structured JSON responses',
    ],
    algorithmUsed: 'Random Forest: ensemble of 300 decision trees each trained on a bootstrap sample with random feature subset (√87 ≈ 9 features). Predictions averaged across trees, providing variance reduction and resistance to overfitting. XGBoost: gradient boosting with 400 trees, learning_rate=0.05, subsample=0.8. Particularly effective on the URL length and entropy features. Ensemble meta-learner: Logistic Regression trained on out-of-fold predictions from both base models (stacking), determining optimal weighting (XGB: 0.60, RF: 0.40).',
    databaseDesign: 'PostgreSQL with 7 tables: url_scans (all scan records), threat_decisions (ML output per scan), homoglyph_alerts (IDN detections), icann_reports (takedown submissions and status), brand_registry (500+ monitored brands), model_versions, analyst_reviews. Indexed on domain, scan_timestamp, and threat_score for fast dashboard queries.',
    testingStrategy: 'Evaluation on 10,000 held-out URLs (5,000 phishing from PhishTank, 5,000 benign from Alexa). Accuracy=98.7%, Precision=0.989, Recall=0.985, F1=0.987, AUC-ROC=0.994. False positive rate=0.8%. Homoglyph scanner tested against 200 manually crafted IDN homoglyph domains: 100% detection. Latency testing: p50=28ms, p95=45ms, p99=49ms (well under 50ms target).',
    resultsAndDiscussion: 'PhishGuard achieves 98.7% accuracy, exceeding the literature benchmark for URL-only classifiers (Sahoo et al., 2019: 97.3%). The IDN homoglyph scanner detects a class of attacks that pure ML misses entirely. The automated ICANN workflow reduced mean takedown time from 72 hours to 3.8 hours — a 95% reduction. Zero-day detection capability (no blacklist dependency) is the key differentiator over production systems like Google Safe Browsing.',
    conclusion: 'PhishGuard demonstrates that ensemble ML combined with specialized detection modules (homoglyph scanning, domain aging) can achieve near-human-expert detection accuracy for phishing URLs in real-time. The automated ICANN workflow transforms the system from a passive detector to an active threat neutralizer. The sub-50ms latency makes it suitable for real-time browser extension integration.',
    futureScope: [
      'Browser extension (Chrome/Firefox) for real-time URL scanning on navigation events',
      'Email gateway plugin scanning all links in incoming emails before delivery',
      'GPT-4 powered phishing email body analysis in addition to URL analysis',
      'Threat intelligence API sharing with VirusTotal and MISP platforms',
      'Graph analysis of phishing campaign infrastructure to take down entire hosting networks',
    ],
    references: [
      'Sahoo D, et al. "Malicious URL Detection using Machine Learning." ACM Computing Surveys, 2019.',
      'Verizon. "2023 Data Breach Investigations Report." Verizon, 2023.',
      'Unicode Consortium. "Unicode Security Mechanisms TR#39." Unicode.org, 2022.',
      'ICANN. "Registrar Accreditation Agreement, Abuse Contact Requirements." ICANN, 2021.',
      'RDAP Protocol. "RFC 7483 — JSON Responses for RDAP." IETF, 2015.',
      'Chen T, Guestrin C. "XGBoost: A Scalable Tree Boosting System." KDD 2016.',
      'Breiman L. "Random Forests." Machine Learning, 45(1), 2001.',
    ],
    pptSlides: [
      { title: 'PhishGuard: AI Phishing Detector', bullets: ['Zero-Day Phishing URL Detection using Ensemble ML', 'Homoglyph Scanner + Automated ICANN Takedown', 'Final Year Project — Cybersecurity'], speakerNote: 'Good morning. I present PhishGuard — a system that detects phishing websites in under 50 milliseconds, including attacks that use invisible Unicode tricks to fool the human eye.' },
      { title: 'The Problem', bullets: ['36% of data breaches start with phishing (Verizon DBIR 2023)', 'Zero-day sites evade blacklists for 72+ hours', '90% of phishing sites now have valid SSL certificates', 'IDN homoglyph attacks: pаypal.com looks identical to paypal.com', 'Traditional browser protection cannot detect novel phishing sites'], speakerNote: 'The homoglyph problem is particularly insidious. The "a" in pаypal.com is actually a Cyrillic character, indistinguishable to the human eye. Even security professionals get fooled.' },
      { title: 'Solution: PhishGuard', bullets: ['87-feature ML pipeline using URL+DNS+WHOIS (no HTML fetching)', 'XGBoost + Random Forest ensemble: 98.7% accuracy', 'Cyrillic/Unicode homoglyph scanner for IDN attacks', 'Automated ICANN abuse report: 72hr → 3.8hr takedown', 'REST API for browser extensions and email gateways'], speakerNote: 'The key design decision was no HTML fetching. Fetching and rendering HTML adds 300-500ms. By extracting features from URL, DNS, and WHOIS alone, we stay under 50ms.' },
      { title: 'Feature Engineering', bullets: ['Lexical: URL entropy, length, special chars, TLD risk score', 'DNS: Domain age, WHOIS date, nameserver reputation', 'Certificate: Age, SAN count, issuer trust score', 'Brand proximity: Embedding distance to 500+ known brands', 'Total: 87 features extracted in < 20ms'], speakerNote: 'URL entropy is particularly powerful. Phishing URLs have high character entropy because attackers add random strings. Legitimate brands have clean, low-entropy URLs.' },
      { title: 'Homoglyph Scanner', bullets: ['Unicode confusable database: 7,943 pairs across 40 scripts', 'Cyrillic а ≈ Latin a, Greek ο ≈ Latin o, etc.', 'For each domain: remap homoglyphs → check against brand registry', 'Punycode decoding exposes xn-- encoded deception', '100% detection on 200 manually crafted IDN test cases'], speakerNote: 'We built this against the official Unicode confusable character database. This is the same reference used by ICANN for domain registration abuse checks.' },
      { title: 'Results', bullets: ['Accuracy: 98.7% on 10,000 held-out URLs', 'AUC-ROC: 0.994', 'False Positive Rate: 0.8%', 'p99 Latency: 49ms', 'ICANN Takedown: 72hrs → 3.8hrs (95% reduction)', 'Zero-day detection: no blacklist dependency'], speakerNote: 'The 95% reduction in takedown time is arguably the most impactful result. Detecting a phishing site is only half the solution — taking it down before victims are harmed is the other half.' },
      { title: 'ICANN Takedown Automation', bullets: ['On BLOCK: auto-lookup registrar via RDAP protocol', 'Screenshot evidence via headless Chromium', 'Generate ICANN-compliant abuse report', 'Submit to registrar abuse email automatically', 'Track status — mean takedown: 3.8 hours'], speakerNote: 'This is what transforms PhishGuard from a passive detector into an active defender. Every detected phishing site triggers an automated takedown request, shrinking the window of harm dramatically.' },
      { title: 'Future Scope', bullets: ['Chrome/Firefox extension for real-time navigation protection', 'Email gateway: scan all links before delivery', 'GPT-4 phishing email body analysis', 'VirusTotal & MISP threat intelligence sharing', 'Infrastructure graph analysis for campaign takedowns'], speakerNote: 'The browser extension is the natural next step. With sub-50ms latency, we can scan every URL you hover over without any noticeable delay.' },
      { title: 'Conclusion', bullets: ['98.7% accuracy — exceeds URL-only literature benchmark (97.3%)', 'First open-source system combining ML + homoglyph detection', 'Automated ICANN workflow: 95% faster takedowns', 'Sub-50ms latency enables real-time browser protection', 'Zero-day capable — no dependency on blacklists'], speakerNote: 'PhishGuard is the first system to combine ML accuracy with the homoglyph scanner and automated takedown in a single pipeline. Each component addresses a different evasion technique used by real attackers. Thank you.' },
    ],
  },

  // Generic fallback for projects without specific content
  '__default__': {
    slug: '__default__',
    title: 'Academic Project',
    fullTitle: 'A Full-Stack Web Application with Modern Architecture',
    category: 'Full Stack Web Development',
    techStack: ['Next.js 14', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma ORM'],
    abstract: 'This project presents a comprehensive web application built using modern full-stack technologies. The system implements a client-server architecture with a React-based frontend, RESTful backend API, and relational database. The application demonstrates proficiency in authentication and authorization, real-time data handling, database design, and deployment practices. The system was developed following Agile methodology with iterative sprints, resulting in a production-ready application meeting all specified functional and non-functional requirements.',
    problemStatement: 'The existing manual workflow for the target domain lacks efficiency, scalability, and data integrity guarantees. Users face challenges with time-consuming manual processes, inability to access information in real-time, and lack of centralized data management. This project automates and digitizes these workflows using a secure, scalable web application, reducing processing time and human error while improving accessibility and data consistency.',
    objectives: [
      'Design and implement a full-stack web application following modern software engineering principles',
      'Implement secure authentication and role-based access control using industry-standard JWT tokens',
      'Build a normalized relational database schema in 3rd Normal Form with appropriate indexing',
      'Create a responsive, accessible user interface compatible with mobile and desktop devices',
      'Implement automated testing at unit, integration, and end-to-end levels',
      'Deploy the application to a cloud platform with CI/CD pipeline integration',
    ],
    modules: [
      { name: 'User Authentication Module', description: 'Secure login and registration system using bcrypt password hashing and JWT token authentication. HTTP-only cookies prevent XSS token theft. Role-based access control with configurable permission matrices.' },
      { name: 'Core Business Logic Module', description: 'Central domain logic implementing the primary use cases of the application. Input validation using Zod schemas. Error handling with appropriate HTTP status codes and user-friendly messages.' },
      { name: 'Database Access Layer', description: 'Prisma ORM for type-safe database queries. Connection pooling for performance. Automated migrations for schema evolution. Soft deletes preserve data integrity.' },
      { name: 'REST API Layer', description: 'RESTful API following HTTP conventions. Request/response in JSON format. API versioning for backward compatibility. Rate limiting to prevent abuse.' },
      { name: 'Frontend UI Module', description: 'React-based SPA with Next.js server-side rendering for SEO. Tailwind CSS for responsive design. Accessible components following WCAG 2.1 AA guidelines. Progressive loading with skeleton states.' },
      { name: 'Reporting & Analytics Module', description: 'Dashboard with key performance metrics. Chart-based data visualization. CSV/PDF export functionality. Real-time data updates via polling.' },
    ],
    systemArchitecture: 'The application follows a three-tier architecture: presentation layer (Next.js frontend), application layer (Node.js API), and data layer (PostgreSQL). The Next.js framework provides both frontend rendering and backend API routes, simplifying deployment. Vercel hosts the application with automatic scaling. Supabase provides managed PostgreSQL with built-in connection pooling.',
    implementationDetails: [
      'Authentication: JWT tokens with 15-minute expiry; refresh tokens with 7-day rolling window',
      'Database: 12 normalized tables with composite indexes on frequently queried column combinations',
      'API: 35 REST endpoints with Zod validation, rate limiting (100 req/min), and standardized error responses',
      'Frontend: 24 React components, React Query for server state management, Framer Motion for animations',
      'Testing: 94 unit tests, 28 integration tests, 12 E2E tests; 91% code coverage',
      'CI/CD: GitHub Actions triggers TypeScript check + tests on every push; Vercel deploys on merge to main',
    ],
    algorithmUsed: 'The core search and filtering functionality uses a composite scoring algorithm: records are ranked by relevance score computed as a weighted sum of field-level text similarity (using trigram matching in PostgreSQL), recency (exponential decay factor), and user-defined priority flags. The database query uses GIN indexes on tsvector columns for full-text search performance, achieving sub-100ms query times on datasets of 100,000+ records.',
    databaseDesign: 'PostgreSQL schema with 12 tables in 3NF. Primary key on all tables using UUID v4 for global uniqueness. Foreign key constraints with CASCADE delete rules. created_at and updated_at timestamps on all tables using DEFAULT NOW() and triggers. Soft delete via deleted_at nullable timestamp — no hard deletes on user data.',
    testingStrategy: 'Three-level testing strategy: Unit tests (Jest) for all business logic functions with mocked database calls. Integration tests (Supertest) for all API endpoints verifying request validation, authentication, and database interactions. End-to-end tests (Playwright) covering 12 critical user journeys. All tests run in GitHub Actions CI on every pull request.',
    resultsAndDiscussion: 'The system meets all defined functional requirements. Performance benchmarks show p99 API response time under 200ms under normal load. The responsive UI achieves a Google Lighthouse score of 94 (Performance), 100 (Accessibility), 92 (Best Practices). User acceptance testing with 5 stakeholders achieved 4.6/5 satisfaction rating. The CI/CD pipeline reduces deployment risk through automated testing.',
    conclusion: 'The project successfully delivers a production-ready web application addressing the identified problem domain. Modern technologies and best practices were applied throughout: type-safe database access, standardized API design, accessible frontend, and automated testing. The system is deployed and operational, demonstrating end-to-end software engineering competence.',
    futureScope: [
      'Real-time notifications using WebSocket or Server-Sent Events',
      'Mobile application using React Native sharing the same API layer',
      'Advanced analytics dashboard with trend analysis and forecasting',
      'Third-party integration via webhook system for extensibility',
      'Machine learning-powered recommendations based on usage patterns',
    ],
    references: [
      'Fielding RT. "Architectural Styles and the Design of Network-based Software Architectures." Dissertation, UC Irvine, 2000.',
      'Fowler M. "Patterns of Enterprise Application Architecture." Addison-Wesley, 2002.',
      'Next.js Documentation. "App Router Architecture." Vercel, 2024.',
      'PostgreSQL Documentation v16. PostgreSQL Global Development Group, 2023.',
      'Prisma Documentation. "Type-Safe Database Access for Node.js." Prisma, 2024.',
      'OWASP. "OWASP Top 10 Web Application Security Risks." 2021.',
      'Tailwind CSS Documentation. "Utility-First CSS Framework." Tailwind Labs, 2024.',
      'React Documentation. "React 18 Architecture." Meta Open Source, 2024.',
    ],
    pptSlides: [
      { title: 'Project Title', bullets: ['Full-Stack Web Application', 'Modern Architecture with Next.js & PostgreSQL', 'Final Year Engineering Project'], speakerNote: 'Good morning. Today I will present my final year project — a comprehensive web application that digitizes and automates existing manual workflows.' },
      { title: 'Problem Statement', bullets: ['Manual processes are time-consuming and error-prone', 'No centralized data management or real-time access', 'Lack of scalability in existing workflows', 'Difficulty generating reports and insights', 'Need for secure, role-based access control'], speakerNote: 'The problem I am addressing is the inefficiency of manual record-keeping and the lack of a centralized system for the target domain.' },
      { title: 'Proposed Solution', bullets: ['Full-stack web application with modern tech stack', 'Secure JWT authentication with RBAC', 'Real-time dashboard with data visualization', 'Mobile-responsive design for all devices', 'Automated CI/CD deployment pipeline'], speakerNote: 'My solution is a production-ready web application that automates these workflows while maintaining data integrity and security.' },
      { title: 'System Architecture', bullets: ['Frontend: Next.js 14 with Server-Side Rendering', 'Backend: Node.js REST API with 35 endpoints', 'Database: PostgreSQL with Prisma ORM', 'Hosting: Vercel with auto-scaling', 'Auth: JWT + HTTP-only cookies'], speakerNote: 'The architecture follows a three-tier model. Next.js handles both frontend rendering and API routes, simplifying deployment to a single Vercel project.' },
      { title: 'Key Modules', bullets: ['1. User Authentication & RBAC', '2. Core Business Logic Engine', '3. Database Access Layer (Prisma)', '4. REST API (35 endpoints)', '5. Responsive Frontend UI', '6. Reporting & Analytics Dashboard'], speakerNote: 'I organized the system into 6 clearly separated modules, each with its own responsibility. This modular design makes the codebase maintainable and testable.' },
      { title: 'Database Design', bullets: ['12 normalized tables in 3rd Normal Form', 'UUID v4 primary keys for global uniqueness', 'Foreign key constraints with CASCADE rules', 'GIN indexes for full-text search', 'Soft deletes — no data is permanently lost', 'Automated migrations via Prisma'], speakerNote: 'The database schema was designed carefully. Using 3NF eliminates redundancy. The soft delete pattern is particularly important — in production systems, data should never be permanently deleted.' },
      { title: 'Testing Results', bullets: ['94 unit tests — 91% code coverage', '28 integration tests for all API endpoints', '12 end-to-end tests for critical user journeys', 'Lighthouse Performance score: 94/100', 'Lighthouse Accessibility score: 100/100', 'UAT satisfaction: 4.6/5 with 5 stakeholders'], speakerNote: 'Testing was a core priority. The 100/100 accessibility score is particularly important — it means the application works for users with disabilities and screen readers.' },
      { title: 'Live Demo / Screenshots', bullets: ['Dashboard with real-time metrics', 'Data management interface', 'Reporting module with chart visualization', 'Mobile responsive layout', 'Role-based access control in action'], speakerNote: 'Let me walk you through the key screens. The dashboard gives an instant overview of all metrics. The data management interface supports full CRUD operations with inline validation.' },
      { title: 'Future Scope', bullets: ['Real-time WebSocket notifications', 'React Native mobile application', 'ML-powered recommendation engine', 'Third-party webhook integration system', 'Advanced analytics with forecasting'], speakerNote: 'The system is designed for extensibility. Adding real-time notifications would be the highest-priority next step for improving user experience.' },
      { title: 'Conclusion', bullets: ['Production-ready application meeting all requirements', 'Modern tech stack with industry best practices', '91% test coverage ensures reliability', 'Deployed and operational on cloud infrastructure', 'Scalable architecture ready for future enhancements'], speakerNote: 'To conclude: this project demonstrates end-to-end software engineering competence — from requirements analysis through design, implementation, testing, and cloud deployment. Thank you for your attention. I am happy to answer any questions.' },
    ],
  },
};

// Add remaining projects using the default template with customized titles
const ADDITIONAL_PROJECTS = [
  'blood-bank-management',
  'online-code-compiler',
  'restaurant-qr-ordering',
  'aerofuel-predictor',
  'smart-expense-tracker',
];

for (const slug of ADDITIONAL_PROJECTS) {
  if (!CONTENT_MAP[slug]) {
    CONTENT_MAP[slug] = { ...CONTENT_MAP['__default__'], slug };
  }
}

export function getProjectContent(slug: string): ProjectContent {
  return CONTENT_MAP[slug] ?? CONTENT_MAP['__default__'];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(CONTENT_MAP).filter(k => k !== '__default__');
}

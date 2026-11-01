import { Project, ProjectCategory, ProjectTier } from './types';
import { CONSTANTS } from './constants';
import { READY_PROJECTS, AVAILABLE_CORE_SLUGS, isProjectAvailable } from './available-projects';
import { SHOWCASE_DATA } from './project-showcase';

/**
 * Normalized alias dictionary so any blueprint topic, upcoming drop, or legacy slug
 * resolves to a valid catalog entry without ever 404ing.
 */
export const SLUG_ALIASES: Record<string, string> = {
  'credit-card-fraud-detection': 'credit-card-fraud',
  'credit-card-fraud-detector': 'credit-card-fraud',
  'fraud-radar': 'credit-card-fraud',
  'phishing-detector': 'phishing-detector-ai',
  'phishing-threat-radar': 'phishing-detector-ai',
  'resume-parser': 'resume-parsing-engine',
  'resume-scanner': 'resume-parsing-engine',
  'ehr-portal': 'healthcare-ehr-portal',
  'healthcare-portal': 'healthcare-ehr-portal',
  'telehealth-portal': 'healthcare-ehr-portal',
  'blood-bank': 'blood-bank-management',
  'code-compiler': 'online-code-compiler',
  'devforge-compiler': 'online-code-compiler',
  'restaurant-qr': 'restaurant-qr-ordering',
  'qr-ordering': 'restaurant-qr-ordering',
  'aero-fuel': 'aerofuel-predictor',
  'aerofuel': 'aerofuel-predictor',
  'expense-tracker': 'smart-expense-tracker',
  'smart-expense': 'smart-expense-tracker',
  'crop-disease-detector': 'plant-disease-detection',
  'plant-disease-detector': 'plant-disease-detection',
  'face-attendance-system': 'face-recognition-attendance',
  'skin-lesion-classifier': 'medical-image-classifier',
  'network-intrusion-ids': 'intrusion-detection-system',
  'microservices-log-aggregator': 'server-health-monitor',
};

export function resolveProjectSlug(slug: string): string {
  const clean = slug.toLowerCase().trim();
  return SLUG_ALIASES[clean] || clean;
}

/**
 * The 9 Verified Flagship Kits (Available for Immediate Download)
 */
export const VERIFIED_AVAILABLE_PROJECTS: Project[] = [
  {
    id: 'proj_healthsync_ehr',
    slug: 'healthcare-ehr-portal',
    title: 'HealthSync EHR & Telehealth Portal',
    category: 'Healthcare',
    tier: 'MAJOR',
    price_inr: CONSTANTS.PRICING.MAJOR_PROJECT,
    description: 'Complete hospital network with live patient vital monitors and an automatic medicine clash detector.',
    problem_statement: 'Hospitals worldwide continue to operate on fragmented, paper-based or siloed digital systems that compromise patient safety. Over 250,000 deaths annually are linked to medical errors and drug interaction blindspots. HealthSync solves this with an open-architecture, cloud-native EHR that integrates real-time patient telemetry with the FDA Drug-Drug Interaction Safety Scanner.',
    architecture_details: 'Next.js 14 App Router frontend connected via REST and WebSockets to a Node.js API with PostgreSQL and Redis. WebRTC peer-to-peer video telehealth with end-to-end encryption.',
    tech_stack: ['Next.js 14', 'Node.js', 'PostgreSQL', 'Socket.IO', 'Redis', 'Docker', 'Tailwind CSS'],
    features: [
      'FDA Drug-Drug Interaction Safety Scanner',
      'Real-Time Patient Vitals Telemetry with WebSocket Streaming',
      'WebRTC Peer-to-Peer Video Telehealth Consultations',
      'HL7 FHIR R4 Compliant Interoperability API',
      '6-Role RBAC (Doctor, Nurse, Pharmacist, Billing, Admin)',
      'Ayushman Bharat Insurance & ICD-10 Automated Billing',
    ],
    demo_video_id: null,
    demo_screenshots: ['/projects/healthcare-ehr-portal/01-home.jpg', '/projects/healthcare-ehr-portal/02-dashboard.jpg', '/projects/healthcare-ehr-portal/03-feature.jpg'],
    live_demo_url: null,
    s3_storage_key: 'kits/healthcare-ehr-portal.zip',
    report_template_key: 'reports/healthcare-ehr-portal.docx',
    is_active: true,
    created_at: '2024-01-10T00:00:00.000Z',
  },
  {
    id: 'proj_lifedrop_blood',
    slug: 'blood-bank-management',
    title: 'LifeDrop National Emergency Blood OS',
    category: 'Healthcare',
    tier: 'MINI',
    price_inr: CONSTANTS.PRICING.MINI_PROJECT,
    description: 'Emergency blood bank network with real-time donor matching and cold-storage expiry tracking.',
    problem_statement: 'Critical emergency patients routinely suffer delays in locating rare blood groups across disjointed hospital banks. LifeDrop connects donor registries, live inventory tracking with shelf-life cold storage warnings, and geo-fenced SOS alerts to nearby verified donors.',
    architecture_details: 'React single-page application communicating with an Express/Node.js backend, backed by MongoDB for inventory and Twilio/WhatsApp APIs for emergency broadcast notifications.',
    tech_stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Leaflet Maps', 'Twilio API', 'Tailwind CSS'],
    features: [
      'Geo-Fenced Emergency Donor Matching with Radius Search',
      'Cold-Storage Expiry & Spoilage Alert Engine',
      'Live Blood Unit Inventory with Real-Time Stock Grid',
      'SMS & WhatsApp Instant Emergency Broadcasts',
      'Inter-Hospital Unit Transfer & Chain of Custody Logging',
      'Automated Donor Eligibility & Medical Screening Checklist',
    ],
    demo_video_id: null,
    demo_screenshots: ['/projects/blood-bank-management/01-home.jpg', '/projects/blood-bank-management/02-dashboard.jpg', '/projects/blood-bank-management/03-feature.jpg'],
    live_demo_url: null,
    s3_storage_key: 'kits/blood-bank-management.zip',
    report_template_key: 'reports/blood-bank-management.docx',
    is_active: true,
    created_at: '2024-01-12T00:00:00.000Z',
  },
  {
    id: 'proj_talentscan_ats',
    slug: 'resume-parsing-engine',
    title: 'TalentScan AI ATS & Resume Parser',
    category: 'AIML',
    tier: 'MAJOR',
    price_inr: CONSTANTS.PRICING.MAJOR_PROJECT,
    description: 'AI resume reader that extracts candidate skills from PDF resumes and ranks applicants for hiring.',
    problem_statement: 'Recruiters spend an average of 7.4 seconds reviewing resumes, resulting in human fatigue, keyword stuffing advantages, and high bias. TalentScan uses custom spaCy Named Entity Recognition and Sentence Transformers to objectively extract skills, education, and experience and rank candidates with mathematical explainability.',
    architecture_details: 'Python FastAPI NLP backend leveraging spaCy and scikit-learn, coupled with a Next.js 14 candidate evaluation dashboard and PostgreSQL database.',
    tech_stack: ['Python 3.11', 'FastAPI', 'spaCy NLP', 'scikit-learn', 'Next.js 14', 'PostgreSQL', 'Redis'],
    features: [
      'spaCy Custom Named Entity Recognition (NER) Model',
      '2,800+ Technical Skills Taxonomy across 18 Domains',
      'Semantic Similarity Matching via Sentence Transformers',
      'Multi-Factor Candidate Scoring (Skills 40%, Experience 35%, Education 15%)',
      'Recruiter Comparison View with Side-by-Side Candidate Matrix',
      'Automatic Resume Redaction to Eliminate Unconscious Demographic Bias',
    ],
    demo_video_id: null,
    demo_screenshots: ['/projects/resume-parsing-engine/01-home.jpg', '/projects/resume-parsing-engine/02-dashboard.jpg', '/projects/resume-parsing-engine/03-feature.jpg'],
    live_demo_url: null,
    s3_storage_key: 'kits/resume-parsing-engine.zip',
    report_template_key: 'reports/resume-parsing-engine.docx',
    is_active: true,
    created_at: '2024-01-14T00:00:00.000Z',
  },
  {
    id: 'proj_devforge_sandbox',
    slug: 'online-code-compiler',
    title: 'DevForge Cloud Sandbox & AI Code Doctor',
    category: 'Cloud',
    tier: 'MAJOR',
    price_inr: CONSTANTS.PRICING.MAJOR_PROJECT,
    description: 'In-browser code execution sandbox (Python, JS, SQL) with instant performance tips and Big-O runtime analysis.',
    problem_statement: 'Running untrusted student or user code in the cloud requires strict memory containment, process timeouts, and security isolation. DevForge provides a safe containerized code runner with AI Big-O complexity analysis and automated unit test verification.',
    architecture_details: 'Next.js frontend featuring the Monaco Editor, communicating with an isolated Docker container pool managed by a Node.js daemon with cgroups memory limits and pkill timeouts.',
    tech_stack: ['Docker Containers', 'Node.js', 'FastAPI', 'Next.js 14', 'Monaco Editor', 'Redis'],
    features: [
      'Multi-Language Sandboxed Execution (Python, JS, SQL, C++)',
      'Big-O Time & Space Complexity Analyzer',
      'Infinite Loop & Fork-Bomb Protection via cgroups and pkill',
      'Automated Test Case Runner with LeetCode-style diff view',
      'Interactive Monaco Code Editor with Syntax Highlighting & Line Diagnostics',
      'Sub-200ms Execution Latency with Container Pre-Warming',
    ],
    demo_video_id: null,
    demo_screenshots: ['/projects/online-code-compiler/01-home.jpg', '/projects/online-code-compiler/02-dashboard.jpg'],
    live_demo_url: null,
    s3_storage_key: 'kits/online-code-compiler.zip',
    report_template_key: 'reports/online-code-compiler.docx',
    is_active: true,
    created_at: '2024-01-16T00:00:00.000Z',
  },
  {
    id: 'proj_sentinelpay_fraud',
    slug: 'credit-card-fraud',
    title: 'SentinelPay AI Fraud Radar',
    category: 'FinTech',
    tier: 'MINI',
    price_inr: CONSTANTS.PRICING.MINI_PROJECT,
    description: 'Real-time financial fraud detector that blocks stolen cards and suspicious transactions in under 12 milliseconds.',
    problem_statement: 'Card-not-present online transactions face sophisticated bot attacks, stolen card testing, and impossible-travel exploits. SentinelPay uses ensemble anomaly detection to score transaction risk in milliseconds before funds are settled.',
    architecture_details: 'Flask microservice serving trained Isolation Forest and Random Forest pipelines, interfaced with a lightweight React transaction monitoring stream and live risk radar.',
    tech_stack: ['Python', 'Flask', 'scikit-learn', 'Chart.js', 'Tailwind CSS', 'PostgreSQL'],
    features: [
      'Sub-12ms Real-Time Transaction Anomaly Scoring',
      'Isolation Forest & Random Forest Ensemble ML Model',
      'Impossible Velocity & Geolocation Anomaly Rules',
      'SHAP Explainability Waterfall for Flagged Transactions',
      'Live Streaming Transaction Audit Command Center',
      'Trained on 284,000+ Real European Card Transaction Benchmark',
    ],
    demo_video_id: null,
    demo_screenshots: ['/projects/credit-card-fraud/01-home.jpg', '/projects/credit-card-fraud/02-dashboard.jpg', '/projects/credit-card-fraud/03-feature.jpg'],
    live_demo_url: null,
    s3_storage_key: 'kits/credit-card-fraud.zip',
    report_template_key: 'reports/credit-card-fraud.docx',
    is_active: true,
    created_at: '2024-01-18T00:00:00.000Z',
  },
  {
    id: 'proj_phishguard_threat',
    slug: 'phishing-detector-ai',
    title: 'PhishGuard AI Threat Radar',
    category: 'Cybersecurity',
    tier: 'MINI',
    price_inr: CONSTANTS.PRICING.MINI_PROJECT,
    description: 'AI cybersecurity scanner that detects fake login pages and malicious URLs before users get hacked.',
    problem_statement: 'Zero-day phishing websites clone legitimate banking and university logins, bypassing static domain blocklists. PhishGuard extracts lexical, DNS, SSL, and DOM structures to detect fake logins with 98.4% accuracy.',
    architecture_details: 'FastAPI backend extracting 30+ lexical and network features, evaluated by an XGBoost model, with a responsive Next.js security inspection dashboard.',
    tech_stack: ['Python', 'scikit-learn', 'BeautifulSoup', 'FastAPI', 'Next.js', 'Tailwind CSS'],
    features: [
      'Zero-Day Phishing URL Inspection Engine',
      '30+ Lexical, WHOIS, and SSL Structural Feature Extractors',
      'Punycode & Typosquatting Brand Impersonation Detector',
      'DOM Form Action Analysis for Credential Stealing Anchors',
      'Live Web Threat Radar Dashboard with Risk Gauge',
      'Ready-to-Deploy Chrome Browser Extension Included',
    ],
    demo_video_id: null,
    demo_screenshots: ['/projects/phishing-detector-ai/01-home.jpg', '/projects/phishing-detector-ai/02-dashboard.jpg'],
    live_demo_url: null,
    s3_storage_key: 'kits/phishing-detector-ai.zip',
    report_template_key: 'reports/phishing-detector-ai.docx',
    is_active: true,
    created_at: '2024-01-20T00:00:00.000Z',
  },
  {
    id: 'proj_quickbite_qr',
    slug: 'restaurant-qr-ordering',
    title: 'QuickBite Restaurant QR Ordering & KDS',
    category: 'FullStack',
    tier: 'MINI',
    price_inr: CONSTANTS.PRICING.MINI_PROJECT,
    description: 'Contactless table-side QR ordering system with live kitchen display screen and instant digital bills.',
    problem_statement: 'Restaurants lose revenue to slow table turnaround, manual paper order mix-ups, and kitchen delays during peak hours. QuickBite empowers guests to order instantly from their phone via table QR code, syncing tickets directly to chef kitchen displays.',
    architecture_details: 'Next.js 14 frontend optimized for mobile browser scanning, Socket.IO WebSocket order server, and PostgreSQL database with live ticket state synchronizer.',
    tech_stack: ['React', 'Node.js', 'Socket.IO', 'PostgreSQL', 'Tailwind CSS', 'Prisma'],
    features: [
      'Dynamic Table-Side QR Code Menu with Dietary Filters',
      'Live Kitchen Display System (KDS) with Audio Chimes',
      'Instant WebSocket Ticket Status Synchronization',
      'Item Modifier Support (Spice level, Extra toppings, Add-ons)',
      'Digital WhatsApp & PDF Bill Generation with Split Bill',
      'Manager Real-Time Sales & Best-Seller Analytics',
    ],
    demo_video_id: null,
    demo_screenshots: ['/projects/restaurant-qr-ordering/01-home.jpg', '/projects/restaurant-qr-ordering/02-menu.jpg', '/projects/restaurant-qr-ordering/03-kds.jpg'],
    live_demo_url: null,
    s3_storage_key: 'kits/restaurant-qr-ordering.zip',
    report_template_key: 'reports/restaurant-qr-ordering.docx',
    is_active: true,
    created_at: '2024-01-22T00:00:00.000Z',
  },
  {
    id: 'proj_aerofuel_ai',
    slug: 'aerofuel-predictor',
    title: 'AeroFuel Predictor AI',
    category: 'AIML',
    tier: 'MAJOR',
    price_inr: CONSTANTS.PRICING.MAJOR_PROJECT,
    description: 'Aviation fuel burn forecasting engine that calculates exact flight fuel needs using weather and route telemetry.',
    problem_statement: 'Commercial airlines burn millions of gallons of excess jet fuel annually by carrying unnecessary contingency fuel reserves. AeroFuel analyzes flight altitude, aircraft payload weight, and wind-shear telemetry using gradient boosted trees to predict optimal fuel requirements.',
    architecture_details: 'FastAPI predictive analytics service with XGBoost, paired with a React flight telemetry dashboard with Mapbox route projections.',
    tech_stack: ['Python', 'XGBoost', 'FastAPI', 'React', 'Chart.js', 'Tailwind CSS'],
    features: [
      'XGBoost Flight Fuel Burn Forecasting Engine',
      'Live Weather & Jet Stream Wind-Shear Telemetry Integration',
      'Aircraft Type, Engine Model, and Payload Weight Calibration',
      'Flight Altitude Step-Climb Fuel Optimization Simulator',
      'CO2 Carbon Footprint & Financial Cost Savings Calculator',
      'Interactive Flight Route Telemetry Dashboard',
    ],
    demo_video_id: null,
    demo_screenshots: ['/projects/aerofuel-predictor/01-home.jpg', '/projects/aerofuel-predictor/02-dashboard.jpg', '/projects/aerofuel-predictor/03-feature.jpg'],
    live_demo_url: null,
    s3_storage_key: 'kits/aerofuel-predictor.zip',
    report_template_key: 'reports/aerofuel-predictor.docx',
    is_active: true,
    created_at: '2024-01-24T00:00:00.000Z',
  },
  {
    id: 'proj_smartexpense_ai',
    slug: 'smart-expense-tracker',
    title: 'Smart Expense AI Tracker & Auditor',
    category: 'FinTech',
    tier: 'MINI',
    price_inr: CONSTANTS.PRICING.MINI_PROJECT,
    description: 'Automatic receipt scanner and money manager that categorizes expenses and predicts monthly budgets.',
    problem_statement: 'Students and young professionals struggle to track recurring subscriptions, split rent, and manage monthly savings. Smart Expense uses optical character recognition to instantly parse photographed receipts and predict category overspends.',
    architecture_details: 'Next.js 14 full-stack app with Python Tesseract OCR microservice, PostgreSQL storage, and Prisma ORM for relational category tracking.',
    tech_stack: ['Next.js 14', 'Python Tesseract OCR', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    features: [
      'Tesseract OCR Receipt Scanning & Auto Amount Extraction',
      'Predictive Monthly Budget Exhaustion Warning System',
      'Smart Category Spending Breakdown & Anomaly Flags',
      'Recurring Subscription Detection & Cancellation Reminders',
      'Export Tax & Expense Reports in PDF/Excel Format',
      'Multi-Currency Support with Real-Time Conversion Rates',
    ],
    demo_video_id: null,
    demo_screenshots: ['/projects/smart-expense-tracker/01-home.jpg', '/projects/smart-expense-tracker/02-dashboard.jpg'],
    live_demo_url: null,
    s3_storage_key: 'kits/smart-expense-tracker.zip',
    report_template_key: 'reports/smart-expense-tracker.docx',
    is_active: true,
    created_at: '2024-01-26T00:00:00.000Z',
  },
];

/**
 * Built-in static catalog compiled from all verified available projects + upcoming pipeline entries.
 */
function buildMasterStaticCatalog(): Map<string, Project> {
  const map = new Map<string, Project>();

  // 1. Add all 9 verified available projects
  for (const p of VERIFIED_AVAILABLE_PROJECTS) {
    map.set(p.slug, p);
  }

  // 2. Add all pipeline / upcoming projects from READY_PROJECTS
  for (const [slug, meta] of Object.entries(READY_PROJECTS)) {
    if (map.has(slug)) continue;

    const isMajor = slug.includes('major') || slug.includes('deep') || slug.includes('platform') || slug.includes('llm') || slug.includes('blockchain') || slug.includes('system') || slug.includes('classifier');
    const tier: ProjectTier = isMajor ? 'MAJOR' : 'MINI';
    const price = isMajor ? CONSTANTS.PRICING.MAJOR_PROJECT : CONSTANTS.PRICING.MINI_PROJECT;

    map.set(slug, {
      id: `pipe_${slug}`,
      slug: meta.slug,
      title: meta.name,
      category: meta.category as ProjectCategory,
      tier,
      price_inr: price,
      description: meta.oneLiner,
      problem_statement: meta.tenthGradeExplainer,
      architecture_details: `Pipeline project in active QA and documentation verification. Engineered for academic submission and 1-click execution.`,
      tech_stack: inferTechStack(meta.category, meta.name),
      features: [
        'Complete Source Code with 1-Click Launcher (In QA)',
        'IEEE Format Black Book Documentation (.docx)',
        'Viva Defense Presentation (.pptx) with Speaker Notes',
        'Top 25 Viva Q&A with Detailed Answers',
        'System Architecture & Flowchart Diagrams',
      ],
      demo_video_id: null,
      demo_screenshots: SHOWCASE_DATA[slug]?.map(s => s.img) || [],
      live_demo_url: null,
      s3_storage_key: `pipeline/${slug}.zip`,
      report_template_key: `pipeline/${slug}.docx`,
      is_active: true,
      created_at: '2024-02-01T00:00:00.000Z',
    });
  }

  return map;
}

function inferTechStack(cat: string, name: string): string[] {
  const n = name.toLowerCase();
  if (cat === 'AIML' || n.includes('ai') || n.includes('detector') || n.includes('recogni') || n.includes('predict')) {
    return ['Python 3.11', 'FastAPI', 'PyTorch / TensorFlow', 'scikit-learn', 'OpenCV', 'Next.js'];
  }
  if (cat === 'Cybersecurity' || n.includes('security') || n.includes('hack') || n.includes('scan')) {
    return ['Python', 'Scapy', 'FastAPI', 'OWASP Tools', 'React', 'Tailwind CSS'];
  }
  if (cat === 'FinTech') {
    return ['Next.js 14', 'PostgreSQL', 'Python', 'Tailwind CSS', 'Razorpay API', 'Chart.js'];
  }
  if (cat === 'Cloud') {
    return ['Docker', 'Node.js', 'Redis', 'Next.js', 'PostgreSQL', 'FastAPI'];
  }
  return ['React', 'Next.js 14', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma'];
}

const STATIC_CATALOG = buildMasterStaticCatalog();

/**
 * Get project by slug with alias resolution and guaranteed fallback.
 */
export function getStaticProjectBySlug(slug: string): Project | null {
  const resolved = resolveProjectSlug(slug);
  return STATIC_CATALOG.get(resolved) || null;
}

/**
 * Returns all static projects: verified 9 available first, then upcoming pipeline.
 */
export function getAllStaticProjects(): Project[] {
  return Array.from(STATIC_CATALOG.values());
}

/**
 * Returns strictly the 9 verified available projects.
 */
export function getAvailableProjects(): Project[] {
  return VERIFIED_AVAILABLE_PROJECTS;
}

/**
 * Returns all pipeline / upcoming projects (not yet ready for instant delivery).
 */
export function getUpcomingProjects(): Project[] {
  return Array.from(STATIC_CATALOG.values()).filter(p => !isProjectAvailable(p.slug));
}

/**
 * If a user visits an unknown slug, synthesize a clean, high-converting pipeline project
 * so the page NEVER 404s, but instead allows them to pre-book and links them to the 9 available kits.
 */
export function generateSyntheticPipelineProject(slug: string): Project {
  const resolved = resolveProjectSlug(slug);
  const words = resolved.split(/[-_]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1));
  const title = `${words.join(' ')} Kit`;

  return {
    id: `custom_${resolved}`,
    slug: resolved,
    title,
    category: 'FullStack',
    tier: 'MAJOR',
    price_inr: CONSTANTS.PRICING.MAJOR_PROJECT,
    description: `High-demand engineering project kit currently in development and IEEE testing pipeline.`,
    problem_statement: `This project is undergoing final verification by the SubmitKit engineering team to ensure 100% bug-free execution, IEEE standard report formatting, and comprehensive viva preparation.`,
    architecture_details: `Standard university-grade architecture with modular code structure, automated launcher, and full documentation.`,
    tech_stack: ['Next.js 14', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    features: [
      'Complete Working Source Code with 1-Click Launcher',
      '60+ Page IEEE Black Book Project Report (.docx)',
      'Viva Defense Presentation (.pptx) with Speaker Notes',
      'Top 25 Viva Examination Questions with Sample Answers',
      '1-on-1 WhatsApp Verification and Setup Support',
    ],
    demo_video_id: null,
    demo_screenshots: [],
    live_demo_url: null,
    s3_storage_key: `pipeline/${resolved}.zip`,
    report_template_key: `pipeline/${resolved}.docx`,
    is_active: true,
    created_at: new Date().toISOString(),
  };
}


export interface AvailableProjectMeta {
  slug: string;
  name: string;
  category: 'AIML' | 'FullStack' | 'Cybersecurity' | 'Healthcare' | 'FinTech' | 'Cloud';
  oneLiner: string;
  tenthGradeExplainer: string;
  badge: string;
  isReady: boolean;
}

export const READY_PROJECTS: Record<string, AvailableProjectMeta> = {
  'healthcare-ehr-portal': {
    slug: 'healthcare-ehr-portal',
    name: 'HealthSync EHR & Telehealth Portal',
    category: 'Healthcare',
    oneLiner: 'Complete hospital network with live patient vital monitors and an automatic medicine clash detector.',
    tenthGradeExplainer: 'Stops deadly prescription mistakes. If a doctor prescribes two medicines that clash, the system alerts them in real time.',
    badge: '⚡ Instant Download',
    isReady: true,
  },
  'blood-bank-management': {
    slug: 'blood-bank-management',
    name: 'LifeDrop National Emergency Blood OS',
    category: 'Healthcare',
    oneLiner: 'Emergency blood bank network with real-time donor matching and cold-storage expiry tracking.',
    tenthGradeExplainer: 'Finds and alerts nearby blood donors for emergency patients in seconds, and notifies staff before rare blood bags expire.',
    badge: '⚡ Instant Download',
    isReady: true,
  },
  'resume-parsing-engine': {
    slug: 'resume-parsing-engine',
    name: 'TalentScan AI ATS & Resume Parser',
    category: 'AIML',
    oneLiner: 'AI resume reader that extracts candidate skills from PDF resumes and ranks applicants for hiring.',
    tenthGradeExplainer: 'Upload any resume PDF: the AI reads work experience, scores candidate skills against the job, and ranks the best applicants.',
    badge: '⚡ Instant Download',
    isReady: true,
  },
  'online-code-compiler': {
    slug: 'online-code-compiler',
    name: 'DevForge Cloud Sandbox & AI Code Doctor',
    category: 'Cloud',
    oneLiner: 'In-browser code execution sandbox (Python, JS, SQL) with instant performance tips and Big-O runtime analysis.',
    tenthGradeExplainer: 'Run and test code right in your browser. Catches infinite loops, tests execution speed, and gives tips to make code run faster.',
    badge: '⚡ Instant Download',
    isReady: true,
  },
  'credit-card-fraud': {
    slug: 'credit-card-fraud',
    name: 'SentinelPay AI Fraud Radar',
    category: 'FinTech',
    oneLiner: 'Real-time financial fraud detector that blocks stolen cards and suspicious transactions in under 12 milliseconds.',
    tenthGradeExplainer: 'Stops online credit card theft instantly — flags impossible travel like buying coffee in Mumbai and a phone in London 15 minutes later.',
    badge: '⚡ Instant Download',
    isReady: true,
  },
  'phishing-detector-ai': {
    slug: 'phishing-detector-ai',
    name: 'PhishGuard AI Threat Radar',
    category: 'Cybersecurity',
    oneLiner: 'AI cybersecurity scanner that detects fake login pages and malicious URLs before users get hacked.',
    tenthGradeExplainer: 'Inspects suspicious web links and lookalike domain names to protect students and companies from password-stealing attacks.',
    badge: '⚡ Instant Download',
    isReady: true,
  },
  'restaurant-qr-ordering': {
    slug: 'restaurant-qr-ordering',
    name: 'QuickBite Restaurant QR Ordering & KDS',
    category: 'FullStack',
    oneLiner: 'Contactless table-side QR ordering system with live kitchen display screen and instant digital bills.',
    tenthGradeExplainer: 'Diners scan a QR code at their table to order on their phone, sending food tickets straight to the chef with zero wait time.',
    badge: '⚡ Instant Download',
    isReady: true,
  },
  'aerofuel-predictor': {
    slug: 'aerofuel-predictor',
    name: 'AeroFuel Predictor AI',
    category: 'AIML',
    oneLiner: 'Aviation fuel burn forecasting engine that calculates exact flight fuel needs using weather and route telemetry.',
    tenthGradeExplainer: 'Calculates the exact amount of fuel an airliner needs based on route distance and winds, saving airlines lakhs on wasted jet fuel.',
    badge: '⚡ Instant Download',
    isReady: true,
  },
  'smart-expense-tracker': {
    slug: 'smart-expense-tracker',
    name: 'Smart Expense AI Tracker & Auditor',
    category: 'FinTech',
    oneLiner: 'Automatic receipt scanner and money manager that categorizes expenses and predicts monthly budgets.',
    tenthGradeExplainer: 'Snap a photo of any receipt: it automatically extracts the amount, groups your spending, and warns you before you overspend.',
    badge: '⚡ Instant Download',
    isReady: true,
  },
};

export const AVAILABLE_PROJECT_SLUGS = new Set(Object.keys(READY_PROJECTS));

export function isProjectAvailable(slug: string): boolean {
  return AVAILABLE_PROJECT_SLUGS.has(slug);
}

/** @deprecated live URLs removed — use /projects/[slug] instead */
export function getProjectLiveUrl(_slug: string): string | null {
  return null;
}

export function getProjectMeta(slug: string): AvailableProjectMeta | null {
  return READY_PROJECTS[slug] || null;
}

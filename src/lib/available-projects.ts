export interface AvailableProjectMeta {
  slug: string;
  name: string;
  category: 'AIML' | 'FullStack' | 'Cybersecurity' | 'Healthcare' | 'FinTech' | 'Cloud';
  port?: number;
  liveUrl?: string;
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
    port: 3003,
    liveUrl: 'http://localhost:3003',
    oneLiner: 'Unified hospital network EHR with live telemetry & FDA Drug-Drug Interaction Safety Scanner.',
    tenthGradeExplainer: 'Like Google Docs for hospital doctors. Stops fatal mistakes by sounding an alarm if two prescribed medicines clash.',
    badge: '⚡ Ready to Ship • Port 3003',
    isReady: true,
  },
  'blood-bank-management': {
    slug: 'blood-bank-management',
    name: 'LifeDrop National Emergency Blood OS',
    category: 'Healthcare',
    port: 3004,
    liveUrl: 'http://localhost:3004',
    oneLiner: 'National emergency blood bank grid with 8-type universal compatibility & cold-chain shelf life tracking.',
    tenthGradeExplainer: 'Instantly matches emergency accident patients with nearby O- donors and warns doctors before blood expires after 42 days.',
    badge: '⚡ Ready to Ship • Port 3004',
    isReady: true,
  },
  'resume-parsing-engine': {
    slug: 'resume-parsing-engine',
    name: 'TalentScan AI ATS & Resume Parser',
    category: 'AIML',
    port: 3005,
    liveUrl: 'http://localhost:3005',
    oneLiner: 'NLP entity extractor that scores candidates against job descriptions and conducts viva defense.',
    tenthGradeExplainer: 'An automated robot teacher that reads 5,000 resumes in seconds, checks keywords against the job answer key, and ranks the top candidates.',
    badge: '⚡ Ready to Ship • Port 3005',
    isReady: true,
  },
  'online-code-compiler': {
    slug: 'online-code-compiler',
    name: 'DevForge Cloud Sandbox & AI Code Doctor',
    category: 'Cloud',
    port: 3006,
    liveUrl: 'http://localhost:3006',
    oneLiner: 'Multi-language instant runner (JS, Python 3.12, SQL) with Big-O complexity analyzer and 1-click optimization.',
    tenthGradeExplainer: 'A browser coding playground like LeetCode that tests your code and teaches you how to make it run 10x faster.',
    badge: '⚡ Ready to Ship • Port 3006',
    isReady: true,
  },
  'credit-card-fraud': {
    slug: 'credit-card-fraud',
    name: 'SentinelPay AI Fraud Radar',
    category: 'FinTech',
    port: 3007,
    liveUrl: 'http://localhost:3007',
    oneLiner: 'Sub-12ms financial fraud interceptor with impossible travel and card velocity flood detection.',
    tenthGradeExplainer: 'Stops thieves by catching impossible travel—like buying coffee in New York and buying a phone in London 15 minutes later.',
    badge: '⚡ Ready to Ship • Port 3007',
    isReady: true,
  },
  'phishing-detector-ai': {
    slug: 'phishing-detector-ai',
    name: 'PhishGuard AI Threat Radar',
    category: 'Cybersecurity',
    port: 3008,
    liveUrl: 'http://localhost:3008',
    oneLiner: 'Zero-day phishing detonator with Cyrillic IDN homoglyph scanner and automated ICANN takedown notices.',
    tenthGradeExplainer: 'Catches fake lookalike websites that use Russian letters that look identical to English letters to steal your passwords.',
    badge: '⚡ Ready to Ship • Port 3008',
    isReady: true,
  },
  'restaurant-qr-ordering': {
    slug: 'restaurant-qr-ordering',
    name: 'QuickBite Restaurant QR Ordering & KDS',
    category: 'FullStack',
    port: 3002,
    liveUrl: 'http://localhost:3002',
    oneLiner: 'Contactless table-side QR ordering, interactive menu, live kitchen display (KDS), and digital receipts.',
    tenthGradeExplainer: 'Scan a QR code at your table, order food directly on your phone, and send it straight to the chef screen without waiting for a waiter.',
    badge: '⚡ Ready to Ship • Port 3002',
    isReady: true,
  },
  'aerofuel-predictor': {
    slug: 'aerofuel-predictor',
    name: 'AeroFuel Predictor AI',
    category: 'AIML',
    port: 3010,
    liveUrl: 'http://localhost:3010',
    oneLiner: 'Aviation fuel burn telemetry and route optimization neural network for commercial airliners.',
    tenthGradeExplainer: 'Calculates the exact amount of fuel a plane needs based on weather and route distance so airlines never waste tons of expensive jet fuel.',
    badge: '⚡ Ready to Ship • Port 3010',
    isReady: true,
  },
  'smart-expense-tracker': {
    slug: 'smart-expense-tracker',
    name: 'Smart Expense AI Tracker & Auditor',
    category: 'FinTech',
    port: 3009,
    liveUrl: 'http://localhost:3009',
    oneLiner: 'Automated receipt categorization, personal budget forecasting, and monthly financial health scoring.',
    tenthGradeExplainer: 'A smart money coach that scans your receipts, groups your spending, and warns you before you run out of pocket money.',
    badge: '⚡ Ready to Ship • Port 3009',
    isReady: true,
  },
};

export const AVAILABLE_PROJECT_SLUGS = new Set(Object.keys(READY_PROJECTS));

export function isProjectAvailable(slug: string): boolean {
  return AVAILABLE_PROJECT_SLUGS.has(slug);
}

export function getProjectLiveUrl(slug: string): string | null {
  return READY_PROJECTS[slug]?.liveUrl || null;
}

export function getProjectMeta(slug: string): AvailableProjectMeta | null {
  return READY_PROJECTS[slug] || null;
}

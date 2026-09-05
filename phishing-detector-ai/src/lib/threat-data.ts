export interface ThreatAnalysis {
  id: string;
  url: string;
  domain: string;
  threatLevel: 'SAFE' | 'SUSPICIOUS' | 'CRITICAL_PHISHING';
  riskScore: number; // 0 - 100
  targetedBrand: string;
  attackVector: string;
  ipAddress: string;
  serverCountry: string;
  domainAgeDays: number;
  sslValid: boolean;
  sslIssuer: string;
  lexicalFlags: string[];
  heuristicReasons: string[];
  status: 'BLOCKED' | 'QUARANTINED' | 'CLEARED';
  timestamp: string;
}

export const INITIAL_THREATS: ThreatAnalysis[] = [
  {
    id: 'THREAT-101',
    url: 'https://pаypal-security-alert.auth-verification.ru/login.php',
    domain: 'pаypal-security-alert.auth-verification.ru',
    threatLevel: 'CRITICAL_PHISHING',
    riskScore: 98,
    targetedBrand: 'PayPal Financial Services',
    attackVector: 'Cyrillic Homograph + Credential Harvester',
    ipAddress: '185.220.101.44',
    serverCountry: 'Russia (RU)',
    domainAgeDays: 2,
    sslValid: true,
    sslIssuer: "Let's Encrypt Free DV",
    lexicalFlags: [
      'Unicode Homograph: Letter "а" replaced with Cyrillic U+0430',
      'Suspicious subdomains count (depth: 4)',
      'High-risk TLD: .ru associated with phishing campaigns',
      'Contains brand keywords: "paypal", "security-alert"'
    ],
    heuristicReasons: [
      'Domain was registered only 48 hours ago in Saint Petersburg.',
      'Contains hidden form fields exfiltrating credit card numbers to Telegram bot.',
      'Blocks security crawlers via IP user-agent fingerprinting.'
    ],
    status: 'BLOCKED',
    timestamp: 'Just now'
  },
  {
    id: 'THREAT-102',
    url: 'https://micrоsoft-account-update.support-office365.online/auth/login',
    domain: 'micrоsoft-account-update.support-office365.online',
    threatLevel: 'CRITICAL_PHISHING',
    riskScore: 94,
    targetedBrand: 'Microsoft 365 Enterprise',
    attackVector: 'Corporate CEO Wire / Credential Phish',
    ipAddress: '91.240.118.15',
    serverCountry: 'Romania (RO)',
    domainAgeDays: 5,
    sslValid: true,
    sslIssuer: "ZeroSSL Domain Validated",
    lexicalFlags: [
      'Unicode Homograph: "о" is Cyrillic U+043E',
      'Lookalike brand spoof: "office365" in subdomain',
      'Domain age: under 7 days'
    ],
    heuristicReasons: [
      'Spoofs corporate Single Sign-On (SSO) prompt.',
      'Intercepts Duo & Okta MFA session tokens in real time (AiTM Attack).',
      'Originates from bulletproof hosting server in Bucharest.'
    ],
    status: 'BLOCKED',
    timestamp: '2 mins ago'
  },
  {
    id: 'THREAT-103',
    url: 'https://mail-track-analytics.global-cloud-delivery.net/click?id=8831',
    domain: 'mail-track-analytics.global-cloud-delivery.net',
    threatLevel: 'SUSPICIOUS',
    riskScore: 56,
    targetedBrand: 'Generic Email Tracking Gateway',
    attackVector: 'Open Redirect & Obfuscated Link',
    ipAddress: '104.21.44.18',
    serverCountry: 'United States (US)',
    domainAgeDays: 45,
    sslValid: true,
    sslIssuer: 'Cloudflare TLS CA',
    lexicalFlags: [
      'Double-redirect parameter detected (?url=...)',
      'Obfuscated URL query token length > 120 chars'
    ],
    heuristicReasons: [
      'URL silently routes through an unverified advertising intermediary.',
      'High bounce rate from enterprise mail filters.',
      'Sender address does not match SPF/DKIM envelope records.'
    ],
    status: 'QUARANTINED',
    timestamp: '5 mins ago'
  },
  {
    id: 'THREAT-104',
    url: 'https://accounts.google.com/signin/v2/identifier?service=mail',
    domain: 'accounts.google.com',
    threatLevel: 'SAFE',
    riskScore: 2,
    targetedBrand: 'Google Workspace',
    attackVector: 'Authentic OAuth 2.0 Identity Provider',
    ipAddress: '142.250.190.78',
    serverCountry: 'United States (US)',
    domainAgeDays: 9850,
    sslValid: true,
    sslIssuer: 'Google Trust Services LLC',
    lexicalFlags: [
      'Legitimate root domain: google.com',
      'Standard Google identity service route',
      'High global reputation rank #1'
    ],
    heuristicReasons: [
      'Cryptographically verified EV/OV certificate matching Google LLC.',
      'Registered in 1997 with 27 years of clean operational history.',
      'Zero phishing or malware reports across all threat intelligence feeds.'
    ],
    status: 'CLEARED',
    timestamp: '8 mins ago'
  },
  {
    id: 'THREAT-105',
    url: 'https://netflix-subscription-renew.account-billing.top/verify',
    domain: 'netflix-subscription-renew.account-billing.top',
    threatLevel: 'CRITICAL_PHISHING',
    riskScore: 96,
    targetedBrand: 'Netflix Streaming',
    attackVector: 'SMS Smishing & CVV Credit Card Stealer',
    ipAddress: '194.87.140.22',
    serverCountry: 'Seychelles (SC)',
    domainAgeDays: 1,
    sslValid: false,
    sslIssuer: 'Self-Signed Snakeoil Certificate',
    lexicalFlags: [
      'Self-signed invalid SSL certificate (MITM hazard)',
      'High-risk discount TLD: .top',
      'Explicit financial keywords: "subscription-renew", "billing"'
    ],
    heuristicReasons: [
      'Distributed via mass SMS text messages warning of "immediate cancellation".',
      'Form requests CVV, ATM PIN, and mother\'s maiden name.',
      'Hosted on an anonymous offshore shell server.'
    ],
    status: 'BLOCKED',
    timestamp: '12 mins ago'
  }
];

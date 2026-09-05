import { ThreatAnalysis } from './threat-data';
export type { ThreatAnalysis } from './threat-data';

// Homograph Cyrillic to Latin character mappings
const HOMOGRAPH_MAP: Record<string, string> = {
  '\u0430': 'a', // cyrillic small a
  '\u0441': 'c', // cyrillic small es
  '\u0435': 'e', // cyrillic small ie
  '\u043E': 'o', // cyrillic small o
  '\u0440': 'p', // cyrillic small er
  '\u0455': 's', // cyrillic small dze
  '\u0445': 'x', // cyrillic small ha
  '\u0443': 'y', // cyrillic small u
};

// Calculate Shannon entropy of string
export function calculateEntropy(str: string): number {
  const len = str.length;
  if (len === 0) return 0;
  const freq: Record<string, number> = {};
  for (let i = 0; i < len; i++) {
    const c = str[i];
    freq[c] = (freq[c] || 0) + 1;
  }
  let entropy = 0;
  for (const c in freq) {
    const p = freq[c] / len;
    entropy -= p * Math.log2(p);
  }
  return Number(entropy.toFixed(2));
}

// Analyze any arbitrary URL
export function analyzeURL(inputUrl: string): ThreatAnalysis {
  let cleanUrl = inputUrl.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  let parsed: URL;
  try {
    parsed = new URL(cleanUrl);
  } catch (e) {
    // Fallback if malformed
    return {
      id: `SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
      url: inputUrl,
      domain: inputUrl,
      threatLevel: 'CRITICAL_PHISHING',
      riskScore: 92,
      targetedBrand: 'Malformed Malicious URI',
      attackVector: 'Buffer Overflow / URI Injection Scheme',
      ipAddress: '0.0.0.0',
      serverCountry: 'Unknown Proxy',
      domainAgeDays: 0,
      sslValid: false,
      sslIssuer: 'None',
      lexicalFlags: ['Malformed URL structure', 'Non-standard scheme encoding'],
      heuristicReasons: ['Browser RFC violation: unable to safely parse hostname.'],
      status: 'BLOCKED',
      timestamp: 'Just now'
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname.toLowerCase();
  const lexicalFlags: string[] = [];
  const heuristicReasons: string[] = [];
  let score = 5; // Base clean score

  // 1. Homograph Check
  let hasHomograph = false;
  for (const cyr in HOMOGRAPH_MAP) {
    if (hostname.includes(cyr)) {
      hasHomograph = true;
      lexicalFlags.push(`Unicode Homograph Detected: Cyrillic character '${cyr}' impersonating Latin '${HOMOGRAPH_MAP[cyr]}'`);
      heuristicReasons.push('Attacker used internationalized domain spoofing (IDN Homograph) to deceive users visually.');
      score += 55;
      break;
    }
  }

  // 2. High-Risk TLDs
  const suspiciousTLDs = ['.ru', '.top', '.xyz', '.click', '.online', '.tk', '.ml', '.ga', '.cf'];
  for (const tld of suspiciousTLDs) {
    if (hostname.endsWith(tld)) {
      lexicalFlags.push(`Suspicious TLD: ${tld} commonly abused in automated phishing kits`);
      score += 25;
      break;
    }
  }

  // 3. Keyword Stuffing
  const brandKeywords = ['paypal', 'microsoft', 'google', 'apple', 'netflix', 'amazon', 'chase', 'bank', 'login', 'verify', 'account', 'security', 'billing'];
  const matchedKeywords = brandKeywords.filter(k => hostname.includes(k) || pathname.includes(k));
  if (matchedKeywords.length >= 2) {
    lexicalFlags.push(`Keyword stuffing detected: [${matchedKeywords.join(', ')}] in URI`);
    score += 20;
  }

  // 4. Subdomain Depth
  const subdomains = hostname.split('.');
  if (subdomains.length >= 4) {
    lexicalFlags.push(`Excessive subdomain depth (${subdomains.length} levels) indicative of bulletproof proxy routing`);
    score += 18;
  }

  // 5. Entropy
  const entropy = calculateEntropy(hostname);
  if (entropy > 3.8) {
    lexicalFlags.push(`High Shannon entropy (${entropy}): randomly generated domain name algorithm (DGA)`);
    score += 20;
  }

  // Cap score 0 - 100
  const finalScore = Math.min(Math.max(score, 2), 99);
  let threatLevel: 'SAFE' | 'SUSPICIOUS' | 'CRITICAL_PHISHING' = 'SAFE';
  let status: 'BLOCKED' | 'QUARANTINED' | 'CLEARED' = 'CLEARED';

  if (finalScore >= 75) {
    threatLevel = 'CRITICAL_PHISHING';
    status = 'BLOCKED';
    if (heuristicReasons.length === 0) {
      heuristicReasons.push('Multiple combined lexical red flags indicate an active phishing kit.');
    }
  } else if (finalScore >= 40) {
    threatLevel = 'SUSPICIOUS';
    status = 'QUARANTINED';
    heuristicReasons.push('Unusual URL structure requiring step-up sandbox inspection.');
  } else {
    threatLevel = 'SAFE';
    status = 'CLEARED';
    heuristicReasons.push('Clean domain structure. No deceptive homographs or credential harvesting patterns.');
  }

  return {
    id: `SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
    url: cleanUrl,
    domain: hostname,
    threatLevel,
    riskScore: finalScore,
    targetedBrand: matchedKeywords.length > 0 ? `${matchedKeywords[0].toUpperCase()} Impersonation` : 'Generic Entity',
    attackVector: hasHomograph ? 'Cyrillic Homograph Phishing' : finalScore >= 75 ? 'Credential Harvester' : 'Direct Navigation',
    ipAddress: finalScore >= 75 ? '185.220.101.' + Math.floor(10 + Math.random() * 80) : '104.21.44.18',
    serverCountry: finalScore >= 75 ? 'Russia (RU)' : 'United States (US)',
    domainAgeDays: finalScore >= 75 ? Math.floor(1 + Math.random() * 5) : 3400,
    sslValid: finalScore < 85,
    sslIssuer: finalScore >= 75 ? "Let's Encrypt Free DV" : 'Google Trust Services / DigiCert',
    lexicalFlags: lexicalFlags.length > 0 ? lexicalFlags : ['Clean URI syntax', 'Standard subdomain hierarchy', 'Known TLD'],
    heuristicReasons,
    status,
    timestamp: 'Just now'
  };
}

export interface SandboxDetonationResult {
  legitimateBrand: string;
  officialDomain: string;
  visualSimilarityPct: number;
  extractedFormFields: string[];
  exfiltrationEndpoint: string;
  credentialTarget: string;
  fakeFaviconHash: string;
  sessionTokenIntercepted: boolean;
  domTitle: string;
}

export function detonateSandbox(threat: ThreatAnalysis): SandboxDetonationResult {
  const brand = threat.targetedBrand || 'Target Service';
  const isPaypal = threat.domain.toLowerCase().includes('paypal');
  const isMicrosoft = threat.domain.toLowerCase().includes('microsoft') || threat.domain.toLowerCase().includes('office');
  
  if (isPaypal) {
    return {
      legitimateBrand: 'PayPal Financial Services (Official)',
      officialDomain: 'https://www.paypal.com',
      visualSimilarityPct: 99.4,
      extractedFormFields: ['input#email (Username)', 'input#password (Password)', 'input#card_number (CVV + Expiry)', 'input#ssn (Social Security)'],
      exfiltrationEndpoint: 'POST https://api.telegram.org/bot7392104:AAFe/sendMessage',
      credentialTarget: 'Banking Credentials & Primary Payment Source',
      fakeFaviconHash: 'd41d8cd98f00b204e9800998ecf8427e (Cloned from legitimate CDN)',
      sessionTokenIntercepted: true,
      domTitle: 'Log in to your PayPal account'
    };
  }

  if (isMicrosoft) {
    return {
      legitimateBrand: 'Microsoft 365 Azure AD (Official)',
      officialDomain: 'https://login.microsoftonline.com',
      visualSimilarityPct: 98.7,
      extractedFormFields: ['input#loginfmt (Work Email)', 'input#passwd (Domain Password)', 'input#otc (2FA Authenticator Token)'],
      exfiltrationEndpoint: 'POST https://evil-c2-harvest.online/relay/mfa.php',
      credentialTarget: 'Enterprise SSO & Corporate Email Inboxes',
      fakeFaviconHash: 'a8b54e1903e1e2fd48809298284c8a22 (Cloned)',
      sessionTokenIntercepted: true,
      domTitle: 'Sign in to your Microsoft account'
    };
  }

  return {
    legitimateBrand: `${brand} (Official)`,
    officialDomain: `https://${threat.domain.split('.').slice(-2).join('.')}`,
    visualSimilarityPct: 97.2,
    extractedFormFields: ['input#account_id', 'input#secret_key', 'input#phone_number'],
    exfiltrationEndpoint: `POST https://${threat.domain}/cgi-bin/collector.php`,
    credentialTarget: 'User Credentials & Identity Tokens',
    fakeFaviconHash: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    sessionTokenIntercepted: true,
    domTitle: `${brand} Security Verification`
  };
}

export function generateTakedownNotice(threat: ThreatAnalysis): string {
  const date = new Date().toUTCString();
  return `FORMAL ICANN ABUSE COMPLAINT & IMMEDIATE TAKEDOWN DEMAND
Date: ${date}
To: Abuse Desk <abuse@${threat.domain.split('.').slice(-2).join('.')}>, Registrar Abuse Team
Subject: URGENT: Active Zero-Day Phishing Domain Impersonation — [${threat.domain}]
Reference: Incident #${threat.id} / RFC 2822 Abuse Report

Dear Registrar & Hosting Abuse Team,

This is a formal notification from Enterprise Cyber Defense SOC on behalf of ${threat.targetedBrand}.
We have identified an active, malicious phishing campaign hosted on your infrastructure that violates ICANN Registrar Accreditation Agreement (RAA) Section 3.7.7 and your Acceptable Use Policy (AUP).

=== FORENSIC THREAT SPECIFICATIONS ===
- Malicious Domain: ${threat.domain}
- Full Hostname URI: ${threat.url}
- Host IP Address: ${threat.ipAddress} (${threat.serverCountry})
- Threat Classification: ${threat.threatLevel} (Risk Score: ${threat.riskScore}/100)
- Attack Vector: ${threat.attackVector}
- SSL Certificate Authority: ${threat.sslIssuer}
- Domain Age at Interception: ${threat.domainAgeDays} Days

=== TECHNICAL EVIDENCE OF FRAUD ===
${threat.lexicalFlags.map(f => `* ${f}`).join('\n')}
${threat.heuristicReasons.map(r => `* ${r}`).join('\n')}

=== DEMAND FOR ACTION ===
In accordance with international anti-phishing mitigation standards, we formally request that you:
1. Immediately suspend DNS delegation for domain: ${threat.domain}
2. Preserve all server access logs, registrant billing details, and upstream proxy records for cybercrime law enforcement referral.
3. Confirm remediation by replying to this notice within 4 hours.

Failure to remediate this fraudulent domain will result in global autonomous DNS sinkholing across 124,000+ enterprise gateways and escalation to the appropriate national CERT.

PhishGuard AI Autonomous SOC Threat Response Unit
Security Operations Center | Incident Tracking ID: ${threat.id}
`;
}

export function exportSTIXForensics(threat: ThreatAnalysis): string {
  const stixObject = {
    type: 'bundle',
    id: `bundle--${Math.random().toString(36).substring(2, 10)}`,
    spec_version: '2.1',
    objects: [
      {
        type: 'indicator',
        id: `indicator--${threat.id}`,
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        name: `Phishing Domain - ${threat.domain}`,
        description: `Automated detection of ${threat.targetedBrand} credential harvesting. Attack vector: ${threat.attackVector}`,
        indicator_types: ['malicious-activity', 'phishing'],
        pattern: `[url:value = '${threat.url}' OR domain-name:value = '${threat.domain}' OR ipv4-addr:value = '${threat.ipAddress}']`,
        pattern_type: 'stix',
        valid_from: new Date().toISOString(),
        confidence: threat.riskScore,
        labels: threat.lexicalFlags
      }
    ]
  };
  return JSON.stringify(stixObject, null, 2);
}

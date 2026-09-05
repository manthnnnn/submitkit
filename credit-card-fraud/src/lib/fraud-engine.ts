import { Transaction, FraudRule } from './fraud-data';

const RANDOM_NAMES = ['Alexander Reed', 'Sophia Martinez', 'Liam O\'Connor', 'Fatima Al-Sayed', 'Kenji Sato', 'Emma Watson', 'Carlos Gomez', 'Elena Rostova', 'Marcus Vance'];
const RANDOM_MERCHANTS: { name: string; category: Transaction['category']; baseRisk: number }[] = [
  { name: 'Uber Technologies', category: 'Travel & Flights', baseRisk: 8 },
  { name: 'Rolex Boutique Geneva', category: 'Luxury Goods', baseRisk: 75 },
  { name: 'Binance P2P Crypto', category: 'Crypto Exchange', baseRisk: 85 },
  { name: 'Best Buy Electronics', category: 'Electronics', baseRisk: 35 },
  { name: 'Starbucks Coffee', category: 'Dining', baseRisk: 4 },
  { name: 'Target Supercenter', category: 'Grocery', baseRisk: 10 },
  { name: 'Singapore Airlines', category: 'Travel & Flights', baseRisk: 45 },
  { name: 'Apple Fifth Avenue', category: 'Electronics', baseRisk: 30 },
  { name: 'Gucci Beverly Hills', category: 'Luxury Goods', baseRisk: 70 }
];

const RANDOM_CITIES: { city: string; country: string }[] = [
  { city: 'New York, NY', country: 'US' },
  { city: 'London', country: 'GB' },
  { city: 'Tokyo', country: 'JP' },
  { city: 'Berlin', country: 'DE' },
  { city: 'Sao Paulo', country: 'BR' },
  { city: 'Dubai', country: 'AE' },
  { city: 'San Francisco, CA', country: 'US' },
  { city: 'Dubrovnik', country: 'HR' }
];

export function evaluateTransactionWithRules(txn: Transaction, activeRules: FraudRule[] = []): Transaction {
  const updatedTriggers = [...txn.triggers];
  let updatedRisk = txn.riskScore;
  let isBlockedByRule = false;

  for (const rule of activeRules) {
    if (!rule.isEnabled) continue;

    // Evaluate amount thresholds
    if (rule.thresholdValue && txn.amount >= rule.thresholdValue) {
      updatedTriggers.push(`Triggered Rule: ${rule.name} (Amount ≥ $${rule.thresholdValue})`);
      updatedRisk = Math.max(updatedRisk, 95);
      isBlockedByRule = true;
    }

    // Evaluate location / geo rules
    if (rule.name.toLowerCase().includes('foreign') && txn.country !== 'US') {
      updatedTriggers.push(`Triggered Rule: ${rule.name} (${txn.country})`);
      updatedRisk = Math.max(updatedRisk, 88);
      isBlockedByRule = true;
    }

    // Evaluate crypto / high risk merchant rules
    if (rule.name.toLowerCase().includes('crypto') && txn.category === 'Crypto Exchange') {
      updatedTriggers.push(`Triggered Rule: ${rule.name} (Crypto Asset Outflow)`);
      updatedRisk = Math.max(updatedRisk, 94);
      isBlockedByRule = true;
    }
  }

  if (isBlockedByRule) {
    return {
      ...txn,
      riskScore: Math.min(99, updatedRisk),
      riskLevel: 'CRITICAL_FRAUD',
      status: 'BLOCKED',
      triggers: Array.from(new Set(updatedTriggers))
    };
  }

  return txn;
}

export function generateRandomTransaction(activeRules?: FraudRule[]): Transaction {
  const name = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
  const merchantObj = RANDOM_MERCHANTS[Math.floor(Math.random() * RANDOM_MERCHANTS.length)];
  const locationObj = RANDOM_CITIES[Math.floor(Math.random() * RANDOM_CITIES.length)];
  
  // Random amount between $10 and $4,500
  const isHighValue = Math.random() > 0.75;
  const amount = isHighValue 
    ? Math.round(1200 + Math.random() * 3200) 
    : Math.round(15 + Math.random() * 180);

  // Anomaly calculation
  const triggers: string[] = [];
  let riskScore = merchantObj.baseRisk + Math.floor(Math.random() * 15);

  if (amount > 2000) {
    riskScore += 25;
    triggers.push(`High Transaction Amount ($${amount.toLocaleString()})`);
  }

  if (Math.random() > 0.8) {
    riskScore += 30;
    triggers.push('Impossible Velocity (>800 mi/hr)');
  }

  if (Math.random() > 0.85) {
    riskScore += 20;
    triggers.push('New Untrusted Device / Tor Exit Node');
  }

  riskScore = Math.min(99, Math.max(2, riskScore));

  let riskLevel: Transaction['riskLevel'] = 'LOW';
  let status: Transaction['status'] = 'APPROVED';

  if (riskScore >= 75) {
    riskLevel = 'CRITICAL_FRAUD';
    status = 'BLOCKED';
  } else if (riskScore >= 45) {
    riskLevel = 'MEDIUM';
    status = 'CHALLENGED_3DS';
  }

  const txn: Transaction = {
    id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
    cardLast4: String(Math.floor(1000 + Math.random() * 9000)),
    cardholderName: name,
    amount,
    currency: 'USD',
    merchant: merchantObj.name,
    category: merchantObj.category,
    location: locationObj.city,
    country: locationObj.country,
    ipAddress: `${Math.floor(50 + Math.random() * 150)}.${Math.floor(10 + Math.random() * 200)}.${Math.floor(1 + Math.random() * 250)}.${Math.floor(1 + Math.random() * 250)}`,
    device: Math.random() > 0.5 ? 'iPhone 16 Pro (Safari)' : 'Windows Chrome Desktop v132',
    timestamp: 'Just now',
    riskScore,
    riskLevel,
    status,
    triggers
  };

  return activeRules ? evaluateTransactionWithRules(txn, activeRules) : txn;
}

// 1-Click Attack Generators for Demos
export function simulateCardTestingAttack(): Transaction {
  return {
    id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
    cardLast4: '0419',
    cardholderName: 'Unknown Script Botnet',
    amount: 1.49,
    currency: 'USD',
    merchant: 'Spotify Digital Test',
    category: 'Electronics',
    location: 'Lagos, Nigeria',
    country: 'NG',
    ipAddress: '197.210.64.12',
    device: 'Headless Chrome / Python Requests Script',
    timestamp: 'Just now',
    riskScore: 97,
    riskLevel: 'CRITICAL_FRAUD',
    status: 'BLOCKED',
    triggers: [
      'Card Testing Velocity Attack (14 attempts/sec)',
      'Headless Browser Automation Flagged',
      'High-Risk Autonomous ASN Host'
    ]
  };
}

export function simulateImpossibleTravelAttack(): Transaction {
  return {
    id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
    cardLast4: '8831',
    cardholderName: 'Marcus Vance',
    amount: 4890.00,
    currency: 'USD',
    merchant: 'Tokyo Ginza Luxury Jewelry',
    category: 'Luxury Goods',
    location: 'Tokyo, Japan',
    country: 'JP',
    ipAddress: '133.242.18.9',
    device: 'Unknown Linux X11 Workstation',
    timestamp: 'Just now',
    riskScore: 99,
    riskLevel: 'CRITICAL_FRAUD',
    status: 'BLOCKED',
    triggers: [
      'Impossible Travel: Previous swipe in SF 8 minutes ago (6,700 mph)',
      'Transaction Spike: 38x normal cardholder spend pattern',
      'Chip Fallback to Magnetic Stripe Simulation'
    ]
  };
}

export interface Transaction {
  id: string;
  cardLast4: string;
  cardholderName: string;
  amount: number;
  currency: string;
  merchant: string;
  category: 'Electronics' | 'Travel & Flights' | 'Luxury Goods' | 'Crypto Exchange' | 'Dining' | 'Grocery';
  location: string;
  country: string;
  ipAddress: string;
  device: string;
  timestamp: string;
  riskScore: number; // 0 - 100
  riskLevel: 'LOW' | 'MEDIUM' | 'CRITICAL_FRAUD';
  status: 'APPROVED' | 'CHALLENGED_3DS' | 'BLOCKED';
  triggers: string[];
}

export interface FraudRule {
  id: string;
  name: string;
  description: string;
  severity: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  thresholdValue: number;
  isEnabled: boolean;
  triggersCount: number;
}

export interface Dispute {
  id: string;
  transactionId: string;
  cardholder: string;
  amount: number;
  merchant: string;
  filedDate: string;
  reason: string;
  status: 'PENDING_REVIEW' | 'EVIDENCE_REQUIRED' | 'REFUNDED' | 'DISMISSED';
}

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-9021',
    cardLast4: '4821',
    cardholderName: 'Sarah Jenkins',
    amount: 3450.00,
    currency: 'USD',
    merchant: 'Dubrovnik Luxury Watches',
    category: 'Luxury Goods',
    location: 'Dubrovnik, Croatia',
    country: 'HR',
    ipAddress: '185.220.101.5',
    device: 'Unknown Android (Tor Exit Node)',
    timestamp: 'Just now',
    riskScore: 94,
    riskLevel: 'CRITICAL_FRAUD',
    status: 'BLOCKED',
    triggers: ['Impossible Velocity (5,200 mi in 25m)', 'Tor Exit IP Detected', 'High Amount > $3,000']
  },
  {
    id: 'TXN-9020',
    cardLast4: '1190',
    cardholderName: 'David Miller',
    amount: 14.50,
    currency: 'USD',
    merchant: 'Blue Bottle Coffee',
    category: 'Dining',
    location: 'San Francisco, USA',
    country: 'US',
    ipAddress: '24.130.44.18',
    device: 'iPhone 15 Pro (Safari)',
    timestamp: '1m ago',
    riskScore: 6,
    riskLevel: 'LOW',
    status: 'APPROVED',
    triggers: []
  },
  {
    id: 'TXN-9019',
    cardLast4: '7732',
    cardholderName: 'Elena Rostova',
    amount: 1890.00,
    currency: 'USD',
    merchant: 'Binance Global P2P',
    category: 'Crypto Exchange',
    location: 'Lagos, Nigeria',
    country: 'NG',
    ipAddress: '102.89.33.201',
    device: 'Chrome Windows 11',
    timestamp: '2m ago',
    riskScore: 82,
    riskLevel: 'CRITICAL_FRAUD',
    status: 'BLOCKED',
    triggers: ['High-Risk Crypto MCC', 'Cross-Border Geolocation Jump']
  },
  {
    id: 'TXN-9018',
    cardLast4: '3410',
    cardholderName: 'Michael Chang',
    amount: 420.00,
    currency: 'USD',
    merchant: 'Apple Store Regent St',
    category: 'Electronics',
    location: 'London, UK',
    country: 'GB',
    ipAddress: '81.187.20.10',
    device: 'MacBook Air (Chrome)',
    timestamp: '3m ago',
    riskScore: 54,
    riskLevel: 'MEDIUM',
    status: 'CHALLENGED_3DS',
    triggers: ['International Card Swipe', 'Amount Deviation 2.4x']
  },
  {
    id: 'TXN-9017',
    cardLast4: '9844',
    cardholderName: 'Jessica Taylor',
    amount: 68.20,
    currency: 'USD',
    merchant: 'Whole Foods Market',
    category: 'Grocery',
    location: 'Austin, TX',
    country: 'US',
    ipAddress: '72.180.12.9',
    device: 'Apple Pay (iPhone 14)',
    timestamp: '5m ago',
    riskScore: 4,
    riskLevel: 'LOW',
    status: 'APPROVED',
    triggers: []
  }
];

export const INITIAL_RULES: FraudRule[] = [
  {
    id: 'RULE-1',
    name: 'Impossible Geolocation Travel Velocity',
    description: 'Triggers when consecutive card swipes occur > 500 miles apart in under 60 minutes.',
    severity: 'CRITICAL',
    thresholdValue: 500,
    isEnabled: true,
    triggersCount: 142
  },
  {
    id: 'RULE-2',
    name: 'High-Value Card-Not-Present Threshold',
    description: 'Requires 3D Secure biometric confirmation for online purchases exceeding threshold.',
    severity: 'HIGH',
    thresholdValue: 1500,
    isEnabled: true,
    triggersCount: 89
  },
  {
    id: 'RULE-3',
    name: 'High-Risk Crypto & Gambling MCC Gate',
    description: 'Restricts crypto exchange and offshore gaming transactions with unverified merchant credentials.',
    severity: 'CRITICAL',
    thresholdValue: 75,
    isEnabled: true,
    triggersCount: 230
  },
  {
    id: 'RULE-4',
    name: 'Tor / Proxy / Anonymizing VPN Blacklist',
    description: 'Blocks transactions originating from known malicious IP ranges and public proxy networks.',
    severity: 'HIGH',
    thresholdValue: 90,
    isEnabled: true,
    triggersCount: 64
  }
];

export const INITIAL_DISPUTES: Dispute[] = [
  {
    id: 'DSP-401',
    transactionId: 'TXN-8841',
    cardholder: 'Marcus Vance',
    amount: 1240.00,
    merchant: 'Electronics Superstore Miami',
    filedDate: '2026-09-02',
    reason: 'Card was in cardholder possession in Austin, TX during Miami swipe.',
    status: 'PENDING_REVIEW'
  },
  {
    id: 'DSP-402',
    transactionId: 'TXN-8720',
    cardholder: 'Amanda Cruz',
    amount: 550.00,
    merchant: 'Airline Booking Direct',
    filedDate: '2026-09-01',
    reason: 'Duplicate billing charge for single itinerary.',
    status: 'REFUNDED'
  },
  {
    id: 'DSP-403',
    transactionId: 'TXN-8692',
    cardholder: 'Robert Hughes',
    amount: 89.00,
    merchant: 'Digital Streaming Subscription',
    filedDate: '2026-08-30',
    reason: 'Unauthorized recurring charge after trial expiration.',
    status: 'EVIDENCE_REQUIRED'
  }
];

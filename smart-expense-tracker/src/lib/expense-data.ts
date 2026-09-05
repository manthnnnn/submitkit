export interface ExpenseItem {
  id: string;
  merchant: string;
  category: 'Cloud & SaaS' | 'Travel & Rides' | 'Client Dining' | 'Hardware' | 'Office Ops';
  department: 'Engineering' | 'Sales' | 'Marketing' | 'Executive';
  amount: number;
  currency: string;
  employeeName: string;
  employeeAvatar: string;
  cardLast4: string;
  receiptUrl?: string;
  hasItemizedReceipt: boolean;
  isWeekend: boolean;
  policyStatus: 'COMPLIANT_APPROVED' | 'REQUIRES_REVIEW' | 'POLICY_VIOLATION_FLAGGED';
  complianceFlags: string[];
  explanation: string;
  date: string;
}

export interface DepartmentBudget {
  name: 'Engineering' | 'Sales' | 'Marketing' | 'Executive';
  allocated: number;
  spent: number;
  remaining: number;
  burnRatePercent: number;
}

export const INITIAL_BUDGETS: DepartmentBudget[] = [
  { name: 'Engineering', allocated: 50000, spent: 34200, remaining: 15800, burnRatePercent: 68 },
  { name: 'Sales', allocated: 30000, spent: 18450, remaining: 11550, burnRatePercent: 61 },
  { name: 'Marketing', allocated: 25000, spent: 22100, remaining: 2900, burnRatePercent: 88 },
  { name: 'Executive', allocated: 20000, spent: 11500, remaining: 8500, burnRatePercent: 57 },
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 'EXP-901',
    merchant: 'Amazon Web Services (AWS)',
    category: 'Cloud & SaaS',
    department: 'Engineering',
    amount: 4250.00,
    currency: 'USD',
    employeeName: 'Alex Rivera',
    employeeAvatar: 'AR',
    cardLast4: '7104',
    hasItemizedReceipt: true,
    isWeekend: false,
    policyStatus: 'COMPLIANT_APPROVED',
    complianceFlags: [
      'Pre-authorized vendor in Procurement Directory',
      'Matches monthly cloud infrastructure baseline ($4k - $5k)',
      'Itemized PDF tax invoice verified by OCR'
    ],
    explanation: 'Approved under standard Engineering Cloud Infrastructure monthly allowance.',
    date: 'Today, 10:14 AM'
  },
  {
    id: 'EXP-902',
    merchant: 'Uber Technologies (VIP Black)',
    category: 'Travel & Rides',
    department: 'Sales',
    amount: 185.00,
    currency: 'USD',
    employeeName: 'Jessica Vance',
    employeeAvatar: 'JV',
    cardLast4: '2289',
    hasItemizedReceipt: true,
    isWeekend: true,
    policyStatus: 'REQUIRES_REVIEW',
    complianceFlags: [
      'Weekend transaction timestamp (Saturday 11:45 PM)',
      'Premium ride tier (Uber Black VIP requested)',
      'Requires client business justification memo'
    ],
    explanation: 'Flagged for manager sign-off due to weekend evening travel timestamp.',
    date: 'Saturday, 11:45 PM'
  },
  {
    id: 'EXP-903',
    merchant: 'Grand Luxury Alpine Resort',
    category: 'Client Dining',
    department: 'Executive',
    amount: 3200.00,
    currency: 'USD',
    employeeName: 'Marcus Sterling',
    employeeAvatar: 'MS',
    cardLast4: '9901',
    hasItemizedReceipt: false,
    isWeekend: false,
    policyStatus: 'POLICY_VIOLATION_FLAGGED',
    complianceFlags: [
      'Single meal/lodging charge exceeds $500 category limit by 540%',
      'Missing required itemized merchant tax receipt',
      'No pre-trip executive VP travel approval on file'
    ],
    explanation: 'Strict policy violation: charge frozen pending itemized receipt and CFO override.',
    date: 'Yesterday, 8:30 PM'
  },
  {
    id: 'EXP-904',
    merchant: 'GitHub Enterprise Copilot',
    category: 'Cloud & SaaS',
    department: 'Engineering',
    amount: 840.00,
    currency: 'USD',
    employeeName: 'Elena Rostova',
    employeeAvatar: 'ER',
    cardLast4: '4192',
    hasItemizedReceipt: true,
    isWeekend: false,
    policyStatus: 'COMPLIANT_APPROVED',
    complianceFlags: [
      'Approved developer productivity tool',
      'Annual enterprise seat discount applied ($21/seat/mo)'
    ],
    explanation: 'Routine developer tooling subscription cleared automatically.',
    date: 'Sep 3, 2:10 PM'
  },
  {
    id: 'EXP-905',
    merchant: 'Figma Organization Seats',
    category: 'Cloud & SaaS',
    department: 'Marketing',
    amount: 450.00,
    currency: 'USD',
    employeeName: 'David Chen',
    employeeAvatar: 'DC',
    cardLast4: '3318',
    hasItemizedReceipt: true,
    isWeekend: false,
    policyStatus: 'COMPLIANT_APPROVED',
    complianceFlags: [
      'Design software standard license',
      'Within Marketing monthly SaaS cap'
    ],
    explanation: 'Cleared under departmental software expense rules.',
    date: 'Sep 2, 4:45 PM'
  }
];

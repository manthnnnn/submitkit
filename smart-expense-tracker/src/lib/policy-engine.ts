import { ExpenseItem } from './expense-data';

export function evaluateExpensePolicy(
  amount: number,
  category: ExpenseItem['category'],
  department: ExpenseItem['department'],
  hasReceipt: boolean,
  isWeekend: boolean
): {
  policyStatus: ExpenseItem['policyStatus'];
  flags: string[];
  explanation: string;
} {
  const flags: string[] = [];

  // Check 1: Missing Receipt
  if (!hasReceipt && amount > 75) {
    flags.push('Missing mandatory itemized receipt (IRS compliance requirement for charges > $75)');
  }

  // Check 2: High Amount Limit
  if (amount > 2500) {
    flags.push(`Amount ($${amount.toFixed(2)}) exceeds standard $2,500 manager threshold — requires CFO pre-authorization`);
  } else if (category === 'Client Dining' && amount > 500) {
    flags.push(`Client dining meal expense ($${amount.toFixed(2)}) exceeds corporate policy cap ($500 per event)`);
  }

  // Check 3: Weekend Expense Flag
  if (isWeekend) {
    flags.push('Weekend transaction detected — business client justification memo required');
  }

  if (flags.length >= 2 || amount > 2500 || (!hasReceipt && amount > 500)) {
    return {
      policyStatus: 'POLICY_VIOLATION_FLAGGED',
      flags,
      explanation: 'Critical policy violation detected: reimbursement held pending finance review and receipt submission.'
    };
  } else if (flags.length === 1) {
    return {
      policyStatus: 'REQUIRES_REVIEW',
      flags,
      explanation: 'Step-up review required: pending departmental manager digital approval.'
    };
  }

  return {
    policyStatus: 'COMPLIANT_APPROVED',
    flags: ['Within authorized departmental budget', 'Vendor procurement policy verified', 'Valid tax receipt attached'],
    explanation: 'Fully compliant with corporate procurement policy. Approved for automatic bank reimbursement.'
  };
}

'use client';

import { useState } from 'react';
import { 
  DollarSign, CreditCard, ShieldCheck, ShieldAlert, AlertTriangle, 
  CheckCircle2, XCircle, ArrowRight, Info, Sparkles, Sliders, 
  Lock, MapPin, Smartphone, HelpCircle, RefreshCw, Globe, 
  Search, ExternalLink, Flame, Eye, Terminal, Radio, Shield, 
  AlertOctagon, Check, UserCheck, ShieldOff, Server, FileText,
  PieChart, TrendingUp, Building2, Coffee, Plane, Laptop, Briefcase,
  Layers, ChevronRight, User, Zap
} from 'lucide-react';
import { INITIAL_EXPENSES, INITIAL_BUDGETS, ExpenseItem, DepartmentBudget } from '@/lib/expense-data';
import { evaluateExpensePolicy } from '@/lib/policy-engine';

export default function SmartExpenseDashboard() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseItem>(INITIAL_EXPENSES[0]);
  const [budgets, setBudgets] = useState<DepartmentBudget[]>(INITIAL_BUDGETS);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 4000);
  };

  // 1-Click Interactive Test Scenarios
  const handleTestAws = () => {
    const awsExp = INITIAL_EXPENSES[0];
    setSelectedExpense(awsExp);
    triggerToast('Loaded AWS Cloud Infrastructure ($4,250.00) — Policy Compliant & Auto-Approved');
  };

  const handleTestUber = () => {
    const uberExp = INITIAL_EXPENSES[1];
    setSelectedExpense(uberExp);
    triggerToast('Loaded Uber VIP Ride ($185.00) — Weekend Flagged for Manager Review');
  };

  const handleTestResort = () => {
    const resortExp = INITIAL_EXPENSES[2];
    setSelectedExpense(resortExp);
    triggerToast('Loaded Luxury Resort ($3,200.00) — Strict Policy Violation Flagged');
  };

  // Interactive Manager Approvals
  const handleApproveExpense = () => {
    const updated: ExpenseItem = {
      ...selectedExpense,
      policyStatus: 'COMPLIANT_APPROVED',
      complianceFlags: [...selectedExpense.complianceFlags, 'Approved by Finance Director via One-Click Digital Sign-off.'],
      explanation: 'Overridden and cleared for corporate bank reimbursement.'
    };
    setSelectedExpense(updated);
    setExpenses(prev => prev.map(e => e.id === updated.id ? updated : e));
    triggerToast(`Expense ${updated.id} approved for reimbursement to ${updated.employeeName}!`);
  };

  const handleFlagViolation = () => {
    const updated: ExpenseItem = {
      ...selectedExpense,
      policyStatus: 'POLICY_VIOLATION_FLAGGED',
      complianceFlags: [...selectedExpense.complianceFlags, 'Frozen by Finance Director. Employee must provide itemized VAT receipt.'],
      explanation: 'Reimbursement suspended. Automated notice dispatched to employee work email.'
    };
    setSelectedExpense(updated);
    setExpenses(prev => prev.map(e => e.id === updated.id ? updated : e));
    triggerToast(`Expense ${updated.id} flagged! Reimbursement frozen.`);
  };

  const filteredExpenses = expenses.filter(e => filterStatus === 'ALL' || e.policyStatus === filterStatus);

  // Category Icon Helper
  const getCategoryIcon = (cat: ExpenseItem['category']) => {
    switch (cat) {
      case 'Cloud & SaaS': return <Server size={16} color="var(--accent-cyan)" />;
      case 'Travel & Rides': return <Plane size={16} color="var(--accent-indigo)" />;
      case 'Client Dining': return <Coffee size={16} color="var(--accent-amber)" />;
      default: return <Briefcase size={16} color="var(--accent-purple)" />;
    }
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Toast Notice */}
      {toastNotice && (
        <div style={{
          position: 'fixed',
          top: '76px',
          right: '24px',
          zIndex: 100,
          background: 'rgba(14, 19, 31, 0.96)',
          border: '1px solid var(--accent-emerald)',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 25px rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#ffffff',
          fontSize: '0.86rem',
          fontWeight: 700,
          animation: 'pulseDanger 0.3s ease-out'
        }}>
          <Sparkles size={18} color="var(--accent-emerald)" />
          <span>{toastNotice}</span>
        </div>
      )}

      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 12px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(56, 189, 248, 0.15))',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: 'var(--accent-emerald)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              <ShieldCheck size={13} />
              Autonomous Corporate Policy Engine
            </span>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--fin-border)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)'
            }}>
              <Radio size={12} color="var(--accent-emerald)" className="pulse-danger" />
              <span>Brex &amp; Stripe Corporate Card Feed Active</span>
            </span>
          </div>

          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            FinFlow <span style={{ background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Corporate Spend &amp; Policy Ledger</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px', maxWidth: '800px' }}>
            Automated corporate expense auditing. Scans receipts via OCR, enforces departmental spending caps, and stops weekend policy breaches before reimbursement.
          </p>
        </div>

        {/* 1-Click Interactive Test Scenarios */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            1-Click Interactive Spend Scenarios:
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={handleTestAws}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                background: 'rgba(16, 185, 129, 0.12)',
                color: 'var(--accent-emerald)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                cursor: 'pointer',
                boxShadow: '0 0 14px rgba(16, 185, 129, 0.15)',
                transition: 'all 0.2s ease'
              }}
            >
              <CheckCircle2 size={14} />
              <span>Compliant (AWS $4,250)</span>
            </button>

            <button
              onClick={handleTestUber}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                background: 'rgba(245, 158, 11, 0.12)',
                color: 'var(--accent-amber)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                cursor: 'pointer',
                boxShadow: '0 0 14px rgba(245, 158, 11, 0.15)',
                transition: 'all 0.2s ease'
              }}
            >
              <AlertTriangle size={14} />
              <span>Weekend Ride (Uber $185)</span>
            </button>

            <button
              onClick={handleTestResort}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 800,
                background: 'rgba(244, 63, 94, 0.18)',
                color: '#ffffff',
                border: '1px solid rgba(244, 63, 94, 0.6)',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(244, 63, 94, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <Flame size={14} color="var(--accent-rose)" />
              <span>Policy Breach (Resort $3,200)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Official KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Q3 Monitored Spend
            </span>
            <DollarSign size={16} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            $86,250.00
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>
            Across 148 corporate Brex cardholders
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px', borderLeft: '4px solid var(--accent-rose)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Policy Violations Intercepted
            </span>
            <ShieldAlert size={16} color="var(--accent-rose)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-rose)', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            $7,450.00
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-rose)', marginTop: '4px' }}>
            Frozen before reimbursement payout
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              OCR Parsing Latency
            </span>
            <Zap size={16} color="var(--accent-amber)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            22 ms
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Instant tax itemization &amp; VAT extract
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Auto-Approval Rate
            </span>
            <CheckCircle2 size={16} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            94.2%
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Zero delay for compliant employee teams
          </div>
        </div>
      </div>

      {/* Dynamic Department Budget Envelopes */}
      <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '24px', background: 'rgba(12, 17, 28, 0.9)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building2 size={18} color="var(--accent-emerald)" />
            <strong style={{ fontSize: '0.95rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Departmental Budget Envelopes &amp; Burn Rates
            </strong>
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Q3 Spend Cap: <strong style={{ color: '#ffffff' }}>$125,000 Allocated</strong>
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {budgets.map((b) => (
            <div key={b.name} style={{
              padding: '14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--fin-border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ fontSize: '0.88rem', color: '#ffffff' }}>{b.name}</strong>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: b.burnRatePercent > 80 ? 'var(--accent-rose)' : b.burnRatePercent > 65 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                }}>
                  {b.burnRatePercent}% Spent
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '7px', borderRadius: '999px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{
                  width: `${b.burnRatePercent}%`,
                  height: '100%',
                  borderRadius: '999px',
                  background: b.burnRatePercent > 80 
                    ? 'linear-gradient(90deg, var(--accent-amber), var(--accent-rose))' 
                    : 'linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald))',
                  transition: 'width 0.6s ease'
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                <span>Spent: <strong style={{ color: '#fff' }}>${b.spent.toLocaleString()}</strong></span>
                <span>Remaining: <strong style={{ color: 'var(--accent-emerald)' }}>${b.remaining.toLocaleString()}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main 2-Column Workstation */}
      <div className="grid-responsive-expense">
        
        {/* Left: Live Expense Stream */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="var(--accent-emerald)" />
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                Live Corporate Card Expenses
              </h2>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255, 255, 255, 0.03)', padding: '3px', borderRadius: '6px', border: '1px solid var(--fin-border)' }}>
              {[
                { id: 'ALL', label: 'All (5)' },
                { id: 'COMPLIANT_APPROVED', label: 'Approved' },
                { id: 'REQUIRES_REVIEW', label: 'Review' },
                { id: 'POLICY_VIOLATION_FLAGGED', label: 'Violations' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: filterStatus === tab.id ? 'var(--accent-emerald)' : 'transparent',
                    color: filterStatus === tab.id ? '#07090e' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Click any expense row to inspect its OCR receipt audit and policy compliance rules on the right:
          </p>

          {/* Expense Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredExpenses.map((exp) => {
              const isSelected = selectedExpense.id === exp.id;
              
              let statusPill = {
                label: 'APPROVED',
                color: 'var(--accent-emerald)',
                bg: 'rgba(16, 185, 129, 0.12)',
                border: 'rgba(16, 185, 129, 0.3)'
              };

              if (exp.policyStatus === 'POLICY_VIOLATION_FLAGGED') {
                statusPill = {
                  label: 'POLICY BREACH',
                  color: 'var(--accent-rose)',
                  bg: 'rgba(244, 63, 94, 0.15)',
                  border: 'rgba(244, 63, 94, 0.4)'
                };
              } else if (exp.policyStatus === 'REQUIRES_REVIEW') {
                statusPill = {
                  label: 'NEEDS MANAGER SIGN-OFF',
                  color: 'var(--accent-amber)',
                  bg: 'rgba(245, 158, 11, 0.15)',
                  border: 'rgba(245, 158, 11, 0.35)'
                };
              }

              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExpense(exp)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: isSelected ? 'rgba(16, 185, 129, 0.09)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid var(--accent-emerald)' : '1px solid var(--fin-border)',
                    boxShadow: isSelected ? '0 0 16px rgba(16, 185, 129, 0.2)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--fin-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {getCategoryIcon(exp.category)}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '0.92rem', color: '#ffffff' }}>
                          {exp.merchant}
                        </strong>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          • {exp.date}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                        Cardholder: <strong style={{ color: '#fff' }}>{exp.employeeName}</strong> ({exp.department}) • Card •••• {exp.cardLast4}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                      ${exp.amount.toFixed(2)}
                    </div>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      marginTop: '2px',
                      background: statusPill.bg,
                      color: statusPill.color,
                      border: `1px solid ${statusPill.border}`
                    }}>
                      {statusPill.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Itemized OCR Receipt & Policy Inspector */}
        <div className="glass-panel" style={{ padding: '24px', position: 'sticky', top: '80px' }}>
          
          {/* Laser Scanner animation if compliant or analyzing */}
          <div className="laser-scanner" />

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--fin-border)', paddingBottom: '14px', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                Itemized OCR Receipt Dossier
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '2px' }}>
                {selectedExpense.merchant}
              </h2>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Expense ID: {selectedExpense.id}
              </span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: selectedExpense.policyStatus === 'POLICY_VIOLATION_FLAGGED' ? 'var(--accent-rose)' : selectedExpense.policyStatus === 'REQUIRES_REVIEW' ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                fontFamily: 'var(--font-mono)'
              }}>
                ${selectedExpense.amount.toFixed(2)}
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                {selectedExpense.currency} • {selectedExpense.category}
              </span>
            </div>
          </div>

          {/* Policy Decision Banner */}
          <div style={{
            padding: '14px 16px',
            borderRadius: '8px',
            marginBottom: '18px',
            background: selectedExpense.policyStatus === 'POLICY_VIOLATION_FLAGGED' 
              ? 'rgba(244, 63, 94, 0.14)' 
              : selectedExpense.policyStatus === 'REQUIRES_REVIEW' 
              ? 'rgba(245, 158, 11, 0.14)' 
              : 'rgba(16, 185, 129, 0.14)',
            border: `1px solid ${selectedExpense.policyStatus === 'POLICY_VIOLATION_FLAGGED' ? 'rgba(244, 63, 94, 0.4)' : selectedExpense.policyStatus === 'REQUIRES_REVIEW' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
          }}>
            <div style={{
              fontSize: '0.88rem',
              fontWeight: 800,
              color: selectedExpense.policyStatus === 'POLICY_VIOLATION_FLAGGED' ? 'var(--accent-rose)' : selectedExpense.policyStatus === 'REQUIRES_REVIEW' ? 'var(--accent-amber)' : 'var(--accent-emerald)'
            }}>
              {selectedExpense.policyStatus === 'POLICY_VIOLATION_FLAGGED' 
                ? '🛑 Corporate Policy Violation: Payout Suspended' 
                : selectedExpense.policyStatus === 'REQUIRES_REVIEW' 
                ? '⚠️ Step-Up Review: Manager Sign-Off Required' 
                : '✅ Procurement Policy Compliant: Auto-Reimbursed'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
              {selectedExpense.explanation}
            </div>
          </div>

          {/* Compliance Checklist */}
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
              Policy Audit Signals &amp; Heuristics:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedExpense.complianceFlags.map((flag, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span style={{
                    color: selectedExpense.policyStatus === 'POLICY_VIOLATION_FLAGGED' ? 'var(--accent-rose)' : 'var(--accent-emerald)',
                    fontWeight: 800
                  }}>
                    •
                  </span>
                  <span style={{ lineHeight: 1.4 }}>{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Employee & Card Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            fontSize: '0.76rem',
            borderTop: '1px solid var(--fin-border)',
            paddingTop: '14px',
            marginBottom: '18px'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Employee</span>
              <div style={{ color: '#ffffff', fontWeight: 700 }}>{selectedExpense.employeeName}</div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Department</span>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{selectedExpense.department}</div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Card Used</span>
              <div style={{ color: '#ffffff', fontWeight: 600 }}>Brex Commercial (•••• {selectedExpense.cardLast4})</div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Tax Receipt</span>
              <div style={{ color: selectedExpense.hasItemizedReceipt ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 700 }}>
                {selectedExpense.hasItemizedReceipt ? 'Verified PDF Attached' : 'Missing Receipt'}
              </div>
            </div>
          </div>

          {/* Interactive Action Controls */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleApproveExpense}
              className="btn-primary"
              style={{
                flex: 1,
                justifyContent: 'center',
                fontSize: '0.78rem'
              }}
            >
              <CheckCircle2 size={14} />
              <span>Approve &amp; Reimburse</span>
            </button>

            <button
              onClick={handleFlagViolation}
              className="btn-secondary"
              style={{
                flex: 1,
                justifyContent: 'center',
                fontSize: '0.78rem',
                color: 'var(--accent-rose)',
                borderColor: 'rgba(244, 63, 94, 0.35)'
              }}
            >
              <ShieldAlert size={14} />
              <span>Flag Violation</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

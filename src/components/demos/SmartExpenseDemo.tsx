'use client';

import {
  ArrowRight, ShieldCheck, Zap, Building2,
  CreditCard, Activity, FileText, CheckCircle2, ChevronRight, X, Plus
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface Expense {
  id: number;
  merchant: string;
  category: string;
  amount: number;
  status: 'approved' | 'flagged' | 'pending';
  date: string;
}

const SEED_EXPENSES: Expense[] = [
  { id: 1, merchant: 'AWS Cloud Services',     category: 'Engineering',   amount: 4_280, status: 'approved', date: 'Jun 12' },
  { id: 2, merchant: 'Hilton Tokyo (Weekend)',  category: 'Travel',        amount: 1_850, status: 'flagged',  date: 'Jun 14' },
  { id: 3, merchant: 'Zoom Pro Annual',         category: 'SaaS Tools',    amount: 150,   status: 'approved', date: 'Jun 15' },
  { id: 4, merchant: 'Stripe Atlas Setup',      category: 'Finance',       amount: 500,   status: 'approved', date: 'Jun 16' },
  { id: 5, merchant: 'Friday Night Dinner',     category: 'Entertainment', amount: 620,   status: 'flagged',  date: 'Jun 17' },
];

const STATUS_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  approved: { bg: 'rgba(16,185,129,0.12)', text: '#34d399', border: 'rgba(16,185,129,0.3)' },
  flagged:  { bg: 'rgba(244,63,94,0.12)',  text: '#f43f5e', border: 'rgba(244,63,94,0.3)'  },
  pending:  { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
};

export default function FinFlowLandingPage() {
  const [mounted, setMounted]       = useState(false);
  const [expenses, setExpenses]     = useState<Expense[]>(SEED_EXPENSES);
  const [newMerchant, setNewMerchant] = useState('');
  const [newAmount, setNewAmount]   = useState('');
  const [adding, setAdding]         = useState(false);

  useEffect(() => setMounted(true), []);

  const totalSpend   = expenses.reduce((s, e) => s + e.amount, 0);
  const flaggedCount = expenses.filter(e => e.status === 'flagged').length;
  const approvedSum  = expenses.filter(e => e.status === 'approved').reduce((s, e) => s + e.amount, 0);

  const addExpense = () => {
    const amt = parseFloat(newAmount);
    if (!newMerchant.trim() || isNaN(amt) || amt <= 0) return;
    // Auto-flag if merchant contains suspicious keywords or amount > 1500
    const suspicious = /weekend|dinner|bar|casino|hotel/i.test(newMerchant) || amt > 1500;
    const entry: Expense = {
      id:       Date.now(),
      merchant: newMerchant.trim(),
      category: 'Uncategorised',
      amount:   amt,
      status:   suspicious ? 'flagged' : 'approved',
      date:     new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
    setExpenses(p => [entry, ...p]);
    setNewMerchant('');
    setNewAmount('');
    setAdding(false);
  };

  const removeExpense = (id: number) => setExpenses(p => p.filter(e => e.id !== id));

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#09090b', color: '#fafafa', fontFamily: 'system-ui,-apple-system,sans-serif' }}>

      {/* Background grid */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundImage: 'linear-gradient(to right,rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse at top,black 20%,transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at top,black 20%,transparent 70%)', pointerEvents: 'none' }} />

      <main style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px' }}>

        {/* ── HERO ── */}
        <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '56px', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px' }}>
            <ShieldCheck size={14} /> Zero-Trust Corporate Spend Policy
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem,5vw,4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '24px' }}>
            Autonomous Corporate{' '}
            <span style={{ background: 'linear-gradient(135deg,#10b981,#0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Spend OS</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#a1a1aa', lineHeight: 1.6, marginBottom: '40px', maxWidth: '640px', margin: '0 auto 40px' }}>
            Stop chasing receipts. FinFlow AI autonomously audits every swipe, extracts VAT via OCR, enforces department budgets, and blocks policy violations in real time.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a href="#dashboard" className="hover:-translate-y-0.5 transition-transform" style={{ background: '#fff', color: '#09090b', padding: '14px 28px', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(255,255,255,0.25)' }}>
              Launch Dashboard <ArrowRight size={18} />
            </a>
            <a href="#features" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '14px 28px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '1rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              View Features
            </a>
          </div>
        </div>

        {/* ── INTERACTIVE EXPENSE DASHBOARD ── */}
        <div id="dashboard" style={{ width: '100%', maxWidth: '1000px', marginBottom: '56px', scrollMarginTop: '80px' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Demo</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginTop: '4px' }}>Policy Enforcement Engine</h2>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginTop: '4px' }}>Add an expense below — the AI auto-flags weekend hotels, entertainment over budget, and amounts above ₹1,500.</p>
          </div>

          {/* KPI strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '20px' }}>
            {[
              { label: 'Total Spend', value: `₹${totalSpend.toLocaleString('en-IN')}`, color: '#ffffff' },
              { label: 'Approved',    value: `₹${approvedSum.toLocaleString('en-IN')}`, color: '#34d399' },
              { label: 'Policy Flags', value: String(flaggedCount),                      color: '#f43f5e' },
            ].map(k => (
              <div key={k.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>{k.label}</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: k.color, fontFamily: 'monospace', margin: '4px 0' }}>{k.value}</div>
              </div>
            ))}
          </div>

          {/* Expense list */}
          <div style={{ background: 'rgba(18,18,22,0.85)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden' }}>
            {/* Table header */}
            <div style={{ padding: '12px 20px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '12px', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              <span>Merchant / Category</span><span>Amount</span><span>Status</span><span></span>
            </div>

            {expenses.map(e => {
              const sc = STATUS_COLOR[e.status];
              return (
                <div key={e.id} style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '12px', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>{e.merchant}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{e.category} &bull; {e.date}</div>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', fontFamily: 'monospace', textAlign: 'right' }}>₹{e.amount.toLocaleString('en-IN')}</div>
                  <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 800, background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    {e.status === 'flagged' ? '⚠ Flagged' : e.status === 'approved' ? '✓ Approved' : '· Pending'}
                  </span>
                  <button onClick={() => removeExpense(e.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                    <X size={14} />
                  </button>
                </div>
              );
            })}

            {/* Add expense row */}
            {adding ? (
              <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <input autoFocus value={newMerchant} onChange={e => setNewMerchant(e.target.value)} placeholder="Merchant name…" style={{ flex: 1, minWidth: '160px', padding: '8px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '0.85rem', outline: 'none' }} />
                <input value={newAmount} onChange={e => setNewAmount(e.target.value)} placeholder="Amount ₹" type="number" min={1} style={{ width: '110px', padding: '8px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '0.85rem', outline: 'none' }} />
                <button onClick={addExpense} style={{ padding: '8px 18px', borderRadius: '8px', background: 'linear-gradient(135deg,#10b981,#059669)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>Add</button>
                <button onClick={() => setAdding(false)} style={{ padding: '8px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setAdding(true)} style={{ width: '100%', padding: '14px 20px', background: 'none', border: 'none', borderTop: '1px solid rgba(255,255,255,0.04)', color: '#10b981', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                <Plus size={16} /> Add Expense to Test Policy Engine
              </button>
            )}
          </div>
        </div>

        {/* ── FEATURE BENTO GRID ── */}
        <div id="features" style={{ width: '100%', maxWidth: '1100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '20px', scrollMarginTop: '80px' }}>
          {[
            { icon: <Zap size={28} color="#10b981" />, title: 'Real-Time Policy Engine', body: 'FinFlow connects to your corporate Brex and Stripe cards. Every transaction is parsed against departmental rules before the money leaves the account.' },
            { icon: <FileText size={28} color="#0ea5e9" />, title: 'OCR Receipt Parsing', body: 'Automated extraction of itemised line items, VAT, and merchant category verification within 22 milliseconds of receipt upload.' },
            { icon: <Building2 size={28} color="#f59e0b" />, title: 'Budget Burn Tracking', body: 'Visual departmental envelopes show instantly if Marketing or Engineering is burning through their quarterly spend cap.' },
            { icon: <CreditCard size={28} color="#a78bfa" />, title: 'Corporate Card Controls', body: 'Set per-card spend limits, merchant category blocks, and auto-freeze rules for any card breaching policy in real time.' },
            { icon: <Activity size={28} color="#f43f5e" />, title: 'Anomaly Detection AI', body: 'Automatically surfaces duplicate invoices, suspicious after-hours transactions, and round-number fraud patterns with zero manual review.' },
            { icon: <ShieldCheck size={28} color="#34d399" />, title: 'HIPAA & SOC2 Ready', body: 'All expense data is encrypted at rest and in transit. Audit trails are immutable and exportable for compliance reviews.' },
          ].map(f => (
            <div key={f.title} style={{ background: 'linear-gradient(145deg,rgba(24,24,27,0.8),rgba(9,9,11,0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
              <div style={{ marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.body}</p>
            </div>
          ))}
        </div>

      </main>

      <footer style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#71717a', fontSize: '0.85rem' }}>
        © 2026 FinFlow AI — Enterprise Expense Engine
      </footer>
    </div>
  );
}

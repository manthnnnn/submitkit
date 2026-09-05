'use client';

import Link from 'next/link';
import { 
  ArrowRight, ShieldCheck, Zap, Building2, Terminal, 
  CreditCard, Activity, Briefcase, FileText, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FinFlowLandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#09090b', color: '#fafafa', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Background Cyber-Grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Top Navigation */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(9, 9, 11, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '16px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #10b981, #0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={18} color="#fff" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>FinFlow<span style={{ color: '#10b981' }}>AI</span></span>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#a1a1aa', fontWeight: 500, cursor: 'pointer' }}>Features</span>
          <span style={{ fontSize: '0.85rem', color: '#a1a1aa', fontWeight: 500, cursor: 'pointer' }}>Security</span>
          <a href="#features" style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            padding: '8px 16px', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', textDecoration: 'none'
          }}>
            Dashboard Login <ArrowRight size={14} />
          </a>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 20px' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '80px', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px',
            borderRadius: '999px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)',
            color: '#10b981', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
          }}>
            <ShieldCheck size={14} /> Zero-Trust Corporate Spend Policy
          </div>
          
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '24px' }}>
            Autonomous Corporate <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Spend OS
            </span>
          </h1>
          
          <p style={{ fontSize: '1.15rem', color: '#a1a1aa', lineHeight: 1.6, marginBottom: '40px', maxWidth: '640px', margin: '0 auto 40px auto' }}>
            Stop chasing receipts and manual approvals. FinFlow AI autonomously audits every swipe, extracts VAT via OCR, enforces department budgets, and blocks weekend policy violations in real-time.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a href="#features" style={{
              background: '#fff', color: '#09090b', padding: '14px 28px', borderRadius: '12px',
              fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px',
              textDecoration: 'none', boxShadow: '0 4px 14px rgba(255,255,255,0.25)',
              transition: 'transform 0.2s'
            }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              Launch Dashboard <ArrowRight size={18} />
            </a>
            <a href="#features" style={{
              background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '14px 28px', borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px',
              textDecoration: 'none'
            }}>
              View Specs <Terminal size={18} color="#a1a1aa" />
            </a>
          </div>
        </div>

        {/* Feature Bento Grid */}
        <div id="features" style={{ width: '100%', maxWidth: '1100px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          
          <div style={{ gridColumn: 'span 2', background: 'linear-gradient(145deg, rgba(24, 24, 27, 0.8), rgba(9, 9, 11, 0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
            <Zap size={28} color="#10b981" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '12px' }}>Real-Time Policy Engine</h3>
            <p style={{ color: '#a1a1aa', fontSize: '1rem', lineHeight: 1.6, maxWidth: '400px' }}>
              FinFlow connects directly to your corporate Brex and Stripe cards. Every transaction is parsed against strict departmental logic rules before the money even leaves the account.
            </p>
          </div>

          <div style={{ background: 'linear-gradient(145deg, rgba(24, 24, 27, 0.8), rgba(9, 9, 11, 0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px' }}>
            <FileText size={28} color="#0ea5e9" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>OCR Receipt Parsing</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Automated extraction of itemized line items, VAT calculation, and merchant category verification within 22 milliseconds.
            </p>
          </div>

          <div style={{ background: 'linear-gradient(145deg, rgba(24, 24, 27, 0.8), rgba(9, 9, 11, 0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px' }}>
            <Building2 size={28} color="#f59e0b" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Budget Burn Tracking</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Visual departmental envelopes. See instantly if Marketing or Engineering is burning through their Q3 allocated spend cap.
            </p>
          </div>

          <div style={{ gridColumn: 'span 2', background: 'linear-gradient(145deg, rgba(24, 24, 27, 0.8), rgba(9, 9, 11, 0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '16px' }}>Ready to optimize corporate spend?</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Zero-Latency Transaction Auditing', 'Multi-Tier Manager Approvals', 'HIPAA & SOC2 Ready Architecture'].map(feat => (
                  <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a1a1aa', fontSize: '0.95rem' }}>
                    <CheckCircle2 size={16} color="#10b981" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
            <a href="#features" style={{
              background: '#10b981', color: '#09090b', padding: '16px 32px', borderRadius: '12px',
              fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'
            }}>
              Launch Dashboard <ChevronRight size={18} />
            </a>
          </div>
          
        </div>
      </main>

      {/* Minimal Footer */}
      <footer style={{ padding: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#71717a', fontSize: '0.85rem' }}>
        © 2026 FinFlow AI — Enterprise Expense Engine. All rights reserved.
      </footer>
    </div>
  );
}

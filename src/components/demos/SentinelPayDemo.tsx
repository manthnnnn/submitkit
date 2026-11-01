'use client';

import { useState, useEffect } from 'react';
import {
  ArrowRight, Activity, Zap, CheckCircle2,
  Lock, ShieldCheck, Play, Check,
  Loader2
} from 'lucide-react';

type DemoState = 'idle' | 'simulating' | 'blocked';

export default function SentinelPayLandingPage() {
  const [mounted, setMounted] = useState(false);
  const [monthlyVolume, setMonthlyVolume] = useState<number>(5_000_000);
  const [demoState, setDemoState] = useState<DemoState>('idle');

  useEffect(() => setMounted(true), []);

  // ROI maths
  const estimatedFraudWithout = Math.round(monthlyVolume * 0.008);
  const estimatedFraudWith    = Math.round(monthlyVolume * 0.0004);
  const totalSavings           = estimatedFraudWithout - estimatedFraudWith;
  const chargebacksPrevented   = Math.round(totalSavings / 185);
  // Dynamic ROI multiple: annual savings ÷ annual platform cost ($18k/yr assumed)
  const roiMultiple            = Math.max(1, Math.round((totalSavings * 12) / 18_000));

  const handleSimulate = () => {
    // Always reset to idle first so the animation re-runs on every click
    setDemoState('idle');
    setTimeout(() => {
      setDemoState('simulating');
      setTimeout(() => setDemoState('blocked'), 600);
    }, 20);
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const panel: React.CSSProperties = {
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '20px',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0FDF4', color: '#0F172A', fontFamily: 'system-ui,-apple-system,sans-serif', position: 'relative', overflowX: 'hidden' }}>

      {/* Soft emerald glow background */}
      <div style={{ position: 'fixed', top: '-15%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(circle,rgba(16,185,129,0.06) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <main style={{ position: 'relative', zIndex: 10, maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 100px' }}>

        {/* ── HERO ── */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 60px', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: '#059669', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px' }}>
            <Activity size={14} />
            <span>Sub-12ms Fraud Inference &bull; XGBoost &amp; Behavioural Radar</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem,5vw,4.2rem)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.03em', color: '#0F172A', margin: '0 0 24px' }}>
            Autonomous Fraud Defense for{' '}
            <span style={{ background: 'linear-gradient(135deg,#059669 20%,#0D9488 60%,#0284C7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              High-Velocity Payment Gateways
            </span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.6, margin: '0 0 36px' }}>
            Intercept card-testing botnets, account takeovers, and impossible travel attacks in under 12 milliseconds. Reduce chargebacks by 94% with zero friction for legitimate shoppers.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('simulator')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', background: 'linear-gradient(135deg,#10b981,#059669)', color: '#ffffff', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(16,185,129,0.3)' }}>
              <span>Launch Threat Radar</span><ArrowRight size={18} />
            </button>
            <button onClick={() => scrollTo('guide')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '12px', background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#0F172A', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 1px 3px rgba(15,23,42,0.06)' }}>
              <ShieldCheck size={18} color="#059669" /><span>How It Works</span>
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '28px', flexWrap: 'wrap', padding: '24px 0', marginTop: '48px', borderTop: '1px solid #CBD5E1', borderBottom: '1px solid #CBD5E1', fontSize: '0.8rem', color: '#475569' }}>
            {[['ShieldCheck','PCI-DSS Level 1 Certified'],['Lock','SOC 2 Type II Audited'],['Server','99.999% SLA Cloud Edge'],['Zap','Visa 3DS 2.2 Compliant']].map(([,label]) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#059669" /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── ATTACK SIMULATOR ── */}
        <section id="simulator" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '36px', marginBottom: '64px', boxShadow: '0 12px 36px rgba(15,23,42,0.06)', scrollMarginTop: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingBottom: '24px', borderBottom: '1px solid #E2E8F0' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#059669', letterSpacing: '0.08em' }}>Live Interception Workbench</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>Simulate Zero-Day Fraud Interception</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0' }}>Click the button to trigger a stolen card authorisation through the heuristic defence mesh.</p>
            </div>

            <button
              onClick={handleSimulate}
              disabled={demoState === 'simulating'}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '10px', background: demoState === 'simulating' ? '#94A3B8' : 'linear-gradient(135deg,#10b981,#059669)', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem', border: 'none', cursor: demoState === 'simulating' ? 'wait' : 'pointer', boxShadow: '0 2px 10px rgba(16,185,129,0.25)' }}
            >
              {demoState === 'simulating'
                ? <><Loader2 size={16} className="animate-spin" /><span>Evaluating Risk Vectors…</span></>
                : <><Play size={16} /><span>{demoState === 'blocked' ? 'Simulate Again' : 'Simulate Stolen Card ($3,850.00)'}</span></>
              }
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '20px', paddingTop: '28px' }}>
            <div style={panel}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Incoming Authorisation</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', fontFamily: 'monospace', margin: '6px 0' }}>$3,850.00 USD</div>
              <div style={{ fontSize: '0.78rem', color: '#475569' }}>Card: &bull;&bull;&bull;&bull; 9012 (Sarah Jenkins)</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>Merchant: Dubrovnik Luxury Diamonds (HR)</div>
            </div>

            <div style={panel}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>AI Heuristic Anomaly</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, fontFamily: 'monospace', margin: '6px 0', color: demoState === 'blocked' ? '#E11D48' : '#64748B', transition: 'color 0.3s' }}>
                {demoState === 'blocked' ? '97% (CRITICAL FRAUD)' : demoState === 'simulating' ? 'Scanning…' : 'Awaiting Trigger…'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#475569' }}>Inference Latency: <strong style={{ color: '#059669', fontFamily: 'monospace' }}>11.4 ms</strong></div>
              <div style={{ fontSize: '0.75rem', color: demoState === 'blocked' ? '#BE123C' : '#64748B', marginTop: '2px' }}>
                {demoState === 'blocked' ? 'Tor Exit Node + Impossible Velocity Tripped' : 'Standby for simulation'}
              </div>
            </div>

            <div style={{ ...panel, background: demoState === 'blocked' ? '#FFF1F2' : '#F8FAFC', border: `1px solid ${demoState === 'blocked' ? '#FECDD3' : '#E2E8F0'}`, transition: 'all 0.3s' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Gateway Action</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, fontFamily: 'monospace', margin: '6px 0', color: demoState === 'blocked' ? '#E11D48' : '#059669', transition: 'color 0.3s' }}>
                {demoState === 'blocked' ? 'AUTHORIZATION BLOCKED' : 'RADAR ACTIVE'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#475569' }}>Impact: <strong style={{ color: '#0F172A' }}>$3,850.00 Loss Prevented</strong></div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>Zero fee chargeback dispute filed</div>
            </div>
          </div>
        </section>

        {/* ── 10TH GRADE EXPLAINER ── */}
        <section id="guide" style={{ background: 'linear-gradient(135deg,rgba(16,185,129,0.06) 0%,rgba(6,182,212,0.04) 100%)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '20px', padding: '28px', marginBottom: '64px', scrollMarginTop: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.4rem' }}>🎓</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>How SentinelPay AI Catches Stolen Cards (Explained Simply)</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px', fontSize: '0.85rem', color: '#334155', lineHeight: 1.55 }}>
            {[
              { color: '#059669', label: '✈️ The Impossible Flight', body: 'If you buy coffee in New York at 10 AM and 15 minutes later someone buys a diamond necklace in Paris with the same card, no human can fly that fast — the AI spots this and blocks it immediately.' },
              { color: '#0284C7', label: '⚡ Machine-Gun Swipes',   body: 'Hackers use scripts to test 50 stolen cards in 3 seconds. The AI detects this "card velocity flood" and shuts the bot down before the merchant loses money.' },
              { color: '#D97706', label: '🛡️ Zero Chargebacks',     body: 'When fraud is blocked before the payment clears, the real card owner is never charged and the store never pays a $25 bank penalty fee.' },
            ].map(c => (
              <div key={c.label} style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
                <div style={{ fontWeight: 800, color: c.color, marginBottom: '6px' }}>{c.label}</div>
                {c.body}
              </div>
            ))}
          </div>
        </section>

        {/* ── ROI CALCULATOR ── */}
        <section id="calculator" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '36px', marginBottom: '64px', boxShadow: '0 12px 36px rgba(15,23,42,0.06)', scrollMarginTop: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Merchant Savings Calculator</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', margin: '6px 0 0' }}>Calculate Your Recovered Revenue</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748B', margin: '4px 0 0' }}>Slide to your monthly processing volume.</p>
          </div>

          <div style={{ maxWidth: '680px', margin: '0 auto 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Monthly Volume:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#059669', fontFamily: 'monospace' }}>${(monthlyVolume / 1_000_000).toFixed(1)}M USD / month</span>
            </div>
            <input type="range" min={500_000} max={50_000_000} step={500_000} value={monthlyVolume} onChange={e => setMonthlyVolume(Number(e.target.value))} style={{ width: '100%', height: '8px', borderRadius: '4px', background: '#E2E8F0', outline: 'none', cursor: 'pointer', accentColor: '#059669' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', marginTop: '6px' }}>
              <span>$500K</span><span>$25M</span><span>$50M</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { label: 'Prevented Monthly Loss', value: `$${totalSavings.toLocaleString()}`, sub: 'Saved directly in cash flow', color: '#059669' },
              { label: 'Disputes Avoided',        value: `${chargebacksPrevented} / mo`,     sub: 'Visa/Mastercard penalty fees skipped', color: '#0284C7' },
              { label: 'Annual ROI Multiple',     value: `${roiMultiple}x`,                  sub: 'Net enterprise cost benefit', color: '#D97706' },
            ].map(k => (
              <div key={k.label} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>{k.label}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: k.color, fontFamily: 'monospace', margin: '4px 0' }}>{k.value}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{k.sub}</div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer style={{ borderTop: '1px solid #E2E8F0', padding: '20px 32px', textAlign: 'center', fontSize: '0.8rem', color: '#64748B', background: '#F8FAFC' }}>
        <strong>SentinelPay AI</strong> — Autonomous Financial Crime Radar &amp; Real-Time Defence Grid &bull; Sub-12ms Latency &bull; XGBoost Heuristics
      </footer>
    </div>
  );
}

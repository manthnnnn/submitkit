'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, ShieldAlert, Activity, Server, Zap, CheckCircle2, 
  ChevronRight, Lock, DollarSign, Sparkles, Sliders, ShieldCheck, 
  CreditCard, TrendingDown, AlertTriangle, Play, HelpCircle, Users, Check, ExternalLink
} from 'lucide-react';

export default function SentinelPayLandingPage() {
  const [mounted, setMounted] = useState(false);
  const [monthlyVolume, setMonthlyVolume] = useState<number>(5000000); // $5M/mo default
  const [activeDemoState, setActiveDemoState] = useState<'idle' | 'simulating' | 'blocked'>('idle');

  useEffect(() => setMounted(true), []);

  // ROI Calculator Math: Typical 0.8% fraud rate without SentinelPay, reduced to 0.04% with SentinelPay
  const estimatedFraudWithout = Math.round(monthlyVolume * 0.008);
  const estimatedFraudWith = Math.round(monthlyVolume * 0.0004);
  const totalSavings = estimatedFraudWithout - estimatedFraudWith;
  const chargebacksPrevented = Math.round(totalSavings / 185);

  const handleRunDemoInterception = () => {
    setActiveDemoState('simulating');
    setTimeout(() => {
      setActiveDemoState('blocked');
    }, 550);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#06080d',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Cyber Grid Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(16, 185, 129, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(16, 185, 129, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Radial Ambient Glow */}
      <div style={{
        position: 'fixed',
        top: '-15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '900px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Top Header Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(6, 8, 13, 0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
          }}>
            <ShieldAlert size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                SentinelPay<span style={{ color: '#10b981' }}>AI</span>
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '999px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.35)'
              }}>
                PCI-DSS LEVEL 1
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>Autonomous Financial Fraud Defense Cloud</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#simulator" style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>
            Attack Simulator
          </a>
          <a href="#calculator" style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>
            ROI Calculator
          </a>
          <a href="#guide" style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>
            How It Works
          </a>

          <Link
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)',
              transition: 'transform 0.2s'
            }}
          >
            <span>Launch Threat Radar</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: '1240px', margin: '0 auto', padding: '60px 24px 100px' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 60px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '24px'
          }}>
            <Activity size={14} />
            <span>Sub-12ms Fraud Inference • XGBoost & Behavioral Radar</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: '0 0 24px'
          }}>
            Autonomous Fraud Defense for <br />
            <span style={{
              background: 'linear-gradient(135deg, #34d399 20%, #2dd4bf 60%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              High-Velocity Payment Gateways
            </span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 36px', fontWeight: 400 }}>
            Intercept card-testing botnets, account takeovers, and impossible travel attacks in under 12 milliseconds. Reduce chargebacks by 94% with zero friction for legitimate shoppers.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
              }}
            >
              <span>Launch Live Fraud Radar</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/rules"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f8fafc',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none'
              }}
            >
              <Sliders size={18} color="#34d399" />
              <span>Configure Security Rules</span>
            </Link>
          </div>

          {/* Institutional Trust Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '28px',
            flexWrap: 'wrap',
            padding: '24px 0',
            marginTop: '48px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.8rem',
            color: '#64748b'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} color="#10b981" /> PCI-DSS Level 1 Certified</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Lock size={16} color="#10b981" /> SOC 2 Type II Audited</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Server size={16} color="#10b981" /> 99.999% SLA Cloud Edge</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={16} color="#10b981" /> Visa 3DS 2.2 Compliant</span>
          </div>
        </div>

        {/* INTERACTIVE INSTANT ATTACK INTERCEPTION DEMO */}
        <section id="simulator" style={{
          background: 'rgba(13, 17, 26, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '36px',
          backdropFilter: 'blur(20px)',
          marginBottom: '64px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.08em' }}>
                Live Interception Workbench
              </span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: '4px 0 0' }}>
                Simulate Zero-Day Fraud Interception
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0' }}>
                Click below to trigger a live stolen card payment authorization through the heuristic defense mesh.
              </p>
            </div>

            <button
              onClick={handleRunDemoInterception}
              disabled={activeDemoState === 'simulating'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '10px',
                background: activeDemoState === 'simulating' ? '#334155' : 'linear-gradient(135deg, #10b981, #059669)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                border: 'none',
                cursor: activeDemoState === 'simulating' ? 'wait' : 'pointer',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
              }}
            >
              {activeDemoState === 'simulating' ? (
                <>
                  <Activity size={16} className="animate-spin" />
                  <span>Evaluating Risk Vectors...</span>
                </>
              ) : (
                <>
                  <Play size={16} />
                  <span>Simulate Stolen Card ($3,850.00)</span>
                </>
              )}
            </button>
          </div>

          {/* Results Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            paddingTop: '28px'
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Incoming Authorization</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'monospace', margin: '6px 0' }}>$3,850.00 USD</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Card: •••• 9012 (Sarah Jenkins)</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>Merchant: Dubrovnik Luxury Diamonds (HR)</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>AI Heuristic Anomaly</div>
              <div style={{
                fontSize: '1.3rem',
                fontWeight: 900,
                fontFamily: 'monospace',
                margin: '6px 0',
                color: activeDemoState === 'blocked' ? '#f43f5e' : '#94a3b8'
              }}>
                {activeDemoState === 'blocked' ? '97% (CRITICAL FRAUD)' : 'Awaiting Trigger...'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Inference Latency: <strong style={{ color: '#10b981', fontFamily: 'monospace' }}>11.4 ms</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: activeDemoState === 'blocked' ? '#fca5a5' : '#64748b', marginTop: '2px' }}>
                {activeDemoState === 'blocked' ? 'Tor Exit Node + Impossible Velocity Tripped' : 'Standby for simulation'}
              </div>
            </div>

            <div style={{
              background: activeDemoState === 'blocked' ? 'rgba(244, 63, 94, 0.08)' : 'rgba(255, 255, 255, 0.02)',
              border: activeDemoState === 'blocked' ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Gateway Action</div>
              <div style={{
                fontSize: '1.3rem',
                fontWeight: 900,
                fontFamily: 'monospace',
                margin: '6px 0',
                color: activeDemoState === 'blocked' ? '#f43f5e' : '#10b981'
              }}>
                {activeDemoState === 'blocked' ? 'AUTHORIZATION BLOCKED' : 'RADAR ACTIVE'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Impact: <strong style={{ color: '#ffffff' }}>$3,850.00 Loss Prevented</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>Zero fee chargeback dispute filed</div>
            </div>
          </div>
        </section>

        {/* 10TH GRADE EXPLAINER CALLOUT */}
        <section id="guide" style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.4rem' }}>🎓</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              How SentinelPay AI Catches Stolen Cards (Explained for High Schoolers)
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            fontSize: '0.85rem',
            color: '#cbd5e1',
            lineHeight: 1.55
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontWeight: 800, color: '#34d399', marginBottom: '6px' }}>✈️ The Impossible Flight</div>
              If you buy coffee in New York at 10:00 AM, and 15 minutes later someone buys a diamond necklace in Paris with the same card, no human can fly that fast! The AI spots this and blocks the transaction immediately.
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontWeight: 800, color: '#38bdf8', marginBottom: '6px' }}>⚡ Machine-Gun Swipes</div>
              Hackers use automated computer scripts to test 50 stolen credit cards in 3 seconds. The AI detects this rapid &quot;card velocity flood&quot; and shuts down the bot before the merchant loses money.
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontWeight: 800, color: '#fbbf24', marginBottom: '6px' }}>🛡️ Zero Chargebacks</div>
              When fraud is blocked before the payment clears, the real card owner never gets charged, and the store never pays a $25 bank penalty fee!
            </div>
          </div>
        </section>

        {/* ROI SAVINGS CALCULATOR */}
        <section id="calculator" style={{
          background: 'rgba(13, 17, 26, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '36px',
          backdropFilter: 'blur(20px)',
          marginBottom: '64px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Merchant Savings Calculator
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', margin: '6px 0 0' }}>
              Calculate Your Recovered Revenue
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '4px 0 0' }}>
              Slide to your monthly processing volume to calculate chargeback savings.
            </p>
          </div>

          <div style={{ maxWidth: '680px', margin: '0 auto 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Monthly Processing Volume:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>
                ${(monthlyVolume / 1000000).toFixed(1)}M USD / month
              </span>
            </div>

            <input
              type="range"
              min={500000}
              max={50000000}
              step={500000}
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: '#1e293b',
                outline: 'none',
                cursor: 'pointer',
                accentColor: '#10b981'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>
              <span>$500K / mo</span>
              <span>$25M / mo</span>
              <span>$50M / mo</span>
            </div>
          </div>

          {/* Calculator Output KPI Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Prevented Monthly Loss</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981', fontFamily: 'monospace', margin: '4px 0' }}>
                ${totalSavings.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Saved directly in cash flow</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Disputes Avoided</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#38bdf8', fontFamily: 'monospace', margin: '4px 0' }}>
                {chargebacksPrevented} / mo
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Visa/Mastercard penalty fees skipped</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Annual ROI Multiple</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f59e0b', fontFamily: 'monospace', margin: '4px 0' }}>
                14.2x
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Net enterprise cost benefit</div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '24px 32px',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#64748b',
        background: '#040609'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <strong>SentinelPay AI</strong> — Autonomous Financial Crime Radar & Real-Time Defense Grid
          </div>
          <div style={{ display: 'flex', gap: '16px', color: '#94a3b8' }}>
            <span>Sub-12ms Latency</span>
            <span>•</span>
            <span>XGBoost Heuristics</span>
            <span>•</span>
            <span>Zero Unhandled Errors</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

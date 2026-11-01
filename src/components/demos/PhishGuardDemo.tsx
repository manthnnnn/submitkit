'use client';

import Link from 'next/link';
import { 
  ArrowRight, Shield, Zap, Search, Terminal, 
  AlertTriangle, Lock, Eye, CheckCircle2, ChevronRight,
  Flame, Radio, Activity, Globe, FileText, Check, Sparkles,
  ShieldAlert, ShieldCheck, Download, AlertOctagon, Layers,
  Server, Cpu
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { analyzeURL, ThreatAnalysis } from '@/lib/phishing/scanner-engine';

export default function PhishGuardLandingPage() {
  const [mounted, setMounted] = useState(false);
  const [heroUrl, setHeroUrl] = useState('https://pаypal-security-alert.auth-verification.ru/login.php');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ThreatAnalysis | null>(null);

  useEffect(() => {
    setMounted(true);
    // Initial scan on load
    const initial = analyzeURL('https://pаypal-security-alert.auth-verification.ru/login.php');
    setScanResult(initial);
  }, []);

  const handleHeroScan = (urlToScan?: string) => {
    const target = urlToScan || heroUrl;
    if (!target.trim()) return;
    setIsScanning(true);
    setTimeout(() => {
      const res = analyzeURL(target);
      setScanResult(res);
      setIsScanning(false);
    }, 380);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFF7F7', color: '#0F172A', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Background Soft Rose Glow */}
      <div style={{
        position: 'fixed', top: '-15%', left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '900px', background: 'radial-gradient(circle, rgba(225, 29, 72, 0.05) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none'
      }} />

      <main style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px 100px' }}>
        
        {/* Hero Tagline */}
        <div style={{ textAlign: 'center', maxWidth: '860px', marginBottom: '40px', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px',
            borderRadius: '999px', background: 'rgba(225, 29, 72, 0.08)', border: '1px solid rgba(225, 29, 72, 0.25)',
            color: '#E11D48', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '24px'
          }}>
            <Radio size={14} style={{ animation: 'pulse 1.5s ease-in-out infinite' }} /> Autonomous Zero-Day Threat Interception
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.04em', marginBottom: '20px', color: '#0F172A' }}>
            Zero-Day Phishing Defense <br />
            <span style={{ background: 'linear-gradient(135deg, #e11d48, #f43f5e, #be123c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Armed with Visual Detonation.
            </span>
          </h1>
          
          <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 36px auto' }}>
            Legacy firewalls rely on stale IP blocklists. PhishGuard AI mathematically detects Cyrillic homoglyph spoofing, Shannon lexical entropy spikes, and headless visual login mimicry in <strong>&lt; 50 milliseconds</strong>.
          </p>
          
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#demo" style={{
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              color: '#ffffff', padding: '14px 28px', borderRadius: '10px',
              fontSize: '0.98rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px',
              textDecoration: 'none', boxShadow: '0 4px 20px rgba(225, 29, 72, 0.35)',
            }}>
              <ShieldAlert size={18} />
              <span>Enter Security Operations Center</span>
              <ArrowRight size={16} />
            </a>
            <a href="#demo" style={{
              background: '#FFFFFF', color: '#0F172A', padding: '14px 26px', borderRadius: '10px',
              border: '1px solid #CBD5E1', fontSize: '0.98rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px',
              textDecoration: 'none', boxShadow: '0 1px 3px rgba(15,23,42,0.06)'
            }}>
              <Flame size={16} color="#e11d48" />
              <span>Try Live Threat Detonator</span>
            </a>
          </div>
        </div>

        {/* 1. INTERACTIVE LIVE THREAT RADAR HERO DEMO */}
        <div id="demo" style={{ width: '100%', maxWidth: '1080px', marginBottom: '80px' }}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #FECDD3',
            borderRadius: '20px',
            boxShadow: '0 16px 40px rgba(225, 29, 72, 0.08), 0 2px 8px rgba(15,23,42,0.04)',
            overflow: 'hidden'
          }}>
            {/* Window Bar */}
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid #FFE4E6',
              background: '#FFF1F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '0.76rem', color: '#64748B', marginLeft: '10px', fontFamily: 'monospace' }}>
                  phishguard-sandbox://threat-radar.v4/detonate
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', color: '#64748B' }}>
                <Activity size={13} color="#059669" />
                <span>Detection Engine: <strong>AST Shannon Heuristics Online</strong></span>
              </div>
            </div>

            {/* Input & 1-Click Attack Preset Selector */}
            <div style={{ padding: '24px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={heroUrl}
                  onChange={(e) => setHeroUrl(e.target.value)}
                  placeholder="Enter any suspect URL to detonate in sandbox..."
                  style={{
                    flex: 1,
                    minWidth: '280px',
                    padding: '12px 18px',
                    borderRadius: '8px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#0F172A',
                    fontSize: '0.88rem',
                    fontFamily: 'monospace',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => handleHeroScan()}
                  disabled={isScanning}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #e11d48, #be123c)',
                    border: 'none',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 10px rgba(225, 29, 72, 0.3)'
                  }}
                >
                  <Flame size={16} />
                  <span>{isScanning ? 'Detonating...' : 'Detonate & Scan URL'}</span>
                </button>
              </div>

              {/* 1-Click Live Threat Presets */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.74rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                  Test Zero-Day Vectors:
                </span>
                <button
                  onClick={() => {
                    const u = 'https://pаypal-security-alert.auth-verification.ru/login.php';
                    setHeroUrl(u);
                    handleHeroScan(u);
                  }}
                  style={{ padding: '4px 10px', borderRadius: '4px', background: '#FFF1F2', border: '1px solid #FECDD3', color: '#BE123C', fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  🚨 PayPal (Cyrillic &apos;а&apos; Homoglyph)
                </button>
                <button
                  onClick={() => {
                    const u = 'https://micrоsoft-account-update.support-office365.online/auth/login';
                    setHeroUrl(u);
                    handleHeroScan(u);
                  }}
                  style={{ padding: '4px 10px', borderRadius: '4px', background: '#FFF1F2', border: '1px solid #FECDD3', color: '#BE123C', fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  🚨 Microsoft 365 (Credential Harvest)
                </button>
                <button
                  onClick={() => {
                    const u = 'https://github.com/trending';
                    setHeroUrl(u);
                    handleHeroScan(u);
                  }}
                  style={{ padding: '4px 10px', borderRadius: '4px', background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#047857', fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  🛡️ GitHub.com (Legitimate Clean Baseline)
                </button>
              </div>
            </div>

            {/* Real-time Detonation Result Panel */}
            {scanResult && (
              <div style={{ padding: '24px', background: '#FAFAFA' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  
                  {/* Gauge Card */}
                  <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: scanResult.threatLevel === 'CRITICAL_PHISHING' ? '#FFF1F2' : scanResult.threatLevel === 'SUSPICIOUS' ? '#FFFBEB' : '#F0FDF4',
                    border: `1px solid ${scanResult.threatLevel === 'CRITICAL_PHISHING' ? '#FECDD3' : scanResult.threatLevel === 'SUSPICIOUS' ? '#FDE68A' : '#BBF7D0'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                  }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      border: `2px solid ${scanResult.threatLevel === 'CRITICAL_PHISHING' ? '#e11d48' : scanResult.threatLevel === 'SUSPICIOUS' ? '#d97706' : '#059669'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'monospace', color: scanResult.threatLevel === 'CRITICAL_PHISHING' ? '#e11d48' : scanResult.threatLevel === 'SUSPICIOUS' ? '#d97706' : '#059669' }}>
                        {scanResult.riskScore}%
                      </span>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>THREAT RATING</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: scanResult.threatLevel === 'CRITICAL_PHISHING' ? '#e11d48' : scanResult.threatLevel === 'SUSPICIOUS' ? '#d97706' : '#059669' }}>
                        {scanResult.threatLevel === 'CRITICAL_PHISHING' ? 'CRITICAL PHISH' : scanResult.threatLevel === 'SUSPICIOUS' ? 'SUSPICIOUS GATEWAY' : 'AUTHENTIC CLEAN'}
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#64748B' }}>Status: <strong>{scanResult.status}</strong></span>
                    </div>
                  </div>

                  {/* Attack Vector */}
                  <div style={{ padding: '16px', borderRadius: '12px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>IDENTIFIED ATTACK VECTOR</span>
                    <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                      {scanResult.attackVector}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#0284C7', fontWeight: 600 }}>Target: {scanResult.targetedBrand}</span>
                  </div>

                  {/* WHOIS Origin */}
                  <div style={{ padding: '16px', borderRadius: '12px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>HOST ORIGIN &amp; SSL</span>
                    <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                      {scanResult.ipAddress}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{scanResult.serverCountry} • {scanResult.sslIssuer}</span>
                  </div>

                </div>

                {/* Lexical Flags Checklist */}
                <div style={{
                  padding: '14px 18px',
                  borderRadius: '10px',
                  background: scanResult.threatLevel === 'CRITICAL_PHISHING' ? '#FFF1F2' : '#F0FDF4',
                  border: `1px solid ${scanResult.threatLevel === 'CRITICAL_PHISHING' ? '#FECDD3' : '#BBF7D0'}`,
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                    FORENSIC ANOMALY INDICATORS DETECTED:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {scanResult.lexicalFlags.map((flag: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: scanResult.threatLevel === 'CRITICAL_PHISHING' ? '#9F1239' : '#047857' }}>
                        <span style={{ fontWeight: 800 }}>•</span>
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <a href="#demo" style={{
                    padding: '8px 18px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #e11d48, #be123c)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(225, 29, 72, 0.25)'
                  }}>
                    <span>Open in SOC Dashboard with Visual Detonation</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. UNICODE HOMOGRAPH DECRYPTER SECTION */}
        <div id="homograph" style={{ width: '100%', maxWidth: '1080px', marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '0.78rem', color: '#e11d48', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Deep Optical Inspection
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '6px', color: '#0F172A' }}>
              How Unicode Homoglyphs Fool 94% of Employees
            </h2>
            <p style={{ color: '#475569', fontSize: '0.98rem', maxWidth: '600px', margin: '8px auto 0' }}>
              To the naked eye, the characters look identical. Under our AST Unicode lexical scanner, the deception is unmasked in nanoseconds.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Authentic side */}
            <div style={{
              padding: '28px',
              borderRadius: '16px',
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 1px 3px rgba(15,23,42,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#059669', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} /> AUTHENTIC LATIN DOMAIN
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'monospace' }}>Unicode: U+0061</span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'monospace', color: '#059669' }}>
                paypal.com
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                Uses standard Latin letter <code>a</code> (ASCII 97 / U+0061). Resolves to authentic PayPal San Jose IP cluster (64.4.250.0/24).
              </div>
            </div>

            {/* Spoofed side */}
            <div style={{
              padding: '28px',
              borderRadius: '16px',
              background: '#FFF1F2',
              border: '1px solid #FECDD3',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 1px 3px rgba(15,23,42,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#E11D48', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertOctagon size={16} /> DETECTED SPOOF HOMOGLYPH
                </span>
                <span style={{ fontSize: '0.72rem', color: '#E11D48', fontFamily: 'monospace', fontWeight: 700 }}>Unicode: U+0430 (Cyrillic)</span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'monospace', color: '#E11D48' }}>
                p<span style={{ textDecoration: 'underline', color: '#BE123C' }}>а</span>ypal.com
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                Substitutes Cyrillic Small Letter <code>а</code> (U+0430). Intercepted and mapped to Punycode <code>xn--pypal-4ve.com</code> before credentials can be stolen.
              </div>
            </div>
          </div>
        </div>

        {/* 3. COMMERCIAL SAAS PRICING TIERS */}
        <div id="pricing" style={{ width: '100%', maxWidth: '1080px', marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.78rem', color: '#e11d48', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Commercial SaaS Licensing
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '6px', color: '#0F172A' }}>
              Turnkey Enterprise SOC Phishing Defense
            </h2>
            <p style={{ color: '#475569', fontSize: '0.98rem', maxWidth: '580px', margin: '8px auto 0' }}>
              Deploy autonomous visual phishing defense across your enterprise workforce in under 15 minutes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '24px' }}>
            
            {/* Tier 1 */}
            <div style={{
              padding: '32px',
              borderRadius: '16px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(15,23,42,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>SOC DEFENDER</span>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0F172A', margin: '8px 0 16px' }}>
                  $499 <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>/ mo</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', marginBottom: '20px' }}>
                  Ideal for mid-market corporate IT defending up to 1,000 corporate inboxes against credential phishing.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: '#334155' }}>
                  {['50,000 URL scans / month', 'Cyrillic & Unicode Homoglyph Engine', 'Real-time Telegram & Slack Alerts', 'Chrome & Edge Browser Plugin', '2 SOC Analyst Seats'].map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={15} color="#059669" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="#demo" style={{
                marginTop: '28px',
                padding: '12px',
                borderRadius: '8px',
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                fontWeight: 700,
                fontSize: '0.84rem',
                textAlign: 'center',
                textDecoration: 'none'
              }}>
                Deploy SOC Defender
              </Link>
            </div>

            {/* Tier 2: FEATURED */}
            <div style={{
              padding: '32px',
              borderRadius: '16px',
              background: '#FFFFFF',
              border: '2px solid #e11d48',
              boxShadow: '0 8px 30px rgba(225, 29, 72, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '24px',
                padding: '3px 12px',
                borderRadius: '999px',
                background: '#e11d48',
                color: '#ffffff',
                fontSize: '0.68rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                MOST POPULAR
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e11d48', textTransform: 'uppercase' }}>ENTERPRISE SHIELD</span>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0F172A', margin: '8px 0 16px' }}>
                  $1,499 <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>/ mo</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', marginBottom: '20px' }}>
                  Comprehensive protection for enterprises, banks, and fintechs with automated legal takedown dispatch.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: '#334155' }}>
                  {[
                    '500,000 URL scans / month',
                    'Headless Visual Detonation Sandbox',
                    'Automated ICANN Abuse Takedown Generator',
                    'STIX 2.1 JSON SIEM Export (Splunk / CrowdStrike)',
                    'Autonomous BGP DNS Sinkhole API',
                    '10 SOC Analyst Seats • 99.99% SLA'
                  ].map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={15} color="#e11d48" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="#demo" style={{
                marginTop: '28px',
                padding: '12px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #e11d48, #be123c)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.84rem',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(225, 29, 72, 0.3)'
              }}>
                Deploy Enterprise Shield
              </Link>
            </div>

            {/* Tier 3 */}
            <div style={{
              padding: '32px',
              borderRadius: '16px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(15,23,42,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase' }}>MSSP &amp; TELCO FLEET</span>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0F172A', margin: '8px 0 16px' }}>
                  $4,999 <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>/ mo</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', marginBottom: '20px' }}>
                  Multi-tenant platform for managed security providers, ISPs, and national CERT threat response units.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: '#334155' }}>
                  {[
                    'Unlimited URL scans & Detonations',
                    'Multi-Tenant White-Label SOC Portal',
                    'Direct Registrar Abuse API Integration',
                    'Dedicated 24/7 Threat Response Engineer',
                    'Custom Machine Learning Model Fine-Tuning'
                  ].map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={15} color="#0284C7" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="#demo" style={{
                marginTop: '28px',
                padding: '12px',
                borderRadius: '8px',
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                fontWeight: 700,
                fontSize: '0.84rem',
                textAlign: 'center',
                textDecoration: 'none'
              }}>
                Contact MSSP Sales
              </Link>
            </div>

          </div>
        </div>

        {/* 4. INSTITUTIONAL COMPLIANCE STRIP */}
        <div style={{
          width: '100%',
          maxWidth: '1080px',
          padding: '24px 32px',
          borderRadius: '14px',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(15,23,42,0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} color="#059669" />
            <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A' }}>
              Enterprise Compliance &amp; Institutional Certifications
            </span>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '0.76rem', color: '#475569' }}>
            <span>✓ <strong>SOC2 Type II</strong> Certified</span>
            <span>✓ <strong>ISO 27001</strong> Audited</span>
            <span>✓ <strong>ICANN RAA 3.7.7</strong> Compliant</span>
            <span>✓ <strong>STIX 2.1 &amp; TAXII</strong> Native</span>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ padding: '36px', borderTop: '1px solid #E2E8F0', textAlign: 'center', color: '#64748B', fontSize: '0.82rem', background: '#F8FAFC' }}>
        <p>© 2026 PhishGuard AI Systems Inc. Autonomous Zero-Day Phishing Defense &amp; Takedown Automation.</p>
      </footer>
    </div>
  );
}

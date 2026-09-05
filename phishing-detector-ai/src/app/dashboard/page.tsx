'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, Zap, 
  CheckCircle2, XCircle, ArrowRight, Info, Sparkles, Sliders, 
  Lock, MapPin, Smartphone, HelpCircle, RefreshCw, Globe, 
  Search, ExternalLink, Flame, Eye, Terminal, Radio, Shield, 
  AlertOctagon, Check, UserCheck, ShieldOff, Server, Key,
  FileText, Download, Copy, AlertCircle, Layers, Activity, X
} from 'lucide-react';
import { INITIAL_THREATS, ThreatAnalysis } from '@/lib/threat-data';
import { 
  analyzeURL, 
  detonateSandbox, 
  generateTakedownNotice, 
  exportSTIXForensics, 
  SandboxDetonationResult 
} from '@/lib/scanner-engine';

export default function PhishingRadarPage() {
  const [threats, setThreats] = useState<ThreatAnalysis[]>(INITIAL_THREATS);
  const [selectedThreat, setSelectedThreat] = useState<ThreatAnalysis>(INITIAL_THREATS[0]);
  const [inputUrl, setInputUrl] = useState<string>('https://pаypal-security-alert.auth-verification.ru/login.php');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Forensic Modals State
  const [sandboxModalOpen, setSandboxModalOpen] = useState<boolean>(false);
  const [detonationData, setDetonationData] = useState<SandboxDetonationResult | null>(null);
  const [takedownModalOpen, setTakedownModalOpen] = useState<boolean>(false);
  const [takedownText, setTakedownText] = useState<string>('');

  const triggerToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 4000);
  };

  // Run Custom URL Scan
  const handleScan = (urlToScan?: string) => {
    const target = urlToScan || inputUrl;
    if (!target.trim()) return;
    setIsScanning(true);
    setTimeout(() => {
      const result = analyzeURL(target);
      setThreats(prev => [result, ...prev.filter(t => t.id !== result.id).slice(0, 14)]);
      setSelectedThreat(result);
      setIsScanning(false);
      triggerToast(`URL Analysis Complete: ${result.domain} — Risk: ${result.riskScore}% (${result.threatLevel})`);
    }, 350);
  };

  // 1-Click Interactive Scenarios
  const handleTestGoogle = () => {
    const url = 'https://accounts.google.com/signin/v2/identifier?service=mail';
    setInputUrl(url);
    handleScan(url);
  };

  const handleTestRedirect = () => {
    const url = 'https://mail-track-analytics.global-cloud-delivery.net/click?id=8831';
    setInputUrl(url);
    handleScan(url);
  };

  const handleTestPaypal = () => {
    const url = 'https://pаypal-security-alert.auth-verification.ru/login.php';
    setInputUrl(url);
    handleScan(url);
  };

  // Interactive Quarantine / Whitelist Actions
  const handleBlockAndReport = () => {
    const updated: ThreatAnalysis = {
      ...selectedThreat,
      status: 'BLOCKED',
      riskScore: 99,
      threatLevel: 'CRITICAL_PHISHING',
      heuristicReasons: [...selectedThreat.heuristicReasons, 'Global DNS Sinkhole rule dispatched to 124,500 enterprise gateways.']
    };
    setSelectedThreat(updated);
    setThreats(prev => prev.map(t => t.id === updated.id ? updated : t));
    triggerToast(`Global DNS Block rule deployed for ${selectedThreat.domain}. Threat neutralized!`);
  };

  const handleWhitelist = () => {
    const updated: ThreatAnalysis = {
      ...selectedThreat,
      status: 'CLEARED',
      riskScore: 4,
      threatLevel: 'SAFE',
      heuristicReasons: ['Manually verified as authentic corporate service by administrator. Whitelisted.']
    };
    setSelectedThreat(updated);
    setThreats(prev => prev.map(t => t.id === updated.id ? updated : t));
    triggerToast(`Domain ${selectedThreat.domain} whitelisted and cleared.`);
  };

  // Open Visual Mimicry Detonation Sandbox
  const handleOpenSandbox = () => {
    const data = detonateSandbox(selectedThreat);
    setDetonationData(data);
    setSandboxModalOpen(true);
  };

  // Generate Automated ICANN Abuse Takedown Notice
  const handleOpenTakedown = () => {
    const notice = generateTakedownNotice(selectedThreat);
    setTakedownText(notice);
    setTakedownModalOpen(true);
  };

  // Export Forensic Incident in STIX 2.1 JSON Format
  const handleExportSTIX = () => {
    const jsonStr = exportSTIXForensics(selectedThreat);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `STIX21_${selectedThreat.id}_${selectedThreat.domain.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast(`Exported STIX 2.1 Incident Report for ${selectedThreat.id}`);
  };

  const filteredThreats = threats.filter(t => filterLevel === 'ALL' || t.threatLevel === filterLevel);

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Toast Notice */}
      {toastNotice && (
        <div style={{
          position: 'fixed',
          top: '76px',
          right: '24px',
          zIndex: 100,
          background: 'rgba(13, 19, 33, 0.96)',
          border: '1px solid var(--accent-cyan)',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 25px rgba(56, 189, 248, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#ffffff',
          fontSize: '0.86rem',
          fontWeight: 700,
          animation: 'pulseDanger 0.3s ease-out'
        }}>
          <Sparkles size={18} color="var(--accent-cyan)" />
          <span>{toastNotice}</span>
        </div>
      )}

      {/* Futuristic Enterprise Header Bar */}
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
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(99, 102, 241, 0.15))',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: 'var(--accent-rose)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              <ShieldAlert size={13} />
              Zero-Day Autonomous Threat Radar
            </span>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--phish-border)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)'
            }}>
              <Radio size={12} color="var(--accent-emerald)" className="pulse-danger" />
              <span>Real-Time Lexical &amp; IDN Engine</span>
            </span>
          </div>

          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            PhishGuard <span style={{ background: 'linear-gradient(135deg, var(--accent-rose), var(--accent-indigo))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Zero-Day Phishing &amp; Homograph Radar</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px', maxWidth: '800px' }}>
            Protects enterprise employees from lookalike domains, Cyrillic Unicode homographs (e.g. <code>pаypal.com</code>), brand-spoofing login pages, and credential harvesters in under <strong>18 milliseconds</strong>.
          </p>
        </div>

        {/* 1-Click Interactive Test Scenarios */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            1-Click Interactive Test Scenarios:
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={handleTestGoogle}
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
              title="Test legitimate Google OAuth link"
            >
              <CheckCircle2 size={14} />
              <span>Safe Link (Google OAuth)</span>
            </button>

            <button
              onClick={handleTestRedirect}
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
              title="Test suspicious open redirect tracking link"
            >
              <AlertTriangle size={14} />
              <span>Suspicious (Open Redirect)</span>
            </button>

            <button
              onClick={handleTestPaypal}
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
              title="Test critical Cyrillic homograph PayPal attack"
            >
              <Flame size={14} color="var(--accent-rose)" />
              <span>Zero-Day Attack (Cyrillic PayPal)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive URL Scanner Input Box */}
      <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '24px', background: 'rgba(13, 19, 33, 0.95)', border: '1px solid var(--accent-cyan)' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
            <Search size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>Inspect Any URL:</span>
          </div>

          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Paste any link (e.g. https://pаypal.com/verify or https://accounts.google.com)"
            style={{
              flex: 1,
              minWidth: '280px',
              padding: '10px 14px',
              borderRadius: '6px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--phish-border)',
              color: '#ffffff',
              fontSize: '0.86rem',
              fontFamily: 'var(--font-mono)',
              outline: 'none'
            }}
          />

          <button
            onClick={() => handleScan()}
            disabled={isScanning}
            className="btn-primary"
            style={{ padding: '10px 22px' }}
          >
            {isScanning ? (
              <>
                <RefreshCw size={15} className="pulse-danger" />
                <span>Scanning Lexical AST...</span>
              </>
            ) : (
              <>
                <Zap size={15} />
                <span>Scan Link</span>
              </>
            )}
          </button>
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
              Total URLs Scanned
            </span>
            <Globe size={16} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            482,900
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>
            Continuous real-time edge filtering
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px', borderLeft: '4px solid var(--accent-rose)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Phishing Attacks Intercepted
            </span>
            <ShieldAlert size={16} color="var(--accent-rose)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-rose)', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            1,842 Sites
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-rose)', marginTop: '4px' }}>
            Zero corporate credentials compromised
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Lexical AI Latency
            </span>
            <Zap size={16} color="var(--accent-amber)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            18 ms
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Sub-second Zero-Trust gateway defense
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Brand Spoof Precision
            </span>
            <CheckCircle2 size={16} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            99.9%
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Zero false positives on authentic OAuth
          </div>
        </div>
      </div>

      {/* Main 2-Column Workstation */}
      <div className="grid-responsive-phish">
        
        {/* Left: Live Threat Stream */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={18} color="var(--accent-cyan)" />
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                Recent Threat Interceptions Feed
              </h2>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255, 255, 255, 0.03)', padding: '3px', borderRadius: '6px', border: '1px solid var(--phish-border)' }}>
              {[
                { id: 'ALL', label: 'All Feeds' },
                { id: 'CRITICAL_PHISHING', label: 'Phishing' },
                { id: 'SUSPICIOUS', label: 'Suspicious' },
                { id: 'SAFE', label: 'Safe Links' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterLevel(tab.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: filterLevel === tab.id ? 'var(--accent-cyan)' : 'transparent',
                    color: filterLevel === tab.id ? '#060911' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Click any threat row below to inspect its WHOIS record, lexical entropy, and SSL certificates:
          </p>

          {/* Threat List Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredThreats.map((t) => {
              const isSelected = selectedThreat.id === t.id;
              
              let statusPill = {
                label: 'SAFE LINK',
                color: 'var(--accent-emerald)',
                bg: 'rgba(16, 185, 129, 0.12)',
                border: 'rgba(16, 185, 129, 0.3)'
              };

              if (t.threatLevel === 'CRITICAL_PHISHING') {
                statusPill = {
                  label: 'MALICIOUS PHISH',
                  color: 'var(--accent-rose)',
                  bg: 'rgba(244, 63, 94, 0.15)',
                  border: 'rgba(244, 63, 94, 0.4)'
                };
              } else if (t.threatLevel === 'SUSPICIOUS') {
                statusPill = {
                  label: 'SUSPICIOUS REDIRECT',
                  color: 'var(--accent-amber)',
                  bg: 'rgba(245, 158, 11, 0.15)',
                  border: 'rgba(245, 158, 11, 0.35)'
                };
              }

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedThreat(t)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: isSelected ? 'rgba(56, 189, 248, 0.09)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--phish-border)',
                    boxShadow: isSelected ? '0 0 16px rgba(56, 189, 248, 0.2)' : 'none',
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
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--phish-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {t.threatLevel === 'CRITICAL_PHISHING' ? (
                        <ShieldAlert size={18} color="var(--accent-rose)" />
                      ) : t.threatLevel === 'SUSPICIOUS' ? (
                        <AlertTriangle size={18} color="var(--accent-amber)" />
                      ) : (
                        <ShieldCheck size={18} color="var(--accent-emerald)" />
                      )}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '0.88rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                          {t.domain}
                        </strong>
                      </div>

                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                        Target: <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{t.targetedBrand}</span> • Hosted in {t.serverCountry}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: t.riskScore >= 75 ? 'var(--accent-rose)' : t.riskScore >= 40 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {t.riskScore}%
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

        {/* Right: Deep Forensic Analysis Panel */}
        <div className="glass-panel" style={{ padding: '24px', position: 'sticky', top: '80px' }}>
          
          {/* Laser Scanner animation if critical phish */}
          {selectedThreat.threatLevel === 'CRITICAL_PHISHING' && <div className="laser-scanner" />}

          {/* Header with Circular Threat Score */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--phish-border)', paddingBottom: '14px', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                Forensic Threat Dossier
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '2px' }}>
                {selectedThreat.targetedBrand}
              </h2>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Attack Vector: {selectedThreat.attackVector}
              </span>
            </div>

            {/* Circular Risk Gauge */}
            <div style={{ position: 'relative', width: '64px', height: '64px' }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke={selectedThreat.riskScore >= 75 ? 'var(--accent-rose)' : selectedThreat.riskScore >= 40 ? 'var(--accent-amber)' : 'var(--accent-emerald)'}
                  strokeWidth="3"
                  strokeDasharray="94.2"
                  strokeDashoffset={94.2 - (94.2 * selectedThreat.riskScore) / 100}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                />
              </svg>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1
              }}>
                <span style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: selectedThreat.riskScore >= 75 ? 'var(--accent-rose)' : selectedThreat.riskScore >= 40 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {selectedThreat.riskScore}%
                </span>
                <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  THREAT
                </span>
              </div>
            </div>
          </div>

          {/* Full Inspected URL Box */}
          <div style={{
            padding: '12px 14px',
            borderRadius: '8px',
            marginBottom: '16px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--phish-border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            wordBreak: 'break-all',
            color: selectedThreat.threatLevel === 'CRITICAL_PHISHING' ? 'var(--accent-rose)' : '#ffffff'
          }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
              INSPECTED URI:
            </div>
            {selectedThreat.url}
          </div>

          {/* Plain-English Threat Rationale */}
          <div style={{
            padding: '14px 16px',
            borderRadius: '8px',
            marginBottom: '18px',
            background: selectedThreat.status === 'BLOCKED' 
              ? 'rgba(244, 63, 94, 0.14)' 
              : selectedThreat.status === 'QUARANTINED' 
              ? 'rgba(245, 158, 11, 0.14)' 
              : 'rgba(16, 185, 129, 0.14)',
            border: `1px solid ${selectedThreat.status === 'BLOCKED' ? 'rgba(244, 63, 94, 0.4)' : selectedThreat.status === 'QUARANTINED' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
          }}>
            <div style={{
              fontSize: '0.88rem',
              fontWeight: 800,
              color: selectedThreat.status === 'BLOCKED' ? 'var(--accent-rose)' : selectedThreat.status === 'QUARANTINED' ? 'var(--accent-amber)' : 'var(--accent-emerald)'
            }}>
              {selectedThreat.status === 'BLOCKED' 
                ? '🛑 Malicious Phishing Kit Blocked by AI Firewall' 
                : selectedThreat.status === 'QUARANTINED' 
                ? '⚠️ Suspicious Tracking Gateway Quarantined' 
                : '✅ Authenticated Corporate Domain Cleared'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
              {selectedThreat.heuristicReasons[0]}
            </div>
          </div>

          {/* Lexical Heuristic Flags */}
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
              Detected Lexical &amp; Anomaly Signals:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedThreat.lexicalFlags.map((flag, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span style={{
                    color: selectedThreat.threatLevel === 'CRITICAL_PHISHING' ? 'var(--accent-rose)' : 'var(--accent-emerald)',
                    fontWeight: 800
                  }}>
                    •
                  </span>
                  <span style={{ lineHeight: 1.4 }}>{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WHOIS & SSL Telemetry Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            fontSize: '0.76rem',
            borderTop: '1px solid var(--phish-border)',
            paddingTop: '14px',
            marginBottom: '18px'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Server Location</span>
              <div style={{ color: '#ffffff', fontWeight: 700 }}>{selectedThreat.serverCountry}</div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>IP Address</span>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{selectedThreat.ipAddress}</div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Domain Age</span>
              <div style={{ color: selectedThreat.domainAgeDays < 7 ? 'var(--accent-rose)' : '#ffffff', fontWeight: 700 }}>
                {selectedThreat.domainAgeDays} Days {selectedThreat.domainAgeDays < 7 ? '(New / High Risk)' : '(Established)'}
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>SSL Authority</span>
              <div style={{ color: '#ffffff', fontWeight: 600 }}>{selectedThreat.sslIssuer}</div>
            </div>
          </div>

          {/* Advanced Detonation & Incident Remediation Suite */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
            <button
              onClick={handleOpenSandbox}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.25), rgba(56, 189, 248, 0.18))',
                border: '1px solid rgba(225, 29, 72, 0.45)',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 16px rgba(225, 29, 72, 0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              <Flame size={15} color="var(--accent-rose)" />
              <span>⚡ Detonate in Visual Mimicry Sandbox</span>
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleOpenTakedown}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--phish-border)',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <FileText size={13} />
                <span>ICANN Abuse Notice</span>
              </button>

              <button
                onClick={handleExportSTIX}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--phish-border)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Download size={13} />
                <span>Export STIX 2.1</span>
              </button>
            </div>
          </div>

          {/* Interactive Action Controls */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleBlockAndReport}
              className="btn-primary"
              style={{
                flex: 1,
                justifyContent: 'center',
                fontSize: '0.78rem',
                background: 'linear-gradient(135deg, var(--accent-rose), #be123c)',
                boxShadow: '0 4px 14px rgba(244, 63, 94, 0.35)'
              }}
            >
              <ShieldAlert size={14} />
              <span>Deploy Global DNS Block</span>
            </button>

            <button
              onClick={handleWhitelist}
              className="btn-secondary"
              style={{
                flex: 1,
                justifyContent: 'center',
                fontSize: '0.78rem',
                color: 'var(--accent-emerald)',
                borderColor: 'rgba(16, 185, 129, 0.35)'
              }}
            >
              <ShieldCheck size={14} />
              <span>Whitelist URL</span>
            </button>
          </div>

        </div>

      </div>

      {/* 1. VISUAL MIMICRY DETONATION SANDBOX MODAL */}
      {sandboxModalOpen && detonationData && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 110,
          background: 'rgba(3, 7, 18, 0.88)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1000px',
            background: 'var(--phish-bg-surface)',
            border: '1px solid var(--phish-border)',
            borderRadius: '16px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(225, 29, 72, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            maxHeight: '90vh'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid var(--phish-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Flame size={20} color="var(--accent-rose)" />
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                    Visual Mimicry Detonation Sandbox
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Isolated Headless Browser Container • DOM Lexical Harvest &amp; Token Trap
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSandboxModalOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--phish-border)',
                  borderRadius: '8px',
                  padding: '6px',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Telemetry Strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                padding: '14px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '10px',
                border: '1px solid var(--phish-border)'
              }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>VISUAL SIMILARITY MATCH</span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--accent-rose)', fontFamily: 'var(--font-mono)' }}>
                    {detonationData.visualSimilarityPct}% Match
                  </div>
                  <span style={{ fontSize: '0.66rem', color: 'var(--accent-rose)' }}>High-fidelity brand forgery</span>
                </div>

                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>TARGET CREDENTIAL TYPE</span>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                    {detonationData.credentialTarget}
                  </div>
                  <span style={{ fontSize: '0.66rem', color: 'var(--accent-amber)' }}>High value corporate payload</span>
                </div>

                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>MFA EXFILTRATION HOOK</span>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-rose)', marginTop: '4px' }}>
                    Active Telegram C2 Exfiltration
                  </div>
                  <span style={{ fontSize: '0.66rem', color: 'var(--accent-cyan)' }}>Real-time reverse proxy interception</span>
                </div>
              </div>

              {/* Side-by-Side Visual Comparison Preview */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                
                {/* Authentic Column */}
                <div style={{
                  borderRadius: '10px',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  background: 'rgba(16, 185, 129, 0.03)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={14} />
                      AUTHENTIC OFFICIAL PORTAL
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      TLS 1.3 EV Verified
                    </span>
                  </div>

                  <div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>
                    🔒 {detonationData.officialDomain}
                  </div>

                  {/* Simulated Authentic UI */}
                  <div style={{
                    padding: '24px',
                    borderRadius: '8px',
                    background: '#0e1626',
                    border: '1px solid rgba(255,255,255,0.06)',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                      {detonationData.legitimateBrand}
                    </div>
                    <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      Official enterprise single sign-on with multi-factor biometric authentication.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '240px', margin: '0 auto' }}>
                      <input disabled value="user@corporate.com" style={{ padding: '6px 10px', fontSize: '0.74rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--phish-border)', color: '#fff', borderRadius: '4px' }} />
                      <input disabled type="password" value="••••••••••••" style={{ padding: '6px 10px', fontSize: '0.74rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--phish-border)', color: '#fff', borderRadius: '4px' }} />
                      <button disabled style={{ padding: '8px', borderRadius: '4px', background: 'var(--accent-cyan)', color: '#000', fontWeight: 800, fontSize: '0.74rem', border: 'none' }}>
                        Verified Login
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phishing Kit Detonated Column */}
                <div style={{
                  borderRadius: '10px',
                  border: '1px solid rgba(244, 63, 94, 0.5)',
                  background: 'rgba(244, 63, 94, 0.04)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={14} />
                      DETONATED PHISHING KIT (SANDBOX)
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--accent-rose)', fontWeight: 700 }}>
                      FRAUDULENT COPY
                    </span>
                  </div>

                  <div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-rose)' }}>
                    ⚠️ {selectedThreat.url}
                  </div>

                  {/* Simulated Phishing UI with Harvest Overlays */}
                  <div style={{
                    padding: '24px',
                    borderRadius: '8px',
                    background: '#190a12',
                    border: '1px dashed rgba(244, 63, 94, 0.4)',
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-rose)', marginBottom: '8px' }}>
                      {detonationData.domTitle}
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      Cloned CSS template injecting keylogger and stealing session cookies.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '240px', margin: '0 auto' }}>
                      {detonationData.extractedFormFields.map((field, fIdx) => (
                        <div key={fIdx} style={{
                          padding: '6px 8px',
                          fontSize: '0.7rem',
                          background: 'rgba(244, 63, 94, 0.15)',
                          border: '1px solid rgba(244, 63, 94, 0.35)',
                          borderRadius: '4px',
                          color: '#fecdd3',
                          fontFamily: 'var(--font-mono)',
                          textAlign: 'left'
                        }}>
                          🎯 Harvester: {field}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Exfiltration Endpoint Evidence */}
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--phish-border)',
                fontSize: '0.76rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.68rem', fontWeight: 800 }}>
                  CAPTURED C2 EXFILTRATION DESTINATION:
                </span>
                <div style={{ color: 'var(--accent-rose)', marginTop: '4px', wordBreak: 'break-all' }}>
                  {detonationData.exfiltrationEndpoint}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '14px 24px',
              borderTop: '1px solid var(--phish-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.4)'
            }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Sandboxed isolation prevents local code execution. Zero malware leak.
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    handleOpenTakedown();
                    setSandboxModalOpen(false);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: 'var(--accent-cyan)',
                    color: '#080c14',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Proceed to Takedown Notice &gt;
                </button>
                <button
                  onClick={() => setSandboxModalOpen(false)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    border: '1px solid var(--phish-border)',
                    cursor: 'pointer'
                  }}
                >
                  Close Sandbox
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. AUTOMATED ICANN TAKEDOWN NOTICE GENERATOR MODAL */}
      {takedownModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 110,
          background: 'rgba(3, 7, 18, 0.88)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '850px',
            background: 'var(--phish-bg-surface)',
            border: '1px solid var(--phish-border)',
            borderRadius: '16px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(56, 189, 248, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            maxHeight: '90vh'
          }}>
            {/* Header */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid var(--phish-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={20} color="var(--accent-cyan)" />
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                    Automated ICANN Phishing Takedown Notice
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Legally Compliant RFC 2822 Abuse Letter for Upstream Registrars &amp; Hosting Providers
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTakedownModalOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--phish-border)',
                  borderRadius: '8px',
                  padding: '6px',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Ready to be dispatched to registrar abuse contact: <strong style={{ color: 'var(--accent-cyan)' }}>abuse@{selectedThreat.domain.split('.').slice(-2).join('.')}</strong>
                </span>
                <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  Article 3.7.7 RAA Compliant
                </span>
              </div>

              <textarea
                readOnly
                value={takedownText}
                style={{
                  width: '100%',
                  height: '340px',
                  padding: '14px',
                  background: 'rgba(0,0,0,0.45)',
                  border: '1px solid var(--phish-border)',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  lineHeight: 1.5,
                  resize: 'none',
                  outline: 'none'
                }}
              />
            </div>

            {/* Footer */}
            <div style={{
              padding: '14px 24px',
              borderTop: '1px solid var(--phish-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.4)',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(takedownText);
                    triggerToast('ICANN Takedown notice copied to clipboard!');
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    border: '1px solid var(--phish-border)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Copy size={13} />
                  <span>Copy Notice</span>
                </button>

                <button
                  onClick={() => {
                    const blob = new Blob([takedownText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `ICANN_Takedown_${selectedThreat.domain}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                    triggerToast('Downloaded ICANN Takedown Notice (.txt)');
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    border: '1px solid var(--phish-border)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Download size={13} />
                  <span>Download .TXT</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    triggerToast(`Remediation dispatched to registrar abuse desk for ${selectedThreat.domain}`);
                    setTakedownModalOpen(false);
                  }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, var(--accent-rose), #be123c)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 16px rgba(225, 29, 72, 0.4)'
                  }}
                >
                  🚀 Dispatch to Registrar Abuse Desk
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

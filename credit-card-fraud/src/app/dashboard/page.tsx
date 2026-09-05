'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, Zap, 
  CreditCard, CheckCircle2, XCircle, ArrowRight, Info, Sparkles, 
  Sliders, Lock, MapPin, Smartphone, HelpCircle, RefreshCw,
  TrendingUp, Activity, Check, UserCheck, ShieldOff, Coffee,
  Plane, Gem, ShoppingBag, Globe, DollarSign, Volume2, VolumeX,
  Compass, Radio, Flame, Cpu, Eye
} from 'lucide-react';
import { INITIAL_TRANSACTIONS, Transaction } from '@/lib/fraud-data';
import { generateRandomTransaction } from '@/lib/fraud-engine';

// World Coordinates for Animated Vector Radar
interface GeoPoint {
  x: number;
  y: number;
  name: string;
}

const CITY_COORDINATES: Record<string, GeoPoint> = {
  'New York, NY': { x: 265, y: 110, name: 'New York (USA)' },
  'London, UK': { x: 445, y: 85, name: 'London (UK)' },
  'Dubrovnik, Croatia': { x: 490, y: 105, name: 'Dubrovnik (Croatia)' },
  'Dubai, UAE': { x: 570, y: 130, name: 'Dubai (UAE)' },
  'San Francisco, CA': { x: 170, y: 115, name: 'San Francisco (USA)' },
  'Tokyo, Japan': { x: 740, y: 115, name: 'Tokyo (Japan)' },
};

export default function FraudDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [selectedTxn, setSelectedTxn] = useState<Transaction>(INITIAL_TRANSACTIONS[0]);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [radarScanning, setRadarScanning] = useState<boolean>(true);

  // Web Audio Synthesizer for high-tech sound effects
  const playBeep = (type: 'approve' | 'warning' | 'alert') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'approve') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'warning') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(370, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        // Alarm / Stolen Card Blocked
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // AudioContext blocked by browser policy until user interacts
    }
  };

  // Auto-streaming simulation effect
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      const newTxn = generateRandomTransaction();
      setTransactions(prev => [newTxn, ...prev.slice(0, 14)]);
    }, 5500);
    return () => clearInterval(interval);
  }, [isStreaming]);

  // Guided Simulation Buttons
  const handleSimulateSafe = () => {
    const safeTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      cardLast4: '4192',
      cardholderName: 'David Miller',
      amount: 18.50,
      currency: 'USD',
      merchant: 'Starbucks Coffee Reserve',
      category: 'Dining',
      location: 'New York, NY',
      country: 'US',
      ipAddress: '24.130.44.18',
      device: 'iPhone 15 Pro (Apple Pay Token)',
      timestamp: 'Just now',
      riskScore: 6,
      riskLevel: 'LOW',
      status: 'APPROVED',
      triggers: [
        'Routine merchant history with cardholder profile',
        'Verified geo-proximity: 0.4 miles from home billing address',
        'Cryptographic biometric Apple Pay token confirmed'
      ]
    };
    setTransactions(prev => [safeTxn, ...prev.slice(0, 14)]);
    setSelectedTxn(safeTxn);
    playBeep('approve');
    triggerNotice('Safe purchase verified: Starbucks ($18.50) — Auto-Approved (6% risk)');
  };

  const handleSimulateSuspicious = () => {
    const susTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      cardLast4: '8831',
      cardholderName: 'Michael Chang',
      amount: 480.00,
      currency: 'USD',
      merchant: 'Regent Street Electronics',
      category: 'Electronics',
      location: 'London, UK',
      country: 'GB',
      ipAddress: '81.187.20.10',
      device: 'Chrome 122 on Windows 11',
      timestamp: 'Just now',
      riskScore: 54,
      riskLevel: 'MEDIUM',
      status: 'CHALLENGED_3DS',
      triggers: [
        'First time card swiped in United Kingdom',
        'Transaction value exceeds 30-day baseline by 320%',
        'Step-up security challenge dispatched: 6-digit SMS OTP sent to mobile'
      ]
    };
    setTransactions(prev => [susTxn, ...prev.slice(0, 14)]);
    setSelectedTxn(susTxn);
    playBeep('warning');
    triggerNotice('Suspicious anomaly detected: London ($480.00) — SMS OTP Challenge Dispatched');
  };

  const handleSimulateFraud = () => {
    const fraudTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      cardLast4: '9012',
      cardholderName: 'Sarah Jenkins',
      amount: 3850.00,
      currency: 'USD',
      merchant: 'Dubrovnik Luxury Diamonds',
      category: 'Luxury Goods',
      location: 'Dubrovnik, Croatia',
      country: 'HR',
      ipAddress: '185.220.101.5',
      device: 'Unknown Device (Tor VPN Proxy)',
      timestamp: 'Just now',
      riskScore: 97,
      riskLevel: 'CRITICAL_FRAUD',
      status: 'BLOCKED',
      triggers: [
        'CRITICAL: Impossible physical travel speed (6,180 miles in 22 minutes = 16,854 MPH)',
        'Anonymized IP: Transaction routed through known dark-web Tor exit node',
        'High value luxury purchase on newly linked virtual device'
      ]
    };
    setTransactions(prev => [fraudTxn, ...prev.slice(0, 14)]);
    setSelectedTxn(fraudTxn);
    playBeep('alert');
    triggerNotice('🚨 CRITICAL THREAT INTERCEPTED: Stolen card attack blocked in Croatia ($3,850.00)!');
  };

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4500);
  };

  // Interactive Actions on Current Transaction
  const handleUnblockCard = () => {
    const updated: Transaction = {
      ...selectedTxn,
      status: 'APPROVED',
      riskScore: 10,
      riskLevel: 'LOW',
      triggers: ['Customer verified via biometric bank phone hotline. Card unblocked and transaction cleared.']
    };
    setSelectedTxn(updated);
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
    playBeep('approve');
    triggerNotice(`Card unblocked for ${updated.cardholderName}. Status updated to APPROVED.`);
  };

  const handleConfirmFraud = () => {
    const updated: Transaction = {
      ...selectedTxn,
      status: 'BLOCKED',
      riskScore: 99,
      riskLevel: 'CRITICAL_FRAUD',
      triggers: [...selectedTxn.triggers, 'Confirmed theft by bank security officer. Card permanently revoked and chip disabled.']
    };
    setSelectedTxn(updated);
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
    playBeep('alert');
    triggerNotice(`Fraud confirmed for ${selectedTxn.id}. Card destroyed and replacement dispatched.`);
  };

  const filteredTxns = transactions.filter(t => statusFilter === 'ALL' || t.status === statusFilter);

  // Category Icon Helper
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'dining': return <Coffee size={15} color="var(--accent-cyan)" />;
      case 'travel & flights': return <Plane size={15} color="var(--accent-indigo)" />;
      case 'luxury goods': return <Gem size={15} color="var(--accent-rose)" />;
      default: return <ShoppingBag size={15} color="var(--accent-amber)" />;
    }
  };

  // Coordinates for Geo-Vector Arc
  const originCoord = CITY_COORDINATES['San Francisco, CA'];
  const targetCoord = CITY_COORDINATES[selectedTxn.location] || CITY_COORDINATES['New York, NY'];

  // Midpoint control curve for flight vector
  const midX = (originCoord.x + targetCoord.x) / 2;
  const midY = Math.min(originCoord.y, targetCoord.y) - 35;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Toast Notice */}
      {actionNotice && (
        <div style={{
          position: 'fixed',
          top: '76px',
          right: '24px',
          zIndex: 100,
          background: 'rgba(11, 15, 25, 0.96)',
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
          animation: 'pulseDangerRing 0.3s ease-out'
        }}>
          <Sparkles size={18} color="var(--accent-cyan)" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Futuristic Enterprise Command Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(99, 102, 241, 0.15))',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: 'var(--accent-cyan)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              <ShieldAlert size={13} />
              Autonomous Banking Defense Core
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
              <span>Telemetry: <strong>1,420 Events/sec</strong></span>
            </span>
          </div>

          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            SentinelPay <span style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fraud Radar &amp; Impossible Travel Engine</span>
          </h1>
        </div>

        {/* Tactical Controls & Sound Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn-secondary"
            style={{ padding: '7px 12px', fontSize: '0.76rem' }}
            title="Toggle cyber audio effects"
          >
            {soundEnabled ? <Volume2 size={14} color="var(--accent-cyan)" /> : <VolumeX size={14} color="var(--text-muted)" />}
            <span>{soundEnabled ? 'Audio FX On' : 'Muted'}</span>
          </button>

          {/* 1-Click Interactive Test Scenarios with Neon Glow */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={handleSimulateSafe}
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
              <span>Safe ($18 Coffee)</span>
            </button>

            <button
              onClick={handleSimulateSuspicious}
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
              <span>Unusual ($480 London)</span>
            </button>

            <button
              onClick={handleSimulateFraud}
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
              <span>Stolen Card ($3,850 Croatia)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. UNIQUE & COMPLEX: Live Vector Radar & World Threat Map */}
      <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '24px', background: 'rgba(10, 14, 23, 0.9)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Compass size={18} color="var(--accent-cyan)" />
            <strong style={{ fontSize: '0.95rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Live Impossible Travel Vector Radar &amp; Geo-Telemetry
            </strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.74rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>
              Origin: <strong style={{ color: '#ffffff' }}>San Francisco, USA</strong>
            </span>
            <span style={{ color: 'var(--text-muted)' }}>➔</span>
            <span style={{ color: 'var(--text-muted)' }}>
              Current Swipe: <strong style={{ color: selectedTxn.status === 'BLOCKED' ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>{selectedTxn.location}</strong>
            </span>
            <span style={{
              padding: '2px 8px',
              borderRadius: '4px',
              background: selectedTxn.status === 'BLOCKED' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              color: selectedTxn.status === 'BLOCKED' ? 'var(--accent-rose)' : 'var(--accent-emerald)',
              fontWeight: 800
            }}>
              {selectedTxn.status === 'BLOCKED' ? 'VELOCITY BREACH: 16,854 MPH' : 'SAFE VELOCITY: 0 MPH'}
            </span>
          </div>
        </div>

        {/* SVG World Map with Animated Radar Vectors */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          background: 'radial-gradient(ellipse at center, rgba(17, 24, 39, 0.7) 0%, rgba(6, 8, 13, 0.95) 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          overflow: 'hidden'
        }}>
          {/* Subtle Cyber Radar Sweep Background Grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          {/* Sweeping Radar Scanner Line */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '400px',
            height: '400px',
            marginTop: '-200px',
            marginLeft: '-200px',
            borderRadius: '50%',
            border: '1px solid rgba(56, 189, 248, 0.1)',
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'conic-gradient(from 0deg, rgba(56, 189, 248, 0.15) 0deg, transparent 60deg)',
              borderRadius: '50%',
              animation: 'radarSweep 6s linear infinite'
            }} />
          </div>

          {/* SVG Vector Arcs & World Nodes */}
          <svg viewBox="0 0 900 220" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 5 }}>
            {/* World Continent Background Outline Nodes */}
            <g opacity="0.25" fill="#38bdf8">
              {/* North America */}
              <circle cx="170" cy="115" r="3" />
              <circle cx="210" cy="95" r="2.5" />
              <circle cx="265" cy="110" r="3" />
              <circle cx="190" cy="140" r="2.5" />
              {/* Europe */}
              <circle cx="445" cy="85" r="3" />
              <circle cx="470" cy="80" r="2.5" />
              <circle cx="490" cy="105" r="3" />
              {/* Middle East & Asia */}
              <circle cx="570" cy="130" r="3" />
              <circle cx="680" cy="120" r="2.5" />
              <circle cx="740" cy="115" r="3" />
            </g>

            {/* Connecting Arc between Origin & Current Swipe */}
            <path
              d={`M ${originCoord.x} ${originCoord.y} Q ${midX} ${midY} ${targetCoord.x} ${targetCoord.y}`}
              fill="none"
              stroke={selectedTxn.status === 'BLOCKED' ? 'var(--accent-rose)' : 'var(--accent-cyan)'}
              strokeWidth={selectedTxn.status === 'BLOCKED' ? "3" : "2"}
              className="flight-arc"
            />

            {/* Origin Node (San Francisco) */}
            <g transform={`translate(${originCoord.x}, ${originCoord.y})`}>
              <circle r="8" fill="rgba(56, 189, 248, 0.3)" className="pulse-danger" />
              <circle r="4" fill="var(--accent-cyan)" />
              <text y="-10" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)">
                San Francisco (Origin)
              </text>
            </g>

            {/* Current Swipe Target Node */}
            <g transform={`translate(${targetCoord.x}, ${targetCoord.y})`}>
              <circle
                r="12"
                fill={selectedTxn.status === 'BLOCKED' ? 'rgba(244, 63, 94, 0.4)' : 'rgba(16, 185, 129, 0.4)'}
                className="pulse-danger"
              />
              <circle
                r="5"
                fill={selectedTxn.status === 'BLOCKED' ? 'var(--accent-rose)' : 'var(--accent-emerald)'}
              />
              <text y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="var(--font-mono)">
                {selectedTxn.location} (${selectedTxn.amount.toFixed(0)})
              </text>
            </g>
          </svg>

          {/* Telemetry HUD Pill (Bottom Left of Map) */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '14px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '6px 14px',
            borderRadius: '6px',
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid var(--fin-border)',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)'
          }}>
            <span style={{ color: 'var(--accent-cyan)' }}>IP: {selectedTxn.ipAddress}</span>
            <span style={{ color: 'var(--fin-border)' }}>|</span>
            <span style={{ color: 'var(--text-secondary)' }}>DEVICE: {selectedTxn.device}</span>
            <span style={{ color: 'var(--fin-border)' }}>|</span>
            <span style={{ color: selectedTxn.status === 'BLOCKED' ? 'var(--accent-rose)' : 'var(--accent-emerald)', fontWeight: 700 }}>
              DECISION: {selectedTxn.status}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Top 4 High-Trust Executive KPI Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Total Monitored
            </span>
            <DollarSign size={16} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            $1,248,500
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>
            14,290 verified card swipes today
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px', borderLeft: '4px solid var(--accent-emerald)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Fraud Prevented
            </span>
            <ShieldCheck size={16} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            $42,850.00
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>
            100% saved — $0 lost to cardholders
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              AI Response Latency
            </span>
            <Zap size={16} color="var(--accent-amber)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            24 ms
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Instant sub-second banking firewall
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Legitimate Approval Rate
            </span>
            <CheckCircle2 size={16} color="var(--accent-indigo)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            99.8%
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Zero unnecessary customer friction
          </div>
        </div>
      </div>

      {/* 4. Main 2-Column Workstation */}
      <div className="grid-responsive-dashboard">
        
        {/* Left: Card Swipes Stream */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={18} color="var(--accent-cyan)" />
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                Live Card Stream
              </h2>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255, 255, 255, 0.03)', padding: '3px', borderRadius: '6px', border: '1px solid var(--fin-border)' }}>
              {[
                { id: 'ALL', label: 'All (15)' },
                { id: 'APPROVED', label: 'Approved' },
                { id: 'CHALLENGED_3DS', label: 'SMS Verify' },
                { id: 'BLOCKED', label: 'Fraud Blocked' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: statusFilter === tab.id ? 'var(--accent-cyan)' : 'transparent',
                    color: statusFilter === tab.id ? '#07090e' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Click any transaction to trace its flight vector and forensic risk parameters on the right:
          </p>

          {/* Transaction Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredTxns.map((t) => {
              const isSelected = selectedTxn.id === t.id;
              
              let statusPill = {
                label: 'APPROVED',
                color: 'var(--accent-emerald)',
                bg: 'rgba(16, 185, 129, 0.12)',
                border: 'rgba(16, 185, 129, 0.3)'
              };

              if (t.status === 'BLOCKED') {
                statusPill = {
                  label: 'BLOCKED • STOLEN',
                  color: 'var(--accent-rose)',
                  bg: 'rgba(244, 63, 94, 0.15)',
                  border: 'rgba(244, 63, 94, 0.4)'
                };
              } else if (t.status === 'CHALLENGED_3DS') {
                statusPill = {
                  label: 'SMS OTP SENT',
                  color: 'var(--accent-amber)',
                  bg: 'rgba(245, 158, 11, 0.15)',
                  border: 'rgba(245, 158, 11, 0.35)'
                };
              }

              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTxn(t);
                    if (t.status === 'BLOCKED') playBeep('alert');
                    else if (t.status === 'CHALLENGED_3DS') playBeep('warning');
                    else playBeep('approve');
                  }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: isSelected ? 'rgba(56, 189, 248, 0.09)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--fin-border)',
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
                      border: '1px solid var(--fin-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {getCategoryIcon(t.category)}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>
                          {t.merchant}
                        </strong>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          • {t.timestamp}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {t.cardholderName} (•••• {t.cardLast4}) in <span style={{ color: 'var(--accent-cyan)' }}>{t.location}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                      ${t.amount.toFixed(2)}
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

        {/* Right: Holographic Smart Card & Forensic Investigation Station */}
        <div className="glass-panel" style={{ padding: '24px', position: 'sticky', top: '80px' }}>
          
          {/* Holographic 3D Interactive EMV Smart Card */}
          <div className="hologram-card" style={{ padding: '20px', marginBottom: '20px' }}>
            <div className="laser-scanner" />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '24px',
                  borderRadius: '4px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.08em' }}>
                  EMV ENCRYPTED CHIP
                </span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 8px',
                borderRadius: '4px',
                background: selectedTxn.status === 'BLOCKED' ? 'rgba(244, 63, 94, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                color: selectedTxn.status === 'BLOCKED' ? 'var(--accent-rose)' : 'var(--accent-emerald)',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                <Lock size={11} />
                <span>{selectedTxn.status === 'BLOCKED' ? 'CARD FROZEN' : 'ACTIVE CHIP'}</span>
              </div>
            </div>

            {/* Masked Card Number */}
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.18em',
              color: '#ffffff',
              marginBottom: '18px',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)'
            }}>
              4532 •••• •••• {selectedTxn.cardLast4}
            </div>

            {/* Cardholder & Expiry */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.75rem' }}>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', fontSize: '0.65rem' }}>CARDHOLDER</span>
                <div style={{ color: '#ffffff', fontWeight: 700, letterSpacing: '0.05em' }}>{selectedTxn.cardholderName.toUpperCase()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', fontSize: '0.65rem' }}>EXPIRES</span>
                <div style={{ color: '#ffffff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>08/29</div>
              </div>
            </div>
          </div>

          {/* Forensic Investigation Header & Circular Risk Meter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--fin-border)', paddingBottom: '14px', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                Forensic Threat Radar
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '2px' }}>
                {selectedTxn.merchant}
              </h2>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Ref: {selectedTxn.id}
              </span>
            </div>

            {/* Circular Hologram Risk Gauge */}
            <div style={{ position: 'relative', width: '64px', height: '64px' }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke={selectedTxn.riskScore >= 75 ? 'var(--accent-rose)' : selectedTxn.riskScore >= 45 ? 'var(--accent-amber)' : 'var(--accent-emerald)'}
                  strokeWidth="3"
                  strokeDasharray="94.2"
                  strokeDashoffset={94.2 - (94.2 * selectedTxn.riskScore) / 100}
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
                  color: selectedTxn.riskScore >= 75 ? 'var(--accent-rose)' : selectedTxn.riskScore >= 45 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {selectedTxn.riskScore}%
                </span>
                <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  RISK
                </span>
              </div>
            </div>
          </div>

          {/* Plain-English Decision Banner */}
          <div style={{
            padding: '14px 16px',
            borderRadius: '8px',
            marginBottom: '18px',
            background: selectedTxn.status === 'BLOCKED' 
              ? 'rgba(244, 63, 94, 0.14)' 
              : selectedTxn.status === 'CHALLENGED_3DS' 
              ? 'rgba(245, 158, 11, 0.14)' 
              : 'rgba(16, 185, 129, 0.14)',
            border: `1px solid ${selectedTxn.status === 'BLOCKED' ? 'rgba(244, 63, 94, 0.4)' : selectedTxn.status === 'CHALLENGED_3DS' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
          }}>
            <div style={{
              fontSize: '0.88rem',
              fontWeight: 800,
              color: selectedTxn.status === 'BLOCKED' ? 'var(--accent-rose)' : selectedTxn.status === 'CHALLENGED_3DS' ? 'var(--accent-amber)' : 'var(--accent-emerald)'
            }}>
              {selectedTxn.status === 'BLOCKED' 
                ? '🛑 Stolen Card Charge Intercepted & Frozen' 
                : selectedTxn.status === 'CHALLENGED_3DS' 
                ? '⚠️ Purchase On Hold: SMS OTP Verification Required' 
                : '✅ Clean Daily Purchase Approved'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
              {selectedTxn.status === 'BLOCKED' 
                ? `Customer ${selectedTxn.cardholderName} was protected from an unauthorized $${selectedTxn.amount.toFixed(2)} overseas attack.` 
                : selectedTxn.status === 'CHALLENGED_3DS' 
                ? `Due to unusual travel in ${selectedTxn.location}, customer must confirm OTP code.` 
                : 'Verified normal daily routine transaction.'}
            </div>
          </div>

          {/* AI Decision Triggers */}
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
              Why Was This Decision Made?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedTxn.triggers.map((trig, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span style={{
                    color: selectedTxn.status === 'BLOCKED' ? 'var(--accent-rose)' : selectedTxn.status === 'CHALLENGED_3DS' ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                    fontWeight: 800
                  }}>
                    •
                  </span>
                  <span style={{ lineHeight: 1.4 }}>{trig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Action Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {selectedTxn.status === 'BLOCKED' ? (
                <button
                  onClick={handleUnblockCard}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    fontSize: '0.78rem',
                    background: 'linear-gradient(135deg, var(--accent-emerald), #059669)',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                  }}
                >
                  <UserCheck size={14} />
                  <span>Customer Confirmed Safe (Unblock)</span>
                </button>
              ) : (
                <button
                  onClick={handleConfirmFraud}
                  className="btn-secondary"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    fontSize: '0.78rem',
                    color: 'var(--accent-rose)',
                    borderColor: 'rgba(244, 63, 94, 0.35)'
                  }}
                >
                  <ShieldOff size={14} />
                  <span>Freeze Card (Report Stolen)</span>
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Link
                href="/rules"
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.76rem' }}
              >
                <Sliders size={13} />
                <span>Adjust Risk Rules</span>
              </Link>

              <Link
                href="/disputes"
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.76rem' }}
              >
                <AlertTriangle size={13} />
                <span>Dispute Desk</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

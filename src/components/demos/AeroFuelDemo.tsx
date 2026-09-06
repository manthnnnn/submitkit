'use client';

import { useState } from 'react';
import {
  ArrowRight, TrendingDown, Leaf,
  Wind, Compass, Globe2,
  Gauge, Sparkles, BarChart3
} from 'lucide-react';

const SECTORS = {
  'jfk-lhr': {
    name: 'JFK → LHR (Transatlantic High-Density)',
    distance: '3,451 NM',
    aircraft: 'Boeing 787-9 Dreamliner',
    baselineBurn: '42,800 kg',
    optimizedBurn: '41,380 kg',
    savingsKg: '1,420 kg',
    savingsUsd: '$2,840',
    co2Reduction: '4.48 tons',
    optimalAltitude: 'FL370 → FL390 at 30°W',
    windComponent: '+42 kts Tail-Jet',
    co2Num: '4.48 T',
    burnReduction: '-1,420 kg',
  },
  'dxb-sin': {
    name: 'DXB → SIN (Equatorial Trade Route)',
    distance: '3,178 NM',
    aircraft: 'Airbus A350-900 Ultra',
    baselineBurn: '39,400 kg',
    optimizedBurn: '38,150 kg',
    savingsKg: '1,250 kg',
    savingsUsd: '$2,500',
    co2Reduction: '3.95 tons',
    optimalAltitude: 'FL390 → FL410 over Bay of Bengal',
    windComponent: '+18 kts Cross-Equatorial',
    co2Num: '3.95 T',
    burnReduction: '-1,250 kg',
  },
  'hnd-sfo': {
    name: 'HND → SFO (Pacific Great Circle)',
    distance: '4,475 NM',
    aircraft: 'Boeing 777-300ER Long-Haul',
    baselineBurn: '68,200 kg',
    optimizedBurn: '66,120 kg',
    savingsKg: '2,080 kg',
    savingsUsd: '$4,160',
    co2Reduction: '6.57 tons',
    optimalAltitude: 'FL330 → FL360 at Dateline',
    windComponent: '+78 kts Polar Jet-Stream',
    co2Num: '6.57 T',
    burnReduction: '-2,080 kg',
  },
} as const;

type SectorKey = keyof typeof SECTORS;

export default function AeroFuelLandingPage() {
  const [selectedSector, setSelectedSector] = useState<SectorKey>('jfk-lhr');
  const current = SECTORS[selectedSector];

  const selectorBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 20px',
    borderRadius: '8px',
    border: active ? '1px solid #00f0ff' : '1px solid rgba(255,255,255,0.1)',
    background: active ? 'rgba(0,240,255,0.15)' : 'rgba(255,255,255,0.03)',
    color: active ? '#ffffff' : 'rgba(255,255,255,0.7)',
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 24px 80px', color: '#ffffff' }}>

      {/* ── HERO ── */}
      <section style={{ textAlign: 'center', padding: '40px 16px 60px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '25%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '650px', height: '350px',
          background: 'radial-gradient(ellipse at center,rgba(0,240,255,0.18) 0%,rgba(112,0,255,0.1) 60%,transparent 70%)',
          filter: 'blur(120px)', zIndex: -1, pointerEvents: 'none',
        }} />

        {/* Verification pill – plain ASCII text, no mojibake */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 18px', borderRadius: '999px',
          background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.25)',
          marginBottom: '24px', boxShadow: '0 0 25px rgba(0,240,255,0.15)',
        }}>
          <Sparkles size={15} color="#00f0ff" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#00f0ff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            ICAO Annex 16 &amp; CORSIA Verified &bull; Flight Intelligence v4.0
          </span>
        </div>

        <h1 style={{
          fontFamily: 'Outfit, system-ui, sans-serif',
          fontSize: 'clamp(2.5rem,5.8vw,4.4rem)',
          fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1,
          maxWidth: '1050px', margin: '0 auto 20px',
          background: 'linear-gradient(135deg,#ffffff 35%,#00f0ff 75%,#7000ff 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Precision Flight Trajectories. Zero Wasted Jet Fuel.
        </h1>

        <p style={{ fontSize: 'clamp(1rem,2vw,1.25rem)', color: 'rgba(255,255,255,0.72)', maxWidth: '780px', margin: '0 auto 36px', lineHeight: 1.6 }}>
          AeroFuel AI couples multi-layer atmospheric weather models, aerodynamic step-climb profiles, and neural trajectory prediction to reduce commercial aviation fuel burn with 99.2% accuracy.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => scrollTo('simulator')}
            style={{
              padding: '14px 34px', fontSize: '1.05rem', fontWeight: 800,
              borderRadius: '12px', background: 'linear-gradient(135deg,#00f0ff,#7000ff)',
              color: '#ffffff', border: 'none', cursor: 'pointer',
              boxShadow: '0 0 35px rgba(0,240,255,0.45)',
              display: 'inline-flex', alignItems: 'center', gap: '10px',
            }}
          >
            <span>Launch Fuel Predictor</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => scrollTo('architecture')}
            style={{
              padding: '14px 28px', fontSize: '1rem', fontWeight: 600,
              borderRadius: '12px', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff',
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}
          >
            <BarChart3 size={18} color="#00f0ff" />
            <span>Explore Fleet Analytics</span>
          </button>
        </div>

        {/* KPI strip — reacts to selected sector */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: '20px', maxWidth: '960px', margin: '56px auto 0',
          padding: '24px', borderRadius: '20px',
          background: 'rgba(10,10,14,0.75)', border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.7)',
        }}>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#00f0ff', fontFamily: 'Outfit,sans-serif' }}>$18.4M+</div>
            <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Fuel Costs Saved</div>
          </div>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit,sans-serif' }}>{current.burnReduction}</div>
            <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Burn Reduction — {current.aircraft}</div>
          </div>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#00ff80', fontFamily: 'Outfit,sans-serif' }}>99.2%</div>
            <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Neural Trajectory Precision</div>
          </div>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#b366ff', fontFamily: 'Outfit,sans-serif' }}>{current.co2Num}</div>
            <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>CO₂ Avoided / This Flight</div>
          </div>
        </div>
      </section>

      {/* ── SIMULATOR ── */}
      <section id="simulator" style={{ margin: '30px 0 70px', scrollMarginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Interactive Route Telemetry Simulator
          </span>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '6px' }}>
            Simulate Flight Sector Optimization
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', marginTop: '6px' }}>
            Select an international corridor to see how AeroFuel AI cuts burn while maintaining on-time schedule:
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
            <button onClick={() => setSelectedSector('jfk-lhr')} style={selectorBtnStyle(selectedSector === 'jfk-lhr')}>
              <Globe2 size={15} color="#00f0ff" />
              <span>JFK → LHR (Transatlantic)</span>
            </button>
            <button onClick={() => setSelectedSector('dxb-sin')} style={selectorBtnStyle(selectedSector === 'dxb-sin')}>
              <Compass size={15} color="#b366ff" />
              <span>DXB → SIN (Equatorial)</span>
            </button>
            <button onClick={() => setSelectedSector('hnd-sfo')} style={selectorBtnStyle(selectedSector === 'hnd-sfo')}>
              <Wind size={15} color="#00ff80" />
              <span>HND → SFO (Pacific Great Circle)</span>
            </button>
          </div>
        </div>

        {/* Cockpit Card */}
        <div style={{ borderRadius: '24px', background: 'rgba(12,14,22,0.85)', border: '1px solid rgba(0,240,255,0.2)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8),0 0 30px rgba(0,240,255,0.1)', overflow: 'hidden' }}>

          {/* Telemetry bar */}
          <div style={{ padding: '16px 24px', background: 'rgba(6,8,14,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }} />
              <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.7)' }}>
                SECTOR: {current.name} &bull; AIRCRAFT: {current.aircraft}
              </span>
            </div>
            <span style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(0,255,128,0.12)', color: '#00ff80', border: '1px solid rgba(0,255,128,0.3)', fontSize: '0.74rem', fontWeight: 700 }}>
              WIND: {current.windComponent}
            </span>
          </div>

          {/* Metric panels */}
          <div style={{ padding: '32px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '20px' }}>
            <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(0,240,255,0.04)', border: '1px solid rgba(0,240,255,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00f0ff', textTransform: 'uppercase' }}>Fuel Weight Savings</span>
                <TrendingDown size={18} color="#00f0ff" />
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit,sans-serif' }}>{current.savingsKg}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                Baseline: {current.baselineBurn} → Optimized: {current.optimizedBurn}
              </div>
            </div>

            <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(112,0,255,0.05)', border: '1px solid rgba(112,0,255,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b366ff', textTransform: 'uppercase' }}>Flight Op Cost Savings</span>
                <Gauge size={18} color="#b366ff" />
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit,sans-serif' }}>{current.savingsUsd}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>Jet-A1 Spot Index: $2.00 / kg basis</div>
            </div>

            <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(0,255,128,0.04)', border: '1px solid rgba(0,255,128,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00ff80', textTransform: 'uppercase' }}>CORSIA CO₂ Offset</span>
                <Leaf size={18} color="#00ff80" />
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit,sans-serif' }}>-{current.co2Reduction}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>Direct 3.16x carbon emission multiplier reduction</div>
            </div>
          </div>

          {/* Recommendation bar */}
          <div style={{ padding: '18px 28px', background: 'rgba(6,8,14,0.8)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
              <strong>Trajectory Recommendation:</strong> Step climb to{' '}
              <span style={{ color: '#00f0ff' }}>{current.optimalAltitude}</span>{' '}
              to ride tailwind core and minimise aerodynamic drag.
            </div>
            <button
              onClick={() => scrollTo('simulator')}
              style={{ padding: '8px 20px', fontSize: '0.85rem', borderRadius: '8px', background: 'linear-gradient(135deg,#00f0ff,#7000ff)', border: 'none', color: '#ffffff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Predict Custom Sector</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE BENTO ── */}
      <section id="architecture" style={{ margin: '60px 0 80px', scrollMarginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Aeronautical Intelligence</span>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '6px' }}>
            Engineered for Modern Flight Operations Dispatch
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '20px' }}>
          {[
            { icon: <Gauge size={22} color="#00f0ff" />, color: 'rgba(0,240,255,0.1)', border: 'rgba(0,240,255,0.3)', title: 'Dynamic Step-Climb Optimisation', body: 'As fuel burns off and aircraft weight diminishes, AeroFuel calculates the exact nautical waypoint to request ATC flight-level step-ups, operating at optimal Lift-to-Drag ratios.', tag: 'Weight-Adaptive Cruise Profiles', tagColor: '#00f0ff' },
            { icon: <Wind size={22} color="#b366ff" />, color: 'rgba(112,0,255,0.1)', border: 'rgba(112,0,255,0.3)', title: 'Live Atmospheric Jet-Stream Telemetry', body: 'Directly ingests NOAA Global Forecast System (GFS) wind shear and temperature grids to ride favourable high-altitude jet streaks and bypass headwind cores.', tag: '4D Weather Ingestion Engine', tagColor: '#b366ff' },
            { icon: <TrendingDown size={22} color="#00ff80" />, color: 'rgba(0,255,128,0.1)', border: 'rgba(0,255,128,0.3)', title: 'Tankering Price Arbitrage', body: 'Calculates the economic penalty of carrying extra fuel against spot-market Jet-A1 prices at destination hubs to determine whether round-trip fuel tankering is financially profitable.', tag: 'Cost Penalty vs Price Delta', tagColor: '#00ff80' },
          ].map(card => (
            <div key={card.title} style={{ padding: '28px', borderRadius: '16px', background: 'rgba(12,14,22,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: card.color, border: `1px solid ${card.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>{card.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px', fontFamily: 'Outfit,sans-serif' }}>{card.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>{card.body}</p>
              <div style={{ fontSize: '0.78rem', color: card.tagColor }}>{card.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section style={{ margin: '60px 0 40px', padding: '50px 30px', borderRadius: '24px', background: 'radial-gradient(ellipse at center,rgba(0,240,255,0.18) 0%,rgba(10,12,18,0.95) 75%)', border: '1px solid rgba(0,240,255,0.3)', textAlign: 'center', boxShadow: '0 0 50px rgba(0,240,255,0.15)' }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(1.8rem,3.8vw,2.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '14px' }}>
          Ready to Modernise Your Airline&apos;s Flight Trajectories?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          Jump straight into the AeroFuel Predictor to test payload configurations, analyse historical burn telemetry, and calculate sector savings.
        </p>
        <button
          onClick={() => scrollTo('simulator')}
          style={{ padding: '14px 36px', fontSize: '1.05rem', fontWeight: 800, borderRadius: '12px', background: 'linear-gradient(135deg,#00f0ff,#7000ff)', border: 'none', color: '#ffffff', cursor: 'pointer', boxShadow: '0 0 35px rgba(0,240,255,0.5)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
        >
          <span>Launch Fuel Predictor</span>
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}

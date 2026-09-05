'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  PlaneTakeoff, ArrowRight, Zap, TrendingDown, Leaf, 
  Wind, Compass, Globe2, ShieldCheck, Gauge, Layers, 
  Sparkles, CheckCircle2, ChevronRight, ArrowUpRight, BarChart3
} from 'lucide-react';

export default function AeroFuelLandingPage() {
  const [selectedSector, setSelectedSector] = useState<'jfk-lhr' | 'dxb-sin' | 'hnd-sfo'>('jfk-lhr');

  const sectors = {
    'jfk-lhr': {
      name: 'JFK âž” LHR (Transatlantic High-Density)',
      distance: '3,451 NM',
      aircraft: 'Boeing 787-9 Dreamliner',
      baselineBurn: '42,800 kg',
      optimizedBurn: '41,380 kg',
      savingsKg: '1,420 kg',
      savingsUsd: '$2,840',
      co2Reduction: '4.48 tons',
      optimalAltitude: 'FL370 âž” FL390 at 30Â°W',
      windComponent: '+42 kts Tail-Jet'
    },
    'dxb-sin': {
      name: 'DXB âž” SIN (Equatorial Trade Route)',
      distance: '3,178 NM',
      aircraft: 'Airbus A350-900 Ultra',
      baselineBurn: '39,400 kg',
      optimizedBurn: '38,150 kg',
      savingsKg: '1,250 kg',
      savingsUsd: '$2,500',
      co2Reduction: '3.95 tons',
      optimalAltitude: 'FL390 âž” FL410 over Bay of Bengal',
      windComponent: '+18 kts Cross-Equatorial'
    },
    'hnd-sfo': {
      name: 'HND âž” SFO (Pacific Great Circle)',
      distance: '4,475 NM',
      aircraft: 'Boeing 777-300ER Long-Haul',
      baselineBurn: '68,200 kg',
      optimizedBurn: '66,120 kg',
      savingsKg: '2,080 kg',
      savingsUsd: '$4,160',
      co2Reduction: '6.57 tons',
      optimalAltitude: 'FL330 âž” FL360 at Dateline',
      windComponent: '+78 kts Polar Jet-Stream'
    }
  };

  const current = sectors[selectedSector];

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 24px 80px', color: '#ffffff' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ textAlign: 'center', padding: '40px 16px 60px', position: 'relative' }}>
        
        {/* Decorative Aero Mesh */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '650px',
          height: '350px',
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.18) 0%, rgba(112, 0, 255, 0.1) 60%, transparent 70%)',
          filter: 'blur(120px)',
          zIndex: -1,
          pointerEvents: 'none'
        }} />

        {/* Verification Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px',
          borderRadius: '999px',
          background: 'rgba(0, 240, 255, 0.08)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          marginBottom: '24px',
          boxShadow: '0 0 25px rgba(0, 240, 255, 0.15)'
        }}>
          <Sparkles size={15} color="var(--color-primary)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            ICAO Annex 16 & CORSIA Verified â€¢ Flight Intelligence v4.0
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(2.5rem, 5.8vw, 4.4rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          maxWidth: '1050px',
          margin: '0 auto 20px',
          background: 'linear-gradient(135deg, #ffffff 35%, #00f0ff 75%, #7000ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Precision Flight Trajectories. Zero Wasted Jet Fuel.
        </h1>

        {/* Subhead */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'rgba(255, 255, 255, 0.72)',
          maxWidth: '780px',
          margin: '0 auto 36px',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          AeroFuel AI couples multi-layer atmospheric weather models, aerodynamic step-climb profiles, and neural trajectory prediction to reduce commercial aviation fuel burn with 99.2% accuracy.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link
            href="#"
            className="btn-premium"
            style={{
              padding: '14px 34px',
              fontSize: '1.05rem',
              fontWeight: 800,
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 0 35px rgba(0, 240, 255, 0.45)'
            }}
          >
            <span>Launch Fuel Predictor</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/analytics"
            style={{
              padding: '14px 28px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <BarChart3 size={18} color="var(--color-primary)" />
            <span>Explore Fleet Analytics</span>
          </Link>
        </div>

        {/* Aviation KPI Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '960px',
          margin: '56px auto 0',
          padding: '24px',
          borderRadius: '20px',
          background: 'rgba(10, 10, 14, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)'
        }}>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'Outfit, sans-serif' }}>
              $18.4M+
            </div>
            <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              Fuel Costs Saved
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
              -1,420 kg
            </div>
            <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              Avg Burn Reduction / Sector
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#00ff80', fontFamily: 'Outfit, sans-serif' }}>
              99.2%
            </div>
            <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              Neural Trajectory Precision
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--color-secondary)', fontFamily: 'Outfit, sans-serif' }}>
              4.48 T
            </div>
            <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              CO2 Avoided / Flight
            </div>
          </div>
        </div>

      </section>

      {/* 2. INTERACTIVE FLIGHT FUEL BURN REDUCTION SIMULATOR */}
      <section style={{ margin: '30px 0 70px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Interactive Route Telemetry Simulator
          </span>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '6px' }}>
            Simulate Flight Sector Optimization
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.92rem', marginTop: '6px' }}>
            Select an international flight corridor to see how AeroFuel AI cuts burn while maintaining on-time block schedule:
          </p>

          {/* Sector Selector Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedSector('jfk-lhr')}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                border: selectedSector === 'jfk-lhr' ? '1px solid var(--color-primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: selectedSector === 'jfk-lhr' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedSector === 'jfk-lhr' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Globe2 size={15} color="var(--color-primary)" />
              <span>JFK âž” LHR (Transatlantic)</span>
            </button>

            <button
              onClick={() => setSelectedSector('dxb-sin')}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                border: selectedSector === 'dxb-sin' ? '1px solid var(--color-primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: selectedSector === 'dxb-sin' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedSector === 'dxb-sin' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Compass size={15} color="var(--color-secondary)" />
              <span>DXB âž” SIN (Equatorial)</span>
            </button>

            <button
              onClick={() => setSelectedSector('hnd-sfo')}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                border: selectedSector === 'hnd-sfo' ? '1px solid var(--color-primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: selectedSector === 'hnd-sfo' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedSector === 'hnd-sfo' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Wind size={15} color="#00ff80" />
              <span>HND âž” SFO (Pacific Great Circle)</span>
            </button>
          </div>
        </div>

        {/* Simulator Cockpit Card */}
        <div style={{
          borderRadius: '24px',
          background: 'rgba(12, 14, 22, 0.85)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Telemetry Bar */}
          <div style={{
            padding: '16px 24px',
            background: 'rgba(6, 8, 14, 0.95)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-primary)', boxShadow: '0 0 10px var(--color-primary)' }} />
              <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.7)' }}>
                SECTOR: {current.name} â€¢ AIRCRAFT: {current.aircraft}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(0, 255, 128, 0.12)',
                color: '#00ff80',
                border: '1px solid rgba(0, 255, 128, 0.3)',
                fontSize: '0.74rem',
                fontWeight: 700
              }}>
                WIND: {current.windComponent}
              </span>
            </div>
          </div>

          {/* 3 Metric Comparison Panels */}
          <div style={{ padding: '32px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            
            {/* Box 1: Fuel Burn Savings */}
            <div style={{
              padding: '24px',
              borderRadius: '16px',
              background: 'rgba(0, 240, 255, 0.04)',
              border: '1px solid rgba(0, 240, 255, 0.25)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                  Fuel Weight Savings
                </span>
                <TrendingDown size={18} color="var(--color-primary)" />
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                {current.savingsKg}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                Baseline: {current.baselineBurn} âž” Optimized: {current.optimizedBurn}
              </div>
            </div>

            {/* Box 2: Direct Cost Arbitrage */}
            <div style={{
              padding: '24px',
              borderRadius: '16px',
              background: 'rgba(112, 0, 255, 0.05)',
              border: '1px solid rgba(112, 0, 255, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b366ff', textTransform: 'uppercase' }}>
                  Flight Op Cost Savings
                </span>
                <Zap size={18} color="#b366ff" />
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                {current.savingsUsd}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                Jet-A1 Spot Index: $2.00 / kg basis
              </div>
            </div>

            {/* Box 3: CO2 Emissions Avoided */}
            <div style={{
              padding: '24px',
              borderRadius: '16px',
              background: 'rgba(0, 255, 128, 0.04)',
              border: '1px solid rgba(0, 255, 128, 0.25)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00ff80', textTransform: 'uppercase' }}>
                  CORSIA CO2 Offset
                </span>
                <Leaf size={18} color="#00ff80" />
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                -{current.co2Reduction}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                Direct 3.16x carbon emission multiplier reduction
              </div>
            </div>

          </div>

          {/* Stepper Recommendation Banner */}
          <div style={{
            padding: '18px 28px',
            background: 'rgba(6, 8, 14, 0.8)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              <strong>Trajectory Recommendation:</strong> Step climb to <span style={{ color: 'var(--color-primary)' }}>{current.optimalAltitude}</span> to ride tailwind core and minimize aerodynamic drag.
            </div>

            <Link
              href="#"
              className="btn-premium"
              style={{
                padding: '8px 20px',
                fontSize: '0.85rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Predict Custom Sector</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

      </section>

      {/* 3. BENTO GRID ARCHITECTURE */}
      <section style={{ margin: '60px 0 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Aeronautical Intelligence
          </span>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '6px' }}>
            Engineered for Modern Flight Operations Dispatch
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.95rem', maxWidth: '650px', margin: '8px auto 0' }}>
            Replace rigid legacy OFP (Operational Flight Plans) with dynamic physics-informed neural network trajectory solutions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          
          {/* Card 1: Dynamic Step-Climb */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px'
            }}>
              <Gauge size={22} color="var(--color-primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              Dynamic Step-Climb Optimization
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              As fuel burns off and aircraft weight diminishes, AeroFuel calculates the exact nautical waypoint to request ATC flight-level step-ups, operating at optimal Lift-to-Drag (L/D) ratios.
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>
              Weight-Adaptive Cruise Profiles
            </div>
          </div>

          {/* Card 2: Jet-Stream Telemetry */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(112, 0, 255, 0.1)',
              border: '1px solid rgba(112, 0, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px'
            }}>
              <Wind size={22} color="#b366ff" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              Live Atmospheric Jet-Stream Telemetry
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Directly ingests NOAA Global Forecast System (GFS) wind shear and temperature grids to ride favorable high-altitude jet streaks and bypass headwind cores.
            </p>
            <div style={{ fontSize: '0.78rem', color: '#b366ff' }}>
              4D Weather Ingestion Engine
            </div>
          </div>

          {/* Card 3: Fuel Tankering Arbitrage */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(0, 255, 128, 0.1)',
              border: '1px solid rgba(0, 255, 128, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px'
            }}>
              <TrendingDown size={22} color="#00ff80" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              Tankering Price Arbitrage
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Calculates the economic penalty of carrying extra fuel against spot-market Jet-A1 prices at destination hubs to determine whether round-trip fuel tankering is financially profitable.
            </p>
            <div style={{ fontSize: '0.78rem', color: '#00ff80' }}>
              Cost Penalty vs Price Delta Arbitrage
            </div>
          </div>

        </div>
      </section>

      {/* 4. CLOSING HIGH-CONVERTING CTA BANNER */}
      <section style={{
        margin: '60px 0 40px',
        padding: '50px 30px',
        borderRadius: '24px',
        background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.18) 0%, rgba(10, 12, 18, 0.95) 75%)',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 0 50px rgba(0, 240, 255, 0.15)'
      }}>
        <h2 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-0.025em',
          marginBottom: '14px'
        }}>
          Ready to Modernize Your Airline&apos;s Flight Trajectories?
        </h2>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '1rem',
          maxWidth: '600px',
          margin: '0 auto 28px',
          lineHeight: 1.6
        }}>
          Jump straight into the AeroFuel Predictor dashboard to test payload configurations, analyze historical burn telemetry, and calculate sector savings.
        </p>

        <Link
          href="#"
          className="btn-premium"
          style={{
            padding: '14px 36px',
            fontSize: '1.05rem',
            fontWeight: 800,
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 0 35px rgba(0, 240, 255, 0.5)'
          }}
        >
          <span>Launch Fuel Predictor</span>
          <ArrowRight size={18} />
        </Link>
      </section>

    </div>
  );
}

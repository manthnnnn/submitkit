'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, TrendingUp, ShieldCheck, DollarSign, Globe, 
  PieChart, AlertTriangle, ArrowUpRight, Award 
} from 'lucide-react';

export default function AnalyticsPage() {
  const categoryStats = [
    { name: 'Crypto Exchange & P2P', percentage: 38, amount: '$18,335', color: 'var(--accent-rose)' },
    { name: 'Luxury Jewelry & Watches', percentage: 28, amount: '$13,510', color: 'var(--accent-amber)' },
    { name: 'Consumer Electronics', percentage: 18, amount: '$8,685', color: 'var(--accent-cyan)' },
    { name: 'Airlines & Fast Travel', percentage: 11, amount: '$5,307', color: 'var(--accent-indigo)' },
    { name: 'Retail & Dining', percentage: 5, amount: '$2,413', color: 'var(--accent-emerald)' }
  ];

  const geoHotspots = [
    { region: 'Tor Exit Nodes & Anonymizing Proxies', riskShare: '42%', severity: 'CRITICAL' },
    { region: 'Eastern Europe Cross-Border Endpoints', riskShare: '26%', severity: 'HIGH' },
    { region: 'West Africa High-Velocity MCCs', riskShare: '19%', severity: 'HIGH' },
    { region: 'Domestic Synthetic Identity Rings', riskShare: '13%', severity: 'MEDIUM' }
  ];

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '0.7rem',
            fontWeight: 700,
            background: 'rgba(56, 189, 248, 0.15)',
            color: 'var(--accent-cyan)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            textTransform: 'uppercase',
          }}>
            Forensic Intelligence
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Threat Vectors &amp; Loss Mitigation ROI
          </span>
        </div>
        <h1 style={{ fontSize: '1.95rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1.2 }}>
          Loss Prevention &amp; Forensic Analytics
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px', maxWidth: '750px' }}>
          Comprehensive statistical audit of fraudulent transaction vectors, geographic anomaly hotspots, and financial ROI across merchant category classifications.
        </p>
      </div>

      {/* ROI Highlight Card */}
      <div className="glass-panel" style={{
        padding: '24px',
        marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(56, 189, 248, 0.08))',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
      }}>
        <div>
          <span style={{ fontSize: '0.74rem', color: 'var(--accent-emerald)', textTransform: 'uppercase', fontWeight: 700 }}>
            Proven Financial Defense Return
          </span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
            26.4x Risk Mitigation Multiplier
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '600px' }}>
            For every $1 invested in automated risk scoring, $26.40 in fraudulent chargebacks, interchange penalty fees, and direct capital losses were prevented.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
            $48,250
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Saved Past 30 Days
          </span>
        </div>
      </div>

      {/* 2-Column Visual Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Category Breakdown */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <PieChart size={18} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
              Fraud Attack Volume by Merchant Category
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {categoryStats.map((cat, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ color: '#ffffff', fontWeight: 600 }}>{cat.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {cat.amount} ({cat.percentage}%)
                  </span>
                </div>
                <div style={{ height: '7px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${cat.percentage}%`, height: '100%', background: cat.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Hotspots */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Globe size={18} color="var(--accent-rose)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
              High-Risk Geographic &amp; Network Hotspots
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {geoHotspots.map((spot, idx) => (
              <div key={idx} style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--fin-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff' }}>
                    {spot.region}
                  </div>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: spot.severity === 'CRITICAL' ? 'var(--accent-rose)' : 'var(--accent-amber)',
                    textTransform: 'uppercase',
                    marginTop: '3px',
                    display: 'inline-block',
                  }}>
                    {spot.severity} THREAT
                  </span>
                </div>

                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {spot.riskShare}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

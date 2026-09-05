import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ShieldAlert, Radio, Lock, Globe, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PhishGuard AI | Autonomous Zero-Day Phishing & URL Threat Radar',
  description: 'Enterprise AI phishing detection system. Real-time lexical analysis, Cyrillic homograph detection, and WHOIS domain reputation scoring.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(20px)',
          background: 'rgba(6, 9, 17, 0.92)',
          borderBottom: '1px solid var(--phish-border)',
          padding: '0 20px',
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '66px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--accent-rose), var(--accent-indigo))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 18px rgba(244, 63, 94, 0.45)',
              }}>
                <ShieldAlert size={20} color="#ffffff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                    PhishGuard <span style={{ color: 'var(--accent-rose)' }}>AI</span>
                  </span>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: 'rgba(244, 63, 94, 0.15)',
                    color: 'var(--accent-rose)',
                    border: '1px solid rgba(244, 63, 94, 0.35)',
                  }}>
                    Zero-Day Threat Radar
                  </span>
                </div>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', margin: 0 }}>
                  Autonomous Deepfake Link &amp; Credential Harvester Firewall
                </p>
              </div>
            </div>

            {/* Live Telemetry Status Chip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontSize: '0.74rem',
                color: 'var(--accent-emerald)',
                fontWeight: 700,
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-emerald)',
                  boxShadow: '0 0 8px var(--accent-emerald)',
                }} className="pulse-danger" />
                <span>DNS Sinkhole Active</span>
              </div>

              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Protected Endpoints: <strong style={{ color: '#fff' }}>124,500 Users</strong>
              </span>
            </div>
          </div>
        </header>

        <main style={{ minHeight: 'calc(100vh - 130px)', paddingBottom: '40px' }}>
          {children}
        </main>

        <footer style={{
          borderTop: '1px solid var(--phish-border)',
          padding: '20px',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          background: 'rgba(6, 9, 17, 0.95)',
        }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <strong>PhishGuard AI</strong> — Autonomous Zero-Day Phishing &amp; Brand Spoofing Interceptor
            </div>
            <div style={{ display: 'flex', gap: '14px', color: 'var(--text-secondary)' }}>
              <span>IDN Homograph Anomaly Scoring</span>
              <span>•</span>
              <span>Cloudflare R2 Ready</span>
              <span>•</span>
              <span>Sub-50ms Edge Inspection</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

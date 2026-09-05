import type { Metadata } from 'next';
import './globals.css';
import FintechNavbar from '@/components/fintech-navbar';

export const metadata: Metadata = {
  title: 'SentinelPay AI | Autonomous Financial Fraud Defense & Risk Radar',
  description: 'Enterprise AI fraud detection system. Real-time transaction stream scoring, impossible travel velocity detection, 3D Secure triggers, and chargeback dispute resolution.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FintechNavbar />
        <main style={{ minHeight: 'calc(100vh - 130px)', paddingBottom: '40px' }}>
          {children}
        </main>
        <footer style={{
          borderTop: '1px solid var(--fin-border)',
          padding: '20px',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          background: 'rgba(7, 9, 14, 0.95)',
        }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <strong>SentinelPay AI</strong> — Autonomous Banking Security & Fraud Detection
            </div>
            <div style={{ display: 'flex', gap: '14px', color: 'var(--text-secondary)' }}>
              <span>Multi-Factor Anomaly Scoring</span>
              <span>•</span>
              <span>PCI-DSS & 3DS 2.0 Compliant</span>
              <span>•</span>
              <span>Cloudflare R2 Ready</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

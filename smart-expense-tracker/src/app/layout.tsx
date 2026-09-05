import type { Metadata } from 'next';
import './globals.css';
import { DollarSign, CreditCard, ShieldCheck, Wallet } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FinFlow AI | Autonomous Corporate Spend Management & Policy OS',
  description: 'Enterprise AI corporate expense management. Real-time OCR receipt scanning, policy compliance checks, budget burn-rate tracking, and automated reimbursement workflows.',
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
          background: 'rgba(7, 9, 14, 0.92)',
          borderBottom: '1px solid var(--fin-border)',
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
                background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 18px rgba(16, 185, 129, 0.45)',
              }}>
                <DollarSign size={20} color="#ffffff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                    FinFlow <span style={{ color: 'var(--accent-emerald)' }}>AI</span>
                  </span>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: 'var(--accent-emerald)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                  }}>
                    Corporate Spend OS
                  </span>
                </div>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', margin: 0 }}>
                  Autonomous Policy Enforcement &amp; Smart OCR Ledger
                </p>
              </div>
            </div>

            {/* Live Treasury Status Chip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
                <span>Corporate Cards Active</span>
              </div>

              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Q3 Treasury: <strong style={{ color: '#fff' }}>$240,500 Managed</strong>
              </span>
            </div>
          </div>
        </header>

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
              <strong>FinFlow AI</strong> — Autonomous Corporate Expense &amp; Policy Compliance Engine
            </div>
            <div style={{ display: 'flex', gap: '14px', color: 'var(--text-secondary)' }}>
              <span>IRS Receipt Audit Trail</span>
              <span>•</span>
              <span>Real-time OCR Itemization</span>
              <span>•</span>
              <span>Cloudflare R2 Ready</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, Activity, Sliders, AlertCircle, BarChart3, Zap } from 'lucide-react';

export default function FintechNavbar({ onSimulate }: { onSimulate?: () => void }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Live Risk Radar', icon: Activity },
    { href: '/rules', label: 'Rule Engine', icon: Sliders },
    { href: '/disputes', label: 'Dispute Desk', icon: AlertCircle },
    { href: '/analytics', label: 'Loss Analytics', icon: BarChart3 },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      background: 'rgba(7, 9, 14, 0.9)',
      borderBottom: '1px solid var(--fin-border)',
      padding: '0 16px',
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
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: 'inherit'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)',
          }}>
            <ShieldAlert size={20} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                SentinelPay
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '2px 7px',
                borderRadius: '999px',
                background: 'rgba(56, 189, 248, 0.15)',
                color: 'var(--accent-cyan)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}>
                AI Risk Core
              </span>
            </div>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', margin: 0 }}>
              Autonomous Financial Fraud Defense
            </p>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '3px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--fin-border)',
          overflowX: 'auto',
          maxWidth: '100%',
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  background: isActive ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.3), rgba(99, 102, 241, 0.2))' : 'transparent',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.45)' : '1px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={14} color={isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status Chip & Simulate Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 10px',
            borderRadius: '999px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-emerald)',
              boxShadow: '0 0 8px var(--accent-emerald)',
            }} className="pulse-dot" />
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>
              Stream Active
            </span>
          </div>

          {onSimulate && (
            <button
              onClick={onSimulate}
              className="btn-primary"
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            >
              <Zap size={13} />
              <span>Swipe Card</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

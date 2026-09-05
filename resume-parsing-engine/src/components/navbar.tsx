'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileSearch, Target, Users, Sparkles, FileText, Cpu } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Overview', icon: Sparkles },
    { href: '/dashboard', label: 'Parser Studio', icon: FileSearch },
    { href: '/matcher', label: 'Job Matcher & ATS', icon: Target },
    { href: '/candidates', label: 'Candidates', icon: Users },
    { href: '/interview', label: 'Viva & Interview', icon: Sparkles },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      background: 'rgba(9, 10, 16, 0.92)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0 16px',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
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
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.45)',
          }}>
            <FileText size={20} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                TalentScan
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '2px 7px',
                borderRadius: '999px',
                background: 'rgba(99, 102, 241, 0.2)',
                color: 'var(--primary-light)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
              }}>
                AI ATS
              </span>
            </div>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', margin: 0 }}>
              Enterprise Resume Intelligence
            </p>
          </div>
        </Link>

        {/* Navigation Tabs (Scrollable on small screens) */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '3px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
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
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(139, 92, 246, 0.25))' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.45)' : '1px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={15} color={isActive ? 'var(--primary-light)' : 'var(--text-muted)'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status Chip */}
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
              boxShadow: '0 0 6px var(--accent-emerald)',
            }} />
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>
              Online
            </span>
          </div>

          <Link href="/matcher" className="btn-primary" style={{ padding: '7px 14px', fontSize: '0.8rem' }}>
            <Cpu size={14} />
            <span>Score ATS</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

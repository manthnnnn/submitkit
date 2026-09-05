'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, FileText, Calendar, Settings, Activity, 
  Users, ShieldCheck, HeartPulse, Sparkles, AlertCircle
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={19} />, label: 'Daily Overview' },
    { name: 'EHR Records', href: '/records', icon: <FileText size={19} />, label: 'Lab Tests & Meds' },
    { name: 'Appointments', href: '/appointments', icon: <Calendar size={19} />, label: 'Book & Video Call' },
    { name: 'Vitals Monitor', href: '/vitals', icon: <Activity size={19} />, label: 'Live Heart & BP' },
    { name: 'Care Team', href: '/team', icon: <Users size={19} />, label: 'Message Doctors' },
    { name: 'Settings', href: '/settings', icon: <Settings size={19} />, label: 'Profile & Security' },
  ];

  if (pathname === '/') return null; // Don't show sidebar on commercial landing page

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      backgroundColor: '#0a0f1d',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      zIndex: 50
    }}>
      {/* Brand Logo & Title */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px', marginBottom: '32px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)'
        }}>
          <HeartPulse size={22} color="white" className="ecg-indicator" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Health<span style={{ color: '#3b82f6' }}>Sync</span>
          </span>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Clinical Portal
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <p style={{ padding: '0 10px', fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
          Navigation
        </p>
        
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link 
              key={link.name} 
              href={link.href} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '10px',
                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: isActive ? '#60a5fa' : '#94a3b8',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                transition: 'all 0.18s ease',
                border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
              }}
            >
              <span style={{ color: isActive ? '#3b82f6' : '#64748b' }}>
                {link.icon}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{ color: isActive ? '#ffffff' : '#cbd5e1' }}>{link.name}</span>
                <span style={{ fontSize: '0.72rem', color: isActive ? '#93c5fd' : '#64748b', fontWeight: 400 }}>{link.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* HIPAA Compliance Badge at bottom */}
      <div style={{
        marginTop: 'auto',
        padding: '14px',
        borderRadius: '12px',
        background: 'rgba(16, 185, 129, 0.08)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <ShieldCheck size={20} color="#10b981" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399' }}>HIPAA Secure Vault</span>
          <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>256-bit AES Encrypted</span>
        </div>
      </div>
    </aside>
  );
}

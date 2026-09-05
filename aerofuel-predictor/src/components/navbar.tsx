'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlaneTakeoff, LayoutDashboard, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: <PlaneTakeoff size={18} /> },
    { name: 'Predictor', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Analytics', href: '/analytics', icon: <BarChart3 size={18} /> },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '80px',
      zIndex: 50,
      background: 'rgba(10, 10, 10, 0.7)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5%',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          padding: '8px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <PlaneTakeoff size={24} color="#000" />
        </div>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '1px' }}>
          Aero<span style={{ color: 'var(--color-primary)' }}>Fuel</span>
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '30px' }} className="nav-desktop">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.name} href={link.href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              color: isActive ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.7)',
              textShadow: isActive ? '0 0 10px rgba(0, 240, 255, 0.5)' : 'none',
              transition: 'all 0.3s'
            }}>
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

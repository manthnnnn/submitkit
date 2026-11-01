'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function WaIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const pathname        = usePathname();

  if (pathname?.startsWith('/admin')) return null;

  const waLink = `https://wa.me/918799814256?text=${encodeURIComponent('Hi! I need help with a project from SubmitKit.')}`;

  return (
    <div style={{ position: 'fixed', bottom: 'calc(5.5rem + env(safe-area-inset-bottom,0px))', right: '1rem', zIndex: 50 }}
      className="md:bottom-6 md:right-6"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: .9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: .9 }}
            transition={{ duration: .2 }}
            style={{
              position: 'absolute', bottom: '4.5rem', right: 0,
              width: '17rem',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '18px',
              boxShadow: 'var(--sh-xl)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ background: '#25D366', padding: '1rem 1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <WaIcon style={{ width: '1.25rem', height: '1.25rem', color: '#fff' }} />
                </div>
                <div>
                  <p style={{ color: '#fff', fontSize: '.9rem', fontWeight: 700, lineHeight: 1.3 }}>SubmitKit Support</p>
                  <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '.7rem' }}>Usually replies in minutes</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.8)', padding: '.25rem', display: 'flex' }}>
                <X style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1rem' }}>
              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '.75rem', marginBottom: '.875rem' }}>
                <p style={{ fontSize: '.8125rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                  👋 Hi! Need help choosing a project, running code, or have a custom request? Chat with us instantly!
                </p>
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', width: '100%', padding: '.6875rem', background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '.9375rem', borderRadius: '12px', textDecoration: 'none', border: 'none', cursor: 'pointer', transition: 'background 150ms' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1EB850')}
                onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
              >
                <WaIcon style={{ width: '1.125rem', height: '1.125rem' }} />
                Start Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.06 }} whileTap={{ scale: .94 }}
        onClick={() => setOpen(!open)}
        aria-label="Chat on WhatsApp"
        style={{ width: '3.375rem', height: '3.375rem', borderRadius: '50%', background: '#25D366', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(37,211,102,.4)', position: 'relative' }}
      >
        <WaIcon style={{ width: '1.5rem', height: '1.5rem', color: '#fff' }} />
        {/* Pulse */}
        <span style={{ position: 'absolute', top: 0, right: 0, width: '.8125rem', height: '.8125rem' }}>
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#4ADE80', opacity: .75, animation: 'waPing 1.2s cubic-bezier(0,0,.2,1) infinite' }} />
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22C55E' }} />
        </span>
      </motion.button>

      <style>{`
        @keyframes waPing {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

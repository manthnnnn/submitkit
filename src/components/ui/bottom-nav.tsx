'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, BookOpen, Search } from 'lucide-react';

/* App-style bottom navigation — mobile only (hidden md+) */

const ITEMS = [
  { href: '/',            label: 'Home',       Icon: Home,          match: (p: string) => p === '/' },
  { href: '/projects',    label: 'Projects',   Icon: Package,       match: (p: string) => p.startsWith('/projects') },
  { href: '/blueprint',   label: 'Free Topics',Icon: BookOpen,      match: (p: string) => p.startsWith('/blueprint') },
  { href: '/order/lookup',label: 'Track',      Icon: Search,        match: (p: string) => p.startsWith('/order') },
] as const;

export function BottomNav() {
  const pathname = usePathname() ?? '';
  if (pathname.startsWith('/admin')) return null;

  return (
    <nav
      aria-label="Quick navigation"
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: 'rgba(253, 251, 247, 0.92)',
        backdropFilter: 'blur(14px) saturate(150%)',
        WebkitBackdropFilter: 'blur(14px) saturate(150%)',
        borderTop: '1px solid var(--line)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div style={{ display: 'flex', height: '4rem' }}>
        {ITEMS.map(({ href, label, Icon, match, ...rest }) => {
          const active = match(pathname);
          const inner = (
            <>
              <Icon
                style={{ width: '1.3rem', height: '1.3rem', color: active ? 'var(--teal)' : 'var(--ink-3)', transition: 'color 180ms ease' }}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span style={{
                fontSize: '.625rem', fontWeight: active ? 700 : 500,
                color: active ? 'var(--teal-darker)' : 'var(--ink-3)',
                letterSpacing: '.01em', transition: 'color 180ms ease',
              }}>{label}</span>
              <span aria-hidden style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '1.75rem', height: '2px', borderRadius: '2px',
                background: active ? 'var(--teal)' : 'transparent', transition: 'background 180ms ease',
              }} />
            </>
          );
          const style: React.CSSProperties = {
            position: 'relative', flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '.1875rem',
            background: 'none', border: 'none', textDecoration: 'none',
            cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
          };
          const cls = 'bn-tab';
          return 'external' in rest && rest.external ? (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={style} className={cls}>
              {inner}
            </a>
          ) : (
            <Link key={href} href={href} aria-label={label} style={style} className={cls}>
              {inner}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

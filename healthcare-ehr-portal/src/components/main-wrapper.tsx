'use client';

import { usePathname } from 'next/navigation';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <main style={{
      flex: 1,
      marginLeft: isHome ? '0' : '260px',
      transition: 'margin-left 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
      width: isHome ? '100%' : 'calc(100% - 260px)',
      padding: isHome ? '0' : '40px',
      overflowY: isHome ? 'visible' : 'auto',
      height: isHome ? 'auto' : '100vh',
      minHeight: '100vh'
    }}>
      {children}
    </main>
  );
}

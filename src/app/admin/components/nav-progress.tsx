'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Thin progress bar at the top of the admin panel that
 * animates whenever the pathname changes — instant visual
 * feedback that navigation is happening.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible]   = useState(false);
  const prevPath = useRef(pathname);
  const timer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raf      = useRef<number | null>(null);

  // Start progress on click of any internal admin link
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (target && target.href) {
        try {
          const url = new URL(target.href, window.location.origin);
          if (
            url.origin === window.location.origin &&
            url.pathname.startsWith('/admin') &&
            url.pathname !== window.location.pathname
          ) {
            setVisible(true);
            setProgress(30);
          }
        } catch {
          /* ignore */
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // Start a rapid fake-progress animation
    setVisible(true);
    setProgress(40);

    let p = 40;
    const tick = () => {
      // Ease toward 95%
      const increment = p < 65 ? 8 : p < 85 ? 4 : 0.5;
      p = Math.min(p + increment, 95);
      setProgress(p);
      if (p < 95) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    // When navigation completes (pathname updated = render done), finish the bar
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (raf.current) cancelAnimationFrame(raf.current);
      setProgress(100);
      timer.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 250);
    }, 50);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none"
      style={{ background: 'rgba(99,102,241,0.15)' }}
    >
      <div
        className="h-full transition-all"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(to right, #6366f1, #818cf8, #34d399)',
          boxShadow: '0 0 8px rgba(99,102,241,0.8)',
          transition: progress === 100 ? 'width 0.1s ease-out' : 'width 0.15s ease-out',
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}

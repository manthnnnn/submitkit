'use client';
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function UrgencyTimer() {
  // null = not yet hydrated (avoids server/client mismatch flash)
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number } | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const sessionKey = 'submitkit_offer_expiry';
    let expiryTime = parseInt(sessionStorage.getItem(sessionKey) || '0');

    if (!expiryTime || expiryTime < Date.now()) {
      expiryTime = Date.now() + 15 * 60 * 1000;
      sessionStorage.setItem(sessionKey, expiryTime.toString());
    }

    const tick = () => {
      const remaining = expiryTime - Date.now();
      if (remaining <= 0) {
        setIsExpired(true);
        return;
      }
      setTimeLeft({
        minutes: Math.floor((remaining / 1000 / 60) % 60),
        seconds: Math.floor((remaining / 1000) % 60),
      });
    };

    tick(); // Sync immediately on mount — no flash
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pre-hydration: render an invisible placeholder with the same height
  // to prevent layout shift when the timer appears
  if (timeLeft === null && !isExpired) {
    return (
      <div className="rounded-xl p-3 h-[44px] bg-amber-500/5 border border-amber-500/10 animate-pulse" />
    );
  }

  // Expired — show a clean "deal active" nudge without revealing the timer is fake
  if (isExpired) {
    return (
      <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse shrink-0" />
        <p className="text-xs text-brand-300 font-medium">
          Special pricing active — limited availability
        </p>
      </div>
    );
  }

  const mins = String(timeLeft!.minutes).padStart(2, '0');
  const secs = String(timeLeft!.seconds).padStart(2, '0');

  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-xs text-amber-300 font-medium">Special offer ends in</p>
      </div>
      <div className="flex items-center gap-1 font-mono" aria-live="polite" aria-label={`${mins} minutes ${secs} seconds remaining`}>
        <div className="bg-amber-500/20 text-amber-300 font-bold text-sm px-2 py-0.5 rounded min-w-[32px] text-center tabular-nums">
          {mins}
        </div>
        <span className="text-amber-400 font-bold text-sm">:</span>
        <div className="bg-amber-500/20 text-amber-300 font-bold text-sm px-2 py-0.5 rounded min-w-[32px] text-center tabular-nums">
          {secs}
        </div>
      </div>
    </div>
  );
}

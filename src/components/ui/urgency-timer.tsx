'use client';
import { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

export function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 47 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Store session start time to keep timer consistent on re-renders
    const sessionKey = 'submitkit_offer_expiry';
    let expiryTime = parseInt(sessionStorage.getItem(sessionKey) || '0');
    
    if (!expiryTime || expiryTime < Date.now()) {
      // New session - set 15 minute timer
      expiryTime = Date.now() + 15 * 60 * 1000;
      sessionStorage.setItem(sessionKey, expiryTime.toString());
    }

    const interval = setInterval(() => {
      const remaining = expiryTime - Date.now();
      if (remaining <= 0) {
        setIsExpired(true);
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        minutes: Math.floor((remaining / 1000 / 60) % 60),
        seconds: Math.floor((remaining / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isExpired) {
    return (
      <div className="bg-zinc-900 border border-white/10 rounded-xl p-3 flex items-center gap-2">
        <Zap className="w-4 h-4 text-brand-400 shrink-0" />
        <p className="text-xs text-zinc-400">Limited offer — <span className="text-white font-medium">refresh to unlock deal</span></p>
      </div>
    );
  }

  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center justify-between gap-3 animate-pulse-slow">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-xs text-amber-300 font-medium">Offer expires in</p>
      </div>
      <div className="flex items-center gap-1 font-mono">
        <div className="bg-amber-500/20 text-amber-300 font-bold text-sm px-2 py-0.5 rounded min-w-[32px] text-center">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className="text-amber-400 font-bold text-sm">:</span>
        <div className="bg-amber-500/20 text-amber-300 font-bold text-sm px-2 py-0.5 rounded min-w-[32px] text-center">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}

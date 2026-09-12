'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ShoppingBag, X, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface OrderToast {
  id: string;
  customer_name: string;
  amount_paid: number;
  created_at: string;
  project_title?: string;
}

function playSaleChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Play two-tone soft chime (C6 -> G6)
    const playTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    };

    playTone(523.25, 0, 0.25);    // C5
    playTone(659.25, 0.15, 0.35); // E5
    playTone(783.99, 0.3, 0.5);   // G5
  } catch {
    // Non-blocking if audio blocked by browser policy
  }
}

export function RealtimeOrdersToast() {
  const router = useRouter();
  const [toasts, setToasts] = useState<OrderToast[]>([]);

  useEffect(() => {
    let supabase: any;
    try {
      supabase = createClient();
    } catch {
      return;
    }

    const channel = supabase
      .channel('admin_realtime_orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        (payload: any) => {
          const newRow = payload.new;
          if (newRow && newRow.status === 'PAID') {
            // Trigger pleasant chime
            playSaleChime();

            const toastItem: OrderToast = {
              id: newRow.id,
              customer_name: newRow.customer_name || 'A customer',
              amount_paid: newRow.amount_paid || 0,
              created_at: newRow.created_at || new Date().toISOString(),
              project_title: 'Project Bundle',
            };

            setToasts(prev => [toastItem, ...prev.slice(0, 4)]);
            // Live refresh current route data
            router.refresh();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto p-4 rounded-2xl border shadow-2xl transition-all animate-in slide-in-from-bottom-5 duration-300 flex items-start gap-3.5"
          style={{
            background: 'linear-gradient(135deg, rgba(24,24,27,0.96) 0%, rgba(9,9,11,0.98) 100%)',
            borderColor: 'rgba(16,185,129,0.4)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 25px rgba(16,185,129,0.15)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.3))',
              border: '1px solid rgba(16,185,129,0.4)',
            }}
          >
            <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                New Sale Captured!
              </p>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="text-sm font-semibold text-white mt-0.5 truncate">
              {toast.customer_name}
            </p>
            <p className="text-xs text-zinc-400 mt-0.5 flex items-center justify-between">
              <span>Paid <strong className="text-emerald-300 font-bold">₹{toast.amount_paid}</strong></span>
              <Link
                href="/admin/orders"
                onClick={() => dismissToast(toast.id)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-0.5"
              >
                View <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

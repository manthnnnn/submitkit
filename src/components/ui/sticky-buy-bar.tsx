'use client';
import { useEffect, useState } from 'react';
import { ShoppingBag, Bell } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface StickyBuyBarProps {
  price: number;
  title: string;
  available?: boolean;
}

export function StickyBuyBar({ price, title, available = true }: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCheckout = () => {
    document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-[#09090b]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center gap-3 shadow-2xl">
        <div className="flex-grow min-w-0">
          <p className="text-white font-bold text-sm">{formatCurrency(price)}</p>
          <p className="text-zinc-500 text-xs truncate">{title}</p>
        </div>
        {available ? (
          <button
            onClick={scrollToCheckout}
            className="flex items-center gap-2 bg-white text-zinc-950 font-bold text-sm px-5 py-2.5 rounded-xl shrink-0 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            Buy Now
          </button>
        ) : (
          <button
            onClick={scrollToCheckout}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm px-5 py-2.5 rounded-xl shrink-0 transition-all active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
          >
            <Bell className="w-4 h-4" />
            Pre-order
          </button>
        )}
      </div>
    </div>
  );
}

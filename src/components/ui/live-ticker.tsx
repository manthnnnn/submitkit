'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LiveTicker() {
  const [items, setItems] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch('/api/stats/ticker');
        const data = await res.json();
        if (data.tickerItems && data.tickerItems.length > 0) {
          setItems(data.tickerItems);
        }
      } catch (e) {
        // Silently fail to fallback
      }
    };
    fetchTicker();
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-zinc-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm overflow-hidden max-w-full justify-center relative shadow-[0_0_15px_rgba(16,185,129,0.08)]">
      <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
      <div className="relative h-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="whitespace-nowrap text-center text-xs sm:text-sm text-zinc-200 font-medium"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

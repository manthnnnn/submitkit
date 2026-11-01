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
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-200/90 bg-emerald-50/80 text-emerald-900 text-xs font-medium backdrop-blur-sm shadow-sm">
      <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
      <div className="relative h-4 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="whitespace-nowrap text-center text-xs text-emerald-900 font-semibold"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

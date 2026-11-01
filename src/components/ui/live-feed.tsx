'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const mockPurchases = [
  { name: "Rahul", city: "Pune", project: "E-Commerce App (Major)", time: "just now" },
  { name: "Sneha", city: "Bangalore", project: "AI Chatbot (Major)", time: "2 mins ago" },
  { name: "Aditya", city: "Mumbai", project: "Library Management (Mini)", time: "5 mins ago" },
  { name: "Priya", city: "Hyderabad", project: "Face Recognition (Major)", time: "12 mins ago" },
  { name: "Karan", city: "Delhi", project: "Weather App (Mini)", time: "18 mins ago" },
];

export function LiveFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    if (hasDismissed) return;

    // Initial delay before first popup
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialTimer);
  }, [hasDismissed]);

  useEffect(() => {
    if (hasDismissed || !isVisible) return;

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      
      // Setup next one after it hides
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockPurchases.length);
        setIsVisible(true);
      }, Math.random() * 15000 + 10000); // Random delay between 10-25 seconds
      
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, currentIndex, hasDismissed]);

  if (hasDismissed) return null;

  const currentPurchase = mockPurchases[currentIndex];

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-xl flex items-start gap-3.5 max-w-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
        
        <div className="bg-emerald-50 p-2 rounded-xl shrink-0 border border-emerald-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
        
        <div className="flex-grow pr-5">
          <p className="text-xs text-slate-700 leading-snug">
            <span className="font-semibold text-slate-900">{currentPurchase.name}</span> from {currentPurchase.city} just bought <span className="font-semibold text-indigo-600">{currentPurchase.project}</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">{currentPurchase.time}</p>
        </div>
        
        <button 
          onClick={() => { setIsVisible(false); setHasDismissed(true); }}
          className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-700 transition-colors p-1"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

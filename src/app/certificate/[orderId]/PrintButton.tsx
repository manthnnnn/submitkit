'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-1"
      style={{
        background: 'linear-gradient(135deg, rgba(246,200,68,0.15), rgba(99,102,241,0.15))',
        border: '1px solid rgba(246,200,68,0.4)',
        color: '#f6c844',
        boxShadow: '0 0 20px rgba(246,200,68,0.15)',
      }}
    >
      <Printer className="w-4 h-4" />
      Save as PDF / Print
    </button>
  );
}

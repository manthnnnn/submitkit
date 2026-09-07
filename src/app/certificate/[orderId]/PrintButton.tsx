'use client';

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-slate-800 transition-all hover:-translate-y-1"
    >
      🖨️ Save as PDF
    </button>
  );
}

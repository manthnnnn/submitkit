'use client';

import Link from 'next/link';
import { 
  QrCode, ChefHat, UtensilsCrossed, Smartphone, ArrowRight, 
  Sparkles, Layers, ShieldCheck, Activity, BarChart3, Wifi, CheckCircle2 
} from 'lucide-react';

export default function UnifiedRestaurantDashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-amber-500/30 p-6 sm:p-10 font-sans">
      
      {/* Background Radiance */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <QrCode size={24} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight">LuxeBite OS Command Center</h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  LIVE RESTAURANT
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Spice Lounge Restaurant • Table QR & Kitchen Display Engine</p>
            </div>
          </div>

          <Link
            href="/"
            className="text-xs font-bold text-slate-400 hover:text-white bg-slate-900/80 border border-white/10 px-4 py-2.5 rounded-xl transition-all self-start sm:self-auto"
          >
            ← Back to Storefront
          </Link>
        </div>

        {/* Dual Mode Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Portal 1: Customer Dining Experience */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#182032] to-[#101624] border border-white/15 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-105 transition-transform">
                <Smartphone size={28} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase">GUEST PORTAL</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-3">Customer Mobile Ordering</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Interactive digital menu featuring AI Taste Matching, dietary allergens filters, real-time cart synchronization, and bill generation for Table 1.
              </p>
            </div>

            <Link
              href="/m/spice-lounge?table=1"
              className="bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-black px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-between transition-all"
            >
              <span>Launch Guest Ordering (Table 1)</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Portal 2: Kitchen & Admin Management */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#182032] to-[#101624] border border-white/15 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-violet-500/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-105 transition-transform">
                <ChefHat size={28} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-violet-400 uppercase">MANAGEMENT PORTAL</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-3">Kitchen Display & Table QRs</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Printable dynamic QR code matrix for 10 dining tables, network IP switcher (WiFi LAN vs Localhost), and live kitchen order dispatch.
              </p>
            </div>

            <Link
              href="/admin/spice-lounge"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold border border-white/20 px-6 py-3.5 rounded-xl shadow-lg flex items-center justify-between transition-all"
            >
              <span>Launch Admin & QR Generator</span>
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>

        {/* Live System Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/60 border border-white/10">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">10</div>
            <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Configured Tables</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">Sub-100ms</div>
            <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Cart Sync Latency</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">AI Active</div>
            <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Taste Match Engine</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-violet-400 font-mono">WiFi LAN</div>
            <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Mobile Scan Ready</div>
          </div>
        </div>

      </div>

    </div>
  );
}

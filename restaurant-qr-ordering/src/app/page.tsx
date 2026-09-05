"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, QrCode, ChefHat, Sparkles, Smartphone, Layers, Database, ShieldCheck, Cpu, Wifi, Info } from "lucide-react";
import TableQRCode from "@/components/TableQRCode";

export default function ProjectOverviewPage() {
  const [selectedTable, setSelectedTable] = useState("1");
  const [lanIp, setLanIp] = useState<string>("192.168.43.56");
  const [hostMode, setHostMode] = useState<"wifi" | "localhost" | "custom">("wifi");
  const [customHost, setCustomHost] = useState<string>("");

  useEffect(() => {
    fetch("/api/network-ip")
      .then((res) => res.json())
      .then((data) => {
        if (data.ip && data.ip !== "localhost") {
          setLanIp(data.ip);
        }
      })
      .catch(() => {});
  }, []);

  const getBaseOrigin = () => {
    if (hostMode === "wifi" && lanIp) {
      return `http://${lanIp}:3002`;
    }
    if (hostMode === "custom" && customHost) {
      return customHost.replace(/\/$/, "");
    }
    return typeof window !== "undefined" ? window.location.origin : "http://localhost:3002";
  };

  const qrTargetUrl = `${getBaseOrigin()}/m/spice-lounge?table=${selectedTable}`;

  const handleDemo = (tableNum: string = "1") => {
    try {
      localStorage.setItem("table_spice-lounge", tableNum);
    } catch {}
    window.location.href = `/m/spice-lounge?table=${tableNum}`;
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-amber-500/30 overflow-hidden font-sans">
      {/* Dynamic Background Effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <QrCode size={20} className="text-white" />
          </div>
          <span className="font-black tracking-tight text-xl">LuxeBite<span className="text-amber-500">.io</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#portals" className="hover:text-white transition-colors">Live Portals</a>
          <a href="#features" className="hover:text-white transition-colors">Key Modules</a>
          <a href="#architecture" className="hover:text-white transition-colors">Tech Architecture</a>
        </div>
        <button 
          onClick={() => handleDemo("1")} 
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-2.5 rounded-full text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
        >
          Launch Demo
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles size={14} /> Full-Stack Engineering Capstone Project
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.15] mb-6 max-w-4xl"
          >
            Smart Contactless Dining & <br />
            <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
              Kitchen Intelligence System
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 font-light max-w-3xl mb-10 leading-relaxed"
          >
            An end-to-end full-stack dining platform engineered with real-time Kitchen Display syncing, algorithmic AI taste matching, table-specific QR dispatching, and dynamic order tracking.
          </motion.p>

          {/* Interactive Live QR Display Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-b from-[#182032] to-[#101624] p-6 sm:p-8 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-xl w-full mb-16 flex flex-col items-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">LIVE SCANNABLE QR CODE</span>
            </div>

            {/* Network Mode Switcher */}
            <div className="w-full bg-[#0B0F19] p-1.5 rounded-2xl border border-white/10 mb-4 flex flex-col sm:flex-row gap-1 text-xs">
              <button
                onClick={() => setHostMode("wifi")}
                className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                  hostMode === "wifi" 
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>📱 Phone Wi-Fi Scan</span>
                <span className="text-[10px] font-mono text-emerald-400/80">({lanIp}:3002)</span>
              </button>
              <button
                onClick={() => setHostMode("localhost")}
                className={`py-2 px-3 rounded-xl font-bold transition-all ${
                  hostMode === "localhost" 
                    ? "bg-white/15 text-white border border-white/20" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                💻 Localhost
              </button>
            </div>

            {/* Wi-Fi Alert Banner */}
            <div className="w-full bg-amber-500/15 border border-amber-500/30 rounded-2xl p-3.5 mb-4 flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Wifi size={18} className="animate-pulse" />
              </div>
              <p className="text-xs text-amber-200 font-medium leading-relaxed">
                <strong className="text-amber-400 font-bold block mb-0.5">Device Sync Tip:</strong>
                Ensure your laptop and phone are connected to the same Wi-Fi (or Mobile Hotspot) to open the menu on your phone!
              </p>
            </div>

            {/* Table Selection Pills */}
            <div className="flex items-center gap-2 mb-5 bg-[#0B0F19] p-1.5 rounded-2xl border border-white/5">
              {["1", "2", "4", "7"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTable(t)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedTable === t 
                      ? "bg-amber-500 text-slate-900 shadow-md shadow-amber-500/30 scale-105" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Table {t}
                </button>
              ))}
            </div>

            {/* The Actual Real QR Code */}
            <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-slate-800 mb-3 transition-transform hover:scale-105 flex flex-col items-center">
              <TableQRCode url={qrTargetUrl} size={190} />
            </div>

            {/* Encoded URL breakdown */}
            <p className="text-[11px] font-mono text-slate-400 bg-black/40 px-3 py-1 rounded-lg border border-white/5 break-all max-w-sm text-center mb-4">
              {qrTargetUrl}
            </p>

            {/* Academic Local Demo Notice */}
            <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-6 text-left space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Info size={16} /> Local Academic Demo Notice
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                This project is running as a local development demo on your laptop and is <strong className="text-amber-300 font-bold">not deployed to a public cloud server yet</strong>. Therefore, external mobile phones will not open this link unless your phone and laptop are paired on the <strong className="text-white font-bold">exact same Wi-Fi network or phone mobile hotspot</strong>.
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                To test and demonstrate the full mobile ordering experience directly without requiring Wi-Fi pairing, simply click the <strong className="text-amber-400 font-medium">"Simulate Scanning Table {selectedTable}"</strong> button below.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button 
                onClick={() => handleDemo(selectedTable)}
                className="w-full sm:flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-rose-600 rounded-xl font-bold text-slate-950 text-sm shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:scale-102 transition-transform flex items-center justify-center gap-2"
              >
                Simulate Scanning Table {selectedTable} <ArrowRight size={16} />
              </button>
              <a 
                href="/admin/spice-lounge"
                className="w-full sm:w-auto px-4 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-xs text-slate-300 transition-colors flex items-center justify-center gap-2"
              >
                <QrCode size={14} /> Batch Print QRs
              </a>
            </div>
          </motion.div>
        </div>

        {/* Live Interactive Portals Section */}
        <div id="portals" className="max-w-7xl mx-auto px-6 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black mb-2">Interactive Project Portals</h2>
            <p className="text-slate-400 text-sm">Experience each interconnected module of the system in real time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Portal 1: Customer Menu */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#131824] p-8 rounded-3xl border border-white/10 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone size={24} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md">Customer Portal</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">Digital Guest Menu</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Mobile-first contactless ordering with categorized dishes, local 4K imagery, custom spice notes, and integrated AI Taste Sommelier.
                </p>
              </div>
              <button 
                onClick={() => handleDemo("4")}
                className="w-full py-3.5 bg-white/5 hover:bg-amber-500 hover:text-slate-900 border border-white/10 hover:border-amber-500 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                Launch Guest Menu (Table 4) <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Portal 2: Kitchen KDS */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#131824] p-8 rounded-3xl border border-white/10 hover:border-rose-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mb-6">
                  <ChefHat size={24} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-md">Kitchen Staff Portal</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-rose-400 transition-colors">Kitchen Display System</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Real-time ticket display with automatic state pipelines (Received → Preparing → Ready → Completed) and payment reconciliation.
                </p>
              </div>
              <a 
                href="/admin/spice-lounge/kds"
                className="w-full py-3.5 bg-white/5 hover:bg-rose-500 hover:text-white border border-white/10 hover:border-rose-500 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                Launch Kitchen KDS <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Portal 3: QR Generator */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#131824] p-8 rounded-3xl border border-white/10 hover:border-violet-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-violet-500/20 text-violet-400 rounded-2xl flex items-center justify-center mb-6">
                  <QrCode size={24} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-md">Floor Admin Portal</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-violet-400 transition-colors">Table QR Code Manager</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Dynamic batch generation of printable table-specific QR codes with automatic table number parameter binding.
                </p>
              </div>
              <a 
                href="/admin/spice-lounge"
                className="w-full py-3.5 bg-white/5 hover:bg-violet-600 hover:text-white border border-white/10 hover:border-violet-600 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                Launch QR Manager <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Key Modules & Innovations */}
        <div id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">Core Architectural Features</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">Engineered with high fault tolerance, zero external image dependency, and modern state hydration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#131824] p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 bg-violet-500/20 text-violet-400 rounded-xl flex items-center justify-center mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">AI Taste Matcher</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Multi-dimensional algorithmic flavor pairing assessing hunger level, spice tolerance, and dietary preferences.</p>
            </div>

            <div className="bg-[#131824] p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center mb-4">
                <Layers size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">Live KDS Sync</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Automated kitchen state polling syncing pending orders with stage mutations without page refreshes.</p>
            </div>

            <div className="bg-[#131824] p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                <Database size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">Prisma & SQLite</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Zero-configuration relational storage handling orders, nested items, and restaurant records with ACID guarantees.</p>
            </div>

            <div className="bg-[#131824] p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">Self-Contained Assets</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Offline-ready local 4K image assets preventing broken image links during viva presentations.</p>
            </div>
          </div>
        </div>

        {/* Technical Architecture Section */}
        <div id="architecture" className="max-w-7xl mx-auto px-6 py-16 mb-20 border-t border-white/5">
          <div className="bg-gradient-to-br from-[#131824] to-[#0E131F] rounded-3xl p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-mono font-bold mb-4">
                <Cpu size={14} /> TECH STACK SUMMARY
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-4">Robust Full-Stack Implementation</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Built with modern web standards: Next.js 15 App Router, TypeScript, Prisma ORM, SQLite database, Tailwind CSS with Obsidian glassmorphic styling, and Framer Motion micro-animations.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">Next.js 15</span>
                <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">TypeScript</span>
                <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">Prisma ORM</span>
                <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">SQLite</span>
                <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">Tailwind CSS</span>
                <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">Framer Motion</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button 
                onClick={() => handleDemo("1")}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-rose-600 rounded-2xl font-black text-slate-950 text-base shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                Test Complete Customer Flow <ArrowRight size={18} />
              </button>
              <a 
                href="/admin/spice-lounge/kds"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-white text-base transition-colors flex items-center justify-center gap-2"
              >
                Test Kitchen Display KDS <ChefHat size={18} />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

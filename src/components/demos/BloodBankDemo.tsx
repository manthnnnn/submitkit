'use client';

import { useState, useEffect } from 'react';
import { 
  Heart, Shield, Activity, ArrowRight, 
  CheckCircle2, PlusCircle, 
  ChevronRight, Radio, Zap
} from 'lucide-react';

// Static class map — avoids Tailwind purging dynamic class strings
const STATUS_STYLES: Record<string, string> = {
  CRITICAL:   'bg-rose-500/20 text-rose-400 border-rose-500/30',
  MONITORING: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  LOW:        'bg-rose-500/20 text-rose-400 border-rose-500/30',
  HEALTHY:    'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

const TICKER_MESSAGES = [
  { msg: 'O- Negative requisition routed to Metro General Trauma ICU', units: '4 units assigned', time: 'JUST NOW' },
  { msg: 'B+ dispatch confirmed to City Children\'s Hospital NICU',     units: '2 units en route', time: '1 MIN AGO' },
  { msg: 'AB- critical low alert — Donor mobilisation SMS sent to 23 volunteers', units: 'Awaiting response', time: '3 MIN AGO' },
  { msg: 'O+ platelet pack transferred from Central Vault to South Memorial ER', units: '6 units assigned', time: '5 MIN AGO' },
  { msg: 'A- voluntary donation recorded at Riverside Camp — cold-chain sealed', units: '1 unit added', time: '8 MIN AGO' },
];

export default function BloodBankDemo() {
  const [selectedGroup, setSelectedGroup] = useState<string>('O-');
  const [tickerIdx,     setTickerIdx]     = useState(0);

  // Cycle through ticker messages every 3 seconds
  useEffect(() => {
    const id = setInterval(() => setTickerIdx(i => (i + 1) % TICKER_MESSAGES.length), 3000);
    return () => clearInterval(id);
  }, []);

  const ticker = TICKER_MESSAGES[tickerIdx];

  const bloodInventory = [
    { group: 'O-',  units: 8,  status: 'CRITICAL',   giveTo: 'All Types (Universal Donor)', receiveFrom: 'O- Only' },
    { group: 'O+',  units: 42, status: 'HEALTHY',     giveTo: 'O+, A+, B+, AB+',             receiveFrom: 'O+, O-' },
    { group: 'A-',  units: 14, status: 'MONITORING',  giveTo: 'A-, A+, AB-, AB+',            receiveFrom: 'A-, O-' },
    { group: 'A+',  units: 68, status: 'HEALTHY',     giveTo: 'A+, AB+',                     receiveFrom: 'A+, A-, O+, O-' },
    { group: 'B-',  units: 9,  status: 'LOW',         giveTo: 'B-, B+, AB-, AB+',            receiveFrom: 'B-, O-' },
    { group: 'B+',  units: 51, status: 'HEALTHY',     giveTo: 'B+, AB+',                     receiveFrom: 'B+, B-, O+, O-' },
    { group: 'AB-', units: 6,  status: 'CRITICAL',    giveTo: 'AB-, AB+',                    receiveFrom: 'All Negative Types' },
    { group: 'AB+', units: 35, status: 'HEALTHY',     giveTo: 'AB+ Only',                    receiveFrom: 'All Types (Universal Recipient)' },
  ];

  const activeBlood = bloodInventory.find(b => b.group === selectedGroup) || bloodInventory[0];

  return (
    <div className="min-h-screen text-slate-100 font-sans pb-24 overflow-x-hidden bg-[#0a080d]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Decorative Ambient Radiance */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 blur-[140px] pointer-events-none rounded-full" />

        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 mb-8 backdrop-blur-md shadow-lg shadow-red-500/10">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Live Emergency Blood Grid • Active Telemetry
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6">
          Every Millisecond Counts in{' '}
          <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Life-Critical Blood Logistics
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          An autonomous national blood supply operating system. Connect volunteer donor networks, trauma centers, and hospital cold-chains with sub-second requisition matching and dispatch intelligence.
        </p>

        {/* Live Requisition Alert Ticker — cycles every 3 seconds */}
        <div className="mt-8 max-w-2xl mx-auto p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-between gap-4 backdrop-blur-xl text-left shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
              <Radio className="h-4 w-4 text-rose-400 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>EMERGENCY DISPATCH TICKER</span>
                <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-mono">{ticker.time}</span>
              </div>
              <div className="text-xs text-slate-300 mt-0.5 transition-all duration-500">
                {ticker.msg} • <span className="text-emerald-400 font-semibold">{ticker.units}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-14">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">14,250+</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Units Mobilized</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="text-3xl sm:text-4xl font-black text-red-400 font-mono">&lt; 14 min</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Emergency Dispatch</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">99.98%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Cold-Chain Integrity</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="text-3xl sm:text-4xl font-black text-rose-400 font-mono">180+</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Hospital Trauma Nodes</div>
          </div>
        </div>

      </section>

      {/* 2. INTERACTIVE BLOOD SUPPLY RADAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-500">
            Real-Time Reserve Telemetry
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
            National Blood Supply Radar
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Select any blood group below to inspect live reserve counts, critical shortage thresholds, and clinical transfusion compatibility vectors.
          </p>
        </div>

        {/* Blood Groups Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {bloodInventory.map((item) => {
            const isSelected = selectedGroup === item.group;
            const sc = STATUS_STYLES[item.status] ?? STATUS_STYLES.HEALTHY;
            return (
              <button
                key={item.group}
                onClick={() => setSelectedGroup(item.group)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-red-600/30 to-slate-900 border-red-500 shadow-lg shadow-red-500/20 scale-105'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="text-2xl font-black text-white font-mono">{item.group}</div>
                <div className="text-sm font-extrabold text-red-400 mt-1 font-mono">{item.units} <span className="text-[10px] text-slate-400 font-normal">units</span></div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mt-2 ${sc}`}>
                  {item.status}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Blood Group Deep Dive Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center text-white text-3xl font-black font-mono shadow-lg shadow-red-600/30">
                {activeBlood.group}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-white">Group {activeBlood.group} Blood Reserve</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLES[activeBlood.status] ?? STATUS_STYLES.HEALTHY}`}>
                    {activeBlood.status} RESERVE
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Active stock monitored across 12 centralized cold-storage cryogenic vaults.
                </p>
              </div>
            </div>
          </div>

          {/* Compatibility Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
                <Heart className="h-4 w-4" />
                <span>Transfusion Recipient Compatibility</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">Can donate to:</div>
              <div className="text-sm text-slate-300 font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                {activeBlood.giveTo}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Donor Intake Compatibility</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">Can receive from:</div>
              <div className="text-sm text-slate-300 font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                {activeBlood.receiveFrom}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. BENTO GRID ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-500">
            Emergency Health Grid
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
            Built for Zero-Latency Patient Triage
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Replace manual phone calls, clipboard manifests, and stock spoilage with high-reliability medical automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-red-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sub-Second Donor Dispatch</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                When critical trauma cases arrive at emergency wards, our proximity algorithm instantly identifies registered donors within travel radius and issues automated SMS & push mobilizations.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cold-Chain Expiration Radar</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Automated countdown telemetry for whole blood, platelets (5-day lifespan), and plasma. Visual alerts prevent spoilage by automatically routing nearing-expiry units to scheduled surgeries.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">HIPAA Medical Compliance</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Donor health histories, transfusion records, and personal contact vectors are secured with end-to-end audit trails and 90-day mandatory cooldown safety enforcement.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

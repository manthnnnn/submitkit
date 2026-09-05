"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { LayoutDashboard, Printer, Settings, Share2, Link as LinkIcon, Smartphone, Wifi } from "lucide-react";
import TableQRCode from "@/components/TableQRCode";

export default function AdminDashboard() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [tableCount, setTableCount] = useState(10);
  const [lanIp, setLanIp] = useState<string>("192.168.43.56");
  const [useWifiIp, setUseWifiIp] = useState(true);

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
    if (useWifiIp && lanIp) {
      return `http://${lanIp}:3002`;
    }
    return typeof window !== "undefined" ? window.location.origin : "http://localhost:3002";
  };

  const generateQRs = () => {
    let qrs = [];
    const base = getBaseOrigin();
    for (let i = 1; i <= tableCount; i++) {
      const url = `${base}/m/${slug}?table=${i}`;
      qrs.push(
        <div key={i} className="bg-white p-5 rounded-2xl flex flex-col items-center justify-center border-2 border-slate-200 shadow-lg print:shadow-none print:border-2 break-inside-avoid mb-4 transition-transform hover:scale-[1.02]">
          <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded-full mb-1">LuxeBite</span>
          <h2 className="text-xl font-black text-slate-900 mb-1 tracking-tight">Table {i}</h2>
          <p className="text-[11px] text-slate-500 mb-3 font-medium">Scan camera to order</p>
          
          <div className="p-2 bg-white rounded-xl shadow-inner border border-slate-100 flex items-center justify-center">
            <TableQRCode url={url} size={150} />
          </div>

          <p className="mt-3 text-[10px] font-mono text-slate-400 break-all text-center">
            {url}
          </p>
        </div>
      );
    }
    return qrs;
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Sidebar / Topnav */}
      <header className="bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
            <Settings size={20} />
          </div>
          <div>
            <h1 className="font-black text-xl">Restaurant Admin</h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest">/{slug}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => router.push(`/admin/${slug}/kds`)} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
            <LayoutDashboard size={16} /> Open KDS
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-500 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Printer size={16} /> Print QR Codes
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="print:hidden mb-12 bg-[#131824] rounded-3xl p-8 border border-white/5">
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-black mb-2">QR Code Generator</h2>
              <p className="text-slate-400 mb-6">Generate unique QR codes for each table. When scanned, customers will be taken directly to your digital menu, and orders will automatically sync with their table number.</p>
              
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5 font-bold">QR Target Host (For Phone Scanning)</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUseWifiIp(true)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                        useWifiIp ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "bg-[#0B0F19] text-slate-400 border-white/10"
                      }`}
                    >
                      <Smartphone size={14} /> Wi-Fi ({lanIp}:3002)
                    </button>
                    <button
                      onClick={() => setUseWifiIp(false)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        !useWifiIp ? "bg-white/15 text-white border-white/20" : "bg-[#0B0F19] text-slate-400 border-white/10"
                      }`}
                    >
                      Localhost
                    </button>
                  </div>
                </div>

                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold">Number of Tables</label>
                    <input 
                      type="number" 
                      value={tableCount} 
                      onChange={(e) => setTableCount(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-gradient-to-br from-emerald-500/10 to-transparent p-6 rounded-2xl border border-emerald-500/20">
              <h3 className="font-bold text-emerald-400 mb-4 flex items-center gap-2"><LinkIcon size={16}/> Direct Menu Link</h3>
              <div suppressHydrationWarning className="bg-[#0B0F19] p-3 rounded-lg border border-white/5 text-sm font-mono text-slate-300 break-all mb-4 selection:bg-emerald-500/30">
                {typeof window !== 'undefined' ? `${window.location.origin}/m/${slug}` : ''}
              </div>
              <button className="text-sm font-bold bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                <Share2 size={14} /> Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Wi-Fi Warning Banner */}
        <div className="print:hidden mb-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
            <Wifi size={18} className="animate-pulse" />
          </div>
          <p className="text-xs text-amber-200">
            <strong className="text-amber-400 font-bold block mb-0.5">Presentation Note:</strong>
            Ensure your laptop and phone are connected to the same Wi-Fi (or Mobile Hotspot) so examiners can scan these printed table QR stickers on their phones!
          </p>
        </div>

        {/* Print Area */}
        <div>
          <div className="print:hidden mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Preview ({tableCount} Tables)</h2>
            <p className="text-sm text-slate-400">Press Ctrl+P to print the stickers.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 print:grid-cols-3 print:gap-4">
            {generateQRs()}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-2 { border-width: 2px !important; }
          .print\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
      `}} />
    </div>
  );
}

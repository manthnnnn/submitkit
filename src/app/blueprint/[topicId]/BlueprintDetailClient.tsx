"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Clock, Star, ChevronRight,
  Mic, Wrench, Database, Cpu, FileDown, CheckCircle, Loader2,
  Copy, Check, ExternalLink, Terminal, ShieldAlert, BookOpen, Layers,
  Presentation, FileText, Sparkles, HelpCircle, Flame,
  Share2, MessageCircle, Zap, Lock, AlertTriangle, Printer
} from "lucide-react";
import { FullBlueprint, generateAntigravityMasterPrompt, getAntigravityBuildInfo, getRelatedTopics } from "@/lib/blueprint-engine";
import { isProjectAvailable } from "@/lib/available-projects";

declare global {
  interface Window {
    Razorpay: any;
  }
}


function deriveConceptualSteps(title: string): string[] {
  const t = title.toLowerCase();
  if (t.includes("install") || t.includes("environment") || t.includes("setup")) {
    return [
      "Initialize an isolated virtual environment (venv / conda / npm) to prevent conflicting package versions.",
      "Install primary computational libraries and verify compiler runtime acceleration (CPU / GPU).",
      "Configure project workspace directory structure (/data, /models, /src, /tests) ensuring clear modular boundaries.",
      "Run an automated sanity check confirming library versions and environment variable bindings."
    ];
  }
  if (t.includes("dataset") || t.includes("collect") || t.includes("photo") || t.includes("ingest") || t.includes("preprocess")) {
    return [
      "Collect and organize balanced data samples across all target classes with realistic variations.",
      "Execute spatial normalization: uniform dimensional resizing, margin cropping, and channel standardization.",
      "Generate dense mathematical feature vector embeddings representing each sample uniquely.",
      "Index embeddings into persistent storage for high-speed sub-millisecond retrieval during inference."
    ];
  }
  if (t.includes("engine") || t.includes("recognition") || t.includes("model") || t.includes("train") || t.includes("core")) {
    return [
      "Configure the continuous input stream buffer with frame-rate stabilization and queue management.",
      "Pass incoming inputs through localized feature detection anchors and extraction layers.",
      "Calculate mathematical distance scores (Cosine Similarity or Euclidean L2) against stored reference vectors.",
      "Apply calibrated decision thresholding: safely categorize low-confidence signals as 'Unknown' to avoid false positives."
    ];
  }
  if (t.includes("web") || t.includes("flask") || t.includes("interface") || t.includes("ui") || t.includes("api") || t.includes("frontend")) {
    return [
      "Configure REST API endpoints and WebSocket channels for bidirectional low-latency communication.",
      "Implement a clean relational database schema with audit timestamps and indexed lookup keys.",
      "Construct a modern responsive web dashboard with dark-mode aesthetic and real-time inference telemetry.",
      "Implement client-side exception handling ensuring graceful recovery from connectivity interruptions."
    ];
  }
  if (t.includes("test") || t.includes("edge") || t.includes("duplicate") || t.includes("verify")) {
    return [
      "Design challenging test fixtures: occluded inputs, low-lighting scenarios, and edge-case anomalies.",
      "Implement transaction deduplication logic preventing redundant state writes within session cooldowns.",
      "Quantify evaluation metrics: Accuracy, Precision, Recall, F1-Score, and latency percentiles.",
      "Document unhandled boundary conditions in the technical dossier for examiners."
    ];
  }
  return [
    `Initialize the core computational module for ${title.toLowerCase()} with optimal parameters.`,
    "Implement mathematical decision boundaries and feature transformation pipelines.",
    "Validate input sanitization and inter-module communication integrity.",
    "Execute edge-case validation testing ensuring real-time response targets are met."
  ];
}

// ─── Category-aware performance metrics ───────────────────────────────────────
function getTopicMetrics(category: string) {
  if (category === 'FullStack' || category === 'Mobile') {
    return [
      { label: 'API Response Time', value: '< 200ms', sub: 'p95 latency', color: 'text-[#E55729]' },
      { label: 'Lighthouse Score',  value: '> 95',    sub: 'Performance', color: 'text-[#18181B]' },
      { label: 'Uptime Target',     value: '99.9%',   sub: 'SLA goal',    color: 'text-[#CB451A]' },
    ];
  }
  if (category === 'Blockchain') {
    return [
      { label: 'Block Confirmation', value: '< 3s',     sub: 'Avg tx time',     color: 'text-[#E55729]' },
      { label: 'Gas Efficiency',     value: '~21,000',  sub: 'Gas units (ETH)', color: 'text-[#18181B]' },
      { label: 'Contract Uptime',    value: '99.9%',    sub: 'On-chain',         color: 'text-[#CB451A]' },
    ];
  }
  if (category === 'IoT') {
    return [
      { label: 'Sensor Latency', value: '< 100ms',  sub: 'Real-time data',   color: 'text-[#E55729]' },
      { label: 'Battery Life',   value: '> 24hr',   sub: 'ESP32 optimized',  color: 'text-[#18181B]' },
      { label: 'Packet Loss',    value: '< 0.5%',   sub: 'MQTT reliability', color: 'text-[#CB451A]' },
    ];
  }
  if (category === 'Cybersecurity') {
    return [
      { label: 'Detection Rate',  value: '99.5%', sub: 'True positive rate', color: 'text-[#E55729]' },
      { label: 'False Positives', value: '< 2%',  sub: 'Precision',          color: 'text-[#18181B]' },
      { label: 'Scan Speed',      value: '< 5s',  sub: 'Per target host',    color: 'text-[#CB451A]' },
    ];
  }
  if (category === 'NLP') {
    return [
      { label: 'BLEU Score',    value: '≥ 0.82',    sub: 'Translation quality', color: 'text-[#E55729]' },
      { label: 'Response Time', value: '< 120ms',   sub: 'Inference speed',     color: 'text-[#18181B]' },
      { label: 'Accuracy',      value: '91% – 96%', sub: 'Classification',       color: 'text-[#CB451A]' },
    ];
  }
  if (category === 'Fintech' || category === 'DataScience') {
    return [
      { label: 'Model Accuracy', value: '90% – 97%', sub: 'On test split',    color: 'text-[#E55729]' },
      { label: 'F1 Score',       value: '≥ 0.89',    sub: 'Balanced metric',  color: 'text-[#18181B]' },
      { label: 'Dataset Split',  value: '80 / 20',   color: 'text-[#CB451A]' },
    ];
  }
  // Default: AIML
  return [
    { label: 'Model Accuracy / F1', value: '92% – 98%', sub: 'On standard test split', color: 'text-[#E55729]' },
    { label: 'Inference Speed',     value: '< 45ms',    sub: 'Real-time response',     color: 'text-[#18181B]' },
    { label: 'Dataset Split',       value: '80 / 20',   sub: 'Train / Test ratio',     color: 'text-[#CB451A]' },
  ];
}

// ─── Category-aware troubleshooting errors ────────────────────────────────────
function getTroubleshootingErrors(category: string) {
  if (category === 'FullStack' || category === 'Mobile') {
    return [
      { error: "Cannot find module 'xyz' / npm ERR! 404", cause: "npm package not installed in the current workspace.", fix: "Run: npm install [package-name]. If in a monorepo, run from the subdirectory containing package.json." },
      { error: "EADDRINUSE: address already in use :::3000", cause: "Previous dev server is still running on port 3000.", fix: "Kill with: npx kill-port 3000 — or set PORT=3001 in .env and restart the server." },
      { error: "CORS policy: No 'Access-Control-Allow-Origin' header", cause: "The backend API doesn't allow requests from your frontend origin.", fix: "Add cors({ origin: 'http://localhost:3000' }) middleware to your Express/FastAPI server." },
      { error: "Build failed: TypeScript type error / JSX parse error", cause: "Type mismatch or missing type annotation in component props.", fix: "Check the exact error line number. Add explicit types. Use 'as unknown as Type' temporarily to isolate the error." },
    ];
  }
  if (category === 'Blockchain') {
    return [
      { error: "Error: gas estimation failed / transaction reverted", cause: "Smart contract require() condition failed or ran out of gas.", fix: "Add Hardhat console.log() inside the Solidity function. Check require() error messages and verify correct parameter types." },
      { error: "MetaMask RPC Error: nonce too low", cause: "A stuck pending transaction is blocking your account nonce.", fix: "MetaMask → Settings → Advanced → Reset Account. Clears local nonce without touching your mainnet funds." },
      { error: "ABI mismatch: function not found in contract", cause: "Contract was recompiled but the ABI JSON in frontend wasn't updated.", fix: "After npx hardhat compile, copy the new ABI from artifacts/contracts/YourContract.json into your src/abi/ folder." },
      { error: "ethers: Cannot read property 'provider' of undefined", cause: "Wallet provider not connected before calling contract functions.", fix: "Always await provider.getSigner() and check it exists. Wrap contract calls in try/catch with a 'Please connect wallet' user prompt." },
    ];
  }
  if (category === 'IoT') {
    return [
      { error: "esptool.py: Permission denied / Serial port busy (COM3)", cause: "Serial port is locked by another app (Arduino IDE, serial monitor).", fix: "Close all serial monitors and Arduino IDE windows. On Windows: Device Manager → Ports → Disable then re-enable the COM port." },
      { error: "Sensor reading: NaN or -999 / timeout after 2s", cause: "Loose wire, wrong GPIO pin number, or sensor not initialized correctly.", fix: "Double-check wiring to 3.3V (not 5V for most sensors). Add 1s delay after sensor.begin(). Print sensor.getStatus() for diagnostics." },
      { error: "WiFi: WL_DISCONNECTED / MQTT broker unreachable", cause: "Wrong SSID/password or broker IP not reachable on the local network.", fix: "Print WiFi.status() in loop. Ensure device and broker are on same WiFi. Ping the broker IP from your laptop first." },
      { error: "Flash write failed / Sketch too large for flash", cause: "Firmware size exceeds the available flash partition.", fix: "Arduino IDE: Tools → Partition Scheme → 'Huge APP (3MB No OTA)'. Or remove unused library imports to reduce binary size." },
    ];
  }
  if (category === 'Cybersecurity') {
    return [
      { error: "PermissionError: socket operation not permitted (raw sockets)", cause: "Port scanning and packet capture require elevated system privileges.", fix: "Run with: sudo python3 scanner.py on Linux/Mac. On Windows, open terminal as Administrator before running the script." },
      { error: "ModuleNotFoundError: No module named 'scapy' / WinPcap not found", cause: "Scapy requires Npcap for Windows packet capture, not WinPcap.", fix: "Install Npcap from https://npcap.com (free). Then reinstall: pip install scapy. Restart terminal after Npcap install." },
      { error: "SSL certificate verify failed / SSL handshake timeout", cause: "Target server has an expired or self-signed SSL certificate.", fix: "For local testing only: requests.get(url, verify=False). For production use the certifi package to bundle updated CA certificates." },
      { error: "ConnectionRefusedError: [Errno 111] target closed connection", cause: "Target host is blocking the connection or the port is not open.", fix: "Confirm target is reachable: ping <target-ip>. Then test with nmap -p <port> <target> to verify port status." },
    ];
  }
  // Default: Python / AIML / DataScience / NLP
  return [
    { error: "ModuleNotFoundError: No module named 'xyz'", cause: "The library is not installed in the current virtual environment.", fix: "Run: pip install [module_name]. Verify your active python environment with 'which python' (Mac/Linux) or 'where python' (Windows)." },
    { error: "Address already in use / Port 5000 busy", cause: "A previous server session is still running in the background.", fix: "Kill the process: On Windows run 'taskkill /F /IM python.exe' or change port to 5001 in app.py." },
    { error: "Out of Memory (OOM) / System Freezes during training", cause: "Batch size or image resolution is too high for laptop RAM/GPU.", fix: "Reduce batch size from 32 to 8 or 16, and resize images to 128×128 or 224×224 before training." },
    { error: "Accuracy stuck at 50% or Loss not decreasing", cause: "Learning rate too high, or labels not encoded properly.", fix: "Lower learning rate to 0.0001 (1e-4) and verify labels are 0-indexed integers, not one-hot encoded strings." },
  ];
}

type ActiveTab = "antigravity" | "steps" | "dataset" | "viva" | "architecture" | "deploy" | "troubleshoot" | "deliverables";

export default function BlueprintDetailClient({ topic }: { topic: FullBlueprint }) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("antigravity");
  const [preBookEmail, setPreBookEmail] = useState("");
  const [preBookDone, setPreBookDone] = useState(false);
  // Blueprint is always free — no paywall
  const unlocked = true;
  const masterPrompt = generateAntigravityMasterPrompt(topic);
  const buildInfo = getAntigravityBuildInfo(topic);
  const relatedTopics = getRelatedTopics(topic.id, topic.category, 3);

  const difficultyStars = Array(5)
    .fill(0)
    .map((_, i) => i < topic.difficulty);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };




  const handleShare = () => {
    const url = window.location.href;
    const text = `🚀 Free Blueprint: "${topic.title}" on SubmitKit! Full roadmap, AI prompts, viva Q&A — 100% free!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`, "_blank");
  };

  const isFaceRecognition = topic.id.includes("face-recognition");

  const handleDownloadPdf = async (preferredFormat?: "pdf" | "docx") => {
    setPdfLoading(true);
    try {
      const targetFormat = preferredFormat || (isFaceRecognition ? "pdf" : "docx");
      const res = await fetch(
        `/api/blueprint/pdf?topicId=${encodeURIComponent(topic.id)}&email=free&format=${targetFormat}`,
        { method: "GET" }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Blueprint download failed");
      }
      const contentType = res.headers.get("content-type") || "";
      const isPdf = contentType.includes("application/pdf");
      const ext = isPdf ? "pdf" : "docx";
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SubmitKit-Blueprint-${topic.id}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(err.message || "Failed to download blueprint. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };


  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100vh', color: 'var(--ink)', position: 'relative' }}>
      {/* Ambient orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} aria-hidden>
        <div className="aorb" style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(248, 241, 230, 0.5) 45%, transparent 70%)', top: '-10%', right: '-10%', filter: 'blur(70px)' }} />
        <div className="aorb" style={{ position: 'absolute', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245, 237, 222, 0.55) 0%, transparent 70%)', bottom: '10%', left: '-8%', filter: 'blur(60px)', animationDelay: '4s' }} />
      </div>

      <div className="shell" style={{ paddingTop: '2rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1 }}>

        {/* ── FREE ACCESS BANNER (Sleek iOS Frosted Card) ── */}
        <div style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF6EE 100%)',
          border: '1.2px solid rgba(226, 218, 205, 0.95)',
          borderRadius: '16px',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: '0 2px 10px rgba(180, 155, 120, 0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.875rem' }}>
            <div style={{ width: '2.375rem', height: '2.375rem', borderRadius: '10px', background: 'var(--teal-50)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle style={{ width: '1.1875rem', height: '1.1875rem', color: 'var(--teal)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '.875rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em' }}>
                  Full Engineering Blueprint
                </span>
                <span style={{ fontSize: '.625rem', fontWeight: 800, padding: '.15rem .5rem', borderRadius: '9999px', background: 'var(--teal-50)', color: 'var(--teal-dark)', border: '1px solid var(--teal-100)' }}>
                  100% Free Access
                </span>
              </div>
              <p style={{ fontSize: '.78125rem', color: 'var(--ink-3)', margin: 0, lineHeight: 1.5 }}>
                Architecture • Build steps • Dataset guide • Viva Q&amp;A • Master prompts — all unlocked.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleDownloadPdf()}
              disabled={pdfLoading}
              className="btn btn-teal btn-sm"
              style={{ gap: '.375rem', fontSize: '.78125rem', borderRadius: '10px', padding: '0 .875rem', minHeight: '36px' }}
            >
              {pdfLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
              {pdfLoading ? "Preparing..." : isFaceRecognition ? "Download Blueprint (PDF)" : "Download Blueprint (.docx)"}
            </button>
            <button
              onClick={() => window.print()}
              className="btn btn-outline btn-sm no-print"
              style={{ gap: '.375rem', fontSize: '.78125rem', borderRadius: '10px', padding: '0 .875rem', minHeight: '36px' }}
              title="Print or Save complete blueprint as PDF"
            >
              <Printer className="w-3.5 h-3.5" /> Save as PDF / Print
            </button>
            <button
              onClick={handleShare}
              className="btn btn-outline btn-sm no-print"
              style={{ gap: '.375rem', fontSize: '.78125rem', borderRadius: '10px', padding: '0 .875rem', minHeight: '36px' }}
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>

        {/* ── HEADER HERO ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', alignItems: 'center' }}>
            <span style={{
              fontSize: '.6875rem', fontWeight: 800, padding: '.25rem .65rem',
              borderRadius: '9999px', background: 'var(--surface-2)', color: 'var(--navy)',
              border: '1px solid var(--line)', textTransform: 'uppercase', letterSpacing: '.06em',
            }}>
              {topic.category}
            </span>
            {topic.trending && (
              <span style={{
                fontSize: '.6875rem', fontWeight: 700, padding: '.25rem .65rem',
                borderRadius: '9999px', background: '#FFFBEB', color: '#92400E',
                border: '1px solid #FDE68A', display: 'inline-flex', alignItems: 'center', gap: '.3rem',
              }}>
                <Flame style={{ width: '12px', height: '12px', color: '#D97706' }} /> Trending Topic
              </span>
            )}
            <span style={{
              fontSize: '.6875rem', fontWeight: 700, padding: '.25rem .65rem',
              borderRadius: '9999px', background: '#FDF6F2', color: '#E55729',
              border: '1px solid #F3CFBF', display: 'inline-flex', alignItems: 'center', gap: '.3rem',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#E55729' }} />
              Approved Systems
            </span>
            <span style={{
              fontSize: '.6875rem', fontWeight: 700, padding: '.25rem .65rem',
              borderRadius: '9999px', background: 'var(--teal-50)', color: 'var(--teal-darker)',
              border: '1px solid var(--teal-100)', display: 'inline-flex', alignItems: 'center', gap: '.35rem',
            }}>
              <Sparkles style={{ width: '12px', height: '12px', color: 'var(--teal)' }} />
              Engineering Blueprint
            </span>
          </div>

          <h1 className="font-display font-black" style={{ fontSize: 'clamp(1.875rem, 5vw, 2.75rem)', letterSpacing: '-.04em', color: 'var(--navy)', lineHeight: 1.2, margin: 0 }}>
            {topic.title}
          </h1>
          <p style={{ fontSize: 'clamp(.9375rem, 2vw, 1.0625rem)', color: 'var(--ink-3)', maxWidth: '48rem', lineHeight: 1.7, margin: 0 }}>
            {topic.tagline}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.5rem 1.5rem', paddingTop: '.75rem', borderTop: '1px solid var(--line)', fontSize: '.8125rem', color: 'var(--ink-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
              <Clock style={{ width: '14px', height: '14px', color: 'var(--teal)' }} />
              <span>Build time: <strong style={{ color: 'var(--navy)' }}>{topic.buildTimeDays}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
              <span>Examiner Difficulty:</span>
              <span style={{ display: 'flex', gap: '2px' }}>
                {difficultyStars.map((filled, i) => (
                  <Star
                    key={i}
                    style={{
                      width: '13px', height: '13px',
                      fill: filled ? '#F59E0B' : '#E2E8F0',
                      color: filled ? '#F59E0B' : '#CBD5E1',
                    }}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>

        {/* ── TIME-SAVER HOOK BANNER (Refined Modern Linear-Style Architecture Card) ── */}
        <div style={{
          background: 'linear-gradient(160deg, #FFFFFF 0%, #FDFBF8 30%, #F6ECE0 65%, #EFE0C8 100%)',
          borderRadius: '20px',
          border: '1.5px solid rgba(220, 208, 188, 0.95)',
          padding: 'clamp(1.5rem, 4vw, 2.25rem)',
          boxShadow: 'inset 0 1px 0 #FFFFFF, 0 8px 30px -4px rgba(180, 145, 100, 0.16)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem' }}>
              <div style={{ maxWidth: '42rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.5rem', marginBottom: '.75rem' }}>
                  <span style={{
                    fontSize: '.6875rem', fontWeight: 800, padding: '.25rem .65rem',
                    borderRadius: '9999px', background: 'var(--teal-50)', color: 'var(--teal-dark)',
                    border: '1px solid var(--teal-100)', letterSpacing: '.06em', textTransform: 'uppercase',
                    display: 'inline-flex', alignItems: 'center', gap: '.35rem',
                  }}>
                    <Sparkles style={{ width: '12px', height: '12px', color: 'var(--teal)' }} />
                    Architecture &amp; Implementation Blueprint
                  </span>
                  <span style={{
                    fontSize: '.6875rem', fontWeight: 700, padding: '.25rem .6rem',
                    borderRadius: '9999px', background: '#FDF6F2', color: '#E55729',
                    border: '1px solid #F3CFBF', display: 'inline-flex', alignItems: 'center', gap: '.3rem',
                  }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#E55729' }} />
                    Multi-Tier System
                  </span>
                </div>

                <h2 className="font-display font-black" style={{ fontSize: 'clamp(1.35rem, 3.5vw, 1.875rem)', letterSpacing: '-.035em', color: 'var(--navy)', lineHeight: 1.25, margin: '0 0 .625rem' }}>
                  Production-Grade System Architecture &amp; Implementation
                </h2>

                <p style={{ fontSize: '.9rem', color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>
                  Includes multi-tier architectural schematics, clean separation of concerns, synthetic validation pipelines, and evaluator scoring defense.
                </p>

                {/* 3 Quick Benefit Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" style={{ marginTop: '1.25rem' }}>
                  {buildInfo.benefitPills.map((pill, idx) => (
                    <div key={idx} style={{
                      background: '#FFFFFF',
                      border: '1px solid var(--line)',
                      borderRadius: '12px',
                      padding: '.625rem .75rem',
                      fontSize: '.75rem',
                      color: 'var(--ink-2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '.5rem',
                      boxShadow: 'var(--sh-xs)',
                    }}>
                      <CheckCircle style={{ width: '14px', height: '14px', color: 'var(--teal)', flexShrink: 0 }} />
                      <span><strong>{pill.title}:</strong> {pill.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Column — No Ugly Yellow Buttons */}
              <div style={{ minWidth: '16rem', flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
                {topic.id && isProjectAvailable(topic.id) ? (
                  <>
                    <Link
                      href={`/projects/${topic.id}`}
                      className="btn btn-teal btn-lg w-full"
                      style={{ gap: '.5rem', justifyContent: 'center', boxShadow: '0 6px 20px -4px rgba(13,148,136,0.4)' }}
                    >
                      <Zap style={{ width: '1.125rem', height: '1.125rem' }} /> Get Full Project Kit
                    </Link>
                    <p style={{ fontSize: '.6875rem', color: 'var(--ink-4)', textAlign: 'center', margin: 0, fontWeight: 600 }}>
                      ⚡ Working code + IEEE Report + PPT • Instant download
                    </p>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/custom?topic=${encodeURIComponent(topic.title)}`}
                      className="btn btn-teal btn-lg w-full"
                      style={{ gap: '.5rem', justifyContent: 'center', boxShadow: '0 6px 20px -4px rgba(13,148,136,0.4)' }}
                    >
                      <Sparkles style={{ width: '1.0625rem', height: '1.0625rem' }} /> Request Custom Build →
                    </Link>
                    <Link
                      href="/projects"
                      className="btn btn-outline btn-sm w-full"
                      style={{ justifyContent: 'center', fontSize: '.78125rem', borderRadius: '10px', minHeight: '38px' }}
                    >
                      Browse 11 Ready Kits
                    </Link>
                    <p style={{ fontSize: '.6875rem', color: 'var(--ink-4)', textAlign: 'center', margin: 0 }}>
                      Delivered in 48h with working code &amp; report
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CONTENT GRID
        ═══════════════════════════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))', gap: '2rem', alignItems: 'start' }}>
          
          {/* ── LEFT COLUMN: EITHER UNLOCKED FULL GUIDE OR FREE TEASER ── */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {unlocked ? (
              /* ══════════════════════════════════════════════════════════
                 UNLOCKED STATE: COMPLETE BUILD PROCESS & STEP-BY-STEP
              ══════════════════════════════════════════════════════════ */
              <div className="space-y-8">
                
                {/* Navigation Pills — horizontally scrollable on mobile */}
                <div className="scroll-x" style={{
                  display: 'flex', gap: '.25rem', padding: '.3125rem',
                  background: 'rgba(238, 230, 218, 0.65)', border: '1px solid rgba(222, 212, 196, 0.85)', borderRadius: '14px',
                  boxShadow: 'inset 0 1px 2px rgba(60, 45, 20, 0.04)'
                }}>
                  {[
                    { id: "antigravity", label: buildInfo.tab0Label, icon: buildInfo.canBuild ? Sparkles : Cpu },
                    { id: "steps", label: "Step-by-Step Guide", icon: Wrench },
                    { id: "dataset", label: "Dataset Master Guide", icon: Database },
                    { id: "viva", label: "Evaluator Defense Q&A", icon: Mic },
                    { id: "architecture", label: "Architecture", icon: Layers },
                    { id: "deploy", label: "Deployment", icon: Terminal },
                    { id: "troubleshoot", label: "Troubleshooting", icon: ShieldAlert },
                    { id: "deliverables", label: "Black Book & PPT", icon: Presentation },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as ActiveTab)}
                        style={{
                          flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                          padding: '.4375rem .875rem', borderRadius: '10px',
                          fontSize: '.8125rem', cursor: 'pointer', whiteSpace: 'nowrap',
                          fontWeight: isActive ? 700 : 500,
                          background: isActive ? '#FAF7F2' : 'transparent',
                          color: isActive ? 'var(--navy)' : 'var(--ink-4)',
                          boxShadow: isActive ? '0 1px 3px rgba(60,45,20,0.08), 0 1px 2px rgba(60,45,20,0.04)' : 'none',
                          border: isActive ? '1px solid rgba(215, 204, 185, 0.9)' : '1px solid transparent',
                          transition: 'all 120ms cubic-bezier(.16, 1, .3, 1)',
                          WebkitTapHighlightColor: 'transparent',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: isActive ? 'var(--teal)' : '#94A3B8' }} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* TAB 0: BUILD GUIDE */}
                {activeTab === "antigravity" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="border-b border-slate-200/80 pb-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                            {buildInfo.canBuild ? (
                              <Sparkles className="w-5 h-5 text-teal-600" />
                            ) : (
                              <Cpu className="w-5 h-5 text-teal-600" />
                            )}
                            {buildInfo.tab0Title}
                          </h2>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {buildInfo.tab0Sub}
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(masterPrompt, 9999)}
                          className="btn btn-teal btn-sm"
                          style={{ gap: '.4rem', fontWeight: 700, borderRadius: '10px', boxShadow: '0 4px 14px -2px rgba(13,148,136,0.35)' }}
                        >
                          {copiedIndex === 9999 ? (
                            <><Check className="w-3.5 h-3.5" /> Copied!</>
                          ) : (
                            <><Copy className="w-3.5 h-3.5" /> {buildInfo.copyButtonText}</>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 3-Step Baby-Step Workflow */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '.875rem' }}>
                      {buildInfo.workflowSteps.map((step) => (
                        <div key={step.step} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.125rem', display: 'flex', flexDirection: 'column', gap: '.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                          <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                            <span className="w-6 h-6 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center font-mono text-xs text-slate-800">{step.step}</span>
                            {step.title}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Master Prompt Box */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-teal-600" />
                          {buildInfo.promptBoxTitle}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {masterPrompt.length} characters • Ready to use
                        </span>
                      </div>

                      <div className="relative group">
                        <pre style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '.8125rem', color: '#0F172A', overflowX: 'auto', lineHeight: 1.7, maxHeight: '420px', whiteSpace: 'pre-wrap', userSelect: 'all' }}>
                          {masterPrompt}
                        </pre>
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => copyToClipboard(masterPrompt, 9999)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-medium border border-slate-200 shadow-xs transition-all"
                          >
                            {copiedIndex === 9999 ? (
                              <><Check className="w-3.5 h-3.5 text-[#E55729]" /> Copied!</>
                            ) : (
                              <><Copy className="w-3.5 h-3.5" /> Copy</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Creative Freedom & Base Software Foundation Callout */}
                    <div style={{ borderRadius: '14px', border: '1px solid #F3CFBF', background: '#FDF6F2', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                        <Sparkles className="w-4 h-4 text-[#E55729] shrink-0" />
                        Base Software Foundation &amp; Complete Creative Freedom
                      </div>
                      <p className="text-slate-600 leading-relaxed text-xs">
                        <strong>Important Note:</strong> This Master Prompt generates a complete, fully working <strong>Base Software Application</strong> of your project right out of the box. Use this as your solid operational foundation! As per your personal creativity and guidelines, you can freely update, refine, and customize the system whenever you want simply by asking the AI (e.g. <em>&ldquo;Add dark/light theme switch&rdquo;</em>, <em>&ldquo;Export records as Excel / PDF&rdquo;</em>, or <em>&ldquo;Integrate email alerts&rdquo;</em>). You have complete freedom to make it uniquely yours!
                      </p>
                    </div>

                    {/* Why this master prompt works */}
                    <div style={{ background: '#FFFFFF', border: '1px solid #EFE6DC', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#E55729]" />
                        Why This Master Prompt Produces Working Code On First Try:
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '.875rem', fontSize: '.8125rem' }}>
                        <div style={{ background: '#FAF5EE', border: '1px solid #EFE6DC', borderRadius: '12px', padding: '.875rem', display: 'flex', flexDirection: 'column', gap: '.375rem' }}>
                          <strong style={{ color: '#0F172A', display: 'block', fontWeight: 600 }}>Includes Synthetic Data Generator</strong>
                          <p className="text-slate-600 leading-relaxed">
                            Instructs the AI to generate a standalone data script so your project works right out of the box without needing 2GB dataset downloads.
                          </p>
                        </div>
                        <div style={{ background: '#FAF5EE', border: '1px solid #EFE6DC', borderRadius: '12px', padding: '.875rem', display: 'flex', flexDirection: 'column', gap: '.375rem' }}>
                          <strong className="text-slate-900 block font-semibold">Strict No-Placeholder Rule</strong>
                          <p className="text-slate-600 leading-relaxed">
                            Forbids lazy comments like &ldquo;// implement here&rdquo;. Demands complete, line-by-line execution logic.
                          </p>
                        </div>
                        <div style={{ background: '#FAF5EE', border: '1px solid #EFE6DC', borderRadius: '12px', padding: '.875rem', display: 'flex', flexDirection: 'column', gap: '.375rem' }}>
                          <strong className="text-slate-900 block font-semibold">Modern Responsive Dashboard</strong>
                          <p className="text-slate-600 leading-relaxed">
                            Mandates an intuitive modern interactive UI with live metrics and real-time visualization that impresses college evaluators.
                          </p>
                        </div>
                        <div style={{ background: '#FAF5EE', border: '1px solid #EFE6DC', borderRadius: '12px', padding: '.875rem', display: 'flex', flexDirection: 'column', gap: '.375rem' }}>
                          <strong className="text-slate-900 block font-semibold">Built-in Automated Tests</strong>
                          <p className="text-slate-600 leading-relaxed">
                            Forces unit tests verifying accuracy and error handling, giving you tangible proof to show in Chapter 5 of your Black Book.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 1: STEP-BY-STEP IMPLEMENTATION (CONCEPTUAL BABY STEPS - NO RAW CODE) */}
                {activeTab === "steps" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-200/80 pb-3 gap-2">
                      <div>
                        <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                          <Wrench className="w-5 h-5 text-[#E55729]" />
                          Step-by-Step Implementation Guide
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Follow these {topic.buildSteps?.length || 0} clear conceptual baby steps from environment setup to live demo.
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                        100% Theory &amp; Architecture • Zero Code Clutter
                      </span>
                    </div>

                    <div className="space-y-5">
                      {topic.buildSteps && topic.buildSteps.length > 0 ? (
                        topic.buildSteps.map((step, idx) => {
                          const babySteps = deriveConceptualSteps(step.title);
                          return (
                            <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 space-y-4 shadow-sm">
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center font-mono">
                                    {step.step}
                                  </span>
                                  <h3 className="text-base font-display font-bold text-slate-900">
                                    {step.title}
                                  </h3>
                                </div>
                                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {step.duration}
                                </span>
                              </div>

                              <p className="text-sm text-slate-600 leading-relaxed">
                                {step.description}
                              </p>

                              {/* Conceptual Baby Steps Breakdown */}
                              <div className="space-y-2 bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                                  Detailed Implementation Mechanics:
                                </span>
                                <ul className="space-y-2 text-xs text-slate-700">
                                  {babySteps.map((bStep, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-2.5">
                                      <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                        {bIdx + 1}
                                      </span>
                                      <span className="leading-relaxed">{bStep}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Commands */}
                              {step.commands && step.commands.length > 0 && (
                                <div className="space-y-1.5">
                                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Terminal Commands:</span>
                                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs text-slate-800 space-y-1 overflow-x-auto shadow-xs">
                                    {step.commands.map((cmd, cIdx) => (
                                      <div key={cIdx} className="flex items-center justify-between gap-2">
                                        <span className="text-[#CB451A] font-semibold">$ {cmd}</span>
                                        <button
                                          onClick={() => copyToClipboard(cmd, idx * 100 + cIdx)}
                                          className="text-slate-400 hover:text-slate-700 p-1"
                                          title="Copy command"
                                        >
                                          {copiedIndex === idx * 100 + cIdx ? <Check className="w-3.5 h-3.5 text-[#E55729]" /> : <Copy className="w-3.5 h-3.5" />}
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Expected Output */}
                              {step.expectedOutput && (
                                <div className="rounded-xl bg-[#FDF6F2] border border-[#F3CFBF] p-3 text-xs text-slate-700 flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-[#E55729] shrink-0 mt-0.5" />
                                  <div>
                                    <strong className="text-[#18181B] font-bold block">Expected Output &amp; Verification:</strong>
                                    <span>{step.expectedOutput}</span>
                                  </div>
                                </div>
                              )}

                              {/* Zero-Code Antigravity Callout */}
                              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FDF6F2] border border-[#F3CFBF] text-xs text-[#18181B]">
                                <span className="flex items-center gap-2">
                                  <Sparkles className="w-3.5 h-3.5 text-[#E55729] shrink-0" />
                                  <span>Build this step without code in seconds using the Antigravity Master Prompt.</span>
                                </span>
                                <button
                                  onClick={() => setActiveTab("antigravity")}
                                  className="text-xs font-bold text-[#E55729] hover:text-[#CB451A] underline shrink-0 ml-2"
                                >
                                  View Master Prompt →
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-slate-500">No build steps defined for this preview.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: DATASET MASTER GUIDE */}
                {activeTab === "dataset" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="border-b border-slate-200/80 pb-3">
                      <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                        <Database className="w-5 h-5 text-[#E55729]" />
                        Dataset &amp; Data Collection Master Guide
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Where to get clean training data, how to structure it, and how to preprocess it.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-5 shadow-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                          <span className="text-xs text-slate-500 font-semibold block mb-1">Recommended Dataset</span>
                          <p className="text-sm font-bold text-slate-900">{topic.dataset?.name || topic.datasetName}</p>
                          <p className="text-xs text-slate-500 mt-1">{topic.dataset?.size} • {topic.dataset?.format}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                          <span className="text-xs text-slate-500 font-semibold block mb-1">Download Link</span>
                          {topic.dataset?.url ? (
                            <a
                              href={topic.dataset.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 break-all"
                            >
                              Direct Dataset Source <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          ) : (
                            <p className="text-xs text-slate-500">See folder instructions</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-slate-900">How to Collect &amp; Set Up the Data:</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {topic.dataset?.description || "Collect data into the designated raw data folder and ensure consistent file naming."}
                        </p>
                      </div>

                      {topic.dataset?.backupDataset && (
                        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs space-y-1">
                          <strong className="text-slate-900 font-bold block">Backup / Alternative Dataset:</strong>
                          <p className="text-slate-700">{topic.dataset.backupDataset}</p>
                          {topic.dataset.backupUrl && (
                            <a
                              href={topic.dataset.backupUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-700 font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                            >
                              Alternative Link <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}

                      {/* Recommended Folder Structure */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-sm font-bold text-slate-900">Standard Directory Structure:</h4>
                        <pre className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-700 overflow-x-auto">
{`project_root/
├── data/
│   ├── raw/                  # Original downloaded files
│   └── processed/            # Cleaned 80/20 train/test split
├── models/                   # Saved weights (.pkl, .h5, .pt)
├── src/                      # Source code (train.py, utils.py)
├── app.py                    # Web demo / API server
└── requirements.txt          # Required dependencies`}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: EVALUATOR DEFENSE */}
                {activeTab === "viva" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="border-b border-slate-200/80 pb-3">
                      <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                        <Mic className="w-5 h-5 text-teal-600" />
                        System Understanding &amp; Defense Mastery (Easy to Understand)
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Key engineering decisions explained in simple English so you can explain your system to any evaluator with total confidence.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {topic.vivaQA && topic.vivaQA.length > 0 ? (
                        topic.vivaQA.map((qa, qIdx) => {
                          const cleanTitle = qa.question
                            .replace(/\?$/, "")
                            .replace(/^(What is the|What is|Why did you choose|Why use|How does the|How does|Can you explain|What happens if|How would you handle|How do you)\s+/i, "")
                            .trim();
                          const conceptTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

                          return (
                            <div key={qIdx} className="bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 space-y-4 shadow-sm">
                              <div className="flex items-start gap-3">
                                <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  0{qIdx + 1}
                                </span>
                                <div>
                                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Core System Concept:</span>
                                  <h3 className="text-base font-display font-bold text-slate-900 leading-snug">
                                    {conceptTitle}
                                  </h3>
                                </div>
                              </div>

                              {/* Plain English explanation */}
                              <div className="rounded-xl bg-teal-50/60 border border-teal-200/80 p-4 text-xs space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-teal-900 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                                    <CheckCircle className="w-3.5 h-3.5 text-teal-600" /> Plain-English Explanation:
                                  </span>
                                  <button
                                    onClick={() => copyToClipboard(qa.perfectAnswer, 500 + qIdx)}
                                    className="text-slate-400 hover:text-slate-700 p-1"
                                    title="Copy explanation"
                                  >
                                    {copiedIndex === 500 + qIdx ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                                <p className="text-slate-800 leading-relaxed text-sm font-medium">
                                  &ldquo;{qa.perfectAnswer}&rdquo;
                                </p>
                              </div>

                              {/* Why this matters in the architecture */}
                              <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-xs">
                                <span className="text-slate-500 font-semibold block mb-0.5">Why This Matters in the Architecture:</span>
                                <p className="text-slate-700">{qa.whyAsked}</p>
                              </div>

                              {/* Evaluator Scoring Edge / Pro Tip */}
                              {qa.avoidSaying && (
                                <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
                                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                  <div>
                                    <strong className="text-amber-900 font-bold block">💡 Evaluator Scoring Edge &amp; Key Insight:</strong>
                                    <span className="text-slate-700 leading-relaxed">
                                      {qa.avoidSaying.replace(/^(Do not say\s*"?|Trap:\s*"?)/i, "Always highlight that: ")}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-slate-500">System defense concepts loading...</p>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 4: ARCHITECTURE */}
                {activeTab === "architecture" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="border-b border-slate-200/80 pb-3">
                      <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-teal-600" />
                        System Architecture &amp; Stack
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        How all components connect and the exact justification for each library.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-6 shadow-sm">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-2">How The Flow Works:</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {topic.architectureExplanation}
                        </p>
                      </div>

                      {/* ASCII Diagram */}
                      {topic.architectureDiagram && (
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Flow Diagram:</span>
                          <pre className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-800 overflow-x-auto leading-relaxed shadow-xs">
                            {topic.architectureDiagram.trim()}
                          </pre>
                        </div>
                      )}

                      {/* Tech Stack Table */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900">Technology Stack &amp; Reasoning:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {topic.techStack?.map((tech, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1">
                              <span className="text-xs font-mono text-teal-700 font-bold uppercase tracking-wider">{tech.component}</span>
                              <p className="text-sm font-bold text-slate-900">{tech.tool}</p>
                              <p className="text-xs text-slate-600 leading-relaxed pt-1">{tech.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: DEPLOYMENT */}
                {activeTab === "deploy" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="border-b border-slate-200/80 pb-3">
                      <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-teal-600" />
                        Deployment &amp; Demo Setup
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Step-by-step instructions to run locally on your laptop and host on free cloud servers.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-5 shadow-sm">
                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-slate-900">How to Run Live on Your Laptop:</h3>
                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                          {topic.deploymentGuide || "Run the main application file using Python or Node.js as outlined in Step 1."}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 space-y-3">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Free Cloud Deployment Options:</h4>
                        <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                          <li><strong className="text-slate-900">Render.com:</strong> 100% free web service hosting for Python (Flask/FastAPI) and Node.js. Push code to GitHub and connect repository.</li>
                          <li><strong className="text-slate-900">HuggingFace Spaces:</strong> Best free platform for AI/ML and Streamlit apps with free CPU/GPU tier.</li>
                          <li><strong className="text-slate-900">Vercel:</strong> Best for FullStack React/Next.js frontends with instant CI/CD deployment.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 6: TROUBLESHOOTING */}
                {activeTab === "troubleshoot" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="border-b border-slate-200/80 pb-3">
                      <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-teal-600" />
                        Common Errors &amp; 1-Minute Fixes
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        The top errors students hit when building this project and how to solve them instantly.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {getTroubleshootingErrors(topic.category).map((item, idx) => (
                        <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm">
                          <div className="flex items-center gap-2 text-rose-600 text-sm font-bold font-mono">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            {item.error}
                          </div>
                          <p className="text-xs text-slate-600">
                            <strong className="text-slate-800">Why it happens:</strong> {item.cause}
                          </p>
                          <div className="bg-[#FDF6F2] border border-[#F3CFBF] rounded-xl p-3 text-xs text-[#18181B] font-mono shadow-xs font-semibold">
                            Fix: {item.fix}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 7: BLACK BOOK & PPT */}
                {activeTab === "deliverables" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="border-b border-slate-200/80 pb-3">
                      <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                        <Presentation className="w-5 h-5 text-teal-600" />
                        College Submission Deliverables (Black Book &amp; PPT)
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Recommended chapter structure for your project report and slide-by-slide presentation breakdown.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-6 shadow-sm">
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-teal-600" />
                          6-Chapter Black Book (Project Report) Structure:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {[
                            { ch: "Chapter 1", title: "Introduction & Motivation", pages: "8–10 pages", desc: "Problem statement, objectives, and scope." },
                            { ch: "Chapter 2", title: "Literature Survey", pages: "10–12 pages", desc: "Review of 5–8 published IEEE papers & research gap." },
                            { ch: "Chapter 3", title: "System Requirement & Analysis", pages: "8–10 pages", desc: "Hardware/software specifications, feasibility." },
                            { ch: "Chapter 4", title: "System Architecture & Design", pages: "12–15 pages", desc: "DFD diagrams, UML diagrams, algorithm flowcharts." },
                            { ch: "Chapter 5", title: "Implementation & Results", pages: "15–18 pages", desc: "Core algorithms, screenshots, accuracy graphs." },
                            { ch: "Chapter 6", title: "Conclusion & Future Scope", pages: "4–6 pages", desc: "Summary of achievements and next enhancements." },
                          ].map((c, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-1">
                              <div className="flex justify-between text-teal-800 font-mono font-bold">
                                <span>{c.ch}</span>
                                <span className="text-slate-500 font-normal">{c.pages}</span>
                              </div>
                              <p className="text-sm font-bold text-slate-900">{c.title}</p>
                              <p className="text-slate-500 text-[11px]">{c.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-slate-100">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <Presentation className="w-4 h-4 text-teal-600" />
                          12-Slide Final Presentation (PPT) Roadmap:
                        </h4>
                        <ol className="text-xs text-slate-600 space-y-1.5 list-decimal pl-5 leading-relaxed">
                          <li><strong className="text-slate-800">Slide 1:</strong> Title Slide (Project Title, Team Members, Guide Name, College Logo)</li>
                          <li><strong className="text-slate-800">Slide 2:</strong> Problem Statement (What real-world pain are you solving?)</li>
                          <li><strong className="text-slate-800">Slide 3:</strong> Existing Systems vs Proposed System (Comparison table)</li>
                          <li><strong className="text-slate-800">Slide 4:</strong> Objectives & Scope (Clear measurable bullet points)</li>
                          <li><strong className="text-slate-800">Slide 5:</strong> System Architecture (Clear visual block diagram)</li>
                          <li><strong className="text-slate-800">Slide 6:</strong> Tech Stack & Tools (Why each framework was chosen)</li>
                          <li><strong className="text-slate-800">Slide 7:</strong> Algorithm & Math Flow (CNN, TF-IDF, Random Forest, etc.)</li>
                          <li><strong className="text-slate-800">Slide 8:</strong> Dataset Overview (Source, size, preprocessing steps)</li>
                          <li><strong className="text-slate-800">Slide 9:</strong> Live Demo / Working Screenshots (Proof that it works)</li>
                          <li><strong className="text-slate-800">Slide 10:</strong> Results & Performance (Accuracy %, confusion matrix, latency)</li>
                          <li><strong className="text-slate-800">Slide 11:</strong> Future Scope & Commercial Potential (What could be added next)</li>
                          <li><strong className="text-slate-800">Slide 12:</strong> Conclusion & Q&A (Thanking the committee)</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* ══════════════════════════════════════════════════════════
                 LOCKED STATE: FREE HIGH-VALUE TEASER + PSYCHOLOGICAL HOOKS
              ══════════════════════════════════════════════════════════ */
              <div className="space-y-8">

                {/* Section: What this project does */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-sm">
                  <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-600" /> What This Project Does
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{topic.whatItDoes}</p>
                </section>

                {/* Section: Real-World Use */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-sm">
                  <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-600" /> Where This Is Used in Real Life
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{topic.realWorldUse}</p>
                </section>

                {/* Section: Why This Project is Surprisingly Easy to Build */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-600" />
                      Why This Project is Surprisingly Easy to Build
                    </h2>
                    <span className="text-[11px] text-teal-800 font-bold px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200">
                      Beginner Friendly
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Many students think this topic requires months of coding and advanced AI theory. In reality, modern frameworks have made it straightforward:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
                        <CheckCircle className="w-3.5 h-3.5" /> Pre-Trained Weights Do 90% of the Work
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        You do not need to train a model from scratch. Standard libraries (like OpenCV, PyTorch, HuggingFace, or Scikit-learn) already have pre-trained models. You only write the pipeline to feed your data.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-slate-800 text-xs font-bold">
                        <Terminal className="w-3.5 h-3.5 text-teal-600" /> Under 200 Lines of Core Logic
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The actual decision-making engine is compact and clean. It is structured into 3 modular files, making it easy to explain line-by-line in front of your project guide.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-teal-800 text-xs font-bold">
                        <Cpu className="w-3.5 h-3.5 text-teal-600" /> Runs on Basic Student Laptops
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        No expensive cloud GPU or Nvidia graphics card required. The entire workflow is optimized to train and run smoothly on any standard laptop with 4GB to 8GB of RAM.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-slate-800 text-xs font-bold">
                        <Layers className="w-3.5 h-3.5 text-teal-600" /> Zero Complex Calculus Needed
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        You only need standard Python programming (functions, conditionals, and dictionaries). The mathematical matrix operations are handled internally by the libraries.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section: Complete System Architecture & Data Flow */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-teal-600" />
                      Complete Project Data Flow &amp; Modules
                    </h2>
                    <span className="text-[11px] text-slate-700 font-mono font-bold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">End-to-End Pipeline</span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Here is the exact step-by-step pipeline that runs when someone interacts with your completed system:
                  </p>

                  <div className="space-y-2.5">
                    {[
                      {
                        step: "Phase 1: Input Ingestion",
                        desc: "The system receives raw input data (webcam video frame, uploaded image, CSV record, or user form payload).",
                        tag: "Input Layer"
                      },
                      {
                        step: "Phase 2: Preprocessing & Normalization",
                        desc: "Raw data is filtered, resized/normalized, and converted into standard numerical tensors that the model can process.",
                        tag: "Cleaning"
                      },
                      {
                        step: "Phase 3: Core Algorithm / ML Inference",
                        desc: "The pre-trained model extracts feature patterns, computes similarity or probability weights, and outputs a confidence score.",
                        tag: "Core Engine"
                      },
                      {
                        step: "Phase 4: Output & Interactive Dashboard",
                        desc: "The result is displayed on a clean web interface (Streamlit / Flask / Next.js) with visual charts, alerts, and automatic database logging.",
                        tag: "Presentation"
                      }
                    ].map((phase, pIdx) => (
                      <div key={pIdx} className="bg-slate-50 rounded-xl border border-slate-200/80 p-3.5 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-md bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          0{pIdx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <strong className="text-slate-900 text-xs font-bold">{phase.step}</strong>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 font-mono">{phase.tag}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{phase.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section: Expected Results & Performance Benchmarks */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#E55729]" />
                      Expected Performance &amp; Results
                    </h2>
                    <span className="text-[11px] text-slate-500 font-medium">Evaluation Targets</span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    These are standard, realistic metrics you can report in your Black Book (project report) and presentation slides:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {getTopicMetrics(topic.category).map((metric, mIdx) => (
                      <div key={mIdx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-center">
                        <span className="text-[11px] text-slate-500 font-medium block">{metric.label}</span>
                        <p className={`text-xl font-display font-extrabold mt-1 ${metric.color}`}>{metric.value}</p>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{metric.sub}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Hook 3: Build Steps Cutoff */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-[#E55729]" />
                      <h2 className="text-lg font-display font-bold text-slate-900">Step-by-Step Build Guide</h2>
                    </div>
                    <span className="text-[11px] text-slate-700 font-mono font-bold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">Complete Roadmap</span>
                  </div>

                  <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider font-mono">Step 1 of 8</span>
                    <p className="font-bold text-slate-900 text-sm">{topic.freeStep1Title}</p>
                  </div>

                  {[2, 3, 4].map((step) => (
                    <div key={step} className="bg-slate-50/60 rounded-xl border border-slate-200/60 p-4 flex items-center gap-3">
                      <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Step {step} of 8</span>
                        <p className="text-slate-400 text-xs blur-[3px] select-none">
                          This step contains detailed architecture baby steps, terminal commands, and Antigravity Zero-Code prompt instructions.
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="text-center pt-2">
                    <p className="text-xs text-slate-500 font-medium">
                      🔓 All 8+ steps with {buildInfo.canBuild ? "Antigravity Master Prompt" : "verified implementation code"}, architecture flow, and evaluator Q&amp;A — free to access
                    </p>
                  </div>
                </section>

                {/* Dataset Preview */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#E55729]" />
                    <h2 className="text-lg font-display font-bold text-slate-900">Dataset Guide</h2>
                  </div>
                  <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-4 space-y-2">
                    <span className="text-xs text-slate-500 font-semibold">Dataset name:</span>
                    <p className="font-bold text-slate-900 text-sm">{topic.datasetName}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <p className="text-slate-500 text-xs">
                        Direct download link, backup dataset, and 80/20 train-test split script — free with every blueprint
                      </p>
                    </div>
                  </div>
                </section>

                {/* Urgency Hook */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex gap-3.5 shadow-xs">
                  <span className="text-[#E55729] text-xl shrink-0">⏰</span>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                    Final year deadlines are approaching fast. Every day you wait is one less day to test your project, fix bugs, and master your evaluator defense.
                  </p>
                </div>

              </div>
            )}

          </div>

          {/* ── RIGHT COLUMN: STICKY CHECKOUT & RE-ACCESS CARD ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">

                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#18181B] font-bold text-sm">
                      <CheckCircle className="w-4 h-4 text-[#E55729]" />
                      Blueprint Free Access
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadPdf()}
                    disabled={pdfLoading}
                    className="w-full py-3.5 bg-[#18181B] hover:bg-[#27272A] text-white font-bold rounded-xl transition-all shadow-md shadow-zinc-900/10 disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
                  >
                    {pdfLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Preparing Document…</>
                    ) : (
                      <><FileDown className="w-4 h-4" /> {isFaceRecognition ? "Download Blueprint (PDF)" : "Download Blueprint (.docx)"}</>
                    )}
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="w-full py-2.5 bg-white hover:bg-[#FAF6EE] text-[#18181B] font-bold rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2 text-xs no-print"
                    title="Print or Save complete blueprint as PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#E55729]" /> Save as PDF / Print View
                  </button>
                  <p className="text-xs text-slate-500 text-center leading-relaxed">
                    Document includes {buildInfo.canBuild ? "Antigravity Master Prompt" : "verified source code guide"}, conceptual baby steps, architecture diagrams, evaluator scoring pack, and Black Book template.
                  </p>

                  <a
                    href={`https://wa.me/918799814256?text=${encodeURIComponent(`Hi SubmitKit! I have downloaded the blueprint for: ${topic.title} and would like project assistance.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#FDF6F2] border border-[#F3CFBF] text-[#E55729] text-xs font-semibold hover:bg-[#FAEDE5] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#E55729]" /> Chat with Project Guide
                  </a>

                  {/* Cross-Sell Card to Full Projects */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-2.5 mt-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <Sparkles className="w-3.5 h-3.5 text-[#E55729]" />
                      Want the full working project?
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Get complete tested source code, full Black Book report, PPT slides, and installation walkthrough ready to submit.
                    </p>
                    <Link
                      href={isProjectAvailable(topic.id) ? `/projects/${topic.id}` : "/projects"}
                      className="block w-full text-center py-2 bg-[#E55729] hover:bg-[#CB451A] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                    >
                      {isProjectAvailable(topic.id) ? "Get Full Project Kit (Mini ₹299 / Major ₹499) →" : "Explore Ready Kits (₹299 / ₹499) →"}
                    </Link>
                    <Link
                      href={`/custom?topic=${encodeURIComponent(topic.title)}`}
                      className="block w-full text-center py-2 mt-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                    >
                      Build This Idea With Us (Starts ₹1,999) ↗
                    </Link>
                  </div>
                </div>

            </div>
          </div>

        </div>

        {/* ── RELATED TOPICS SECTION ── */}
        {relatedTopics.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E55729]" />
                  Related {topic.category} Project Blueprints
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Explore other examiner-approved topics in the same domain.
                </p>
              </div>
              <Link
                href={`/blueprint`}
                className="text-xs text-[#E55729] hover:text-[#CB451A] font-semibold flex items-center gap-1"
              >
                View all topics <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTopics.map((rel) => {
                const relBuild = getAntigravityBuildInfo(rel);
                return (
                  <Link
                    key={rel.id}
                    href={`/blueprint/${rel.id}`}
                    className="group bg-white hover:bg-[#FAF5EE] border border-slate-200/90 hover:border-[#F3CFBF] rounded-2xl p-5 transition-all duration-150 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200 bg-slate-100 text-slate-700 uppercase tracking-wider">
                          {rel.category}
                        </span>
                        {rel.trending && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <Flame className="w-3 h-3 text-amber-600" /> Trending
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#E55729] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {rel.tagline}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 text-[#CB451A] font-semibold">
                        <CheckCircle className="w-3 h-3 text-[#E55729]" /> {relBuild.canBuild ? "1-Prompt AI" : "Full Guide"}
                      </span>
                      <span className="text-[#E55729] font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                        View Blueprint →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>


    </div>
  );
}

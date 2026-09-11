"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, Lock, Clock, Star, AlertTriangle, ChevronRight,
  Mic, Wrench, Database, Cpu, FileDown, CheckCircle, XCircle, Loader2,
  Copy, Check, ExternalLink, Terminal, ShieldAlert, BookOpen, Layers,
  Presentation, FileText, Sparkles, HelpCircle, Flame,
  Share2, Mail, MessageCircle, KeyRound, ShieldCheck
} from "lucide-react";
import { FullBlueprint, generateAntigravityMasterPrompt, canBuildOnAntigravity, getAntigravityBuildInfo, getRelatedTopics } from "@/lib/blueprint-engine";

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
      { label: 'API Response Time', value: '< 200ms', sub: 'p95 latency', color: 'text-emerald-400' },
      { label: 'Lighthouse Score',  value: '> 95',    sub: 'Performance', color: 'text-brand-400' },
      { label: 'Uptime Target',     value: '99.9%',   sub: 'SLA goal',    color: 'text-purple-400' },
    ];
  }
  if (category === 'Blockchain') {
    return [
      { label: 'Block Confirmation', value: '< 3s',     sub: 'Avg tx time',     color: 'text-emerald-400' },
      { label: 'Gas Efficiency',     value: '~21,000',  sub: 'Gas units (ETH)', color: 'text-brand-400' },
      { label: 'Contract Uptime',    value: '99.9%',    sub: 'On-chain',         color: 'text-purple-400' },
    ];
  }
  if (category === 'IoT') {
    return [
      { label: 'Sensor Latency', value: '< 100ms',  sub: 'Real-time data',   color: 'text-emerald-400' },
      { label: 'Battery Life',   value: '> 24hr',   sub: 'ESP32 optimized',  color: 'text-brand-400' },
      { label: 'Packet Loss',    value: '< 0.5%',   sub: 'MQTT reliability', color: 'text-purple-400' },
    ];
  }
  if (category === 'Cybersecurity') {
    return [
      { label: 'Detection Rate',  value: '99.5%', sub: 'True positive rate', color: 'text-emerald-400' },
      { label: 'False Positives', value: '< 2%',  sub: 'Precision',          color: 'text-brand-400' },
      { label: 'Scan Speed',      value: '< 5s',  sub: 'Per target host',    color: 'text-purple-400' },
    ];
  }
  if (category === 'NLP') {
    return [
      { label: 'BLEU Score',    value: '≥ 0.82',    sub: 'Translation quality', color: 'text-emerald-400' },
      { label: 'Response Time', value: '< 120ms',   sub: 'Inference speed',     color: 'text-brand-400' },
      { label: 'Accuracy',      value: '91% – 96%', sub: 'Classification',       color: 'text-purple-400' },
    ];
  }
  if (category === 'Fintech' || category === 'DataScience') {
    return [
      { label: 'Model Accuracy', value: '90% – 97%', sub: 'On test split',    color: 'text-emerald-400' },
      { label: 'F1 Score',       value: '≥ 0.89',    sub: 'Balanced metric',  color: 'text-brand-400' },
      { label: 'Dataset Split',  value: '80 / 20',   sub: 'Train / Test',     color: 'text-purple-400' },
    ];
  }
  // Default: AIML
  return [
    { label: 'Model Accuracy / F1', value: '92% – 98%', sub: 'On standard test split', color: 'text-emerald-400' },
    { label: 'Inference Speed',     value: '< 45ms',    sub: 'Real-time response',     color: 'text-brand-400' },
    { label: 'Dataset Split',       value: '80 / 20',   sub: 'Train / Test ratio',     color: 'text-purple-400' },
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
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  // Dual-Key Instant Re-access (Email + Phone, Zero Email/OTP)
  const [checkEmail, setCheckEmail] = useState("");
  const [checkPhone, setCheckPhone] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [downloadStats, setDownloadStats] = useState<{ downloads: number; maxDownloads: number } | null>(null);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("antigravity");
  const [payError, setPayError] = useState<string | null>(null);
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

  // Check saved device access token for passwordless instant unlock
  useEffect(() => {
    try {
      const savedToken = typeof window !== "undefined" ? localStorage.getItem(`submitkit_bp_token_${topic.id}`) : null;
      if (savedToken) {
        fetch("/api/blueprint/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topicId: topic.id, accessToken: savedToken }),
        })
          .then((r) => r.json())
          .then((d) => {
            if (d && d.hasPaid) {
              if (d.email) setEmail(d.email);
              if (typeof d.downloads === "number") {
                setDownloadStats({ downloads: d.downloads, maxDownloads: d.maxDownloads || 5 });
              }
              setUnlocked(true);
            }
          })
          .catch(() => {});
      }
    } catch {}
  }, [topic.id]);

  const handlePay = async () => {
    setPayError(null);
    if (!email || !phone) {
      setPayError("Please enter your email and phone number.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setPayError("Please enter a valid email address.");
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setPayError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      // 1. Create order
      const orderRes = await fetch("/api/blueprint/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: topic.id,
          topicTitle: topic.title,
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.orderId) {
        setPayError("Failed to create order. Please try again or contact support.");
        setLoading(false);
        return;
      }

      // 2. Open Razorpay
      const openRazorpay = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.amount || 1900,
          currency: "INR",
          name: "SubmitKit",
          description: `Project Blueprint: ${topic.title}`,
          order_id: orderData.orderId,
          prefill: { email, contact: phone },
          theme: { color: "#6366f1" },
          handler: async (response: any) => {
            // 3. Verify payment
            try {
              const verifyRes = await fetch("/api/blueprint/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                try {
                  localStorage.setItem("submitkit_user_email", email.trim().toLowerCase());
                  if (verifyData.accessToken) {
                    localStorage.setItem(`submitkit_bp_token_${topic.id}`, verifyData.accessToken);
                  }
                } catch {}
                setUnlocked(true);
                setLoading(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                setPayError(verifyData.error || "Payment verification failed. Please contact support on WhatsApp.");
                setLoading(false);
              }
            } catch {
              setPayError("Payment verification failed. Please contact support on WhatsApp.");
              setLoading(false);
            }
          },
          modal: {
            ondismiss: () => setLoading(false),
          },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };

      if ((window as any).Razorpay) {
        openRazorpay();
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => openRazorpay();
        script.onerror = () => {
          setPayError("Failed to load payment gateway. Please check your internet connection.");
          setLoading(false);
        };
        document.body.appendChild(script);
      }
    } catch (err: any) {
      console.error(err);
      setPayError(err?.message ? `Network error: ${err.message}. Ensure dev server is running.` : "Something went wrong. Please try again or contact support.");
      setLoading(false);
    }
  };

  const checkoutCardRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    if (unlocked) return;

    const updateVisibility = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const pastHero = scrollY > 300;

      let checkoutInView = false;
      if (checkoutCardRef.current) {
        const rect = checkoutCardRef.current.getBoundingClientRect();
        checkoutInView = rect.top < window.innerHeight && rect.bottom > 0;
      }

      setShowStickyBar(pastHero && !checkoutInView);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [unlocked]);

  const handleStickyCtaClick = () => {
    if (email && phone && !payError) {
      handlePay();
    } else {
      if (checkoutCardRef.current) {
        checkoutCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = checkoutCardRef.current.querySelector('input[type="email"]') as HTMLInputElement | null;
        if (input) input.focus();
      }
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = `Check out this "${topic.title}" project blueprint on SubmitKit! Free preview + step-by-step guide 🚀`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`, "_blank");
  };

  const handleRestoreAccess = async () => {
    const targetEmail = checkEmail.trim().toLowerCase();
    const cleanPhone = checkPhone.replace(/\D/g, "").slice(-10);

    if (!targetEmail) {
      setCheckError("Please enter your registered purchase email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(targetEmail)) {
      setCheckError("Please enter a valid email address.");
      return;
    }
    if (!cleanPhone || cleanPhone.length !== 10) {
      setCheckError("Please enter your registered 10-digit phone number.");
      return;
    }

    setCheckLoading(true);
    setCheckError(null);
    try {
      const res = await fetch("/api/blueprint/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: topic.id,
          email: targetEmail,
          phone: cleanPhone,
        }),
      });
      const data = await res.json();
      if (data.hasPaid && data.accessToken) {
        try {
          localStorage.setItem(`submitkit_bp_token_${topic.id}`, data.accessToken);
          localStorage.setItem("submitkit_user_email", data.email);
        } catch {}
        setEmail(data.email);
        if (typeof data.downloads === "number") {
          setDownloadStats({ downloads: data.downloads, maxDownloads: data.maxDownloads || 5 });
        }
        setUnlocked(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setCheckError(data.error || "No purchase found matching this email and phone number.");
      }
    } catch {
      setCheckError("Verification failed. Please check your internet connection.");
    }
    setCheckLoading(false);
  };

  const handleDownloadPdf = async () => {
    if (downloadStats && downloadStats.downloads >= downloadStats.maxDownloads) {
      setPayError(`Download limit reached (${downloadStats.maxDownloads}/${downloadStats.maxDownloads} downloads used). Contact support on WhatsApp if you need more.`);
      return;
    }
    setPdfLoading(true);
    try {
      const res = await fetch(
        `/api/blueprint/pdf?topicId=${topic.id}&email=${encodeURIComponent(email || checkEmail)}`,
        { method: "GET" }
      );
      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.error || "PDF generation failed");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SubmitKit-Blueprint-${topic.id}.docx`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloadStats((prev) =>
        prev ? { ...prev, downloads: Math.min(prev.downloads + 1, prev.maxDownloads) } : { downloads: 1, maxDownloads: 5 }
      );
    } catch (err: any) {
      setPayError(err?.message || "Failed to generate the document. Please try again or contact support.");
    }
    setPdfLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-hidden page-enter">
      {/* Background glow orbs matching SubmitKit */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[800px] h-[800px] bg-brand-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="glow-orb w-[600px] h-[600px] bg-emerald-500/8 bottom-0 right-0" />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-sm relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blueprint" className="hover:text-white transition-colors">Blueprints</Link>
            <span>/</span>
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">{topic.title}</span>
          </div>

          <Link
            href="/blueprint"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Topics
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10 relative z-10">

        {/* ── UNLOCKED BANNER ── */}
        {unlocked && (
          <div className="glass-card rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-6 md:p-8 space-y-5 text-center shadow-2xl relative overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div className="space-y-1.5 max-w-xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-white">
                Full Blueprint Unlocked!
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                You have lifetime access to the complete build plan, source code guide, dataset setup, and evaluator scoring defense.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDownloadPdf}
                disabled={pdfLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] disabled:opacity-60 text-sm"
              >
                {pdfLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating Document…</>
                ) : (
                  <><FileDown className="w-4 h-4" /> Download Official 20-Page Blueprint (DOCX / PDF)</>
                )}
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/20 transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share with Classmates
              </button>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs text-zinc-500">
                Purchased for: <span className="text-zinc-300 font-mono">{email || checkEmail}</span> • Lifetime access, re-download anytime.
              </p>
              <p className="text-xs text-emerald-500 flex items-center justify-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                A confirmation email has been sent to your inbox.
              </p>
            </div>
          </div>
        )}

        {/* ── HEADER HERO ── */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="px-3 py-1 text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20 rounded-full uppercase tracking-wider">
              {topic.category}
            </span>
            {topic.trending && (
              <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-orange-500/15 text-orange-400 border border-orange-500/25 rounded-full">
                <Flame className="w-3.5 h-3.5" /> Trending Project
              </span>
            )}
            <span className="text-xs text-emerald-400 font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              Approved by Examiners
            </span>
            {buildInfo.canBuild ? (
              <span className="flex items-center gap-1.5 px-3 py-0.5 text-xs font-black bg-gradient-to-r from-emerald-500/20 via-brand-500/20 to-purple-500/20 text-emerald-300 border border-emerald-500/40 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.25)] animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                ⚡ 100% BUILDABLE IN ANTIGRAVITY WITHOUT CODING
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-0.5 text-xs font-semibold bg-zinc-800/80 text-zinc-300 border border-white/10 rounded-full">
                {buildInfo.badgeText}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            {topic.title}
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            {topic.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-zinc-400 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-400" />
              <span>Build time: <strong className="text-white">{topic.buildTimeDays}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Examiner Difficulty:</span>
              <span className="flex gap-0.5">
                {difficultyStars.map((filled, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${filled ? "text-amber-400 fill-amber-400" : "text-zinc-700"}`}
                  />
                ))}
              </span>
            </div>
            <button
              onClick={handleShare}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>

        {/* ── TIME-SAVER HOOK BANNER: MAKE THIS COMPLETE PROJECT IN ONE PROMPT ── */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-brand-500/40 bg-gradient-to-r from-brand-950/90 via-purple-950/70 to-zinc-900 p-6 md:p-8 shadow-2xl backdrop-blur-2xl">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-500/25 border border-brand-500/50 text-white text-xs font-black tracking-wider uppercase shadow-lg shadow-brand-500/20">
                  <Sparkles className="w-4 h-4 text-brand-300 animate-pulse" />
                  {buildInfo.canBuild ? "🚀 MAKE THIS COMPLETE PROJECT IN ONE PROMPT" : `🛠️ ${buildInfo.badgeText.toUpperCase()}`}
                </span>
                <span className="px-3 py-1 text-xs font-extrabold text-emerald-300 bg-emerald-500/20 border border-emerald-500/35 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  {buildInfo.pillBadgeText}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight leading-snug">
                {buildInfo.hookHeadline}
              </h2>

              <p className="text-sm md:text-base text-zinc-200 leading-relaxed font-normal">
                {buildInfo.hookSubtext}
              </p>

              {/* 3 Quick Benefit Pills so user understands everything */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                {buildInfo.benefitPills.map((pill, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-zinc-300 flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 shrink-0 ${pill.color}`} />
                    <span><strong>{pill.title}:</strong> {pill.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
              {unlocked ? (
                <button
                  onClick={() => {
                    setActiveTab("antigravity");
                    window.scrollTo({ top: 440, behavior: "smooth" });
                  }}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:brightness-110 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-brand-500/30 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5" /> View Project Blueprint & Code
                </button>
              ) : (
                <button
                  onClick={() => {
                    const checkoutEl = document.querySelector('input[type="email"]');
                    if (checkoutEl) {
                      checkoutEl.scrollIntoView({ behavior: "smooth", block: "center" });
                      (checkoutEl as HTMLInputElement).focus();
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-emerald-500 via-brand-600 to-indigo-600 hover:brightness-110 text-white font-black text-sm rounded-2xl shadow-2xl shadow-emerald-500/25 transition-all hover:scale-[1.02] uppercase tracking-wider"
                >
                  <Sparkles className="w-5 h-5" /> {buildInfo.canBuild ? "Unlock 1-Prompt Blueprint — ₹19" : "Unlock Complete Blueprint — ₹19"}
                </button>
              )}
              <p className="text-[11px] text-zinc-400 text-center font-medium">
                {buildInfo.canBuild ? "⚡ 10-minute setup • Verified by college project guides" : "⚡ Complete verified build plan • 100% examiner approved"}
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CONTENT GRID
        ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ── LEFT COLUMN: EITHER UNLOCKED FULL GUIDE OR FREE TEASER ── */}
          <div className="lg:col-span-2 space-y-8">

            {unlocked ? (
              /* ══════════════════════════════════════════════════════════
                 UNLOCKED STATE: COMPLETE BUILD PROCESS & STEP-BY-STEP
              ══════════════════════════════════════════════════════════ */
              <div className="space-y-8">
                
                {/* Navigation Pills — horizontally scrollable on mobile */}
                <div className="flex gap-2 p-1.5 bg-zinc-900/80 border border-white/10 rounded-2xl backdrop-blur-md overflow-x-auto scrollbar-hide">
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
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as ActiveTab)}
                        className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                          activeTab === tab.id
                            ? "bg-brand-600 text-white shadow-md shadow-brand-500/20 font-bold"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* TAB 0: BUILD GUIDE */}
                {activeTab === "antigravity" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="border-b border-white/10 pb-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                            {buildInfo.canBuild ? (
                              <Sparkles className="w-5 h-5 text-brand-400" />
                            ) : (
                              <Cpu className="w-5 h-5 text-brand-400" />
                            )}
                            {buildInfo.tab0Title}
                          </h2>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            {buildInfo.tab0Sub}
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(masterPrompt, 9999)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                        >
                          {copiedIndex === 9999 ? (
                            <><Check className="w-3.5 h-3.5 text-emerald-300" /> Copied!</>
                          ) : (
                            <><Copy className="w-3.5 h-3.5" /> {buildInfo.copyButtonText}</>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 3-Step Baby-Step Workflow */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {buildInfo.workflowSteps.map((step) => (
                        <div key={step.step} className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 space-y-2">
                          <div className={`flex items-center gap-2 font-bold text-xs ${step.color}`}>
                            <span className="w-6 h-6 rounded-md bg-white/5 border border-white/15 flex items-center justify-center font-mono text-xs">{step.step}</span>
                            {step.title}
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Master Prompt Box */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-brand-400" />
                          {buildInfo.promptBoxTitle}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          {masterPrompt.length} characters • Ready to use
                        </span>
                      </div>

                      <div className="relative group">
                        <pre className="bg-black/90 border border-zinc-800 rounded-2xl p-5 font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed max-h-[420px] whitespace-pre-wrap select-all">
                          {masterPrompt}
                        </pre>
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => copyToClipboard(masterPrompt, 9999)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-lg text-xs font-medium border border-white/10 backdrop-blur-md transition-all"
                          >
                            {copiedIndex === 9999 ? (
                              <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!</>
                            ) : (
                              <><Copy className="w-3.5 h-3.5" /> Copy</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Creative Freedom & Base MVP Callout */}
                    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-zinc-900 to-amber-950/20 p-5 space-y-2 text-xs text-amber-200 shadow-xl">
                      <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        Base MVP Foundation & Complete Creative Freedom
                      </div>
                      <p className="text-zinc-300 leading-relaxed text-xs">
                        <strong>Important Note:</strong> This Master Prompt generates a complete, fully working <strong>Base MVP (Minimum Viable Product)</strong> of your project right out of the box. Use this as your solid operational foundation! As per your personal creativity and college project guidelines, you can freely update, refine, and customize the system whenever you want simply by asking the AI (e.g. <em>&ldquo;Add dark/light theme switch&rdquo;</em>, <em>&ldquo;Export records as Excel / PDF&rdquo;</em>, or <em>&ldquo;Integrate email alerts&rdquo;</em>). You have complete freedom to make it uniquely yours!
                      </p>
                    </div>

                    {/* Why this master prompt works */}
                    <div className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Why This Master Prompt Produces Working Code On First Try:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 space-y-1">
                          <strong className="text-white block font-semibold">Includes Synthetic Data Generator</strong>
                          <p className="text-zinc-400 leading-relaxed">
                            Instructs the AI to generate a standalone data script so your project works right out of the box without needing 2GB dataset downloads.
                          </p>
                        </div>
                        <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 space-y-1">
                          <strong className="text-white block font-semibold">Strict No-Placeholder Rule</strong>
                          <p className="text-zinc-400 leading-relaxed">
                            Forbids lazy comments like &ldquo;// implement here&rdquo;. Demands complete, line-by-line execution logic.
                          </p>
                        </div>
                        <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 space-y-1">
                          <strong className="text-white block font-semibold">Modern Responsive Dashboard</strong>
                          <p className="text-zinc-400 leading-relaxed">
                            Mandates a dark-mode interactive UI with live metrics and real-time visualization that impresses college evaluators.
                          </p>
                        </div>
                        <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 space-y-1">
                          <strong className="text-white block font-semibold">Built-in Automated Tests</strong>
                          <p className="text-zinc-400 leading-relaxed">
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
                    <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
                      <div>
                        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                          <Wrench className="w-5 h-5 text-brand-400" />
                          Step-by-Step Implementation Guide
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Follow these {topic.buildSteps?.length || 0} clear conceptual baby steps from environment setup to live demo.
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300">
                        100% Theory & Architecture • Zero Code Clutter
                      </span>
                    </div>

                    <div className="space-y-5">
                      {topic.buildSteps && topic.buildSteps.length > 0 ? (
                        topic.buildSteps.map((step, idx) => {
                          const babySteps = deriveConceptualSteps(step.title);
                          return (
                            <div key={idx} className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-5 md:p-6 space-y-4">
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-7 h-7 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-400 font-bold text-xs flex items-center justify-center font-mono">
                                    {step.step}
                                  </span>
                                  <h3 className="text-base font-display font-bold text-white">
                                    {step.title}
                                  </h3>
                                </div>
                                <span className="text-xs text-zinc-400 flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-zinc-500" /> {step.duration}
                                </span>
                              </div>

                              <p className="text-sm text-zinc-300 leading-relaxed">
                                {step.description}
                              </p>

                              {/* Conceptual Baby Steps Breakdown */}
                              <div className="space-y-2 bg-zinc-950/60 border border-white/5 rounded-xl p-4">
                                <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider block">
                                  Detailed Implementation Mechanics:
                                </span>
                                <ul className="space-y-2 text-xs text-zinc-300">
                                  {babySteps.map((bStep, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-2.5">
                                      <span className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
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
                                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Terminal Commands:</span>
                                  <div className="bg-black/80 border border-zinc-800 rounded-xl p-3.5 font-mono text-xs text-emerald-400 space-y-1 overflow-x-auto">
                                    {step.commands.map((cmd, cIdx) => (
                                      <div key={cIdx} className="flex items-center justify-between gap-2">
                                        <span>$ {cmd}</span>
                                        <button
                                          onClick={() => copyToClipboard(cmd, idx * 100 + cIdx)}
                                          className="text-zinc-500 hover:text-white p-1"
                                          title="Copy command"
                                        >
                                          {copiedIndex === idx * 100 + cIdx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Expected Output */}
                              {step.expectedOutput && (
                                <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-3 text-xs text-zinc-300 flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                  <div>
                                    <strong className="text-emerald-400 font-semibold block">Expected Output & Verification:</strong>
                                    <span>{step.expectedOutput}</span>
                                  </div>
                                </div>
                              )}

                              {/* Zero-Code Antigravity Callout */}
                              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200">
                                <span className="flex items-center gap-2">
                                  <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                  <span>Build this step without code in seconds using the Antigravity Master Prompt.</span>
                                </span>
                                <button
                                  onClick={() => setActiveTab("antigravity")}
                                  className="text-xs font-bold text-purple-300 hover:text-white underline shrink-0 ml-2"
                                >
                                  View Master Prompt →
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-zinc-400">No build steps defined for this preview.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: DATASET MASTER GUIDE */}
                {activeTab === "dataset" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                        <Database className="w-5 h-5 text-emerald-400" />
                        Dataset & Data Collection Master Guide
                      </h2>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Where to get clean training data, how to structure it, and how to preprocess it.
                      </p>
                    </div>

                    <div className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-4">
                          <span className="text-xs text-zinc-500 font-medium block mb-1">Recommended Dataset</span>
                          <p className="text-sm font-bold text-white">{topic.dataset?.name || topic.datasetName}</p>
                          <p className="text-xs text-zinc-400 mt-1">{topic.dataset?.size} • {topic.dataset?.format}</p>
                        </div>
                        <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-4">
                          <span className="text-xs text-zinc-500 font-medium block mb-1">Download Link</span>
                          {topic.dataset?.url ? (
                            <a
                              href={topic.dataset.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 break-all"
                            >
                              Direct Dataset Source <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          ) : (
                            <p className="text-xs text-zinc-400">See folder instructions</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-white">How to Collect & Set Up the Data:</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {topic.dataset?.description || "Collect data into the designated raw data folder and ensure consistent file naming."}
                        </p>
                      </div>

                      {topic.dataset?.backupDataset && (
                        <div className="rounded-xl bg-blue-500/5 border border-blue-500/15 p-4 text-xs space-y-1">
                          <strong className="text-brand-400 font-semibold block">Backup / Alternative Dataset:</strong>
                          <p className="text-zinc-300">{topic.dataset.backupDataset}</p>
                          {topic.dataset.backupUrl && (
                            <a
                              href={topic.dataset.backupUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-400 hover:underline inline-flex items-center gap-1 mt-1"
                            >
                              Alternative Link <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}

                      {/* Recommended Folder Structure */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-sm font-bold text-white">Standard Directory Structure:</h4>
                        <pre className="bg-black/80 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-400 overflow-x-auto">
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
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                        <Mic className="w-5 h-5 text-purple-400" />
                        System Understanding & Defense Mastery (Easy to Understand)
                      </h2>
                      <p className="text-xs text-zinc-400 mt-0.5">
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
                            <div key={qIdx} className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-5 md:p-6 space-y-4">
                              <div className="flex items-start gap-3">
                                <span className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  0{qIdx + 1}
                                </span>
                                <div>
                                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block font-mono">Core System Concept:</span>
                                  <h3 className="text-base font-display font-bold text-white leading-snug">
                                    {conceptTitle}
                                  </h3>
                                </div>
                              </div>

                              {/* Plain English explanation */}
                              <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 text-xs space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                                    <CheckCircle className="w-3.5 h-3.5" /> Plain-English Explanation:
                                  </span>
                                  <button
                                    onClick={() => copyToClipboard(qa.perfectAnswer, 500 + qIdx)}
                                    className="text-zinc-400 hover:text-white"
                                    title="Copy explanation"
                                  >
                                    {copiedIndex === 500 + qIdx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                                <p className="text-zinc-200 leading-relaxed text-sm">
                                  "{qa.perfectAnswer}"
                                </p>
                              </div>

                              {/* Why this matters in the architecture */}
                              <div className="rounded-xl bg-zinc-950/60 border border-white/5 p-3.5 text-xs">
                                <span className="text-zinc-500 font-semibold block mb-0.5">Why This Matters in the Architecture:</span>
                                <p className="text-zinc-300">{qa.whyAsked}</p>
                              </div>

                              {/* Evaluator Scoring Edge / Pro Tip */}
                              {qa.avoidSaying && (
                                <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-3.5 text-xs text-amber-200 flex items-start gap-2.5">
                                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                  <div>
                                    <strong className="text-amber-300 font-bold block">💡 Evaluator Scoring Edge & Key Insight:</strong>
                                    <span className="text-zinc-300 leading-relaxed">
                                      {qa.avoidSaying.replace(/^(Do not say\s*"?|Trap:\s*"?)/i, "Always highlight that: ")}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-zinc-400">System defense concepts loading...</p>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 4: ARCHITECTURE */}
                {activeTab === "architecture" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-brand-400" />
                        System Architecture & Stack
                      </h2>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        How all components connect and the exact justification for each library.
                      </p>
                    </div>

                    <div className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-2">How The Flow Works:</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {topic.architectureExplanation}
                        </p>
                      </div>

                      {/* ASCII Diagram */}
                      {topic.architectureDiagram && (
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">System Flow Diagram:</span>
                          <pre className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-brand-300 overflow-x-auto leading-relaxed">
                            {topic.architectureDiagram.trim()}
                          </pre>
                        </div>
                      )}

                      {/* Tech Stack Table */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-white">Technology Stack & Reasoning:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {topic.techStack?.map((tech, idx) => (
                            <div key={idx} className="bg-zinc-950/60 border border-white/5 rounded-xl p-4 space-y-1">
                              <span className="text-xs font-mono text-brand-400 uppercase tracking-wider">{tech.component}</span>
                              <p className="text-sm font-bold text-white">{tech.tool}</p>
                              <p className="text-xs text-zinc-400 leading-relaxed pt-1">{tech.reason}</p>
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
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-blue-400" />
                        Deployment & Demo Setup
                      </h2>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Step-by-step instructions to run locally on your laptop and host on free cloud servers.
                      </p>
                    </div>

                    <div className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-5">
                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-white">How to Run Live on Your Laptop:</h3>
                        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                          {topic.deploymentGuide || "Run the main application file using Python or Node.js as outlined in Step 1."}
                        </p>
                      </div>

                      <div className="rounded-xl bg-zinc-950/80 border border-white/5 p-4 space-y-3">
                        <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider">Free Cloud Deployment Options:</h4>
                        <ul className="text-xs text-zinc-300 space-y-2 list-disc pl-5">
                          <li><strong>Render.com:</strong> 100% free web service hosting for Python (Flask/FastAPI) and Node.js. Push code to GitHub and connect repository.</li>
                          <li><strong>HuggingFace Spaces:</strong> Best free platform for AI/ML and Streamlit apps with free CPU/GPU tier.</li>
                          <li><strong>Vercel:</strong> Best for FullStack React/Next.js frontends with instant CI/CD deployment.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 6: TROUBLESHOOTING */}
                {activeTab === "troubleshoot" && (
                  <div className="space-y-6 tab-panel-enter">
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-amber-400" />
                        Common Errors & 1-Minute Fixes
                      </h2>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        The top errors students hit when building this project and how to solve them instantly.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {getTroubleshootingErrors(topic.category).map((item, idx) => (
                        <div key={idx} className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-5 space-y-3">
                          <div className="flex items-center gap-2 text-red-400 text-sm font-bold font-mono">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            {item.error}
                          </div>
                          <p className="text-xs text-zinc-400">
                            <strong>Why it happens:</strong> {item.cause}
                          </p>
                          <div className="bg-black/80 border border-zinc-800 rounded-xl p-3 text-xs text-emerald-400 font-mono">
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
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                        <Presentation className="w-5 h-5 text-indigo-400" />
                        College Submission Deliverables (Black Book & PPT)
                      </h2>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Recommended chapter structure for your project report and slide-by-slide presentation breakdown.
                      </p>
                    </div>

                    <div className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-brand-400" />
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
                            <div key={i} className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 space-y-1">
                              <div className="flex justify-between text-brand-400 font-mono font-bold">
                                <span>{c.ch}</span>
                                <span className="text-zinc-500">{c.pages}</span>
                              </div>
                              <p className="text-sm font-bold text-white">{c.title}</p>
                              <p className="text-zinc-400 text-[11px]">{c.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-white/5">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Presentation className="w-4 h-4 text-purple-400" />
                          12-Slide Final Presentation (PPT) Roadmap:
                        </h4>
                        <ol className="text-xs text-zinc-300 space-y-1.5 list-decimal pl-5 leading-relaxed">
                          <li><strong>Slide 1:</strong> Title Slide (Project Title, Team Members, Guide Name, College Logo)</li>
                          <li><strong>Slide 2:</strong> Problem Statement (What real-world pain are you solving?)</li>
                          <li><strong>Slide 3:</strong> Existing Systems vs Proposed System (Comparison table)</li>
                          <li><strong>Slide 4:</strong> Objectives & Scope (Clear measurable bullet points)</li>
                          <li><strong>Slide 5:</strong> System Architecture (Clear visual block diagram)</li>
                          <li><strong>Slide 6:</strong> Tech Stack & Tools (Why each framework was chosen)</li>
                          <li><strong>Slide 7:</strong> Algorithm & Math Flow (CNN, TF-IDF, Random Forest, etc.)</li>
                          <li><strong>Slide 8:</strong> Dataset Overview (Source, size, preprocessing steps)</li>
                          <li><strong>Slide 9:</strong> Live Demo / Working Screenshots (Proof that it works)</li>
                          <li><strong>Slide 10:</strong> Results & Performance (Accuracy %, confusion matrix, latency)</li>
                          <li><strong>Slide 11:</strong> Future Scope & Commercial Potential (What could be added next)</li>
                          <li><strong>Slide 12:</strong> Conclusion & Q&A (Thanking the committee)</li>
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
                <section className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-3">
                  <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-400" /> What This Project Does
                  </h2>
                  <p className="text-sm text-zinc-300 leading-relaxed">{topic.whatItDoes}</p>
                </section>

                {/* Section: Real-World Use */}
                <section className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-3">
                  <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Where This Is Used in Real Life
                  </h2>
                  <p className="text-sm text-zinc-300 leading-relaxed">{topic.realWorldUse}</p>
                </section>

                {/* Section: Why This Project is Surprisingly Easy to Build */}
                <section className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Why This Project is Surprisingly Easy to Build
                    </h2>
                    <span className="text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      Beginner Friendly
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Many students think this topic requires months of coding and advanced AI theory. In reality, modern frameworks have made it straightforward:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                        <CheckCircle className="w-3.5 h-3.5" /> Pre-Trained Weights Do 90% of the Work
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        You do not need to train a model from scratch. Standard libraries (like OpenCV, PyTorch, HuggingFace, or Scikit-learn) already have pre-trained models. You only write the pipeline to feed your data.
                      </p>
                    </div>

                    <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-brand-400 text-xs font-bold">
                        <Terminal className="w-3.5 h-3.5" /> Under 200 Lines of Core Logic
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        The actual decision-making engine is compact and clean. It is structured into 3 modular files, making it easy to explain line-by-line in front of your project guide.
                      </p>
                    </div>

                    <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-purple-400 text-xs font-bold">
                        <Cpu className="w-3.5 h-3.5" /> Runs on Basic Student Laptops
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        No expensive cloud GPU or Nvidia graphics card required. The entire workflow is optimized to train and run smoothly on any standard laptop with 4GB to 8GB of RAM.
                      </p>
                    </div>

                    <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                        <Layers className="w-3.5 h-3.5" /> Zero Complex Calculus Needed
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        You only need standard Python programming (functions, conditionals, and dictionaries). The mathematical matrix operations are handled internally by the libraries.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section: Complete System Architecture & Data Flow */}
                <section className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-brand-400" />
                      Complete Project Data Flow & Modules
                    </h2>
                    <span className="text-[11px] text-brand-400 font-mono">End-to-End Pipeline</span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
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
                      <div key={pIdx} className="bg-zinc-950/60 rounded-xl border border-white/5 p-3.5 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-md bg-brand-500/10 border border-brand-500/20 text-brand-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          0{pIdx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <strong className="text-white text-xs font-bold">{phase.step}</strong>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5 font-mono">{phase.tag}</span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{phase.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section: Expected Results & Performance Benchmarks */}
                <section className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Expected Performance & Results
                    </h2>
                    <span className="text-[11px] text-zinc-500 font-medium">Evaluation Targets</span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    These are standard, realistic metrics you can report in your Black Book (project report) and presentation slides:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {getTopicMetrics(topic.category).map((metric, mIdx) => (
                      <div key={mIdx} className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 text-center">
                        <span className="text-[11px] text-zinc-500 font-medium block">{metric.label}</span>
                        <p className={`text-xl font-display font-black mt-1 ${metric.color}`}>{metric.value}</p>
                        <span className="text-[10px] text-zinc-500 block mt-0.5">{metric.sub}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Hook 3: Build Steps Cutoff */}
                <section className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-brand-400" />
                      <h2 className="text-lg font-display font-bold text-white">Step-by-Step Build Guide</h2>
                    </div>
                    <span className="text-[11px] text-brand-400 font-mono">Complete Roadmap</span>
                  </div>

                  <div className="bg-zinc-950/60 rounded-xl border border-white/5 p-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider font-mono">Step 1 of 8</span>
                    <p className="font-semibold text-white text-sm">{topic.freeStep1Title}</p>
                  </div>

                  {[2, 3, 4].map((step) => (
                    <div key={step} className="bg-zinc-950/30 rounded-xl border border-white/5 p-4 flex items-center gap-3">
                      <Lock className="w-4 h-4 text-zinc-600 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider font-mono">Step {step} of 8</span>
                        <p className="text-zinc-600 text-xs blur-sm select-none">
                          This step contains detailed architecture baby steps, terminal commands, and Antigravity Zero-Code prompt instructions.
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="text-center pt-2">
                    <p className="text-xs text-zinc-400">
                      🔒 All 8+ steps with {buildInfo.canBuild ? "Antigravity Master Prompt" : "verified implementation code"}, architecture flow, and evaluator Q&A — unlock for ₹19
                    </p>
                  </div>
                </section>

                {/* Dataset Preview */}
                <section className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-lg font-display font-bold text-white">Dataset Guide</h2>
                  </div>
                  <div className="bg-zinc-950/60 rounded-xl border border-white/5 p-4 space-y-2">
                    <span className="text-xs text-zinc-500 font-medium">Dataset name:</span>
                    <p className="font-semibold text-white text-sm">{topic.datasetName}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <Lock className="w-3.5 h-3.5 text-zinc-500" />
                      <p className="text-zinc-500 text-xs">
                        Direct download link, backup dataset, and 80/20 train-test split script — unlock for ₹19
                      </p>
                    </div>
                  </div>
                </section>

                {/* Urgency Hook */}
                <div className="rounded-2xl border border-amber-500/25 bg-amber-950/15 p-5 flex gap-3.5">
                  <span className="text-amber-400 text-xl shrink-0">⏰</span>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                    Final year deadlines are approaching fast. Every day you wait is one less day to test your project, fix bugs, and master your evaluator defense.
                  </p>
                </div>

              </div>
            )}

          </div>

          {/* ── RIGHT COLUMN: STICKY CHECKOUT & RE-ACCESS CARD ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">

              {!unlocked ? (
                <div ref={checkoutCardRef} className="glass-card bg-zinc-900/80 border border-white/10 rounded-2xl p-6 space-y-5 shadow-2xl backdrop-blur-xl">
                  {/* PDF Document Preview Card */}
                  <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-white/5 h-36 flex items-center justify-center group">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-25 blur-[1.5px] pointer-events-none select-none">
                      <p className="text-3xl font-display font-black text-zinc-300">SUBMITKIT</p>
                      <p className="text-[10px] font-bold text-brand-400 mt-1 tracking-widest">OFFICIAL BLUEPRINT PACK</p>
                      <p className="text-xs text-zinc-400 font-medium">{topic.title}</p>
                      <p className="text-[10px] text-zinc-600 mt-1 font-mono">submitkit.in</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                      <div className="bg-zinc-900/90 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 shadow-xl">
                        <Lock className="w-4 h-4 text-brand-400" />
                        <span className="text-xs text-white font-bold tracking-wide">20-Page Official Document</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-3xl font-display font-black text-white">₹19</span>
                      <span className="text-xs text-zinc-400">one-time payment</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 font-medium">Instant Unlock • Lifetime Download</p>
                  </div>

                  {/* Checkout inputs */}
                  <div className="space-y-3">
                    {payError && (
                      <div className="flex items-start gap-2 text-xs text-red-400 bg-red-950/40 border border-red-500/30 rounded-xl p-3">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                        <span>{payError}</span>
                      </div>
                    )}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (payError) setPayError(null);
                      }}
                      placeholder="Your email address"
                      className="w-full px-3.5 py-3 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 text-xs transition-colors"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (payError) setPayError(null);
                      }}
                      placeholder="WhatsApp phone number (10 digits)"
                      className="w-full px-3.5 py-3 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 text-xs transition-colors"
                    />
                    <button
                      onClick={handlePay}
                      disabled={loading}
                      className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
                    >
                      {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                      ) : (
                        <>Unlock Full Blueprint — ₹19 <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-3 border-t border-white/5">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Everything Included for ₹19:
                    </span>
                    {buildInfo.checklist.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Instant Re-Access with Email + Phone Dual-Key Check */}
                  <div className="pt-3.5 border-t border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-brand-400" /> Already purchased?
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3" /> Anti-Piracy Locked
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Enter your registered email & phone number to instantly restore access on this device.
                      </p>
                      <input
                        type="email"
                        value={checkEmail}
                        onChange={(e) => {
                          setCheckEmail(e.target.value);
                          if (checkError) setCheckError(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRestoreAccess();
                        }}
                        placeholder="Registered purchase email"
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-brand-500"
                      />
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          value={checkPhone}
                          onChange={(e) => {
                            setCheckPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                            if (checkError) setCheckError(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleRestoreAccess();
                          }}
                          placeholder="10-digit phone number"
                          className="flex-1 px-3 py-2 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-brand-500 font-mono"
                        />
                        <button
                          type="button"
                          onClick={handleRestoreAccess}
                          disabled={checkLoading || !checkEmail || checkPhone.length < 10}
                          className="px-3.5 py-2 bg-gradient-to-r from-brand-500 to-indigo-600 hover:brightness-110 text-white text-xs font-semibold rounded-xl transition-all disabled:opacity-50 shrink-0 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-md shadow-brand-500/20"
                        >
                          {checkLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <>Restore <ChevronRight className="w-3.5 h-3.5" /></>}
                        </button>
                      </div>
                    </div>

                    {checkError && (
                      <p className="text-xs text-red-400 bg-red-950/40 border border-red-500/30 rounded-xl p-2.5 flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-400" />
                        <span>{checkError}</span>
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Support CTA in Sidebar */}
                  <div className="pt-3 border-t border-white/5">
                    <a
                      href={`https://wa.me/918799814256?text=${encodeURIComponent(`Hi SubmitKit team! I have a question about the blueprint: ${topic.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/25 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> Need help? Chat on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <div className="glass-card bg-zinc-900/80 border border-emerald-500/40 rounded-2xl p-6 space-y-4 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Blueprint Unlocked
                    </div>
                    {downloadStats && (
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800 border border-white/10 text-zinc-300">
                        Downloads: <strong className={downloadStats.downloads >= downloadStats.maxDownloads ? "text-red-400" : "text-emerald-400"}>{downloadStats.downloads}</strong>/{downloadStats.maxDownloads}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={pdfLoading || (downloadStats !== null && downloadStats.downloads >= downloadStats.maxDownloads)}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
                  >
                    {pdfLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Generating Document…</>
                    ) : downloadStats && downloadStats.downloads >= downloadStats.maxDownloads ? (
                      <>Download Limit Reached (5/5)</>
                    ) : (
                      <><FileDown className="w-4 h-4" /> Download DOCX / PDF</>
                    )}
                  </button>
                  <p className="text-xs text-zinc-500 text-center leading-relaxed">
                    Document includes {buildInfo.canBuild ? "Antigravity Master Prompt" : "verified source code guide"}, conceptual baby steps, architecture diagrams, evaluator scoring pack, and Black Book template.
                  </p>

                  <a
                    href={`https://wa.me/918799814256?text=${encodeURIComponent(`Hi SubmitKit! I have unlocked the blueprint for: ${topic.title} and would like project assistance.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/25 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat with Project Guide
                  </a>

                  {/* Cross-Sell Card to Full Projects */}
                  <div className="rounded-xl border border-brand-500/30 bg-gradient-to-b from-brand-500/10 to-transparent p-4 space-y-2.5 mt-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                      Want the full working project?
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Get complete tested source code, full Black Book report, PPT slides, and installation walkthrough ready to submit.
                    </p>
                    <Link
                      href="/projects"
                      className="block w-full text-center py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-brand-500/20"
                    >
                      Browse Full Projects — from ₹299 →
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* ── RELATED TOPICS SECTION ── */}
        {relatedTopics.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                  Related {topic.category} Project Blueprints
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Explore other examiner-approved topics in the same domain.
                </p>
              </div>
              <Link
                href={`/blueprint`}
                className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
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
                    className="group glass-card bg-zinc-900/40 hover:bg-zinc-900/80 border border-white/5 hover:border-brand-500/40 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-500/20 bg-brand-500/10 text-brand-400 uppercase tracking-wider">
                          {rel.category}
                        </span>
                        {rel.trending && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold text-orange-400">
                            <Flame className="w-3 h-3" /> Trending
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {rel.tagline}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <CheckCircle className="w-3 h-3" /> {relBuild.canBuild ? "1-Prompt AI" : "Full Guide"}
                      </span>
                      <span className="text-brand-400 font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
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

      {/* ── STICKY BOTTOM BAR FOR ₹19 BLUEPRINT (Shown when !unlocked and scrolled past hero) ── */}
      {!unlocked && showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-amber-500/30 px-4 py-3 shadow-[0_-10px_35px_rgba(0,0,0,0.85)] animate-in fade-in slide-in-from-bottom duration-300">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="hidden sm:flex w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 items-center justify-center text-amber-400 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="hidden xs:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase tracking-wider">
                    ₹19 Blueprint
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white truncate">
                    {topic.title}
                  </p>
                </div>
                <p className="text-[11px] text-zinc-400 hidden sm:block truncate">
                  Includes Complete IEEE Roadmap, Mock Dataset &amp; Top 10 Viva Q&amp;A
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden xs:block">
                <div className="flex items-baseline gap-1.5 justify-end">
                  <span className="text-sm font-black text-white">₹19</span>
                  <span className="text-[10px] text-zinc-500 line-through">₹149</span>
                </div>
                <span className="text-[9px] text-emerald-400 font-medium block">Instant PDF Unlock</span>
              </div>
              <button
                onClick={handleStickyCtaClick}
                disabled={loading}
                className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] flex items-center gap-1.5"
              >
                <span>{loading ? "Processing…" : "Unlock Blueprint — ₹19"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

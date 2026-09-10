"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Lock, Clock, Star, AlertTriangle, ChevronRight,
  Mic, Wrench, Database, Cpu, FileDown, CheckCircle, XCircle, Loader2,
  Copy, Check, ExternalLink, Terminal, ShieldAlert, BookOpen, Layers,
  Presentation, FileText, Sparkles, HelpCircle, Flame
} from "lucide-react";
import { FullBlueprint } from "@/lib/blueprint-engine";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type ActiveTab = "steps" | "dataset" | "viva" | "architecture" | "deploy" | "troubleshoot" | "deliverables";

export default function BlueprintDetailClient({ topic }: { topic: FullBlueprint }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkResult, setCheckResult] = useState<"found" | "not-found" | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("steps");

  const difficultyStars = Array(5)
    .fill(0)
    .map((_, i) => i < topic.difficulty);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePay = async () => {
    if (!email || !phone) {
      alert("Please enter your email and phone number.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (phone.length < 10) {
      alert("Please enter a valid 10-digit phone number.");
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
        alert("Failed to create order. Please try again.");
        setLoading(false);
        return;
      }

      // 2. Open Razorpay
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: 1900,
          currency: "INR",
          name: "SubmitKit",
          description: `Project Blueprint: ${topic.title}`,
          order_id: orderData.orderId,
          prefill: { email, contact: phone },
          theme: { color: "#2563eb" },
          handler: async (response: any) => {
            // 3. Verify payment
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
              setUnlocked(true);
              setLoading(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              alert("Payment verification failed. Please contact support.");
              setLoading(false);
            }
          },
          modal: {
            ondismiss: () => setLoading(false),
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleCheckAccess = async () => {
    if (!checkEmail) return;
    setCheckLoading(true);
    setCheckResult(null);
    try {
      const res = await fetch("/api/blueprint/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId: topic.id, email: checkEmail.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (data.hasPaid) {
        setCheckResult("found");
        setEmail(checkEmail);
        setUnlocked(true);
      } else {
        setCheckResult("not-found");
      }
    } catch {
      setCheckResult("not-found");
    }
    setCheckLoading(false);
  };

  const handleDownloadPdf = async () => {
    setPdfLoading(true);
    try {
      const res = await fetch(
        `/api/blueprint/pdf?topicId=${topic.id}&email=${encodeURIComponent(email || checkEmail)}`,
        { method: "GET" }
      );
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SubmitKit-Blueprint-${topic.id}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to generate PDF. Please try again.");
    }
    setPdfLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-hidden">
      {/* Background glow orbs matching SubmitKit */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[800px] h-[800px] bg-brand-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="glow-orb w-[600px] h-[600px] bg-emerald-500/8 bottom-0 right-0" />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="border-b border-white/5 bg-zinc-950/40 backdrop-blur-md sticky top-16 z-40">
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
                You have lifetime access to the complete build plan, source code guide, dataset setup, and examiner viva defense.
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
            </div>

            <p className="text-xs text-zinc-500">
              Purchased for: <span className="text-zinc-300 font-mono">{email || checkEmail}</span> • You can always re-download anytime.
            </p>
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
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            {topic.title}
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            {topic.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-zinc-400 border-t border-white/5">
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
            <div className="text-zinc-500">
              Topic ID: <span className="font-mono text-zinc-400">{topic.id}</span>
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
                
                {/* Navigation Pills */}
                <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-900/80 border border-white/10 rounded-2xl backdrop-blur-md">
                  {[
                    { id: "steps", label: "Build Steps & Code", icon: Wrench },
                    { id: "dataset", label: "Dataset Master Guide", icon: Database },
                    { id: "viva", label: "Examiner Viva Defense", icon: Mic },
                    { id: "architecture", label: "Architecture", icon: Cpu },
                    { id: "deploy", label: "Deployment Guide", icon: Terminal },
                    { id: "troubleshoot", label: "Troubleshooting", icon: ShieldAlert },
                    { id: "deliverables", label: "Black Book & PPT", icon: Presentation },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as ActiveTab)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
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

                {/* TAB 1: BUILD STEPS & CODE */}
                {activeTab === "steps" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                          <Wrench className="w-5 h-5 text-brand-400" />
                          Step-by-Step Implementation Guide
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Follow these {topic.buildSteps?.length || 0} practical steps from environment setup to working project.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {topic.buildSteps && topic.buildSteps.length > 0 ? (
                        topic.buildSteps.map((step, idx) => (
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

                            {/* Code Snippet */}
                            {step.codeSnippet && (
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Source Code:</span>
                                  <button
                                    onClick={() => copyToClipboard(step.codeSnippet!, idx)}
                                    className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1"
                                  >
                                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copiedIndex === idx ? "Copied!" : "Copy Code"}
                                  </button>
                                </div>
                                <pre className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed max-h-96">
                                  <code>{step.codeSnippet}</code>
                                </pre>
                              </div>
                            )}

                            {/* Expected Output */}
                            {step.expectedOutput && (
                              <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-3 text-xs text-zinc-300 flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-emerald-400 font-semibold block">Expected Output:</strong>
                                  <span>{step.expectedOutput}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-zinc-400">No build steps defined for this preview.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: DATASET MASTER GUIDE */}
                {activeTab === "dataset" && (
                  <div className="space-y-6">
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

                {/* TAB 3: EXAMINER VIVA DEFENSE */}
                {activeTab === "viva" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                        <Mic className="w-5 h-5 text-purple-400" />
                        Examiner Viva Defense Masterpack
                      </h2>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Word-for-word scripts to answer tricky external examiner questions in easy English.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {topic.vivaQA && topic.vivaQA.length > 0 ? (
                        topic.vivaQA.map((qa, qIdx) => (
                          <div key={qIdx} className="glass-card bg-zinc-900/50 border border-white/10 rounded-2xl p-5 md:p-6 space-y-4">
                            <div className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                Q{qIdx + 1}
                              </span>
                              <h3 className="text-base font-display font-bold text-white leading-snug">
                                "{qa.question}"
                              </h3>
                            </div>

                            {/* Why asked */}
                            <div className="rounded-xl bg-zinc-950/60 border border-white/5 p-3.5 text-xs">
                              <span className="text-zinc-500 font-semibold block mb-0.5">Why Examiner Asks This:</span>
                              <p className="text-zinc-300">{qa.whyAsked}</p>
                            </div>

                            {/* Perfect Answer */}
                            <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 text-xs space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-emerald-400 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                                  <CheckCircle className="w-3.5 h-3.5" /> Perfect Answer in Easy English:
                                </span>
                                <button
                                  onClick={() => copyToClipboard(qa.perfectAnswer, 500 + qIdx)}
                                  className="text-zinc-400 hover:text-white"
                                  title="Copy answer"
                                >
                                  {copiedIndex === 500 + qIdx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                              <p className="text-zinc-200 leading-relaxed text-sm">
                                "{qa.perfectAnswer}"
                              </p>
                            </div>

                            {/* Trap to avoid */}
                            {qa.avoidSaying && (
                              <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-3.5 text-xs text-red-300 flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-red-400 font-semibold block">Trap to NEVER Say:</strong>
                                  <span>"{qa.avoidSaying}"</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-zinc-400">Viva questions loading...</p>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 4: ARCHITECTURE */}
                {activeTab === "architecture" && (
                  <div className="space-y-6">
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
                  <div className="space-y-6">
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
                  <div className="space-y-6">
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
                      {[
                        {
                          error: "ModuleNotFoundError: No module named 'xyz'",
                          cause: "The library is not installed in the current virtual environment.",
                          fix: "Run: pip install [module_name] or verify your active python environment with 'which python' / 'where python'."
                        },
                        {
                          error: "Address already in use / Port 5000 busy",
                          cause: "A previous server session is still running in the background.",
                          fix: "Kill the process: On Windows run 'taskkill /F /IM python.exe' or change port to 5001 in app.py."
                        },
                        {
                          error: "Out of Memory (OOM) / System Freezes",
                          cause: "The batch size or image resolution is too high for laptop RAM/GPU.",
                          fix: "Reduce batch size from 32 to 8 or 16, and resize images to 128x128 or 224x224 before training."
                        },
                        {
                          error: "Accuracy stuck at 50% or Loss not decreasing",
                          cause: "Learning rate too high, or labels not encoded properly.",
                          fix: "Lower learning rate to 0.0001 (1e-4) and verify that labels are 0-indexed integers."
                        }
                      ].map((item, idx) => (
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
                  <div className="space-y-6">
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

                {/* Hook 1: Examiner Warning Alert */}
                <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-5 flex gap-3.5 shadow-lg shadow-red-950/30">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-display font-bold text-red-400 text-sm tracking-wide">
                      EXAMINER ALERT: WHY STUDENTS LOSE MARKS HERE
                    </p>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      Most students get grilled in the viva for this project — not because the code doesn't work, but because they can't explain the underlying algorithm or dataset limitations. This blueprint prepares you for every question your examiner will throw at you.
                    </p>
                  </div>
                </div>

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
                    <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 text-center">
                      <span className="text-[11px] text-zinc-500 font-medium block">Model Accuracy / F1</span>
                      <p className="text-xl font-display font-black text-emerald-400 mt-1">92% – 98%</p>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">On standard test split</span>
                    </div>

                    <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 text-center">
                      <span className="text-[11px] text-zinc-500 font-medium block">Inference Speed</span>
                      <p className="text-xl font-display font-black text-brand-400 mt-1">&lt; 45 ms</p>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">Real-time response</span>
                    </div>

                    <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-3.5 text-center">
                      <span className="text-[11px] text-zinc-500 font-medium block">Dataset Split</span>
                      <p className="text-xl font-display font-black text-purple-400 mt-1">80 / 20</p>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">Train / Test ratio</span>
                    </div>
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
                          This step contains exact terminal commands, copy-pasteable Python code snippets, and expected terminal output.
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="text-center pt-2">
                    <p className="text-xs text-zinc-400">
                      🔒 All 8+ steps with code snippets, architecture flow, and deployment — unlock for ₹19
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
                    Final year deadlines are approaching fast. Every day you wait is one less day to test your project, fix bugs, and practice your viva defense.
                  </p>
                </div>

              </div>
            )}

          </div>

          {/* ── RIGHT COLUMN: STICKY CHECKOUT & RE-ACCESS CARD ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">

              {!unlocked ? (
                <div className="glass-card bg-zinc-900/80 border border-white/10 rounded-2xl p-6 space-y-5 shadow-2xl backdrop-blur-xl">
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
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-3.5 py-3 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 text-xs transition-colors"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                    {[
                      "Official 20-page Word/PDF download",
                      "All build steps with copy-paste code",
                      "Exact dataset link + preprocessing script",
                      "Full examiner viva Q&A with model answers",
                      "Common error troubleshooting guide",
                      "Black Book chapter breakdown & PPT outline",
                      "Free deployment guide (laptop & cloud)",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Re-Access Check */}
                  <div className="pt-3 border-t border-white/5 space-y-2.5">
                    <span className="text-[11px] text-zinc-400 text-center block">Already purchased? Re-access here:</span>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={checkEmail}
                        onChange={(e) => setCheckEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-3 py-2 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-brand-500"
                      />
                      <button
                        onClick={handleCheckAccess}
                        disabled={checkLoading}
                        className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors disabled:opacity-50"
                      >
                        {checkLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Verify"}
                      </button>
                    </div>

                    {checkResult === "not-found" && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 shrink-0" /> No purchase found for this email.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="glass-card bg-zinc-900/80 border border-emerald-500/40 rounded-2xl p-6 space-y-4 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Blueprint Unlocked
                  </div>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={pdfLoading}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
                  >
                    {pdfLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Generating Document…</>
                    ) : (
                      <><FileDown className="w-4 h-4" /> Download DOCX / PDF</>
                    )}
                  </button>
                  <p className="text-xs text-zinc-500 text-center leading-relaxed">
                    Document includes full code, architecture diagrams, viva Q&A, and Black Book template.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

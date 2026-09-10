"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Lock, Clock, Star, AlertTriangle, ChevronRight,
  Mic, Wrench, Database, Cpu, FileDown, CheckCircle, XCircle, Loader2
} from "lucide-react";
import { FullBlueprint } from "@/lib/blueprint-engine";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BlueprintDetailClient({ topic }: { topic: FullBlueprint }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkResult, setCheckResult] = useState<"found" | "not-found" | null>(null);

  const difficultyStars = Array(5)
    .fill(0)
    .map((_, i) => i < topic.difficulty);

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
          email,
          phone,
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
          theme: { color: "#3B82F6" },
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
        body: JSON.stringify({ topicId: topic.id, email: checkEmail }),
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
        `/api/blueprint/pdf?topicId=${topic.id}&email=${encodeURIComponent(email)}`,
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
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Back nav */}
      <div className="border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link
            href="/blueprint"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Topics
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* ── UNLOCKED STATE ── */}
        {unlocked && (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-400">Blueprint Unlocked!</h2>
              <p className="text-slate-400 mt-2">
                Your full 20-page blueprint is ready. Download your official SubmitKit PDF below.
              </p>
            </div>
            <button
              onClick={handleDownloadPdf}
              disabled={pdfLoading}
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all disabled:opacity-60 text-lg"
            >
              {pdfLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Generating PDF…</>
              ) : (
                <><FileDown className="w-5 h-5" /> Download Your Blueprint PDF</>
              )}
            </button>
            <p className="text-xs text-slate-500">
              Saved to your email: {email} · You can always re-download below.
            </p>
          </div>
        )}

        {/* ── HEADER ── */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
              {topic.category}
            </span>
            {topic.trending && (
              <span className="px-3 py-1 text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">
                🔥 Trending
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-black">{topic.title}</h1>
          <p className="text-lg text-slate-400">{topic.tagline}</p>

          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4 text-blue-400" />
              Build time: <span className="text-white font-medium">{topic.buildTimeDays}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Difficulty:</span>
              <span className="flex gap-0.5">
                {difficultyStars.map((filled, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${filled ? "text-amber-400 fill-amber-400" : "text-slate-700"}`}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT COLUMN — Free Content + Hooks ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Hook 1 — Examiner Warning */}
            <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-5 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-red-400 text-sm">EXAMINER ALERT</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Most students fail the viva for this project — not because they didn't build it, but because they can't explain it. This blueprint prepares you for every question your examiner will throw at you.
                </p>
              </div>
            </div>

            {/* What this project does */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold">What This Project Does</h2>
              <p className="text-slate-300 leading-relaxed">{topic.whatItDoes}</p>
            </section>

            {/* Real-World Use */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold">Where This Is Used in Real Life</h2>
              <div className="bg-[#111827] rounded-xl border border-slate-800 p-5">
                <p className="text-slate-300 leading-relaxed">{topic.realWorldUse}</p>
              </div>
            </section>

            {/* What examiner expects */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold">What Your Examiner Will Check</h2>
              <div className="space-y-3">
                {topic.examinerExpects.slice(0, 2).map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#111827] rounded-xl border border-slate-800 p-4">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm">{point}</p>
                  </div>
                ))}
                {/* Locked remaining checks */}
                {topic.examinerExpects.slice(2).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#111827] rounded-xl border border-slate-800 p-4 relative overflow-hidden">
                    <Lock className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <p className="text-slate-600 text-sm blur-sm select-none">
                      This is a critical point your examiner checks during viva that most students miss completely.
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Hook 2 — Viva Questions (no answers) */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold">Viva Questions Your Examiner WILL Ask</h2>
              </div>
              <p className="text-sm text-slate-400">These are the real questions. Do you know the answers?</p>
              <div className="space-y-3">
                {topic.freeVivaQuestions.map((q, i) => (
                  <div key={i} className="bg-[#111827] rounded-xl border border-red-900/40 p-4">
                    <p className="text-slate-200 text-sm font-medium">❓ "{q}"</p>
                  </div>
                ))}
                {/* Locked questions */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#111827] rounded-xl border border-slate-800 p-4 flex items-center gap-3">
                    <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                    <p className="text-slate-600 text-sm blur-sm select-none">
                      ❓ "A difficult examiner question that most students cannot answer without preparation."
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-center py-2">
                <p className="text-sm text-slate-500">
                  🔒 Full scripted answers for all 15 viva questions — unlock for ₹19
                </p>
              </div>
            </section>

            {/* Hook 3 — Step 1 cut off */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold">Step-by-Step Build Guide</h2>
              </div>
              <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Step 1 of 10</p>
                <p className="font-semibold text-white">{topic.freeStep1Title}</p>
              </div>
              {/* Locked steps */}
              {[2, 3, 4].map((step) => (
                <div key={step} className="bg-[#111827] rounded-xl border border-slate-800 p-5 flex items-center gap-3">
                  <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Step {step} of 10</p>
                    <p className="text-slate-600 text-sm blur-sm select-none">
                      This step contains exact terminal commands, code snippets, and expected output.
                    </p>
                  </div>
                </div>
              ))}
              <div className="text-center py-2">
                <p className="text-sm text-slate-500">
                  🔒 All 10 steps with exact commands, code, and expected output — unlock for ₹19
                </p>
              </div>
            </section>

            {/* Dataset Preview */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold">Dataset</h2>
              </div>
              <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 space-y-2">
                <p className="text-sm text-slate-400">Dataset name:</p>
                <p className="font-semibold text-white">{topic.datasetName}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Lock className="w-4 h-4 text-slate-600" />
                  <p className="text-slate-500 text-sm">
                    Direct download link, preprocessing steps, backup dataset — unlock for ₹19
                  </p>
                </div>
              </div>
            </section>

            {/* Tech Stack Preview */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold">Tech Stack Overview</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {topic.techStack.slice(0, 3).map((tech, i) => (
                  <div key={i} className="bg-[#111827] rounded-xl border border-slate-800 p-3 text-center">
                    <p className="text-xs text-slate-500">{tech.component}</p>
                    <p className="font-semibold text-white text-sm mt-1">{tech.tool}</p>
                  </div>
                ))}
                {topic.techStack.slice(3).map((_, i) => (
                  <div key={i} className="bg-[#111827] rounded-xl border border-slate-800/40 p-3 text-center relative overflow-hidden">
                    <Lock className="w-4 h-4 text-slate-700 mx-auto mb-1" />
                    <p className="text-slate-700 text-sm blur-sm">Hidden tool</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Hook 7 — Urgency */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5 flex gap-3">
              <span className="text-amber-400 text-xl shrink-0">⏰</span>
              <p className="text-slate-300 text-sm leading-relaxed">
                Your exam is probably in less than 30 days. Every day you wait is one less day to build, test, and practice your viva answers.
              </p>
            </div>

          </div>

          {/* ── RIGHT COLUMN — Sticky CTA ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">

              {!unlocked ? (
                <div className="bg-[#111827] rounded-2xl border border-slate-700 p-6 space-y-6">
                  {/* PDF Preview blurred thumbnail */}
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 h-40 flex items-center justify-center">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-30 blur-sm pointer-events-none">
                      <p className="text-4xl font-black text-slate-400">SUBMITKIT</p>
                      <p className="text-xs text-slate-500 mt-1">PROJECT BLUEPRINT REPORT</p>
                      <p className="text-xs text-slate-500">{topic.title}</p>
                      <p className="text-xs text-slate-600 mt-2">submitkit.in</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-300 font-medium">20-Page Official PDF</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-center">
                    <p className="text-2xl font-black text-white">₹19 <span className="text-sm font-normal text-slate-400">one-time</span></p>
                    <p className="text-xs text-slate-500">Instant access · Lifetime download</p>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number (10 digits)"
                      className="w-full px-4 py-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                      onClick={handlePay}
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-base"
                    >
                      {loading ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</>
                      ) : (
                        <>Unlock Full Blueprint — ₹19 <ChevronRight className="w-5 h-5" /></>
                      )}
                    </button>
                  </div>

                  {/* What's included */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">What You Get</p>
                    {[
                      "20-page official PDF download",
                      "All 10 build steps with exact commands",
                      "15 viva Q&A with scripted answers",
                      "Dataset link + preprocessing guide",
                      "Free deployment guide",
                      "Resume bullets + LinkedIn post",
                      "System architecture diagram",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Re-access check */}
                  <div className="pt-3 border-t border-slate-800 space-y-3">
                    <p className="text-xs text-slate-500 text-center">Already purchased? Re-access here:</p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={checkEmail}
                        onChange={(e) => setCheckEmail(e.target.value)}
                        placeholder="Your email"
                        className="flex-1 px-3 py-2 bg-[#0B0F19] border border-slate-700 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleCheckAccess}
                        disabled={checkLoading}
                        className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded-xl transition-all disabled:opacity-60"
                      >
                        {checkLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Check"}
                      </button>
                    </div>
                    {checkResult === "not-found" && (
                      <div className="flex items-center gap-2 text-xs text-red-400">
                        <XCircle className="w-3.5 h-3.5" /> No purchase found for this email.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-[#111827] rounded-2xl border border-emerald-500/40 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle className="w-5 h-5" />
                    Blueprint Unlocked
                  </div>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={pdfLoading}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {pdfLoading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Generating…</>
                    ) : (
                      <><FileDown className="w-5 h-5" /> Download PDF</>
                    )}
                  </button>
                  <p className="text-xs text-slate-500 text-center">
                    You can download this PDF any time using your email above.
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

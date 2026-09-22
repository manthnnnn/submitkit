"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2, ArrowRight, Sparkles, Code2, FileText,
  Presentation, Zap, Clock, Star, Shield, MessageCircle,
  ChevronRight, Send, Loader2, Home
} from "lucide-react";

const TECH_OPTIONS = [
  "Python + Flask/FastAPI",
  "Python + Streamlit (AI/ML)",
  "Next.js + React",
  "Node.js + Express",
  "React Native (Mobile)",
  "Django",
  "Java Spring Boot",
  "MERN Stack",
  "No Preference (Team Decides)",
];

const CATEGORY_OPTIONS = [
  "AI & Machine Learning",
  "Deep Learning / Computer Vision",
  "NLP / ChatBot / LLM",
  "IoT & Embedded Systems",
  "Full Stack Web App",
  "Cybersecurity",
  "FinTech / Banking",
  "Healthcare / Medical",
  "Data Science / Analytics",
  "Blockchain / Web3",
  "Mobile App",
  "Other",
];

const TIERS = [
  {
    id: "mini",
    name: "Mini Project",
    price: "₹1,999",
    tag: "Sem 5 / 6",
    color: "from-brand-500/20 to-brand-600/10",
    border: "border-brand-500/40",
    glow: "shadow-brand-500/20",
    badge: "bg-brand-500/15 text-brand-300 border-brand-500/25",
    features: [
      "Working source code (1-click runnable)",
      "20-page IEEE Black Book report (.docx)",
      "10-slide Viva defense PPT",
      "Top 15 Viva Q&A with answers",
      "README with setup instructions",
      "Delivered in 3-4 days",
    ],
  },
  {
    id: "major",
    name: "Major Project",
    price: "₹2,999",
    tag: "Sem 7 / 8 Final Year",
    color: "from-emerald-500/20 to-brand-500/10",
    border: "border-emerald-500/40",
    glow: "shadow-emerald-500/20",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    popular: true,
    features: [
      "Full working source code (AI/ML logic included)",
      "60-page IEEE Black Book report (.docx)",
      "20-slide defense PPT with speaker notes",
      "Top 25 Viva Q&A with examiner-level answers",
      "System architecture diagram",
      "README + deployment guide",
      "Delivered in 5-7 days",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise / Research",
    price: "₹4,999",
    tag: "Publication / Internship Level",
    color: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/40",
    glow: "shadow-purple-500/20",
    badge: "bg-purple-500/15 text-purple-300 border-purple-500/25",
    features: [
      "Production-grade source code with tests",
      "80+ page research-quality IEEE report",
      "30-slide PPT with live demo video",
      "Full viva preparation (30+ Q&A)",
      "Performance benchmarks & results",
      "System architecture + ER diagram",
      "Plagiarism certificate included",
      "Delivered in 7-10 days",
    ],
  },
];

export function CustomProjectClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    tier: "major",
    category: "",
    topic: "",
    techPreference: "No Preference (Team Decides)",
    deadline: "",
    specialRequirements: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const selectedTier = TIERS.find((t) => t.id === form.tier) || TIERS[1];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.topic || !form.category) {
      setError("Please fill in all required fields.");
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) { setError("Please enter a valid email address."); return; }
    if (form.phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit phone number."); return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/custom-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Submission failed. Please try again or WhatsApp us.");
      }
    } catch {
      setError("Network error. Please try again or WhatsApp us directly.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold text-white">Request Received! 🎉</h1>
            <p className="text-zinc-400 leading-relaxed">
              We&apos;ve received your custom project request for <strong className="text-white">&ldquo;{form.topic}&rdquo;</strong>.
              Our team will contact you within <strong className="text-emerald-400">2 hours</strong> on WhatsApp / email with a confirmation and timeline.
            </p>
          </div>
          <div className="glass-card rounded-2xl border border-white/10 p-5 space-y-2 text-sm text-left">
            <p className="text-zinc-400"><span className="text-zinc-300 font-medium">Email:</span> {form.email}</p>
            <p className="text-zinc-400"><span className="text-zinc-300 font-medium">Phone:</span> {form.phone}</p>
            <p className="text-zinc-400"><span className="text-zinc-300 font-medium">Tier:</span> {selectedTier.name} ({selectedTier.price})</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/blueprint" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors">
              Browse Free Blueprints
            </Link>
            <Link href="/projects" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 text-sm font-bold hover:bg-zinc-100 transition-colors">
              <Zap className="w-4 h-4" /> Browse Ready Projects
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="glow-orb w-[700px] h-[700px] bg-brand-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="glow-orb w-[500px] h-[500px] bg-purple-500/8 bottom-0 right-0" />
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-zinc-500">
            <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors"><Home className="w-3 h-3" /> Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-300 font-medium">Custom Project</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Built Exactly for You
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight leading-tight">
            Can&apos;t Find Your Topic?<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-brand-400 to-emerald-400">
              We&apos;ll Build It for You.
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us your project topic. We deliver a <strong className="text-white">100% working codebase</strong>, 
            IEEE-format Black Book, defense PPT, and complete Viva Q&amp;A — 
            tailored to your college requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm pt-2">
            {[
              { icon: Clock, text: "Delivered in 3–10 days" },
              { icon: Shield, text: "100% plagiarism-free" },
              { icon: Star, text: "IIT-grade code quality" },
              { icon: MessageCircle, text: "WhatsApp support" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-zinc-400">
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {TIERS.map((tier, i) => (
            <motion.button
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setForm((p) => ({ ...p, tier: tier.id }))}
              className={`relative text-left rounded-3xl border p-6 space-y-4 transition-all duration-200 ${tier.border} bg-gradient-to-br ${tier.color} ${form.tier === tier.id ? `shadow-2xl ${tier.glow} scale-[1.02] ring-2 ring-offset-2 ring-offset-zinc-950 ${tier.border.replace("border-", "ring-")}` : "hover:scale-[1.01] opacity-80 hover:opacity-100"}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-display font-bold text-xl">{tier.name}</p>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${tier.badge} mt-1 inline-block`}>
                    {tier.tag}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display font-black text-white">{tier.price}</p>
                  <p className="text-[11px] text-zinc-500">one-time</p>
                </div>
              </div>
              <ul className="space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              {form.tier === tier.id && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Selected
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Intake Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-3xl border border-white/10 p-8 md:p-10 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-display font-bold text-white">Request Your Custom Project</h2>
              <p className="text-sm text-zinc-400">Fill in the details below. We&apos;ll confirm within 2 hours on WhatsApp/email.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Full Name *</label>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-zinc-900/80 border border-white/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email *</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="you@gmail.com"
                    className="w-full bg-zinc-900/80 border border-white/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone + College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">WhatsApp Number *</label>
                  <input
                    name="phone" type="tel" value={form.phone} onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-zinc-900/80 border border-white/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">College Name</label>
                  <input
                    name="college" value={form.college} onChange={handleChange}
                    placeholder="e.g. VTU, Mumbai University..."
                    className="w-full bg-zinc-900/80 border border-white/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Project Category *</label>
                <select
                  name="category" value={form.category} onChange={handleChange}
                  className="w-full bg-zinc-900/80 border border-white/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                >
                  <option value="">Select a category...</option>
                  {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Topic */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Project Topic / Title *</label>
                <input
                  name="topic" value={form.topic} onChange={handleChange}
                  placeholder="e.g. Facial Recognition Attendance System using CNN"
                  className="w-full bg-zinc-900/80 border border-white/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
                />
              </div>

              {/* Tech + Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tech Preference</label>
                  <select
                    name="techPreference" value={form.techPreference} onChange={handleChange}
                    className="w-full bg-zinc-900/80 border border-white/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                  >
                    {TECH_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Submission Deadline</label>
                  <input
                    name="deadline" type="date" value={form.deadline} onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-zinc-900/80 border border-white/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Special Requirements */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Special Requirements / Notes</label>
                <textarea
                  name="specialRequirements" value={form.specialRequirements} onChange={handleChange}
                  rows={3}
                  placeholder="Any specific modules, datasets, university format requirements, or reference papers..."
                  className="w-full bg-zinc-900/80 border border-white/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all resize-none"
                />
              </div>

              {/* Selected Tier Summary */}
              <div className={`rounded-2xl border ${selectedTier.border} bg-gradient-to-br ${selectedTier.color} p-4 flex items-center justify-between`}>
                <div>
                  <p className="text-sm font-bold text-white">{selectedTier.name}</p>
                  <p className="text-xs text-zinc-400">{selectedTier.tag}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-display font-black text-white">{selectedTier.price}</p>
                  <p className="text-[11px] text-zinc-500">Pay after confirmation</p>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-purple-600 via-brand-600 to-indigo-600 hover:brightness-110 text-white font-black text-sm rounded-2xl shadow-2xl shadow-brand-500/25 transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting Request...</>
                ) : (
                  <><Send className="w-5 h-5" /> Submit Custom Project Request</>
                )}
              </button>

              <p className="text-center text-[11px] text-zinc-500">
                No payment now. We confirm your request first, then share payment details on WhatsApp.
              </p>
            </form>
          </div>

          {/* What Happens Next */}
          <div className="mt-8 glass-card rounded-3xl border border-white/10 p-6 space-y-4">
            <h3 className="font-display font-bold text-white text-lg">What happens next?</h3>
            <div className="space-y-3">
              {[
                { step: "1", title: "We review your request", desc: "Our team reviews your topic and requirements within 2 hours.", color: "bg-brand-500/20 text-brand-300 border-brand-500/30" },
                { step: "2", title: "Confirmation on WhatsApp", desc: "We confirm feasibility, timeline, and payment details via WhatsApp.", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
                { step: "3", title: "Build starts after payment", desc: "Once confirmed, our engineers start building your custom project.", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
                { step: "4", title: "Delivery + free revisions", desc: "Full delivery on WhatsApp. 2 free revisions included.", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 ${color}`}>{step}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs text-zinc-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

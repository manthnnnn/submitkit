"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2, ArrowRight, Sparkles, Code2,
  Terminal, Clock, ShieldCheck, Star, MessageCircle,
  Loader2, Home, ChevronRight, Zap
} from "lucide-react";

const TECH_OPTIONS = [
  "Python + Streamlit / FastAPI (AI/ML)",
  "Python + Flask / Django",
  "Next.js / React + Node.js",
  "MERN Stack (MongoDB, Express, React, Node)",
  "React Native / Mobile App",
  "Deep Learning (CNN / PyTorch / TensorFlow)",
  "NLP / BERT / LLM Agents",
  "Java Spring Boot",
  "No Preference (Engineering Team Decides)",
];

const CATEGORY_OPTIONS = [
  "AI & Machine Learning",
  "Deep Learning & Computer Vision",
  "NLP, Chatbots & LLM",
  "Cybersecurity & Threat Detection",
  "FinTech & Banking Systems",
  "Health IT & Medical Systems",
  "Full Stack Web Application",
  "Data Science & Analytics",
  "IoT & Edge Computing",
  "Cloud & Developer Tools",
  "Other Custom Topic",
];

const TIERS = [
  {
    id: "mini",
    name: "Mini Project",
    price: "₹299",
    usdPrice: "(~$4 USD)",
    tag: "Ready Kit",
    exploreHref: "/projects?tier=MINI",
    exploreLabel: "Explore Ready Mini Kits (₹299)",
    tagBg: "var(--teal-50)",
    tagColor: "var(--teal-dark)",
    tagBorder: "var(--teal-100)",
    subtext: "Instant download · 1-click runnable code & IEEE report",
    features: [
      "Complete working source code (1-click runnable)",
      "25+ page IEEE-format report (.docx)",
      "10-slide defense presentation (.pptx)",
      "Top 15 Viva Q&A with examiner answers",
      "README with step-by-step setup guide",
      "Instant download & direct support",
    ],
  },
  {
    id: "major",
    name: "Major Project",
    price: "₹499",
    usdPrice: "(~$6 USD)",
    tag: "Final Year Capstone",
    exploreHref: "/projects?tier=MAJOR",
    exploreLabel: "Explore Ready Major Kits (₹499)",
    tagBg: "var(--amber-50)",
    tagColor: "var(--amber)",
    tagBorder: "var(--amber-100)",
    subtext: "Instant download · Full 60-page IEEE report & PPT",
    features: [
      "Full working source code (AI/ML/Web logic included)",
      "60+ page IEEE Black Book report (.docx)",
      "15–20 slide defense PPT with speaker notes",
      "Top 25 Viva Q&A with detailed answers",
      "System architecture diagram & deployment guide",
      "Instant download & direct support",
    ],
  },
  {
    id: "custom",
    name: "Customize Project / Startup Idea",
    price: "₹1,999",
    usdPrice: "(~$24 USD)",
    tag: "Custom Built from Scratch",
    popular: true,
    tagBg: "rgba(217,119,6,0.08)",
    tagColor: "#D97706",
    tagBorder: "rgba(217,119,6,0.2)",
    subtext: "*Starting base price · Built to your topic or startup idea",
    features: [
      "Custom college project topic or startup MVP prototype",
      "Tailored algorithm, custom dataset & clean production code",
      "Complete 60+ page custom IEEE-format report (.docx)",
      "Custom defense PPT + Viva Q&A examiner prep",
      "1-on-1 code walkthrough on WhatsApp / Google Meet",
      "Delivered in 48–72 hours with bug-free guarantee",
    ],
  },
];

const inputSty = (extra?: React.CSSProperties): React.CSSProperties => ({
  width: "100%",
  background: "var(--surface-2)",
  border: "1.5px solid var(--line)",
  borderRadius: "10px",
  padding: ".6875rem .875rem",
  fontSize: "16px", /* 16px prevents iOS Safari viewport auto-zoom */
  color: "var(--ink)",
  outline: "none",
  fontFamily: "var(--font-sans)",
  transition: "border-color 150ms, background 150ms",
  ...extra,
});

export function CustomProjectClient() {
  const sp = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    category: "",
    topic: "",
    techPreference: "No Preference (Engineering Team Decides)",
    deadline: "",
    specialRequirements: "",
    tier: "custom",
  });

  useEffect(() => {
    const urlTopic = sp?.get("topic");
    const urlTier = sp?.get("tier")?.toLowerCase();
    if (urlTopic || urlTier) {
      setForm((prev) => ({
        ...prev,
        topic: urlTopic || prev.topic,
        tier: urlTier && ["mini", "major", "custom"].includes(urlTier) ? urlTier : prev.tier,
      }));
    }
  }, [sp]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedTier = TIERS.find((t) => t.id === form.tier) || TIERS[2]!;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const priceLabel = selectedTier.id === "custom" ? "Starts ₹1,999" : selectedTier.price;
    const nameStr = form.name.trim() || "Visitor";
    const phoneStr = form.phone.trim() || "Direct on WhatsApp";
    const emailStr = form.email.trim() || "Not provided";
    const collegeStr = form.college.trim() || "Not specified";
    const catStr = form.category || "General Software / Engineering";
    const topicStr = form.topic.trim() || "Custom Software / Academic Project Request";
    const notesStr = form.specialRequirements.trim() || "None";

    const waText = `Hi SubmitKit! I want to request a project / MVP build.

👤 Name: ${nameStr}
📞 Contact: ${phoneStr}
📧 Email: ${emailStr}
🏫 College / Org: ${collegeStr}
📦 Selected Tier: ${selectedTier.name} (${priceLabel})
🗂️ Category: ${catStr}
💡 Topic / Idea: ${topicStr}
⚙️ Tech Preference: ${form.techPreference || "Engineering Team Decides"}
📅 Deadline: ${form.deadline || "Flexible"}
📝 Notes: ${notesStr}`;

    const waUrl = `https://wa.me/918799814256?text=${encodeURIComponent(waText)}`;

    try {
      fetch("/api/custom-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name: nameStr, phone: phoneStr, email: emailStr, topic: topicStr, category: catStr, price: priceLabel }),
      }).catch(() => {});
    } catch (_) {}

    // Direct redirect with no popup blocking
    if (typeof window !== "undefined") {
      window.location.href = waUrl;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    const priceLabel = selectedTier.id === "custom" ? "Starts ₹1,999" : selectedTier.price;
    const waText = `Hi SubmitKit! I submitted a request for "${form.topic}" (${selectedTier.name}). My name is ${form.name}.`;
    return (
      <div style={{ minHeight: "100vh", background: "var(--canvas-base)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
          style={{ maxWidth: "32rem", width: "100%", padding: "2.5rem 2rem", textAlign: "center", borderRadius: "22px", boxShadow: "var(--sh-xl)", background: "var(--surface)" }}
        >
          <div style={{ width: "4rem", height: "4rem", borderRadius: "18px", background: "var(--emerald-50)", border: "1px solid var(--emerald-100)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
            <CheckCircle2 style={{ width: "2rem", height: "2rem", color: "var(--emerald)" }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--navy)", letterSpacing: "-.03em", marginBottom: ".5rem" }}>
            Request Submitted!
          </h2>
          <p style={{ fontSize: ".9375rem", color: "var(--ink-3)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
            WhatsApp window has been opened with your project brief. Our team will review and confirm details within 2 hours.
          </p>
          <div className="card" style={{ padding: "1rem", marginBottom: "1.5rem", textAlign: "left", background: "var(--surface-2)" }}>
            {[
              { l: "Topic", v: form.topic },
              { l: "Selected Tier", v: `${selectedTier.name} (${priceLabel})` },
              { l: "WhatsApp", v: form.phone },
            ].map((r) => (
              <div key={r.l} style={{ display: "flex", justifyContent: "space-between", fontSize: ".875rem", paddingBottom: ".375rem", marginBottom: ".375rem", borderBottom: "1px solid var(--line)" }}>
                <span style={{ color: "var(--ink-4)" }}>{r.l}</span>
                <span style={{ fontWeight: 700, color: "var(--navy)", textAlign: "right", maxWidth: "15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {r.v}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
            <a
              href={`https://wa.me/918799814256?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-teal"
              style={{ justifyContent: "center", borderRadius: "12px", minHeight: "50px", fontSize: ".9375rem" }}
            >
              <MessageCircle style={{ width: "1.125rem", height: "1.125rem" }} />
              Open WhatsApp Chat Now
            </a>
            <Link href="/" className="btn btn-outline" style={{ justifyContent: "center", borderRadius: "12px", minHeight: "50px", textDecoration: "none", fontSize: ".9375rem" }}>
              <Home style={{ width: "1rem", height: "1rem" }} /> Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "transparent", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* Breadcrumb seamlessly on canvas */}
      <div className="shell" style={{ paddingTop: "1.5rem", paddingBottom: "0.5rem" }}>
        <nav aria-label="Breadcrumb" style={{ display: "inline-flex", alignItems: "center", gap: ".375rem", fontSize: ".8125rem", color: "var(--ink-4)" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: ".3rem", color: "var(--ink-3)", textDecoration: "none", fontWeight: 500 }} className="breadcrumb-link">
            <Home style={{ width: ".8125rem", height: ".8125rem" }} />
            Home
          </Link>
          <ChevronRight style={{ width: ".75rem", height: ".75rem", flexShrink: 0, opacity: 0.45 }} />
          <span style={{ color: "var(--navy)", fontWeight: 600 }}>Customize Project / Startup Idea</span>
        </nav>
      </div>

      <div className="shell" style={{ paddingTop: "1.5rem", position: "relative", zIndex: 1 }}>
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.16 }} style={{ textAlign: "center", marginBottom: "2.5rem", maxWidth: "50rem", margin: "0 auto 2.5rem" }}>
          <span className="label-chip" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            Startup MVP Studio &amp; Custom Software · Built for Non-Coders &amp; Innovators
          </span>
          <h1 className="font-display font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-.04em", color: "var(--navy)", lineHeight: 1.15, marginTop: ".875rem", marginBottom: "1rem" }}>
            Customize your project or{' '}
            <span className="text-teal-grad">build your startup idea.</span>
          </h1>
          <p style={{ fontSize: "clamp(.9375rem, 2vw, 1.125rem)", color: "var(--ink-3)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            Have a custom college engineering topic, or a startup SaaS idea but zero coding background? Our senior software engineers build <strong style={{ color: "var(--navy)" }}>100% working code</strong>, full UI, database, IEEE documentation, and guide you through a 1-on-1 walkthrough.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: ".625rem 1.5rem", fontSize: ".9rem" }}>
            {[
              { Icon: Clock, t: "Delivered in 48–72 hours" },
              { Icon: ShieldCheck, t: "100% Plagiarism-Free & Clean Code" },
              { Icon: Star, t: "1-on-1 Code & Demo Walkthrough" },
              { Icon: MessageCircle, t: "Direct Senior Engineer WhatsApp" },
            ].map(({ Icon, t }) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: ".375rem", color: "var(--ink-3)", fontWeight: 500 }}>
                <Icon style={{ width: ".9375rem", height: ".9375rem", color: "var(--teal)" }} />
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3-Step Non-Coder Workflow Strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.05 }}
          style={{
            maxWidth: "62rem",
            margin: "0 auto 3rem",
            padding: "clamp(1.25rem, 3vw, 1.75rem)",
            borderRadius: "20px",
            background: "linear-gradient(165deg, #FFFFFF 0%, #FDFBF8 40%, #F6ECE0 100%)",
            border: "1.5px solid rgba(220, 208, 188, 0.95)",
            boxShadow: "inset 0 1px 0 #FFFFFF, 0 8px 24px -4px rgba(180, 145, 100, 0.12)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: ".6875rem", fontWeight: 800, color: "var(--teal)", textTransform: "uppercase", letterSpacing: ".12em" }}>
              How Non-Coders &amp; Founders Build With SubmitKit
            </span>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--navy)", letterSpacing: "-.025em", margin: ".25rem 0 0" }}>
              Zero Technical Knowledge Required · 3 Simple Steps
            </h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
            {[
              {
                step: "01",
                title: "Describe in Plain Words",
                desc: "No tech jargon, code, or architecture required. Simply tell us your idea, problem statement, or guide requirements via text or voice note.",
              },
              {
                step: "02",
                title: "Senior Engineers Build It",
                desc: "Our engineering team handles 100% of the UI, backend APIs, database, and IEEE black book report in 48–72 hours.",
              },
              {
                step: "03",
                title: "1-Click Launch & Walkthrough",
                desc: "Double-click run.bat (Windows) or run.sh (Mac) to open the app instantly, followed by a live 1-on-1 walkthrough call with an engineer.",
              },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  padding: "1rem 1.125rem",
                  borderRadius: "14px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                }}
              >
                <div style={{ fontSize: ".75rem", fontFamily: "var(--font-mono)", fontWeight: 800, color: "var(--teal)", marginBottom: ".35rem" }}>
                  STEP {s.step}
                </div>
                <h4 style={{ fontSize: ".9375rem", fontWeight: 800, color: "var(--navy)", letterSpacing: "-.02em", margin: "0 0 .35rem" }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: ".8125rem", color: "var(--ink-3)", lineHeight: 1.55, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3 Real Tiers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))", gap: "1rem", marginBottom: "3rem", maxWidth: "62rem", margin: "0 auto 3rem" }}>
          {TIERS.map((tier, i) => {
            const isSelected = form.tier === tier.id;
            return (
              <motion.div
                key={tier.id}
                role="button"
                tabIndex={0}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16, delay: i * 0.03 }}
                onClick={() => setForm((p) => ({ ...p, tier: tier.id }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setForm((p) => ({ ...p, tier: tier.id }));
                }}
                style={{
                  textAlign: "left",
                  borderRadius: "18px",
                  padding: "1.5rem",
                  background: isSelected
                    ? "linear-gradient(175deg, #FFFFFF 0%, #F0FDF9 50%, #E6F8F4 100%)"
                    : "linear-gradient(175deg, #FFFFFF 0%, #FDFBF8 35%, #F7EFE3 75%, #F0E3CF 100%)",
                  cursor: "pointer",
                  border: `1.5px solid ${isSelected ? "var(--teal)" : "rgba(220, 208, 188, 0.95)"}`,
                  boxShadow: isSelected
                    ? "inset 0 1px 0 #FFFFFF, 0 6px 24px -2px rgba(13, 148, 136, 0.22)"
                    : "inset 0 1px 0 #FFFFFF, 0 4px 18px -3px rgba(180, 145, 100, 0.12)",
                  transform: isSelected ? "translateY(-2px)" : "none",
                  transition: "all 180ms cubic-bezier(.16,1,.3,1)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {tier.popular && (
                    <div style={{ position: "absolute", top: 0, right: 0 }}>
                      <span style={{ display: "inline-block", padding: ".25rem .875rem", borderRadius: "0 16px 0 12px", background: "var(--teal)", color: "#fff", fontSize: ".6875rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em" }}>
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div style={{ marginBottom: ".75rem", marginTop: tier.popular ? ".5rem" : 0 }}>
                    <p className="font-display" style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--navy)", marginBottom: ".375rem" }}>
                      {tier.name}
                    </p>
                    <span style={{ fontSize: ".6875rem", fontWeight: 700, padding: ".25rem .625rem", borderRadius: "9999px", background: tier.tagBg, color: tier.tagColor, border: `1px solid ${tier.tagBorder}`, display: "inline-block" }}>
                      {tier.tag}
                    </span>
                  </div>

                  {/* Price */}
                  <div style={{ margin: ".875rem 0 1.25rem", padding: ".75rem .875rem", borderRadius: "12px", background: "var(--surface-2)", border: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: ".4rem", flexWrap: "wrap" }}>
                      <span className="font-display" style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--navy)", letterSpacing: "-.03em", lineHeight: 1, whiteSpace: "nowrap" }}>
                        {tier.price}
                      </span>
                      <span style={{ fontSize: ".75rem", color: "var(--ink-4)", fontWeight: 600, whiteSpace: "nowrap" }}>
                        {tier.usdPrice}
                      </span>
                      {tier.id === "custom" ? (
                        <span style={{ fontSize: ".625rem", fontWeight: 800, color: "#D97706", background: "rgba(217,119,6,0.12)", border: "1px solid rgba(217,119,6,0.25)", padding: ".15rem .45rem", borderRadius: "4px", textTransform: "uppercase", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
                          Base Price
                        </span>
                      ) : (
                        <span style={{ fontSize: ".6875rem", color: "var(--ink-4)", fontWeight: 600, whiteSpace: "nowrap" }}>
                          · ready kit
                        </span>
                      )}
                    </div>
                    {tier.subtext && (
                      <p style={{ fontSize: ".6875rem", color: tier.id === "custom" ? "#B45309" : "var(--ink-4)", fontWeight: 600, marginTop: ".35rem", marginBottom: 0, lineHeight: 1.4 }}>
                        {tier.subtext}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: ".5rem", fontSize: ".8125rem", color: "var(--ink-2)", lineHeight: 1.45 }}>
                        <CheckCircle2 style={{ width: ".875rem", height: ".875rem", color: "var(--teal)", flexShrink: 0, marginTop: ".125rem" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {tier.exploreHref && (
                    <div style={{ marginTop: "1.25rem", paddingTop: ".875rem", borderTop: "1px dashed var(--line)" }}>
                      <Link
                        href={tier.exploreHref}
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-outline"
                        style={{
                          width: "100%",
                          minHeight: "40px",
                          fontSize: ".8125rem",
                          fontWeight: 700,
                          justifyContent: "center",
                          borderRadius: "10px",
                          color: "var(--teal-dark)",
                          borderColor: "var(--teal-100)",
                          background: "var(--surface-teal)",
                          textDecoration: "none",
                          gap: ".375rem",
                        }}
                      >
                        <span>{tier.exploreLabel}</span>
                        <ArrowRight style={{ width: ".875rem", height: ".875rem" }} />
                      </Link>
                    </div>
                  )}

                  {tier.id === "custom" && (
                    <div style={{ marginTop: "1.25rem", paddingTop: ".875rem", borderTop: "1px dashed var(--line)" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".375rem", fontSize: ".8125rem", fontWeight: 700, color: isSelected ? "var(--teal)" : "var(--ink-4)", minHeight: "40px" }}>
                        <CheckCircle2 style={{ width: ".9375rem", height: ".9375rem" }} />
                        <span>{isSelected ? "Selected — Fill Details Below ↓" : "Click to Request Custom Project"}</span>
                      </div>
                    </div>
                  )}

                  {isSelected && tier.id !== "custom" && (
                    <div style={{ display: "flex", alignItems: "center", gap: ".375rem", marginTop: ".75rem", fontSize: ".8125rem", fontWeight: 700, color: "var(--teal)" }}>
                      <CheckCircle2 style={{ width: ".9375rem", height: ".9375rem" }} /> Selected
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Inquiry Form */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.16 }} style={{ maxWidth: "40rem", margin: "0 auto" }}>
          <div className="card" style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)", borderRadius: "22px", background: "linear-gradient(170deg, #FFFFFF 0%, #FDFBF8 35%, #F7EEE0 75%, #EFE1CC 100%)", border: "1.5px solid rgba(220, 208, 188, 0.95)", boxShadow: "inset 0 1px 0 #FFFFFF, 0 10px 32px -4px rgba(180, 145, 100, 0.16)" }}>
            <h2 className="font-display" style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--navy)", letterSpacing: "-.03em", marginBottom: ".375rem" }}>
              Request Your Custom Project
            </h2>
            <p style={{ fontSize: ".875rem", color: "var(--ink-3)", marginBottom: "1.75rem", lineHeight: 1.65 }}>
              Fill in your topic details below. We&apos;ll confirm feasibility, roadmap, and exact quotation within 2 hours on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: ".75rem", fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".5rem" }}>
                    Full Name
                  </label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inputSty()} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".75rem", fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".5rem" }}>
                    Email Address
                  </label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@gmail.com" style={inputSty()} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: ".75rem", fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".5rem" }}>
                    WhatsApp Number
                  </label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputSty()} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".75rem", fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".5rem" }}>
                    College / University / Company
                  </label>
                  <input name="college" value={form.college} onChange={handleChange} placeholder="e.g. VTU, Pune University..." style={inputSty()} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: ".75rem", fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".5rem" }}>
                  Project Category
                </label>
                <select name="category" value={form.category} onChange={handleChange} style={{ ...inputSty(), appearance: "auto", cursor: "pointer" }}>
                  <option value="">Select a category...</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: ".75rem", fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".5rem" }}>
                  Project Topic, Startup Idea, or Problem Statement
                </label>
                <input name="topic" value={form.topic} onChange={handleChange} placeholder="e.g. AI Resume Screener, Doctor Booking App, or your custom startup SaaS idea..." style={inputSty()} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: ".75rem", fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".5rem" }}>
                    Preferred Tech Stack
                  </label>
                  <select name="techPreference" value={form.techPreference} onChange={handleChange} style={{ ...inputSty(), appearance: "auto", cursor: "pointer" }}>
                    {TECH_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".75rem", fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".5rem" }}>
                    Submission Deadline
                  </label>
                  <input name="deadline" type="date" value={form.deadline} onChange={handleChange} min={new Date().toISOString().split("T")[0]} style={inputSty()} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: ".75rem", fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".5rem" }}>
                  Special Requirements / Notes
                </label>
                <textarea
                  name="specialRequirements"
                  value={form.specialRequirements}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any specific algorithms, dataset requirements, university report formats, or custom modules..."
                  style={{ ...inputSty(), resize: "vertical", minHeight: "4.5rem", lineHeight: 1.65 }}
                />
              </div>

              {/* Selected Tier Summary */}
              <div style={{ padding: "1rem", borderRadius: "12px", background: "var(--surface-teal)", border: "1px solid var(--teal-100)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: ".875rem", fontWeight: 700, color: "var(--navy)" }}>{selectedTier.name}</p>
                  <p style={{ fontSize: ".8125rem", color: "var(--ink-3)" }}>{selectedTier.tag} · {selectedTier.id === "custom" ? "Starts ₹1,999 (varies with topic)" : "Instant access"}</p>
                </div>
                <span className="font-display" style={{ fontSize: "1.375rem", fontWeight: 900, color: "var(--navy)", letterSpacing: "-.04em" }}>
                  {selectedTier.price} <span style={{ fontSize: ".8125rem", color: "var(--ink-4)", fontWeight: 600 }}>{selectedTier.usdPrice}</span>
                </span>
              </div>

              {error && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: ".625rem", padding: ".875rem", borderRadius: "12px", background: "var(--rose-50)", border: "1px solid var(--rose-100)", fontSize: ".875rem", color: "var(--rose)" }}>
                  ⚠ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-teal"
                style={{ justifyContent: "center", borderRadius: "13px", minHeight: "56px", padding: ".75rem 1rem", fontSize: "clamp(.9375rem, 2vw, 1rem)", fontWeight: 700, textAlign: "center", lineHeight: 1.35, opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? (
                  <>
                    <Loader2 style={{ width: "1.125rem", height: "1.125rem", animation: "spin .7s linear infinite" }} /> Connecting to WhatsApp…
                  </>
                ) : (
                  <>
                    <MessageCircle style={{ width: "1.125rem", height: "1.125rem" }} /> Submit &amp; Chat on WhatsApp ({selectedTier.id === "custom" ? "Starts ₹1,999" : selectedTier.price})
                  </>
                )}
              </button>

              <p style={{ textAlign: "center", fontSize: ".8125rem", color: "var(--ink-4)", lineHeight: 1.65 }}>
                Want to speak immediately?{" "}
                <a
                  href={`https://wa.me/918799814256?text=${encodeURIComponent("Hi SubmitKit! I want to request a custom project. My topic is: ")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--teal)", fontWeight: 700, textDecoration: "none" }}
                >
                  Chat directly on WhatsApp
                </a>{" "}
                for fastest response.
              </p>
            </form>
          </div>
        </motion.div>

        {/* ════ POPULAR STARTUP MVP TYPES FOR NON-CODERS ════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.18 }}
          style={{ maxWidth: "62rem", margin: "4rem auto 0" }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span style={{ fontSize: ".6875rem", fontWeight: 800, color: "var(--teal)", textTransform: "uppercase", letterSpacing: ".12em" }}>
              Startup &amp; MVP Specialization
            </span>
            <h3 className="font-display" style={{ fontSize: "clamp(1.35rem, 3vw, 1.85rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: "-.03em", margin: ".35rem 0 .5rem" }}>
              Popular Software Prototypes We Build For Non-Technical Founders
            </h3>
            <p style={{ fontSize: ".875rem", color: "var(--ink-3)", maxWidth: "38rem", margin: "0 auto" }}>
              From AI automation tools to SaaS platforms — we build production-ready software you can demo to customers or pitch to venture investors.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))", gap: "1rem" }}>
            {[
              {
                title: "AI Wrappers & Autonomous Agents",
                desc: "Custom LLM workflows, document Q&A tools, automated scrapers, and predictive analytics dashboards powered by OpenAI, Claude & LangChain.",
                tag: "AI & ML",
              },
              {
                title: "B2B SaaS & Client Dashboards",
                desc: "Multi-tenant web applications with secure user authentication, role-based access, automated invoicing, and Razorpay/Stripe checkout.",
                tag: "SaaS",
              },
              {
                title: "Telehealth & Clinic Portals",
                desc: "Patient appointment schedulers, real-time medical vital trackers, and doctor-patient consultation interfaces with encrypted data storage.",
                tag: "HealthTech",
              },
              {
                title: "FinTech & Automated Trackers",
                desc: "Fraud detection engines, algorithmic trading dashboards, portfolio analyzers, and automated OCR receipt expense processors.",
                tag: "FinTech",
              },
              {
                title: "Hyperlocal Marketplaces & QR Apps",
                desc: "Contactless QR restaurant ordering, hyperlocal vendor matching, on-demand service dispatchers, and live delivery tracking maps.",
                tag: "Marketplace",
              },
              {
                title: "Internal Business Tools & CRMs",
                desc: "Tailored internal admin back-offices, inventory controllers, customer ticket trackers, and automated workflow pipelines replacing slow spreadsheets.",
                tag: "Operations",
              },
            ].map((p) => (
              <div
                key={p.title}
                style={{
                  padding: "1.25rem",
                  borderRadius: "16px",
                  background: "linear-gradient(175deg, #FFFFFF 0%, #FDFBF8 40%, #F6ECE0 100%)",
                  border: "1.2px solid rgba(220, 208, 188, 0.9)",
                  boxShadow: "inset 0 1px 0 #FFFFFF, 0 3px 12px -2px rgba(180, 145, 100, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ fontSize: ".625rem", fontWeight: 800, padding: ".2rem .5rem", borderRadius: "6px", background: "var(--teal-50)", color: "var(--teal-dark)", border: "1px solid var(--teal-100)", letterSpacing: ".05em", textTransform: "uppercase" }}>
                    {p.tag}
                  </span>
                  <h4 style={{ fontSize: "1.025rem", fontWeight: 800, color: "var(--navy)", letterSpacing: "-.02em", margin: ".625rem 0 .375rem" }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: ".8125rem", color: "var(--ink-3)", lineHeight: 1.55, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ════ COMPARISON TABLE ════ */}
          <div
            style={{
              marginTop: "3rem",
              borderRadius: "20px",
              background: "linear-gradient(165deg, #FFFFFF 0%, #FDFBF8 35%, #F5ECE0 100%)",
              border: "1.5px solid rgba(220, 208, 188, 0.95)",
              boxShadow: "inset 0 1px 0 #FFFFFF, 0 8px 24px -4px rgba(180, 145, 100, 0.12)",
              padding: "clamp(1.25rem, 3vw, 2rem)",
              overflowX: "auto",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: ".6875rem", fontWeight: 800, color: "var(--teal)", textTransform: "uppercase", letterSpacing: ".12em" }}>
                Fair Comparison
              </span>
              <h3 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--navy)", letterSpacing: "-.025em", margin: ".25rem 0 0" }}>
                Why Non-Technical Founders Choose SubmitKit Studio
              </h3>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".8125rem", minWidth: "32rem" }}>
              <thead>
                <tr style={{ borderBottom: "1.5px solid var(--line)", textAlign: "left" }}>
                  <th style={{ padding: ".75rem", color: "var(--ink-4)", fontWeight: 700 }}>Comparison Factor</th>
                  <th style={{ padding: ".75rem", color: "var(--teal-dark)", fontWeight: 800, background: "rgba(13, 148, 136, 0.08)", borderRadius: "8px 8px 0 0" }}>SubmitKit Studio</th>
                  <th style={{ padding: ".75rem", color: "var(--ink-4)", fontWeight: 600 }}>Traditional Dev Agency</th>
                  <th style={{ padding: ".75rem", color: "var(--ink-4)", fontWeight: 600 }}>No-Code Tools (Bubble)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { factor: "Starting Cost", sk: "Starts ₹1,999 (~$24 USD)", agency: "$5,000 to $25,000+", nocode: "$29–$399/mo ongoing" },
                  { factor: "Delivery Timeline", sk: "48 to 72 Hours", agency: "3 to 6 Months", agencySub: "Slow sprints", nocode: "Weeks of self-learning" },
                  { factor: "Source Code Ownership", sk: "100% Full Ownership (You own all IP)", agency: "Retainer lock-in clauses", nocode: "Zero (Locked in their cloud)" },
                  { factor: "Technical Skill Needed", sk: "Zero (Engineers handle 100%)", agency: "Technical project management", nocode: "Steep learning curve & logic" },
                  { factor: "Running the App", sk: "1-Click Desktop Launcher (run.bat)", agency: "Complex AWS/GCP servers", nocode: "Hosted on proprietary servers" },
                  { factor: "Code Walkthrough", sk: "1-on-1 Walkthrough Call Included", agency: "Billed at $150/hr", nocode: "Self-help community forums" },
                ].map((row, idx) => (
                  <tr key={row.factor} style={{ borderBottom: idx === 5 ? "none" : "1px solid var(--line)" }}>
                    <td style={{ padding: ".75rem", fontWeight: 700, color: "var(--navy)" }}>{row.factor}</td>
                    <td style={{ padding: ".75rem", fontWeight: 750, color: "var(--teal-dark)", background: "rgba(13, 148, 136, 0.04)" }}>
                      ✓ {row.sk}
                    </td>
                    <td style={{ padding: ".75rem", color: "var(--ink-3)" }}>{row.agency}</td>
                    <td style={{ padding: ".75rem", color: "var(--ink-3)" }}>{row.nocode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

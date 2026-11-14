"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2, ArrowRight, ArrowDown, Sparkles, Code2,
  Terminal, Clock, ShieldCheck, Star, MessageCircle, MessageSquare,
  Loader2, Home, ChevronRight, Zap, Rocket, GraduationCap,
  User, Mail, Phone, Building2, Calendar, FileText, Send, Lock
} from "lucide-react";
import { AirplaneLogo } from "@/components/ui/logo";

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

interface TierOption {
  id: string;
  name: string;
  price: string;
  usdPrice: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  tagBorder: string;
  subtext: string;
  features: string[];
  popular?: boolean;
  exploreHref?: string;
  exploreLabel?: string;
}

const COLLEGE_TIERS: TierOption[] = [
  {
    id: "mini",
    name: "Software System (Mini Kit)",
    price: "₹299",
    usdPrice: "(~$4 USD)",
    tag: "Pre-Made · ₹299",
    exploreHref: "/projects?tier=MINI",
    exploreLabel: "Explore Systems (₹299)",
    tagBg: "#FDF6F2",
    tagColor: "#E55729",
    tagBorder: "#F3CFBF",
    subtext: "Instant pre-made kit for college submissions & resume",
    features: [
      "1-click runnable complete source code (run.bat / run.sh)",
      "30+ page IEEE format report (.docx)",
      "10-slide defense PPT with Top 15 Viva Q&A",
    ],
  },
  {
    id: "major",
    name: "Production System (Major Kit)",
    price: "₹499",
    usdPrice: "(~$6 USD)",
    tag: "Production Capstone · ₹499",
    exploreHref: "/projects?tier=MAJOR",
    exploreLabel: "Explore Systems (₹499)",
    tagBg: "var(--amber-50)",
    tagColor: "var(--amber)",
    tagBorder: "var(--amber-100)",
    subtext: "Complete capstone for university & high-impact portfolio",
    features: [
      "Full production source code with AI/ML/Web logic",
      "60+ page IEEE Black Book report (.docx)",
      "15–20 slide defense PPT with Top 25 Viva Q&A",
    ],
  },
  {
    id: "custom",
    name: "Custom College Project",
    price: "₹1,999",
    usdPrice: "(~$24 USD)",
    tag: "Custom University Capstone",
    popular: true,
    tagBg: "rgba(229,87,41,0.08)",
    tagColor: "#E55729",
    tagBorder: "rgba(229,87,41,0.25)",
    subtext: "*Starting base price · Built to your approved topic & syllabus",
    features: [
      "Approved topic built from scratch by senior engineers",
      "Complete 60+ page custom IEEE Black Book report (.docx)",
      "Custom defense PPT + 1-on-1 walkthrough call",
    ],
  },
];

const STARTUP_TIERS: TierOption[] = [
  {
    id: "custom",
    name: "Execute Startup Idea",
    price: "₹1,999",
    usdPrice: "(~$24 USD)",
    tag: "End-to-End Startup Build",
    popular: true,
    tagBg: "rgba(229,87,41,0.08)",
    tagColor: "#E55729",
    tagBorder: "rgba(229,87,41,0.25)",
    subtext: "*Starting base price · Built to your custom specification",
    features: [
      "End-to-end full-stack web app or SaaS built from scratch",
      "Database models, authentication & backend REST APIs",
      "100% intellectual property & commercial rights transfer",
    ],
  },
  {
    id: "enterprise",
    name: "Full-Scale SaaS Platform",
    price: "Custom",
    usdPrice: "Tailored Quote",
    tag: "Dedicated Studio Desk",
    tagBg: "rgba(24,24,27,0.06)",
    tagColor: "#18181B",
    tagBorder: "rgba(24,24,27,0.18)",
    subtext: "For complex multi-tenant SaaS & high-scale systems",
    features: [
      "Custom multi-tenant architecture & cloud deployment",
      "AI LLM agent pipelines / computer vision workflows",
      "Priority senior engineer support channel & full NDA",
    ],
  },
];

const inputSty = (extra?: React.CSSProperties): React.CSSProperties => ({
  width: "100%",
  background: "#FAF7F2",
  border: "1px solid #E5DCD1",
  borderRadius: "10px",
  padding: "0.45rem 0.65rem",
  fontSize: "0.8125rem",
  color: "#18181B",
  outline: "none",
  fontFamily: "var(--font-sans)",
  transition: "all 150ms ease",
  ...extra,
});

export function CustomProjectClient({ initialMode }: { initialMode?: 'college' | 'startup' } = {}) {
  const sp = useSearchParams();
  const [mode, setMode] = useState<'college' | 'startup'>(
    initialMode || (sp?.get("type") === "startup" ? "startup" : "college")
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    category: "",
    topic: "",
    techPreference: "No Preference (Engineering Team Decides)",
    deadline: "",
    timeline: "48h",
    specialRequirements: "",
    tier: "custom",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const urlType = sp?.get("type")?.toLowerCase();
    if (urlType === "startup") setMode("startup");
    else if (urlType === "college") setMode("college");

    const urlTopic = sp?.get("topic");
    const urlTier = sp?.get("tier")?.toLowerCase();
    if (urlTopic || urlTier) {
      setForm((prev) => ({
        ...prev,
        topic: urlTopic || prev.topic,
        tier: urlTier && ["mini", "major", "custom", "enterprise"].includes(urlTier) ? urlTier : prev.tier,
      }));
    }
  }, [sp]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentTiers = mode === "college" ? COLLEGE_TIERS : STARTUP_TIERS;
  const selectedTier = currentTiers.find((t) => t.id === form.tier) || currentTiers[1] || currentTiers[0]!;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const topicStr = form.topic.trim();
    const phoneStr = form.phone.trim();
    const nameStr = form.name.trim() || "Visitor";

    if (!topicStr) {
      setError("Please describe your project topic or startup idea.");
      return;
    }
    if (!phoneStr) {
      setError("Please enter your WhatsApp phone number so engineers can send your roadmap & quote.");
      return;
    }

    setSubmitting(true);

    const isCollege = mode === "college";
    const projectScope = isCollege ? "🎓 Custom College Project" : "🚀 Custom Startup Idea Execution";
    const priceLabel = selectedTier.id === "custom" ? "Starts ₹1,999" : selectedTier.price;
    const timelineLabel =
      form.timeline === "48h" ? "⚡ Express (48–72 Hours)" :
      form.timeline === "3-5d" ? "📅 3–5 Days" : "⏳ Flexible Timeline";

    const waLines = [
      `Hi SubmitKit! I want to request a ${projectScope}.`,
      "",
      `💡 ${isCollege ? "Project Topic / Problem Statement" : "Startup Idea / Concept"}:`,
      topicStr,
      "",
      `👤 Name: ${nameStr}`,
      `📞 WhatsApp: ${phoneStr}`,
      `⚡ Delivery Timeline: ${timelineLabel}`,
    ];

    if (form.college.trim()) {
      waLines.push(`${isCollege ? "🏫 College / University" : "🏢 Company / Startup"}: ${form.college.trim()}`);
    }
    if (form.email.trim()) {
      waLines.push(`📧 Email: ${form.email.trim()}`);
    }
    if (form.techPreference && form.techPreference !== "No Preference (Engineering Team Decides)") {
      waLines.push(`⚙️ Preferred Tech Stack: ${form.techPreference}`);
    }
    if (form.specialRequirements.trim()) {
      waLines.push(`📝 Special Notes / Guidelines: ${form.specialRequirements.trim()}`);
    }
    waLines.push(`📦 Target Tier: ${selectedTier.name} (${priceLabel})`);
    waLines.push("");
    waLines.push("Please review feasibility, technical roadmap, and fixed quote within 2 hours.");

    const waText = waLines.join("\n");
    const waUrl = `https://wa.me/918799814256?text=${encodeURIComponent(waText)}`;

    try {
      fetch("/api/custom-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          name: nameStr,
          phone: phoneStr,
          topic: topicStr,
          price: priceLabel,
          timeline: timelineLabel,
        }),
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
          <div style={{ width: "4rem", height: "4rem", borderRadius: "18px", background: "#FDF6F2", border: "1.5px solid #F3CFBF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", boxShadow: "0 4px 14px rgba(229, 87, 41, 0.12)" }}>
            <AirplaneLogo size={24} color="#E55729" />
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
              className="btn btn-orange"
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
          <span style={{ color: "var(--navy)", fontWeight: 600 }}>
            {mode === "college" ? "Custom College Project" : "Execute Startup Idea"}
          </span>
        </nav>
      </div>

      <div className="shell" style={{ paddingTop: "1.25rem", position: "relative", zIndex: 1 }}>
        {/* Figma Interactive Segmented Mode Switcher */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(1.25rem, 3vw, 2rem)" }}>
          <div
            className="custom-mode-switcher"
            style={{
              padding: "0.25rem",
              borderRadius: "9999px",
              background: "#F2EBE1",
              border: "1.5px solid #E2D7C8",
              boxShadow: "inset 0 1px 3px rgba(24, 24, 27, 0.05)",
              gap: "0.25rem",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setMode("college");
                setForm((p) => ({ ...p, tier: "custom" }));
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.55rem 1.25rem",
                borderRadius: "9999px",
                fontSize: "0.8125rem",
                fontWeight: mode === "college" ? 850 : 650,
                color: mode === "college" ? "#18181B" : "#71717A",
                background: mode === "college" ? "#FFFFFF" : "transparent",
                border: mode === "college" ? "1px solid #EFE6DC" : "1px solid transparent",
                boxShadow: mode === "college" ? "0 2px 8px rgba(24, 24, 27, 0.08)" : "none",
                cursor: "pointer",
                transition: "all 160ms ease",
              }}
            >
              <GraduationCap style={{ width: "1rem", height: "1rem", color: mode === "college" ? "#E55729" : "#8A8A93" }} />
              <span>Custom College Project</span>
              <span
                className="role-badge"
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 800,
                  padding: "0.12rem 0.5rem",
                  borderRadius: "9999px",
                  background: mode === "college" ? "#FDF6F2" : "rgba(0,0,0,0.05)",
                  color: mode === "college" ? "#E55729" : "#71717A",
                }}
              >
                Students
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("startup");
                setForm((p) => ({ ...p, tier: "custom" }));
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.55rem 1.25rem",
                borderRadius: "9999px",
                fontSize: "0.8125rem",
                fontWeight: mode === "startup" ? 850 : 650,
                color: mode === "startup" ? "#18181B" : "#71717A",
                background: mode === "startup" ? "#FFFFFF" : "transparent",
                border: mode === "startup" ? "1px solid #EFE6DC" : "1px solid transparent",
                boxShadow: mode === "startup" ? "0 2px 8px rgba(24, 24, 27, 0.08)" : "none",
                cursor: "pointer",
                transition: "all 160ms ease",
              }}
            >
              <Rocket style={{ width: "1rem", height: "1rem", color: mode === "startup" ? "#E55729" : "#8A8A93" }} />
              <span>Execute Startup Idea</span>
              <span
                className="role-badge"
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 800,
                  padding: "0.12rem 0.5rem",
                  borderRadius: "9999px",
                  background: mode === "startup" ? "#FDF6F2" : "rgba(0,0,0,0.05)",
                  color: mode === "startup" ? "#E55729" : "#71717A",
                }}
              >
                Founders
              </span>
            </button>
          </div>
        </div>

        {/* Hero */}
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "2.5rem", maxWidth: "50rem", margin: "0 auto 2.5rem" }}
        >
          <span className="label-chip" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            {mode === "college"
              ? "🎓 Custom College Projects & Capstones · Built for Engineering Students"
              : "🚀 Startup Ideas & Software Execution · Built for Founders & Non-Coders"}
          </span>
          <h1 className="font-display font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-.04em", color: "var(--navy)", lineHeight: 1.15, marginTop: ".875rem", marginBottom: "1rem" }}>
            {mode === "college" ? (
              <>
                Build your custom college project with{' '}
                <span style={{
                  display: 'inline-block',
                  color: '#E55729',
                  background: 'linear-gradient(135deg, #EE6E44 0%, #E55729 50%, #CB451A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  IEEE report &amp; Viva prep.
                </span>
              </>
            ) : (
              <>
                Execute your startup idea into{' '}
                <span style={{
                  display: 'inline-block',
                  color: '#E55729',
                  background: 'linear-gradient(135deg, #EE6E44 0%, #E55729 50%, #CB451A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  working production software.
                </span>
              </>
            )}
          </h1>
          <p style={{ fontSize: "clamp(.875rem, 2vw, 1.125rem)", color: "var(--ink-3)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
            <span className="sm:hidden">
              {mode === "college"
                ? "Senior engineers build 100% working code, complete 60-page IEEE .docx report & Viva PPT in 48–72 hours for top grades."
                : "Turn your software or SaaS idea into working production software with full commercial IP ownership in 48–72 hours."}
            </span>
            <span className="hidden sm:inline">
              {mode === "college"
                ? "Have an approved college topic or syllabus guidelines? Senior engineers build 100% working code, complete 60-page IEEE .docx Black Book report, PPT defense deck, and conduct a 1-on-1 walkthrough so you score an O-Grade in your university Viva examination."
                : "Turn your software or SaaS concept into reality without writing code or hiring expensive agencies. Senior engineers build full-stack code, modern UI, backend APIs, and complete intellectual property ownership within 48–72 hours."}
            </span>
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-x-6 sm:gap-y-2 text-xs sm:text-sm">
            {[
              { Icon: Clock, t: "48–72h Delivery" },
              { Icon: ShieldCheck, t: mode === "college" ? "100% IEEE Report" : "100% IP & Code" },
              { Icon: Star, t: "1-on-1 Walkthrough" },
              { Icon: MessageCircle, t: "Direct WhatsApp SLA" },
            ].map(({ Icon, t }) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: ".35rem", color: "var(--ink-3)", fontWeight: 600 }}>
                <Icon style={{ width: ".875rem", height: ".875rem", color: "#E55729", flexShrink: 0 }} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3-Step Non-Coder Workflow Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: "68rem",
            margin: "0 auto clamp(1.25rem, 3vw, 2.25rem)",
            padding: "clamp(1rem, 2.5vw, 1.85rem)",
            borderRadius: "24px",
            background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5EE 100%)",
            border: "1.5px solid #EFE6DC",
            boxShadow: "0 8px 32px -4px rgba(24, 24, 27, 0.05), inset 0 1px 0 #FFFFFF",
            position: "relative",
          }}
        >
          {/* Eyebrow & Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(1rem, 2.5vw, 1.75rem)" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.3rem 0.85rem",
              borderRadius: "9999px",
              background: "#FDF6F2",
              border: "1px solid #F3CFBF",
              fontSize: "0.6875rem",
              fontWeight: 800,
              color: "#E55729",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "0.75rem",
              boxShadow: "0 1px 3px rgba(229, 87, 41, 0.08)",
            }}>
              <AirplaneLogo size={12} color="#E55729" />
              <span>{mode === "college" ? "How Students Build With SubmitKit" : "How Founders Build With SubmitKit"}</span>
            </div>
            <h3 style={{
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 900,
              color: "#18181B",
              letterSpacing: "-0.03em",
              margin: 0,
              lineHeight: 1.25,
            }}>
              {mode === "college" ? "From Approved Topic to Submission in 3 Steps" : "From Concept to Production Software in 3 Steps"}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "#52525B", margin: "0.5rem auto 0", maxWidth: "34rem", lineHeight: 1.55 }}>
              {mode === "college"
                ? "Zero coding stress. Senior engineers handle everything from source code to IEEE documentation."
                : "Zero technical knowledge required. Senior engineers turn your vision into ready software."}
            </p>
          </div>

          {/* Figma Design-Thinking Horizontal Journey Track with Arrow Connectors */}
          <div className="journey-cards-track mobile-snap-row">
            {/* Step 01 */}
            <div className="journey-step-card">
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "14px",
                    background: "#FDF6F2",
                    border: "1.5px solid #F3CFBF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(229, 87, 41, 0.08)",
                  }}>
                    <MessageSquare style={{ width: "1.25rem", height: "1.25rem", color: "#E55729" }} />
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "#E55729",
                    background: "#FDF6F2",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "9999px",
                    border: "1px solid #F3CFBF",
                  }}>
                    STEP 01
                  </span>
                </div>
                <h4 style={{ fontSize: "1.0625rem", fontWeight: 850, color: "#18181B", letterSpacing: "-0.02em", margin: "0 0 0.5rem" }}>
                  {mode === "college" ? "Describe Your Topic" : "Describe in Plain Words"}
                </h4>
                <p style={{ fontSize: "0.8125rem", color: "#52525B", lineHeight: 1.6, margin: 0 }}>
                  {mode === "college"
                    ? "Tell us your approved university problem statement, college syllabus, or guide requirements via text or voice note."
                    : "No tech jargon, code, or architecture required. Simply tell us your idea, target audience, or problem statement via text or voice note."}
                </p>
              </div>
            </div>

            {/* Connector 01 ➔ 02 */}
            <div className="journey-connector" aria-hidden="true">
              <div className="journey-connector-line" />
              <div className="journey-arrow-badge">
                <ArrowRight className="hidden md:block" style={{ width: "13px", height: "13px" }} />
                <ArrowDown className="block md:hidden" style={{ width: "13px", height: "13px" }} />
              </div>
            </div>

            {/* Step 02 */}
            <div className="journey-step-card">
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "14px",
                    background: "#FDF6F2",
                    border: "1.5px solid #F3CFBF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(229, 87, 41, 0.08)",
                  }}>
                    <Code2 style={{ width: "1.25rem", height: "1.25rem", color: "#E55729" }} />
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "#E55729",
                    background: "#FDF6F2",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "9999px",
                    border: "1px solid #F3CFBF",
                  }}>
                    STEP 02
                  </span>
                </div>
                <h4 style={{ fontSize: "1.0625rem", fontWeight: 850, color: "#18181B", letterSpacing: "-0.02em", margin: "0 0 0.5rem" }}>
                  Senior Engineers Build It
                </h4>
                <p style={{ fontSize: "0.8125rem", color: "#52525B", lineHeight: 1.6, margin: 0 }}>
                  {mode === "college"
                    ? "Our engineering team handles 100% of the UI, backend APIs, database, and 60-page IEEE black book report in 48–72 hours."
                    : "Our senior team builds full-stack source code, modern UI, database, auth, and APIs tailored to your vision in 48–72 hours."}
                </p>
              </div>
            </div>

            {/* Connector 02 ➔ 03 */}
            <div className="journey-connector" aria-hidden="true">
              <div className="journey-connector-line" />
              <div className="journey-arrow-badge">
                <ArrowRight className="hidden md:block" style={{ width: "13px", height: "13px" }} />
                <ArrowDown className="block md:hidden" style={{ width: "13px", height: "13px" }} />
              </div>
            </div>

            {/* Step 03 */}
            <div className="journey-step-card">
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "14px",
                    background: "#FDF6F2",
                    border: "1.5px solid #F3CFBF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(229, 87, 41, 0.08)",
                  }}>
                    <Rocket style={{ width: "1.25rem", height: "1.25rem", color: "#E55729" }} />
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "#E55729",
                    background: "#FDF6F2",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "9999px",
                    border: "1px solid #F3CFBF",
                  }}>
                    STEP 03
                  </span>
                </div>
                <h4 style={{ fontSize: "1.0625rem", fontWeight: 850, color: "#18181B", letterSpacing: "-0.02em", margin: "0 0 0.5rem" }}>
                  {mode === "college" ? "1-Click Launch & Viva Prep" : "1-Click Launch & 100% IP"}
                </h4>
                <p style={{ fontSize: "0.8125rem", color: "#52525B", lineHeight: 1.6, margin: 0 }}>
                  {mode === "college"
                    ? "Double-click run.bat (Windows) or run.sh (Mac) to open the app instantly, with 20-slide Viva PPT, examiner Q&A notes, and a live 1-on-1 walkthrough."
                    : "Double-click run.bat (Windows) or run.sh (Mac) to test locally, with 100% intellectual property transfer, deployment guide, and a live 1-on-1 handover."}
                </p>
              </div>
            </div>
          </div>
          <div className="mobile-swipe-hint">← Swipe 3 steps →</div>
        </motion.div>

        {/* Real Tiers — Compact & Premium Figma Cards */}
        <div
          className="mobile-snap-row"
          style={{
            display: "grid",
            gridTemplateColumns: mode === "startup" ? "repeat(auto-fit, minmax(min(100%, 19rem), 1fr))" : "repeat(auto-fit, minmax(min(100%, 17rem), 1fr))",
            gap: "0.85rem",
            marginBottom: "clamp(1.25rem, 3vw, 2.25rem)",
            maxWidth: mode === "startup" ? "42rem" : "60rem",
            margin: "0 auto clamp(1.25rem, 3vw, 2.25rem)",
          }}
        >
          {currentTiers.map((tier, i) => {
            const isSelected = form.tier === tier.id;
            return (
              <motion.div
                key={`${mode}-${tier.id}`}
                role="button"
                tabIndex={0}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.22, delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setForm((p) => ({ ...p, tier: tier.id }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setForm((p) => ({ ...p, tier: tier.id }));
                }}
                style={{
                  textAlign: "left",
                  borderRadius: "16px",
                  padding: "1.1rem 1.15rem 1rem",
                  background: isSelected
                    ? "linear-gradient(175deg, #FFFFFF 0%, #FDF7F3 60%, #FAEDE5 100%)"
                    : "linear-gradient(175deg, #FFFFFF 0%, #FDFBF8 40%, #F8F1E7 100%)",
                  cursor: "pointer",
                  border: `1.5px solid ${isSelected ? "#E55729" : "rgba(220, 208, 188, 0.9)"}`,
                  boxShadow: isSelected
                    ? "inset 0 1px 0 #FFFFFF, 0 8px 22px -3px rgba(229, 87, 41, 0.18)"
                    : "inset 0 1px 0 #FFFFFF, 0 2px 10px -2px rgba(180, 145, 100, 0.08)",
                  transform: isSelected ? "translateY(-2px)" : "translateZ(0)",
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "subpixel-antialiased",
                  transition: "border-color 160ms ease, box-shadow 160ms ease",
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
                      <span style={{ display: "inline-block", padding: ".2rem .75rem", borderRadius: "0 14px 0 10px", background: "#E55729", color: "#fff", fontSize: ".625rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em" }}>
                        Recommended
                      </span>
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".5rem", marginTop: tier.popular ? ".3rem" : 0 }}>
                    <span style={{ fontSize: ".65625rem", fontWeight: 750, padding: ".18rem .55rem", borderRadius: "9999px", background: tier.tagBg, color: tier.tagColor, border: `1px solid ${tier.tagBorder}` }}>
                      {tier.tag}
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <span className="font-display" style={{ fontSize: "1.15rem", fontWeight: 900, color: "var(--navy)", letterSpacing: "-.03em" }}>
                        {tier.price}
                      </span>
                      <span style={{ fontSize: ".6875rem", color: "var(--ink-4)", fontWeight: 600, marginLeft: ".25rem" }}>
                        {tier.usdPrice}
                      </span>
                    </div>
                  </div>

                  <p className="font-display" style={{ fontSize: "1.0625rem", fontWeight: 850, color: "var(--navy)", margin: "0 0 .25rem", letterSpacing: "-.02em" }}>
                    {tier.name}
                  </p>
                  {tier.subtext && (
                    <p style={{ fontSize: ".6875rem", color: "var(--ink-4)", margin: "0 0 .75rem", lineHeight: 1.4 }}>
                      {tier.subtext}
                    </p>
                  )}

                  {/* Concise Feature Bullets */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: ".35rem", padding: 0, margin: 0, listStyle: "none" }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: ".4rem", fontSize: ".78125rem", color: "var(--ink-2)", lineHeight: 1.4 }}>
                        <CheckCircle2 style={{ width: ".8125rem", height: ".8125rem", color: "#E55729", flexShrink: 0, marginTop: ".15rem" }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: ".85rem", paddingTop: ".65rem", borderTop: "1px dashed var(--line)" }}>
                  {tier.exploreHref ? (
                    <Link
                      href={tier.exploreHref}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        padding: ".45rem .75rem",
                        fontSize: ".75rem",
                        fontWeight: 750,
                        borderRadius: "8px",
                        color: "#CB451A",
                        border: "1px solid #F3CFBF",
                        background: "#FDF6F2",
                        textDecoration: "none",
                        gap: ".3rem",
                        transition: "all 140ms ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "#FAEDE5";
                        e.currentTarget.style.borderColor = "#E55729";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "#FDF6F2";
                        e.currentTarget.style.borderColor = "#F3CFBF";
                      }}
                    >
                      <span>{tier.exploreLabel}</span>
                      <ArrowRight style={{ width: ".75rem", height: ".75rem" }} />
                    </Link>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".3rem", fontSize: ".75rem", fontWeight: 750, color: isSelected ? "#E55729" : "var(--ink-4)", padding: ".35rem 0" }}>
                      <CheckCircle2 style={{ width: ".875rem", height: ".875rem" }} />
                      <span>{isSelected ? "Selected for Custom Scope" : "Click to Select Custom"}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="mobile-swipe-hint">← Swipe to choose plan →</div>

        {/* ═══════════════════════════════════════════════════
            INQUIRY FORM — MINIMAL FIGMA DESIGN THINKING CARD
        ═══════════════════════════════════════════════════ */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: "34rem", margin: "0 auto" }}>
          <div style={{
            position: "relative",
            padding: "clamp(1.15rem, 3.5vw, 1.65rem)",
            borderRadius: "24px",
            background: "linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)",
            border: "1.5px solid #EFE6DC",
            boxShadow: "0 20px 48px -12px rgba(24, 24, 27, 0.08), 0 1px 3px rgba(24, 24, 27, 0.03), inset 0 1px 0 #FFFFFF",
            overflow: "hidden",
          }}>
            {/* Top Matte Terracotta Accent Strip */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #EE6E44 0%, #E55729 50%, #CB451A 100%)" }} />

            {/* Header: Clean Studio Desk Pill & SLA */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.55rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.22rem 0.65rem", borderRadius: "9999px", background: "#FDF6F2", border: "1px solid #F3CFBF", fontSize: "0.65625rem", fontWeight: 800, color: "#E55729", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                <Sparkles style={{ width: "11px", height: "11px", color: "#E55729" }} />
                <span>{mode === "college" ? "Custom College Studio" : "Startup Execution Desk"}</span>
              </div>
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#71717A", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 0 2px rgba(34, 197, 94, 0.2)" }} />
                <span>2h Response SLA</span>
              </span>
            </div>

            <h2 className="font-display font-black" style={{ fontSize: "1.25rem", fontWeight: 900, color: "#18181B", letterSpacing: "-.025em", margin: "0 0 0.25rem", lineHeight: 1.25 }}>
              {mode === "college" ? "Request Your Custom College Project" : "Request Startup Idea Execution"}
            </h2>
            <p style={{ fontSize: "0.8125rem", color: "#71717A", margin: "0 0 1.25rem", lineHeight: 1.5 }}>
              {mode === "college"
                ? "Describe your approved topic in plain words. Senior engineers review syllabus guidelines & send an IEEE roadmap on WhatsApp."
                : "Describe your concept in plain words. Senior engineers review feasibility & send technical architecture on WhatsApp."}
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {/* Moment 1 (Hero Input): What do you want to build? */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.35rem" }}>
                  <label htmlFor="topic-input" style={{ fontSize: "0.75rem", fontWeight: 750, color: "#27272A", letterSpacing: "-0.01em" }}>
                    {mode === "college" ? "Your Project Topic or Problem Statement" : "Your Startup Idea or Software Concept"} <span style={{ color: "#E55729" }}>*</span>
                  </label>
                  <span style={{ fontSize: "0.6875rem", color: "#A1A1AA" }}>Plain words ok</span>
                </div>
                <textarea
                  id="topic-input"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder={
                    mode === "college"
                      ? "e.g. AI-powered attendance system with facial recognition, Doctor booking web app, or paste your university problem statement..."
                      : "e.g. B2B AI invoice processing SaaS, telehealth appointment portal, or describe what your software should do..."
                  }
                  style={{
                    ...inputSty(),
                    resize: "vertical",
                    minHeight: "74px",
                    lineHeight: 1.5,
                    padding: "0.65rem 0.75rem",
                    fontSize: "0.84375rem",
                  }}
                />
              </div>

              {/* Moment 2: Contact Row (Full Name & WhatsApp Number) */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))", gap: "0.65rem" }}>
                <div>
                  <label htmlFor="name-input" style={{ display: "block", fontSize: "0.71875rem", fontWeight: 750, color: "#27272A", marginBottom: "0.3rem" }}>
                    Your Name
                  </label>
                  <input
                    id="name-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    style={{ ...inputSty(), padding: "0.55rem 0.7rem", fontSize: "0.8125rem" }}
                  />
                </div>
                <div>
                  <label htmlFor="phone-input" style={{ display: "block", fontSize: "0.71875rem", fontWeight: 750, color: "#27272A", marginBottom: "0.3rem" }}>
                    WhatsApp Number <span style={{ color: "#E55729" }}>*</span>
                  </label>
                  <input
                    id="phone-input"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    style={{ ...inputSty(), padding: "0.55rem 0.7rem", fontSize: "0.8125rem" }}
                  />
                </div>
              </div>

              {/* Moment 3: Delivery Timeline Pills (Replaces clunky date picker) */}
              <div>
                <label style={{ display: "block", fontSize: "0.71875rem", fontWeight: 750, color: "#27272A", marginBottom: "0.35rem" }}>
                  Required Delivery Timeline
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.4rem" }}>
                  {[
                    { id: "48h", label: "⚡ 48–72h Express", sub: "Priority" },
                    { id: "3-5d", label: "📅 3–5 Days", sub: "Standard" },
                    { id: "flexible", label: "⏳ Flexible", sub: "Relaxed" },
                  ].map((opt) => {
                    const active = form.timeline === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, timeline: opt.id }))}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0.45rem 0.25rem",
                          borderRadius: "10px",
                          background: active ? "#FDF6F2" : "#FAF7F2",
                          border: active ? "1.5px solid #E55729" : "1px solid #E5DCD1",
                          cursor: "pointer",
                          transition: "all 140ms ease",
                        }}
                      >
                        <span style={{ fontSize: "0.75rem", fontWeight: active ? 800 : 650, color: active ? "#E55729" : "#3F3F46" }}>
                          {opt.label}
                        </span>
                        <span style={{ fontSize: "0.625rem", color: active ? "#CB451A" : "#A1A1AA", fontWeight: 600 }}>
                          {opt.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Progressive Disclosure: Optional Details */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced((prev) => !prev)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0.25rem 0",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: showAdvanced ? "#E55729" : "#71717A",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    transition: "color 150ms ease",
                  }}
                >
                  <span>{showAdvanced ? "− Hide optional details" : "+ Add university, tech stack, or guide guidelines (Optional)"}</span>
                </button>

                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.65rem",
                      marginTop: "0.5rem",
                      padding: "0.75rem",
                      background: "#FAF7F2",
                      borderRadius: "12px",
                      border: "1px dashed #E5DCD1",
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))", gap: "0.5rem" }}>
                      <div>
                        <label htmlFor="college-input" style={{ display: "block", fontSize: "0.6875rem", fontWeight: 700, color: "#52525B", marginBottom: "0.2rem" }}>
                          {mode === "college" ? "College / University" : "Company / Organization"}
                        </label>
                        <input
                          id="college-input"
                          name="college"
                          value={form.college}
                          onChange={handleChange}
                          placeholder={mode === "college" ? "e.g. VTU, Pune University" : "e.g. Stealth, Independent"}
                          style={{ ...inputSty(), background: "#FFFFFF", padding: "0.45rem 0.6rem", fontSize: "0.78125rem" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="email-input" style={{ display: "block", fontSize: "0.6875rem", fontWeight: 700, color: "#52525B", marginBottom: "0.2rem" }}>
                          Email (Optional)
                        </label>
                        <input
                          id="email-input"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@gmail.com"
                          style={{ ...inputSty(), background: "#FFFFFF", padding: "0.45rem 0.6rem", fontSize: "0.78125rem" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="tech-select" style={{ display: "block", fontSize: "0.6875rem", fontWeight: 700, color: "#52525B", marginBottom: "0.2rem" }}>
                        Preferred Tech Stack
                      </label>
                      <select
                        id="tech-select"
                        name="techPreference"
                        value={form.techPreference}
                        onChange={handleChange}
                        style={{ ...inputSty(), background: "#FFFFFF", padding: "0.45rem 0.6rem", fontSize: "0.78125rem", appearance: "auto", cursor: "pointer" }}
                      >
                        {TECH_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="special-notes-input" style={{ display: "block", fontSize: "0.6875rem", fontWeight: 700, color: "#52525B", marginBottom: "0.2rem" }}>
                        Guide Guidelines / Special Requirements
                      </label>
                      <input
                        id="special-notes-input"
                        name="specialRequirements"
                        value={form.specialRequirements}
                        onChange={handleChange}
                        placeholder="e.g. Specific dataset, ML algorithm, or IEEE paper reference..."
                        style={{ ...inputSty(), background: "#FFFFFF", padding: "0.45rem 0.6rem", fontSize: "0.78125rem" }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Value Assurance Chip (Replaced confusing ₹299 bar) */}
              <div style={{
                padding: "0.55rem 0.85rem",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #FDF6F2 0%, #FAEDE5 100%)",
                border: "1px solid #F3CFBF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "0.15rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", minWidth: 0 }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E55729", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#18181B", whiteSpace: "nowrap" }}>
                    {mode === "college" ? "Custom College Build" : "Custom Startup Build"}
                  </span>
                  <span style={{ fontSize: "0.6875rem", color: "#71717A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    · {mode === "college" ? "Code + 60p IEEE Docx + Viva PPT" : "Full-Stack Code + 100% IP"}
                  </span>
                </div>
                <span style={{ fontSize: "0.875rem", fontWeight: 900, color: "#E55729", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>
                  Starts ₹1,999
                </span>
              </div>

              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 0.75rem", borderRadius: "8px", background: "#FFF1F2", border: "1px solid #FFE4E6", fontSize: "0.75rem", color: "#E11D48" }}>
                  ⚠ {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "9999px",
                  background: "#18181B",
                  color: "#FFFFFF",
                  fontSize: "0.875rem",
                  fontWeight: 750,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(24, 24, 27, 0.2)",
                  transition: "all 150ms ease",
                  marginTop: "0.25rem",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#27272A";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#18181B";
                  e.currentTarget.style.transform = "none";
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 style={{ width: "1rem", height: "1rem" }} className="animate-spin" />
                    <span>Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle style={{ width: "1.05rem", height: "1.05rem", color: "#25D366" }} />
                    <span>Get Free Feasibility &amp; Quote on WhatsApp</span>
                    <ArrowRight style={{ width: "0.875rem", height: "0.875rem" }} />
                  </>
                )}
              </button>

              {/* Micro Trust Guarantee & Instant Link */}
              <div style={{ textAlign: "center", marginTop: "0.35rem" }}>
                <p style={{ fontSize: "0.6875rem", color: "#71717A", margin: "0 0 0.2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem" }}>
                  <Lock style={{ width: "10px", height: "10px", color: "#71717A" }} />
                  <span>100% Confidential · Free Architecture Review · Direct WhatsApp SLA</span>
                </p>
                <p style={{ fontSize: "0.6875rem", color: "#A1A1AA", margin: 0 }}>
                  Need instant answer?{" "}
                  <a
                    href={`https://wa.me/918799814256?text=${encodeURIComponent("Hi SubmitKit! I want to request a custom project. My topic is: ")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#E55729", fontWeight: 700, textDecoration: "none" }}
                  >
                    Chat directly on WhatsApp →
                  </a>
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        {/* ════ POPULAR STARTUP TYPES FOR NON-CODERS ════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.18 }}
          style={{ maxWidth: "62rem", margin: "4rem auto 0" }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span style={{ fontSize: ".6875rem", fontWeight: 800, color: "#E55729", textTransform: "uppercase", letterSpacing: ".12em" }}>
              Custom Engineering &amp; Software Specialization
            </span>
            <h3 className="font-display" style={{ fontSize: "clamp(1.35rem, 3vw, 1.85rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: "-.03em", margin: ".35rem 0 .5rem" }}>
              Popular College Projects &amp; Custom Software We Build
            </h3>
            <p style={{ fontSize: ".875rem", color: "var(--ink-3)", maxWidth: "38rem", margin: "0 auto" }}>
              From advanced academic capstones to full-scale SaaS platforms — we build production-ready systems tailored to university guidelines or market launch.
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
                  <span style={{ fontSize: ".625rem", fontWeight: 800, padding: ".2rem .5rem", borderRadius: "6px", background: "#FDF6F2", color: "#E55729", border: "1px solid #F3CFBF", letterSpacing: ".05em", textTransform: "uppercase" }}>
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
              <span style={{ fontSize: ".6875rem", fontWeight: 800, color: "#E55729", textTransform: "uppercase", letterSpacing: ".12em" }}>
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
                  <th style={{ padding: ".75rem", color: "#CB451A", fontWeight: 800, background: "rgba(229, 87, 41, 0.08)", borderRadius: "8px 8px 0 0" }}>SubmitKit Studio</th>
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
                    <td style={{ padding: ".75rem", fontWeight: 750, color: "#CB451A", background: "rgba(229, 87, 41, 0.04)" }}>
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

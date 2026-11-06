"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, Code2, FileText, Presentation, Zap, Clock, Star, Shield, MessageCircle, Send, Loader2, Home, ChevronRight } from "lucide-react";

const TECH_OPTIONS = ["Python + Flask/FastAPI", "Python + Streamlit (AI/ML)", "Next.js + React", "Node.js + Express", "React Native (Mobile)", "Django", "Java Spring Boot", "MERN Stack", "No Preference (Team Decides)"];

const CATEGORY_OPTIONS = ["AI & Machine Learning", "Deep Learning / Computer Vision", "NLP / ChatBot / LLM", "IoT & Embedded Systems", "Full Stack Web App", "Cybersecurity", "FinTech / Banking", "Healthcare / Medical", "Data Science / Analytics", "Blockchain / Web3", "Mobile App", "Other"];

const TIERS = [
  {
    id: "mini", name: "Mini Project", price: "₹299", tag: "Sem 5 / 6 Ready Kit",
    exploreHref: "/projects?tier=MINI",
    exploreLabel: "Explore 25+ Mini Kits (₹299)",
    tagBg: 'var(--teal-50)', tagColor: 'var(--teal-dark)', tagBorder: 'var(--teal-100)',
    features: [
      "Complete working source code (1-click runnable)",
      "20-page IEEE Black Book report (.docx)",
      "10-slide Viva defense presentation PPT",
      "Top 15 Viva Q&A with answers",
      "README with setup instructions",
      "Instant download & WhatsApp support"
    ],
  },
  {
    id: "major", name: "Major Project", price: "₹499", tag: "Sem 7 / 8 Final Year",
    exploreHref: "/projects?tier=MAJOR",
    exploreLabel: "Explore 30+ Major Kits (₹499)",
    tagBg: 'var(--violet-50)', tagColor: 'var(--violet)', tagBorder: 'var(--violet-100)',
    features: [
      "Full working source code (AI/ML/Web logic included)",
      "60-page IEEE Black Book report (.docx)",
      "20-slide defense PPT with speaker notes",
      "Top 25 Viva Q&A with examiner-level answers",
      "System architecture diagram & deployment guide",
      "Instant download & WhatsApp support"
    ],
  },
  {
    id: "custom", name: "Custom Project", price: "₹1,999", tag: "Custom Built to Topic",
    subtext: "*Starts ₹1,999 · Varies with complexity",
    popular: true,
    tagBg: 'var(--amber-50)', tagColor: 'var(--amber)', tagBorder: 'var(--amber-100)',
    features: [
      "Built to your guide's exact approved topic",
      "Starts ₹1,999 (varies with topic complexity)",
      "Tailored algorithm, custom dataset & clean code",
      "Complete 60+ page custom IEEE Black Book report",
      "Custom defense PPT + examiner Viva Q&A prep",
      "1-on-1 code walkthrough on WhatsApp / Meet",
      "Delivered in 48–72 hours with bug-free guarantee"
    ],
  },
];

const inputSty = (extra?: React.CSSProperties): React.CSSProperties => ({
  width: '100%', background: 'var(--surface-2)', border: '1.5px solid var(--line)', borderRadius: '10px',
  padding: '.6875rem .875rem', fontSize: '.9375rem', color: 'var(--ink)', outline: 'none',
  fontFamily: 'var(--font-sans)', transition: 'border-color 150ms, background 150ms', ...extra,
});

export function CustomProjectClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "", category: "", topic: "", techPreference: "No Preference (Team Decides)", deadline: "", specialRequirements: "", tier: "custom" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const selectedTier = TIERS.find(t => t.id === form.tier) || TIERS[2]!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null);
    if (!form.name.trim())         return setError("Please enter your name.");
    if (!form.email.includes("@")) return setError("Please enter a valid email address.");
    if (form.phone.replace(/\D/g, "").length < 10) return setError("Please enter a valid 10-digit WhatsApp number.");
    if (!form.category)            return setError("Please select a project category.");
    if (!form.topic.trim())        return setError("Please enter your project topic or idea.");

    setSubmitting(true);

    const waText = `Hi SubmitKit! I want to request a custom project.

👤 Name: ${form.name.trim()}
📞 WhatsApp: ${form.phone.trim()}
📧 Email: ${form.email.trim()}
🏫 College: ${form.college.trim() || "Not specified"}
📦 Selected Tier: ${selectedTier.name} (${selectedTier.id === 'custom' ? 'Starts ₹1,999 onwards' : selectedTier.price})
🗂️ Category: ${form.category}
💡 Topic: ${form.topic.trim()}
⚙️ Tech Preference: ${form.techPreference}
📅 Deadline: ${form.deadline || "Flexible"}
📝 Special Notes: ${form.specialRequirements.trim() || "None"}`;

    const waUrl = `https://wa.me/918799814256?text=${encodeURIComponent(waText)}`;

    // Fire API asynchronously in background
    try {
      fetch("/api/custom-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(() => {});
    } catch (_) {}

    // Open WhatsApp immediately
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    const waText = `Hi SubmitKit! I submitted a custom project request for "${form.topic}" (${selectedTier.name}). My name is ${form.name}.`;
    return (
      <div style={{ minHeight: '100vh', background: 'var(--canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}
          className="card" style={{ maxWidth: '30rem', width: '100%', padding: '2.5rem 2rem', textAlign: 'center', borderRadius: '22px', boxShadow: 'var(--sh-xl)' }}
        >
          <div style={{ width: '4rem', height: '4rem', borderRadius: '18px', background: 'var(--emerald-50)', border: '1px solid var(--emerald-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <CheckCircle2 style={{ width: '1.75rem', height: '1.75rem', color: 'var(--emerald)' }} />
          </div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.03em', marginBottom: '.5rem' }}>Request Submitted!</h2>
          <p style={{ fontSize: '.9375rem', color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
            WhatsApp window has been opened with your project brief. You can also explore all ready kits and blueprints below.
          </p>
          <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem', textAlign: 'left', background: 'var(--surface-2)' }}>
            {[{ l: 'Topic', v: form.topic }, { l: 'Selected Tier', v: `${selectedTier.name} (${selectedTier.id === 'custom' ? 'Starts ₹1,999' : selectedTier.price})` }, { l: 'WhatsApp', v: form.phone }].map(r => (
              <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.875rem', paddingBottom: '.375rem', marginBottom: '.375rem', borderBottom: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--ink-4)' }}>{r.l}</span>
                <span style={{ fontWeight: 700, color: 'var(--navy)', textAlign: 'right', maxWidth: '14rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            <a href={`https://wa.me/918799814256?text=${encodeURIComponent(waText)}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-teal" style={{ justifyContent: 'center', borderRadius: '12px', minHeight: '50px', fontSize: '.9375rem' }}
            >
              <MessageCircle style={{ width: '1.125rem', height: '1.125rem' }} />
              Open WhatsApp Chat Now
            </a>
            <Link href="/" className="btn btn-outline" style={{ justifyContent: 'center', borderRadius: '12px', minHeight: '50px', textDecoration: 'none', fontSize: '.9375rem' }}>
              <Home style={{ width: '1rem', height: '1rem' }} /> Explore SubmitKit (Home)
            </Link>
            <Link href="/projects" style={{ fontSize: '.8125rem', color: 'var(--teal)', fontWeight: 700, textDecoration: 'none', marginTop: '.25rem' }}>
              Browse Ready-to-Ship Kits →
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Ambient orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} aria-hidden>
        <div className="aorb" style={{ position: 'absolute', width: '600px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245, 237, 222, 0.6) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)', filter: 'blur(70px)' }} />
      </div>

      {/* Breadcrumb — warm glassmorphic blend */}
      <div style={{ background: 'rgba(253, 251, 247, 0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--line)', position: 'sticky', top: '64px', zIndex: 40 }}>
        <div className="shell" style={{ padding: '.875rem 0' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '.8125rem', color: 'var(--ink-4)' }}>
            <Link href="/" className="breadcrumb-link" style={{ color: 'var(--ink-4)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '.25rem' }}>
              <Home style={{ width: '.8125rem', height: '.8125rem' }} /> Home
            </Link>
            <ChevronRight style={{ width: '.75rem', height: '.75rem' }} />
            <span style={{ color: 'var(--navy)', fontWeight: 600 }}>Custom Project</span>
          </nav>
        </div>
      </div>

      <div className="shell" style={{ paddingTop: '3rem', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}
          style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '44rem', margin: '0 auto 3rem' }}
        >
          <span className="label-chip" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Built Exactly for You</span>
          <h1 className="font-display font-black" style={{ fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-.04em', color: 'var(--navy)', lineHeight: 1.1, marginTop: '.875rem', marginBottom: '1rem' }}>
            Can&apos;t Find Your Topic?{' '}
            <span className="text-teal-grad">We&apos;ll Build It for You.</span>
          </h1>
          <p style={{ fontSize: 'clamp(.9375rem,2vw,1.0625rem)', color: 'var(--ink-3)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            Tell us your project topic. We deliver a <strong style={{ color: 'var(--navy)' }}>100% working codebase</strong>, IEEE-format Black Book, defense PPT, and complete Viva Q&amp;A — tailored to your college requirements.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '.625rem 1.5rem', fontSize: '.9rem' }}>
            {[{ Icon: Clock, t: "Delivered in 3–10 days" }, { Icon: Shield, t: "100% plagiarism-free" }, { Icon: Star, t: "IIT-grade code quality" }, { Icon: MessageCircle, t: "WhatsApp support" }].map(({ Icon, t }) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '.375rem', color: 'var(--ink-3)', fontWeight: 500 }}>
                <Icon style={{ width: '.9375rem', height: '.9375rem', color: 'var(--teal)' }} />{t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tier cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1rem', marginBottom: '3rem', maxWidth: '60rem', margin: '0 auto 3rem' }}>
          {TIERS.map((tier, i) => (
            <motion.div key={tier.id}
              role="button"
              tabIndex={0}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: i * .08 }}
              onClick={() => setForm(p => ({ ...p, tier: tier.id }))}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setForm(p => ({ ...p, tier: tier.id })); } }}
              style={{
                textAlign: 'left', borderRadius: '18px', padding: '1.5rem',
                background: 'var(--surface)', cursor: 'pointer',
                border: `2px solid ${form.tier === tier.id ? 'var(--teal)' : 'var(--line)'}`,
                boxShadow: form.tier === tier.id ? 'var(--sh-teal)' : 'var(--sh-sm)',
                transform: form.tier === tier.id ? 'translateY(-2px)' : 'none',
                transition: 'all 180ms cubic-bezier(.16,1,.3,1)',
                position: 'relative', overflow: 'hidden',
                fontFamily: 'var(--font-sans)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}
            >
              <div>
                {tier.popular && (
                  <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)' }}>
                    <span style={{ display: 'block', padding: '.1875rem .75rem', borderRadius: '0 0 8px 8px', background: 'var(--teal)', color: '#fff', fontSize: '.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap' }}>
                      Most Popular
                    </span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.625rem', marginBottom: '1rem', marginTop: tier.popular ? '.75rem' : 0 }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p className="font-display" style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '.375rem', whiteSpace: 'nowrap' }}>{tier.name}</p>
                    <span style={{ fontSize: '.6875rem', fontWeight: 700, padding: '.25rem .625rem', borderRadius: '9999px', background: tier.tagBg, color: tier.tagColor, border: `1px solid ${tier.tagBorder}`, whiteSpace: 'nowrap', display: 'inline-block' }}>{tier.tag}</span>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, whiteSpace: 'nowrap' }}>
                    <p className="font-display" style={{ fontSize: '1.4375rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.03em', lineHeight: 1.1, whiteSpace: 'nowrap' }}>{tier.price}</p>
                    <p style={{ fontSize: '.6875rem', color: 'var(--ink-4)', fontWeight: 600, marginTop: '2px', whiteSpace: 'nowrap' }}>{tier.id === 'custom' ? 'starts onwards' : 'one-time'}</p>
                    {tier.subtext && (
                      <span style={{ display: 'block', fontSize: '.5625rem', color: '#B45309', fontWeight: 700, marginTop: '2px', whiteSpace: 'nowrap' }}>
                        {tier.subtext}
                      </span>
                    )}
                  </div>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '.4375rem' }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', fontSize: '.8125rem', color: 'var(--ink-2)' }}>
                      <CheckCircle2 style={{ width: '.875rem', height: '.875rem', color: 'var(--teal)', flexShrink: 0, marginTop: '.125rem' }} />{f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {/* Direct Link to Explore Ready Kits on Mini and Major */}
                {tier.exploreHref && (
                  <div style={{ marginTop: '1.25rem', paddingTop: '.875rem', borderTop: '1px dashed var(--line)' }}>
                    <Link
                      href={tier.exploreHref}
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn-outline"
                      style={{
                        width: '100%',
                        minHeight: '38px',
                        fontSize: '.8125rem',
                        fontWeight: 700,
                        justifyContent: 'center',
                        borderRadius: '10px',
                        color: 'var(--teal-dark)',
                        borderColor: 'var(--teal-100)',
                        background: 'var(--surface-teal)',
                        textDecoration: 'none',
                        gap: '.375rem',
                      }}
                    >
                      <span>{tier.exploreLabel}</span>
                      <ArrowRight style={{ width: '.875rem', height: '.875rem' }} />
                    </Link>
                  </div>
                )}

                {form.tier === tier.id && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.375rem', marginTop: '.875rem', fontSize: '.8125rem', fontWeight: 700, color: 'var(--teal)' }}>
                    <CheckCircle2 style={{ width: '.9375rem', height: '.9375rem' }} /> Selected Tier — Fill Details Below ↓
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: .2 }}
          style={{ maxWidth: '38rem', margin: '0 auto' }}
        >
          <div className="card" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '22px', boxShadow: 'var(--sh-lg)' }}>
            <h2 className="font-display" style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.03em', marginBottom: '.375rem' }}>Request Your Custom Project</h2>
            <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', marginBottom: '1.75rem', lineHeight: 1.65 }}>Fill in the details below. We&apos;ll confirm within 2 hours on WhatsApp/email.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '1rem' }}>
                {[{ n: 'name', l: 'Full Name *', p: 'Your full name' }, { n: 'email', l: 'Email *', p: 'you@gmail.com', t: 'email' }].map(f => (
                  <div key={f.n}>
                    <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>{f.l}</label>
                    <input name={f.n} type={f.t || 'text'} value={(form as any)[f.n]} onChange={handleChange} placeholder={f.p} style={inputSty()} />
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '1rem' }}>
                {[{ n: 'phone', l: 'WhatsApp Number *', p: '+91 98765 43210' }, { n: 'college', l: 'College Name', p: 'e.g. VTU, Mumbai University...' }].map(f => (
                  <div key={f.n}>
                    <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>{f.l}</label>
                    <input name={f.n} type="text" value={(form as any)[f.n]} onChange={handleChange} placeholder={f.p} style={inputSty()} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>Project Category *</label>
                <select name="category" value={form.category} onChange={handleChange} style={{ ...inputSty(), appearance: 'auto', cursor: 'pointer' }}>
                  <option value="">Select a category...</option>
                  {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>Project Topic / Title *</label>
                <input name="topic" value={form.topic} onChange={handleChange} placeholder="e.g. Facial Recognition Attendance System using CNN" style={inputSty()} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>Tech Preference</label>
                  <select name="techPreference" value={form.techPreference} onChange={handleChange} style={{ ...inputSty(), appearance: 'auto', cursor: 'pointer' }}>
                    {TECH_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>Submission Deadline</label>
                  <input name="deadline" type="date" value={form.deadline} onChange={handleChange} min={new Date().toISOString().split("T")[0]} style={inputSty()} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>Special Requirements / Notes</label>
                <textarea name="specialRequirements" value={form.specialRequirements} onChange={handleChange} rows={3}
                  placeholder="Any specific modules, datasets, university format requirements..."
                  style={{ ...inputSty(), resize: 'vertical', minHeight: '4.5rem', lineHeight: 1.65 }}
                />
              </div>

              {/* Tier summary */}
              <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--surface-teal)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '.875rem', fontWeight: 700, color: 'var(--navy)' }}>{selectedTier.name}</p>
                  <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)' }}>{selectedTier.tag}</p>
                </div>
                <span className="font-display" style={{ fontSize: '1.375rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.04em' }}>{selectedTier.price}</span>
              </div>

              {error && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.625rem', padding: '.875rem', borderRadius: '12px', background: 'var(--rose-50)', border: '1px solid var(--rose-100)', fontSize: '.875rem', color: 'var(--rose)' }}>
                  ⚠ {error}
                </div>
              )}

              <button type="submit" disabled={submitting} className="btn btn-teal" style={{ justifyContent: 'center', borderRadius: '13px', minHeight: '56px', fontSize: '1rem', fontWeight: 700, opacity: submitting ? .7 : 1 }}>
                {submitting ? (
                  <><Loader2 style={{ width: '1.125rem', height: '1.125rem', animation: 'spin .7s linear infinite' }} /> Connecting to WhatsApp…</>
                ) : (
                  <><MessageCircle style={{ width: '1.125rem', height: '1.125rem' }} /> Submit &amp; Chat on WhatsApp ({selectedTier.id === 'custom' ? 'Starts ₹1,999' : selectedTier.price})</>
                )}
              </button>

              <p style={{ textAlign: 'center', fontSize: '.8125rem', color: 'var(--ink-4)', lineHeight: 1.65 }}>
                Or{' '}
                <a href={`https://wa.me/918799814256?text=${encodeURIComponent('Hi SubmitKit! I want to request a custom project. My topic / idea is: ')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)', fontWeight: 700, textDecoration: 'none' }}>
                  chat directly on WhatsApp
                </a>{' '}
                for fastest response.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

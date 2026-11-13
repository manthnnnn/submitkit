'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Sparkles, 
  GraduationCap, 
  Terminal, 
  HelpCircle, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  id: string;
  category: 'non-coder' | 'college' | 'setup';
  question: string;
  answer: string;
  badge?: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'non-coder-1',
    category: 'non-coder',
    badge: 'Zero Code',
    question: 'Can I build software or a startup MVP if I do not know how to code?',
    answer: 'Yes, absolutely. SubmitKit is built specifically for non-coders, non-technical founders, and solo entrepreneurs. You do not need to learn programming, Git, or server management. You simply describe your product vision, desired features, or problem statement in plain English or a voice note. Our senior engineering team builds 100% of the production software (frontend UI, backend APIs, database architecture, and authentication), gives you an automated 1-click launcher, and guides you through a 1-on-1 walkthrough so you can operate and showcase your software with complete confidence.',
  },
  {
    id: 'non-coder-2',
    category: 'non-coder',
    badge: '48h Delivery',
    question: 'How much does it cost to build custom software, and how fast is it delivered?',
    answer: 'Custom project prototypes and startup MVPs start at ₹1,999 (~$24 USD) for starter proof-of-concepts, with production-grade working applications delivered in just 48 to 72 hours. Traditional software agencies frequently quote $5,000+ and take 3–6 months. Our rapid-build engineering workflow eliminates agency bloat, delivering clean, tested code and working deployments at a fraction of the time and cost.',
  },
  {
    id: 'non-coder-3',
    category: 'non-coder',
    badge: '100% IP',
    question: 'Do I get full ownership of the source code and intellectual property (IP)?',
    answer: 'Yes, 100%. You receive complete, unencrypted source code with full commercial ownership rights. You can deploy it to production (Vercel, AWS, Cloudflare, Supabase), pitch it to angel investors or accelerators, and hire developers later to scale it. There are zero monthly lock-in fees or proprietary platform restrictions.',
  },
  {
    id: 'non-coder-4',
    category: 'non-coder',
    badge: '1-Click Run',
    question: 'How do I run and test the software if I have no technical background?',
    answer: 'Every SubmitKit project comes with automated 1-click desktop launchers: run.bat for Windows and run.sh for Mac/Linux. You never touch terminal commands or environment variables — you simply double-click the launcher file. It automatically configures virtual environments, installs packages, spins up background servers, and opens the running app in your web browser. Additionally, our senior engineers offer a 1-on-1 walkthrough on WhatsApp or Google Meet.',
  },
  {
    id: 'college-1',
    category: 'college',
    badge: '7 Deliverables',
    question: 'What is included in each ₹299 (Mini) and ₹499 (Major) college project kit?',
    answer: 'Every kit delivers all 7 mandatory academic deliverables: (1) Complete verified runnable source code, (2) Windows 1-click double-click launcher (run.bat), (3) Mac/Linux launcher (run.sh), (4) README_FIRST.txt 30-second setup guide, (5) Editable IEEE Black Book project report (.docx with Certificates, Abstract, System Architecture, UML Diagrams, Test Cases), (6) 15-to-20 slide defense presentation (.pptx), and (7) Viva Voce preparation notes with slide-by-slide speaker scripts and top 25 examiner Q&A.',
  },
  {
    id: 'college-2',
    category: 'college',
    badge: 'Guaranteed',
    question: 'How do you guarantee the project will run on my laptop?',
    answer: 'Every project kit undergoes rigorous sandbox testing across fresh Windows, Mac, and Linux installations before publishing. Because dependencies, paths, and environments are automated through run.bat and run.sh, running the project requires zero manual configuration. In the rare event you encounter any environment conflict, our engineering team provides direct WhatsApp support to ensure it runs flawlessly on your laptop.',
  },
  {
    id: 'college-3',
    category: 'college',
    badge: 'IEEE Standard',
    question: 'Are the project reports compliant with university IEEE guidelines?',
    answer: 'Yes. Our reports are authored in strict accordance with standard IEEE Black Book format recognized by AICTE, UGC, and autonomous universities across India (VTU, Mumbai University, Pune SPPU, Anna University, JNTU, GTU, RGPV, and others). All sections — Certificate, Declaration, Acknowledgement, Abstract, Literature Review, System Design, Data Flow Diagrams, Test Cases, and References — are fully editable in Microsoft Word (.docx).',
  },
  {
    id: 'college-4',
    category: 'college',
    badge: 'Instant Delivery',
    question: 'How quickly do I receive my project download after paying?',
    answer: 'Delivery is 100% instant and automated. Within 30 to 60 seconds of completing your UPI or card payment via Razorpay, you receive instant on-screen download access, plus a direct download link sent to your registered WhatsApp number and email. You can also re-download your files anytime using our 24/7 Order Lookup page.',
  },
  {
    id: 'setup-1',
    category: 'setup',
    badge: 'Custom Topics',
    question: 'What if my guide approved a unique topic not in your ready catalog?',
    answer: 'We build custom projects tailored to your exact college synopsis or startup idea! Simply submit your approved title on our Customize Project page or message us on WhatsApp (+91 87998 14256). Our engineering team will review your specifications, confirm the tech stack, and deliver full working code, IEEE documentation, and presentation deck within 48 to 72 hours.',
  },
  {
    id: 'setup-2',
    category: 'setup',
    badge: 'Viva Defense',
    question: 'How do the Viva Voce preparation notes help me score top marks?',
    answer: 'Most students lose marks in Viva exams because they struggle to explain system flow or algorithms under pressure. Every SubmitKit kit includes Viva_Presentation_Notes.md, which gives you slide-by-slide speaker notes (telling you exactly what to say for each slide) and the Top 25 examiner Viva questions with clear, impressive, concept-first answers. You walk into your defense fully prepared.',
  },
];

type CategoryFilter = 'all' | 'non-coder' | 'college' | 'setup';

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [openIds, setOpenIds] = useState<string[]>(['non-coder-1', 'college-1']);

  const toggleOpen = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQS.filter(f => 
    activeCategory === 'all' ? true : f.category === activeCategory
  );

  return (
    <section 
      id="faq" 
      style={{ 
        position: 'relative', 
        zIndex: 1, 
        padding: 'clamp(3rem, 6vw, 5.5rem) 0',
        background: 'linear-gradient(180deg, rgba(250, 246, 238, 0.4) 0%, rgba(245, 238, 226, 0.8) 100%)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div className="shell" style={{ maxWidth: '58rem' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.6875rem', fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '.625rem', padding: '.25rem .75rem', borderRadius: '9999px', background: 'var(--teal-50)', border: '1px solid var(--teal-100)' }}>
            <HelpCircle style={{ width: '13px', height: '13px' }} />
            Answers to Common Questions
          </div>
          <h2 className="font-display font-black" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-.035em', color: 'var(--navy)', lineHeight: 1.2, margin: '0 0 .875rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: 'clamp(.9375rem, 2vw, 1.1rem)', color: 'var(--ink-3)', lineHeight: 1.7, maxWidth: '40rem', margin: '0 auto' }}>
            Everything you need to know about building custom software without coding, instant college project kits, IEEE documentation, and 1-click execution.
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'center', marginBottom: '2.25rem' }}>
          {[
            { id: 'all', label: 'All Questions', count: FAQS.length, icon: HelpCircle },
            { id: 'non-coder', label: 'Non-Coders & MVPs', count: 4, icon: Sparkles },
            { id: 'college', label: 'College Project Kits', count: 4, icon: GraduationCap },
            { id: 'setup', label: '1-Click Run & Viva', count: 2, icon: Terminal },
          ].map(tab => {
            const isSelected = activeCategory === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.45rem',
                  padding: '.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '.8125rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  border: isSelected ? '1.5px solid var(--teal)' : '1px solid var(--line)',
                  background: isSelected 
                    ? 'linear-gradient(180deg, #FFFFFF 0%, #F0FDF9 100%)' 
                    : 'var(--surface)',
                  color: isSelected ? 'var(--teal-dark)' : 'var(--ink-3)',
                  boxShadow: isSelected ? '0 2px 10px rgba(13, 148, 136, 0.15)' : 'none',
                  transition: 'all 160ms cubic-bezier(.16,1,.3,1)',
                }}
              >
                <Icon style={{ width: '14px', height: '14px', color: isSelected ? 'var(--teal)' : 'var(--ink-4)' }} />
                <span>{tab.label}</span>
                <span style={{ 
                  fontSize: '.6875rem', 
                  padding: '.1rem .4rem', 
                  borderRadius: '9999px',
                  background: isSelected ? 'var(--teal)' : 'var(--surface-2)',
                  color: isSelected ? '#FFFFFF' : 'var(--ink-4)',
                  fontWeight: 700,
                }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16, delay: index * 0.02 }}
                style={{
                  borderRadius: '16px',
                  background: 'linear-gradient(175deg, #FFFFFF 0%, #FDFBF8 40%, #F7EEE0 100%)',
                  border: isOpen ? '1.5px solid var(--teal-200)' : '1.5px solid rgba(220, 208, 188, 0.85)',
                  boxShadow: isOpen 
                    ? 'inset 0 1px 0 #FFFFFF, 0 6px 20px -3px rgba(13, 148, 136, 0.14)' 
                    : 'inset 0 1px 0 #FFFFFF, 0 2px 8px -2px rgba(180, 145, 100, 0.08)',
                  overflow: 'hidden',
                  transition: 'border-color 160ms, box-shadow 160ms',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(faq.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.375rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', flexWrap: 'wrap', flex: 1 }}>
                    {faq.badge && (
                      <span style={{
                        fontSize: '.625rem',
                        fontWeight: 800,
                        padding: '.15rem .5rem',
                        borderRadius: '6px',
                        background: faq.category === 'non-coder' ? 'rgba(217, 119, 6, 0.1)' : 'var(--teal-50)',
                        color: faq.category === 'non-coder' ? '#B45309' : 'var(--teal-dark)',
                        border: faq.category === 'non-coder' ? '1px solid rgba(217, 119, 6, 0.25)' : '1px solid var(--teal-100)',
                        letterSpacing: '.04em',
                        textTransform: 'uppercase',
                      }}>
                        {faq.badge}
                      </span>
                    )}
                    <span style={{
                      fontSize: '1.025rem',
                      fontWeight: 750,
                      color: isOpen ? 'var(--navy)' : 'var(--ink)',
                      letterSpacing: '-.02em',
                      lineHeight: 1.4,
                    }}>
                      {faq.question}
                    </span>
                  </div>

                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: isOpen ? 'var(--teal)' : 'var(--surface-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 160ms ease',
                  }}>
                    <ChevronDown style={{
                      width: '16px',
                      height: '16px',
                      color: isOpen ? '#FFFFFF' : 'var(--ink-3)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 180ms cubic-bezier(.16,1,.3,1)',
                    }} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 1.375rem 1.25rem',
                        borderTop: '1px solid rgba(220, 208, 188, 0.5)',
                        paddingTop: '1rem',
                        fontSize: '.9375rem',
                        color: 'var(--ink-2)',
                        lineHeight: 1.72,
                      }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Live Support Help Dock */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1.5rem',
          borderRadius: '18px',
          background: 'linear-gradient(160deg, #FFFFFF 0%, #FDFBF8 40%, #F5ECE0 100%)',
          border: '1.5px solid rgba(220, 208, 188, 0.95)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          boxShadow: 'inset 0 1px 0 #FFFFFF, 0 8px 24px -4px rgba(180, 145, 100, 0.12)',
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.6875rem', fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '.3rem' }}>
              <ShieldCheck style={{ width: '14px', height: '14px' }} /> Have a unique topic or custom startup idea?
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.025em', margin: 0 }}>
              Talk directly with a Senior Engineer on WhatsApp
            </h3>
            <p style={{ fontSize: '.84375rem', color: 'var(--ink-3)', margin: '.25rem 0 0', lineHeight: 1.5 }}>
              Average response time under 10 minutes. Get instant project scope, tech recommendations, or a quote.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/918799814256?text=Hi%20SubmitKit!%20I%20have%20a%20question%20about%20a%20project%20build."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-teal"
              style={{ gap: '.5rem', fontSize: '.875rem', minHeight: '42px', padding: '0 1.25rem' }}
            >
              <MessageCircle style={{ width: '1.125rem', height: '1.125rem' }} />
              Chat on WhatsApp
            </a>
            <Link
              href="/custom"
              className="btn btn-outline"
              style={{ gap: '.4rem', fontSize: '.875rem', minHeight: '42px', padding: '0 1.125rem', textDecoration: 'none' }}
            >
              Request Custom Build <ArrowRight style={{ width: '1rem', height: '1rem' }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Tag, ArrowRight, BookOpen, ChevronRight, Home,
  Search, FileText, GraduationCap, Lightbulb, Sparkles,
  CheckCircle2, ShieldCheck, Zap
} from 'lucide-react';
import { type BlogPost } from '@/lib/blog-posts';
import { CONSTANTS } from '@/lib/constants';

const CATEGORY_MAP: Record<string, { label: string; icon: React.ComponentType<any> }> = {
  'ALL':             { label: 'All Guides',      icon: BookOpen },
  'IEEE Format':     { label: 'IEEE Black Book', icon: FileText },
  'Guide':           { label: 'Project Guides',  icon: BookOpen },
  'Project Ideas':   { label: 'Project Ideas',   icon: Lightbulb },
  'Viva Prep':       { label: 'Viva Prep',       icon: GraduationCap },
};

export function BlogClient({
  posts,
  faqs,
}: {
  posts: BlogPost[];
  faqs: { question: string; answer: string }[];
}) {
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCat = selectedCat === 'ALL' || post.category === selectedCat;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [posts, selectedCat, searchQuery]);

  return (
    <div style={{ background: 'var(--canvas-base)', minHeight: '100vh', color: 'var(--ink)' }}>
      {/* ── Fixed Ambient Background Orbs ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} aria-hidden>
        <div
          className="aorb"
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(13,148,136,.08) 0%, transparent 70%)',
            top: '-15%',
            right: '-10%',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="aorb"
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,119,6,.06) 0%, transparent 70%)',
            bottom: '25%',
            left: '-8%',
            filter: 'blur(70px)',
            animationDelay: '3s',
          }}
        />
      </div>

      {/* ════════════════════════════════════════════
          3D HERO HEADER
      ════════════════════════════════════════════ */}
      <section
        className="relative z-10 pt-10 sm:pt-14 pb-12 sm:pb-16 border-b border-[var(--line)]"
        style={{
          background: 'linear-gradient(180deg, rgba(253, 251, 247, 0.9) 0%, rgba(250, 246, 238, 0.96) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="shell max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Breadcrumb"
            className="flex items-center text-xs text-slate-500 mb-6 gap-1.5 flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-teal-700 transition-colors inline-flex items-center gap-1 font-semibold text-slate-600"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
            <span className="text-teal-900 font-bold">Project Guides</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/90 text-teal-800 text-xs font-bold tracking-wide uppercase mb-4 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
                </span>
                Verified Project Vault &amp; Guides
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.12] mb-4">
                Engineering Project Guides &amp;<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600">
                  IEEE Black Book Blueprints
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mb-6">
                University-aligned submission guides, IEEE Black Book formats (.docx), and viva defense questions for VTU, SPPU, Mumbai, Anna, JNTU, and GTU engineering students.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="btn btn-teal btn-sm"
                  style={{ borderRadius: '12px', padding: '0 1.25rem' }}
                >
                  <Sparkles className="w-4 h-4 text-teal-200" />
                  <span>Browse Ready Kits</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link
                  href="/blueprint"
                  className="btn btn-outline btn-sm"
                  style={{ borderRadius: '12px', padding: '0 1.25rem' }}
                >
                  <BookOpen className="w-4 h-4 text-teal-700" />
                  <span>1,078 Free Blueprints</span>
                </Link>
              </div>
            </motion.div>

            {/* 3D Floating Metric Strip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="grid grid-cols-3 gap-3 w-full lg:w-auto lg:min-w-[400px]"
            >
              {[
                { num: `${posts.length}+`, label: 'Deep Guides', sub: 'Updated 2026' },
                { num: '500+', label: 'Project Ideas', sub: 'CSE AIML Web' },
                { num: '60p', label: 'IEEE Reports', sub: 'All Universities' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="card p-4 rounded-2xl text-center group transition-all"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    boxShadow: '0 4px 14px -2px rgba(15, 23, 42, 0.05)',
                  }}
                >
                  <div className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-none">
                    {s.num}
                  </div>
                  <div className="text-[11px] font-bold text-teal-800 mt-2 uppercase tracking-wide">
                    {s.label}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FILTER & CONTENT SECTION
      ════════════════════════════════════════════ */}
      <div className="relative z-10 shell max-w-6xl mx-auto py-10 sm:py-14 space-y-12 sm:space-y-16">
        {/* Controls Bar: Category Tabs + Live Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--line)]">
          {/* Segmented Category Filter */}
          <div className="scroll-x no-scrollbar flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200/50 border border-slate-300/60 max-w-full">
            {Object.entries(CATEGORY_MAP).map(([key, { label, icon: Icon }]) => {
              const active = selectedCat === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCat(key)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95"
                  style={{
                    background: active ? '#FFFFFF' : 'transparent',
                    color: active ? 'var(--teal-darker)' : 'var(--ink-3)',
                    boxShadow: active
                      ? '0 2px 8px -1px rgba(13, 148, 136, 0.15)'
                      : 'none',
                    border: active ? '1px solid rgba(13, 148, 136, 0.2)' : '1px solid transparent',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: active ? 'var(--teal)' : 'var(--ink-4)' }} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search guides or topics..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs sm:text-sm bg-white/90 border border-slate-200/90 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
              style={{
                boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.03)',
              }}
            />
          </div>
        </div>

        {/* ── Guides Grid with Staggered Motion ── */}
        <section>
          {filteredPosts.length === 0 ? (
            <div className="card p-12 text-center rounded-2xl border border-slate-200/80 bg-white/80">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">No matching guides found</h3>
              <p className="text-xs text-slate-500 mb-4">Try clearing your search query or selecting &quot;All Guides&quot;.</p>
              <button
                onClick={() => { setSelectedCat('ALL'); setSearchQuery(''); }}
                className="btn btn-teal btn-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, idx) => (
                  <motion.article
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="card card-lift flex flex-col justify-between rounded-2xl overflow-hidden p-6 group cursor-pointer relative"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid rgba(226, 232, 240, 0.9)',
                      boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 8px 24px -4px rgba(15, 23, 42, 0.06)',
                    }}
                  >
                    {/* Top 3D Jewel Accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: 'linear-gradient(90deg, #0D9488 0%, #14B8A6 60%, #059669 100%)',
                      }}
                    />

                    <div>
                      {/* Badge Row */}
                      <div className="flex flex-wrap items-center gap-2 mb-3.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/90 shadow-2xs">
                          {post.category}
                        </span>
                        <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> {post.estimatedReadTime} read
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug mb-2.5">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                        {post.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200/90 text-slate-600 text-[10px] font-medium shadow-2xs"
                          >
                            <Tag className="w-2.5 h-2.5 text-teal-600" /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-xs border border-teal-200/90 shadow-2xs">
                          SK
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-tight">SubmitKit Eng</div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:text-teal-800 transition-colors group-hover:translate-x-0.5 transform"
                      >
                        <span>Read Guide</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* ════════════════════════════════════════════
            SUBMISSION ACCELERATOR (3D Showcase Box)
        ════════════════════════════════════════════ */}
        <section>
          <div
            className="card card-lift relative rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #FFFFFF 0%, #F5FBF9 40%, #FCF9F5 100%)',
              border: '1.5px solid rgba(13, 148, 136, 0.22)',
              boxShadow: '0 20px 50px -12px rgba(13, 148, 136, 0.15)',
            }}
          >
            {/* Ambient Corner Flare */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none opacity-40 blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(13, 148, 136, 0.4) 0%, transparent 70%)',
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold tracking-wide uppercase mb-3.5 shadow-2xs">
                  <Zap className="w-3.5 h-3.5 text-teal-600" />
                  Turn-Key Submission Package
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-tight mb-3">
                  Short on Time? Get the <br className="hidden sm:inline" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-emerald-600">
                    Full Verified Project Kit
                  </span> Today.
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mb-6">
                  <strong>1-click runnable code</strong> + <strong>university-formatted IEEE Black Book (.docx)</strong> + <strong>defense PPT slides</strong> + <strong>examiner Viva Q&amp;A with model answers</strong>. Instant download on WhatsApp &amp; portal.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/projects"
                    className="btn btn-teal btn-sm"
                    style={{ borderRadius: '12px', padding: '0 1.25rem' }}
                  >
                    <span>Browse All Project Kits</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                  <a
                    href={CONSTANTS.SUPPORT_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-wa btn-sm"
                    style={{ borderRadius: '12px', padding: '0 1.25rem' }}
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Mini vs Major Tiers Dock */}
              <div className="lg:col-span-2 space-y-3">
                {[
                  {
                    title: 'Mini Project Kit',
                    price: `₹${CONSTANTS.PRICING.MINI_PROJECT}`,
                    tag: '5th/6th Sem',
                    features: ['30-page IEEE Black Book (.docx)', '1-click runnable code', '12-slide defense PPT', 'Top 15 Viva Q&A with answers'],
                  },
                  {
                    title: 'Major Project Kit',
                    price: `₹${CONSTANTS.PRICING.MAJOR_PROJECT}`,
                    tag: 'Final Year Capstone',
                    highlight: true,
                    features: ['60+ page IEEE Black Book (.docx)', '1-click runnable source code', '20-slide defense PPT with speaker notes', 'Top 25 Viva Q&A with model answers'],
                  },
                ].map((tier, i) => (
                  <div
                    key={i}
                    className="card p-4 rounded-xl border transition-all"
                    style={{
                      background: tier.highlight
                        ? 'linear-gradient(135deg, rgba(240, 253, 250, 0.95) 0%, #FFFFFF 100%)'
                        : '#FFFFFF',
                      borderColor: tier.highlight ? 'rgba(13, 148, 136, 0.3)' : 'rgba(226, 232, 240, 0.9)',
                      boxShadow: tier.highlight
                        ? '0 6px 18px -2px rgba(13, 148, 136, 0.1)'
                        : '0 2px 6px rgba(15, 23, 42, 0.04)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                          {tier.title}
                        </span>
                        <span className="ml-2 text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                          {tier.tag}
                        </span>
                      </div>
                      <div className="font-display font-black text-xl text-slate-900">
                        {tier.price}
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {tier.features.map((f, j) => (
                        <li key={j} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            FAQS (3D Accordion)
        ════════════════════════════════════════════ */}
        <section>
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Submission Support
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to know about IEEE formats, viva defense, and final year submissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="card p-5 rounded-2xl border border-slate-200/90 transition-all group open:border-teal-300 open:shadow-md"
                style={{
                  background: 'var(--surface)',
                  boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
                }}
              >
                <summary className="cursor-pointer font-bold text-slate-900 text-sm sm:text-base flex items-start gap-3 select-none">
                  <span className="text-teal-700 font-black shrink-0 text-base">
                    Q{i + 1}.
                  </span>
                  <span className="leading-snug">{f.question}</span>
                </summary>
                <p className="text-xs sm:text-sm text-slate-600 pl-8 mt-3 leading-relaxed border-t border-slate-100 pt-3">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


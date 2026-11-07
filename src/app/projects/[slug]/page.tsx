import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import { TechBadge } from "@/components/ui/tech-badge";
import { formatCurrency } from "@/lib/utils";
import { CustomerForm } from "@/components/ui/customer-form";
import { UrgencyTimer } from "@/components/ui/urgency-timer";
import { StickyBuyBar } from "@/components/ui/sticky-buy-bar";
import { HowToRun } from "@/components/ui/how-to-run";
import { PreOrderForm } from "@/components/ui/pre-order-form";
import {
  CheckCircle2, ChevronRight, FileText, MonitorPlay,
  Presentation, TerminalSquare, Lock, Star, Zap,
  ShieldCheck, Download, BookOpen, ImageIcon, Sparkles, Clock, Home, ArrowRight, ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next';
import { isProjectAvailable } from "@/lib/available-projects";
import { SHOWCASE_DATA } from "@/lib/project-showcase";
import { CONSTANTS } from "@/lib/constants";
import { BreadcrumbsSchema, ProductSchema } from "@/components/seo/SeoSchema";
import {
  getStaticProjectBySlug,
  getAllStaticProjects,
  generateSyntheticPipelineProject,
  getAvailableProjects,
} from "@/lib/static-catalog";

const BASE_URL = CONSTANTS.APP_URL.replace(/\/$/, '');

async function getProjectData(slug: string): Promise<Project> {
  const staticProj = getStaticProjectBySlug(slug);

  try {
    const fetchPromise = (async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
      if (error) throw error;
      return data as Project;
    })();

    // 500ms timeout prevents DNS or network hangs from stalling page load
    const timeoutPromise = new Promise<Project | null>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 500)
    );

    const remote = await Promise.race([fetchPromise, timeoutPromise]);
    if (remote) return remote;
  } catch {
    // Network or timeout failure — fall back to static catalog
  }

  if (staticProj) return staticProj;
  return generateSyntheticPipelineProject(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectData(slug);

  const title = `${p.title} — ${p.tier === 'MAJOR' ? `Major Final Year Project Kit (₹${p.price_inr})` : `Mini Project Kit (₹${p.price_inr})`} with IEEE Report & Viva | ${CONSTANTS.APP_NAME}`;
  const shortDesc = (p.problem_statement || p.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 180);
  const description = `${shortDesc} 1-click runnable source code, IEEE Black Book, Viva defense PPT, and top 25 Viva Q&A. ${p.tier} project. Instant download.`;

  return {
    title: { absolute: title },
    description,
    keywords: [p.title, `${p.title} project`, `${p.title} source code`, `${p.title} viva questions`, `${p.category} final year project`, 'ieee format report', 'black book report', 'viva preparation', ...CONSTANTS.SEO_KEYWORDS],
    alternates: { canonical: `/projects/${slug}` },
    robots: { index: true, follow: true },
    openGraph: { type: 'website', locale: 'en_IN', url: `${BASE_URL}/projects/${slug}`, siteName: CONSTANTS.APP_NAME, title, description, images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllStaticProjects().map((p: Project) => ({ slug: p.slug }));
}

const VIVA_QS = [
  { q: "What is the main purpose of this project?", a: "This project is designed to solve the problem of managing large-scale data in real time..." },
  { q: "Which algorithm / model did you use and why?", a: "We used a supervised learning approach specifically chosen for its efficiency..." },
  { q: "How does the data flow through the system?", a: "The user inputs data through the frontend which sends it to the API layer..." },
];

/* ─── Shared section title style ─── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem', letterSpacing: '-.025em', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
      {children}
    </h2>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProjectData(slug);

  const isMajor = p.tier === 'MAJOR';
  const available = isProjectAvailable(p.slug);
  const hasVideo = !!p.demo_video_id;
  const shots = SHOWCASE_DATA[p.slug] || [];
  const cleanDesc = (p.problem_statement || p.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 220);
  const availableAlternatives = getAvailableProjects().filter(alt => alt.slug !== p.slug).slice(0, 3);

  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100vh', paddingBottom: '5rem' }}>
      <BreadcrumbsSchema items={[{ name: 'Home', url: '/' }, { name: 'Projects', url: '/projects' }, { name: p.category, url: `/projects?category=${p.category}` }, { name: p.title }]} />
      <ProductSchema name={`${p.title} — ${p.tier} Project Kit (₹${p.price_inr})`} description={`${cleanDesc} 1-click runnable source code, IEEE Black Book, defense PPT, and top 25 Viva Q&A.`} price={p.price_inr} category={`${p.tier} ${p.category} Engineering Project Bundle`} slug={slug} />

      {/* Mobile sticky buy bar */}
      <StickyBuyBar price={available ? p.price_inr : (isMajor ? 499 : 299)} title={p.title} available={available} />

      {/* ── Hero header ── */}
      <div style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="shell" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '.8125rem', color: 'var(--ink-4)', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/" className="breadcrumb-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', color: 'var(--ink-4)', textDecoration: 'none', fontWeight: 500 }}>
              <Home style={{ width: '.8125rem', height: '.8125rem' }} /> Home
            </Link>
            <ChevronRight style={{ width: '.75rem', height: '.75rem', flexShrink: 0 }} />
            <Link href="/projects" className="breadcrumb-link" style={{ color: 'var(--ink-4)', textDecoration: 'none', fontWeight: 500 }}>Projects</Link>
            <ChevronRight style={{ width: '.75rem', height: '.75rem', flexShrink: 0 }} />
            <Link href={`/projects?category=${p.category}`} className="breadcrumb-link" style={{ color: 'var(--ink-4)', textDecoration: 'none', fontWeight: 500 }}>{p.category}</Link>
            <ChevronRight style={{ width: '.75rem', height: '.75rem', flexShrink: 0 }} />
            <span style={{ color: 'var(--navy)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '14rem' }}>{p.title}</span>
          </nav>

          {/* Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.5rem', marginBottom: '1rem' }}>
            <span className={`tag ${isMajor ? 'tag-violet' : 'tag-teal'}`}>{p.tier} BUNDLE</span>
            <span className="tag tag-navy">{p.category}</span>
            {available ? (
              <span className="tag tag-emerald">
                <span className="dot-live apulse" style={{ width: '5px', height: '5px' }} />
                Ready to Ship — Instant Download
              </span>
            ) : (
              <span className="tag tag-amber">
                <Clock style={{ width: '.75rem', height: '.75rem' }} />
                In QA Pipeline — Pre-Book Open (50% Launch Discount)
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display" style={{ fontSize: 'clamp(1.875rem, 4vw, 2.875rem)', fontWeight: 900, letterSpacing: '-.04em', color: 'var(--navy)', lineHeight: 1.15, marginBottom: '.875rem', maxWidth: '48rem' }}>
            {p.title}
          </h1>

          <p style={{ fontSize: 'clamp(.9375rem, 2vw, 1.0625rem)', color: 'var(--ink-3)', lineHeight: 1.7, maxWidth: '42rem', marginBottom: '1.25rem' }}>{p.description}</p>

          {/* Trust row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.75rem 1.5rem', fontSize: '.8125rem', color: 'var(--ink-3)', fontWeight: 500 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.375rem' }}>
              <div style={{ display: 'flex', gap: '1px' }}>{[1,2,3,4,5].map(s => <Star key={s} style={{ width: '12px', height: '12px', fill: '#F59E0B', color: '#F59E0B' }} />)}</div>
              <strong style={{ color: 'var(--navy)' }}>4.9</strong> · 500+ students
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.375rem' }}>
              <Download style={{ width: '.875rem', height: '.875rem', color: 'var(--teal)' }} />
              {available ? 'Instant secure download' : 'Priority launch delivery'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.375rem' }}>
              <ShieldCheck style={{ width: '.875rem', height: '.875rem', color: 'var(--teal)' }} />
              Bug-free execution guarantee
            </div>
          </div>
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="shell" style={{ paddingTop: '2rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── LEFT: Content ── */}
          <div className="lg:col-span-2 flex flex-col gap-8 w-full max-w-full min-w-0">

            {/* Context Notice for Pipeline / Coming Soon projects */}
            {!available && (
              <div style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', background: 'var(--amber-50)', border: '1.5px solid var(--amber-100)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Clock style={{ width: '1.5rem', height: '1.5rem', color: '#D97706', flexShrink: 0, marginTop: '.125rem' }} />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#92400E', margin: '0 0 .375rem' }}>
                    Project in QA Verification Pipeline · Pre-Book Open
                  </h3>
                  <p style={{ fontSize: '.875rem', color: '#B45309', margin: 0, lineHeight: 1.65 }}>
                    Our engineering team is completing final IEEE Black Book documentation and 1-click test runs.
                    Pre-book now to lock in 50% early bird pricing ({formatCurrency(isMajor ? 499 : 299)}) and receive immediate download access via WhatsApp &amp; Email when ready.
                  </p>
                </div>
              </div>
            )}

            {/* Demo video / screenshot */}
            <section>
              <SectionTitle>
                <MonitorPlay style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal)' }} />
                Project Demo
              </SectionTitle>
              <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--surface-2)', boxShadow: 'var(--sh-md)', aspectRatio: '16/9', position: 'relative' }}>
                {hasVideo ? (
                  <iframe src={`https://www.youtube.com/embed/${p.demo_video_id}?rel=0&modestbranding=1`} className="w-full h-full" title={`${p.title} Demo`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width: '100%', height: '100%', border: 'none' }} />
                ) : shots.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={shots[0].img} alt={`${p.title} Screenshot`} decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)', padding: '2rem', textAlign: 'center' }}>
                    <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '14px', background: 'var(--surface-teal)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <ImageIcon style={{ width: '1.5rem', height: '1.5rem', color: 'var(--teal)' }} />
                    </div>
                    <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '.25rem' }}>
                      {available ? 'Screenshots Included in Kit' : 'Demo Recording in QA Pipeline'}
                    </p>
                    <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', maxWidth: '24rem', lineHeight: 1.6 }}>
                      {available
                        ? 'Download the full kit to view live execution and output screens.'
                        : 'Preview screenshots and live demo will be published with the official drop.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Screenshot strip */}
              {shots.length > (hasVideo ? 0 : 1) && (
                <div className="scroll-x" style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', paddingBottom: '.5rem' }}>
                  {(hasVideo ? shots : shots.slice(1)).map((item, idx) => (
                    <div key={idx} className="snap-s" style={{ flexShrink: 0, width: '280px' }}>
                      <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--surface-2)', aspectRatio: '16/9' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.img} alt={item.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <p style={{ fontSize: '.75rem', color: 'var(--ink-3)', marginTop: '.375rem', fontWeight: 500 }}>{item.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* About */}
            <section>
              <SectionTitle>
                <FileText style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal)' }} />
                About This Project
              </SectionTitle>
              <div className="card" style={{ padding: '1.375rem', borderLeft: '4px solid var(--teal)' }}>
                <div style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '.9375rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                  {p.problem_statement
                    ? p.problem_statement.split('\\n').filter(l => l.trim()).map((line, i) => {
                        const parts = line.split(/(\*\*.*?\*\*)/g).map((part, j) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={j} style={{ color: 'var(--navy)' }}>{part.slice(2, -2)}</strong>
                            : part
                        );
                        return <p key={i}>{parts}</p>;
                      })
                    : <p>{p.description}</p>
                  }
                </div>
              </div>
            </section>

            {/* Tech Stack */}
            {p.tech_stack?.length > 0 && (
              <section>
                <SectionTitle>
                  <TerminalSquare style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal)' }} />
                  Tech Stack
                </SectionTitle>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                  {p.tech_stack.map(tech => <TechBadge key={tech} tech={tech} />)}
                </div>
              </section>
            )}

            {/* Key Features */}
            <section>
              <SectionTitle>
                <CheckCircle2 style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal)' }} />
                Key Features
              </SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 18rem), 1fr))', gap: '.625rem' }}>
                {p.features?.map((feature, idx) => (
                  <div key={idx} className="card" style={{ padding: '.875rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '.625rem' }}>
                    <CheckCircle2 style={{ width: '.9375rem', height: '.9375rem', color: 'var(--teal)', flexShrink: 0, marginTop: '.125rem' }} />
                    <span style={{ fontSize: '.875rem', color: 'var(--ink-2)', fontWeight: 500, lineHeight: 1.5 }}>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* What's in the box */}
            <section>
              <SectionTitle>
                <Download style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal)' }} />
                What&apos;s in the Box?
              </SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                {[
                  { color: 'var(--teal)', icon: TerminalSquare, title: 'Source Code + 1-Click Launcher', body: <>Complete, tested project code with <code style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--teal-dark)', padding: '.125rem .375rem', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '.8125rem' }}>run.bat</code> (Windows) and <code style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--teal-dark)', padding: '.125rem .375rem', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '.8125rem' }}>run.sh</code> (Mac/Linux). Double-click to launch — no manual setup required.</> },
                  { color: 'var(--violet)', icon: FileText, title: `IEEE Black Book Report (.docx)`, body: `${isMajor ? '60+' : '30+'}-page Word document formatted to university standards. Print, bind, and submit — includes Literature Survey, System Architecture, UML Diagrams, Output Screenshots, Future Scope.` },
                  { color: 'var(--amber)', icon: Presentation, title: 'Viva Defense Presentation (.pptx)', body: '15–20 professionally designed slides with exact speaker notes — we tell you word-for-word what to say to the examiner.' },
                ].map(({ color, icon: Icon, title, body }) => (
                  <div key={title} className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '.875rem', borderLeft: `4px solid ${color}` }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '10px', flexShrink: 0, background: `color-mix(in srgb, ${color} 10%, white)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon style={{ width: '1.125rem', height: '1.125rem', color }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.375rem', letterSpacing: '-.02em' }}>{title}</h3>
                      <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.65 }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* How to Run */}
            <section>
              <SectionTitle>
                <Zap style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal)' }} />
                How to Run This Project
              </SectionTitle>
              <div className="card" style={{ padding: '1.375rem' }}>
                <p style={{ fontSize: '.9rem', color: 'var(--ink-3)', marginBottom: '1.125rem', lineHeight: 1.65 }}>After downloading, follow these steps to get running in under 5 minutes on any computer.</p>
                <HowToRun />
              </div>
            </section>

            {/* Viva Q&A teaser */}
            <section>
              <SectionTitle>
                <BookOpen style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal)' }} />
                Top Viva Questions Included
              </SectionTitle>
              <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '.875rem 1.125rem', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-2)' }}>
                  <p style={{ fontSize: '.875rem', color: 'var(--ink-2)', fontWeight: 500 }}>Preview <strong style={{ color: 'var(--navy)' }}>3 of 25</strong> included Q&amp;As</p>
                  <span className="tag tag-teal" style={{ fontSize: '.6rem' }}>25 Total Q&amp;As</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {VIVA_QS.map((qa, idx) => (
                    <div key={idx} style={{ padding: '1rem 1.125rem', borderBottom: idx < VIVA_QS.length - 1 ? '1px solid var(--line)' : 'none', position: 'relative' }}>
                      <p style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.375rem' }}>Q{idx + 1}: {qa.q}</p>
                      <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.65, filter: idx > 0 ? 'blur(4px)' : 'none', userSelect: idx > 0 ? 'none' : 'auto', opacity: idx > 0 ? .4 : 1 }}>{qa.a}</p>
                      {idx > 0 && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '9999px', padding: '.3125rem .875rem', fontSize: '.75rem', fontWeight: 600, color: 'var(--ink-2)', boxShadow: 'var(--sh-sm)' }}>
                            <Lock style={{ width: '.8125rem', height: '.8125rem', color: 'var(--teal)' }} /> Unlock with purchase
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Alternatives section for pipeline/pre-order visitors needing immediate submission */}
            {!available && availableAlternatives.length > 0 && (
              <section style={{ marginTop: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--line)' }}>
                <SectionTitle>
                  <Zap style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal)' }} />
                  Need a Verified Project Today for Immediate Submission?
                </SectionTitle>
                <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', marginBottom: '1.25rem', lineHeight: 1.65 }}>
                  Can&apos;t wait for this upcoming drop? These 9 core kits are 100% verified, execution-tested, and ready for instant download right now:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '1rem' }}>
                  {availableAlternatives.map(alt => (
                    <Link
                      key={alt.slug}
                      href={`/projects/${alt.slug}`}
                      className="card card-lift"
                      style={{ padding: '1.125rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', borderRadius: '16px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.625rem' }}>
                        <span className="tag tag-teal" style={{ fontSize: '.6rem' }}>
                          <span className="dot-live apulse" style={{ width: '4px', height: '4px' }} />
                          Ready to Ship
                        </span>
                        <span style={{ fontSize: '.8125rem', fontWeight: 800, color: 'var(--navy)' }}>
                          ₹{alt.price_inr}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.375rem', lineHeight: 1.35 }}>
                        {alt.title}
                      </h4>
                      <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', lineHeight: 1.5, marginBottom: '.875rem' }} className="line-clamp-2">
                        {alt.description}
                      </p>
                      <span style={{ marginTop: 'auto', fontSize: '.8125rem', fontWeight: 700, color: 'var(--teal)', display: 'inline-flex', alignItems: 'center', gap: '.25rem' }}>
                        View Kit <ArrowRight style={{ width: '.8125rem', height: '.8125rem' }} />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* ── RIGHT: Purchase sidebar ── */}
          <div className="lg:col-span-1 flex flex-col gap-4 lg:sticky lg:top-20 w-full min-w-0" id="checkout-form">

            {available && <UrgencyTimer />}

            {/* Pricing + form */}
            {available ? (
              <div className="card" style={{ overflow: 'hidden', borderTop: `4px solid ${isMajor ? 'var(--violet)' : 'var(--teal)'}` }}>
                <div style={{ padding: '1.375rem 1.375rem 1rem' }}>
                  <p style={{ fontSize: '.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--ink-4)', marginBottom: '.5rem' }}>Complete Bundle — One-time Payment</p>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.875rem', marginBottom: '.375rem' }}>
                    <span className="font-display" style={{ fontSize: '2.75rem', fontWeight: 900, letterSpacing: '-.055em', color: 'var(--navy)', lineHeight: 1 }}>{formatCurrency(p.price_inr)}</span>
                    <span style={{ fontSize: '.9375rem', color: 'var(--ink-4)', textDecoration: 'line-through', fontWeight: 500, marginBottom: '.25rem' }}>{formatCurrency(isMajor ? 3999 : 1499)}</span>
                  </div>
                  <p style={{ fontSize: '.8125rem', color: 'var(--teal-dark)', fontWeight: 700, marginBottom: '1.25rem' }}>
                    Save {isMajor ? '₹3,500' : '₹1,200'} vs local project shops
                  </p>
                </div>
                <div style={{ padding: '0 1.375rem 1.375rem' }}>
                  <CustomerForm projectId={p.id} price={p.price_inr} />
                </div>
              </div>
            ) : (
              <PreOrderForm
                projectSlug={p.slug}
                projectTitle={p.title}
                priceInr={isMajor ? 499 : 299}
                isMajor={isMajor}
              />
            )}

            {/* What you get */}
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '.875rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.875rem', paddingBottom: '.75rem', borderBottom: '1px solid var(--line)' }}>Everything You Receive</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
                {[
                  { icon: TerminalSquare, color: 'var(--teal)',   title: 'Working Source Code',          sub: '1-click launcher included' },
                  { icon: FileText,       color: 'var(--violet)', title: `${isMajor ? '60+' : '30+'}-Page IEEE Black Book`, sub: 'Print-ready .docx format' },
                  { icon: Presentation,   color: 'var(--amber)',  title: 'Viva Defense PPT',             sub: 'Speaker notes included' },
                  { icon: BookOpen,       color: 'var(--teal)',   title: '25 Viva Q&A Answers',          sub: 'Examiner-tested questions' },
                  { icon: Download,       color: 'var(--ink-3)', title: available ? 'Instant ZIP Download' : 'Priority Drop Delivery', sub: available ? 'Delivered immediately' : 'Emailed on launch' },
                ].map(({ icon: Icon, color, title, sub }) => (
                  <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '.625rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '8px', flexShrink: 0, background: `color-mix(in srgb, ${color} 10%, white)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '.0625rem' }}>
                      <Icon style={{ width: '.875rem', height: '.875rem', color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '.8125rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>{title}</p>
                      <p style={{ fontSize: '.75rem', color: 'var(--ink-4)', marginTop: '.0625rem' }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick run guide */}
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '.875rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.875rem', paddingBottom: '.75rem', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '.375rem' }}>
                <Zap style={{ width: '.9375rem', height: '.9375rem', color: 'var(--teal)' }} /> Quick Setup Guide
              </h3>
              <HowToRun compact />
            </div>

            {/* Trust */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', padding: '.875rem 1rem', borderRadius: '12px', background: 'var(--surface-teal)', border: '1px solid var(--teal-100)' }}>
              <ShieldCheck style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal)', flexShrink: 0 }} />
              <p style={{ fontSize: '.8125rem', color: 'var(--teal-dark)', fontWeight: 500, lineHeight: 1.5 }}>
                100% Secure payment powered by Razorpay. {available ? 'Instant download after successful payment.' : 'Zero risk: pay only if you proceed.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

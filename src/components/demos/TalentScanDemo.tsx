'use client';

import { useState } from 'react';
import {
  FileSearch, Sparkles, ArrowRight, CheckCircle2, Shield, Zap,
  Cpu, Target, Users, Code2, Database, Cloud, Layers, ChevronRight
} from 'lucide-react';

const PRESETS = {
  ai: {
    name: 'Dr. Elena Rostova',
    title: 'Staff Machine Learning Engineer',
    experience: '7.5 yrs',
    atsScore: 96,
    skills: ['PyTorch', 'Transformer Architecture', 'CUDA', 'vLLM', 'Distributed Training', 'MLOps'],
    rawSnippet: 'Senior ML Specialist with 7+ years delivering LLM fine-tuning pipelines. Spearheaded transformer inference latency reduction by 42% on H100 clusters.',
    highlights: ['42% Latency Reduction', 'NeurIPS Published', 'Scalable Vector DBs'],
  },
  fullstack: {
    name: 'Marcus Vance',
    title: 'Lead Full-Stack Architect',
    experience: '6.0 yrs',
    atsScore: 92,
    skills: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Kafka', 'Redis'],
    rawSnippet: 'Lead Architect managing distributed microservices. Built real-time collaborative workspace scaling to 250k daily active users.',
    highlights: ['250k DAU Scaled', 'Zero-downtime Migration', 'GraphQL Federation'],
  },
  devops: {
    name: 'Siddharth Rao',
    title: 'Principal Cloud DevOps Engineer',
    experience: '8.2 yrs',
    atsScore: 95,
    skills: ['Kubernetes', 'Terraform', 'AWS EKS', 'ArgoCD', 'Prometheus', 'CI/CD'],
    rawSnippet: 'Architected multi-region Kubernetes clusters with 99.99% SLA. Implemented GitOps zero-trust security mesh and automated rollback strategies.',
    highlights: ['99.99% Uptime', 'GitOps Automation', 'SOC2 Compliance'],
  },
} as const;

type Preset = keyof typeof PRESETS;

// Shared styles
const S = {
  card: { background: 'rgba(18,22,40,0.85)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '28px' } as React.CSSProperties,
  btn: (active: boolean): React.CSSProperties => ({
    padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
    border: active ? '1px solid #a5b4fc' : '1px solid rgba(255,255,255,0.1)',
    background: active ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.03)',
    color: active ? '#ffffff' : '#94a3b8',
    display: 'flex', alignItems: 'center', gap: '8px',
  }),
  primaryCta: {
    padding: '14px 32px', fontSize: '1rem', fontWeight: 700, borderRadius: '12px',
    boxShadow: '0 0 35px rgba(99,102,241,0.5)', display: 'inline-flex', alignItems: 'center',
    gap: '10px', textDecoration: 'none', background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
    color: '#ffffff',
  } as React.CSSProperties,
};

export default function TalentScanLandingPage() {
  const [activePreset, setActivePreset] = useState<Preset>('ai');
  const current = PRESETS[activePreset];

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 20px 80px', color: '#f8fafc' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '48px 16px 64px', position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', marginBottom: '24px', boxShadow: '0 0 20px rgba(99,102,241,0.2)' }}>
          <Sparkles size={15} color="#a5b4fc" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Autonomous Talent Intelligence v4.2 &bull; Next-Gen ATS
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.4rem,5.5vw,4.2rem)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.12, maxWidth: '1050px', margin: '0 auto 20px', background: 'linear-gradient(135deg,#ffffff 30%,#a5b4fc 70%,#818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Turn Raw Resumes into Actionable Candidate Vectors
        </h1>

        <p style={{ fontSize: 'clamp(1rem,2vw,1.25rem)', color: '#94a3b8', maxWidth: '780px', margin: '0 auto 36px', lineHeight: 1.6 }}>
          Extract multi-tiered skill taxonomies, verified career longevity, and candidate credentials in under 380ms. Complete with vector semantic ATS scoring and bias-free candidate triage.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#simulator" style={S.primaryCta}>
            <span>Launch Parser Studio</span>
            <ArrowRight size={18} />
          </a>
          <a href="#simulator" style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 600, borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#f8fafc' }}>
            <Target size={18} color="#a5b4fc" />
            <span>Score ATS Matcher</span>
          </a>
        </div>

        {/* KPI strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '20px', maxWidth: '960px', margin: '56px auto 0', padding: '24px', borderRadius: '18px', background: 'rgba(18,22,40,0.65)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' }}>
          {[
            { val: '99.4%',   label: 'Entity Extraction Accuracy', color: '#ffffff' },
            { val: '< 380ms', label: 'Average Inference Speed',    color: '#a5b4fc' },
            { val: '150+',    label: 'Standard Tech Taxonomies',   color: '#34d399' },
            { val: '100%',    label: 'Bias-Free Blind Screening',  color: '#38bdf8' },
          ].map(k => (
            <div key={k.label}>
              <div style={{ fontSize: '2.1rem', fontWeight: 900, color: k.color, fontFamily: 'monospace' }}>{k.val}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{k.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Simulator */}
      <section id="simulator" style={{ margin: '30px 0 70px', scrollMarginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Inference Simulator</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '6px' }}>Watch the Engine Deconstruct Resumes</h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '6px' }}>Choose a benchmark profile to see instant taxonomy tagging and vector representation:</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
            <button onClick={() => setActivePreset('ai')}        style={S.btn(activePreset === 'ai')}>
              <Cpu size={15} color="#a5b4fc" /> AI / ML Lead Profile
            </button>
            <button onClick={() => setActivePreset('fullstack')} style={S.btn(activePreset === 'fullstack')}>
              <Code2 size={15} color="#38bdf8" /> Full-Stack Architect
            </button>
            <button onClick={() => setActivePreset('devops')}    style={S.btn(activePreset === 'devops')}>
              <Cloud size={15} color="#34d399" /> Cloud &amp; DevOps Engineer
            </button>
          </div>
        </div>

        {/* Workbench */}
        <div style={{ borderRadius: '20px', background: 'rgba(18,22,40,0.85)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)', overflow: 'hidden' }}>

          {/* Window header */}
          <div style={{ padding: '14px 20px', background: 'rgba(9,10,16,0.9)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f43f5e' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: '8px', fontFamily: 'monospace' }}>
                talentscan_engine_v4.2 // live-stream-evaluator
              </span>
            </div>
            <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', fontWeight: 700 }}>
              NLP MODEL ONLINE
            </span>
          </div>

          {/* 2-pane layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))' }}>

            {/* Left: raw input */}
            <div style={{ padding: '24px', borderRight: '1px solid rgba(255,255,255,0.1)', background: 'rgba(9,10,16,0.4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Raw Document Buffer</span>
                <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontFamily: 'monospace' }}>Unstructured Text</span>
              </div>
              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace', fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.7, minHeight: '220px' }}>
                <div style={{ color: '#a5b4fc', fontWeight: 600, marginBottom: '6px' }}># RAW PARSE INPUT STREAM:</div>
                <p>{current.rawSnippet}</p>
                <div style={{ marginTop: '16px', color: '#64748b', fontSize: '0.75rem' }}>
                  &rarr; Longevity vectors extracted: {current.experience}<br />
                  &rarr; Entity confidence interval: 0.984<br />
                  &rarr; Parsing token count: 48 tokens
                </div>
              </div>
            </div>

            {/* Right: structured output */}
            <div style={{ padding: '24px', background: 'rgba(18,22,40,0.4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase' }}>Structured Candidate Entity</span>
                <span style={{ padding: '3px 9px', borderRadius: '999px', background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', fontSize: '0.75rem', fontWeight: 800 }}>
                  ATS FIT: {current.atsScore}%
                </span>
              </div>
              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(99,102,241,0.25)', minHeight: '220px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{current.name}</h4>
                    <p style={{ fontSize: '0.82rem', color: '#a5b4fc', fontWeight: 600 }}>{current.title} &bull; {current.experience} exp.</p>
                  </div>
                  <div style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '0.72rem', fontWeight: 700 }}>VERIFIED</div>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Skills Taxonomy:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {current.skills.map(skill => (
                      <span key={skill} style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', fontSize: '0.75rem', color: '#ffffff', fontWeight: 500 }}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {current.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#94a3b8' }}>
                      <CheckCircle2 size={13} color="#34d399" />{h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div style={{ padding: '16px 24px', background: 'rgba(9,10,16,0.8)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Switch profiles above to parse different candidate types in real time.</div>
            <a href="#simulator" style={{ padding: '8px 20px', fontSize: '0.85rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: '#ffffff', fontWeight: 700 }}>
              <span>Launch Studio</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Bento grid */}
      <section style={{ margin: '60px 0 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Enterprise Architecture</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '6px' }}>Engineered for Modern Talent Operations</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '20px' }}>
          {[
            { icon: <Target size={22} color="#a5b4fc" />,   bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.3)',  title: 'Vector Semantic ATS Matching',     body: 'Compare candidate credentials against job descriptions using cosine similarity. Detect missing requirements and score candidate suitability instantly.' },
            { icon: <Layers size={22} color="#38bdf8" />,    bg: 'rgba(6,182,212,0.15)',   border: 'rgba(6,182,212,0.3)',   title: 'Multi-Tier Skill Taxonomies',       body: 'Intelligently bifurcate skills into Languages, Frameworks, Cloud, Databases, and Tools. Validates context across career timeline highlights.' },
            { icon: <Sparkles size={22} color="#34d399" />, bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.3)',  title: 'Automated Viva Question Synthesis', body: 'Generate customised technical interview questions tailored specifically to the candidate\'s claimed stack and career highlights.' },
            { icon: <Shield size={22} color="#f43f5e" />,   bg: 'rgba(244,63,94,0.15)',   border: 'rgba(244,63,94,0.3)',   title: 'Bias-Free Anonymized Screening',    body: 'Ensure EEOC and GDPR compliance with automated PII masking. Evaluate purely on verified competencies and quantifiable accomplishments.' },
            { icon: <Zap size={22} color="#f59e0b" />,      bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.3)',  title: 'Sub-Second Ingestion Speed',        body: 'Built for high-volume hiring sprints. Ingest thousands of resumes in parallel with low-latency parsing on edge infrastructure.' },
            { icon: <Users size={22} color="#a78bfa" />,    bg: 'rgba(139,92,246,0.15)',  border: 'rgba(139,92,246,0.3)',  title: 'Benchmarked Candidate Directory',   body: 'Search pre-indexed candidate pools with filterable skill parameters, longevity thresholds, and role-based taxonomy clustering.' },
          ].map(c => (
            <div key={c.title} style={{ padding: '28px', borderRadius: '16px', background: 'rgba(18,22,40,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>{c.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{c.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ margin: '60px 0 40px', padding: '50px 30px', borderRadius: '24px', background: 'radial-gradient(ellipse at center,rgba(99,102,241,0.25) 0%,rgba(18,22,40,0.95) 75%)', border: '1px solid rgba(99,102,241,0.4)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem,3.8vw,2.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '14px' }}>
          Ready to Screen Top Engineering Talent?
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          Jump into the Parser Studio to test raw resumes, extract taxonomy graphs, and calculate ATS scores in real time.
        </p>
        <a href="#simulator" style={{ ...S.primaryCta, padding: '14px 36px', fontSize: '1.05rem', fontWeight: 800, boxShadow: '0 0 35px rgba(99,102,241,0.45)' }}>
          <span>Open TalentScan Studio</span>
          <ArrowRight size={18} />
        </a>
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileSearch, Sparkles, ArrowRight, CheckCircle2, Shield, Zap, 
  Cpu, Target, Users, Award, Code2, Database, Cloud, Check, 
  Layers, ChevronRight, Terminal, BarChart3, Search, Play
} from 'lucide-react';

export default function TalentScanLandingPage() {
  const [activePreset, setActivePreset] = useState<'ai' | 'fullstack' | 'devops'>('ai');

  const presets = {
    ai: {
      name: "Dr. Elena Rostova",
      title: "Staff Machine Learning Engineer",
      experience: "7.5 yrs",
      atsScore: 96,
      skills: ["PyTorch", "Transformer Architecture", "CUDA", "vLLM", "Distributed Training", "MLOps"],
      rawSnippet: "Senior ML Specialist with 7+ years delivering LLM fine-tuning pipelines. Spearheaded transformer inference latency reduction by 42% on H100 clusters.",
      highlights: ["42% Latency Reduction", "NeurIPS Published", "Scalable Vector DBs"]
    },
    fullstack: {
      name: "Marcus Vance",
      title: "Lead Full-Stack Architect",
      experience: "6.0 yrs",
      atsScore: 92,
      skills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Kafka", "Redis"],
      rawSnippet: "Lead Architect managing distributed microservices. Built real-time collaborative workspace scaling to 250k daily active users.",
      highlights: ["250k DAU Scaled", "Zero-downtime Migration", "GraphQL Federation"]
    },
    devops: {
      name: "Siddharth Rao",
      title: "Principal Cloud DevOps Engineer",
      experience: "8.2 yrs",
      atsScore: 95,
      skills: ["Kubernetes", "Terraform", "AWS EKS", "ArgoCD", "Prometheus", "CI/CD"],
      rawSnippet: "Architected multi-region Kubernetes clusters with 99.99% SLA. Implemented GitOps zero-trust security mesh and automated rollback strategies.",
      highlights: ["99.99% Uptime", "GitOps Automation", "SOC2 Compliance"]
    }
  };

  const current = presets[activePreset];

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 20px', color: '#f8fafc' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ textAlign: 'center', padding: '48px 16px 64px', position: 'relative' }}>
        
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '999px',
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
          marginBottom: '24px', boxShadow: '0 0 20px rgba(99,102,241,0.2)'
        }}>
          <Sparkles size={15} color="#a5b4fc" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Autonomous Talent Intelligence v4.2 â€¢ Next-Gen ATS
          </span>
        </div>

        {/* Hero Headline */}
        <h1 style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
          fontWeight: 900,
          letterSpacing: '-0.035em',
          lineHeight: 1.12,
          maxWidth: '1050px',
          margin: '0 auto 20px',
          background: 'linear-gradient(135deg, #ffffff 30%, #a5b4fc 70%, #818cf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Turn Raw Resumes into Actionable Candidate Vectors
        </h1>

        {/* Hero Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: '#94a3b8',
          maxWidth: '780px',
          margin: '0 auto 36px',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          Extract multi-tiered skill taxonomies, verified career longevity, and candidate contact credentials in under 380ms. Complete with vector semantic ATS scoring and bias-free candidate triage.
        </p>

        {/* Hero CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a
            href="#simulator"
            style={{
              padding: '14px 32px',
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: '12px',
              boxShadow: '0 0 35px rgba(99, 102, 241, 0.5)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
              color: '#ffffff',
              textDecoration: 'none'
            }}
          >
            <span>Launch Parser Studio</span>
            <ArrowRight size={18} />
          </a>

          <Link
            href="#simulator"
            style={{
              padding: '14px 28px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#f8fafc',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none'
            }}
          >
            <Target size={18} color="#a5b4fc" />
            <span>Score ATS Matcher</span>
          </Link>
        </div>

        {/* KPI Metrics Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '960px',
          margin: '56px auto 0',
          padding: '24px',
          borderRadius: '18px',
          background: 'rgba(18, 22, 40, 0.65)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6)'
        }}>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace' }}>
              99.4%
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              Entity Extraction Accuracy
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#a5b4fc', fontFamily: 'monospace' }}>
              &lt; 380ms
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              Average Inference Speed
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#34d399', fontFamily: 'monospace' }}>
              150+
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              Standard Tech Taxonomies
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#38bdf8', fontFamily: 'monospace' }}>
              100%
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              Bias-Free Blind Screening
            </div>
          </div>
        </div>

      </section>

      {/* 2. INTERACTIVE LIVE EXTRACTION WORKBENCH PREVIEW */}
      <section id="simulator" style={{ margin: '30px 0 70px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Live Inference Simulator
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '6px' }}>
            Watch the Heuristic Engine Deconstruct Resumes
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '6px' }}>
            Choose a benchmark profile below to see instant taxonomy tagging and vector representation:
          </p>

          {/* Benchmark Selector Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActivePreset('ai')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: activePreset === 'ai' ? '1px solid #a5b4fc' : '1px solid rgba(255,255,255,0.1)',
                background: activePreset === 'ai' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                color: activePreset === 'ai' ? '#ffffff' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Cpu size={15} color="#a5b4fc" />
              <span>AI / ML Lead Profile</span>
            </button>

            <button
              onClick={() => setActivePreset('fullstack')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: activePreset === 'fullstack' ? '1px solid #a5b4fc' : '1px solid rgba(255,255,255,0.1)',
                background: activePreset === 'fullstack' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                color: activePreset === 'fullstack' ? '#ffffff' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Code2 size={15} color="#38bdf8" />
              <span>Full-Stack Architect</span>
            </button>

            <button
              onClick={() => setActivePreset('devops')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: activePreset === 'devops' ? '1px solid #a5b4fc' : '1px solid rgba(255,255,255,0.1)',
                background: activePreset === 'devops' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                color: activePreset === 'devops' ? '#ffffff' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Cloud size={15} color="#34d399" />
              <span>Cloud & DevOps Engineer</span>
            </button>
          </div>
        </div>

        {/* Comparison Workbench Window */}
        <div style={{
          borderRadius: '20px',
          background: 'rgba(18, 22, 40, 0.85)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden'
        }}>
          {/* Window Header */}
          <div style={{
            padding: '14px 20px',
            background: 'rgba(9, 10, 16, 0.9)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f43f5e' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: '8px', fontFamily: 'monospace' }}>
                talentscan_engine_v4.2 // live-stream-evaluator
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontWeight: 700
              }}>
                â— NLP MODEL ONLINE
              </span>
            </div>
          </div>

          {/* 2-Pane Side-by-Side View */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            
            {/* Left Pane: Raw Ingest Stream */}
            <div style={{
              padding: '24px',
              borderRight: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(9, 10, 16, 0.4)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Raw Document Buffer
                </span>
                <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontFamily: 'monospace' }}>
                  Unstructured Text
                </span>
              </div>

              <div style={{
                padding: '16px',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'monospace',
                fontSize: '0.82rem',
                color: '#94a3b8',
                lineHeight: 1.7,
                minHeight: '220px'
              }}>
                <div style={{ color: '#a5b4fc', fontWeight: 600, marginBottom: '6px' }}>
                  # RAW PARSE INPUT STREAM:
                </div>
                <p>{current.rawSnippet}</p>
                <div style={{ marginTop: '16px', color: '#64748b', fontSize: '0.75rem' }}>
                  â†’ Longevity vectors extracted: {current.experience}<br />
                  â†’ Entity confidence interval: 0.984<br />
                  â†’ Parsing token count: 48 tokens
                </div>
              </div>
            </div>

            {/* Right Pane: Structured Output & Vector Match */}
            <div style={{ padding: '24px', background: 'rgba(18, 22, 40, 0.4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase' }}>
                  Structured Candidate Entity
                </span>
                <span style={{
                  padding: '3px 9px',
                  borderRadius: '999px',
                  background: 'rgba(99, 102, 241, 0.2)',
                  color: '#a5b4fc',
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}>
                  ATS FIT: {current.atsScore}%
                </span>
              </div>

              <div style={{
                padding: '16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                minHeight: '220px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                      {current.name}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: '#a5b4fc', fontWeight: 600 }}>
                      {current.title} â€¢ {current.experience} Longevity
                    </p>
                  </div>
                  <div style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}>
                    VERIFIED CANDIDATE
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                    Categorized Skills Taxonomy:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {current.skills.map((skill, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(99, 102, 241, 0.15)',
                          border: '1px solid rgba(99, 102, 241, 0.3)',
                          fontSize: '0.75rem',
                          color: '#ffffff',
                          fontWeight: 500
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {current.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#94a3b8' }}>
                      <CheckCircle2 size={13} color="#34d399" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Action Bar Footer */}
          <div style={{
            padding: '16px 24px',
            background: 'rgba(9, 10, 16, 0.8)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Want to parse your own candidate files or custom benchmark texts?
            </div>
            <a
              href="#simulator"
              style={{
                padding: '8px 20px',
                fontSize: '0.85rem',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
                color: '#ffffff',
                textDecoration: 'none'
              }}
            >
              <span>Launch Studio</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

      </section>

      {/* 3. BENTO GRID CAPABILITIES */}
      <section style={{ margin: '60px 0 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Enterprise Architecture
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '6px' }}>
            Engineered for Modern Talent Operations
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '650px', margin: '8px auto 0' }}>
            Replace manual resume screening with structured entity graphs, semantic vector matching, and automated interview question synthesis.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          
          {/* Card 1: Vector ATS Scoring */}
          <div style={{ background: "rgba(18,22,40,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px" }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px'
            }}>
              <Target size={22} color="#a5b4fc" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Vector Semantic ATS Matching
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Compare candidate credentials directly against detailed job descriptions using high-dimensional cosine similarity. Detect missing requirements and score candidate suitability instantly.
            </p>
            <Link href="#simulator" style={{ fontSize: '0.82rem', color: '#a5b4fc', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
              <span>Try Job Matcher</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Card 2: Deep Entity & Taxonomy Detection */}
          <div style={{ background: "rgba(18,22,40,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px" }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(6, 182, 212, 0.15)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px'
            }}>
              <Layers size={22} color="#38bdf8" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Multi-Tier Skill Taxonomies
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Intelligently bifurcate skills into Languages, Frameworks, Cloud & DevOps, Databases, and Tools. Eliminates keyword stuffing by validating context across career timeline highlights.
            </p>
            <a href="#simulator" style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
              <span>Explore Taxonomies</span>
              <ChevronRight size={14} />
            </a>
          </div>

          {/* Card 3: Viva & Technical Interview Synthesis */}
          <div style={{ background: "rgba(18,22,40,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px" }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px'
            }}>
              <Sparkles size={22} color="#34d399" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Automated Viva & Question Synthesis
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Automatically generate customized technical interview questions, system design probes, and behavioral scenarios tailored specifically to the candidate&apos;s claimed stack.
            </p>
            <Link href="#simulator" style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
              <span>Generate Viva Questions</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Card 4: Bias-Free Compliance */}
          <div style={{ background: "rgba(18,22,40,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px" }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px'
            }}>
              <Shield size={22} color="#f43f5e" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Bias-Free Anonymized Screening
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Ensure EEOC and GDPR compliance with automated PII masking. Evaluate applicants purely based on verified competencies, engineering impact, and quantifiable accomplishments.
            </p>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
              GDPR & SOC2 Ready
            </div>
          </div>

          {/* Card 5: High-Speed Document Pipeline */}
          <div style={{ background: "rgba(18,22,40,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px" }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px'
            }}>
              <Zap size={22} color="#f59e0b" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Sub-Second Ingestion Speed
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Built for massive high-volume hiring sprints. Ingest thousands of resumes in parallel with our low-latency parsing microservice running on edge infrastructure.
            </p>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Parallel Batch Ingestion
            </div>
          </div>

          {/* Card 6: Candidate Pool Directory */}
          <div style={{ background: "rgba(18,22,40,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px" }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px'
            }}>
              <Users size={22} color="#a78bfa" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Benchmarked Candidate Directory
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Search across pre-indexed candidate pools with filterable skill parameters, longevity thresholds, and role-based taxonomy clustering.
            </p>
            <Link href="#simulator" style={{ fontSize: '0.82rem', color: '#a78bfa', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
              <span>View Candidate Pool</span>
              <ChevronRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. FINAL PRODUCT CTA BANNER */}
      <section style={{
        margin: '60px 0 40px',
        padding: '50px 30px',
        borderRadius: '24px',
        background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, rgba(18, 22, 40, 0.95) 75%)',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 0 50px rgba(99, 102, 241, 0.2)'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-0.025em',
          marginBottom: '14px'
        }}>
          Ready to Screen Top Engineering Talent?
        </h2>
        <p style={{
          color: '#94a3b8',
          fontSize: '1rem',
          maxWidth: '600px',
          margin: '0 auto 28px',
          lineHeight: 1.6
        }}>
          Jump straight into the Parser Studio to test raw text resumes, extract structured taxonomy graphs, and calculate candidate ATS scores in real-time.
        </p>

        <a
          href="#simulator"
          style={{
            padding: '14px 36px',
            fontSize: '1.05rem',
            fontWeight: 800,
            borderRadius: '12px',
            boxShadow: '0 0 35px rgba(99, 102, 241, 0.45)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
            color: '#ffffff',
            textDecoration: 'none'
          }}
        >
          <span>Open TalentScan Studio</span>
          <ArrowRight size={18} />
        </a>
      </section>

    </div>
  );
}








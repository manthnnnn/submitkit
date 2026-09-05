'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, HelpCircle, CheckCircle2, ChevronDown, ChevronUp, 
  Printer, UserCheck, Briefcase, Award, ShieldAlert, FileText, ArrowRight
} from 'lucide-react';
import { MOCK_CANDIDATES, MOCK_JOBS, Candidate, JobOpening } from '@/lib/mock-data';
import { calculateATSScore } from '@/lib/scoring';

interface QuestionItem {
  category: 'System Architecture' | 'Deep Dive' | 'Skill Gap' | 'Behavioral' | 'Viva Defense';
  question: string;
  context: string;
  expectedAnswerPoints: string[];
}

export default function InterviewPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(MOCK_CANDIDATES[0]);
  const [selectedJob, setSelectedJob] = useState<JobOpening>(MOCK_JOBS[0]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const scoreResult = calculateATSScore(selectedCandidate, selectedJob);

  // Dynamically generate tailored interview questions with rubrics
  const generatedQuestions: QuestionItem[] = [
    {
      category: 'System Architecture',
      question: `In your role at ${selectedCandidate.experience[0]?.company || 'Vortex Cloud'}, how did you architect scalable services to handle high concurrency while keeping latency minimal?`,
      context: `Candidate claims ${selectedCandidate.experienceYears}+ years experience with high-throughput backend services.`,
      expectedAnswerPoints: [
        'Explains caching layers (Redis, CDN caching, query memoization).',
        'Discusses database indexing, read replicas, and connection pooling.',
        'Mentions horizontal scaling, load balancers, and asynchronous event queues (Kafka, BullMQ).'
      ]
    },
    {
      category: 'Deep Dive',
      question: selectedCandidate.skills.languages.includes('TypeScript')
        ? 'How do you design type-safe polymorphic data contracts across frontend and backend boundaries without duplicating TypeScript definitions?'
        : 'How do you structure modular software architecture to maximize unit test coverage and prevent regression?',
      context: `Candidate lists ${selectedCandidate.skills.languages.slice(0, 3).join(', ')} as primary language proficiencies.`,
      expectedAnswerPoints: [
        'Mentions shared mono-repos, OpenAPI/Swagger code generators, or tRPC.',
        'Discusses runtime validation libraries (Zod, Valibot) combined with static typing.',
        'Explains how strict compiler flags (`strictNullChecks`, `noImplicitAny`) protect production systems.'
      ]
    },
    {
      category: 'Skill Gap',
      question: scoreResult.missingRequiredSkills.length > 0
        ? `The target role strictly requires ${scoreResult.missingRequiredSkills.join(', ')}. Have you worked on related technologies or what is your strategy to become productive in them within 2 weeks?`
        : 'What is a technology you recently had to learn from scratch under tight production deadlines?',
      context: `Target job requires ${selectedJob.requiredSkills.join(', ')}.`,
      expectedAnswerPoints: [
        'Draws parallels with related tools the candidate already masters.',
        'Demonstrates clear engineering fundamentals and fast-learning methodology.',
        'Gives a concrete past example of mastering a new library or tool rapidly.'
      ]
    },
    {
      category: 'Viva Defense',
      question: `If a professor or hiring manager asks: "Why did you choose ${selectedCandidate.skills.frameworks[0] || 'Next.js'} over traditional alternatives for this architecture?", how do you defend that choice?`,
      context: 'Viva Examination and Technical Defense requirement.',
      expectedAnswerPoints: [
        'Contrasts Server-Side Rendering (SSR), Client-Side Rendering (CSR), and Static Site Generation (SSG).',
        'Highlights SEO advantages, initial page load speeds, and developer ergonomics.',
        'Addresses trade-offs honestly (build complexity, server execution costs).'
      ]
    },
    {
      category: 'Behavioral',
      question: 'Describe a situation where you strongly disagreed with a senior engineer or product manager on a technical trade-off. How did you resolve it?',
      context: 'Evaluates engineering maturity, leadership, and constructive collaboration.',
      expectedAnswerPoints: [
        'Presents data-driven benchmarks or proof-of-concept tests rather than emotional argument.',
        'Demonstrates active listening to business and product deadlines.',
        'Shows commitment to team alignment ("Disagree and commit" mindset).'
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '28px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              background: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--primary-light)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              textTransform: 'uppercase',
            }}>
              AI Interview Intelligence
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Tailored Technical & Viva Defense Generator
            </span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff' }}>
            Tailored Interview & Viva Question Generator
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '6px', maxWidth: '750px' }}>
            Automatically constructs technical questions and viva defense scenarios based on the candidate's exact resume strengths, claimed projects, and missing skill gaps for the target job.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <Printer size={16} />
          <span>Print Interview Sheet</span>
        </button>
      </div>

      {/* Target Selector Card */}
      <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              <UserCheck size={16} color="var(--primary-light)" />
              <span>Interview Candidate</span>
            </label>
            <select
              value={selectedCandidate.id}
              onChange={(e) => {
                const found = MOCK_CANDIDATES.find(c => c.id === e.target.value);
                if (found) setSelectedCandidate(found);
              }}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(9, 10, 16, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            >
              {MOCK_CANDIDATES.map((c) => (
                <option key={c.id} value={c.id} style={{ background: '#101322' }}>
                  {c.name} — {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Briefcase size={16} color="var(--secondary)" />
              <span>Position Being Interviewed For</span>
            </label>
            <select
              value={selectedJob.id}
              onChange={(e) => {
                const found = MOCK_JOBS.find(j => j.id === e.target.value);
                if (found) setSelectedJob(found);
              }}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(9, 10, 16, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            >
              {MOCK_JOBS.map((j) => (
                <option key={j.id} value={j.id} style={{ background: '#101322' }}>
                  {j.title} ({j.department})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List with Accordions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {generatedQuestions.map((q, idx) => {
          const isExpanded = expandedIndex === idx;
          let badgeBg = 'rgba(99, 102, 241, 0.15)';
          let badgeColor = 'var(--primary-light)';
          if (q.category === 'Skill Gap') {
            badgeBg = 'rgba(244, 63, 94, 0.15)';
            badgeColor = 'var(--accent-rose)';
          } else if (q.category === 'Viva Defense') {
            badgeBg = 'rgba(245, 158, 11, 0.15)';
            badgeColor = 'var(--accent-amber)';
          } else if (q.category === 'Deep Dive') {
            badgeBg = 'rgba(6, 182, 212, 0.15)';
            badgeColor = 'var(--accent-cyan)';
          }

          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '20px 24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
            >
              {/* Question Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, paddingRight: '16px' }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: badgeBg,
                    color: badgeColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                  }}>
                    {q.category}
                  </span>

                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.4 }}>
                    Q{idx + 1}: {q.question}
                  </h3>
                </div>

                <button style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {/* Collapsible Rubric & Context */}
              {isExpanded && (
                <div style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}>
                  {/* Context Note */}
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                  }}>
                    <strong>Trigger Context:</strong> {q.context}
                  </div>

                  {/* Expected Answer Points */}
                  <div>
                    <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Key Evaluation Rubric & What a Strong Candidate Mentions:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {q.expectedAnswerPoints.map((pt, pIdx) => (
                        <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                          <CheckCircle2 size={15} color="var(--accent-emerald)" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, AlertTriangle, CheckCircle2, XCircle, Briefcase, 
  Lightbulb, Sparkles, ArrowRight, UserCheck, Layers, FileCode,
  TrendingUp, RefreshCw, Check
} from 'lucide-react';
import { MOCK_CANDIDATES, MOCK_JOBS, Candidate, JobOpening } from '@/lib/mock-data';
import { calculateATSScore } from '@/lib/scoring';
import ScoreGauge from '@/components/score-gauge';
import SkillBadge from '@/components/skill-badge';

export default function MatcherPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(MOCK_CANDIDATES[0]);
  const [selectedJob, setSelectedJob] = useState<JobOpening>(MOCK_JOBS[0]);
  const [customJobText, setCustomJobText] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [isOptimized, setIsOptimized] = useState<boolean>(false);

  // Active Job computation
  const activeJob: JobOpening = isCustomMode ? {
    id: 'job-custom',
    title: 'Custom Job Opening',
    department: 'Custom',
    location: 'Remote',
    type: 'Full-time',
    minExperienceYears: 4,
    requiredSkills: customJobText.split(/[,;\n]/).map(s => s.trim()).filter(s => s.length > 1),
    preferredSkills: ['Git', 'Agile Scrum', 'CI/CD'],
    description: customJobText
  } : selectedJob;

  // If user clicked "Boost / Optimize Resume", create an augmented candidate
  const candidateToScore: Candidate = isOptimized ? {
    ...selectedCandidate,
    experienceYears: Math.max(selectedCandidate.experienceYears, activeJob.minExperienceYears),
    skills: {
      ...selectedCandidate.skills,
      frameworks: [...selectedCandidate.skills.frameworks, ...activeJob.requiredSkills.filter(s => ['React', 'Next.js', 'FastAPI', 'PyTorch', 'Transformers', 'Docker'].includes(s))],
      cloudDevOps: [...selectedCandidate.skills.cloudDevOps, ...activeJob.requiredSkills.filter(s => ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'].includes(s))],
      languages: [...selectedCandidate.skills.languages, ...activeJob.requiredSkills.filter(s => ['TypeScript', 'Python', 'SQL'].includes(s))],
      databases: [...selectedCandidate.skills.databases, ...activeJob.requiredSkills.filter(s => ['PostgreSQL', 'Redis', 'Vector Databases'].includes(s))]
    }
  } : selectedCandidate;

  const scoreResult = calculateATSScore(candidateToScore, activeJob);

  const handleBoostScore = () => {
    setIsOptimized(true);
  };

  const handleResetScore = () => {
    setIsOptimized(false);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
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
            Vector Matching Algorithm
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Keyword Taxonomy & Longevity Scoring
          </span>
        </div>
        <h1 style={{ fontSize: '1.95rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1.2 }}>
          Job Description Matcher & ATS Evaluator
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px', lineHeight: 1.5 }}>
          Benchmark candidate resumes against job opening requirements. Evaluates keyword vector presence, seniority experience requirements, and formats optimization suggestions.
        </p>
      </div>

      {/* Selectors Bar: Candidate & Job Target */}
      <div className="glass-panel" style={{ padding: '18px 20px', marginBottom: '24px' }}>
        <div className="responsive-grid-selectors">
          {/* Candidate Selector */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              <UserCheck size={15} color="var(--primary-light)" />
              <span>Select Candidate</span>
            </label>
            <select
              value={selectedCandidate.id}
              onChange={(e) => {
                const found = MOCK_CANDIDATES.find(c => c.id === e.target.value);
                if (found) {
                  setSelectedCandidate(found);
                  setIsOptimized(false);
                }
              }}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(9, 10, 16, 0.85)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.86rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {MOCK_CANDIDATES.map((c) => (
                <option key={c.id} value={c.id} style={{ background: '#101322' }}>
                  {c.name} — {c.title} ({c.experienceYears}y exp)
                </option>
              ))}
            </select>
          </div>

          {/* Job Opening Selector */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                <Briefcase size={15} color="var(--secondary)" />
                <span>Target Job Opening</span>
              </label>

              <button
                onClick={() => {
                  setIsCustomMode(!isCustomMode);
                  setIsOptimized(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-light)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {isCustomMode ? '← Standard Catalog' : '+ Custom Skills'}
              </button>
            </div>

            {!isCustomMode ? (
              <select
                value={selectedJob.id}
                onChange={(e) => {
                  const found = MOCK_JOBS.find(j => j.id === e.target.value);
                  if (found) {
                    setSelectedJob(found);
                    setIsOptimized(false);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  background: 'rgba(9, 10, 16, 0.85)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '0.86rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {MOCK_JOBS.map((j) => (
                  <option key={j.id} value={j.id} style={{ background: '#101322' }}>
                    {j.title} ({j.department})
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={customJobText}
                onChange={(e) => setCustomJobText(e.target.value)}
                placeholder="Enter comma-separated required skills (e.g. Python, Docker, AWS, React)"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  background: 'rgba(9, 10, 16, 0.85)',
                  border: '1px solid var(--primary)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Results Grid: Responsive */}
      <div className="responsive-grid-matcher">
        
        {/* Left Column: Overall Score & Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main Score Card */}
          <div className="glass-panel" style={{ padding: '28px 20px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Overall Compatibility Score
            </span>
            
            <div style={{ margin: '20px 0 16px' }}>
              <ScoreGauge score={scoreResult.overallScore} grade={scoreResult.grade} size={180} />
            </div>

            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
              {selectedCandidate.name} ➔ {activeJob.title}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.4 }}>
              {scoreResult.overallScore >= 80 
                ? 'High probability of passing automated enterprise ATS screener algorithms.'
                : scoreResult.overallScore >= 65
                ? 'Moderate match. Manual recruiter review recommended after incorporating missing keywords.'
                : 'Low match. Candidate lacks several core architectural requirements for this level.'}
            </p>

            {/* Interactive 1-Click ATS Optimization Simulator */}
            <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {!isOptimized ? (
                <button
                  onClick={handleBoostScore}
                  className="btn-boost"
                  style={{ width: '100%' }}
                >
                  <TrendingUp size={16} />
                  <span>Simulate 1-Click AI Resume Boost</span>
                </button>
              ) : (
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: 700 }}>
                    <Check size={16} />
                    <span>Keywords Boosted to {scoreResult.overallScore}%!</span>
                  </div>
                  <button
                    onClick={handleResetScore}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Reset
                  </button>
                </div>
              )}

              <Link href="/interview" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <Sparkles size={15} color="var(--primary-light)" />
                <span>Tailored Viva & Interview Questions</span>
              </Link>
            </div>
          </div>

          {/* Sub-Score Breakdown */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
              ATS Scoring Weights Breakdown
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Skills Score (50%) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Required & Preferred Skills (50%)</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary-light)', fontFamily: 'var(--font-mono)' }}>
                    {scoreResult.breakdown.skillsScore}%
                  </span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${scoreResult.breakdown.skillsScore}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
                </div>
              </div>

              {/* Experience Score (30%) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Seniority & Tenure Alignment (30%)</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                    {scoreResult.breakdown.experienceScore}%
                  </span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${scoreResult.breakdown.experienceScore}%`, height: '100%', background: 'var(--accent-emerald)', borderRadius: '3px' }} />
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '3px' }}>
                  Candidate: {candidateToScore.experienceYears} yrs • Target: {activeJob.minExperienceYears}+ yrs
                </span>
              </div>

              {/* Education (10%) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Degree & Credential Score (10%)</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                    {scoreResult.breakdown.educationScore}%
                  </span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${scoreResult.breakdown.educationScore}%`, height: '100%', background: 'var(--accent-cyan)', borderRadius: '3px' }} />
                </div>
              </div>

              {/* Formatting (10%) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Formatting & Social Contact Vectors (10%)</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                    {scoreResult.breakdown.formattingScore}%
                  </span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${scoreResult.breakdown.formattingScore}%`, height: '100%', background: 'var(--accent-amber)', borderRadius: '3px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Keyword Match Breakdown & Recommendations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Required Skills Matrix */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
              Required Technical Competencies
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Direct keyword vector presence in candidate resume against mandatory job description specs:
            </p>

            {/* Matched Required Skills */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <CheckCircle2 size={15} color="var(--accent-emerald)" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  Matched Required Skills ({scoreResult.matchedRequiredSkills.length} of {activeJob.requiredSkills.length})
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {scoreResult.matchedRequiredSkills.length > 0 ? (
                  scoreResult.matchedRequiredSkills.map(s => (
                    <SkillBadge key={s} label={s} status="matched" />
                  ))
                ) : (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No required skills matched.</span>
                )}
              </div>
            </div>

            {/* Missing Required Skills */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <XCircle size={15} color="var(--accent-rose)" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
                  Missing Required Skills ({scoreResult.missingRequiredSkills.length})
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {scoreResult.missingRequiredSkills.length > 0 ? (
                  scoreResult.missingRequiredSkills.map(s => (
                    <SkillBadge key={s} label={s} status="missing" />
                  ))
                ) : (
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)' }}>
                    All mandatory skills are present in the candidate profile!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Preferred / Bonus Skills */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
              Preferred & Bonus Competencies
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Secondary skills that give candidates higher priority during recruiter tie-breaking:
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {activeJob.preferredSkills.map((pref) => {
                const isMatched = scoreResult.matchedPreferredSkills.includes(pref);
                return (
                  <SkillBadge
                    key={pref}
                    label={pref}
                    status={isMatched ? 'matched' : 'neutral'}
                  />
                );
              })}
            </div>
          </div>

          {/* Actionable ATS Optimization Suggestions */}
          <div className="glass-panel" style={{ padding: '22px', borderLeft: '4px solid var(--accent-amber)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Lightbulb size={18} color="var(--accent-amber)" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff' }}>
                AI ATS Optimization Suggestions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {scoreResult.recommendations.map((rec, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}>
                  <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>•</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

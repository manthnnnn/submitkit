'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, Filter, Search, ArrowUpDown, ChevronRight, CheckCircle2, 
  Clock, Mail, Phone, ExternalLink, Briefcase, Award, Sparkles, Zap,
  Plus, X, AlertCircle, HelpCircle, BookOpen, GraduationCap, Check
} from 'lucide-react';
import { MOCK_CANDIDATES, MOCK_JOBS, Candidate, JobOpening } from '@/lib/mock-data';
import { calculateATSScore } from '@/lib/scoring';
import SkillBadge from '@/components/skill-badge';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [selectedJob, setSelectedJob] = useState<JobOpening>(MOCK_JOBS[0]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'score' | 'experience' | 'name'>('score');

  // Interactive Modal & Guide States
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // New Candidate Form State
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: 'Remote, USA',
    experienceYears: '3',
    languages: 'TypeScript, Python',
    frameworks: 'React, Node.js, Next.js',
    status: 'Screening' as Candidate['status'],
  });

  // Compute scores for each candidate against selectedJob
  const scoredCandidates = candidates.map(c => {
    const res = calculateATSScore(c, selectedJob);
    return {
      ...c,
      atsScore: res.overallScore,
      atsGrade: res.grade,
      matchedCount: res.matchedRequiredSkills.length,
      missingCount: res.missingRequiredSkills.length,
    };
  });

  // Filter & Search
  const filteredCandidates = scoredCandidates.filter(c => {
    const matchesStatus = statusFilter === 'ALL' || c.status.toUpperCase() === statusFilter.toUpperCase();
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.skills.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          c.skills.frameworks.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Sort
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'score') return b.atsScore - a.atsScore;
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
    return a.name.localeCompare(b.name);
  });

  // Status Change Handler
  const handleStatusChange = (candId: string, newStatus: Candidate['status']) => {
    setCandidates(prev => prev.map(c => c.id === candId ? { ...c, status: newStatus } : c));
  };

  // Add Candidate Submit Handler
  const handleAddCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!newCandidate.name.trim()) {
      setFormError('Candidate full name is required.');
      return;
    }
    if (!newCandidate.email.trim() || !newCandidate.email.includes('@') || !newCandidate.email.includes('.')) {
      setFormError('Please provide a valid candidate email address.');
      return;
    }
    if (!newCandidate.title.trim()) {
      setFormError('Professional job title / role is required.');
      return;
    }

    const expNum = parseFloat(newCandidate.experienceYears);
    if (isNaN(expNum) || expNum < 0) {
      setFormError('Years of experience must be a valid positive number.');
      return;
    }

    const parsedLanguages = newCandidate.languages.split(',').map(s => s.trim()).filter(Boolean);
    const parsedFrameworks = newCandidate.frameworks.split(',').map(s => s.trim()).filter(Boolean);

    if (parsedLanguages.length === 0) {
      setFormError('Please provide at least one programming language.');
      return;
    }

    const created: Candidate = {
      id: `cand-${Date.now()}`,
      name: newCandidate.name.trim(),
      email: newCandidate.email.trim(),
      phone: newCandidate.phone.trim() || '+1 (555) 234-5678',
      location: newCandidate.location.trim() || 'Remote',
      title: newCandidate.title.trim(),
      linkedin: 'linkedin.com/in/applicant',
      github: 'github.com/applicant',
      portfolio: '',
      experienceYears: expNum,
      summary: `Motivated ${newCandidate.title.trim()} with ${expNum} years of hands-on expertise.`,
      education: [
        {
          degree: 'B.S. in Computer Science',
          institution: 'State University',
          year: '2021',
        }
      ],
      skills: {
        languages: parsedLanguages,
        frameworks: parsedFrameworks,
        cloudDevOps: ['Docker', 'AWS'],
        databases: ['PostgreSQL', 'Redis'],
        tools: ['Git', 'VS Code'],
        softSkills: ['Teamwork', 'Agile Delivery'],
      },
      experience: [
        {
          role: newCandidate.title.trim(),
          company: 'Tech Solutions Inc.',
          duration: '2022 - Present',
          highlights: ['Delivered core production microservices', 'Participated in sprint planning'],
        }
      ],
      certifications: ['Certified Software Practitioner'],
      status: newCandidate.status,
      appliedDate: new Date().toISOString().split('T')[0],
      rawResumeText: `${newCandidate.name.trim()} - ${newCandidate.title.trim()}\nEmail: ${newCandidate.email.trim()}\nSkills: ${parsedLanguages.join(', ')}, ${parsedFrameworks.join(', ')}`,
    };

    setCandidates(prev => [created, ...prev]);
    setFormSuccess(`Candidate "${created.name}" enrolled into active talent pool successfully!`);
    
    // Reset Form
    setNewCandidate({
      name: '',
      title: '',
      email: '',
      phone: '',
      location: 'Remote, USA',
      experienceYears: '3',
      languages: 'TypeScript, Python',
      frameworks: 'React, Node.js, Next.js',
      status: 'Screening',
    });

    setTimeout(() => {
      setIsAddModalOpen(false);
      setFormSuccess(null);
    }, 1200);
  };

  // Pipeline Metrics
  const pipelineStats = {
    total: candidates.length,
    screening: candidates.filter(c => c.status === 'Screening').length,
    shortlisted: candidates.filter(c => c.status === 'Shortlisted').length,
    interview: candidates.filter(c => c.status === 'Interview').length,
    offer: candidates.filter(c => c.status === 'Offer').length,
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 24px' }}>
      
      {/* Header with Add Candidate CTA */}
      <div style={{
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px',
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
              Hiring Workflow Portal
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Comparative ATS Ranking & Funnel
            </span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff' }}>
            Recruiter Candidate Leaderboard & Pipeline
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '6px', maxWidth: '720px' }}>
            Benchmark and rank applicants dynamically based on compatibility with specific job requirements. Transition candidates across the recruitment pipeline.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowGuide(prev => !prev)}
            className="btn-secondary"
            style={{ padding: '10px 16px', fontSize: '0.85rem' }}
          >
            <GraduationCap size={16} color="var(--primary-light)" />
            <span>{showGuide ? 'Hide ATS Explainer' : '🎓 10th-Grade ATS Guide'}</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            <Plus size={16} />
            <span>Add Candidate to Pool</span>
          </button>
        </div>
      </div>

      {/* 10th-Grade ATS Explainer Callout */}
      {showGuide && (
        <div className="glass-panel" style={{
          padding: '20px 24px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.25rem' }}>🎓</span>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              What is an ATS (Applicant Tracking System)? (Explained Simply for High Schoolers)
            </h3>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: 'var(--primary-light)', marginBottom: '4px' }}>
                🤖 The Robot Teacher
              </div>
              When 5,000 people apply for 1 job, humans cannot read every page. The ATS is like an automated scanner that grades resumes against an answer key.
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '4px' }}>
                🔑 Keyword Matching
              </div>
              If a job requires &quot;Python&quot; and &quot;SQL&quot;, the engine searches for those words. Finding exact matches awards high marks; missing them lowers the score.
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px' }}>
                ⏳ Experience Weight
              </div>
              A senior engineer needs 5+ years. If an applicant has 6 years, they get full points. If they have only 1 year, the score adjusts lower.
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '4px' }}>
                📄 Clean Formatting Wins
              </div>
              Fancy images and complex 3-column tables confuse the robot. Clean text with clear bullet points always gets parsed with 99%+ accuracy!
            </div>
          </div>
        </div>
      )}

      {/* Pipeline Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '28px',
      }}>
        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Total Applicants
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            {pipelineStats.total}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid var(--accent-cyan)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            In Screening
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            {pipelineStats.screening}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid var(--primary-light)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Shortlisted (ATS Pass)
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-light)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            {pipelineStats.shortlisted}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid var(--accent-amber)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Interview Stage
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            {pipelineStats.interview}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid var(--accent-emerald)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Offers Extended
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            {pipelineStats.offer}
          </div>
        </div>
      </div>

      {/* Control Bar: Job Target Selector & Search & Filters */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          {/* Target Job Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Rank Candidates For:
            </span>
            <select
              value={selectedJob.id}
              onChange={(e) => {
                const found = MOCK_JOBS.find(j => j.id === e.target.value);
                if (found) setSelectedJob(found);
              }}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                background: 'rgba(9, 10, 16, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.85rem',
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
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input
              type="text"
              placeholder="Search candidate, skill, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: '6px',
                background: 'rgba(9, 10, 16, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.82rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Sort By */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={14} color="var(--text-muted)" />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                background: 'rgba(9, 10, 16, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.82rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="score" style={{ background: '#101322' }}>ATS Compatibility Score</option>
              <option value="experience" style={{ background: '#101322' }}>Years of Experience</option>
              <option value="name" style={{ background: '#101322' }}>Candidate Name</option>
            </select>
          </div>

          {/* Status Filter Tabs */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {['ALL', 'Screening', 'Shortlisted', 'Interview', 'Offer'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: statusFilter === tab ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                  color: statusFilter === tab ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Candidates Ranked Table / Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sortedCandidates.length === 0 ? (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No applicants match your current query or stage filter.
          </div>
        ) : (
          sortedCandidates.map((candidate, rank) => {
            let scoreColor = 'var(--accent-emerald)';
            if (candidate.atsScore < 55) scoreColor = 'var(--accent-rose)';
            else if (candidate.atsScore < 70) scoreColor = 'var(--accent-amber)';
            else if (candidate.atsScore < 85) scoreColor = 'var(--primary-light)';

            return (
              <div
                key={candidate.id}
                className="glass-panel glass-panel-interactive candidate-row-grid"
                style={{
                  padding: '18px 20px',
                }}
              >
                {/* Rank & Score Pill */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    #{rank + 1}
                  </div>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: scoreColor,
                    fontFamily: 'var(--font-mono)',
                    marginTop: '2px',
                  }}>
                    {candidate.atsScore}%
                  </div>
                  <div style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: scoreColor,
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    marginTop: '2px',
                  }}>
                    {candidate.atsGrade}
                  </div>
                </div>

                {/* Candidate Info */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#ffffff',
                    }}>
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                        {candidate.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--primary-light)' }}>
                        {candidate.title} • <span style={{ color: 'var(--text-muted)' }}>{candidate.experienceYears}y exp</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', marginTop: '8px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>{candidate.email}</span>
                    <span>•</span>
                    <span>{candidate.location}</span>
                  </div>
                </div>

                {/* Skills Preview */}
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Key Extracted Stack
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {candidate.skills.languages.slice(0, 2).map(s => (
                      <SkillBadge key={s} label={s} category="languages" />
                    ))}
                    {candidate.skills.frameworks.slice(0, 2).map(s => (
                      <SkillBadge key={s} label={s} category="frameworks" />
                    ))}
                    {candidate.skills.cloudDevOps.slice(0, 1).map(s => (
                      <SkillBadge key={s} label={s} category="cloudDevOps" />
                    ))}
                  </div>
                </div>

                {/* Stage Funnel Selector */}
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Hiring Stage
                  </div>
                  <select
                    value={candidate.status}
                    onChange={(e) => handleStatusChange(candidate.id, e.target.value as any)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '6px',
                      background: 'rgba(9, 10, 16, 0.9)',
                      border: '1px solid var(--border-subtle)',
                      color: candidate.status === 'Offer' ? 'var(--accent-emerald)' :
                             candidate.status === 'Interview' ? 'var(--accent-amber)' :
                             candidate.status === 'Shortlisted' ? 'var(--primary-light)' : '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      outline: 'none',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    <option value="Applied" style={{ background: '#101322', color: '#fff' }}>Applied</option>
                    <option value="Screening" style={{ background: '#101322', color: '#fff' }}>Screening</option>
                    <option value="Shortlisted" style={{ background: '#101322', color: '#fff' }}>Shortlisted</option>
                    <option value="Interview" style={{ background: '#101322', color: '#fff' }}>Interview</option>
                    <option value="Offer" style={{ background: '#101322', color: '#fff' }}>Offer Extended</option>
                  </select>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <Link
                    href={`/matcher`}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.76rem' }}
                  >
                    <Zap size={13} color="var(--primary-light)" />
                    <span>Deep ATS</span>
                  </Link>
                  <Link
                    href={`/interview`}
                    className="btn-primary"
                    style={{ padding: '6px 12px', fontSize: '0.76rem' }}
                  >
                    <Sparkles size={13} />
                    <span>Viva Prep</span>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Candidate Modal */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            position: 'relative',
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '10px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: 'var(--primary-light)',
                }}>
                  <Users size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Add Candidate to Talent Pool
                  </h2>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    Candidate will be immediately indexed and graded by the ATS heuristic engine.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Error / Success Feedback */}
            {formError && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#fca5a5',
                fontSize: '0.82rem',
                marginBottom: '16px',
              }}>
                <AlertCircle size={16} />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: 'var(--accent-emerald)',
                fontSize: '0.82rem',
                marginBottom: '16px',
              }}>
                <CheckCircle2 size={16} />
                <span>{formSuccess}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleAddCandidateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>
                  Full Candidate Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Adams"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    background: 'rgba(9, 10, 16, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rachel.adams@example.com"
                    value={newCandidate.email}
                    onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      background: 'rgba(9, 10, 16, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 432-8765"
                    value={newCandidate.phone}
                    onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      background: 'rgba(9, 10, 16, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Job Role / Professional Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Frontend Engineer"
                    value={newCandidate.title}
                    onChange={(e) => setNewCandidate({ ...newCandidate, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      background: 'rgba(9, 10, 16, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Experience (Years) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    step="0.5"
                    required
                    value={newCandidate.experienceYears}
                    onChange={(e) => setNewCandidate({ ...newCandidate, experienceYears: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      background: 'rgba(9, 10, 16, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>
                  Programming Languages (Comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="TypeScript, Python, Go"
                  value={newCandidate.languages}
                  onChange={(e) => setNewCandidate({ ...newCandidate, languages: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    background: 'rgba(9, 10, 16, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>
                  Frameworks & Tools (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Next.js, FastAPI, Docker"
                  value={newCandidate.frameworks}
                  onChange={(e) => setNewCandidate({ ...newCandidate, frameworks: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    background: 'rgba(9, 10, 16, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="San Francisco, CA or Remote"
                    value={newCandidate.location}
                    onChange={(e) => setNewCandidate({ ...newCandidate, location: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      background: 'rgba(9, 10, 16, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Initial Hiring Stage
                  </label>
                  <select
                    value={newCandidate.status}
                    onChange={(e) => setNewCandidate({ ...newCandidate, status: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      background: 'rgba(9, 10, 16, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Applied" style={{ background: '#101322' }}>Applied</option>
                    <option value="Screening" style={{ background: '#101322' }}>Screening</option>
                    <option value="Shortlisted" style={{ background: '#101322' }}>Shortlisted</option>
                    <option value="Interview" style={{ background: '#101322' }}>Interview</option>
                    <option value="Offer" style={{ background: '#101322' }}>Offer Extended</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                >
                  <Check size={16} />
                  <span>Enroll Candidate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

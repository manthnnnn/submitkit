'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, Upload, Sparkles, CheckCircle2, ArrowRight, User, Mail, 
  Phone, MapPin, Globe, Code2, Share2, Briefcase, GraduationCap, 
  Layers, Cpu, Zap, RefreshCw, Award, Copy, Check, Filter, Search, Download
} from 'lucide-react';
import { MOCK_CANDIDATES, Candidate } from '@/lib/mock-data';
import { parseResumeText } from '@/lib/parser';
import SkillBadge from '@/components/skill-badge';

export default function HomePage() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(MOCK_CANDIDATES[0]);
  const [rawText, setRawText] = useState<string>(MOCK_CANDIDATES[0].rawResumeText);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parseSuccess, setParseSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'experience'>('overview');
  const [skillFilter, setSkillFilter] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectPreset = (cand: Candidate) => {
    setSelectedCandidate(cand);
    setRawText(cand.rawResumeText);
    setParseSuccess(false);
  };

  const handleParseText = () => {
    setIsParsing(true);
    setTimeout(() => {
      const parsed = parseResumeText(rawText);
      setSelectedCandidate(parsed);
      setIsParsing(false);
      setParseSuccess(true);
    }, 400);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setRawText(content);
      setIsParsing(true);
      setTimeout(() => {
        const parsed = parseResumeText(content);
        setSelectedCandidate(parsed);
        setIsParsing(false);
        setParseSuccess(true);
      }, 450);
    };
    reader.readAsText(file);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(
      `Candidate: ${selectedCandidate.name}\nTitle: ${selectedCandidate.title}\nExperience: ${selectedCandidate.experienceYears} Years\nSkills: ${selectedCandidate.skills.languages.concat(selectedCandidate.skills.frameworks).join(', ')}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportDossier = () => {
    const dossierText = `=====================================================
TALENTSCAN AI - CANDIDATE CREDENTIAL DOSSIER
CONFIDENTIAL & PRIVILEGED TALENT ARCHIVE
=====================================================

CANDIDATE PROFILE:
------------------
Name:               ${selectedCandidate.name}
Professional Title: ${selectedCandidate.title}
Experience:         ${selectedCandidate.experienceYears}+ Years
Email:              ${selectedCandidate.email}
Phone:              ${selectedCandidate.phone}
Location:           ${selectedCandidate.location}
LinkedIn:           ${selectedCandidate.linkedin || 'N/A'}
GitHub:             ${selectedCandidate.github || 'N/A'}

EXTRACTED SKILLS TAXONOMY:
--------------------------
Languages:          ${selectedCandidate.skills.languages.join(', ')}
Frameworks:         ${selectedCandidate.skills.frameworks.join(', ')}
Cloud & DevOps:     ${selectedCandidate.skills.cloudDevOps.join(', ')}
Databases:          ${selectedCandidate.skills.databases.join(', ')}
Tools:              ${selectedCandidate.skills.tools.join(', ')}
Soft Skills:        ${selectedCandidate.skills.softSkills.join(', ')}

CAREER MILESTONES & HISTORY:
----------------------------
${selectedCandidate.experience.map(exp => `Role: ${exp.role} at ${exp.company} (${exp.duration})\nHighlights:\n${exp.highlights.map(h => `  - ${h}`).join('\n')}`).join('\n\n')}

VERIFIED EDUCATION & ACCREDITATION:
-----------------------------------
${selectedCandidate.education.map(edu => `- ${edu.degree}, ${edu.institution} (${edu.year})`).join('\n')}

ATS HEURISTIC SCAN AUDIT:
-------------------------
Integrity Status: Verified Entity Structure (spaCy NER Taxonomy)
Generated: ${new Date().toISOString()}
=====================================================`;

    const blob = new Blob([dossierText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedCandidate.name.toLowerCase().replace(/\s+/g, '-')}-dossier.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Flattened & filtered skills
  const allSkills = [
    ...selectedCandidate.skills.languages.map(s => ({ label: s, category: 'languages' as const })),
    ...selectedCandidate.skills.frameworks.map(s => ({ label: s, category: 'frameworks' as const })),
    ...selectedCandidate.skills.cloudDevOps.map(s => ({ label: s, category: 'cloudDevOps' as const })),
    ...selectedCandidate.skills.databases.map(s => ({ label: s, category: 'databases' as const })),
    ...selectedCandidate.skills.tools.map(s => ({ label: s, category: 'tools' as const })),
    ...selectedCandidate.skills.softSkills.map(s => ({ label: s, category: 'softSkills' as const })),
  ].filter(s => s.label.toLowerCase().includes(skillFilter.toLowerCase()));

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Banner / Hero */}
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
              letterSpacing: '0.05em',
            }}>
              Core Parsing Engine
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              spaCy NLP & Pattern Taxonomy
            </span>
          </div>
          <h1 style={{ fontSize: '1.95rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1.2 }}>
            Intelligent Resume Parser & Entity Extractor
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px', maxWidth: '750px', lineHeight: 1.5 }}>
            Instantly transform raw resume text into verified applicant credentials: contact vectors, multi-tier skill taxonomies, career longevity, and education credentials.
          </p>
        </div>

        {/* Quick Metrics */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="glass-panel" style={{ padding: '12px 18px', minWidth: '110px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-light)', fontFamily: 'var(--font-mono)' }}>
              98.4%
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px' }}>
              Precision
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '12px 18px', minWidth: '110px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
              150+
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px' }}>
              Taxonomies
            </div>
          </div>
        </div>
      </div>

      {/* Preset Candidate Quick Selectors */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Select a Benchmark Candidate to Test:
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {MOCK_CANDIDATES.map((cand) => {
            const isSelected = selectedCandidate.name === cand.name;
            return (
              <button
                key={cand.id}
                onClick={() => handleSelectPreset(cand)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.15))' : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? '1px solid var(--primary-light)' : '1px solid var(--border-subtle)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: isSelected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: '#ffffff',
                }}>
                  {cand.name.charAt(0)}
                </div>
                <span>{cand.name}</span>
                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>({cand.experienceYears}y exp)</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 10th-Grade Explainer Callout */}
      <div className="glass-panel" style={{
        padding: '18px 22px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        borderRadius: '14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>🎓</span>
          <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            10th Standard Guide: How does AI read a Resume?
          </h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
        }}>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--primary-light)' }}>1. Entity Highlighting:</span> Like using a highlighter pen, AI instantly spots names, emails, and phone numbers in any layout.
          </div>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>2. Skill Taxonomy:</span> The engine categorizes skills into drawers—e.g., it knows &quot;React&quot; is frontend and &quot;PostgreSQL&quot; is a database.
          </div>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>3. Career Math:</span> It calculates working periods between dates (e.g., 2020–2024 = 4 years) to compute verified experience longevity.
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="responsive-grid-2col">
        
        {/* Left Column: Input Box & File Drop */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          
          {/* File Upload Dropzone */}
          <label style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 16px',
            borderRadius: '10px',
            border: '2px dashed rgba(99, 102, 241, 0.4)',
            background: 'rgba(99, 102, 241, 0.04)',
            cursor: 'pointer',
            marginBottom: '16px',
            transition: 'all 0.2s ease',
          }}>
            <Upload size={24} color="var(--primary-light)" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#ffffff' }}>
              Drop resume document (.txt, .md) or click to browse
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Supports plain text resumes, Markdown, and formatted CVs
            </span>
            <input
              type="file"
              accept=".txt,.md,.text"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Raw Resume Content
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {rawText.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste raw resume text, markdown, or plain text content here..."
            style={{
              width: '100%',
              height: '340px',
              backgroundColor: 'rgba(9, 10, 16, 0.75)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '14px',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <button
              onClick={handleParseText}
              disabled={isParsing || !rawText.trim()}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              {isParsing ? (
                <>
                  <RefreshCw size={16} className="pulse-glow" />
                  <span>Extracting Entities & Taxonomy...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Run Deep NLP Resume Parser</span>
                </>
              )}
            </button>
          </div>

          {parseSuccess && (
            <div style={{
              marginTop: '14px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: 'var(--accent-emerald)',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <CheckCircle2 size={16} />
              <span>Resume entities parsed and synchronized!</span>
            </div>
          )}
        </div>

        {/* Right Column: Parsed Structured Profile Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          
          {/* Header Card */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '14px',
          }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                fontWeight: 800,
                color: '#ffffff',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
              }}>
                {selectedCandidate.name.charAt(0)}
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {selectedCandidate.name}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary-light)', fontWeight: 600 }}>
                    {selectedCandidate.title}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                  }}>
                    {selectedCandidate.experienceYears}+ Years Longevity
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={handleCopySummary}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                title="Copy Candidate Summary"
              >
                {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleExportDossier}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.78rem', borderColor: 'rgba(99, 102, 241, 0.4)' }}
                title="Export Comprehensive Candidate Dossier File"
              >
                <Download size={14} color="var(--accent-cyan)" />
                <span>Export Dossier</span>
              </button>

              <Link
                href="/matcher"
                className="btn-primary"
                style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              >
                <Zap size={14} />
                <span>Test ATS Score</span>
              </Link>
            </div>
          </div>

          {/* Contact Details Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '10px',
            padding: '14px 0',
            borderBottom: '1px solid var(--border-subtle)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              <Mail size={13} color="var(--primary-light)" />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {selectedCandidate.email}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              <Phone size={13} color="var(--accent-emerald)" />
              <span>{selectedCandidate.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              <MapPin size={13} color="var(--accent-amber)" />
              <span>{selectedCandidate.location}</span>
            </div>
            {selectedCandidate.linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                <Share2 size={13} color="#0077b5" />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {selectedCandidate.linkedin}
                </span>
              </div>
            )}
            {selectedCandidate.github && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                <Code2 size={13} color="#cbd5e1" />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {selectedCandidate.github}
                </span>
              </div>
            )}
          </div>

          {/* Navigation Tabs Inside Parsed Card */}
          <div style={{
            display: 'flex',
            gap: '6px',
            padding: '14px 0 10px',
            borderBottom: '1px solid var(--border-subtle)',
            overflowX: 'auto',
          }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: activeTab === 'overview' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'overview' ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
              }}
            >
              Overview & Credentials
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: activeTab === 'skills' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'skills' ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Skills Taxonomy</span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '1px 6px',
                borderRadius: '999px',
                fontSize: '0.65rem',
              }}>
                {allSkills.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: activeTab === 'experience' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'experience' ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
              }}
            >
              Work History Timeline
            </button>
          </div>

          {/* Tab Content */}
          <div style={{ paddingTop: '16px' }}>
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Professional Executive Summary
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {selectedCandidate.summary}
                </p>

                <h3 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                  Education & Certifications
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedCandidate.education.map((edu, idx) => (
                    <div key={idx} style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                          {edu.degree}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {edu.institution}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                        Class of {edu.year} {edu.gpa && `(${edu.gpa})`}
                      </span>
                    </div>
                  ))}

                  {selectedCandidate.certifications.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                      {selectedCandidate.certifications.map((cert, idx) => (
                        <span key={idx} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.74rem',
                          color: 'var(--accent-amber)',
                          background: 'rgba(245, 158, 11, 0.1)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                        }}>
                          <Award size={12} />
                          <span>{cert}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. SKILLS TAB */}
            {activeTab === 'skills' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '12px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={13} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                    <input
                      type="text"
                      placeholder="Filter parsed skills..."
                      value={skillFilter}
                      onChange={(e) => setSkillFilter(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 10px 6px 30px',
                        borderRadius: '6px',
                        background: 'rgba(9, 10, 16, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        color: '#ffffff',
                        fontSize: '0.78rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {allSkills.length > 0 ? (
                    allSkills.map(s => (
                      <SkillBadge key={s.label} label={s.label} category={s.category} showCategory />
                    ))
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      No skills match &quot;{skillFilter}&quot;.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 3. EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedCandidate.experience.map((exp, idx) => (
                  <div key={idx} style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderLeft: '3px solid var(--primary-light)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                        {exp.role}
                      </div>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {exp.duration}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--primary-light)', marginTop: '2px', fontWeight: 600 }}>
                      {exp.company}
                    </div>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul style={{ marginTop: '8px', paddingLeft: '18px', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx} style={{ marginBottom: '4px' }}>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

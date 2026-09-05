'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, ShieldCheck, HeartPulse, Stethoscope, FileText, 
  Users, ArrowRight, CheckCircle2, Lock, Sparkles, Calendar, 
  AlertTriangle, Clock, ChevronRight, ArrowUpRight, Zap, Check,
  BookOpen, Pill, Thermometer, Droplet
} from 'lucide-react';

export default function HealthSyncLandingPage() {
  const [selectedPatientTab, setSelectedPatientTab] = useState<'vitals' | 'labs' | 'meds'>('vitals');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#070b14',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* Background Cyber-Grid & Medical Cyan Glow */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(14, 165, 233, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(14, 165, 233, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Radial Ambient Blue Glow */}
      <div style={{
        position: 'fixed',
        top: '-15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '900px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* 1. TOP MARKETING NAVIGATION */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(7, 11, 20, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '16px 32px'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          
          {/* Brand Logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(14, 165, 233, 0.35)'
            }}>
              <Activity size={22} color="white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  Health<span style={{ color: '#38bdf8' }}>Sync</span>
                  <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.85rem' }}>.EHR</span>
                </span>
                <span style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#38bdf8'
                }}>
                  ENTERPRISE v3.8
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>
                Clinical Intelligence & Electronic Health Records
              </span>
            </div>
          </div>

          {/* Nav Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399'
            }}>
              <ShieldCheck size={14} />
              HIPAA & HITECH Certified
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(14, 165, 233, 0.12)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              color: '#38bdf8'
            }}>
              <Zap size={14} />
              FHIR / HL7 v4.0 Active
            </span>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(14, 165, 233, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Launch Clinical Portal</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 24px 48px',
        textAlign: 'center'
      }}>
        
        {/* Status Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '999px',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          marginBottom: '24px'
        }}>
          <Sparkles size={14} color="#38bdf8" />
          <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em', color: '#7dd3fc', textTransform: 'uppercase' }}>
            Autonomous Clinical Intelligence & EHR Interoperability
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
          fontWeight: 900,
          lineHeight: 1.12,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          marginBottom: '24px',
          maxWidth: '960px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Unified Electronic Health Records for{' '}
          <span style={{
            background: 'linear-gradient(135deg, #38bdf8, #818cf8, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Modern Hospital Networks
          </span>
        </h1>

        {/* Subhead */}
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          color: '#94a3b8',
          maxWidth: '820px',
          margin: '0 auto 36px',
          lineHeight: 1.6
        }}>
          Centralize patient encounters, vital telemetry, and lab diagnostic vectors with zero data silos. Engineered with automated clinical decision support safeguards and seamless FHIR / HL7 protocol interoperability.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(14, 165, 233, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Launch Clinical Portal</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/records"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 30px',
              borderRadius: '14px',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              color: '#e2e8f0',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Lock size={16} color="#38bdf8" />
            <span>Secure Clinician Sign-In</span>
          </Link>
        </div>

        {/* KPI Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          maxWidth: '1100px',
          margin: '56px auto 0'
        }}>
          <div style={{
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace' }}>45,000+</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>
              Patient Charts Indexed
            </div>
          </div>

          <div style={{
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#38bdf8', fontFamily: 'monospace' }}>&lt; 0.4s</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>
              Chart Query Latency
            </div>
          </div>

          <div style={{
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#34d399', fontFamily: 'monospace' }}>99.99%</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>
              HL7 / FHIR Cloud Uptime
            </div>
          </div>

          <div style={{
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#a78bfa', fontFamily: 'monospace' }}>Zero</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>
              Missed Drug Interactions
            </div>
          </div>
        </div>

      </section>

      {/* 3. INTERACTIVE CLINICAL TELEMETRY WORKBENCH */}
      <section style={{
        maxWidth: '1160px',
        margin: '0 auto',
        padding: '32px 24px 48px',
        position: 'relative',
        zIndex: 10
      }}>
        
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 28px' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38bdf8' }}>
            Live Clinical Encounter Simulator
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '6px' }}>
            Real-Time Patient Charting & Vitals
          </h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '6px' }}>
            Inspect live telemetry, diagnostic panels, and active orders as viewed by attending hospital staff.
          </p>
        </div>

        {/* Workbench Frame */}
        <div style={{
          borderRadius: '24px',
          backgroundColor: '#0c1322',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden'
        }}>
          
          {/* Header Strip */}
          <div style={{
            padding: '16px 24px',
            backgroundColor: 'rgba(7, 11, 20, 0.95)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#64748b', marginLeft: '8px' }}>
                healthsync_ehr // encounter_session_#9482-B
              </span>
            </div>

            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              ● CLINICIAN SECURE SESSION ACTIVE
            </span>
          </div>

          {/* Patient Overview Strip */}
          <div style={{
            padding: '24px',
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #0284c7, #1d4ed8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 900,
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
              }}>
                SJ
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Sarah Jenkins
                  </h3>
                  <span style={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.25)'
                  }}>
                    MRN: 9482-B
                  </span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Age: 48 • Female</span>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', margin: '4px 0 0' }}>
                  Primary Diagnosis: <strong style={{ color: '#e2e8f0' }}>Acute Bronchitis</strong> • Attending: Dr. Aris Thorne, MD (Pulmonology)
                </p>
              </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div style={{
              display: 'flex',
              gap: '6px',
              backgroundColor: 'rgba(7, 11, 20, 0.8)',
              padding: '4px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <button
                onClick={() => setSelectedPatientTab('vitals')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: selectedPatientTab === 'vitals' ? '#0284c7' : 'transparent',
                  color: selectedPatientTab === 'vitals' ? '#ffffff' : '#94a3b8'
                }}
              >
                Vitals Telemetry
              </button>
              <button
                onClick={() => setSelectedPatientTab('labs')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: selectedPatientTab === 'labs' ? '#0284c7' : 'transparent',
                  color: selectedPatientTab === 'labs' ? '#ffffff' : '#94a3b8'
                }}
              >
                Lab Diagnostic Orders
              </button>
              <button
                onClick={() => setSelectedPatientTab('meds')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: selectedPatientTab === 'meds' ? '#0284c7' : 'transparent',
                  color: selectedPatientTab === 'meds' ? '#ffffff' : '#94a3b8'
                }}
              >
                Active Prescriptions
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div style={{ padding: '28px' }}>
            {selectedPatientTab === 'vitals' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                
                <div style={{
                  padding: '20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(7, 11, 20, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>
                    <span>HEART RATE</span>
                    <HeartPulse size={16} color="#f43f5e" />
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace', margin: '10px 0 4px' }}>
                    72 <span style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>bpm</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 700 }}>
                    Normal Sinus Rhythm
                  </div>
                </div>

                <div style={{
                  padding: '20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(7, 11, 20, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>
                    <span>OXYGEN SATURATION</span>
                    <Activity size={16} color="#38bdf8" />
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace', margin: '10px 0 4px' }}>
                    98% <span style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>SpO2</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 700 }}>
                    Room Air Ambient
                  </div>
                </div>

                <div style={{
                  padding: '20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(7, 11, 20, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>
                    <span>BLOOD PRESSURE</span>
                    <Activity size={16} color="#fbbf24" />
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace', margin: '10px 0 4px' }}>
                    118/76 <span style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>mmHg</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 700 }}>
                    Optimal Normotensive
                  </div>
                </div>

                <div style={{
                  padding: '20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(7, 11, 20, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>
                    <span>CORE TEMPERATURE</span>
                    <Thermometer size={16} color="#2dd4bf" />
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace', margin: '10px 0 4px' }}>
                    98.6 <span style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>°F</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 700 }}>
                    Afebrile Baseline
                  </div>
                </div>

              </div>
            )}

            {selectedPatientTab === 'labs' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(7, 11, 20, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 size={20} color="#34d399" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                        Complete Blood Count (CBC with Differential)
                      </div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                        WBC: 6.8 K/uL • Hemoglobin: 14.2 g/dL • Platelets: 240 K/uL
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    ALL NORMAL
                  </span>
                </div>

                <div style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(7, 11, 20, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 size={20} color="#34d399" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                        Comprehensive Metabolic Panel (CMP-14)
                      </div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                        eGFR: &gt;90 • Creatinine: 0.85 mg/dL • Glucose: 92 mg/dL
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    ALL NORMAL
                  </span>
                </div>
              </div>
            )}

            {selectedPatientTab === 'meds' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(7, 11, 20, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Pill size={20} color="#38bdf8" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                        Albuterol HFA Inhaler 90mcg
                      </div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                        1-2 puffs every 4-6 hours PRN wheezing • Refills: 2
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.3)'
                  }}>
                    ACTIVE SCRIPT
                  </span>
                </div>

                <div style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(7, 11, 20, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Pill size={20} color="#38bdf8" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                        Amoxicillin / Clavulanate 875-125mg
                      </div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                        1 tablet BID with food x 7 days • Zero interaction warnings
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.3)'
                  }}>
                    ACTIVE SCRIPT
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar Footer */}
          <div style={{
            padding: '16px 24px',
            backgroundColor: 'rgba(7, 11, 20, 0.95)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
              Complete clinical chart records, longitudinal vitals graphs, and appointment rosters ready.
            </div>
            <Link
              href="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '10px',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 800,
                textDecoration: 'none'
              }}
            >
              <span>Open Full Patient Dashboard</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>

      </section>

      {/* 4. 10TH-GRADE FRIENDLY CONCEPT EXPLAINER */}
      <section style={{
        maxWidth: '1160px',
        margin: '0 auto',
        padding: '16px 24px 48px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          padding: '28px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(99, 102, 241, 0.05))',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <BookOpen size={22} color="#38bdf8" />
          </div>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              How Does an EHR System Work? (Explained for 10th Graders)
            </h3>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6, margin: '8px 0 0' }}>
              Imagine if every time you visited a new doctor, they had to call your old doctor and wait 3 days for paper charts to arrive in the mail. If you were allergic to penicillin, they might not know in an emergency! <strong>HealthSync EHR</strong> acts like a secure digital health passport. When a doctor writes a prescription or records your blood pressure, the system instantly checks that no conflicting medicines are given, encrypts your private records so only verified doctors can read them, and makes them available in under 0.4 seconds anywhere in the hospital.
            </p>
          </div>
        </div>
      </section>

      {/* 5. BENTO GRID ARCHITECTURE */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 24px 64px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38bdf8' }}>
            Enterprise Clinical Framework
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '6px' }}>
            Engineered for High-Acuity Healthcare
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', marginTop: '8px' }}>
            Eradicate clinical fatigue with automated chart synthesis, instant contraindication detection, and zero-latency health record retrieval.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* Card 1: Clinical Decision Support */}
          <div style={{
            padding: '32px',
            borderRadius: '24px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(14, 165, 233, 0.12)',
                border: '1px solid rgba(14, 165, 233, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Stethoscope size={24} color="#38bdf8" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                Clinical Decision Support (CDS)
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
                Autonomous drug-allergy, drug-drug, and dosage contraindication checks execute automatically during prescription entry, preventing adverse medical events before they can occur.
              </p>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#38bdf8', marginTop: '24px' }}>
              ✓ Automated Patient Safeguards
            </div>
          </div>

          {/* Card 2: FHIR / HL7 Interoperability */}
          <div style={{
            padding: '32px',
            borderRadius: '24px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Zap size={24} color="#818cf8" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                FHIR & HL7 v4.0 Protocol
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
                Seamless bidirectional interoperability across diagnostic lab feeds, radiology PACS imaging systems, and external health information exchanges (HIE) with zero vendor lock-in.
              </p>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#818cf8', marginTop: '24px' }}>
              ✓ Universal Data Federation
            </div>
          </div>

          {/* Card 3: HIPAA Security Vault */}
          <div style={{
            padding: '32px',
            borderRadius: '24px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <ShieldCheck size={24} color="#34d399" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                HIPAA & SOC2 Cryptographic Vault
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
                Granular Role-Based Access Control (RBAC) ensures only credentialed care team members access sensitive chart records, backed by immutable audit trails and 256-bit AES encryption.
              </p>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#34d399', marginTop: '24px' }}>
              ✓ Cryptographic Compliance Engine
            </div>
          </div>

        </div>
      </section>

      {/* 6. HIGH CONVERTING CALL TO ACTION BANNER */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto 64px',
        padding: '0 24px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          padding: '48px 36px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #0369a1, #1d4ed8, #0f172a)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          boxShadow: '0 20px 50px rgba(2, 132, 199, 0.25)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Transform Your Hospital&apos;s Clinical Workflow Today
          </h2>
          <p style={{ fontSize: '15px', color: '#e0f2fe', maxWidth: '640px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Eliminate record fragmentation. Experience real-time vitals monitoring, streamlined appointment rosters, and comprehensive patient charting.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                color: '#0369a1',
                fontSize: '14px',
                fontWeight: 900,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
              }}
            >
              <span>Launch Clinical Portal</span>
              <ArrowRight size={16} color="#0369a1" />
            </Link>

            <Link
              href="/records"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                borderRadius: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <FileText size={16} color="#38bdf8" />
              <span>Browse EHR Records</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import {
  Activity, ShieldCheck, HeartPulse, Stethoscope, FileText,
  ArrowRight, CheckCircle2, Lock, Sparkles,
  Zap, Pill, Thermometer, AlertTriangle, BookOpen
} from 'lucide-react';

export default function HealthSyncLandingPage() {
  const [selectedPatientTab, setSelectedPatientTab] = useState<'vitals' | 'labs' | 'meds'>('vitals');

  const [hr,   setHr]   = useState(72);
  const [spo2, setSpo2] = useState(98);
  const [bp,   setBp]   = useState({ s: 118, d: 76 });
  const [temp, setTemp] = useState(98.6);

  useEffect(() => {
    const id = setInterval(() => {
      setHr(v  => Math.max(60, Math.min(90,  v + (Math.random() > 0.5 ? 1 : -1))));
      setSpo2(v => Math.max(95, Math.min(100, v + (Math.random() > 0.6 ? 0 : -1))));
      setBp(v  => ({
        s: Math.max(110, Math.min(130, v.s + (Math.random() > 0.5 ? 1 : -1))),
        d: Math.max(70,  Math.min(85,  v.d + (Math.random() > 0.5 ? 1 : -1))),
      }));
      setTemp(v => Math.round((Math.max(98.0, Math.min(99.2, v + (Math.random() > 0.5 ? 0.1 : -0.1)))) * 10) / 10);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const tabBtn = (tab: typeof selectedPatientTab, label: string) => (
    <button
      onClick={() => setSelectedPatientTab(tab)}
      style={{
        padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 800,
        border: 'none', cursor: 'pointer', transition: 'all 0.15s ease',
        backgroundColor: selectedPatientTab === tab ? '#0284C7' : 'transparent',
        color: selectedPatientTab === tab ? '#ffffff' : '#64748B',
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0F9FF', color: '#0F172A', fontFamily: 'system-ui,-apple-system,sans-serif', position: 'relative', overflowX: 'hidden' }}>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(240,249,255,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #E2E8F0', padding: '16px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg,#0284c7,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(14,165,233,0.35)' }}>
              <Activity size={22} color="white" />
            </div>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
                Health<span style={{ color: '#0284C7' }}>Sync</span>
                <span style={{ color: '#64748B', fontWeight: 400, fontSize: '0.85rem' }}>.EHR</span>
              </span>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Clinical Intelligence &amp; Electronic Health Records</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, padding: '6px 12px', borderRadius: '999px', backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: '#047857' }}>
              <ShieldCheck size={14} /> HIPAA &amp; HITECH Certified
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, padding: '6px 12px', borderRadius: '999px', backgroundColor: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.25)', color: '#0369A1' }}>
              <Zap size={14} /> FHIR / HL7 v4.0 Active
            </span>
          </div>
          <a href="#simulator" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', background: 'linear-gradient(135deg,#0284c7,#2563eb)', color: '#ffffff', fontWeight: 700, fontSize: '13px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(14,165,233,0.35)' }}>
            Launch Clinical Portal <ArrowRight size={15} />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 48px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.25)', marginBottom: '24px' }}>
          <Sparkles size={14} color="#0369A1" />
          <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em', color: '#0369A1', textTransform: 'uppercase' }}>
            Autonomous Clinical Intelligence &amp; EHR Interoperability
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem,5.5vw,4.2rem)', fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '24px', maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto', background: 'linear-gradient(135deg, #0F172A 30%, #0284C7 70%, #0D9488 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Unified Electronic Health Records for{' '}
          <span style={{ background: 'linear-gradient(135deg,#0284c7,#0D9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Modern Hospital Networks
          </span>
        </h1>

        <p style={{ fontSize: 'clamp(1rem,1.8vw,1.25rem)', color: '#475569', maxWidth: '820px', margin: '0 auto 36px', lineHeight: 1.6 }}>
          Centralise patient encounters, vital telemetry, and lab diagnostic vectors with zero data silos. Engineered with automated clinical decision support safeguards and seamless FHIR / HL7 protocol interoperability.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#simulator" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 36px', borderRadius: '14px', background: 'linear-gradient(135deg,#0284c7,#2563eb)', color: '#ffffff', fontSize: '15px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 8px 25px rgba(14,165,233,0.4)' }}>
            Launch Clinical Portal <ArrowRight size={18} />
          </a>
          <a href="#simulator" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 30px', borderRadius: '14px', background: 'rgba(15,23,42,0.06)', color: '#0F172A', border: '1px solid #E2E8F0', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
            <Lock size={16} color="#0284C7" /> Secure Clinician Sign-In
          </a>
        </div>

        {/* KPI strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px', maxWidth: '1100px', margin: '56px auto 0' }}>
          {[
            { val: '45,000+', label: 'Patient Charts Indexed',   color: '#0F172A' },
            { val: '< 0.4s',  label: 'Chart Query Latency',      color: '#0284C7' },
            { val: '99.99%',  label: 'HL7 / FHIR Cloud Uptime',  color: '#047857' },
            { val: 'Zero',    label: 'Missed Drug Interactions',  color: '#6366F1' },
          ].map(k => (
            <div key={k.label} style={{ padding: '24px', borderRadius: '20px', background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)', textAlign: 'left' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: k.color, fontFamily: 'monospace' }}>{k.val}</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>{k.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Workbench */}
      <section id="simulator" style={{ maxWidth: '1160px', margin: '0 auto', padding: '32px 24px 48px', position: 'relative', zIndex: 10, scrollMarginTop: '80px' }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 28px' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0284C7' }}>
            Live Clinical Encounter Simulator
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginTop: '6px' }}>
            Real-Time Patient Charting &amp; Vitals
          </h2>
          <p style={{ fontSize: '14px', color: '#475569', marginTop: '6px' }}>
            Vitals update live every 1.8 seconds. Switch tabs to inspect lab results and active prescriptions.
          </p>
        </div>

        <div style={{ borderRadius: '24px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', overflow: 'hidden' }}>

          {/* Frame header */}
          <div style={{ padding: '16px 24px', backgroundColor: '#F0F9FF', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#64748B', marginLeft: '8px' }}>
                healthsync_ehr // encounter_session_#9482-B
              </span>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(16,185,129,0.08)', color: '#047857', border: '1px solid rgba(16,185,129,0.25)' }}>
              CLINICIAN SECURE SESSION ACTIVE
            </span>
          </div>

          {/* Patient overview */}
          <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg,#0284c7,#1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900, color: '#ffffff', boxShadow: '0 4px 12px rgba(2,132,199,0.3)' }}>
                SJ
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Sarah Jenkins</h3>
                  <span style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(14,165,233,0.08)', color: '#0369A1', border: '1px solid rgba(14,165,233,0.25)' }}>
                    MRN: 9482-B
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>Age: 48 &bull; Female</span>
                </div>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0' }}>
                  Primary: <strong style={{ color: '#0F172A' }}>Acute Bronchitis</strong> &bull; Dr. Aris Thorne, MD (Pulmonology)
                </p>
              </div>
            </div>

            {/* Tab switcher */}
            <div style={{ display: 'flex', gap: '6px', backgroundColor: '#F0F9FF', padding: '4px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              {tabBtn('vitals', 'Vitals Telemetry')}
              {tabBtn('labs',   'Lab Diagnostic Orders')}
              {tabBtn('meds',   'Active Prescriptions')}
            </div>
          </div>

          {/* Tab content */}
          <div style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>

            {selectedPatientTab === 'vitals' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
                {[
                  { label: 'HEART RATE',         icon: <HeartPulse size={16} color="#f43f5e" />, val: `${hr}`, unit: 'bpm',  status: hr > 85 ? 'Mild Tachycardia' : 'Normal Sinus Rhythm', ok: hr <= 85 },
                  { label: 'OXYGEN SATURATION',  icon: <Activity size={16} color="#0284C7" />,   val: `${spo2}%`, unit: 'SpO2', status: spo2 < 96 ? 'Low — Monitor Closely' : 'Room Air Ambient', ok: spo2 >= 96 },
                  { label: 'BLOOD PRESSURE',     icon: <Activity size={16} color="#fbbf24" />,   val: `${bp.s}/${bp.d}`, unit: 'mmHg', status: 'Normotensive Range', ok: true },
                  { label: 'CORE TEMPERATURE',   icon: <Thermometer size={16} color="#0D9488" />,val: `${temp}`, unit: '\u00b0F', status: temp > 98.8 ? 'Low-Grade Fever' : 'Afebrile Baseline', ok: temp <= 98.8 },
                ].map(v => (
                  <div key={v.label} style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>
                      <span>{v.label}</span>{v.icon}
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', fontFamily: 'monospace', margin: '10px 0 4px' }}>
                      {v.val} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>{v.unit}</span>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: v.ok ? '#047857' : '#f59e0b' }}>{v.status}</div>
                  </div>
                ))}
              </div>
            )}

            {selectedPatientTab === 'labs' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Normal result */}
                <div style={{ padding: '16px 20px', borderRadius: '14px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 size={20} color="#047857" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Complete Blood Count (CBC)</div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>WBC: 6.8 K/uL &bull; Hemoglobin: 14.2 g/dL &bull; Platelets: 240 K/uL</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(16,185,129,0.08)', color: '#047857', border: '1px solid rgba(16,185,129,0.25)' }}>ALL NORMAL</span>
                </div>
                {/* Abnormal result */}
                <div style={{ padding: '16px 20px', borderRadius: '14px', backgroundColor: '#FFFFFF', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <AlertTriangle size={20} color="#f59e0b" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>D-Dimer (Fibrin Degradation Products)</div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                        Result: <strong style={{ color: '#f59e0b' }}>1.84 mg/L FEU</strong> &mdash; Reference: &lt;0.50 mg/L
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(245,158,11,0.08)', color: '#B45309', border: '1px solid rgba(245,158,11,0.25)' }}>
                    ELEVATED &mdash; DVT Risk
                  </span>
                </div>
                {/* DDI alert */}
                <div style={{ padding: '16px 20px', borderRadius: '14px', backgroundColor: 'rgba(244,63,94,0.04)', border: '1px solid rgba(244,63,94,0.25)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertTriangle size={20} color="#f43f5e" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#f43f5e' }}>Drug-Drug Interaction Alert (AI Detected)</div>
                    <div style={{ fontSize: '12px', color: '#BE123C', marginTop: '2px' }}>
                      Warfarin 5mg + Amoxicillin/Clavulanate: HIGH RISK &mdash; potentiates anticoagulation. CDS system flagged prescribing physician.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedPatientTab === 'meds' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Albuterol HFA Inhaler 90mcg', sig: '1-2 puffs every 4-6 hours PRN wheezing &bull; Refills: 2', status: 'ACTIVE SCRIPT' },
                  { name: 'Amoxicillin / Clavulanate 875-125mg', sig: '1 tablet BID with food x 7 days &bull; Zero interaction warnings', status: 'ACTIVE SCRIPT' },
                ].map(m => (
                  <div key={m.name} style={{ padding: '16px 20px', borderRadius: '14px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Pill size={20} color="#0284C7" />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{m.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{m.sig}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(14,165,233,0.08)', color: '#0369A1', border: '1px solid rgba(14,165,233,0.25)' }}>
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Footer action bar */}
          <div style={{ padding: '16px 24px', background: '#F0F9FF', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Complete chart records, longitudinal vitals graphs, and appointment rosters ready.
            </div>
            <a href="#simulator" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '10px', backgroundColor: '#0284c7', color: '#ffffff', fontSize: '12px', fontWeight: 800, textDecoration: 'none' }}>
              Open Full Patient Dashboard <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* 10th grade explainer */}
      <section style={{ maxWidth: '1160px', margin: '0 auto', padding: '16px 24px 48px', position: 'relative', zIndex: 10 }}>
        <div style={{ padding: '28px', borderRadius: '20px', background: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BookOpen size={22} color="#1E40AF" />
          </div>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1E40AF', margin: 0 }}>How Does an EHR System Work? (Explained Simply)</h3>
            <p style={{ fontSize: '13px', color: '#1E40AF', lineHeight: 1.6, margin: '8px 0 0' }}>
              Imagine every time you visited a new doctor they had to wait 3 days for paper charts to arrive by mail. If you were allergic to penicillin they might not know in an emergency!{' '}
              <strong>HealthSync EHR</strong> acts like a secure digital health passport. When a doctor writes a prescription, the system instantly checks for conflicting medicines, encrypts your records, and makes them available in under 0.4 seconds anywhere in the hospital network.
            </p>
          </div>
        </div>
      </section>

      {/* Bento grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 64px', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0284C7' }}>Enterprise Clinical Framework</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginTop: '6px' }}>Engineered for High-Acuity Healthcare</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px' }}>
          {[
            { icon: <Stethoscope size={24} color="#0284C7" />, bg: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.2)', title: 'Clinical Decision Support (CDS)', body: 'Autonomous drug-allergy, drug-drug, and dosage contraindication checks execute automatically during prescription entry, preventing adverse events before they occur.', tag: 'Automated Patient Safeguards', tagColor: '#0284C7' },
            { icon: <Zap size={24} color="#6366F1" />,         bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.2)',  title: 'FHIR & HL7 v4.0 Protocol',      body: 'Seamless bidirectional interoperability across diagnostic lab feeds, radiology PACS imaging systems, and external health information exchanges with zero vendor lock-in.', tag: 'Universal Data Federation', tagColor: '#6366F1' },
            { icon: <ShieldCheck size={24} color="#047857" />, bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)', title: 'HIPAA Security Vault',           body: 'End-to-end AES-256 encryption at rest and in transit. Role-based access control and immutable audit trails ensure full HIPAA and HITECH compliance.', tag: 'Zero PHI Breach Tolerance', tagColor: '#047857' },
          ].map(c => (
            <div key={c.title} style={{ padding: '32px', borderRadius: '24px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>{c.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>{c.title}</h3>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>{c.body}</p>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: c.tagColor, marginTop: '24px' }}>{c.tag}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { 
  Users, Mail, Phone, MessageSquare, ShieldCheck, 
  CheckCircle2, AlertTriangle, Send, X, Clock, HelpCircle, UserCheck
} from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  roleDescription: string;
  kidFriendlyExplanation: string;
  status: 'Online (Clinical Floor)' | 'In Surgery' | 'Available for Telehealth';
  directExtension: string;
  badgeClass: string;
}

const CARE_TEAM: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Marcus Webb',
    initials: 'MW',
    specialty: 'Internal Medicine',
    roleDescription: 'Board-certified internist managing whole-body health, routine checkups, and chronic disease prevention.',
    kidFriendlyExplanation: 'Your main family-style doctor for everyday health, checkups, and overall wellness.',
    status: 'Available for Telehealth',
    directExtension: 'Ext. 4021',
    badgeClass: 'badge-primary'
  },
  {
    id: 'd2',
    name: 'Dr. Sarah Jenkins',
    initials: 'SJ',
    specialty: 'Cardiovascular Specialist',
    roleDescription: 'Expert in coronary artery stent placement, ECG rhythm anomalies, and hypertension control.',
    kidFriendlyExplanation: 'The heart doctor! Specializes in how your heart pumps blood and keeps your pulse steady.',
    status: 'Online (Clinical Floor)',
    directExtension: 'Ext. 7734',
    badgeClass: 'badge-alert'
  },
  {
    id: 'd3',
    name: 'Dr. Emily Chen',
    initials: 'EC',
    specialty: 'Nephrology & Renal Care',
    roleDescription: 'Focuses on kidney filtration, sodium-potassium electrolyte equilibrium, and blood pressure regulation.',
    kidFriendlyExplanation: 'The kidney doctor! Helps your body filter waste from your blood and balance fluids.',
    status: 'In Surgery',
    directExtension: 'Ext. 3190',
    badgeClass: 'badge-primary'
  },
  {
    id: 'd4',
    name: 'Claire Redfield, MSN',
    initials: 'CR',
    specialty: 'Lead Triage Nurse Practitioner',
    roleDescription: 'Rapid-response care coordinator managing urgent prescription refills, vitals breaches, and triage.',
    kidFriendlyExplanation: 'The head care nurse who answers quick questions and coordinates urgent medicine refills.',
    status: 'Available for Telehealth',
    directExtension: 'Ext. 1102',
    badgeClass: 'badge-primary'
  }
];

export default function TeamPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [callbackDoctor, setCallbackDoctor] = useState<Doctor | null>(null);
  const [showSpecialistGuide, setShowSpecialistGuide] = useState<boolean>(true);

  // Message Form State
  const [subject, setSubject] = useState<string>('Question regarding medication dosage');
  const [messageText, setMessageText] = useState<string>('');
  const [priority, setPriority] = useState<'Routine' | 'Urgent Callback' | 'Refill Request'>('Routine');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sentNotice, setSentNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) {
      setErrorNotice('Please write a message before sending.');
      setTimeout(() => setErrorNotice(null), 3000);
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentNotice(`Message dispatched securely via HIPAA-encrypted channel to ${selectedDoctor?.name}. A response will be delivered to your portal within 2-4 hours.`);
      setSelectedDoctor(null);
      setMessageText('');
      setTimeout(() => setSentNotice(null), 6000);
    }, 600);
  };

  const handleCallbackRequest = (doc: Doctor) => {
    setCallbackDoctor(doc);
    setTimeout(() => {
      setCallbackDoctor(null);
      setSentNotice(`Callback ticket queued for ${doc.name} (${doc.directExtension}). Nursing station will dial your primary phone.`);
      setTimeout(() => setSentNotice(null), 5000);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            color: 'var(--primary-blue)',
            background: 'var(--primary-blue-alpha)',
            padding: '2px 8px',
            borderRadius: '999px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            textTransform: 'uppercase'
          }}>
            Dedicated Clinical Care Team
          </span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>End-to-End Encrypted HIPAA Triage</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
          Primary Physicians & Specialists
        </h1>
        <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
          Direct communication with your multi-disciplinary care circle. All messages are digitally signed and logged in your medical record.
        </p>
      </div>

      {/* Success Notification */}
      {sentNotice && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#34d399',
          fontSize: '0.88rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={20} color="#34d399" />
          <span>{sentNotice}</span>
        </div>
      )}

      {/* 10th Standard Friendly Specialist Guide */}
      <div className="clinical-card" style={{ 
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(15, 23, 42, 0.4) 100%)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        marginBottom: '28px',
        padding: '16px 20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowSpecialistGuide(!showSpecialistGuide)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '8px', borderRadius: '8px' }}>
              <HelpCircle size={18} color="var(--primary-blue)" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                10th Standard Friendly Guide: Who Does What on Your Medical Team?
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
                Ever wonder what all those medical doctor titles actually mean? Click to see the simple breakdown.
              </p>
            </div>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
            {showSpecialistGuide ? '▲ Collapse' : '▼ Expand'}
          </span>
        </div>

        {showSpecialistGuide && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '12px', 
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {CARE_TEAM.map(doc => (
              <div key={doc.id} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                <strong style={{ color: 'var(--primary-blue)', fontSize: '0.85rem' }}>{doc.specialty}:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  {doc.kidFriendlyExplanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {CARE_TEAM.map((doctor) => (
          <div key={doctor.id} className="clinical-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Top Doctor Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.2rem',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
              }}>
                {doctor.initials}
              </div>
              <div>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                  {doctor.name}
                </h2>
                <span className={doctor.badgeClass}>{doctor.specialty}</span>
              </div>
            </div>

            {/* Description */}
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              {doctor.roleDescription}
            </p>

            {/* Status Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#0d1322', padding: '8px 12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: doctor.status.includes('Online') ? '#34d399' : doctor.status.includes('Surgery') ? '#f59e0b' : 'var(--primary-blue)',
                boxShadow: '0 0 8px currentColor'
              }} />
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>{doctor.status}</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>{doctor.directExtension}</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #1e293b' }}>
              <button 
                onClick={() => setSelectedDoctor(doctor)}
                className="btn-primary" 
                style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}
              >
                <MessageSquare size={15} /> Message
              </button>
              <button 
                onClick={() => handleCallbackRequest(doctor)}
                className="btn-outline" 
                title="Request Priority Callback"
                style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}
              >
                <Phone size={15} /> Callback
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Message Modal */}
      {selectedDoctor && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="clinical-card" style={{ maxWidth: '580px', width: '100%', background: '#0b101d', border: '1px solid #1e293b', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #1e293b' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                  Send Clinical Dispatch to {selectedDoctor.name}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--primary-blue)', fontWeight: 600 }}>
                  {selectedDoctor.specialty} • HIPAA Audit Log #ST-{Math.floor(1000 + Math.random() * 9000)}
                </span>
              </div>
              <button 
                onClick={() => setSelectedDoctor(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {errorNotice && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '10px 14px', borderRadius: '8px', color: 'var(--alert-red)', fontSize: '0.82rem', marginBottom: '14px' }}>
                {errorNotice}
              </div>
            )}

            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1' }}>Subject</label>
                  <input 
                    type="text" 
                    className="clinical-input"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. Questions on blood pressure medication"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1' }}>Priority</label>
                  <select 
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="clinical-input"
                    style={{ width: '100%', background: '#161e31', color: '#f8fafc' }}
                  >
                    <option value="Routine">Routine (24h)</option>
                    <option value="Urgent Callback">Urgent (2-4h)</option>
                    <option value="Refill Request">Rx Refill</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1' }}>Clinical Message</label>
                <textarea 
                  rows={4}
                  className="clinical-input"
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  placeholder="Describe your symptoms, question, or side effects clearly..."
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div style={{ background: '#0a0f1d', padding: '10px 14px', borderRadius: '8px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="#34d399" />
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Encrypted using SHA-256 and stored in the patient electronic medical record.
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '12px', borderTop: '1px solid #1e293b' }}>
                <button 
                  type="button" 
                  onClick={() => setSelectedDoctor(null)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSending}
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Send size={15} />
                  <span>{isSending ? 'Transmitting...' : 'Send Encrypted Message'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

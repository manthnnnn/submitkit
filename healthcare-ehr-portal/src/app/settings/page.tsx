'use client';

import { useState } from 'react';
import { 
  Settings, Shield, Bell, User, CheckCircle2, 
  Lock, Smartphone, AlertTriangle, Key, Save, RefreshCw
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'notifications'>('personal');
  
  // Personal Info State
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@healthsync.ehr',
    phone: '+1 (555) 019-8231',
    emergencyContact: 'Jane Doe (Spouse) - +1 (555) 019-9944',
    preferredLanguage: 'English (US)',
  });

  // Security Toggles
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true);
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(true);
  const [sessionTimeout, setSessionTimeout] = useState<string>('15');

  // Notification Toggles
  const [criticalVitalsAlerts, setCriticalVitalsAlerts] = useState<boolean>(true);
  const [labResultsReady, setLabResultsReady] = useState<boolean>(true);
  const [telehealthReminders, setTelehealthReminders] = useState<boolean>(true);

  // Status message
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setErrorMessage('First Name, Last Name, and Email Address are mandatory.');
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    setSaveStatus('Preferences and HIPAA security policies saved successfully!');
    setErrorMessage(null);
    setTimeout(() => setSaveStatus(null), 3500);
  };

  return (
    <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
      
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
            Account & Security
          </span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>HIPAA Privacy Rule 45 CFR § 164.312</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
          Portal Settings & Clinical Preferences
        </h1>
        <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
          Configure personal identification, biometric security safeguards, and multi-channel telemetry alerts.
        </p>
      </div>

      {/* Save / Error Feedback Alerts */}
      {saveStatus && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#34d399',
          fontSize: '0.88rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} color="#34d399" />
          <span>{saveStatus}</span>
        </div>
      )}

      {errorMessage && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--alert-red)',
          fontSize: '0.88rem',
          fontWeight: 600
        }}>
          <AlertTriangle size={18} color="var(--alert-red)" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '24px' }}>
        
        {/* Settings Navigation Tabs */}
        <div className="clinical-card" style={{ padding: '16px', height: 'fit-content' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={() => setActiveTab('personal')}
              className={activeTab === 'personal' ? 'btn-primary' : 'btn-outline'} 
              style={{ justifyContent: 'flex-start', border: activeTab === 'personal' ? 'none' : '1px solid #1e293b' }}
            >
              <User size={16} /> Personal Information
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={activeTab === 'security' ? 'btn-primary' : 'btn-outline'} 
              style={{ justifyContent: 'flex-start', border: activeTab === 'security' ? 'none' : '1px solid #1e293b' }}
            >
              <Shield size={16} /> Security & HIPAA 2FA
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={activeTab === 'notifications' ? 'btn-primary' : 'btn-outline'} 
              style={{ justifyContent: 'flex-start', border: activeTab === 'notifications' ? 'none' : '1px solid #1e293b' }}
            >
              <Bell size={16} /> Telemetry Alerts
            </button>
          </div>

          {/* Simple Explanation Note */}
          <div style={{ marginTop: '20px', padding: '12px', background: '#0a0f1d', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-blue)', display: 'block', marginBottom: '4px' }}>
              🔒 What is HIPAA?
            </span>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
              HIPAA is a national law protecting your health privacy. HealthSync keeps all your records encrypted so only authorized medical staff can see them.
            </p>
          </div>
        </div>

        {/* Tab 1: Personal Info */}
        {activeTab === 'personal' && (
          <div className="clinical-card">
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid #1e293b', paddingBottom: '14px', margin: '0 0 20px 0', color: '#ffffff' }}>
              Personal & Clinical Profile
            </h2>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>First Name</label>
                  <input 
                    type="text" 
                    className="clinical-input" 
                    value={formData.firstName} 
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Last Name</label>
                  <input 
                    type="text" 
                    className="clinical-input" 
                    value={formData.lastName} 
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Email Address</label>
                <input 
                  type="email" 
                  className="clinical-input" 
                  value={formData.email} 
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Mobile Phone (SMS Dispatch)</label>
                <input 
                  type="tel" 
                  className="clinical-input" 
                  value={formData.phone} 
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Emergency Contact & Relation</label>
                <input 
                  type="text" 
                  className="clinical-input" 
                  value={formData.emergencyContact} 
                  onChange={e => setFormData({ ...formData, emergencyContact: e.target.value })}
                />
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={16} />
                  <span>Save Personal Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Security & HIPAA */}
        {activeTab === 'security' && (
          <div className="clinical-card">
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid #1e293b', paddingBottom: '14px', margin: '0 0 20px 0', color: '#ffffff' }}>
              Security & HIPAA Compliance Shield
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* 2FA Toggle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#0d1322', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Key size={18} color="var(--primary-blue)" />
                    <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>Two-Factor Authentication (2FA)</strong>
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                    Require a secure 6-digit SMS or Authenticator app code upon signing in.
                  </p>
                </div>
                <button 
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  style={{
                    background: twoFactorEnabled ? 'var(--success-green)' : '#334155',
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              {/* Biometrics */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#0d1322', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Smartphone size={18} color="#38bdf8" />
                    <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>Biometric Quick-Unlock (Touch ID / Face ID)</strong>
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                    Instant clinical station unlock with hardware-backed encryption keys.
                  </p>
                </div>
                <button 
                  onClick={() => setBiometricEnabled(!biometricEnabled)}
                  style={{
                    background: biometricEnabled ? 'var(--success-green)' : '#334155',
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {biometricEnabled ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              {/* Session Inactivity Timeout */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>
                  HIPAA Automatic Lockout Timer
                </label>
                <select 
                  value={sessionTimeout} 
                  onChange={e => setSessionTimeout(e.target.value)}
                  className="clinical-input"
                  style={{ width: '100%', background: '#161e31', color: '#f8fafc', border: '1px solid #334155' }}
                >
                  <option value="5">5 Minutes of Inactivity</option>
                  <option value="15">15 Minutes of Inactivity (Recommended)</option>
                  <option value="30">30 Minutes of Inactivity</option>
                </select>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: '4px' }}>
                  Mandated by hospital electronic security protocols to prevent unauthorized terminal access.
                </span>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={16} />
                  <span>Update Security Shield</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Telemetry Alerts */}
        {activeTab === 'notifications' && (
          <div className="clinical-card">
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid #1e293b', paddingBottom: '14px', margin: '0 0 20px 0', color: '#ffffff' }}>
              Multi-Channel Alert Dispatch
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: '#0d1322', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>Critical Vitals Breach SMS</strong>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
                    Trigger immediate text alert if resting heart rate exceeds 110 BPM or BP spikes above 140/90.
                  </p>
                </div>
                <input 
                  type="checkbox" 
                  checked={criticalVitalsAlerts} 
                  onChange={e => setCriticalVitalsAlerts(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-blue)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: '#0d1322', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>Pathology & Lab Diagnostics Notification</strong>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
                    Receive notification as soon as hospital pathology publishes verified blood & lipid panels.
                  </p>
                </div>
                <input 
                  type="checkbox" 
                  checked={labResultsReady} 
                  onChange={e => setLabResultsReady(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-blue)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: '#0d1322', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>Telehealth Consultation Reminder (1 Hour Prior)</strong>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
                    Automated calendar invite and SMS link for WebRTC encrypted video visits.
                  </p>
                </div>
                <input 
                  type="checkbox" 
                  checked={telehealthReminders} 
                  onChange={e => setTelehealthReminders(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-blue)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={16} />
                  <span>Save Notification Preferences</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { 
  HeartPulse, Activity, Droplets, Wind, Plus, ShieldCheck, 
  AlertTriangle, CheckCircle2, Clock, Info, ArrowUpRight, 
  TrendingUp, RefreshCw, Smartphone, Zap, SlidersHorizontal, X
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid, LineChart, Line 
} from 'recharts';

interface VitalRecord {
  id: string;
  time: string;
  heartRate: number;
  systolic: number;
  diastolic: number;
  oxygen: number;
  glucose: number;
  notes: string;
  device: string;
}

const INITIAL_RECORDS: VitalRecord[] = [
  { id: 'V-101', time: '08:00 AM', heartRate: 72, systolic: 118, diastolic: 76, oxygen: 99, glucose: 94, notes: 'Resting morning reading', device: 'Omron Connect Cuff' },
  { id: 'V-102', time: '10:30 AM', heartRate: 78, systolic: 121, diastolic: 78, oxygen: 98, glucose: 108, notes: 'Post breakfast walking', device: 'Apple Watch Series 9' },
  { id: 'V-103', time: '01:15 PM', heartRate: 84, systolic: 124, diastolic: 80, oxygen: 98, glucose: 115, notes: 'After lunch meeting', device: 'Apple Watch Series 9' },
  { id: 'V-104', time: '04:00 PM', heartRate: 76, systolic: 119, diastolic: 75, oxygen: 99, glucose: 98, notes: 'Mid-afternoon check', device: 'Omron Connect Cuff' },
  { id: 'V-105', time: '07:30 PM', heartRate: 70, systolic: 116, diastolic: 74, oxygen: 99, glucose: 102, notes: 'Evening relaxation reading', device: 'Dexcom Continuous Sensor' },
];

export default function VitalsPage() {
  const [records, setRecords] = useState<VitalRecord[]>(INITIAL_RECORDS);
  const [currentVitals, setCurrentVitals] = useState({
    heartRate: 72,
    systolic: 118,
    diastolic: 76,
    oxygen: 99,
    glucose: 96,
  });

  // Animated ECG Line Pulse
  const [ecgSpeed, setEcgSpeed] = useState<number>(72);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for Log Vital Modal
  const [newHr, setNewHr] = useState<number>(75);
  const [newSys, setNewSys] = useState<number>(120);
  const [newDia, setNewDia] = useState<number>(80);
  const [newO2, setNewO2] = useState<number>(98);
  const [newGlucose, setNewGlucose] = useState<number>(100);
  const [newNotes, setNewNotes] = useState<string>('Routine checkup');

  // Trigger brief user feedback toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Plain English blood pressure interpretation
  const getBpCategory = (sys: number, dia: number) => {
    if (sys < 120 && dia < 80) return { label: 'Normal (Healthy)', color: '#34d399', badge: 'badge-success', desc: 'Your arteries are relaxed and heart is pumping smoothly.' };
    if (sys <= 129 && dia < 80) return { label: 'Elevated (Pre-Caution)', color: '#fbbf24', badge: 'badge-warning', desc: 'Slightly higher than ideal. Drink water and watch sodium intake.' };
    if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return { label: 'Stage 1 High BP', color: '#f97316', badge: 'badge-warning', desc: 'Mildly elevated pressure. Physician lifestyle consultation recommended.' };
    return { label: 'Stage 2 High BP', color: '#fb7185', badge: 'badge-alert', desc: 'Higher than normal. Consult your doctor or nurse practitioner.' };
  };

  const bpStatus = getBpCategory(currentVitals.systolic, currentVitals.diastolic);

  // Handle new vital entry
  const handleSaveVital = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newEntry: VitalRecord = {
      id: `V-${Date.now().toString().slice(-4)}`,
      time: timeStr,
      heartRate: Number(newHr),
      systolic: Number(newSys),
      diastolic: Number(newDia),
      oxygen: Number(newO2),
      glucose: Number(newGlucose),
      notes: newNotes || 'Patient manual entry',
      device: 'Manual Clinician Input',
    };

    setRecords(prev => [...prev, newEntry]);
    setCurrentVitals({
      heartRate: Number(newHr),
      systolic: Number(newSys),
      diastolic: Number(newDia),
      oxygen: Number(newO2),
      glucose: Number(newGlucose),
    });
    setEcgSpeed(Number(newHr));
    setIsModalOpen(false);
    showToast('New vital sign reading successfully recorded to electronic medical record!');
  };

  // Chart data formatting
  const chartData = records.map(r => ({
    time: r.time,
    hr: r.heartRate,
    bpSys: r.systolic,
    bpDia: r.diastolic,
    o2: r.oxygen,
    glucose: r.glucose,
  }));

  return (
    <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'rgba(16, 185, 129, 0.95)',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          fontWeight: 600,
          fontSize: '0.9rem',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Live Vitals Telemetry
            </h1>
            <span className="badge-success">
              <Zap size={13} /> Active Stream
            </span>
          </div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem', maxWidth: '650px', lineHeight: 1.5 }}>
            Continuous tracking of your heart rate, blood pressure, oxygen saturation, and glucose. 
            All numbers are explained in simple plain English below.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} /> Record New Reading
          </button>
        </div>
      </div>

      {/* 4 Core Vitals Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        
        {/* Heart Rate */}
        <div className="clinical-card" style={{ borderLeft: '4px solid #f43f5e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Heart Rate
            </span>
            <div style={{ background: 'rgba(244, 63, 94, 0.15)', padding: '8px', borderRadius: '10px' }}>
              <HeartPulse size={20} color="#f43f5e" className="ecg-indicator" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>{currentVitals.heartRate}</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#94a3b8' }}>BPM</span>
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            Normal is 60-100 beats per minute. Your heart is pumping at a healthy, steady rhythm.
          </p>
          <span className="badge-success">Optimal Resting Pulse</span>
        </div>

        {/* Blood Pressure */}
        <div className="clinical-card" style={{ borderLeft: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Blood Pressure
            </span>
            <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '8px', borderRadius: '10px' }}>
              <Activity size={20} color="#3b82f6" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>
              {currentVitals.systolic}/{currentVitals.diastolic}
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#94a3b8' }}>mmHg</span>
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            {bpStatus.desc}
          </p>
          <span className={bpStatus.badge}>{bpStatus.label}</span>
        </div>

        {/* Oxygen Saturation */}
        <div className="clinical-card" style={{ borderLeft: '4px solid #06b6d4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Blood Oxygen (SpO2)
            </span>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '8px', borderRadius: '10px' }}>
              <Wind size={20} color="#06b6d4" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>{currentVitals.oxygen}</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#94a3b8' }}>%</span>
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            Percentage of oxygen in red blood cells. 95% to 100% indicates excellent lung capacity.
          </p>
          <span className="badge-success">Fully Oxygenated</span>
        </div>

        {/* Blood Glucose */}
        <div className="clinical-card" style={{ borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Blood Glucose (Sugar)
            </span>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '8px', borderRadius: '10px' }}>
              <Droplets size={20} color="#10b981" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>{currentVitals.glucose}</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#94a3b8' }}>mg/dL</span>
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            Target fasting level is 70-100 mg/dL. Glucose supplies continuous cellular energy.
          </p>
          <span className="badge-success">In Normal Fasting Range</span>
        </div>

      </div>

      {/* Main Interactive Waveform & Trend Graph Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '28px' }}>
        
        {/* Vitals Trend Graph */}
        <div className="clinical-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff' }}>
                24-Hour Cardiovascular Trend
              </h2>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Comparing Heart Rate (BPM) against Systolic Blood Pressure (mmHg)
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '6px', background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', fontWeight: 600 }}>
                ● Heart Rate
              </span>
              <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontWeight: 600 }}>
                ● Systolic BP
              </span>
            </div>
          </div>

          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="bpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[50, 140]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="hr" name="Heart Rate (BPM)" stroke="#f43f5e" strokeWidth={3} fill="url(#hrGrad)" />
                <Area type="monotone" dataKey="bpSys" name="Systolic BP (mmHg)" stroke="#3b82f6" strokeWidth={3} fill="url(#bpGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live ECG Simulator & Educational Card */}
        <div className="clinical-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartPulse size={18} color="#f43f5e" /> Live ECG Rhythm
            </h2>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Real-time electrical cardiac pulse representation
            </span>
          </div>

          {/* SVG Animated Heartbeat Graph */}
          <div style={{
            height: '130px',
            background: '#070b14',
            borderRadius: '12px',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <svg viewBox="0 0 500 120" style={{ width: '100%', height: '100%' }}>
              <path
                d="M0,60 L120,60 L135,20 L150,100 L165,10 L180,85 L195,60 L320,60 L335,20 L350,100 L365,10 L380,85 L395,60 L500,60"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '12px',
              fontSize: '0.72rem',
              fontWeight: 700,
              background: 'rgba(244, 63, 94, 0.2)',
              color: '#fb7185',
              padding: '2px 8px',
              borderRadius: '99px'
            }}>
              Sinus Rhythm Normal
            </div>
          </div>

          {/* 10th Grade Friendly Explanation Box */}
          <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '10px', padding: '14px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Info size={15} /> How to understand your numbers:
            </h3>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              <li><strong>Systolic (Top number):</strong> Heart squeezing blood out.</li>
              <li><strong>Diastolic (Bottom number):</strong> Heart resting between beats.</li>
              <li><strong>SpO2 (Oxygen):</strong> Above 95% means healthy lungs.</li>
            </ul>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <button 
              className="btn-outline" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => showToast('Syncing latest readings from connected Omron cuff and Apple Watch... All data synchronized!')}
            >
              <RefreshCw size={15} /> Sync Connected Devices
            </button>
          </div>
        </div>

      </div>

      {/* Historical Readings Log Table */}
      <div className="clinical-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff' }}>
              Telemetry Historical Log
            </h2>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Timestamped logs captured automatically or manually recorded by patient
            </span>
          </div>
          <span className="badge-primary">
            {records.length} Recorded Entries
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="clinical-table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Time</th>
                <th>Heart Rate</th>
                <th>Blood Pressure</th>
                <th>Oxygen</th>
                <th>Glucose</th>
                <th>Clinical Interpretation</th>
                <th>Device Source</th>
              </tr>
            </thead>
            <tbody>
              {records.slice().reverse().map((rec) => {
                const interp = getBpCategory(rec.systolic, rec.diastolic);
                return (
                  <tr key={rec.id}>
                    <td style={{ fontWeight: 600, color: '#60a5fa' }}>{rec.id}</td>
                    <td style={{ color: '#e2e8f0', fontWeight: 500 }}>{rec.time}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#ffffff' }}>{rec.heartRate}</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '4px' }}>BPM</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#ffffff' }}>{rec.systolic}/{rec.diastolic}</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '4px' }}>mmHg</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#ffffff' }}>{rec.oxygen}%</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#ffffff' }}>{rec.glucose}</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '4px' }}>mg/dL</span>
                    </td>
                    <td>
                      <span className={interp.badge}>{interp.label}</span>
                    </td>
                    <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Smartphone size={14} color="#60a5fa" />
                        {rec.device}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record New Vital Sign Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '8px', borderRadius: '8px' }}>
                  <Plus size={18} color="#3b82f6" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>Record New Vital Signs</h3>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Fill in your current health readings</span>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveVital} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Heart Rate (BPM)
                  </label>
                  <input 
                    type="number" 
                    min={40} 
                    max={220} 
                    required 
                    className="clinical-input" 
                    value={newHr} 
                    onChange={e => setNewHr(Number(e.target.value))} 
                  />
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Normal: 60 - 100 BPM</span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Blood Oxygen (%)
                  </label>
                  <input 
                    type="number" 
                    min={70} 
                    max={100} 
                    required 
                    className="clinical-input" 
                    value={newO2} 
                    onChange={e => setNewO2(Number(e.target.value))} 
                  />
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Normal: 95 - 100%</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Systolic BP (Top)
                  </label>
                  <input 
                    type="number" 
                    min={70} 
                    max={240} 
                    required 
                    className="clinical-input" 
                    value={newSys} 
                    onChange={e => setNewSys(Number(e.target.value))} 
                  />
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Target: under 120 mmHg</span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Diastolic BP (Bottom)
                  </label>
                  <input 
                    type="number" 
                    min={40} 
                    max={140} 
                    required 
                    className="clinical-input" 
                    value={newDia} 
                    onChange={e => setNewDia(Number(e.target.value))} 
                  />
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Target: under 80 mmHg</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Blood Glucose Level (mg/dL)
                </label>
                <input 
                  type="number" 
                  min={40} 
                  max={400} 
                  required 
                  className="clinical-input" 
                  value={newGlucose} 
                  onChange={e => setNewGlucose(Number(e.target.value))} 
                />
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Fasting target: 70 - 100 mg/dL</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Context / Symptoms
                </label>
                <input 
                  type="text" 
                  className="clinical-input" 
                  placeholder="e.g. Post-workout, feeling great, slight headache" 
                  value={newNotes} 
                  onChange={e => setNewNotes(e.target.value)} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  className="btn-outline" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  <CheckCircle2 size={16} /> Save Reading
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

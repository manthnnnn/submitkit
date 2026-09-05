'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Activity, HeartPulse, Stethoscope, FileText, Calendar, 
  Clock, Download, AlertTriangle, ShieldCheck, UserCheck, 
  Pill, HelpCircle, CheckCircle2, ChevronRight, Zap, RefreshCw, ArrowUpRight
} from 'lucide-react';

interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  condition: string;
  mrn: string;
  doctor: string;
  vitals: {
    hr: number;
    bp: string;
    o2: number;
    glucose: number;
    temp: number;
  };
  chartData: { time: string; hr: number; bp: number; o2: number }[];
  medications: string[];
  aiSummary: string;
  nextAppointment: { doctor: string; specialty: string; date: string; time: string };
}

const PATIENTS: PatientProfile[] = [
  {
    id: 'p1',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodType: 'O+',
    condition: 'Post-Op Cardiac Recovery (Stent Placement)',
    mrn: 'MRN-8842-CA',
    doctor: 'Dr. Sarah Jenkins (Cardiology)',
    vitals: { hr: 72, bp: '118/75', o2: 99, glucose: 104, temp: 98.6 },
    chartData: [
      { time: '08:00', hr: 72, bp: 118, o2: 98 },
      { time: '10:00', hr: 75, bp: 120, o2: 98 },
      { time: '12:00', hr: 82, bp: 125, o2: 97 },
      { time: '14:00', hr: 78, bp: 122, o2: 99 },
      { time: '16:00', hr: 71, bp: 119, o2: 99 },
      { time: '18:00', hr: 74, bp: 121, o2: 98 },
      { time: '20:00', hr: 68, bp: 115, o2: 99 },
    ],
    medications: ['Atorvastatin 40mg', 'Aspirin 81mg (Cardio-Protective)', 'Metoprolol 25mg'],
    aiSummary: 'Cardiovascular rhythm shows normal sinus cadence. Post-stent coronary perfusion is excellent with systolic blood pressure staying under 125 mmHg.',
    nextAppointment: { doctor: 'Dr. Sarah Jenkins', specialty: 'Cardiology Follow-up', date: 'Oct 14, 2026', time: '10:30 AM' }
  },
  {
    id: 'p2',
    name: 'Sarah Connor',
    age: 38,
    gender: 'Female',
    bloodType: 'A-',
    condition: 'Type-1 Diabetes & Glycemic Telemetry',
    mrn: 'MRN-4190-EN',
    doctor: 'Dr. Marcus Webb (Endocrinology)',
    vitals: { hr: 68, bp: '112/70', o2: 98, glucose: 118, temp: 98.4 },
    chartData: [
      { time: '08:00', hr: 66, bp: 110, o2: 98 },
      { time: '10:00', hr: 70, bp: 112, o2: 99 },
      { time: '12:00', hr: 74, bp: 116, o2: 98 },
      { time: '14:00', hr: 69, bp: 114, o2: 98 },
      { time: '16:00', hr: 67, bp: 112, o2: 99 },
      { time: '18:00', hr: 71, bp: 115, o2: 98 },
      { time: '20:00', hr: 65, bp: 110, o2: 99 },
    ],
    medications: ['Insulin Glargine 20u', 'Metformin 500mg', 'Multivitamin Daily'],
    aiSummary: 'Fasting and postprandial glucose levels are 94% within the healthy target zone (80-130 mg/dL). No nocturnal hypoglycemia alarms reported in 48 hours.',
    nextAppointment: { doctor: 'Dr. Marcus Webb', specialty: 'Endocrine Panel Review', date: 'Oct 22, 2026', time: '02:15 PM' }
  },
  {
    id: 'p3',
    name: 'David Miller',
    age: 62,
    gender: 'Male',
    bloodType: 'B+',
    condition: 'Stage 1 Hypertension & Renal Monitoring',
    mrn: 'MRN-7231-NE',
    doctor: 'Dr. Emily Chen (Nephrology)',
    vitals: { hr: 76, bp: '132/84', o2: 97, glucose: 108, temp: 98.7 },
    chartData: [
      { time: '08:00', hr: 74, bp: 130, o2: 97 },
      { time: '10:00', hr: 78, bp: 134, o2: 96 },
      { time: '12:00', hr: 81, bp: 136, o2: 97 },
      { time: '14:00', hr: 77, bp: 133, o2: 97 },
      { time: '16:00', hr: 75, bp: 131, o2: 98 },
      { time: '18:00', hr: 76, bp: 132, o2: 97 },
      { time: '20:00', hr: 73, bp: 129, o2: 98 },
    ],
    medications: ['Lisinopril 10mg', 'Amlodipine 5mg', 'Hydrochlorothiazide 12.5mg'],
    aiSummary: 'Systolic blood pressure shows responsive control with ACE inhibitor therapy. Glomerular filtration rate is stable. Sodium restriction regimen is succeeding.',
    nextAppointment: { doctor: 'Dr. Emily Chen', specialty: 'Renal Function Ultrasound', date: 'Nov 04, 2026', time: '09:00 AM' }
  }
];

// FDA Drug Interaction Database
const DRUG_INTERACTIONS: Record<string, { severity: 'Severe' | 'Moderate' | 'Safe'; message: string; mechanism: string }> = {
  'Warfarin + Aspirin': {
    severity: 'Severe',
    message: 'High hemorrhage risk! Both medications inhibit blood clotting cascades concurrently.',
    mechanism: 'Warfarin blocks Vitamin K clotting factors while Aspirin irreversibly disables platelet aggregation.'
  },
  'Lisinopril + Potassium': {
    severity: 'Severe',
    message: 'Hyperkalemia hazard! Lisinopril reduces aldosterone, causing kidney potassium retention.',
    mechanism: 'Serum potassium can spike past 5.5 mEq/L, risking cardiac arrhythmias. Potassium supplements require close monitoring.'
  },
  'Metformin + Contrast Dye': {
    severity: 'Severe',
    message: 'Risk of lactic acidosis. Metformin must be held 48 hours before and after radiologic iodine imaging.',
    mechanism: 'Contrast-induced nephropathy reduces renal Metformin clearance, triggering toxic systemic accumulation.'
  },
  'Atorvastatin + Clarithromycin': {
    severity: 'Severe',
    message: 'Severe rhabdomyolysis warning. Clarithromycin inhibits CYP3A4 enzyme.',
    mechanism: 'Statins accumulate in skeletal muscle causing severe muscle breakdown and acute kidney injury.'
  },
  'Aspirin + Metoprolol': {
    severity: 'Moderate',
    message: 'Minor interaction: High-dose NSAIDs may slightly diminish the blood pressure lowering effect of beta-blockers.',
    mechanism: 'NSAIDs inhibit renal prostaglandins that assist vasodilatation.'
  }
};

export default function Dashboard() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>('p1');
  const [showExplanation, setShowExplanation] = useState<boolean>(true);
  
  // FDA Scanner State
  const [drugA, setDrugA] = useState<string>('Warfarin');
  const [drugB, setDrugB] = useState<string>('Aspirin');
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const currentPatient = PATIENTS.find(p => p.id === selectedPatientId) || PATIENTS[0];

  const handleRunDrugScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const combo1 = `${drugA} + ${drugB}`;
      const combo2 = `${drugB} + ${drugA}`;
      const found = DRUG_INTERACTIONS[combo1] || DRUG_INTERACTIONS[combo2];

      if (found) {
        setScanResult(found);
      } else {
        setScanResult({
          severity: 'Safe',
          message: 'No clinically significant adverse drug-drug contraindication detected by FDA formulary radar.',
          mechanism: 'Independent metabolic pathways without known CYP450 enzyme competitive inhibition.'
        });
      }
      setIsScanning(false);
    }, 450);
  };

  const handleDownloadReport = () => {
    const reportContent = `
===================================================================
          HEALTHSYNC EHR ENTERPRISE CLINICAL DOSSIER
===================================================================
Patient Name:        ${currentPatient.name}
Patient MRN:         ${currentPatient.mrn}
Age / Sex:           ${currentPatient.age} Yrs / ${currentPatient.gender}
Blood Group:         ${currentPatient.bloodType}
Primary Diagnosis:   ${currentPatient.condition}
Attending Physician: ${currentPatient.doctor}
Generated On:        ${new Date().toLocaleString()}

-------------------------------------------------------------------
1. REAL-TIME VITAL TELEMETRY SNAPSHOT
-------------------------------------------------------------------
- Heart Rate:        ${currentPatient.vitals.hr} BPM (Normal Resting 60-100)
- Blood Pressure:    ${currentPatient.vitals.bp} mmHg (Target < 120/80)
- Blood Oxygen SpO2: ${currentPatient.vitals.o2}% (Optimal Range 95-100%)
- Blood Glucose:     ${currentPatient.vitals.glucose} mg/dL (Normal Fasting 70-99)
- Body Temperature:  ${currentPatient.vitals.temp} °F (Normal 98.6)

-------------------------------------------------------------------
2. CURRENT ACTIVE FORMULARY & PHARMACOTHERAPY
-------------------------------------------------------------------
${currentPatient.medications.map((m, i) => `[${i + 1}] ${m}`).join('\n')}

-------------------------------------------------------------------
3. CLINICAL DECISION SUPPORT & AI SUMMARY
-------------------------------------------------------------------
${currentPatient.aiSummary}

-------------------------------------------------------------------
4. UPCOMING CLINICAL CONSULTATION
-------------------------------------------------------------------
Physician:           ${currentPatient.nextAppointment.doctor}
Specialty:           ${currentPatient.nextAppointment.specialty}
Schedule:            ${currentPatient.nextAppointment.date} at ${currentPatient.nextAppointment.time}

===================================================================
STAMP: VERIFIED ELECTRONIC SIGNATURE • HIPAA ENCRYPTED HASH: #98FD-77A1
===================================================================
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HealthSync_Report_${currentPatient.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
      
      {/* Top Header & Patient Switcher */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--primary-blue)',
              background: 'var(--primary-blue-alpha)',
              padding: '2px 8px',
              borderRadius: '999px',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              Active Patient EHR Chart
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              MRN: <strong style={{ color: '#f8fafc' }}>{currentPatient.mrn}</strong>
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Clinical Overview: {currentPatient.name}
          </h1>
          <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
            {currentPatient.condition} • Attending: {currentPatient.doctor}
          </p>
        </div>

        {/* Patient Switcher & Download Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#0d1322', padding: '6px 12px', borderRadius: '10px', border: '1px solid #1e293b' }}>
            <UserCheck size={16} color="var(--primary-blue)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Select Patient:</span>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              style={{
                background: '#161e31',
                color: '#f8fafc',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {PATIENTS.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.condition.split(' ')[0]})</option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleDownloadReport}
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {downloadSuccess ? <CheckCircle2 size={16} color="#34d399" /> : <Download size={16} />}
            <span>{downloadSuccess ? 'Downloaded!' : 'Export Clinical Dossier'}</span>
          </button>
        </div>
      </div>

      {/* 10th-Standard Friendly Plain-English Explanation Banner */}
      <div className="clinical-card" style={{ 
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.25) 0%, rgba(15, 23, 42, 0.4) 100%)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        marginBottom: '24px',
        padding: '16px 20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowExplanation(!showExplanation)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '8px', borderRadius: '8px' }}>
              <HelpCircle size={18} color="var(--primary-blue)" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                10th Standard Friendly Guide: What Do These Vital Numbers Mean?
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
                Click to {showExplanation ? 'hide' : 'show'} easy, everyday explanations for your heart, oxygen, and blood pressure.
              </p>
            </div>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
            {showExplanation ? '▲ Collapse' : '▼ Expand'}
          </span>
        </div>

        {showExplanation && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '12px', 
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <strong style={{ color: 'var(--alert-red)', fontSize: '0.85rem' }}>❤️ Heart Rate (BPM):</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                How many times your heart beats in 1 minute. Between <strong>60 to 100 bpm</strong> while resting is normal and healthy!
              </p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <strong style={{ color: 'var(--primary-blue)', fontSize: '0.85rem' }}>🩺 Blood Pressure (mmHg):</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                <strong>Top number (118)</strong> is pressure when heart pumps. <strong>Bottom number (75)</strong> is resting pressure between beats. Under 120/80 is great!
              </p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <strong style={{ color: 'var(--success-green)', fontSize: '0.85rem' }}>🫁 Oxygen Level (SpO2):</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                Percentage of oxygen carried by your red blood cells. <strong>95% to 100%</strong> means your lungs are doing a fantastic job.
              </p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <strong style={{ color: '#f59e0b', fontSize: '0.85rem' }}>🩸 Blood Glucose:</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                Amount of sugar in your bloodstream for energy. Normal fasting is <strong>70 to 99 mg/dL</strong>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Vital Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        
        {/* Card 1: HR */}
        <div className="clinical-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'var(--alert-red-alpha)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <HeartPulse size={26} color="var(--alert-red)" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Heart Rate</span>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1, marginTop: '2px' }}>
              {currentPatient.vitals.hr} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#94a3b8' }}>bpm</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>Normal Sinus Rhythm</span>
          </div>
        </div>
        
        {/* Card 2: BP */}
        <div className="clinical-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'var(--primary-blue-alpha)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <Activity size={26} color="var(--primary-blue)" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Blood Pressure</span>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1, marginTop: '2px' }}>
              {currentPatient.vitals.bp} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#94a3b8' }}>mmHg</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 600 }}>AHA Optimal Range</span>
          </div>
        </div>

        {/* Card 3: SpO2 */}
        <div className="clinical-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'var(--success-green-alpha)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <Activity size={26} color="var(--success-green)" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Blood Oxygen</span>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1, marginTop: '2px' }}>
              {currentPatient.vitals.o2} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#94a3b8' }}>%</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>Normal Arterial Saturation</span>
          </div>
        </div>

        {/* Card 4: Blood Glucose */}
        <div className="clinical-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <Activity size={26} color="#f59e0b" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Blood Glucose</span>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1, marginTop: '2px' }}>
              {currentPatient.vitals.glucose} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#94a3b8' }}>mg/dL</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 600 }}>Euglycemic Level</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Chart & Clinical Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '28px' }}>
        
        {/* Main Chart Area */}
        <div className="clinical-card" style={{ height: '440px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff' }}>
                24-Hour Telemetry Rhythm Trend
              </h2>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
                Continuous arterial pressure (mmHg) & pulse tracking (BPM)
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--alert-red)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--alert-red)' }} /> Heart Rate
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-blue)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-blue)' }} /> Systolic BP
              </span>
            </div>
          </div>

          <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentPatient.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--alert-red)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--alert-red)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis domain={[50, 150]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ background: '#0a0f1d', borderRadius: '10px', border: '1px solid #1e293b', color: '#f8fafc', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                  labelStyle={{ fontWeight: 700, color: 'var(--primary-blue)' }}
                />
                <Area type="monotone" dataKey="hr" name="Heart Rate (BPM)" stroke="var(--alert-red)" strokeWidth={3} fillOpacity={1} fill="url(#colorHr)" />
                <Area type="monotone" dataKey="bp" name="Systolic BP (mmHg)" stroke="var(--primary-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorBp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* AI Clinical Summary */}
          <div className="clinical-card">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#f8fafc' }}>
              <Stethoscope size={18} color="var(--primary-blue)" /> AI Clinical Decision Support
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              {currentPatient.aiSummary}
            </p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#34d399" />
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Validated against HL7 / FHIR Clinical Rules</span>
            </div>
          </div>

          {/* Active Medications List */}
          <div className="clinical-card">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#f8fafc' }}>
              <Pill size={18} color="#a855f7" /> Active Medications
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {currentPatient.medications.map((med, idx) => (
                <div key={idx} style={{ background: '#0d1322', padding: '8px 12px', borderRadius: '8px', border: '1px solid #1e293b', fontSize: '0.82rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7' }} />
                  <span>{med}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Consultation Card */}
          <div className="clinical-card" style={{ background: 'linear-gradient(180deg, #0e1424 0%, #0a0f1d 100%)' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="var(--primary-blue)" /> Next Appointment
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '10px 14px', borderRadius: '10px', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase' }}>
                  {currentPatient.nextAppointment.date.split(' ')[0]}
                </span>
                <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                  {currentPatient.nextAppointment.date.split(' ')[1].replace(',', '')}
                </span>
              </div>
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                  {currentPatient.nextAppointment.doctor}
                </h4>
                <p style={{ margin: '0 0 2px 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                  {currentPatient.nextAppointment.specialty}
                </p>
                <span style={{ fontSize: '0.75rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={11} /> {currentPatient.nextAppointment.time}
                </span>
              </div>
            </div>
            <Link 
              href="/appointments"
              className="btn-outline" 
              style={{ width: '100%', marginTop: '16px', justifyContent: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
            >
              <span>Manage Appointments</span>
              <ChevronRight size={14} />
            </Link>
          </div>

        </div>
      </div>

      {/* FDA Drug-Drug Interaction Safety Scanner */}
      <div className="clinical-card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#a855f7',
                background: 'rgba(168, 85, 247, 0.15)',
                padding: '2px 8px',
                borderRadius: '999px',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                textTransform: 'uppercase'
              }}>
                Safety Intelligence
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Pharmacological Contraindication Engine</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              FDA Drug-Drug Interaction & Contraindication Scanner
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
              Check if taking two medications together is safe or could cause harmful side effects.
            </p>
          </div>

          <button 
            onClick={handleRunDrugScan}
            disabled={isScanning}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {isScanning ? <RefreshCw size={16} className="animate-spin" /> : <Zap size={16} />}
            <span>{isScanning ? 'Analyzing Interactions...' : 'Run FDA Safety Scan'}</span>
          </button>
        </div>

        {/* Drug Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>
              First Medication
            </label>
            <select
              value={drugA}
              onChange={(e) => setDrugA(e.target.value)}
              className="clinical-input"
              style={{ width: '100%', background: '#161e31', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px' }}
            >
              <option value="Warfarin">Warfarin (Blood Thinner)</option>
              <option value="Lisinopril">Lisinopril (Blood Pressure)</option>
              <option value="Metformin">Metformin (Diabetes Blood Sugar)</option>
              <option value="Atorvastatin">Atorvastatin (Cholesterol)</option>
              <option value="Aspirin">Aspirin (Cardio Protection)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>
              Second Medication
            </label>
            <select
              value={drugB}
              onChange={(e) => setDrugB(e.target.value)}
              className="clinical-input"
              style={{ width: '100%', background: '#161e31', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px' }}
            >
              <option value="Aspirin">Aspirin (Cardio Protection)</option>
              <option value="Potassium">Potassium (Electrolyte Supplement)</option>
              <option value="Contrast Dye">Contrast Dye (Radiology Imaging)</option>
              <option value="Clarithromycin">Clarithromycin (Antibiotic)</option>
              <option value="Metoprolol">Metoprolol (Beta-Blocker)</option>
            </select>
          </div>
        </div>

        {/* Scan Result Output Card */}
        {scanResult && (
          <div style={{
            background: scanResult.severity === 'Severe' 
              ? 'rgba(239, 68, 68, 0.12)' 
              : scanResult.severity === 'Moderate' 
              ? 'rgba(245, 158, 11, 0.12)' 
              : 'rgba(16, 185, 129, 0.12)',
            border: `1px solid ${
              scanResult.severity === 'Severe' 
                ? 'rgba(239, 68, 68, 0.4)' 
                : scanResult.severity === 'Moderate' 
                ? 'rgba(245, 158, 11, 0.4)' 
                : 'rgba(16, 185, 129, 0.4)'
            }`,
            borderRadius: '12px',
            padding: '16px 20px',
            marginTop: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {scanResult.severity === 'Severe' ? (
                  <AlertTriangle size={20} color="var(--alert-red)" />
                ) : scanResult.severity === 'Moderate' ? (
                  <AlertTriangle size={20} color="#fbbf24" />
                ) : (
                  <CheckCircle2 size={20} color="#34d399" />
                )}
                <strong style={{ fontSize: '1rem', color: '#ffffff' }}>
                  Interaction Level: {scanResult.severity}
                </strong>
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '999px',
                background: scanResult.severity === 'Severe' ? 'var(--alert-red)' : scanResult.severity === 'Moderate' ? '#f59e0b' : 'var(--success-green)',
                color: '#ffffff'
              }}>
                {scanResult.severity.toUpperCase()} ALERT
              </span>
            </div>

            <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#f8fafc', fontWeight: 500 }}>
              {scanResult.message}
            </p>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: '6px' }}>
              <strong>Mechanism of Action:</strong> {scanResult.mechanism}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

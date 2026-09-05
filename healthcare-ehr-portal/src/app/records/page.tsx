'use client';

import { useState } from 'react';
import { 
  FileText, Download, Lock, Search, Filter, Plus, 
  CheckCircle2, X, Eye, ShieldCheck, AlertCircle, FileCode,
  Calendar, User, Stethoscope, Sparkles
} from 'lucide-react';

interface HealthRecord {
  id: string;
  date: string;
  title: string;
  provider: string;
  status: 'Available' | 'Active' | 'Verified' | 'Pending Review';
  type: 'Lab Result' | 'Imaging' | 'Prescription' | 'Immunization';
  summary: string;
  details: string[];
}

const INITIAL_RECORDS: HealthRecord[] = [
  { 
    id: 'LAB-9921', 
    date: '2026-10-01', 
    title: 'Comprehensive Metabolic & Lipid Panel', 
    provider: 'Dr. Sarah Jenkins', 
    status: 'Available', 
    type: 'Lab Result',
    summary: 'Routine 14-parameter blood chemistry examination.',
    details: [
      'Fasting Glucose: 92 mg/dL (Normal: 70 - 99 mg/dL) — Optimal',
      'Total Cholesterol: 178 mg/dL (Desirable: < 200 mg/dL) — Optimal',
      'HDL "Good" Cholesterol: 54 mg/dL (Protective: > 40 mg/dL)',
      'LDL "Bad" Cholesterol: 98 mg/dL (Optimal: < 100 mg/dL)',
      'Kidney Function (eGFR): > 90 mL/min (Normal healthy filtration)'
    ]
  },
  { 
    id: 'IMG-4820', 
    date: '2026-08-15', 
    title: 'Chest X-Ray 2-View (AP / Lateral)', 
    provider: 'Radiology Dept (Dr. H. Vance)', 
    status: 'Available', 
    type: 'Imaging',
    summary: 'Bilateral lung fields clear. Heart size normal with no pleural effusion.',
    details: [
      'Cardiothoracic Ratio: Normal (0.45)',
      'Lungs: Clear without focal consolidation or pneumothorax',
      'Osseous Structures: Intact, no acute fracture',
      'Impression: Normal healthy thoracic radiograph'
    ]
  },
  { 
    id: 'RX-1029', 
    date: '2026-06-22', 
    title: 'Atorvastatin 20mg Oral Tablets', 
    provider: 'Dr. Marcus Webb', 
    status: 'Active', 
    type: 'Prescription',
    summary: 'Cardiovascular maintenance for optimal arterial plaque protection.',
    details: [
      'Dosage: Take 1 tablet (20mg) daily by mouth at bedtime',
      'Quantity: 90 Tablets (3-month supply)',
      'Refills Remaining: 3 refills authorized',
      'Pharmacy: CVS Caremark Mail Order #4912'
    ]
  },
  { 
    id: 'VAC-0045', 
    date: '2026-01-10', 
    title: 'Annual Quadrivalent Influenza Vaccine', 
    provider: 'City Health Clinic', 
    status: 'Verified', 
    type: 'Immunization',
    summary: 'Seasonal influenza protection against four viral strains.',
    details: [
      'Lot Number: FL-99824X',
      'Manufacturer: Sanofi Pasteur Inc.',
      'Route & Site: Intramuscular (Left Deltoid)',
      'Next Due Date: Autumn 2027'
    ]
  },
  { 
    id: 'LAB-8810', 
    date: '2025-11-05', 
    title: 'HbA1c Glycated Hemoglobin Test', 
    provider: 'Dr. Sarah Jenkins', 
    status: 'Available', 
    type: 'Lab Result',
    summary: '3-Month average blood sugar index.',
    details: [
      'HbA1c Level: 5.4% (Normal non-diabetic: < 5.7%) — Healthy',
      'Estimated Average Glucose (eAG): 108 mg/dL',
      'Trend: Stable compared to previous year'
    ]
  },
];

export default function RecordsPage() {
  const [records, setRecords] = useState<HealthRecord[]>(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [isNewRecordOpen, setIsNewRecordOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Record Form State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newType, setNewType] = useState<HealthRecord['type']>('Lab Result');
  const [newProvider, setNewProvider] = useState<string>('Dr. Sarah Jenkins');
  const [newSummary, setNewSummary] = useState<string>('');
  const [newFinding, setNewFinding] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter & Search Logic
  const filteredRecords = records.filter(record => {
    const matchesCategory = activeCategory === 'ALL' || record.type === activeCategory;
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Add Record
  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    const newRecord: HealthRecord = {
      id: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
      date: dateStr,
      title: newTitle || 'Clinical Observation Report',
      provider: newProvider,
      status: 'Available',
      type: newType,
      summary: newSummary || 'Patient-provided medical report verified by clinical intake.',
      details: [
        newFinding || 'Clinical examination within normal parameters.',
        'Verified in EHR database under patient MRN-88210.'
      ]
    };

    setRecords(prev => [newRecord, ...prev]);
    setIsNewRecordOpen(false);
    setNewTitle('');
    setNewSummary('');
    setNewFinding('');
    showToast('New clinical record added to encrypted medical vault!');
  };

  // Export FHIR R4 JSON standard format
  const handleExportFHIR = () => {
    const fhirBundle = {
      resourceType: 'Bundle',
      id: 'bundle-healthsync-mrn88210',
      type: 'document',
      timestamp: new Date().toISOString(),
      entry: records.map(r => ({
        resource: {
          resourceType: r.type === 'Prescription' ? 'MedicationRequest' : r.type === 'Immunization' ? 'Immunization' : 'Observation',
          id: r.id,
          status: 'final',
          code: { text: r.title },
          subject: { reference: 'Patient/MRN-88210', display: 'John Smith' },
          performer: [{ display: r.provider }],
          effectiveDateTime: r.date,
          note: [{ text: r.summary }]
        }
      }))
    };

    const blob = new Blob([JSON.stringify(fhirBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthSync_FHIR_Bundle_MRN88210.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('HL7 FHIR Release 4 JSON bundle downloaded successfully!');
  };

  // Download Individual Record Report
  const handleDownloadRecord = (rec: HealthRecord) => {
    const content = `HEALTHSYNC ELECTRONIC HEALTH RECORD (EHR)
RECORD IDENTIFIER: ${rec.id}
PATIENT: John Smith (MRN-88210)
DATE: ${rec.date}
DOCUMENT TYPE: ${rec.type}
ATTENDING PROVIDER: ${rec.provider}
STATUS: ${rec.status}

TITLE: ${rec.title}
SUMMARY:
${rec.summary}

CLINICAL FINDINGS & OBSERVATIONS:
${rec.details.map(d => `• ${d}`).join('\n')}

END-TO-END ENCRYPTED AND AUTHENTICATED BY HEALTHSYNC EHR.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthSync_${rec.id}_Report.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Record ${rec.id} downloaded!`);
  };

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

      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Electronic Health Records
            </h1>
            <span className="badge-success">
              <Lock size={13} /> 256-bit Encrypted
            </span>
          </div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem', maxWidth: '650px', lineHeight: 1.5 }}>
            Access all your verified diagnostic lab results, medical scans, prescriptions, and vaccines in one unified FHIR-compliant vault.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="btn-outline"
            onClick={handleExportFHIR}
            title="Download your raw health data in HL7 FHIR R4 standard JSON format"
          >
            <FileCode size={16} /> Export FHIR (JSON)
          </button>
          <button 
            className="btn-primary"
            onClick={() => setIsNewRecordOpen(true)}
          >
            <Plus size={18} /> Add New Medical Record
          </button>
        </div>
      </div>

      {/* 10th-Grade Friendly Guide Card */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }} />
          <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}><strong>Lab Tests:</strong> Blood & urine chemistry</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#06b6d4' }} />
          <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}><strong>Imaging:</strong> X-Rays, MRIs & Ultrasounds</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
          <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}><strong>Prescriptions:</strong> Medications & Refill counts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
          <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}><strong>Vaccines:</strong> Immunization defense records</span>
        </div>
      </div>

      {/* Main Records Card */}
      <div className="clinical-card" style={{ padding: 0, overflow: 'hidden' }}>
        
        {/* Search & Category Filter Toolbar */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', background: 'rgba(15, 23, 42, 0.8)' }}>
          
          {/* Search Input */}
          <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="clinical-input" 
              placeholder="Search by test name, doctor, or keyword..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '42px' }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['ALL', 'Lab Result', 'Imaging', 'Prescription', 'Immunization'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '99px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: activeCategory === cat ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                  background: activeCategory === cat ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: activeCategory === cat ? '#60a5fa' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {cat === 'ALL' ? 'All Records' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Records Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="clinical-table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Date</th>
                <th>Title / Description</th>
                <th>Attending Provider</th>
                <th>Type</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    No records match your search criteria. Try another keyword or category filter.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td style={{ fontWeight: 600, color: '#60a5fa' }}>{record.id}</td>
                    <td style={{ color: '#cbd5e1' }}>{record.date}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: '#ffffff' }}>{record.title}</span>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{record.summary}</span>
                      </div>
                    </td>
                    <td style={{ color: '#cbd5e1' }}>{record.provider}</td>
                    <td>
                      <span style={{ 
                        padding: '4px 10px', 
                        background: 'rgba(255,255,255,0.06)', 
                        borderRadius: '6px', 
                        fontSize: '0.78rem', 
                        fontWeight: 600,
                        color: record.type === 'Lab Result' ? '#60a5fa' : record.type === 'Imaging' ? '#22d3ee' : record.type === 'Prescription' ? '#34d399' : '#fbbf24'
                      }}>
                        {record.type}
                      </span>
                    </td>
                    <td>
                      <span className={record.status === 'Active' ? 'badge-primary' : 'badge-success'}>
                        {record.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button 
                          onClick={() => setSelectedRecord(record)}
                          style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.25)',
                            color: '#60a5fa',
                            cursor: 'pointer',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.8rem',
                            fontWeight: 600
                          }}
                          title="View clinical details"
                        >
                          <Eye size={14} /> View
                        </button>
                        <button 
                          onClick={() => handleDownloadRecord(record)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#e2e8f0',
                            cursor: 'pointer',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.8rem'
                          }}
                          title="Download medical report"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px' }}>
              <div>
                <span className="badge-primary" style={{ marginBottom: '6px' }}>{selectedRecord.id} • {selectedRecord.type}</span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{selectedRecord.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedRecord(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Date of Service</span>
                  <p style={{ margin: '2px 0 0 0', fontWeight: 600, color: '#ffffff' }}>{selectedRecord.date}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Attending Doctor</span>
                  <p style={{ margin: '2px 0 0 0', fontWeight: 600, color: '#ffffff' }}>{selectedRecord.provider}</p>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#60a5fa', margin: '0 0 6px 0' }}>Clinical Summary:</h4>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                  {selectedRecord.summary}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#60a5fa', margin: '0 0 8px 0' }}>Itemized Findings & Reference Ranges:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedRecord.details.map((det, idx) => (
                    <div key={idx} style={{ background: '#0a0f1d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.85rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} color="#10b981" />
                      <span>{det}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={18} color="#10b981" />
                <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                  Verified by Hospital Pathology & Signed Cryptographically
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                className="btn-outline"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>
              <button 
                className="btn-primary"
                onClick={() => handleDownloadRecord(selectedRecord)}
              >
                <Download size={15} /> Download Record
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add New Medical Record Modal */}
      {isNewRecordOpen && (
        <div className="modal-overlay" onClick={() => setIsNewRecordOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '8px', borderRadius: '8px' }}>
                  <Plus size={18} color="#3b82f6" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>Add New Clinical Record</h3>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Upload or manually document a medical event</span>
                </div>
              </div>
              <button 
                onClick={() => setIsNewRecordOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddRecord} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Record Title / Test Description
                </label>
                <input 
                  type="text" 
                  required 
                  className="clinical-input" 
                  placeholder="e.g. Thyroid Stimulating Hormone (TSH) Panel" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Record Category
                  </label>
                  <select 
                    className="clinical-input" 
                    value={newType} 
                    onChange={e => setNewType(e.target.value as any)}
                    style={{ background: '#0f172a' }}
                  >
                    <option value="Lab Result">Lab Result (Blood/Urine)</option>
                    <option value="Imaging">Imaging (X-Ray/Scan)</option>
                    <option value="Prescription">Prescription</option>
                    <option value="Immunization">Immunization (Vaccine)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Ordering Physician
                  </label>
                  <input 
                    type="text" 
                    required 
                    className="clinical-input" 
                    value={newProvider} 
                    onChange={e => setNewProvider(e.target.value)} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Diagnostic Summary / Impression
                </label>
                <textarea 
                  className="clinical-input" 
                  rows={2} 
                  placeholder="Summary of findings..." 
                  value={newSummary} 
                  onChange={e => setNewSummary(e.target.value)} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Specific Finding / Reading (with reference range)
                </label>
                <input 
                  type="text" 
                  className="clinical-input" 
                  placeholder="e.g. TSH: 2.1 mIU/L (Normal range: 0.4 - 4.0 mIU/L)" 
                  value={newFinding} 
                  onChange={e => setNewFinding(e.target.value)} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  className="btn-outline" 
                  onClick={() => setIsNewRecordOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  <CheckCircle2 size={16} /> Save to Health Vault
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

'use client';

import { useState } from 'react';
import { 
  Calendar, Clock, Video, User, MapPin, Plus, CheckCircle2, 
  X, Phone, AlertCircle, Sparkles, ChevronRight, FileText, 
  Mic, MicOff, VideoOff, Download, HelpCircle, ShieldCheck
} from 'lucide-react';

interface AppointmentItem {
  id: string;
  doctorName: string;
  specialty: string;
  department: string;
  dateStr: string;
  dayNumber: string;
  monthStr: string;
  timeStr: string;
  type: 'Telehealth Video' | 'In-Person Visit';
  location: string;
  reason: string;
  status: 'Confirmed' | 'Completed' | 'Rescheduled';
}

const INITIAL_APPOINTMENTS: AppointmentItem[] = [
  {
    id: 'APT-401',
    doctorName: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist (Heart Specialist)',
    department: 'Cardiovascular Care',
    dateStr: '2026-10-14',
    dayNumber: '14',
    monthStr: 'October',
    timeStr: '10:30 AM - 11:00 AM',
    type: 'Telehealth Video',
    location: 'Encrypted Video Room 4B',
    reason: '6-Month Cardiovascular Follow-up and Resting ECG Review.',
    status: 'Confirmed'
  },
  {
    id: 'APT-402',
    doctorName: 'Dr. Marcus Webb',
    specialty: 'Internal Medicine (Primary Care)',
    department: 'Family Medicine',
    dateStr: '2026-11-02',
    dayNumber: '02',
    monthStr: 'November',
    timeStr: '08:30 AM - 09:15 AM',
    type: 'In-Person Visit',
    location: 'Metro Health Tower, Suite 402, 5th Avenue',
    reason: 'Comprehensive Annual Wellness Physical and Fasting Blood Panel.',
    status: 'Confirmed'
  },
  {
    id: 'APT-403',
    doctorName: 'Dr. Emily Chen',
    specialty: 'Endocrinologist (Hormone & Diabetes)',
    department: 'Metabolic Clinic',
    dateStr: '2026-11-20',
    dayNumber: '20',
    monthStr: 'November',
    timeStr: '02:00 PM - 02:45 PM',
    type: 'Telehealth Video',
    location: 'Encrypted Video Room 1A',
    reason: 'Review glucose sensor logs and optimize dietary insulin sensitivity.',
    status: 'Confirmed'
  }
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>(INITIAL_APPOINTMENTS);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [activeCallAppointment, setActiveCallAppointment] = useState<AppointmentItem | null>(null);
  const [rescheduleItem, setRescheduleItem] = useState<AppointmentItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Appointment Form
  const [newDoctor, setNewDoctor] = useState<string>('Dr. Sarah Jenkins');
  const [newType, setNewType] = useState<'Telehealth Video' | 'In-Person Visit'>('Telehealth Video');
  const [newDate, setNewDate] = useState<string>('2026-11-25');
  const [newTime, setNewTime] = useState<string>('11:00 AM - 11:30 AM');
  const [newReason, setNewReason] = useState<string>('Routine checkup and prescription renewal');

  // Video Call Simulation State
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [callNotes, setCallNotes] = useState<string>('Patient reports feeling energetic. Blood pressure is well managed at 118/76 mmHg.');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const dateObj = new Date(newDate);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const specialtyMap: Record<string, string> = {
      'Dr. Sarah Jenkins': 'Cardiologist (Heart Specialist)',
      'Dr. Marcus Webb': 'Internal Medicine (Primary Care)',
      'Dr. Emily Chen': 'Endocrinologist (Diabetes Specialist)',
      'Dr. Robert Vance': 'Neurologist (Brain & Nerve Specialist)'
    };

    const newApt: AppointmentItem = {
      id: `APT-${Math.floor(100 + Math.random() * 900)}`,
      doctorName: newDoctor,
      specialty: specialtyMap[newDoctor] || 'Clinical Specialist',
      department: 'Specialist Clinic',
      dateStr: newDate,
      dayNumber: dateObj.getDate().toString().padStart(2, '0'),
      monthStr: months[dateObj.getMonth()],
      timeStr: newTime,
      type: newType,
      location: newType === 'Telehealth Video' ? 'Encrypted Video Room 3C' : 'City Outpatient Center, Level 2',
      reason: newReason,
      status: 'Confirmed'
    };

    setAppointments(prev => [newApt, ...prev]);
    setIsScheduleOpen(false);
    showToast(`Appointment successfully booked with ${newDoctor}!`);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    showToast('Appointment successfully cancelled.');
  };

  const handleDownloadSummary = (apt: AppointmentItem) => {
    const summaryText = `HEALTHSYNC EHR - CLINICAL VISIT DISCHARGE SUMMARY
Appointment ID: ${apt.id}
Date: ${apt.dateStr} | Time: ${apt.timeStr}
Physician: ${apt.doctorName} (${apt.specialty})
Location: ${apt.location}
Chief Complaint / Reason: ${apt.reason}
Visit Notes: Patient examined. Vitals within normal reference ranges. 
Follow-up: 6 months.
Electronically signed and verified by HealthSync EHR.`;

    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthSync_VisitSummary_${apt.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Clinical visit summary downloaded to your device!');
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

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Doctor Appointments & Telehealth
            </h1>
            <span className="badge-primary">
              <Calendar size={13} /> {appointments.length} Scheduled
            </span>
          </div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem', maxWidth: '650px', lineHeight: 1.5 }}>
            Schedule visits with your healthcare team, attend live encrypted telehealth video calls, or manage in-person clinic appointments.
          </p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => setIsScheduleOpen(true)}
        >
          <Plus size={18} /> Schedule New Appointment
        </button>
      </div>

      {/* 10th-Grade Friendly Preparation Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.08))',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        borderRadius: '14px',
        padding: '16px 20px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '10px', borderRadius: '10px' }}>
            <HelpCircle size={22} color="#60a5fa" />
          </div>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 2px 0', color: '#ffffff' }}>
              How do Telehealth Appointments work?
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
              Click <strong>&quot;Join Video Call&quot;</strong> when your doctor is ready. You will talk face-to-face from your computer with end-to-end medical encryption.
            </p>
          </div>
        </div>
        <span className="badge-success">
          <ShieldCheck size={14} /> HIPAA Encrypted Channel
        </span>
      </div>

      {/* Appointment Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {appointments.map((apt) => (
          <div 
            key={apt.id} 
            className="clinical-card" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '24px', 
              padding: '22px', 
              flexWrap: 'wrap',
              borderLeft: apt.type === 'Telehealth Video' ? '4px solid #3b82f6' : '4px solid #10b981'
            }}
          >
            {/* Calendar Date Block */}
            <div style={{
              background: '#070b14',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '16px',
              borderRadius: '12px',
              textAlign: 'center',
              minWidth: '85px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {apt.monthStr}
              </span>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                {apt.dayNumber}
              </span>
            </div>

            {/* Doctor & Details */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                  {apt.doctorName}
                </h3>
                <span className="badge-primary">
                  {apt.specialty}
                </span>
                <span className={apt.type === 'Telehealth Video' ? 'badge-success' : 'badge-warning'}>
                  {apt.type}
                </span>
              </div>

              <p style={{ margin: '0 0 10px 0', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.4 }}>
                {apt.reason}
              </p>

              <div style={{ display: 'flex', gap: '20px', color: '#94a3b8', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={15} color="#60a5fa" /> {apt.timeStr}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {apt.type === 'Telehealth Video' ? <Video size={15} color="#34d399" /> : <MapPin size={15} color="#fbbf24" />}
                  {apt.location}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px' }}>
              {apt.type === 'Telehealth Video' ? (
                <button 
                  className="btn-primary"
                  style={{ justifyContent: 'center' }}
                  onClick={() => setActiveCallAppointment(apt)}
                >
                  <Video size={16} /> Join Video Call
                </button>
              ) : (
                <button 
                  className="btn-primary"
                  style={{ justifyContent: 'center', background: 'linear-gradient(135deg, #059669, #047857)' }}
                  onClick={() => showToast(`Directions sent to your phone for ${apt.location}`)}
                >
                  <MapPin size={16} /> Get Directions
                </button>
              )}

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn-outline" 
                  style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'center' }}
                  onClick={() => handleDownloadSummary(apt)}
                >
                  <Download size={14} /> Summary
                </button>
                <button 
                  className="btn-outline" 
                  style={{ padding: '8px 12px', fontSize: '0.8rem', color: '#fb7185', borderColor: 'rgba(244, 63, 94, 0.3)' }}
                  onClick={() => handleCancelAppointment(apt.id)}
                  title="Cancel this appointment"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Schedule New Appointment Modal */}
      {isScheduleOpen && (
        <div className="modal-overlay" onClick={() => setIsScheduleOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '8px', borderRadius: '8px' }}>
                  <Calendar size={18} color="#3b82f6" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>Book Doctor Appointment</h3>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Select your physician and preferred time</span>
                </div>
              </div>
              <button 
                onClick={() => setIsScheduleOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBookAppointment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Select Physician / Specialist
                </label>
                <select 
                  className="clinical-input" 
                  value={newDoctor} 
                  onChange={e => setNewDoctor(e.target.value)}
                  style={{ background: '#0f172a' }}
                >
                  <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins — Cardiologist (Heart & Blood Pressure)</option>
                  <option value="Dr. Marcus Webb">Dr. Marcus Webb — Internal Medicine (General Physician)</option>
                  <option value="Dr. Emily Chen">Dr. Emily Chen — Endocrinologist (Diabetes & Metabolism)</option>
                  <option value="Dr. Robert Vance">Dr. Robert Vance — Neurologist (Brain & Nerves)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Consultation Type
                  </label>
                  <select 
                    className="clinical-input" 
                    value={newType} 
                    onChange={e => setNewType(e.target.value as any)}
                    style={{ background: '#0f172a' }}
                  >
                    <option value="Telehealth Video">Telehealth Video Call (From Home)</option>
                    <option value="In-Person Visit">In-Person Clinic Visit</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Appointment Date
                  </label>
                  <input 
                    type="date" 
                    required 
                    className="clinical-input" 
                    value={newDate} 
                    onChange={e => setNewDate(e.target.value)} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Preferred Time Slot
                </label>
                <select 
                  className="clinical-input" 
                  value={newTime} 
                  onChange={e => setNewTime(e.target.value)}
                  style={{ background: '#0f172a' }}
                >
                  <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                  <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
                  <option value="01:30 PM - 02:00 PM">01:30 PM - 02:00 PM</option>
                  <option value="03:15 PM - 03:45 PM">03:15 PM - 03:45 PM</option>
                  <option value="04:30 PM - 05:00 PM">04:30 PM - 05:00 PM</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Reason for Visit / Symptoms
                </label>
                <textarea 
                  className="clinical-input" 
                  rows={3} 
                  placeholder="Describe your health reason or questions for the doctor..." 
                  value={newReason} 
                  onChange={e => setNewReason(e.target.value)} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  className="btn-outline" 
                  onClick={() => setIsScheduleOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  <CheckCircle2 size={16} /> Confirm Appointment
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Simulated Live Telehealth Video Call Consultation Room */}
      {activeCallAppointment && (
        <div className="modal-overlay" onClick={() => setActiveCallAppointment(null)}>
          <div className="modal-content" style={{ maxWidth: '850px' }} onClick={e => e.stopPropagation()}>
            
            {/* Room Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                    Live Telehealth Session with {activeCallAppointment.doctorName}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>
                    Connected • HD 1080p WebRTC Encrypted
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setActiveCallAppointment(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Streams Display */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
              
              {/* Doctor Video Screen */}
              <div style={{
                height: '280px',
                background: '#040711',
                borderRadius: '14px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge-primary">Attending: {activeCallAppointment.doctorName}</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', background: 'rgba(0,0,0,0.6)', padding: '3px 8px', borderRadius: '6px' }}>
                    Call Timer: 06:14
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #06b6d4)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.8rem', fontWeight: 800 }}>
                    {activeCallAppointment.doctorName.split(' ')[1]?.[0] || 'D'}
                  </div>
                  <p style={{ margin: 0, color: '#ffffff', fontWeight: 600, fontSize: '0.95rem' }}>
                    &quot;Hello John! I reviewed your 24-hour resting heart rate readings. Your rhythm looks stable.&quot;
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '99px' }}>
                    Audio Waveform: Clean 48kHz
                  </span>
                </div>
              </div>

              {/* Patient Self Preview */}
              <div style={{
                height: '280px',
                background: '#0a0f1d',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>Your Camera Preview</span>
                  <span className="badge-success">Online</span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1e293b', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <User size={30} />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>John Smith (Patient)</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button 
                    onClick={() => setIsMuted(!isMuted)} 
                    style={{ background: isMuted ? '#f43f5e' : 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                  <button 
                    onClick={() => setIsVideoOff(!isVideoOff)} 
                    style={{ background: isVideoOff ? '#f43f5e' : 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                    title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
                  >
                    {isVideoOff ? <VideoOff size={16} /> : <Video size={16} />}
                  </button>
                </div>
              </div>

            </div>

            {/* Live Clinical Notes Pad */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                Physician Consultation Notes (SOAP Format)
              </label>
              <textarea 
                className="clinical-input" 
                rows={3} 
                value={callNotes} 
                onChange={e => setCallNotes(e.target.value)} 
              />
            </div>

            {/* Consultation Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Patient ID: MRN-88210 • Visit Encrypted
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn-outline"
                  onClick={() => handleDownloadSummary(activeCallAppointment)}
                >
                  <Download size={15} /> Save Consultation Summary
                </button>
                <button 
                  className="btn-primary"
                  style={{ background: 'linear-gradient(135deg, #e11d48, #be123c)' }}
                  onClick={() => {
                    setActiveCallAppointment(null);
                    showToast('Consultation ended. Summary successfully recorded.');
                  }}
                >
                  <Phone size={15} style={{ transform: 'rotate(135deg)' }} /> End Consultation
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

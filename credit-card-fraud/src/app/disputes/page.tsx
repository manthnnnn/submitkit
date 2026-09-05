'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  AlertCircle, CheckCircle2, XCircle, FileText, Clock, DollarSign, 
  Search, ShieldAlert, ArrowRight, Plus, UploadCloud, Check, Sparkles 
} from 'lucide-react';
import { INITIAL_DISPUTES, Dispute } from '@/lib/fraud-data';

export default function DisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>(INITIAL_DISPUTES);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Form fields for new dispute
  const [newTxnId, setNewTxnId] = useState('TXN-9021');
  const [newCardholder, setNewCardholder] = useState('Sarah Jenkins');
  const [newAmount, setNewAmount] = useState(3450);
  const [newMerchant, setNewMerchant] = useState('Dubrovnik Luxury Diamonds');
  const [newReason, setNewReason] = useState('Stolen card used while customer was asleep in San Francisco.');

  const triggerNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 4000);
  };

  const handleUpdateStatus = (id: string, newStatus: Dispute['status']) => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    triggerNotice(`Dispute ${id} status updated to ${newStatus.replace('_', ' ')}.`);
  };

  const handleUploadRebuttal = (id: string) => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: 'DISMISSED' } : d));
    triggerNotice(`✓ Rebuttal Evidence Packet submitted to Visa Resolve Online (VROL). Chargeback dismissed!`);
  };

  const handleCreateDispute = (e: React.FormEvent) => {
    e.preventDefault();
    const newDispute: Dispute = {
      id: `DISP-${Math.floor(100 + Math.random() * 900)}`,
      transactionId: newTxnId,
      cardholder: newCardholder,
      amount: Number(newAmount),
      merchant: newMerchant,
      filedDate: 'Just now',
      reason: newReason,
      status: 'PENDING_REVIEW'
    };
    setDisputes([newDispute, ...disputes]);
    setShowFileModal(false);
    triggerNotice(`New dispute ${newDispute.id} registered and added to arbitration queue.`);
  };

  const filtered = disputes.filter(d => filterStatus === 'ALL' || d.status === filterStatus);

  const totalDisputed = disputes.reduce((sum, d) => sum + d.amount, 0);
  const totalRecovered = disputes.filter(d => d.status === 'DISMISSED').reduce((sum, d) => sum + d.amount, 0);

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Toast Notice */}
      {notice && (
        <div style={{
          position: 'fixed',
          top: '76px',
          right: '24px',
          zIndex: 100,
          background: 'rgba(11, 15, 25, 0.96)',
          border: '1px solid var(--accent-cyan)',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 25px rgba(56, 189, 248, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#ffffff',
          fontSize: '0.86rem',
          fontWeight: 700,
        }}>
          <Sparkles size={18} color="var(--accent-cyan)" />
          <span>{notice}</span>
        </div>
      )}

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 700,
              background: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              textTransform: 'uppercase',
            }}>
              Resolution Portal
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Visa VROL & Mastercard MCOM Integrated
            </span>
          </div>
          <h1 style={{ fontSize: '1.95rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1.2 }}>
            Chargeback &amp; Dispute Resolution Desk
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px', maxWidth: '750px' }}>
            Triage cardholder claim disputes, upload transactional evidence rebuttals, execute automated reversals, and maintain merchant account health.
          </p>
        </div>

        <button
          onClick={() => setShowFileModal(!showFileModal)}
          className="btn-primary"
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <Plus size={15} />
          <span>File Chargeback Claim</span>
        </button>
      </div>

      {/* KPI Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px',
        marginBottom: '24px',
      }}>
        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Total Disputed Volume
          </span>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            ${totalDisputed.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid var(--accent-emerald)' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Recovered / Rebuttal Won
          </span>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            ${totalRecovered.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid var(--accent-cyan)' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Merchant Win Rate
          </span>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            88.4%
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid var(--accent-amber)' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Active Pending Cases
          </span>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            {disputes.filter(d => d.status === 'PENDING_REVIEW' || d.status === 'EVIDENCE_REQUIRED').length}
          </div>
        </div>
      </div>

      {/* File Dispute Modal / Form */}
      {showFileModal && (
        <form onSubmit={handleCreateDispute} className="glass-panel" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid var(--accent-cyan)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            File New Transaction Dispute
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Transaction ID</label>
              <input
                type="text"
                value={newTxnId}
                onChange={e => setNewTxnId(e.target.value)}
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--fin-border)', color: '#fff', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Cardholder Name</label>
              <input
                type="text"
                value={newCardholder}
                onChange={e => setNewCardholder(e.target.value)}
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--fin-border)', color: '#fff', fontSize: '0.82rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Amount ($ USD)</label>
              <input
                type="number"
                value={newAmount}
                onChange={e => setNewAmount(Number(e.target.value))}
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--fin-border)', color: '#fff', fontSize: '0.82rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Merchant</label>
              <input
                type="text"
                value={newMerchant}
                onChange={e => setNewMerchant(e.target.value)}
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--fin-border)', color: '#fff', fontSize: '0.82rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Cardholder Claim Reason</label>
            <input
              type="text"
              value={newReason}
              onChange={e => setNewReason(e.target.value)}
              required
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--fin-border)', color: '#fff', fontSize: '0.82rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
              Submit Dispute
            </button>
            <button type="button" onClick={() => setShowFileModal(false)} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['ALL', 'PENDING_REVIEW', 'EVIDENCE_REQUIRED', 'REFUNDED', 'DISMISSED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: filterStatus === st ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.04)',
              color: filterStatus === st ? '#07090e' : 'var(--text-secondary)',
              transition: 'all 0.15s ease',
            }}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Disputes Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.map((disp) => {
          let badgeColor = 'var(--accent-amber)';
          let badgeBg = 'rgba(245, 158, 11, 0.12)';
          if (disp.status === 'REFUNDED') {
            badgeColor = 'var(--accent-emerald)';
            badgeBg = 'rgba(16, 185, 129, 0.12)';
          } else if (disp.status === 'DISMISSED') {
            badgeColor = 'var(--accent-cyan)';
            badgeBg = 'rgba(56, 189, 248, 0.12)';
          }

          return (
            <div
              key={disp.id}
              className="glass-panel"
              style={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                    {disp.id}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    ref {disp.transactionId} • Filed {disp.filedDate}
                  </span>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: badgeColor,
                    background: badgeBg,
                    border: `1px solid ${badgeColor}`,
                  }}>
                    {disp.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                  {disp.cardholder} ➔ {disp.merchant}
                </h3>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '8px 12px', borderRadius: '6px' }}>
                  <strong>Cardholder Statement:</strong> &quot;{disp.reason}&quot;
                </p>
              </div>

              {/* Amount & Quick Actions */}
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  ${disp.amount.toFixed(2)} USD
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {disp.status !== 'DISMISSED' && (
                    <button
                      onClick={() => handleUploadRebuttal(disp.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: 'rgba(56, 189, 248, 0.15)',
                        color: 'var(--accent-cyan)',
                        border: '1px solid rgba(56, 189, 248, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <UploadCloud size={13} />
                      <span>Submit VROL Evidence</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleUpdateStatus(disp.id, 'REFUNDED')}
                    disabled={disp.status === 'REFUNDED'}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: 'var(--accent-emerald)',
                      border: '1px solid rgba(16, 185, 129, 0.35)',
                    }}
                  >
                    Approve Refund
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(disp.id, 'DISMISSED')}
                    disabled={disp.status === 'DISMISSED'}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: 'rgba(244, 63, 94, 0.15)',
                      color: 'var(--accent-rose)',
                      border: '1px solid rgba(244, 63, 94, 0.35)',
                    }}
                  >
                    Dismiss Dispute
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

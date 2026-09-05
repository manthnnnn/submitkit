'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sliders, ShieldAlert, ShieldCheck, Plus, Check, Trash2, 
  AlertTriangle, RefreshCw, Lock, Zap, ArrowRight, Play 
} from 'lucide-react';
import { INITIAL_RULES, FraudRule } from '@/lib/fraud-data';

export default function RulesPage() {
  const [rules, setRules] = useState<FraudRule[]>(INITIAL_RULES);
  const [newRuleName, setNewRuleName] = useState<string>('');
  const [newRuleDesc, setNewRuleDesc] = useState<string>('');
  const [newRuleThreshold, setNewRuleThreshold] = useState<number>(1000);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Toggle Rule
  const handleToggleRule = (ruleId: string) => {
    setRules(prev => prev.map(r => r.id === ruleId ? { ...r, isEnabled: !r.isEnabled } : r));
  };

  // Add Rule
  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;

    const newRule: FraudRule = {
      id: `RULE-${rules.length + 1}`,
      name: newRuleName,
      description: newRuleDesc || 'Custom automated security policy.',
      severity: 'HIGH',
      thresholdValue: newRuleThreshold,
      isEnabled: true,
      triggersCount: 0
    };

    setRules(prev => [...prev, newRule]);
    setNewRuleName('');
    setNewRuleDesc('');
    setShowAddForm(false);
  };

  const activeRulesCount = rules.filter(r => r.isEnabled).length;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      
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
              Policy Enforcement
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Real-time Decision Logic
            </span>
          </div>
          <h1 style={{ fontSize: '1.95rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1.2 }}>
            Anti-Fraud Security Rule Engine
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px', maxWidth: '750px' }}>
            Configure and calibrate automated risk mitigation policies. Rules execute sequentially in sub-10ms against incoming transaction vectors.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
          style={{ padding: '8px 16px' }}
        >
          <Plus size={15} />
          <span>Add Custom Security Rule</span>
        </button>
      </div>

      {/* Rules Policy Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px',
        marginBottom: '24px',
      }}>
        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Active Enforcement Rules
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            {activeRulesCount} of {rules.length}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid var(--accent-emerald)' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Rule Interception Efficiency
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            99.6%
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid var(--accent-amber)' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Total Policy Triggers (30d)
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            {rules.reduce((acc, r) => acc + r.triggersCount, 0)}
          </div>
        </div>
      </div>

      {/* Optional Add Rule Form */}
      {showAddForm && (
        <form onSubmit={handleAddRule} className="glass-panel" style={{ padding: '20px', marginBottom: '24px', borderLeft: '4px solid var(--accent-cyan)' }}>
          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
            Create New Fraud Prevention Rule
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                Rule Name
              </label>
              <input
                type="text"
                value={newRuleName}
                onChange={(e) => setNewRuleName(e.target.value)}
                placeholder="e.g. High-Risk Foreign Merchant Velocity"
                required
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--fin-border)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                Threshold Limit Value ($ or mi/hr)
              </label>
              <input
                type="number"
                value={newRuleThreshold}
                onChange={(e) => setNewRuleThreshold(Number(e.target.value))}
                required
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--fin-border)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Condition &amp; Description
            </label>
            <input
              type="text"
              value={newRuleDesc}
              onChange={(e) => setNewRuleDesc(e.target.value)}
              placeholder="Describe what pattern triggers this security rule..."
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--fin-border)',
                color: '#ffffff',
                fontSize: '0.82rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              Save &amp; Deploy Rule
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Rules List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {rules.map((rule) => {
          let badgeColor = 'var(--accent-rose)';
          let badgeBg = 'rgba(244, 63, 94, 0.12)';
          if (rule.severity === 'MEDIUM') {
            badgeColor = 'var(--accent-amber)';
            badgeBg = 'rgba(245, 158, 11, 0.12)';
          }

          return (
            <div
              key={rule.id}
              className="glass-panel"
              style={{
                padding: '18px 22px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                opacity: rule.isEnabled ? 1 : 0.6,
                borderLeft: rule.isEnabled ? '4px solid var(--accent-cyan)' : '4px solid var(--text-muted)',
              }}
            >
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '4px',
                    background: badgeBg,
                    color: badgeColor,
                    textTransform: 'uppercase',
                  }}>
                    {rule.severity} SEVERITY
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {rule.id}
                  </span>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                  {rule.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.4 }}>
                  {rule.description}
                </p>
              </div>

              {/* Triggers Count & Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                    {rule.triggersCount}
                  </div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Interceptions
                  </span>
                </div>

                <button
                  onClick={() => handleToggleRule(rule.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: rule.isEnabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: rule.isEnabled ? 'var(--accent-emerald)' : 'var(--text-muted)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: rule.isEnabled ? 'rgba(16, 185, 129, 0.35)' : 'var(--fin-border)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {rule.isEnabled ? 'ENFORCING' : 'DISABLED'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Rule Interception Test Sandbox */}
      <div className="glass-panel" style={{ marginTop: '32px', padding: '24px', borderLeft: '4px solid var(--accent-emerald)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Zap size={18} color="var(--accent-emerald)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
            Live Policy Interception Sandbox
          </h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
          Simulate an incoming transaction payload to verify how your active rules block or approve authorizations in sub-millisecond runtime.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              Test Amount ($)
            </label>
            <input
              type="number"
              defaultValue={3500}
              id="test-amount-input"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--fin-border)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              Merchant Category
            </label>
            <select
              id="test-category-input"
              defaultValue="Crypto Exchange"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                background: 'rgba(20, 24, 38, 0.95)',
                border: '1px solid var(--fin-border)',
                color: '#ffffff',
                fontSize: '0.85rem',
              }}
            >
              <option value="Crypto Exchange">Crypto Exchange (Binance P2P)</option>
              <option value="Luxury Goods">Luxury Goods (Rolex Geneva)</option>
              <option value="Travel & Flights">Travel & Flights (Singapore Air)</option>
              <option value="Dining">Dining (Starbucks Coffee)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              Origin Geolocation
            </label>
            <select
              id="test-country-input"
              defaultValue="HR"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                background: 'rgba(20, 24, 38, 0.95)',
                border: '1px solid var(--fin-border)',
                color: '#ffffff',
                fontSize: '0.85rem',
              }}
            >
              <option value="HR">Dubrovnik, Croatia (Foreign High-Risk)</option>
              <option value="US">San Francisco, USA (Domestic Low-Risk)</option>
              <option value="NG">Lagos, Nigeria (Known Botnet ASN)</option>
              <option value="JP">Tokyo, Japan (Cross-Pacific)</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            const amt = Number((document.getElementById('test-amount-input') as HTMLInputElement)?.value || 3500);
            const cat = (document.getElementById('test-category-input') as HTMLSelectElement)?.value || 'Crypto Exchange';
            const cnt = (document.getElementById('test-country-input') as HTMLSelectElement)?.value || 'HR';

            let matchedRule: FraudRule | null = null;
            for (const r of rules) {
              if (!r.isEnabled) continue;
              if (amt >= r.thresholdValue) {
                matchedRule = r;
                break;
              }
              if (r.name.toLowerCase().includes('foreign') && cnt !== 'US') {
                matchedRule = r;
                break;
              }
              if (r.name.toLowerCase().includes('crypto') && cat.includes('Crypto')) {
                matchedRule = r;
                break;
              }
            }

            const resBox = document.getElementById('sandbox-result-box');
            if (resBox) {
              resBox.style.display = 'block';
              if (matchedRule) {
                // Increment triggers count
                setRules(prev => prev.map(r => r.id === matchedRule!.id ? { ...r, triggersCount: r.triggersCount + 1 } : r));
                resBox.innerHTML = `
                  <div style="padding: 14px 18px; border-radius: 8px; background: rgba(244, 63, 94, 0.12); border: 1px solid rgba(244, 63, 94, 0.3); color: #f43f5e;">
                    <div style="font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;">
                      🚨 TRANSACTION BLOCKED BY POLICY: ${matchedRule.name}
                    </div>
                    <div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 6px;">
                      Amount: $${amt.toLocaleString()} • Country: ${cnt} • Category: ${cat}<br/>
                      <strong>Heuristic Decision:</strong> Trigger Count incremented for rule ${matchedRule.id} (Threshold: $${matchedRule.thresholdValue}) • Latency: 1.2ms
                    </div>
                  </div>
                `;
              } else {
                resBox.innerHTML = `
                  <div style="padding: 14px 18px; border-radius: 8px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981;">
                    <div style="font-weight: 800; font-size: 0.95rem;">
                      ✓ TRANSACTION CLEARED & APPROVED
                    </div>
                    <div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 6px;">
                      No active security rule thresholds were breached. Decision: APPROVED • Latency: 0.8ms
                    </div>
                  </div>
                `;
              }
            }
          }}
          className="btn-primary"
          style={{ padding: '8px 20px', fontSize: '0.85rem' }}
        >
          <Play size={14} />
          <span>Execute Test Payload Against Active Rules</span>
        </button>

        <div id="sandbox-result-box" style={{ display: 'none', marginTop: '16px' }} />
      </div>
    </div>
  );
}

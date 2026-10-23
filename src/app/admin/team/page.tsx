'use client';

import React, { useState, useEffect } from 'react';
import {
  Users, Shield, UserCheck, Eye, Loader2, Copy,
  CheckCircle2, GitBranch, Terminal, ShieldAlert, Package,
  Info, Pencil, KeyRound, Mail, User, X, Save, RefreshCw,
} from 'lucide-react';


const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

const ROLE_INFO = [
  {
    role: 'SUPER_ADMIN',
    label: 'Super Admin',
    color: '#f87171',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.2)',
    icon: Shield,
    desc: 'Full access — all sections, revenue, orders, settings, team management.',
    can: ['Everything — no restrictions'],
    cannot: [],
  },
  {
    role: 'CONTENT_ADMIN',
    label: 'Content Admin',
    color: '#818cf8',
    bg: 'rgba(99,102,241,0.1)',
    border: 'rgba(99,102,241,0.2)',
    icon: Package,
    desc: 'Can create/edit projects and blueprints. Cannot see orders or revenue.',
    can: ['Projects — create, edit, upload ZIP', 'Blueprints — edit', 'Pre-orders — view', 'Analytics — view'],
    cannot: ['Orders & revenue', 'Audit logs', 'Acquisitions', 'Team management'],
  },
  {
    role: 'OPS_ADMIN',
    label: 'Ops Admin',
    color: '#fbbf24',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.2)',
    icon: UserCheck,
    desc: 'Manages orders, pre-orders, and customer operations. Cannot edit projects.',
    can: ['Orders — view & manage', 'Pre-orders — broadcast', 'Analytics — view', 'Audit logs'],
    cannot: ['Project create/edit', 'Blueprint edit', 'Team management'],
  },
  {
    role: 'READONLY',
    label: 'Viewer',
    color: '#a1a1aa',
    bg: 'rgba(161,161,170,0.1)',
    border: 'rgba(161,161,170,0.2)',
    icon: Eye,
    desc: 'Read-only access to all sections. Cannot make any changes.',
    can: ['View all sections'],
    cannot: ['Any modifications'],
  },
];

export default function AdminTeamPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [clearResult, setClearResult] = useState<string | null>(null);
  const [clearConfirm, setClearConfirm] = useState(false);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleClearTest = async () => {
    setClearing(true);
    setClearResult(null);
    try {
      const res = await fetch('/api/admin/orders/clear-test', { method: 'DELETE' });
      const data = await res.json();
      setClearResult(data.message || `Done — ${data.deleted} removed`);
    } catch {
      setClearResult('Failed to clear — try again');
    }
    setClearing(false);
    setClearConfirm(false);
  };

  // ── Credential Editor state ──────────────────────────────────────────
  type AdminUserMasked = { email: string; role: string; name: string; passwordHint: string };
  const [teamUsers, setTeamUsers] = useState<AdminUserMasked[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ newEmail: '', newPassword: '', newName: '' });
  const [editSaving, setEditSaving] = useState(false);
  const [editResult, setEditResult] = useState<{ ok: boolean; msg: string; json?: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/team')
      .then(r => r.json())
      .then(d => { if (d.users) setTeamUsers(d.users); })
      .catch(() => {});
  }, []);

  const handleEditSave = async (targetEmail: string) => {
    if (!editForm.newEmail && !editForm.newPassword && !editForm.newName) {
      setEditResult({ ok: false, msg: 'No changes to save' });
      return;
    }
    if (editForm.newPassword && editForm.newPassword.length < 8) {
      setEditResult({ ok: false, msg: 'Password must be at least 8 characters' });
      return;
    }
    setEditSaving(true);
    setEditResult(null);
    try {
      const res = await fetch('/api/admin/team', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetEmail, ...editForm }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditResult({ ok: true, msg: data.message, json: data.newAdminUsers });
        // Refresh masked list
        const r2 = await fetch('/api/admin/team');
        const d2 = await r2.json();
        if (d2.users) setTeamUsers(d2.users);
        setEditForm({ newEmail: '', newPassword: '', newName: '' });
      } else {
        setEditResult({ ok: false, msg: data.error || 'Failed to update' });
      }
    } catch {
      setEditResult({ ok: false, msg: 'Network error — try again' });
    }
    setEditSaving(false);
  };


  const envSnippet = `ADMIN_USERS=[
  {"email":"you@submitkit.in","password":"yourStrongPass","role":"SUPER_ADMIN","name":"Manthan"},
  {"email":"friend@gmail.com","password":"friendPass","role":"CONTENT_ADMIN","name":"Friend Name"}
]`;

  const gitSetup = `# Step 1 — Add friend as GitHub Collaborator
# GitHub → Repo → Settings → Collaborators → Add People
# Role: Write

# Step 2 — Enable branch protection on main
# GitHub → Settings → Branches → Add rule
# Branch: main
# ✅ Require pull request before merging
# ✅ Require 1 approval

# Step 3 — Friend creates a branch to work on
git checkout -b ui/my-changes
git push origin ui/my-changes
# → Vercel auto-creates a Preview URL
# → You review PR → Approve → Merge → Auto-deploys`;

  const friendEnv = `# Give ONLY these to your friend (safe — no secrets)
NEXT_PUBLIC_SUPABASE_URL=https://figzoijpvbwvvwdzxksx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_Ta4RrNBLonqJWp
NEXT_PUBLIC_GA_ID=G-4GDSEV10E1
# Admin login: friend uses CONTENT_ADMIN credentials from ADMIN_USERS`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight">Team Access</h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          Manage who can access the admin panel and the codebase
        </p>
      </div>

      {/* Role Permission Matrix */}
      <div>
        <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Role Permissions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ROLE_INFO.map(({ role, label, color, bg, border, icon: Icon, desc, can, cannot }) => (
            <div key={role} className="rounded-2xl p-4 space-y-3" style={cardStyle}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: bg, border: `1px solid ${border}` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-[10px] font-mono text-zinc-600">{role}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
              <div className="space-y-1">
                {can.map(c => (
                  <p key={c} className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 shrink-0" /> {c}
                  </p>
                ))}
                {cannot.map(c => (
                  <p key={c} className="text-[11px] text-zinc-600 flex items-center gap-1.5">
                    <span className="w-3 h-3 shrink-0 flex items-center justify-center text-zinc-700">✕</span> {c}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Setup: ADMIN_USERS env var */}
      <div className="rounded-2xl p-5 space-y-4" style={cardStyle}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <Shield className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Multi-User Admin Login Setup</h2>
            <p className="text-xs text-zinc-500">Add this to your .env.local and Vercel environment variables</p>
          </div>
        </div>

        <div className="relative">
          <pre className="text-[11px] text-zinc-300 font-mono leading-relaxed p-4 rounded-xl overflow-x-auto"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {envSnippet}
          </pre>
          <button
            onClick={() => copyText(envSnippet, 'env')}
            className="absolute top-2 right-2 p-1.5 rounded-lg transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {copied === 'env' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>
        </div>

        <div className="rounded-xl px-3 py-2.5 flex items-start gap-2"
          style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-400 leading-relaxed">
            After adding <code className="text-indigo-300 font-mono">ADMIN_USERS</code> to Vercel, the login page automatically shows an email+password form. Each person logs in with their own credentials and gets access filtered to their role.
          </p>
        </div>
      </div>

      {/* UI Code Access */}
      <div className="rounded-2xl p-5 space-y-4" style={cardStyle}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.25)' }}>
            <GitBranch className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">UI Code Access for Friend</h2>
            <p className="text-xs text-zinc-500">GitHub Collaborator + Branch Protection — no new repo needed</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          {[
            { step: '1', title: 'Add Collaborator', desc: 'GitHub → Repo → Settings → Collaborators → Add friend with Write access' },
            { step: '2', title: 'Protect main', desc: 'Require PR + your approval before anything merges to production' },
            { step: '3', title: 'Branch workflow', desc: 'Friend pushes to a branch → Vercel preview URL → you approve → auto-deploys' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="rounded-xl p-4" style={{ background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.12)' }}>
              <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-xs font-bold text-teal-400 mx-auto mb-2">{step}</div>
              <p className="text-xs font-bold text-white mb-1">{title}</p>
              <p className="text-[11px] text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <pre className="text-[11px] text-zinc-400 font-mono leading-relaxed p-4 rounded-xl overflow-x-auto"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {gitSetup}
          </pre>
          <button
            onClick={() => copyText(gitSetup, 'git')}
            className="absolute top-2 right-2 p-1.5 rounded-lg transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {copied === 'git' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
          </button>
        </div>
      </div>

      {/* Safe env for friend */}
      <div className="rounded-2xl p-5 space-y-4" style={cardStyle}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
            <Terminal className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Safe .env.local for Friend</h2>
            <p className="text-xs text-zinc-500">Share ONLY these — never share your ADMIN_SECRET_KEY, Supabase service role, or R2 credentials</p>
          </div>
        </div>

        <div className="relative">
          <pre className="text-[11px] text-zinc-300 font-mono leading-relaxed p-4 rounded-xl overflow-x-auto"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {friendEnv}
          </pre>
          <button
            onClick={() => copyText(friendEnv, 'friendenv')}
            className="absolute top-2 right-2 p-1.5 rounded-lg transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {copied === 'friendenv' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
          </button>
        </div>
      </div>

      {/* Danger Zone — Clear Test Orders */}
      <div className="rounded-2xl p-5 space-y-4" style={{ ...cardStyle, border: '1px solid rgba(239,68,68,0.15)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Danger Zone</h2>
            <p className="text-xs text-zinc-500">Irreversible data operations — SUPER_ADMIN only</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)' }}>
          <div>
            <p className="text-sm font-semibold text-white">Clear Test / Stale Orders</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Removes PENDING orders older than 1 day + emails matching @test.* or @example.*
              <br />
              <span className="text-emerald-600">PAID orders are never deleted.</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-4">
            {clearResult && (
              <span className="text-xs text-emerald-400 font-medium">{clearResult}</span>
            )}
            {!clearConfirm ? (
              <button
                onClick={() => setClearConfirm(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}
              >
                Clear Test Data
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearTest}
                  disabled={clearing}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                  style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171' }}
                >
                  {clearing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Confirm Delete'}
                </button>
                <button onClick={() => setClearConfirm(false)} className="text-xs text-zinc-600 hover:text-white px-2 transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Credential Editor ── */}
      <div className="rounded-2xl p-5 space-y-4" style={cardStyle}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <KeyRound className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Edit Admin Credentials</h2>
            <p className="text-xs text-zinc-500">Change email, password or name for any admin user</p>
          </div>
        </div>

        {teamUsers.length === 0 && (
          <p className="text-xs text-zinc-500 text-center py-4">Loading team members…</p>
        )}

        <div className="space-y-2">
          {teamUsers.map(u => {
            const isEditing = editingUser === u.email;
            const roleCfg = u.role === 'SUPER_ADMIN'
              ? { color: '#f87171', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' }
              : u.role === 'CONTENT_ADMIN'
              ? { color: '#818cf8', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)' }
              : { color: '#fbbf24', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' };

            return (
              <div key={u.email} className="rounded-xl overflow-hidden"
                style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {/* User row */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
                      {u.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{u.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate font-mono">{u.email}</p>
                      <p className="text-[10px] text-zinc-700 font-mono">Pass: {u.passwordHint}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase"
                      style={{ background: roleCfg.bg, color: roleCfg.color, border: `1px solid ${roleCfg.border}` }}>
                      {u.role.replace('_', ' ')}
                    </span>
                    <button
                      onClick={() => {
                        if (isEditing) { setEditingUser(null); setEditResult(null); }
                        else { setEditingUser(u.email); setEditForm({ newEmail: '', newPassword: '', newName: '' }); setEditResult(null); }
                      }}
                      className="p-1.5 rounded-lg transition-all"
                      style={isEditing
                        ? { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }
                        : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#71717a' }}
                    >
                      {isEditing ? <X className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Edit form */}
                {isEditing && (
                  <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                        <input
                          type="text"
                          placeholder={`Name (current: ${u.name})`}
                          value={editForm.newName}
                          onChange={e => setEditForm(f => ({ ...f, newName: e.target.value }))}
                          className="w-full bg-black/30 border border-white/8 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                        <input
                          type="email"
                          placeholder={`Email (current: ${u.email})`}
                          value={editForm.newEmail}
                          onChange={e => setEditForm(f => ({ ...f, newEmail: e.target.value }))}
                          className="w-full bg-black/30 border border-white/8 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50"
                        />
                      </div>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                        <input
                          type="password"
                          placeholder="New password (min 8 chars)"
                          value={editForm.newPassword}
                          onChange={e => setEditForm(f => ({ ...f, newPassword: e.target.value }))}
                          className="w-full bg-black/30 border border-white/8 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 font-mono tracking-widest"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleEditSave(u.email)}
                      disabled={editSaving}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: '#fff', boxShadow: '0 0 16px rgba(99,102,241,0.25)' }}
                    >
                      {editSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      Save & Generate Vercel Snippet
                    </button>

                    {editResult && (
                      <div className={`rounded-xl p-3 space-y-2 ${editResult.ok ? 'border-emerald-500/25' : 'border-red-500/25'}`}
                        style={{ background: editResult.ok ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)', border: `1px solid ${editResult.ok ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                        <p className={`text-xs font-medium ${editResult.ok ? 'text-emerald-400' : 'text-red-400'}`}>
                          {editResult.msg}
                        </p>
                        {editResult.json && (
                          <div className="relative">
                            <pre className="text-[10px] text-zinc-400 font-mono p-3 rounded-lg overflow-x-auto"
                              style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                              {`ADMIN_USERS=${editResult.json}`}
                            </pre>
                            <button
                              onClick={() => copyText(`ADMIN_USERS=${editResult.json}`, 'cred')}
                              className="absolute top-2 right-2 p-1.5 rounded-lg"
                              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                              {copied === 'cred' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                            </button>
                          </div>
                        )}
                        {editResult.ok && (
                          <p className="text-[10px] text-zinc-500">
                            ⚠️ Copy the snippet above → Vercel → Environment Variables → update ADMIN_USERS → Redeploy
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

}

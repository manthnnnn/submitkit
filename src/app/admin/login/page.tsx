'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Lock,
  Unlock,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  KeyRound,
  Mail,
  Cpu,
  Terminal,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { BrandIcon } from '@/components/ui/logo';

export default function AdminLogin() {
  const [authMode, setAuthMode] = useState<'master' | 'team'>('master');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authMode === 'team') {
      emailRef.current?.focus();
    } else {
      passwordRef.current?.focus();
    }
  }, [authMode]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleQuickFill = () => {
    setError('');
    if (authMode === 'master') {
      setPassword('9DtsXVfFGTu@4I');
    } else {
      setEmail('manthan@submitkit.in');
      setPassword('9DtsXVfFGTu@4I');
    }
    passwordRef.current?.focus();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authMode === 'team' && !email.trim()) {
      setError('Please enter your team email address');
      triggerShake();
      emailRef.current?.focus();
      return;
    }

    if (!password.trim()) {
      setError('Please enter the security passkey');
      triggerShake();
      passwordRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: authMode === 'team' ? email.trim() : undefined,
          password: password.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setUnlocked(true);
        setUserRole(data.role || 'SUPER_ADMIN');
        const target = data?.role === 'CONTENT_ADMIN' ? '/admin/projects' : '/admin';
        setTimeout(() => {
          window.location.href = target;
        }, 550);
      } else {
        setError(data.error || 'Authentication rejected. Check credentials.');
        triggerShake();
        setPassword('');
        passwordRef.current?.focus();
      }
    } catch {
      setError('Connection failed. Verify server is running on localhost.');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 select-none overflow-hidden font-sans"
      style={{
        background: 'linear-gradient(180deg, #FAF6EE 0%, #F5EFE6 50%, #FAF6EE 100%)',
      }}
    >
      {/* ── Soft Ambient Floating Orbs (Matches Frontend) ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden>
        <div
          className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-[100px] opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(13, 148, 136, 0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full blur-[90px] opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div
        className={`w-full max-w-[440px] transition-all duration-300 ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* ── Outer 3D Ivory Glass Shell (Soft Beige Theme) ── */}
        <div
          className="relative rounded-3xl p-6 sm:p-8 border transition-all duration-500 overflow-hidden"
          style={{
            background:
              'linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 251, 247, 0.95) 45%, rgba(246, 252, 250, 0.98) 100%)',
            borderColor: unlocked ? 'rgba(5, 150, 105, 0.4)' : '#E8E1D5',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: unlocked
              ? '0 20px 60px -10px rgba(5, 150, 105, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.95)'
              : '0 20px 50px -12px rgba(15, 23, 42, 0.10), 0 4px 14px -2px rgba(13, 148, 136, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
          }}
        >
          {/* Top Iridescent Jewel Accent Rule */}
          <div
            className="absolute top-0 left-0 right-0 h-[3.5px] transition-all duration-500"
            style={{
              background: unlocked
                ? 'linear-gradient(90deg, #059669 0%, #10B981 100%)'
                : 'linear-gradient(90deg, #0D9488 0%, #14B8A6 35%, #F59E0B 70%, #059669 100%)',
            }}
          />

          {/* ── Localhost Enclave Live Status Indicator ── */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold text-teal-900 bg-teal-50 border border-teal-200/80 shadow-xs uppercase tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              <span>
                {unlocked
                  ? `Authenticated [${userRole}]`
                  : 'Localhost Enclave · 127.0.0.1'}
              </span>
            </div>

            <span className="text-[11px] text-slate-500 font-mono tracking-wider flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-slate-400" />
              PORT :3000
            </span>
          </div>

          {/* ── Brand & Security Icon ── */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-3.5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm"
                style={{
                  background: unlocked ? 'var(--emerald-50)' : 'var(--teal-50)',
                  border: `1px solid ${unlocked ? 'var(--emerald-100)' : 'var(--teal-100)'}`,
                }}
              >
                {unlocked ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-in zoom-in-75 duration-300" />
                ) : (
                  <Lock className="w-7 h-7 text-teal-700" />
                )}
              </div>
            </div>

            <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight leading-tight m-0">
              Submit<span className="text-teal-700">Kit</span> Admin
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-[280px] leading-relaxed">
              {unlocked
                ? 'Credentials verified. Launching operational console...'
                : 'Zero-trust console restricted exclusively to localhost.'}
            </p>
          </div>

          {/* ── Mode Switcher Pills ── */}
          {!unlocked && (
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 mb-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('master');
                  setError('');
                }}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  authMode === 'master'
                    ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5 text-teal-700" />
                <span>Master Passkey</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('team');
                  setError('');
                }}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  authMode === 'team'
                    ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-teal-700" />
                <span>Team Account</span>
              </button>
            </div>
          )}

          {/* ── Login Form ── */}
          <form onSubmit={handleLogin} className="space-y-4">
            {authMode === 'team' && (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="manthan@submitkit.in"
                    disabled={loading || unlocked}
                    className="w-full bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl pl-10 pr-3.5 py-2.5 border border-slate-200/90 focus:border-teal-600 focus:ring-3 focus:ring-teal-500/15 outline-none transition-all shadow-xs"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  {authMode === 'master' ? 'Master Security Passkey' : 'Account Password'}
                </label>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-[11px] text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-1 cursor-pointer font-bold"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Auto-fill Local Key
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  ref={passwordRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={
                    authMode === 'master'
                      ? 'Enter 9DtsXVfFGTu@4I or secret key'
                      : 'Enter password'
                  }
                  disabled={loading || unlocked}
                  className="w-full bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl pl-10 pr-10 py-2.5 border border-slate-200/90 focus:border-teal-600 focus:ring-3 focus:ring-teal-500/15 outline-none transition-all font-mono tracking-tight shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || unlocked}
              className="group relative w-full flex items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98] shadow-md hover:shadow-lg overflow-hidden cursor-pointer"
              style={{
                minHeight: '46px',
                background: unlocked
                  ? 'linear-gradient(135deg, #059669 0%, #10B981 100%)'
                  : 'linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #065F59 100%)',
                boxShadow:
                  '0 8px 24px -4px rgba(13, 148, 136, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.28)',
              }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : unlocked ? (
                <div className="flex items-center gap-2">
                  <Unlock className="w-4 h-4" />
                  <span>Enclave Unlocked</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Authorize &amp; Launch Console</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              )}
            </button>
          </form>

          {/* ── Footer Localhost Safeguard Notice ── */}
          <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              Localhost Node Only
            </span>
            <span className="text-slate-600 font-mono font-bold">v2.4 Production</span>
          </div>
        </div>
      </div>
    </div>
  );
}

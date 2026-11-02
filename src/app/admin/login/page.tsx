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
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 select-none overflow-hidden bg-[#050608] font-sans">
      {/* ── 3D Ambient Backdrop Mesh ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Dynamic Glowing Aurora Orbs */}
        <div
          className="absolute -top-36 left-1/4 w-[650px] h-[550px] rounded-full blur-[140px] opacity-25"
          style={{
            background:
              'radial-gradient(circle, #0D9488 0%, #059669 45%, transparent 75%)',
          }}
        />
        <div
          className="absolute -bottom-40 right-1/4 w-[550px] h-[450px] rounded-full blur-[130px] opacity-20"
          style={{
            background:
              'radial-gradient(circle, #D97706 0%, #0D9488 40%, transparent 75%)',
          }}
        />
      </div>

      <div
        className={`w-full max-w-[440px] transition-all duration-300 ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* ── Outer 3D Glass Shell ── */}
        <div
          className="relative rounded-[32px] p-6 sm:p-8 border shadow-2xl backdrop-blur-3xl overflow-hidden transition-all duration-500"
          style={{
            background:
              'linear-gradient(180deg, rgba(17, 20, 28, 0.82) 0%, rgba(9, 10, 14, 0.94) 100%)',
            borderColor: unlocked
              ? 'rgba(52, 211, 153, 0.5)'
              : 'rgba(255, 255, 255, 0.1)',
            boxShadow: unlocked
              ? '0 0 80px rgba(16, 185, 129, 0.3), 0 25px 60px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
              : '0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(13, 148, 136, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          }}
        >
          {/* Top Iridescent Status Light Bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-500"
            style={{
              background: unlocked
                ? 'linear-gradient(90deg, #10B981, #34D399, #10B981)'
                : 'linear-gradient(90deg, #0D9488 0%, #14B8A6 40%, #D97706 70%, #059669 100%)',
            }}
          />

          {/* ── Localhost Enclave Live Status Indicator ── */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all"
              style={{
                background: unlocked
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(13, 148, 136, 0.12)',
                border: `1px solid ${
                  unlocked
                    ? 'rgba(16, 185, 129, 0.4)'
                    : 'rgba(13, 148, 136, 0.28)'
                }`,
                color: unlocked ? '#34d399' : '#2dd4bf',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span>
                {unlocked
                  ? `Authenticated [${userRole}]`
                  : 'LOCAL ENCLAVE · 127.0.0.1'}
              </span>
            </div>

            <span className="text-[10px] text-zinc-500 font-mono tracking-wider flex items-center gap-1">
              <Cpu className="w-3 h-3 text-zinc-400" />
              PORT :3000
            </span>
          </div>

          {/* ── Brand & Security Avatar ── */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-3.5 group">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl"
                style={{
                  background: unlocked
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3))'
                    : 'linear-gradient(135deg, rgba(13, 148, 136, 0.2), rgba(15, 23, 42, 0.8))',
                  border: `1px solid ${
                    unlocked
                      ? 'rgba(52, 211, 153, 0.6)'
                      : 'rgba(13, 148, 136, 0.35)'
                  }`,
                  boxShadow: unlocked
                    ? '0 0 30px rgba(16, 185, 129, 0.35)'
                    : '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                }}
              >
                {unlocked ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-in zoom-in-75 duration-300" />
                ) : (
                  <Lock className="w-7 h-7 text-teal-400 transition-transform group-hover:scale-110" />
                )}
              </div>
            </div>

            <h1 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
              SubmitKit <span className="text-teal-400">Admin HUD</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-[280px]">
              {unlocked
                ? 'Security clearance confirmed. Redirecting to console...'
                : 'Zero-trust management console isolated to localhost.'}
            </p>
          </div>

          {/* ── Mode Switcher Pills ── */}
          {!unlocked && (
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800/80 mb-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('master');
                  setError('');
                }}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  authMode === 'master'
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
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
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Team Login</span>
              </button>
            </div>
          )}

          {/* ── Login Form ── */}
          <form onSubmit={handleLogin} className="space-y-4">
            {authMode === 'team' && (
              <div>
                <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="manthan@submitkit.in"
                    disabled={loading || unlocked}
                    className="w-full bg-zinc-900/90 text-sm text-white placeholder:text-zinc-600 rounded-xl pl-10 pr-3.5 py-2.5 border border-zinc-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                  {authMode === 'master' ? 'Master Security Key' : 'Account Password'}
                </label>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-[10px] text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Sparkles className="w-3 h-3" />
                  Auto-fill Local Key
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                  className="w-full bg-zinc-900/90 text-sm text-white placeholder:text-zinc-600 rounded-xl pl-10 pr-10 py-2.5 border border-zinc-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-mono tracking-tight"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
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
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || unlocked}
              className="group relative w-full flex items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98] shadow-lg hover:shadow-teal-900/30 overflow-hidden cursor-pointer"
              style={{
                minHeight: '46px',
                background: unlocked
                  ? 'linear-gradient(135deg, #10B981, #059669)'
                  : 'linear-gradient(135deg, #0D9488 0%, #0F766E 60%, #065F59 100%)',
                boxShadow: unlocked
                  ? '0 0 30px rgba(16, 185, 129, 0.4)'
                  : '0 8px 24px -4px rgba(13, 148, 136, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
          <div className="mt-6 pt-4 border-t border-zinc-800/70 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              Localhost Node Only
            </span>
            <span className="text-zinc-400 font-mono">v2.4 Pro</span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, KeyRound } from 'lucide-react';
import { BrandIcon } from '@/components/ui/logo';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Enter your admin key');
      triggerShake();
      inputRef.current?.focus();
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // iOS unlock celebration state
        setUnlocked(true);
        // Instant top-level navigation with fresh cookie
        setTimeout(() => {
          window.location.href = '/admin';
        }, 350);
      } else {
        const data = await res.json();
        setError(data.error || 'Incorrect passcode');
        triggerShake();
        setPassword('');
        inputRef.current?.focus();
      }
    } catch {
      setError('Connection failed. Please retry.');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 select-none overflow-hidden bg-[#070709]">
      {/* iOS Dynamic Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[550px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, #10b981 70%, transparent 100%)' }}
        />
        <div
          className="absolute -bottom-40 right-1/4 w-[500px] h-[450px] rounded-full blur-[120px] opacity-15"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
        />
      </div>

      {/* Main iOS Glass Container */}
      <div
        className={`w-full max-w-[420px] transition-all duration-300 ${shake ? 'animate-shake' : ''}`}
      >
        <div
          className="relative rounded-[32px] p-8 border shadow-2xl backdrop-blur-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(30, 30, 36, 0.72) 0%, rgba(14, 14, 18, 0.85) 100%)',
            borderColor: unlocked ? 'rgba(52, 211, 153, 0.4)' : 'rgba(255, 255, 255, 0.12)',
            boxShadow: unlocked
              ? '0 0 60px rgba(16, 185, 129, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)'
              : '0 30px 60px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* iOS Status Pill */}
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all"
              style={{
                background: unlocked ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${unlocked ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                color: unlocked ? '#34d399' : '#a1a1aa',
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{unlocked ? 'Security Verified' : 'SubmitKit Secure Enclave'}</span>
            </div>
          </div>

          {/* Animated Lock Icon */}
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className="w-16 h-16 rounded-[22px] flex items-center justify-center mb-4 transition-all duration-300 relative shadow-inner"
              style={{
                background: unlocked
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                border: `1px solid ${unlocked ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.15)'}`,
                boxShadow: unlocked ? '0 0 30px rgba(16,185,129,0.5)' : '0 10px 20px rgba(0,0,0,0.3)',
              }}
            >
              {unlocked ? (
                <Unlock className="w-7 h-7 text-white animate-in zoom-in-50 duration-200" />
              ) : (
                <Lock className="w-7 h-7 text-zinc-300" />
              )}
            </div>

            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-display">
              {unlocked ? 'Unlocked' : 'Administrator Passcode'}
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-[260px] leading-relaxed">
              {unlocked
                ? 'Launching console...'
                : 'Enter your master security key to decrypt and open the management dashboard.'}
            </p>
          </div>

          {/* Passcode Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <div
                className="flex items-center rounded-2xl transition-all duration-200 overflow-hidden"
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: error
                    ? '1px solid rgba(239, 68, 68, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
                }}
              >
                <div className="pl-4 text-zinc-500">
                  <KeyRound className="w-4 h-4" />
                </div>

                <input
                  ref={inputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={loading || unlocked}
                  placeholder="Master Passcode"
                  className="w-full bg-transparent px-3 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none font-mono tracking-wider"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="pr-3 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>

                <button
                  type="submit"
                  disabled={loading || unlocked || !password}
                  className="mr-2 w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:scale-100 active:scale-95 shrink-0"
                  style={{
                    background: unlocked
                      ? '#10b981'
                      : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: '#ffffff',
                    boxShadow: '0 2px 8px rgba(99,102,241,0.35)',
                  }}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-xs text-center mt-2 font-medium animate-in fade-in slide-in-from-top-1">
                  {error}
                </p>
              )}
            </div>

            {/* iOS style unlock button */}
            <button
              type="submit"
              disabled={loading || unlocked}
              className="w-full py-3.5 px-4 rounded-2xl text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
              style={{
                background: unlocked
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
            >
              {unlocked ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-200" />
                  <span>Access Granted — Opening Console</span>
                </>
              ) : loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Decrypting Session...</span>
                </>
              ) : (
                <span>Unlock Console</span>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>SubmitKit OS 2.0</span>
            </span>
            <span className="font-mono text-zinc-600">v2.16-production</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </div>
  );
}

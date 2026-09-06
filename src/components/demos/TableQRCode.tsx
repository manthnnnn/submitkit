"use client";

import { useState } from "react";

interface TableQRCodeProps {
  url: string;
  size?: number;
  className?: string;
}

export default function TableQRCode({ url, size = 180, className = "" }: TableQRCodeProps) {
  const [loaded,  setLoaded]  = useState(false);
  const [errored, setErrored] = useState(false);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size * 2}x${size * 2}&data=${encodeURIComponent(url)}&color=0F172A&bgcolor=FFFFFF&margin=4`;

  if (errored) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`bg-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-500 ${className}`}
      >
        <span className="text-2xl mb-1">📷</span>
        <span className="text-[10px] text-center px-2 font-medium">QR unavailable</span>
      </div>
    );
  }

  return (
    <div style={{ width: size, height: size, position: 'relative' }} className={className}>
      {!loaded && (
        <div
          style={{ width: size, height: size }}
          className="bg-slate-800 animate-pulse rounded-xl flex items-center justify-center absolute inset-0"
        >
          <span className="text-xs text-slate-400 font-mono">Generating QR…</span>
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={qrUrl}
        alt={`QR Code for table — scan to view menu`}
        width={size}
        height={size}
        crossOrigin="anonymous"
        onLoad={() => setLoaded(true)}
        onError={() => { setLoaded(true); setErrored(true); }}
        className={`rounded-xl shadow-md transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: size, height: size, display: 'block' }}
      />
    </div>
  );
}

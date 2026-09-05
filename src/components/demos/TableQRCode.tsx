"use client";

import { useState } from "react";

interface TableQRCodeProps {
  url: string;
  size?: number;
  className?: string;
}

export default function TableQRCode({ url, size = 180, className = "" }: TableQRCodeProps) {
  const [loaded, setLoaded] = useState(false);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size * 2}x${size * 2}&data=${encodeURIComponent(url)}&color=0F172A&bgcolor=FFFFFF&margin=4`;

  return (
    <div style={{ width: size, height: size, position: 'relative' }} className={className}>
      {!loaded && (
        <div 
          style={{ width: size, height: size }} 
          className="bg-slate-800 animate-pulse rounded-xl flex items-center justify-center absolute inset-0"
        >
          <span className="text-xs text-slate-400 font-mono">Generating QR...</span>
        </div>
      )}
      <img
        src={qrUrl}
        alt={`QR Code for ${url}`}
        width={size}
        height={size}
        onLoad={() => setLoaded(true)}
        className={`rounded-xl shadow-md transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: size, height: size, display: 'block' }}
      />
    </div>
  );
}

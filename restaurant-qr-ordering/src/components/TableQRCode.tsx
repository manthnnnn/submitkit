"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface TableQRCodeProps {
  url: string;
  size?: number;
  className?: string;
}

export default function TableQRCode({ url, size = 180, className = "" }: TableQRCodeProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    if (!url) return;
    QRCode.toDataURL(url, {
      width: size * 2, // retina quality
      margin: 1,
      color: {
        dark: "#0F172A",
        light: "#FFFFFF",
      },
    })
      .then((data) => setQrDataUrl(data))
      .catch((err) => console.error("Error generating QR code:", err));
  }, [url, size]);

  if (!qrDataUrl) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className={`bg-slate-100 animate-pulse rounded-xl flex items-center justify-center ${className}`}
      >
        <span className="text-xs text-slate-400">Generating QR...</span>
      </div>
    );
  }

  return (
    <img
      src={qrDataUrl}
      alt="Table QR Code"
      width={size}
      height={size}
      className={`rounded-xl shadow-sm ${className}`}
    />
  );
}

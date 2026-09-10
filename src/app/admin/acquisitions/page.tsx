'use client';

import React from 'react';
import Link from 'next/link';

export default function AcquisitionsAdminPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">GitHub Acquisition Scanner</h1>
        <p className="text-slate-400">This feature has been replaced by the Blueprint Generator.</p>
        <Link href="/blueprint" className="inline-block px-6 py-3 bg-blue-600 rounded-xl text-white font-medium">
          Go to Blueprint Generator
        </Link>
      </div>
    </div>
  );
}

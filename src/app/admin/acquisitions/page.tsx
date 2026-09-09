'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Plus, Loader2, AlertTriangle, ExternalLink, Activity } from 'lucide-react';
import { ProjectAcquisition } from '@/lib/benchmark/types';

export default function AcquisitionsAdminPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [acquisitions, setAcquisitions] = useState<ProjectAcquisition[]>([]);

  // We mock fetching existing acquisitions for now, as we need a GET endpoint.
  // We'll just display the ones we add in this session if we don't build the GET endpoint.

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/acquisitions/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setAcquisitions([data.data, ...acquisitions]);
      setRepoUrl('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Shield className="text-blue-500" />
          Acquisitions Pipeline
        </h1>
        <p className="text-zinc-400 mt-2">Scan open-source repositories to evaluate them for commercial adaptation.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Add Candidate</h2>
        <form onSubmit={handleScan} className="flex gap-4">
          <input 
            type="url"
            required
            placeholder="https://github.com/owner/repo"
            className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            value={repoUrl}
            onChange={e => setRepoUrl(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            Deep Scan
          </button>
        </form>
        {error && <p className="text-red-400 mt-3 text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4" />{error}</p>}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/50 border-b border-zinc-800 text-sm text-zinc-400">
            <tr>
              <th className="p-4 font-medium">Candidate</th>
              <th className="p-4 font-medium">License</th>
              <th className="p-4 font-medium">Score</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {acquisitions.map(acq => (
              <tr key={acq.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="p-4">
                  <div className="font-bold">{acq.candidate_title}</div>
                  <div className="text-xs text-zinc-500 mt-1">{acq.category}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold border ${
                    acq.license_status === 'VERIFIED_COMMERCIAL' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                    acq.license_status === 'RESTRICTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                  }`}>
                    {acq.license_spdx || 'UNKNOWN'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="font-bold">{acq.benchmark_score}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {acq.status}
                  </span>
                </td>
                <td className="p-4">
                  <a href={acq.repo_url} target="_blank" rel="noreferrer" className="p-2 hover:bg-zinc-800 rounded inline-flex text-zinc-400 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            ))}
            {acquisitions.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-500">
                  No candidates in pipeline. Scan a repository to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

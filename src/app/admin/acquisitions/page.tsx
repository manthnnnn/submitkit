import { createAdminClient } from '@/lib/supabase/admin';
import { unstable_cache } from 'next/cache';
import { TrendingUp, Globe, Smartphone, Laptop, Share2, Compass, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acquisition Channels | SubmitKit Admin',
  robots: 'noindex, nofollow',
};

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

const getCachedAcquisitions = unstable_cache(
  async () => {
    const supabase = createAdminClient();
    const { data: views } = await supabase
      .from('page_views')
      .select('referrer, device, created_at')
      .order('created_at', { ascending: false })
      .limit(2000);

    const rawViews = views || [];
    const channelMap: Record<string, number> = {
      'Direct / Bookmarks': 0,
      'Google / Search': 0,
      'Instagram / Reels': 0,
      'YouTube / Video': 0,
      'WhatsApp / Groups': 0,
      'Other Referrals': 0,
    };

    let mobileCount = 0;
    let desktopCount = 0;

    for (const v of rawViews) {
      const ref = (v.referrer || '').toLowerCase();
      const dev = (v.device || '').toLowerCase();

      if (dev.includes('mobile') || dev.includes('android') || dev.includes('iphone')) mobileCount++;
      else desktopCount++;

      if (!ref) {
        channelMap['Direct / Bookmarks']++;
      } else if (ref.includes('google') || ref.includes('bing') || ref.includes('search')) {
        channelMap['Google / Search']++;
      } else if (ref.includes('instagram') || ref.includes('ig')) {
        channelMap['Instagram / Reels']++;
      } else if (ref.includes('youtube') || ref.includes('youtu.be')) {
        channelMap['YouTube / Video']++;
      } else if (ref.includes('whatsapp') || ref.includes('wa.me')) {
        channelMap['WhatsApp / Groups']++;
      } else {
        channelMap['Other Referrals']++;
      }
    }

    const total = rawViews.length || 1;
    const channels = Object.entries(channelMap)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    return {
      channels,
      totalViews: rawViews.length,
      mobileCount,
      desktopCount,
    };
  },
  ['admin-acquisitions-metrics'],
  { revalidate: 60, tags: ['analytics'] }
);

export default async function AcquisitionsAdminPage() {
  const { channels, totalViews, mobileCount, desktopCount } = await getCachedAcquisitions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2.5">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
            Acquisition Channels
          </h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            Where your student visitors and buyers are coming from (last 2,000 visits)
          </p>
        </div>
        <div className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
          {totalViews.toLocaleString()} Tracked Hits
        </div>
      </div>

      {/* Device summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 border" style={cardStyle}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-indigo-400" /> Mobile Traffic
            </span>
            <span className="text-lg font-bold text-white">
              {Math.round((mobileCount / (totalViews || 1)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{ width: `${Math.round((mobileCount / (totalViews || 1)) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">{mobileCount.toLocaleString()} visits from mobile devices</p>
        </div>

        <div className="rounded-2xl p-5 border" style={cardStyle}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Laptop className="h-4 w-4 text-emerald-400" /> Desktop / Laptop Traffic
            </span>
            <span className="text-lg font-bold text-white">
              {Math.round((desktopCount / (totalViews || 1)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${Math.round((desktopCount / (totalViews || 1)) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">{desktopCount.toLocaleString()} visits from desktop workstations</p>
        </div>
      </div>

      {/* Breakdown list */}
      <div className="rounded-2xl overflow-hidden" style={cardStyle}>
        <div className="p-5 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white">Source Attribution Breakdown</h2>
        </div>
        <div className="p-5 space-y-4">
          {channels.map((ch, idx) => (
            <div key={ch.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-200 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[10px] text-zinc-400 font-mono">
                    {idx + 1}
                  </span>
                  {ch.name}
                </span>
                <span className="font-mono text-zinc-400">
                  <strong className="text-white">{ch.count}</strong> visits ({ch.percentage}%)
                </span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${ch.percentage}%`,
                    background:
                      idx === 0
                        ? 'linear-gradient(90deg, #6366f1, #818cf8)'
                        : idx === 1
                        ? 'linear-gradient(90deg, #10b981, #34d399)'
                        : idx === 2
                        ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                        : 'rgba(255,255,255,0.2)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

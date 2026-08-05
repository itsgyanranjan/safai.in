import React from 'react';
import { AlertTriangle, ShieldCheck, Info, Flame, MapPin } from 'lucide-react';

export const HotspotCard = ({ hotspot }) => {
  const isHigh = hotspot.risk_level === 'HIGH';
  const isMedium = hotspot.risk_level === 'MEDIUM';

  const badgeBg = isHigh
    ? 'bg-red-500/10 text-red-400 border-red-500/30'
    : isMedium
    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

  const cardBorder = isHigh
    ? 'border-red-500/40 hover:border-red-500/60 shadow-lg shadow-red-500/5'
    : isMedium
    ? 'border-amber-500/30 hover:border-amber-500/50'
    : 'border-emerald-500/30 hover:border-emerald-500/50';

  const IconComponent = isHigh ? Flame : isMedium ? AlertTriangle : ShieldCheck;

  return (
    <div className={`bg-[#111827]/90 rounded-2xl p-5 border ${cardBorder} transition-all duration-300 flex flex-col justify-between`}>
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${badgeBg} border`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#22C55E]" />
                {hotspot.ward}
              </h3>
              <p className="text-xs text-[#9CA3AF] font-medium">{hotspot.area}</p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeBg}`}>
            {hotspot.risk_level} RISK
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-[#1A2332] rounded-xl border border-white/5">
          <div>
            <p className="text-[11px] text-[#9CA3AF] font-medium">Complaints (14d)</p>
            <p className="text-xl font-black text-white">{hotspot.complaint_count}</p>
          </div>
          <div>
            <p className="text-[11px] text-[#9CA3AF] font-medium">Primary Issue</p>
            <p className="text-xs font-bold text-[#22C55E] truncate">{hotspot.primary_category}</p>
          </div>
        </div>

        {/* AI Reason Explanation */}
        <div className="bg-[#0B0F14]/70 rounded-xl p-3 border border-white/5 text-xs text-[#D1D5DB]">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
            <Info className="w-3.5 h-3.5" />
            <span>AI Risk Explanation:</span>
          </div>
          <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
            "{hotspot.reason}"
          </p>
        </div>
      </div>
    </div>
  );
};

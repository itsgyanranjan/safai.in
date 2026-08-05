import React, { useState } from 'react';
import { Sparkles, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

export const RecommendationCard = ({ recommendation }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  const isHigh = recommendation.priority === 'HIGH';

  return (
    <div className={`p-5 rounded-2xl bg-[#111827] border ${acknowledged ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-white/10'} transition-all`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white leading-snug">{recommendation.title}</h4>
            {recommendation.ward && (
              <p className="text-xs text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#22C55E]" />
                Target Ward: <span className="text-white font-medium">{recommendation.ward}</span>
              </p>
            )}
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${isHigh ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
          {recommendation.priority} PRIORITY
        </span>
      </div>

      <p className="text-xs text-[#9CA3AF] leading-relaxed my-3 bg-[#1A2332]/60 p-3 rounded-xl border border-white/5">
        {recommendation.description}
      </p>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-md border border-[#22C55E]/20">
          AI Suggested Action
        </span>

        <button
          onClick={() => setAcknowledged(!acknowledged)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            acknowledged
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'bg-[#1A2332] text-white hover:bg-[#22C55E] hover:text-white border border-white/10'
          }`}
        >
          {acknowledged ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Acknowledged
            </>
          ) : (
            <>
              Execute Action
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

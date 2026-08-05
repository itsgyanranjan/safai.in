import React from 'react';
import { Award, CheckCircle, Clock } from 'lucide-react';

export const WardScoreCard = ({ scoreData }) => {
  const { ward, score, grade, total_complaints, resolved_complaints, pending_complaints } = scoreData;

  const barColor = score >= 90
    ? 'bg-emerald-500 shadow-emerald-500/50'
    : score >= 80
    ? 'bg-[#22C55E] shadow-[#22C55E]/50'
    : 'bg-amber-500 shadow-amber-500/50';

  return (
    <div className="bg-[#111827] rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{ward}</h4>
            <p className="text-[11px] text-[#9CA3AF] font-medium">{resolved_complaints}/{total_complaints} resolved</p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-baseline gap-1 justify-end">
            <span className="text-xl font-black text-white">{score}%</span>
            <span className="text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-1.5 py-0.5 rounded border border-[#22C55E]/20">{grade}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[#1A2332] h-2.5 rounded-full overflow-hidden my-3 p-0.5 border border-white/5">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-1">
        <span className="flex items-center gap-1 text-emerald-400">
          <CheckCircle className="w-3 h-3" />
          {resolved_complaints} Resolved
        </span>
        <span className="flex items-center gap-1 text-amber-400">
          <Clock className="w-3 h-3" />
          {pending_complaints} Pending
        </span>
      </div>
    </div>
  );
};

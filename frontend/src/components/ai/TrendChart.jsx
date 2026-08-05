import React from 'react';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

export const TrendChart = ({ trends }) => {
  return (
    <div className="bg-[#111827] rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AI Trend Analysis</h3>
            <p className="text-xs text-[#9CA3AF]">Category movement vs previous 7-day period</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-lg border border-[#22C55E]/20">
          Live Pattern Comparison
        </span>
      </div>

      <div className="space-y-3">
        {trends.map((item, idx) => {
          const isUp = item.direction === 'Increasing';
          const isDown = item.direction === 'Decreasing';

          const badgeBg = isUp
            ? 'bg-red-500/10 text-red-400 border-red-500/20'
            : isDown
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20';

          const IconComp = isUp ? TrendingUp : isDown ? TrendingDown : Minus;

          return (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#1A2332]/80 border border-white/5 hover:border-white/10 transition-all">
              <div>
                <p className="text-xs font-bold text-white">{item.category}</p>
                <p className="text-[10px] text-[#9CA3AF]">Current week volume vs last week</p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${badgeBg}`}>
                  <IconComp className="w-3.5 h-3.5" />
                  {item.symbol} {item.change_pct}%
                </span>
                <span className="text-[11px] font-semibold text-[#D1D5DB]">
                  {item.direction}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

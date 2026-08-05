import React from 'react';
import { FileText, CheckCircle2, Clock, MapPin, Tag } from 'lucide-react';

export const WeeklyReportCard = ({ report }) => {
  if (!report) return null;

  return (
    <div className="bg-[#111827] rounded-2xl p-6 border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#22C55E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{report.title || 'Weekly Cleanliness Report'}</h3>
            <p className="text-xs text-[#9CA3AF]">AI Generated Executive Summary for Administration</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
          Resolution Rate: {report.resolution_rate || '74%'}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
        <div className="bg-[#1A2332] p-3 rounded-xl border border-white/5">
          <p className="text-[11px] text-[#9CA3AF] font-medium">Total Complaints</p>
          <p className="text-2xl font-black text-white">{report.total_complaints}</p>
        </div>

        <div className="bg-[#1A2332] p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <p className="text-[11px] font-medium">Resolved</p>
          </div>
          <p className="text-2xl font-black text-emerald-400">{report.resolved_count}</p>
        </div>

        <div className="bg-[#1A2332] p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-1 text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <p className="text-[11px] font-medium">Pending</p>
          </div>
          <p className="text-2xl font-black text-amber-400">{report.pending_count}</p>
        </div>

        <div className="bg-[#1A2332] p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-1 text-red-400">
            <MapPin className="w-3.5 h-3.5" />
            <p className="text-[11px] font-medium">Highest Risk Ward</p>
          </div>
          <p className="text-base font-bold text-white truncate">{report.highest_risk_ward}</p>
        </div>
      </div>

      {/* Report Summary text */}
      <div className="bg-[#0B0F14] p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#22C55E]">
          <Tag className="w-4 h-4" />
          <span>AI Insight & Recommendation:</span>
        </div>
        <p className="text-xs text-[#D1D5DB] leading-relaxed">
          {report.summary_text}
        </p>
      </div>
    </div>
  );
};

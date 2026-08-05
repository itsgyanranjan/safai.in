import React from 'react';

export const StatCard = ({ icon: Icon, value, label, subtext, accent = 'green' }) => {
  return (
    <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">{value}</h3>
          <p className="text-sm font-semibold text-[#D1D5DB] mt-1">{label}</p>
          {subtext && (
            <p className="text-xs text-[#9CA3AF] mt-1 font-medium">{subtext}</p>
          )}
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E] group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#22C55E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';
import { StatCard } from '../components/StatCard';
import { TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck, MapPin, BarChart3, AlertCircle } from 'lucide-react';

export const PublicStats = () => {
  const [stats, setStats] = useState(null);
  const [wards, setWards] = useState([]);
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [statsRes, wardsRes, hotspotsRes] = await Promise.all([
          analyticsService.getStats(),
          analyticsService.getWards(),
          analyticsService.getHotspots()
        ]);
        setStats(statsRes);
        setWards(wardsRes);
        setHotspots(hotspotsRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">Public Transparency & Analytics</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">PUBLIC CLEANLINESS STATISTICS</h1>
        <p className="text-[#9CA3AF] text-sm max-w-2xl">
          Real-time sanitation performance metrics, ward scores, and predictive waste hotspot risk analysis across the city.
        </p>
      </div>

      {/* Main City Score Highlight */}
      <div className="glass-card p-8 rounded-3xl border border-[#22C55E]/30 bg-gradient-to-r from-[#1A2332] via-[#111827] to-[#1A2332] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center md:text-left">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#22C55E]/20 text-[#22C55E]">
            Verified Municipal Metric
          </span>
          <h2 className="text-3xl font-extrabold text-white">Overall City Cleanliness Index</h2>
          <p className="text-sm text-[#9CA3AF] max-w-lg">
            Calculated based on daily complaint resolution speed, waste vehicle pass frequency, and citizen feedback ratings.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#0B0F14] px-8 py-6 rounded-2xl border border-white/10 shadow-inner">
          <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center font-black">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <span className="text-5xl font-black text-white">94%</span>
            <span className="text-xs text-[#22C55E] font-bold block mt-1">Grade A+ (Excellent)</span>
          </div>
        </div>
      </div>

      {/* Stats Summary Grid */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={AlertCircle}
            value={stats.issues_reported.toLocaleString()}
            label="Total Issues Reported"
            subtext="Citizens reporting issues"
          />
          <StatCard
            icon={CheckCircle2}
            value={stats.issues_resolved.toLocaleString()}
            label="Issues Resolved"
            subtext="Transparent resolution"
          />
          <StatCard
            icon={ShieldCheck}
            value={stats.resolved_today.toString()}
            label="Resolved Today"
            subtext="Ground teams active"
          />
          <StatCard
            icon={BarChart3}
            value={`${stats.active_citizens.toLocaleString()}+`}
            label="Active Citizen Network"
            subtext="Driving community change"
          />
        </div>
      )}

      {/* Ward Performance Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">CLEANLINESS SCORE BY WARD</h2>
            <p className="text-xs text-[#9CA3AF]">Comparative ward rankings and resolution ratios</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          {wards.map((w, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#22C55E]" /> {w.name}
                </span>
                <span className="font-black text-[#22C55E]">{w.cleanliness_score}% Score</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-[#111827] overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#22C55E]/80 to-[#22C55E] rounded-full transition-all duration-500"
                  style={{ width: `${w.cleanliness_score}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-[#9CA3AF] pt-0.5">
                <span>Total Complaints: {w.total_complaints}</span>
                <span>Resolved: {w.resolved_complaints} ({Math.round((w.resolved_complaints/w.total_complaints)*100)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BASIC WASTE HOTSPOT ANALYTICS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">WASTE HOTSPOT RISK ANALYTICS</h2>
            <p className="text-xs text-[#9CA3AF]">Analytical data highlighting high-risk accumulation zones & recommendations</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Smart Risk Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotspots.map((h, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#22C55E]" /> {h.location}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    h.risk_level === 'HIGH'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {h.risk_level} RISK
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                <span>Recent Complaints: <strong className="text-white">{h.complaints_count}</strong></span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111827] border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#22C55E] tracking-wider block">
                  Actionable Recommendation:
                </span>
                <p className="text-xs text-[#D1D5DB] leading-relaxed">
                  "{h.recommendation}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Award, FileText, Activity, RefreshCw, CheckCircle, ShieldAlert } from 'lucide-react';
import { aiService } from '../services/aiService';
import { HotspotCard } from '../components/ai/HotspotCard';
import { RecommendationCard } from '../components/ai/RecommendationCard';
import { WardScoreCard } from '../components/ai/WardScoreCard';
import { TrendChart } from '../components/ai/TrendChart';
import { WeeklyReportCard } from '../components/ai/WeeklyReportCard';

export function AIDashboard() {
  const [loading, setLoading] = useState(true);
  const [hotspots, setHotspots] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [report, setReport] = useState(null);
  const [scores, setScores] = useState([]);
  const [trends, setTrends] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [hData, rData, repData, sData, tData] = await Promise.all([
        aiService.getHotspots(),
        aiService.getRecommendations(),
        aiService.getWeeklyReport(),
        aiService.getCleanlinessScore(),
        aiService.getTrends()
      ]);
      setHotspots(hData);
      setRecommendations(rData);
      setReport(repData);
      setScores(sData);
      setTrends(tData);
    } catch (error) {
      console.error('Error fetching AI analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#D1D5DB] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            AI Operations & Decision Support
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            SAFAI AI Insights Dashboard
          </h1>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            Automated waste hotspot detection, predictive priority scoring, ward cleanliness ratings, and data-driven municipal recommendations.
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A2332] text-white hover:bg-[#22C55E] font-semibold text-xs border border-white/10 transition-all shadow-lg"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh AI Engine
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <RefreshCw className="w-8 h-8 text-[#22C55E] animate-spin" />
          <p className="text-sm font-semibold text-[#9CA3AF]">Analyzing PostgreSQL Complaint Data with AI Engine...</p>
        </div>
      ) : (
        <>
          {/* Section 1: Executive Weekly Report */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#22C55E]" />
              Weekly AI Cleanliness Report
            </h2>
            <WeeklyReportCard report={report} />
          </section>

          {/* Section 2: AI Hotspots Detection */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-500" />
                  AI Waste Hotspots Detection
                </h2>
                <p className="text-xs text-[#9CA3AF]">Grouped by Ward, Area, Category, and Complaint Frequency with AI reasoning</p>
              </div>
              <span className="text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">
                {hotspots.filter(h => h.risk_level === 'HIGH').length} High Risk Wards Identified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotspots.map((hotspot, idx) => (
                <HotspotCard key={idx} hotspot={hotspot} />
              ))}
            </div>
          </section>

          {/* Section 3 & 4: Ward Cleanliness Scores & AI Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ward Cleanliness Scores */}
            <section className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#22C55E]" />
                  Ward Cleanliness Scores
                </h2>
                <p className="text-xs text-[#9CA3AF]">Multi-factor rating formula considering resolution rate & drive participation</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scores.map((scoreObj, idx) => (
                  <WardScoreCard key={idx} scoreData={scoreObj} />
                ))}
              </div>
            </section>

            {/* AI Action Recommendations */}
            <section className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#22C55E]" />
                  AI Action Recommendations
                </h2>
                <p className="text-xs text-[#9CA3AF]">Automated suggestions for resource deployment & sanitation scheduling</p>
              </div>

              <div className="space-y-3">
                {recommendations.map((rec, idx) => (
                  <RecommendationCard key={idx} recommendation={rec} />
                ))}
              </div>
            </section>
          </div>

          {/* Section 5: AI Trend Analysis */}
          <section className="space-y-4">
            <TrendChart trends={trends} />
          </section>
        </>
      )}
    </div>
  );
}

export default AIDashboard;

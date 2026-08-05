import React, { useState, useEffect } from 'react';
import { rewardService } from '../services/rewardService';
import { useAuth } from '../context/AuthContext';
import { Award, Trophy, ShieldCheck, Sparkles, CheckCircle2, Star } from 'lucide-react';

export const Rewards = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRewards, setUserRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaders, rewards] = await Promise.all([
          rewardService.getLeaderboard(),
          rewardService.getUserRewards()
        ]);
        setLeaderboard(leaders);
        setUserRewards(rewards);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPoints = user?.reward_points || 4250;

  const badges = [
    { title: 'First Report', description: 'Submitted first verified cleanliness issue', icon: CheckCircle2, unlocked: totalPoints >= 50 },
    { title: 'Cleanup Volunteer', description: 'Participated in a community cleanup drive', icon: ShieldCheck, unlocked: totalPoints >= 500 },
    { title: 'Cleanliness Champion', description: 'Earned 4,000+ civic contribution points', icon: Trophy, unlocked: totalPoints >= 4000 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">Civic Gamification & Gamified Impact</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">REWARDS & COMMUNITY LEADERBOARD</h1>
        <p className="text-[#9CA3AF] text-sm max-w-xl">
          Earn points for every reported issue, cleanup drive participation, and feedback rating.
        </p>
      </div>

      {/* Points & Badges Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* User Points Card */}
        <div className="glass-card p-6 rounded-3xl border border-[#22C55E]/30 bg-gradient-to-br from-[#1A2332] to-[#111827] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Your Balance</span>
            <Award className="w-6 h-6 text-[#22C55E]" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-white">{totalPoints.toLocaleString()} PTS</h2>
            <span className="text-xs font-semibold text-[#22C55E] block mt-1">Level 4: Cleanliness Champion</span>
          </div>
          <div className="pt-2 border-t border-white/10 text-[11px] text-[#9CA3AF]">
            Earn +50 pts per issue report & +100 pts per drive
          </div>
        </div>

        {/* Badges Grid */}
        <div className="md:col-span-2 glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#22C55E]" /> Unlocked Citizen Badges
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {badges.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    b.unlocked
                      ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-white'
                      : 'bg-[#111827] border-white/5 opacity-50 text-gray-500'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 ${b.unlocked ? 'text-[#22C55E]' : 'text-gray-500'}`} />
                  <h4 className="text-sm font-bold text-white">{b.title}</h4>
                  <p className="text-[10px] text-[#9CA3AF] mt-1 leading-snug">{b.description}</p>
                  <span className={`text-[10px] font-bold mt-2 block ${b.unlocked ? 'text-[#22C55E]' : 'text-gray-500'}`}>
                    {b.unlocked ? '✓ Unlocked' : 'Locked'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* LEADERBOARD TABLE */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">COMMUNITY LEADERBOARD</h2>
            <p className="text-xs text-[#9CA3AF]">Top civic contributors across Indore city</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#D1D5DB]">
              <thead className="bg-[#111827] text-xs font-bold text-[#9CA3AF] uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Citizen Name</th>
                  <th className="px-6 py-4">Badge Title</th>
                  <th className="px-6 py-4 text-right">Total Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leaderboard.map((item) => (
                  <tr key={item.rank} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-black">
                      <span className={`inline-flex w-7 h-7 rounded-lg items-center justify-center text-xs font-black ${
                        item.rank === 1 ? 'bg-amber-500 text-black' : item.rank === 2 ? 'bg-slate-300 text-black' : item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-[#111827] text-gray-400'
                      }`}>
                        #{item.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{item.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                        {item.badge}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-right text-white">{item.points.toLocaleString()} pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

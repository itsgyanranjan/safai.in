import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { complaintService } from '../services/complaintService';
import { StatCard } from '../components/StatCard';
import { ComplaintCard } from '../components/ComplaintCard';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Award, Users, Camera, ArrowRight, PlusCircle } from 'lucide-react';

export const CitizenDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserComplaints = async () => {
      try {
        const data = await complaintService.getComplaints({ mine: true });
        setComplaints(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserComplaints();
  }, []);

  const activeCount = complaints.filter(c => c.status !== 'RESOLVED').length;
  const resolvedCount = complaints.filter(c => c.status === 'RESOLVED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">Citizen Workspace</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Welcome, {user?.name || 'Citizen'}
          </h1>
          <p className="text-[#9CA3AF] text-sm mt-0.5">
            Track your submitted complaints, reward points, and joined community drives.
          </p>
        </div>

        {/* Quick Action */}
        <Link
          to="/report-issue"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-lg shadow-[#22C55E]/20 transition-all"
        >
          <Camera className="w-4 h-4" /> Report New Issue
        </Link>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={AlertCircle}
          value={activeCount.toString()}
          label="Active Complaints"
          subtext="Under review or in progress"
        />
        <StatCard
          icon={CheckCircle2}
          value={resolvedCount.toString()}
          label="Resolved Complaints"
          subtext="Sanitation completed"
        />
        <StatCard
          icon={Award}
          value={`${user?.reward_points ?? 0} pts`}

          label="Reward Points"
          subtext="Earned via civic action"
        />
        <StatCard
          icon={Users}
          value="2 Drives"
          label="Drives Joined"
          subtext="Community volunteer events"
        />
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          to="/report-issue"
          className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#22C55E]/40 flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Report Issue</h4>
              <p className="text-[10px] text-[#9CA3AF]">Upload photo & location</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#22C55E] transition-colors" />
        </Link>

        <Link
          to="/drives"
          className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#22C55E]/40 flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Cleanup Drives</h4>
              <p className="text-[10px] text-[#9CA3AF]">Register for drives</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#22C55E] transition-colors" />
        </Link>

        <Link
          to="/my-certificates"
          className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#22C55E]/40 flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">My Certificates</h4>
              <p className="text-[10px] text-[#9CA3AF]">Digital PDF Badges</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#22C55E] transition-colors" />
        </Link>

        <Link
          to="/rewards"
          className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#22C55E]/40 flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Rewards & Badges</h4>
              <p className="text-[10px] text-[#9CA3AF]">Leaderboard rank</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#22C55E] transition-colors" />
        </Link>
      </div>

      {/* Recent Complaints Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Recent Complaints</h3>
          <Link to="/my-reports" className="text-xs font-bold text-[#22C55E] hover:underline">
            View All Reports
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8 text-white">Loading your complaints...</div>
        ) : complaints.length === 0 ? (
          <div className="glass-card p-8 rounded-2xl border border-white/10 text-center space-y-3">
            <p className="text-sm text-[#9CA3AF]">No complaints reported yet.</p>
            <Link
              to="/report-issue"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#22C55E] text-white"
            >
              Report Your First Issue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaints.slice(0, 3).map(c => (
              <ComplaintCard key={c.id} complaint={c} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { complaintService } from '../services/complaintService';
import { ComplaintCard } from '../components/ComplaintCard';
import { Search, Filter, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyReports = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await complaintService.getComplaints();
        setComplaints(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const filtered = complaints.filter(c => {
    if (statusFilter === 'ALL') return true;
    return c.status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">Tracking Center</span>
          <h1 className="text-3xl font-black text-white">MY REPORTED ISSUES</h1>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Monitor resolution progress, assigned teams, and submit feedback on resolved reports.
          </p>
        </div>

        <Link
          to="/report-issue"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-md shadow-[#22C55E]/20"
        >
          <Camera className="w-4 h-4" /> Report New Issue
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[#111827] p-1.5 rounded-xl border border-white/10 text-xs font-semibold">
        {['ALL', 'SUBMITTED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-2 rounded-lg transition-all ${
              statusFilter === st
                ? 'bg-[#22C55E] text-white shadow'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Complaints Grid */}
      {loading ? (
        <div className="text-center py-12 text-white">Loading your reports...</div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-12 rounded-2xl border border-white/10 text-center space-y-3">
          <p className="text-sm text-[#9CA3AF]">No complaints found under this status filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(c => (
            <ComplaintCard key={c.id} complaint={c} />
          ))}
        </div>
      )}

    </div>
  );
};

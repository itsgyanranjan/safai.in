import React, { useState, useEffect } from 'react';
import { complaintService } from '../services/complaintService';
import { ComplaintCard } from '../components/ComplaintCard';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');
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
    const matchesSearch = c.complaint_id.toLowerCase().includes(search.toLowerCase()) ||
                          c.category.toLowerCase().includes(search.toLowerCase()) ||
                          c.address.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="space-y-2">
        <Link to="/admin-dashboard" className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to Admin Dashboard
        </Link>
        <h1 className="text-3xl font-black text-white">MANAGE MUNICIPAL COMPLAINTS</h1>
        <p className="text-xs text-[#9CA3AF]">
          Full list of citizen complaints reported across all wards in Indore city.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by ID, category, or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A2332] border border-white/10 text-white text-sm focus:outline-none focus:border-[#22C55E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-[#111827] p-1 rounded-xl border border-white/10 text-xs font-semibold">
          {['ALL', 'SUBMITTED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === st ? 'bg-[#22C55E] text-white shadow' : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-white">Loading complaints...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-2xl p-8 border border-white/10 text-[#9CA3AF]">
          No complaints found.
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

import React, { useState, useEffect } from 'react';
import { DriveCard } from '../components/DriveCard';
import { driveService } from '../services/driveService';
import { Search, Plus, Calendar, MapPin, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CleanupDrives = () => {
  const { isAdmin } = useAuth();
  const [drives, setDrives] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDrives = async () => {
    try {
      const data = await driveService.getDrives();
      setDrives(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const filteredDrives = drives.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">Community Engagement</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">CLEANUP DRIVES</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">
            Join hands with local volunteers, participate in neighborhood cleanliness drives, and earn 100 reward points per drive.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search drives by name or ward..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A2332] border border-white/10 text-white text-sm focus:outline-none focus:border-[#22C55E]"
          />
        </div>
      </div>

      {/* Featured Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#22C55E]/30 bg-gradient-to-r from-[#1A2332] via-[#111827] to-[#1A2332] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#22C55E]/20 text-[#22C55E]">
            Featured Mega Event
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Vijay Nagar Plastic-Free Drive</h2>
          <p className="text-sm text-[#D1D5DB] max-w-xl">
            Targeting 100+ volunteers for a massive single-day plastic cleanup drive across Vijay Nagar main food square and park pathways.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#9CA3AF] pt-2">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#22C55E]" /> Aug 15, 2026</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#22C55E]" /> Vijay Nagar, Indore</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#22C55E]" /> 78/100 Joined</span>
          </div>
        </div>
      </div>

      {/* Drives Grid */}
      {loading ? (
        <div className="text-center py-12 text-white">Loading drives...</div>
      ) : filteredDrives.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-2xl p-8 border border-white/10 text-[#9CA3AF]">
          No drives found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrives.map(drive => (
            <DriveCard key={drive.id} drive={drive} onDriveUpdated={fetchDrives} />
          ))}
        </div>
      )}

    </div>
  );
};

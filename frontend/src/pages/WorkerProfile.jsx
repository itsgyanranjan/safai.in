import React, { useState, useEffect } from 'react';
import { workerService } from '../services/workerService';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, MapPin, Award, CheckCircle2, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WorkerProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await workerService.getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-white">Loading profile...</div>;
  }

  const p = profile || {
    employee_id: 'EMP-2026-01',
    name: 'Ramesh Mohanty',
    email: 'ramesh.worker@safai.com',
    phone: '+91 98765 43210',
    department: 'Municipal Waste Operations',
    assigned_zone: 'Saheed Nagar Zone 1',
    status: 'Available',
    profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    assigned_tasks_count: 5,
    completed_tasks_count: 18,
    performance_score: 94,
    avg_resolution_hours: 3.2
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      <Link to="/worker/dashboard" className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8">
        
        {/* Top Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/10">
          <img
            src={p.profile_photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'}
            alt={p.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-[#22C55E]"
          />
          <div className="text-center sm:text-left space-y-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/20 text-[#22C55E] uppercase border border-[#22C55E]/30">
              Field Sanitation Worker
            </span>
            <h1 className="text-2xl font-black text-white">{p.name}</h1>
            <p className="text-xs text-[#9CA3AF] font-mono">Employee ID: {p.employee_id}</p>
            <p className="text-xs text-[#22C55E] font-semibold">{p.assigned_zone}</p>
          </div>
        </div>

        {/* Profile Info Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#111827] border border-white/5 space-y-1">
            <span className="text-[10px] text-[#9CA3AF] uppercase font-bold">Email Address</span>
            <p className="font-semibold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#22C55E]" /> {p.email}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#111827] border border-white/5 space-y-1">
            <span className="text-[10px] text-[#9CA3AF] uppercase font-bold">Phone Number</span>
            <p className="font-semibold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#22C55E]" /> {p.phone}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#111827] border border-white/5 space-y-1">
            <span className="text-[10px] text-[#9CA3AF] uppercase font-bold">Department</span>
            <p className="font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" /> {p.department}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#111827] border border-white/5 space-y-1">
            <span className="text-[10px] text-[#9CA3AF] uppercase font-bold">Current Worker Status</span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 inline-block">
              {p.status}
            </span>
          </div>
        </div>

        {/* Worker Performance Metrics */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-lg font-bold text-white">Worker Performance Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#111827] border border-white/5 text-center">
              <span className="text-2xl font-black text-white">{p.assigned_tasks_count || 5}</span>
              <span className="text-[10px] text-[#9CA3AF] font-bold uppercase block mt-1">Today's Tasks</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#111827] border border-white/5 text-center">
              <span className="text-2xl font-black text-[#22C55E]">{p.completed_tasks_count || 18}</span>
              <span className="text-[10px] text-[#9CA3AF] font-bold uppercase block mt-1">Total Completed</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#111827] border border-white/5 text-center">
              <span className="text-2xl font-black text-white">{p.avg_resolution_hours || 3.2} hrs</span>
              <span className="text-[10px] text-[#9CA3AF] font-bold uppercase block mt-1">Avg Resolution Time</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#111827] border border-white/5 text-center">
              <span className="text-2xl font-black text-[#22C55E]">{p.performance_score || 94}%</span>
              <span className="text-[10px] text-[#9CA3AF] font-bold uppercase block mt-1">Performance Score</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

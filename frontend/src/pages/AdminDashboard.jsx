import React, { useState, useEffect } from 'react';
import { complaintService } from '../services/complaintService';
import { vehicleService } from '../services/vehicleService';
import { driveService } from '../services/driveService';
import { workerService } from '../services/workerService';
import { StatCard } from '../components/StatCard';
import { ShieldCheck, Truck, Users, AlertCircle, CheckCircle2, Clock, UserPlus, Filter, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drives, setDrives] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const [complaintsData, vehiclesData, drivesData, workersData] = await Promise.all([
        complaintService.getComplaints(),
        vehicleService.getVehicles(),
        driveService.getDrives(),
        workerService.getWorkers()
      ]);
      setComplaints(complaintsData);
      setVehicles(vehiclesData);
      setDrives(drivesData);
      setWorkers(workersData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      const updated = await complaintService.updateStatus(complaintId, newStatus);
      setComplaints(prev => prev.map(c => c.id === complaintId ? updated : c));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignWorker = async (complaintId, workerId) => {
    if (!workerId) return;
    try {
      await workerService.assignTaskToWorker(complaintId, workerId);
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const pendingCount = complaints.filter(c => c.status === 'SUBMITTED' || c.status === 'ASSIGNED').length;
  const resolvedCount = complaints.filter(c => c.status === 'RESOLVED').length;
  const activeVehicles = vehicles.filter(v => v.status === 'Active').length;

  const filteredComplaints = complaints.filter(c => {
    if (statusFilter === 'ALL') return true;
    return c.status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Municipal Admin Control Panel
          </span>
          <h1 className="text-3xl font-black text-white">ADMIN DASHBOARD</h1>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Manage complaints triage, assign Field Workers, track vehicle routes & cleanup drives.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/ai-dashboard"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 hover:bg-[#22C55E]/20 flex items-center gap-2 shadow-lg shadow-[#22C55E]/10"
          >
            <Sparkles className="w-4 h-4 text-[#22C55E]" /> AI Insights & Hotspots
          </Link>
          <Link
            to="/manage-workers"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Workers Management ({workers.length})
          </Link>
          <Link
            to="/vehicles-teams"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#1A2332] text-white border border-white/10 hover:border-[#22C55E]/40 flex items-center gap-2"
          >
            <Truck className="w-4 h-4 text-[#22C55E]" /> Vehicles & GPS Map
          </Link>
        </div>
      </div>

      {/* 5 Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={AlertCircle}
          value={complaints.length.toString()}
          label="Total Complaints"
          subtext="All reported issues"
        />
        <StatCard
          icon={Clock}
          value={pendingCount.toString()}
          label="Pending Triage"
          subtext="Requires assignment"
        />
        <StatCard
          icon={CheckCircle2}
          value={resolvedCount.toString()}
          label="Resolved Issues"
          subtext="Action completed"
        />
        <StatCard
          icon={Users}
          value={workers.length.toString()}
          label="Field Workers"
          subtext="Active staff roster"
        />
        <StatCard
          icon={Truck}
          value={`${activeVehicles}/${vehicles.length}`}
          label="Active Vehicles"
          subtext="On GPS routes"
        />
      </div>

      {/* COMPLAINTS MANAGEMENT TABLE */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-white">Complaint Triage & Worker Assignment</h3>

          {/* Status filter buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-[#111827] p-1 rounded-xl border border-white/10 text-xs font-semibold">
            {['ALL', 'SUBMITTED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === st
                    ? 'bg-[#22C55E] text-white shadow'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#D1D5DB]">
              <thead className="bg-[#111827] text-xs font-bold text-[#9CA3AF] uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Complaint ID</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Reported By</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Assign Worker</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredComplaints.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-white">{item.complaint_id}</td>
                    <td className="px-6 py-4 font-semibold text-white">{item.category}</td>
                    <td className="px-6 py-4 text-[#9CA3AF] max-w-[180px] truncate">{item.address}</td>
                    <td className="px-6 py-4 text-white">{item.reported_by_name || 'Citizen'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.priority === 'HIGH' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        onChange={(e) => handleAssignWorker(item.complaint_id, e.target.value)}
                        defaultValue=""
                        className="px-2.5 py-1.5 rounded-xl bg-[#111827] border border-white/10 text-[#22C55E] font-bold text-xs focus:outline-none focus:border-[#22C55E]"
                      >
                        <option value="" disabled>
                          {item.assigned_team && item.assigned_team !== 'Unassigned' ? item.assigned_team : '-- Select Worker --'}
                        </option>
                        {workers.map(w => (
                          <option key={w.id} value={w.id}>
                            {w.name} ({w.assigned_zone})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-[#22C55E]"
                      >
                        <option value="SUBMITTED">SUBMITTED</option>
                        <option value="ASSIGNED">ASSIGNED</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        to={`/complaints/${item.id}`}
                        className="px-3 py-1.5 rounded-lg bg-[#111827] text-[#22C55E] font-bold border border-white/10 hover:bg-[#1A2332]"
                      >
                        View Detail
                      </Link>
                    </td>
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

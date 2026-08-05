import React, { useState, useEffect } from 'react';
import { workerService } from '../services/workerService';
import { complaintService } from '../services/complaintService';
import { ArrowLeft, UserPlus, Trash2, ShieldCheck, MapPin, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ManageWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // New worker modal/form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Municipal Waste Operations');
  const [assignedZone, setAssignedZone] = useState('Saheed Nagar Zone 1');
  const [formMsg, setFormMsg] = useState('');

  // Assign task state
  const [selectedComplaint, setSelectedComplaint] = useState('');
  const [selectedWorker, setSelectedWorker] = useState('');

  const loadData = async () => {
    try {
      const [wData, cData] = await Promise.all([
        workerService.getWorkers(),
        complaintService.getComplaints()
      ]);
      setWorkers(wData);
      setComplaints(cData.filter(c => c.status === 'SUBMITTED' || c.status === 'ASSIGNED'));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateWorker = async (e) => {
    e.preventDefault();
    try {
      await workerService.createWorker({ name, email, phone, department, assigned_zone: assignedZone });
      setFormMsg('Worker account created successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setShowAddForm(false);
      loadData();
      setTimeout(() => setFormMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteWorker = async (id) => {
    if (!window.confirm('Are you sure you want to delete this worker account?')) return;
    try {
      await workerService.deleteWorker(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!selectedComplaint || !selectedWorker) return;
    try {
      await workerService.assignTaskToWorker(selectedComplaint, selectedWorker);
      alert('Task assigned successfully to worker!');
      setSelectedComplaint('');
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link to="/admin-dashboard" className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white mb-1">
            <ArrowLeft className="w-4 h-4" /> Back to Admin Dashboard
          </Link>
          <h1 className="text-3xl font-black text-white">FIELD WORKERS MANAGEMENT</h1>
          <p className="text-xs text-[#9CA3AF]">
            Create worker accounts, monitor performance metrics, and assign complaints to field staff.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#22C55E] text-white hover:bg-[#16A34A]"
        >
          <UserPlus className="w-4 h-4" /> {showAddForm ? 'Close Form' : '+ Add New Field Worker'}
        </button>
      </div>

      {formMsg && (
        <div className="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold">
          {formMsg}
        </div>
      )}

      {/* CREATE WORKER FORM */}
      {showAddForm && (
        <form onSubmit={handleCreateWorker} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 animate-in slide-in-from-top-2">
          <h3 className="text-lg font-bold text-white">Create New Field Worker Account</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Ramesh Mohanty"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="ramesh.worker@safai.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
              >
                <option value="Municipal Waste Operations">Municipal Waste Operations</option>
                <option value="Heritage & Temple Sanitation">Heritage & Temple Sanitation</option>
                <option value="Commercial & Tech Corridor">Commercial & Tech Corridor</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1">Assigned Zone</label>
              <select
                value={assignedZone}
                onChange={(e) => setAssignedZone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
              >
                <option value="Saheed Nagar Zone 1">Saheed Nagar Zone 1</option>
                <option value="Old Town Heritage Zone">Old Town Heritage Zone</option>
                <option value="Patia KIIT Square Zone">Patia KIIT Square Zone</option>
                <option value="Khandagiri Zone">Khandagiri Zone</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#22C55E] text-white font-bold text-xs hover:bg-[#16A34A]"
          >
            Create Worker Account
          </button>
        </form>
      )}

      {/* QUICK ASSIGN TASK SECTION */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-lg font-bold text-white">Assign Complaint to Worker</h3>

        <form onSubmit={handleAssignTask} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-[#9CA3AF] uppercase mb-1">Select Pending Complaint</label>
            <select
              value={selectedComplaint}
              onChange={(e) => setSelectedComplaint(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
            >
              <option value="">-- Choose Complaint --</option>
              {complaints.map(c => (
                <option key={c.id} value={c.complaint_id}>
                  {c.complaint_id} - {c.category} ({c.address})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#9CA3AF] uppercase mb-1">Select Field Worker</label>
            <select
              value={selectedWorker}
              onChange={(e) => setSelectedWorker(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
            >
              <option value="">-- Choose Worker --</option>
              {workers.map(w => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.assigned_zone})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#22C55E] text-white font-bold text-xs hover:bg-[#16A34A]"
            >
              Assign Task
            </button>
          </div>
        </form>
      </div>

      {/* WORKERS LIST GRID */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Active Field Staff Roster</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.map(w => (
            <div key={w.id} className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={w.profile_photo}
                      alt={w.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#22C55E]"
                    />
                    <div>
                      <h4 className="text-base font-bold text-white">{w.name}</h4>
                      <span className="text-xs font-mono text-[#22C55E]">{w.employee_id}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30">
                    {w.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#D1D5DB]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                    <span>Zone: <strong className="text-white">{w.assigned_zone}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                    <span>{w.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs pt-3 mt-3 border-t border-white/10">
                  <div className="p-2 rounded-xl bg-[#111827]">
                    <span className="text-lg font-black text-white">{w.completed_tasks_count}</span>
                    <span className="text-[9px] text-[#9CA3AF] block font-bold">Completed Tasks</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#111827]">
                    <span className="text-lg font-black text-[#22C55E]">{w.performance_score}%</span>
                    <span className="text-[9px] text-[#9CA3AF] block font-bold">Performance</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#9CA3AF]">Avg Time: <strong>{w.avg_resolution_hours} hrs</strong></span>
                <button
                  onClick={() => handleDeleteWorker(w.id)}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete Worker"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

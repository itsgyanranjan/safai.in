import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { workerService } from '../services/workerService';
import { StatCard } from '../components/StatCard';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, CheckCircle2, Clock, Award, MapPin, Calendar, ArrowRight, Play, CheckSquare, Bell, User } from 'lucide-react';

export const WorkerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWorkerData = async () => {
    try {
      const [profData, tasksData, notifData] = await Promise.all([
        workerService.getProfile(),
        workerService.getTasks(),
        workerService.getNotifications()
      ]);
      setProfile(profData);
      setTasks(tasksData);
      setNotifications(notifData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkerData();
  }, []);

  const handleStartWork = async (taskId) => {
    try {
      await workerService.updateTaskStatus(taskId, 'In Progress', 'Field worker started task.');
      loadWorkerData();
    } catch (err) {
      console.error(err);
    }
  };

  const pendingCount = tasks.filter(t => t.status === 'Assigned' || t.status === 'Accepted' || t.status === 'In Progress').length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const todayAssigned = tasks.length;
  const performanceScore = profile?.performance_score || 94;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E] flex items-center gap-1.5">
            <Truck className="w-4 h-4" /> Field Sanitation Operations Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Welcome, {user?.name || profile?.name || 'Ramesh Mohanty'}
          </h1>
          <p className="text-[#9CA3AF] text-sm mt-0.5">
            Emp ID: <strong className="text-white font-mono">{user?.employee_id || profile?.employee_id || 'EMP-2026-01'}</strong> | Assigned Zone: <strong className="text-[#22C55E]">{user?.assigned_zone || profile?.assigned_zone || 'Saheed Nagar Zone 1'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/worker/profile"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#1A2332] text-white border border-white/10 hover:border-[#22C55E]/40 flex items-center gap-2"
          >
            <User className="w-4 h-4 text-[#22C55E]" /> My Worker Profile
          </Link>
        </div>
      </div>

      {/* Notifications Alert Banner */}
      {notifications.length > 0 && (
        <div className="glass-card p-4 rounded-2xl border border-[#22C55E]/30 bg-[#1A2332] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{notifications[0].title}</h4>
              <p className="text-xs text-[#D1D5DB]">{notifications[0].message}</p>
            </div>
          </div>
          <span className="text-[10px] text-[#9CA3AF] shrink-0 font-mono">{notifications[0].date}</span>
        </div>
      )}

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Clock}
          value={todayAssigned.toString()}
          label="Today's Assigned Tasks"
          subtext="Total tasks assigned to you"
        />
        <StatCard
          icon={CheckCircle2}
          value={completedCount.toString()}
          label="Completed Tasks"
          subtext="Work finished on ground"
        />
        <StatCard
          icon={Truck}
          value={pendingCount.toString()}
          label="Pending Tasks"
          subtext="Assigned / In Progress"
        />
        <StatCard
          icon={Award}
          value={`${performanceScore}%`}
          label="Performance Score"
          subtext="Based on resolution speed"
        />
      </div>

      {/* MY ASSIGNED TASKS SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">MY ASSIGNED TASKS</h2>
            <p className="text-xs text-[#9CA3AF]">Sanitation complaints assigned to your zone</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-white">Loading assigned tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="glass-card p-12 rounded-2xl border border-white/10 text-center text-[#9CA3AF]">
            No assigned tasks for today.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="glass-card glass-card-hover p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-lg border border-[#22C55E]/20">
                      {task.complaint_id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      task.status === 'Completed'
                        ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30'
                        : task.status === 'In Progress'
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {task.status}
                    </span>
                  </div>

                  {task.report_image && (
                    <div className="h-40 w-full rounded-xl overflow-hidden mb-3 bg-[#111827]">
                      <img src={task.report_image} alt={task.category} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-white mb-1">{task.category}</h4>
                  <p className="text-xs text-[#9CA3AF] line-clamp-2 mb-3 leading-relaxed">
                    {task.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-[#D1D5DB]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span className="truncate">{task.address} ({task.ward})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>Assigned: {new Date(task.assigned_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <Link
                    to={`/worker/tasks/${task.id}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#111827] text-white border border-white/10 hover:border-[#22C55E]/40"
                  >
                    View Details
                  </Link>

                  {task.status === 'Assigned' || task.status === 'Accepted' ? (
                    <button
                      onClick={() => handleStartWork(task.id)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-500 text-white hover:bg-purple-600 shadow"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" /> Start Work
                    </button>
                  ) : task.status === 'In Progress' ? (
                    <Link
                      to={`/worker/tasks/${task.id}`}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow"
                    >
                      <CheckSquare className="w-3.5 h-3.5" /> Complete Task
                    </Link>
                  ) : (
                    <span className="text-xs text-[#22C55E] font-bold">✓ Pending Verification</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

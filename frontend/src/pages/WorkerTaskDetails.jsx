import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { workerService } from '../services/workerService';
import { ArrowLeft, MapPin, ExternalLink, Calendar, CheckCircle2, Play, Upload, ShieldCheck, Clock, FileText } from 'lucide-react';

export const WorkerTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Completion Form State
  const [workerNotes, setWorkerNotes] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await workerService.getTask(id);
        setTask(data);
        setWorkerNotes(data.worker_notes || '');
        if (data.after_image) setProofPreview(data.after_image);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofImage(file);
      setProofPreview(URL.createObjectURL(file));
    }
  };

  const handleStatusTransition = async (newStatus) => {
    setUpdating(true);
    try {
      const updated = await workerService.updateTaskStatus(task.id, newStatus, workerNotes, proofPreview);
      setTask(updated);
      setSuccessMsg(`Task status updated to ${newStatus}`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleCompleteTask = async (e) => {
    e.preventDefault();
    if (!proofPreview) {
      alert('Please upload an After-Work completion photo proof.');
      return;
    }
    setUpdating(true);
    try {
      const updated = await workerService.updateTaskStatus(task.id, 'Completed', workerNotes, proofPreview);
      setTask(updated);
      setSuccessMsg('Task completed successfully! Sent to Admin for verification.');
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-white">Loading task details...</div>;
  }

  if (!task) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <p className="text-[#9CA3AF]">Task not found.</p>
        <Link to="/worker/dashboard" className="text-[#22C55E] underline">Back to Worker Dashboard</Link>
      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${task.latitude || 20.2886},${task.longitude || 85.8427}`;

  const steps = ['Assigned', 'Accepted', 'In Progress', 'Completed'];
  const currentStepIdx = steps.indexOf(task.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Back Button */}
      <Link to="/worker/dashboard" className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to My Assigned Tasks
      </Link>

      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-lg border border-[#22C55E]/20">
              {task.task_id} ({task.complaint_id})
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">{task.category}</h1>
            <p className="text-xs text-[#9CA3AF] mt-1">Reported by Citizen: <strong className="text-white">{task.citizen_name}</strong></p>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#9CA3AF] block">Priority</span>
            <span className="px-3 py-1 rounded text-xs font-extrabold bg-red-500/10 text-red-400 border border-red-500/20 inline-block mt-1">
              {task.priority} PRIORITY
            </span>
          </div>
        </div>

        {/* WORKFLOW STEPPER */}
        <div className="p-4 bg-[#111827] rounded-2xl border border-white/10 space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#9CA3AF] tracking-wider block text-center">
            Worker Task Workflow Stepper
          </span>
          <div className="grid grid-cols-4 gap-2 text-center text-xs pt-2">
            {steps.map((st, idx) => {
              const active = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              return (
                <div key={st} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                    isCurrent
                      ? 'bg-[#22C55E] text-white border-[#22C55E] shadow-lg shadow-[#22C55E]/30 animate-pulse'
                      : active
                      ? 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]'
                      : 'bg-[#1A2332] text-gray-500 border-white/10'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-[10px] ${active ? 'text-white font-bold' : 'text-gray-500'}`}>{st}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details & Location */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {task.report_image && (
            <div className="md:col-span-5 rounded-2xl overflow-hidden bg-[#111827] border border-white/10">
              <img src={task.report_image} alt={task.category} className="w-full h-64 object-cover" />
              <span className="text-[10px] text-[#9CA3AF] block p-2 text-center">Citizen Reported Photo</span>
            </div>
          )}

          <div className={`${task.report_image ? 'md:col-span-7' : 'md:col-span-12'} space-y-4`}>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">Task Description</h4>
              <p className="text-sm text-white leading-relaxed">{task.description}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#111827] border border-white/10 space-y-2 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-[#D1D5DB]">
                  <MapPin className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>Address: <strong className="text-white">{task.address} ({task.ward})</strong></span>
                </div>
              </div>

              <div className="text-[11px] text-[#9CA3AF]">
                Coordinates: Lat: {task.latitude || 20.2886}, Lng: {task.longitude || 85.8427}
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22C55E] hover:underline pt-1"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open in Google Maps
              </a>
            </div>

            {task.admin_notes && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                <strong className="block text-[10px] uppercase tracking-wider text-amber-400">Admin Instructions:</strong>
                "{task.admin_notes}"
              </div>
            )}
          </div>
        </div>

        {/* WORKER STATUS ACTION BAR */}
        {task.status !== 'Completed' && task.status !== 'Verified' && (
          <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Update Worker Status</h4>
            <div className="flex flex-wrap items-center gap-3">
              {task.status === 'Assigned' && (
                <button
                  onClick={() => handleStatusTransition('Accepted')}
                  disabled={updating}
                  className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-bold text-xs hover:bg-blue-600 shadow"
                >
                  Accept Assignment
                </button>
              )}

              {(task.status === 'Assigned' || task.status === 'Accepted') && (
                <button
                  onClick={() => handleStatusTransition('In Progress')}
                  disabled={updating}
                  className="px-5 py-2.5 rounded-xl bg-purple-500 text-white font-bold text-xs hover:bg-purple-600 shadow flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Start Work (In Progress)
                </button>
              )}
            </div>
          </div>
        )}

        {/* UPLOAD WORK PROOF FORM */}
        <form onSubmit={handleCompleteTask} className="pt-6 border-t border-white/10 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#22C55E]" /> Upload Work Proof & Complete Task
            </h3>
            <p className="text-xs text-[#9CA3AF]">
              Before marking task completed, upload an After-Work photo proof and add completion notes.
            </p>
          </div>

          {successMsg && (
            <div className="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold">
              {successMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* After Work Photo Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white uppercase tracking-wider">
                After-Work Photo Proof *
              </label>
              <div className="border-2 border-dashed border-white/15 rounded-2xl p-4 text-center bg-[#111827]">
                {proofPreview ? (
                  <div className="space-y-2">
                    <img src={proofPreview} alt="Proof" className="h-40 max-w-full mx-auto rounded-xl object-cover" />
                    <button
                      type="button"
                      onClick={() => { setProofImage(null); setProofPreview(null); }}
                      className="text-xs text-red-400 underline font-semibold"
                    >
                      Change Proof Photo
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer space-y-2 block py-4">
                    <Upload className="w-8 h-8 text-[#22C55E] mx-auto" />
                    <span className="text-xs font-semibold text-white block">Upload After-Work Photo</span>
                    <input type="file" accept="image/*" onChange={handleProofChange} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            {/* Worker Completion Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white uppercase tracking-wider">
                Completion Notes & Remarks
              </label>
              <textarea
                rows={5}
                placeholder="Describe ground actions taken (e.g. Cleared 2 tons of waste, disinfected bin area)..."
                value={workerNotes}
                onChange={(e) => setWorkerNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#111827] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#22C55E]"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={updating || task.status === 'Completed' || task.status === 'Verified'}
            className="w-full py-4 rounded-xl font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-xl shadow-[#22C55E]/20 text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            {task.status === 'Completed' || task.status === 'Verified' ? 'Task Already Marked Completed' : 'MARK TASK COMPLETED & SEND FOR ADMIN VERIFICATION'}
          </button>
        </form>

      </div>

    </div>
  );
};

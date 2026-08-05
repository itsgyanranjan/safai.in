import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { complaintService } from '../services/complaintService';
import { aiService } from '../services/aiService';
import { StatusTimeline } from '../components/StatusTimeline';
import { ArrowLeft, MapPin, Calendar, Users, Star, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, UserCheck, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ComplaintDetails = () => {
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  // Feedback state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  // Admin status update state
  const [adminStatus, setAdminStatus] = useState('');
  const [adminTeam, setAdminTeam] = useState('');
  const [adminMsg, setAdminMsg] = useState('');

  // AI Smart Worker Recommendation state
  const [recommendedWorker, setRecommendedWorker] = useState(null);
  const [showManualWorkerSelect, setShowManualWorkerSelect] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await complaintService.getComplaint(id);
        setComplaint(data);
        setAdminStatus(data.status);
        setAdminTeam(data.assigned_team || '');

        // Fetch AI worker recommendation
        const aiRec = await aiService.recommendWorker(id);
        setRecommendedWorker(aiRec);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackLoading(true);
    try {
      await complaintService.submitFeedback(complaint.id, rating, comment);
      setFeedbackSubmitted(true);
      setComplaint(prev => ({ ...prev, feedback: { rating, comment } }));
    } catch (err) {
      console.error(err);
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handleAdminUpdate = async (e) => {
    e.preventDefault();
    try {
      const updated = await complaintService.updateStatus(complaint.id, adminStatus, adminTeam);
      setComplaint(updated);
      setAdminMsg('Complaint status updated successfully!');
      setTimeout(() => setAdminMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-white">Loading complaint details...</div>;
  }

  if (!complaint) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <p className="text-[#9CA3AF]">Complaint not found.</p>
        <Link to="/my-reports" className="text-[#22C55E] underline">Back to reports</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Back button */}
      <Link to="/my-reports" className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to My Reports
      </Link>

      {/* Header Info */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-lg border border-[#22C55E]/20">
              {complaint.complaint_id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">{complaint.category}</h1>
            <p className="text-xs text-[#9CA3AF] mt-1">Reported by {complaint.reported_by_name || 'Citizen'}</p>
          </div>

          <div className="text-right sm:text-right">
            <span className="text-xs text-[#9CA3AF] block">Priority</span>
            <span className="px-3 py-1 rounded text-xs font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-block mt-1">
              {complaint.priority} PRIORITY
            </span>
          </div>
        </div>

        {/* STATUS TIMELINE */}
        <StatusTimeline currentStatus={complaint.status} />

        {/* Main Details & Photo */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
          {complaint.image && (
            <div className="md:col-span-5 rounded-2xl overflow-hidden bg-[#111827] border border-white/10">
              <img src={complaint.image} alt={complaint.category} className="w-full h-64 object-cover" />
            </div>
          )}

          <div className={`${complaint.image ? 'md:col-span-7' : 'md:col-span-12'} space-y-4`}>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">Issue Description</h4>
              <p className="text-sm text-white leading-relaxed">{complaint.description}</p>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-[#D1D5DB]">
                <MapPin className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Address: <strong className="text-white">{complaint.address}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[#D1D5DB]">
                <Users className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                <span>Assigned Sanitation Team: <strong className="text-[#22C55E]">{complaint.assigned_team || 'Unassigned'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[#D1D5DB]">
                <Calendar className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                <span>Submitted On: {new Date(complaint.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURE 1: AI RECOMMENDED WORKER CARD FOR ADMIN */}
        {isAdmin && recommendedWorker && (
          <div className="p-5 rounded-2xl bg-[#111827] border border-[#22C55E]/40 bg-[#22C55E]/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#22C55E]">
                <Sparkles className="w-4 h-4" />
                <span>AI Smart Worker Recommendation Engine</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30">
                Confidence: {recommendedWorker.confidence || '96%'}
              </span>
            </div>

            <div className="bg-[#1A2332] p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">{recommendedWorker.worker_name || 'Rahul Sharma'}</h4>
                  {recommendedWorker.employee_id && (
                    <span className="text-[10px] font-mono text-[#9CA3AF] bg-white/5 px-2 py-0.5 rounded">
                      {recommendedWorker.employee_id}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#22C55E] font-medium mt-0.5">
                  Zone: {recommendedWorker.assigned_zone || 'Saheed Nagar Zone 1'}
                </p>
                <p className="text-xs text-[#9CA3AF] mt-1 italic">
                  "{recommendedWorker.reason}"
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setAdminTeam(recommendedWorker.worker_name);
                    setAdminStatus('ASSIGNED');
                    handleAdminUpdate({ preventDefault: () => {} });
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-md shadow-[#22C55E]/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  Accept Recommendation
                </button>
                <button
                  type="button"
                  onClick={() => setShowManualWorkerSelect(!showManualWorkerSelect)}
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#1A2332] text-white border border-white/10 hover:border-white/30 flex items-center justify-center gap-1 transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  Choose Different Worker
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN MANAGEMENT CONTROLS */}
        {isAdmin && (
          <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-4 pt-4">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Admin Controls — Update Status & Team
            </h4>

            {adminMsg && <div className="text-xs text-[#22C55E] font-bold">{adminMsg}</div>}

            <form onSubmit={handleAdminUpdate} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#9CA3AF] mb-1">Change Status</label>
                <select
                  value={adminStatus}
                  onChange={(e) => setAdminStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
                >
                  <option value="SUBMITTED">SUBMITTED</option>
                  <option value="ASSIGNED">ASSIGNED</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#9CA3AF] mb-1">Assign Team</label>
                <input
                  type="text"
                  placeholder="e.g. Vijay Nagar Unit 4"
                  value={adminTeam}
                  onChange={(e) => setAdminTeam(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* CITIZEN RATING & FEEDBACK SECTION AFTER RESOLUTION */}
        {complaint.status === 'RESOLVED' && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Citizen Resolution Feedback
            </h3>

            {complaint.feedback || feedbackSubmitted ? (
              <div className="p-4 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 space-y-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= (complaint.feedback?.rating || rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-white ml-2">Rating: {complaint.feedback?.rating || rating}/5</span>
                </div>
                {complaint.feedback?.comment && (
                  <p className="text-xs text-[#D1D5DB]">"{complaint.feedback.comment}"</p>
                )}
                <span className="text-[10px] text-[#22C55E] font-bold block">Thank you! +20 bonus points credited.</span>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 bg-[#111827] p-5 rounded-2xl border border-white/10">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-white uppercase tracking-wider">Rate Resolution Quality (1-5)</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-white uppercase tracking-wider">Optional Comments</label>
                  <textarea
                    rows={2}
                    placeholder="Share feedback on cleanliness speed or ground work quality..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1A2332] border border-white/10 text-white text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={feedbackLoading}
                  className="px-5 py-2.5 rounded-xl bg-[#22C55E] text-white font-bold text-xs hover:bg-[#16A34A]"
                >
                  {feedbackLoading ? 'Submitting...' : 'Submit Resolution Rating (+20 Pts)'}
                </button>
              </form>
            )}
          </div>
        )}

      </div>

    </div>
  );
};

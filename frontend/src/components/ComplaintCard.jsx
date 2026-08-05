import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export const ComplaintCard = ({ complaint }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'SUBMITTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" /> Submitted
          </span>
        );
      case 'ASSIGNED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="w-3.5 h-3.5" /> Assigned
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Clock className="w-3.5 h-3.5" /> In Progress
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH':
        return <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">High Priority</span>;
      case 'MEDIUM':
        return <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Medium Priority</span>;
      case 'LOW':
        return <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">Low Priority</span>;
      default:
        return null;
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="glass-card glass-card-hover p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono text-[#9CA3AF] bg-[#111827] px-2.5 py-1 rounded-lg border border-white/5">
            {complaint.complaint_id}
          </span>
          {getStatusBadge(complaint.status)}
        </div>

        {complaint.image && (
          <div className="h-44 w-full rounded-xl overflow-hidden mb-3 bg-[#111827]">
            <img
              src={complaint.image}
              alt={complaint.category}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-lg font-bold text-white leading-snug">{complaint.category}</h4>
          {getPriorityBadge(complaint.priority)}
        </div>

        <p className="text-sm text-[#9CA3AF] line-clamp-2 mb-3 leading-relaxed">
          {complaint.description}
        </p>

        <div className="space-y-1.5 text-xs text-[#D1D5DB]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
            <span className="truncate">{complaint.address}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <span>{formatDate(complaint.created_at)}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-[#9CA3AF]">
          Team: <strong className="text-white">{complaint.assigned_team || 'Unassigned'}</strong>
        </span>
        <Link
          to={`/complaints/${complaint.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22C55E] hover:text-[#16A34A] transition-colors"
        >
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

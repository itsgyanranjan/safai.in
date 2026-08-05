import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, PlusCircle } from 'lucide-react';
import { driveService } from '../services/driveService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const DriveCard = ({ drive, onDriveUpdated }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(drive.is_joined);
  const [count, setCount] = useState(drive.participant_count);

  const handleToggleJoin = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      if (joined) {
        await driveService.leaveDrive(drive.id);
        setJoined(false);
        setCount(prev => Math.max(0, prev - 1));
      } else {
        await driveService.joinDrive(drive.id);
        setJoined(true);
        setCount(prev => prev + 1);
      }
      if (onDriveUpdated) onDriveUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-bold text-white leading-tight">{drive.title}</h3>
          <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
            Community Drive
          </span>
        </div>

        <p className="text-sm text-[#9CA3AF] mb-4 leading-relaxed line-clamp-2">
          {drive.description}
        </p>

        <div className="space-y-2 text-xs text-[#D1D5DB]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span className="font-medium text-white">{drive.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <span>{drive.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <span>{drive.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span className="font-semibold text-white">{count} Volunteers Registered</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-[#9CA3AF]">
          Reward: <strong className="text-[#22C55E]">+100 Pts</strong>
        </span>
        <button
          onClick={handleToggleJoin}
          disabled={loading}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
            joined
              ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
              : 'bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-[#22C55E]/20'
          }`}
        >
          {joined ? (
            <>
              <CheckCircle className="w-4 h-4" /> Registered (Leave)
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" /> Join Now
            </>
          )}
        </button>
      </div>
    </div>
  );
};

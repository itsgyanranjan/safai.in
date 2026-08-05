import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { workerService } from '../services/workerService';
import { useAuth } from '../context/AuthContext';
import { Truck, Lock, Mail, ArrowRight, ShieldCheck, User } from 'lucide-react';

export const WorkerLogin = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await workerService.login({ email, password });
      setUser(data.user);
      navigate('/worker/dashboard');
    } catch (err) {
      setError('Invalid Employee ID or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('EMP-2026-01');
    setPassword('worker123');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-card p-8 rounded-3xl border border-[#22C55E]/30 space-y-6 bg-gradient-to-b from-[#1A2332] to-[#0F172A]">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center mx-auto text-[#22C55E]">
            <Truck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white">FIELD WORKER PORTAL</h1>
          <p className="text-xs text-[#9CA3AF]">Municipal Sanitation Staff Sign In</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Quick Demo Fill */}
        <div className="p-3 rounded-xl bg-[#111827] border border-white/5 space-y-2 text-center">
          <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider block">
            Demo Worker Account (Ramesh Mohanty)
          </span>
          <button
            type="button"
            onClick={handleDemoFill}
            className="w-full py-2 px-3 rounded-lg bg-[#1A2332] text-white hover:border-[#22C55E]/50 border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-[#22C55E]" /> Auto-Fill Worker Credentials (EMP-2026-01)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">Employee ID or Email *</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="e.g. EMP-2026-01 or ramesh.worker@safai.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-white text-sm focus:outline-none focus:border-[#22C55E]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-white text-sm focus:outline-none focus:border-[#22C55E]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-lg shadow-[#22C55E]/25 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In To Field Portal'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-[#9CA3AF]">
          Need worker account access?{' '}
          <span className="text-amber-400 font-bold">Contact Municipal Admin</span>
        </div>

      </div>
    </div>
  );
};

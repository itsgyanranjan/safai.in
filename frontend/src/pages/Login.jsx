import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { workerService } from '../services/workerService';
import { Lock, Mail, ArrowRight, ShieldCheck, User, Truck } from 'lucide-react';
import safaiLogo from '../assets/safai_logo.png';

export const Login = () => {
  const { login, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (email.toLowerCase().includes('worker') || email.toLowerCase().includes('emp-')) {
        const workerData = await workerService.login({ email, password });
        setUser(workerData.user);
        navigate('/worker/dashboard');
      } else {
        const data = await login({ email, password });
        if (data.user.role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else if (data.user.role === 'FIELD_WORKER') {
          navigate('/worker/dashboard');
        } else {
          navigate(location.state?.from || '/dashboard');
        }
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (role) => {
    if (role === 'CITIZEN') {
      setEmail('aarav@safai.com');
      setPassword('citizen123');
    } else if (role === 'MUNICIPAL') {
      setEmail('admin@safai.com');
      setPassword('admin123');
    } else if (role === 'WORKER') {
      setEmail('EMP-2026-01');
      setPassword('worker123');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
        
        {/* Brand Top */}
        <div className="text-center space-y-2">
          <img
            src={safaiLogo}
            alt="SAFAI Logo"
            className="w-14 h-14 rounded-2xl object-cover border-2 border-[#22C55E]/50 shadow-lg shadow-[#22C55E]/30 mx-auto"
          />
          <h1 className="text-2xl font-black text-white">SIGN IN TO SAFAI</h1>
          <p className="text-xs text-[#9CA3AF]">Access your complaints, drives, worker portal & reward points</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Demo Quick Fill Switch (Citizen, Municipal, Field Worker) */}
        <div className="p-3 rounded-xl bg-[#111827] border border-white/5 space-y-2">
          <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider block text-center">
            Quick Fill Demo Accounts (For Testing)
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setDemoCredentials('CITIZEN')}
              className="py-2 px-1.5 rounded-lg bg-[#1A2332] text-white hover:border-[#22C55E]/50 border border-white/10 flex flex-col items-center justify-center gap-1 font-semibold text-[11px]"
            >
              <User className="w-3.5 h-3.5 text-[#22C55E]" /> Citizen
            </button>
            <button
              type="button"
              onClick={() => setDemoCredentials('MUNICIPAL')}
              className="py-2 px-1.5 rounded-lg bg-[#1A2332] text-white hover:border-amber-500/50 border border-white/10 flex flex-col items-center justify-center gap-1 font-semibold text-[11px]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Municipal
            </button>
            <button
              type="button"
              onClick={() => setDemoCredentials('WORKER')}
              className="py-2 px-1.5 rounded-lg bg-[#1A2332] text-white hover:border-blue-400/50 border border-white/10 flex flex-col items-center justify-center gap-1 font-semibold text-[11px]"
            >
              <Truck className="w-3.5 h-3.5 text-blue-400" /> Worker
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">Email Address / Employee ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="name@example.com or EMP-2026-01"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-white text-sm focus:outline-none focus:border-[#22C55E]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">Password</label>
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
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-[#9CA3AF]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#22C55E] font-bold hover:underline">
            Register now
          </Link>
        </div>

      </div>
    </div>
  );
};

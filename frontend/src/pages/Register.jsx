import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { workerService } from '../services/workerService';
import { Lock, Mail, User, ArrowRight, Truck, MapPin, ShieldCheck } from 'lucide-react';
import safaiLogo from '../assets/safai_logo.png';

export const Register = () => {
  const { register, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CITIZEN');

  // Field Worker specific state
  const [department, setDepartment] = useState('Municipal Waste Operations');
  const [assignedZone, setAssignedZone] = useState('Saheed Nagar Zone 1');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (role === 'FIELD_WORKER') {
        const createdWorker = await workerService.createWorker({
          name,
          email,
          phone,
          department,
          assigned_zone: assignedZone
        });

        const workerUser = {
          id: createdWorker.id,
          name: createdWorker.name,
          email: createdWorker.email,
          role: 'FIELD_WORKER',
          employee_id: createdWorker.employee_id,
          department: createdWorker.department,
          assigned_zone: createdWorker.assigned_zone,
          status: createdWorker.status
        };

        localStorage.setItem('safai_token', 'mock_worker_jwt_token_new');
        localStorage.setItem('safai_user', JSON.stringify(workerUser));
        setUser(workerUser);
        navigate('/worker/dashboard');
      } else {
        const data = await register({ name, email, password, role });
        navigate(data.user.role === 'ADMIN' ? '/admin-dashboard' : (location.state?.from || '/dashboard'));
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
        
        <div className="text-center space-y-2">
          <img
            src={safaiLogo}
            alt="SAFAI Logo"
            className="w-14 h-14 rounded-2xl object-cover border-2 border-[#22C55E]/50 shadow-lg shadow-[#22C55E]/30 mx-auto"
          />
          <h1 className="text-2xl font-black text-white">REGISTER ACCOUNT</h1>
          <p className="text-xs text-[#9CA3AF]">Join the SAFAI cleanliness platform today</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Aarav Sharma or Ramesh Mohanty"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-white text-sm focus:outline-none focus:border-[#22C55E]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="aarav@safai.com"
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
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-white text-sm focus:outline-none focus:border-[#22C55E]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">Account Role *</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-white text-sm focus:outline-none focus:border-[#22C55E]"
            >
              <option value="CITIZEN">Citizen (Report Issues & Join Drives)</option>
              <option value="ADMIN">Municipal Admin (Manage Complaints & Assign Teams)</option>
              <option value="FIELD_WORKER">Field Worker (Sanitation Operations & Task Execution)</option>
            </select>
          </div>

          {/* FIELD WORKER SPECIFIC INPUT FIELDS */}
          {role === 'FIELD_WORKER' && (
            <div className="p-4 rounded-2xl bg-[#111827] border border-[#22C55E]/30 space-y-3 animate-in fade-in">
              <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider block">
                Field Sanitation Staff Profile
              </span>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-white uppercase">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#1A2332] border border-white/10 text-white text-xs"
                >
                  <option value="Municipal Waste Operations">Municipal Waste Operations</option>
                  <option value="Heritage & Temple Sanitation">Heritage & Temple Sanitation</option>
                  <option value="Commercial & Tech Corridor">Commercial & Tech Corridor</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-white uppercase">Assigned Zone</label>
                <select
                  value={assignedZone}
                  onChange={(e) => setAssignedZone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#1A2332] border border-white/10 text-white text-xs"
                >
                  <option value="Saheed Nagar Zone 1">Saheed Nagar Zone 1</option>
                  <option value="Old Town Heritage Zone">Old Town Heritage Zone</option>
                  <option value="Patia KIIT Square Zone">Patia KIIT Square Zone</option>
                  <option value="Khandagiri Zone">Khandagiri Zone</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-lg shadow-[#22C55E]/25 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Account...' : 'Register Account'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-[#9CA3AF]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#22C55E] font-bold hover:underline">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
};

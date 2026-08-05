import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ShieldAlert, Truck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import safaiLogo from '../assets/safai_logo.png';

export const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin, isWorker } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Report Issue', path: '/report-issue' },
    { name: 'AI Insights', path: '/ai-dashboard' },
    { name: 'Awareness Hub', path: '/awareness-hub' },
    { name: 'Cleanup Drives', path: '/drives' },
    { name: 'Public Stats', path: '/stats' },
    { name: 'About Us', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F14]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src={safaiLogo}
              alt="SAFAI Logo"
              className="w-10 h-10 lg:w-11 lg:h-11 rounded-2xl object-cover border-2 border-[#22C55E]/50 shadow-lg shadow-[#22C55E]/25 group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl lg:text-2xl font-black tracking-wider text-white">SAFAI</span>
              </div>
              <p className="hidden sm:block text-[11px] text-[#9CA3AF] font-medium tracking-tight">A click towards cleanliness.</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-[#111827]/80 p-1 lg:p-1.5 rounded-2xl border border-white/5 mx-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2.5 xl:px-3.5 py-1.5 lg:py-2 rounded-xl text-xs xl:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive(link.path)
                    ? 'bg-[#22C55E] text-white shadow-md shadow-[#22C55E]/20'
                    : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions / Auth */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-2.5 xl:gap-3">
                {isAdmin ? (
                  <Link
                    to="/admin-dashboard"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all whitespace-nowrap"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Municipal Panel
                  </Link>
                ) : isWorker ? (
                  <Link
                    to="/worker/dashboard"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 hover:bg-[#22C55E]/20 transition-all whitespace-nowrap"
                  >
                    <Truck className="w-4 h-4" />
                    Worker Portal
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 hover:bg-[#22C55E]/20 transition-all whitespace-nowrap"
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Link>
                )}

                <div className="h-5 w-[1px] bg-white/10" />

                <div className="text-right whitespace-nowrap">
                  <p className="text-xs font-semibold text-white max-w-[120px] truncate">{user.name}</p>
                  <p className="text-[10px] text-[#22C55E] font-bold">
                    {isWorker ? (user.assigned_zone || 'Field Staff') : `${user.reward_points || 0} pts`}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-xl bg-[#1A2332] text-[#9CA3AF] hover:text-red-400 hover:bg-red-500/10 border border-white/5 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs xl:text-sm font-semibold text-white hover:text-[#22C55E] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-xs xl:text-sm font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-lg shadow-[#22C55E]/25 hover:shadow-[#22C55E]/40 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile / Tablet Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#1A2332] text-[#D1D5DB] hover:text-white border border-white/5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111827] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-[#22C55E] text-white'
                    : 'text-[#D1D5DB] hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center justify-between px-4 py-2 bg-[#1A2332] rounded-xl border border-white/5">
                  <span className="text-sm font-semibold text-white">{user.name}</span>
                  <span className="text-xs font-bold text-[#22C55E]">{isWorker ? (user.assigned_zone || 'Worker') : `${user.reward_points || 0} pts`}</span>
                </div>
                <Link
                  to={isAdmin ? "/admin-dashboard" : isWorker ? "/worker/dashboard" : "/dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl font-semibold bg-[#22C55E] text-white"
                >
                  {isAdmin ? 'Municipal Panel' : isWorker ? 'Worker Portal' : 'Citizen Dashboard'}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-xl font-semibold bg-red-500/10 text-red-400 border border-red-500/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl font-semibold text-white bg-[#1A2332] border border-white/10"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl font-bold bg-[#22C55E] text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

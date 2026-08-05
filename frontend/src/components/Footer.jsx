import React from 'react';
import { Link } from 'react-router-dom';
import safaiLogo from '../assets/safai_logo.png';

export const Footer = () => {
  return (
    <footer className="bg-[#0B0F14] border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={safaiLogo}
                alt="SAFAI Logo"
                className="w-10 h-10 rounded-xl object-cover border border-[#22C55E]/40 shadow-md shadow-[#22C55E]/20"
              />
              <span className="text-2xl font-black text-white tracking-wider">SAFAI</span>
            </div>
            <p className="text-[#9CA3AF] text-sm max-w-sm leading-relaxed">
              Swachhata Abhiyan Digital Platform — Empowering citizens with simple, transparent tools to report cleanliness issues, participate in community drives, and keep Bhubaneswar clean.
            </p>
            <p className="text-xs text-[#22C55E] font-bold tracking-wide">
              “A click towards cleanliness.”
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-[#9CA3AF]">
              <li>
                <Link to="/report-issue" className="hover:text-[#22C55E] transition-colors">Report Issue</Link>
              </li>
              <li>
                <Link to="/drives" className="hover:text-[#22C55E] transition-colors">Cleanup Drives</Link>
              </li>
              <li>
                <Link to="/stats" className="hover:text-[#22C55E] transition-colors">Public Stats & Hotspots</Link>
              </li>
              <li>
                <Link to="/rewards" className="hover:text-[#22C55E] transition-colors">Leaderboard & Badges</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#22C55E] transition-colors">About Us</Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link to="/worker/login" className="text-xs text-[#22C55E] font-bold hover:underline flex items-center gap-1">
                  Field Worker Portal →
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Team Credits */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Student Team</h4>
            <ul className="space-y-2 text-xs text-[#9CA3AF]">
              <li>
                <strong className="text-white">Prayash Ranjan Dash</strong>
                <br /><span className="text-[#22C55E]">Frontend Developer (React)</span>
              </li>
              <li>
                <strong className="text-white">Gyana Ranjan Kar</strong>
                <br /><span className="text-[#22C55E]">Backend Developer (Django)</span>
              </li>
              <li>
                <strong className="text-white">Isha Yadav</strong>
                <br /><span className="text-[#22C55E]">Database & Integration (PostgreSQL)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#9CA3AF] gap-4">
          <p>© 2026 SAFAI Project. All rights reserved.</p>
          <p className="text-xs text-[#22C55E] font-medium">Swachhata Abhiyan Digital Platform — Bhubaneswar</p>
        </div>
      </div>
    </footer>
  );
};

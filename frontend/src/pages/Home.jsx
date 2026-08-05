import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MapPin,
  Calendar,
  Sparkles,
  Camera,
  Layers,
  FileCheck,
  Leaf
} from 'lucide-react';
import { DriveCard } from '../components/DriveCard';
import { Interactive3DVehicle } from '../components/Interactive3DVehicle';
import { driveService } from '../services/driveService';
import { rewardService } from '../services/rewardService';

export const Home = () => {
  const [drives, setDrives] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [drivesRes, leadersRes] = await Promise.all([
          driveService.getDrives(),
          rewardService.getLeaderboard()
        ]);
        setDrives(drivesRes.slice(0, 3));
        setLeaderboard(leadersRes.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-6 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-6">

              
              {/* Brand Tag Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Swachhata Abhiyan Digital Platform — Bhubaneswar
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight uppercase">
                A CLICK TOWARDS <br />
                <span className="text-[#22C55E]">CLEANLINESS.</span>
              </h1>

              {/* Explicit Tagline Banner */}
              <div className="p-3.5 rounded-xl bg-[#111827] border border-[#22C55E]/30 inline-block">
                <p className="text-sm font-bold text-[#22C55E] tracking-wide flex items-center gap-2">
                  <Leaf className="w-4 h-4 shrink-0" /> “A click towards cleanliness.”
                </p>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#D1D5DB] leading-relaxed max-w-xl">
                Report cleanliness issues, join community cleanup drives, and track real-time resolution progress across Bhubaneswar — all in one simple civic platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/report-issue"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-xl shadow-[#22C55E]/25 transition-all hover:scale-[1.02]"
                >
                  <Camera className="w-5 h-5" />
                  REPORT AN ISSUE
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/drives"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold bg-[#1A2332] text-white hover:bg-[#111827] border border-white/10 transition-all hover:border-[#22C55E]/40"
                >
                  <Users className="w-5 h-5 text-[#22C55E]" />
                  EXPLORE CLEANUP DRIVES
                </Link>
              </div>

              <p className="text-xs text-[#9CA3AF] pt-1">
                Empowering citizens of Bhubaneswar to build a cleaner, healthier city together.
              </p>

            </div>

            {/* RIGHT COLUMN - Large Prominent Workflow Image */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end w-full">
              <Interactive3DVehicle />
            </div>


          </div>
        </div>
      </section>

      {/* MAKE AN IMPACT (HOW SAFAI HELPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">
            Platform Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">MAKE AN IMPACT</h2>
          <p className="text-[#9CA3AF] text-sm max-w-xl mx-auto">
            SAFAI equips citizens and municipal teams with tools for rapid response and ground action across Bhubaneswar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">01. REPORT ISSUES</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              See a problem? Upload a photo, share exact GPS location, and report cleanliness issues in just a few clicks.
            </p>
            <Link to="/report-issue" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22C55E] hover:underline">
              Report an issue now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">02. JOIN CLEANUP DRIVES</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Participate in local cleanliness drives organized by community leaders and earn citizen reward points.
            </p>
            <Link to="/drives" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22C55E] hover:underline">
              Explore drives <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">03. TRACK PROGRESS</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Explore ward cleanliness scores, view real-time complaint status updates, and verify ground action transparency.
            </p>
            <Link to="/stats" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22C55E] hover:underline">
              View public statistics <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW SAFAI WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#111827]/50 rounded-3xl border border-white/5 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">
            Step-by-Step Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-white">HOW SAFAI WORKS</h2>
          <p className="text-[#9CA3AF] text-sm">
            Four simple steps to transform your city’s cleanliness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-3 relative">
            <div className="w-12 h-12 rounded-full bg-[#22C55E] text-white font-black text-lg flex items-center justify-center mx-auto shadow-lg shadow-[#22C55E]/30">
              1
            </div>
            <h4 className="text-lg font-bold text-white">You Report</h4>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Submit a cleanliness issue with photo and address location.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-3 relative">
            <div className="w-12 h-12 rounded-full bg-[#22C55E] text-white font-black text-lg flex items-center justify-center mx-auto shadow-lg shadow-[#22C55E]/30">
              2
            </div>
            <h4 className="text-lg font-bold text-white">We Assign</h4>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Nearest municipal team is notified and assigned immediately.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-3 relative">
            <div className="w-12 h-12 rounded-full bg-[#22C55E] text-white font-black text-lg flex items-center justify-center mx-auto shadow-lg shadow-[#22C55E]/30">
              3
            </div>
            <h4 className="text-lg font-bold text-white">Issue Resolved</h4>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Sanitation work is completed on ground and verified.
            </p>
          </div>

          {/* Step 4 */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-3 relative">
            <div className="w-12 h-12 rounded-full bg-[#22C55E] text-white font-black text-lg flex items-center justify-center mx-auto shadow-lg shadow-[#22C55E]/30">
              4
            </div>
            <h4 className="text-lg font-bold text-white">City Improves</h4>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Cleaner streets, healthier communities, and citizen reward points.
            </p>
          </div>

        </div>
      </section>

      {/* UPCOMING CLEANUP DRIVES & LEADERBOARD GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Upcoming Cleanup Drives */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">UPCOMING CLEANUP DRIVES</h3>
                <p className="text-xs text-[#9CA3AF]">Participate and earn community points in Bhubaneswar</p>
              </div>
              <Link to="/drives" className="text-xs font-bold text-[#22C55E] hover:underline flex items-center gap-1">
                View All Drives <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drives.map(drive => (
                <DriveCard key={drive.id} drive={drive} />
              ))}
            </div>
          </div>

          {/* Community Leaderboard Preview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">LEADERBOARD</h3>
                <p className="text-xs text-[#9CA3AF]">Top Active Citizens</p>
              </div>
              <Link to="/rewards" className="text-[#22C55E] text-xs font-bold hover:underline flex items-center gap-1">
                Full Board <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
              {leaderboard.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#111827] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg font-black text-xs flex items-center justify-center ${
                      idx === 0 ? 'bg-amber-500 text-black' : idx === 1 ? 'bg-slate-300 text-black' : 'bg-amber-700 text-white'
                    }`}>
                      #{item.rank}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.name}</h4>
                      <span className="text-[10px] text-[#22C55E] font-medium">{item.badge}</span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-white">{item.points} pts</span>
                </div>
              ))}

              <Link
                to="/rewards"
                className="block text-center py-2.5 rounded-xl bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 text-xs font-bold hover:bg-[#22C55E]/20 transition-all"
              >
                View Your Rank & Badges
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#22C55E]/30 bg-gradient-to-r from-[#1A2332] via-[#111827] to-[#1A2332] text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              “Your city needs one click from you.”
            </h2>
            <p className="text-sm text-[#D1D5DB]">
              Together, let's build a cleaner, healthier, and better Bhubaneswar tomorrow.
            </p>
            <div className="pt-2">
              <Link
                to="/report-issue"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-xl shadow-[#22C55E]/30 transition-all hover:scale-105"
              >
                <Camera className="w-5 h-5" />
                REPORT AN ISSUE NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

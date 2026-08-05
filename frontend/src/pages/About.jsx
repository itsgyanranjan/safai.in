import React from 'react';
import { Users, Code, Database, Server, CheckCircle2, ShieldCheck, Heart, Sparkles, GraduationCap } from 'lucide-react';

export const About = () => {
  const teamMembers = [
    {
      name: 'Prayash Ranjan Dash',
      role: 'Frontend Developer',
      icon: Code,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      responsibilities: [
        'React.js SPA frontend architecture',
        'Modern dark civic-tech user interface',
        'Application pages, forms, and interactive modals',
        'Citizen & Admin dashboards',
        'Responsive layout across mobile, tablet, and desktop',
        'Axios REST API integration from frontend'
      ]
    },
    {
      name: 'Gyana Ranjan Kar',
      role: 'Backend Developer',
      icon: Server,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20',
      responsibilities: [
        'Python Django backend server architecture',
        'Django REST Framework API design & endpoints',
        'JWT Authentication & token lifecycle',
        'Complaint reporting & status transition logic',
        'Cleanup drive registrations & participant logic',
        'Admin triage & vehicle tracking APIs'
      ]
    },
    {
      name: 'Isha Yadav',
      role: 'Database, Integration & Project Support',
      icon: Database,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20',
      responsibilities: [
        'PostgreSQL database schema design & indexing',
        'Django ORM model definitions & foreign keys',
        'Full end-to-end database integration',
        'Frontend-backend API integration & testing',
        'Project documentation & README specifications',
        'General project coordination and quality assurance'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          College Web Engineering MVP Project
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">ABOUT SAFAI</h1>
        <p className="text-[#9CA3AF] text-base leading-relaxed">
          Swachhata Abhiyan Digital Platform — Designed and built by a team of three capable students for urban cleanliness transparency and citizen empowerment.
        </p>
      </div>

      {/* Vision Card */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-[#22C55E]/30 bg-gradient-to-r from-[#1A2332] via-[#111827] to-[#1A2332] space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">Project Tagline</span>
        <h2 className="text-3xl font-extrabold text-white">“A click towards cleanliness.”</h2>
        <p className="text-sm text-[#D1D5DB] max-w-3xl leading-relaxed">
          SAFAI is a civic-tech digital platform created to address urban waste accumulation, streamline citizen complaint reporting, facilitate community cleanup drives, and provide real-time public transparency for municipal sanitation operations.
        </p>
      </div>

      {/* TEAM MEMBERS SECTION */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#22C55E]">Meet The Team</span>
          <h2 className="text-3xl font-extrabold text-white">STUDENT TEAM MEMBERS</h2>
          <p className="text-[#9CA3AF] text-sm max-w-xl mx-auto">
            Clear roles, modular development, and dedicated responsibilities across Frontend, Backend, and Database engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => {
            const Icon = member.icon;
            return (
              <div key={idx} className="glass-card glass-card-hover p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${member.bgColor} ${member.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-extrabold text-white">{member.name}</h3>
                    <span className={`text-xs font-bold uppercase tracking-wider block mt-0.5 ${member.color}`}>
                      {member.role}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">Key Responsibilities:</span>
                    <ul className="space-y-2 text-xs text-[#9CA3AF]">
                      {member.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${member.color}`} />
                          <span className="leading-snug">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-center">
                  <span className="text-[11px] font-mono text-[#9CA3AF]">SAFAI Team Member #{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Stack Architecture Summary */}
      <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
        <h3 className="text-xl font-bold text-white text-center">FULL-STACK SYSTEM ARCHITECTURE</h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs font-semibold">
          <div className="p-4 rounded-xl bg-[#111827] border border-white/5 text-emerald-400">
            React Frontend (Vite)
          </div>
          <div className="p-4 rounded-xl bg-[#111827] border border-white/5 text-[#9CA3AF] flex items-center justify-center font-mono">
            ↓ Axios REST API
          </div>
          <div className="p-4 rounded-xl bg-[#111827] border border-white/5 text-blue-400">
            Django REST Framework
          </div>
          <div className="p-4 rounded-xl bg-[#111827] border border-white/5 text-[#9CA3AF] flex items-center justify-center font-mono">
            ↓ Django ORM
          </div>
          <div className="p-4 rounded-xl bg-[#111827] border border-white/5 text-purple-400">
            PostgreSQL Database
          </div>
        </div>
      </div>

    </div>
  );
};

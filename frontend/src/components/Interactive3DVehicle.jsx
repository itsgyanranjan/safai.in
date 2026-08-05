import React from 'react';
import heroStoryboardImg from '../assets/hero_storyboard.jpg';

export const Interactive3DVehicle = () => {
  return (
    <div className="w-full max-w-[650px] mx-auto rounded-[24px] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] relative select-none bg-[#1A2332] p-1.5 sm:p-2.5 transition-all duration-300 hover:scale-[1.02]">
      
      {/* Subtle Green Ambient Backlight Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#22C55E]/20 via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Prominent Workflow Image (Large, Uncropped, Preserved Aspect Ratio) */}
      <img
        src={heroStoryboardImg}
        alt="SAFAI Workflow Storyboard — Citizen Reports, Report Submitted, Truck Assigned, Garbage Collected"
        className="w-full h-auto rounded-[18px] object-contain shadow-2xl relative z-10 block"
        loading="eager"
      />

    </div>
  );
};

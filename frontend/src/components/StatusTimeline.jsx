import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, Wrench } from 'lucide-react';

export const StatusTimeline = ({ currentStatus }) => {
  const steps = [
    { key: 'SUBMITTED', label: '1. SUBMITTED', icon: Clock },
    { key: 'ASSIGNED', label: '2. ASSIGNED', icon: ShieldCheck },
    { key: 'IN_PROGRESS', label: '3. IN PROGRESS', icon: Wrench },
    { key: 'RESOLVED', label: '4. RESOLVED', icon: CheckCircle2 },
  ];

  const getStepState = (stepKey) => {
    const order = ['SUBMITTED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="py-6 px-4 bg-[#111827] rounded-2xl border border-white/10">
      <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-6 text-center">
        Complaint Status Timeline
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const state = getStepState(step.key);
          const Icon = step.icon;

          let circleStyle = 'bg-[#1A2332] text-[#9CA3AF] border-white/10';
          let textStyle = 'text-[#9CA3AF]';

          if (state === 'completed') {
            circleStyle = 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]';
            textStyle = 'text-[#22C55E] font-semibold';
          } else if (state === 'active') {
            circleStyle = 'bg-[#22C55E] text-white border-[#22C55E] shadow-lg shadow-[#22C55E]/30 animate-pulse';
            textStyle = 'text-white font-bold';
          }

          return (
            <div key={step.key} className="flex flex-col items-center text-center relative z-10">
              <div
                className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center mb-2 transition-all ${circleStyle}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className={`text-xs ${textStyle}`}>{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

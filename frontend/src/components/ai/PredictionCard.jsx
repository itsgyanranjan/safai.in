import React from 'react';
import { Sparkles, AlertTriangle, Check, Camera, ShieldAlert } from 'lucide-react';

export const PredictionCard = ({
  predictedCategory,
  confidence,
  priority,
  priorityReason,
  duplicateInfo,
  imageAnalysis,
  onApplyCategory,
  onApplyPriority,
  currentCategory,
  currentPriority
}) => {
  return (
    <div className="space-y-3">
      {/* Category & Priority AI Predictor */}
      {(predictedCategory || priority) && (
        <div className="bg-[#111827] rounded-2xl p-4 border border-[#22C55E]/30 bg-[#22C55E]/5 animate-in fade-in">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#22C55E]">
            <Sparkles className="w-4 h-4" />
            <span>SAFAI AI Real-time Prediction Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Category Prediction */}
            {predictedCategory && (
              <div className="bg-[#1A2332] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#9CA3AF]">Predicted Category</p>
                  <p className="text-sm font-bold text-white">{predictedCategory}</p>
                  <p className="text-[10px] text-[#22C55E] font-medium">Confidence: {intPct(confidence)}</p>
                </div>
                {currentCategory !== predictedCategory ? (
                  <button
                    type="button"
                    onClick={() => onApplyCategory(predictedCategory)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#22C55E] text-white hover:bg-[#16A34A] transition-all flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Accept
                  </button>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Applied</span>
                )}
              </div>
            )}

            {/* Priority Prediction */}
            {priority && (
              <div className="bg-[#1A2332] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#9CA3AF]">Predicted Priority</p>
                  <p className={`text-sm font-bold ${priority === 'HIGH' ? 'text-red-400' : priority === 'MEDIUM' ? 'text-amber-400' : 'text-blue-400'}`}>
                    {priority}
                  </p>
                  <p className="text-[10px] text-[#9CA3AF] truncate max-w-[160px]">{priorityReason}</p>
                </div>
                {currentPriority !== priority ? (
                  <button
                    type="button"
                    onClick={() => onApplyPriority(priority)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#22C55E] text-white hover:bg-[#16A34A] transition-all flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Accept
                  </button>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Applied</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Analysis Preview */}
      {imageAnalysis && (
        <div className="bg-[#111827] rounded-2xl p-4 border border-blue-500/30 bg-blue-500/5">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-400">
            <Camera className="w-4 h-4" />
            <span>AI Image Analysis (Vision Classification)</span>
          </div>

          <div className="flex items-center justify-between bg-[#1A2332] p-3 rounded-xl border border-white/5">
            <div>
              <p className="text-xs font-bold text-white">{imageAnalysis.detected_category}</p>
              <p className="text-[11px] text-[#9CA3AF]">{imageAnalysis.recommended_action}</p>
            </div>
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
              Confidence: {imageAnalysis.confidence_percentage}
            </span>
          </div>
        </div>
      )}

      {/* Duplicate Alert Banner */}
      {duplicateInfo && duplicateInfo.is_duplicate_detected && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-amber-300">
          <div className="flex items-center gap-2 font-bold text-sm mb-2 text-amber-400">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>This issue may already have been reported!</span>
          </div>
          <p className="text-xs text-amber-200/90 leading-relaxed mb-3">
            A similar complaint ({duplicateInfo.existing_complaint?.complaint_id}) was filed nearby ({duplicateInfo.existing_complaint?.distance_meters ? `${duplicateInfo.existing_complaint.distance_meters}m away` : 'same ward'}) under category "{duplicateInfo.existing_complaint?.category}". Status: <span className="font-bold text-white">{duplicateInfo.existing_complaint?.status}</span>.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert(`Existing Complaint details:\nID: ${duplicateInfo.existing_complaint?.complaint_id}\nCategory: ${duplicateInfo.existing_complaint?.category}\nStatus: ${duplicateInfo.existing_complaint?.status}`)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-black hover:bg-amber-400 transition-all"
            >
              View Existing Complaint
            </button>
            <span className="text-[11px] text-amber-300/80">You can still proceed if this is a separate issue.</span>
          </div>
        </div>
      )}
    </div>
  );
};

const intPct = (val) => {
  if (val === null || val === undefined || val === '') return '85%';
  if (typeof val === 'string' && val.includes('%')) return val;
  const num = typeof val === 'number' ? val : parseFloat(val);
  if (isNaN(num)) return '85%';
  return num <= 1 ? `${Math.round(num * 100)}%` : `${Math.round(num)}%`;
};


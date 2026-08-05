import React, { useState, useEffect } from 'react';
import { Camera, MapPin, AlertTriangle, CheckCircle2, Upload, Navigation, ArrowLeft, Sparkles, Lock, LogIn, UserPlus } from 'lucide-react';
import { complaintService } from '../services/complaintService';
import { aiService } from '../services/aiService';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { PredictionCard } from '../components/ai/PredictionCard';

export const ReportIssue = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [category, setCategory] = useState('Garbage Accumulation');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // AI Assistant States
  const [predictedCategory, setPredictedCategory] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [predictedPriority, setPredictedPriority] = useState('');
  const [priorityReason, setPriorityReason] = useState('');
  const [duplicateInfo, setDuplicateInfo] = useState(null);
  const [imageAnalysis, setImageAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const categories = [
    'Garbage Accumulation',
    'Street Cleaning',
    'Open Dumping',
    'Overflowing Dustbin',
    'Missed Waste Collection',
    'Other'
  ];

  // AI Real-time Assistant Trigger on Description change
  useEffect(() => {
    if (!description || description.trim().length < 8) {
      setPredictedCategory('');
      setPredictedPriority('');
      setDuplicateInfo(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const catRes = await aiService.predictCategory(description);
        if (catRes) {
          setPredictedCategory(catRes.category);
          setConfidence(catRes.confidence);
        }

        const prioRes = await aiService.predictPriority(description, category, address);
        if (prioRes) {
          setPredictedPriority(prioRes.priority);
          setPriorityReason(prioRes.reason);
        }

        const dupRes = await aiService.checkDuplicate({
          latitude,
          longitude,
          category,
          description,
          address
        });
        if (dupRes) {
          setDuplicateInfo(dupRes);
        }
      } catch (err) {
        console.error('AI prediction error:', err);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [description, address, category, latitude, longitude]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));

      // Trigger AI Computer Vision analysis
      try {
        const visionRes = await aiService.analyzeImage(file);
        if (visionRes) {
          setImageAnalysis(visionRes);
          if (visionRes.detected_category && visionRes.detected_category !== 'Street Waste') {
            setPredictedCategory(visionRes.detected_category);
          }
        }
      } catch (err) {
        console.error('Vision analysis error:', err);
      }
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(4));
          setLongitude(position.coords.longitude.toFixed(4));
          setAddress(`Saheed Nagar, Bhubaneswar (GPS: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`);
        },
        () => {
          setAddress('Janpath Road, Saheed Nagar, Bhubaneswar');
          setLatitude(20.2886);
          setLongitude(85.8427);
        }
      );
    } else {
      setAddress('Janpath Road, Saheed Nagar, Bhubaneswar');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) {
      setErrorMsg('Please provide location or click Detect Geolocation.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('latitude', latitude || '20.2961');
    formData.append('longitude', longitude || '85.8245');
    formData.append('priority', priority);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const res = await complaintService.createComplaint(formData);
      setSuccessData(res);
    } catch (err) {
      setErrorMsg('Unable to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 px-4 animate-in zoom-in-95 duration-200">
        <div className="glass-card p-8 rounded-3xl border border-[#22C55E]/30 bg-[#1A2332]/90 backdrop-blur-xl text-center space-y-6 shadow-2xl shadow-[#22C55E]/10">
          <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-wide">PLEASE LOG IN OR REGISTER</h2>
            <p className="text-sm text-[#9CA3AF]">
              To report a cleanliness issue in your area and earn citizen reward points, please sign in or create a new account.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#111827] border border-white/10 text-xs text-[#9CA3AF] text-left space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Sparkles className="w-4 h-4 text-[#22C55E]" /> Why account is required:
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Track real-time status & resolution of your report</li>
              <li>Earn +50 reward points upon submission</li>
              <li>Direct updates from municipal field teams</li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              to="/login"
              state={{ from: '/report-issue' }}
              className="w-full py-3.5 px-6 rounded-xl bg-[#22C55E] text-white font-bold text-sm hover:bg-[#16A34A] shadow-lg shadow-[#22C55E]/25 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Log In to Account
            </Link>
            
            <Link
              to="/register"
              state={{ from: '/report-issue' }}
              className="w-full py-3.5 px-6 rounded-xl bg-[#111827] text-white font-bold text-sm border border-white/10 hover:bg-[#1A2332] hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-[#22C55E]" /> Register New Account
            </Link>
          </div>

          <div className="pt-2">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl sm:text-4xl font-black text-white">REPORT CLEANLINESS ISSUE</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> AI Assisted
          </span>
        </div>
        <p className="text-[#9CA3AF] text-sm">
          Submit details and photos of any urban waste or sanitation concern in Bhubaneswar for quick municipal resolution.
        </p>
      </div>

      {/* Success Modal */}
      {successData ? (
        <div className="glass-card p-8 rounded-3xl border border-[#22C55E]/30 bg-[#1A2332] text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Your issue has been reported successfully.</h2>
            <p className="text-sm text-[#9CA3AF]">
              Complaint ID: <strong className="text-[#22C55E] font-mono text-base">{successData.complaint_id}</strong>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111827] border border-white/10 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Category:</span>
              <span className="font-semibold text-white">{successData.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Location:</span>
              <span className="font-semibold text-white truncate max-w-[200px]">{successData.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Initial Priority:</span>
              <span className="font-semibold text-[#22C55E]">{successData.priority}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Reward Points:</span>
              <span className="font-semibold text-[#22C55E]">+50 Points Earned</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/my-reports"
              className="px-6 py-3 rounded-xl bg-[#22C55E] text-white font-bold text-sm hover:bg-[#16A34A] transition-all"
            >
              Track Complaint Status
            </Link>
            <button
              onClick={() => {
                setSuccessData(null);
                setDescription('');
                setImageFile(null);
                setImagePreview(null);
                setImageAnalysis(null);
                setPredictedCategory('');
                setPredictedPriority('');
              }}
              className="px-6 py-3 rounded-xl bg-[#111827] text-white font-bold text-sm border border-white/10 hover:bg-[#1A2332]"
            >
              Report Another Issue
            </button>
          </div>
        </div>
      ) : (
        /* Complaint Form */
        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Issue Category */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-white uppercase tracking-wider">
              1. Issue Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-white font-medium focus:outline-none focus:border-[#22C55E]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 2. Description */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-white uppercase tracking-wider">
              2. Description *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe the cleanliness issue (e.g. Garbage overflowing near market, waste not collected for 3 days)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-white font-medium placeholder-gray-500 focus:outline-none focus:border-[#22C55E]"
            />
          </div>

          {/* Realtime AI Prediction Engine Feedback Card */}
          <PredictionCard
            predictedCategory={predictedCategory}
            confidence={confidence}
            priority={predictedPriority}
            priorityReason={priorityReason}
            duplicateInfo={duplicateInfo}
            imageAnalysis={imageAnalysis}
            currentCategory={category}
            currentPriority={priority}
            onApplyCategory={(cat) => setCategory(cat)}
            onApplyPriority={(prio) => setPriority(prio)}
          />

          {/* 3. Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-white uppercase tracking-wider">
              3. Image Upload (Auto AI Classification)
            </label>
            <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center bg-[#111827]/50 hover:border-[#22C55E]/50 transition-colors">
              {imagePreview ? (
                <div className="space-y-3">
                  <img src={imagePreview} alt="Preview" className="h-48 max-w-full mx-auto rounded-xl object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null); setImageAnalysis(null); }}
                    className="text-xs text-red-400 underline font-semibold"
                  >
                    Remove photo
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer space-y-2 block">
                  <Upload className="w-8 h-8 text-[#22C55E] mx-auto" />
                  <span className="text-sm font-semibold text-white block">Upload photo of the issue</span>
                  <span className="text-xs text-[#9CA3AF] block">PNG, JPG up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* 4. Location */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-white uppercase tracking-wider">
                4. Location / Address *
              </label>
              <button
                type="button"
                onClick={handleGetLocation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22C55E] hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" /> Detect Geolocation
              </button>
            </div>
            <div className="relative">
              <MapPin className="w-5 h-5 text-[#9CA3AF] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Enter area (e.g. Vijay Nagar, Patia, Master Canteen, Saheed Nagar)..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-white font-medium focus:outline-none focus:border-[#22C55E]"
              />
            </div>
          </div>

          {/* 5. Priority */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-white uppercase tracking-wider">
              5. Priority Level *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['LOW', 'MEDIUM', 'HIGH'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                    priority === p
                      ? 'bg-[#22C55E] text-white border-[#22C55E] shadow-md'
                      : 'bg-[#111827] text-[#9CA3AF] border-white/10 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-base font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-xl shadow-[#22C55E]/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Submitting to Django AI Engine...</span>
              ) : (
                <>
                  <Camera className="w-5 h-5" /> SUBMIT COMPLAINT
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
};

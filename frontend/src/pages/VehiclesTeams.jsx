import React, { useState, useEffect } from 'react';
import { vehicleService } from '../services/vehicleService';
import { aiService } from '../services/aiService';
import { InteractiveMap } from '../components/InteractiveMap';
import { Truck, MapPin, Navigation, Clock, ShieldCheck, ArrowLeft, Sparkles, AlertTriangle, CheckCircle2, Route, Gauge, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export const VehiclesTeams = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getVehicles();
        setVehicles(data);
        if (data && data.length > 0) {
          setSelectedVehicle(data[0]);
          loadRoute(data[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const loadRoute = async (vehicleId) => {
    setRouteLoading(true);
    try {
      const res = await aiService.getVehicleRoute(vehicleId);
      setRouteData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setRouteLoading(false);
    }
  };

  const handleSelectVehicle = (v) => {
    setSelectedVehicle(v);
    loadRoute(v.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <Link to="/admin-dashboard" className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to Admin Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-black text-white">VEHICLES & ROUTE OPTIMIZATION</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> AI Daily Route Engine
          </span>
        </div>
        <p className="text-xs text-[#9CA3AF]">
          GPS-based sanitation vehicle tracking and AI-generated daily collection route optimization.
        </p>
      </div>

      {/* Interactive GPS Visual Tracker Map */}
      <InteractiveMap vehicles={vehicles} />

      {/* FEATURE 2: AI ROUTE OPTIMIZATION PANEL */}
      <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]">
              <Route className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                AI Recommended Daily Route
                <span className="text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-0.5 rounded border border-[#22C55E]/20">
                  {selectedVehicle?.vehicle_number || 'OD-02-BM-1042'}
                </span>
              </h2>
              <p className="text-xs text-[#9CA3AF]">Optimized stop sequence based on complaint priority, density & spatial distance</p>
            </div>
          </div>

          {/* Vehicle selector pills */}
          <div className="flex flex-wrap items-center gap-2">
            {vehicles.map((v) => (
              <button
                key={v.id}
                onClick={() => handleSelectVehicle(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedVehicle?.id === v.id
                    ? 'bg-[#22C55E] text-white border-[#22C55E]'
                    : 'bg-[#1A2332] text-[#9CA3AF] border-white/10 hover:text-white'
                }`}
              >
                {v.vehicle_number}
              </button>
            ))}
          </div>
        </div>

        {routeLoading ? (
          <div className="py-12 text-center text-xs text-[#9CA3AF] flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#22C55E] animate-spin" />
            Generating AI optimized daily route...
          </div>
        ) : routeData ? (
          <div className="space-y-6">
            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#1A2332] p-3.5 rounded-xl border border-white/5">
                <p className="text-[11px] text-[#9CA3AF] font-medium">Driver Assigned</p>
                <p className="text-sm font-bold text-white truncate">{routeData.driver}</p>
              </div>

              <div className="bg-[#1A2332] p-3.5 rounded-xl border border-white/5">
                <p className="text-[11px] text-[#9CA3AF] font-medium">Estimated Distance</p>
                <p className="text-sm font-bold text-[#22C55E]">{routeData.estimated_distance_km} km</p>
              </div>

              <div className="bg-[#1A2332] p-3.5 rounded-xl border border-white/5">
                <p className="text-[11px] text-[#9CA3AF] font-medium">Estimated Duration</p>
                <p className="text-sm font-bold text-amber-400">{routeData.estimated_time_mins} mins</p>
              </div>

              <div className="bg-[#1A2332] p-3.5 rounded-xl border border-white/5">
                <p className="text-[11px] text-[#9CA3AF] font-medium">Priority Stops</p>
                <p className="text-sm font-bold text-red-400">{routeData.priority_stops_count} High Priority</p>
              </div>
            </div>

            {/* Route Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#9CA3AF] font-semibold">
                <span>Today's Route Completion Progress</span>
                <span className="text-[#22C55E]">{routeData.completion_percentage || 40}% Completed</span>
              </div>
              <div className="w-full bg-[#1A2332] h-2.5 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className="bg-[#22C55E] h-full rounded-full transition-all duration-500"
                  style={{ width: `${routeData.completion_percentage || 40}%` }}
                />
              </div>
            </div>

            {/* AI Insights & Guidance Notes */}
            {routeData.ai_recommendations && (
              <div className="bg-[#0B0F14] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#22C55E]">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Route Optimization Reasoning:</span>
                </div>
                <ul className="space-y-1 text-xs text-[#D1D5DB]">
                  {routeData.ai_recommendations.map((note, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Stops Timeline */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Optimized Sequence of Stops</h3>

              <div className="space-y-2">
                {routeData.todays_route.map((stop) => (
                  <div
                    key={stop.stop_number}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-[#1A2332]/80 border border-white/5 hover:border-white/10 transition-all gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        stop.is_high_priority
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30'
                      }`}>
                        #{stop.stop_number}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{stop.ward}</h4>
                          <span className="text-[10px] font-mono text-[#22C55E]">{stop.complaint_id}</span>
                        </div>
                        <p className="text-xs text-[#9CA3AF]">{stop.address}</p>
                        <p className="text-[11px] text-[#D1D5DB] mt-0.5">Category: {stop.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold ${
                        stop.priority === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {stop.priority}
                      </span>
                      <span className="text-xs font-semibold text-white bg-[#111827] px-3 py-1 rounded-lg border border-white/10">
                        ETA: {stop.estimated_arrival}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Vehicles Fleet List */}
      <div className="space-y-4 pt-4">
        <h2 className="text-2xl font-bold text-white">Active Sanitation Vehicles Fleet</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((v) => (
            <div
              key={v.id}
              onClick={() => handleSelectVehicle(v)}
              className={`glass-card glass-card-hover p-6 rounded-2xl border transition-all cursor-pointer ${
                selectedVehicle?.id === v.id ? 'border-[#22C55E] bg-[#22C55E]/5' : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    v.status === 'Active'
                      ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30'
                      : v.status === 'Delayed'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {v.status}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="text-lg font-bold text-white">{v.vehicle_number}</h3>
                <p className="text-xs text-[#9CA3AF]">Driver: <strong className="text-white">{v.driver}</strong></p>
              </div>

              <div className="p-3 rounded-xl bg-[#111827] border border-white/5 space-y-1.5 text-xs text-[#D1D5DB] mt-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                  <span>Route: <strong className="text-white">{v.route}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF]">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>GPS Ping: {v.last_updated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

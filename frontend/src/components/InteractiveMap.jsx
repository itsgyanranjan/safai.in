import React, { useState } from 'react';
import { Truck, MapPin, AlertCircle, Navigation, ShieldCheck } from 'lucide-react';

export const InteractiveMap = ({ vehicles = [], selectedRoute }) => {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [hoveredItem, setHoveredItem] = useState(null);

  const mockLocations = [
    { id: 1, name: 'Saheed Nagar', type: 'Ward', score: 96, risk: 'HIGH', x: '68%', y: '28%', activeVehicles: 2, complaints: 142 },
    { id: 2, name: 'Old Town Heritage', type: 'Ward', score: 89, risk: 'MEDIUM', x: '38%', y: '52%', activeVehicles: 1, complaints: 98 },
    { id: 3, name: 'Patia KIIT Square', type: 'Ward', score: 94, risk: 'HIGH', x: '58%', y: '48%', activeVehicles: 1, complaints: 128 },
    { id: 4, name: 'Jaydev Vihar', type: 'Ward', score: 88, risk: 'MEDIUM', x: '42%', y: '72%', activeVehicles: 1, complaints: 74 },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#22C55E]" />
            Live City Sanitation & GPS Vehicle Tracker
          </h3>
          <p className="text-xs text-[#9CA3AF]">
            GPS-based vehicle tracking and ward sanitation risk simulation (Bhubaneswar Municipal Corporation Zone)
          </p>
        </div>
        <div className="flex bg-[#111827] p-1 rounded-xl border border-white/10 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'vehicles' ? 'bg-[#22C55E] text-white' : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            GPS Vehicles
          </button>
          <button
            onClick={() => setActiveTab('hotspots')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'hotspots' ? 'bg-[#22C55E] text-white' : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            Waste Hotspots
          </button>
        </div>
      </div>

      {/* Map Graphic Canvas Container */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#0F172A] border border-white/10 overflow-hidden shadow-inner flex items-center justify-center">
        
        {/* Map grid line graphics */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />

        {/* City Road Network Graphics */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-700/60 stroke-[3] fill-none pointer-events-none">
          <path d="M 50 150 Q 200 120 400 200 T 800 250" />
          <path d="M 250 50 Q 300 250 350 380" />
          <path d="M 100 300 C 300 280, 500 150, 750 100" />
        </svg>

        {/* Location Markers */}
        {mockLocations.map((loc) => (
          <div
            key={loc.id}
            style={{ left: loc.x, top: loc.y }}
            onMouseEnter={() => setHoveredItem(loc)}
            onMouseLeave={() => setHoveredItem(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              {/* Pulse Ring for Risk */}
              <div
                className={`absolute w-10 h-10 rounded-full animate-ping opacity-30 ${
                  loc.risk === 'HIGH' ? 'bg-red-500' : 'bg-amber-500'
                }`}
              />
              <div className="w-8 h-8 rounded-full bg-[#1A2332] border-2 border-[#22C55E] text-white font-bold text-xs flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                {loc.score}%
              </div>
            </div>
            <span className="absolute top-9 left-1/2 -translate-x-1/2 bg-[#0B0F14]/90 text-white font-semibold text-[10px] px-2 py-0.5 rounded border border-white/10 whitespace-nowrap">
              {loc.name}
            </span>
          </div>
        ))}

        {/* Vehicles GPS Icons */}
        {vehicles.map((v, idx) => {
          const positions = [
            { x: '62%', y: '32%' },
            { x: '35%', y: '58%' },
            { x: '55%', y: '44%' },
            { x: '45%', y: '68%' },
          ];
          const pos = positions[idx % positions.length];
          return (
            <div
              key={v.id || idx}
              style={{ left: pos.x, top: pos.y }}
              onMouseEnter={() => setHoveredItem({ name: v.vehicle_number, driver: v.driver, route: v.route, status: v.status })}
              onMouseLeave={() => setHoveredItem(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            >
              <div className="w-9 h-9 rounded-xl bg-[#22C55E] text-white flex items-center justify-center shadow-lg shadow-[#22C55E]/40 hover:scale-110 transition-transform border border-white/20">
                <Truck className="w-5 h-5" />
              </div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#22C55E] text-black font-bold text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap shadow">
                {v.vehicle_number}
              </span>
            </div>
          );
        })}

        {/* Tooltip Overlay */}
        {hoveredItem && (
          <div className="absolute bottom-4 left-4 bg-[#1A2332]/95 border border-white/10 backdrop-blur p-3 rounded-xl shadow-2xl text-xs z-30 text-white max-w-xs animate-in fade-in duration-150">
            <p className="font-bold text-[#22C55E]">{hoveredItem.name}</p>
            {hoveredItem.driver && <p className="text-gray-300">Driver: {hoveredItem.driver}</p>}
            {hoveredItem.route && <p className="text-gray-300">Route: {hoveredItem.route}</p>}
            {hoveredItem.score && <p className="text-gray-300">Cleanliness Score: {hoveredItem.score}%</p>}
            {hoveredItem.risk && (
              <p className="text-gray-300">
                Hotspot Risk:{' '}
                <span className={hoveredItem.risk === 'HIGH' ? 'text-red-400 font-bold' : 'text-amber-400 font-bold'}>
                  {hoveredItem.risk}
                </span>
              </p>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="absolute top-3 right-3 bg-[#0B0F14]/80 backdrop-blur p-2.5 rounded-xl border border-white/10 text-[10px] space-y-1 text-gray-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" /> GPS Sanitation Truck
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> High Waste Risk Zone
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium Risk Zone
          </div>
        </div>
      </div>
    </div>
  );
};

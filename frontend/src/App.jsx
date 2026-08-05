import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { SafaiAiChatbot } from './components/ai/SafaiAiChatbot';

import { Home } from './pages/Home';
import { ReportIssue } from './pages/ReportIssue';
import { CleanupDrives } from './pages/CleanupDrives';
import { PublicStats } from './pages/PublicStats';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { MyReports } from './pages/MyReports';
import { ComplaintDetails } from './pages/ComplaintDetails';
import { Rewards } from './pages/Rewards';
import { AdminDashboard } from './pages/AdminDashboard';
import { ManageComplaints } from './pages/ManageComplaints';
import { VehiclesTeams } from './pages/VehiclesTeams';
import { AIDashboard } from './pages/AIDashboard';
import { AwarenessHub } from './pages/AwarenessHub';
import { MyCertificates } from './pages/MyCertificates';

import { WorkerLogin } from './pages/WorkerLogin';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { WorkerTaskDetails } from './pages/WorkerTaskDetails';
import { WorkerProfile } from './pages/WorkerProfile';
import { ManageWorkers } from './pages/ManageWorkers';

export function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0B0F14] text-[#D1D5DB] flex flex-col justify-between selection:bg-[#22C55E]/30 selection:text-white relative">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/drives" element={<CleanupDrives />} />
            <Route path="/stats" element={<PublicStats />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ai-dashboard" element={<AIDashboard />} />
            <Route path="/awareness-hub" element={<AwarenessHub />} />

            {/* Dedicated Field Worker Login */}
            <Route path="/worker/login" element={<WorkerLogin />} />

            {/* Authenticated Citizen Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<CitizenDashboard />} />
              <Route path="/my-reports" element={<MyReports />} />
              <Route path="/complaints/:id" element={<ComplaintDetails />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/my-certificates" element={<MyCertificates />} />
              
              {/* Field Worker Portal Routes */}
              <Route path="/worker/dashboard" element={<WorkerDashboard />} />
              <Route path="/worker/tasks/:id" element={<WorkerTaskDetails />} />
              <Route path="/worker/profile" element={<WorkerProfile />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/manage-complaints" element={<ManageComplaints />} />
              <Route path="/vehicles-teams" element={<VehiclesTeams />} />
              <Route path="/manage-workers" element={<ManageWorkers />} />
            </Route>
          </Routes>
        </main>

        {/* Global Floating AI Assistant Widget */}
        <SafaiAiChatbot />

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

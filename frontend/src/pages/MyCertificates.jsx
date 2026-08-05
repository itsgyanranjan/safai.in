import React, { useState, useEffect, useRef } from 'react';
import { Award, Download, Eye, QrCode, ShieldCheck, ArrowLeft, Calendar, MapPin, CheckCircle2, Sparkles, X } from 'lucide-react';
import { driveService } from '../services/driveService';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import safaiLogo from '../assets/safai_logo.png';

export function MyCertificates() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  const certRef = useRef(null);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await driveService.getCertificates();
        setCertificates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  const handleDownloadPdf = (cert) => {
    // Printable / Downloadable PDF window action
    const printContent = `
      <html>
        <head>
          <title>Certificate of Participation - ${cert.certificate_id}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0B0F14; color: #ffffff; padding: 40px; text-align: center; }
            .cert-box { border: 8px solid #22C55E; padding: 40px; background: #111827; border-radius: 24px; max-width: 800px; margin: 0 auto; box-shadow: 0 0 30px rgba(34, 197, 94, 0.3); }
            h1 { color: #22C55E; font-size: 32px; letter-spacing: 2px; margin-bottom: 5px; }
            h2 { font-size: 24px; color: #ffffff; margin-top: 20px; }
            p { color: #9CA3AF; font-size: 14px; line-height: 1.6; }
            .name { font-size: 28px; font-weight: bold; color: #22C55E; text-decoration: underline; margin: 20px 0; }
            .drive-title { font-size: 20px; color: #ffffff; font-weight: bold; }
            .footer-row { display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: #9CA3AF; }
          </style>
        </head>
        <body>
          <div class="cert-box">
            <h1>SWACHHATA ABHIYAN SAFAI</h1>
            <p>MUNICIPAL ENVIRONMENT & SANITATION CELL</p>
            <h2 style="letter-spacing: 3px;">CERTIFICATE OF PARTICIPATION</h2>
            <p>This is to proudly certify that</p>
            <div class="name">${cert.participant_name || user?.name || 'Citizen Volunteer'}</div>
            <p>has actively participated in the municipal cleanliness mobilization drive</p>
            <div class="drive-title">"${cert.drive_title}"</div>
            <p>held at <strong>${cert.location}</strong> on <strong>${cert.date}</strong>.</p>
            <div class="footer-row">
              <div>
                <p>Certificate ID: ${cert.certificate_id}</p>
                <p>Verified QR: ${cert.qr_code_hash || 'SAFAI-8942-VERIFIED'}</p>
              </div>
              <div>
                <p style="color: #22C55E; font-weight: bold;">Authorized Municipal Seal</p>
                <p>Issued by SAFAI Authorities</p>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <h1 className="text-3xl font-black text-white">MY DIGITAL CERTIFICATES</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-bold">
              <Award className="w-3.5 h-3.5" /> Verified Badges
            </span>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Official municipal certificates of participation earned by participating in SAFAI cleanup drives.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-[#9CA3AF]">Loading certificates...</div>
      ) : certificates.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl border border-white/10 text-center space-y-4 max-w-md mx-auto">
          <Award className="w-12 h-12 text-[#9CA3AF] mx-auto" />
          <h3 className="text-lg font-bold text-white">No Certificates Issued Yet</h3>
          <p className="text-xs text-[#9CA3AF]">
            Participate in municipal cleanup drives and have your participation verified by municipal admins to earn digital certificates!
          </p>
          <Link
            to="/drives"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#22C55E] text-white font-bold text-xs hover:bg-[#16A34A] transition-all"
          >
            Explore Upcoming Drives
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#111827] rounded-3xl p-6 border border-[#22C55E]/30 bg-[#22C55E]/5 hover:border-[#22C55E]/60 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/20 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/20">
                      {cert.certificate_id}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 leading-snug">{cert.drive_title}</h3>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1A2332] border border-white/5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span>Participant:</span>
                  <span className="font-bold text-white">{cert.participant_name || user?.name}</span>
                </div>
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#22C55E]" /> Location:</span>
                  <span className="font-medium text-white truncate max-w-[200px]">{cert.location}</span>
                </div>
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" /> Date Issued:</span>
                  <span className="font-medium text-white">{cert.date}</span>
                </div>
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span>Issued By:</span>
                  <span className="font-bold text-emerald-400">SAFAI Municipal Cell</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#1A2332] text-white border border-white/10 hover:border-[#22C55E] flex items-center justify-center gap-1.5 transition-all"
                >
                  <Eye className="w-4 h-4 text-[#22C55E]" /> Preview
                </button>
                <button
                  onClick={() => handleDownloadPdf(cert)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] flex items-center justify-center gap-1.5 shadow-lg shadow-[#22C55E]/20 transition-all"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATE PREVIEW MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0F14] border-2 border-[#22C55E] rounded-3xl max-w-2xl w-full p-6 sm:p-10 space-y-6 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-[#9CA3AF] hover:text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Certificate Header Banner */}
            <div className="text-center space-y-2 border-b border-white/10 pb-6">
              <img src={safaiLogo} alt="SAFAI" className="w-14 h-14 rounded-2xl mx-auto border-2 border-[#22C55E]/50" />
              <h2 className="text-xl font-black tracking-widest text-[#22C55E] uppercase">SAFAI MUNICIPAL SWACHHATA CELL</h2>
              <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest font-semibold">Government Municipal Environmental Initiative</p>
            </div>

            {/* Certificate Body */}
            <div className="text-center space-y-4 py-2">
              <span className="px-4 py-1 rounded-full text-xs font-black bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 tracking-widest uppercase">
                CERTIFICATE OF PARTICIPATION
              </span>

              <p className="text-xs text-[#9CA3AF]">This certificate is proudly presented to</p>

              <h1 className="text-2xl sm:text-3xl font-black text-white underline decoration-[#22C55E] decoration-2 underline-offset-8">
                {selectedCert.participant_name || user?.name || 'Citizen Volunteer'}
              </h1>

              <p className="text-xs text-[#D1D5DB] leading-relaxed max-w-lg mx-auto">
                for outstanding community service and active participation in the municipal cleanliness drive
                <br />
                <strong className="text-white font-bold text-sm block mt-1">"{selectedCert.drive_title}"</strong>
              </p>

              <div className="flex items-center justify-center gap-6 text-xs text-[#9CA3AF] pt-2">
                <span>Location: <strong className="text-white">{selectedCert.location}</strong></span>
                <span>Date: <strong className="text-white">{selectedCert.date}</strong></span>
              </div>
            </div>

            {/* Certificate Footer Row: QR Code & Signature Placeholders */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#9CA3AF]">
              {/* QR Code Placeholder */}
              <div className="flex items-center gap-2 bg-[#111827] p-2.5 rounded-xl border border-white/10">
                <QrCode className="w-8 h-8 text-[#22C55E]" />
                <div className="text-left text-[10px]">
                  <p className="font-bold text-white">Verified Certificate</p>
                  <p className="font-mono text-[#9CA3AF]">{selectedCert.certificate_id}</p>
                </div>
              </div>

              {/* Digital Signature Placeholder */}
              <div className="text-right space-y-1">
                <div className="font-script text-base text-[#22C55E] font-bold italic tracking-wider">
                  Swachhata Officer
                </div>
                <div className="h-0.5 w-32 bg-white/20 ml-auto" />
                <p className="text-[10px] text-[#9CA3AF] font-semibold">Authorized Municipal Signature</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 rounded-xl bg-[#111827] text-white font-bold text-xs border border-white/10 hover:bg-[#1A2332]"
              >
                Close Preview
              </button>
              <button
                onClick={() => handleDownloadPdf(selectedCert)}
                className="px-5 py-2.5 rounded-xl bg-[#22C55E] text-white font-bold text-xs hover:bg-[#16A34A] flex items-center gap-2 shadow-lg shadow-[#22C55E]/20"
              >
                <Download className="w-4 h-4" /> Download Official PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MyCertificates;

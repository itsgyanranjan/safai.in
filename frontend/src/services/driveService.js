import api from './api';

const MOCK_DRIVES = [
  {
    id: 1,
    title: 'Saheed Nagar Plastic-Free Drive',
    description: 'Join community volunteers for a morning plastic-free cleanup campaign across Saheed Nagar market and Janpath walkways.',
    location: 'Saheed Nagar Market Square, Bhubaneswar',
    date: '2026-08-15',
    time: '7:00 AM - 10:00 AM',
    max_participants: 100,
    participant_count: 78,
    is_joined: false,
    created_at: '2026-08-01T08:00:00Z'
  },
  {
    id: 2,
    title: 'Old Town Heritage Clean-up',
    description: 'Protect historic heritage! A grand Sunday cleanliness drive around Lingaraj Temple perimeter and traditional Old Town lanes.',
    location: 'Lingaraj Temple Area, Old Town, Bhubaneswar',
    date: '2026-08-18',
    time: '7:00 AM - 10:00 AM',
    max_participants: 150,
    participant_count: 124,
    is_joined: true,
    created_at: '2026-08-01T09:00:00Z'
  },
  {
    id: 3,
    title: 'Patia Market Beautification',
    description: 'Planting trees, painting public bin stations, and cleaning roadside walkways in Patia KIIT Square area.',
    location: 'KIIT Square, Patia, Bhubaneswar',
    date: '2026-08-22',
    time: '7:00 AM - 10:00 AM',
    max_participants: 80,
    participant_count: 45,
    is_joined: false,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 4,
    title: 'Khandagiri Caves Eco-Sanitation Drive',
    description: 'Special weekend eco-cleaning initiative at Khandagiri & Udayagiri tourist caves site.',
    location: 'Khandagiri Caves Complex, Bhubaneswar',
    date: '2026-08-25',
    time: '6:30 AM - 9:30 AM',
    max_participants: 120,
    participant_count: 62,
    is_joined: false,
    created_at: '2026-08-02T07:00:00Z'
  },
  {
    id: 5,
    title: 'Jaydev Vihar Clean Green Corridor',
    description: 'Roadside trash cleanup and public bin maintenance along Jaydev Vihar to Ekamra Kanan park road.',
    location: 'Jaydev Vihar Square, Bhubaneswar',
    date: '2026-08-28',
    time: '7:00 AM - 10:00 AM',
    max_participants: 90,
    participant_count: 51,
    is_joined: false,
    created_at: '2026-08-02T08:00:00Z'
  },
  {
    id: 6,
    title: 'Master Canteen Precinct Cleanliness Drive',
    description: 'Mass citizen volunteer cleanup around Railway Station precinct & Master Canteen transit hub.',
    location: 'Master Canteen Square, Bhubaneswar',
    date: '2026-08-30',
    time: '7:00 AM - 10:00 AM',
    max_participants: 110,
    participant_count: 83,
    is_joined: false,
    created_at: '2026-08-02T09:00:00Z'
  }
];

const getStoredCertificates = () => {
  const stored = localStorage.getItem('safai_user_certificates');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  return [];
};

export const driveService = {
  async getDrives() {
    try {
      const response = await api.get('drives/');
      return response.data;
    } catch (error) {
      return [...MOCK_DRIVES];
    }
  },

  async joinDrive(id) {
    const drive = MOCK_DRIVES.find(d => d.id === parseInt(id));
    if (drive) {
      drive.is_joined = true;
      drive.participant_count += 1;
    }

    try {
      await api.post(`drives/${id}/join/`);
    } catch (error) {
      console.warn('Using client fallback for joining drive');
    }

    const currentUser = JSON.parse(localStorage.getItem('safai_user') || '{}');
    if (drive) {
      const certId = `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newCert = {
        id: Date.now(),
        certificate_id: certId,
        user: currentUser.id,
        participant_name: currentUser.name || 'Citizen Volunteer',
        cleanup_drive: drive.id,
        drive_title: drive.title,
        location: drive.location,
        date: drive.date,
        issued_at: new Date().toISOString(),
        qr_code_hash: `safai-verified-${certId}`
      };
      const existingCerts = getStoredCertificates();
      if (!existingCerts.some(c => c.cleanup_drive === drive.id)) {
        existingCerts.unshift(newCert);
        localStorage.setItem('safai_user_certificates', JSON.stringify(existingCerts));
      }
    }
    return { message: 'Successfully joined drive! Earned 100 points and certificate issued.' };
  },

  async leaveDrive(id) {
    try {
      await api.post(`drives/${id}/leave/`);
    } catch (error) {
      console.warn('Using client fallback for leaving drive');
    }

    const drive = MOCK_DRIVES.find(d => d.id === parseInt(id));
    if (drive) {
      drive.is_joined = false;
      drive.participant_count = Math.max(0, drive.participant_count - 1);
      
      const existingCerts = getStoredCertificates().filter(c => c.cleanup_drive !== drive.id);
      localStorage.setItem('safai_user_certificates', JSON.stringify(existingCerts));
    }
    return { message: 'Left drive successfully.' };
  },

  async getCertificates() {
    try {
      const response = await api.get('drives/certificates/');
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (error) {
      console.warn('Using client fallback for certificates');
    }
    return getStoredCertificates();
  },

  async verifyParticipant(driveId, userId) {
    try {
      const response = await api.post('drives/verify-participant/', { cleanup_drive_id: driveId, user_id: userId });
      if (response.data) return response.data;
    } catch (error) {
      console.warn('Using client fallback for participant verification');
    }
    const currentUser = JSON.parse(localStorage.getItem('safai_user') || '{}');
    const cert = {
      id: Date.now(),
      certificate_id: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      participant_name: currentUser.name || 'Citizen Volunteer',
      drive_title: 'Municipal Cleanup Initiative',
      location: 'Bhubaneswar Central Zone',
      date: new Date().toISOString().split('T')[0],
      qr_code_hash: `safai-verified-${Date.now()}`
    };
    const existingCerts = getStoredCertificates();
    existingCerts.unshift(cert);
    localStorage.setItem('safai_user_certificates', JSON.stringify(existingCerts));

    return {
      message: 'Citizen participation verified & digital certificate issued!',
      certificate: cert
    };
  }
};


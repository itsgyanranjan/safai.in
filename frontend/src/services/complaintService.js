import api from './api';

const DEFAULT_MOCK_COMPLAINTS = [
  {
    id: 1,
    complaint_id: 'SAF-2026-1049',
    category: 'Garbage Accumulation',
    description: 'Large pile of commercial unsegregated waste dumping near Saheed Nagar market square.',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    latitude: 20.2886,
    longitude: 85.8427,
    address: 'Plot 42, Janpath Road, Saheed Nagar, Bhubaneswar',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    reported_by_name: 'Aarav Sharma',
    assigned_team: 'Saheed Nagar BMC Sanitation Unit 4',
    created_at: '2026-08-01T10:30:00Z',
    updated_at: '2026-08-01T14:15:00Z',
    feedback: null
  },
  {
    id: 2,
    complaint_id: 'SAF-2026-1022',
    category: 'Overflowing Dustbin',
    description: 'Public community bin overflowing onto sidewalk near Lingaraj Temple Old Town entrance.',
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80',
    latitude: 20.2392,
    longitude: 85.8335,
    address: 'Temple Road, Old Town, Bhubaneswar',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    reported_by_name: 'Neha Verma',
    assigned_team: 'Old Town Heritage Sanitation Team B',
    created_at: '2026-07-29T08:15:00Z',
    updated_at: '2026-07-29T16:00:00Z',
    feedback: { rating: 5, comment: 'Cleaned thoroughly within 4 hours! Excellent quick work.' }
  },
  {
    id: 3,
    complaint_id: 'SAF-2026-1011',
    category: 'Missed Waste Collection',
    description: 'Door-to-door waste collection vehicle missed Lane 3 near KIIT Square for two consecutive days.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    latitude: 20.3541,
    longitude: 85.8184,
    address: 'KIIT Avenue, Patia, Bhubaneswar',
    priority: 'LOW',
    status: 'ASSIGNED',
    reported_by_name: 'Rohit Singh',
    assigned_team: 'Patia Door-to-Door Route 2',
    created_at: '2026-07-30T11:45:00Z',
    updated_at: '2026-07-31T09:00:00Z',
    feedback: null
  },
  {
    id: 4,
    complaint_id: 'SAF-2026-1005',
    category: 'Open Dumping',
    description: 'Illegal debris and plastic waste dumped near vacant plot behind Jaydev Vihar square.',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80',
    latitude: 20.3010,
    longitude: 85.8247,
    address: 'Nandankanan Road, Jaydev Vihar, Bhubaneswar',
    priority: 'HIGH',
    status: 'SUBMITTED',
    reported_by_name: 'Prayash Ranjan',
    assigned_team: 'Unassigned',
    created_at: '2026-08-02T06:00:00Z',
    updated_at: '2026-08-02T06:00:00Z',
    feedback: null
  }
];

const getStoredComplaints = () => {
  const stored = localStorage.getItem('safai_complaints');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem('safai_complaints', JSON.stringify(DEFAULT_MOCK_COMPLAINTS));
  return DEFAULT_MOCK_COMPLAINTS;
};

const saveStoredComplaints = (complaints) => {
  localStorage.setItem('safai_complaints', JSON.stringify(complaints));
};

export const complaintService = {
  async getComplaints(params = {}) {
    try {
      const response = await api.get('complaints/', { params });
      if (Array.isArray(response.data)) {
        if (response.data.length > 0) {
          saveStoredComplaints(response.data);
        }
        return response.data;
      }
    } catch (error) {
      console.warn('Backend endpoint fallback, loading persistent local complaints');
    }
    let data = getStoredComplaints();
    if (params.mine) {
      const currentUser = JSON.parse(localStorage.getItem('safai_user') || '{}');
      const userName = currentUser.name;
      const userId = currentUser.id;
      data = data.filter(c => 
        (userId && (c.reported_by === userId || c.reported_by_id === userId)) ||
        (userName && c.reported_by_name && c.reported_by_name.toLowerCase() === userName.toLowerCase())
      );
    }
    return data;
  },

  async getComplaint(id) {
    try {
      const response = await api.get(`complaints/${id}/`);
      return response.data;
    } catch (error) {
      const all = getStoredComplaints();
      const found = all.find(c => c.id === parseInt(id) || c.complaint_id === id);
      return found || all[0];
    }
  },

  async createComplaint(formData) {
    let createdFromBackend = null;
    try {
      const response = await api.post('complaints/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      createdFromBackend = response.data;
    } catch (error) {
      console.warn('Saved complaint to persistent storage');
    }

    const randId = Math.floor(1000 + Math.random() * 9000);
    const currentUser = JSON.parse(localStorage.getItem('safai_user') || '{}');

    const imageFile = formData.get('image');
    let imageUrl = 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80';
    if (imageFile && typeof imageFile === 'object' && imageFile instanceof File) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    const newComplaint = createdFromBackend || {
      id: Date.now(),
      complaint_id: `SAF-2026-${randId}`,
      category: formData.get('category') || 'Garbage Accumulation',
      description: formData.get('description') || 'Cleanliness issue reported by citizen.',
      image: imageUrl,
      latitude: parseFloat(formData.get('latitude')) || 20.2961,
      longitude: parseFloat(formData.get('longitude')) || 85.8245,
      address: formData.get('address') || 'Saheed Nagar, Bhubaneswar',
      priority: formData.get('priority') || 'MEDIUM',
      status: 'SUBMITTED',
      reported_by: currentUser.id,
      reported_by_name: currentUser.name || 'Citizen User',
      assigned_team: 'Unassigned',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      feedback: null
    };

    const currentList = getStoredComplaints();
    currentList.unshift(newComplaint);
    saveStoredComplaints(currentList);

    return newComplaint;
  },


  async updateStatus(id, status, assigned_team) {
    try {
      const response = await api.patch(`complaints/${id}/`, { status, assigned_team });
      if (response.data) {
        const all = getStoredComplaints();
        const updatedList = all.map(c => c.id === parseInt(id) ? response.data : c);
        saveStoredComplaints(updatedList);
        return response.data;
      }
    } catch (error) {
      console.warn('Updating status in local storage');
    }

    const all = getStoredComplaints();
    let updatedItem = null;
    const updatedList = all.map(c => {
      if (c.id === parseInt(id) || c.complaint_id === id) {
        updatedItem = {
          ...c,
          status: status || c.status,
          assigned_team: assigned_team !== undefined ? assigned_team : c.assigned_team,
          updated_at: new Date().toISOString()
        };
        return updatedItem;
      }
      return c;
    });
    saveStoredComplaints(updatedList);
    return updatedItem || all[0];
  },

  async submitFeedback(id, rating, comment) {
    try {
      await api.post(`complaints/${id}/feedback/`, { rating, comment });
    } catch (error) {
      console.warn('Submitting feedback to local storage');
    }

    const all = getStoredComplaints();
    const updatedList = all.map(c => {
      if (c.id === parseInt(id) || c.complaint_id === id) {
        return { ...c, feedback: { rating, comment } };
      }
      return c;
    });
    saveStoredComplaints(updatedList);
    return { rating, comment };
  }
};

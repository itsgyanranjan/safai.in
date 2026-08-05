import api from './api';

export const analyticsService = {
  async getStats() {
    try {
      const response = await api.get('analytics/stats/');
      return response.data;
    } catch (error) {
      return {
        city_cleanliness_score: 94,
        issues_reported: 12450,
        issues_resolved: 8920,
        active_citizens: 1240,
        cleanup_drives: 320,
        resolved_today: 125
      };
    }
  },

  async getWards() {
    try {
      const response = await api.get('analytics/wards/');
      return response.data;
    } catch (error) {
      return [
        { name: 'Saheed Nagar', cleanliness_score: 96, total_complaints: 420, resolved_complaints: 403 },
        { name: 'Patia', cleanliness_score: 94, total_complaints: 510, resolved_complaints: 479 },
        { name: 'Khandagiri', cleanliness_score: 91, total_complaints: 380, resolved_complaints: 346 },
        { name: 'Old Town', cleanliness_score: 89, total_complaints: 610, resolved_complaints: 543 },
        { name: 'Jaydev Vihar', cleanliness_score: 88, total_complaints: 320, resolved_complaints: 281 },
        { name: 'Master Canteen', cleanliness_score: 86, total_complaints: 490, resolved_complaints: 421 }
      ];
    }
  },

  async getHotspots() {
    try {
      const response = await api.get('analytics/hotspots/');
      return response.data;
    } catch (error) {
      return [
        {
          location: 'Saheed Nagar',
          risk_level: 'HIGH',
          complaints_count: 142,
          recommendation: 'Increase evening BMC sanitation vehicle passes & add 2 extra bins near commercial hubs.'
        },
        {
          location: 'Old Town',
          risk_level: 'MEDIUM',
          complaints_count: 98,
          recommendation: 'Deploy specialized heritage cleaning squad during morning Lingaraj temple visiting hours.'
        },
        {
          location: 'Patia (KIIT Square)',
          risk_level: 'HIGH',
          complaints_count: 128,
          recommendation: 'More cleaning visits recommended during evening hours around student food streets.'
        },
        {
          location: 'Master Canteen',
          risk_level: 'MEDIUM',
          complaints_count: 94,
          recommendation: 'Transit hub waste collection required twice daily at 8 AM and 7 PM.'
        }
      ];
    }
  }
};

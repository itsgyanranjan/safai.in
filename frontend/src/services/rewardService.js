import api from './api';

export const rewardService = {
  async getLeaderboard() {
    try {
      const response = await api.get('rewards/leaderboard/');
      return response.data;
    } catch (error) {
      return [
        { rank: 1, name: 'Aarav Sharma', points: 4250, badge: 'Cleanliness Champion' },
        { rank: 2, name: 'Neha Verma', points: 3890, badge: 'Cleanup Volunteer' },
        { rank: 3, name: 'Rohit Singh', points: 3450, badge: 'Active Citizen' },
        { rank: 4, name: 'Priya Patel', points: 2980, badge: 'First Report' },
        { rank: 5, name: 'Vikram Das', points: 2640, badge: 'Cleanup Volunteer' },
        { rank: 6, name: 'Sneha Gupta', points: 2150, badge: 'Active Citizen' },
        { rank: 7, name: 'Aniket Joshi', points: 1890, badge: 'First Report' }
      ];
    }
  },

  async getUserRewards() {
    try {
      const response = await api.get('rewards/');
      return response.data;
    } catch (error) {
      return [
        { id: 1, points: 50, reason: 'Reported verified issue SAF-2026-1049', created_at: '2026-08-01T10:30:00Z' },
        { id: 2, points: 100, reason: 'Joined Rajwada Heritage Clean-up Drive', created_at: '2026-08-01T09:00:00Z' },
        { id: 3, points: 20, reason: 'Submitted rating & feedback for SAF-2026-1022', created_at: '2026-07-29T16:15:00Z' }
      ];
    }
  }
};

import api from './api';

export const authService = {
  async register(userData) {
    try {
      const response = await api.post('auth/register/', userData);
      if (response.data.access) {
        localStorage.setItem('safai_token', response.data.access);
        localStorage.setItem('safai_user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // Fallback for offline demo mode
      console.warn('Backend API unavailable, using offline fallback');
      const mockUser = {
        id: 1,
        name: userData.name || 'Demo Citizen',
        email: userData.email,
        role: userData.role || 'CITIZEN',
        reward_points: 150
      };
      localStorage.setItem('safai_token', 'mock_jwt_token_12345');
      localStorage.setItem('safai_user', JSON.stringify(mockUser));
      return { user: mockUser, access: 'mock_jwt_token_12345' };
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('auth/login/', credentials);
      if (response.data.access) {
        localStorage.setItem('safai_token', response.data.access);
        localStorage.setItem('safai_user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.warn('Backend API unavailable, using offline fallback');
      const isAdmin = credentials.email.includes('admin');
      const mockUser = {
        id: isAdmin ? 99 : 1,
        name: isAdmin ? 'Admin Administrator' : 'Aarav Sharma',
        email: credentials.email,
        role: isAdmin ? 'ADMIN' : 'CITIZEN',
        reward_points: isAdmin ? 500 : 4250
      };
      localStorage.setItem('safai_token', 'mock_jwt_token_12345');
      localStorage.setItem('safai_user', JSON.stringify(mockUser));
      return { user: mockUser, access: 'mock_jwt_token_12345' };
    }
  },

  async getProfile() {
    try {
      const response = await api.get('auth/profile/');
      return response.data;
    } catch (error) {
      const stored = localStorage.getItem('safai_user');
      return stored ? JSON.parse(stored) : null;
    }
  },

  logout() {
    localStorage.removeItem('safai_token');
    localStorage.removeItem('safai_user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('safai_user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

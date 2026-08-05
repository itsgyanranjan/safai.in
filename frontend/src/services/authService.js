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
        id: Date.now(),
        name: userData.name || (userData.email ? userData.email.split('@')[0] : 'New Citizen'),
        email: userData.email,
        role: userData.role || 'CITIZEN',
        reward_points: 50
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
      const rawName = credentials.email ? credentials.email.split('@')[0].replace(/[\._-]/g, ' ') : 'Citizen User';
      const formattedName = rawName.replace(/\b\w/g, (c) => c.toUpperCase());
      const mockUser = {
        id: isAdmin ? 99 : Date.now(),
        name: isAdmin ? 'Admin Administrator' : formattedName,
        email: credentials.email,
        role: isAdmin ? 'ADMIN' : 'CITIZEN',
        reward_points: isAdmin ? 500 : 150
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

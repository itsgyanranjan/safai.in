import axios from 'axios';

let rawBase = import.meta.env.VITE_API_BASE_URL || '/api/';
if (rawBase && !rawBase.startsWith('http') && !rawBase.startsWith('/')) {
  rawBase = `https://${rawBase}/api/`;
} else if (rawBase && rawBase.startsWith('http') && !rawBase.endsWith('/')) {
  rawBase = `${rawBase}/`;
}

const API_BASE_URL = rawBase;

const api = axios.create({

  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('safai_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

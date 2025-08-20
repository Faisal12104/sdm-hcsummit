import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getEksternalUsers: () => api.get('/auth/eksternal'),
  manageEksternal: (data) => api.post('/auth/eksternal', data),
  getAdminSatker: () => api.get('/auth/adminsatker'),
  manageAdminSatker: (data) => api.post('/auth/adminsatker', data),
};

// Berkas API calls
export const berkasAPI = {
  uploadBerkas: (formData) => api.post('/berkas/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getBerkasSatker: () => api.get('/berkas/satker'),
  getBerkasSuperadmin: (sektor) => api.get(`/berkas/superadmin?sektor=${sektor}`),
  approveBerkas: (id) => api.put(`/berkas/superadmin/berkas/${id}/approve`),
  rejectBerkas: (id) => api.put(`/berkas/superadmin/berkas/${id}/reject`),
  downloadBerkas: (id) => api.get(`/berkas/superadmin/berkas/${id}/download`, {
    responseType: 'blob',
  }),
};

// Sektor API calls
export const sektorAPI = {
  getAllSektor: () => api.get('/sektor/tampilsektor'),
};

export default api;

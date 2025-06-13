import axios, { type AxiosInstance } from 'axios';
import { logout } from '../feature/Auth/api/apiAuth';

const API_URL = 'http://localhost:5000/api';

// This is our super cool API helper!
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = false;
        
        try {
          // Try to refresh tokens
          await apiClient.post('/auth/refresh');
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Force logout
          await logout();
          window.location.href = '/auth/';
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );

export { apiClient };
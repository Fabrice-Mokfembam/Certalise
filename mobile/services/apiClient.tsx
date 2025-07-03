import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.209.160.204:5000/api';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach access token to requests
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      console.log('access token',accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 (unauthorized) and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refresh token from storage
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // Call refresh endpoint
        const refreshResponse = await axios.post(
          `${API_URL}/auth/refresh`,
          { refreshToken }, // Send refreshToken in body (not cookies)
        );

        // Save new tokens
        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data.tokens;
        await AsyncStorage.setItem('accessToken', accessToken);
        if (newRefreshToken) {
          await AsyncStorage.setItem('refreshToken', newRefreshToken);
        }

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed → force logout
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        // Optional: Redirect to login screen (e.g., using React Navigation)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { apiClient };
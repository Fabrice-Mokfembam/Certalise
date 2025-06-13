
import type { User } from '../../../data/interface';
import { apiClient } from '../../../services/apiClient';

// Get current user's profile
export const getProfile = async () => {
  const response = await apiClient.get('/profile/me');
  return response.data.user;
};

// Get user profile by username
export const getProfileByUsername = async (username: string) => {
  const response = await apiClient.get(`/profile/username/${username}`);
  return response.data.user;
};

// Update user profile
export const updateProfile = async (data: Partial<User>) => {
  const response = await apiClient.patch('/profile/update', data);
  return response.data.user;
};


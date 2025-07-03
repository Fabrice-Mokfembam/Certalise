
import { AuthResponse, User } from '@/data';
import { apiClient } from '../../../services/apiClient';


// This signs up a new user, like joining a club!
export const signup = async (data: User): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/signup', data);
  return response.data;
};

// This logs in a user, like opening a secret door!
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

// This logs out a user, like leaving the club!
export const logout = async (): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

// This checks who’s logged in, like showing your ID!
export const getMe = async (): Promise<{ user: User }> => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};
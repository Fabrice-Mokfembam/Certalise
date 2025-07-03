// AuthProvider.tsx
import { useEffect, useState, type ReactNode } from "react";
import type { AuthResponse, User } from "@/data/";
import { AuthContext } from "./authContext";
import { apiClient } from "../services/apiClient";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  
  const [accessToken,setAccessToken] = useState<string>('')

  // Key names for AsyncStorage
  const ACCESS_TOKEN_KEY = 'accessToken';
  const REFRESH_TOKEN_KEY = 'refreshToken';
  const USER_DATA_KEY = 'userData';

  // Initialize auth state (check if tokens exist)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
        if (accessToken) {
          // Optionally validate token expiry here
          const userData = await AsyncStorage.getItem(USER_DATA_KEY);
          if (userData) {
            setUser(JSON.parse(userData));
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login: Save tokens + user data to AsyncStorage
  const login = async (data: AuthResponse) => {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.tokens.accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.tokens.refreshToken);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
      setAccessToken(data.tokens.accessToken);
      setUser(data.user!);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Let the caller handle it
    }
  };

  // Logout: Clear everything
  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY]);
      setUser(null);
      setIsLoggedIn(false);
      // Optional: Call backend logout endpoint
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update user data (and sync with AsyncStorage)
  const updateUser = async (newUser: User) => {
    setUser(newUser);
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,accessToken, user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
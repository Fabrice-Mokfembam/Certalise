import { useContext } from 'react';
import type { User } from '../data/';
import { AuthContext } from '@/Context/authContext';



// This lets us grab user info easily!
export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return {
    authUser: context.user as User | null,
    isLoggedIn: context.isLoggedIn,
    logout: context.logout,
    login:context.login,
    isLoading: context.isLoading, 
    updateUser:context.updateUser,
    accessToken:context.accessToken
  };
};
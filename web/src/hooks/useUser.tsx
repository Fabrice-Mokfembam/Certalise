import { useContext } from 'react';
import type { User } from '../data/interface';
import { AuthContext } from '../Context/AuthContext';


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
    updateUser:context.updateUser
  };
};
// authContext.tsx
import { AuthResponse, User } from '@/data';
import { createContext } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  accessToken:string;
  login: (data: AuthResponse) => Promise<void>;  // Now async
  updateUser: (user: User) => void;
  logout: () => Promise<void>;  // Now async
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
import { createContext} from 'react';

import type { AuthResponse, User } from '../data/interface';

// This holds our user info, like a treasure chest!
type AuthContextType = {
    isLoggedIn: boolean;
    user: User | null;
    isLoading: boolean; // Add this
    login: (data: AuthResponse) => void;
    updateUser:(user:User)=>void;
    logout: () => void;
  };

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


import { useEffect, useState, type ReactNode } from "react";
import type { AuthResponse, User } from "../data/interface";
import { AuthContext } from "./AuthContext";
import { apiClient } from "../services/apiClient";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);  
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await apiClient.get('/auth/me');
          if (response.data.user) {
            setUser(response.data.user);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false); 
        }
      };
      checkAuth();
    }, []);
  

    useEffect(() => {
        console.log('Auth state updated', { isLoggedIn, user, isLoading });
      }, [isLoggedIn, user, isLoading]);


      
    const updateUser = (data: User ) => {
      setUser(data || null);
    };

    const login = (data: AuthResponse ) => {
      setUser(data?.user || null);
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      setUser(null);
      setIsLoggedIn(false);
    };
  
    return (
      <AuthContext.Provider value={{ updateUser,isLoggedIn, user, isLoading, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import type { User } from '../../../data/interface';
import { getMe, login, logout, signup } from '../api/apiAuth';
import { AuthContext } from '../../../Context/AuthContext';


// This helps us sign up, log in, and log out!
export const useRegisterUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: User) => signup(data),
    onSuccess: () => {
      navigate('/auth/login'); 
      queryClient.invalidateQueries({ queryKey: ['auditLogs'] });
    },
    onError: () => {
      console.error('Error registering user:');
  
    },
  });
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { login: loginContext } = useContext(AuthContext)!;

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
    onSuccess: (data) => {
      loginContext(data);
      navigate('/'); 
    },
    onError: () => {
      console.error('Error logging in:');

    },
  });
};

export const useLogoutUser = () => {
  const navigate = useNavigate();
  const { logout: logoutContext } = useContext(AuthContext)!;

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      logoutContext(); // Clear context
      navigate('/auth/login'); // Go to login
    },
    onError: () => {
      console.error('Error logging out:');
      
    },
  });
};


export const useGetMe = () => {
    return useQuery({
      queryKey: ['currentUser'],
      queryFn: async () => {
        try {
          const response = await getMe();
          return response.user;
        } catch (error) {
          console.log('Failed to fetch user data',error);
        }
      },
     
    });
  };
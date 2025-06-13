import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProfile,
  getProfileByUsername,
  updateProfile,

} from '../api/';
import type { User } from '../../../data/interface';


export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  });
};

export const useProfileByUsername = (username: string) => {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: () => getProfileByUsername(username),
    enabled: !!username
  });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: (updates: Partial<User>) => updateProfile(updates),
      onSuccess: (updatedUser) => {
        queryClient.setQueryData(['profile', updatedUser.username], updatedUser);
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    });
  };


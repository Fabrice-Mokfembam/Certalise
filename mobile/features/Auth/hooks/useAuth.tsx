// hooks/useAuth.ts (or wherever your useLoginUser hook is defined)

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User, AuthResponse } from '@/data'; // Ensure AuthResponse is imported
import { getMe, login as apiLogin, logout as apiLogout, signup } from '../api/'; // Alias login/logout to avoid name collision
import { useUser } from '@/hooks/useUser';



// This helps us sign up, log in, and log out!
export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: User) => signup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auditLogs'] });
    },
    onError: (error) => { // Use 'error' parameter to get the error object
      console.error('Error registering user:', error);
      // You might want to return or throw the error here so components can handle it
      // throw error;
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  // Get the login function from AuthContext using your useUser hook
  const { login: contextLogin } = useUser(); // Alias to avoid collision with mutationFn's 'login'

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => apiLogin(email, password),
    onSuccess: async (data: AuthResponse) => { // 'data' here is the response from your API login call
      console.log('useLoginUser: API login successful. Calling AuthContext login...');
      // Call the login function from your AuthContext to update global state and persist tokens
      await contextLogin(data);
      console.log('useLoginUser: AuthContext login complete. Invalidating queries...');

      // Optionally invalidate 'currentUser' query if you use useGetMe elsewhere
      // queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      // Invalidate auditLogs if relevant to user login (e.g., personalized logs)
      queryClient.invalidateQueries({ queryKey: ['auditLogs'] });
    },
    onError: (error) => { // Use 'error' parameter to get the error object
      console.error('Error logging in:', error);
      // It's good practice to re-throw or return the error so the component can display it
      // throw error;
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  // Get the logout function from AuthContext
  const { logout: contextLogout } = useUser(); // Alias to avoid collision

  return useMutation({
    mutationFn: () => apiLogout(), // Your API logout function
    onSuccess: async () => {
      console.log('useLogoutUser: API logout successful. Calling AuthContext logout...');
      // Call the logout function from your AuthContext to clear global state and tokens
      await contextLogout();
      console.log('useLogoutUser: AuthContext logout complete. Invalidating queries...');

      // Invalidate all relevant queries after logout
      queryClient.invalidateQueries(); // Invalidate all queries on logout
      // Or more specifically:
      // queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      // queryClient.invalidateQueries({ queryKey: ['auditLogs'] });
    },
    onError: (error) => { // Use 'error' parameter
      console.error('Error logging out:', error);
      // throw error;
    },
  });
};


export const useGetMe = () => {
  // We'll also want to use the AuthContext's updateUser here for initial data loading
  const { updateUser, isLoggedIn, authUser: authContextUser } = useUser();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        console.log('useGetMe: Fetching user data...');
        const response = await getMe(); // This should return an object like { user: User }
        console.log('useGetMe: User data fetched:', response.user);
        // Update the user in the AuthContext when 'getMe' successfully fetches it
        if (response.user) {
          updateUser(response.user);
        }
        return response.user;
      } catch (error) {
        console.error('Failed to fetch user data in useGetMe:', error);
        // Important: If getMe fails (e.g., token expired), you might want to log out the user
        // This prevents being stuck in a "logged in" state with an invalid token.
        // If the error is an unauthorized error:
        // contextLogout(); // You would need to import contextLogout here or manage it higher up
        throw error; // Re-throw to let react-query handle retries/error state
      }
    },
    // Only run this query if isLoggedIn is true in AuthContext AND user data isn't already loaded
    // This optimization prevents unnecessary 'getMe' calls
    enabled: isLoggedIn && !authContextUser, // If user is logged in but context user is null, fetch
    staleTime: 1000 * 60 * 15, // Data is considered fresh for 15 minutes
    gcTime: 1000 * 60 * 30, // Data stays in cache for 30 minutes
  });
};
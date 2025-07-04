import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AuthProvider } from './Context/AuthProvider.tsx';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,       
      gcTime: 1000 * 60 * 30,         
      refetchOnWindowFocus: false,    
      refetchOnReconnect: true,      
      retry: 2,                     
    },
    mutations: {
      retry: 1,                      
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);

import { Slot} from "expo-router";
import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/Context/AuthProvider";


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

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>       
          <Slot/>
      </QueryClientProvider>
    </AuthProvider>
  );
}

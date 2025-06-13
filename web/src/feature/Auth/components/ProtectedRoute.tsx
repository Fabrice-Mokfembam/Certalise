import { useContext, type JSX } from "react";
import { AuthContext } from "../../../Context/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext)!;
  
    if (isLoading) {
      return <div>Loading authentication state...</div>;
    }
  
    if (!isLoggedIn) {
      // Use window.location instead of Navigate to ensure full page reload
      window.location.href = '/auth/';
      return null;
    }
  
    return children;
  };
  export interface User {
    id: string;
    username: string;
    email: string;
    role: "clerk" | "archivist" | "admin";
  }
  
  export interface AuthResponse {
    message: string;
    user?: User;
  }
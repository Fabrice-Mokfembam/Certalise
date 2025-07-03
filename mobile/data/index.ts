export interface User {
    id: string;
    username: string;
    email: string;
    role: "clerk" | "archivist" | "admin";
  }
  interface Tokens {
    accessToken:string
    refreshToken:string
  }
  export interface AuthResponse {
    message: string;
    user?: User;
    tokens:Tokens
  }

  export interface FormData {
    certificateNumber: string;
    surName: string;
    givenName: string;
    sex: string;
    placeOfBirth: string;
    dob: string;
    fatherName: string;
    fatherPlaceOfBirth: string;
    fatherDob: string;
    fatherResidence: string;
    fatherOccupation: string;
    fatherNationality: string;
    fatherReferenceDocument: string;
    motherName: string;
    motherPlaceOfBirth: string;
    motherDob: string;
    motherResidence: string;
    motherOccupation: string;
    motherNationality: string;
    motherReferenceDocument: string;
    dateDrawn: string;
    declarant: string;
    createdAt:Date | string;
    officer: string;
    secretary: string;
    imageUrl?: string ,
      pdfUrl?: string ,
  }
  
  // utils/routes.ts
export const ROUTES = {
    LOGIN: "/auth",
    HOME: "/(tabs)/home",
  } as const;
  
  
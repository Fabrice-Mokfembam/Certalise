// import { useContext, useEffect } from "react";
// import { Slot, useRouter } from "expo-router";
// import { AuthContext } from "@/Context/authContext";

// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isLoggedIn } = useContext(AuthContext)!;
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.replace("/auth");
//     }
//   }, [isLoggedIn, router]);

//   return <Slot />;
// };

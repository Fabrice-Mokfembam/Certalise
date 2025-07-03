import { useUser } from "@/hooks/useUser";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const { isLoggedIn, isLoading } = useUser();

  useEffect(() => {
    console.log("AuthLayout: isLoggedIn changed to:", isLoggedIn);
    console.log("AuthLayout: isLoading changed to:", isLoading);
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    console.log("AuthLayout: Still loading, returning null.");
    return null; // Or a loading spinner component
  }

  if (isLoggedIn) {
    console.log("AuthLayout: User is logged in, redirecting to /(public)/(tabs)/");
    // THIS IS THE FIX: Remove '_layout.tsx' from the href
    return <Redirect href="/(public)/(tabs)/" />;
  }

  console.log("AuthLayout: User is NOT logged in, showing authentication screens.");
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/*
        Make sure 'Login' correctly maps to your login file,
        e.g., if app/(auth)/index.tsx is your login, use name="index"
        If app/(auth)/Login.tsx is your login, use name="Login"
      */}
      <Stack.Screen name="Login" />
      {/* Add other auth screens like Register, ForgotPassword here */}
    </Stack>
  );
}
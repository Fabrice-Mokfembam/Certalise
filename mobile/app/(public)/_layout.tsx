import {  Stack } from "expo-router";


const PublicLayout = () => {

  return (
    <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='(tabs)' />
    <Stack.Screen name='certificate/[id]' />
  </Stack>
  );
};

export default PublicLayout;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; // For Mail, Eye, EyeOff, FileText icons
import { useRouter } from 'expo-router'; // For navigation in Expo Router
import { useLoginUser } from '@/features/Auth/hooks/useAuth';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { mutate, isPending, error } = useLoginUser();

  const handleSubmit = () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    console.log('Login attempted with:', { email, password });
    mutate({ email, password }, {
      onSuccess: () => {
        // After successful login, the AuthProvider will update isLoggedIn.
        // The RootLayoutNav will then redirect automatically to the protected route.
        // We don't need to explicitly navigate here, as RootLayoutNav handles it.
        // You might want to show a success message or clear fields here if needed.

        console.log('Login successful! AuthProvider should handle redirect.');
        router.replace('/(public)/(tabs)')
      },
      onError: (err) => {
        // The error from react-query will be in 'err'
        // You can display a more user-friendly message based on the error.
        console.error('Login error:', err);
        Alert.alert('Login Failed', error?.message || 'An unexpected error occurred. Please try again.');
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center justify-center ">
      <View className="bg-white rounded-xl shadow-md w-full max-w-xl p-6 sm:p-10 flex flex-col justify-center h-screen">
        <View className="text-center mb-8 flex w-screen items-center">
          <View className="flex justify-center mb-4">
            <View className="bg-blue-100 rounded-full size-40 flex justify-center items-center p-3 sm:p-4">
              {/* Using Feather icon for FileText */}
              <Feather name="file-text" size={64} color="#2196F3" />
            </View>
          </View>
          <Text className="text-2xl sm:text-3xl font-bold text-gray-900">Archive Digital</Text>
        </View>
        <View className="space-y-6">
          {/* Email/UserID Input */}
          <View>
            <Text className="block text-base sm:text-lg font-medium text-gray-700 mb-1">
              UserID
            </Text>
            <View className="relative">
              <TextInput
                id="email" // IDs are not strictly necessary for Native, but harmless
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                className="w-full px-4 py-3 text-base sm:text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af" // Tailwind gray-400 equivalent
              />
              {/* Using Feather icon for Mail */}
              <Feather name="mail" size={20} color="#9ca3af" className="absolute right-4 top-3" />
            </View>
          </View>

          {/* Password Input */}
          <View>
            <Text className="block text-base sm:text-lg font-medium text-gray-700 mb-1">
              Password
            </Text>
            <View className="relative">
              <TextInput
                id="password"
                secureTextEntry={!showPassword} // Toggle secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="w-full px-4 py-3 text-base sm:text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af" // Tailwind gray-400 equivalent
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-2.5"
              >
                {/* Using Feather icons for Eye / EyeOff */}
                {showPassword ? (
                  <Feather name="eye-off" size={20} color="#9ca3af" />
                ) : (
                  <Feather name="eye" size={20} color="#9ca3af" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isPending} // Disable button while login is pending
            className={`w-full mt-2 bg-[#2196F3] text-white py-3.5 px-4 rounded-lg text-base sm:text-lg ${isPending ? 'opacity-70' : ''}`}
            style={{ opacity: isPending ? 0.7 : 1 }} // NativeWind doesn't apply opacity automatically on disabled
          >
            {isPending ? (
              <ActivityIndicator color="#fff" /> // Show loading spinner
            ) : (
              <Text className="text-white text-center text-base sm:text-lg font-semibold">Login</Text>
            )}
          </TouchableOpacity>

          {/* Error Message */}
          {error && (
            <Text className="text-red-500 text-center mt-2">
              Error: {error.message || 'An unknown error occurred.'}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
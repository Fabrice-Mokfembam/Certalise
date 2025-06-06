import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "John Doe",
    archivistId: "ARC-1234",
    email: "john.doe@example.com",
    location: "Buea Council",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Updated Profile Data:", formData);
    router.push("/profile/Thiago");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-6">
        {/* Header Section */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity onPress={() => router.push("/profile/Thiago")}>
            <Feather name="arrow-left" size={24} color="#2196F3" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-[#111827]">
            Edit Profile
          </Text>
          <View className="w-6" />
        </View>

        {/* Form Section */}
        <View className="mb-8">
          <View className="mb-6">
            <Text className="text-lg font-medium mb-2 text-[#4B5563]">
              Full Name
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-[#F9FAFB]"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
          </View>

          <View className="mb-6">
            <Text className="text-lg font-medium mb-2 text-[#4B5563]">
              Archivist ID
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-[#F9FAFB]"
              value={formData.archivistId}
              onChangeText={(text) => handleInputChange("archivistId", text)}
              editable={false}
            />
          </View>

          <View className="mb-6">
            <Text className="text-lg font-medium mb-2 text-[#4B5563]">
              Email Address
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-[#F9FAFB]"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
            />
          </View>

          <View className="mb-6">
            <Text className="text-lg font-medium mb-2 text-[#4B5563]">
              Location
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-[#F9FAFB]"
              value={formData.location}
              onChangeText={(text) => handleInputChange("location", text)}
            />
          </View>

          <View className="mb-6">
            <Text className="text-lg font-medium mb-2 text-[#4B5563]">
              New Password
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-[#F9FAFB]"
              placeholder="Enter new password"
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry
            />
          </View>

          <View className="mb-6">
            <Text className="text-lg font-medium mb-2 text-[#4B5563]">
              Confirm New Password
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-[#F9FAFB]"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChangeText={(text) =>
                handleInputChange("confirmPassword", text)
              }
              secureTextEntry
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="bg-[#2196F3] rounded-lg p-4 items-center mt-4 mb-4"
          onPress={handleSave}
        >
          <Text className="text-white text-lg font-medium">
            Save Changes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

export default function Profile() {
const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-6">
        {/* Header Section */}
        <View className="items-center mb-8">
          <Image
            source={{ uri: "https://via.placeholder.com/120" }}
            className="w-30 h-30 rounded-full border-4 border-[#2196F3] mb-4"
          />
          <Text className="text-2xl font-bold text-[#111827]">John Doe</Text>
          <Text className="text-sm text-[#4B5563] mt-1">Archivist ID: ARC-1234</Text>
          <TouchableOpacity onPress={()=>router.push(`/profile/edit/Thiago`)}  className="mt-4 bg-[#2196F3] rounded-lg px-6 py-2">
            <Text className="text-white text-center font-medium">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Archive Stats Section */}
        <View className="flex-row justify-between mb-8">
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#2196F3]">12</Text>
            <Text className="text-sm text-[#4B5563]">Digitized Certificates</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#2196F3]">3</Text>
            <Text className="text-sm text-[#4B5563]">Pending Scans</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#2196F3]">8</Text>
            <Text className="text-sm text-[#4B5563]">Manual Entries</Text>
          </View>
        </View>

        {/* Archive Details Section */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-[#111827] mb-4">Archive Details</Text>
          <View className="bg-[#EFF6FF] rounded-lg p-4 mb-4">
            <Text className="text-[#4B5563]">Role: Local Archivist</Text>
            <Text className="text-[#4B5563] mt-2">Location: Buea Council</Text>
            <Text className="text-[#4B5563] mt-2">Active Since: June 2024</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View>
          <Text className="text-xl font-bold text-[#111827] mb-4">Recent Activity</Text>
          <View className="bg-[#F9FAFB] rounded-lg p-4 mb-4">
            <Text className="text-[#4B5563]">Digitized Birth Certificate #1234 - 2 hours ago</Text>
          </View>
          <View className="bg-[#F9FAFB] rounded-lg p-4 mb-4">
            <Text className="text-[#4B5563]">Created Certificate #5678 - 1 day ago</Text>
          </View>
          <TouchableOpacity className="mt-4 flex-row items-center justify-center gap-2">
            <Feather name="clock" size={20} color="#2196F3" />
            <Text className="text-[#2196F3] font-medium">View All Activity</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
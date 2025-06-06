import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

const data = [
  { id: "1", title: "Birth Certificate #1234", time: "Scanned 2 hours ago" },
  { id: "2", title: "Birth Certificate #1234", time: "Scanned 2 hours ago" },
  { id: "3", title: "Birth Certificate #1234", time: "Scanned 2 hours ago" },
];
const username = 'Thiago'

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-[#111827]">Archive Digital</Text>
          <TouchableOpacity className="p-2" onPress={()=>router.push(`/profile/${username}`)}>
          <Feather name="user" size={24} color="#2196F3" />
          </TouchableOpacity>
        </View>
        
        <View className="flex-row flex-wrap justify-between mb-6">
          <TouchableOpacity
            className="w-[48%] bg-[#EFF6FF] rounded-lg p-4 mb-4 items-center"
            onPress={() => router.push("/scan")}
          >
            <Feather name="camera" size={32} color="#2196F3" />
            <Text className="text-lg font-bold text-[#4B5563] mt-2">
              Scan Document
            </Text>
            <Text className="text-sm text-[#4B5563]">Upload new records</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] bg-[#EFF6FF] rounded-lg p-4 mb-4 items-center"
            onPress={() => router.push("/create")}
          >
            <Feather name="plus" size={32} color="#2196F3" />
            <Text className="text-lg font-bold text-[#4B5563] mt-2">
              Create Record
            </Text>
            <Text className="text-sm text-[#4B5563]">Manual entry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] bg-[#EFF6FF] rounded-lg p-4 mb-4 items-center"
          >
            
            <Text className="text-lg font-bold text-[#4B5563] mt-2">
              Certificates
            </Text>
            <Text className="text-4xl text-[#2196F3]">12</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] bg-[#EFF6FF] rounded-lg p-4 mb-4 items-center"
          >
            <Text className="text-lg font-bold text-[#4B5563] mt-2">
              Accuracy
            </Text>
            <Text className="text-4xl text-[#2196F3]">26%</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-lg font-bold text-[#111827] mb-4">
          Recent Activities
        </Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity className="bg-[#F9FAFB] rounded-lg px-4 py-7 mb-2 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
              <View className="bg-[#DBEAFE] rounded-2xl  p-4">
                  <Feather name="file-text" size={28} color="#2196F3" />
                </View>
              <View className="flex gap-1" >
                
                <Text className="text-[#4B5563]">{item.title}</Text>
                <Text className="text-sm text-[#4B5563]">{item.time}</Text>
              </View>

              </View>
             
              <Feather name="chevron-right" size={24} color="#4B5563" />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
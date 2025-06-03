import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-indigo-900 mb-4">
          Certalise
        </Text>
      
        <View className="h-full flex justify-center gap-5">
          <View className="flex-row flex-wrap justify-between mb-6">
            {/* Card 1: Certificates */}
            <View className="w-[48%] bg-gray-100 rounded-lg p-4 mb-4 items-center">
              <Feather name="file-text" size={32} color="#3b82f6" />
              <Text className="text-xl font-bold text-indigo-600 mt-2">10</Text>
              <Text className="text-sm text-gray-500">Certificates</Text>
            </View>
            {/* Card 2: Pending */}
            <View className="w-[48%] bg-gray-100 rounded-lg p-4 mb-4 items-center">
              <Feather name="clock" size={32} color="#10b981" />
              <Text className="text-xl font-bold text-indigo-600 mt-2">5</Text>
              <Text className="text-sm text-gray-500">Pending</Text>
            </View>
            {/* Card 3: Accuracy */}
            <View className="w-[48%] bg-gray-100 rounded-lg p-4 mb-4 items-center">
              <Feather name="check-circle" size={32} color="#8b5cf6" />
              <Text className="text-xl font-bold text-indigo-600 mt-2">100%</Text>
              <Text className="text-sm text-gray-500">Accuracy</Text>
            </View>
            {/* Card 4: Processed Today */}
            <View className="w-[48%] bg-gray-100 rounded-lg p-4 mb-4 items-center">
              <Feather name="calendar" size={32} color="#f59e0b" />
              <Text className="text-xl font-bold text-indigo-600 mt-2">3</Text>
              <Text className="text-sm text-gray-500">Processed Today</Text>
            </View>
          </View>
          {/* Buttons */}
          <TouchableOpacity
            className="bg-indigo-600 rounded-lg p-4 mb-4"
            onPress={() => router.push("/create")}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Create New Certificate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-indigo-600 rounded-lg p-4"
            onPress={() => router.push("/scan")}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Scan Birth Certificate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
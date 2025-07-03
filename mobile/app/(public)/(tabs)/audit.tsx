import { View, Text, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

export default function AuditLog() {
  // Mock audit log data
  const auditLogs = [
    {
      id: "1",
      action: "Document Scanned",
      user: "admin@system.com",
      documentNumber: "BC123456",
      time: "2 hours ago",
      completed: false
    },
    {
      id: "2",
      action: "Document Verified",
      user: "manager@system.com",
      documentNumber: "BC789012",
      time: "1 day ago",
      completed: true
    },
    {
      id: "3",
      action: "Document Scanned",
      user: "admin@system.com",
      documentNumber: "BC345678",
      time: "3 days ago",
      completed: false
    },
    {
      id: "4",
      action: "Certificate Downloaded",
      user: "user@example.com",
      documentNumber: "BC901234",
      time: "1 week ago",
      completed: true
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold mb-6">Audit Log</Text>
        
        <FlatList
          data={auditLogs}
          scrollEnabled={false} // Since we're inside a ScrollView
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg p-4 mb-3 shadow-sm">
              <View className="flex-row items-start">
                <View className={`w-5 h-5 rounded-full border-2 ${item.completed ? 'border-green-500 bg-green-500' : 'border-gray-300'} mr-3 mt-1`}>
                  {item.completed && (
                    <Feather name="check" size={14} color="white" />
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-medium">{item.action}</Text>
                  <Text className="text-gray-600">User: {item.user}</Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-blue-500 mr-2">{item.documentNumber}</Text>
                    <Text className="text-gray-400">•</Text>
                    <Text className="text-gray-500 ml-2">{item.time}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
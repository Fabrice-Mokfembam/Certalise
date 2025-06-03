import DocumentCard from "@/components/DocumentCard";
import { Text, View, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function List() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const documents = [
    { name: "Mokfembam Fabrice", documentNumber: "00012345678901", date: "13-05-25" },
    { name: "Takem Jim", documentNumber: "00023456789012", date: "13-05-25" },
    { name: "Steve Ngomba", documentNumber: "00034567890123", date: "13-05-25" },
    { name: "Aisha Bello", documentNumber: "00045678901234", date: "13-05-25" },
    { name: "Chinedu Okeke", documentNumber: "00056789012345", date: "13-05-25" },
    { name: "Fatima Yusuf", documentNumber: "00067890123456", date: "13-05-25" },
    { name: "Kwame Mensah", documentNumber: "00078901234567", date: "13-05-25" },
    { name: "Nia Thomas", documentNumber: "00089012345678", date: "13-05-25" },
    { name: "Obi Eze", documentNumber: "00090123456789", date: "13-05-25" },
    { name: "Zara Ali", documentNumber: "00101234567890", date: "13-05-25" },
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="py-4 px-4">
        <Text className="text-xl font-semibold mb-4">Your Lists</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-4 mb-4 text-base bg-white shadow-sm h-14"
          placeholder="Search by name or certificate number"
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredDocuments}
          renderItem={({ item }) => (
            <DocumentCard
              name={item.name}
              documentNumber={item.documentNumber}
              date={item.date}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
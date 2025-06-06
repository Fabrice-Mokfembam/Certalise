import DocumentCard from "@/components/DocumentCard";
import { Text, View, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function List() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const documents = [
    { name: "John Smith", documentNumber: "BC123456", date: "01/01/2000" },
    { name: "Jane Doe", documentNumber: "BC654321", date: "15/03/1995" },
    { name: "Michael Johnson", documentNumber: "BC789012", date: "22/07/1988" },
    { name: "Sarah Williams", documentNumber: "BC345678", date: "05/11/1992" },
    { name: "David Brown", documentNumber: "BC901234", date: "30/09/1985" },
    { name: "Emily Davis", documentNumber: "BC567890", date: "14/02/1998" },
    { name: "Robert Wilson", documentNumber: "BC123890", date: "08/12/1979" },
    { name: "Jessica Taylor", documentNumber: "BC456123", date: "19/04/1991" },
    { name: "Daniel Anderson", documentNumber: "BC789456", date: "27/10/1983" },
    { name: "Olivia Martinez", documentNumber: "BC321654", date: "03/06/1997" },
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="py-4 px-4">
        <Text className="text-xl font-semibold mb-4">Your Documents</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-4 mb-4 text-base bg-white shadow-sm h-14"
          placeholder="Search by name or certificate ID"
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
        />
      </View>
    </SafeAreaView>
  );
}
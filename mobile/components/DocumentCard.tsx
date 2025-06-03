import { View, Text, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface DocumentCardProps {
  name: string;
  documentNumber: string;
  date: string;
}

export default function DocumentCard({ name, documentNumber, date }: DocumentCardProps) {
  return (
    <View className="bg-white rounded-lg p-4 my-2 shadow-sm w-full flex-row justify-between">
      {/* Left Section: Name and Document Number */}
      <View className="flex-1 gap-1">
        <Text className="text-lg font-bold mb-1">{name}</Text>
        <Text className="text-base text-gray-600 mb-2">{documentNumber}</Text>
      </View>

      
      <View className="items-end ">
        <Text className="text-sm text-gray-500 mb-2">{date}</Text>
        <View className="flex-row gap-2">
          <TouchableOpacity>
            <Feather name="download" size={20} color="#64748b" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="star" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
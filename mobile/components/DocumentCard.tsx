import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router"; // Add this import

interface DocumentCardProps {
  name: string;
  documentNumber: string;
  date: string;
}

export default function DocumentCard({
  name,
  documentNumber,
  date,
}: DocumentCardProps) {
  const router = useRouter(); 

  return (
    <View className='bg-white rounded-lg p-4 my-2 shadow-sm w-full flex-row justify-between items-start'>
      
      <View className='flex-row items-start gap-3 flex-1'>
        {/* Icon Container */}
        <View className='bg-[#DBEAFE] rounded-2xl size-12 flex justify-center items-center mt-1'>
          <Feather name='file-text' size={20} color='#2196F3' />
        </View>
        
        {/* Text Content */}
        <View className='flex-1'>
          <Text className='text-lg font-bold mb-1' numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>
          <Text className='text-base text-gray-600'>CID: {documentNumber}</Text>
        </View>
      </View>

    
      <View className='items-end ml-2'>
        <Text className='text-sm text-gray-500 mb-2'>Born: {date}</Text>
        <TouchableOpacity 
          className='flex-row items-center'
          onPress={() => router.push(`/certificate/${documentNumber}`)}
        >
          <Text className='text-[#2196F3] mr-1'>View Details</Text>
          <Feather name='chevron-right' size={16} color='#2196F3' />
        </TouchableOpacity>
      </View>
    </View>
  );
}
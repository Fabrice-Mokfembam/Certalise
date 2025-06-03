import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";

export default function Scan() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log("ImagePicker result:", result); 
    if (!result.canceled && result.assets) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleRetake = () => {
    setSelectedImage(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1  justify-between items-center px-6 py-4">
        {/* Top Buttons */}
        <View className="flex-row justify-between items-center w-full mb-6">
          <TouchableOpacity
            className=" rounded-full p-2"
            onPress={() => alert("Capture not implemented yet. Use Browse Files instead.")}
            disabled
          >
            <Text className="text-[18px] font-bold text-center">Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#14AE5C] flex-row  gap-3 items-center rounded-full py-3 px-6"
            onPress={pickImageAsync}
          >
             <Feather name="upload" size={22} color="#fff" />
            <Text className="text-white text-center">Browse Files</Text>
          </TouchableOpacity>
        </View>

        {/* Preview Area */}
        <View className="mb-6 relative">
          {selectedImage ? (
          <Image
          source={{ uri: selectedImage }}
          className="w-[92vw] h-[60vh]"
          onError={(error) => console.log("Image load error:", error.nativeEvent.error)}
        />
          ) : ( 
          <View className="flex-row justify-between items-center w-full mt-4 px-12">
            <Feather name="sun" size={24} color="#64748b" />
            <View className="size-32 bg-gray-500 rounded-full"></View>
            <Feather name="upload" size={24} color="#64748b" />
          </View>
           
           
          )}
         
        
        </View>

        {/* Bottom Buttons */}
        {selectedImage ? (
          <View className="w-full">
            <TouchableOpacity
              className="bg-green-500 rounded-lg p-4 mb-4"
              onPress={() => console.log("Continue to scan", selectedImage)} // Placeholder
            >
              <Text className="text-white text-center text-lg font-semibold">
                Continue to scan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-2 flex-row items-center justify-center gap-2"
              onPress={handleRetake}
            ><Feather name="arrow-left" size={22} color="#64748b"  />
              <Text className="text-gray-500  text-[16px] items-center  text-center">Take a different capture</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}


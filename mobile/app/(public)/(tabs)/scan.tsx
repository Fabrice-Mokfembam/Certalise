import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from 'expo-camera';
import Feather from "@expo/vector-icons/Feather";

export default function Scan() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

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

  const openCamera = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    
    if (!result.canceled && result.assets) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleRetake = () => {
    setSelectedImage(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between items-center px-6 py-4">
      {!selectedImage && <View className="w-[90vw] h-[60vh] bg-[#e1e3e6] rounded-2xl flex justify-center items-center">
       <Feather name="camera" size={32} color="white" />
       </View>}

        {/* Preview Area */}
        <View className="mb-6 relative">
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              className="w-[92vw] h-[70vh] rounded-xl"
              onError={(error) => console.log("Image load error:", error.nativeEvent.error)}
            />
          ) : ( 
            <View className="flex gap-3 items-center w-full mt-4 px-12">
              <TouchableOpacity 
                onPress={openCamera}
                className="flex-row items-center w-[88vw] gap-4 px-3 py-3 justify-center bg-[#2196F3] rounded-2xl"
              >
                <Feather name="camera" size={24} color="white" />
                <Text className="text-[18px] text-white">Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={pickImageAsync}
                className="flex-row items-center w-[88vw] gap-4 px-3 py-3 justify-center bg-[#fff] rounded-2xl border border-[#2196F3]"
              >
                <Feather name="upload" size={24} color="#2196f3" />
                <Text className="text-[18px]  text-[#2196F3]">Upload from Gallery</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Bottom Buttons */}
        {selectedImage ? (
          <View className="w-full">
            <TouchableOpacity
              className="bg-[#2196F3] rounded-2xl p-4 mb-4"
              onPress={() => console.log("Continue to scan", selectedImage)}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Continue to scan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-2 flex-row items-center justify-center gap-2"
              onPress={handleRetake}
            >
              <Feather name="arrow-left" size={22} color="#64748b" />
              <Text className="text-gray-500 text-[16px] items-center text-center">
                Take a different capture
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
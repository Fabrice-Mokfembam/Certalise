import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Create() {
  // State for all form fields
  const [formData, setFormData] = useState({
    // Child's Information
    certificateNumber: "",
    surName: "",
    givenName: "",
    sex: "",
    placeOfBirth: "",
    dob: "",
    
    // Father's Information
    fatherName: "",
    fatherPlaceOfBirth: "",
    fatherDob: "",
    fatherResidence: "",
    fatherOccupation: "",
    fatherNationality: "",
    fatherReferenceDocument: "",
    
    // Mother's Information
    motherName: "",
    motherPlaceOfBirth: "",
    motherDob: "",
    motherResidence: "",
    motherOccupation: "",
    motherNationality: "",
    motherReferenceDocument: "",
    
    // Declaration Information
    dateDrawn: "",
    declarant: "",
    officer: "",
    secretary: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSexSelection = (sex: string) => {
    setFormData(prev => ({
      ...prev,
      sex: sex
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.surName || !formData.givenName || !formData.dob || !formData.placeOfBirth) {
      Alert.alert("Error", "Please fill in all required child information");
      return;
    }
    
    // Process form data
    console.log("Form submitted:", formData);
    Alert.alert("Success", "Birth certificate saved successfully");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold mb-8 text-center">Birth Certificate Registration</Text>

        {/* Child's Information Section */}
        <View className="mb-8 pb-4">
          <Text className="text-xl font-bold mb-4 text-[#2196F3]">{`1. Child's Information`}</Text>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Surname</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Enter child's surname"
              value={formData.surName}
              onChangeText={(text) => handleInputChange('surName', text)}
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Given Name</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Enter child's given name"
              value={formData.givenName}
              onChangeText={(text) => handleInputChange('givenName', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Sex</Text>
              <View className="flex-row items-center">
                <TouchableOpacity 
                  className={`border rounded-lg p-3 mr-2 flex-1 ${
                    formData.sex === 'Male' 
                      ? 'border-blue-500 bg-blue-100' 
                      : 'border-gray-300'
                  }`}
                  onPress={() => handleSexSelection('Male')}
                >
                  <Text className={`text-center ${
                    formData.sex === 'Male' ? 'text-[#2196F3] font-medium' : ''
                  }`}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className={`border rounded-lg p-3 flex-1 ${
                    formData.sex === 'Female' 
                      ? 'border-pink-500 bg-pink-100' 
                      : 'border-gray-300'
                  }`}
                  onPress={() => handleSexSelection('Female')}
                >
                  <Text className={`text-center ${
                    formData.sex === 'Female' ? 'text-pink-700 font-medium' : ''
                  }`}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Date of Birth</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="dd/mm/yyyy"
                value={formData.dob}
                onChangeText={(text) => handleInputChange('dob', text)}
              />
            </View>
          </View>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Place of Birth</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Town, health center/hospital"
              value={formData.placeOfBirth}
              onChangeText={(text) => handleInputChange('placeOfBirth', text)}
            />
          </View>
        </View>

        {/* Father's Information Section */}
        <View className="mb-8 pb-4">
          <Text className="text-xl font-bold mb-4 text-[#2196F3]">{`2. Father's Information`}</Text>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Full Name</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Father's full name"
              value={formData.fatherName}
              onChangeText={(text) => handleInputChange('fatherName', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Place of Birth</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Father's place of birth"
                value={formData.fatherPlaceOfBirth}
                onChangeText={(text) => handleInputChange('fatherPlaceOfBirth', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Date of Birth</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="dd/mm/yyyy"
                value={formData.fatherDob}
                onChangeText={(text) => handleInputChange('fatherDob', text)}
              />
            </View>
          </View>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Residence</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Residence address"
              value={formData.fatherResidence}
              onChangeText={(text) => handleInputChange('fatherResidence', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Occupation</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Father's occupation"
                value={formData.fatherOccupation}
                onChangeText={(text) => handleInputChange('fatherOccupation', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Nationality</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Nationality"
                value={formData.fatherNationality}
                onChangeText={(text) => handleInputChange('fatherNationality', text)}
              />
            </View>
          </View>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Reference Document</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="ID card, birth certificate, etc."
              value={formData.fatherReferenceDocument}
              onChangeText={(text) => handleInputChange('fatherReferenceDocument', text)}
            />
          </View>
        </View>

        {/* Mother's Information Section */}
        <View className="mb-8 pb-4">
          <Text className="text-xl font-bold mb-4 text-[#2196F3]">{`3. Mother's Information`}</Text>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Full Name</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Mother's full name"
              value={formData.motherName}
              onChangeText={(text) => handleInputChange('motherName', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Place of Birth</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Mother's place of birth"
                value={formData.motherPlaceOfBirth}
                onChangeText={(text) => handleInputChange('motherPlaceOfBirth', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Date of Birth</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="dd/mm/yyyy"
                value={formData.motherDob}
                onChangeText={(text) => handleInputChange('motherDob', text)}
              />
            </View>
          </View>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Residence</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Residence address"
              value={formData.motherResidence}
              onChangeText={(text) => handleInputChange('motherResidence', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Occupation</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Mother's occupation"
                value={formData.motherOccupation}
                onChangeText={(text) => handleInputChange('motherOccupation', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Nationality</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Nationality"
                value={formData.motherNationality}
                onChangeText={(text) => handleInputChange('motherNationality', text)}
              />
            </View>
          </View>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Reference Document</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="ID card, birth certificate, etc."
              value={formData.motherReferenceDocument}
              onChangeText={(text) => handleInputChange('motherReferenceDocument', text)}
            />
          </View>
        </View>

        {/* Declaration Information Section */}
        <View className="mb-8 pb-4">
          <Text className="text-xl font-bold mb-4 text-[#2196F3]">4. Declaration Information</Text>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Certificate Number</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Certificate number"
              value={formData.certificateNumber}
              onChangeText={(text) => handleInputChange('certificateNumber', text)}
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Date Drawn</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="dd/mm/yyyy"
              value={formData.dateDrawn}
              onChangeText={(text) => handleInputChange('dateDrawn', text)}
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Declarant</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Name of declarant"
              value={formData.declarant}
              onChangeText={(text) => handleInputChange('declarant', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Officer</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Officer's name"
                value={formData.officer}
                onChangeText={(text) => handleInputChange('officer', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Secretary</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Secretary's name"
                value={formData.secretary}
                onChangeText={(text) => handleInputChange('secretary', text)}
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          className="bg-[#2196F3] rounded-lg p-4 items-center mt-4 mb-8"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-medium">Save Birth Certificate</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
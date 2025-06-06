import { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView,  } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function EditCertificate() {

  
  // State for all form fields with initial empty values
  const [formData, setFormData] = useState({
    // Child's Information
    childFullName: "",
    childSex: "",
    childDateOfBirth: "",
    childPlaceOfBirth: "",
    
    // Father's Information
    fatherFullName: "",
    fatherNationality: "",
    fatherProfession: "",
    fatherDateOfBirthOrAge: "",
    fatherResidence: "",
    
    // Mother's Information
    motherFullName: "",
    motherNationality: "",
    motherProfession: "",
    motherDateOfBirthOrAge: "",
    motherResidence: "",
    
    // Civil Status Office Information
    councilName: "",
    locationDetails: "",
    certificateNumber: "",
    registrationDate: ""
  });

  // Fetch certificate data based on ID (mock implementation)
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchCertificateData = async () => {
      // Mock data - replace with actual API call
      const mockData = {
        childFullName: "John Smith",
        childSex: "Male",
        childDateOfBirth: "01/01/2020",
        childPlaceOfBirth: "Buea Regional Hospital",
        fatherFullName: "Michael Smith",
        fatherNationality: "Cameroonian",
        fatherProfession: "Engineer",
        fatherDateOfBirthOrAge: "15/05/1985",
        fatherResidence: "Buea Town",
        motherFullName: "Sarah Smith (née Johnson)",
        motherNationality: "Cameroonian",
        motherProfession: "Teacher",
        motherDateOfBirthOrAge: "22/08/1988",
        motherResidence: "Buea Town",
        councilName: "Buea Council",
        locationDetails: "Buea, Fako, Southwest",
        certificateNumber: "BC123456",
        registrationDate: "05/01/2020"
      };
      
      setFormData(mockData);
    };

    fetchCertificateData();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSexSelection = (sex: string) => {
    setFormData(prev => ({
      ...prev,
      childSex: sex
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.childFullName || !formData.childDateOfBirth || !formData.childPlaceOfBirth) {
      Alert.alert("Error", "Please fill in all required child information");
      return;
    }
    
    // Process form data - in a real app, you would call your API here
    console.log("Updated certificate data:", formData);
    Alert.alert("Success", "Birth certificate updated successfully");
    router.back(); // Go back to previous screen after successful update
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold mb-8 text-center">Edit Birth Certificate</Text>

        {/* Child's Information Section */}
        <View className="mb-8 pb-4">
          <Text className="text-xl font-bold mb-4 text-[#2196F3]">{`1. Child's Information`}</Text>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Full Name of the Child</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Enter child's full name"
              value={formData.childFullName}
              onChangeText={(text) => handleInputChange('childFullName', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Sex</Text>
              <View className="flex-row items-center">
                <TouchableOpacity 
                  className={`border rounded-lg p-3 mr-2 flex-1 ${
                    formData.childSex === 'Male' 
                      ? 'border-blue-500 bg-blue-100' 
                      : 'border-gray-300'
                  }`}
                  onPress={() => handleSexSelection('Male')}
                >
                  <Text className={`text-center ${
                    formData.childSex === 'Male' ? 'text-[#2196F3] font-medium' : ''
                  }`}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className={`border rounded-lg p-3 flex-1 ${
                    formData.childSex === 'Female' 
                      ? 'border-pink-500 bg-pink-100' 
                      : 'border-gray-300'
                  }`}
                  onPress={() => handleSexSelection('Female')}
                >
                  <Text className={`text-center ${
                    formData.childSex === 'Female' ? 'text-pink-700 font-medium' : ''
                  }`}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Date of Birth</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="dd/mm/yyyy"
                value={formData.childDateOfBirth}
                onChangeText={(text) => handleInputChange('childDateOfBirth', text)}
              />
            </View>
          </View>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Place of Birth</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Town, health center/hospital"
              value={formData.childPlaceOfBirth}
              onChangeText={(text) => handleInputChange('childPlaceOfBirth', text)}
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
              value={formData.fatherFullName}
              onChangeText={(text) => handleInputChange('fatherFullName', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Nationality</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Nationality"
                value={formData.fatherNationality}
                onChangeText={(text) => handleInputChange('fatherNationality', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Profession</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Profession"
                value={formData.fatherProfession}
                onChangeText={(text) => handleInputChange('fatherProfession', text)}
              />
            </View>
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Date of Birth/Age</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="dd/mm/yyyy or age"
                value={formData.fatherDateOfBirthOrAge}
                onChangeText={(text) => handleInputChange('fatherDateOfBirthOrAge', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Residence</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Residence address"
                value={formData.fatherResidence}
                onChangeText={(text) => handleInputChange('fatherResidence', text)}
              />
            </View>
          </View>
        </View>

        {/* Mother's Information Section */}
        <View className="mb-8 pb-4">
          <Text className="text-xl font-bold mb-4 text-[#2196F3]">{`3. Mother's Information`}</Text>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Full Name (including maiden name)</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Mother's full name"
              value={formData.motherFullName}
              onChangeText={(text) => handleInputChange('motherFullName', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Nationality</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Nationality"
                value={formData.motherNationality}
                onChangeText={(text) => handleInputChange('motherNationality', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Profession</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Profession"
                value={formData.motherProfession}
                onChangeText={(text) => handleInputChange('motherProfession', text)}
              />
            </View>
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Date of Birth/Age</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="dd/mm/yyyy or age"
                value={formData.motherDateOfBirthOrAge}
                onChangeText={(text) => handleInputChange('motherDateOfBirthOrAge', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Residence</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Residence address"
                value={formData.motherResidence}
                onChangeText={(text) => handleInputChange('motherResidence', text)}
              />
            </View>
          </View>
        </View>

        {/* Civil Status Office Information Section */}
        <View className="mb-8 pb-4">
          <Text className="text-xl font-bold mb-4 text-[#2196F3]">4. Civil Status Office Information</Text>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Name of the Council</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="e.g., Buea Council"
              value={formData.councilName}
              onChangeText={(text) => handleInputChange('councilName', text)}
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Subdivision, Division, and Region</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Enter location details"
              value={formData.locationDetails}
              onChangeText={(text) => handleInputChange('locationDetails', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-medium mb-2">Certificate Number</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Certificate number"
                value={formData.certificateNumber}
                onChangeText={(text) => handleInputChange('certificateNumber', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-lg font-medium mb-2">Date of Registration</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="dd/mm/yyyy"
                value={formData.registrationDate}
                onChangeText={(text) => handleInputChange('registrationDate', text)}
              />
            </View>
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity 
          className="bg-[#2196F3] rounded-lg p-4 items-center mt-4 mb-8"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-medium">Update Birth Certificate</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
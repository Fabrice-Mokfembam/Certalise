import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

export default function CertificateDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock data - replace with your actual data fetching
  const certificateData = {
    id: id as string,
    childName: "John Smith",
    birthDate: "01/01/2000",
    birthPlace: "Buea Regional Hospital",
    sex: "Male",
    registrationDate: "05/01/2000",
    registrationNumber: "BC123456",
    fatherName: "Michael Smith",
    fatherNationality: "Cameroonian",
    fatherProfession: "Engineer",
    motherName: "Sarah Smith (née Johnson)",
    motherNationality: "Cameroonian",
    motherProfession: "Teacher",
    councilName: "Buea Council",
    division: "Fako",
    region: "Southwest",
    registrarName: "Mr. James Mbua",
    issueDate: "10/01/2000"
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="p-4">
        {/* Header */}
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-[#2196F3]">Birth Certificate</Text>
          <Text className="text-gray-500 mt-2">CID: {certificateData.id}</Text>
        </View>

        {/* Certificate Information Sections */}
        <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
          {/* Child's Information */}
          <SectionHeader title="Child's Information" />
          <InfoRow label="Full Name" value={certificateData.childName} />
          <InfoRow label="Date of Birth" value={certificateData.birthDate} />
          <InfoRow label="Place of Birth" value={certificateData.birthPlace} />
          <InfoRow label="Sex" value={certificateData.sex} />
          
          {/* Parents' Information */}
          <SectionHeader title="Father's Information" className="mt-4" />
          <InfoRow label="Full Name" value={certificateData.fatherName} />
          <InfoRow label="Nationality" value={certificateData.fatherNationality} />
          <InfoRow label="Profession" value={certificateData.fatherProfession} />
          
          <SectionHeader title="Mother's Information" className="mt-4" />
          <InfoRow label="Full Name" value={certificateData.motherName} />
          <InfoRow label="Nationality" value={certificateData.motherNationality} />
          <InfoRow label="Profession" value={certificateData.motherProfession} />
          
          {/* Registration Details */}
          <SectionHeader title="Registration Details" className="mt-4" />
          <InfoRow label="Council Name" value={certificateData.councilName} />
          <InfoRow label="Division/Region" value={`${certificateData.division}, ${certificateData.region}`} />
          <InfoRow label="Registration Date" value={certificateData.registrationDate} />
          <InfoRow label="Registration Number" value={certificateData.registrationNumber} />
          <InfoRow label="Issued By" value={certificateData.registrarName} />
          <InfoRow label="Date Issued" value={certificateData.issueDate} />
        </View>

        {/* Document Preview Placeholder */}
        <View className="bg-white rounded-lg p-4 shadow-sm mb-6 items-center">
          <Feather name="file-text" size={48} color="#64748b" className="mb-2" />
          <Text className="text-lg font-medium mb-4">Certificate Document Preview</Text>
          {/* <Image 
            source={require('')} 
            className="w-full h-48 rounded border border-gray-200 mb-4"
            resizeMode="contain"
          /> */}
        </View>

        {/* Action Buttons */}
        <View className="flex justify-between mb-8 gap-2">
          <TouchableOpacity 
          onPress={()=>router.push(`/certificate/edit/${id}`)}
          className="border border-[#2196f3] rounded-lg p-4 flex-row items-center justify-center flex-1 ">
            <Feather name="edit" size={20} color="#2196f3" className="mr-2" />
            <Text className="text-[#2196f3] font-medium">Edit BC</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-[#2196F3] rounded-lg p-4 flex-row items-center justify-center flex-1 ">
            <Feather name="download" size={20} color="white" className="mr-2" />
            <Text className="text-white font-medium">Download PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable components for the certificate
function SectionHeader({ title, className = "" }: { title: string; className?: string }) {
  return (
    <View className={`border-b border-gray-200 pb-2 mb-3 ${className}`}>
      <Text className="text-lg font-bold text-[#2196F3]">{title}</Text>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row py-2 border-b border-gray-100">
      <Text className="flex-1 text-gray-600">{label}</Text>
      <Text className="flex-1 font-medium">{value}</Text>
    </View>
  );
}
import React from 'react';
import { User, Calendar, MapPin, Briefcase, Flag, FileText } from 'lucide-react';

interface FatherInfoProps {
  formData: {
    fatherName: string;
    fatherPlaceOfBirth: string;
    fatherDob: string;
    fatherResidence: string;
    fatherOccupation: string;
    fatherNationality: string;
    fatherReferenceDocument: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

const FatherInfoSection: React.FC<FatherInfoProps> = ({ formData, handleInputChange }) => {
  return (
    <div className=" p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
          <User className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-[#111827]">Father's Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Full Name</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Father's full name"
              value={formData.fatherName}
              onChange={(e) => handleInputChange('fatherName', e.target.value)}
            />
            <User className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Place of Birth</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Father's place of birth"
              value={formData.fatherPlaceOfBirth}
              onChange={(e) => handleInputChange('fatherPlaceOfBirth', e.target.value)}
            />
            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Date of Birth</label>
          <div className="relative">
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              value={formData.fatherDob}
              onChange={(e) => handleInputChange('fatherDob', e.target.value)}
            />
            <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Residence</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Residence address"
              value={formData.fatherResidence}
              onChange={(e) => handleInputChange('fatherResidence', e.target.value)}
            />
            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Occupation</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Father's occupation"
              value={formData.fatherOccupation}
              onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
            />
            <Briefcase className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Nationality</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Nationality"
              value={formData.fatherNationality}
              onChange={(e) => handleInputChange('fatherNationality', e.target.value)}
            />
            <Flag className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Reference Document</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="ID card, birth certificate, etc."
              value={formData.fatherReferenceDocument}
              onChange={(e) => handleInputChange('fatherReferenceDocument', e.target.value)}
            />
            <FileText className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FatherInfoSection;
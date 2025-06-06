import React from 'react';
import { User, Calendar, MapPin, Briefcase, Flag, FileText } from 'lucide-react';

interface MotherInfoProps {
  formData: {
    motherName: string;
    motherPlaceOfBirth: string;
    motherDob: string;
    motherResidence: string;
    motherOccupation: string;
    motherNationality: string;
    motherReferenceDocument: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

const MotherInfoSection: React.FC<MotherInfoProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
          <User className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-[#111827]">Mother's Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Full Name</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Mother's full name"
              value={formData.motherName}
              onChange={(e) => handleInputChange('motherName', e.target.value)}
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
              placeholder="Mother's place of birth"
              value={formData.motherPlaceOfBirth}
              onChange={(e) => handleInputChange('motherPlaceOfBirth', e.target.value)}
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
              value={formData.motherDob}
              onChange={(e) => handleInputChange('motherDob', e.target.value)}
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
              value={formData.motherResidence}
              onChange={(e) => handleInputChange('motherResidence', e.target.value)}
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
              placeholder="Mother's occupation"
              value={formData.motherOccupation}
              onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
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
              value={formData.motherNationality}
              onChange={(e) => handleInputChange('motherNationality', e.target.value)}
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
              value={formData.motherReferenceDocument}
              onChange={(e) => handleInputChange('motherReferenceDocument', e.target.value)}
            />
            <FileText className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotherInfoSection;
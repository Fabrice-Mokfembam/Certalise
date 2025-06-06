import React from 'react';
import { User, Calendar, MapPin } from 'lucide-react';

interface ChildInfoProps {
  formData: {
    surName: string;
    givenName: string;
    sex: string;
    dob: string;
    placeOfBirth: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

const ChildInfoSection: React.FC<ChildInfoProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-[#2196F3]/10 text-[#2196F3]">
          <User className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-[#111827]">Child's Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Surname*</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Child's surname"
              value={formData.surName}
              onChange={(e) => handleInputChange('surName', e.target.value)}
              required
            />
            <User className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Given Name*</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Child's given name"
              value={formData.givenName}
              onChange={(e) => handleInputChange('givenName', e.target.value)}
              required
            />
            <User className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Sex*</label>
          <div className="flex space-x-3">
            <button
              type="button"
              className={`flex-1 border rounded-lg p-3 flex items-center justify-center space-x-2 ${
                formData.sex === 'Male' 
                  ? 'border-[#2196F3] bg-[#2196F3]/10 text-[#2196F3]' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleInputChange('sex', 'Male')}
            >
              <span>Male</span>
            </button>
            <button
              type="button"
              className={`flex-1 border rounded-lg p-3 flex items-center justify-center space-x-2 ${
                formData.sex === 'Female' 
                  ? 'border-[#EC4899] bg-[#EC4899]/10 text-[#EC4899]' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleInputChange('sex', 'Female')}
            >
              <span>Female</span>
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Date of Birth*</label>
          <div className="relative">
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              value={formData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              required
            />
            <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Place of Birth*</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Town, health center/hospital"
              value={formData.placeOfBirth}
              onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
              required
            />
            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildInfoSection;
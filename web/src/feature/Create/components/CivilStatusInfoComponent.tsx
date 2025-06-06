import React from 'react';
import { User, Calendar, FileText } from 'lucide-react';

interface DeclarationInfoProps {
  formData: {
    certificateNumber: string;
    dateDrawn: string;
    declarant: string;
    officer: string;
    secretary: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

const DeclarationInfoSection: React.FC<DeclarationInfoProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
          <FileText className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-[#111827]">Declaration Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Certificate Number</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Certificate number"
              value={formData.certificateNumber}
              onChange={(e) => handleInputChange('certificateNumber', e.target.value)}
            />
            <FileText className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Date Drawn</label>
          <div className="relative">
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              value={formData.dateDrawn}
              onChange={(e) => handleInputChange('dateDrawn', e.target.value)}
            />
            <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Declarant</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Name of declarant"
              value={formData.declarant}
              onChange={(e) => handleInputChange('declarant', e.target.value)}
            />
            <User className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Officer</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Officer's name"
              value={formData.officer}
              onChange={(e) => handleInputChange('officer', e.target.value)}
            />
            <User className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-1">Secretary</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
              placeholder="Secretary's name"
              value={formData.secretary}
              onChange={(e) => handleInputChange('secretary', e.target.value)}
            />
            <User className="absolute left-3 top-3.5 h-4 w-4 text-[#4B5563]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarationInfoSection;
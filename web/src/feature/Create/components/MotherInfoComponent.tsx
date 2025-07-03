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

     const normalizeDateForInput = (dateString: string): string => {
        if (!dateString) return '';
        
        // Try different date formats
        const formats = [
          /^(\d{4})[-/](\d{2})[-/](\d{2})$/, // YYYY-MM-DD or YYYY/MM/DD
          /^(\d{2})[-/](\d{2})[-/](\d{4})$/, // MM-DD-YYYY or MM/DD/YYYY
          /^(\d{2})[-/](\d{2})[-/](\d{2})$/, // MM-DD-YY or MM/DD/YY (assuming 20YY)
        ];
        
        for (const format of formats) {
          const match = dateString.match(format);
          if (match) {
            // For YYYY-MM-DD or YYYY/MM/DD
            if (match[1].length === 4) {
              return `${match[1]}-${match[2]}-${match[3]}`;
            }
            // For MM-DD-YYYY or MM/DD/YYYY
            else if (match[3].length === 4) {
              return `${match[3]}-${match[1]}-${match[2]}`;
            }
            // For MM-DD-YY or MM/DD/YY (assuming 20YY)
            else if (match[3].length === 2) {
              return `20${match[3]}-${match[1]}-${match[2]}`;
            }
          }
        }
        
        // If no format matches, return empty string or handle error
        return '';
      };
    
      // Function to format date for storage (you can customize this based on your needs)
      const formatDateForStorage = (dateString: string): string => {
        if (!dateString) return '';
        // Convert from YYYY-MM-DD to your preferred format (e.g., YYYY/MM/DD)
        const [year, month, day] = dateString.split('-');
        return `${year}/${month}/${day}`;
      };
    
      const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value;
        // Convert to your preferred format before storing
        handleInputChange('motherDob', formatDateForStorage(dateValue));
      };
  

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
              value={normalizeDateForInput(formData.motherDob)}
              onChange={handleDateChange}
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
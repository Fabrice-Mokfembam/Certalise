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
    handleInputChange('dob', formatDateForStorage(dateValue));
  };


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
            value={normalizeDateForInput(formData.dob)}
            onChange={handleDateChange}
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
import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import CertificateCard from '../components/CertificateCard';

interface Certificate {
  id: string;
  certificateNumber: string;
  surName: string;
  givenName: string;
  dob: string;
  status: 'Verified' | 'Pending' | 'Expired';
}

const SearchArchives: React.FC = () => {
  // Sample data (only birth certificates)
  const certificates: Certificate[] = [
    { id: 'CID:12345', certificateNumber: '12845', surName: 'Doe', givenName: 'John', dob: '2023-05-15', status: 'Verified' },
    { id: 'CID:12346', certificateNumber: '12846', surName: 'Smith', givenName: 'Jane', dob: '2022-08-22', status: 'Verified' },
    { id: 'CID:12347', certificateNumber: '12847', surName: 'Johnson', givenName: 'Michael', dob: '2021-11-10', status: 'Pending' },
    { id: 'CID:12348', certificateNumber: '12848', surName: 'Wilson', givenName: 'Robert', dob: '2023-02-18', status: 'Verified' },
    { id: 'CID:12349', certificateNumber: '12849', surName: 'Williams', givenName: 'Sarah', dob: '2022-09-30', status: 'Expired' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState<number | null>(null);

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      `${cert.givenName} ${cert.surName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = yearFilter ? new Date(cert.dob).getFullYear() === yearFilter : true;

    return matchesSearch && matchesYear;
  });

  const availableYears = [...new Set(certificates.map((c) => new Date(c.dob).getFullYear()))].sort((a, b) => b - a);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search and Filters in One Line */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
        {/* Search Input */}
        <div className="relative flex-grow w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            placeholder="Search by name, CIN, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Year Filter */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative flex items-center bg-white px-3 py-2 rounded-lg border border-gray-300 shadow-sm">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="appearance-none bg-transparent pr-8 py-1 focus:outline-none text-gray-700"
              value={yearFilter || ''}
              onChange={(e) => setYearFilter(e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <svg
              className="w-4 h-4 ml-2 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {yearFilter && (
            <button
              onClick={() => setYearFilter(null)}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.length > 0 ? (
          filteredCertificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No birth certificates found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchArchives;
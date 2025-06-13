import React, {  useState } from 'react';
import {
  FilePlus,
  FileMinus,
  FileEdit,
  UserPlus,
  Filter,
  Calendar,
  User,
  ChevronDown,
} from 'lucide-react';
import { formatRelativeTime } from '../../../utils/dateFormater';
import { useAuditLogs } from '../hooks/useAuditLog';



interface AuditLogEntry {
  action: 'Document Created' | 'Document Deleted' | 'Document Edited' | 'User Created';
  documentID: string;
  user: string;
  createdAt: Date; // Changed from time to createdAt
  status: 'Processing' | 'Completed';
}

const AuditLog: React.FC = () => {
  const [filters, setFilters] = useState({ 
    date: '', 
    user: '', 
    action: '' 
  });

  const {data:auditLogs} = useAuditLogs();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredLogs = auditLogs?.filter(log => {
    const matchesDate = !filters.date || 
      log.createdAt.toISOString().slice(0, 10) === filters.date;
    const matchesUser = !filters.user || 
      log.user.toLowerCase().includes(filters.user.toLowerCase());
    const matchesAction = !filters.action || log.action === filters.action;
    return matchesDate && matchesUser && matchesAction;
  });

  const getActionIcon = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'Document Created':
        return <FilePlus className="h-4 w-4 mr-2 text-[#4CAF50]" />;
      case 'Document Deleted':
        return <FileMinus className="h-4 w-4 mr-2 text-[#F44336]" />;
      case 'Document Edited':
        return <FileEdit className="h-4 w-4 mr-2 text-[#2196F3]" />;
      case 'User Created':
        return <UserPlus className="h-4 w-4 mr-2 text-[#9C27B0]" />;
      default:
        return <FilePlus className="h-4 w-4 mr-2 text-[#4CAF50]" />;
    }
  };

  const getActionColor = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'Document Created': return '#4CAF50';
      case 'Document Deleted': return '#F44336';
      case 'Document Edited': return '#2196F3';
      case 'User Created': return '#9C27B0';
      default: return '#4CAF50';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111827]">Audit Log</h1>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-[#4B5563]">Last updated:</span>
          <span className="font-medium">Just now</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-[#4B5563]" />
            </div>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] text-[#4B5563]"
              placeholder="Filter by Date"
            />
          </div>
          
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-[#4B5563]" />
            </div>
            <input
              type="text"
              name="user"
              value={filters.user}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] text-[#4B5563]"
              placeholder="Filter by User"
            />
          </div>
          
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-[#4B5563]" />
            </div>
            <select
              name="action"
              value={filters.action}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] text-[#4B5563] appearance-none"
            >
              <option value="">All Actions</option>
              <option value="Document Created">Document Created</option>
              <option value="Document Deleted">Document Deleted</option>
              <option value="Document Edited">Document Edited</option>
              <option value="User Created">User Created</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-[#4B5563]" />
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="font-medium text-[#111827]">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs?.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">
                    <div className="flex items-center">
                      {getActionIcon(log.action)}
                      <span style={{ color: getActionColor(log.action) }}>
                        {log.action}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]">
                    {log.documentID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]">
                    {formatRelativeTime(log.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.status === 'Processing' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;
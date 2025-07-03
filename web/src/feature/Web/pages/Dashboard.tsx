import React, { useEffect } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileText,
  Search,
  FilePlus,
  FileMinus,
  FileEdit,
  UserPlus,
} from "lucide-react";
import { useCertificates } from "../../Create/hooks/useCertificate";
import type { FormData } from "../../Create/pages";
import { useAuditLogs } from "../hooks/useAuditLog";
import { formatRelativeTime } from "../../../utils/dateFormater";

interface AuditLogEntry {
  action: 'Document Created' | 'Document Deleted' | 'Document Edited' | 'User Created';
  documentID: string;
  user: string;
  createdAt: Date;
  status: 'Processing' | 'Completed';
}

const Dashboard: React.FC = () => {
  const { data: certificates = [], isLoading } = useCertificates();
  const { data: auditLogs = [] } = useAuditLogs();

  useEffect(() => {
    console.log('certi', certificates)
  }, [certificates]);

  // Filter certificates with image URL for HTR Processed count
  const filterCertificatesWithImageUrl = (certs: FormData[]): FormData[] => {
    return certs.filter(cert => cert.imageUrl && cert.imageUrl.length > 0);
  };

  const htrProcessedCertificates = filterCertificatesWithImageUrl(certificates);

  // Get the last 4 audit logs for the dashboard
  const recentAuditLogs = auditLogs.slice(0, 4);
  // Get the last 4 certificates for recent documents
  const recentCertificates = certificates.slice(0, 4);

  // Helper functions for audit logs
  const getActionIcon = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'Document Created': return <FilePlus className="h-4 w-4 mr-2 text-[#4CAF50]" />;
      case 'Document Deleted': return <FileMinus className="h-4 w-4 mr-2 text-[#F44336]" />;
      case 'Document Edited': return <FileEdit className="h-4 w-4 mr-2 text-[#2196F3]" />;
      case 'User Created': return <UserPlus className="h-4 w-4 mr-2 text-[#9C27B0]" />;
      default: return <FilePlus className="h-4 w-4 mr-2 text-[#4CAF50]" />;
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

  // Sample data and stats for the dashboard
  const stats = [
    {
      title: "Total Documents",
      value: `${isLoading ? '...' : certificates?.length}`,
      change: "+12%",
      icon: <FileText className='h-5 w-5' />,
    },
    {
      title: "HTR Processed",
      value: `${isLoading ? '...' : htrProcessedCertificates.length}`,
      change: "+3",
      icon: <Clock className='h-5 w-5' />,
    },
    {
      title: "HTR CER",
      value: "4%",
      change: "",
      icon: <CheckCircle2 className='h-5 w-5' />,
    },
    {
      title: "HTR WER",
      value: "10%",
      change: " ",
      icon: <Search className='h-5 w-5' />,
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-[#111827]'>
          Dashboard Overview
        </h1>
        <div className='flex items-center space-x-2 text-sm'>
          <span className='text-[#4B5563]'>Last updated:</span>
          <span className='font-medium'>Just now</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='bg-white rounded-xl p-5 shadow-sm border border-gray-100'
          >
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-[#4B5563]'>
                  {stat.title}
                </p>
                <p className='text-2xl font-bold text-[#111827]'>
                  {stat.value}
                </p>
                <p
                  className={`text-xs flex items-center ${
                    stat.change.startsWith("+")
                      ? "text-green-500"
                      : "text-blue-500"
                  }`}
                >
                  <ArrowUpRight className='h-3 w-3 mr-1' />
                  {stat.change} from yesterday
                </p>
              </div>
              <div className='p-3 rounded-lg bg-[#2196F3]/10 text-[#2196F3]'>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Documents */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Recent Activity Table - Now using real audit logs */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-5 border-b border-gray-200'>
            <h2 className='font-medium text-[#111827]'>Recent Activity</h2>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider'>
                    Action
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider'>
                    Document
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider'>
                    User
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider'>
                    Time
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {recentAuditLogs.map((log, index) => (
                  <tr key={index} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]'>
                      <div className='flex items-center'>
                        {getActionIcon(log.action)}
                        <span style={{ color: getActionColor(log.action) }}>
                          {log.action}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                      {log.documentID}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                      {log.user}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                      {formatRelativeTime(log.createdAt)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
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
          <div className='px-5 py-3 border-t border-gray-200 text-center'>
            <button className='text-sm font-medium text-[#2196F3] hover:text-[#2196F3]/80'>
              View all activity
            </button>
          </div>
        </div>

        {/* Recent Documents - Now using real certificate data */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-5 border-b border-gray-200'>
            <h2 className='font-medium text-[#111827]'>Recent Documents</h2>
          </div>
          <div className='divide-y divide-gray-200'>
            {recentCertificates?.slice(0,4).map((cert:FormData) => (
              <div
                key={cert.certificateNumber}
                className='p-4 hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-start space-x-3'>
                  <div className='p-2 rounded-lg bg-[#2196F3]/10 text-[#2196F3]'>
                    <FileText className='h-5 w-5' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-[#111827] truncate'>
                      Birth Certificate #{cert.certificateNumber}
                    </p>
                    <p className='text-xs text-[#4B5563]'>
                      Certificate • {formatRelativeTime(new Date(cert.createdAt))}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        "bg-green-100 text-green-800"
                          
                      }`}
                    >Completed
                      
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='px-5 py-3 border-t border-gray-200 text-center'>
            <button className='text-sm font-medium text-[#2196F3] hover:text-[#2196F3]/80'>
              View all documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
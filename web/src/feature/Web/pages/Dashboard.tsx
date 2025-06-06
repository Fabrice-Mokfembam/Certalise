import React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileText,
  Search,
  UploadCloud,
} from "lucide-react";

const Dashboard: React.FC = () => {
  // Sample data
  const stats = [
    {
      title: "Total Documents",
      value: "1,248",
      change: "+12%",
      icon: <FileText className='h-5 w-5' />,
    },
    {
      title: "Processing",
      value: "24",
      change: "+3",
      icon: <Clock className='h-5 w-5' />,
    },
    {
      title: "Completed",
      value: "1,201",
      change: "+89",
      icon: <CheckCircle2 className='h-5 w-5' />,
    },
    {
      title: "Search Queries",
      value: "328",
      change: "+21%",
      icon: <Search className='h-5 w-5' />,
    },
  ];

  const recentDocuments = [
    {
      name: "Birth Certificate #12345",
      type: "Certificate",
      uploaded: "2 mins ago",
      status: "Processing",
    },
    {
      name: "Marriage License #5678",
      type: "License",
      uploaded: "15 mins ago",
      status: "Processing",
    },
    {
      name: "Death Certificate #9101",
      type: "Certificate",
      uploaded: "1 hour ago",
      status: "Completed",
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
                      : "text-red-500"
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
        {/* Recent Activity Table */}
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
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]'>
                    <div className='flex items-center'>
                      <UploadCloud className='h-4 w-4 mr-2 text-[#2196F3]' />
                      Document Uploaded
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                    Birth Certificate #12345
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                    John Doe
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                    2 minutes ago
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                      Processing
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]'>
                    <div className='flex items-center'>
                      <FileText className='h-4 w-4 mr-2 text-[#2196F3]' />
                      Record Created
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                    Birth Certificate #12344
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                    Jane Smith
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                    1 hour ago
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]'>
                    <div className='flex items-center'>
                      <Search className='h-4 w-4 mr-2 text-[#2196F3]' />
                      Search Query
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                    Name: Michael Johnson
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                    Robert Wilson
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-[#4B5563]'>
                    2 hours ago
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='px-5 py-3 border-t border-gray-200 text-center'>
            <button className='text-sm font-medium text-[#2196F3] hover:text-[#2196F3]/80'>
              View all activity
            </button>
          </div>
        </div>

        {/* Recent Documents */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='p-5 border-b border-gray-200'>
            <h2 className='font-medium text-[#111827]'>Recent Documents</h2>
          </div>
          <div className='divide-y divide-gray-200'>
            {recentDocuments.map((doc, index) => (
              <div
                key={index}
                className='p-4 hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-start space-x-3'>
                  <div className='p-2 rounded-lg bg-[#2196F3]/10 text-[#2196F3]'>
                    <FileText className='h-5 w-5' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-[#111827] truncate'>
                      {doc.name}
                    </p>
                    <p className='text-xs text-[#4B5563]'>
                      {doc.type} • {doc.uploaded}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        doc.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {doc.status}
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

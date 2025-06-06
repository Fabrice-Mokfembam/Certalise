import React from "react";
import { FileText, Edit, Trash2, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Certificate {
  certificateNumber: string;
  surName: string;
  givenName: string;
  dob: string;
  status: "Verified" | "Pending" | "Expired";
  id?: string;
}

const CertificateCard: React.FC<{ certificate: Certificate }> = ({ certificate }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/birthcertificatedetail/${certificate.certificateNumber}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/editbirthcerticate/${certificate.certificateNumber}`);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add download logic here
    console.log("Download clicked");
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add delete logic here
    console.log("Delete clicked");
  };

  return (
    <div 
      className='w-full h-64 bg-white rounded-xl border border-gray-200 cursor-pointer hover:shadow-md transition-shadow'
      onClick={handleCardClick}
    >
      <div className='p-4 h-full flex flex-col'>
        <div className='w-full h-30 bg-[#F9FAFB] rounded-lg flex justify-center items-center flex-1'>
          <FileText className='h-8 w-8 text-[#9CA3AF]' />
        </div>

        <div className="p-2 space-y-1">
          <h3 className='text-md font-semibold text-gray-900'>{`${certificate.givenName} ${certificate.surName}`}</h3>
          <p className='text-sm text-gray-600'>
            CIN : {certificate.certificateNumber}
          </p>
          
        </div>

        <div className="flex gap-4 p-2 mt-2 justify-end">
          <Download 
            className="size-4 cursor-pointer text-gray-500 hover:text-blue-500" 
            onClick={handleDownloadClick}
          />
          <Edit 
            className="size-4 cursor-pointer text-gray-500 hover:text-yellow-500" 
            onClick={handleEditClick}
          />
          <Trash2 
            className="size-4 cursor-pointer text-gray-500 hover:text-red-500" 
            onClick={handleDeleteClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
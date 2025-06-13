import React from "react";
import { FileText, Edit, Trash2, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FormData } from "../../Create/pages";
import { useDeleteCertificate, useGenerateCertificatePDF } from "../../Create/hooks/useCertificate";
import { Loader2 } from "lucide-react";

const CertificateCard: React.FC<{ certificate: FormData }> = ({ certificate }) => {
  const navigate = useNavigate();

  const {
    mutate: deleteCert,
    isPending: isDeleting,
    error: deleteError
  } = useDeleteCertificate();

  const {
    mutate: generatePDF,
    isPending: isGenerating,
    error: generateError
  } = useGenerateCertificatePDF();

  const handleCardClick = () => {
    navigate(`/birthcertificatedetail/${certificate.certificateNumber}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/editbirthcerticate/${certificate.certificateNumber}`);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  
    generatePDF(certificate, {
      onSuccess: (pdfBlob) => {
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${certificate.certificateNumber}.pdf`);
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, 100);
      }
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      deleteCert(certificate.certificateNumber);
    }
  };

  // Error popups
  if (deleteError) {
    alert("Failed to delete certificate: " + (deleteError as Error).message);
  }

  if (generateError) {
    alert("Failed to generate PDF: " + (generateError as Error).message);
  }

  const isBusy = isDeleting || isGenerating;

  return (
    <div 
      className='w-full h-64 bg-white rounded-xl border border-gray-200 cursor-pointer hover:shadow-md transition-shadow relative'
      onClick={handleCardClick}
    >
      {isBusy && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-xl z-10">
          <Loader2 className="animate-spin text-gray-600 size-6" />
        </div>
      )}

      <div className='p-4 h-full flex flex-col'>
        <div className='w-full h-30 bg-[#F9FAFB] rounded-lg flex justify-center items-center flex-1'>
          <FileText className='h-8 w-8 text-[#9CA3AF]' />
        </div>

        <div className="p-2 space-y-1">
          <h3 className='text-md font-semibold text-gray-900'>
            {`${certificate.givenName} ${certificate.surName}`}
          </h3>
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

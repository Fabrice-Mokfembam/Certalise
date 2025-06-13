import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Edit, Download, Trash2, ChevronLeft,
  User, FileText, Eye, EyeOff, Loader2
} from 'lucide-react';
import BirthCertificatePreviewForm from './BirthCertiPreview';
import {
  useCertificate,
  useGenerateCertificatePDF,
  useDeleteCertificate
} from '../hooks/useCertificate';

const CertificateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(true);

  const {
    data: certificate,
    isLoading,
    error
  } = useCertificate(id!);

  const {
    mutate: generate,
    isPending: generatePending,
    error: generateError
  } = useGenerateCertificatePDF();

  const {
    mutate: deleteCert,
    isPending: deletePending,
    error: deleteError
  } = useDeleteCertificate();

  // Display any generation or deletion errors
  useEffect(() => {
    if (generateError) {
      alert("Failed to generate PDF: " + (generateError as Error).message);
    }
    if (deleteError) {
      alert("Failed to delete certificate: " + (deleteError as Error).message);
    }
  }, [generateError, deleteError]);

  const handleDownloadPdf = () => {
    if (!certificate) return;
    generate(certificate, {
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

  const handleDelete = () => {
    if (!certificate) return;
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      deleteCert(certificate.certificateNumber, {
        onSuccess: () => navigate(-1)
      });
    }
  };

  if (isLoading) return <div>Loading certificate...</div>;
  if (error) return <div className="text-red-600">Error loading certificate: {(error as Error).message}</div>;
  if (!certificate) return <div>Certificate not found.</div>;

  const isBusy = generatePending || deletePending;

  return (
    <div className="max-w-6xl mx-auto p-4 pb-20 relative">
      
      {/* Overlay when busy */}
      {isBusy && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-20 rounded-xl">
          <Loader2 className="animate-spin text-gray-600 size-8" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-[#2196F3] hover:text-[#2196F3]/80">
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Certificates
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Birth Certificate Details</h1>
        <div className="w-24" />
      </div>

      {/* Certificate Info Sections */}
      {/* Child Info */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-[#2196F3]/10 text-[#2196F3]">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-[#111827]">Child's Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField label="Surname" value={certificate.surName} />
            <InfoField label="Given Name" value={certificate.givenName} />
            <InfoField label="Sex" value={certificate.sex} />
            <InfoField label="Date of Birth" value={new Date(certificate.dob).toLocaleDateString()} />
            <InfoField label="Place of Birth" value={certificate.placeOfBirth} />
          </div>
        </div>

        {/* Father Info */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-[#111827]">Father's Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField label="Full Name" value={certificate.fatherName} />
            <InfoField label="Date of Birth" value={certificate.fatherDob ? new Date(certificate.fatherDob).toLocaleDateString() : 'N/A'} />
            <InfoField label="Place of Birth" value={certificate.fatherPlaceOfBirth || 'N/A'} />
            <InfoField label="Residence" value={certificate.fatherResidence || 'N/A'} />
            <InfoField label="Occupation" value={certificate.fatherOccupation || 'N/A'} />
            <InfoField label="Nationality" value={certificate.fatherNationality || 'N/A'} />
            <InfoField label="Reference Document" value={certificate.fatherReferenceDocument || 'N/A'} />
          </div>
        </div>

        {/* Mother Info */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-[#111827]">Mother's Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField label="Full Name" value={certificate.motherName} />
            <InfoField label="Date of Birth" value={certificate.motherDob ? new Date(certificate.motherDob).toLocaleDateString() : 'N/A'} />
            <InfoField label="Place of Birth" value={certificate.motherPlaceOfBirth || 'N/A'} />
            <InfoField label="Residence" value={certificate.motherResidence || 'N/A'} />
            <InfoField label="Occupation" value={certificate.motherOccupation || 'N/A'} />
            <InfoField label="Nationality" value={certificate.motherNationality || 'N/A'} />
            <InfoField label="Reference Document" value={certificate.motherReferenceDocument || 'N/A'} />
          </div>
        </div>

        {/* Declaration Info */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-[#111827]">Declaration Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField label="Certificate Number" value={certificate.certificateNumber} />
            <InfoField label="Date Drawn" value={new Date(certificate.dateDrawn).toLocaleDateString()} />
            <InfoField label="Declarant" value={certificate.declarant} />
            <InfoField label="Officer" value={certificate.officer} />
            <InfoField label="Secretary" value={certificate.secretary} />
          </div>
        </div>
      </section>

      {/* Preview & Download */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#111827]">Certificate Preview</h2>
          <button onClick={() => setShowPreview(!showPreview)} className="text-[#2196F3] hover:text-[#2196F3]/80">
            {showPreview
              ? <><EyeOff className="h-4 w-4 mr-1" /> Hide</>
              : <><Eye className="h-4 w-4 mr-1" /> Show</>
            }
          </button>
        </div>
        {showPreview && (
          <>
            <div className="rounded-lg p-4 flex justify-center">
              <BirthCertificatePreviewForm formData={certificate} />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDownloadPdf}
                disabled={generatePending}
                className="px-4 py-2 bg-[#2196F3] text-white rounded-lg flex items-center"
              >
                {generatePending
                  ? <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  : <Download className="h-4 w-4 mr-2" />
                }
                {generatePending ? "Downloading..." : "Download PDF"}
              </button>
            </div>
            {generateError && (
              <p className="text-sm text-red-500 mt-2">
                Failed to generate PDF. Please try again.
              </p>
            )}
          </>
        )}
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex space-x-3">
        <button
          onClick={() => navigate(`/editbirthcerticate/${certificate.certificateNumber}`)}
          disabled={isBusy}
          className="p-4 bg-[#2196F3] text-white rounded-full shadow-lg hover:bg-[#2196F3]/90 transition-colors"
          title="Edit Certificate"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={handleDelete}
          disabled={isBusy}
          className="p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
          title="Delete Certificate"
        >
          {deletePending
            ? <Loader2 className="animate-spin h-5 w-5" />
            : <Trash2 className="h-5 w-5" />
          }
        </button>
      </div>
    </div>
  );
};

// Simple component for displaying label/value pairs
const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

export default CertificateDetail;

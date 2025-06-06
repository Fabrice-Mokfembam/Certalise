import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Edit, Download, Trash2, ChevronLeft, Printer, User, FileText, Eye, EyeOff } from 'lucide-react';
import BirthCertificatePreviewForm from './BirthCertiPreview';

const certificate = {
    certificateNumber: "BC-2023-04567",
    surName: "Johnson",
    givenName: "Emma Grace",
    sex: "Female",
    placeOfBirth: "Buea Regional Hospital, Southwest Region",
    dob: "2023-05-15",
    fatherName: "Michael Johnson",
    fatherPlaceOfBirth: "Bamenda, Northwest Region",
    fatherDob: "1985-08-22",
    fatherResidence: "123 Unity Street, Buea",
    fatherOccupation: "Civil Engineer",
    fatherNationality: "Cameroonian",
    fatherReferenceDocument: "National ID Card #123456789",
    motherName: "Sarah Johnson (née Mbua)",
    motherPlaceOfBirth: "Limbe, Southwest Region",
    motherDob: "1990-03-10",
    motherResidence: "123 Unity Street, Buea",
    motherOccupation: "Pediatric Nurse",
    motherNationality: "Cameroonian",
    motherReferenceDocument: "National ID Card #987654321",
    dateDrawn: "2023-06-20",
    declarant: "Dr. James Nfor - Attending Physician",
    officer: "Mr. Samuel Enow",
    secretary: "Mrs. Agnes Che"
}

const CertificateDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="max-w-6xl mx-auto p-4 pb-20">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#2196F3] hover:text-[#2196F3]/80"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Certificates
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Birth Certificate Details</h1>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>

      {/* Certificate Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        {/* Child's Information */}
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
            <div className="md:col-span-2">
              <InfoField label="Place of Birth" value={certificate.placeOfBirth} />
            </div>
          </div>
        </div>

        {/* Father's Information */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-[#111827]">Father's Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <InfoField label="Full Name" value={certificate.fatherName} />
            </div>
            <InfoField label="Date of Birth" value={certificate.fatherDob ? new Date(certificate.fatherDob).toLocaleDateString() : 'N/A'} />
            <InfoField label="Place of Birth" value={certificate.fatherPlaceOfBirth || 'N/A'} />
            <InfoField label="Residence" value={certificate.fatherResidence || 'N/A'} />
            <InfoField label="Occupation" value={certificate.fatherOccupation || 'N/A'} />
            <InfoField label="Nationality" value={certificate.fatherNationality || 'N/A'} />
            <div className="md:col-span-2">
              <InfoField label="Reference Document" value={certificate.fatherReferenceDocument || 'N/A'} />
            </div>
          </div>
        </div>

        {/* Mother's Information */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-[#111827]">Mother's Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <InfoField label="Full Name" value={certificate.motherName} />
            </div>
            <InfoField label="Date of Birth" value={certificate.motherDob ? new Date(certificate.motherDob).toLocaleDateString() : 'N/A'} />
            <InfoField label="Place of Birth" value={certificate.motherPlaceOfBirth || 'N/A'} />
            <InfoField label="Residence" value={certificate.motherResidence || 'N/A'} />
            <InfoField label="Occupation" value={certificate.motherOccupation || 'N/A'} />
            <InfoField label="Nationality" value={certificate.motherNationality || 'N/A'} />
            <div className="md:col-span-2">
              <InfoField label="Reference Document" value={certificate.motherReferenceDocument || 'N/A'} />
            </div>
          </div>
        </div>

        {/* Declaration Information */}
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
            <div className="md:col-span-2">
              <InfoField label="Declarant" value={certificate.declarant} />
            </div>
            <InfoField label="Officer" value={certificate.officer} />
            <InfoField label="Secretary" value={certificate.secretary} />
          </div>
        </div>
      </div>

      {/* Preview Section - Toggleable */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#111827]">Certificate Preview</h2>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-[#2196F3] hover:text-[#2196F3]/80 flex items-center"
            title={showPreview ? "Hide Preview" : "Show Preview"}
          >
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4 mr-1" />
                Hide
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-1" />
                Show
              </>
            )}
          </button>
        </div>
        
        {showPreview && (
          <>
            <div className=" rounded-lg p-4 flex justify-center">
              <BirthCertificatePreviewForm formData={certificate} />
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-[#2196F3] text-white rounded-lg flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          </>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex space-x-3">
        <button
          onClick={() => navigate(`/editbirthcerticate/${certificate.certificateNumber}`)}
          className="p-4 bg-[#2196F3] text-white rounded-full shadow-lg hover:bg-[#2196F3]/90 transition-colors"
          title="Edit Certificate"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          className="p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
          title="Delete Certificate"
        >
          <Trash2 className="h-5 w-5" />
        </button>
        <button
          onClick={() => window.print()}
          className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
          title="Print Certificate"
        >
          <Printer className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

// Reusable component for displaying info fields
const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

export default CertificateDetail;
import React, { useRef, useState } from 'react';
import { Save, Eye, EyeOff } from 'lucide-react';
// import axios from 'axios';
import BirthCertificatePreviewForm from './BirthCertiPreview';
import ChildInfoSection from '../components/ChildInfoComponent';
import FatherInfoSection from '../components/FatherInfoComponent';
import MotherInfoSection from '../components/MotherInfoComponent';
import DeclarationInfoSection from '../components/CivilStatusInfoComponent';
import { useCreateCertificate, useGenerateCertificatePDF } from '../hooks/useCertificate';
import { useLocation } from 'react-router-dom';


export interface FormData {
  certificateNumber: string;
  surName: string;
  givenName: string;
  sex: string;
  placeOfBirth: string;
  dob: string;
  fatherName: string;
  fatherPlaceOfBirth: string;
  fatherDob: string;
  fatherResidence: string;
  fatherOccupation: string;
  fatherNationality: string;
  fatherReferenceDocument: string;
  motherName: string;
  motherPlaceOfBirth: string;
  motherDob: string;
  motherResidence: string;
  motherOccupation: string;
  motherNationality: string;
  motherReferenceDocument: string;
  dateDrawn: string;
  declarant: string;
  createdAt:Date | string;
  officer: string;
  secretary: string;
  imageUrl?: string ,
    pdfUrl?: string ,
}

const initialFormData: FormData = {
  certificateNumber: '',
  surName: '',
  givenName: '',
  sex: '',
  placeOfBirth: '',
  dob: '',
  fatherName: '',
  fatherPlaceOfBirth: '',
  fatherDob: '',
  fatherResidence: '',
  fatherOccupation: '',
  fatherNationality: '',
  fatherReferenceDocument: '',
  motherName: '',
  motherPlaceOfBirth: '',
  motherDob: '',
  motherResidence: '',
  motherOccupation: '',
  motherNationality: '',
  motherReferenceDocument: '',
  dateDrawn: '',
  declarant: '',
  officer: '',
  secretary: '',
  imageUrl: '',
  createdAt:'',
  pdfUrl: '',
};

const Create: React.FC = () => {
  const {mutate,isPending,error} = useCreateCertificate()
  const {mutate:generate,isPending:generatePending,error:generateError} = useGenerateCertificatePDF()

  const location = useLocation();



  const [formData, setFormData] = useState<FormData>(location.state?.formData || {
    certificateNumber: '',
    surName: '',
    givenName: '',
    sex: '',
    placeOfBirth: '',
    dob: '',
    fatherName: '',
    fatherPlaceOfBirth: '',
    fatherDob: '',
    fatherResidence: '',
    fatherOccupation: '',
    fatherNationality: '',
    fatherReferenceDocument: '',
    motherName: '',
    motherPlaceOfBirth: '',
    motherDob: '',
    motherResidence: '',
    motherOccupation: '',
    motherNationality: '',
    motherReferenceDocument: '',
    dateDrawn: '',
    declarant: '',
    imageUrl: '' ,
    officer: '',
    secretary: '',
  });

  const [showPreview, setShowPreview] = useState(true);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFormInputs = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(formData,{
      onSuccess:()=>{
        // handleDownloadPdf()
        generate(formData,{
          onSuccess: (pdfBlob) => {
            // Create blob URL directly from the response
            const url = window.URL.createObjectURL(pdfBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${formData.certificateNumber}.pdf`);
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            setTimeout(() => {
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
              clearFormInputs();
            }, 100);
          },
          onError: (error) => {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');

          }
        })
      }
    })
    console.log('Form submitted:', formData);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const printRef = useRef<HTMLDivElement>(null);

  // const handleDownloadPdf = async () => {
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:5000/api/pdf/generate',
  //       formData,
  //       {
  //         responseType: 'blob', // Important for handling binary PDF data
  //       }
  //     );

  //     // Create a downloadable link for the PDF
  //     const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'birth_certificate.pdf');
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);

  //     console.log('PDF downloaded successfully');
  //   } catch (error) {
  //     console.error('Error downloading PDF:', error);
  //     alert('Failed to generate PDF. Please try again.');
  //   }
  // };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <ChildInfoSection
          formData={{
            surName: formData.givenName,
            givenName: formData.surName,
            sex: formData.sex,
            dob: formData.dob,
            placeOfBirth: formData.placeOfBirth,
          }}
          handleInputChange={handleInputChange}
        />

        <FatherInfoSection
          formData={{
            fatherName: formData.fatherName,
            fatherPlaceOfBirth: formData.fatherPlaceOfBirth,
            fatherDob: formData.fatherDob,
            fatherResidence: formData.fatherResidence,
            fatherOccupation: formData.fatherOccupation,
            fatherNationality: formData.fatherNationality,
            fatherReferenceDocument: formData.fatherReferenceDocument,
          }}
          handleInputChange={handleInputChange}
        />

        <MotherInfoSection
          formData={{
            motherName: formData.motherName,
            motherPlaceOfBirth: formData.motherPlaceOfBirth,
            motherDob: formData.motherDob,
            motherResidence: formData.motherResidence,
            motherOccupation: formData.motherOccupation,
            motherNationality: formData.motherNationality,
            motherReferenceDocument: formData.motherReferenceDocument,
          }}
          handleInputChange={handleInputChange}
        />

        <DeclarationInfoSection
          formData={{
            certificateNumber: formData.certificateNumber,
            dateDrawn: formData.dateDrawn,
            declarant: formData.declarant,
            officer: formData.officer,
            secretary: formData.secretary,
          }}
          handleInputChange={handleInputChange}
        />

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button
            type="button"
            onClick={togglePreview}
            className="px-4 py-2 text-[#2196F3] hover:text-[#2196F3]/80 flex items-center"
          >
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Preview
              </>
            )}
          </button>
          <div className="flex space-x-3">
  <button
    type="submit"
    disabled={isPending || generatePending}
    className={`px-6 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 
      ${isPending || generatePending ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2196F3] hover:bg-[#2196F3]/90'} 
      text-white`}
  >
    <Save className="h-4 w-4"/>
    <span>
      {isPending
        ? 'Saving...'
        : generatePending
        ? 'Downloading...'
        : 'Save & Download PDF'}
    </span>
  </button>
</div>
{error && (
  <p className="text-sm text-red-500 mt-2">Failed to save certificate. Please try again.</p>
)}
{generateError && (
  <p className="text-sm text-red-500 mt-2">Failed to generate PDF. Please try again.</p>
)}
  </div> </form>

      {/* Preview Section */}
      {showPreview && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#111827] mb-4">Certificate Preview</h2>
          <div className="rounded-lg p-4 flex justify-center">
            <BirthCertificatePreviewForm pdfRef={printRef} formData={formData} />
          </div>
          {formData.imageUrl && (
      <div className="mt-6">
        <h3 className="text-lg font-medium text-[#111827] mb-2">Uploaded Document</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <img
            src={formData.imageUrl}
            alt="Uploaded document"
            className="w-full h-auto max-h-96 object-contain mx-auto"
          />
        </div>
      </div>
    )}
        </div>
      )}
    </div>
  );
};

export default Create;
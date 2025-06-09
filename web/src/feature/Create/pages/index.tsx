import React, { useRef, useState } from 'react';
import {  Save, Eye, EyeOff } from 'lucide-react';
import BirthCertificatePreviewForm from './BirthCertiPreview';
import ChildInfoSection from '../components/ChildInfoComponent';
import FatherInfoSection from '../components/FatherInfoComponent';
import MotherInfoSection from '../components/MotherInfoComponent';
import DeclarationInfoSection from '../components/CivilStatusInfoComponent';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  officer: string;
  secretary: string;
}

const Create: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    certificateNumber: "",
    surName: "",
    givenName: "",
    sex: "",
    placeOfBirth: "",
    dob: "",
    fatherName: "",
    fatherPlaceOfBirth: "",
    fatherDob: "",
    fatherResidence: "",
    fatherOccupation: "",
    fatherNationality: "",
    fatherReferenceDocument: "",
    motherName: "",
    motherPlaceOfBirth: "",
    motherDob: "",
    motherResidence: "",
    motherOccupation: "",
    motherNationality: "",
    motherReferenceDocument: "",
    dateDrawn: "",
    declarant: "",
    officer: "",
    secretary: ""
  });

  const [showPreview, setShowPreview] = useState(true);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("examplepdf.pdf");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <ChildInfoSection 
          formData={{
            surName: formData.surName,
            givenName: formData.givenName,
            sex: formData.sex,
            dob: formData.dob,
            placeOfBirth: formData.placeOfBirth
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
            fatherReferenceDocument: formData.fatherReferenceDocument
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
            motherReferenceDocument: formData.motherReferenceDocument
          }}
          handleInputChange={handleInputChange}
        />
        
        <DeclarationInfoSection 
          formData={{
            certificateNumber: formData.certificateNumber,
            dateDrawn: formData.dateDrawn,
            declarant: formData.declarant,
            officer: formData.officer,
            secretary: formData.secretary
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
              onClick={handleDownloadPdf}
              className="px-6 py-2 bg-[#2196F3] rounded-lg text-sm font-medium text-white hover:bg-[#2196F3]/90 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Certificate</span>
            </button>
          </div>
        </div>
      </form>

      {/* Preview Section */}
      {showPreview && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#111827] mb-4">Certificate Preview</h2>
          <div className="rounded-lg p-4 flex justify-center">
            <BirthCertificatePreviewForm pdfRef={printRef} formData={formData}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
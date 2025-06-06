import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import ChildInfoSection from '../components/ChildInfoComponent';
import FatherInfoSection from '../components/FatherInfoComponent';
import MotherInfoSection from '../components/MotherInfoComponent';
import DeclarationInfoSection from '../components/CivilStatusInfoComponent';
import BirthCertificatePreviewForm from './BirthCertiPreview';

const EditBirthCertificate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    secretary: "",
    status: 'Verified'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    const loadCertificate = async () => {
      try {
        // Simulate loading data
        const mockData = {
          certificateNumber: "BC-2023-04567",
          surName: "Johnson",
          givenName: "Emma Grace",
          sex: "Female",
          placeOfBirth: "Buea Regional Hospital",
          dob: "2023-05-15",
          fatherName: "Michael Johnson",
          fatherPlaceOfBirth: "Bamenda",
          fatherDob: "1985-08-22",
          fatherResidence: "123 Unity Street, Buea",
          fatherOccupation: "Civil Engineer",
          fatherNationality: "Cameroonian",
          fatherReferenceDocument: "National ID Card #123456789",
          motherName: "Sarah Johnson (née Mbua)",
          motherPlaceOfBirth: "Limbe",
          motherDob: "1990-03-10",
          motherResidence: "123 Unity Street, Buea",
          motherOccupation: "Pediatric Nurse",
          motherNationality: "Cameroonian",
          motherReferenceDocument: "National ID Card #987654321",
          dateDrawn: "2023-06-20",
          declarant: "Dr. James Nfor",
          officer: "Mr. Samuel Enow",
          secretary: "Mrs. Agnes Che",
          status: 'Verified'
        };
        setFormData(mockData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load certificate');
        setIsLoading(false);
        console.error(err);
      }
    };

    loadCertificate();
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Form submitted:", formData);
      navigate(`/certificates/${id}`, { state: { success: true } });
    } catch (err) {
      setError('Failed to update certificate');
      console.error(err);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading certificate...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#2196F3] hover:text-[#2196F3]/80"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Certificate
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Edit Birth Certificate</h1>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>

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
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#4B5563] hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#2196F3] rounded-lg text-sm font-medium text-white hover:bg-[#2196F3]/90 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>

      {/* Preview Section */}
      {showPreview && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#111827] mb-4">Certificate Preview</h2>
          <div className="rounded-lg p-4 flex justify-center">
            <BirthCertificatePreviewForm formData={formData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBirthCertificate;
import React, { useState, useCallback, useRef } from 'react';
import { UploadCloud, X, Scan, FileText, Camera } from 'lucide-react';
import { useProcessCertificateImage } from '../../Create/hooks/useCertificate';
import { useUploadFileToCloudinary } from '../../../hooks/useUploadImage';
import { useNavigate } from 'react-router-dom';
import type { FormData } from '../../Create/pages';

// Import react-webcam and react-image-crop
import Webcam from 'react-webcam';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop'; // Corrected import
import 'react-image-crop/dist/ReactCrop.css';

const Digitalise: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  // Camera and Cropping States
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [capturedImageSrc, setCapturedImageSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

  const { mutate: processImage, isPending: isProcessingPending } = useProcessCertificateImage();
  const { mutate: uploadImageToCloud, isPending: isUploadingPending } = useUploadFileToCloudinary();

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
    // Reset camera and cropping states when a new file is selected
    setIsCameraActive(false);
    setCapturedImageSrc(null);
    setCrop(undefined);
    setCompletedCrop(null);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsCameraActive(false);
    setCapturedImageSrc(null);
    setCrop(undefined);
    setCompletedCrop(null);
  };

  // --- Camera Functions ---
  const activateCamera = () => {
    setSelectedFile(null); // Clear any previously selected file
    setPreviewUrl(null);
    setIsCameraActive(true);
    setCapturedImageSrc(null);
    setCrop(undefined);
    setCompletedCrop(null);
  };

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImageSrc(imageSrc);
        setIsCameraActive(false); // Deactivate camera after capture
        setCrop(undefined); // Reset crop for the new image
        setCompletedCrop(null);
      }
    }
  }, [webcamRef]);

  // --- Cropping Functions ---
  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    imgRef.current = e.currentTarget;
    // You can set an initial crop here if desired, e.g., a square in the center
    // const { naturalWidth, naturalHeight } = e.currentTarget;
    // setCrop({
    //   unit: '%',
    //   width: 50,
    //   height: 50,
    //   x: 25,
    //   y: 25,
    // });
  }, []);

  const onCropComplete = useCallback((crop: PixelCrop) => {
    setCompletedCrop(crop);
  }, []);

  const getCroppedImage = useCallback(async () => {
    if (imgRef.current && completedCrop) {
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext('2d');

      ctx?.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      return new Promise<File>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const croppedFile = new File([blob], 'cropped-certificate.png', {
              type: 'image/png',
              lastModified: Date.now(),
            });
            resolve(croppedFile);
          }
        }, 'image/png');
      });
    }
    return null;
  }, [completedCrop]);


  const handleProcessImage = async () => {
    let fileToProcess: File | null = selectedFile;

    // If an image was captured and cropped, use the cropped image
    if (capturedImageSrc && completedCrop) {
      fileToProcess = await getCroppedImage();
      if (!fileToProcess) {
        console.error('Failed to get cropped image.');
        return;
      }
    } else if (capturedImageSrc && !completedCrop) {
        // If an image was captured but not cropped, convert the data URL to a File
        const response = await fetch(capturedImageSrc);
        const blob = await response.blob();
        fileToProcess = new File([blob], 'captured-certificate.png', {
            type: 'image/png',
            lastModified: Date.now(),
        });
    }

    if (!fileToProcess) {
      console.error('No file or captured image selected/cropped.');
      return;
    }

    // Step 1: Upload the image to Cloudinary
    uploadImageToCloud(fileToProcess, {
      onSuccess: (uploadData) => {
        console.log('Image uploaded to Cloudinary:', uploadData.secure_url);

        processImage(fileToProcess as File, {
          onSuccess: (processResult) => {
            console.log('Extracted data:', processResult);
            handleProcessResultAndNavigate(processResult, uploadData.secure_url);
          },
          onError: (processError) => console.error('Error processing image:', processError),
        });
      },
      onError: (uploadError) => console.error('Error uploading image to Cloudinary:', uploadError),
    });
  };

  const transformCertificateData = (certificateData: any, url: string): FormData => {
    return {
      certificateNumber: certificateData.certificateNumber || '',
      surName: certificateData.child?.surname || '',
      givenName: certificateData.child?.givenNames || '',
      sex: certificateData.child?.sex || '',
      placeOfBirth: certificateData.child?.birthPlace || '',
      dob: certificateData.child?.birthDate || '',
      fatherName: certificateData.father?.fullName || '',
      fatherPlaceOfBirth: certificateData.father?.birthPlace || '',
      fatherDob: certificateData.father?.birthDate || '',
      fatherResidence: certificateData.father?.residence || '',
      fatherOccupation: certificateData.father?.profession || '',
      fatherNationality: certificateData.father?.nationality || '',
      fatherReferenceDocument: certificateData.referenceDocument || '',
      motherName: certificateData.mother?.fullName || '',
      motherPlaceOfBirth: certificateData.mother?.birthPlace || '',
      motherDob: certificateData.mother?.birthDate || '',
      motherResidence: certificateData.mother?.residence || '',
      motherOccupation: certificateData.mother?.profession || '',
      motherNationality: certificateData.mother?.nationality || '',
      motherReferenceDocument: certificateData.referenceDocument || '',
      dateDrawn: certificateData.drawnUpDate || '',
      declarant: certificateData.declarationOf || '',
      officer: certificateData.civilStatusRegistrar?.name || '',
      secretary: certificateData.civilStatusSecretary?.name || '',
      createdAt: certificateData.createdAt || '',
      imageUrl: url,
      pdfUrl: ''
    };
  };

  const buttonText = isUploadingPending
    ? 'Digitalising Image...'
    : isProcessingPending
    ? 'HTR processing...'
    : 'Continue to Scan';

  const buttonDisabled = isUploadingPending || isProcessingPending;


  const handleProcessResultAndNavigate = (result: object, url: string) => {
    const formData = transformCertificateData(result, url);
    navigate('/create', { state: { formData } });
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {!selectedFile && !isCameraActive && !capturedImageSrc ? (
        <div
          className="border-2 border-dashed border-[#2196F3] mt-20 rounded-xl p-12 text-center cursor-pointer hover:bg-[#2196F3]/5 transition-colors"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <UploadCloud className="h-12 w-12 text-[#2196F3]" />
            <p className="text-lg font-medium text-[#111827]">Drag and drop your documents here</p>
            <p className="text-[#4B5563]">or</p>
            <label className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#2196F3]/90 cursor-pointer transition-colors">
              Browse Files
              <input
                type="file"
                className="hidden"
                onChange={handleFileInput}
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>
            <p className="text-[#4B5563]">or</p>
            <button
              onClick={activateCamera}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer transition-colors flex items-center space-x-2"
            >
              <Camera className="h-5 w-5" />
              <span>Take Photo</span>
            </button>
            <p className="text-sm text-[#4B5563] mt-2">Supports: JPG, PNG, SVG (Max 10MB)</p>
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-[#111827]">
                {selectedFile?.name || (capturedImageSrc ? 'Captured Image' : 'Document')}
              </h2>
              {selectedFile && (
                <p className="text-sm text-[#4B5563]">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type}
                </p>
              )}
            </div>
            <button
              onClick={removeFile}
              className="p-1 rounded-full hover:bg-gray-100 text-[#4B5563]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isCameraActive && (
            <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-auto"
                videoConstraints={{
                  facingMode: 'environment',
                }}
              />
              <div className="flex justify-center p-4">
                <button
                  onClick={capturePhoto}
                  className="px-6 py-3 bg-[#2196F3] text-white rounded-lg hover:bg-[#2196F3]/90 transition-colors flex items-center space-x-2"
                >
                  <Camera className="h-5 w-5" />
                  <span>Capture Photo</span>
                </button>
              </div>
            </div>
          )}

          {capturedImageSrc && !isCameraActive && (
            <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
              <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={onCropComplete} aspect={undefined}>
                <img ref={imgRef} src={capturedImageSrc} onLoad={onImageLoad} alt="Captured for cropping" className="w-full h-auto max-h-96 object-contain mx-auto" />
              </ReactCrop>
            </div>
          )}

          {previewUrl && !capturedImageSrc && (
            <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt="Document preview"
                className="w-full h-auto max-h-96 object-contain mx-auto"
              />
            </div>
          )}

          {!previewUrl && !capturedImageSrc && !isCameraActive && (
            <div className="mb-6 border border-gray-200 rounded-lg p-12 bg-gray-50 flex items-center justify-center">
              <FileText className="h-16 w-16 text-[#4B5563]" />
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={removeFile}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-[#111827] hover:bg-gray-50 transition-colors"
            >
              Upload Another
            </button>
            <button
  onClick={handleProcessImage}
  className="flex-1 py-3 px-4 bg-[#2196F3] text-white rounded-lg hover:bg-[#2196F3]/90 transition-colors flex items-center justify-center space-x-2"
  // Corrected disabled prop
  disabled={buttonDisabled || (!!capturedImageSrc && !completedCrop)}
>
  <Scan className="h-5 w-5" />
  <span>{buttonText}</span>
</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Digitalise;
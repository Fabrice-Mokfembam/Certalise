import React, { useState, useCallback } from 'react';
import { UploadCloud, X, Scan, FileText } from 'lucide-react';

const Digitalise: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="max-w-3xl mx-auto  p-6">
  
      
      {!selectedFile ? (
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
            <p className="text-sm text-[#4B5563] mt-2">Supports: JPG, PNG, PDF, DOC (Max 10MB)</p>
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-[#111827]">{selectedFile.name}</h2>
              <p className="text-sm text-[#4B5563]">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type}
              </p>
            </div>
            <button 
              onClick={removeFile}
              className="p-1 rounded-full hover:bg-gray-100 text-[#4B5563]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {previewUrl ? (
            <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
              <img 
                src={previewUrl} 
                alt="Document preview" 
                className="w-full h-auto max-h-96 object-contain mx-auto"
              />
            </div>
          ) : (
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
              className="flex-1 py-3 px-4 bg-[#2196F3] text-white rounded-lg hover:bg-[#2196F3]/90 transition-colors flex items-center justify-center space-x-2"
            >
              <Scan className="h-5 w-5" />
              <span>Continue to Scan</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Digitalise;
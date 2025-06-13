import { apiClient } from '../../../services/apiClient';
import type { FormData } from '../pages';



export const createCertificate = async (data: FormData) => {
  const response = await apiClient.post('/certificates', data);
  return response.data;
};

export const getCertificates = async () => {
  const response = await apiClient.get('/certificates');
  return response.data;
};

export const getCertificate = async (certificateNumber: string) => {
  const response = await apiClient.get(`/certificates/${certificateNumber}`);
  return response.data;
};

export const updateCertificate = async (certificateNumber: string, data: Partial<FormData>) => {
  const response = await apiClient.patch(`/certificates/${certificateNumber}`, data);
  return response.data;
};

export const deleteCertificate = async (certificateNumber: string) => {
  const response = await apiClient.delete(`/certificates/${certificateNumber}`);
  return response.data;
};

export const generateCertificatePDF = async (certificate: FormData) => {
  const response = await apiClient.post(`/pdf/generate`, certificate, {
    responseType: 'blob'
  });
  return response.data;
};


// New: Process birth certificate image
export const processCertificateImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await apiClient.post(
    '/certificates/process-image',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return response.data.data; // Return the extracted key-value pairs
};
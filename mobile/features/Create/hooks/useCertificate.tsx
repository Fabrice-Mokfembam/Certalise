import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  createCertificate, 
  getCertificates, 
  getCertificate, 
  updateCertificate, 
  deleteCertificate,
  generateCertificatePDF,
  processCertificateImage
} from '../api/';
import { FormData } from '@/data';



export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: getCertificates
  });
};

export const useCertificate = (certificateNumber: string) => {
  return useQuery({
    queryKey: ['certificate', certificateNumber],
    queryFn: () => getCertificate(certificateNumber),
    enabled: !!certificateNumber
  });
};

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (certificate:FormData)=> createCertificate(certificate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      queryClient.invalidateQueries({ queryKey: ['auditLogs'] });
    }
  });
};

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ certificateNumber, data }: { certificateNumber: string; data: Partial<FormData> }) => 
      updateCertificate(certificateNumber, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      queryClient.invalidateQueries({ queryKey: ['certificate', variables.certificateNumber] });
      queryClient.invalidateQueries({ queryKey: ['auditLogs'] });
    }
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (certificateNumber:string)=> deleteCertificate(certificateNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      queryClient.invalidateQueries({ queryKey: ['auditLogs'] });
    }
  });
};


export const useGenerateCertificatePDF = () => {
  return useMutation({
    mutationFn: (certificate: FormData) => generateCertificatePDF(certificate),
   
  });
};

// New: Hook for processing certificate images
export const useProcessCertificateImage = () => {
  return useMutation({
    mutationFn: (file: File) => processCertificateImage(file),
  });
};
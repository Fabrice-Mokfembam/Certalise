import { useMutation } from "@tanstack/react-query";
import { uploadFileToCloudinary } from "../utils/imageUpload";

export const useUploadFileToCloudinary = () => {
    return useMutation({
      mutationFn: (file:File) => uploadFileToCloudinary(file),
      onSuccess: (data) => {
        console.log('File uploaded successfully via hook:', data);
      },
      onError: (error) => {
        console.error('File upload failed via hook:', error);
      },
    });
  };
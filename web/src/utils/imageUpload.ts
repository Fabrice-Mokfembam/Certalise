import axios from "axios";

const cloudName = 'dq4kicazx'
const uploadPreset = 'ArchiveDigital'

async function uploadFileToCloudinary(file:File) {
    const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);  
    formData.append('cloud_name', cloudName as string);
    try {
    
      const response = await axios.post(baseUrl, formData, {
     
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
       
      });

      console.log('Cloudinary Upload Response:', response);
      return response.data;
    } catch (error) {
      // Catch any errors that occur during the request.
      console.error('Error uploading file to Cloudinary:', error);
      throw error;
    }
  }



  // src/utils/cropImage.ts

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on canvas
    image.src = url;
  });

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function getCroppedImg(imageSrc: string, pixelCrop: CropArea): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context available');
  }

  // Set canvas size to the cropped area dimensions
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the image onto the canvas, cropping it to the pixelCrop area
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0, // x-coordinate of the top-left corner of the destination rectangle
    0, // y-coordinate of the top-left corner of the destination rectangle
    pixelCrop.width, // width of the destination rectangle
    pixelCrop.height // height of the destination rectangle
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas is empty'));
      }
    }, 'image/png'); // You can change the output format if needed
  });
}

  export {uploadFileToCloudinary}



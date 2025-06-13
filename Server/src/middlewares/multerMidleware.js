import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configure multer for image uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueSuffix);
    }
  }),
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|bmp|tiff?/i;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error(`Only image files are allowed (${filetypes})`));
  },
  limits: { 
    fileSize: 10 * 1024 * 1024, // Increased to 10MB
    files: 1 // Limit to single file upload
  }
});

export default upload;
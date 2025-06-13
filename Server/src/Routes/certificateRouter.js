import express from 'express';
import {
  createCertificate,
  getAllCertificates,
  getCertificate,
  updateCertificate,
  deleteCertificate,
  processImage
} from '../controllers/certificateController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMidleware.js';


const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// CRUD Routes using certificateNumber
router.post('/', createCertificate);
router.get('/', getAllCertificates);
router.get('/:certificateNumber', getCertificate);
router.patch('/:certificateNumber', updateCertificate);
router.delete('/:certificateNumber', deleteCertificate);
// Image processing route
router.post('/process-image', upload.single('image'), processImage);

export {router};
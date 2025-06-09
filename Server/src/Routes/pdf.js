import express from 'express'
const router = express.Router();
import { generatePDF }  from '../controllers/pdfController.js'

router.post('/generate', generatePDF);

export {router}
import { Certificate } from '../models/CertificateModel.js';
import { AuditLog } from '../models/AuditLogModel.js'; // Import AuditLog model
import mongoose from 'mongoose';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

// Create a new certificate
export const createCertificate = async (req, res) => {
  try {
    const certificate = new Certificate({
      ...req.body,
    });
    await certificate.save();

    // Create audit log
    const auditLog = new AuditLog({
      action: 'Document Created',
      documentID: certificate.certificateNumber,
      user: req.user.username, // From authMiddleware
      status: 'Completed'
    });
    await auditLog.save();

    res.status(201).json(certificate);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Certificate number already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Get all certificates
export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single certificate by certificateNumber
export const getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ 
      certificateNumber: req.params.certificateNumber 
    }).populate('createdBy', 'username email');
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update certificate by certificateNumber (using PATCH)
export const updateCertificate = async (req, res) => {
  try {
    const { certificateNumber } = req.params;
    const updateData = req.body;

    // Remove certificateNumber from update data if present
    if (updateData.certificateNumber) {
      delete updateData.certificateNumber;
    }

    const certificate = await Certificate.findOneAndUpdate(
      { certificateNumber },
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username email');
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Create audit log
    const auditLog = new AuditLog({
      action: 'Document Edited',
      documentID: certificate.certificateNumber,
      user: req.user.username, // From authMiddleware
      status: 'Completed'

    });
    await auditLog.save();

    res.json(certificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 
 
// Delete certificate by certificateNumber
export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOneAndDelete({ 
      certificateNumber: req.params.certificateNumber 
    });
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Create audit log
    const auditLog = new AuditLog({
      action: 'Document Deleted',
      documentID: certificate.certificateNumber,
      user: req.user.username, // From authMiddleware
      status: 'Completed'
    });
    await auditLog.save();

    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Process birth certificate image (new function)
export const processImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  try {
    // Prepare form data for Python API
    const formData = new FormData();
    formData.append('image', fs.createReadStream(req.file.path));

    // Send request to Python model
    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:5001';
    const response = await axios.post(`${pythonApiUrl}/process-image`, formData, {
      headers: formData.getHeaders(), // Use form-data headers
    });

    // Return extracted data to frontend
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error('Error processing image:', error.message);
    res.status(500).json({ error: 'Error processing image' });
  } finally {
    // Clean up uploaded file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};
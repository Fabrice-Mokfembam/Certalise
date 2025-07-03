import { Certificate } from '../models/CertificateModel.js';
import { AuditLog } from '../models/AuditLogModel.js'; // Import AuditLog model
import mongoose from 'mongoose';
import fs from 'fs'; // Still needed for unlinkSync
// import axios from 'axios'; // No longer needed for Python API call
// import FormData from 'form-data'; // No longer needed for Python API call

// NEW: Import Google Generative AI
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// --- Gemini API Setup ---
// Retrieve GEMINI_API_KEY from environment variables
const GEMINI_API_KEY = "AIzaSyD1jgPOzuua1jh8oANTEQs6PbbetFVCk5Q";

// Log an error if the API key is not set (crucial for debugging)
if (!GEMINI_API_KEY) {
  console.error("ERROR: GEMINI_API_KEY environment variable is not set. Please ensure it's loaded.");
  // In a production application, you might want to throw an error or exit here.
}

// Initialize the Google Generative AI client with the API key
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Get the generative model instance, specifying the 'gemini-pro-vision' model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Use the vision model for multimodal input (text + images)
  generationConfig: {
    temperature: 0.2,       // Lower temperature for more focused and deterministic output (good for data extraction)
    topP: 1,                // Top P and Top K are sampling parameters
    topK: 32,
    maxOutputTokens: 4096,  // Maximum number of tokens the model will generate (ample for JSON)
  },
  safetySettings: [       // Configure safety settings to block potentially harmful content
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

/**
 * Converts a local file path into a Generative AI compatible part with inline data (base64 encoded).
 * @param {string} filePath - The path to the image file.
 * @param {string} mimeType - The MIME type of the image (e.g., 'image/png', 'image/jpeg').
 * @returns {Promise<Object>} An object formatted for Gemini API's inlineData.
 */
async function fileToGenerativePart(filePath, mimeType) {
  // Read the file asynchronously and encode its content to base64
  const fileData = await fs.promises.readFile(filePath, { encoding: 'base64' });
  return {
    inlineData: {
      data: fileData, // Base64 encoded image data
      mimeType        // MIME type of the image
    },
  };
}

// --- End Gemini API Setup --- 


// Create a new certificate document in the database
// Create a new certificate document in the database
export const createCertificate = async (req, res) => {
  try {
    // Get the certificate number from the request body
    let certificateNumber = req.body.certificateNumber;

    // Clean the certificate number: remove all slashes
    if (certificateNumber) {
      certificateNumber = certificateNumber.toString().replace(/\//g, '');
    }

    // Create a new Certificate instance using data from the request body
    // Ensure you're updating the certificateNumber field with the cleaned version
    const certificate = new Certificate({
      ...req.body,
      certificateNumber: certificateNumber, // Use the cleaned certificateNumber
    });

    // Save the new certificate to the database
    await certificate.save();

    // Create an audit log entry for the document creation
    const auditLog = new AuditLog({
      action: 'Document Created',
      documentID: certificate.certificateNumber, // Use the saved certificate's number (which is now cleaned)
      user: req.user.username,
      status: 'Completed'
    });
    // Save the audit log
    await auditLog.save();

    // Respond with the newly created certificate and a 201 Created status
    res.status(201).json(certificate);
  } catch (error) {
    // Handle duplicate key error (e.g., certificateNumber already exists)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Certificate number already exists' });
    }
    // Handle other errors
    res.status(400).json({ message: error.message });
  }
};

// Get all certificates from the database
export const getAllCertificates = async (req, res) => {
  try {
    // Find all certificates in the database
    const certificates = await Certificate.find();
    // Respond with the array of certificates
    res.json(certificates);
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

// Get a single certificate by its certificateNumber
export const getCertificate = async (req, res) => {
  try {
    // Find a single certificate by its certificateNumber from request parameters
    const certificate = await Certificate.findOne({
      certificateNumber: req.params.certificateNumber
    }).populate('createdBy', 'username email'); // Populate related user info

    // If no certificate is found, return a 404 Not Found error
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    // Respond with the found certificate
    res.json(certificate);
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

// Update an existing certificate by its certificateNumber
export const updateCertificate = async (req, res) => {
  try {
    const { certificateNumber } = req.params; // Get certificate number from URL
    const updateData = req.body;               // Get update data from request body

    // Prevent updating the certificateNumber itself
    if (updateData.certificateNumber) {
      delete updateData.certificateNumber;
    }

    // Find and update the certificate, returning the new document
    const certificate = await Certificate.findOneAndUpdate(
      { certificateNumber }, // Query by certificateNumber
      updateData,            // Data to update
      { new: true, runValidators: true } // Return the updated document; run schema validators
    ).populate('createdBy', 'username email'); // Populate related user info

    // If no certificate is found, return a 404 Not Found error
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Create an audit log entry for the document update
    const auditLog = new AuditLog({
      action: 'Document Edited',
      documentID: certificate.certificateNumber,
      user: req.user.username,
      status: 'Completed'
    });
    // Save the audit log
    await auditLog.save();

    // Respond with the updated certificate
    res.json(certificate);
  } catch (error) {
    // Handle validation or other update errors
    res.status(400).json({ message: error.message });
  }
};

// Delete a certificate by its certificateNumber
export const deleteCertificate = async (req, res) => {
  try {
    // Find and delete the certificate
    const certificate = await Certificate.findOneAndDelete({
      certificateNumber: req.params.certificateNumber
    });

    // If no certificate is found, return a 404 Not Found error
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Create an audit log entry for the document deletion
    const auditLog = new AuditLog({
      action: 'Document Deleted',
      documentID: certificate.certificateNumber,
      user: req.user.username,
      status: 'Completed'
    });
    // Save the audit log
    await auditLog.save();

    // Respond with a success message
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};


// Process an uploaded image using Google Gemini Pro Vision API to extract structured data
export const processImage = async (req, res) => {
  // Check if a file was uploaded by multer
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded. Please provide an image file.' });
  }

  try {
    const imagePath = req.file.path;       // Path to the temporary uploaded image file
    const mimeType = req.file.mimetype;     // MIME type of the uploaded image

    // Prepare the image data for the Gemini API by converting it to base64
    const imagePart = await fileToGenerativePart(imagePath, mimeType);

    const systemPrompt = `You are a highly accurate data extraction specialist for birth certificates.
    Your task is to meticulously extract all relevant information from the provided birth certificate image.
    Return the extracted data in a JSON format.
    Ensure all dates are parsed in 'DD/MM/YYYY' format.
    Ensure names are capitalized correctly.
    If a field is not found, omit it from the JSON or set its value to null.`;

// Define the user prompt, asking for specific birth certificate fields in JSON
const userPrompt = `Extract the following information from the birth certificate:
  - child:
      - surname: (Nom de L'enfant / Surname of child)
      - givenNames: (Prénoms de L'enfant / Given name of child)
      - birthDate: (Né le - Born on the)
      - birthPlace: (A - at)
      - sex: (De sexe / Sex)
  - father:
      - fullName: (De - of, for father)
      - birthPlace: (Né(e) a - Born at, for father)
      - birthDate: (Le - On the, for father)
      - residence: (Domicilié a - Resident at, for father)
      - profession: (Profession - Occupation, for father)
      - nationality: (Nationalité - Nationality, for father)
  - mother:
      - fullName: (De - of, for mother)
      - birthPlace: (Né(e) a - Born at, for mother)
      - birthDate: (Le - On the, for mother)
      - residence: (Domicilié a - Resident at, for mother)
      - profession: (Profession - Occupation, for mother)
      - nationality: (Nationalité - Nationality, for mother)
  - referenceDocument: (Document de référence - Reference document)
  - referenceDocumentDate: (Et de - And of, for reference document date)
  - drawnUpDate: (Dressé le - Drawn up on)
  - declarationOf: (Sur la déclaration de - in accordance with the declaration of)
  - attestedBy: (Lesquels ont certifié la sincérité de la présente déclaration / Who attested to the truth of this declaration)
  - civilStatusRegistrar:
      - name: (Par Nous, By Us)
      - role: (d’état civil - Civil Status Registrar)
  - civilStatusSecretary:
      - name: (Assisté de - In the presence of)
      - role: (d’état civil - Civil Status Secretary)
  - finalRegistrationDate: (Le - on the, final date)
  "certificateNumber": "(N° / Acte de Naissance N°)"
  Return the data as a JSON object.`;

    // Make the call to the Gemini Pro Vision model
    const result = await model.generateContent([
      systemPrompt, // Contextual prompt
      imagePart,    // The image data
      userPrompt    // Specific instruction/question
    ]);

    // Extract the text response from Gemini
    const responseText = result.response.text();

    let extractedData;
    try {
      // Attempt to find and parse JSON data that might be wrapped in markdown code blocks (```json...```)
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        // If wrapped, parse the content inside the markdown block
        extractedData = JSON.parse(jsonMatch[1]);
      } else {
        // If not wrapped in markdown, try direct parsing (less common but possible)
        extractedData = JSON.parse(responseText);
      }
    } catch (parseError) {
      // Log parsing errors for debugging
      console.error('Error parsing JSON from Gemini response:', parseError);
      console.error('Gemini Raw Response (might not be valid JSON):', responseText);
      // Return a client-friendly error
      return res.status(500).json({
        error: 'Failed to parse data from image (AI model did not return valid JSON).',
        rawGeminiResponse: responseText // Include raw response for debugging on frontend if needed
      });
    }

    // Respond with success and the extracted JSON data
    res.json({
      success: true,
      data: extractedData,
    });

  } catch (error) {
    // Catch any errors that occur during the process (e.g., API errors, file reading errors)
    console.error('Error processing image with Gemini:', error.message);
    // Log the full error object for more detailed debugging in development
    console.error(error);
    // Return a generic server error to the client
    res.status(500).json({ error: 'Error processing image with AI model. Please try again.' });
  } finally {
    // Crucially, clean up the temporary uploaded file after processing
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log(`Cleaned up uploaded file: ${req.file.path}`);
      } catch (cleanupError) {
        console.error(`Error cleaning up file ${req.file.path}:`, cleanupError.message);
      }
    }
  }
};
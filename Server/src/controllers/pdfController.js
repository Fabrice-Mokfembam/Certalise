import puppeteer from 'puppeteer'
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { BirthCertificatePreviewForm } from '../components/BirthCertificatePreviewForm.js';


const generatePDF = async (req, res) => {
  const formData = req.body;

  // Validate formData (basic validation, extend as needed)
  if (!formData || typeof formData !== 'object') {
    return res.status(400).json({ error: 'Invalid form data' });
  }

  // Default form data to prevent undefined errors
  const DEFAULT_FORM_DATA = {
    certificateNumber: '',
    surName: '[Child Name]',
    givenName: '[Given Names]',
    sex: '[Sex]',
    placeOfBirth: '[Place of Birth]',
    dob: '[YYYY-MM-DD]',
    fatherName: '[Father Name]',
    fatherPlaceOfBirth: '[Father Place of Birth]',
    fatherDob: '[YYYY-MM-DD]',
    fatherResidence: '[Father Residence]',
    fatherOccupation: '[Father Occupation]',
    fatherNationality: '[Father Nationality]',
    fatherReferenceDocument: '[Father Reference Document]',
    motherName: '[Mother Name]',
    motherPlaceOfBirth: '[Mother Place of Birth]',
    motherDob: '[YYYY-MM-DD]',
    motherResidence: '[Mother Residence]',
    motherOccupation: '[Mother Occupation]',
    motherNationality: '[Mother Nationality]',
    motherReferenceDocument: '[Mother Reference Document]',
    dateDrawn: '[YYYY-MM-DD]',
    declarant: '[Declarant]',
    officer: 'officer',
    secretary: 'sec',
  };

  // Merge provided formData with defaults
  const mergedFormData = { ...DEFAULT_FORM_DATA, ...formData };

  // Generate HTML with Tailwind CSS
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Birth Certificate</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      ${ReactDOMServer.renderToStaticMarkup(
        React.createElement(BirthCertificatePreviewForm, { formData: mergedFormData })
      )}
    </body>
    </html>
  `;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // For server environments
    });
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
    });

    // Set response headers to return PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=birth_certificate.pdf',
      'Content-Length': pdfBuffer.length,
    });

    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export { generatePDF };
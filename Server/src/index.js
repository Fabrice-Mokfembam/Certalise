import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { router as pdfRouter } from './Routes/pdf.js';
import { router as authRouter } from './Routes/authrouter.js';
import { router as profileRouter } from './Routes/profileRouter.js';
import { router as certificateRouter } from './Routes/certificateRouter.js';
import { router as auditLogRouter } from './Routes/auditLogRouter.js'; // Add audit log router
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200,
  message: 'Too many requests, please try again later!',
});
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/pdf', pdfRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/certificates', certificateRouter);
app.use('/api/audit-logs', auditLogRouter); // Add audit log routes

app.listen(5000, async () => {
  await connectDB(); 
  console.log('App running on port 5000');
});
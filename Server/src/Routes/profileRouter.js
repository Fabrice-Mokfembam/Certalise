import express from 'express';
import { getProfile, getProfileByUsername, updateProfile } from '../controllers/profileController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.use(authMiddleware);

// Get current user's profile
router.get('/me', getProfile);

// Get user profile by username
router.get('/username/:username', getProfileByUsername);

// Update profile
router.patch('/update', updateProfile);

export {router};
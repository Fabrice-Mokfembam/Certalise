import express from 'express';
import { signup, login, logout, refresh, getMe } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);
router.get('/me', authMiddleware, getMe);

export { router };
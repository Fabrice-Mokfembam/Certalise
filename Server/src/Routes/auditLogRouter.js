import express from 'express';
import { getAllAuditLogs, getAuditLogsByUser } from '../controllers/AuditLogcontroller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.use(authMiddleware);

// Audit Log Routes
router.get('/', getAllAuditLogs);
router.get('/user/:username', getAuditLogsByUser);

export { router };
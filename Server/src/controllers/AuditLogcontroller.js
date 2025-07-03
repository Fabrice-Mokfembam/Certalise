import { AuditLog } from '../models/AuditLogModel.js';

// Get all audit logs
export const getAllAuditLogs = async (req, res) => {
  try {
    const auditLogs = await AuditLog.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate('user', 'username email');
    res.json(auditLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

// Get audit logs by user
export const getAuditLogsByUser = async (req, res) => {
  try {
    const { username } = req.params;
    const auditLogs = await AuditLog.find({ user: username })
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate('user', 'username email');
    
    if (!auditLogs.length) {
      return res.status(404).json({ message: 'No audit logs found for this user' });
    }
    res.json(auditLogs); 
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
};
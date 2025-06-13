// models/AuditLog.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const auditLogSchema = new Schema({
  action: {
    type: String,
    required: true,
    enum: [
      'Document Created',
      'Document Edited',
      'Document Deleted',
      'User Created'
    ]
  },
  documentID: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Processing', 'Completed']
  }
}, {
  timestamps: true
});

export const AuditLog = model('AuditLog', auditLogSchema);



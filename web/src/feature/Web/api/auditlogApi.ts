import { apiClient } from '../../../services/apiClient';

export interface AuditLogEntry {
  action: 'Document Created' | 'Document Deleted' | 'Document Edited' | 'User Created';
  documentID: string;
  user: string;
  createdAt: Date; 
  status: 'Processing' | 'Completed';
}

export const getAuditLogs = async (): Promise<AuditLogEntry[]> => {
  const response = await apiClient.get('/audit-logs');
  return response.data;
};

export const getAuditLogsByUser = async (username: string): Promise<AuditLogEntry[]> => {
  const response = await apiClient.get(`/audit-logs/user/${username}`);
  return response.data;
};
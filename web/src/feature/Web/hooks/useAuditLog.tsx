import { useQuery } from '@tanstack/react-query';
import { getAuditLogs, getAuditLogsByUser } from '../api/auditlogApi';


export const useAuditLogs = () => {
  return useQuery({
    queryKey: ['auditLogs'],
    queryFn: getAuditLogs,
  });
};

export const useAuditLogsByUser = (username: string) => {
  return useQuery({
    queryKey: ['auditLogs', username],
    queryFn: () => getAuditLogsByUser(username),
    enabled: !!username,
  });
};
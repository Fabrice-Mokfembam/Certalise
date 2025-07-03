// app/(public)/(tabs)/index.tsx (or app/home/index.tsx if that's your structure)

import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,

} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

// Assuming these paths are correct relative to your mobile project structure



import { formatRelativeTime } from "@/utils/dateFormater";
import { useUser } from "@/hooks/useUser";
import { useAuditLogs } from "@/features/Audit/hooks/useAudit";
import { useCertificates } from "@/features/Create/hooks/useCertificate";
import { FormData } from "@/data";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Re-define AuditLogEntry if it's not globally available or comes from an API type
interface AuditLogEntry {
  action: 'Document Created' | 'Document Deleted' | 'Document Edited' | 'User Created';
  documentID: string;
  user: string;
  createdAt: string; // Change to string to match API response if it's a date string
  status: 'Processing' | 'Completed';
}

// Renamed from Dashboard to Home
export default function Home() {
  const router = useRouter();
  const { data: certificates = [], isLoading: isLoadingCertificates } = useCertificates();
  const { data: auditLogs = [], isLoading: isLoadingAuditLogs } = useAuditLogs();
  const { authUser:user, accessToken } = useUser();
  




  useEffect(() => {
   console.log('access',accessToken)
    console.log('Certificates:', certificates);
    console.log('Audit Logs:', auditLogs);
   
  }, [certificates, auditLogs,accessToken]);

  const isLoading = isLoadingCertificates || isLoadingAuditLogs;

  const filterCertificatesWithImageUrl = (certs: FormData[]): FormData[] => {
    return certs.filter(cert => cert.imageUrl && cert.imageUrl.length > 0);
  };

  const htrProcessedCertificates = filterCertificatesWithImageUrl(certificates);

  const recentAuditLogs = auditLogs.slice(0, 4);
  const recentCertificates = certificates.slice(0, 4);

  const getActionIcon = (action: AuditLogEntry['action'], size: number = 18) => {
    switch (action) {
      case 'Document Created': return <Feather name="file-plus" size={size} color="#4CAF50" />;
      case 'Document Deleted': return <Feather name="file-minus" size={size} color="#F44336" />;
      case 'Document Edited': return <Feather name="edit" size={size} color="#2196F3" />;
      case 'User Created': return <Feather name="user-plus" size={size} color="#9C27B0" />;
      default: return <Feather name="file-plus" size={size} color="#4CAF50" />;
    }
  };

  const getActionColor = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'Document Created': return 'text-green-500';
      case 'Document Deleted': return 'text-red-500';
      case 'Document Edited': return 'text-blue-500';
      case 'User Created': return 'text-purple-500';
      default: return 'text-green-500';
    }
  };

  const stats = [
    {
      title: "Total Documents",
      value: isLoading ? '...' : `${certificates?.length}`,
      change: "+12%",
      icon: <Feather name='file-text' size={20} color="#2196F3" />,
      iconBg: 'bg-[#2196F3]/10'
    },
    {
      title: "HTR Processed",
      value: isLoading ? '...' : `${htrProcessedCertificates.length}`,
      change: "+3",
      icon: <Feather name='clock' size={20} color="#2196F3" />,
      iconBg: 'bg-[#2196F3]/10'
    },
    {
      title: "HTR CER",
      value: "4%",
      change: "",
      icon: <Feather name='check-circle' size={20} color="#2196F3" />,
      iconBg: 'bg-[#2196F3]/10'
    },
    {
      title: "HTR WER",
      value: "10%",
      change: " ",
      icon: <Feather name='search' size={20} color="#2196F3" />,
      iconBg: 'bg-[#2196F3]/10'
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className='flex-row items-center justify-between mb-6'>
          <Text className='text-2xl font-bold text-[#111827]'>
            Dashboard Overview
          </Text>
          <TouchableOpacity onPress={() => user?.username && router.push(`/profile/${user.username}`)}>
            <Feather name="user" size={24} color="#2196F3" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        {isLoading ? (
          <View className="flex-row justify-center items-center py-8">
            <ActivityIndicator size="large" color="#2196F3" />
            <Text className="ml-2 text-gray-600">Loading data...</Text>
          </View>
        ) : (
          <View className='flex-row flex-wrap justify-between gap-y-4 mb-6'>
            {stats.map((stat, index) => (
              <View
                key={index}
                className='bg-white rounded-xl p-4 w-[48%] shadow-sm border border-gray-100'
              >
                <View className='flex-row items-center justify-between'>
                  <View className='flex-1 space-y-1'>
                    <Text className='text-sm font-medium text-[#4B5563]'>
                      {stat.title}
                    </Text>
                    <Text className='text-2xl font-bold text-[#111827]'>
                      {stat.value}
                    </Text>
                    {stat.change && (
                      <View
                        className={`flex-row items-center ${
                          stat.change.startsWith("+")
                            ? "text-green-500"
                            : "text-blue-500"
                        }`}
                      >
                        <Feather name='arrow-up-right' size={12} color={stat.change.startsWith("+") ? "green" : "blue"} />
                        <Text className="text-xs ml-1">
                          {stat.change} from yesterday
                        </Text>
                      </View>
                    )}
                  </View>
                  <View className={`p-2 rounded-lg ${stat.iconBg} items-center justify-center`}>
                    {stat.icon}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Recent Activity Section */}
        <View className='bg-white rounded-xl shadow-sm border border-gray-100 mb-6'>
          <View className='p-4 border-b border-gray-200'>
            <Text className='font-medium text-[#111827]'>Recent Activity</Text>
          </View>
          {isLoading ? (
            <View className="flex-row justify-center items-center py-4">
              <ActivityIndicator size="small" color="#2196F3" />
              <Text className="ml-2 text-gray-600">Loading activity...</Text>
            </View>
          ) : (
            <FlatList
              data={recentAuditLogs}
              keyExtractor={(item, index) => `audit-${item.documentID}-${index}`}
              scrollEnabled={false}
              renderItem={({ item: log }) => (
                <View className='p-4 border-b border-gray-200 last:border-b-0'>
                  <View className='flex-row items-center justify-between mb-1'>
                    <View className='flex-row items-center'>
                      {getActionIcon(log.action, 18)}
                      <Text className={`font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </Text>
                    </View>
                    <Text className='text-xs text-gray-500'>
                      {formatRelativeTime(new Date(log.createdAt))}
                    </Text>
                  </View>
                  <Text className='text-sm text-gray-600'>
                    Document ID: {log.documentID}
                  </Text>
                  <Text className='text-xs text-gray-500'>
                    User: {log.user}
                  </Text>
                  <View className='mt-2'>
                    <Text className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      log.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {log.status}
                    </Text>
                  </View>
                </View>
              )}
            />
          )}
          <TouchableOpacity className='px-5 py-3 border-t border-gray-200 items-center'
            onPress={() => router.push('/audit')}
          >
            <Text className='text-sm font-medium text-[#2196F3]'>
              View all activity
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Documents Section */}
        <View className='bg-white rounded-xl shadow-sm border border-gray-100'>
          <View className='p-4 border-b border-gray-200'>
            <Text className='font-medium text-[#111827]'>Recent Documents</Text>
          </View>
          {isLoading ? (
            <View className="flex-row justify-center items-center py-4">
              <ActivityIndicator size="small" color="#2196F3" />
              <Text className="ml-2 text-gray-600">Loading documents...</Text>
            </View>
          ) : (
            <FlatList
              data={recentCertificates}
              keyExtractor={(item) => item.certificateNumber}
              scrollEnabled={false}
              renderItem={({ item: cert }) => (
                <TouchableOpacity
                  key={cert.certificateNumber}
                  className='p-4 border-b border-gray-200 last:border-b-0'
                  onPress={() => router.push(`/certificate/${cert.certificateNumber}`)}
                >
                  <View className='flex-row items-start space-x-3'>
                    <View className='p-2 rounded-lg bg-[#2196F3]/10 items-center justify-center'>
                      <Feather name='file-text' size={20} color="#2196F3" />
                    </View>
                    <View className='flex-1 min-w-0'>
                      <Text className='text-sm font-medium text-[#111827] truncate'>
                        Birth Certificate #{cert.certificateNumber}
                      </Text>
                      <Text className='text-xs text-[#4B5563]'>
                        Certificate • {formatRelativeTime(new Date(cert.createdAt))}
                      </Text>
                    </View>
                    <View>
                      <Text
                        className={`px-2 py-1 text-xs rounded-full bg-green-100 text-green-800`}
                      >Completed</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
          <TouchableOpacity className='px-5 py-3 border-t border-gray-200 items-center'
            onPress={() => router.push('/list')}
          >
            <Text className='text-sm font-medium text-[#2196F3]'>
              View all documents
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
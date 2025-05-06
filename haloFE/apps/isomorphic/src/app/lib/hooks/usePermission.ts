import { useState } from 'react';
import * as api from '@/app/lib/api/permissions';
import toast from 'react-hot-toast';

type ApiResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const usePermission = () => {
  const [loading, setLoading] = useState(false);

  const createPermission = async (payload: any): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.createPermission(payload);
      toast.success('Permission created successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to create permission');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getPermissions = async (
    query?: Record<string, any>
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getPermissions(query);
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch permissions');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getPermission = async (
    permissionName: string
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getPermission(permissionName);
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch permission');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const updatePermission = async (
    permissionName: string,
    payload: any
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.updatePermission(permissionName, payload);
      toast.success('Permission updated successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to update permission');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const deletePermission = async (
    permissionName: string
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      await api.deletePermission(permissionName);
      toast.success('Permission deleted successfully');
      return { success: true };
    } catch (err: any) {
      toast.error('Failed to delete permission');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const bulkCreatePermissions = async (
    payload: any[]
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.bulkCreatePermissions(payload);
      toast.success('Bulk permission creation successful');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to create permissions in bulk');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createPermission,
    getPermissions,
    getPermission,
    updatePermission,
    deletePermission,
    bulkCreatePermissions,
  };
};

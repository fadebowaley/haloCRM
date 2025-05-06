import { useState } from 'react';
import * as api from '@/app/lib/api/roles';
import toast from 'react-hot-toast';

type ApiResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const useRole = () => {
  const [loading, setLoading] = useState(false);

  const createRole = async (payload: any): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.createRole(payload);
      toast.success('Role created successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to create role');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getRoles = async (): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getRoles();
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch roles');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getRoleById = async (roleId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getRoleById(roleId);
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch role details');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (
    roleId: string,
    payload: any
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.updateRole(roleId, payload);
      toast.success('Role updated successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to update role');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteRole = async (roleId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      await api.deleteRole(roleId);
      toast.success('Role deleted successfully');
      return { success: true };
    } catch (err: any) {
      toast.error('Failed to delete role');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteAllRoles = async (): Promise<ApiResponse> => {
    setLoading(true);
    try {
      await api.deleteAllRoles();
      toast.success('All roles deleted');
      return { success: true };
    } catch (err: any) {
      toast.error('Failed to delete all roles');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const bulkCreateRoles = async (payload: any[]): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.bulkCreateRoles(payload);
      toast.success('Bulk roles created successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Bulk role creation failed');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getRoleTemplates = async (): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getRoleTemplates();
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch role templates');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getRolePermissions = async (roleId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getRolePermissions(roleId);
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch role permissions');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const assignRolePermissions = async (
    roleId: string,
    payload: any
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.assignRolePermissions(roleId, payload);
      toast.success('Permissions assigned successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to assign permissions');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole,
    deleteAllRoles,
    bulkCreateRoles,
    getRoleTemplates,
    getRolePermissions,
    assignRolePermissions,
  };
};

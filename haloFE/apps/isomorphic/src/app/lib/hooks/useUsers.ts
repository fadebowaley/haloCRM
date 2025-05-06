import { useState } from 'react';
import * as api from '@/app/lib/api/users';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

type ApiResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const createUser = async (payload: any): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const { data } = await api.createUser(payload);
      toast.success('User created successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error creating user');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async (
    query?: Record<string, any>
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getUsers(query, accessToken);
      console.log('data:::', data);

      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch users');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (userId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const { data } = await api.getUser(userId);
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch user');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (
    userId: string,
    payload: any
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const { data } = await api.updateUser(userId, payload);
      toast.success('User updated successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to update user');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      await api.deleteUser(userId);
      toast.success('User deleted successfully');
      return { success: true };
    } catch (err: any) {
      toast.error('Failed to delete user');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const bulkCreateUsers = async (payload: any[]): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const { data } = await api.bulkCreateUsers(payload);
      toast.success('Bulk user creation successful');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to create users in bulk');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const restoreUser = async (userId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const { data } = await api.restoreUser(userId);
      toast.success('User restored successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to restore user');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const softDeleteUser = async (userId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const { data } = await api.softDeleteUser(userId);
      toast.success('User soft-deleted successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to soft-delete user');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    bulkCreateUsers,
    restoreUser,
    softDeleteUser,
  };
};

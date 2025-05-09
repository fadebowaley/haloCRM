import { useState, useCallback } from 'react';
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
  const token = session?.user?.accessToken;

  //Utility functions for Api Requests
  const apiRequest = useCallback(
    async (apiFunc: Function, params: any[] = []): Promise<ApiResponse> => {
      setLoading(true);
      try {
        const result = await apiFunc(...params, token);
        return { success: true, data: result };
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message || 'An error occurred';
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const getUsers = useCallback(
    async (query?: Record<string, any>): Promise<ApiResponse> => {
      return apiRequest(api.getUsers, [query]);
    },
    [apiRequest]
  );

  const createUser = useCallback(
    async (payload: any): Promise<ApiResponse> => {
      return apiRequest(api.createUser, [payload]);
    },
    [apiRequest]
  );

  const getUser = useCallback(
    async (userId: string): Promise<ApiResponse> => {
      return apiRequest(api.getUser, [userId]);
    },
    [apiRequest]
  );

  const updateUser = useCallback(
    async (userId: string, payload: any): Promise<ApiResponse> => {
      return apiRequest(
        api.updateUser,
        [userId, payload],
        'User updated successfully',
        'Failed to update user'
      );
    },
    [apiRequest]
  );

  const deleteUser = useCallback(
    async (userId: string): Promise<ApiResponse> => {
      console.log('look-up', userId);
      return apiRequest(api.deleteUser, [userId]);
    },
    [apiRequest]
  );

  const bulkCreateUsers = useCallback(
    async (payload: any[]): Promise<ApiResponse> => {
      return apiRequest(api.bulkCreateUsers, [payload]);
    },
    [apiRequest]
  );

  const restoreUser = useCallback(
    async (userId: string): Promise<ApiResponse> => {
      return apiRequest(api.restoreUser, [userId]);
    },
    [apiRequest]
  );

  const softDeleteUser = useCallback(
    async (userId: string): Promise<ApiResponse> => {
      return apiRequest(api.softDeleteUser, [userId]);
    },
    [apiRequest]
  );

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

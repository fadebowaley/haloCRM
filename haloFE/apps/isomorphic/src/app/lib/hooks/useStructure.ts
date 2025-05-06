import { useState } from 'react';
import * as api from '@/app/lib/api/structure';
import toast from 'react-hot-toast';

type ApiResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const useStructure = () => {
  const [loading, setLoading] = useState(false);

  const createStructure = async (payload: any): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.createStructure(payload);
      toast.success('Structure created successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to create structure');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getStructures = async (
    query?: Record<string, any>
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getStructures(query);
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch structures');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getStructure = async (structureId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getStructure(structureId);
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch structure');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const updateStructure = async (
    structureId: string,
    payload: any
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.updateStructure(structureId, payload);
      toast.success('Structure updated successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to update structure');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteStructure = async (structureId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      await api.deleteStructure(structureId);
      toast.success('Structure deleted successfully');
      return { success: true };
    } catch (err: any) {
      toast.error('Failed to delete structure');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createStructure,
    getStructures,
    getStructure,
    updateStructure,
    deleteStructure,
  };
};

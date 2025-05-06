import { useState } from 'react';
import * as api from '@/app/lib/api/level';
import toast from 'react-hot-toast';

type ApiResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const useLevel = () => {
  const [loading, setLoading] = useState(false);

  const createLevel = async (payload: any): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.createLevel(payload);
      toast.success('Level created successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to create level');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getLevels = async (
    query?: Record<string, any>
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getLevels(query);
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch levels');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getLevelById = async (levelId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getLevelById(levelId);
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch level');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const updateLevelById = async (
    levelId: string,
    payload: any
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.updateLevelById(levelId, payload);
      toast.success('Level updated successfully');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to update level');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteLevelById = async (levelId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      await api.deleteLevelById(levelId);
      toast.success('Level deleted successfully');
      return { success: true };
    } catch (err: any) {
      toast.error('Failed to delete level');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getLevelsByHierarchy = async (): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getLevelsByHierarchy();
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch hierarchy');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getParentLevel = async (levelId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getParentLevel(levelId);
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch parent level');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const getChildLevels = async (levelId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.getChildLevels(levelId);
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to fetch child levels');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const activateLevel = async (levelId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.activateLevel(levelId);
      toast.success('Level activated');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to activate level');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const deactivateLevel = async (levelId: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.deactivateLevel(levelId);
      toast.success('Level deactivated');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to deactivate level');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const moveLevelToParent = async (
    levelId: string,
    payload: any
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.moveLevelToParent(levelId, payload);
      toast.success('Level moved to new parent');
      return { success: true, data };
    } catch (err: any) {
      toast.error('Failed to move level');
      return { success: false, error: err?.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createLevel,
    getLevels,
    getLevelById,
    updateLevelById,
    deleteLevelById,
    getLevelsByHierarchy,
    getParentLevel,
    getChildLevels,
    activateLevel,
    deactivateLevel,
    moveLevelToParent,
  };
};

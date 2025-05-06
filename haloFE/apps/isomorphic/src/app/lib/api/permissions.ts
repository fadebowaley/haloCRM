import { api } from '../axios';

export const createPermission = async (payload: any) => {
  const { data } = await api.post('/permissions', payload);
  return data;
};

export const getPermissions = async (query?: Record<string, any>) => {
  const { data } = await api.get('/permissions', { params: query });
  return data;
};

export const getPermission = async (permissionName: string) => {
  const { data } = await api.get(`/permissions/${permissionName}`);
  return data;
};

export const updatePermission = async (
  permissionName: string,
  payload: any
) => {
  const { data } = await api.patch(`/permissions/${permissionName}`, payload);
  return data;
};

export const deletePermission = async (permissionName: string) => {
  const { data } = await api.delete(`/permissions/${permissionName}`);
  return data;
};

export const bulkCreatePermissions = async (payload: any[]) => {
  const { data } = await api.post('/permissions/bulk', payload);
  return data;
};

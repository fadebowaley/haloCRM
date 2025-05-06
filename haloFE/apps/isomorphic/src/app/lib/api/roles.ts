import { api } from '../axios';

// GET /templates
export const getRoleTemplates = async () => {
  const { data } = await api.get('/roles/templates');
  return data;
};

// POST /
export const createRole = async (payload: any) => {
  const { data } = await api.post('/roles', payload);
  return data;
};

// GET /
export const getRoles = async () => {
  const { data } = await api.get('/roles');
  return data;
};

// DELETE /
export const deleteAllRoles = async () => {
  const { data } = await api.delete('/roles');
  return data;
};

// POST /bulk
export const bulkCreateRoles = async (payload: any[]) => {
  const { data } = await api.post('/roles/bulk', payload);
  return data;
};

// GET /:roleId
export const getRoleById = async (roleId: string) => {
  const { data } = await api.get(`/roles/${roleId}`);
  return data;
};

// PATCH /:roleId
export const updateRole = async (roleId: string, payload: any) => {
  const { data } = await api.patch(`/roles/${roleId}`, payload);
  return data;
};

// DELETE /:roleId
export const deleteRole = async (roleId: string) => {
  const { data } = await api.delete(`/roles/${roleId}`);
  return data;
};

// GET /:roleId/permissions
export const getRolePermissions = async (roleId: string) => {
  const { data } = await api.get(`/roles/${roleId}/permissions`);
  return data;
};

// PATCH /:roleId/permissions
export const assignRolePermissions = async (roleId: string, payload: any) => {
  const { data } = await api.patch(`/roles/${roleId}/permissions`, payload);
  return data;
};

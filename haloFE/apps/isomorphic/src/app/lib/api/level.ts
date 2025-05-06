import { api } from '../axios';

// POST /
export const createLevel = async (payload: any) => {
  const { data } = await api.post('/levels', payload);
  return data;
};

// GET /
export const getLevels = async (params?: any) => {
  const { data } = await api.get('/levels', { params });
  return data;
};

// GET /:levelId
export const getLevelById = async (levelId: string) => {
  const { data } = await api.get(`/levels/${levelId}`);
  return data;
};

// PATCH /:levelId
export const updateLevelById = async (levelId: string, payload: any) => {
  const { data } = await api.patch(`/levels/${levelId}`, payload);
  return data;
};

// DELETE /:levelId
export const deleteLevelById = async (levelId: string) => {
  const { data } = await api.delete(`/levels/${levelId}`);
  return data;
};

// GET /hierarchy
export const getLevelsByHierarchy = async () => {
  const { data } = await api.get('/levels/hierarchy');
  return data;
};

// GET /:levelId/parent
export const getParentLevel = async (levelId: string) => {
  const { data } = await api.get(`/levels/${levelId}/parent`);
  return data;
};

// GET /:levelId/children
export const getChildLevels = async (levelId: string) => {
  const { data } = await api.get(`/levels/${levelId}/children`);
  return data;
};

// PATCH /:levelId/activate
export const activateLevel = async (levelId: string) => {
  const { data } = await api.patch(`/levels/${levelId}/activate`);
  return data;
};

// PATCH /:levelId/deactivate
export const deactivateLevel = async (levelId: string) => {
  const { data } = await api.patch(`/levels/${levelId}/deactivate`);
  return data;
};

// PATCH /:levelId/move
export const moveLevelToParent = async (levelId: string, payload: any) => {
  const { data } = await api.patch(`/levels/${levelId}/move`, payload);
  return data;
};

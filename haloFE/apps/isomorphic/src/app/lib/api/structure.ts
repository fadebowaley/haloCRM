import { api } from '../axios';

// POST /
export const createStructure = async (payload: any) => {
  const { data } = await api.post('/structures', payload);
  return data;
};

// GET /
export const getStructures = async (query?: Record<string, any>) => {
  const { data } = await api.get('/structures', { params: query });
  return data;
};

// GET /:structureId
export const getStructure = async (structureId: string) => {
  const { data } = await api.get(`/structures/${structureId}`);
  return data;
};

// PATCH /:structureId
export const updateStructure = async (structureId: string, payload: any) => {
  const { data } = await api.patch(`/structures/${structureId}`, payload);
  return data;
};

// DELETE /:structureId
export const deleteStructure = async (structureId: string) => {
  const { data } = await api.delete(`/structures/${structureId}`);
  return data;
};

import { api } from '../axios';



// export const getUsers = async (query?: Record<string, any>) => {
//   const { data } = await api.get('/users', { params: query });
//   return data;
// };

export const getUsers = async (query?: Record<string, any>, token?: string) => {
  const options = {
    params: query,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
  const { data } = await api.get('/users', options);
  return data;
};


export const getUser = async (userId: string) => {
  const { data } = await api.get(`/users/${userId}`);
  return data;
};

export const createUser = async (payload: any) => {
  const { data } = await api.post('/users', payload);
  return data;
};

export const updateUser = async (
  userId: string,
  payload: Partial<{
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    isActive: boolean;
  }>
) => {
  const { data } = await api.patch(`/users/${userId}`, payload);
  return data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await api.delete(`/users/${userId}`);
  return data;
};

export const bulkCreateUsers = async (payload: any[]) => {
  const { data } = await api.post('/users/bulk-create', payload);
  return data;
};

export const restoreUser = async (userId: string) => {
  const { data } = await api.post(`/users/restore/${userId}`);
  return data;
};

export const softDeleteUser = async (userId: string) => {
  const { data } = await api.post(`/users/soft-delete/${userId}`);
  return data;
};

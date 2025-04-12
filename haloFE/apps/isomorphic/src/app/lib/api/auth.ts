import { api } from '../axios';


export const login = async (email: string, password: string) => {
  console.log('Attempting to log in with email:', email); // Debug log for email
  const { data } = await api.post('/auth/login', { email, password });
  console.log('Login response data:', data); // Debug log for response data
  return data;
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const forgotPassword = async (email: string) => {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const { data } = await api.post('/auth/reset-password', {
    token,
    password: newPassword,
  });
  return data;
};

export const verifyOtp = async (otp: string, email: string) => {
  const { data } = await api.post('/auth/verify-otp', { otp, email });
  return data;
};

import { api } from '../axios';

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};


export const register = async (payload: {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  isOwner: boolean;
  isAgreed: boolean;
}) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    return data;
  } catch (error: any) {
    console.error(
      'Register API Error:',
      error.message,
      error?.response?.data || error
    );
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
};


export const resetPassword = async (token: string, newPassword: string) => {
  const { data } = await api.post(`/auth/reset-password?token=${token}`, {
    password: newPassword,
  });
  return data;
};


export const verifyOtp = async (otp: string, email: string) => {
  const { data } = await api.post('/auth/verify-otp', { otp, email });
  return data;
};

export const resendOtp = async (email: string) => {
  const { data } = await api.post('/auth/resend-otp', { email });
  return data;
};



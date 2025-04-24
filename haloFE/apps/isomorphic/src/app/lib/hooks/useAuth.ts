import {
  useSession,
  signIn,
  signOut as nextAuthSignOut,
} from 'next-auth/react';
import * as api from '@/app/lib/api/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { routes } from '@/config/routes';
import { MdToken } from 'react-icons/md';

// ---------------------
// ✅ Payload Types
// ---------------------
type LoginPayload = {
  email: string;
  password: string;
  redirectTo?: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  isAgreed: boolean;
  isOwner: boolean;
};

type ApiResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

// ---------------------
// ✅ useAuth Hook
// ---------------------
export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ---------------------
  // 🔐 Login
  // ---------------------

const login = async ({
  email,
  password,
  redirectTo,
}: LoginPayload): Promise<ApiResponse> => {
  setLoading(true);
  try {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: redirectTo || '/',
    });

    // 🔒 Handle OTP not verified error
    if (result?.error?.includes('[OtpNotVerified]')) {
      router.push(`${routes.auth.otp2}?email=${encodeURIComponent(email)}`);
      toast.error('Please verify your OTP first');
      return { success: false };
    }

    // ✅ Login successful
    if (result?.ok && result?.url) {
      toast.success('Login successful!');
      router.push(result.url);
      return { success: true };
    }

    // ❌ Other failure (e.g., wrong password, no redirect)
    if (result?.error) {
      toast.error(result.error);
      return { success: false, error: result.error };
    }

    // 🛑 Unknown fallback
    toast.error('Login failed due to unknown error.');
    return { success: false };
  } catch (err: any) {
    console.error('Login error:', err);
    toast.error(err.message || 'Login failed');
    return { success: false, error: err.message || 'Login failed' };
  } finally {
    setLoading(false);
  }
};

  // ---------------------
  // 🚪 Logout
  // ---------------------
  const logout = () => {
    localStorage.removeItem('token');
    nextAuthSignOut({ redirect: false });
    toast.success('Logged out successfully');
  };

  // ---------------------
  // 🧾 Register
  // ---------------------

  // const register = async (payload: RegisterPayload): Promise<ApiResponse> => {
  //   setLoading(true);
  //   try {
  //     const data = await api.register(payload);
  //     toast.success('Registration successful,');
  //     // 🔁 Redirect to login after success
  //     router.push(routes.signIn);
  //     return { success: true, data };
  //   } catch (err: any) {
  //     console.error('Registration error:', err); // Debugging line
  //     toast.error(err?.response?.data?.message || 'Registration failed');
  //     return {
  //       success: false,
  //       error: err?.response?.data?.message || 'Registration failed',
  //     };
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const register = async (payload: RegisterPayload): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.register(payload);
      toast.success('Registration successful. Please verify your email.');

      // 🔁 Redirect to OTP verification page instead of login
      router.push(
        `${routes.auth.otp2}?email=${encodeURIComponent(payload.email)}`
      );

      return { success: true, data };
    } catch (err: any) {
      console.error('Registration error:', err);
      toast.error(err?.response?.data?.message || 'Registration failed');
      return {
        success: false,
        error: err?.response?.data?.message || 'Registration failed',
      };
    } finally {
      setLoading(false);
    }
  };

  // ---------------------
  // ❓ Forgot Password
  // ---------------------
  const forgotPassword = async (email: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.forgotPassword(email);
      //toast.success('Password reset link sent');
      return { success: true, data };
    } catch (err: any) {
      console.error('Forgot password error:', err);
      toast.error(
        err?.response?.data?.message || 'Error sending password reset link'
      );
      return {
        success: false,
        error:
          err?.response?.data?.message || 'Error sending password reset link',
      };
    } finally {
      setLoading(false);
    }
  };

  // ---------------------
  // 🔁 Reset Password
  // ---------------------
  const resetPassword = async (
    token: string,
    newPassword: string
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      console.log('were are about reseting password . . .', token);
      const data = await api.resetPassword(token, newPassword);
      toast.success('Password reset successful');
      console.log('our response from the server --- >', data);
      return { success: true, data };
    } catch (err: any) {
      console.error('Reset password error:', err);
      toast.error(err?.response?.data?.message || 'Error resetting password');
      return {
        success: false,
        error: err?.response?.data?.message || 'Error resetting password',
      };
    } finally {
      setLoading(false);
    }
  };

  // ---------------------
  // 🔐 OTP Verification
  // ---------------------
  const verifyOtp = async (
    otp: string,
    email: string
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.verifyOtp(otp, email);
      toast.success('OTP verification successful');
      return { success: true, data };
    } catch (err: any) {
      console.error('OTP verification error:', err);
      toast.error(err?.response?.data?.message || 'OTP verification failed');
      return {
        success: false,
        error: err?.response?.data?.message || 'OTP verification failed',
      };
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (email: string): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const data = await api.resendOtp(email);
      toast.success('OTP resent successfully');
      return { success: true, data };
    } catch (err: any) {
      console.error('Resend OTP error:', err);
      toast.error(err?.response?.data?.message || 'Failed to resend OTP');
      return {
        success: false,
        error: err?.response?.data?.message || 'Failed to resend OTP',
      };
    } finally {
      setLoading(false);
    }
  };
return {
  session,
  user: session?.user,
  isAuthenticated: status === 'authenticated',
  isLoading: status === 'loading' || loading,
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  verifyOtp,
  resendOtp,
};
};

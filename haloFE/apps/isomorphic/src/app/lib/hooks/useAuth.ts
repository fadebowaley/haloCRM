import { useSession, signIn, signOut as nextAuthSignOut } from 'next-auth/react';
import * as api from '@/app/lib/api/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';

// Define the LoginPayload type
type LoginPayload = {
  email: string;
  password: string;
  redirectTo?: string;
};

export const useAuth = () => {
  // Session handling from NextAuth
  const { data: session, status } = useSession();
  const router = useRouter();

  // Loading state for async actions (login, register, etc.)
  const [loading, setLoading] = useState(false);

  // Login function to authenticate user
  // const login = async ({ email, password, redirectTo }: LoginPayload) => {
  //   setLoading(true); // Set loading to true when the login process begins

  //   try {
  //     console.log('Attempting login for email:', email);
  //     // Call the login API
  //     const userData = await api.login(email, password);
  //     console.log('Login successful, received user data:', userData.tokens.access.token);
  //     // Store token in localStorage for authentication persistence
  //     localStorage.setItem('token', userData.userData.tokens.access.token);

  //     // Optionally redirect after login
  //     if (redirectTo) {
  //       router.push(redirectTo);
  //     }

  //     toast.success('Login successful!');
  //     return { success: true, data: userData };
  //   } catch (err: any) {
  //     console.error('Login error:', err);

  //     // Handle error and show feedback to user
  //     toast.error(err?.response?.data?.message || 'Login failed');
  //     return {
  //       success: false,
  //       error: err?.response?.data?.message || 'Login failed',
  //     };
  //   } finally {
  //     setLoading(false); // Reset loading state after API call
  //   }
  // };

  const login = async ({ email, password, redirectTo }: LoginPayload) => {
    setLoading(true);

    try {
      console.log('Attempting login for email:', email);
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: redirectTo || '/',
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success('Login successful!');

      if (result?.url) {
        router.push(result.url);
      }

      return { success: true };
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error(err.message || 'Login failed');

      return {
        success: false,
        error: err.message || 'Login failed',
      };
    } finally {
      setLoading(false);
    }
  };


  // Logout function to clear user session and token
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    nextAuthSignOut({ redirect: false }); // Sign out using NextAuth (if Google login was used)
    toast.success('Logged out successfully');
  };

  // Register function to handle user registration
  const register = async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      // Call the registration API
      const data = await api.register(payload);
      toast.success('Registration successful');
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

  // Forgot password function
  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      const result = await api.forgotPassword(email);
      toast.success('Password reset link sent');
      return { success: true, data: result };
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

  // Reset password function
  const resetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    try {
      const result = await api.resetPassword(token, newPassword);
      toast.success('Password reset successful');
      return { success: true, data: result };
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

  // OTP verification function
  const verifyOtp = async (otp: string, email: string) => {
    setLoading(true);
    try {
      const result = await api.verifyOtp(otp, email);
      toast.success('OTP verification successful');
      return { success: true, data: result };
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

  // Return all necessary data and functions from the useAuth hook
  return {
    session,
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading' || loading, // Combine both loading states (API + session)
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    verifyOtp,
  };
};

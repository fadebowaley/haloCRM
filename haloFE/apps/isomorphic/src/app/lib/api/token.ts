// lib/auth/tokenUtils.ts
import { api } from '../axios';

/**
 * Checks if a JWT token is expired.
 * @param token - The JWT token string.
 * @returns {boolean} - Returns true if the token is expired or invalid, false otherwise.
 */


export function checkExpiration(token: string): boolean {
  try {
    const [, payload] = token.split('.');
    // Parse the payload and extract the 'exp' property (expiration time)
    const { exp } = JSON.parse(atob(payload));
    return Date.now() >= exp * 1000;
  } catch {
    // If parsing fails, treat the token as expired
    return true;
  }
}

/**
 * Requests a new access token using a refresh token.
 * @param refreshToken - The refresh token string.
 * @returns {Promise<{ accessToken: string, refreshToken: string } | null>} - Returns the new tokens or null if failed.
 */


export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const { data } = await api.post('auth/refresh-tokens', {
      refreshToken,
    });
    console.log('data return', data )
    const { access, refresh } = data;
    return {
      accessToken: access.token,
      refreshToken: refresh.token,
    };
  } catch (error) {
    // Log the error and return null if the refresh fails
    console.error('Refresh token error:', error);
    return null;
  }
};

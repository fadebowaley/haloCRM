import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import { pagesOptions } from './pages-options';
import * as api from '@/app/lib/api/auth';
import { checkExpiration, refreshAccessToken } from '@lib/api/token';

export const authOptions: NextAuthOptions = {
  // debug: true,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.tokens?.access?.token;
        token.refreshToken = user.tokens?.refresh?.token;
      }

      // 🔁 Optional refresh logic
      const isExpired = checkExpiration(token.accessToken);

      if (isExpired && token.refreshToken) {
        console.info('planning to  refreshed token.....');

        console.log('Using refresh token:', token.refreshToken);

        const refreshed = await refreshAccessToken(token.refreshToken);
        if (refreshed) {
          console.info('Token is refreshed successfully.....');

          token.accessToken = refreshed.accessToken;
          token.refreshToken = refreshed.refreshToken ?? token.refreshToken;
        } else {
          console.warn('Failed to refresh access token. Keeping old token.');
          token = {
            name: null,
            email: null,
            picture: null,
            sub: null,
          };
        }
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.user?.id,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
      };
    },


    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      const callbackPath = parsedUrl.searchParams.get('callbackUrl');
      // Force homepage if callbackUrl is '/' or missing
      if (!callbackPath || callbackPath === '/' || callbackPath === '%2F') {
        return `${baseUrl}/`;
      }
      return `${baseUrl}${callbackPath}`;
    },
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Missing email or password');
          }

          const data = await api.login(credentials.email, credentials.password);

          if (!data?.tokens || !data?.user) {
            throw new Error('Invalid response from server');
          }

          return {
            id: data.user.id,
            email: data.user.email,
            name: `${data.user.firstname} ${data.user.lastname}`,
            tokens: data.tokens,
          };
        } catch (error: any) {
          console.error('Login failed in authorize():', error);

          const status = error?.response?.status;
          const message = error?.response?.data?.message || 'Login failed';

          // ✅ Custom error handling
          if (status === 401 && message.includes('OTP')) {
            throw new Error(`[OtpNotVerified] ${message}`);
          }

          // ❌ Wrong credentials
          if (status === 401) {
            throw new Error('Invalid email or password');
          }

          // 🔁 Default error
          throw new Error(message);
        }
      },
    }),

    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
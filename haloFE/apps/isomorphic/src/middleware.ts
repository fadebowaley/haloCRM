import { NextResponse } from 'next/server';
import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
import withAuth from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';


export default withAuth({
  pages: {
    ...pagesOptions,
  },
});


export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;
  const isExpired = token?.exp && Date.now() >= token.exp * 1000;
  const isProtectedRoute = !req.nextUrl.pathname.startsWith('/auth');

  if (!isAuth || isExpired) {
    if (isProtectedRoute) {
      const loginUrl = new URL(pagesOptions.signIn ?? '/auth/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/((?!api|_next|public).*)'],
};





// export const config = {
//   // restricted routes
//   matcher: [
//     '/',
//     '/executive',
//     '/financial',
//     '/analytics',
//     '/users/list',
//     '/users/team',
//     '/users/roles',
//     '/users/permissions',
//     '/users/structure',
//     '/users/level',
//     '/users/onboarding',
//     '/logistics/:path*',
//     '/ecommerce/:path*',
//     '/support/:path*',
//     '/file/:path*',
//     '/file-manager',
//     '/invoice/:path*',
//     '/forms/profile-settings/:path*',
//   ],
// };

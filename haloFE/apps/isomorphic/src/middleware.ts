import { NextResponse } from 'next/server';
import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
import withAuth from 'next-auth/middleware';

export default withAuth({
  pages: {
    ...pagesOptions,
  },
});



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

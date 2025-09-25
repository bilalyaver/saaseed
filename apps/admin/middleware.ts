import { NextRequest, NextResponse } from 'next/server';

const whiteListPaths = [
  '/auth/login'
];

// /status/{id} yolunu regex ile kontrol ediyoruz
const isWhitelistedPath = (pathname: string) => {
  return (
    whiteListPaths.includes(pathname) ||
    /^\/status\/[^/]+$/.test(pathname) ||
    pathname.startsWith('/public') ||
    /\.(css|js|png|jpg|jpeg|gif|svg|ico|json)$/.test(pathname)
  );
};

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const publicUrl = process.env.NEXT_PUBLIC_APP_ORIGIN;
  const cookies = request.cookies;
  const sessionToken = cookies.toString().split('next-auth.session-token=')[1];

  


  // IP adresini axios isteğine ekliyoruz
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/two-factor-auth")
  ) {
    return NextResponse.next();
  } else {
   
    if (sessionToken || isWhitelistedPath(pathname)) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL(`${publicUrl}/auth/login`);
      return NextResponse.redirect(redirectUrl);
    }
  }
}
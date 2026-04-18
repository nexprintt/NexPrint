import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('nexprint_auth_token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

  // Se tentar acessar /admin sem token, vai para login
  if (isAdminPath && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se já tiver logado e tentar ir para login, vai para admin
  if (isLoginPage && authToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};

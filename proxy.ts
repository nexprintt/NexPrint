import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname === '/login';
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isApiPath = request.nextUrl.pathname.startsWith('/api');

  // Bypass para rotas públicas de webhook (se houver)
  if (request.nextUrl.pathname.startsWith('/api/webhook')) return response;

  // Verificação de API Key para rotas de backend (Agent)
  if (isApiPath) {
    const AGENT_SECRET = process.env.PRINT_AGENT_SECRET_KEY || "nexprint_local_agent_secret_2024";
    const authHeader = request.headers.get("authorization");
    
    // Se enviou o token do agent corretamente, deixa passar
    if (authHeader === `Bearer ${AGENT_SECRET}`) {
      return response;
    }
    
    // Se não enviou o token, exigimos que o usuário esteja logado
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Se tentar acessar /admin sem usuário, vai para login
  if (isAdminPath && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se já tiver logado e tentar ir para login, vai para admin
  if (isLoginPage && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/api/:path*'],
};


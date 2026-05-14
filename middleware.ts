import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // First, let the Supabase helper refresh the session cookies if needed
  let response = await updateSession(request);

  // If the user is trying to access the admin area OR API routes, we must verify they are authorized
  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/api')) {
    
    // Bypass para rota de webhook, se houver
    if (request.nextUrl.pathname.startsWith('/api/webhook')) return response;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
    const AGENT_SECRET = process.env.PRINT_AGENT_SECRET_KEY || "nexprint_local_agent_secret_2024";

    // Se for uma requisição da API (Agent) com o token correto, permitimos a passagem
    const authHeader = request.headers.get("authorization");
    if (authHeader === `Bearer ${AGENT_SECRET}`) {
      return response;
    }
    
    // We create a lightweight client just to check the user session
    // We use the response cookies because updateSession might have refreshed them
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Handled by updateSession already, but required by createServerClient type
        },
      },
    });

    const { data: { user } } = await supabase.auth.getUser();

    // Se não tiver usuário logado e não enviou o token do agent
    if (!user) {
      if (request.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, svg, etc.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

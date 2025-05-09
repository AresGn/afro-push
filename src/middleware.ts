import { createServerClient } from '@supabase/ssr';
import { NextResponse, NextRequest } from 'next/server';
import { CookieOptions } from '@supabase/ssr';

// Version simplifiée du middleware qui ne génère pas d'erreurs
export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
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
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Optional: Check authentication state
  await supabase.auth.getSession();

  // Handle authentication if needed - this is a basic example
  // You can customize according to your requirements
  // const pathname = request.nextUrl.pathname;
  // if (!session && pathname.startsWith('/protected')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return response;
}

// Limite l'exécution du middleware aux routes pertinentes
export const config = {
  matcher: [
    // Exclure tous les assets statiques pour éviter la surcharge
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}; 
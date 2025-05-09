import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

// Cette route est utilisée par le client pour obtenir la session
export async function GET() {
  try {
    const session = await auth();
    
    return NextResponse.json({
      authenticated: !!session,
      expires: session?.expires || null,
      user: session?.user || null,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de la session:", error);
    return NextResponse.json(
      { 
        authenticated: false,
        error: "Erreur lors de la récupération de la session" 
      }, 
      { status: 500 }
    );
  }
} 
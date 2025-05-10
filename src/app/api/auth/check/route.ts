import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ authenticated: false, message: 'Non authentifié' }, { status: 401 });
    }
    
    return NextResponse.json({ 
      authenticated: true, 
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        image: session.user.image,
        // Ne pas inclure de données sensibles
      }
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error);
    return NextResponse.json({ 
      authenticated: false, 
      error: 'Erreur lors de la vérification de l\'authentification',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 });
  }
} 
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const userId = session.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Si l'utilisateur est un créateur, récupérer son profil créateur
    if (user.role === 'CREATOR') {
      const creatorProfile = await prisma.creatorProfile.findUnique({
        where: { userId }
      });
      
      return NextResponse.json({
        user,
        creatorProfile
      });
    }

    // Si l'utilisateur est un annonceur, récupérer son profil annonceur
    if (user.role === 'ADVERTISER') {
      const advertiserProfile = await prisma.advertiserProfile.findUnique({
        where: { userId }
      });
      
      return NextResponse.json({
        user,
        advertiserProfile
      });
    }

    // Si l'utilisateur n'a pas de profil spécifique
    return NextResponse.json({ user });
    
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération du profil' },
      { status: 500 }
    );
  }
} 
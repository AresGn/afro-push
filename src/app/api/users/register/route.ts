import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // Vérification des champs obligatoires
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Vérification si l'email existe déjà
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Cet email est déjà utilisé' },
          { status: 400 }
        );
      }
    } catch (dbError) {
      console.error("Erreur lors de la vérification de l'email:", dbError);
      return NextResponse.json(
        { error: 'Erreur lors de la vérification de l\'utilisateur' },
        { status: 500 }
      );
    }

    // Hashage du mot de passe
    let hashedPassword;
    try {
      hashedPassword = await hash(password, 10);
    } catch (hashError) {
      console.error("Erreur lors du hashage du mot de passe:", hashError);
      return NextResponse.json(
        { error: 'Erreur lors du traitement du mot de passe' },
        { status: 500 }
      );
    }

    // Création de l'utilisateur
    let user;
    try {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: role || 'CREATOR',
        }
      });
    } catch (createError) {
      console.error("Erreur lors de la création de l'utilisateur:", createError);
      return NextResponse.json(
        { error: 'Erreur lors de la création de l\'utilisateur' },
        { status: 500 }
      );
    }

    // Création du profil approprié
    try {
      if (role === 'CREATOR') {
        await prisma.creatorProfile.create({
          data: {
            userId: user.id,
          }
        });
      } else if (role === 'ADVERTISER') {
        await prisma.advertiserProfile.create({
          data: {
            userId: user.id,
            companyName: body.companyName || null,
          }
        });
      }
    } catch (profileError) {
      console.error("Erreur lors de la création du profil:", profileError);
      // On ne renvoie pas d'erreur ici, car l'utilisateur a déjà été créé
      // On pourrait implémenter une logique de nettoyage ici
    }

    // On ne renvoie pas le mot de passe
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: 'Utilisateur créé avec succès',
        user: userWithoutPassword
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
} 
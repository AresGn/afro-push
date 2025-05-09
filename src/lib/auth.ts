import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';
import { compare } from 'bcrypt';
import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

// Type pour le rôle utilisateur (à adapter selon votre schéma Prisma)
type UserRole = "CREATOR" | "ADVERTISER" | "ADMIN";

// Type pour les profils
interface CreatorProfile {
  id: string;
  userId: string;
  bio?: string | null;
  // autres champs
}

interface AdvertiserProfile {
  id: string;
  userId: string;
  companyName?: string | null;
  // autres champs
}

// Étendre les types de NextAuth pour inclure nos champs personnalisés
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: UserRole;
      creatorProfile?: CreatorProfile | null;
      advertiserProfile?: AdvertiserProfile | null;
    }
  }
  
  interface User {
    id: string;
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}

export const authConfig: Parameters<typeof NextAuth>[0] = {
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
    verifyRequest: '/login',
    newUser: '/register'
  },
  callbacks: {
    async session({ session, user, token }: { session: Session; user?: User; token?: JWT }) {
      try {
        if (session.user) {
          // Si nous avons un token mais pas d'utilisateur (JWT strategy), on copie les infos du token
          if (token && !user) {
            session.user.id = token.id as string;
            session.user.role = token.role;
            return session;
          }

          // Si nous avons un utilisateur (database strategy), on charge les données
          if (user) {
            try {
              const userData = await prisma.user.findUnique({
                where: { id: user.id },
                include: {
                  creatorProfile: true,
                  advertiserProfile: true
                }
              });

              if (userData) {
                session.user.id = userData.id;
                session.user.role = userData.role as UserRole;
                session.user.creatorProfile = userData.creatorProfile;
                session.user.advertiserProfile = userData.advertiserProfile;
              }
            } catch (dbError) {
              console.error("Erreur lors du chargement du profil utilisateur:", dbError);
              // Continuer avec les informations minimales de session
            }
          }
        }
      } catch (error) {
        console.error("Erreur dans le callback de session:", error);
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      try {
        if (user) {
          token.id = user.id;
          token.role = user.role;
        }
      } catch (error) {
        console.error("Erreur dans le callback JWT:", error);
      }
      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || '',
      clientSecret: process.env.FACEBOOK_SECRET || '',
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID || '',
      clientSecret: process.env.TWITTER_SECRET || '',
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await compare(credentials.password as string, user.password as string);

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
        } catch (error) {
          console.error("Erreur lors de l'authentification par credentials:", error);
          return null;
        }
      }
    })
  ],
};

// Wrapper try-catch pour éviter que les erreurs ne soient fatales
const safeNextAuth = () => {
  try {
    return NextAuth(authConfig);
  } catch (error) {
    console.error("Erreur lors de l'initialisation de NextAuth:", error);
    // Retourner un objet minimal compatible avec NextAuth
    return {
      handlers: {
        GET: async () => new Response(JSON.stringify({ error: "Auth service unavailable" }), { status: 500 }),
        POST: async () => new Response(JSON.stringify({ error: "Auth service unavailable" }), { status: 500 }),
      },
      auth: async () => null,
      signIn: async () => ({ error: "Auth service unavailable" }),
      signOut: async () => false,
    };
  }
};

export const { handlers, auth, signIn, signOut } = safeNextAuth(); 
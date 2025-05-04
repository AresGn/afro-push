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
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        // Add user data from database to session
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
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
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
      }
    })
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig); 
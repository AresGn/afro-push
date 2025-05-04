import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextAuthProvider } from '@/providers/NextAuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AfroPush - Marketing d\'Influence Accessible en Afrique',
  description: 'Connectez-vous avec des créateurs de contenu africains pour promouvoir votre entreprise à moindre coût via AfroPush. Paiements Mobile Money disponibles.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased text-text bg-background-white`}>
        <NextAuthProvider>
          {children}
          <ScrollToTopButton />
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </NextAuthProvider>
      </body>
    </html>
  );
} 

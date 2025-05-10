import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { SessionProvider } from '@/providers/SessionProvider';
import { Providers } from "./providers"

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
        <SessionProvider>
          <Providers>
            {children}
            <ScrollToTopButton />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
} 

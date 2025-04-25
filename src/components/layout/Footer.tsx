"use client";

// Footer component 
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-primary">AfroPush</Link>
            <p className="mt-4 text-gray-600 text-sm">
              Connectez-vous avec des créateurs de contenu africains pour promouvoir votre entreprise à moindre coût.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Pour les entreprises</h3>
            <ul className="space-y-3">
              <li><Link href="#advertisers" className="text-sm text-gray-600 hover:text-primary">Comment ça marche</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-600 hover:text-primary">Nos tarifs</Link></li>
              <li><Link href="/browse-creators" className="text-sm text-gray-600 hover:text-primary">Trouver un créateur</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Pour les créateurs</h3>
            <ul className="space-y-3">
              <li><Link href="#creators" className="text-sm text-gray-600 hover:text-primary">Avantages</Link></li>
              <li><Link href="/signup" className="text-sm text-gray-600 hover:text-primary">Devenir créateur</Link></li>
              <li><Link href="/resources" className="text-sm text-gray-600 hover:text-primary">Ressources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">À propos</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-primary">Notre mission</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-primary">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-600 hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AfroPush. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-primary">Confidentialité</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-primary">Conditions d&apos;utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 
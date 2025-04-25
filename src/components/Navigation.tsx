"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">AfroPush</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
                À propos
              </Link>
              <Link href="/pricing" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
                Tarification
              </Link>
              <Link href="/creators" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
                Créateurs
              </Link>
              <Link href="/advertisers" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
                Annonceurs
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              Connexion
            </Link>
            <Link href="/register/creator" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
              Inscription
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              À propos
            </Link>
            <Link 
              href="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Tarification
            </Link>
            <Link 
              href="/creators"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Créateurs
            </Link>
            <Link 
              href="/advertisers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Annonceurs
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-3">
              <Link href="/login" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                Connexion
              </Link>
              <Link href="/register/creator" className="block px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                Inscription
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 
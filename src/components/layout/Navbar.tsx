"use client";

import Link from 'next/link';
import { useState } from 'react';
import './Navbar.css'; // Import the CSS file

// Navbar simplifiée sans authentification pour l'instant
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link href="/" className="navbar-logo">
          AfroPush
        </Link>
        
        <ul className="navbar-desktop-links">
          <li><Link href="/#features" className="navbar-link">Comment ça marche ?</Link></li>
          <li><Link href="/#creators" className="navbar-link">Nos Créateurs</Link></li>
          <li><Link href="/#pricing" className="navbar-link">Tarifs</Link></li>
        </ul>
        
        <div className="navbar-desktop-actions">
          <Link href="/login" className="navbar-login-btn">
            Connexion
          </Link>
          <Link href="/register" className="navbar-signup-btn">
            Inscription
          </Link>
        </div>
        
        <button 
          className="navbar-mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        
        {menuOpen && (
          <div className="navbar-mobile-menu">
            <ul className="navbar-mobile-links">
              <li><Link href="/#features" className="navbar-mobile-link">Comment ça marche ?</Link></li>
              <li><Link href="/#creators" className="navbar-mobile-link">Nos Créateurs</Link></li>
              <li><Link href="/#pricing" className="navbar-mobile-link">Tarifs</Link></li>
            </ul>
            <div className="navbar-mobile-actions">
              <Link href="/login" className="navbar-mobile-login-btn">
                Connexion
              </Link>
              <Link href="/register" className="navbar-mobile-signup-btn">
                Inscription
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
} 
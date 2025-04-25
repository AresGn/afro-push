"use client";

import Link from 'next/link';
import { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="navbar-container">
      <nav className="navbar container">
        <Link href="/" className="navbar-logo">
          AfroPush
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-desktop-links">
          <li><Link href="#features" className="navbar-link">Fonctionnalités</Link></li>
          <li><Link href="#creators" className="navbar-link">Pour les Créateurs</Link></li>
          <li><Link href="#advertisers" className="navbar-link">Pour les Annonceurs</Link></li>
          <li><Link href="#pricing" className="navbar-link">Tarifs</Link></li>
        </ul>

        <div className="navbar-desktop-actions">
          <Link href="/login" className="navbar-login-btn">
            Connexion
          </Link>
          <Link href="/signup" className="navbar-signup-btn">
            Inscription
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar-mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <ul className="navbar-mobile-links">
            <li><Link href="#features" className="navbar-mobile-link" onClick={toggleMobileMenu}>Fonctionnalités</Link></li>
            <li><Link href="#creators" className="navbar-mobile-link" onClick={toggleMobileMenu}>Pour les Créateurs</Link></li>
            <li><Link href="#advertisers" className="navbar-mobile-link" onClick={toggleMobileMenu}>Pour les Annonceurs</Link></li>
            <li><Link href="#pricing" className="navbar-mobile-link" onClick={toggleMobileMenu}>Tarifs</Link></li>
            <li className="navbar-mobile-actions">
              <Link href="/login" className="navbar-mobile-login-btn" onClick={toggleMobileMenu}>
                Connexion
              </Link>
              <Link href="/signup" className="navbar-mobile-signup-btn" onClick={toggleMobileMenu}>
                Inscription
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
} 
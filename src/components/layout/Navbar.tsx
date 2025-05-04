"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAuthenticated = status === 'authenticated';
  
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow">
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="#features">Comment ça marche ?</Link></li>
            <li><Link href="#creators">Nos Créateurs</Link></li>
            <li><Link href="#pricing">Tarifs</Link></li>
            {isAuthenticated && (
              <>
                <li><Link href="/dashboard">Tableau de bord</Link></li>
                <li><Link href="/profile">Mon profil</Link></li>
                <li><button onClick={handleLogout}>Se déconnecter</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-xl">AfroPush</Link>
      </div>
      
      <div className="navbar-end">
        {isAuthenticated ? (
          <>
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Avatar" src={session?.user?.image || "https://ui-avatars.com/api/?name="+encodeURIComponent(session?.user?.name || 'User')} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow">
                <li><Link href="/profile">Mon profil</Link></li>
                <li><Link href="/dashboard">Tableau de bord</Link></li>
                <li><button onClick={handleLogout}>Se déconnecter</button></li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-ghost">Connexion</Link>
            <Link href="/register" className="btn btn-primary">Inscription</Link>
          </div>
        )}
      </div>
    </div>
  );
} 
"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaBell, FaSignOutAlt, FaTachometerAlt, FaUserFriends, FaBriefcase, FaChartLine, FaCog } from 'react-icons/fa';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  if (status === "unauthenticated") {
    redirect('/login');
  }

  const isCreator = session?.user?.role === 'CREATOR';
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">/AFROPUSH</h2>
        </div>
        <nav className="mt-6">
          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {isCreator ? 'CRÉATEUR' : 'ANNONCEUR'}
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/dashboard" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <FaTachometerAlt className="mr-3 text-primary" />
                  <span>Tableau de bord</span>
                </Link>
              </li>
              
              {isCreator ? (
                <>
                  <li>
                    <Link href="/dashboard/profile" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                      <FaUser className="mr-3 text-primary" />
                      <span>Mon profil</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/campaigns" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                      <FaBriefcase className="mr-3 text-primary" />
                      <span>Campagnes</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/analytics" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                      <FaChartLine className="mr-3 text-primary" />
                      <span>Analytics</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/dashboard/creators" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                      <FaUserFriends className="mr-3 text-primary" />
                      <span>Trouver des créateurs</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/campaigns" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                      <FaBriefcase className="mr-3 text-primary" />
                      <span>Mes campagnes</span>
                    </Link>
                  </li>
                </>
              )}
              
              <li>
                <Link href="/dashboard/settings" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <FaCog className="mr-3 text-primary" />
                  <span>Paramètres</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <button className="block md:hidden text-gray-600 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
              <FaBell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
            </button>
            
            <div className="relative group">
              <button className="flex items-center space-x-3 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {session?.user?.image ? (
                    <img src={session.user.image} alt={session.user.name || 'User'} className="h-full w-full object-cover" />
                  ) : (
                    <FaUser className="text-gray-500" />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {session?.user?.name || 'Utilisateur'}
                </span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profil
                </Link>
                <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Paramètres
                </Link>
                <Link href="/api/auth/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <div className="flex items-center">
                    <FaSignOutAlt className="mr-2 text-gray-500" />
                    <span>Déconnexion</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
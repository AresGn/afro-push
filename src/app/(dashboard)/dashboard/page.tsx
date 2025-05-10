"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import { FaUserFriends, FaChartLine, FaBullhorn, FaCalendarCheck, FaMoneyBillWave, FaEnvelope } from 'react-icons/fa';

export default function DashboardPage() {
  const { data: session } = useSession();
  const isCreator = session?.user?.role === 'CREATOR';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      
      <p className="mb-8 text-gray-600">
        Bienvenue, {session?.user?.name || 'Utilisateur'} ! 
        {isCreator 
          ? ' Voici un aperçu de votre activité en tant que créateur de contenu.' 
          : ' Voici un aperçu de vos campagnes publicitaires.'}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Cartes de statistiques */}
        {isCreator ? (
          // Statistiques pour les créateurs
          <>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                  <FaUserFriends className="text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Audience totale</p>
                  <h3 className="text-2xl font-bold">25,430</h3>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Progression</span>
                  <span className="text-sm font-semibold text-green-500">+12.5%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div className="w-3/5 h-full bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                  <FaChartLine className="text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Taux d&apos;engagement</p>
                  <h3 className="text-2xl font-bold">8.7%</h3>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Progression</span>
                  <span className="text-sm font-semibold text-green-500">+2.1%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                  <FaMoneyBillWave className="text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Revenus ce mois</p>
                  <h3 className="text-2xl font-bold">2,450 €</h3>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Progression</span>
                  <span className="text-sm font-semibold text-red-500">-3.5%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div className="w-2/3 h-full bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Statistiques pour les annonceurs
          <>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100 text-orange-500 mr-4">
                  <FaBullhorn className="text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Campagnes actives</p>
                  <h3 className="text-2xl font-bold">3</h3>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Progression</span>
                  <span className="text-sm font-semibold text-green-500">+1</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div className="w-1/2 h-full bg-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                  <FaChartLine className="text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Performances</p>
                  <h3 className="text-2xl font-bold">12,390</h3>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Impressions totales</span>
                  <span className="text-sm font-semibold text-green-500">+18.2%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-500 mr-4">
                  <FaMoneyBillWave className="text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Budget dépensé</p>
                  <h3 className="text-2xl font-bold">3,250 €</h3>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Budget restant</span>
                  <span className="text-sm font-semibold">1,750 €</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div className="w-3/5 h-full bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Activités récentes */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Activités récentes</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                <FaCalendarCheck />
              </div>
              <div>
                <p className="font-medium">
                  {isCreator ? 'Nouvelle campagne disponible' : 'Campagne acceptée par @CreatorName'}
                </p>
                <p className="text-sm text-gray-500">Il y a 2 heures</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                <FaEnvelope />
              </div>
              <div>
                <p className="font-medium">Nouveau message</p>
                <p className="text-sm text-gray-500">Il y a 5 heures</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                <FaMoneyBillWave />
              </div>
              <div>
                <p className="font-medium">
                  {isCreator ? 'Paiement reçu: 450€' : 'Paiement effectué: 450€'}
                </p>
                <p className="text-sm text-gray-500">Il y a 1 jour</p>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <a href="#" className="text-primary font-medium hover:underline">Voir toutes les activités</a>
          </div>
        </div>
      </div>
      
      {/* Recommendations */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {isCreator ? 'Opportunités recommandées' : 'Créateurs recommandés'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isCreator ? (
            // Opportunités pour les créateurs
            <>
              <div className="bg-white rounded-lg shadow p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">Campagne Mode Été</h3>
                    <p className="text-sm text-gray-500">Marque: FashionBrand</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">500€</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Recherche créateurs mode pour nouvelle collection été...</p>
                <button className="text-sm text-primary font-medium hover:underline">Voir détails</button>
              </div>
              
              <div className="bg-white rounded-lg shadow p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">Lancement application</h3>
                    <p className="text-sm text-gray-500">Marque: TechStartup</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">350€</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Promouvoir notre nouvelle application mobile...</p>
                <button className="text-sm text-primary font-medium hover:underline">Voir détails</button>
              </div>
            </>
          ) : (
            // Créateurs pour les annonceurs
            <>
              <div className="bg-white rounded-lg shadow p-5">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 overflow-hidden">
                    <div className="w-full h-full bg-gray-300"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Sarah Kouassi</h3>
                    <p className="text-sm text-gray-500">Mode & Lifestyle</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Audience: 45K</span>
                  <span>Engagement: 5.2%</span>
                </div>
                <button className="text-sm text-primary font-medium hover:underline">Voir profil</button>
              </div>
              
              <div className="bg-white rounded-lg shadow p-5">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 overflow-hidden">
                    <div className="w-full h-full bg-gray-300"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Jean Diop</h3>
                    <p className="text-sm text-gray-500">Tech & Entrepreneuriat</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Audience: 28K</span>
                  <span>Engagement: 4.8%</span>
                </div>
                <button className="text-sm text-primary font-medium hover:underline">Voir profil</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 
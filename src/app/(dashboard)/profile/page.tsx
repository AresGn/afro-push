"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaEdit, FaInstagram, FaTiktok, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Type pour les données de profil
interface CreatorProfile {
  id: string;
  bio: string | null;
  socialLinks: Record<string, string> | null;
  categories: string[];
  audience: Record<string, unknown> | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface AdvertiserProfile {
  id: string;
  companyName: string | null;
  industry: string | null;
  budget: number | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface AudienceData {
  total?: number;
  engagementRate?: string;
  primaryAge?: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile | null>(null);
  const [advertiserProfile, setAdvertiserProfile] = useState<AdvertiserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  const isCreator = session?.user?.role === 'CREATOR';

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        
        if (isCreator && data.creatorProfile) {
          setCreatorProfile(data.creatorProfile);
        } else if (!isCreator && data.advertiserProfile) {
          setAdvertiserProfile(data.advertiserProfile);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
        toast.error('Impossible de charger les données du profil');
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchUserProfile();
    }
  }, [session, isCreator]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Affiche les liens sociaux du créateur
  const renderSocialLinks = () => {
    if (!creatorProfile?.socialLinks) {
      return <p className="text-gray-500 text-sm italic">Aucun réseau social renseigné</p>;
    }
    
    return (
      <>
        {creatorProfile.socialLinks.instagram && (
          <a href={creatorProfile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-primary">
            <FaInstagram />
            <span>Instagram</span>
          </a>
        )}
        {creatorProfile.socialLinks.tiktok && (
          <a href={creatorProfile.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-primary">
            <FaTiktok />
            <span>TikTok</span>
          </a>
        )}
        {creatorProfile.socialLinks.twitter && (
          <a href={creatorProfile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-primary">
            <FaTwitter />
            <span>Twitter</span>
          </a>
        )}
        {creatorProfile.socialLinks.youtube && (
          <a href={creatorProfile.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-primary">
            <FaYoutube />
            <span>YouTube</span>
          </a>
        )}
        {creatorProfile.socialLinks.facebook && (
          <a href={creatorProfile.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-primary">
            <FaFacebook />
            <span>Facebook</span>
          </a>
        )}
      </>
    );
  };

  // Récupère les données d'audience en typant correctement
  const getAudienceData = (audience: Record<string, unknown> | null): AudienceData => {
    if (!audience) return {};
    
    return {
      total: audience.total as number,
      engagementRate: audience.engagementRate as string,
      primaryAge: audience.primaryAge as string,
    };
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Mon profil</h1>
      
      {/* Informations utilisateur communes */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || 'Profil'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-4xl">
                {session?.user?.name?.charAt(0) || '?'}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{session?.user?.name || 'Utilisateur'}</h2>
                <p className="text-gray-500">{session?.user?.email}</p>
                <p className="mt-1 inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  {isCreator ? 'Créateur de contenu' : 'Annonceur'}
                </p>
              </div>
              
              <button className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-primary hover:text-primary/80">
                <FaEdit />
                <span>Modifier le profil</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section spécifique selon le rôle */}
      {isCreator ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Profil créateur</h3>
          
          {creatorProfile ? (
            <>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">À propos de moi</h4>
                <p className="text-gray-700">
                  {creatorProfile.bio || "Aucune biographie renseignée. Ajoutez une description pour vous présenter aux annonceurs."}
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Catégories de contenu</h4>
                <div className="flex flex-wrap gap-2">
                  {creatorProfile.categories && creatorProfile.categories.length > 0 ? (
                    creatorProfile.categories.map((category, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {category}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm italic">Aucune catégorie définie</p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Réseaux sociaux</h4>
                <div className="flex flex-wrap gap-4">
                  {renderSocialLinks()}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Statistiques d&apos;audience</h4>
                {creatorProfile.audience ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(() => {
                      const audienceData = getAudienceData(creatorProfile.audience);
                      return (
                        <>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 text-sm">Audience totale</p>
                            <p className="text-xl font-bold">{audienceData.total || 0}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 text-sm">Taux d&apos;engagement</p>
                            <p className="text-xl font-bold">{audienceData.engagementRate || '0'}%</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 text-sm">Âge principal</p>
                            <p className="text-xl font-bold">{audienceData.primaryAge || 'N/A'}</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">Aucune statistique d&apos;audience disponible</p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Vous n&apos;avez pas encore complété votre profil créateur</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Configurer mon profil
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Profil annonceur</h3>
          
          {advertiserProfile ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Entreprise</h4>
                  <p className="text-gray-700">
                    {advertiserProfile.companyName || "Non renseigné"}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Secteur d&apos;activité</h4>
                  <p className="text-gray-700">
                    {advertiserProfile.industry || "Non renseigné"}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Budget publicitaire mensuel</h4>
                <div className="p-4 bg-gray-50 rounded-lg inline-block">
                  <p className="text-xl font-bold">
                    {advertiserProfile.budget ? `${advertiserProfile.budget} €` : "Non défini"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Vous n&apos;avez pas encore complété votre profil annonceur</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Configurer mon profil
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 
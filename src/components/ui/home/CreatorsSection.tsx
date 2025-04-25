"use client";

import Link from 'next/link';
import { FaInstagram, FaTiktok, FaYoutube, FaTwitter, FaFacebook } from 'react-icons/fa';

type SocialPlatform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook';

type Creator = {
  id: string;
  name: string;
  niche: string;
  bio: string;
  price: string;
  socials: {
    platform: SocialPlatform;
    followers: string;
  }[];
};

const creators: Creator[] = [
  {
    id: 'aisha-konate',
    name: 'Aisha Konaté',
    niche: 'Mode & Beauté',
    bio: 'Créatrice de contenu lifestyle basée à Abidjan. Je partage mes looks, routines beauté et conseils mode pour les femmes modernes africaines.',
    price: 'À partir de 15€ / post',
    socials: [
      { platform: 'instagram', followers: '15k' },
      { platform: 'tiktok', followers: '25k' }
    ]
  },
  {
    id: 'kwame-osei',
    name: 'Kwame Osei',
    niche: 'Tech & Gaming',
    bio: 'Passionné de tech et gaming à Accra. Mes revues de produits tech abordables et astuces gaming attirent une audience jeune et connectée.',
    price: 'À partir de 25€ / vidéo',
    socials: [
      { platform: 'youtube', followers: '35k' },
      { platform: 'twitter', followers: '12k' }
    ]
  },
  {
    id: 'aminata-diallo',
    name: 'Aminata Diallo',
    niche: 'Cuisine & Lifestyle',
    bio: 'Cuisinière passionnée de Dakar qui modernise les recettes traditionnelles. Je partage aussi des conseils pour un mode de vie sain et accessible.',
    price: 'À partir de 20€ / publication',
    socials: [
      { platform: 'instagram', followers: '22k' },
      { platform: 'facebook', followers: '18k' }
    ]
  }
];

const SocialIcon = ({ platform }: { platform: SocialPlatform }) => {
  switch (platform) {
    case 'instagram':
      return <FaInstagram />;
    case 'tiktok':
      return <FaTiktok />;
    case 'youtube':
      return <FaYoutube />;
    case 'twitter':
      return <FaTwitter />;
    case 'facebook':
      return <FaFacebook />;
  }
};

// Fonction pour obtenir les initiales à partir du nom
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};

// Fonction pour générer une couleur de fond basée sur une chaîne (nom)
const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Générer différentes teintes d'orange pour rester dans la thématique
  const h = 25; // Orange-ish hue
  const s = 60 + (hash % 30); // Saturation entre 60-90%
  const l = 45 + (hash % 20); // Lightness entre 45-65%
  
  return `hsl(${h}, ${s}%, ${l}%)`;
};

function CreatorCard({ creator }: { creator: Creator }) {
  const initials = getInitials(creator.name);
  const bgColor = stringToColor(creator.name);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          {/* Placeholder d'avatar avec initiales au lieu d'image */}
          <div 
            className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: bgColor }}
          >
            {initials}
          </div>
          <div>
            <h3 className="font-bold text-lg">{creator.name}</h3>
            <p className="text-sm text-gray-500">{creator.niche}</p>
          </div>
        </div>
        
        <div className="flex gap-3 mb-3">
          {creator.socials.map((social, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <span className="text-gray-400 mr-1">
                <SocialIcon platform={social.platform} />
              </span>
              {social.followers}
            </div>
          ))}
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{creator.bio}</p>
        
        <div className="font-medium text-sm text-primary mb-4">{creator.price}</div>
      </div>
      
      <div className="mt-auto p-4 pt-0">
        <Link 
          href={`/creator-profile/${creator.id}`}
          className="block w-full py-2 px-4 border border-gray-300 rounded-md text-center text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Voir Profil
        </Link>
      </div>
    </div>
  );
}

export default function CreatorsSection() {
  return (
    <section id="creators" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Créateurs à la Une</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos créateurs africains les plus populaires prêts à collaborer avec votre marque
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/browse-creators"
            className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-all shadow-sm inline-block"
          >
            Voir tous les créateurs
          </Link>
        </div>
      </div>
    </section>
  );
} 
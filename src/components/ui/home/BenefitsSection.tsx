"use client";

import { useState } from 'react';
import { FaBullseye, FaWallet, FaMobileAlt, FaChartLine, FaHandshake, FaLightbulb, FaGlobe } from 'react-icons/fa';

type BenefitProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function BenefitItem({ icon, title, description }: BenefitProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="text-primary text-3xl mb-4 p-3 bg-primary/10 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState<'advertisers' | 'creators'>('advertisers');

  const advertiserBenefits = [
    {
      icon: <FaBullseye />,
      title: "Audience Ciblée",
      description: "Atteignez des communautés engagées sur les marchés africains avec des créateurs locaux influents."
    },
    {
      icon: <FaWallet />,
      title: "Abordable",
      description: "Des tarifs adaptés aux budgets des PME et particuliers, bien plus économiques que les publicités classiques."
    },
    {
      icon: <FaMobileAlt />,
      title: "Paiements Locaux",
      description: "Intégration facile et sécurisée avec Mobile Money, adaptée aux réalités locales africaines."
    },
    {
      icon: <FaChartLine />,
      title: "Suivi Transparent",
      description: "Mesurez réellement la performance de vos campagnes avec des données complètes et des insights pratiques."
    }
  ];

  const creatorBenefits = [
    {
      icon: <FaHandshake />,
      title: "Partenariats Directs",
      description: "Collaborez directement avec des marques sans intermédiaire et négociez vos propres tarifs."
    },
    {
      icon: <FaWallet />,
      title: "Revenus Garantis",
      description: "Recevez vos paiements de façon sécurisée via Mobile Money dès que votre contenu est validé."
    },
    {
      icon: <FaLightbulb />,
      title: "Liberté Créative",
      description: "Gardez le contrôle sur votre contenu et choisissez les marques qui correspondent à vos valeurs."
    },
    {
      icon: <FaGlobe />,
      title: "Visibilité Accrue",
      description: "Développez votre audience et votre notoriété grâce à des collaborations avec des marques locales et internationales."
    }
  ];

  const benefits = activeTab === 'advertisers' ? advertiserBenefits : creatorBenefits;

  return (
    <section id="benefits" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir AfroPush ?</h2>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setActiveTab('advertisers')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'advertisers' 
                  ? 'bg-primary text-white' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              Pour les Annonceurs
            </button>
            <button
              onClick={() => setActiveTab('creators')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'creators' 
                  ? 'bg-primary text-white' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              Pour les Créateurs
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
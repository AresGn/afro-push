"use client";

import { FaBullseye, FaWallet, FaMobileAlt, FaChartLine } from 'react-icons/fa';

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
  const benefits = [
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

  return (
    <section id="advertisers" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir AfroPush ?</h2>
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
"use client";

import { FiTarget, FiUsers, FiDollarSign, FiBarChart2 } from 'react-icons/fi';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FiTarget className="h-10 w-10 text-blue-600" />,
      title: 'Ciblage précis',
      description: 'Accédez à une base de créateurs africains triés sur le volet, avec des audiences qualifiées et engagées.'
    },
    {
      icon: <FiUsers className="h-10 w-10 text-blue-600" />,
      title: 'Authenticité garantie',
      description: 'Collaborez avec des créateurs qui partagent réellement vos valeurs et parlent naturellement à votre cible.'
    },
    {
      icon: <FiDollarSign className="h-10 w-10 text-blue-600" />,
      title: 'Maîtrise des coûts',
      description: 'Payez uniquement pour des actions concrètes, avec un système de tarification transparent et sans surprises.'
    },
    {
      icon: <FiBarChart2 className="h-10 w-10 text-blue-600" />,
      title: 'Suivi des performances',
      description: 'Mesurez l&apos;impact réel de vos campagnes avec des métriques claires et des rapports détaillés.'
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pourquoi choisir AfroPush?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Une approche innovante du marketing d'influence en Afrique
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-blue-100 mx-auto">
                  {feature.icon}
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
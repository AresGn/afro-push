"use client";

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Comment fonctionne AfroPush?',
      answer: 'AfroPush est une plateforme qui met en relation des créateurs de contenu africains avec des annonceurs. Les annonceurs peuvent parcourir les profils des créateurs, lancer des campagnes et suivre leurs performances. Les créateurs peuvent définir leurs services et tarifs, accepter des campagnes et être rémunérés pour leurs publications.'
    },
    {
      question: 'Qui peut devenir créateur sur AfroPush?',
      answer: 'Tout créateur de contenu basé en Afrique avec une audience engagée peut s&apos;inscrire. Nous recherchons des créateurs actifs sur les principales plateformes sociales comme Instagram, TikTok, YouTube, etc. Notre équipe examine chaque profil pour assurer la qualité de notre réseau.'
    },
    {
      question: 'Quels sont les frais pour les annonceurs?',
      answer: 'AfroPush prélève une commission sur chaque transaction. Les annonceurs paient uniquement le prix affiché par le créateur, plus nos frais de service. Les tarifs sont transparents et vous pouvez consulter notre page de tarification pour plus de détails.'
    },
    {
      question: 'Comment les paiements sont-ils effectués?',
      answer: 'Les paiements sont sécurisés via notre plateforme. Les annonceurs paient à l&apos;avance et les fonds sont libérés aux créateurs une fois la campagne validée. Nous supportons plusieurs méthodes de paiement, dont Mobile Money, particulièrement adapté au marché africain.'
    },
    {
      question: 'Dans quels pays AfroPush est-il disponible?',
      answer: 'Nous sommes actuellement présents dans plus de 15 pays africains, avec une forte présence en Afrique de l&apos;Ouest et de l&apos;Est. Nous ajoutons constamment de nouveaux marchés à notre couverture.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">
            Questions fréquentes
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="pt-6">
                <dt className="text-lg">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="text-left w-full flex justify-between items-start text-gray-800 focus:outline-none"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openIndex === index ? (
                        <FiChevronUp className="h-6 w-6 text-blue-600" aria-hidden="true" />
                      ) : (
                        <FiChevronDown className="h-6 w-6 text-blue-600" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </dt>
                {openIndex === index && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base text-gray-500">{faq.answer}</p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 
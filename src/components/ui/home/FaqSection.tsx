"use client";

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <span className="text-primary ml-4">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      
      {isOpen && (
        <div className="pb-4 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "Comment fonctionne AfroPush ?",
      answer: "AfroPush met en relation les entreprises avec des créateurs de contenu africains. Vous parcourez les profils, contactez les créateurs qui correspondent à vos besoins, négociez directement, et payez en toute sécurité via Mobile Money une fois que vous êtes satisfait du contenu publié."
    },
    {
      question: "Quels types de créateurs puis-je trouver sur AfroPush ?",
      answer: "Notre plateforme regroupe des créateurs de contenu de divers pays africains dans différentes niches : mode, beauté, technologie, cuisine, voyage, business, éducation et plus encore. Vous pouvez filtrer par pays, taille d'audience, et domaine d'expertise."
    },
    {
      question: "Combien coûte l'utilisation d'AfroPush ?",
      answer: "L'inscription et la recherche de créateurs sont gratuites. Nous prenons une commission sur chaque transaction (entre 5% et 10% selon votre plan). Les prix des services varient selon les créateurs, leur audience et le type de contenu demandé."
    },
    {
      question: "Comment sont sécurisés les paiements ?",
      answer: "Les paiements sont sécurisés via notre système d'entiercement. Les fonds sont bloqués jusqu'à ce que le créateur fournisse la preuve de publication et que vous confirmiez votre satisfaction. Nous supportons les principaux services de Mobile Money en Afrique ainsi que les méthodes de paiement internationales."
    },
    {
      question: "Puis-je collaborer avec plusieurs créateurs simultanément ?",
      answer: "Absolument ! Vous pouvez gérer plusieurs campagnes et collaborations en parallèle depuis votre tableau de bord, ce qui est idéal pour les campagnes marketing nécessitant différents types de créateurs."
    }
  ];
  
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions Fréquentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tout ce que vous devez savoir pour commencer avec AfroPush
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaqIndex === index}
              onToggle={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
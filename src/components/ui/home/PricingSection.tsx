"use client";

import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';

type PlanFeature = {
  text: string;
  included: boolean;
};

type PlanProps = {
  title: string;
  subtitle: string;
  price: string;
  priceDetail: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
};

function PricingPlan({ title, subtitle, price, priceDetail, features, cta, popular = false }: PlanProps) {
  return (
    <div className={`bg-white rounded-lg overflow-hidden border ${popular ? 'border-primary shadow-lg' : 'border-gray-200'} flex flex-col`}>
      {popular && (
        <div className="bg-primary text-white text-xs font-bold uppercase tracking-wider text-center py-1">
          Recommandé
        </div>
      )}
      
      <div className="px-6 pt-6 pb-3">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-6">{subtitle}</p>
        
        <div className="mb-6">
          <div className="text-3xl font-bold">{price}</div>
          <div className="text-gray-500 text-sm">{priceDetail}</div>
        </div>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={`mr-2 mt-1 ${feature.included ? 'text-primary' : 'text-gray-300'}`}>
                <FaCheck size={14} />
              </span>
              <span className={feature.included ? 'text-gray-600' : 'text-gray-400'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="px-6 pb-6 mt-auto">
        <Link 
          href="/signup" 
          className={`block w-full py-2 text-center rounded-md transition-colors ${
            popular 
              ? 'bg-primary text-white hover:bg-primary/90' 
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const plans: PlanProps[] = [
    {
      title: 'Débutant',
      subtitle: 'Pour les particuliers et petites entreprises',
      price: 'Gratuit',
      priceDetail: 'Commission de 10% sur les transactions',
      features: [
        { text: 'Accès à tous les créateurs', included: true },
        { text: 'Messagerie directe avec les créateurs', included: true },
        { text: 'Paiement par Mobile Money', included: true },
        { text: 'Statistiques basiques de campagne', included: true },
        { text: 'Support par email', included: true },
        { text: 'Outils d\'analyse avancés', included: false }
      ],
      cta: 'Commencer gratuitement'
    },
    {
      title: 'Business',
      subtitle: 'Pour les PME et entreprises en croissance',
      price: '25€/mois',
      priceDetail: 'Commission réduite à 5%',
      features: [
        { text: 'Accès à tous les créateurs', included: true },
        { text: 'Messagerie directe avec les créateurs', included: true },
        { text: 'Paiement par Mobile Money', included: true },
        { text: 'Statistiques détaillées de campagne', included: true },
        { text: 'Support prioritaire', included: true },
        { text: 'Outils d\'analyse avancés', included: true }
      ],
      cta: 'Essai de 14 jours',
      popular: true
    },
    {
      title: 'Entreprise',
      subtitle: 'Pour les grandes entreprises',
      price: 'Sur mesure',
      priceDetail: 'Contactez-nous pour un devis',
      features: [
        { text: 'Accès à tous les créateurs', included: true },
        { text: 'Messagerie directe avec les créateurs', included: true },
        { text: 'Paiement par Mobile Money et virement', included: true },
        { text: 'Statistiques détaillées et reporting', included: true },
        { text: 'Support dédié 24/7', included: true },
        { text: 'Solution personnalisée', included: true }
      ],
      cta: 'Contactez-nous'
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Tarifs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des plans flexibles adaptés à tous les budgets et besoins, sans engagement à long terme
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingPlan key={index} {...plan} />
          ))}
        </div>
        
        <div className="text-center mt-10 text-gray-500 text-sm">
          Tous les prix sont hors taxes. Des frais de transaction peuvent s&apos;appliquer.
        </div>
      </div>
    </section>
  );
} 
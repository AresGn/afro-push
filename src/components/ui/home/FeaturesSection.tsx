"use client";

import { FaSearch, FaComments, FaMobileAlt, FaChartLine } from 'react-icons/fa';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';

type FeatureProps = {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
  index: number;
};

function FeatureCard({ icon, number, title, description, index }: FeatureProps) {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5,
            delay: 0.1 * index // Délai progressif basé sur l'index
          }
        }
      }}
    >
      <motion.span 
        className="absolute top-4 right-4 text-5xl font-bold text-gray-100 select-none"
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.3, delay: 0.2 + (0.1 * index) }
          }
        }}
      >
        {number}
      </motion.span>
      <motion.div 
        className="text-primary text-3xl mb-4"
        variants={{
          hidden: { opacity: 0, rotate: -10 },
          visible: { 
            opacity: 1, 
            rotate: 0,
            transition: { duration: 0.5, delay: 0.3 + (0.1 * index) }
          }
        }}
      >
        {icon}
      </motion.div>
      <motion.h3 
        className="text-xl font-bold mb-2"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration: 0.3, delay: 0.4 + (0.1 * index) }
          }
        }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-gray-600"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration: 0.3, delay: 0.5 + (0.1 * index) }
          }
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaSearch />,
      number: 1,
      title: "Découvrez",
      description: "Explorez notre vaste réseau de créateurs africains. Filtrez par pays, niche, taille d'audience et budget."
    },
    {
      icon: <FaComments />,
      number: 2,
      title: "Collaborez",
      description: "Échangez directement avec les créateurs via notre messagerie intégrée. Discutez des détails et négociez les tarifs."
    },
    {
      icon: <FaMobileAlt />,
      number: 3,
      title: "Payez Facilement",
      description: "Réglez via Mobile Money (MTN, Orange, Airtel...) en toute sécurité. Paiement sécurisé jusqu'à validation."
    },
    {
      icon: <FaChartLine />,
      number: 4,
      title: "Suivez l'Impact",
      description: "Accédez à un tableau de bord détaillé pour mesurer les performances de vos campagnes et optimiser vos investissements."
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection 
          variant="fadeInUp" 
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
        </AnimatedSection>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              number={feature.number}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
} 
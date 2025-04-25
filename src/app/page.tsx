// Main page 

import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/ui/home/HeroSection';
import FeaturesSection from '@/components/ui/home/FeaturesSection';
import CreatorsSection from '@/components/ui/home/CreatorsSection';
import BenefitsSection from '@/components/ui/home/BenefitsSection';
import PricingSection from '@/components/ui/home/PricingSection';
import FaqSection from '@/components/ui/home/FaqSection';
import StatsSection from '@/components/ui/home/StatsSection';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import ScrollSpy from '@/components/ui/ScrollSpy';

export default function Home() {
  const sections = [
    { id: 'hero', label: 'Accueil' },
    { id: 'features', label: 'Comment ça marche' },
    { id: 'creators', label: 'Créateurs' },
    { id: 'benefits', label: 'Avantages' },
    { id: 'pricing', label: 'Tarifs' },
    { id: 'stats', label: 'Statistiques' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <CreatorsSection />
          <BenefitsSection />
          <PricingSection />
          <StatsSection />
          <FaqSection />
        </main>
        <Footer />
        <ScrollSpy sections={sections} />
      </div>
    </PageTransition>
  );
} 

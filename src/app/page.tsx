// Main page 

import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/ui/home/HeroSection';
import FeaturesSection from '@/components/ui/home/FeaturesSection';
import CreatorsSection from '@/components/ui/home/CreatorsSection';
import BenefitsSection from '@/components/ui/home/BenefitsSection';
import PricingSection from '@/components/ui/home/PricingSection';
import FaqSection from '@/components/ui/home/FaqSection';
import StatsSection from '@/components/ui/home/StatsSection';
import MobileOperatorsSection from '@/components/ui/home/MobileOperatorsSection';
import TestimonialsSection from '@/components/ui/home/TestimonialsSection';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <CreatorsSection />
          <BenefitsSection />
          <MobileOperatorsSection />
          <TestimonialsSection />
          <PricingSection />
          <StatsSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
} 

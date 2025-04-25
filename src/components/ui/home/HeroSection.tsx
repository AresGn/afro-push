"use client";

import Link from 'next/link';
import AnimatedSection, { StaggeredContainer, StaggeredItem } from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Content: Text and CTAs */}
          <AnimatedSection variant="fadeInLeft" className="w-full md:w-1/2 space-y-4 md:space-y-6">
            <StaggeredContainer delay={0.15} staggerDelay={0.2}>
              <StaggeredItem>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Boostez votre Visibilité en Afrique avec les Bons Influenceurs
                </h1>
              </StaggeredItem>
              
              <StaggeredItem>
                <p className="text-base md:text-lg text-gray-600 max-w-xl">
                  AfroPush connecte les PME et particuliers avec des créateurs de contenu locaux authentiques. Simple, abordable et paiement via Mobile Money.
                </p>
              </StaggeredItem>
              
              <StaggeredItem>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link 
                    href="/browse-creators" 
                    className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-all shadow-sm text-center sm:text-left"
                  >
                    Trouver un Créateur
                  </Link>
                  <Link 
                    href="/signup-creator" 
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-all text-center sm:text-left"
                  >
                    Devenir Créateur
                  </Link>
                </div>
              </StaggeredItem>
            </StaggeredContainer>
          </AnimatedSection>
          
          {/* Right Content: Hero Image - visible uniquement sur desktop */}
          <AnimatedSection 
            variant="fadeInRight" 
            options={{ delay: 0.3 }}
            className="hidden md:block w-full md:w-1/2 mt-8 md:mt-0"
          >
            <div className="relative w-full aspect-[4/3] bg-primary/5 rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center text-primary">
                {/* Emplacement pour l&apos;image ou illustration */}
                <span className="text-lg font-medium">Image d&apos;illustration</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Background Decoration with subtle animation */}
      <motion.div 
        className="absolute -z-10 top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-bl-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      ></motion.div>
    </section>
  );
} 
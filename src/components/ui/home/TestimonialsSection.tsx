"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Définition des témoignages
const testimonials = [
  {
    id: 1,
    quote: "AfroPush a transformé notre façon de faire du marketing. Les créateurs locaux comprennent parfaitement notre audience et génèrent un engagement incroyable.",
    name: "Sophie Diallo",
    title: "Directrice Marketing, BeautyAfrica",
    avatar: "/images/testimonials/avatar1.jpg"
  },
  {
    id: 2,
    quote: "Grâce à AfroPush, nous avons pu toucher des audiences que les canaux traditionnels ne permettaient pas d'atteindre. Notre retour sur investissement a été multiplié par 3.",
    name: "Jean Kouassi",
    title: "Fondateur, TechLabs Abidjan",
    avatar: "/images/testimonials/avatar2.jpg"
  },
  {
    id: 3,
    quote: "En tant que créateur, AfroPush m'a permis de valoriser mon audience et de collaborer avec des marques qui partagent mes valeurs. Une vraie révolution pour le marketing d'influence en Afrique.",
    name: "Aminata Touré",
    title: "Créatrice de contenu lifestyle",
    avatar: "/images/testimonials/avatar3.jpg"
  },
  {
    id: 4,
    quote: "En tant que créateur, AfroPush m'a permis de valoriser mon audience et de collaborer avec des marques qui partagent mes valeurs. Une vraie révolution pour le marketing d'influence en Afrique.",
    name: "Amina SOSSOU",
    title: "Créatrice de contenu lifestyle",
    avatar: "/images/testimonials/avatar4.jpg"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Ce que disent nos utilisateurs
        </h2>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="text-xl md:text-2xl text-center mb-8 max-w-3xl mx-auto font-medium text-gray-800">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                  <Image 
                    src={currentTestimonial.avatar}
                    alt={`Photo de ${currentTestimonial.name}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div>
                  <div className="font-bold">{currentTestimonial.name}</div>
                  <div className="text-gray-500 text-sm">{currentTestimonial.title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Avatars des autres témoins en position fixe */}
          <div className="flex justify-center mt-8 gap-4">
            {testimonials.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-12 h-12 rounded-full overflow-hidden cursor-pointer transition-all 
                  ${index === currentIndex ? 'ring-2 ring-primary scale-110' : 'opacity-60 scale-100'}`}
              >
                <Image 
                  src={item.avatar}
                  alt={`Photo de ${item.name}`}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          
          {/* Contrôles de navigation */}
          <div className="flex justify-between w-full absolute top-1/2 -translate-y-1/2">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
              aria-label="Témoignage précédent"
            >
              ←
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
              aria-label="Témoignage suivant"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

interface ScrollSpyProps {
  sections: Section[];
  offset?: number;
}

export default function ScrollSpy({ sections, offset = 100 }: ScrollSpyProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      // Trouve la section actuellement visible
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            if (activeSection !== section.id) {
              setActiveSection(section.id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Vérifier la section active au chargement
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, activeSection, offset]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - offset + 10,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.div 
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {sections.map((section) => (
        <motion.button
          key={section.id}
          className="relative flex items-center group"
          onClick={() => scrollToSection(section.id)}
          whileHover={{ x: -5 }}
        >
          <div className="w-3 h-3 rounded-full border-2 border-primary relative">
            {activeSection === section.id && (
              <motion.div 
                className="absolute inset-0.5 bg-primary rounded-full"
                layoutId="activeSection"
                transition={{ type: "spring", duration: 0.3 }}
              />
            )}
          </div>
          <span className="absolute left-5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white shadow-md px-2 py-1 rounded text-sm">
            {section.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
} 
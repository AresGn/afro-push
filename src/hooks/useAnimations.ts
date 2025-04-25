"use client";

import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Types d'animations disponibles
export type AnimationVariant = 
  | 'fadeIn' 
  | 'fadeInUp' 
  | 'fadeInLeft' 
  | 'fadeInRight' 
  | 'zoomIn'
  | 'slideUp'
  | 'staggered';

// Options pour contrôler l'animation
export interface AnimationOptions {
  delay?: number;
  duration?: number;
  threshold?: number;  // Pourcentage de l'élément visible avant de déclencher l'animation
  once?: boolean;      // Animation se produit une seule fois
}

export const useAnimations = (
  variant: AnimationVariant = 'fadeIn', 
  options: AnimationOptions = {}
) => {
  const { 
    delay = 0, 
    duration = 0.5, 
    threshold = 0.1,
    once = true 
  } = options;
  
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once,
    amount: threshold 
  });

  // Variants d'animation pour framer-motion
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === 'fadeInUp' || variant === 'slideUp' ? 50 : 0,
      x: variant === 'fadeInLeft' ? 50 : variant === 'fadeInRight' ? -50 : 0,
      scale: variant === 'zoomIn' ? 0.9 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] // Courbe d'easing pour une animation fluide
      },
    },
  };

  return {
    ref,
    isInView,
    variants,
    animation: isInView ? 'visible' : 'hidden'
  };
};

export default useAnimations; 
"use client";

import { useTransform, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxOptions {
  speed?: number; // Facteur de vitesse: plus élevé = plus rapide, négatif = direction opposée
  inputRange?: [number, number]; // Plage d'entrée pour le défilement [début, fin]
  outputRange?: [number, number]; // Plage de sortie pour la transformation [début, fin]
  direction?: 'x' | 'y'; // Direction du parallaxe
}

/**
 * Hook pour créer des effets de parallaxe au défilement
 */
export const useParallax = (options: ParallaxOptions = {}) => {
  const {
    speed = 0.5,
    inputRange = [0, 1],
    outputRange = [0, speed * 100], // Valeur par défaut proportionnelle à la vitesse
    direction = 'y',
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transformation du défilement en mouvement
  const transform = useTransform(scrollYProgress, inputRange, outputRange);

  return {
    ref,
    style: {
      [direction]: transform as MotionValue<number>,
    },
  };
};

/**
 * Hook pour effet de parallaxe simple avec vitesse prédéfinie
 */
export const useSimpleParallax = (
  speed: number = 0.3, 
  direction: 'x' | 'y' = 'y'
) => {
  return useParallax({
    speed,
    direction,
  });
};

/**
 * Hook pour l'effet de zoom au défilement
 */
export const useParallaxZoom = (
  minScale: number = 0.9,
  maxScale: number = 1.1
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [minScale, maxScale, minScale]);

  return {
    ref,
    style: { scale },
  };
};

/**
 * Hook pour l'effet de rotation au défilement
 */
export const useParallaxRotate = (
  maxRotation: number = 10,
  axis: 'x' | 'y' | 'z' = 'z'
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-maxRotation, maxRotation]);

  return {
    ref,
    style: {
      rotateX: axis === 'x' ? rotate : 0,
      rotateY: axis === 'y' ? rotate : 0,
      rotateZ: axis === 'z' ? rotate : 0,
    },
  };
};

export default useParallax; 
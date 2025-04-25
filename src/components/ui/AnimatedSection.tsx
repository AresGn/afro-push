"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AnimationVariant, AnimationOptions, useAnimations } from '@/hooks/useAnimations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  options?: AnimationOptions;
  as?: React.ElementType; // Permet d'utiliser un élément différent en tant que conteneur
}

export default function AnimatedSection({
  children,
  className = '',
  variant = 'fadeIn',
  options = {},
  as: Component = 'div',
}: AnimatedSectionProps) {
  // Utilise notre hook personnalisé pour les animations
  const { ref, variants, animation } = useAnimations(variant, options);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={animation}
      variants={variants}
      className={className}
    >
      {Component === 'div' ? (
        children
      ) : (
        <Component>{children}</Component>
      )}
    </motion.div>
  );
}

// Composant pour créer des animations d'éléments en cascade
export function StaggeredContainer({
  children,
  className = '',
  delay = 0.1, // Délai entre chaque élément
  staggerDelay = 0.1, // Délai de départ
  as: Component = 'div',
}: Omit<AnimatedSectionProps, 'variant' | 'options'> & {
  delay?: number;
  staggerDelay?: number;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {Component === 'div' ? (
        children
      ) : (
        <Component>{children}</Component>
      )}
    </motion.div>
  );
}

// Élément à utiliser à l'intérieur du StaggeredContainer
export function StaggeredItem({
  children,
  className = '',
  variant = 'fadeInUp',
}: {
  children: ReactNode;
  className?: string;
  variant?: 'fadeIn' | 'fadeInUp' | 'zoomIn';
}) {
  const getVariant = () => {
    switch (variant) {
      case 'fadeInUp':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        };
      case 'zoomIn':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        };
      default: // fadeIn
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } },
        };
    }
  };

  return (
    <motion.div className={className} variants={getVariant()}>
      {children}
    </motion.div>
  );
} 
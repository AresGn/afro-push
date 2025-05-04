"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Définition des opérateurs mobiles
const operators = [
  {
    id: 1,
    name: "Orange",
    logo: "/images/operators/orange.png", 
    color: "#FF7900"
  },
  {
    id: 2,
    name: "MTN",
    logo: "/images/operators/mtn.png",
    color: "#FFCC00"
  },
  {
    id: 3,
    name: "Moov Africa",
    logo: "/images/operators/moov.png",
    color: "#0092DA"
  },
  {
    id: 4,
    name: "Airtel",
    logo: "/images/operators/airtel.png",
    color: "#FF0000"
  },
  {
    id: 5,
    name: "Wave",
    logo: "/images/operators/wave.png",
    color: "#1DC8F1"
  },
  {
    id: 6,
    name: "Free",
    logo: "/images/operators/free.png",
    color: "#CD1E25"
  }
];

export default function MobileOperatorsSection() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  // Génère un tableau double pour l'effet de défilement infini
  const doubledOperators = [...operators, ...operators];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Opérateurs Partenaires</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Payez facilement via Mobile Money grâce à nos intégrations avec les principaux opérateurs africains
          </p>
        </div>

        <div className="overflow-hidden mx-auto max-w-5xl">
          <motion.div 
            ref={carousel} 
            className="cursor-grab"
          >
            <motion.div 
              className="flex items-center"
              animate={{
                x: [-width/2, 0],
                transition: {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                },
              }}
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
            >
              {doubledOperators.map((operator, index) => (
                <div key={operator.id + "-" + index} className="min-w-[180px] min-h-[180px] mx-4 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 overflow-hidden">
                    <Image 
                      src={operator.logo}
                      alt={`Logo ${operator.name}`}
                      width={96}
                      height={96}
                      className="object-contain p-3"
                    />
                  </div>
                  <p className="text-center font-medium">{operator.name}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
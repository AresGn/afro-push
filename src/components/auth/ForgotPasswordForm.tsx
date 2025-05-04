"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface ForgotPasswordFormProps {
  className?: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle password reset request here
    setIsSubmitted(true);
  };
  
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-primary">/AFROPUSH</h2>
            </div>
            
            {/* Card with glowing border effect */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/30 via-blue-500/30 to-green-500/30 blur-lg opacity-75"></div>
              
              {/* Content */}
              <div className="relative bg-white rounded-xl p-8">
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-6">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">Mot de passe oublié</h1>
                      <p className="text-gray-600">Entrez votre adresse email pour réinitialiser votre mot de passe</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                          placeholder="Votre adresse email"
                          required
                        />
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200"
                        >
                          Envoyer les instructions
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <svg 
                      className="w-16 h-16 text-green-500 mx-auto mb-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Email envoyé!</h2>
                    <p className="text-gray-600 mb-6">
                      Si un compte existe avec l&apos;adresse {email}, vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
                    </p>
                  </div>
                )}
                
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
                      Retour à la connexion
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordForm; 
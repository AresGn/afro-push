"use client";

import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { handleAuthError } from '@/lib/auth-error-handler';
import { fetchData } from '@/lib/fetchData';

type UserRole = 'CREATOR' | 'ADVERTISER';
type AuthMode = 'login' | 'register';

interface AuthFormProps {
  className?: string;
  initialMode?: AuthMode;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  className = '',
  initialMode = 'login'
}) => {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const [role, setRole] = useState<UserRole>('CREATOR');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const isLogin = authMode === 'login';
  const isCreator = role === 'CREATOR';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (isLogin) {
        // Login via NextAuth
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setErrorMessage(handleAuthError(new Error(result.error), 'Identifiants incorrects. Veuillez réessayer.'));
          setIsLoading(false);
          return;
        }

        // Si connecté avec succès, rediriger vers la page d'accueil
        router.push('/dashboard');
      } else {
        // Register new user
        const userData = {
          name,
          email,
          password,
          role,
          ...(role === 'ADVERTISER' ? { companyName } : {}),
          ...(role === 'CREATOR' ? { socialMedia } : {})
        };

        // Use the new fetchData utility
        const { success, error } = await fetchData('/api/users/register', {
          method: 'POST',
          body: userData,
        });

        if (!success) {
          throw new Error(error || 'Une erreur est survenue lors de l\'inscription');
        }

        // Connexion automatique après inscription
        const signInResult = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (signInResult?.error) {
          // Si l'inscription a réussi mais que la connexion a échoué
          setErrorMessage('Inscription réussie, mais la connexion a échoué. Veuillez vous connecter manuellement.');
          router.push('/login');
          return;
        }

        // Redirection après inscription et connexion
        router.push('/dashboard');
      }
    } catch (error) {
      setErrorMessage(handleAuthError(error, 'Une erreur inattendue s\'est produite. Veuillez réessayer.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      await signIn(provider, { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error(`Erreur lors de la connexion avec ${provider}:`, error);
      setErrorMessage(handleAuthError(error, `Erreur de connexion avec ${provider}. Veuillez réessayer.`));
      setIsLoading(false);
    }
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
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {isLogin ? 'Connectez-vous' : 'Inscrivez-vous'}
                  </h1>
                  <p className="text-gray-600">
                    {isLogin 
                      ? 'Accédez à votre compte AfroPush' 
                      : 'Inscrivez-vous sur AfroPush aujourd\'hui'}
                  </p>
                </div>
                
                {/* Error message */}
                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {errorMessage}
                  </div>
                )}
                
                {/* Toggle between login and register */}
                {!isLogin && (
                  <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                      <button
                        type="button"
                        onClick={() => setRole('CREATOR')}
                        className={`px-4 py-2 text-sm rounded-md ${
                          isCreator 
                            ? 'bg-primary text-white' 
                            : 'text-gray-700'
                        }`}
                      >
                        Créateur
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('ADVERTISER')}
                        className={`px-4 py-2 text-sm rounded-md ${
                          !isCreator 
                            ? 'bg-primary text-white' 
                            : 'text-gray-700'
                        }`}
                      >
                        Annonceur
                      </button>
                    </div>
                  </div>
                )}

                {/* Social Login Buttons */}
                <div className="space-y-3 mb-4">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200"
                    disabled={isLoading}
                  >
                    <FaGoogle className="text-red-500 mr-3" />
                    <span>{isLogin ? 'Continuer' : 'S\'inscrire'} avec Google</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200"
                    disabled={isLoading}
                  >
                    <FaFacebookF className="text-blue-600 mr-3" />
                    <span>{isLogin ? 'Continuer' : 'S\'inscrire'} avec Facebook</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('twitter')}
                    className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200"
                    disabled={isLoading}
                  >
                    <FaTwitter className="text-black mr-3" />
                    <span>{isLogin ? 'Continuer' : 'S\'inscrire'} avec X</span>
                  </button>
                </div>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-600">ou {isLogin ? 'connectez-vous' : 'inscrivez-vous'} avec votre email</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Auth Form */}
                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                  {/* Name Field (only for register) */}
                  {!isLogin && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Votre nom complet"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  )}
                  
                  {/* Email Field */}
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
                      disabled={isLoading}
                    />
                  </div>
                  
                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder={isLogin ? "Votre mot de passe" : "Minimum 8 caractères"}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  {/* Additional fields for register mode */}
                  {!isLogin && !isCreator && (
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Nom de l&apos;entreprise</label>
                      <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Nom de votre entreprise"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  )}
                  
                  {!isLogin && isCreator && (
                    <div>
                      <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-700 mb-1">Plateforme principale</label>
                      <select
                        id="socialMedia"
                        value={socialMedia}
                        onChange={(e) => setSocialMedia(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        required
                        disabled={isLoading}
                      >
                        <option value="">Choisir une plateforme</option>
                        <option value="instagram">Instagram</option>
                        <option value="tiktok">TikTok</option>
                        <option value="youtube">YouTube</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter</option>
                      </select>
                    </div>
                  )}
                  
                  {/* Remember me / Terms (conditional) */}
                  {isLogin ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          disabled={isLoading}
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                          Se souvenir de moi
                        </label>
                      </div>
                      
                      <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
                        Mot de passe oublié?
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        required
                        disabled={isLoading}
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        J&apos;accepte les <Link href="/terms" className="text-primary">conditions d&apos;utilisation</Link> et la <Link href="/privacy" className="text-primary">politique de confidentialité</Link>
                      </label>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200"
                      disabled={isLoading}
                    >
                      {isLoading 
                        ? 'Chargement...' 
                        : isLogin ? 'Se connecter' : 'S\'inscrire'}
                    </button>
                  </div>
                </form>
                
                {/* Toggle Auth Mode */}
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    {isLogin ? (
                      <>
                        Pas encore de compte?{' '}
                        <button 
                          type="button"
                          onClick={() => setAuthMode('register')}
                          className="font-medium text-primary hover:text-primary-dark"
                          disabled={isLoading}
                        >
                          Inscrivez-vous
                        </button>
                      </>
                    ) : (
                      <>
                        Déjà inscrit?{' '}
                        <button 
                          type="button"
                          onClick={() => setAuthMode('login')}
                          className="font-medium text-primary hover:text-primary-dark"
                          disabled={isLoading}
                        >
                          Connectez-vous
                        </button>
                      </>
                    )}
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

export default AuthForm; 
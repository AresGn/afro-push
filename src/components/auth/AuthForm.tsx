"use client";

import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  
  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: '/'
      });
    } catch (error) {
      console.error(`Error during ${provider} login:`, error);
      toast.error(`Échec de connexion avec ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        // Login with credentials - use redirect: true to avoid CLIENT_FETCH_ERROR
        await signIn('credentials', {
          email,
          password,
          redirect: true,
          callbackUrl: '/'
        });
        // Le redirect est géré par NextAuth, pas besoin de router.push
      } else {
        // Register new user
        const userData = {
          name,
          email,
          password,
          role,
          ...(isCreator ? { socialMedia } : { companyName })
        };
        
        const response = await axios.post('/api/auth/register', userData);
        
        if (response.data.success) {
          // Auto login after registration - use redirect: true to avoid CLIENT_FETCH_ERROR
          toast.success("Compte créé avec succès!");
          await signIn('credentials', {
            email,
            password,
            redirect: true,
            callbackUrl: '/'
          });
        }
      }
    } catch (error: unknown) {
      console.error('Authentication error:', error);
      let errorMessage = isLogin ? "Échec de connexion" : "Échec d'inscription";
      
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
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
                
                {/* Toggle between login and register */}
                {!isLogin && (
                  <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                      <button
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
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200"
                  >
                    <FaGoogle className="text-red-500 mr-3" />
                    <span>{isLogin ? 'Continuer' : 'S\'inscrire'} avec Google</span>
                  </button>
                  
                  <button 
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={isLoading}
                    className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200"
                  >
                    <FaFacebookF className="text-blue-600 mr-3" />
                    <span>{isLogin ? 'Continuer' : 'S\'inscrire'} avec Facebook</span>
                  </button>
                  
                  <button 
                    onClick={() => handleSocialLogin('twitter')}
                    disabled={isLoading}
                    className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200"
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
                      disabled={isLoading}
                      className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 disabled:opacity-70"
                    >
                      {isLoading 
                        ? 'Chargement...' 
                        : (isLogin ? 'Se connecter' : 'S\'inscrire')}
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
                          onClick={() => setAuthMode('register')}
                          className="font-medium text-primary hover:text-primary-dark"
                        >
                          Inscrivez-vous
                        </button>
                      </>
                    ) : (
                      <>
                        Déjà inscrit?{' '}
                        <button 
                          onClick={() => setAuthMode('login')}
                          className="font-medium text-primary hover:text-primary-dark"
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
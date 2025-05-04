import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

export const metadata = {
  title: 'Connexion | AfroPush',
  description: 'Connectez-vous à votre compte AfroPush'
};

export default function LoginPage() {
  return (
    <main>
      <AuthForm initialMode="login" />
    </main>
  );
} 
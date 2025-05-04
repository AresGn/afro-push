import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

export const metadata = {
  title: 'Inscription | AfroPush',
  description: 'Inscrivez-vous sur AfroPush et développez votre entreprise'
};

export default function RegisterPage() {
  return (
    <main>
      <AuthForm initialMode="register" />
    </main>
  );
} 
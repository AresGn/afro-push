import React from 'react';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata = {
  title: 'Mot de passe oublié | AfroPush',
  description: 'Réinitialiser votre mot de passe AfroPush'
};

export default function ForgotPasswordPage() {
  return (
    <main>
      <ForgotPasswordForm />
    </main>
  );
} 
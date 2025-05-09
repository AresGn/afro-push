'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type SupabaseContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const SupabaseContext = createContext<SupabaseContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => {},
});

export const useSupabase = () => useContext(SupabaseContext);

export default function SupabaseProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      setIsLoading(true);
      
      // Get session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setSession(session);
        setUser(session?.user || null);
      }
      
      setIsLoading(false);
      
      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user || null);
          setIsLoading(false);
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    }
    
    getSession();
  }, []);
  
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  
  const value = {
    user,
    session,
    isLoading,
    signOut,
  };
  
  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
} 
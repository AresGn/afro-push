import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

// Types
export type UserRole = 'CREATOR' | 'ADVERTISER' | 'ADMIN';

export interface CreatorProfile {
  id: string;
  user_id: string;
  bio?: string | null;
  social_links?: Record<string, string> | null;
  categories?: string[] | null;
  audience?: Record<string, string> | null;
  created_at: Date;
  updated_at: Date;
}

export interface AdvertiserProfile {
  id: string;
  user_id: string;
  company_name?: string | null;
  industry?: string | null;
  budget?: number | null;
  created_at: Date;
  updated_at: Date;
}

// Client-side Supabase client
export const createSupabaseClient = () => {
  return createClientComponentClient();
};

// Server-side Supabase client
export const createServerSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

// Admin Supabase client with service role (for server-side operations that need elevated permissions)
export const createAdminSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

// Authentication utilities
export const getUser = async () => {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getUserWithProfile = async () => {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  // Get user data from our custom users table
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!userData) return user;

  // Check if user is a creator and get profile
  if (userData.role === 'CREATOR') {
    const { data: creatorProfile } = await supabase
      .from('creator_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    return { ...user, ...userData, creatorProfile };
  }

  // Check if user is an advertiser and get profile
  if (userData.role === 'ADVERTISER') {
    const { data: advertiserProfile } = await supabase
      .from('advertiser_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    return { ...user, ...userData, advertiserProfile };
  }

  return { ...user, ...userData };
}; 
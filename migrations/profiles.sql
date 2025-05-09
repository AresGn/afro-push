-- Create creator_profiles table for Supabase
CREATE TABLE IF NOT EXISTS public.creator_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  bio TEXT,
  social_links JSONB,
  categories TEXT[],
  audience JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_user_id UNIQUE (user_id)
);

-- Create advertiser_profiles table for Supabase
CREATE TABLE IF NOT EXISTS public.advertiser_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  company_name TEXT,
  industry TEXT,
  budget FLOAT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_advertiser_user_id UNIQUE (user_id)
);

-- Enable Row Level Security for creator_profiles
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for creator profile ownership
CREATE POLICY "Users can view and edit their own creator profile" ON public.creator_profiles
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow everyone to read all creator profiles
CREATE POLICY "Anyone can read all creator profiles" ON public.creator_profiles
  FOR SELECT
  USING (true);

-- Enable Row Level Security for advertiser_profiles
ALTER TABLE public.advertiser_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for advertiser profile ownership
CREATE POLICY "Users can view and edit their own advertiser profile" ON public.advertiser_profiles
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow everyone to read all advertiser profiles
CREATE POLICY "Anyone can read all advertiser profiles" ON public.advertiser_profiles
  FOR SELECT
  USING (true);

-- Trigger to update the updated_at column for creator_profiles
CREATE TRIGGER update_creator_profiles_updated_at
  BEFORE UPDATE ON public.creator_profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Trigger to update the updated_at column for advertiser_profiles
CREATE TRIGGER update_advertiser_profiles_updated_at
  BEFORE UPDATE ON public.advertiser_profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column(); 
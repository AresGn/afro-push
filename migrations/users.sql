-- Create users table for Supabase
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  image TEXT,
  role TEXT NOT NULL DEFAULT 'CREATOR',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  password TEXT
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own data
CREATE POLICY "Users can view and edit their own data" ON public.users
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow everyone to read all users
CREATE POLICY "Anyone can read all users" ON public.users
  FOR SELECT
  USING (true);

-- Function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update the updated_at column
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column(); 
-- Create sessions table for Supabase
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires TIMESTAMPTZ NOT NULL
);

-- Create accounts table for Supabase (OAuth connections)
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  
  UNIQUE(provider, provider_account_id)
);

-- Create verification_tokens table for Supabase
CREATE TABLE IF NOT EXISTS public.verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  
  UNIQUE(identifier, token)
);

-- Enable Row Level Security for sessions
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for session ownership
CREATE POLICY "Users can manage their own sessions" ON public.sessions
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Enable Row Level Security for accounts
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

-- Create policy for account ownership
CREATE POLICY "Users can manage their own accounts" ON public.accounts
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Enable Row Level Security for verification_tokens
ALTER TABLE public.verification_tokens ENABLE ROW LEVEL SECURITY;

-- Only allow server access to verification_tokens
CREATE POLICY "Only authenticated users can use verification tokens" ON public.verification_tokens
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated'); 
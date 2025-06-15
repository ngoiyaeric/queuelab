-- Create connected accounts table
CREATE TABLE IF NOT EXISTS connected_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  provider_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, provider)
);

-- Enable RLS
ALTER TABLE connected_accounts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own connected accounts
CREATE POLICY "Users can view own connected accounts" ON connected_accounts
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can manage their own connected accounts
CREATE POLICY "Users can manage own connected accounts" ON connected_accounts
  FOR ALL USING (auth.uid() = user_id);

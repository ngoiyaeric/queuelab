-- Create user context table for personalization settings
CREATE TABLE IF NOT EXISTS user_context (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  system_prompt TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE user_context ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own context
CREATE POLICY "Users can view own context" ON user_context
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own context
CREATE POLICY "Users can insert own context" ON user_context
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own context
CREATE POLICY "Users can update own context" ON user_context
  FOR UPDATE USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_context_updated_at
    BEFORE UPDATE ON user_context
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default context for existing users
INSERT INTO user_context (user_id, system_prompt)
SELECT id, 'You are a helpful AI assistant designed to support productivity and creative work. Please provide clear, actionable responses and ask clarifying questions when needed. Maintain a professional yet friendly tone in all interactions.'
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- Create activity table for search functionality
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own activity
CREATE POLICY "Users can view own activity" ON user_activity
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own activity
CREATE POLICY "Users can insert own activity" ON user_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create index for search
CREATE INDEX IF NOT EXISTS idx_user_activity_search ON user_activity 
USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- Insert some sample activity data
INSERT INTO user_activity (user_id, activity_type, title, description) 
SELECT 
  auth.uid(),
  'session',
  'Project Planning Session',
  'Discussed project requirements and timeline'
WHERE auth.uid() IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO user_activity (user_id, activity_type, title, description) 
SELECT 
  auth.uid(),
  'document',
  'API Documentation Review',
  'Reviewed and updated API documentation for v2.0'
WHERE auth.uid() IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO user_activity (user_id, activity_type, title, description) 
SELECT 
  auth.uid(),
  'meeting',
  'Team Standup',
  'Daily team synchronization meeting'
WHERE auth.uid() IS NOT NULL
ON CONFLICT DO NOTHING;

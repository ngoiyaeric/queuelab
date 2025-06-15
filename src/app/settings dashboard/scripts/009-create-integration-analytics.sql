-- Create analytics tables for landing page integration tracking
CREATE TABLE IF NOT EXISTS integration_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  source TEXT NOT NULL DEFAULT 'unknown',
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE integration_analytics ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_integration_analytics_event_type ON integration_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_integration_analytics_user_id ON integration_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_integration_analytics_source ON integration_analytics(source);
CREATE INDEX IF NOT EXISTS idx_integration_analytics_created_at ON integration_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_integration_analytics_session ON integration_analytics(session_id);

-- Create composite index for common queries
CREATE INDEX IF NOT EXISTS idx_integration_analytics_composite 
ON integration_analytics(source, event_type, created_at DESC);

-- Create function to clean old analytics data (keep last 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_analytics()
RETURNS void AS $$
BEGIN
  DELETE FROM integration_analytics 
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Create scheduled job to run cleanup (if pg_cron is available)
-- SELECT cron.schedule('cleanup-analytics', '0 2 * * *', 'SELECT cleanup_old_analytics();');

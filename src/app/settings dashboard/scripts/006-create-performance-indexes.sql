-- Additional performance indexes for scalability

-- Composite indexes for common queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_email_created 
ON profiles(email, created_at) WHERE email IS NOT NULL;

-- Partial indexes for active sessions
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_activity_recent 
ON user_activity(user_id, created_at DESC) 
WHERE created_at > NOW() - INTERVAL '30 days';

-- GIN index for full-text search on activity
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_activity_fulltext 
ON user_activity USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- Index for file management queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_files_composite 
ON user_files(user_id, app_name, created_at DESC);

-- Covering index for user context
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_context_covering 
ON user_context(user_id) INCLUDE (system_prompt, updated_at);

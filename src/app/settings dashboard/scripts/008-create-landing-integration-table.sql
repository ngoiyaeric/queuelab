-- Create landing page integration tracking
CREATE TABLE IF NOT EXISTS landing_integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  domain TEXT NOT NULL,
  integration_key TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(domain, integration_key)
);

-- Enable RLS
ALTER TABLE landing_integrations ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_landing_integrations_domain ON landing_integrations(domain);
CREATE INDEX IF NOT EXISTS idx_landing_integrations_active ON landing_integrations(active);

-- Create trigger for updated_at
CREATE TRIGGER update_landing_integrations_updated_at
    BEFORE UPDATE ON landing_integrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

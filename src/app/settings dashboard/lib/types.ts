export interface Profile {
  id: string
  display_name: string | null
  avatar_url: string | null
  email: string | null
  created_at: string
  updated_at: string
}

export interface ConnectedAccount {
  id: string
  user_id: string
  provider: string
  provider_account_id: string
  provider_email: string | null
  created_at: string
}

export interface UserActivity {
  id: string
  user_id: string
  activity_type: string
  title: string
  description: string | null
  metadata: Record<string, any>
  created_at: string
}

export interface SearchResult {
  id: string
  title: string
  description: string | null
  activity_type: string
  created_at: string
}

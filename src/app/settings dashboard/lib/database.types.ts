export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          avatar_url: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          avatar_url?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          avatar_url?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_files: {
        Row: {
          id: string
          user_id: string
          app_name: string
          file_name: string
          file_size: number
          file_type: string
          file_path: string
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          app_name: string
          file_name: string
          file_size: number
          file_type: string
          file_path: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          app_name?: string
          file_name?: string
          file_size?: number
          file_type?: string
          file_path?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_context: {
        Row: {
          id: string
          user_id: string
          system_prompt: string
          notes: string
          preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          system_prompt?: string
          notes?: string
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          system_prompt?: string
          notes?: string
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_activity: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          title: string
          description: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          title: string
          description?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          title?: string
          description?: string | null
          metadata?: Json
          created_at?: string
        }
      }
      connected_accounts: {
        Row: {
          id: string
          user_id: string
          provider: string
          provider_account_id: string
          provider_email: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          provider_account_id: string
          provider_email?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          provider_account_id?: string
          provider_email?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

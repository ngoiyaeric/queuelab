"use client"

import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Landing page integration utilities
export interface LandingPageConfig {
  supabaseUrl?: string
  supabaseAnonKey?: string
  redirectUrl?: string
  theme?: "dark" | "light"
  features?: string[]
}

export class QueueCXIntegration {
  private supabase: ReturnType<typeof createClient<Database>> | null = null
  private config: LandingPageConfig

  constructor(config: LandingPageConfig) {
    this.config = config

    if (config.supabaseUrl && config.supabaseAnonKey) {
      this.supabase = createClient<Database>(config.supabaseUrl, config.supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          flowType: "pkce",
        },
      })
    }
  }

  // Initialize QueueCX integration
  async initialize() {
    if (!this.supabase) {
      console.warn("QueueCX: Supabase not configured, running in demo mode")
      return { success: true, mode: "demo" }
    }

    try {
      const {
        data: { session },
      } = await this.supabase.auth.getSession()
      return {
        success: true,
        mode: "production",
        authenticated: !!session,
        user: session?.user || null,
      }
    } catch (error) {
      console.error("QueueCX initialization error:", error)
      return { success: false, error }
    }
  }

  // Seamless sign-up flow
  async signUp(email: string, password: string, metadata?: Record<string, any>) {
    if (!this.supabase) {
      // Demo mode - simulate success
      return {
        success: true,
        user: { id: "demo", email, user_metadata: metadata },
        mode: "demo",
      }
    }

    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: this.config.redirectUrl || `${window.location.origin}/dashboard`,
          data: metadata,
        },
      })

      if (error) throw error

      return {
        success: true,
        user: data.user,
        session: data.session,
        mode: "production",
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Sign up failed",
      }
    }
  }

  // Seamless sign-in flow
  async signIn(email: string, password: string) {
    if (!this.supabase) {
      // Demo mode - simulate success
      return {
        success: true,
        user: { id: "demo", email },
        mode: "demo",
      }
    }

    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return {
        success: true,
        user: data.user,
        session: data.session,
        mode: "production",
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Sign in failed",
      }
    }
  }

  // OAuth providers
  async signInWithProvider(provider: "google" | "github" | "discord") {
    if (!this.supabase) {
      return {
        success: false,
        error: "OAuth not available in demo mode",
      }
    }

    try {
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: this.config.redirectUrl || `${window.location.origin}/dashboard`,
        },
      })

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "OAuth sign in failed",
      }
    }
  }

  // Get current user
  async getCurrentUser() {
    if (!this.supabase) {
      return { user: null, mode: "demo" }
    }

    try {
      const {
        data: { user },
      } = await this.supabase.auth.getUser()
      return { user, mode: "production" }
    } catch (error) {
      console.error("Get current user error:", error)
      return { user: null, error }
    }
  }

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    if (!this.supabase) {
      return { unsubscribe: () => {} }
    }

    const {
      data: { subscription },
    } = this.supabase.auth.onAuthStateChange(callback)
    return subscription
  }

  // Sign out
  async signOut() {
    if (!this.supabase) {
      return { success: true, mode: "demo" }
    }

    try {
      const { error } = await this.supabase.auth.signOut()
      if (error) throw error
      return { success: true, mode: "production" }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Sign out failed",
      }
    }
  }

  // Get dashboard URL
  getDashboardUrl() {
    return this.config.redirectUrl || "/dashboard"
  }

  // Check if configured for production
  isConfigured() {
    return !!(this.config.supabaseUrl && this.config.supabaseAnonKey)
  }
}

// Export factory function for easy integration
export function createQueueCXIntegration(config: LandingPageConfig) {
  return new QueueCXIntegration(config)
}

// React hook for landing pages
export function useQueueCXIntegration(config: LandingPageConfig) {
  const integration = new QueueCXIntegration(config)

  return {
    signUp: integration.signUp.bind(integration),
    signIn: integration.signIn.bind(integration),
    signInWithProvider: integration.signInWithProvider.bind(integration),
    getCurrentUser: integration.getCurrentUser.bind(integration),
    onAuthStateChange: integration.onAuthStateChange.bind(integration),
    signOut: integration.signOut.bind(integration),
    getDashboardUrl: integration.getDashboardUrl.bind(integration),
    isConfigured: integration.isConfigured.bind(integration),
    initialize: integration.initialize.bind(integration),
  }
}

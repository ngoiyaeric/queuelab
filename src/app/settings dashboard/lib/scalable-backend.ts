"use client"

import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Scalable backend configuration for high-traffic applications
export interface BackendConfig {
  supabaseUrl: string
  supabaseAnonKey: string
  maxRetries?: number
  retryDelay?: number
  connectionPoolSize?: number
  enableCaching?: boolean
  enableAnalytics?: boolean
}

export class ScalableBackend {
  private supabase: ReturnType<typeof createClient<Database>>
  private config: Required<BackendConfig>
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map()
  private requestQueue: Map<string, Promise<any>> = new Map()

  constructor(config: BackendConfig) {
    this.config = {
      maxRetries: 3,
      retryDelay: 1000,
      connectionPoolSize: 10,
      enableCaching: true,
      enableAnalytics: true,
      ...config,
    }

    this.supabase = createClient<Database>(config.supabaseUrl, config.supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
      db: {
        schema: "public",
      },
      global: {
        headers: {
          "x-application-name": "queuecx-scalable",
          "x-client-version": "1.0.0",
        },
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })

    // Initialize cleanup intervals
    this.initializeCleanup()
  }

  // Retry mechanism for failed requests
  private async withRetry<T>(operation: () => Promise<T>, context: string): Promise<T> {
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error as Error
        console.warn(`Attempt ${attempt} failed for ${context}:`, error)

        if (attempt < this.config.maxRetries) {
          await this.delay(this.config.retryDelay * attempt)
        }
      }
    }

    throw lastError
  }

  // Request deduplication to prevent duplicate API calls
  private async deduplicateRequest<T>(key: string, operation: () => Promise<T>): Promise<T> {
    if (this.requestQueue.has(key)) {
      return this.requestQueue.get(key)!
    }

    const promise = operation().finally(() => {
      this.requestQueue.delete(key)
    })

    this.requestQueue.set(key, promise)
    return promise
  }

  // Caching mechanism with TTL
  private getCached<T>(key: string): T | null {
    if (!this.config.enableCaching) return null

    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  private setCache<T>(key: string, data: T, ttl = 300000): void {
    if (!this.config.enableCaching) return

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  // Analytics tracking
  private async trackEvent(event: string, metadata: Record<string, any> = {}): Promise<void> {
    if (!this.config.enableAnalytics) return

    try {
      const {
        data: { user },
      } = await this.supabase.auth.getUser()

      await this.supabase.from("integration_analytics").insert({
        event_type: event,
        user_id: user?.id || null,
        source: "scalable-backend",
        metadata: {
          timestamp: new Date().toISOString(),
          url: typeof window !== "undefined" ? window.location.href : null,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
          ...metadata,
        },
      })
    } catch (error) {
      console.warn("Failed to track event:", error)
    }
  }

  // User management with caching and retry
  async getUser() {
    return this.withRetry(async () => {
      const cacheKey = "current-user"
      const cached = this.getCached(cacheKey)
      if (cached) return cached

      const {
        data: { user },
        error,
      } = await this.supabase.auth.getUser()

      if (error) throw error

      if (user) {
        // Get enhanced profile data
        const { data: profile } = await this.supabase.from("profiles").select("*").eq("id", user.id).single()

        const userData = { ...user, profile }
        this.setCache(cacheKey, userData, 60000) // Cache for 1 minute
        return userData
      }

      return null
    }, "getUser")
  }

  // Profile management with optimistic updates
  async updateProfile(userId: string, updates: Partial<Database["public"]["Tables"]["profiles"]["Update"]>) {
    return this.withRetry(async () => {
      const { data, error } = await this.supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single()

      if (error) throw error

      // Invalidate cache
      this.cache.delete("current-user")
      this.cache.delete(`profile-${userId}`)

      await this.trackEvent("profile_updated", { userId, fields: Object.keys(updates) })

      return data
    }, "updateProfile")
  }

  // File management with progress tracking
  async uploadFile(
    userId: string,
    appName: string,
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<Database["public"]["Tables"]["user_files"]["Row"]> {
    return this.withRetry(async () => {
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}/${appName}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

      // Upload to storage with progress tracking
      const { data: uploadData, error: uploadError } = await this.supabase.storage
        .from("user-files")
        .upload(fileName, file, {
          onUploadProgress: (progress) => {
            const percentage = (progress.loaded / progress.total) * 100
            onProgress?.(percentage)
          },
        })

      if (uploadError) throw uploadError

      // Save metadata to database
      const { data, error } = await this.supabase
        .from("user_files")
        .insert({
          user_id: userId,
          app_name: appName,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          file_path: uploadData.path,
          metadata: {
            originalName: file.name,
            uploadedAt: new Date().toISOString(),
            checksum: await this.calculateChecksum(file),
          },
        })
        .select()
        .single()

      if (error) throw error

      await this.trackEvent("file_uploaded", {
        userId,
        appName,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      })

      return data
    }, "uploadFile")
  }

  // Batch operations for efficiency
  async batchGetFiles(
    userId: string,
    appNames: string[],
  ): Promise<Record<string, Database["public"]["Tables"]["user_files"]["Row"][]>> {
    return this.deduplicateRequest(`batch-files-${userId}-${appNames.join(",")}`, async () => {
      const { data, error } = await this.supabase
        .from("user_files")
        .select("*")
        .eq("user_id", userId)
        .in("app_name", appNames)
        .order("created_at", { ascending: false })

      if (error) throw error

      // Group by app name
      const grouped = data.reduce(
        (acc, file) => {
          if (!acc[file.app_name]) acc[file.app_name] = []
          acc[file.app_name].push(file)
          return acc
        },
        {} as Record<string, Database["public"]["Tables"]["user_files"]["Row"][]>,
      )

      return grouped
    })
  }

  // Real-time subscriptions with automatic reconnection
  subscribeToUserActivity(userId: string, callback: (payload: any) => void) {
    const channel = this.supabase
      .channel(`user-activity-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_activity",
          filter: `user_id=eq.${userId}`,
        },
        callback,
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Subscribed to user activity")
        } else if (status === "CHANNEL_ERROR") {
          console.error("Subscription error, attempting to reconnect...")
          setTimeout(() => {
            channel.unsubscribe()
            this.subscribeToUserActivity(userId, callback)
          }, 5000)
        }
      })

    return () => channel.unsubscribe()
  }

  // Search with caching and debouncing
  async searchActivity(userId: string, query: string, limit = 20) {
    const cacheKey = `search-${userId}-${query}-${limit}`
    const cached = this.getCached(cacheKey)
    if (cached) return cached

    return this.withRetry(async () => {
      let dbQuery = this.supabase
        .from("user_activity")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit)

      if (query.trim()) {
        dbQuery = dbQuery.textSearch("title", query, {
          type: "websearch",
          config: "english",
        })
      }

      const { data, error } = await dbQuery

      if (error) throw error

      this.setCache(cacheKey, data, 30000) // Cache for 30 seconds
      return data
    }, "searchActivity")
  }

  // Context management with versioning
  async updateUserContext(userId: string, systemPrompt: string, notes?: string) {
    return this.withRetry(async () => {
      const { data, error } = await this.supabase
        .from("user_context")
        .upsert({
          user_id: userId,
          system_prompt: systemPrompt,
          notes: notes || "",
          preferences: {
            version: Date.now(),
            lastModified: new Date().toISOString(),
          },
        })
        .select()
        .single()

      if (error) throw error

      // Invalidate related caches
      this.cache.delete(`context-${userId}`)

      await this.trackEvent("context_updated", {
        userId,
        promptLength: systemPrompt.length,
        notesLength: notes?.length || 0,
      })

      return data
    }, "updateUserContext")
  }

  // Session management
  async createSession(userId: string, deviceInfo: Record<string, any>) {
    return this.withRetry(async () => {
      const sessionToken = this.generateSessionToken()

      const { data, error } = await this.supabase.from("user_sessions").insert({
        user_id: userId,
        session_token: sessionToken,
        device_info: deviceInfo,
        ip_address: await this.getClientIP(),
        location_data: await this.getLocationData(),
      })

      if (error) throw error

      await this.trackEvent("session_created", { userId, deviceInfo })

      return data
    }, "createSession")
  }

  // Utility methods
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private async calculateChecksum(file: File): Promise<string> {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  private generateSessionToken(): string {
    return crypto.randomUUID()
  }

  private async getClientIP(): Promise<string | null> {
    try {
      const response = await fetch("https://api.ipify.org?format=json")
      const data = await response.json()
      return data.ip
    } catch {
      return null
    }
  }

  private async getLocationData(): Promise<Record<string, any>> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({})
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          })
        },
        () => resolve({}),
        { timeout: 5000 },
      )
    })
  }

  private initializeCleanup(): void {
    // Clean cache every 5 minutes
    setInterval(() => {
      const now = Date.now()
      for (const [key, value] of this.cache.entries()) {
        if (now - value.timestamp > value.ttl) {
          this.cache.delete(key)
        }
      }
    }, 300000)

    // Clean request queue every minute
    setInterval(() => {
      this.requestQueue.clear()
    }, 60000)
  }

  // Health check
  async healthCheck(): Promise<{ status: string; latency: number; features: Record<string, boolean> }> {
    const start = Date.now()

    try {
      const { error } = await this.supabase.from("profiles").select("id").limit(1)
      const latency = Date.now() - start

      return {
        status: error ? "unhealthy" : "healthy",
        latency,
        features: {
          caching: this.config.enableCaching,
          analytics: this.config.enableAnalytics,
          retries: this.config.maxRetries > 0,
        },
      }
    } catch (error) {
      return {
        status: "error",
        latency: Date.now() - start,
        features: {
          caching: this.config.enableCaching,
          analytics: this.config.enableAnalytics,
          retries: this.config.maxRetries > 0,
        },
      }
    }
  }
}

// Global instance
let globalBackend: ScalableBackend | null = null

export function getScalableBackend(): ScalableBackend {
  if (!globalBackend) {
    globalBackend = new ScalableBackend({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      enableCaching: true,
      enableAnalytics: true,
      maxRetries: 3,
    })
  }
  return globalBackend
}

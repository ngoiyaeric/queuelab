"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/components/supabase-provider"
import type { Profile, ConnectedAccount } from "@/lib/types"

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { supabase, isConfigured } = useSupabase()

  useEffect(() => {
    async function fetchProfile() {
      if (!isConfigured || !supabase) {
        setError("Supabase is not configured. Please check your environment variables.")
        setLoading(false)
        return
      }

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
          setError("Not authenticated")
          setLoading(false)
          return
        }

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError) {
          // If profile doesn't exist, create a basic one
          if (profileError.code === "PGRST116") {
            const newProfile = {
              id: user.id,
              email: user.email,
              display_name: user.email?.split("@")[0] || "User",
              avatar_url: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }

            const { error: insertError } = await supabase.from("profiles").insert(newProfile)

            if (!insertError) {
              setProfile(newProfile)
            } else {
              setError("Failed to create profile")
            }
          } else {
            setError("Failed to fetch profile")
          }
          setLoading(false)
          return
        }

        setProfile(profileData)

        // Fetch connected accounts (optional - won't fail if table doesn't exist)
        const { data: accountsData } = await supabase.from("connected_accounts").select("*").eq("user_id", user.id)

        setConnectedAccounts(accountsData || [])
        setLoading(false)
      } catch (err) {
        console.error("Profile fetch error:", err)
        setError("An unexpected error occurred")
        setLoading(false)
      }
    }

    fetchProfile()
  }, [supabase, isConfigured])

  return { profile, connectedAccounts, loading, error }
}

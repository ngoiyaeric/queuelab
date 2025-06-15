"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"

type SupabaseContext = {
  supabase: SupabaseClient | null
  isConfigured: boolean
}

const Context = createContext<SupabaseContext>({
  supabase: null,
  isConfigured: false,
})

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (supabaseUrl && supabaseAnonKey) {
        const client = createClient(supabaseUrl, supabaseAnonKey)
        setSupabase(client)
        setIsConfigured(true)
      } else {
        console.warn("Supabase environment variables not configured")
        setIsConfigured(false)
      }
    } catch (error) {
      console.error("Failed to initialize Supabase:", error)
      setIsConfigured(false)
    }
  }, [])

  return <Context.Provider value={{ supabase, isConfigured }}>{children}</Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}

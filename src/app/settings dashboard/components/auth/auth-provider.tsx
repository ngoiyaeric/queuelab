"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase"

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  isConfigured: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const configured = isSupabaseConfigured()
  const supabase = getSupabaseClient()

  useEffect(() => {
    if (!configured || !supabase) {
      // Demo mode - create a mock user immediately
      setUser({
        id: "demo-user",
        email: "demo@queuecx.com",
        user_metadata: {
          display_name: "Demo User",
        },
      } as User)
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [configured, supabase])

  const signIn = async (email: string, password: string) => {
    if (!configured || !supabase) {
      // Demo mode - simulate successful sign in
      setUser({
        id: "demo-user",
        email: email,
        user_metadata: {
          display_name: email.split("@")[0],
        },
      } as User)
      return {}
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error: error?.message }
  }

  const signUp = async (email: string, password: string) => {
    if (!configured || !supabase) {
      // Demo mode - simulate successful sign up
      setUser({
        id: "demo-user",
        email: email,
        user_metadata: {
          display_name: email.split("@")[0],
        },
      } as User)
      return {}
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { error: error?.message }
  }

  const signOut = async () => {
    if (!configured || !supabase) {
      // Demo mode - just clear user
      setUser(null)
      setSession(null)
      return
    }

    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured: configured,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Enhanced Supabase client with proper typing and error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
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
      "x-application-name": "queuecx-dashboard",
    },
  },
})

// Enhanced authentication functions for scale
export async function signUpWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Sign up error:", error)
    return { data: null, error: error as Error }
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Sign in error:", error)
    return { data: null, error: error as Error }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error("Sign out error:", error)
    return { error: error as Error }
  }
}

// Enhanced session management
export async function getSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    if (error) throw error
    return { session, error: null }
  } catch (error) {
    console.error("Get session error:", error)
    return { session: null, error: error as Error }
  }
}

// User profile management with caching
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Get user profile error:", error)
    return { data: null, error: error as Error }
  }
}

// File management functions
export async function uploadUserFile(userId: string, appName: string, file: File) {
  try {
    // Upload file to storage
    const fileExt = file.name.split(".").pop()
    const fileName = `${userId}/${appName}/${Date.now()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage.from("user-files").upload(fileName, file)

    if (uploadError) throw uploadError

    // Save file metadata to database
    const { data, error } = await supabase
      .from("user_files")
      .insert({
        user_id: userId,
        app_name: appName,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        file_path: uploadData.path,
      })
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Upload file error:", error)
    return { data: null, error: error as Error }
  }
}

export async function getUserFiles(userId: string, appName?: string) {
  try {
    let query = supabase.from("user_files").select("*").eq("user_id", userId).order("created_at", { ascending: false })

    if (appName) {
      query = query.eq("app_name", appName)
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Get user files error:", error)
    return { data: null, error: error as Error }
  }
}

export async function deleteUserFile(userId: string, fileId: string) {
  try {
    // Get file info first
    const { data: fileData, error: fetchError } = await supabase
      .from("user_files")
      .select("file_path")
      .eq("id", fileId)
      .eq("user_id", userId)
      .single()

    if (fetchError) throw fetchError

    // Delete from storage
    const { error: storageError } = await supabase.storage.from("user-files").remove([fileData.file_path])

    if (storageError) throw storageError

    // Delete from database
    const { error } = await supabase.from("user_files").delete().eq("id", fileId).eq("user_id", userId)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error("Delete file error:", error)
    return { error: error as Error }
  }
}

// Context management
export async function getUserContext(userId: string) {
  try {
    const { data, error } = await supabase.from("user_context").select("*").eq("user_id", userId).single()

    if (error && error.code !== "PGRST116") throw error
    return { data, error: null }
  } catch (error) {
    console.error("Get user context error:", error)
    return { data: null, error: error as Error }
  }
}

export async function updateUserContext(userId: string, systemPrompt: string, notes?: string) {
  try {
    const { data, error } = await supabase
      .from("user_context")
      .upsert({
        user_id: userId,
        system_prompt: systemPrompt,
        notes: notes || "",
      })
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Update user context error:", error)
    return { data: null, error: error as Error }
  }
}

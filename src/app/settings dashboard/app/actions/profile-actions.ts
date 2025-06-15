"use server"

import { revalidatePath } from "next/cache"

// Mock functions for demo purposes - replace with your actual data source
export async function updateProfile(formData: FormData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const displayName = formData.get("displayName") as string

  if (!displayName || displayName.length > 32) {
    return { error: "Display name must be between 1 and 32 characters" }
  }

  // Here you would update your actual data source
  // For now, just return success
  revalidatePath("/settings")
  return { success: true, message: "Profile updated successfully" }
}

export async function uploadAvatar(formData: FormData) {
  // Simulate upload delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const file = formData.get("avatar") as File

  if (!file || file.size === 0) {
    return { error: "No file selected" }
  }

  if (file.size > 2 * 1024 * 1024) {
    return { error: "File size must be less than 2MB" }
  }

  if (!file.type.startsWith("image/")) {
    return { error: "File must be an image" }
  }

  // Here you would upload to your actual storage service
  // For now, just return success
  revalidatePath("/settings")
  return { success: true, message: "Avatar updated successfully" }
}

export async function updatePersonalization(data: { systemPrompt: string; notes: string }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (data.systemPrompt.length > 1000) {
    return { error: "System prompt must be 1000 characters or less" }
  }

  if (data.notes.length > 2000) {
    return { error: "Notes must be 2000 characters or less" }
  }

  // Here you would save to your actual data source
  // For now, just return success
  revalidatePath("/settings")
  return { success: true, message: "Personalization settings updated successfully" }
}

export async function searchActivity(query: string) {
  // Simulate search delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock search results
  const mockResults = [
    {
      id: "1",
      title: "QueueCX Integration Setup",
      description: "Configured QueueCX integration with production environment",
      activity_type: "session",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Environment Aware Configuration",
      description: "Updated environment awareness settings for better monitoring",
      activity_type: "document",
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "3",
      title: "Fluidity Index Analysis",
      description: "Analyzed system fluidity metrics and performance indicators",
      activity_type: "meeting",
      created_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ]

  if (!query) {
    return { results: mockResults }
  }

  const filtered = mockResults.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase()),
  )

  return { results: filtered }
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchDialog } from "@/components/search-dialog"
import { AppPicker } from "@/components/app-picker"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Search, Activity, MessageSquare, SettingsIcon, HelpCircle, Download, Sun, Moon, LogOut } from "lucide-react"
import Image from "next/image"

export default function DashboardPage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, signOut, loading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(newTheme)

    toast({
      title: "Theme Changed",
      description: `Switched to ${newTheme} mode`,
    })
  }

  const handleSignOut = async () => {
    await signOut()
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully",
    })
    // Remove the router.push("/landing") line
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "Demo User"

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <>
      <div
        className={`flex min-h-screen ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
        }`}
      >
        {/* Enhanced Sidebar */}
        <div
          className={`w-64 ${
            theme === "dark" ? "bg-black/20 border-white/10" : "bg-white/30 border-black/10"
          } backdrop-blur-xl border-r flex flex-col`}
        >
          <div className={`p-4 border-b ${theme === "dark" ? "border-white/10" : "border-black/10"}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image
                  src="/logo.png"
                  alt="QueueCX"
                  width={32}
                  height={32}
                  className={theme === "dark" ? "invert" : ""}
                />
              </div>
              <span className={`font-semibold text-lg ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                QueueCX
              </span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 px-3 py-2 h-auto ${
                theme === "dark"
                  ? "text-slate-300 hover:bg-white/10 hover:text-white"
                  : "text-slate-700 hover:bg-black/10 hover:text-slate-900"
              } backdrop-blur-sm transition-all duration-200`}
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Button>

            <div className="space-y-1 pt-4">
              <SidebarItem icon={Activity} label="My Activity" active theme={theme} onClick={() => {}} />
              <SidebarItem
                icon={MessageSquare}
                label="Context"
                nested
                theme={theme}
                onClick={() => handleNavigation("/context")}
              />
              <SidebarItem
                icon={SettingsIcon}
                label="Settings"
                theme={theme}
                onClick={() => handleNavigation("/settings")}
              />
            </div>
          </nav>

          <div className={`p-4 border-t ${theme === "dark" ? "border-white/10" : "border-black/10"} space-y-2`}>
            <SidebarItem icon={HelpCircle} label="Help Center" theme={theme} onClick={() => {}} />
            <SidebarItem icon={Download} label="Download QueueCX" theme={theme} onClick={() => {}} />

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback
                    className={`${
                      theme === "dark" ? "bg-blue-600/50 text-white" : "bg-blue-600/70 text-white"
                    } backdrop-blur-sm`}
                  >
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {displayName}
                  </p>
                  <p className={`text-xs truncate ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {user?.email || "demo@queuecx.com"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleThemeToggle}
                  className={`${
                    theme === "dark"
                      ? "text-slate-300 hover:text-white hover:bg-white/10"
                      : "text-slate-700 hover:text-slate-900 hover:bg-black/10"
                  } transition-all duration-200`}
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className={`${
                    theme === "dark"
                      ? "text-slate-300 hover:text-white hover:bg-white/10"
                      : "text-slate-700 hover:text-slate-900 hover:bg-black/10"
                  } transition-all duration-200`}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  Good morning, {displayName}
                </h1>
                <p className={`text-lg ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Welcome back to your QueueCX dashboard
                </p>
              </div>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto mb-16">
              <div
                className="relative cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
                onClick={() => setSearchOpen(true)}
              >
                <Search
                  className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 ${
                    theme === "dark"
                      ? "text-slate-400 group-hover:text-slate-300"
                      : "text-slate-600 group-hover:text-slate-500"
                  } transition-colors duration-200`}
                />
                <Input
                  placeholder="Search your activity, files, and more..."
                  className={`pl-16 pr-6 py-6 text-lg rounded-2xl shadow-lg cursor-pointer border-2 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-black/20 border-white/10 text-white placeholder:text-slate-400 hover:bg-black/30 hover:border-white/20"
                      : "bg-white/60 border-black/10 text-slate-900 placeholder:text-slate-600 hover:bg-white/80 hover:border-black/20"
                  } backdrop-blur-xl group-hover:shadow-xl`}
                  readOnly
                />
                <div
                  className={`absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-3 text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  <span>Type</span>
                  <kbd
                    className={`px-3 py-1 rounded-lg text-xs font-mono ${
                      theme === "dark" ? "bg-black/20 text-slate-300" : "bg-white/40 text-slate-700"
                    } backdrop-blur-sm`}
                  >
                    #
                  </kbd>
                  <span>for summaries,</span>
                  <kbd
                    className={`px-3 py-1 rounded-lg text-xs font-mono ${
                      theme === "dark" ? "bg-black/20 text-slate-300" : "bg-white/40 text-slate-700"
                    } backdrop-blur-sm`}
                  >
                    ?
                  </kbd>
                  <span>for help</span>
                </div>
              </div>
            </div>

            {/* App Picker */}
            <AppPicker />
          </div>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
  nested?: boolean
  theme: string
  onClick: () => void
}

function SidebarItem({ icon: Icon, label, active = false, nested = false, theme, onClick }: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`
      flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-all duration-200
      ${
        active
          ? theme === "dark"
            ? "bg-blue-600/30 text-white font-medium backdrop-blur-sm"
            : "bg-green-600/20 text-slate-900 font-medium backdrop-blur-sm"
          : theme === "dark"
            ? "text-slate-300 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm"
            : "text-slate-700 hover:bg-black/10 hover:text-slate-900 hover:backdrop-blur-sm"
      }
      ${nested ? "ml-4" : ""}
    `}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  )
}

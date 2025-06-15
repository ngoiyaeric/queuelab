"use client"

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useToast } from "@/hooks/use-toast"
import { updatePersonalization } from "@/app/actions/profile-actions"
import { Loader2, MessageSquare } from "lucide-react"

interface ContextDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockPersonalization = {
  systemPrompt:
    "You are a helpful AI assistant designed to support productivity and creative work. Please provide clear, actionable responses and ask clarifying questions when needed. Maintain a professional yet friendly tone in all interactions.",
}

export function ContextDialog({ open, onOpenChange }: ContextDialogProps) {
  const [systemPrompt, setSystemPrompt] = useState(mockPersonalization.systemPrompt)
  const [isPending, startTransition] = useTransition()
  const { theme } = useTheme()
  const { toast } = useToast()

  const handleSave = async () => {
    startTransition(async () => {
      const result = await updatePersonalization({ systemPrompt, notes: "" })
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: result.message,
        })
        onOpenChange(false)
      }
    })
  }

  const formatLastSaved = () => {
    return "Auto-saved 2 minutes ago"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`max-w-4xl max-h-[80vh] ${theme === "dark" ? "bg-black/40" : "bg-white/40"} backdrop-blur-xl border-white/10`}
      >
        <DialogHeader>
          <DialogTitle
            className={`flex items-center gap-2 font-mono ${theme === "dark" ? "text-white" : "text-slate-900"}`}
          >
            <MessageSquare className="w-5 h-5" />
            Context
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <p className={`text-base font-mono ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
            This is the default instruction for your personal use.
          </p>

          {/* Large Text Area */}
          <div className="space-y-4">
            <Textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter your personalization instructions here..."
              className={`min-h-[400px] font-mono text-base leading-relaxed p-6 rounded-xl resize-none ${
                theme === "dark"
                  ? "bg-black/10 border-white/10 text-white placeholder:text-slate-400"
                  : "bg-white/50 border-black/10 text-slate-900 placeholder:text-slate-600"
              } backdrop-blur-sm`}
              maxLength={2000}
            />
            <div
              className={`flex items-center justify-between text-sm font-mono ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
            >
              <span>{systemPrompt.length}/2000 characters</span>
              <span>{formatLastSaved()}</span>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isPending}
              className={`font-mono ${
                theme === "dark"
                  ? "bg-blue-600/80 hover:bg-blue-600 text-white"
                  : "bg-green-600/80 hover:bg-green-600 text-white"
              } backdrop-blur-sm`}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Context"
              )}
            </Button>
          </div>

          {/* Additional Instructions */}
          <div
            className={`p-4 rounded-lg ${
              theme === "dark" ? "bg-black/10 border-white/10" : "bg-white/30 border-black/10"
            } backdrop-blur-sm border`}
          >
            <h3 className={`font-mono font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              Tips for effective personalization:
            </h3>
            <ul className={`space-y-1 text-sm font-mono ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
              <li>• Be specific about your preferred communication style</li>
              <li>• Include context about your work or interests</li>
              <li>• Mention any specific formats you prefer for responses</li>
              <li>• Add any constraints or guidelines the AI should follow</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

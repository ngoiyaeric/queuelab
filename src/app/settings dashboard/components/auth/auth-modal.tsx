"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "./auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn, signUp, isConfigured } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = isSignUp ? await signUp(email, password) : await signIn(email, password)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: isConfigured
          ? isSignUp
            ? "Account created successfully!"
            : "Signed in successfully!"
          : "Welcome to demo mode!",
      })
      onOpenChange(false)
      setEmail("")
      setPassword("")
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-black/40 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isConfigured ? (isSignUp ? "Create Account" : "Sign In") : "Demo Mode"}
          </DialogTitle>
        </DialogHeader>

        {!isConfigured && (
          <Alert className="border-yellow-200/20 bg-yellow-50/10">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-200">
              Running in demo mode. Any email/password will work for testing.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-slate-400"
              placeholder={isConfigured ? "Enter your email" : "demo@queuecx.com"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-slate-400"
              placeholder={isConfigured ? "Enter your password" : "any password"}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600/80 hover:bg-blue-600 text-white backdrop-blur-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isSignUp ? "Creating Account..." : "Signing In..."}
              </>
            ) : isConfigured ? (
              isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )
            ) : (
              "Continue in Demo Mode"
            )}
          </Button>

          {isConfigured && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-slate-300 hover:text-white hover:bg-white/10"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

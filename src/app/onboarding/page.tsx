"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
    }
    // @ts-ignore
    if (isLoaded && user?.unsafeMetadata?.onboarded) {
      router.push("/dashboard");
    }
  }, [isLoaded, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await user?.update({
        unsafeMetadata: {
          onboarded: true,
          role,
          organization,
        },
      });
      router.push("/dashboard");
    } catch (err) {
      console.error("Error updating user metadata:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !user) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome to QCX</h1>
          <p className="mt-2 text-muted-foreground text-balance">
            Let&apos;s get you set up with your enterprise quality computer experience.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">What is your role?</Label>
              <Input
                id="role"
                placeholder="e.g. Developer, Designer, Manager"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org">Organization Name</Label>
              <Input
                id="org"
                placeholder="e.g. Acme Corp"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
                className="bg-background border-border"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Setting things up..." : "Complete Setup"}
          </Button>
        </form>
      </div>
    </div>
  );
}

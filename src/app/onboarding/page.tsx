"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const { session } = useClerk();
  const router = useRouter();
  const [role, setRole] = useState("");
  const [orgType, setOrgType] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
    }
    // @ts-ignore
    if (isLoaded && user?.unsafeMetadata?.onboarded) {
      router.push("/base");
    }
  }, [isLoaded, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    try {
      await user?.update({
        unsafeMetadata: {
          onboarded: true,
          role,
          orgType,
        },
      });

      // Force session token refresh so middleware sees updated claims
      await session?.reload();
      
      // Force a window location change to ensure the middleware picks up the new metadata
      window.location.href = "/base";
    } catch (err) {
      console.error("Error updating user metadata:", err);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !user) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      {/* Sky Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/sky-background.webp"
          alt="Sky Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* Glass UI Form */}
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/30 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">Welcome to QCX</h1>
          <p className="mt-2 text-white/80 text-balance">
            Let&apos;s get you set up with your enterprise quality computer experience.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-white/90">What is your role?</Label>
              <Input
                id="role"
                placeholder="e.g. Developer, Designer, Manager"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgType" className="text-white/90">Organization Type</Label>
              <select
                id="orgType"
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:bg-white/20 focus:outline-none transition-all appearance-none"
              >
                <option value="" disabled className="text-black bg-white">Select an option</option>
                <option value="Government" className="text-black bg-white">Government</option>
                <option value="Multi-national" className="text-black bg-white">Multi-national</option>
                <option value="NGO" className="text-black bg-white">NGO</option>
              </select>
            </div>
          </div>
          {formError && <p className="text-red-400 text-sm text-center">{formError}</p>}
          <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20 transition-all" disabled={loading}>
            {loading ? "Setting things up..." : "Complete Setup"}
          </Button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import QIcon from "@/assets/q-logo.png";
import Link from "next/link";

const ROLES = [
    "Researcher",
    "Engineer / Developer",
    "Product / Design",
    "Operations / Business",
    "Student",
    "Other",
];

const USE_CASES = [
    "Earth Observation & Climate",
    "Location Intelligence",
    "Energy & Environment",
    "AI / Machine Learning",
    "Enterprise Analytics",
    "Other",
];

const STEPS = ["Profile", "Use Case", "Goals"];

export default function OnboardingPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const [step, setStep] = useState(0);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [displayName, setDisplayName] = useState(user?.fullName || "");
    const [role, setRole] = useState("");
    const [useCase, setUseCase] = useState("");
    const [goals, setGoals] = useState("");
    const [organization, setOrganization] = useState("");

    if (!isLoaded) {
        return (
            <div className="flex h-screen items-center justify-center bg-stone-50">
                <div className="text-stone-500 animate-pulse">Loading…</div>
            </div>
        );
    }

    if (!user) {
        router.push("/");
        return null;
    }

    const handleNext = () => {
        if (step < STEPS.length - 1) setStep((s) => s + 1);
    };

    const handleBack = () => {
        if (step > 0) setStep((s) => s - 1);
    };

    const handleComplete = async () => {
        setSaving(true);
        setError(null);
        try {
            // Update Clerk name if changed
            if (displayName && displayName !== user.fullName) {
                const parts = displayName.trim().split(" ");
                await user.update({
                    firstName: parts[0],
                    lastName: parts.slice(1).join(" ") || undefined,
                });
            }
            // Store onboarding data in Clerk unsafeMetadata
            await user.update({
                unsafeMetadata: {
                    ...user.unsafeMetadata,
                    onboardingComplete: true,
                    onboardedAt: new Date().toISOString(),
                    role,
                    useCase,
                    goals,
                    organization,
                },
            });
            router.push("/dashboard");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const canAdvance = () => {
        if (step === 0) return displayName.trim().length > 0;
        if (step === 1) return role.length > 0 && useCase.length > 0;
        return true;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/40 to-stone-100 flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/60 bg-white/70 backdrop-blur-sm">
                <Link href="/" className="inline-flex items-center gap-2">
                    <Image src={QIcon} alt="QCX" width={32} height={32} />
                    <span className="font-semibold text-stone-900">QCX</span>
                </Link>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="text-sm text-stone-400 hover:text-stone-700 transition"
                >
                    Skip for now →
                </button>
            </div>

            {/* Main content */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Step indicator */}
                    <div className="flex items-center gap-2 mb-8 justify-center">
                        {STEPS.map((label, i) => (
                            <div key={label} className="flex items-center gap-2">
                                <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                                        i < step
                                            ? "bg-stone-800 text-white"
                                            : i === step
                                            ? "bg-stone-900 text-white ring-4 ring-stone-200"
                                            : "bg-stone-200 text-stone-400"
                                    }`}
                                >
                                    {i < step ? "✓" : i + 1}
                                </div>
                                <span
                                    className={`text-xs font-medium ${
                                        i === step ? "text-stone-900" : "text-stone-400"
                                    }`}
                                >
                                    {label}
                                </span>
                                {i < STEPS.length - 1 && (
                                    <div className={`w-8 h-px ${i < step ? "bg-stone-400" : "bg-stone-200"}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
                        {step === 0 && (
                            <div className="space-y-5">
                                <div>
                                    <h2 className="text-xl font-semibold text-stone-900 mb-1">Welcome to QCX</h2>
                                    <p className="text-sm text-stone-500">Let's set up your profile. This takes under a minute.</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                                        Display name
                                    </label>
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Your name"
                                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                                        Organization <span className="text-stone-300 font-normal normal-case">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={organization}
                                        onChange={(e) => setOrganization(e.target.value)}
                                        placeholder="Company or institution"
                                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300 text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-5">
                                <div>
                                    <h2 className="text-xl font-semibold text-stone-900 mb-1">Your background</h2>
                                    <p className="text-sm text-stone-500">Help us personalise your experience.</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                                        Role
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {ROLES.map((r) => (
                                            <button
                                                key={r}
                                                type="button"
                                                onClick={() => setRole(r)}
                                                className={`px-3 py-2 rounded-xl text-sm font-medium border transition text-left ${
                                                    role === r
                                                        ? "bg-stone-900 text-white border-stone-900"
                                                        : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                                                }`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                                        Primary use case
                                    </label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {USE_CASES.map((u) => (
                                            <button
                                                key={u}
                                                type="button"
                                                onClick={() => setUseCase(u)}
                                                className={`px-3 py-2 rounded-xl text-sm font-medium border transition text-left ${
                                                    useCase === u
                                                        ? "bg-stone-900 text-white border-stone-900"
                                                        : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                                                }`}
                                            >
                                                {u}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-5">
                                <div>
                                    <h2 className="text-xl font-semibold text-stone-900 mb-1">Your goals</h2>
                                    <p className="text-sm text-stone-500">What are you hoping to achieve with QCX? (optional)</p>
                                </div>
                                <div>
                                    <textarea
                                        value={goals}
                                        onChange={(e) => setGoals(e.target.value)}
                                        placeholder="e.g. Monitor environmental changes in my region, build real-time location dashboards…"
                                        rows={5}
                                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300 text-sm resize-none"
                                    />
                                </div>
                                {error && (
                                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                        {error}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-5">
                        <button
                            onClick={handleBack}
                            disabled={step === 0}
                            className="text-sm text-stone-400 hover:text-stone-700 transition disabled:opacity-0"
                        >
                            ← Back
                        </button>
                        {step < STEPS.length - 1 ? (
                            <Button
                                onClick={handleNext}
                                disabled={!canAdvance()}
                                className="bg-stone-900 hover:bg-stone-700 text-white px-6 rounded-xl disabled:opacity-40"
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button
                                onClick={handleComplete}
                                disabled={saving}
                                className="bg-stone-900 hover:bg-stone-700 text-white px-6 rounded-xl disabled:opacity-40"
                            >
                                {saving ? "Saving…" : "Get Started"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
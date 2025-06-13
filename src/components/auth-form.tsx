"use client";

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Ensure this path is correct
import { Button } from "@/components/ui/button"; // Assuming Button component exists
import SiteLogo from "@/assets/logo.svg"; // Assuming this is the correct path to the logo SVG
import BackgroundStars from "@/assets/stars.png"; // Added

export function AuthForm() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAuthAction = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        if (!email || !password) {
            setError("Email and password are required.");
            setLoading(false);
            return;
        }

        // Basic password length check (Supabase has its own password policies too)
        if (!isLoginView && password.length < 6) {
            setError("Password should be at least 6 characters.");
            setLoading(false);
            return;
        }

        try {
            if (isLoginView) {
                // Login
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
                setMessage("Logged in successfully!"); // User/session state will be handled by AuthProvider
                // Modal closure will be handled by AuthProvider detecting session change or via a callback
            } else {
                // Sign Up
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    // options: { emailRedirectTo: window.location.origin } // Optional: for email confirmation redirect
                });
                if (signUpError) throw signUpError;

                if (data.user && data.user.identities && data.user.identities.length === 0) {
                    // This condition might indicate an existing user with unconfirmed email with some providers,
                    // or if email confirmation is turned off and user is created directly but is not "real" yet.
                    // For Supabase, if email confirmation is ON, user exists but session is null until confirmed.
                    // If email confirmation is OFF, user is created and session is typically returned.
                    setMessage("User already exists or sign up issue. If email confirmation is on, please check your email.");
                } else if (data.session) {
                     setMessage("Signed up and logged in successfully!");
                }
                 else {
                    setMessage("Sign up successful! Please check your email to confirm your account.");
                }
            }
        } catch (err: any) {
            setError(err.error_description || err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative overflow-hidden p-6 md:p-8 rounded-lg shadow-xl border border-white/10 text-white w-full max-w-md mx-auto [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" // Modified
            style={{ // Added
                backgroundImage: `url(${BackgroundStars.src})`,
                backgroundPositionY: 'center',
                backgroundSize: 'cover'
            }}
        >
            <div className={"absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(0,0,255,0.3)_15%,rgb(14,0,36,0.7)_78%,transparent)] opacity-80"} /> {/* Added */}

            <div className="relative z-10"> {/* Added wrapper for content */}
                <div className="flex justify-center mb-6"> {/* Container for centering the logo */}
                    <SiteLogo className="h-12 w-auto text-white" /> {/* Adjust size (h-12) and color if needed. SVGs might inherit text color. */}
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                    {isLoginView ? 'Queue In' : 'Queue Up'}
                </h2>
                {/* New Subtitle Added Below */}
                <p className="text-center text-sm text-white/70 mb-6 -mt-4">
                    Quality Computer Experiences
                </p>

                {error && <p className="mb-4 text-red-400 bg-red-900/40 p-3 rounded-md text-center text-sm">{error}</p>}
                {message && <p className="mb-4 text-green-400 bg-green-900/40 p-3 rounded-md text-center text-sm">{message}</p>}

                <form onSubmit={handleAuthAction} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2.5 bg-gray-700/60 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="you@example.com"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2.5 bg-gray-700/60 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="••••••••"
                            disabled={loading}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 disabled:opacity-60 transition-colors duration-150" // Applied light green styling
                    >
                        {loading ? (isLoginView ? 'Queueing In...' : 'Queueing Up...') : (isLoginView ? 'Queue In' : 'Queue Up')}
                    </Button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setIsLoginView(!isLoginView);
                                setError(null);
                                setMessage(null);
                            }}
                            className="text-sm text-green-400 hover:text-green-300 hover:underline focus:outline-none" // Changed to green
                            disabled={loading}
                        >
                            {isLoginView ? 'Need an account? Queue Up' : 'Already have an account? Queue In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

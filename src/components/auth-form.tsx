"use client";

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from "@/components/ui/button";
import SiteLogo from "@/assets/Logo-modified.png";
import BackgroundStars from "@/assets/stars.png";
import { useRouter } from 'next/navigation';

export function AuthForm() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://app.queue.cx/auth/callback'
            }
        });
        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

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

        if (!isLoginView && password.length < 6) {
            setError("Password should be at least 6 characters.");
            setLoading(false);
            return;
        }

        try {
            if (isLoginView) {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
                setMessage("Logged in successfully!");
                router.push('/dashboard');
            } else {
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (signUpError) throw signUpError;

                if (data.user && data.user.identities && data.user.identities.length === 0) {
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
            className="relative overflow-hidden p-6 md:p-8 rounded-lg shadow-xl border border-white/10 text-white w-full max-w-md mx-auto [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
            style={{
                backgroundImage: `url(${BackgroundStars.src})`,
                backgroundPositionY: 'center',
                backgroundSize: 'cover'
            }}
        >
            <div className={"absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(0,0,255,0.3)_15%,rgb(14,0,36,0.7)_78%,transparent)] opacity-80"} />

            <div className="relative z-10">
                <div className="flex justify-center mb-6">
                    <img src={SiteLogo.src} alt="Site Logo" className="h-12 w-auto" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                    {isLoginView ? 'Queue In' : 'Queue Up'}
                </h2>
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
                        className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 disabled:opacity-60 transition-colors duration-150"
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
                            className="text-sm text-green-400 hover:text-green-300 hover:underline focus:outline-none"
                            disabled={loading}
                        >
                            {isLoginView ? 'Need an account? Queue Up' : 'Already have an account? Queue In'}
                        </button>
                    </div>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                    </div>
                </div>

                <div>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        aria-label="Sign in with Google"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}

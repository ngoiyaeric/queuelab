"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { Button } from "@/components/ui/button";
import SiteLogo from "@/assets/logo.svg";
import BackgroundStars from "@/assets/stars.png";

export function AuthForm() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onAuthSuccess = (successMessage: string) => {
        setMessage(successMessage);
        router.push('/dashboard');
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            onAuthSuccess("Logged in with Google successfully!");
        } catch (err: any) {
             setError(err.message || "An unexpected error occurred during Google sign-in.");
             setLoading(false);
        }
    }

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
                // Login
                await signInWithEmailAndPassword(auth, email, password);
                onAuthSuccess("Logged in successfully!");
            } else {
                // Sign Up
                await createUserWithEmailAndPassword(auth, email, password);
                onAuthSuccess("Signed up and logged in successfully!");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
            setLoading(false);
        }
    };

    return (
        <div
            className="relative overflow-hidden p-6 md:p-8 rounded-lg shadow-xl border border-white/10 text-foreground w-full max-w-md mx-auto [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
            style={{
                backgroundImage: `url(${BackgroundStars.src})`,
                backgroundPositionY: 'center',
                backgroundSize: 'cover'
            }}
        >
            <div className={"absolute inset-0 bg-black/60"} />

            <div className="relative z-10">
                <div className="flex justify-center mb-6">
                    <SiteLogo className="h-12 w-auto text-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                    {isLoginView ? 'Queue In' : 'Queue Up'}
                </h2>
                <p className="text-center text-sm text-muted-foreground mb-6 -mt-4">
                    Quality Computer Experiences
                </p>

                {error && <p className="mb-4 text-red-400 bg-red-900/40 p-3 rounded-md text-center text-sm">{error}</p>}
                {message && <p className="mb-4 text-green-400 bg-green-900/40 p-3 rounded-md text-center text-sm">{message}</p>}

                <form onSubmit={handleAuthAction} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-md shadow-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 sm:text-sm"
                            placeholder="you@example.com"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-md shadow-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 sm:text-sm"
                            placeholder="••••••••"
                            disabled={loading}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white disabled:opacity-60 transition-colors duration-150"
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
                            className="text-sm text-gray-400 hover:text-white hover:underline focus:outline-none"
                            disabled={loading}
                        >
                            {isLoginView ? 'Need an account? Queue Up' : 'Already have an account? Queue In'}
                        </button>
                    </div>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                    </div>
                </div>

                <div>
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 border-white/20 text-white hover:bg-white/10"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        type="button"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </Button>
                </div>
            </div>
        </div>
    );
}

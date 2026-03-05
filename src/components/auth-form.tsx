"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth } from '@/lib/firebase/config';
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
            const auth = getFirebaseAuth();
            if (!auth) {
                setError("Firebase is not properly initialized. Please refresh the page and try again.");
                setLoading(false);
                return;
            }
            
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
            const auth = getFirebaseAuth();
            if (!auth) {
                setError("Firebase is not properly initialized. Please refresh the page and try again.");
                setLoading(false);
                return;
            }

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
                    <SiteLogo className="h-12 w-auto text-white" />
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
                        className="w-full mb-3"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                    >
                        Google
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full"
                        asChild
                    >
                        <a href="https://x.com/tryqcx" target="_blank" rel="noopener noreferrer">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setMessage('Signup failed: ' + error.message);
      } else if (data.user) {
        setMessage('Signup successful! Please check your email to confirm your account.');
        // console.log('User signed up:', data.user);
        // Potentially redirect or give further instructions
      } else {
         setMessage('Signup failed. Please try again. If the user already exists, try logging in.');
      }
    } catch (error) {
      setMessage('An unexpected error occurred: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <SiteHeader />
      <section className="py-20 md:py-24">
        <div className="container mx-auto max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-center">Create Account</h1>
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-transparent border border-white/30 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/70">
                Password (at least 6 characters)
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-transparent border border-white/30 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
          <p className="mt-8 text-center text-sm text-white/70">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              Login
            </Link>
          </p>
        </div>
      </section>
      <SiteFooter />
    </React.Fragment>
  );
}

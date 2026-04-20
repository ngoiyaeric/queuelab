"use client"
import Link from 'next/link';
import { X } from 'lucide-react';
import MapAnimation from '@/components/map-animation';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden bg-gray-50">

      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
        <MapAnimation onClose={() => {}} />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[420px] z-10 relative">
        {/* Outer Card */}
        <div className="bg-white rounded-[24px] p-10 shadow-2xl relative border border-gray-100">

          {/* Close Button X */}
          <Link href="/">
             <button className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors z-50">
                <X className="w-6 h-6" />
             </button>
          </Link>

          {/* Form Content */}
          <div className="relative z-10 flex flex-col items-center">

            <div className="flex flex-col items-center mb-10 w-full">
              <h1 className="text-4xl font-bold text-black tracking-tight mb-2">Queue In</h1>
              <p className="text-gray-500 text-sm font-medium">Quality Computer Experiences</p>
            </div>

            <form className="w-full space-y-6 mb-8">

              {/* Email Field */}
              <div className="space-y-2 flex flex-col items-start w-full">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-gray-50 text-black placeholder:text-gray-400 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black/5 border border-gray-200 transition-all text-sm"
                  defaultValue="you@example.com"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2 flex flex-col items-start w-full">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-50 text-black placeholder:text-gray-400 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black/5 border border-gray-200 transition-all text-sm"
                  defaultValue="password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="w-full bg-black hover:bg-gray-800 text-white font-bold rounded-xl px-4 py-4 mt-4 transition-all text-sm shadow-lg"
              >
                Queue In
              </button>

            </form>

            {/* Links below the button */}
            <div className="mb-8 w-full text-center">
              <Link href="#" className="text-gray-500 hover:text-black hover:underline text-sm font-semibold transition-colors">
                Need an account? Queue Up
              </Link>
            </div>

            {/* Divider */}
            <div className="relative w-full flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center w-full">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest px-4 bg-white">
                <span className="text-gray-400 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* X (Twitter) Login Button */}
            <button className="w-full bg-white hover:bg-gray-50 text-black font-bold rounded-xl px-4 py-3.5 flex items-center justify-center transition-all shadow-sm border border-gray-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.005 4.15H5.059z" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

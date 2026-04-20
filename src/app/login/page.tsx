"use client"
import Link from 'next/link';
import { X } from 'lucide-react';
import MapAnimation from '@/components/map-animation';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>

      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
        <MapAnimation onClose={() => {}} />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[420px] z-10 relative">
        {/* Outer Card */}
        <div className="bg-[#2a2a2a] rounded-[16px] p-2 shadow-2xl relative border border-white/10">

          {/* Close Button X */}
          <Link href="/">
             <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-50">
                <X className="w-5 h-5" />
             </button>
          </Link>

          {/* Inner Card */}
          <div className="bg-[#1f1f1f] rounded-[12px] relative overflow-hidden h-[450px] flex flex-col justify-between border border-white/5">

            {/* Form Content */}
            <div className="relative z-10 px-8 py-8 flex flex-col items-center h-full">

              <div className="flex flex-col items-center mt-2 mb-6 w-full">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Queue In</h1>
                <p className="text-gray-400 text-[12px] font-medium">Quality Computer Experiences</p>
              </div>

              <form className="w-full space-y-3 mb-4">

                {/* Email Field */}
                <div className="space-y-1 flex flex-col items-start w-full">
                  <label className="text-xs text-gray-400 font-medium ml-1">Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-[#2d2d2d] text-white placeholder:text-gray-500 rounded-[6px] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10 shadow-inner text-sm"
                    defaultValue="you@example.com"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1 flex flex-col items-start w-full mt-2">
                  <label className="text-xs text-gray-400 font-medium ml-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#2d2d2d] text-white placeholder:text-gray-500 rounded-[6px] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10 shadow-inner text-sm"
                    defaultValue="password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  className="w-full bg-white hover:bg-gray-200 text-black font-semibold rounded-[6px] px-4 py-2.5 mt-4 transition-colors text-sm shadow-md"
                >
                  Queue In
                </button>

              </form>

              {/* Links below the button */}
              <div className="mb-4 w-full text-center">
                <Link href="#" className="text-gray-400 hover:text-white hover:underline text-xs font-semibold">
                  Need an account? Queue Up
                </Link>
              </div>

              <div className="flex-grow"></div>

              {/* Divider */}
              <div className="relative w-full flex items-center justify-center mb-4">
                <div className="absolute inset-0 flex items-center w-full">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm px-3 bg-[#1f1f1f]">
                  <span className="text-gray-400 bg-[#2a2a2a] px-2 py-0.5 rounded-[4px] text-[10px] font-semibold tracking-wide border border-white/10">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* X (Twitter) Login Button */}
              <button className="w-full bg-white hover:bg-gray-100 text-black font-semibold rounded-[6px] px-4 py-2 flex items-center justify-center transition-colors shadow-sm border border-gray-300">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.005 4.15H5.059z" />
                </svg>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

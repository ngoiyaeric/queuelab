import Link from 'next/link';
import { X } from 'lucide-react';
import MapAnimation from '@/components/map-animation';

export const metadata = {
  title: 'Login - QCX',
  description: 'Login to Quality Computer Experiences',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#4f5b5a] flex items-center justify-center p-4 font-sans relative overflow-hidden">

      {/* Background decoration to match the screenshot faintly */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex items-center justify-center">
        <MapAnimation onClose={() => {}} />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[420px] z-10 relative">
        {/* Outer Light Gray Card */}
        <div className="bg-[#dcdcdc] rounded-[16px] p-2 shadow-2xl relative">

          {/* Close Button X (top right inside the outer card) */}
          <Link href="/">
             <button className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors z-50">
                <X className="w-5 h-5" />
             </button>
          </Link>

          {/* Inner Dark Card */}
          <div className="bg-[#8b9c9b] rounded-[12px] relative overflow-hidden h-[450px] flex flex-col justify-between">

            {/* Green Radial Glow at the top center */}
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#22c55e] opacity-[0.4] blur-[60px] rounded-full pointer-events-none"></div>

            {/* Form Content */}
            <div className="relative z-10 px-8 py-8 flex flex-col items-center h-full">

              <div className="flex flex-col items-center mt-2 mb-6 w-full">
                <h1 className="text-3xl font-bold text-black tracking-tight mb-1">Queue In</h1>
                <p className="text-[#4a5554] text-[12px] font-medium">Quality Computer Experiences</p>
              </div>

              <form className="w-full space-y-3 mb-4">

                {/* Email Field */}
                <div className="space-y-1 flex flex-col items-start w-full">
                  <label className="text-xs text-[#3b4344] font-medium ml-1">Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-[#cbd5e1] text-gray-900 placeholder:text-gray-500 rounded-[6px] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#22c55e] border border-[#a3b1b0] shadow-inner text-sm"
                    defaultValue="you@example.com"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1 flex flex-col items-start w-full mt-2">
                  <label className="text-xs text-[#3b4344] font-medium ml-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#cbd5e1] text-gray-900 placeholder:text-gray-500 rounded-[6px] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#22c55e] border border-[#a3b1b0] shadow-inner text-sm"
                    defaultValue="password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold rounded-[6px] px-4 py-2.5 mt-4 transition-colors text-sm shadow-md"
                >
                  Queue In
                </button>

              </form>

              {/* Links below the button */}
              <div className="mb-4 w-full text-center">
                <Link href="#" className="text-[#22c55e] hover:underline text-xs font-semibold">
                  Need an account? Queue Up
                </Link>
              </div>

              <div className="flex-grow"></div>

              {/* Divider */}
              <div className="relative w-full flex items-center justify-center mb-4">
                <div className="absolute inset-0 flex items-center w-full">
                  <div className="w-full border-t border-gray-400"></div>
                </div>
                <div className="relative flex justify-center text-sm px-3 bg-[#8b9c9b]">
                  <span className="text-black bg-white px-2 py-0.5 rounded-[4px] text-[10px] font-semibold tracking-wide">
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

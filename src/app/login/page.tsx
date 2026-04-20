"use client"
import Link from 'next/link';
import { X } from 'lucide-react';
import MapAnimation from '@/components/map-animation';
import { AuthForm } from '@/components/auth-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden bg-gray-50">

      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
        <MapAnimation onClose={() => {}} />
      </div>

      {/* Close Button */}
      <Link href="/" className="absolute top-6 right-6 z-50 text-gray-400 hover:text-black transition-colors">
        <X className="w-6 h-6" />
      </Link>

      {/* Auth Form */}
      <div className="w-full max-w-[420px] z-10 relative">
        <AuthForm />
      </div>
    </div>
  );
}
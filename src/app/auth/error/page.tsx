"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "An authentication error occurred";

  return (
    <>
      <SiteHeader />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-red-500">Authentication Error</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We encountered a problem while trying to sign you in.
            </p>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-800 dark:text-red-200">
              {error}
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full px-6 py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Return to Home
            </Link>
            <Link
              href="/"
              className="block w-full px-6 py-3 text-center border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors"
            >
              Try Again
            </Link>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>If this problem persists, please contact support.</p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}

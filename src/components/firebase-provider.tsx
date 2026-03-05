"use client";

import { useEffect } from 'react';
import { analytics } from '@/lib/firebase/config'; // Adjust path if needed

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Analytics is initialized in config.ts conditionally
    if (analytics) {
        console.log("Firebase Analytics is ready");
    }
  }, []);

  return <>{children}</>;
}

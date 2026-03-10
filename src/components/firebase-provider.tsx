"use client";

import { useEffect } from 'react';
import { getAnalyticsAsync, getMessagingAsync } from '@/lib/firebase/config'; // Adjust path if needed

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Analytics is initialized in config.ts conditionally
    getAnalyticsAsync().then((analytics) => {
        if (analytics) {
            console.log("Firebase Analytics is ready");
        }
    });

    getMessagingAsync().then((messaging) => {
        if (messaging) {
            console.log("Firebase Messaging is ready");
        }
    });
  }, []);

  return <>{children}</>;
}

"use client";

import { useEffect } from 'react';
import { getAnalyticsAsync, getMessagingAsync } from '@/lib/firebase/config';

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize Firebase services on client side
    if (typeof window === "undefined") {
      return;
    }

    // Analytics is initialized in config.ts conditionally
    getAnalyticsAsync().then((analytics) => {
        if (analytics) {
            console.log("Firebase Analytics is ready");
        }
    }).catch((error) => {
        console.warn("Failed to initialize Firebase Analytics:", error);
    });

    getMessagingAsync().then((messaging) => {
        if (messaging) {
            console.log("Firebase Messaging is ready");
        }
    }).catch((error) => {
        console.warn("Failed to initialize Firebase Messaging:", error);
    });
  }, []);

  return <>{children}</>;
}

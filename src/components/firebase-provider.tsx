"use client";

import { useEffect } from 'react';
import { getAnalyticsAsync, getMessagingAsync } from '@/lib/firebase/config'; // Adjust path if needed

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Delay Firebase initialization to improve initial load performance
    const initFirebase = async () => {
      // Wait for the page to be fully loaded
      if (document.readyState !== 'complete') {
        await new Promise(resolve => window.addEventListener('load', resolve, { once: true }));
      }
      
      // Further delay to ensure main thread is free
      setTimeout(async () => {
        try {
          const analytics = await getAnalyticsAsync();
          if (analytics) console.log("Firebase Analytics is ready");
          
          // Messaging is heavy and triggers permission prompt, maybe only init on specific pages or user action
          // For now, we keep it but with a significant delay
          const messaging = await getMessagingAsync();
          if (messaging) console.log("Firebase Messaging is ready");
        } catch (error) {
          console.error("Firebase lazy init failed", error);
        }
      }, 3000);
    };

    initFirebase();
  }, []);

  return <>{children}</>;
}

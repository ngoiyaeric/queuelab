import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check for missing environment variables only on the client side to avoid build-time errors
// if they are intended to be provided at runtime, but usually for Next.js they should be there.
if (typeof window !== "undefined") {
  const missingVars = Object.entries(firebaseConfig)
    .filter(([key, value]) => !value && key !== 'measurementId') // measurementId is often optional
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.warn(`Missing Firebase environment variables: ${missingVars.join(', ')}`);
  }
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Conditionally initialize analytics and messaging only on the client
let analyticsInstance: any = null;
let messagingInstance: any = null;

export const getAnalyticsAsync = async () => {
  if (analyticsInstance) return analyticsInstance;
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      analyticsInstance = getAnalytics(app);
    }
  }
  return analyticsInstance;
};

import { getToken } from "firebase/messaging";

export const getMessagingAsync = async () => {
  if (messagingInstance) return messagingInstance;
  if (typeof window !== "undefined") {
    try {
      messagingInstance = getMessaging(app);

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        if (process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY) {
          const currentToken = await getToken(messagingInstance, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
          });
          if (currentToken) {
            console.log('FCM Token acquired');
            // TODO: send token to backend for persistence
          } else {
            console.log('No registration token available.');
          }
        } else {
          console.warn('NEXT_PUBLIC_FIREBASE_VAPID_KEY is missing');
        }
      } else {
        console.log('Notification permission not granted');
      }
    } catch(e) {
      console.log('Firebase messaging not supported or error getting token', e);
    }
  }
  return messagingInstance;
};

export { app, auth };

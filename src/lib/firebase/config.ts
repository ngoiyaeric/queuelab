import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// Firebase configuration - only initialize on client side
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate that we have the minimum required config
const hasRequiredConfig = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

// Initialize Firebase only on client side
let app: any = null;
let auth: any = null;

const initializeFirebase = () => {
  if (typeof window === "undefined") {
    // Don't initialize Firebase on the server
    return null;
  }

  if (!hasRequiredConfig) {
    console.warn("Firebase configuration is incomplete. Please check your environment variables.");
    return null;
  }

  try {
    // Check if Firebase is already initialized
    if (getApps().length > 0) {
      app = getApp();
    } else {
      app = initializeApp(firebaseConfig);
    }
    auth = getAuth(app);
    return { app, auth };
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return null;
  }
};

// Lazy initialization
const getFirebaseApp = () => {
  if (typeof window === "undefined") return null;
  if (!app) {
    const result = initializeFirebase();
    if (result) {
      app = result.app;
      auth = result.auth;
    }
  }
  return app;
};

const getFirebaseAuth = () => {
  if (typeof window === "undefined") return null;
  if (!auth) {
    const result = initializeFirebase();
    if (result) {
      app = result.app;
      auth = result.auth;
    }
  }
  return auth;
};

// Conditionally initialize analytics and messaging only on the client
let analyticsInstance: any = null;
let messagingInstance: any = null;

export const getAnalyticsAsync = async () => {
  if (analyticsInstance) return analyticsInstance;
  if (typeof window !== "undefined") {
    try {
      const firebaseApp = getFirebaseApp();
      if (!firebaseApp) return null;
      
      const supported = await isSupported();
      if (supported) {
        analyticsInstance = getAnalytics(firebaseApp);
      }
    } catch (error) {
      console.warn("Firebase Analytics initialization failed:", error);
    }
  }
  return analyticsInstance;
};

import { getToken } from "firebase/messaging";

export const getMessagingAsync = async () => {
  if (messagingInstance) return messagingInstance;
  if (typeof window !== "undefined") {
    try {
      const firebaseApp = getFirebaseApp();
      if (!firebaseApp) return null;
      
      messagingInstance = getMessaging(firebaseApp);

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

// Export lazy-initialized instances
export { getFirebaseApp as app, getFirebaseAuth as auth };

// For backward compatibility, also export the functions directly
export const getApp = getFirebaseApp;
export const getAuth = getFirebaseAuth;

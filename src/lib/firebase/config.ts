import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const requiredVars = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const missingVars = Object.entries(requiredVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0 && process.env.NODE_ENV !== 'production') {
  console.warn(`Missing Firebase environment variables: ${missingVars.join(', ')}`);
}

const firebaseConfig = {
  apiKey: requiredVars.apiKey || 'dummy_api_key',
  authDomain: requiredVars.authDomain || 'dummy_auth_domain',
  projectId: requiredVars.projectId || 'dummy_project_id',
  storageBucket: requiredVars.storageBucket || 'dummy_storage_bucket',
  messagingSenderId: requiredVars.messagingSenderId || 'dummy_messaging_sender_id',
  appId: requiredVars.appId || 'dummy_app_id',
  measurementId: requiredVars.measurementId || 'dummy_measurement_id',
};

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

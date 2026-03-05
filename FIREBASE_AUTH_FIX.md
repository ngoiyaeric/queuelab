# Firebase Google Sign-In Authentication Fix

## Problem
The Firebase Google Sign-In was throwing an error: `Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)` and the Google popup was opening and immediately closing.

## Root Cause
The Firebase configuration was using environment variables without the `NEXT_PUBLIC_` prefix. In Next.js, only environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Without this prefix, the Firebase API key and other configuration values were `undefined` on the client side, causing the authentication to fail.

## Solution
Updated the Firebase configuration to use `NEXT_PUBLIC_` prefixed environment variables:

### Changes Made

1. **Updated `/src/lib/firebase/config.ts`**:
   - Changed all Firebase environment variable references from `process.env.FIREBASE_*` to `process.env.NEXT_PUBLIC_FIREBASE_*`
   - Moved environment variable validation to client-side only to prevent build-time errors
   - Made `measurementId` optional since it's not always required

2. **Updated `.env.example`**:
   - Changed all environment variable names to use the `NEXT_PUBLIC_` prefix
   - This ensures developers know to use the correct variable names when setting up their environment

## Implementation Details

### Before
```typescript
const requiredVars = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  // ... other vars
};
```

### After
```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ... other vars
};
```

## Environment Setup

To use this fix, update your `.env.local` file with the correct variable names:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key
```

## Testing

After updating your environment variables:

1. Restart your development server: `npm run dev`
2. Navigate to the authentication page
3. Click the "Google" button
4. The Google sign-in popup should now open and remain open
5. Complete the Google authentication flow
6. You should be redirected to the dashboard upon successful authentication

## Why This Works

In Next.js:
- Server-side environment variables (without `NEXT_PUBLIC_`) are only available on the server
- Client-side code (like Firebase authentication) cannot access server-only variables
- The `NEXT_PUBLIC_` prefix tells Next.js to expose these variables to the browser
- Firebase SDK runs in the browser and needs access to the API key to authenticate requests

This is a security best practice because:
- Public variables (prefixed with `NEXT_PUBLIC_`) are safe to expose to the browser
- Firebase API keys are designed to be public and include security rules to prevent abuse
- Server-only secrets remain protected on the server

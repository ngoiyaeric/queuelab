# Firebase Google Sign-In Authentication Fix

## Problem
The Firebase Google Sign-In was throwing an error: `Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)` and the Google popup was opening and immediately closing. Additionally, the build was failing on Vercel during the prerendering phase with `auth/invalid-api-key` errors.

## Root Causes
1. **Environment Variables**: Firebase configuration was using environment variables without the `NEXT_PUBLIC_` prefix, which meant they were not exposed to the browser in Next.js.
2. **Server-Side Initialization**: Firebase was being initialized during the build/prerendering phase on the server, where the environment variables are not available and Firebase SDK cannot run properly.
3. **SSR Incompatibility**: Firebase Auth SDK is designed for client-side use only and should not be initialized during server-side rendering or build time.

## Solution
Implemented a **lazy-initialization pattern** that ensures Firebase is only initialized on the client side, after the page has fully loaded in the browser.

### Changes Made

1. **Updated `/src/lib/firebase/config.ts`**:
   - Implemented lazy initialization functions (`getFirebaseApp()` and `getFirebaseAuth()`)
   - Added client-side-only checks to prevent server-side initialization
   - Firebase is now only initialized when explicitly requested by client components
   - Added proper error handling and validation
   - Changed all environment variables to use `NEXT_PUBLIC_` prefix

2. **Updated `/src/components/auth-provider.tsx`**:
   - Modified to use lazy-initialized Firebase Auth
   - Added client-side-only checks in `useEffect`
   - Gracefully handles cases where Firebase is not initialized

3. **Updated `/src/components/auth-form.tsx`**:
   - Modified to use lazy-initialized Firebase Auth
   - Added validation to ensure Firebase is initialized before attempting authentication
   - Provides user-friendly error messages if Firebase initialization fails

4. **Updated `/src/components/firebase-provider.tsx`**:
   - Added client-side-only checks
   - Improved error handling with try-catch blocks
   - Prevents initialization during SSR

5. **Updated `.env.example`**:
   - Changed all environment variable names to use the `NEXT_PUBLIC_` prefix

## Implementation Details

### Before (Problematic)
```typescript
// This would execute on the server during build, causing errors
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
```

### After (Fixed)
```typescript
// Lazy initialization - only runs on client when needed
const getFirebaseAuth = () => {
  if (typeof window === "undefined") return null; // Skip on server
  if (!auth) {
    const result = initializeFirebase();
    if (result) {
      app = result.app;
      auth = result.auth;
    }
  }
  return auth;
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

### Build Testing
To verify the fix works during production builds:
```bash
npm run build
npm run start
```

The build should complete without Firebase-related errors.

## Why This Works

### Client-Side Only Initialization
- Firebase SDK is designed for client-side use and requires a browser environment
- By deferring initialization until the component mounts in the browser, we avoid build-time errors
- The `typeof window === "undefined"` check ensures code only runs in the browser

### NEXT_PUBLIC_ Prefix
- In Next.js, only environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Firebase API keys are designed to be public and include security rules to prevent abuse
- Server-only secrets remain protected on the server

### Lazy Loading Pattern
- Firebase is only initialized when actually needed (when auth operations occur)
- This reduces memory footprint and improves performance
- Graceful degradation if Firebase fails to initialize

## Security Considerations

1. **API Key Exposure**: Firebase API keys are intentionally public. Security is enforced through:
   - Firebase Security Rules in the database
   - OAuth 2.0 for authentication
   - Domain restrictions in Firebase Console

2. **No Sensitive Data**: Never store sensitive information (passwords, tokens) in `NEXT_PUBLIC_` variables

3. **Build Safety**: The lazy initialization prevents Firebase from attempting to initialize during the build process, where it would fail and expose configuration errors

## Troubleshooting

If you still encounter issues:

1. **Verify environment variables**: Check that all `NEXT_PUBLIC_FIREBASE_*` variables are set in your `.env.local`
2. **Check Firebase Console**: Ensure your Firebase project is properly configured
3. **Browser console**: Look for specific error messages in the browser's developer console
4. **Restart dev server**: Always restart the dev server after changing environment variables
5. **Clear cache**: Delete `.next` folder and reinstall dependencies if issues persist

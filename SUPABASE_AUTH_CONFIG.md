# Supabase Authentication Configuration Guide

## Overview

This guide explains how to properly configure Supabase authentication for the QueueLab application, including OAuth redirect URLs and provider settings.

## Supabase Dashboard Configuration

### 1. Navigate to Authentication Settings

Go to your Supabase project dashboard:
1. Open [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on "Authentication" in the left sidebar
4. Go to "URL Configuration"

### 2. Configure Site URL

The **Site URL** is where users will be redirected after email confirmation or password reset.

**Development:**
```
http://localhost:3000
```

**Production:**
```
https://www.queue.cx
```

### 3. Configure Redirect URLs

Add all allowed redirect URLs where Supabase can redirect users after authentication.

**Development:**
```
http://localhost:3000/auth/callback
```

**Production:**
```
https://www.queue.cx/auth/callback
```

**Additional Production URLs (if needed):**
```
https://queue.cx/auth/callback
https://app.queue.cx/auth/callback
```

### 4. Enable Google OAuth Provider

1. Go to "Authentication" → "Providers"
2. Find "Google" in the list
3. Click "Enable"
4. You'll need Google OAuth credentials:

#### Getting Google OAuth Credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen if not done
6. Application type: "Web application"
7. Add Authorized redirect URIs:
   ```
   https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
   ```
   Example:
   ```
   https://tazdsuyprayo1thvdvcr.supabase.co/auth/v1/callback
   ```

8. Copy the **Client ID** and **Client Secret**
9. Paste them into Supabase Google provider settings
10. Save

## Environment Variables

Ensure your `.env.local` (for development) and production environment variables are set:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Current Implementation

### OAuth Flow

1. **User clicks "Sign in with Google"**
   - Location: `src/components/auth-form.tsx`
   - Function: `handleGoogleLogin()`
   - Redirect URL: Dynamically set to `${window.location.origin}/auth/callback`

2. **Google OAuth completes**
   - User is redirected to `/auth/callback?code=...`
   - Location: `src/app/auth/callback/route.ts`
   - Action: Exchanges code for session

3. **Session established**
   - User is redirected to `/dashboard`
   - Auth provider updates user state
   - User avatar appears in header

### Code Example (Similar to Your Image)

The current implementation is equivalent to:

```javascript
const supabase = createClient(
  'https://tazdsuyprayo1thvdvcr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Your anon key
);

// OAuth sign in
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`
  }
});
```

### Redirect Configuration

The redirect URL is **dynamically generated** based on the current domain:

- **Development**: `http://localhost:3000/auth/callback`
- **Production**: `https://www.queue.cx/auth/callback`

This ensures the same code works across all environments.

## Animations Implemented

### User Avatar Animations

**Hover Effects:**
- Border glow (white/40 opacity)
- Shadow effect with blue/purple glow
- Smooth 300ms transition
- Scale effect (105% on hover, 95% on click)

**Code:**
```tsx
className="rounded-full border-2 border-white/20 
  transition-all duration-300 
  group-hover:border-white/40 
  group-hover:shadow-lg 
  group-hover:shadow-blue-500/50"
```

### Dropdown Menu Animations

**Opening Animation:**
- Fade in (opacity 0 → 100)
- Scale up (95% → 100%)
- Slide down (translate-y -8px → 0)
- Duration: 200ms

**Menu Items:**
- Slide right on hover (translate-x 0 → 4px)
- Background highlight (white/10)
- Scale down on click (95%)

### Queue Out Button Animations

**Special Effects:**
- Red text color (red-400 → red-300)
- Red background glow on hover (red-500/10)
- Icon rotation on hover (12 degrees)
- Font weight: medium

**Code:**
```tsx
className="text-red-400 hover:text-red-300 
  hover:bg-red-500/10 
  transition-all duration-200"
```

## Testing Checklist

### Local Testing

- [ ] Set environment variables in `.env.local`
- [ ] Add `http://localhost:3000/auth/callback` to Supabase redirect URLs
- [ ] Run `npm run dev`
- [ ] Click "Queue Up" button
- [ ] Complete Google OAuth
- [ ] Verify redirect to dashboard
- [ ] Check user avatar appears
- [ ] Test dropdown menu animations
- [ ] Test Queue Out functionality

### Production Testing

- [ ] Set environment variables in hosting platform
- [ ] Add production URL to Supabase redirect URLs
- [ ] Deploy application
- [ ] Test OAuth flow on production domain
- [ ] Verify all animations work
- [ ] Test sign out functionality

## Troubleshooting

### Issue: "redirect_uri_mismatch" Error

**Solution:** Ensure the redirect URI in Google Cloud Console matches exactly:
```
https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
```

### Issue: User Not Redirected After OAuth

**Solution:** Check that the redirect URL is added to Supabase allowed redirect URLs.

### Issue: Avatar Not Showing

**Solution:** Verify that Google OAuth is returning `user_metadata.avatar_url`. Check Supabase auth logs.

### Issue: Animations Not Working

**Solution:** Ensure Tailwind CSS is properly configured and the `group` class is on the parent element.

## Security Notes

1. **Never commit** `.env` files to version control
2. Use **different Supabase projects** for development and production
3. Regularly **rotate API keys** in production
4. Enable **email confirmation** for production
5. Configure **rate limiting** in Supabase dashboard
6. Use **RLS (Row Level Security)** policies for database tables

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup Guide](https://support.google.com/cloud/answer/6158849)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

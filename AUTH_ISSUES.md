# Authentication Issues Identified in PR #104

## Primary Issue: 404 Error on Dashboard Redirect

### Root Causes:

1. **Hardcoded External URL in Callback Route** (`src/app/auth/callback/route.ts`, line 18)
   - Current: `return NextResponse.redirect('https://app.queue.cx/dashboard');`
   - Problem: This redirects to an external domain that doesn't exist or isn't configured
   - Solution: Use the origin from the request URL to redirect to the local/deployed dashboard

2. **Hardcoded Redirect URL in Auth Form** (`src/components/auth-form.tsx`, line 25)
   - Current: `redirectTo: 'https://app.queue.cx/auth/callback'`
   - Problem: This hardcoded URL may not match the actual deployment URL
   - Solution: Use dynamic URL based on the current window location or environment variable

3. **Missing Environment Variable Configuration**
   - The redirect URLs should be configurable via environment variables
   - This allows different URLs for development, staging, and production

## Secondary Issues:

1. **No Error Page** 
   - The callback route redirects to `/auth/error` but this page doesn't exist
   - Need to create an error page to handle authentication failures

2. **Session Management**
   - After successful OAuth, the session should be properly established
   - The auth provider needs to refresh the session state

## Recommended Fixes:

1. Update callback route to use dynamic origin-based redirect
2. Update auth form to use dynamic redirect URL
3. Create environment variable for site URL
4. Create error page for authentication failures
5. Ensure proper session refresh after OAuth callback

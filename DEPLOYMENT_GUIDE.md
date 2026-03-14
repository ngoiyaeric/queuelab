# QueueLab Deployment Guide

This guide explains how to set up authentication and deployment for the QueueLab project using GitHub Actions and Firebase.

## Prerequisites

- GitHub repository with Actions enabled
- Firebase project with Authentication enabled
- Personal Access Token (PAT) for GitHub (optional, for manual deployments)

## 1. Firebase Configuration

### Step 1.1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (gear icon)
4. Under **Your apps**, find your web app
5. Copy the Firebase configuration object

### Step 1.2: Set Environment Variables

Create a `.env.local` file in the project root with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key
```

## 2. GitHub Actions Secrets Configuration

### Step 2.1: Add Firebase Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add the following:

#### For Firebase Hosting Deployment:

| Secret Name | Value |
|-------------|-------|
| `FIREBASE_API_KEY` | From Firebase Console |
| `FIREBASE_AUTH_DOMAIN` | From Firebase Console |
| `FIREBASE_PROJECT_ID` | From Firebase Console |
| `FIREBASE_STORAGE_BUCKET` | From Firebase Console |
| `FIREBASE_MESSAGING_SENDER_ID` | From Firebase Console |
| `FIREBASE_APP_ID` | From Firebase Console |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase Service Account JSON (see below) |

#### Firebase Service Account Setup:

1. Go to Firebase Console → **Project Settings** → **Service Accounts**
2. Click **Generate new private key**
3. Copy the entire JSON content
4. In GitHub, add a new secret named `FIREBASE_SERVICE_ACCOUNT` and paste the JSON

### Step 2.2: Personal Access Token (PAT) Configuration

If you want to use a custom PAT instead of the default `GITHUB_TOKEN`:

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens**
2. Click **Generate new token (classic)**
3. Select scopes: `repo`, `workflow`
4. Copy the token
5. In your repository, add a secret named `PAT_TOKEN` with the token value

**Usage in workflows:**
```yaml
with:
  repoToken: ${{ secrets.PAT_TOKEN }}
```

## 3. Workflow Files

The project includes three GitHub Actions workflows:

### 3.1 `nextjs.yml` - GitHub Pages Deployment

**Trigger:** Push to `master` or `main` branch

**What it does:**
- Builds the Next.js application with static export
- Deploys to GitHub Pages
- Accessible at `https://username.github.io/queuelab`

**Configuration:**
- Automatically detects package manager (npm/yarn)
- Caches dependencies for faster builds
- Uses Next.js static export mode

### 3.2 `firebase-hosting-pull-request.yml` - Firebase PR Preview

**Trigger:** Pull requests to `master` or `main` branch

**What it does:**
- Builds the application
- Deploys to Firebase Hosting preview channel
- Posts preview URL as PR comment
- Requires `FIREBASE_SERVICE_ACCOUNT` secret

### 3.3 `firebase-hosting-prod.yml` - Firebase Production Deployment

**Trigger:** Push to `master` or `main` branch (manual trigger available)

**What it does:**
- Builds the application
- Deploys to Firebase Hosting production
- Requires `FIREBASE_SERVICE_ACCOUNT` secret

## 4. Authentication Implementation

### 4.1 Firebase Authentication Features

The project includes:

- **Email/Password Authentication**
- **Google OAuth Sign-In**
- **Protected Dashboard** (requires login)
- **Auth Context Provider** for global state management

### 4.2 User Authentication Flow

1. User clicks "Queue Up" button on landing page
2. Authentication modal opens
3. User can sign up or log in
4. On success, user is redirected to `/dashboard`
5. Dashboard is protected and requires authentication

### 4.3 Authentication Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `AuthProvider` | `src/components/auth-provider.tsx` | Manages global auth state |
| `AuthForm` | `src/components/auth-form.tsx` | Login/signup form |
| `SiteHeader` | `src/components/site-header.tsx` | Shows auth status, login button |
| `Dashboard` | `src/app/dashboard/page.tsx` | Protected user dashboard |

## 5. Deployment Checklist

- [ ] Firebase project created and configured
- [ ] Firebase credentials added to `.env.local`
- [ ] All Firebase secrets added to GitHub repository
- [ ] `FIREBASE_SERVICE_ACCOUNT` secret configured
- [ ] Workflows are enabled in GitHub Actions
- [ ] Test deployment by pushing to `master` branch
- [ ] Verify Firebase Hosting deployment
- [ ] Verify GitHub Pages deployment
- [ ] Test authentication flow in production

## 6. Troubleshooting

### Build Fails with "Missing Firebase Variables"

**Solution:** Ensure all `NEXT_PUBLIC_FIREBASE_*` environment variables are set in GitHub Actions secrets.

### Firebase Deployment Fails

**Solution:** 
1. Verify `FIREBASE_SERVICE_ACCOUNT` secret contains valid JSON
2. Check that the service account has appropriate permissions
3. Ensure `FIREBASE_PROJECT_ID` matches your Firebase project

### GitHub Pages Deployment Shows Blank Page

**Solution:**
1. Verify `next.config.mjs` has `output: "export"`
2. Check that images have `unoptimized: true` in config
3. Ensure all dynamic routes are properly configured

### Authentication Not Working

**Solution:**
1. Verify Firebase credentials in `.env.local`
2. Check Firebase Console → Authentication → Sign-in methods
3. Ensure Google OAuth is enabled if using Google sign-in
4. Check browser console for Firebase errors

## 7. Local Development

### Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your Firebase credentials
# Then start development server
npm run dev
```

### Testing Authentication

1. Start dev server: `npm run dev`
2. Open `http://localhost:3000`
3. Click "Queue Up" button
4. Test sign up and login flows
5. Verify dashboard access after login

## 8. Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use GitHub Secrets** for all sensitive data
3. **Rotate service account keys** periodically
4. **Review Firebase security rules** in Console
5. **Enable 2FA** on GitHub account
6. **Limit PAT scopes** to minimum required permissions
7. **Monitor Firebase usage** to detect anomalies

## 9. Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)

## 10. Support

For issues or questions:

1. Check GitHub Actions logs: Repository → Actions → Select workflow → View logs
2. Review Firebase Console for errors
3. Check browser console for client-side errors
4. Review this guide's troubleshooting section

---

**Last Updated:** March 2026
**Version:** 1.0

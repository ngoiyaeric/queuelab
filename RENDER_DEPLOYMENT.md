# Render Production Deployment

This document describes the configuration requirements and environment differences for deploying the application to Render.

## Environment Variable Injection

Render environment variables are configured via the **Render Dashboard**, not through `.env` files. You must manually set all required variables for both the frontend and backend services in their respective Render service settings.

### Required Backend Environment Variables
Set these in the Render dashboard for the **Backend** service:
- `OPENAI_API_KEY` (Secret)
- `MODEL_NAME` (e.g., `gpt-4o`)
- `ELEVENLABS_API_KEY` (Secret)
- `ELEVENLABS_VOICE_ID`
- `STRIPE_SECRET_KEY` (Secret)
- `STRIPE_WEBHOOK_SECRET` (Secret)
- `STRIPE_API_VERSION` (e.g., `2024-06-20`)
- `DEBUG` (set to `False`)

### Required Frontend Environment Variables
Set these in the Render dashboard for the **Frontend** service:
- `CLERK_SECRET_KEY` (Secret)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY` (Secret)
- `FASTAPI_BASE_URL` (Internal backend URL)
- `NEXT_PUBLIC_WS_URL` (Public backend WebSocket URL)
- `BACKEND_URL` (Internal or Public backend URL)
- `NEXT_PUBLIC_APP_URL` (Public frontend URL for Stripe redirects)

## Service URL Configuration Differences

### Internal Communication
Render services within the same workspace and region can communicate via **internal hostnames**.

- **FASTAPI_BASE_URL**: Should be set to the Render internal hostname of the backend service (e.g., `http://backend:10000`). Note that Render's default internal port might differ from Docker's `8000`.
- **BACKEND_URL**: For internal server-side requests, use the internal hostname.

### Public Communication
- **NEXT_PUBLIC_WS_URL**: WebSockets initiated from the client browser must use the **Render public URL** (e.g., `wss://your-backend.onrender.com`).
- **NEXT_PUBLIC_APP_URL**: Used for Stripe checkout redirect URLs (e.g., `https://your-frontend.onrender.com`).

## Migration from Firebase Hosting
The application has migrated from Firebase Hosting to a containerized deployment (e.g., on Render). All Firebase-related configuration files and build scripts have been removed.

## Code Integration
The `next.config.mjs` file is already configured to read `FASTAPI_BASE_URL` from the environment. No code changes are required for production deployment, only correct configuration in the Render dashboard.

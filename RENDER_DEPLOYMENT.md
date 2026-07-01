# Render Production Deployment (Optimized)

This document describes the optimized container orchestration for deploying the QueueLab microservices to Render.

## Orchestration Strategy

We use a multi-service approach on Render:
1.  **Frontend (Next.js)**: Deployed as a `web` service. Uses standalone output.
2.  **Backend (FastAPI)**: Deployed as a `web` service (or `pserv` for private). Uses `gunicorn` with `uvicorn` workers.
3.  **Worker (FastAPI/Task)**: Deployed as a `worker` service. Shares the same backend image but runs async background tasks.
4.  **Redis**: Managed Render Redis for task queuing and caching.

## Environment Variable Injection

Render environment variables are configured via the **Render Dashboard**.

### Build-time Variables (Frontend)
Next.js bakes `NEXT_PUBLIC_` variables into the client-side bundle at build time. In our `Dockerfile`, we use `ARG` and `ENV` to handle this. You **must** set these as Environment Variables in the Render Dashboard for the Frontend service:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `FASTAPI_BASE_URL` (e.g., `http://queuelab-backend:10000`)

### Runtime Variables (Backend/Worker)
- `REDIS_URL`: Internal connection string from the Render Redis instance.
- `DATABASE_URL`: Managed Postgres connection string.
- `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, etc.

## Async Microservices Pattern

The backend includes a sample async task pattern at `/api/tasks/async`. This uses FastAPI's `BackgroundTasks` for simple handoffs. For more complex microservices, the `queuelab-worker` service can be scaled independently to process messages from the `REDIS_URL`.

## Internal Communication
Render services communicate via **internal hostnames**.
- **FASTAPI_BASE_URL**: Use the internal name (e.g., `http://queuelab-backend:10000`).
- **NEXT_PUBLIC_WS_URL**: Use the **public** URL for browser-side WebSockets (e.g., `wss://queuelab-backend.onrender.com`).

## Docker Optimizations
- **Backend**: Now uses `gunicorn` for process management and better stability.
- **Frontend**: Optimized `node:20-alpine` multi-stage build with standalone mode for minimal image size.

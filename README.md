# QCX Location Intelligence

## Architecture Overview

This project consists of a Next.js frontend and a FastAPI backend.

- **Frontend**: Next.js (React) application handles the UI and user authentication via Clerk.
- **Backend**: FastAPI (Python) application provides the API and business logic.
- **Routing**: The Next.js application proxies requests starting with `/api/py/*` to the FastAPI backend. Authenticated requests are enriched with `X-User-Id` and `X-User-Email` headers.

## Local Development

### Prerequisites

- Node.js 22.x
- Python 3.11+
- Docker & Docker Compose (optional, for containerized development)

### Running Locally

#### Using Docker Compose (Recommended)

1. **Configure environment variables:**
   Copy `.env.example` to `.env` and fill in the required values.

2. **Start the services:**
   ```bash
   docker compose up --build
   ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8000`.

#### Running Individually

**Frontend:**
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`

**Backend:**
1. Navigate to the backend directory: `cd backend`
2. Follow the instructions in `backend/README.md` to set up and run the server.

## API Documentation

When the backend is running, you can access the interactive API documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Adding New FastAPI Endpoints

1. Define your routes in `backend/app/api/`.
2. Include the new router in `backend/app/main.py` if needed.
3. Access the new endpoints from the frontend using the `/api/py/` prefix. For example, a FastAPI endpoint `GET /users` can be reached at `/api/py/users`.

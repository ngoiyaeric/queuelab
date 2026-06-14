![QCX Logo](src/assets/q-logo.png)

## 🌍 Planet-Scale Intelligence

**QCX** (Quality Computer Experiences) is a cutting-edge multi-agent intelligence platform designed for planetary exploration and automation. By blending advanced location intelligence with environment-aware computing, QCX provides enterprise-quality computer experiences for global-scale operations.

### 🚀 Features

- **Multi-Agent Intelligence**: Automated exploration and task execution across distributed environments.
- **Environment Aware**: Intelligent systems that understand and adapt to their geographic and operational context.
- **Planet-Scale Visualization**: High-fidelity WebGL globe and map animations for real-time monitoring.
- **Enterprise Ready**: Secure authentication via Clerk, robust data management, and scalable cloud infrastructure.

### 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Backend**: FastAPI (Python) handles the core logic and is integrated via Next.js rewrites.
- **Styling**: Tailwind CSS with a custom "White Light Earth Tone" palette.
- **Animations**: Framer Motion & Three.js (React Three Fiber).
- **Authentication**: Clerk.
- **Backend/Deployment**: Firebase & Render.

---

## 🏗 Architecture Overview

This project consists of a Next.js frontend and a FastAPI backend.

- **Frontend**: Next.js (React) application handles the UI and user authentication via Clerk.
- **Backend**: FastAPI (Python) application provides the API and business logic.
- **Routing**: The Next.js application proxies requests starting with `/api/py/*` to the FastAPI backend. Authenticated requests are enriched with `X-User-Id` and `X-User-Email` headers.

## 💻 Local Development

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

## 📖 API Documentation

When the backend is running, you can access the interactive API documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## ➕ Adding New FastAPI Endpoints

1. Define your routes in `backend/app/api/`.
2. Include the new router in `backend/app/main.py` if needed.
3. Access the new endpoints from the frontend using the `/api/py/` prefix. For example, a FastAPI endpoint `GET /users` can be reached at `/api/py/users`.

---

## ⚖️ Legal & Licensing

**PROPRIETARY AND CONFIDENTIAL**

This repository contains proprietary software owned by **QCX Location Intelligence**.

### 🚫 Restricted Usage

Access to this codebase does not grant any rights to use, copy, modify, or redistribute the software.

- **No Downloading**: Local cloning or downloading of this repository is prohibited without authorization.
- **No Modification**: Deriving new works or altering the existing codebase is strictly forbidden.
- **No Redistribution**: Sharing, publishing, or distributing any part of this code is a violation of the license.

For full details, please refer to the [LICENSE](./LICENSE) file.

---

## 📬 Contact

For licensing inquiries or enterprise access, please contact the QCX team:

- **Website**: [www.queue.cx](https://www.queue.cx)
- **Email**: legal@queue.cx

---
*© 2026 QCX Location Intelligence. All rights reserved.*

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from app.api.websocket import router as ws_router
from app.api.payments import router as payments_router
from app.core.config import settings
import redis.asyncio as redis
import os

app = FastAPI(
    title=settings.PROJECT_NAME,
    debug=settings.DEBUG,
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(api_router)
app.include_router(ws_router)
app.include_router(payments_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI Backend Agent Swarm"}

@app.get("/health")
async def health_check():
    health_status = {"status": "healthy", "checks": {}}

    # Check Redis connectivity if URL is provided
    if settings.REDIS_URL:
        try:
            r = redis.from_url(settings.REDIS_URL)
            await r.ping()
            health_status["checks"]["redis"] = "connected"
        except Exception as e:
            health_status["status"] = "unhealthy"
            health_status["checks"]["redis"] = f"error: {str(e)}"

    # Check Database connectivity (placeholder for actual DB check)
    if settings.DATABASE_URL:
        # In a real app, you would try to execute a simple query like "SELECT 1"
        health_status["checks"]["database"] = "configured"

    if health_status["status"] != "healthy":
        raise HTTPException(status_code=503, detail=health_status)

    return health_status

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

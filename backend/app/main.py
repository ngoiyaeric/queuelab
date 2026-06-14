from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    debug=settings.DEBUG,
)

# CORS Safety Validation
if "*" in settings.CORS_ORIGINS:
    raise RuntimeError(
        "Security Error: CORS_ORIGINS cannot contain '*' when allow_credentials is True. "
        "Please specify explicit origins or disable credentials."
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

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI Backend"}

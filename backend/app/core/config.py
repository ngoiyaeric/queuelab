from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union, Optional
from pydantic import field_validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "FastAPI Backend"
    DEBUG: bool = False
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # AI Config
    OPENAI_API_KEY: str = ""
    MODEL_NAME: str = "gpt-4o"  # Updated to 4o as gpt-4 is older
    AGENT_TIMEOUT: int = 30

    # Voice Config (ElevenLabs)
    ELEVENLABS_API_KEY: str = ""
    ELEVENLABS_VOICE_ID: str = "Lcf7WDeYIm7p8caqbe0O"  # Emily

    # Payments Config (Stripe)
    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""
    STRIPE_API_VERSION: Optional[str] = "2024-06-20"

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()

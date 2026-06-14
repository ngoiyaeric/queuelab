from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union
from pydantic import field_validator
import json

class Settings(BaseSettings):
    PROJECT_NAME: str = "FastAPI Backend"
    DEBUG: bool = False
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, list):
            return v
        if isinstance(v, str):
            if v.startswith("["):
                return json.loads(v)
            return [i.strip() for i in v.split(",")]
        raise ValueError(f"Invalid type for CORS_ORIGINS: {type(v)}")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )

settings = Settings()

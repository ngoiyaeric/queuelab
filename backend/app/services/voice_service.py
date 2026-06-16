import asyncio
import base64
from typing import AsyncGenerator
from elevenlabs.client import AsyncElevenLabs
from app.core.config import settings

class VoiceService:
    def __init__(self):
        self.client = AsyncElevenLabs(api_key=settings.ELEVENLABS_API_KEY)
        self.voice_id = settings.ELEVENLABS_VOICE_ID

    async def stream_speech(self, text: str) -> AsyncGenerator[str, None]:
        """
        Streams audio from ElevenLabs for the given text.
        Returns base64 encoded audio chunks.
        """
        if not settings.ELEVENLABS_API_KEY:
            # Mock or return empty if no API key
            yield ""
            return

        try:
            audio_stream = await self.client.generate(
                text=text,
                voice=self.voice_id,
                model="eleven_multilingual_v2",
                stream=True
            )

            async for chunk in audio_stream:
                if chunk:
                    yield base64.b64encode(chunk).decode("utf-8")
        except Exception as e:
            print(f"ElevenLabs Error: {e}")
            yield ""

voice_service = VoiceService()

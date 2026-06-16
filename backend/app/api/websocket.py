from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.agent_service import agent_service
from app.services.session_service import session_service
from app.services.voice_service import voice_service
import json
import asyncio

router = APIRouter()

@router.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    await websocket.accept()
    session_id = None

    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)

            user_message = message_data.get("message")
            session_id = session_service.get_or_create_session(message_data.get("session_id"))

            # Store user message
            session_service.add_message(session_id, "user", user_message)

            # Start agent swarm processing
            full_response = ""
            async for chunk in agent_service.invoke_streaming(session_id, user_message):
                if chunk.content:
                    full_response += chunk.content

                # Send text chunk
                await websocket.send_text(chunk.model_dump_json())

                # If chunk has content, stream voice if needed (simplified)
                # In a real production app, we might buffer or stream in parallel
                if chunk.content and message_data.get("voice_enabled"):
                    async for voice_chunk in voice_service.stream_speech(chunk.content):
                        if voice_chunk:
                            await websocket.send_text(json.dumps({
                                "type": "audio",
                                "audio_data": voice_chunk,
                                "agent_id": chunk.agent_id
                            }))

            # Store assistant response
            session_service.add_message(session_id, "assistant", full_response)

    except WebSocketDisconnect:
        print(f"WebSocket disconnected for session: {session_id}")
    except Exception as e:
        print(f"WebSocket Error: {e}")
        await websocket.close()

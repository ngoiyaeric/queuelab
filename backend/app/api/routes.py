from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import StreamingResponse
from app.services.agent_service import agent_service
from app.services.session_service import session_service
from app.schemas.messages import ChatMessage, AgentResponse
import json
import asyncio

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "healthy"}

@router.post("/api/chat", response_model=AgentResponse)
async def chat_endpoint(message: ChatMessage, x_user_id: str = Header(...)):
    # Simple non-streaming REST endpoint
    session_id = session_service.get_or_create_session()

    response_content = ""
    async for chunk in agent_service.invoke_streaming(session_id, message.content):
        if chunk.content:
            response_content += chunk.content

    return AgentResponse(
        agent_id="coordinator",
        content=response_content,
        session_id=session_id
    )

@router.get("/api/chat/stream")
async def chat_stream(message: str, x_user_id: str = Header(...)):
    # SSE Streaming endpoint
    session_id = session_service.get_or_create_session()

    async def event_generator():
        async for chunk in agent_service.invoke_streaming(session_id, message):
            yield f"data: {chunk.model_dump_json()}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

from fastapi import APIRouter, Header, HTTPException, BackgroundTasks
from fastapi.responses import StreamingResponse
from app.services.agent_service import agent_service
from app.services.session_service import session_service
from app.schemas.messages import ChatMessage, AgentResponse
import json
import asyncio
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

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

async def run_background_task(task_id: str, data: dict):
    """
    Demonstrates an async background task.
    In a real microservice, this might push to Redis/Celery.
    """
    logger.info(f"Starting background task {task_id}")
    await asyncio.sleep(10) # Simulate work
    logger.info(f"Completed background task {task_id}")

@router.post("/api/tasks/async")
async def trigger_async_task(background_tasks: BackgroundTasks, data: dict):
    """
    Endpoint to trigger an asynchronous task using FastAPI BackgroundTasks.
    This pattern is great for sync-to-async handoffs in Render web services.
    """
    task_id = "task_" + str(asyncio.get_event_loop().time())
    background_tasks.add_task(run_background_task, task_id, data)
    return {"status": "accepted", "task_id": task_id}

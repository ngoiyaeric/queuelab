from pydantic import BaseModel, Field
from typing import List, Optional, Any, Union
from enum import Enum

class MessageType(str, Enum):
    TEXT = "text"
    AUDIO = "audio"
    TOOL_CALL = "tool_call"
    STATUS = "status"

class ChatMessage(BaseModel):
    role: str
    content: str
    type: MessageType = MessageType.TEXT

class ToolCall(BaseModel):
    id: str
    name: str
    arguments: str

class StreamChunk(BaseModel):
    agent_id: str
    content: Optional[str] = None
    tool_calls: Optional[List[ToolCall]] = None
    type: MessageType = MessageType.TEXT
    metadata: Optional[dict] = Field(default_factory=dict)
    audio_data: Optional[str] = None  # Base64 encoded audio

class AgentResponse(BaseModel):
    agent_id: str
    content: str
    type: MessageType = MessageType.TEXT
    tool_calls: Optional[List[ToolCall]] = None
    session_id: str

import asyncio
from typing import List, Dict, Any, AsyncGenerator, TypedDict, Annotated
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END
from app.core.config import settings
from app.schemas.messages import ChatMessage, StreamChunk, MessageType
from app.services.session_service import session_service

class AgentState(TypedDict):
    messages: Annotated[List[Dict[str, Any]], "Messages in the conversation"]
    next_agent: str
    session_id: str

class AgentService:
    def __init__(self):
        self.llm = ChatOpenAI(
            model=settings.MODEL_NAME,
            api_key=settings.XAI_API_KEY,
            base_url=settings.XAI_BASE_URL,
            streaming=True
        )
        self.graph = self._build_graph()

    def _build_graph(self):
        workflow = StateGraph(AgentState)

        # Define nodes
        workflow.add_node("coordinator", self.coordinator_node)
        workflow.add_node("researcher", self.researcher_node)
        workflow.add_node("executor", self.executor_node)

        # Define edges
        workflow.set_entry_point("coordinator")
        workflow.add_conditional_edges(
            "coordinator",
            self.route_agent,
            {
                "researcher": "researcher",
                "executor": "executor",
                "end": END
            }
        )
        workflow.add_edge("researcher", "coordinator")
        workflow.add_edge("executor", "coordinator")

        return workflow.compile()

    async def coordinator_node(self, state: AgentState):
        # Logic to decide next step
        messages = state["messages"]
        last_message = messages[-1]["content"].lower()

        if "search" in last_message:
            return {"next_agent": "researcher"}
        elif "calculate" in last_message or "code" in last_message:
            return {"next_agent": "executor"}
        else:
            return {"next_agent": "end"}

    async def researcher_node(self, state: AgentState):
        # Simulated research logic
        return {"messages": [{"role": "assistant", "content": "I have found some research data...", "agent": "researcher"}]}

    async def executor_node(self, state: AgentState):
        # Simulated execution logic
        return {"messages": [{"role": "assistant", "content": "I am executing the requested task...", "agent": "executor"}]}

    def route_agent(self, state: AgentState):
        return state.get("next_agent", "end")

    async def invoke_streaming(self, session_id: str, message: str) -> AsyncGenerator[StreamChunk, None]:
        """
        Invokes the agent graph and yields stream chunks.
        """
        # Simulated "New Knowledge" discovery flow
        if message == "Initiate knowledge discovery":
            yield StreamChunk(agent_id="system", content="Initializing EVA discovery module...", type=MessageType.KNOWLEDGE, metadata={"role": "system"})
            await asyncio.sleep(0.5)
            yield StreamChunk(agent_id="eva", content="Vibrational interface detected 42 novel patterns in orbital data sets.", type=MessageType.KNOWLEDGE, metadata={"role": "eva"})
            await asyncio.sleep(0.8)
            yield StreamChunk(agent_id="fix", content="Signal abstraction applied. Evaluation alignment at 99.8%.", type=MessageType.KNOWLEDGE, metadata={"role": "fix"})
            await asyncio.sleep(0.6)
            yield StreamChunk(agent_id="system", content="Synthesizing knowledge core for planetary integration.", type=MessageType.KNOWLEDGE, metadata={"role": "system"})
            await asyncio.sleep(0.7)
            yield StreamChunk(agent_id="q", content="Knowledge abstracted. Ready for planet computer deployment.", type=MessageType.KNOWLEDGE, metadata={"role": "q", "capital": "$1,240.50", "time": "14.2 Hours"})
            await asyncio.sleep(0.5)
            yield StreamChunk(agent_id="system", content="Discovery metrics: $1,240.50 saved through automated alignment.", type=MessageType.KNOWLEDGE, metadata={"role": "system"})
            await asyncio.sleep(0.4)
            yield StreamChunk(agent_id="eva", content="Beginning next phase: Environmental awareness check.", type=MessageType.KNOWLEDGE, metadata={"role": "eva"})
            return

        # Yield "Thinking" status
        yield StreamChunk(agent_id="coordinator", content="", type=MessageType.STATUS, metadata={"status": "thinking"})

        # Store user message
        session_service.add_message(session_id, "user", message)

        # Retrieve session history
        history = session_service.get_formatted_history(session_id)

        # Prepare messages (history already includes the message we just added)
        messages = history

        full_response = ""
        async for chunk in self.llm.astream(messages):
            content = chunk.content
            if content:
                full_response += content
                yield StreamChunk(agent_id="coordinator", content=content, type=MessageType.TEXT)

        # Append assistant response to history
        session_service.add_message(session_id, "assistant", full_response)

agent_service = AgentService()

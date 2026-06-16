import asyncio
from typing import List, Dict, Any, AsyncGenerator, TypedDict, Annotated
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END
from app.core.config import settings
from app.schemas.messages import ChatMessage, StreamChunk, MessageType

class AgentState(TypedDict):
    messages: Annotated[List[Dict[str, Any]], "Messages in the conversation"]
    next_agent: str
    session_id: str

class AgentService:
    def __init__(self):
        self.llm = ChatOpenAI(
            model=settings.MODEL_NAME,
            api_key=settings.OPENAI_API_KEY,
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
        # Simplified streaming generator for the foundation
        # In a full implementation, we'd wrap the LLM callback or graph events

        # Simulated "Thinking" status
        yield StreamChunk(agent_id="coordinator", content="", type=MessageType.STATUS, metadata={"status": "thinking"})

        # Simulated token-by-token response
        response_text = f"Processing your request: {message}"
        words = response_text.split()

        for word in words:
            await asyncio.sleep(0.1)
            yield StreamChunk(agent_id="coordinator", content=word + " ", type=MessageType.TEXT)

agent_service = AgentService()

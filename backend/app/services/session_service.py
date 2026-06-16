from typing import Dict, List, Any
import uuid

class SessionService:
    def __init__(self):
        # In-memory session store: session_id -> {history: [], memory: {}}
        self.sessions: Dict[str, Dict[str, Any]] = {}

    def get_or_create_session(self, session_id: str = None) -> str:
        if not session_id or session_id not in self.sessions:
            session_id = session_id or str(uuid.uuid4())
            self.sessions[session_id] = {
                "history": [],
                "memory": {}
            }
        return session_id

    def add_message(self, session_id: str, role: str, content: str):
        if session_id in self.sessions:
            self.sessions[session_id]["history"].append({"role": role, "content": content})

    def get_history(self, session_id: str) -> List[Dict[str, str]]:
        return self.sessions.get(session_id, {}).get("history", [])

    def cleanup_session(self, session_id: str):
        if session_id in self.sessions:
            del self.sessions[session_id]

session_service = SessionService()

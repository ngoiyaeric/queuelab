import { useState, useEffect, useCallback, useRef } from "react";

export interface AgentMessage {
  id: string;
  role: "user" | "assistant" | "system" | "data";
  content: string;
  agent_id?: string;
  type?: "text" | "audio" | "status";
  audio_data?: string;
}

export const useAgentChat = (sessionId?: string) => {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<string>("idle");

  const audioQueue = useRef<string[]>([]);
  const isPlaying = useRef(false);

  const playNextAudio = useCallback(() => {
    if (isPlaying.current || audioQueue.current.length === 0) return;

    isPlaying.current = true;
    const base64Audio = audioQueue.current.shift();
    if (!base64Audio) return;

    const audio = new Audio(`data:audio/mpeg;base64,${base64Audio}`);
    audio.onended = () => {
      isPlaying.current = false;
      playNextAudio();
    };
    audio.play().catch(e => {
      console.error("Audio playback failed", e);
      isPlaying.current = false;
      playNextAudio();
    });
  }, []);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";
    const socket = new WebSocket(`${backendUrl}/ws/chat`);

    socket.onopen = () => {
      console.log("Connected to Agent Swarm");
      setStatus("ready");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "audio") {
        audioQueue.current.push(data.audio_data);
        playNextAudio();
      } else if (data.type === "text") {
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.role === "assistant" && lastMessage.agent_id === data.agent_id) {
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: lastMessage.content + data.content }
            ];
          }
          return [
            ...prev,
            { id: Date.now().toString(), role: "assistant", content: data.content, agent_id: data.agent_id }
          ];
        });
      } else if (data.type === "status") {
        setStatus(data.metadata?.status || "processing");
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from Agent Swarm");
      setStatus("disconnected");
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [sessionId, playNextAudio]);

  const sendMessage = useCallback((message: string, voiceEnabled: boolean = true) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    const userMessage: AgentMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
    };

    setIsLoading(true);
    setMessages((prev) => [...prev, userMessage]);
    ws.send(JSON.stringify({
      message,
      session_id: sessionId,
      voice_enabled: voiceEnabled
    }));
    // We set loading false when the first response chunk comes or process finishes
    // For simplicity in this foundation:
    setTimeout(() => setIsLoading(false), 500);
  }, [ws, sessionId]);

  return {
    messages,
    sendMessage,
    isLoading,
    status,
  };
};

export interface KnowledgeMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface KnowledgeCardData {
  title: string;
  cost: number;
  duration: string;
  messages: KnowledgeMessage[];
  appsUsed?: string[];
}


export type MessageType = 'text' | 'button' | 'image' | 'card';

export interface ChatMessage {
  id: string;
  type: MessageType;
  content?: string;
  title?: string;
  buttons?: string[];
  sender: 'user' | 'bot';
  timestamp: string;
}

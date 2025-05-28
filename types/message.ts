export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  appointmentId?: string;
  senderId: string;
  receiverId: string;
  content: string;
  status: MessageStatus;
  sentAt: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  messageId: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  participantRole: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}
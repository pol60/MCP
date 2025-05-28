import { create } from 'zustand';
import { Conversation, Message, MessageStatus } from '@/types/message';
import { conversations, messages } from '@/mocks/messages';

interface MessageState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  selectedConversation: string | null;
  isLoading: boolean;
  error: string | null;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  selectConversation: (conversationId: string) => void;
  markAsRead: (conversationId: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: [],
  messages: {},
  selectedConversation: null,
  isLoading: false,
  error: null,
  
  fetchConversations: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ conversations, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch conversations', isLoading: false });
    }
  },
  
  fetchMessages: async (conversationId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const conversationMessages = messages[conversationId] || [];
      const updatedMessages = { ...get().messages };
      updatedMessages[conversationId] = conversationMessages;
      
      set({ 
        messages: updatedMessages, 
        selectedConversation: conversationId,
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to fetch messages', isLoading: false });
    }
  },
  
  sendMessage: async (conversationId: string, content: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const conversation = get().conversations.find(
        conv => conv.id === conversationId
      );
      
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      
      const newMessage: Message = {
        id: `msg-${conversationId}-${Date.now()}`,
        senderId: '1', // Current user
        receiverId: conversation.participantId,
        content,
        status: 'sent' as MessageStatus,
        sentAt: new Date().toISOString(),
      };
      
      const conversationMessages = get().messages[conversationId] || [];
      const updatedConversationMessages = [...conversationMessages, newMessage];
      
      const updatedMessages = { ...get().messages };
      updatedMessages[conversationId] = updatedConversationMessages;
      
      // Update the conversation with the last message
      const updatedConversations = get().conversations.map(conv => 
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: content,
              lastMessageTime: newMessage.sentAt,
            }
          : conv
      );
      
      set({ 
        messages: updatedMessages,
        conversations: updatedConversations,
        isLoading: false 
      });
      
      // Simulate receiving a response after a delay
      setTimeout(() => {
        const responseContent = `Thank you for your message. This is an automated response from ${conversation.participantName}.`;
        
        const responseMessage: Message = {
          id: `msg-${conversationId}-${Date.now() + 1}`,
          senderId: conversation.participantId,
          receiverId: '1', // Current user
          content: responseContent,
          status: 'sent' as MessageStatus,
          sentAt: new Date().toISOString(),
        };
        
        const currentMessages = get().messages[conversationId] || [];
        const updatedWithResponse = [...currentMessages, responseMessage];
        
        const messagesWithResponse = { ...get().messages };
        messagesWithResponse[conversationId] = updatedWithResponse;
        
        // Update conversation with the response
        const conversationsWithResponse = get().conversations.map(conv => 
          conv.id === conversationId
            ? {
                ...conv,
                lastMessage: responseContent,
                lastMessageTime: responseMessage.sentAt,
                unreadCount: conv.unreadCount + 1,
              }
            : conv
        );
        
        set({ 
          messages: messagesWithResponse,
          conversations: conversationsWithResponse,
        });
      }, 5000);
      
    } catch (error) {
      set({ error: 'Failed to send message', isLoading: false });
    }
  },
  
  selectConversation: (conversationId: string) => {
    set({ selectedConversation: conversationId });
  },
  
  markAsRead: async (conversationId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Update messages to mark as read
      const conversationMessages = get().messages[conversationId] || [];
      const updatedMessages = conversationMessages.map(msg => 
        msg.receiverId === '1' && msg.status !== 'read'
          ? { ...msg, status: 'read' as MessageStatus }
          : msg
      );
      
      const updatedMessagesState = { ...get().messages };
      updatedMessagesState[conversationId] = updatedMessages;
      
      // Update conversation unread count
      const updatedConversations = get().conversations.map(conv => 
        conv.id === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      );
      
      set({ 
        messages: updatedMessagesState,
        conversations: updatedConversations,
      });
    } catch (error) {
      console.error('Failed to mark messages as read', error);
    }
  },
}));
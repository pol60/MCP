import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useMessageStore } from '@/store/messageStore';
import Avatar from '@/components/Avatar';
import MessageBubble from '@/components/MessageBubble';

export default function MessageDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { conversations, messages, fetchMessages, sendMessage, markAsRead } = useMessageStore();
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  const conversation = conversations.find(conv => conv.id === id);
  const conversationMessages = messages[id as string] || [];
  
  useEffect(() => {
    if (id) {
      fetchMessages(id);
      markAsRead(id);
    }
  }, [id]);
  
  const handleSend = async () => {
    if (!messageText.trim() || !id) return;
    
    await sendMessage(id, messageText);
    setMessageText('');
    
    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  
  if (!conversation) {
    return (
      <View style={styles.container}>
        <Text>Conversation not found</Text>
      </View>
    );
  }
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Avatar
                source={conversation.participantAvatar}
                name={conversation.participantName}
                size="small"
                status="online"
              />
              <Text style={styles.headerName}>{conversation.participantName}</Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <FlatList
        ref={flatListRef}
        data={conversationMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            isCurrentUser={item.senderId === '1'} // Current user ID
          />
        )}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !messageText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!messageText.trim()}
        >
          <Send size={20} color={colors.card} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: colors.inactive,
  },
});
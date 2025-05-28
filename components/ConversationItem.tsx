import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatDate } from '@/utils/date';
import { Conversation } from '@/types/message';
import colors from '@/constants/colors';
import Avatar from './Avatar';
import Badge from './Badge';

interface ConversationItemProps {
  conversation: Conversation;
  onPress: () => void;
}

export default function ConversationItem({ conversation, onPress }: ConversationItemProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Avatar
        source={conversation.participantAvatar}
        name={conversation.participantName}
        size="medium"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {conversation.participantName}
          </Text>
          
          {conversation.lastMessageTime && (
            <Text style={styles.time}>
              {formatDate(conversation.lastMessageTime)}
            </Text>
          )}
        </View>
        
        <View style={styles.messageRow}>
          {conversation.lastMessage && (
            <Text style={styles.message} numberOfLines={1}>
              {conversation.lastMessage}
            </Text>
          )}
          
          {conversation.unreadCount > 0 && (
            <Badge
              label={conversation.unreadCount.toString()}
              variant="primary"
              size="small"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    marginRight: 8,
  },
});
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Check, CheckCheck } from 'lucide-react-native';
import { Message } from '@/types/message';
import { formatTime } from '@/utils/date';
import colors from '@/constants/colors';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export default function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  const getStatusIcon = () => {
    switch (message.status) {
      case 'sent':
        return <Check size={14} color={colors.textSecondary} />;
      case 'delivered':
        return <CheckCheck size={14} color={colors.textSecondary} />;
      case 'read':
        return <CheckCheck size={14} color={colors.primary} />;
      default:
        return null;
    }
  };
  
  return (
    <View style={[
      styles.container,
      isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer,
    ]}>
      <View style={[
        styles.bubble,
        isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
      ]}>
        <Text style={[
          styles.messageText,
          isCurrentUser ? styles.currentUserText : styles.otherUserText,
        ]}>
          {message.content}
        </Text>
        
        <View style={styles.footer}>
          <Text style={[
            styles.time,
            isCurrentUser ? styles.currentUserTime : styles.otherUserTime,
          ]}>
            {formatTime(message.sentAt)}
          </Text>
          
          {isCurrentUser && getStatusIcon()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  currentUserContainer: {
    alignSelf: 'flex-end',
  },
  otherUserContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currentUserBubble: {
    backgroundColor: colors.primary,
  },
  otherUserBubble: {
    backgroundColor: colors.highlight,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  currentUserText: {
    color: colors.card,
  },
  otherUserText: {
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    marginRight: 4,
  },
  currentUserTime: {
    color: colors.card,
    opacity: 0.8,
  },
  otherUserTime: {
    color: colors.textSecondary,
  },
});
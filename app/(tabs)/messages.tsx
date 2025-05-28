import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useMessageStore } from '@/store/messageStore';
import ConversationItem from '@/components/ConversationItem';

export default function MessagesScreen() {
  const { conversations, fetchConversations } = useMessageStore();
  
  useEffect(() => {
    fetchConversations();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.heading1}>Messages</Text>
      </View>
      
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationItem
            conversation={item}
            onPress={() => {
              router.push(`/messages/${item.id}`);
            }}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No conversations yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  list: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
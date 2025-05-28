import React, { useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Bell, Calendar, ChevronRight, FileText, MessageSquare, Search } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useAuthStore } from '@/store/authStore';
import { useAppointmentStore } from '@/store/appointmentStore';
import { useClinicStore } from '@/store/clinicStore';
import { useMessageStore } from '@/store/messageStore';
import AppointmentCard from '@/components/AppointmentCard';
import ClinicCard from '@/components/ClinicCard';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { upcomingAppointments, fetchAppointments } = useAppointmentStore();
  const { clinics, fetchClinics } = useClinicStore();
  const { conversations, fetchConversations } = useMessageStore();
  
  useEffect(() => {
    fetchAppointments();
    fetchClinics();
    fetchConversations();
  }, []);
  
  const unreadMessages = conversations.reduce(
    (count, conv) => count + conv.unreadCount,
    0
  );
  
  const nextAppointment = upcomingAppointments[0];
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={typography.heading1}>
            {user?.firstName || 'Guest'}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.searchBar}
        onPress={() => router.push('/search')}
      >
        <Search size={20} color={colors.textSecondary} />
        <Text style={styles.searchText}>Search for doctors, clinics...</Text>
      </TouchableOpacity>
      
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/appointments')}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
            <Calendar size={24} color={colors.card} />
          </View>
          <Text style={styles.actionText}>Appointments</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/messages')}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.secondary }]}>
            <MessageSquare size={24} color={colors.card} />
            {unreadMessages > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadMessages}</Text>
              </View>
            )}
          </View>
          <Text style={styles.actionText}>Messages</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/documents')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#FF6B6B' }]}>
            <FileText size={24} color={colors.card} />
          </View>
          <Text style={styles.actionText}>Documents</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={typography.heading2}>Upcoming Appointment</Text>
        </View>
        
        {nextAppointment ? (
          <AppointmentCard 
            appointment={nextAppointment}
            onPress={() => router.push(`/appointments/${nextAppointment.id}`)}
          />
        ) : (
          <Card variant="outlined" style={styles.emptyCard}>
            <Text style={styles.emptyText}>No upcoming appointments</Text>
            <Button 
              title="Book an Appointment"
              onPress={() => router.push('/search')}
              variant="primary"
              size="small"
            />
          </Card>
        )}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={typography.heading2}>Nearby Clinics</Text>
          <TouchableOpacity onPress={() => router.push('/search')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={clinics.slice(0, 3)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ClinicCard 
              clinic={item}
              onPress={() => router.push(`/clinics/${item.id}`)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.clinicsList}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        />
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={typography.heading2}>Health Tips</Text>
        </View>
        
        <Card variant="elevated" style={styles.tipCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71' }}
            style={styles.tipImage}
            contentFit="cover"
          />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              5 Ways to Boost Your Immune System
            </Text>
            <Text style={styles.tipDescription}>
              Learn how to strengthen your body's natural defenses with these simple lifestyle changes.
            </Text>
            <TouchableOpacity style={styles.readMore}>
              <Text style={styles.readMoreText}>Read More</Text>
              <ChevronRight size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  actionIconImage: {
    width: 24,
    height: 24,
  },
  actionText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.notification,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 12,
    color: colors.card,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  clinicsList: {
    paddingHorizontal: 16,
  },
  tipCard: {
    marginHorizontal: 16,
    padding: 0,
    overflow: 'hidden',
  },
  tipImage: {
    width: '100%',
    height: 150,
  },
  tipContent: {
    padding: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
});
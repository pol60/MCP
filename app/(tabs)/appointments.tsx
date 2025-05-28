import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useAppointmentStore } from '@/store/appointmentStore';
import AppointmentCard from '@/components/AppointmentCard';
import Button from '@/components/Button';

type AppointmentTab = 'upcoming' | 'past';

export default function AppointmentsScreen() {
  const { upcomingAppointments, pastAppointments, fetchAppointments } = useAppointmentStore();
  const [activeTab, setActiveTab] = useState<AppointmentTab>('upcoming');
  
  useEffect(() => {
    fetchAppointments();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.heading1}>Appointments</Text>
        <Button
          title="New"
          onPress={() => router.push('/search')}
          variant="primary"
          size="small"
          icon={<Plus size={16} color={colors.card} />}
        />
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'upcoming' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'past' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={activeTab === 'upcoming' ? upcomingAppointments : pastAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            onPress={() => router.push(`/appointments/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'upcoming'
                ? "You don't have any upcoming appointments"
                : "You don't have any past appointments"}
            </Text>
            {activeTab === 'upcoming' && (
              <Button
                title="Book an Appointment"
                onPress={() => router.push('/search')}
                variant="primary"
              />
            )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  activeTabButton: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  activeTabText: {
    color: colors.card,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
});
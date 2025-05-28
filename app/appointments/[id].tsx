import React, { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Calendar, Clock, MapPin, MessageSquare, Video } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useAppointmentStore } from '@/store/appointmentStore';
import { formatDate, formatTime } from '@/utils/date';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { appointments, selectedAppointment, selectAppointment, cancelAppointment } = useAppointmentStore();
  
  useEffect(() => {
    if (id) {
      selectAppointment(id);
    }
  }, [id, appointments]);
  
  const handleCancel = () => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          onPress: async () => {
            if (id) {
              await cancelAppointment(id);
              router.back();
            }
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleMessage = () => {
    // Find the conversation with the doctor
    const conversationId = selectedAppointment?.doctorId === '2'
      ? 'conv-1'
      : selectedAppointment?.doctorId === '3'
      ? 'conv-2'
      : 'conv-3';
    
    router.push(`/messages/${conversationId}`);
  };
  
  if (!selectedAppointment) {
    return (
      <View style={styles.container}>
        <Text>Appointment not found</Text>
      </View>
    );
  }
  
  const getStatusVariant = () => {
    switch (selectedAppointment.status) {
      case 'booked':
        return 'info';
      case 'confirmed':
        return 'primary';
      case 'canceled':
        return 'error';
      case 'completed':
        return 'success';
      default:
        return 'info';
    }
  };
  
  const getStatusLabel = () => {
    switch (selectedAppointment.status) {
      case 'booked':
        return 'Booked';
      case 'confirmed':
        return 'Confirmed';
      case 'canceled':
        return 'Canceled';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: 'Appointment Details',
        }}
      />
      
      <View style={styles.header}>
        <Badge
          label={getStatusLabel()}
          variant={getStatusVariant()}
          size="medium"
        />
      </View>
      
      <Card variant="elevated" style={styles.doctorCard}>
        <View style={styles.doctorInfo}>
          <Avatar
            source={selectedAppointment.doctorId === '2' 
              ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2'
              : selectedAppointment.doctorId === '3'
              ? 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d'
              : 'https://images.unsplash.com/photo-1594824476967-48c8b964273f'
            }
            size="large"
          />
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{selectedAppointment.doctorName}</Text>
            <Text style={styles.specialization}>{selectedAppointment.doctorSpecialization}</Text>
          </View>
        </View>
      </Card>
      
      <Card variant="outlined" style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Appointment Details</Text>
        
        <View style={styles.detailRow}>
          <Calendar size={20} color={colors.primary} />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {formatDate(selectedAppointment.startsAt)}
            </Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={20} color={colors.primary} />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>
              {formatTime(selectedAppointment.startsAt)} - {formatTime(selectedAppointment.endsAt)}
            </Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          {selectedAppointment.type === 'online' ? (
            <Video size={20} color={colors.primary} />
          ) : (
            <MapPin size={20} color={colors.primary} />
          )}
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>
              {selectedAppointment.type === 'online'
                ? 'Online Consultation'
                : selectedAppointment.type === 'home_visit'
                ? 'Home Visit'
                : 'In-person Visit'}
            </Text>
          </View>
        </View>
        
        {selectedAppointment.clinicName && selectedAppointment.type !== 'online' && (
          <View style={styles.detailRow}>
            <View style={styles.iconPlaceholder} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>
                {selectedAppointment.clinicName}
              </Text>
              {selectedAppointment.clinicAddress && (
                <Text style={styles.detailSubvalue}>
                  {selectedAppointment.clinicAddress}
                </Text>
              )}
            </View>
          </View>
        )}
      </Card>
      
      <Card variant="outlined" style={styles.serviceCard}>
        <Text style={styles.sectionTitle}>Service Information</Text>
        
        <View style={styles.serviceRow}>
          <Text style={styles.serviceLabel}>Service:</Text>
          <Text style={styles.serviceValue}>{selectedAppointment.serviceName}</Text>
        </View>
        
        <View style={styles.serviceRow}>
          <Text style={styles.serviceLabel}>Price:</Text>
          <Text style={styles.serviceValue}>${selectedAppointment.price}</Text>
        </View>
        
        <View style={styles.serviceRow}>
          <Text style={styles.serviceLabel}>Payment Status:</Text>
          <Badge
            label="Covered by Insurance"
            variant="success"
            size="small"
          />
        </View>
      </Card>
      
      <View style={styles.actions}>
        <Button
          title="Message Doctor"
          onPress={handleMessage}
          variant="outline"
          icon={<MessageSquare size={16} color={colors.primary} />}
        />
        
        {(selectedAppointment.status === 'booked' || selectedAppointment.status === 'confirmed') && (
          <Button
            title="Cancel Appointment"
            onPress={handleCancel}
            variant="text"
          />
        )}
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
    alignItems: 'center',
    paddingVertical: 16,
  },
  doctorCard: {
    marginHorizontal: 16,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorDetails: {
    marginLeft: 16,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  specialization: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  detailsCard: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    ...typography.heading3,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: colors.text,
  },
  detailSubvalue: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  iconPlaceholder: {
    width: 20,
    marginLeft: 20,
  },
  serviceCard: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    width: 120,
  },
  serviceValue: {
    fontSize: 16,
    color: colors.text,
  },
  actions: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    gap: 12,
    alignItems: 'center',
  },
});
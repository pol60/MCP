import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, Clock, MapPin, Video } from 'lucide-react-native';
import { Appointment } from '@/types/appointment';
import { formatDate, formatTime } from '@/utils/date';
import colors from '@/constants/colors';
import Card from './Card';
import Badge from './Badge';
import Avatar from './Avatar';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress?: () => void;
}

export default function AppointmentCard({ appointment, onPress }: AppointmentCardProps) {
  const getStatusVariant = () => {
    switch (appointment.status) {
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
    switch (appointment.status) {
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
  
  const getAppointmentTypeIcon = () => {
    switch (appointment.type) {
      case 'online':
        return <Video size={16} color={colors.primary} />;
      case 'offline':
        return <MapPin size={16} color={colors.primary} />;
      case 'home_visit':
        return <MapPin size={16} color={colors.secondary} />;
      default:
        return null;
    }
  };
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.header}>
          <Badge
            label={getStatusLabel()}
            variant={getStatusVariant()}
            size="small"
          />
          <Text style={styles.price}>${appointment.price}</Text>
        </View>
        
        <View style={styles.doctorInfo}>
          <Avatar
            source={appointment.doctorId === '2' 
              ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2'
              : appointment.doctorId === '3'
              ? 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d'
              : 'https://images.unsplash.com/photo-1594824476967-48c8b964273f'
            }
            size="medium"
          />
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
            <Text style={styles.specialization}>{appointment.doctorSpecialization}</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Calendar size={16} color={colors.primary} />
            <Text style={styles.detailText}>
              {formatDate(appointment.startsAt)}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Clock size={16} color={colors.primary} />
            <Text style={styles.detailText}>
              {formatTime(appointment.startsAt)} - {formatTime(appointment.endsAt)}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            {getAppointmentTypeIcon()}
            <Text style={styles.detailText}>
              {appointment.type === 'online' 
                ? 'Online Consultation'
                : appointment.type === 'home_visit'
                ? 'Home Visit'
                : appointment.clinicName}
            </Text>
          </View>
          
          {appointment.clinicAddress && appointment.type !== 'online' && (
            <View style={styles.detailRow}>
              <View style={styles.addressIconPlaceholder} />
              <Text style={styles.addressText}>
                {appointment.clinicAddress}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.serviceContainer}>
          <Text style={styles.serviceLabel}>Service:</Text>
          <Text style={styles.serviceName}>{appointment.serviceName}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorDetails: {
    marginLeft: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  specialization: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 16,
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  addressIconPlaceholder: {
    width: 16,
    marginLeft: 16,
  },
  addressText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginRight: 4,
  },
  serviceName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
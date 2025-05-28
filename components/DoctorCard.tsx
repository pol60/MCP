import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Star } from 'lucide-react-native';
import { Doctor } from '@/types/user';
import colors from '@/constants/colors';
import Card from './Card';
import Avatar from './Avatar';

interface DoctorCardProps {
  doctor: Doctor;
  onPress?: () => void;
}

export default function DoctorCard({ doctor, onPress }: DoctorCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.header}>
          <Avatar
            source={doctor.avatar}
            name={`${doctor.firstName} ${doctor.lastName}`}
            size="large"
            status={doctor.status}
          />
          
          <View style={styles.info}>
            <Text style={styles.name}>
              Dr. {doctor.firstName} {doctor.lastName}
            </Text>
            
            <Text style={styles.specialization}>
              {doctor.specialization}
            </Text>
            
            <View style={styles.ratingContainer}>
              <Star size={16} color={colors.warning} fill={colors.warning} />
              <Text style={styles.rating}>{doctor.rating.toFixed(1)}</Text>
              <Text style={styles.experience}>
                • {doctor.experience} years experience
              </Text>
            </View>
          </View>
        </View>
        
        {doctor.about && (
          <View style={styles.about}>
            <Text style={styles.aboutText} numberOfLines={3}>
              {doctor.about}
            </Text>
          </View>
        )}
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
    marginBottom: 12,
  },
  info: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 4,
    marginRight: 8,
  },
  experience: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  about: {
    marginTop: 8,
  },
  aboutText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
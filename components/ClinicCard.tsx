import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import { Clinic } from '@/types/clinic';
import colors from '@/constants/colors';
import Card from './Card';

interface ClinicCardProps {
  clinic: Clinic;
  onPress?: () => void;
}

export default function ClinicCard({ clinic, onPress }: ClinicCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" style={styles.card}>
        <Image
          source={{ uri: clinic.imageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d' }}
          style={styles.image}
        />
        
        <View style={styles.content}>
          <Text style={styles.name}>{clinic.name}</Text>
          
          <View style={styles.specialization}>
            <Text style={styles.specializationText}>
              {clinic.specialization}
            </Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.warning} fill={colors.warning} />
            <Text style={styles.rating}>{clinic.rating.toFixed(1)}</Text>
          </View>
          
          <View style={styles.addressContainer}>
            <MapPin size={16} color={colors.primary} />
            <Text style={styles.address} numberOfLines={2}>
              {clinic.address}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  specialization: {
    marginBottom: 8,
  },
  specializationText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  address: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
});
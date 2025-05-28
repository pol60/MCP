import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { MapPin, Phone, Star } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useClinicStore } from '@/store/clinicStore';
import { clinics } from '@/mocks/clinics';
import { doctors } from '@/mocks/users';
import DoctorCard from '@/components/DoctorCard';
import Card from '@/components/Card';
import Button from '@/components/Button';

type ClinicTab = 'doctors' | 'services' | 'reviews';

export default function ClinicDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<ClinicTab>('doctors');
  const [clinicDoctors, setClinicDoctors] = useState(doctors);
  
  const clinic = clinics.find(c => c.id === id);
  
  useEffect(() => {
    if (id) {
      // Filter doctors by clinic ID
      const filtered = doctors.filter(doctor => doctor.clinicId === id);
      setClinicDoctors(filtered);
    }
  }, [id]);
  
  if (!clinic) {
    return (
      <View style={styles.container}>
        <Text>Clinic not found</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: clinic.name,
        }}
      />
      
      <Image
        source={{ uri: clinic.imageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d' }}
        style={styles.coverImage}
      />
      
      <View style={styles.header}>
        <Text style={typography.heading1}>{clinic.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={16} color={colors.warning} fill={colors.warning} />
          <Text style={styles.rating}>{clinic.rating.toFixed(1)}</Text>
        </View>
        
        <View style={styles.addressContainer}>
          <MapPin size={16} color={colors.primary} />
          <Text style={styles.address}>{clinic.address}</Text>
        </View>
        
        <View style={styles.specializationContainer}>
          <Text style={styles.specializationLabel}>Specialization:</Text>
          <Text style={styles.specialization}>{clinic.specialization}</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Button
          title="Book Appointment"
          onPress={() => router.push(`/clinics/${id}/book`)}
          variant="primary"
        />
        
        <View style={{ width: 16 }} />
        
        <Button
          title="Call Clinic"
          onPress={() => {}}
          variant="outline"
          icon={<Phone size={16} color={colors.primary} />}
        />
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'doctors' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('doctors')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'doctors' && styles.activeTabText,
            ]}
          >
            Doctors
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'services' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('services')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'services' && styles.activeTabText,
            ]}
          >
            Services
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'reviews' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('reviews')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'reviews' && styles.activeTabText,
            ]}
          >
            Reviews
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'doctors' && (
        <View style={styles.tabContent}>
          {clinicDoctors.length > 0 ? (
            clinicDoctors.map(doctor => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onPress={() => router.push(`/doctors/${doctor.id}`)}
              />
            ))
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <Text style={styles.emptyText}>No doctors available</Text>
            </Card>
          )}
        </View>
      )}
      
      {activeTab === 'services' && (
        <View style={styles.tabContent}>
          <Card variant="outlined" style={styles.serviceCard}>
            <Text style={styles.serviceCategory}>General Consultations</Text>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>Initial Consultation</Text>
              <Text style={styles.servicePrice}>$150</Text>
            </View>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>Follow-up Visit</Text>
              <Text style={styles.servicePrice}>$100</Text>
            </View>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>Comprehensive Health Check</Text>
              <Text style={styles.servicePrice}>$300</Text>
            </View>
          </Card>
          
          <Card variant="outlined" style={styles.serviceCard}>
            <Text style={styles.serviceCategory}>Specialized Services</Text>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>Cardiac Examination</Text>
              <Text style={styles.servicePrice}>$200</Text>
            </View>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>Neurological Assessment</Text>
              <Text style={styles.servicePrice}>$250</Text>
            </View>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>Pediatric Check-up</Text>
              <Text style={styles.servicePrice}>$120</Text>
            </View>
          </Card>
        </View>
      )}
      
      {activeTab === 'reviews' && (
        <View style={styles.tabContent}>
          <Card variant="outlined" style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Sarah Johnson</Text>
              <View style={styles.reviewRating}>
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
              </View>
            </View>
            <Text style={styles.reviewDate}>October 15, 2023</Text>
            <Text style={styles.reviewText}>
              Excellent care and professional staff. Dr. Smith was very thorough and took the time to explain everything.
            </Text>
          </Card>
          
          <Card variant="outlined" style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Michael Brown</Text>
              <View style={styles.reviewRating}>
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.inactive} />
              </View>
            </View>
            <Text style={styles.reviewDate}>September 22, 2023</Text>
            <Text style={styles.reviewText}>
              Great experience overall. The facility is clean and modern. Wait time was minimal.
            </Text>
          </Card>
          
          <Card variant="outlined" style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Emily Davis</Text>
              <View style={styles.reviewRating}>
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
              </View>
            </View>
            <Text style={styles.reviewDate}>November 5, 2023</Text>
            <Text style={styles.reviewText}>
              I've been coming to this clinic for years and have always received excellent care. The doctors are knowledgeable and the staff is friendly.
            </Text>
          </Card>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  header: {
    padding: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  address: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  specializationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specializationLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginRight: 4,
  },
  specialization: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
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
  tabContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  serviceCard: {
    marginBottom: 16,
  },
  serviceCategory: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  serviceName: {
    fontSize: 16,
    color: colors.text,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  reviewCard: {
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
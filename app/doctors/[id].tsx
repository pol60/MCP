import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Calendar, Clock, MapPin, MessageSquare, Phone, Star } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { doctors } from '@/mocks/users';
import { clinics } from '@/mocks/clinics';
import { generateTimeSlots } from '@/mocks/appointments';
import { formatDate } from '@/utils/date';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Card from '@/components/Card';

type DoctorTab = 'about' | 'schedule' | 'reviews';

export default function DoctorDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<DoctorTab>('about');
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  
  const doctor = doctors.find(d => d.id === id);
  const clinic = doctor ? clinics.find(c => c.id === doctor.clinicId) : null;
  
  useEffect(() => {
    if (id) {
      // Generate available dates for the next 7 days
      const dates = [];
      const today = new Date();
      
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        dates.push(date);
      }
      
      setAvailableDates(dates);
    }
  }, [id]);
  
  if (!doctor || !clinic) {
    return (
      <View style={styles.container}>
        <Text>Doctor not found</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: `Dr. ${doctor.firstName} ${doctor.lastName}`,
        }}
      />
      
      <View style={styles.header}>
        <Avatar
          source={doctor.avatar}
          name={`${doctor.firstName} ${doctor.lastName}`}
          size="large"
          status={doctor.status}
        />
        
        <Text style={typography.heading1}>
          Dr. {doctor.firstName} {doctor.lastName}
        </Text>
        
        <Text style={styles.specialization}>{doctor.specialization}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={16} color={colors.warning} fill={colors.warning} />
          <Text style={styles.rating}>{doctor.rating.toFixed(1)}</Text>
          <Text style={styles.experience}>
            • {doctor.experience} years experience
          </Text>
        </View>
        
        <View style={styles.clinicContainer}>
          <MapPin size={16} color={colors.primary} />
          <Text style={styles.clinicName}>{clinic.name}</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Button
          title="Book Appointment"
          onPress={() => router.push(`/doctors/${id}/book`)}
          variant="primary"
        />
        
        <View style={{ width: 16 }} />
        
        <Button
          title="Message"
          onPress={() => {
            // Find the conversation with the doctor
            const conversationId = doctor.id === '2'
              ? 'conv-1'
              : doctor.id === '3'
              ? 'conv-2'
              : 'conv-3';
            
            router.push(`/messages/${conversationId}`);
          }}
          variant="outline"
          icon={<MessageSquare size={16} color={colors.primary} />}
        />
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'about' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('about')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'about' && styles.activeTabText,
            ]}
          >
            About
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'schedule' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('schedule')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'schedule' && styles.activeTabText,
            ]}
          >
            Schedule
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
      
      {activeTab === 'about' && (
        <View style={styles.tabContent}>
          <Card variant="outlined" style={styles.aboutCard}>
            <Text style={styles.sectionTitle}>About Doctor</Text>
            <Text style={styles.aboutText}>
              {doctor.about || `Dr. ${doctor.firstName} ${doctor.lastName} is a highly skilled ${doctor.specialization.toLowerCase()} specialist with ${doctor.experience} years of experience. They are dedicated to providing exceptional patient care and staying at the forefront of medical advancements in their field.`}
            </Text>
          </Card>
          
          <Card variant="outlined" style={styles.servicesCard}>
            <Text style={styles.sectionTitle}>Services</Text>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>Initial Consultation</Text>
              <Text style={styles.servicePrice}>$150</Text>
            </View>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>Follow-up Visit</Text>
              <Text style={styles.servicePrice}>$100</Text>
            </View>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>Specialized Examination</Text>
              <Text style={styles.servicePrice}>$200</Text>
            </View>
          </Card>
          
          <Card variant="outlined" style={styles.educationCard}>
            <Text style={styles.sectionTitle}>Education & Experience</Text>
            
            <View style={styles.educationItem}>
              <View style={styles.educationDot} />
              <View style={styles.educationContent}>
                <Text style={styles.educationTitle}>Medical Degree</Text>
                <Text style={styles.educationInstitution}>Harvard Medical School</Text>
                <Text style={styles.educationYear}>2005 - 2009</Text>
              </View>
            </View>
            
            <View style={styles.educationItem}>
              <View style={styles.educationDot} />
              <View style={styles.educationContent}>
                <Text style={styles.educationTitle}>Residency</Text>
                <Text style={styles.educationInstitution}>Johns Hopkins Hospital</Text>
                <Text style={styles.educationYear}>2009 - 2013</Text>
              </View>
            </View>
            
            <View style={styles.educationItem}>
              <View style={styles.educationDot} />
              <View style={styles.educationContent}>
                <Text style={styles.educationTitle}>Fellowship</Text>
                <Text style={styles.educationInstitution}>Mayo Clinic</Text>
                <Text style={styles.educationYear}>2013 - 2015</Text>
              </View>
            </View>
          </Card>
        </View>
      )}
      
      {activeTab === 'schedule' && (
        <View style={styles.tabContent}>
          <Text style={styles.scheduleTitle}>Available Dates</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.datesContainer}
          >
            {availableDates.map((date, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.dateCard,
                  index === 0 && styles.activeDateCard,
                ]}
              >
                <Text style={[
                  styles.dateDay,
                  index === 0 && styles.activeDateText,
                ]}>
                  {date.getDate()}
                </Text>
                <Text style={[
                  styles.dateMonth,
                  index === 0 && styles.activeDateText,
                ]}>
                  {date.toLocaleString('default', { month: 'short' })}
                </Text>
                <Text style={[
                  styles.dateWeekday,
                  index === 0 && styles.activeDateText,
                ]}>
                  {date.toLocaleString('default', { weekday: 'short' })}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <Text style={styles.scheduleTitle}>Available Time Slots</Text>
          
          <View style={styles.timeSlots}>
            <TouchableOpacity style={styles.timeSlot}>
              <Clock size={16} color={colors.primary} />
              <Text style={styles.timeText}>9:00 AM</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeSlot}>
              <Clock size={16} color={colors.primary} />
              <Text style={styles.timeText}>10:30 AM</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeSlot}>
              <Clock size={16} color={colors.primary} />
              <Text style={styles.timeText}>1:00 PM</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeSlot}>
              <Clock size={16} color={colors.primary} />
              <Text style={styles.timeText}>2:30 PM</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeSlot}>
              <Clock size={16} color={colors.primary} />
              <Text style={styles.timeText}>4:00 PM</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeSlot}>
              <Clock size={16} color={colors.primary} />
              <Text style={styles.timeText}>5:30 PM</Text>
            </TouchableOpacity>
          </View>
          
          <Button
            title="Book Appointment"
            onPress={() => router.push(`/doctors/${id}/book`)}
            variant="primary"
          />
        </View>
      )}
      
      {activeTab === 'reviews' && (
        <View style={styles.tabContent}>
          <Card variant="outlined" style={styles.reviewSummary}>
            <Text style={styles.reviewRatingLarge}>{doctor.rating.toFixed(1)}</Text>
            <View style={styles.reviewStars}>
              <Star size={20} color={colors.warning} fill={colors.warning} />
              <Star size={20} color={colors.warning} fill={colors.warning} />
              <Star size={20} color={colors.warning} fill={colors.warning} />
              <Star size={20} color={colors.warning} fill={colors.warning} />
              <Star size={20} color={colors.warning} fill={doctor.rating >= 5 ? colors.warning : colors.inactive} />
            </View>
            <Text style={styles.reviewCount}>Based on 24 reviews</Text>
          </Card>
          
          <Card variant="outlined" style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>John Smith</Text>
              <View style={styles.reviewRating}>
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
              </View>
            </View>
            <Text style={styles.reviewDate}>November 10, 2023</Text>
            <Text style={styles.reviewText}>
              Dr. {doctor.lastName} is an excellent doctor. Very knowledgeable and takes the time to explain everything thoroughly. Highly recommend!
            </Text>
          </Card>
          
          <Card variant="outlined" style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Lisa Johnson</Text>
              <View style={styles.reviewRating}>
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.inactive} />
              </View>
            </View>
            <Text style={styles.reviewDate}>October 25, 2023</Text>
            <Text style={styles.reviewText}>
              Great experience with Dr. {doctor.lastName}. Very professional and caring. The only downside was the wait time.
            </Text>
          </Card>
          
          <Card variant="outlined" style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Robert Davis</Text>
              <View style={styles.reviewRating}>
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
                <Star size={14} color={colors.warning} fill={colors.warning} />
              </View>
            </View>
            <Text style={styles.reviewDate}>September 15, 2023</Text>
            <Text style={styles.reviewText}>
              I've been seeing Dr. {doctor.lastName} for years and have always received excellent care. They are thorough, compassionate, and truly care about their patients.
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
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  specialization: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 4,
    marginRight: 8,
  },
  experience: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  clinicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clinicName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
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
  aboutCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  servicesCard: {
    marginBottom: 16,
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
  educationCard: {
    marginBottom: 16,
  },
  educationItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  educationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginTop: 4,
    marginRight: 12,
  },
  educationContent: {
    flex: 1,
  },
  educationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  educationInstitution: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  educationYear: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  datesContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dateCard: {
    width: 70,
    height: 90,
    borderRadius: 12,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeDateCard: {
    backgroundColor: colors.primary,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  dateMonth: {
    fontSize: 14,
    color: colors.textSecondary,
    marginVertical: 4,
  },
  dateWeekday: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeDateText: {
    color: colors.card,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    marginBottom: 12,
  },
  timeText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 4,
  },
  reviewSummary: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
  },
  reviewRatingLarge: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  reviewStars: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.textSecondary,
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
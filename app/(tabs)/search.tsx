import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useClinicStore } from '@/store/clinicStore';
import { Clinic } from '@/types/clinic';
import { Doctor } from '@/types/user';
import Input from '@/components/Input';
import ClinicCard from '@/components/ClinicCard';
import DoctorCard from '@/components/DoctorCard';
import { doctors } from '@/mocks/users';

type SearchTab = 'clinics' | 'doctors';

export default function SearchScreen() {
  const { clinics, fetchClinics, searchClinics } = useClinicStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTab>('clinics');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  
  useEffect(() => {
    fetchClinics();
  }, []);
  
  useEffect(() => {
    if (activeTab === 'clinics') {
      searchClinics(searchQuery);
    } else {
      // Filter doctors based on search query
      const query = searchQuery.toLowerCase();
      const filtered = doctors.filter(
        doctor =>
          doctor.firstName.toLowerCase().includes(query) ||
          doctor.lastName.toLowerCase().includes(query) ||
          doctor.specialization.toLowerCase().includes(query)
      );
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, activeTab]);
  
  const renderClinic = ({ item }: { item: Clinic }) => (
    <ClinicCard
      clinic={item}
      onPress={() => router.push(`/clinics/${item.id}`)}
    />
  );
  
  const renderDoctor = ({ item }: { item: Doctor }) => (
    <DoctorCard
      doctor={item}
      onPress={() => router.push(`/doctors/${item.id}`)}
    />
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.heading1}>Find Care</Text>
        <Text style={styles.subtitle}>
          Search for clinics, doctors, and services
        </Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={20} color={colors.textSecondary} />}
          style={styles.searchInput}
        />
      </View>
      
      <View style={styles.tabs}>
        <View
          style={[
            styles.tabButton,
            activeTab === 'clinics' && styles.activeTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'clinics' && styles.activeTabText,
            ]}
            onPress={() => setActiveTab('clinics')}
          >
            Clinics
          </Text>
        </View>
        
        <View
          style={[
            styles.tabButton,
            activeTab === 'doctors' && styles.activeTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'doctors' && styles.activeTabText,
            ]}
            onPress={() => setActiveTab('doctors')}
          >
            Doctors
          </Text>
        </View>
      </View>
      
      {activeTab === 'clinics' ? (
        <FlatList
          data={clinics}
          keyExtractor={(item) => item.id}
          renderItem={renderClinic}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No clinics found</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id}
          renderItem={renderDoctor}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No doctors found</Text>
            </View>
          }
        />
      )}
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
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  searchInput: {
    backgroundColor: colors.card,
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
  },
});
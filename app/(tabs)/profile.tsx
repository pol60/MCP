import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, CreditCard, FileText, HelpCircle, LogOut, Settings, Shield, User } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useAuthStore } from '@/store/authStore';
import Avatar from '@/components/Avatar';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await logout();
            router.replace('/auth/login');
          },
        },
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={typography.heading1}>Profile</Text>
      </View>
      
      <View style={styles.profileCard}>
        <Avatar
          source={user?.avatar}
          name={user ? `${user.firstName} ${user.lastName}` : undefined}
          size="large"
          status="online"
        />
        
        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
          </Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insurance</Text>
        
        <View style={styles.card}>
          <View style={styles.insuranceCard}>
            <View style={styles.insuranceInfo}>
              <Text style={styles.insuranceCompany}>MedHealth Insurance</Text>
              <Text style={styles.insuranceNumber}>
                Policy: {user?.role === 'patient' ? 'POL-12345-XYZ' : 'N/A'}
              </Text>
              <Text style={styles.insuranceValidity}>
                Valid until: {user?.role === 'patient' ? 'Dec 31, 2025' : 'N/A'}
              </Text>
            </View>
            <CreditCard size={32} color={colors.primary} />
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <User size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Personal Information</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <FileText size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Medical History</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Shield size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Privacy & Security</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Settings size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <HelpCircle size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <View style={styles.menuIcon}>
              <LogOut size={20} color={colors.error} />
            </View>
            <Text style={[styles.menuText, { color: colors.error }]}>
              Logout
            </Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Medical Client Portal v1.0.0
        </Text>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.highlight,
    borderRadius: 16,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  insuranceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  insuranceInfo: {
    flex: 1,
  },
  insuranceCompany: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  insuranceNumber: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  insuranceValidity: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
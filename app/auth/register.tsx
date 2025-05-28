import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Lock, Mail, Phone, User } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useAuthStore } from '@/store/authStore';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function RegisterScreen() {
  const { register, isLoading, error } = useAuthStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    await register({
      firstName,
      lastName,
      email,
      phone,
    });
    
    // If registration is successful, navigate to home
    if (useAuthStore.getState().isAuthenticated) {
      router.replace('/');
    }
  };
  
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528' }}
          style={styles.logo}
        />
        <Text style={typography.heading1}>Create Account</Text>
        <Text style={styles.subtitle}>
          Sign up to access medical services and manage your health
        </Text>
      </View>
      
      <View style={styles.form}>
        <View style={styles.nameRow}>
          <Input
            label="First Name"
            placeholder="Enter first name"
            value={firstName}
            onChangeText={setFirstName}
            leftIcon={<User size={20} color={colors.textSecondary} />}
            style={{ flex: 1 }}
          />
          
          <View style={{ width: 16 }} />
          
          <Input
            label="Last Name"
            placeholder="Enter last name"
            value={lastName}
            onChangeText={setLastName}
            style={{ flex: 1 }}
          />
        </View>
        
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Mail size={20} color={colors.textSecondary} />}
        />
        
        <Input
          label="Phone"
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          leftIcon={<Phone size={20} color={colors.textSecondary} />}
        />
        
        <Input
          label="Password"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon={<Lock size={20} color={colors.textSecondary} />}
        />
        
        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          leftIcon={<Lock size={20} color={colors.textSecondary} />}
        />
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <Button
          title="Sign Up"
          onPress={handleRegister}
          variant="primary"
          size="large"
          loading={isLoading}
          fullWidth
        />
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  form: {
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: colors.error,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 4,
  },
  signInText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
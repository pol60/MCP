import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Lock, Mail } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useAuthStore } from '@/store/authStore';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function LoginScreen() {
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    
    await login(email, password);
    
    // If login is successful, navigate to home
    if (useAuthStore.getState().isAuthenticated) {
      router.replace('/');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528' }}
          style={styles.logo}
        />
        <Text style={typography.heading1}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to access your medical records and appointments
        </Text>
      </View>
      
      <View style={styles.form}>
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
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon={<Lock size={20} color={colors.textSecondary} />}
        />
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <Button
          title="Sign In"
          onPress={handleLogin}
          variant="primary"
          size="large"
          loading={isLoading}
          fullWidth
        />
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.demoInfo}>
        <Text style={styles.demoText}>Demo Credentials:</Text>
        <Text style={styles.demoCredentials}>
          Email: john.doe@example.com
        </Text>
        <Text style={styles.demoCredentials}>
          Password: any password will work
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 24,
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
  errorText: {
    color: colors.error,
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primary,
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
  signUpText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  demoInfo: {
    marginTop: 48,
    padding: 16,
    backgroundColor: colors.highlight,
    borderRadius: 8,
  },
  demoText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  demoCredentials: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
});